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
