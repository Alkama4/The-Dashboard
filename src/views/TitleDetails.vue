<template>
    <div v-if="titleInfo" class="title-info">
        <!-- <transition name="backdrop">
            <img 
                v-if="backdropShow && titleInfo.backdrop_image_count >= 1"
                class="background backdrop-image-container" 
                :src="`http://pibox.lan:800/image/${titleInfo.title_id}/backdrop${backdropNumber + 1}.jpg`" 
                alt=" "
            />
        </transition> -->
        <div class="background backdrop-image-container" v-if="titleInfo.backdrop_image_count >= 1">
            <div v-for="image in imageSlideshowData.individualData" :key="image.number">
                <img
                    v-if="image.number === imageSlideshowData.showOnDom || imageSlideshowData.keepOnDom.includes(image.number)" 
                    @load="image.isLoaded = true" 
                    :class="{ visible: image.isLoaded && image.number === imageSlideshowData.chosenOne }" 
                    :src="`http://pibox.lan:800/image/${titleInfo.title_id}/backdrop${image.number + 1}.jpg`" 
                />
            </div>
        </div>

        <div class="backdrop-dimension"></div>
        <div class="backdrop-container backdrop-dimension" @keydown="backdropKeypress">
            <div class="content-inside">
                    <!-- <img 
                        v-if="backdropShow && 
                        class="main backdrop-image-container" 
                        :src="`http://pibox.lan:800/image/${titleInfo.title_id}/backdrop${backdropNumber + 1}.jpg`" 
                        alt=" "
                    /> -->
                    <div class="main backdrop-image-container" v-if="titleInfo.backdrop_image_count >= 1">
                        <div v-for="image in imageSlideshowData.individualData" :key="image.number">
                            <img
                                v-if="image.number === imageSlideshowData.showOnDom || imageSlideshowData.keepOnDom.includes(image.number)" 
                                @load="image.isLoaded = true" 
                                :class="{ visible: image.isLoaded && image.number === imageSlideshowData.chosenOne }" 
                                :src="`http://pibox.lan:800/image/${titleInfo.title_id}/backdrop${image.number + 1}.jpg`" 
                            />
                        </div>
                    </div>

                <div class="button-holder no-pointer-events" v-if="titleInfo.backdrop_image_count > 1">
                    <button class="left all-pointer-events" @click="addOrSubtractSlideshowIndex(-1)"><IconChevronDown size="50"/></button>
                    <button class="right all-pointer-events" @click="addOrSubtractSlideshowIndex(1)"><IconChevronDown size="50"/></button>
                </div>

                <div class="name-and-tagline no-pointer-events">
                    <h1 class="title-name">
                        <span class="all-pointer-events" :title="titleInfo.name">
                            {{ titleInfo.name }} 
                        </span>
                        <span class="all-pointer-events original-title" :title="titleInfo.original_name" v-if="titleInfo.name !== titleInfo.original_name">
                            ({{ titleInfo.original_name }})
                        </span>
                    </h1>
                    <!-- <img :src="`http://pibox.lan:800/image/${titleInfo.title_id}/logo/1`" alt=" "> -->
                    <q class="tagline all-pointer-events" v-if="titleInfo.tagline">{{ titleInfo.tagline }}</q>
                </div>
                <div class="indicator">
                    <IndicatorDots 
                        :dotIndex="imageSlideshowData.chosenOne" 
                        :dotCount="titleInfo.backdrop_image_count"
                        @dotSelected="updateSlideshowImageTo"
                    />
                </div>
            </div>
        </div>

        <div class="content-width-medium title-details">

            <div class="mark-watched combined-buttons">
                <button 
                    v-if="titleInfo.user_watch_count <= 0"
                    class="color-primary left-button" 
                    @click="handleTitleWatchClick('title', 'watched')"
                    :disabled="waitingForResult.includes('titleWatched')"
                    :class="{loading: waitingForResult.includes('titleWatched')}"
                >
                    Mark title as watched
                </button>
                <button 
                    v-else
                    class="color-warning left-button" 
                    @click="handleTitleWatchClick('title', 'unwatched')" 
                    :disabled="waitingForResult.includes('titleWatched')"
                    :class="{loading: waitingForResult.includes('titleWatched')}"
                >
                    Reset title watch status 
                </button>

                <button 
                    v-if="titleInfo.user_watch_count <= -1"
                    class="color-primary right-button" 
                    @click="handleWatchListModification('add')"
                    :disabled="waitingForResult.includes('titleWatched')"
                    :class="{loading: waitingForResult.includes('titleWatched')}"
                >
                    <IconListAdd/>
                </button>
                <button 
                    v-else
                    class="color-warning right-button" 
                    @click="handleWatchListModification('remove')" 
                    :disabled="waitingForResult.includes('titleWatched')"
                    :class="{loading: waitingForResult.includes('titleWatched')}"
                >
                    <IconListRemove/>
                </button>
            </div>

            <h2>Genres</h2>
            <div class="genres flex">
                <div class="genre" v-for="genre in titleInfo.title_genres" :key="genre">{{ genre }}</div>
            </div>

            <h2>Overview</h2>
            <p>{{ titleInfo.overview }}</p>

            <h2>Details</h2>
            <div class="details">
                <div>Watched status</div>
                <div class="value">
                    <template v-if="titleInfo.user_watch_count == 1">
                        Watched
                    </template>
                    <template v-else-if="titleInfo.type == 'tv' && titleInfo.user_watch_count == 0">
                        {{ getWatchedStats() }}
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

            <button 
                @click="handleTitleUpdate"
                :disabled="waitingForResult.includes('titleUpdate')"
                :class="{loading: waitingForResult.includes('titleUpdate')}"
                class="update-title-button"
                title="Fetches and updates all non-user related data for the title, such as details, images, season, and episode information."
            >
                Update title details
            </button>
            
            <div v-if="titleInfo.user_watch_count >= 0">
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
        </div>

        <!-- SEASONS -->
        <div class="content-width-large" v-if="titleInfo.seasons">
            <h2>Seasons</h2>

            <div v-for="season in titleInfo.seasons" 
                :key="season.season_id" 
                class="card season" 
                :class="{'active': expandedSeason == season.season_id}"
            >
                <div class="about" @click="toggleHeight(`ref${season.season_id}`)">
                    <img class="poster" :src="`http://pibox.lan:800/image/${titleInfo.title_id}/season${season.season_number}/poster.jpg`" alt=" " />
                    <div class="text">
                        <h2>{{ season.season_name }}</h2>
                        <div class="details">
                            {{ season.episode_count }} episodes &bullet; {{ season.vote_average }} <br>
                            {{ season.episodes.length > 0 ? new Date(season.episodes[0].air_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) : "No release date"}}
                        </div>
                        <p :title="season.overview">{{ season.overview }}</p>
                    </div>
                    <button 
                        class="modify-watched color-primary"
                        v-if="season.episodes.length === 0 || 0 === season.episodes.reduce((min, ep) => Math.min(min, ep.watch_count), Infinity)"
                        @click.stop="handleTitleWatchClick('season', 'watched', season.season_id)"
                        :disabled="waitingForResult.includes('titleWatched')"
                        :class="{loading: waitingForResult.includes('titleWatched')}"
                    >
                        Mark season watched
                    </button>
                    <button
                        class="modify-watched color-warning"
                        v-else
                        @click.stop="handleTitleWatchClick('season', 'unwatched', season.season_id)"
                        :disabled="waitingForResult.includes('titleWatched')"
                        :class="{loading: waitingForResult.includes('titleWatched')}"
                    >
                        Mark season unwatched
                    </button>
                </div>
                
                <!-- EPISODES -->
                <div class="episodes" :ref="`ref${season.season_id}`">
                    <div class="episodes-padding">
                        <div v-for="episode in season.episodes" :key="episode.episode_number" class="episode">
                            <div 
                                v-if="failedToLoadImages.includes(episode.episode_id)"
                                class="still failed-to-load"
                            >
                                <IconFileImage size="40px"/>
                                <span>404</span>
                            </div>
                            <img 
                                v-else
                                class="still" 
                                :src="`http://pibox.lan:800/image/${titleInfo.title_id}/season${season.season_number}/episode${episode.episode_number}.jpg`" 
                                alt=" "
                                @error="failedToLoadImages.push(episode.episode_id)"
                            >
                            <div class="text">
                                <h3 :title="episode.episode_name">{{ episode.episode_number }}. {{ episode.episode_name }}</h3>
                                <div class="details" :title="`${episode.vote_count} votes`">
                                    {{ formatRuntime(episode.runtime) }} &bullet; {{ episode.vote_average }} <br>
                                    {{ episode.air_date ? new Date(episode.air_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) : "No release date"}}
                                </div>
                                <p :title="episode.overview">{{ episode.overview }}</p>
                                <button 
                                    v-if="episode.watch_count == 0"
                                    class="modify-watched color-primary"
                                    @click="handleTitleWatchClick('episode', 'watched', episode.episode_id)"
                                    :disabled="waitingForResult.includes('titleWatched')"
                                    :class="{loading: waitingForResult.includes('titleWatched')}"
                                >
                                    Watched
                                </button>
                                <button 
                                    v-else
                                    class="modify-watched color-warning"
                                    @click="handleTitleWatchClick('episode', 'unwatched', episode.episode_id)"
                                    :disabled="waitingForResult.includes('titleWatched')"
                                    :class="{loading: waitingForResult.includes('titleWatched')}"
                                >
                                    Unwatch
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
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconListRemove from '@/components/icons/IconListRemove.vue';
import IconListAdd from '@/components/icons/IconListAdd.vue';
import IconFileImage from '@/components/icons/IconFileImage.vue';
import IndicatorDots from '@/components/IndicatorDots.vue';

