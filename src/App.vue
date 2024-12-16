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
import TopBar from './components/TopBar.vue';
import { notify } from './utils/notification';

// Exports
export default {
    name: 'App',
    components: {
        TopBar,
    },
    methods: {
        toggleDarkMode() {
            console.info("Dark mode toggled!");
            toggleDarkMode();
        },
        notify(message, messageType, duration) {
            // console.info("Notification shown.");
            notify(message, messageType, duration);
        },
    },
    mounted() {
        initializeDarkMode();
        this.$root.notify = this.notify; // Expose the notify method on the root instance
    },
}
</script>

<style>
    @import "vue-select/dist/vue-select.css";
</style>