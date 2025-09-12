import { createApp } from 'vue';
import App from './App.vue';
import './assets/poppins.css';
import './assets/global.css';
import router from './router';
import 'boxicons/css/boxicons.min.css';
import { notify } from './utils/notification';

const app = createApp(App);

if (process.env.VUE_APP_STANDALONE_BUILD === "true") {
    const disclaimer = "Please note: This app is in standalone mode. Most features are disabled, but you can browse the site to explore its look and feel.";
    notify(disclaimer, "info", 15000);
    console.warn(disclaimer);
}

app.use(router).mount('#app');
