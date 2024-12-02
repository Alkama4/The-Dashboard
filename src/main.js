import { createApp } from 'vue';
import App from './App.vue';
import './assets/poppins.css';
import './assets/global.css';
import router from './router';
import VueSelect from "vue-select";
import { notify } from './utils/notification';

createApp(App)
    .use(router)
    .component("v-select", VueSelect)
    .mount('#app');


// Notification when entering the pag
notify("Please note that this is a dev site and any changes aren't saved.", "info", 10000);