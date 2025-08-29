<template>
    <div 
        v-if="seasonsData"
        class="content-width-large"  
        @keydown="handleKeyDown"
        tabindex="0"
    >
        <h2>Season & episode details</h2>
        
        <div class="icon-align">
            <input type="checkbox" id="showSpoilers" v-model="showSpoilers">
            <label for="showSpoilers">Show spoilers</label>
        </div>

        <div class="season-tabs" v-if="seasonsData.length > 1">
            <button 
                v-for="(season, index) in seasonsData"
                :key="index"
                @click="setActiveSeason(season.season_number)"
                :class="{'button-primary': season.season_number == activeSeason}"
            >
                {{ season.season_name }}
            </button>
        </div>
        <div class="seasons-wrapper" ref="seasonsWrapper">
            <div 
                v-for="season in seasonsData" 
                :key="season.season_id" 
                class="season" 
            >
                <transition :name="transitionDirection" mode="out-in">
                    <div 
                        v-if="activeSeason == season.season_number"
                        class="card"
                        :ref="'season' + season.season_number"
                    >
                        <div class="about">
                            <div class="poster-container">
                                <MissingImage v-if="failedToLoadImages.includes('season' + season.season_id)"/>
                                <img 
                                    v-else
                                    class="poster" 
                                    :src="imageUrl(300, season.backup_poster_url, season.season_number)" 
                                    @load="(event) => event.target.classList.add('loaded')"
                                    @error="failedToLoadImages.push('season' + season.season_id)"
                                />
                                <div class="tag-holder">
                                    <div class="tag tag-positive" v-if="0 != getSeasonWatchCount(season) && season.episodes.length >= 1">
                                        {{ getSeasonWatchCount(season) }} watch{{ getSeasonWatchCount(season) > 1 ? 'es' : '' }}
                                    </div>
                                    <div class="tag tag-primary" v-else-if="season.episodes.length == 0 || new Date(season.episodes[0].air_date) > new Date()">
                                        Upcoming
                                    </div>
                                </div>
                            </div>
                            <div class="text">
                                <h2 class="icon-align">
                                    {{ season.season_name }}
                                    <!-- @click.stop="handleTitleUpdate('seasonInfo', season.season_number)" -->
                                    <!-- <IconRefresh 
                                        size="28px"
                                        left="6px"
                                        @click.stop="openSeasonUpdateModal(season.season_number)"
                                        :class="{
                                            'loading': waitingForResult.includes('seasonUpdate' + season.season_number),
                                            'spin-refresh-icon': waitingForResult.includes('seasonUpdate' + season.season_number)
                                        }"
                                        class="icon-button"
                                    /> -->
                                </h2>
                                <div class="details">
                                    <div class="icon-align single-line">
                                        <span>{{ season.episode_count }} episodes</span>
                                        <span class="bullet">&bullet;</span>
                                        <span class="icon-align"><IconTMDB style="margin-left: -3px; margin-right: 3px;"/> {{ season.tmdb_vote_average }} ({{ getSeasonVotes(season) }} votes)</span>
                                    </div>
                                    <div>
                                        {{ season.episodes.length > 0 ? new Date(season.episodes[0].air_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) : "No release date"}}
                                    </div>
                                </div>
                                <p :title="season.overview">{{ season.overview }}</p>
                            </div>

                            <NumericStepper 
                                v-if="season.episodes.length > 0"
                                class="modify-watched"
                                :displayValue="season.episodes.reduce((min, ep) => Math.min(min, ep.watch_count), Infinity)"
                                @valueUpdated="val => handleTitleWatchClick('season', val, season.season_id)"
                            />
                        </div>

                        <div class="card-spacer"></div>
                        
                        <!-- EPISODES -->
                        <div v-if="season.episodes.length == 0" class="content-not-found">
                            It seems that this season doesn't have eny episodes!?
                        </div>

                        <div v-else class="episodes-wrapper" :ref="`refSeason${season.season_number}`">
                            <div 
                                v-for="(episode, index) in season.episodes" 
                                :key="episode.episode_number" 
                                class="episode" 
                                :class="{
                                    'not-realeased': new Date(episode.air_date) > new Date(),
                                    'last': index === season.episodes.length - 1
                                }"
                                :id="`S${season.season_number}E${episode.episode_number}`"
                            >
                                <div class="still-container" @click="handleWhereToWatch(episode)">
                                    <MissingImage v-if="failedToLoadImages.includes('episode' + episode.episode_id)"/>
                                    <HiddenImage v-else-if="!showSpoilers && episode.watch_count == 0"/>
                                    <img 
                                        v-else
                                        class="still" 
                                        :src="imageUrl(900, episode.backup_still_url, season.season_number, episode.episode_number)"
                                        @load="(event) => event.target.classList.add('loaded')"
                                        @error="failedToLoadImages.push('episode' + episode.episode_id)"
                                    >
                                    <!-- Tag to show if newly released or watched, or maybe even un released status -->
                                    <div class="tag-holder">
                                        <div class="tag tag-positive" v-if="episode.watch_count >= 1">
                                            {{ episode.watch_count }} watch{{ episode.watch_count > 1 ? 'es' : '' }}
                                        </div>
                                        <div class="tag tag-primary" v-else-if="new Date(episode.air_date) < new Date() && new Date(episode.air_date) > newReleaseCutoffDate">
                                            New episode
                                        </div>
                                        <div class="tag" v-else-if="new Date(episode.air_date) > new Date()">
                                            Upcoming
                                        </div>
                                    </div>
                                    <IconPlay class="icon-watch-now" size="64px"/>
                                </div>
                                
                                <div class="text">
                                    <h3 :title="episode.episode_name">{{ episode.episode_number }}. {{ showSpoilers || episode.watch_count >= 1 ? episode.episode_name : 'Episode' }}</h3>
                                    <div class="details">
                                        <span class="icon-align" >
                                            <span>{{ formatRuntime(episode.runtime) }} &bullet;</span>
                                            <span class="icon-align"><IconTMDB style="margin-right: 3px; margin-left: 2px;"/>{{ new Date(episode.air_date) > new Date() ? '-' : episode.tmdb_vote_average }} ({{ episode.tmdb_vote_count ?? '0'}} votes)</span>
                                        </span>
                                        <div>
                                            {{ 
                                                episode.air_date ? 
                                                new Date(episode.air_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) : 
                                                "No release date"
                                            }}
                                        </div>
                                    </div>
                                    <p :title="episode.overview">{{ showSpoilers || episode.watch_count >= 1 ? episode.overview : 'Episode overview hidden.' }}</p>

                                    <NumericStepper 
                                        class="modify-watched"
                                        :displayValue="episode.watch_count"
                                        @valueUpdated="val => handleTitleWatchClick('episode', val, episode.episode_id)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { getMediaImageUrl, convert } from '@/utils/utils';
