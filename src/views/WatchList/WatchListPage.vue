<template>
    <div>
        <div class="content-width-medium">
            <h1>Discover <span class="text-lighter">(Under construction)</span></h1>
            <p>Here you can find and track movies and TV-series from your watch list. If your watch list is empty you can search for titles to add with the button on the bottom right corner of the screen. </p>
        </div>

        <div v-for="(titleList, index) in titleLists" :key="index" class="content-width-large title-list">
            <h2>{{ titleList.listName }}</h2>
            <p class="text-light title-list-text">{{ titleList.text }}</p>

            <CustomCarousel
                :slides="titleList.titles"
                :loading="titleList.loading"
            />
        </div>

        <!-- Corner buttons -->
        <router-link 
            class="sticky-corner-button link-button button-primary"
            to="/watch_list/add_title" 
        >
            <IconAdd size="28px"/>
        </router-link>
    </div>
</template>


<script>
// My imports
import IconAdd from '@/components/icons/IconAdd.vue';
import fastApi from '@/utils/fastApi';
import CustomCarousel from '@/components/CustomCarousel.vue';

export default {
    name: 'HomePage',
    components: {
        CustomCarousel,
        IconAdd,
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
                    text: "The titles you've recently watched or interacted with, such as those you've watched or added to your favorites.",
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
        async fetchTitleLists() {
            try {
                await Promise.all(this.titleLists.map(async (list) => {
                    list.loading = true;
                    try {
                        const titleData = await fastApi.watch_list.titles.cards(
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
    },
    async mounted() {
        this.waitingForResult.push("allTitlesList");

        await this.fetchTitleLists();
    },
};
</script>



<style scoped>
.slide-container {
    /* mask-image: linear-gradient(to right, transparent 0%, white var(--spacing-lg), white calc(100% - var(--spacing-lg)), transparent 100%);
    padding-inline: var(--spacing-lg); */
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
}

.title-list h2 {
    margin-bottom: var(--spacing-xs);
}
.title-list .title-list-text {
    margin-top: var(--spacing-xs);
}

.slides-indicator-holder {
    margin-top: var(--spacing-md);
    width: 100%;
    display: flex;
    justify-content: center;
}

.full-width-swiper-slide {
    height: calc(300px * 0.95);
    width: calc(100% - var(--spacing-hg)) !important;
    margin: calc(300px * 0.025) calc(200px * 0.025);
    box-sizing: border-box;
    
    cursor: default;
    transform: none !important;
}


.all-titles-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.all-titles-list-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: var(--spacing-sm);
    margin: var(--spacing-sm) 0;
}
.all-titles-list-controls .filter-buttons {
    width: 100%;
    column-gap: var(--spacing-sm);
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
}
.filter-buttons .combined-buttons {
    flex: 1;
    white-space: nowrap;
}
.filter-buttons button {
    padding-inline: calc(var(--spacing-md) + var(--spacing-sm));
}

.all-titles-list-controls .search-and-sort {
    width: 100%;
    display: flex;
    column-gap: var(--spacing-sm);
}
.search-and-sort .button-in-text-field {
    flex: 3;
}
.search-and-sort .button-in-text-field .icon-button {
    z-index: var(--z-above-input);
}
.search-and-sort .icon-align {
    flex: 2;
}
.search-and-sort .custom-select {
    width: 100%;
}

.all-titles-list-controls .sort-direction {
    color: var(--color-text-light);
    padding: 0;
    margin: 0;
    aspect-ratio: 1;
    /* border: 1px solid var(--color-border); */
    height: 41px;
    box-sizing: border-box;
    /* background-color: var(--color-background-input); */
    background-color: transparent;
    transition: border 0.1s ease-out;
}
.all-titles-list-controls .sort-direction:hover {
    border-color: var(--color-border-hover);
}

.all-titles-list .title-element {
    --title-height: 210px;
    --padding: var(--spacing-md);
    padding: var(--padding);
    gap: var(--spacing-md);
    display: flex;
    position: relative;
    width: 100%;
    flex-direction: row;
    height: var(--title-height);
    /* box-sizing: border-box; */
    cursor: pointer;
    user-select: none;
    border-radius: var(--border-radius-medium);
    overflow: hidden;
    background-color: var(--color-background-card);
    transition: transform 0.15s var(--cubic-1);
    box-shadow: var(--shadow-card);
    box-sizing: border-box;
    color: var(--color-text-white);
}
.all-titles-list .title-element:hover, 
.all-titles-list .title-element:focus-visible {
    transform: scale(1.025);
}
.all-titles-list .title-element:hover .title-name, 
.all-titles-list .title-element:focus-visible .title-name {
    text-decoration: underline;
}
.all-titles-list .title-element * {
    z-index: 10;
}

.all-titles-list .title-element.loading-placeholder:hover,
.all-titles-list .title-element.loading-placeholder:focus-visible,
.all-titles-list .title-element.content-not-found:hover,
.all-titles-list .title-element.content-not-found:focus-visible {
    transform: scale(1);
}

.backdrop-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(24, 24, 24); /* prevents light bleed */
    overflow: hidden;
    z-index: 0;
}
.title-element .backdrop {
    position: absolute;
    overflow: hidden;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(16px) brightness(0.4);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease-out;
}
.title-element:hover .backdrop,
.title-element:focus-visible .backdrop {
    opacity: 1;
}


.all-titles-list .poster-holder {
    aspect-ratio: 2/3;
    border-radius: var(--border-radius-small);
    background-color: var(--color-background-card);
}
.poster-holder .poster {
    border-radius: var(--border-radius-small);
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.button-in-text-field {
    position: relative;
}

.button-in-text-field .icon-button {
    position: absolute;
    right: var(--spacing-sm);
    top: 50%;
    transform: translateY(-50%);
}

.title-element .content {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.title-element .title-name {
    color: var(--color-text-white);
    font-weight: 700;
    font-size: var(--font-size-large);
    margin-top: 0;
    margin-bottom: 0;
    /* gap: var(--spacing-sm); */
    display: flex;
}

.title-element .tags {
    display: flex;
    gap: var(--spacing-sm);
    margin: 0;
    margin-top: 4px;
    margin-bottom: 12px;
}

.title-element .tags .tag {
    font-size: var(--font-size-small);
    color: var(--color-text);
    padding: 2px 6px;
}


.title-element .details {
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-md);
}

.title-element .detail-list {
    display: flex;
    flex-direction: column;
    min-width: 125px;
}

.title-element p {
    color: var(--color-text-white-light);
    margin: 0;
    display: -webkit-box;
    line-clamp: 4;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Optimize for mobile. Curren't setup not anywhere near */
@media (max-width: 600px) {
    .title-element p {
        display: none;
    }
}

.title-element .appearing-buttons {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    margin: var(--spacing-md);
    gap: var(--spacing-sm);
    opacity: 0;
    transform: translateX(4px);
    transition: opacity 0.2s var(--cubic-1),
                transform 0.2s var(--cubic-1);
}
.title-element:hover .appearing-buttons {
    opacity: 1;
    transform: translateX(0px);
}

.title-element .icon-button.favourite.is-set {
    color: var(--color-secondary);
}
.title-element .icon-button.favourite.is-set:hover {
    color: var(--color-secondary-hover);
}
.title-element .icon-button.favourite.is-set:active {
    color: var(--color-secondary-active);
}


.title-collections {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-md);
}

.title-collections .seperator {
    margin-bottom: var(--spacing-md);   /* Match the gap for a dirty fix */
}

.title-collections .collection {
    width: 500px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: var(--spacing-md);
}

.title-collections .collection .details {
    display: flex;
    flex-direction: column;
    justify-content: left;
}

.title-collections .collection .details h3 {
    margin: 0;
}

</style>
