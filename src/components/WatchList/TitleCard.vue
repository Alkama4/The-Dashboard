<template>
    <div class="title-card">
        <router-link :to="`/watch_list/title/${titleDetails.title_id}`" draggable="false" class="no-decoration">
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
                    draggable="false"
                />
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
        </router-link>

        <div class="title-card-details">
            <div class="details">
                <router-link 
                    class="title-card-name no-decoration hover-decoration"
                    draggable="false"
                >
                    {{ titleDetails.name }}
                </router-link>
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
        <DropdownMenu :options="dropDownOptions"/>
    </div>
</template>

<script>
import { convert } from '@/utils/utils';
import IconTMDB from '@/components/icons/IconTMDB.vue';
import { standAloneBuild } from '@/utils/config';
import MissingImage from '@/components/common/MissingImage.vue';
import DropdownMenu from '../common/DropdownMenu.vue';
import fastApi from '@/utils/fastApi';

export default {
    name: 'TitleCard',
    components: {
        IconTMDB,
        MissingImage,
        DropdownMenu,
    },
    data() {
        return {
            imgNotFound: false,
            dropDownOptions: [
                { icon: "bxs-heart", label: "Toggle Favourite", action: () => this.handleToggleFavourite() },
                { icon: "bxs-time-five", label: "Add to Queue", action: () => {} },
                { icon: "bxs-collection", label: "Title Collections", action: () => {} },
                { icon: "bx-list-minus", label: "Remove Title", action: () => {} },
            ]
        }
    },
    props: {
        titleDetails: {
            type: Object,
            required: true
        }
    },
    emits: ['favouriteToggle'],
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
        async handleToggleFavourite() {
            const response = await fastApi.watch_list.titles.favourite(this.titleDetails.title_id);
            if (response) {
                this.$emit('favouriteToggle');
            }
        }
    }
}
</script>

<style scoped>
/* Base Card Styles */
.title-card {
    display: flex;
    flex-direction: column;
    /* background-color: var(--color-background-card); */
    width: 220px;
    /* height: 400px; */
    position: relative;
    cursor: pointer;
    user-select: none;
    box-shadow: var(--shadow-card);
    /* transform: scale(0.95); */
    transition: transform 0.15s var(--cubic-1);
}
@media (max-width: 900px) {
    .title-card {
        width: 180px;
    }
}

/* Thumbnail Image */
.title-card-thumbnail {
    /* position: absolute; */
    border-radius: var(--border-radius-medium);
    overflow: hidden;
    width: 100%;
    aspect-ratio: 2/3;
    background-color: var(--color-background-card-section);
    z-index: 1;

}
.title-card-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Card Details */
.title-card-details {
    position: relative;
    font-size: var(--font-size-sm);
    margin-top: var(--spacing-sm);
    font-weight: 500;
    text-align: left;
    color: var(--color-text-white-light);
    opacity: 1;
    /* transform: translateX(15px); */
    z-index: 3;
    transition: opacity 0.2s var(--cubic-1), transform 0.2s var(--cubic-1);
}

.title-card-name {
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--color-text-white);
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.title-card-rating {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: var(--spacing-xs);
}


/* Tag Labels */
.tag {
    position: absolute;
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    z-index: 10;
}

/* Hover and Touch Interactions */
/* .pointer-device .title-card:hover {
    transform: scale(1);
} */

/* .title-card:hover .title-card-details,
.title-card:hover .title-card-gradient,
.touch-device .title-card .title-card-details,
.touch-device .title-card .title-card-gradient {
    opacity: 1;
    transform: translateX(0);
} */

.dropdown-menu {
    top: var(--spacing-sm);
    right: var(--spacing-xs);
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
