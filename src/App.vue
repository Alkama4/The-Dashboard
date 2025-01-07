<template>
    <TopBar @toggle-dark-mode="toggleDarkMode"/>
    <main>
        <RouterView/>
    </main>
    <footer>
        <p>&copy; 2024 Aleksi Malkki</p>
    </footer>
</template>

<script>
// Imports
import { initializeDarkMode } from './utils/darkMode';
import TopBar from './components/TopBar.vue';

// Exports
export default {
    name: 'App',
    components: {
        TopBar,
    },
    mounted() {
        initializeDarkMode();
    },
}
</script>

<style>
    @import "vue-select/dist/vue-select.css";
</style>