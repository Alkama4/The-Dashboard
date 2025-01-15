import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import SpendingsPage from '../views/SpendingsPage.vue';
import NewEntryPage from '@/views/NewEntryPage.vue';
import LogInPage from '@/views/LogInPage.vue';
import DebugPage from '@/views/DebugPage.vue';
import AnalyticsPage from '@/views/AnalyticsPage.vue';
import FourOFourPage from '@/views/404Page.vue'

const routes = [
    {
        path: '/',              // URL path
        name: 'Home',           // Route name, propably just for me?
        component: HomePage,    // Component
        meta: { title: 'Home' } // The updating title part after "-" in the browser tab
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
    },
    {
        path: '/login',
        name: 'Log in',
        component: LogInPage,
        meta: { title: 'Log In' }
    },
    {
        path: '/debug',
        name: 'Debug',
        component: DebugPage,
        meta: { title: 'Debug' }
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: AnalyticsPage,
        meta: { title: 'Analytics' }
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: FourOFourPage,
        meta: { title: '404' }
    }
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        return {top: 0};
    }
});

router.beforeEach((to, from, next) => {
    document.title = `Dashboard - ${to.meta.title || 'Default Title'}`;
    next();
});

// Export the router instance
export default router;
