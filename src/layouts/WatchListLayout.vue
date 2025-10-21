<!-- layouts/WatchListLayout.vue -->
<template> 
    <TopBar
        title="WatchList"
        homeLink="/watch_list"
        :desktop-links="[
            { name: 'Search', path: '/watch_list/search', icon: 'bx-search'},
            { name: 'My Collections', path: '/watch_list/collections', icon: 'bxs-collection' },
            { name: '', path: '/watch_list/add_title', icon: 'bx-list-plus' },
            { path: '/watch_list/search', icon: 'bx-search', mobileLink: true },
        ]"
        :mobile-drawer-links="[
            { name: 'Search', path: '/watch_list/search', icon: 'bx-search' },
            { name: 'My Collections', path: '/watch_list/collections', icon: 'bxs-collection' },
            { name: 'Find Titles from TMDB', path: '/watch_list/add_title', icon: 'bx-list-plus' }
        ]"
    />
    <main class="watch-list-layout">
        <router-view/>
    </main>
    <FooterComponent/>
</template>

<script>
import TopBar from '@/components/common/TopBar.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';
import '@/assets/watchlist.css';

export default {
    name: 'WatchListLayout',
    components: {
        FooterComponent,
        TopBar,
    },
    mounted() {
        // document.body.classList.add('watchlist');
        document.documentElement.classList.add('watchlist')
    },
    unmounted() {
        // document.body.classList.remove('watchlist');
        document.documentElement.classList.remove('watchlist')
    },
}
</script>
