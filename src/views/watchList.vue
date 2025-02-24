<template>
    <div>
        <div class="content-width-small">
            <h1>Watch list</h1>
            <p>Here you can find and track movies and TV-series from your watch list. If your watch list is empty you can search for titles to add with the button on the bottom right corner of the screen. </p>
        </div>

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
                >
                    <swiper-slide 
                        v-for="title in titleList.titles" 
                        :key="title.id" 
                        @click="openDetailsPageFor(title.id)"
                        tabindex="0"
                        @keydown.enter="openDetailsPageFor(title.id)"
                        @keydown.space.prevent="openDetailsPageFor(title.id)"
                    >
                        <img 
                            :src="`${apiUrl}/image/${title.id}/poster.jpg`" 
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
                        </div>

                        <div class="tag watched" v-if="title.watch_count >= 1">
                            <!-- <IconCheck size="22px"/> -->
                            Watched
                        </div>
                        <div class="tag recent" v-else-if="new Date(title.release_date) < new Date() && new Date(title.release_date) > new Date(new Date() - 7 * 24 * 60 * 60 * 1000)">
                            Just released
                        </div>
                        <div class="tag" v-else-if="new Date(title.release_date) > new Date()">
                            Upcoming
                        </div>
                        
                        <button 
                            v-if="title.is_favourite"
                            class="tag favourite-button icon-align" 
                            @click.stop="handleFavouriteToggle(title)"
                            :disabled="waitingForResult.length != 0"
                            :class="{loading: waitingForResult.length != 0}"
                        >
                            <IconHeart size="22"/>
                        </button>
                        <button 
                            v-else
                            class="tag favourite-button not-favourite icon-align" 
                            @click.stop="handleFavouriteToggle(title)"
                            :disabled="waitingForResult.length != 0"
                            :class="{loading: waitingForResult.length != 0}"
                        >
                            <IconHeart size="22" color="var(--color-text)"/>
                        </button>
                    </swiper-slide>

                    <swiper-slide 
                        class="full-width-swiper-slide loading-placeholder" 
                        v-if="titleList.titles.length == 0 && titleList.loading"
                    >
                    </swiper-slide>

                    <swiper-slide 
                        class="full-width-swiper-slide" 
                        v-if="titleList.titles.length == 0 && !titleList.loading"
                    >
                        Looks like there's nothing here.<br>
                        <span class="text-hidden">(Tip: Try adding titles to your watch list)</span>
                    </swiper-slide>
                    
                    <div class="slides-indicator-holder">
                        <!-- Minus one since we only use in mobile layout which never reaches the last one -->
                        <IndicatorDots 
                            :dotCount="titleList.titles.length - 1" v-model="titleList.activeSlide"
                            :swiperMode="true"    
                        />
                    </div>
                </Swiper>

             </div>
        </div>

        <div class="content-width-small">
            <h2>Titles listed</h2>
            <p>Here one day will be a list of all the titles where you can fitler and sort them as you wish to find something to watch. It will take a while though since there are so many things that haven't yet been implemented that are far more crucial.</p>
        </div>

        <router-link to="/watch_list/add_title" tabindex="-1">
            <button class="color-primary sticky-corner-button" tabindex="0">
                <IconAdd size="28px"/>
            </button>
        </router-link>
        
    </div>
</template>


<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import IconAdd from '@/components/icons/IconAdd.vue';
import router from '@/router';
import api from '@/utils/dataQuery.js';
import IndicatorDots from '@/components/IndicatorDots.vue';
import IconTMDB from '@/components/icons/IconTMDB.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
// import IconCheck from '@/components/icons/IconCheck.vue';

