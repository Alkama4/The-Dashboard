<template>
    <div class="title-info" v-if="titleInfo">
        <img class="original-image" :src="'https://image.tmdb.org/t/p/original' + titleInfo.backdrop_url" alt=" " />
        <img class="wide-image" :src="'https://image.tmdb.org/t/p/original' + titleInfo.backdrop_url" alt=" " />

        <div class="content-width-medium">
            <div class="name-and-tagline">
                <h1 class="title-name">
                    <span :title="titleInfo.name">
                        {{ titleInfo.name }} 
                    </span>
                    <span :title="titleInfo.original_name" v-if="titleInfo.name !== titleInfo.original_name" class="original-title">
                        ({{ titleInfo.original_name }})
                    </span>
                </h1>

                <q class="tagline" v-if="titleInfo.tagline">{{ titleInfo.tagline }}</q>
            </div>

            <h2>Genres</h2>
            <div class="genres flex">
                <div class="genre" v-for="genre in titleInfo.title_genres" :key="genre">{{ genre }}</div>
            </div>
            
            <div style="position: relative;">
                <div class="mark-watched">
                    <button 
                        class="color-primary" 
                        v-if="titleInfo.user_watch_count == 0"
                        @click="handleTitleWatchClick('title', 'watched')"
                        :disabled="waitingForResult.includes('titleWatched')"
                        :class="{loading: waitingForResult.includes('titleWatched')}"
                    >
                        Mark watched
                    </button>
                    <div v-else class="combined-buttons">
                        <button 
                            class="left-button color-primary" 
                            @click="handleTitleWatchClick('title', 'watched')" 
                            :disabled="waitingForResult.includes('titleWatched')"
                            :class="{loading: waitingForResult.includes('titleWatched')}"
                            title="Add a single watch to the watch count"
                        >
                            Add a watch
                        </button>
                        <button 
                            class="right-button color-warning" 
                            @click="handleTitleWatchClick('title', 'unwatched')" 
                            :disabled="waitingForResult.includes('titleWatched')"
                            :class="{loading: waitingForResult.includes('titleWatched')}"
                            title="Remove a watch from the watch count"
                        >
                            Remove a watch
                        </button>
                    </div>
                </div>
                <h2>Details</h2>
                <div class="details">
                    <div>Watched status</div>
                    <div class="value">

                        <template v-if="titleInfo.user_watch_count == 1">
                            Watched
                        </template>
                        <template v-else-if="titleInfo.user_watch_count > 1">
                            Watched {{ titleInfo.user_watch_count }} times
                        </template>
                        <template v-else>
                            Unwatched
                        </template>
                    </div>
                    <div>TMDB average score</div>
                    <div class="value"><IconTMDB style="margin-right: 4px;"/>{{ titleInfo.tmdb_vote_average }} ({{ titleInfo.tmdb_vote_count.toLocaleString("fi-FI") }} votes)</div>
                    <div>Release date</div>
                    <div class="value">{{ new Date(titleInfo.release_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) }}</div>
                </div>
                <h3>Metadata</h3>
                <div class="details">
                    <div>Title type</div>
                    <div class="value">{{ titleInfo.type }}</div>
                    <div>IMDB id</div>
                    <div><a :href="`https://www.imdb.com/title/${this.titleInfo.imdb_id}`">{{ titleInfo.imdb_id }}</a></div>
                    <div>TMDB id</div>
                    <div><a :href="`https://www.themoviedb.org/${this.titleInfo.type}/${this.titleInfo.tmdb_id}`">{{ titleInfo.tmdb_id }}</a></div>
                    <div>Title Last Updated <InfoTooltip text="When a title is added to the watch list for the first time, its details are cached on the server. The data is only updated when manually refreshed using the refresh button." position="right"/></div>
                    <div class="value">{{ new Date(titleInfo.title_info_last_updated).toLocaleDateString("fi-FI") }}</div>
                </div>
            </div>

            <button 
                @click="handleTitleUpdate"
                :disabled="waitingForResult.includes('titleUpdate')"
                :class="{loading: waitingForResult.includes('titleUpdate')}"
                class="update-title-button"
                title="Fetches and updates all non-user related data for the title, such as details, images, season, and episode information."
            >
                Update title details
            </button>

    
            <h2>Overview</h2>
            <p>{{ titleInfo.overview }}</p>
            
            <h2>Notes <InfoTooltip :text="`Watch count or notes last saved on ${new Date(titleInfo.user_title_last_updated).toLocaleDateString('fi-FI')}`" position="right"/></h2>
            <textarea class="notes-text-area" v-model="this.titleInfo.user_title_notes" placeholder="Write your notes, thoughts, favorite moments, or timestamps here..."></textarea>
            <button 
                @click="handleNotesSave"
                :disabled="waitingForResult.includes('saveNotes')"
                :class="{loading: waitingForResult.includes('saveNotes')}"
                class="save-notes-button" 
            >
                Save notes
            </button>
        </div>

        <div v-for="season in titleInfo.seasons" 
            :key="season.season_id" 
            class="card season content-width-large" 
            :class="{'active': expandedSeason == season.season_id}"
        >

            <div class="about" @click="toggleHeight(`ref${season.season_id}`)">
                <img class="season-poster" :src="'https://image.tmdb.org/t/p/w200' + season.poster_url" alt=" " />
                <div class="text">
                    <h2>{{ season.season_name }}</h2>
                    <div class="details">
                        {{ season.episode_count }} episodes • {{ season.vote_average }} <br>
                        {{ season.episodes.length > 0 ? new Date(season.episodes[0].air_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) : "No release date"}}
                    </div>
                    <p :title="season.overview">{{ season.overview }}</p>
                    <button 
                        class="modify-watched color-primary"
                        v-if="season.episodes.length === 0 || 0 === season.episodes.reduce((min, ep) => Math.min(min, ep.watch_count), Infinity)"
                        @click.stop="handleTitleWatchClick('season', 'watched', season.season_id)"
                        :disabled="waitingForResult.includes('titleWatched')"
                        :class="{loading: waitingForResult.includes('titleWatched')}"
                    >
                        Mark Watched
                    </button>
                    <div v-else class="modify-watched combined-buttons">
                        <button 
                            class="left-button color-primary" 
                            @click.stop="handleTitleWatchClick('season', 'watched', season.season_id)" 
                            :disabled="waitingForResult.includes('titleWatched')"
                            :class="{loading: waitingForResult.includes('titleWatched')}"
                            title="Add a single watch to the watch count"
                        >
                            <IconAdd/>Watch
                        </button>
                        <button 
                            class="right-button color-warning" 
                            @click.stop="handleTitleWatchClick('season', 'unwatched', season.season_id)" 
                            :disabled="waitingForResult.includes('titleWatched')"
                            :class="{loading: waitingForResult.includes('titleWatched')}"
                            title="Remove a watch from the watch count"
                        >
                            <IconRemove/>Remove
                        </button>
                    </div>
                </div>
            </div>

            <div class="episodes" :ref="`ref${season.season_id}`">
                <div class="episodes-padding">
                    <div v-for="episode in season.episodes" :key="episode.episode_number" class="episode">
                        <img class="still" :src="'https://image.tmdb.org/t/p/w300' + episode.still_url" alt=" " >
                        <div class="text">
                            <h3 :title="episode.episode_name">{{ episode.episode_number }}. {{ episode.episode_name }}</h3>
                            <div class="details" :title="`${episode.vote_count} votes`">
                                {{ formatRuntime(episode.runtime) }} • {{ episode.vote_average }} <br>
                                {{ episode.air_date ? new Date(episode.air_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) : "No release date"}}
                            </div>
                            <p :title="episode.overview">{{ episode.overview }}</p>
                            <button 
                                class="modify-watched color-primary"
                                v-if="episode.watch_count == 0"
                                @click="handleTitleWatchClick('episode', 'watched', episode.episode_id)"
                                :disabled="waitingForResult.includes('titleWatched')"
                                :class="{loading: waitingForResult.includes('titleWatched')}"
                            >
                                Mark Watched
                            </button>
                            <div v-else class="modify-watched combined-buttons">
                                <button 
                                    class="left-button color-primary" 
                                    @click="handleTitleWatchClick('episode', 'watched', episode.episode_id)" 
                                    :disabled="waitingForResult.includes('titleWatched')"
                                    :class="{loading: waitingForResult.includes('titleWatched')}"
                                    title="Add a single watch to the watch count"
                                >
                                    <IconAdd/>Watch
                                </button>
                                <button 
                                    class="right-button color-warning" 
                                    @click="handleTitleWatchClick('episode', 'unwatched', episode.episode_id)" 
                                    :disabled="waitingForResult.includes('titleWatched')"
                                    :class="{loading: waitingForResult.includes('titleWatched')}"
                                    title="Remove a watch from the watch count"
                                >
                                    <IconRemove/>Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </div>
