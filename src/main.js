import { createApp } from 'vue';
import App from './App.vue';
import './assets/poppins.css';
import './assets/global.css';
import router from './router';
import VueSelect from "vue-select";

createApp(App)
    .use(router)
    .component("v-select", VueSelect)
    .mount('#app');

// Notification when entering the site
// notify("This is a development site. Please note that any changes made here will not be saved.", "info", 10000);
