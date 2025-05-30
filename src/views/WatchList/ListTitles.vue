<template>
    <div class="list-titles">

        <div class="content-width-medium">
            <h1 id="titles_listed">Titles listed <span class="text-lighter">(Under construction)</span></h1>
            <p>Here one day will be a list of all the titles where you can fitler and sort them as you wish to find something to watch. It will take a while though since there are so many things that haven't yet been implemented that are far more crucial.</p>
        </div>
    
        <div class="all-titles-list-controls content-width-medium">
            <div class="filter-buttons">
                <div class="combined-buttons">
                    <button 
                        class="left-button" :class="{'button-primary': allTitlesListOptions.titleType == 'tv'}"
                        @click="allTitlesListOptions.titleType = allTitlesListOptions.titleType == 'tv' ? '' : 'tv'"
                    >
                        TV
                    </button>
                    <button 
                        class="right-button" :class="{'button-primary': allTitlesListOptions.titleType == 'movie'}"
                        @click="allTitlesListOptions.titleType = allTitlesListOptions.titleType == 'movie' ? '' : 'movie'"
                    >
                        Movies
                    </button>
                </div>
                <div class="combined-buttons title-progress">
                    <button 
                        class="left-button" :class="{'button-primary': allTitlesListOptions.titleProgress == 'watched'}"
                        @click="allTitlesListOptions.titleProgress = allTitlesListOptions.titleProgress == 'watched' ? '' : 'watched'"
                    >
                        Watched
                    </button>
                    <button 
                        class="right-button" :class="{'button-primary': allTitlesListOptions.titleProgress == 'unwatched'}"
                        @click="allTitlesListOptions.titleProgress = allTitlesListOptions.titleProgress == 'unwatched' ? '' : 'unwatched'"
                    >
                        Unwatched
                    </button>
                </div>
                <div class="combined-buttons">
                    <button 
                        class="left-button"
                        :class="{'button-primary': allTitlesListOptions.getAllTitles == 'all_titles'}"
                        @click="allTitlesListOptions.getAllTitles = allTitlesListOptions.getAllTitles == 'all_titles' ? '' : 'all_titles'"
                    >
                        All titles
                    </button>
                    <button 
                        class="right-button"
                        :class="{'button-primary': allTitlesListOptions.getAllTitles == 'not_added'}"
                        @click="allTitlesListOptions.getAllTitles = allTitlesListOptions.getAllTitles == 'not_added' ? '' : 'not_added'"
                    >
                        Not added
                    </button>
                </div>
    
                <!-- Possible GUI components -->
                <!-- 
                    (Current three button thing)
                    Tri-state Toggle Button
                    Three-way Radio Button Group
                    Tri-state Checkbox
                    Slider with Three Positions
                -->
            </div>
            <div class="search-and-sort">
                <div class="button-in-text-field">
                    <input 
                        v-model="allTitlesListNonAutoOptions.searchTerm" 
                        type="text" 
                        placeholder="Search titles"
                        @keydown.enter="inputTriggeredFetchAllTitles"
                    >
                    <IconSearch class="icon-button" @click="inputTriggeredFetchAllTitles"/>
                </div>
                <div class="flex icon-align">
                    <CustomSelect 
                        v-model="allTitlesListOptions.sortBy" 
                        :options="allTitlesListSortByOptions"
                    />
                    <button 
                        @click="allTitlesListOptions.direction = allTitlesListOptions.direction == 'asc' ? 'desc' : 'asc'"
                        class="sort-direction"
                        >
                        <IconSortDown size="28px" v-if="allTitlesListOptions.direction == 'desc'"/>
                        <IconSortUp size="28px" v-if="allTitlesListOptions.direction == 'asc'"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- <div class="content-width-medium all-titles-list" v-if="allTitlesList?.length >= 1"> -->
    <div class="content-width-medium all-titles-list">
        <router-link 
            v-for="title in allTitlesList" 
            :key="title.title_id" 
            :to="`/watch_list/title/${title.title_id}`" 
            class="title-element no-decoration"
        >
    
            <div class="backdrop-wrapper">
                <img 
                    :src="backdropUrl(title.title_id)" 
                    @load="(event) => event.target.classList.add('loaded')" 
                    loading="lazy"
                    class="backdrop"
                >
            </div>
    
            <div class="poster-holder">
                <img 
                    :src="posterUrl(title.title_id, 300, title.backup_poster_url)" 
                    @load="(event) => event.target.classList.add('loaded')" 
                    loading="lazy"
                    class="poster"
                >
            </div>
    
            <div class="content">
                <span class="title-name">
                    <span>{{ title.name }}</span>
                    &MediumSpace;
                    <span class="text-lighter" v-if="title.name != title.name_original">({{ title.name_original }})</span>
                </span>
                <div class="tags">
                    <div class="tag tag-positive" v-if="title.watch_count >= 1">
                        Watched
                    </div>
                    <div class="tag tag-secondary" v-if="title.favourite">
                        Favourite
                    </div>
                    <div class="tag tag-primary" v-if="title.new_episodes">
                        New episodes
                    </div>
                    <div class="tag tag-general" v-else-if="new Date(title.release_date) > new Date()">
                        Upcoming
                    </div>
                    <div class="tag tag-general">
                        {{ title.type === 'tv' ? 'TV' : 'Movie' }}
                    </div>
                    <div class="tag tag-general" v-for="genre in title.genres" :key="genre">
                        {{ genre }}
                    </div>
                </div>
                <div class="details">
                    <div class="detail-list">
                        <span class="icon-align">
                            <IconTMDB style="margin-right: 4px;"/>
                            {{ title.tmdb_vote_average }}
                            ({{ title.tmdb_vote_count }})
                        </span>
                        <span>
                            {{ convertToDate(title.release_date) }}
                        </span>
                        <span class="progress-details">
                            <template v-if="title.type === 'tv'">
                                <div class="season-after">{{ title.season_count }}</div>
                                <div class="episode-after">{{ title.episode_count }}</div>
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
            <div class="appearing-buttons">
                <IconHeart 
                    size="28px"
                    :class="{'is-set': title.favourite}" 
                    class="icon-button favourite"
                    @click.prevent="handleFavouriteToggle(title)"
                />
    
                <IconCollection
                    size="28px" 
                    class="icon-button watch-list" 
                    @click.prevent="promptCollections(title.title_id)" 
                />
    
                <IconListRemove 
                    v-if="title.is_in_watchlist" 
                    size="28px" 
                    class="icon-button watch-list" 
                    @click.prevent="handleRemoveTitleFromUserList(title)" 
                />
                <IconListAdd 
                    v-else 
                    size="28px" 
                    class="icon-button watch-list" 
                    @click.prevent="handleAddTitleToUserList(title)" 
                />
            </div>
        </router-link>
    
        <div 
            v-for="i in waitingForResult.includes('allTitlesList') ? Math.max(8 - allTitlesList?.length, 0): 0" 
            :key="'placeholder-' + i" 
            class="title-element loading-placeholder"
        >
        </div>
    
        <div v-if="allTitlesList?.length == 0 && !waitingForResult.includes('allTitlesList')" class="title-element content-not-found">
            Looks like there's nothing here.<br>
            <span class="text-hidden">Try adding titles to your watch list</span>
        </div>
    
        <div class="flex-row">
            <button 
                v-if="allTitlesListHasMore"
                :disabled="waitingForResult.includes('allTitlesList')"
                :class="{'loading': waitingForResult.includes('allTitlesList')}"
                @click="loadMoreTitlesForAllTitlesList"
            >
                Load more
            </button>
        </div>

        <ModalTitleCollections 
            ref="modalTitleCollections" 
            @title-collection-updated="handleTitleCollectionUpdate"
            @collection-updated="handleCollectionUpdate"
        />
        
        <!-- Modals -->
        <ModalConfirmation 
            ref="removeTitleConfirmationModal"
            header="Remove from watchlist"
            text="Are you sure you wan't to remove the title from your watchlist?
            This gets rid of all your data on the title like your watched episodes and notes."
            affirmative-option="Remove title"
        />

    </div>
