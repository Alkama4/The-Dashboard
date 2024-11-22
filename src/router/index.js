import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import SpendingsPage from '../views/SpendingsPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsPage
    },
    {
        path: '/spendings',
        name: 'Spendings',
        component: SpendingsPage
    }
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Export the router instance
export default router;
