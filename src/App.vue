<template>
    <TopBar/>
    <main>
        <RouterView/>
    </main>
    <footer class="center">
        <p>&copy; 2024 Aleksi Malkki</p>
    </footer>
</template>

<script>
// Imports
import { initializeDarkMode } from './utils/darkMode';
import TopBar from './components/TopBar.vue';
import api from './utils/dataQuery';

// Exports
export default {
    name: 'App',
    components: {
        TopBar,
    },
    async mounted() {
        initializeDarkMode();
        api.getLoginStatus();
    },
}
</script>

<style>
    @import "vue-select/dist/vue-select.css";
</style>