</template>

  
<script>
import api from '@/utils/dataQuery';
import router from '@/router';
import { notify } from '@/utils/notification';
import InfoTooltip from '@/components/InfoTooltip.vue';
import IconTMDB from '@/components/icons/IconTMDB.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import IconRemove from '@/components/icons/IconRemove.vue';

export default {
    data() {
        return {
            titleID: this.$route.params.titleID,
            titleInfo: null,
            expandedSeason: null,
            waitingForResult: [],
        };
    },
    components: {
        InfoTooltip,
        IconTMDB,
        IconAdd,
        IconRemove
    },
    methods: {
        formatRuntime(runtime) {
            const hours = Math.floor(runtime / 60);
            const minutes = runtime % 60;
            return hours > 0 ? `${hours}hr ${minutes}min` : `${minutes}min`;
        },
        toggleHeight(refKey) {
            const element = this.$refs[refKey]?.[0]; // Get the first element
            if (!element) return;

            if (!element.style.height || element.style.height === "0px") {
                element.style.height = element.scrollHeight + "px"; // Expand
            } else {
                element.style.height = "0px"; // Collapse
            }
        },
        // make this go through a MODAL?
        async handleTitleWatchClick(titleOrSeasonOrEpisode, watchedOrUnwatched, customID) {
            this.waitingForResult.push("titleWatched");
                
            // A funny little if else where it gets whether we are getting tv, movie, season or episode
            let type = "";
            if (titleOrSeasonOrEpisode == "title") {
                type = this.titleInfo.type;
            } else {
                type = titleOrSeasonOrEpisode;
            }

            // Select the correct id eg. title_id, season_id etc.
            let selectedTypesID = 0;
            if (customID)  {
                selectedTypesID = customID;
            } else {
                selectedTypesID = this.titleInfo.title_id
            }

            const response = await api.modifyTitleWatchCount(type, selectedTypesID, watchedOrUnwatched)
            if (response) {
                console.log(response)

                // OVERKILL BUT WORKS FOR NOW. LATER MAKE IT EDIT IT LOCALLY INSTEAD
                this.queryTitleData();
            }
            this.removeItemFromWaitingArray("titleWatched");
        },
        async handleNotesSave() {
            this.waitingForResult.push("saveNotes");

            const response = await api.saveTitleNotes(this.titleInfo.title_id, this.titleInfo.user_title_notes)
            if (response) {
                console.log(response);
                notify(response.message, "success");
            }
            
            this.removeItemFromWaitingArray("saveNotes");
        },
        async handleTitleUpdate() {
            this.waitingForResult.push("titleUpdate");
            const response = await api.updateTitleInfo(this.titleInfo.tmdb_id, this.titleInfo.type)
            if (response) {
                // console.log(response);
                notify("Title information updated successfully!", "success")
                this.queryTitleData();
            }
            this.removeItemFromWaitingArray("titleUpdate");
        },
        removeItemFromWaitingArray(item) {
            this.waitingForResult = this.waitingForResult.filter(i => i !== item);
        },
        async queryTitleData() {
            // Query the details from api for the title here:
            const response = await api.getTitleInfo(this.titleID);
            if (response && response.title_info) {
                if (response.title_info.length !== 0) {
                    this.titleInfo = response.title_info;
                    console.log("Stored values: ", this.titleInfo)
                } else {
                    notify("The title doesn't exist!", "error");
                    router.push("/watchlist");
                }
            }
        }
    },
    async mounted() {
        this.queryTitleData();
    }
};
</script>

  
<style scoped>

