<!-- layouts/WatchListLayout.vue -->
<template>
    <TopBar title="WatchList"/>
    <main class="watch-list-layout">
        <router-view/>
    </main>
    <FooterComponent/>
</template>

<script>
import FooterComponent from '@/components/common/FooterComponent.vue';
import TopBar from '@/components/WatchList/TopBar.vue';
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
