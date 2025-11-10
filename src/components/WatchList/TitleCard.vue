<template>
    <div class="title-card">
        <router-link :to="`/watch_list/title/${titleDetails.title_id}`" draggable="false" class="no-decoration">
            <div
                class="title-card-thumbnail"
            >
                <MissingImage v-if="imgNotFound"/>
                <img 
                    v-else
                    :src="getMediaUrl(
                        titleDetails?.title_images?.poster?.[0]?.path, 
                        titleDetails?.title_images?.poster?.[0]?.source_url,
                        600
                    )"                    
                    loading="lazy"
                    @load="(event) => event.target.classList.add('loaded')" 
                    @error="imgNotFound = true"
                    draggable="false"
                />
            </div>

            <div class="tag tag-positive" v-if="titleDetails.watch_count >= 1">{{ titleDetails.watch_count }} watch{{ titleDetails.watch_count > 1 ? 'es' : '' }}</div>
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

            <div class="title-card-details">
                <div class="details">
                    <div class="title-card-name">
                        {{ titleDetails.name }}
                    </div>
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
        </router-link>
        
        <div class="controls">
            <i 
                class="bx bxs-heart icon-button favourite circle-bg"
                :class="{'active': titleDetails.favourite}"
                @click.stop="handleToggleFavourite()"
            ></i>
            <DropdownMenu :options="dropDownOptions" :bg-mode="true"/>
        </div>
    </div>
</template>

<script>
import { convert, getMediaUrl } from '@/utils/utils';
import IconTMDB from '@/components/icons/IconTMDB.vue';
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
                { icon: "bxs-time-five", label: "Add to Queue", action: () => {} },
                { icon: "bxs-collection", label: "Title Collections", action: () => {} },
                { icon: "bx-list-minus", label: "Remove Title", action: () => {} },
            ]
        }
    },
    props: {
        titleDetails: {
            type: Object,
            default: () => {}
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['favouriteToggle'],
    methods: {
        formatRuntime(runtime) {
            return convert.toRuntime(runtime);
        },
        getMediaUrl(path, sourceUrl, width) {
            return getMediaUrl(path, sourceUrl, width);
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
    position: relative;
    cursor: pointer;
    user-select: none;
}
.pointer-device .title-card:hover .title-card-name {
    text-decoration: underline;
}

/* Thumbnail Image */
.title-card-thumbnail {
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    width: 100%;
    aspect-ratio: 2/3;
    background-color: var(--color-background-card-section);
    z-index: 1;
    box-shadow: var(--shadow-card);
    transition: filter 0.1s ease-out;
}
.title-card-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.pointer-device .title-card:hover .title-card-thumbnail {
    filter: brightness(0.66);
}

/* Card Details */
.title-card-details {
    position: relative;
    font-size: var(--font-size-xs);
    margin-top: var(--spacing-sm);
    font-weight: 500;
    text-align: left;
    color: var(--color-text-5);
    opacity: 1;
    z-index: 3;
    transition: opacity 0.2s var(--cubic-1), transform 0.2s var(--cubic-1);
}

.title-card-name {
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--color-text-1);
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


/* Dropdown positioning */
.controls {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-xs);
    opacity: 0;
    transition: opacity 0.1s ease-out;
}
.title-card:hover .controls {
    opacity: 1;
}
.controls .dropdown-menu {
    position: relative;
}

.controls i {
    font-size: var(--font-size-xl);
}

.controls i.favourite.active {
    color: var(--color-secondary);
}
.pointer-device .controls i.favourite.active:hover {
    color: var(--color-secondary-hover);
}
.pointer-device .controls i.favourite.active:active {
    color: var(--color-secondary-active);
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
