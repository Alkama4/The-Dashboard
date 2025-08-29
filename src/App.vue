<template>
    <RouterView/>
</template>

<script>
// Imports
import { initializeDarkMode } from './utils/darkMode';
// import TopBar from './components/TopBar.vue';
import session from './utils/session';
import { isTouchDevice } from './utils/config';

// Exports
export default {
    name: 'App',
    components: {
        // TopBar,
    },
    async mounted() {
        // Check for browser stuff and localstorage for previous choises
        initializeDarkMode();

        // Set touch-device class if touch device
        if (isTouchDevice) 
            document.documentElement.classList.add("touch-device");
        else
            document.documentElement.classList.add("pointer-device");


        // Automatically check the login status so that it can be used page wide 
        session.check();
    },
}
</script>