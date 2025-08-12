<template>
    <div class="title-showcase-details">
        <img 
            :src="`${apiUrl}/media/image/title/${titleDetails?.title_id}/logo.${titleDetails?.logo_file_type}${titleDetails?.logo_file_type != 'svg' ? '?width=900' : ''}`"
            @load="(event) => event.target.classList.add('loaded')"
            class="title-logo"
        >
        <span class="info icon-align">
            <IconTMDB right="3px"/> {{ titleDetails.tmdb_vote_average }} &bull; 
            
            {{ formattedReleaseDate }} &bull;

            {{ titleDetails.age_rating }} &bull;

            <template v-if="titleDetails.type == 'tv'">
                {{ titleDetails.season_count }} Seasons, {{ titleDetails.episode_count }} Episodes
            </template>

            <template v-else>
                {{ formattedRuntime }}
            </template>
        </span>
        <!-- <div class="tags">
            <div class="tag tag-positive" v-if="titleDetails.watch_count >= 1">
            {{ titleDetails.watch_count }} watch{{ titleDetails.watch_count > 1 ? 'es' : '' }}

            </div>
            <div class="tag tag-primary" v-if="new Date(titleDetails.release_date) < new Date() && new Date(titleDetails.release_date) > new Date(new Date() - 30 * 24 * 60 * 60 * 1000)">
                New release
            </div>
            <div class="tag tag-upcoming" v-if="new Date(titleDetails.release_date) > new Date()">
                Upcoming
            </div>
            <div class="tag tag-secondary" v-if="titleDetails.favourite == 1">
                Favourite
            </div>
            <div class="tag tag-type">
                {{ titleDetails.type == 'tv' ? 'TV-show' : 'Movie' }}
            </div>
            <div class="tag" v-for="collection in titleDetails.collections" :key="collection.collection_id">{{ collection }}</div>
        </div> -->
        
        <span class="overview">{{ titleDetails?.overview }} </span>
        <router-link :to="`/watch_list/title/${titleDetails?.title_id}`" class="link-button no-decoration">View details</router-link>
    </div>
</template>

<script>
import { apiUrl } from '@/utils/config';
import IconTMDB from './icons/IconTMDB.vue';
import { convert } from '@/utils/utils';

export default {
    name: 'TitleShowcaseDetails',
    data() {
        return {
            apiUrl: apiUrl,
        }
    },
    components: {
        IconTMDB,
    },
    props: {
        titleDetails: {
            type: Object,
            required: true,
        }
    },
    mounted() {
        console.log(this.titleDetails)
    },
    computed: {
        formattedReleaseDate() {
            return convert.toFiDate(this.titleDetails.release_date, 'year');
        },
        formattedRuntime() {
            return convert.runtime(this.titleDetails.movie_runtime);
        }
    }
}
</script>

<style scoped>
.title-showcase-details {
    position: absolute;
    top: 0;
    bottom: calc(var(--spacing-sm) + 10px + var(--spacing-lg));
    left: 10%;
    right: 10%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: end;
    row-gap: var(--spacing-md);
    /* background-color: rgba(255, 0, 0, 0.368); */
}

.title-showcase-details .title-logo {
    border-radius: var(--border-radius-medium);
    width: 33%;
    min-width: 150px;
    max-height: 110px;
    max-width: 400px;
    object-fit: contain;
    object-position: left;
}

.title-showcase-details .overview {
    /* font-size: var(--font-size-sm); */
    display: -webkit-box;
    width: 66ch;
    max-width: 100%;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.title-showcase-details .info {
    color: var(--color-text-light);
    font-weight: 500;
}

/* .title-showcase-details .tags {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--spacing-sm);
    row-gap: var(--spacing-xs);
} */

@media (max-width: 700px) {
    .title-showcase-details {
        font-size: var(--font-size-sm);
        row-gap: var(--spacing-sm);
    }
    /* .title-showcase-details .tags {
        display: none;
    } */
}
</style>