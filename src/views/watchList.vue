<template>
    <div>
        <div class="content-width-small">
            <h1>Watch list</h1>
            <p>Here you can find and track movies and TV-series from your watch list. If your watch list is empty you can search for titles to add with the button on the bottom right corner of the screen. </p>
        </div>

        <router-link to="/watchList/addTitle">
            <button class="color-primary sticky-corner-button">
                <IconAdd size="28px"/>
            </button>
        </router-link>

        
        <div v-for="(titleList, index) in titleLists" :key="index" class="content-width-large title-list">
            <h2>{{ titleList.listName }}</h2>
            <p class="text-light title-list-text">{{ titleList.text }}</p>
            
            <!-- Show swiper-container only when titles are available and loading is complete -->
            <div class="cards-thing-wrapper">
                <Swiper 
                    space-between="4" 
                    slidesPerView="auto" 
                    class="slide-container"
                    :slidesOffsetBefore=32
                    :slidesOffsetAfter=32
                    :modules="modules"
                >
                    <swiper-slide 
                        v-for="title in titleList.titles" 
                        :key="title.id" 
                        @click="openDetailsPageFor(title.id)"
                    >
                        <img 
                            :src="`http://pibox.lan:800/image/${title.id}/poster.jpg`" 
                            class="thumbnail"
                            @load="(event) => event.target.classList.add('loaded')" 
                        />
                        <div class="gradient"></div>
                        <div class="details">
                            <span class="title-name">{{ title.name }}</span>
                            <div class="title-rating"><IconTMDB/>{{ title.vote_average }} &bullet; {{ new Date(title.release_date).getFullYear() }}</div>
                            <div class="progress-details">
                                <template v-if="title.type === 'tv'">
                                    <span class="season-after">{{ title.season_count }}</span>
                                    <span class="episode-after">{{ title.episode_count }}</span>
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
                    <div class="slides-indicator-holder">
                        <!-- Minus one since we only use in mobile layout which never reaches the last one -->
                        <IndicatorDots :dotCount="titleList.titles.length - 1" v-model="titleList.activeSlide"/>
                    </div>
                </Swiper>

             </div>
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
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { Pagination, Navigation } from 'swiper/modules';
import IconAdd from '@/components/icons/IconAdd.vue';
import router from '@/router';
import api from '@/utils/dataQuery.js';
import IndicatorDots from '@/components/IndicatorDots.vue';
import IconTMDB from '@/components/icons/IconTMDB.vue';

export default {
    name: 'HomePage',
    components: {
        Swiper,      // Register Swiper component
        SwiperSlide,  // Register SwiperSlide component
        IndicatorDots,
        IconAdd,
        IconTMDB,
    },
    data() {
        return {
            // modules: [Pagination, Navigation],
            titleLists: [
                {
                    listName: "Movies to watch",
                    titles: [],
                    loading: true,  // Add loading state for each list
                    activeSlide: 0,
                },
                {
                    listName: "TV-series to watch",
                    titles: [],
                    loading: true,  // Add loading state for each list
                    activeSlide: 0,
                },
                {
                    listName: "Rewatch these popular titles",
                    titles: [],
                    loading: true,  // Add loading state for each list
                    activeSlide: 0,
                },
            ],
        };
    },
    methods: {
        openDetailsPageFor(titleID) {
            // console.debug(titleID);
            router.push(`/watchList/title/${titleID}`);
        },
        formatRuntime(runtime) {
            const hours = Math.floor(runtime / 60);
            const minutes = runtime % 60;
            return `${hours}hr ${minutes}min`;
        },
        // Simplified method to fetch and set title lists
        async fetchTitleList({ name, titleType = null, watched = null, count = null, text = "" } = {}) {
            const titleList = this.titleLists.find(list => list.listName === name);
            try {
                titleList.loading = true;  // Set loading state to true initially
                
                // Fetch titles based on the provided criteria
                const titleData = await api.getTitleCards(titleType, watched, count);
                console.debug(titleData);
                
                // Update titles if available
                if (titleData && titleData.titles) {
                    titleList.titles = titleData.titles;
                }
                titleList.text = text;  // Optionally set a description or text
            } catch (error) {
                console.error(`Error fetching data for ${name}:`, error);
            } finally {
                titleList.loading = false;  // Set loading to false when data is fetched
            }
        }
    },
    async mounted() {
        // Use the fetchTitleList method to load data for each category
        await this.fetchTitleList({
            name: "Movies to watch", 
            titleType: "Movie", 
            watched: false,
            text: "Movies that are on your watch list and that you have yet not watched."
        });
        await this.fetchTitleList({ 
            name: "TV-series to watch", 
            titleType: "TV", 
            watched: false,
            text: "TV-series that you are either in prcess of watching or haven't yet started to."
        });
        await this.fetchTitleList({ 
            name: "Rewatch these popular titles", 
            watched: true,
            text: "The most popular titles that you already have watched."
        }); 
    }
};
</script>


