<template>
    <div>
        <div class="content-width-small">
            <h1>Watch list</h1>
            <p>Template placeholder text that will be replaced at some point and so on...</p>
        </div>

        <router-link to="/watchList/addTitle">
            <button class="color-primary sticky-corner-button">
                <IconAdd size="28px"/>
            </button>
        </router-link>

        <div v-for="(titleList, index) in titleLists" :key="index" class="content-width-medium">
            <h2>{{ titleList.listName }}</h2>

            <!-- Show swiper-container only when titles are available and loading is complete -->
            <Swiper 
                space-between="10" 
                slidesPerView="auto" 
                class="slide-container"
                :slidesOffsetBefore=32
                :slidesOffsetAfter=32
            >
                <swiper-slide 
                    v-for="title in titleList.titles" 
                    :key="title.id" 
                    class="slide"
                    @click="openDetailsPageFor(title.id)"
                >
                    <img :src="'https://image.tmdb.org/t/p/w300' + title.poster_url" alt="" class="thumbnail"/>
                    <div class="gradient"></div>
                    <div class="details">
                        <span class="title-name">{{ title.name }}</span>
                        <div class="title-rating">{{ title.vote_average }} • {{ new Date(title.release_date).getFullYear() }}</div>
                        <div class="progress-details">
                            <template v-if="title.type === 'tv'">
                                {{ title.season_count }} seasons, {{ title.episode_count }} episodes
                            </template>
                            <template v-else>
                                {{ formatRuntime(title.movie_runtime) }}
                            </template>
                        </div>
                        <div class="watched">
                            <template v-if="title.watch_count == 1">
                                Watched 
                            </template>
                            <template v-if="title.watch_count >= 2">
                                Watched {{ title.watch_count }} times
                            </template>
                        </div>
                    </div>
                </swiper-slide>

                <swiper-slide 
                    class="card full-width-swiper-slide loading-placeholder" 
                    v-if="titleList.titles.length == 0 && titleList.loading"
                >
                </swiper-slide>

                <swiper-slide 
                    class="card full-width-swiper-slide" 
                    v-if="titleList.titles.length == 0 && !titleList.loading"
                >
                    Looks like there's nothing here. Try adding titles to your watchlist.
                </swiper-slide>
            </Swiper>

        </div>

        <div class="content-width-small">
            <h2>Titles listed</h2>
            <p>Here one day will be a list of all the titles where you can fitler and sort them as you wish to find something to watch. It will take a while though since there are so many things that haven't yet been implemented that are far more crucial.</p>
        </div>
        
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'; // Import Swiper and SwiperSlide for Vue 3
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import IconAdd from '@/components/icons/IconAdd.vue';
import router from '@/router';
import api from '@/utils/dataQuery.js';

export default {
    name: 'HomePage',
    components: {
        IconAdd,
        Swiper,      // Register Swiper component
        SwiperSlide  // Register SwiperSlide component
    },
    data() {
        return {
            titleLists: [
                {
                    listName: "Movies to watch",
                    titles: [],
                    loading: true,  // Add loading state for each list
                },
                {
                    listName: "TV-series to watch",
                    titles: [],
                    loading: true,  // Add loading state for each list
                },
                {
                    listName: "Rewatch these popular titles",
                    titles: [],
                    loading: true,  // Add loading state for each list
                }
            ]
        };
    },
    methods: {
        openDetailsPageFor(titleID) {
            console.log(titleID);
            router.push(`/watchList/title/${titleID}`);
        },
        formatRuntime(runtime) {
            const hours = Math.floor(runtime / 60);
            const minutes = runtime % 60;
            return `${hours}hr ${minutes}min`;
        },
        // Simplified method to fetch and set title lists
        async fetchTitleList(listName, titleType = null, watched = null, count = null) {
            const titleList = this.titleLists.find(list => list.listName === listName);
            try {
                titleList.loading = true;  // Set loading state to true initially
                
                // Fetch titles based on the provided criteria
                const titleData = await api.getTitleCards(titleType, watched, count);
                console.debug(titleData);
                
                // Update titles if available
                if (titleData && titleData.titles) {
                    titleList.titles = titleData.titles;
                }
            } catch (error) {
                console.error(`Error fetching data for ${listName}:`, error);
            } finally {
                titleList.loading = false;  // Set loading to false when data is fetched
            }
        }
    },
    async mounted() {
        // Use the fetchTitleList method to load data for each category
        await this.fetchTitleList("Movies to watch", "Movie", false);  // Fetch Movies to watch
        await this.fetchTitleList("TV-series to watch", "TV", false);  // Fetch TV-series to watch
        await this.fetchTitleList("Rewatch these popular titles", null, true);  // Fetch rewatchable popular titles
    }
};
</script>


<style scoped>
.slide-container {
    mask-image: linear-gradient(to right, transparent 0%, white var(--spacing-lg), white calc(100% - var(--spacing-lg)), transparent 100%);
}

.slide {
    background-color: var(--color-background-card);
    /* background-color: transparent; */
    border-radius: var(--border-radius-medium);
    height: 300px;
    width: 200px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
}

.slide .thumbnail {
    background-color: var(--color-background-card-section);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: 1;
}

.slide .gradient {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(0deg, hsla(0, 0%, 0%, 0.75) 0%, hsla(0, 0%, 0%, 0.5) 20%, transparent 40%);
    z-index: 2;
}

.slide .details {
    position: absolute;
    bottom: var(--spacing-sm);
    right: var(--spacing-sm);
    padding: var(--spacing-xs);
    border-radius: var(--border-radius-small);
    
    text-align: end;
    font-weight: 500;
    color: var(--color-text-light);
    font-size: var(--font-size-small);
    z-index: 3;
}

.slide .title-name {
    text-align: right;
    color: var(--color-text-white);
    font-weight: 700;
    font-size: var(--font-size-large);
}

.slide .watched {
    color: var(--color-positive);
}

.slide .title-rating {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    gap: var(--spacing-xs);
}

.full-width-swiper-slide {
    height: 300px;
    width: calc(100% - var(--spacing-hg));
    margin: 0;
    box-sizing: border-box;
    padding-inline: calc(22% - var(--spacing-lg));
    

    color: var(--color-text-light);
    text-align: center;
    font-weight: 500;
    font-size: var(--font-size-medium);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loading-placeholder {
    background: linear-gradient(
        90deg,
        var(--color-background-tr-active) 20%,
        var(--color-background-tr-hover) 50%,
        var(--color-background-tr-active) 80%
    );
    background-size: 200% 100%;
    animation: highlight-wave 2s infinite linear;
}
@keyframes highlight-wave {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>