.title-info {
    --max-image-height: 810px;
    --text-offset: 60px;
    --text-original: calc(var(--max-image-height) - var(--text-offset));
    --cutoff-thing: calc((100vw - min(var(--text-original) + var(--text-offset), 100vw) / (9/16)) / 2 );
    --cutoff-thing-other: calc(100vw - var(--cutoff-thing));

    margin-top: calc( min( 100vw * (9/16) - var(--text-offset), var(--text-original)));
}

.title-info .original-image {
    z-index: -10;
    position: absolute;
    max-height: calc(var(--text-original) + var(--text-offset));
    width: auto; /* Prevent stretching */
    left: 50%; /* Center horizontally */
    top: 60px;
    transform: translateX(-50%); /* Ensure perfect centering */
    mask-image: linear-gradient(to top, transparent 0%, white 50%);
    object-fit: contain; /* Ensure it scales properly without distortion */
}
.title-info .wide-image {
    z-index: -11;
    position: absolute;
    width: 100vw;
    max-height: calc(var(--text-original) + var(--text-offset));
    left: 0;
    top: 60px;
    mask-image: linear-gradient(to top, transparent 0%, white 50%), 
                linear-gradient(to right, transparent calc(var(--cutoff-thing) + 0.2px), white var(--cutoff-thing), 
                                        white var(--cutoff-thing-other), transparent var(--cutoff-thing-other));
    mask-composite: subtract;
    object-fit: cover; /* Ensure it scales properly without distortion */
    filter: blur(1vw) brightness(0.5);
}
/* Hide the extra image when not visible. True limit is 1440px, but 1400 used to avoid bugs */
@media (max-width: 1400px) {
    .title-info .wide-image {
        display: none;
    }
}