export default {
    name: 'HomePage',
    components: {
        Swiper,
        SwiperSlide,
        IndicatorDots,
        IconAdd,
        IconTMDB,
        IconHeart,
        // IconCheck,
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_URL,
            waitingForResult: [],
            titleLists: [
                // {
                //     listName: "TESTING",
                //     watched: true,
                //     text: "testing",
                //     titles: [],
                //     loading: true,
                //     activeSlide: 0,
                //     fetchDetails: {
                //         started: true,
                //     }
                // },
                {
                    listName: "In progress",
                    watched: true,
                    text: "TV-series that you have started but have not finished yet.",
                    titles: [],
                    loading: true,
                    activeSlide: 0,
                    fetchDetails: {
                        sortBy: "last_watched",
                        titleType: "tv",
                        started: true,
                        watched: false,
                        released: true,
                    }
                },
                {
                    listName: "Movies to watch",
                    text: "Movies that are on your watch list and that you have yet not watched.",
                    titles: [],
                    loading: true,
                    activeSlide: 0,
                    fetchDetails: {
                        sortBy: "release_date",
                        titleType: "movie",
                        watched: false,
                        released: true,
                    }
                },
                {
                    listName: "TV-series to start watching",
                    text: "TV-series that you are have on you watch list but haven't started to watch yet.",
                    titles: [],
                    loading: true,
                    activeSlide: 0,
                    fetchDetails: {
                        sortBy: "release_date",
                        titleType: "tv",
                        started: false,
                        watched: false,
                        released: true,
                    }
                },
                {
                    listName: "Upcoming titles",
                    watched: true,
                    text: "Upcoming titles you've added to your list.",
                    titles: [],
                    loading: true,
                    activeSlide: 0,
                    fetchDetails: {
                        sortBy: "release_date",
                        released: false,
                    }
                },
                {
                    listName: "Your favourites",
                    watched: true,
                    text: "Your favourite movies and TV-series.",
                    titles: [],
                    loading: true,
                    activeSlide: 0,
                    fetchDetails: {
                        favourite: true,
                    }
                },
                {
                    listName: "Watched titles",
                    watched: true,
                    text: "The titles that you have completed sorted by last modified.",
                    titles: [],
                    loading: true,
                    activeSlide: 0,
                    fetchDetails: {
                        sortBy: "last_watched",
                        watched: true,
                    }
                },
            ],
        };
    },
    methods: {
        openDetailsPageFor(titleID) {
            router.push(`/watch_list/title/${titleID}`);
        },
        formatRuntime(runtime) {
            const hours = Math.floor(runtime / 60);
            const minutes = runtime % 60;
            return hours > 0 ? `${hours}hr ${minutes}min` : `${minutes}min`;
        },
        async fetchTitleLists() {
            try {
                await Promise.all(this.titleLists.map(async (list) => {
                    list.loading = true;
                    try {
                        const titleData = await api.getTitleCards(
                            list.fetchDetails.sortBy,
                            list.fetchDetails.titleType,
                            list.fetchDetails.watched,
                            list.fetchDetails.favourite,
                            list.fetchDetails.released,
                            list.fetchDetails.started,
                        );
                        if (titleData && titleData.titles) {
                            list.titles = titleData.titles;
                            console.debug(list.listName, "titles and their info:", list.titles);
                        }
                    } catch (error) {
                        console.error(`Error fetching data for ${list.listName}:`, error);
                    } finally {
                        list.loading = false;
                    }
                }));
            } catch (error) {
                console.error("Error fetching title lists:", error);
            }
        },
        removeItemFromWaitingArray(item) {
            this.waitingForResult = this.waitingForResult.filter(i => i !== item);
        },
        async handleFavouriteToggle(title) {
            this.waitingForResult.push(`${title.id}Favourite`);
            const response = await api.toggleTitleFavourite(title.id)
            if (response) {
                console.log(response);
                title.is_favourite = !title.is_favourite;
            }
            this.removeItemFromWaitingArray(`${title.id}Favourite`);
        }
    },
    async mounted() {
        await this.fetchTitleLists();
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
    box-shadow: var(--shadow-card);
    /* box-shadow: 0 0 5px black; */
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
    color: var(--color-text-white-light);
    font-size: var(--font-size-small);
    z-index: 3;
}

.swiper-slide .gradient {
    opacity: 0;
}
.swiper-slide .details {
    opacity: 0;
    transform: translateX(15px);
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


/* .swiper-slide .favourite-icon::after {
    content: "";
    height: 40px;
    width: 40px;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    filter: blur(10px);
    top: 0;
    z-index: -1;
    border-radius: 50%;
}
.swiper-slide .favourite-icon::after {
    transform: translate(20%, -20%);
    right: 0;
} */


.swiper-slide .tag {
    position: absolute;
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    z-index: 10;
}

.swiper-slide .watched {
    background-color: var(--color-positive);
}

.swiper-slide .favourite-button {
    color: var(--color-secondary);
    left: auto;
    right: var(--spacing-sm);
    border-radius: 100px;
    margin: 0;
    padding: 6px;
    transform: translateX(2.5px) translateY(-2.5px);
}

.swiper-slide .favourite-button.not-favourite {
    opacity: 0;
    transition: opacity 0.2s ease-out;
}
.swiper-slide:hover .favourite-button.not-favourite {
    opacity: 1;
}
.swiper-slide .favourite-button.not-favourite:focus {
    opacity: 1;
}

.season-after::after {
    content: " seasons, ";
}
.episode-after::after {
    content: " episodes";
}

.full-width-swiper-slide {
    height: calc(300px * 0.95);
    width: calc(100% - var(--spacing-hg)) !important;
    margin: 0;
    margin: calc(300px * 0.025) calc(200px * 0.025);
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
    
    cursor: default;
    transform: none !important;
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
</style>
