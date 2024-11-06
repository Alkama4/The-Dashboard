import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; // Make sure to import your Home component
import AboutPage from '../views/AboutPage.vue'; // Import the new About page
import SettingsPage from '../views/SettingsPage.vue'; // Import the new About page

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage // Your existing home component
    },
    {
        path: '/about', // Use a lowercase path for consistency
        name: 'About',
        component: AboutPage // Reference to the new component
    },
    {
        path: '/settings', // Use a lowercase path for consistency
        name: 'Settings',
        component: SettingsPage // Reference to the new component
    }
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// Export the router instance
export default router;
