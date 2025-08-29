<template>
    <router-link :to="`/watch_list/title/${titleDetails.title_id}`" class="title-card">
        <div
            class="title-card-thumbnail"
        >
            <MissingImage v-if="imgNotFound"/>
            <img 
                v-else
                :src="posterUrl(titleDetails.title_id, 600, titleDetails.backup_poster_url)" 
                loading="lazy"
                @load="(event) => event.target.classList.add('loaded')" 
                @error="imgNotFound = true"
            />
        </div>
        <div class="title-card-gradient"></div>
        <div class="title-card-details">
            <div class="details">
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
        </div>

        <div class="tag tag-secondary" v-if="titleDetails.favourite">Favourite</div>
        <div class="tag tag-positive" v-else-if="titleDetails.watch_count >= 1">{{ titleDetails.watch_count }} watch{{ titleDetails.watch_count > 1 ? 'es' : '' }}</div>
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

        <div class="three-dots-wrapper">
            <IconThreeDots
                class="icon-button"
                size="32px"
                @click.prevent="openContextMenu"
            />
        </div>
    </router-link>
</template>

<script>
import { convert } from '@/utils/utils';
import IconTMDB from './icons/IconTMDB.vue';
import { standAloneBuild } from '@/utils/config';
import IconThreeDots from './icons/IconThreeDots.vue';
import { notify } from '@/utils/notification';
import MissingImage from './MissingImage.vue';

export default {
    name: 'TitleCard',
    components: {
        IconTMDB,
        IconThreeDots,
        MissingImage,
    },
    data() {
        return {
            imgNotFound: false,
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
            return convert.toRuntime(runtime);
        },
        posterUrl(titleId, width, backupUrl) {
            if (standAloneBuild) {
                if (width == 600) width = 500;  // TMDB doesn't have a 600 so use 500 instead
                return `https://image.tmdb.org/t/p/w${width}${backupUrl}`;
            } else {
                return `${process.env.VUE_APP_API_URL}/media/image/title/${titleId}/poster.jpg?width=${width}`;
            }
        },
        openContextMenu() {
            notify("TBD");
            // Toggle favourites,
            // Add to queue
            // remove from watchlist
            // Add to collection
        }
    }
}
</script>

<style scoped>
/* Base Card Styles */
.title-card {
    display: flex;
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-medium);
    width: 220px;
    aspect-ratio: 2/3;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    box-shadow: var(--shadow-card);
    transform: scale(0.95);
    transition: transform 0.15s var(--cubic-1);
}
@media (max-width: 900px) {
    .title-card {
        width: 180px;
    }
}

/* Thumbnail Image */
.title-card-thumbnail {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: var(--color-background-card-section);
    z-index: 1;
}
.title-card-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    font-size: var(--font-size-sm);
    font-weight: 500;
    text-align: end;
    color: var(--color-text-white-light);
    opacity: 0;
    transform: translateX(15px);
    z-index: 3;
    transition: opacity 0.2s var(--cubic-1), transform 0.2s var(--cubic-1);
}

.title-card-name {
    font-size: var(--font-size-lg);
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

/* Controls */
.three-dots-wrapper {
    opacity: 0;
    transition: opacity 0.2s var(--cubic-1);
    position: absolute;
    top: var(--spacing-sm);
    right: 0;
    z-index: 10;
}
.three-dots-wrapper::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: black;
    filter: blur(40px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    pointer-events: none;
}

/* Hover and Touch Interactions */
.pointer-device .title-card:hover {
    transform: scale(1);
}

.title-card:hover .title-card-details,
.title-card:hover .title-card-gradient,
.title-card:hover .three-dots-wrapper,
.touch-device .title-card .title-card-details,
.touch-device .title-card .title-card-gradient,
.touch-device .title-card .three-dots-wrapper {
    opacity: 1;
    transform: translateX(0);
}

/* Full Width Variant */
.full-width-title-card {
    height: calc(300px * 0.95);
    width: calc(100% - var(--spacing-xl)) !important;
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

</style>
