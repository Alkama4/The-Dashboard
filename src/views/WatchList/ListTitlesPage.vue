<template>
    <div class="list-titles">
        <div class="content-width-medium">
            <h1>Search</h1>
            <div class="all-titles-list-controls">
                <div class="basic-options">
                    <input type="text" v-model="allTitlesListOptions.search_term" placeholder="Search for titles">
                    <div class="option-grid ">
                        <label>Type</label>
                        <TriStateToggle
                            button1-text="TV"
                            button2-text="Movies"
                            v-model="allTitlesListOptions.title_type"
                            button1-value="tv"
                            button2-value="movie"
                            :unset-value="null"
                        />
                        <label>Watch Status</label>
                        <CustomSelect
                            v-model="allTitlesListOptions.watch_status"
                            :options="[
                                { label: 'Unwatched', value: 'unwatched' },
                                { label: 'Partially watched', value: 'partially_watched' },
                                { label: 'Fully watched', value: 'fully_watched' }
                            ]"
                            :has-clear-button="true"
                        />
                    </div>
                </div>
                <div class="extra-options" ref="extraOptionsHolder">
                    <div class="option-grid" ref="extraOptions">
                        <label>Favourite</label>
                        <BooleanFitlerToggle
                            v-model="allTitlesListOptions.favourite"
                        />
                        <label>Released</label>
                        <BooleanFitlerToggle
                            v-model="allTitlesListOptions.released"
                        />
                        <label>Season in progress</label>
                        <BooleanFitlerToggle
                            v-model="allTitlesListOptions.season_in_progress"
                        />
                        <label>In watchlist</label>
                        <BooleanFitlerToggle
                            v-model="allTitlesListOptions.in_watchlist"
                        />
                        <label>Has media</label>
                        <BooleanFitlerToggle
                            v-model="allTitlesListOptions.has_media_entry"
                        />
                        <label>Collection</label>
                        <CustomSelect
                            v-model="allTitlesListOptions.collection_id"
                            :options="allTitlesListCollectionOptions"
                            :has-clear-button="true"
                        />
                    </div>
                </div>
                <button
                    @click="toggleExtraOptions()"
                    class="expand-button"
                >
                    {{ extraOptionsVisible ? "Hide options" : "Show more options" }}
                    <div class="icon-align" ref="expandButtonChevron">
                        <IconChevronDown/>
                    </div>
                </button>
                <div class="sortin-options">
                    <div class="flex icon-align">
                        <CustomSelect 
                            v-model="allTitlesListOptions.sort_by" 
                            :options="allTitlesListSortByOptions"
                        />
                        <button 
                            @click="allTitlesListOptions.direction = allTitlesListOptions.direction == 'asc' ? 'desc' : 'asc'"
                            class="sort-direction icon-button"
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
            <div 
                v-for="(title, index) in titlesArray" 
                :key="title.title_id" 
                class="title-element"
                :class="{'active': index == activeTitleIndex}"
                @click="toggleActiveTitleIndex(index)"
                @keydown.enter="toggleActiveTitleIndex(index)"
                tabindex="0"
            >
                <div class="default-content">
                    <div class="backdrop-wrapper">
                        <img 
                            v-if="getMediaUrl(
                                title?.title_images?.backdrop?.[0]?.path, 
                                title?.title_images?.backdrop?.[0]?.source_url
                            )"  
                            :src="getMediaUrl(
                                title?.title_images?.backdrop?.[0]?.path, 
                                title?.title_images?.backdrop?.[0]?.source_url
                            )"     
                            @load="(event) => event.target.classList.add('loaded')" 
                            loading="lazy"
                            class="backdrop"
                        >
                    </div>
            
                    <div class="poster-holder">
                        <img 
                            v-if="getMediaUrl(
                                title?.title_images?.poster?.[0]?.path, 
                                title?.title_images?.poster?.[0]?.source_url,
                                600
                            )"
                            :src="getMediaUrl(
                                title?.title_images?.poster?.[0]?.path, 
                                title?.title_images?.poster?.[0]?.source_url,
                                600
                            )"
                            loading="lazy"
                            class="poster"
                        >
                        <MissingImage v-else/>
                    </div>
            
                    <div class="content">
                        <router-link 
                            :to="`/watch_list/title/${title.title_id}`"
                            class="title-name hover-decoration"
                            tabindex="-1"
                            @click.stop
                        >
                            {{ title.name }}
                            <span class="text-lighter" v-if="title.name !== title.name_original">
                                ({{ title.name_original }})
                            </span>
                        </router-link>
                        <div class="tags">
                            <div class="tag tag-positive" v-if="title.watch_count >= 1">
                                {{ title.watch_count }} watch{{ title.watch_count > 1 ? 'es' : '' }}
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
                            <div class="tag tag-type">
                                {{ title.type === 'tv' ? 'TV' : 'Movie' }}
                            </div>
                            <div class="tag tag-general" v-for="collection in title.collections" :key="collection">
                                {{ collection }}
                            </div>
                        </div>
                        <div class="details">
                            <div class="detail-list">
                                <IconTMDB/>
                                {{ title.tmdb_vote_average }} 
                                <!-- ({{ title.tmdb_vote_count }})  -->
                                &bull;
    
                                {{ converToReleaseYear(title.release_date) }} 
                                &bull;
    
                                {{ title.age_rating }}
                                &bull;
    
                                <template v-if="title.type === 'tv'">
                                    <span class="season">{{ title.season_count }} </span>,
                                    <span class="episode">{{ title.episode_count }} </span>
                                </template>
                                <template v-else>
                                    {{ formatRuntime(title.movie_runtime) }}
                                </template>
                            </div>
                            <p class="overview">
                                {{ title.overview }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="controls-wrapper">
                    <div class="controls">
                        <button 
                            v-if="title.is_in_watchlist" 
                            @click.stop="handleRemoveTitleFromUserList(title)" 
                            @keydown.enter.stop
                            :tabindex="index == activeTitleIndex ? '' : -1"
                        >
                            <IconListRemove 
                                size="22px" 
                                class="icon-button" 
                            />
                        </button>
                        <button 
                            v-else 
                            @click.stop="handleAddTitleToUserList(title)" 
                            @keydown.enter.stop
                            :tabindex="index == activeTitleIndex ? '' : -1"
                        >
                            <IconListAdd 
                                size="22px" 
                                class="icon-button" 
                            />
                        </button>
    
                        <button 
                            @click.stop="promptCollections(title.title_id)" 
                            @keydown.enter.stop
                            :tabindex="index == activeTitleIndex ? '' : -1"
                        >
                            <IconCollection
                                size="22px" 
                                class="icon-button" 
                            />
                        </button>
    
                        <button 
                            @click.stop="handleFavouriteToggle(title)" 
                            @keydown.enter.stop
                            :tabindex="index == activeTitleIndex ? '' : -1"
                        >
                            <IconHeart 
                                size="22px"
                                :class="{'is-set': title.favourite}" 
                                class="icon-button favourite"
                            />
                        </button>
            
                        <router-link 
                            :to="`/watch_list/title/${title.title_id}`"
                            class="link-button no-decoration button-primary"
                            :tabindex="index == activeTitleIndex ? '' : -1"
                            @keydown.enter.stop
                            @click.stop
                        >
                            View details
                        </router-link>
                    </div>
                </div>
            </div>
        
            <div 
                v-for="i in waitingForResult.includes('allTitlesList') ? Math.max(8 - titlesArray?.length, 0): 0" 
                :key="'placeholder-' + i" 
                class="title-element loading-placeholder"
            >
            </div>
        
            <div v-if="titlesArray?.length == 0 && !waitingForResult.includes('allTitlesList')" class="title-element content-not-found">
                <span class="text-hidden">Try adding titles to your watch list or widening your search.</span>
            </div>
        
            <div class="flex-row">
                <button 
                    v-if="hasMore"
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
    </div>
</template>


<script>
// My imports
import fastApi from '@/utils/fastApi';
import IconTMDB from '@/components/icons/IconTMDB.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import { convert, getMediaUrl } from '@/utils/utils';
import CustomSelect from '@/components/common/CustomSelect.vue';
import IconSortDown from '@/components/icons/IconSortDown.vue';
import IconSortUp from '@/components/icons/IconSortUp.vue';
import IconListAdd from '@/components/icons/IconListAdd.vue';
import IconListRemove from '@/components/icons/IconListRemove.vue';
import ModalConfirmation from '@/components/common/ModalConfirmation.vue';
import IconCollection from '@/components/icons/IconCollection.vue';
import ModalTitleCollections from '@/components/WatchList/ModalTitleCollections.vue';
import TriStateToggle from '@/components/common/TriStateToggle.vue';
import BooleanFitlerToggle from '@/components/common/BooleanFitlerToggle.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import MissingImage from '@/components/common/MissingImage.vue';

export default {
    name: 'ListTitlesPage',
    components: {
        CustomSelect,
        ModalConfirmation,
        ModalTitleCollections,
        TriStateToggle,
        BooleanFitlerToggle,
        MissingImage,
        IconTMDB,
        IconHeart,
        IconSortDown,
        IconSortUp,
        IconListAdd,
        IconListRemove,
        IconCollection,
        IconChevronDown,
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_URL,
            waitingForResult: [],
            titlesArray: [],
            hasMore: false,
            page: 1,
            allTitlesListSortByOptions: [
                {label: 'Watched/Modified', value: 'last_updated'},
                {label: 'TMDB Rating', value: 'rating'},
                {label: 'Popularity', value: 'popularity'},
                {label: 'Release Date', value: 'release_date'},
                {label: 'Title name', value: 'title_name'},
                {label: 'Duration', value: 'duration'},
                {label: 'Details updated', value: 'data_updated'},
            ],
            allTitlesListCollectionOptions: [],
            allTitlesListOptionsDefaults: {
                title_type: null,
                collection_id: null,
                in_watchlist: null,
                watch_status: null,
                favourite: null,
                released: null,
                has_media_entry: null,
                sort_by: 'last_updated',
                direction: 'desc',
            },
            allTitlesListOptions: {},
            titleCollectionsData: null,
            selectedTitleIdForCollection: null,
            extraOptionsVisible: false,
            activeTitleIndex: null,
            posterNotFound: [],
        };
    },
    methods: {
        formatRuntime(runtime) {
            return convert.toRuntime(runtime);
        },
        updateQueryParam(key, value) {
            const query = { ...this.$route.query };

            if (value === this.allTitlesListOptionsDefaults[key] || value == null) {
                delete query[key];
            } else {
                query[key] = value;
            }

            this.$router.replace({ query });
        },
        async fetchAllTitlesList() {
            this.waitingForResult.push("allTitlesList");

            const options = Object.fromEntries(
                Object.entries(this.$route.query).map(([k, v]) => [k, this.castQueryValue(k, v)])
            );

            const titlesListedResponse = await fastApi.watch_list.titles.list({
                ...options,
                page: this.page
            });

            if (titlesListedResponse) {
                if (this.page === 1) {
                    this.titlesArray = titlesListedResponse.titles;
                } else {
                    this.titlesArray = this.titlesArray.concat(titlesListedResponse.titles);
                }
                this.hasMore = titlesListedResponse.has_more;
            }

            this.removeItemFromWaitingArray("allTitlesList");
        },
        async fetchCollectionOptions() {
            const response = await fastApi.watch_list.options.collections();
            if (response) {
                this.allTitlesListCollectionOptions = response.map(item => ({
                    label: item.name,
                    value: item.collection_id
                }));
            }
        },
        async loadMoreTitlesForAllTitlesList() {
            this.page += 1;
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
        converToReleaseYear(date) {
            return convert.toFiDate(date, "year");
        },
        getMediaUrl(path, sourceUrl, width) {
            return getMediaUrl(path, sourceUrl, width);
        },
        async inputTriggeredFetchAllTitles() {
            this.page = 1;
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
        promptCollections(titleId) {
            this.$refs.modalTitleCollections.prompt(titleId);
        },
        toggleExtraOptions() {
            if (!this.extraOptionsVisible) {
                // Expand
                this.$refs.extraOptionsHolder.style.height = this.$refs.extraOptions.scrollHeight + 8 + "px";
                setTimeout(() => {
                    this.$refs.extraOptionsHolder.classList.add('open');
                }, 200)
                this.$refs.expandButtonChevron.classList.add('rotated');
            } else {
                // Collapse
                this.$refs.extraOptionsHolder.style.height = "0px";
                this.$refs.extraOptionsHolder.classList.remove('open');
                this.$refs.expandButtonChevron.classList.remove('rotated');
            }
            this.extraOptionsVisible = !this.extraOptionsVisible
        },
        toggleActiveTitleIndex(newActive) {
            if (newActive != this.activeTitleIndex)
                this.activeTitleIndex = newActive;
            else {
                this.activeTitleIndex = null;
            }
        },
        handleResize() {
            if (this.extraOptionsVisible) {
                this.$refs.extraOptionsHolder.style.height = this.$refs.extraOptions.scrollHeight + 8 + "px";
            }
        },
        castQueryValue(key, val) {
            const boolKeys = [
                'in_watchlist',
                'favourite',
                'released',
                'has_media_entry',
            ];
            const intKeys = ['collection_id'];
            const enumKeys = ['watch_status'];   // ← new

            if (val === null || val === 'null') return null;
            if (boolKeys.includes(key)) return val === 'true';
            if (intKeys.includes(key)) return Number(val);
            if (enumKeys.includes(key)) return val; // string stays as is
            return val;
        },
    },
    computed: {
        searchQuery() {
            return this.$route.query.q || ''
        }
    },
    async mounted() {
        for (const key in this.allTitlesListOptionsDefaults) {
            const queryVal = this.$route.query[key];
            this.allTitlesListOptions[key] = 
                queryVal !== undefined 
                    ? this.castQueryValue(key, queryVal) 
                    : this.allTitlesListOptionsDefaults[key];
        }

        // Fetch options
        await this.fetchCollectionOptions();

        // Do not need to fetch for the data itself, since its automatically fetched 
        // when the empty array is populated with the default values.

        window.addEventListener('resize', this.handleResize);
    },
    unmounted() {
        // Why does this exist? Left overs? Might be used to get rid of extra modal stuff that lingers? If so should be handled in other ways.
        window.removeEventListener('scroll', this.checkScroll);

        window.removeEventListener('resize', this.handleResize);

    },
    watch: {
        allTitlesListOptions: {
            deep: true,
            handler() {
                const query = { ...this.$route.query };

                for (const key in this.allTitlesListOptions) {
                    // if (key === 'search_term') continue;

                    const val = this.allTitlesListOptions[key];
                    const defaultVal = this.allTitlesListOptionsDefaults[key];

                    // Only keep the param when it differs from the default
                    if (val == undefined || val === defaultVal) {
                        delete query[key];
                    } else {
                        query[key] = val;
                    }
                }

                this.$router.replace({ query });
            },
        },

        '$route.query': {
            immediate: true,
            deep: true,
            handler(newQuery) {
                // map params into local state
                for (const key in this.allTitlesListOptionsDefaults) {
                    if (key === 'search_term') continue;

                    this.allTitlesListOptions[key] =
                        newQuery[key] !== undefined
                        ? this.castQueryValue(key, newQuery[key])
                        : this.allTitlesListOptionsDefaults[key];
                }

                // fetch with actual query params (not allTitlesListOptions)
                this.page = 1;
                this.fetchAllTitlesList();
            },
        },
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
    width: calc(100% - var(--spacing-xl)) !important;
    margin: calc(300px * 0.025) calc(200px * 0.025);
    box-sizing: border-box;
    
    cursor: default;
    transform: none !important;
}


.all-titles-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding-top: var(--spacing-md);
}

/* all-titles-list-controls */
.all-titles-list-controls {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    margin-top: var(--spacing-md);
}
.all-titles-list-controls .margin-fix {
    margin-top: var(--spacing-sm);
}


.all-titles-list-controls .sortin-options {
    width: 100%;
    display: flex;
    justify-content: end;
    column-gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
}
.sortin-options .icon-align {
    width: 300px;
    max-width: 100%;
}
.sortin-options .custom-select {
    width: 100%;
    min-width: 170px;
}

.all-titles-list-controls .extra-options {
    height: 0px;
    overflow: hidden;
    transition: height 0.2s ease-out;
}
.all-titles-list-controls .extra-options.open {
    overflow: visible;
}
.extra-options .custom-select {
    width: 100%;
}
.option-grid {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto 1fr;
    column-gap: var(--spacing-sm);
    row-gap: var(--spacing-xs);
}
@media(max-width: 850px) {
    .option-grid {
        grid-template-columns: auto 1fr;
    }
}
.option-grid label {
    margin: 0;
    align-items: center;
    margin-right: var(--spacing-md);
    display: flex;
    white-space: nowrap;
}
.option-grid .custom-select {
    width: 100%;
}

.basic-options {
    margin-bottom: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.expand-button .rotated {
    transform: rotate(180deg);
}


.all-titles-list-controls .sort-direction {
    margin: 0;
    aspect-ratio: 1;
    padding: 0 var(--spacing-sm);
    height: 40px;
    box-sizing: border-box;
    background-color: transparent;
}

.all-titles-list .title-element {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    min-height: 210px;
    height: fit-content;
    cursor: pointer;
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    background-color: var(--color-background-card);
    transition: transform 0.15s var(--cubic-1);
    box-shadow: var(--shadow-card);
    box-sizing: border-box;
    border: 1px solid var(--color-border);
}


.all-titles-list .title-element .default-content {
    padding: var(--spacing-md);
    display: flex;
    flex-direction: row;
    position: relative;
    height: fit-content;
    column-gap: var(--spacing-md);
    width: 100%;
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    transition: transform 0.15s var(--cubic-1);
    box-shadow: var(--shadow-card);
    box-sizing: border-box;
}

.all-titles-list .title-element .controls {
    display: grid;
    column-gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    grid-template-columns: 1fr 1fr 1fr 2.5fr;
}
.all-titles-list .title-element .controls-wrapper {
    transition: height 0.2s ease-out;
    height: 0px;
}
.all-titles-list .title-element.active .controls-wrapper {
    height: 56px;
}
.all-titles-list .title-element .controls > * {
    white-space: nowrap;
    padding-inline: 0;
}
/* .all-titles-list .title-element:hover, 
.all-titles-list .title-element:focus-visible {
    transform: scale(1.025);
} */
.all-titles-list .title-element * {
    z-index: 10;
}

.backdrop-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-background-card); /* prevents light bleed */
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
    filter: blur(16px) opacity(0.4);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease-out;
}
.title-element.active .backdrop {
    opacity: 1;
}


.all-titles-list .poster-holder {
    height: 210px;
    width: 140px;
    min-width: 140px;
    border-radius: var(--border-radius-sm);
    background-color: var(--color-background-card-section);
    overflow: hidden;
}
.poster-holder .poster {
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
    font-weight: 700;
    font-size: var(--font-size-xl);
    margin-top: 0;
    margin-bottom: 0;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* gap: var(--spacing-sm); */
}

.title-element .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin: 0;
    margin-top: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
}

.title-element .tags .tag {
    color: var(--color-text);
    padding: 2px 6px;
}

.title-element .details {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.title-element .detail-list {
    color: var(--color-text-light);
    display: inline;
    min-width: 125px;
}
.title-element .detail-list svg {
    vertical-align: middle;
}

.detail-list .season::after {
    content: " season";
}
.detail-list .episode::after {
    content: " episode";
}


.title-element p {
    margin: 0;
    display: -webkit-box;
    line-clamp: 4;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@media (max-width: 600px) {
    .detail-list .season::after {
        content: "S";
    }
    .detail-list .episode::after {
        content: "E";
    }
    .title-element .details {
        font-size: var(--font-size-sm);
        gap: var(--spacing-xs);
    }
    .title-element .tags {
        margin-top: var(--spacing-xs);
        margin-bottom: var(--spacing-xs);
    }
    .title-element .tags .tag {
        font-size: var(--font-size-xs);
    }
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