</template>


<script>
// My imports
import fastApi from '@/utils/fastApi';
import IconTMDB from '@/components/icons/IconTMDB.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import { convert } from '@/utils/utils';
import CustomSelect from '@/components/CustomSelect.vue';
import IconSortDown from '@/components/icons/IconSortDown.vue';
import IconSortUp from '@/components/icons/IconSortUp.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconListAdd from '@/components/icons/IconListAdd.vue';
import IconListRemove from '@/components/icons/IconListRemove.vue';
import ModalConfirmation from '@/components/ModalConfirmation.vue';
import IconCollection from '@/components/icons/IconCollection.vue';
import { standAloneBuild } from '@/utils/config';
import ModalTitleCollections from '@/components/ModalTitleCollections.vue';

export default {
    name: 'HomePage',
    components: {
        CustomSelect,
        ModalConfirmation,
        ModalTitleCollections,
        IconTMDB,
        IconHeart,
        IconSortDown,
        IconSortUp,
        IconSearch,
        IconListAdd,
        IconListRemove,
        IconCollection,
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_URL,
            waitingForResult: [],
            allTitlesList: [],
            allTitlesListHasMore: false,
            allTitlesListOffset: 0,
            allTitlesListNonAutoOptions: {
                searchTerm: '',
            },
            allTitlesListSortByOptions: [
                {label: 'TMDB rating', value: 'vote_average'},
                {label: 'Release date', value: 'release_date'},
                {label: 'Modified', value: 'latest_updated'},
            ],
            allTitlesListOptions: {
                sortBy: 'vote_average',
                direction: "desc",
                titleType: "",
                titleProgress: "",
                getAllTitles: false,
            },
            titleCollectionsData: null,
            selectedTitleIdForCollection: null,
        };
    },
    methods: {
        formatRuntime(runtime) {
            return convert.runtime(runtime);
        },
        async fetchAllTitlesList() {
            this.waitingForResult.push("allTitlesList");

            const options = {
                sort_by: this.allTitlesListOptions.sortBy,
                direction: this.allTitlesListOptions.direction,
                offset: this.allTitlesListOffset,
                all_titles: this.allTitlesListOptions.getAllTitles
            };

            if (this.allTitlesListOptions.titleType)
                options.title_type = this.allTitlesListOptions.titleType;

            if (this.allTitlesListOptions.titleProgress)
                options.watched = this.allTitlesListOptions.titleProgress === 'watched';

            if (this.allTitlesListNonAutoOptions.searchTerm)
                options.search_term = this.allTitlesListNonAutoOptions.searchTerm;
            
            // console.debug("[fetchAlltitlesList] options:", options)
            const titlesListedResponse = await fastApi.watch_list.titles.list(options);

            if (titlesListedResponse) {
                // Replace the whole thing if offset is 0 and if not just append the new ones
                if (this.allTitlesListOffset == 0) {
                    this.allTitlesList = titlesListedResponse.titles;
                } else {
                    this.allTitlesList = this.allTitlesList.concat(titlesListedResponse.titles);
                }

                this.allTitlesListHasMore = titlesListedResponse.has_more;
                console.debug("[fetchAllTitlesList]", this.allTitlesList);
            }
            this.removeItemFromWaitingArray("allTitlesList")
        },
        async loadMoreTitlesForAllTitlesList() {
            this.allTitlesListOffset += 1;
            await this.fetchAllTitlesList();
        },
        removeItemFromWaitingArray(item) {
            this.waitingForResult = this.waitingForResult.filter(i => i !== item);
        },
        async handleFavouriteToggle(title) {
            this.waitingForResult.push(`${title.title_id}Favourite`);
            const response = await fastApi.watch_list.titles.favourite(title.title_id)
            if (response) {
                console.log(response);
                title.favourite = !title.favourite;
                if (title.is_in_watchlist != null) 
                    title.is_in_watchlist = true;
            }
            this.removeItemFromWaitingArray(`${title.title_id}Favourite`);
        },
        convertToDate(date) {
            return convert.toFiDate(date, "default");
        },
        posterUrl(titleId, width, backupUrl) {
            if (standAloneBuild) {
                if (width == 600) width = 500;  // TMDB doesn't have a 600 so use 500 instead
                return `https://image.tmdb.org/t/p/w${width}${backupUrl}`;
            } else {
                return `${this.apiUrl}/media/image/title/${titleId}/poster.jpg?width=${width}`;
            }
        },
        backdropUrl(titleId) {
            // if (process.env.VUE_APP_STANDALONE_BUILD == 'true') {
            //     if (width == 600) width = 500; 
            //     return `https://image.tmdb.org/t/p/w${width}${backupUrl}`;
            // } else {
                return `${this.apiUrl}/media/image/title/${titleId}/backdrop1.jpg?width=600`;
            // }
        },
        async inputTriggeredFetchAllTitles() {
            this.allTitlesListOffset = 0;
            await this.fetchAllTitlesList();
        },
        async handleAddTitleToUserList(title) {
            const response = await fastApi.watch_list.titles.add(title.tmdb_id);
            if (response) {
                title.is_in_watchlist = true;
            }
        },
        async handleRemoveTitleFromUserList(title) {
            const confirmation = await this.$refs.removeTitleConfirmationModal.prompt();
            if (confirmation) {
                const response = await fastApi.watch_list.titles.remove(title.tmdb_id);
                if (response) {
                    title.is_in_watchlist = false;
                    title.watch_count = 0;
                    title.favourite = false;
                }
            }
        },
        // TODO: Update in the future to correctly add a collections name or collection to the title
        handleTitleCollectionUpdate(payload) {
            if (payload.titleInCollection) {
                // const modifiedTitle = this.allTitlesList.find((title) => title.title_id == payload.title.title_id)
                // modifiedTitle.collections.push(payload.collection);
            } else {
                // Pop based on collection data.
            }
        },
        handleCollectionUpdate() {
            // SOMETHING LIKE THIS CAN BE USED TO FIND AND UPDATE VALUES
            // const index = this.titleCollectionsData.findIndex(c => c.collection_id === initialCollection.collection_id);
            // if (index !== -1) {
            //     this.titleCollectionsData[index] = {
            //         ...this.titleCollectionsData[index],
            //         name: editedCollection.name,
            //         description: editedCollection.description
            //     };
            // }
        },
        promptCollections(titleId) {
            this.$refs.modalTitleCollections.prompt(titleId);
        },
    },
    async mounted() {
        this.waitingForResult.push("allTitlesList");

        // Get all the titles listed
        await this.fetchAllTitlesList();
    },
    unmounted() {
        window.removeEventListener('scroll', this.checkScroll);
    },
    watch: {
        allTitlesListOptions: {
            deep: true,
            async handler() {
                await this.inputTriggeredFetchAllTitles();
            }
        }
    }

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
    margin: var(--spacing-sm) auto;
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



</style>
