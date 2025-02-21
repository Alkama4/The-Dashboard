<template>
    <TopBar/>
    <main>
        <RouterView/>
    </main>
    <footer class="center">
        <router-link to="/debug"><p>
            &copy; 2024 Aleksi Malkki
        </p></router-link>
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
        // Check for browser stuff and localstorage for previous choises
        initializeDarkMode();

        // Automatically check the login status so that it can be used page wide 
        api.getLoginStatus();
    },
}
</script>

<style>
    @import "vue-select/dist/vue-select.css";
</style>