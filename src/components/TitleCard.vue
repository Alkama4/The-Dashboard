<template>
    <router-link :to="`/watch_list/title/${titleDetails.title_id}`" class="title-card">
        <img 
            :src="posterUrl(titleDetails.title_id, 600, titleDetails.backup_poster_url)" 
            class="title-card-thumbnail"
            loading="lazy"
            @load="(event) => event.target.classList.add('loaded')" 
        />
        <div class="title-card-gradient"></div>
        <div class="title-card-details">
            <span class="title-card-name">{{ titleDetails.name }}</span>
            <div class="title-card-rating">
                <IconTMDB/>{{ titleDetails.tmdb_vote_average }} &bullet; {{ new Date(titleDetails.release_date).getFullYear() }}
            </div>
            <div class="title-card-progress">
                <template v-if="titleDetails.type === 'tv'">
                    <span class="season-after">{{ titleDetails.season_count }}</span>
                    <span class="episode-after">{{ titleDetails.episode_count }}</span>
                </template>
                <template v-else>
                    {{ formatRuntime(titleDetails.movie_runtime) }}
                </template>
            </div>
        </div>

        <div class="tag tag-secondary" v-if="titleDetails.favourite">Favourite</div>
        <div class="tag tag-positive" v-else-if="titleDetails.watch_count >= 1">Watched</div>
        <div 
            class="tag tag-primary"
            v-else-if="
                new Date(titleDetails.release_date) <= new Date() &&
                new Date(titleDetails.release_date) >= new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
            "
        >
            New release
        </div>
        <div class="tag tag-primary" v-else-if="titleDetails.new_episodes >= 1">New episodes</div>
        <div class="tag" v-else-if="new Date(titleDetails.release_date) > new Date()">Upcoming</div>

    </router-link>
</template>

<script>
import { convert } from '@/utils/utils';
import IconTMDB from './icons/IconTMDB.vue';
import { standAloneBuild } from '@/utils/config';

export default {
    name: 'TitleCard',
    components: {
        IconTMDB
    },
    data() {
        return {
        }
    },
    props: {
        titleDetails: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatRuntime(runtime) {
            return convert.runtime(runtime);
        },
        posterUrl(titleId, width, backupUrl) {
            if (standAloneBuild) {
                if (width == 600) width = 500;  // TMDB doesn't have a 600 so use 500 instead
                return `https://image.tmdb.org/t/p/w${width}${backupUrl}`;
            } else {
                return `${process.env.VUE_APP_API_URL}/media/image/title/${titleId}/poster.jpg?width=${width}`;
            }
        },
    }
}
</script>

<style scoped>
/* Base Card Styles */
.title-card {
    display: flex;
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-medium);
    min-width: 200px;
    width: 200px;
    min-height: 300px;
    height: 300px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    box-shadow: var(--shadow-card);
    transform: scale(0.95);
    transition: transform 0.15s var(--cubic-1);
}

/* Thumbnail Image */
.title-card-thumbnail {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: var(--color-background-card-section);
    z-index: 1;
}

/* Gradient Overlay */
.title-card-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, hsla(0, 0%, 0%, 0.8), hsla(0, 0%, 0%, 0.6) 30%, transparent 60%);
    z-index: 2;
    opacity: 0;
    transition: opacity 0.2s var(--cubic-1);
}

/* Card Details */
.title-card-details {
    position: absolute;
    bottom: var(--spacing-sm);
    right: var(--spacing-sm);
    padding: var(--spacing-xs);
    border-radius: var(--border-radius-small);
    font-size: var(--font-size-small);
    font-weight: 500;
    text-align: end;
    color: var(--color-text-white-light);
    opacity: 0;
    transform: translateX(15px);
    z-index: 3;
    transition: opacity 0.2s var(--cubic-1), transform 0.2s var(--cubic-1);
}

.title-card-name {
    font-size: var(--font-size-large);
    font-weight: 700;
    color: var(--color-text-white);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.title-card-rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-xs);
}

/* Progress Details */
.title-card-progress {
    display: flex;
    gap: 3px;
    justify-content: flex-end;
}

/* Tag Labels */
.tag {
    position: absolute;
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    z-index: 10;
}

/* Hover and Touch Interactions */
.title-card:hover {
    transform: scale(1);
}

.title-card:hover .title-card-details,
.title-card:hover .title-card-gradient,
.touch-device .title-card .title-card-details,
.touch-device .title-card .title-card-gradient {
    opacity: 1;
    transform: translateX(0);
}

/* Touch Device Overrides */
.touch-device .title-card {
    width: calc((100% - var(--spacing-hg)) / 2);
    aspect-ratio: 2 / 3;
    height: auto;
}

.touch-device .full-width-title-card {
    height: calc(100vw / 594 * 423.5);
    aspect-ratio: auto;
}

/* Full Width Variant */
.full-width-title-card {
    height: calc(300px * 0.95);
    width: calc(100% - var(--spacing-hg)) !important;
    margin: calc(300px * 0.025) calc(200px * 0.025);
    box-sizing: border-box;
    transform: none !important;
    cursor: default;
}

/* Season and Episode Formatting */
.season-after::after {
    content: " seasons, ";
}
.touch-device .season-after::after {
    content: "S, ";
}

.episode-after::after {
    content: " episodes";
}
.touch-device .episode-after::after {
    content: "E";
}

/* Other Wrappers */
.touch-device .cards-thing-wrapper {
    position: relative;
    height: calc(100vw / 594 * 423.5);
}

.touch-device .cards-thing-wrapper .swiper {
    position: absolute;
    top: 0;
    left: -5vw;
    width: 100vw;
}

.slides-indicator-holder {
    display: none;
}
</style>