export default {
    data() {
        return {
            titleID: this.$route.params.titleID,
            titleInfo: null,
            expandedSeason: null,
            waitingForResult: [],
            failedToLoadImages: [],
            imageSlideshowData: {
                showOnDom: 0,
                chosenOne: 0,
                keepOnDom: [],
                individualData: []
            },
        };
    },
    components: {
        InfoTooltip,
        IndicatorDots,
        IconTMDB,
        IconChevronDown,
        IconListRemove,
        IconListAdd,
        IconFileImage,
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
                console.debug(response)
                // Update titles state on page
                this.titleInfo.user_watch_count = response.updated_data.watch_count;
                // Update each episodes state on page by mathcing the episode_id
                if (response.updated_data.episodes) {
                    console.debug(response.updated_data.episodes)
                    console.debug(this.titleInfo.seasons)
                    
                    // Loop through each episode in response.updated_data.episodes
                    response.updated_data.episodes.forEach(updatedEpisode => {
                    // Find the matching episode in titleInfo using the episode_id
                    const matchingEpisode = this.titleInfo.seasons
                        .flatMap(season => season.episodes)
                        .find(episode => episode.episode_id === updatedEpisode.episode_id);
                    
                    if (matchingEpisode) {
                        // If a matching episode is found update value
                        matchingEpisode.watch_count = updatedEpisode.watch_count;
                    }
                    });
                }

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
                notify(`${this.titleInfo.name} info updated! Missing images are still being queried.`, "success")
                this.queryTitleData();
            }
            this.removeItemFromWaitingArray("titleUpdate");
        },
        async handleWatchListModification(action) {
            this.waitingForResult.push("titleWatched");
            if (action == "remove") {
                const response = await api.removeTitleFromUserList(this.titleInfo.tmdb_id);
                if (response) {
                    console.debug("Title removed successfully", "success")
                }
            } else if (action == "add") {
                const response = await api.addTitleToUserList(this.titleInfo.tmdb_id, this.titleInfo.type);
                if (response) {
                    console.debug("Title added successfully!", "success")
                }
            }            
            this.queryTitleData()
            this.removeItemFromWaitingArray("titleWatched");
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
                    console.log("[queryTitleData] Values set to this.titleInfo: ", this.titleInfo)
                } else {
                    notify("The title doesn't exist!", "error");
                    router.push("/watchlist");
                }
            }
        },
        backdropKeypress(event) {
            if (event.key === 'ArrowLeft')  {
                this.subtractFromBackDropNumber();
            } else if (event.key === 'ArrowRight') {
                this.addToBackDropNumber();
            }
        },
        getWatchedStats() {
            const totalEpisodes = this.titleInfo.seasons?.reduce((sum, season) => sum + season.episodes.length, 0) || 0;
            const watchedEpisodes = this.titleInfo.seasons?.reduce((sum, season) => sum + season.episodes.filter(ep => ep.watch_count >= 1).length, 0) || 0;
            const percentage = totalEpisodes ? ((watchedEpisodes / totalEpisodes) * 100).toFixed(1) + "%" : "0%";
            return `${watchedEpisodes} / ${totalEpisodes} episodes (${percentage})`;
        },
        updateSlideshowImageTo(newImageIndex) {
            // Push the current image to fade-out images before updating
            this.imageSlideshowData.keepOnDom.push(this.imageSlideshowData.chosenOne);

            // Update `showOnDom` and ensure it loops correctly
            this.imageSlideshowData.showOnDom = newImageIndex;

            // Small timeout to let the DOM update (prevents flickering)
            setTimeout(() => {
                this.imageSlideshowData.chosenOne = this.imageSlideshowData.showOnDom;
            }, 20);

            // Remove the oldest fade-out image after the transition completes
            setTimeout(() => {
                this.imageSlideshowData.keepOnDom.shift();
            }, 500);
        },
        addOrSubtractSlideshowIndex(amount) {
            let newNumber = this.imageSlideshowData.chosenOne + amount;

            // Ensure looping through images
            if (newNumber >= this.titleInfo.backdrop_image_count) newNumber = 0;
            if (newNumber < 0) newNumber = this.titleInfo.backdrop_image_count - 1;

            // Call updateImage with the new number
            this.updateSlideshowImageTo(newNumber);
        },
    },
    async mounted() {
        await this.queryTitleData();

        // Generate individual data for each backdrop image dynamically
        this.imageSlideshowData.individualData = Array.from({ length: this.titleInfo.backdrop_image_count }, (_, i) => ({
            number: i,
            isLoaded: false
        }));
    },
    watch: {
        backdropNumber() {
            this.backdropShow = false;
            setTimeout(() => (this.backdropShow = true), 300); // Short delay before reloading
        }
    }
};
</script>

  
<style scoped>
.title-info {
    --z-backdrop-dimension: -10;
    --z-backdrop-image-bg: 1;
    --z-backdrop-container: 2;
    --z-backdrop-image-main: 3;
    --z-backdrop-content-inside: 4;
    --z-backdrop-arrow-buttons: 5;
    --z-backdrop-indicator: 6;
}