<style scoped>
.slide-container {
    mask-image: linear-gradient(to right, transparent 0%, white var(--spacing-lg), white calc(100% - var(--spacing-lg)), transparent 100%);
}

.title-list h2 {
    margin-bottom: var(--spacing-xs);
}
.title-list .title-list-text {
    margin-top: var(--spacing-xs);
}

.swiper-slide {
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-medium);
    height: 300px;
    width: 200px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    transform: scale(0.95);
    transition: transform 0.15s var(--cubic-1);
}

.swiper-slide .thumbnail {
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

.swiper-slide .gradient {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(0deg, hsla(0, 0%, 0%, 0.8) 0%, hsla(0, 0%, 0%, 0.6) 30%, transparent 60%);
    z-index: 2;
    transition: opacity 0.2s var(--cubic-1);
}

.swiper-slide .details {
    position: absolute;
    bottom: var(--spacing-sm);
    right: var(--spacing-sm);
    padding: var(--spacing-xs);
    border-radius: var(--border-radius-small);
    transition: opacity 0.2s var(--cubic-1),
                transform 0.2s var(--cubic-1);
    
    text-align: end;
    font-weight: 500;
    color: var(--color-text-light);
    font-size: var(--font-size-small);
    z-index: 3;
}

.swiper-slide .gradient {
    opacity: 0;
}
.swiper-slide .details {
    opacity: 0;
    transform: translateX(10%);
}

.slides-indicator-holder {
    margin-top: var(--spacing-md);
    width: 100%;
    display: flex;
    justify-content: center;
}

.swiper-slide .title-name {
    text-align: right;
    color: var(--color-text-white);
    font-weight: 700;
    font-size: var(--font-size-large);

    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.swiper-slide .title-rating {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    gap: var(--spacing-xs);
}


.swiper-slide .watched {
    color: var(--color-positive);
}

.season-after::after {
    content: " seasons, ";
}
.episode-after::after {
    content: " episodes";
}

.full-width-swiper-slide {
    height: 300px;
    width: calc(100% - var(--spacing-hg)) !important;
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

    transform: none !important;
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



@media (max-width: 600px) {
    .swiper-slide .details,
    .swiper-slide .gradient {
        opacity: 1;
        transform: translateX(0%);
    }
    .swiper-slide {
        width: calc((100% - var(--spacing-hg)) / 2);
        height: auto;
        aspect-ratio: 2/3;
    }
    .season-after::after {
        content: "S, ";
    }
    .episode-after::after {
        content: "E";
    }

    .cards-thing-wrapper {
        position: relative;
        height: calc(100vw / 594 * 423.5)
    }
    .cards-thing-wrapper .swiper {
        /* background-color: red; */
        position: absolute;
        top: 0;
        left: -5vw;
        width: 100vw;
    }
    .full-width-swiper-slide {
        height: calc(100vw / 594 * 423.5);
        aspect-ratio: none;
    }
}
@media (min-width: 601px) {
    .swiper-slide:hover .details, .swiper-slide:hover .gradient {
        opacity: 1;
        transform: translateX(0%);
    }
    .slides-indicator-holder {
        display: none;
    }
    .swiper-slide:hover {
        transform: scale(1);
    }
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
