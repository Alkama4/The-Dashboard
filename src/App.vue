<template>
    <TopBar/>
    <SideBar @toggle-dark-mode="toggleDarkMode" @toggle-side-bar="toggleSideBar"/>
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
import SideBar from './components/SideBar.vue';

// Exports
export default {
    name: 'App',
    components: {
        TopBar,
        SideBar,
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
    /* Use the global.css file instead of this */
</style>