import MissingImage from '@/components/common/MissingImage.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconTMDB from '@/components/icons/IconTMDB.vue';
import NumericStepper from '@/components/common/NumericStepper.vue';
import { newReleaseCutoffDate } from '@/utils/config';
import HiddenImage from '@/components/WatchList/HiddenImage.vue';

export default {
    name: 'SeasonBrowser',
    props: {
        seasonsData: {
            type: Array,
            default: () => [],
        },
        titleId: {
            type: Number,
            default: null,
        },
        handleWhereToWatch: {
            type: Function,
            required: true,
        },
        handleTitleWatchClick: {
            type: Function,
            required: true,
        },
    },
    components: {
        MissingImage,
        HiddenImage,
        IconPlay,
        IconTMDB,
        NumericStepper,
    },
    data() {
        return {
            failedToLoadImages: [],
            activeSeason: 1,
            transitionDirection: null,
            newReleaseCutoffDate: newReleaseCutoffDate,
            showSpoilers: false,
        }
    },
    methods: {
        formatRuntime(runtime) {
            return convert.toRuntime(runtime);
        },
        imageUrl(width, backupUrl, seasonNumber, episodeNumber) {
            return getMediaImageUrl(width, backupUrl, this.titleId, seasonNumber, episodeNumber);
        },
        getSeasonWatchCount(season) {
            return season.episodes.reduce((min, ep) => Math.min(min, ep.watch_count), Infinity);
        },
        getSeasonVotes(season) {
            let runningSum = 0;
            if (season && season.episodes) {
                season.episodes.forEach((episode) => {
                    runningSum += episode.tmdb_vote_count || 0;
                });
            }
            return isNaN(runningSum) ? '0' : runningSum;
        },
        setActiveSeason(target) {
            if (this.activeSeason < target) {
                this.transitionDirection = "slide-prev";
            } else {
                this.transitionDirection = "slide-next";
            }
            this.activeSeason = target;
        },
        setActiveSeasonPrev() {
            if (this.activeSeason > 1) {
                this.transitionDirection = "slide-next";
                this.activeSeason--;
            }
        },
        setActiveSeasonNext() {
            if (this.activeSeason < this.seasonsData.length) {
                this.transitionDirection = "slide-prev";
                this.activeSeason++;
            }
        },
        handleKeyDown(e) {
            if (/[0-9]/.test(e.key)) {
                const num = Number(e.key);
                if (num >= 1 && num <= this.seasonsData.length) {
                    this.setActiveSeason(num);
                }
            } else if (e.key === "ArrowLeft") {
                this.setActiveSeasonPrev();
            } else if (e.key === "ArrowRight") {
                this.setActiveSeasonNext();
            }
        },
        updateSeasonWrapperHeight() {
            this.$nextTick(() => {
                const wrapper = this.$refs.seasonsWrapper;
                const activeSeason = this.$refs['season' + this.activeSeason][0];
                if (wrapper && activeSeason) {
                    wrapper.style.height = activeSeason.clientHeight + 'px';
                }
            });
        }
    },
    watch: {
        activeSeason() {
            this.updateSeasonWrapperHeight();
        }
    },
    mounted() {
        const activeSeason = this.$refs['season' + this.activeSeason][0];
        this.observer = new ResizeObserver(() => this.updateSeasonWrapperHeight());
        if (activeSeason) this.observer.observe(activeSeason);
    },
    beforeUnmount() {
        if (this.observer) this.observer.disconnect();
    }
}
</script>