/* - - - - - BACKDROP AND VALUES ON TOP - - - - -  */
.backdrop-dimension {
    width: 100vw;
    max-width: min(100vw, 1200px);
    aspect-ratio: 16 / 9;
    /* max-height: 50vh; */
    margin-inline: auto;
    z-index: var(--z-backdrop-dimension);
}
.backdrop-container {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-backdrop-container);
}

/* BACKDROPS */
.backdrop-image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    object-fit: cover;
}
.backdrop-image-container img.visible {
    opacity: 1;
}

.backdrop-image-container.main { 
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    mask-image: linear-gradient(to top, transparent 0%, white 50%);
    z-index: var(--z-backdrop-image-main);
}
.backdrop-image-container.background { 
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    object-fit: cover; 
    
    width: 100vw;
    height: calc(1200px / 16 * 9);
    z-index: var(--z-backdrop-image-bg);

    filter: blur(20px) opacity(0.5);
    --space-left: calc((100vw - 1200px) / 2);
    mask-image: 
        linear-gradient(to top, transparent 0%, white 50%),
        linear-gradient(to left, 
            white var(--space-left), 
            transparent var(--space-left), 
            transparent calc(100vw - var(--space-left)), 
            white calc(100vw - var(--space-left))
        );
    mask-composite: intersect;
}