/* Maybe try and pop the orignial to next row when it would overflow or wrap */
.title-info .title-name {
    margin-bottom: 0;
}
.title-info .title-name .original-title {
    color: var(--color-text-lighter)
}
.title-info .tagline {
    color: var(--color-text-light);
}

.title-info .genres {
    gap: var(--spacing-xs);
    flex-wrap: wrap;
    overflow: hidden;
    height: 32px;
    /* margin: var(--spacing-md) 0; */
}
.title-info .genre {
    padding: var(--spacing-xs);
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-small);
    font-size: var(--font-size-small);
    font-weight: 500;
    white-space: nowrap;
}

.mark-watched {
    position: absolute;
    top: 0;
    right: 0;
}
.mark-watched button {
    padding-inline: var(--spacing-lg);
    white-space: nowrap;
    margin: 0;
}

@media (max-width: 720px) {
    .mark-watched {
        position: relative;
        width: 100%;
        margin: var(--spacing-lg) 0;
    }
}

/* - - - - - VALUES AND DETAILS - - - - -  */
.title-info h2{
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
}
.title-info h3 {
    margin-top: var(--spacing-sm);
    margin-bottom: 0;
}
.title-info .details {
    color: var(--color-text-light);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: var(--spacing-md);
}
.title-info .details .value {
    color: var(--color-text);
    display: flex;
    flex-direction: row;
    align-items: center;
}

.title-info ul {
    list-style: disc;
    margin: var(--spacing-sm);
    padding-left: var(--spacing-md);
}
.title-info a {
    color: var(--color-text);
    text-decoration: none;
}
.title-info a:hover {
    text-decoration: underline;
}

.title-info .times-watched {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    width: fit-content;
}
.title-info .times-watched button {
    margin: 0;
    /* padding: var(--spacing-xs) var(--spacing-md); */
}

.title-info .notes-text-area {
    margin-top: var(--spacing-sm);
}

.title-info .update-title-button {
    margin: var(--spacing-md) 0;
}

@media (min-width: 600px) {
    .title-info {
        --text-offset: 150px;
    }
}

@media (min-width: 900px) {
    .title-info {
        --text-offset: 225px;
    }
    .title-info .title-name {
        font-size: 48px;
    }
}


/* - - - - - SEASON - - - - -  */
.season {
    position: relative;
    padding-bottom: 0;
}
/* Could have a transition here but honestly can't see it so not worth it */
.season.active {
    padding-bottom: var(--spacing-md);
}

.season .about {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
    cursor: pointer;
}
.season h2 {
    margin: 0;
}
.season-poster {
    height: 200px;
    width: 133.33px;
    min-width: 133.33px;
    background-color: var(--color-background-card-section);
    border-radius: var(--border-radius-medium);
}
.season .about p {
    margin-bottom: 0;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.season .details {
    color: var(--color-text-light);
}

.season .episodes {
    box-sizing: border-box;
    height: 0px;
    overflow: hidden;
    transition: height 0.3s cubic-bezier(.3,.63,.4,1),
                margin-top 0.3s cubic-bezier(.3,.63,.4,1);
    margin-top: var(--spacing-md);
}
.season .episodes-padding {
    display: flex;
    flex-direction: column;
    /* gap: var(--spacing-sm); */
    border-radius: var(--border-radius-medium);    
    background-color: var(--color-background-card-section);
    padding: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}

.season .modify-watched {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    margin: 0;
    width: 300px;
}

/* - - - - - EPISODE - - - - -  */
.episode {
    position: relative;
    background-color: var(--color-background-card-section);
    padding: var(--spacing-md);
    margin: 0;
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
    border-radius: var(--border-radius-medium);
    transition: background-color 0.1s ease-out;
}
.episode:hover {
    background-color: var(--color-background-tr-hover);
}
.episode h3 {
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: calc(100% - 300px);
}
.episode .still {
    width: 300px;
    min-width: 300px;
    border-radius: var(--border-radius-medium);
    object-fit: contain;
    aspect-ratio: 16/9;
    background-color: var(--color-background-card);
}
.episode .text {
    /* padding-top: var(--spacing-sm); */
    width: 100%;
}
.episode .details {
    color: var(--color-text-light);
}
.episode p {
    margin-bottom: 0;
    margin-top: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.episode .modify-watched {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    margin: 0;
    width: 300px;
}
@media (max-width: 850px) {
    .episode .watched {
        display: none;
    }
    .episode h3 {
        max-width: none;
    }

}



.loading {
    cursor: wait;
}

</style>
  