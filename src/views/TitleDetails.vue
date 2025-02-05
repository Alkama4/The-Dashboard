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
                    <button class="color-primary simple" v-if="titleInfo.user_title_watch_count == 0" @click="handleWatchClick(true)">Mark watched</button>
                    <div v-else class="not-simple">
                        <button class="add-button color-primary" @click="handleWatchClick(true)">Add watch</button>
                        <button class="remove-button color-warning" @click="handleWatchClick(false)">Remove</button>
                    </div>
                </div>
                <h2>Details</h2>
                <div class="details">
                    <div>Watched status</div>
                    <div class="value">
                        <template v-if="titleInfo.user_title_watch_count === 0">
                            Unwatched
                        </template>
                        <template v-else-if="titleInfo.user_title_watch_count === 1">
                            Watched
                        </template>
                        <template v-else>
                            Watched {{ titleInfo.user_title_watch_count }} times
                        </template>
                    </div>
                    <div>TMDB average score</div>
                    <div class="value"><IconTMDB style="margin-right: 4px;"/>{{ titleInfo.tmdb_vote_average }} ({{ titleInfo.tmdb_vote_count.toLocaleString("fi-FI") }} votes)</div>
                    <div>Release date</div>
                    <div class="value">{{ new Date(titleInfo.release_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) }}</div>
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

    
            <h2>Overview</h2>
            <p>{{ titleInfo.overview }}</p>
            
            <h2>Notes <InfoTooltip :text="`Last saved on ${new Date(titleInfo.user_title_last_updated).toLocaleDateString('fi-FI')}`" position="right"/></h2>
            <div>
                <!-- <div>
                    <label for="">Times watched</label>
                    <div class="times-watched">
                        <button>+</button>
                        <span>{{ titleInfo.user_title_watch_count }}</span>
                        <button>-</button>
                    </div>
                </div> -->
                <div>
                    <!-- <label for="">Notes</label> -->
                    <textarea v-model="this.titleInfo.user_title_notes" placeholder="Write your notes, thoughts, favorite moments, or timestamps here..."></textarea>
                </div>
                <div class="flex-row">
                    <button class="">Save notes</button>
                </div>
            </div>
        </div>

        <div v-for="season in titleInfo.seasons" 
            :key="season.season_id" 
            class="card season content-width-large" 
            :class="{'active': expandedSeason == season.season_id}">

            <div class="about" @click="toggleHeight(`ref${season.season_id}`)">
                <img class="season-poster" :src="'https://image.tmdb.org/t/p/w200' + season.poster_url" alt=" " />
                <div class="text">
                    <h2>{{ season.season_name }}</h2>
                    <div class="details">
                        {{ season.episode_count }} episodes • {{ season.vote_average }} <br>
                        {{ season.episodes.length > 0 ? new Date(season.episodes[0].air_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) : "No release date"}}
                    </div>
                    <p :title="season.overview">{{ season.overview }}</p>
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
                            <button class="watched"><IconAdd/>Watced</button>
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

export default {
    data() {
        return {
            titleID: this.$route.params.titleID,
            titleInfo: null,
            expandedSeason: null,
        };
    },
    components: {
        InfoTooltip,
        IconTMDB,
        IconAdd,
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
        handleWatchClick(modeIsAdd) {
            // make this go through a MODAL
            // make this go through a MODAL

            // If we get a confirmation just add +1 to -> user_title_watch_count
            // Don't refresh, make the api just simple {"success": True} or throw an error
            if (modeIsAdd) {
                notify("You just tried to add a watch, but the feature hasn't been implemented yet.")
            } else {
                notify("You just tried to remove a watch, but the feature hasn't been implemented yet.")
            }
        },
        handleNotesSave() {
            notify("Not yet implemented.")
        }
    },
    async mounted() {
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
};
</script>

  
<style scoped>

.title-info {
    --max-image-height: 810px;
    --text-offset: 60px;
    --text-original: calc(var(--max-image-height) - var(--text-offset));
    --cutoff-thing: calc((100vw - min(var(--text-original) + var(--text-offset), 100vw) / (9/16)) / 2);
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
                linear-gradient(to right, transparent var(--cutoff-thing), white var(--cutoff-thing), 
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
.mark-watched .simple {
    margin: 0;
    width: 100%;
}
.mark-watched .not-simple {
    display: grid;
    grid-template-columns: auto auto;
    width: 100%;
}
.mark-watched .not-simple .add-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin: 0;
}
.mark-watched .not-simple .remove-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
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
.title-info h2 {
    margin-top: var(--spacing-lg);
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
    max-width: calc(100% - 150px);
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
.episode .watched {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    margin: 0;
    width: 150px;
}
@media (max-width: 850px) {
    .episode .watched {
        display: none;
    }
    .episode h3 {
        max-width: none;
    }

}

</style>
  