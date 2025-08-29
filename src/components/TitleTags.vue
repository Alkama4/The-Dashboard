<template>
    <div class="title-tags">
        <div class="tag tag-warning" v-if="!titleInfo.in_watch_list">
            Not in watchlist
        </div>
        <div class="tag tag-positive" v-if="titleInfo.watch_count >= 1">
            {{ titleInfo.watch_count }} watch{{ titleInfo.watch_count > 1 ? 'es' : '' }}
        </div>
        <div class="tag tag-primary" v-if="new Date(titleInfo.release_date) < new Date() && new Date(titleInfo.release_date) > newReleaseCutoffDate">
            New release
        </div>
        <div class="tag tag-upcoming" v-if="new Date(titleInfo.release_date) > new Date()">
            Upcoming
        </div>
        <router-link 
            v-if="titleInfo.favourite == 1"
            :to="'/watch_list/titles?favourite=true'"
            target="_blank"
            class="tag tag-secondary no-decoration hover-decoration" 
        >
            Favourite
        </router-link>
        <router-link 
            :to="`/watch_list/titles?title_type=${titleInfo.type}`"
            target="_blank"
            class="tag no-decoration hover-decoration"
        >
            {{ titleInfo.type == 'tv' ? 'TV-show' : 'Movie' }}
        </router-link>
        <router-link 
            class="tag no-decoration hover-decoration" 
            v-for="(genre, index) in titleInfo.genres" 
            :key="index"
            target="_blank"
            :to="`/watch_list/titles?genre=${genre}`"
        >
            {{ genre }}
        </router-link>
    </div>
</template>

<script>
import { newReleaseCutoffDate } from '@/utils/config';

export default {
    name: "TitleTags",
    props: {
        titleInfo: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            newReleaseCutoffDate: newReleaseCutoffDate,
        }
    }
}
</script>

<style scoped>
.title-tags {
    gap: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>