@media (max-width: 1200px) {
    img.background { 
        display: none;
    }
}

/* INSIDE CONTENT */
.backdrop-container .content-inside {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: var(--z-backdrop-content-inside);
}

.content-inside .indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-backdrop-indicator);
}

.backdrop-container .button-holder {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    z-index: var(--z-backdrop-arrow-buttons);
}
.backdrop-container .button-holder button {
    margin: 0;
    padding: 0;
    background-color: transparent;
    border-radius: 50%;
    position: relative; 
    z-index: var(--z-backdrop-arrow-buttons);
}
.backdrop-container .button-holder button::after {
    content: "";
    background-color: rgba(0, 0, 0, 0.25);
    filter: blur(20px);
    width: 80px;
    aspect-ratio: 1;
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    z-index: -5;
}
.backdrop-container button.left svg {
    transform: rotate(90deg);
    transition: transform 0.1s var(--cubic-1);
}.backdrop-container button.left:hover svg {
    transform: rotate(90deg) scale(1.5);
}
.backdrop-container button.right svg {
    transform: rotate(-90deg);
    transition: transform 0.1s var(--cubic-1);
}.backdrop-container button.right:hover svg {
    transform: rotate(-90deg) scale(1.5);
}
@media (max-width: 666px) {
    .backdrop-container .button-holder button svg {
        fill: transparent;
    }
    .backdrop-container .button-holder button {
        /* background-color: red; */
        border-radius: 0;
        height: 100%;
        width: 30%;
    }
    .backdrop-container .button-holder  {
        height: 100%;
        width: 100%;
        top: 0;
    }
    .backdrop-container .button-holder button::after {
        background-color: transparent;
    }
    .backdrop-container .button-holder button:hover::after {
        background-color: transparent;
    }
}


