import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import SpendingsPage from '../views/SpendingsPage.vue';
import NewEntryPage from '@/views/NewEntryPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: { title: 'Home' }
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage,
        meta: { title: 'About' }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsPage,
        meta: { title: 'Settings' }
    },
    {
        path: '/spendings',
        name: 'Spendings',
        component: SpendingsPage,
        meta: { title: 'Spendings' }
    },
    {
        path: '/newentry',
        name: 'New Entry',
        component: NewEntryPage,
        meta: { title: 'New Entry' }
    }
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `Dashboard - ${to.meta.title || 'Default Title'}`;
    next();
});

// Export the router instance
export default router;
