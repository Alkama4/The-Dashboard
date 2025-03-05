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
                            :src="`${apiUrl}/image/${title.id}/poster.jpg?width=600`" 
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

                        <div class="tag tag-positive" v-if="title.watch_count >= 1">
                            <!-- <IconCheck size="22px"/> -->
                            Watched
                        </div>
                        <div class="tag tag-primary" v-else-if="new Date(title.release_date) < new Date() && new Date(title.release_date) > new Date(new Date() - 2 * 7 * 24 * 60 * 60 * 1000)">
                            Just released
                        </div>
                        <div class="tag tag-primary" v-else-if="title.new_episodes >= 1">
                            New episodes
                        </div>
                        <div class="tag" v-else-if="new Date(title.release_date) > new Date()">
                            Upcoming
                        </div>
                        
                        <button 
                            v-if="title.is_favourite"
                            class="tag favourite-button button-transparent icon-align" 
                            @click.stop="handleFavouriteToggle(title)"
                            :disabled="waitingForResult.length != 0"
                            :class="{loading: waitingForResult.length != 0}"
                        >
                            <IconHeart size="22"/>
                        </button>
                        <button 
                            v-else
                            class="tag favourite-button button-transparent not-favourite icon-align" 
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
                        class="full-width-swiper-slide content-not-found" 
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

        <div class="content-width-medium">
            <h2>Titles listed</h2>
            <p>Here one day will be a list of all the titles where you can fitler and sort them as you wish to find something to watch. It will take a while though since there are so many things that haven't yet been implemented that are far more crucial.</p>
        </div>

        <div class="content-width-medium all-titles-list-placeholder loading-placeholder" v-if="waitingForResult.includes('allTitlesList')"></div>
        
        <div class="content-width-medium all-titles-list-placeholder content-not-found" v-else-if="allTitlesList && allTitlesList.length == 0">
            Looks like there's nothing here.<br>
            <span class="text-hidden">(Tip: Try adding titles to your watch list)</span>
        </div>

        <div class="content-width-medium all-titles-list" v-else>
            <div class="controls">
                <label for="">Sort by</label>
                <CustomSelect v-model="allTitlesListOptions.sortBy" :options="allTitlesListSortByOptions"/>
                <button @click="allTitlesListOptions.direction = allTitlesListOptions.direction == 'asc' ? 'desc' : 'asc'">
                    <IconSortDown size="22px" v-if="allTitlesListOptions.direction == 'desc'"/>
                    <IconSortUp size="22px" v-if="allTitlesListOptions.direction == 'asc'"/>
                </button>
            </div>

            <div v-for="title in allTitlesList" :key="title.id" class="title">
                <router-link :to="`/watch_list/title/${title.id}`" style="display: flex;">
                    <img 
                        :src="`${apiUrl}/image/${title.id}/poster.jpg?width=300`" 
                        @load="(event) => event.target.classList.add('loaded')" 
                        class="poster"
                    >
                </router-link>
                <div class="content">
                    <router-link class="title-name no-decoration" :to="`/watch_list/title/${title.id}`">
                        <span>{{ title.name }}</span>
                        &MediumSpace;
                        <span class="text-lighter" v-if="title.name != title.name_original">({{ title.name_original }})</span>
                    </router-link>
                    <div class="tags">
                        <div class="tag tag-general">
                            {{ title.type === 'tv' ? 'TV' : 'Movie' }}
                        </div>
                        <div class="tag tag-positive" v-if="title.watch_count >= 1">
                            Watched
                        </div>
                        <div class="tag tag-secondary" v-if="title.is_favourite">
                            Favourite
                        </div>
                        <div class="tag tag-primary" v-if="title.new_episodes">
                            New episodes
                        </div>
                    </div>
                    <div class="details">
                        <div class="detail-list">
                            <span class="icon-align">
                                <IconTMDB style="margin-right: 4px;"/>
                                {{ title.vote_average }}
                                ({{ title.vote_count }})
                            </span>
                            <span>
                                {{ convertToDate(title.release_date) }}
                            </span>
                            <span class="progress-details">
                                <template v-if="title.type === 'tv'">
                                    <span class="season-after">{{ title.season_count }}</span>
                                    <span class="episode-after">{{ title.episode_count }}</span>
                                </template>
                                <template v-else>
                                    {{ formatRuntime(title.movie_runtime) }}
                                </template>
                            </span>
                        </div>
                        <div class="overview">
                            <p>{{ title.overview }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 
            id: 20

        movie_runtime: null
        episode_count: 62
        season_count: 5

            is_favourite: 0
            new_episodes: 0
            type: "tv"
            watch_count: 0 

            name: "Breaking Bad"
            release_date: "2008-01-20"
            vote_average: 8.9
            vote_count: 15078

        STUFF TO ADD:
        tags
        -->

        <router-link to="/watch_list/add_title" tabindex="-1">
            <button class="color-primary sticky-corner-button" tabindex="0">
                <IconAdd size="28px"/>
            </button>
        </router-link>
        
    </div>
</template>


<script>
// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

// My imports
import IconAdd from '@/components/icons/IconAdd.vue';
import router from '@/router';
import api from '@/utils/dataQuery.js';
import IndicatorDots from '@/components/IndicatorDots.vue';
import IconTMDB from '@/components/icons/IconTMDB.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import { convert } from '@/utils/mytools';
import CustomSelect from '@/components/CustomSelect.vue';
import IconSortDown from '@/components/icons/IconSortDown.vue';
import IconSortUp from '@/components/icons/IconSortUp.vue';

export default {
    name: 'HomePage',
    components: {
        Swiper,
        SwiperSlide,
        CustomSelect,
        IndicatorDots,
        IconAdd,
        IconTMDB,
        IconHeart,
        IconSortDown,
        IconSortUp,
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_URL,
            waitingForResult: [],
            titleLists: [
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
                        direction: "asc",
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
            allTitlesList: null,
            allTitlesListOptions: {
                sortBy: 'TMDB rating',
                direction: "asc",
            },
            allTitlesListSortByOptions: ['TMDB rating', 'Release date', 'Modified'],
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
                            list.fetchDetails.direction,
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
        async fetchAllTitlesList(customSortBy = this.allTitlesListOptions.sortBy) {
            this.waitingForResult.push("allTitlesList");
            const titlesListedResponse = await api.listTitles({
                sort_by: customSortBy,
                direction: this.allTitlesListOptions.direction,
            });
            if (titlesListedResponse) {
                this.allTitlesList = titlesListedResponse.titles;
                console.log(this.allTitlesList);
            }
            this.removeItemFromWaitingArray("allTitlesList")
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
        },
        convertToDate(date) {
            return convert.toFiDate(date, "default");
        },
    },
    async mounted() {
        // Use a seperate function because of it's complexity
        await this.fetchTitleLists();

        // Get all the titles listed
        await this.fetchAllTitlesList();
    },
    watch: {
        allTitlesListOptions: {
            deep: true,
            async handler(value) {
                let sortByTranslated;

                switch (value.sortBy) {
                    case 'TMDB rating':
                        sortByTranslated = 'vote_average';
                        break;
                    case 'Release date':
                        sortByTranslated = 'release_date';
                        break;
                    case 'Modified':
                        sortByTranslated = 'latest_updated'
                        break;
                    // case 'Name':
                    //     sortByTranslated = 'name'
                    //     break;

                    // This could be the sum of minutes of all episodes. That way it would be logical?
                    // case 'Length/Episode count': HOW TO HANDLE TV AND MOVIE DIFFERENCE?
                    //     sortByTranslated = 'length'
                    //     break;
                    default:
                        return;
                }

                console.log("New sorting values detected:", sortByTranslated, value.direction);

                await this.fetchAllTitlesList(sortByTranslated);
            }
        }
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
    margin: calc(300px * 0.025) calc(200px * 0.025);
    box-sizing: border-box;
    padding-inline: calc(22% - var(--spacing-lg));
    
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


.all-titles-list-placeholder {
    height: 200px;
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-medium);
    font-weight: 500;
    margin: 0 auto;
}

.all-titles-list {
    display: flex;
    flex-direction: column;
}

.all-titles-list .controls {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    gap: var(--spacing-sm);
    margin: var(--spacing-sm) 0;
}

.all-titles-list .controls button {
    color: var(--color-text-light);
    padding: 0;
    margin: 0;
    aspect-ratio: 1;
    border: 1px solid var(--color-border);
    height: 35px;
    background-color: var(--color-background-input);
    box-sizing: content-box;
    transition: border 0.1s ease-out;
}
.all-titles-list .controls button:hover {
    border-color: var(--color-border-hover);
}

.all-titles-list .title {
    border-top: 2px solid var(--color-border);
    padding: var(--spacing-md) 0;
    gap: var(--spacing-md);
    display: flex;
    flex-direction: row;
    max-height: 200px;
}

.all-titles-list .poster {
    width: 133.33px;
    border-radius: var(--border-radius-small);
}

.all-titles-list .content {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.all-titles-list .title-name {
    color: var(--color-text);
    font-weight: 700;
    font-size: var(--font-size-large);
    margin-top: 0;
    margin-bottom: 0;
    /* gap: var(--spacing-sm); */
    display: flex;
}
.all-titles-list .title-name:hover {
    text-decoration: underline;
}

.all-titles-list .tags {
    display: flex;
    gap: var(--spacing-xs);
    margin: var(--spacing-sm) 0;
}

.all-titles-list .tags .tag {
    font-size: var(--font-size-small);
    padding: 2px 6px;
}


.all-titles-list .details {
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-md);
}

.all-titles-list .detail-list {
    display: flex;
    flex-direction: column;
    min-width: 200px;
}

.all-titles-list p {
    color: var(--color-text-light);
    margin: 0;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Optimize for mobile. Curren't setup not anywhere near */
@media (max-width: 600px) {
    .all-titles-list p {
        display: none;
    }
}

</style>
