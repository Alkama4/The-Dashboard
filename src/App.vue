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
import { toggleDarkMode, initializeDarkMode } from './utils/darkMode';
import { toggleSideBar , initializeSideBar} from './utils/sideBar';
import TopBar from './components/TopBar.vue';

// Exports
export default {
    name: 'App',
    components: {
        TopBar,
    },
    mounted() {
        initializeDarkMode();
        initializeSideBar();
    },
    methods: {
        toggleDarkMode() {
            console.info("Dark mode toggled!");
            toggleDarkMode();
        },
        toggleSideBar() {
            console.info("Side bar toggled!");
            toggleSideBar();
        }
    }
}
</script>

<style>
    @import "vue-select/dist/vue-select.css";
</style>