.backdrop-container .name-and-tagline {
    position: absolute;
    bottom: var(--spacing-md);
    left: 50%;
    transform: translateX(-50%);
    align-items: left;
    width: 90%;
    z-index: var(--z-backdrop-indicator);
}

/* Maybe try and pop the orignial to next row when it would overflow or wrap */
.name-and-tagline .title-name {
    margin-bottom: 0;
}
.name-and-tagline .title-name .original-title {
    color: var(--color-text-lighter)
}
.name-and-tagline .tagline {
    color: var(--color-text-light);
}

@media (min-width: 900px) {
    .name-and-tagline .title-name {
        font-size: 48px;
    }
}


/* - - - - - VALUES AND DETAILS - - - - -  */
.title-details {
    position: relative;
}

.title-details .genres {
    gap: var(--spacing-xs);
    flex-wrap: wrap;
    overflow: hidden;
    /* height: 32px; */
    /* margin: var(--spacing-md) 0; */
}
.title-details .genre {
    padding: var(--spacing-xs);
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-small);
    font-size: var(--font-size-small);
    font-weight: 500;
    white-space: nowrap;
}

.mark-watched {
    position: absolute;
    top: var(--spacing-sm);
    right: 0;
    margin: 0;
}
.mark-watched button {
    padding-inline: var(--spacing-lg);
    white-space: nowrap;
    margin: 0;
}

@media (max-width: 666px) {
    .mark-watched {
        position: relative;
        width: 100%;
        margin: var(--spacing-md) 0;
    }
    .mark-watched button {
        width: 100%;
        margin: 0;
    }
}

.title-details h2{
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
}
.title-details h3 {
    margin-top: var(--spacing-sm);
    margin-bottom: 0;
}
.title-details .details {
    color: var(--color-text-light);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: var(--spacing-md);
}
.title-details .details .value {
    color: var(--color-text);
    display: flex;
    flex-direction: row;
    align-items: center;
}

.title-details ul {
    list-style: disc;
    margin: var(--spacing-sm);
    padding-left: var(--spacing-md);
}
.title-details a {
    color: var(--color-text);
    text-decoration: none;
}
.title-details a:hover {
    text-decoration: underline;
}

.title-details .times-watched {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    width: fit-content;
}
.title-details .times-watched button {
    margin: 0;
    /* padding: var(--spacing-xs) var(--spacing-md); */
}

.title-details .notes-text-area {
    margin-top: var(--spacing-sm);
}

.title-details .update-title-button {
    margin: var(--spacing-md) 0;
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
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: 
    "img text"
    "button button";
    column-gap: var(--spacing-md);
    cursor: pointer;
}
.season h2 {
    margin: 0;
}
.season .about .poster {
    height: 200px;
    width: 133.33px;
    min-width: 133.33px;
    background-color: var(--color-background-card-section);
    border-radius: var(--border-radius-medium);
    grid-area: img;
}
.season .about p {
    margin-bottom: 0;
    margin-top: 10px;
    display: -webkit-box;
    line-clamp: 4;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.season .about .details {
    color: var(--color-text-light);
}

.season .about .text {
    grid-area: text;
}

.season .about .modify-watched {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    margin: 0;
    width: auto;
}

@media (max-width: 750px) {
    .season .about .modify-watched {
        margin-top: var(--spacing-md);
        position: static;
        grid-area: button;
        width: 100%;
    }
}


.season .episodes {
    box-sizing: border-box;
    height: 0px;
    overflow: hidden;
    transition: height 0.3s var(--cubic-1),
                margin-top 0.3s var(--cubic-1);
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
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: calc(100% - 160px);
}
.episode .still {
    width: 300px;
    min-width: 300px;
    border-radius: var(--border-radius-medium);
    object-fit: contain;
    aspect-ratio: 16/9;
    background-color: var(--color-background-card);
}
.episode .still.failed-to-load {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-hidden);
    font-weight: 700;
    font-size: 32px;
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
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.episode .modify-watched {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    margin: 0;
    width: auto;
}
@media (max-width: 850px) {
    .episode .modify-watched {
        margin-top: var(--spacing-sm);
        position: static;
        width: 100%;
    }
    .episode h3 {
        max-width: none;
    }
    .episode {
        flex-direction: column;
    }
    .episode .still {
        width: 100%;
        min-width: none;
        max-height: 220px;
    }
}



.loading {
    cursor: wait;
}

</style>
  