<style scoped>
.season-tabs {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-sm);
    overflow-x: scroll;
    margin-bottom: var(--spacing-md);
}
.season-tabs button {
    white-space: nowrap;
}

/* - - - - - SEASON - - - - -  */
.seasons-wrapper {
    transition: height 0.4s var(--cubic-ease-slow-in-slow-out);
    position: relative;
    overflow: hidden;
}
.season {
    position: absolute;
    width: 100%;
}
.season .about {
    display: grid;
    grid-template-areas: 
    "img text"
    "button button";
    column-gap: var(--spacing-md);
}
.season h2 {
    margin: 0;
    max-width: calc(100% - 243px - 8px);
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.season .about .poster-container {
    display: flex;
    position: relative;
    aspect-ratio: 2/3;
    max-width: 300px;
    background-color: var(--color-background-card-section);
    border-radius: var(--border-radius-medium);
    overflow: hidden;
}
.season .about .poster {
    height: 100%;
    width: 100%;
    background-color: var(--color-background-card-section);
    grid-area: img;
}
.season .about p {
    margin-bottom: 0;
    margin-top: 10px;
    display: -webkit-box;
    line-clamp: 6;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.season .about .details {
    color: var(--color-text-light);
}
.season .details .single-line {
    column-gap: var(--spacing-xs);
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
    .season h2 {
        max-width: none;
    }

    /* .title-details .poster-next-to-stuff {
        gap: 0;
        grid-template-columns: auto;
    }
    .title-details .poster-next-to-stuff .poster-placholder {
        display: none;
    } */

    .season .about .poster-holder {
        height: 200px;
        width: 133.333px;
        min-width: 133.333px;
    }
    .season .about p {
        line-clamp: 4;
        -webkit-line-clamp: 4;
    }
}
@media (max-width: 550px) {
    .season .about p {
        line-clamp: 3;
        -webkit-line-clamp: 3;
    }
    .season .details .single-line {
        flex-direction: column;
        align-items: start;
    }
    .season .details .single-line .bullet {
        display: none;
    }
}

.card-spacer {
    width: 100%;
    margin: var(--spacing-md) 0;
}

.episodes-wrapper {
    box-sizing: border-box;
    overflow: hidden;
    /* margin-top: var(--spacing-md); */
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

/* - - - - - EPISODE - - - - -  */
.episode {
    position: relative;
    /* padding: var(--spacing-md); */
    margin: 0;
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
}
.episode::after {
    content: "";
    width: calc(100% - var(--spacing-lg));
    height: var(--episode-gap-line-height);
    position: absolute;
    bottom: calc(var(--episode-gap-line-height) * -1);
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-border);
    border-radius: var(--episode-gap-line-height);
    z-index: 2;
}
.episode.last::after {
    display: none;
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

.episode .still-container {
    display: flex;
    width: 300px;
    min-width: 300px;
    border-radius: var(--border-radius-medium);
    overflow: hidden;
    aspect-ratio: 16/9;
    background-color: var(--color-background-card-section);
    position: relative;
    cursor: pointer;
}

.episode .still-container .still {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.1s ease-out;
    filter: brightness(1);
}
.episode .still-container:hover .still {
    filter: brightness(0.5);
}

.icon-watch-now {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;
    transition: opacity 0.1s ease-out;
}
.episode .still-container:hover .icon-watch-now {
    opacity: 1;
}

.tag-holder {
    position: absolute;
    width: calc(100% - var(--spacing-sm) * 2);
    height: calc(100% - var(--spacing-sm) * 2);
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    display: inline;
    pointer-events: none;
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
    .episode .still-container {
        width: 100%;
        min-width: none;
        max-height: 220px;
    }
}



/* - - - - - Animation - - - - - */
.slide-next-enter-active, .slide-next-leave-active,
.slide-prev-enter-active, .slide-prev-leave-active {
    transition: opacity 0.4s var(--cubic-1),
                transform 0.4s var(--cubic-1);
}

/* Next */
.slide-next-enter-from {
    opacity: 0;
    transform: translateX(-50px);
}
.slide-next-leave-to {
    opacity: 0;
    transform: translateX(50px);
}

/* Prev */
.slide-prev-enter-from {
    opacity: 0;
    transform: translateX(50px);
}
.slide-prev-leave-to {
    opacity: 0;
    transform: translateX(-50px);
}

</style>