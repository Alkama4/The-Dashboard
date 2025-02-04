import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AccountPage from '../views/AccountPage.vue';
import SpendingsPage from '../views/SpendingsPage.vue';
import NewEntryPage from '@/views/NewEntryPage.vue';
import LogInPage from '@/views/LogInPage.vue';
import DebugPage from '@/views/DebugPage.vue';
import AnalyticsPage from '@/views/AnalyticsPage.vue';
import FourOFourPage from '@/views/404Page.vue'
import WatchList from '@/views/WatchList.vue';
import AddTitle from '@/views/AddTitle.vue';
import TitleDetails from '@/views/TitleDetails.vue';

const routes = [
    {
        path: '/',              // URL path
        name: 'Home',           // Route name, propably just for me?
        component: HomePage,    // Component
        meta: { title: 'Home' } // The updating title part after "-" in the browser tab
    },
    {
        path: '/account',
        name: 'Account',
        component: AccountPage,
        meta: { title: 'Account' }
    },
    {
        path: '/spendings',
        name: 'Spendings',
        component: SpendingsPage,
        meta: { title: 'Spendings' }
    },
    {
        path: '/spendings/newEntry',
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
        path: '/watchList',
        name: 'Watch list',
        component: WatchList,
        meta: { title: 'Watch list' }
    },
    {
        path: '/watchList/addTitle',
        name: 'Add Title',
        component: AddTitle,
        meta: { title: 'Add Title' }
    },
    {
        path: '/watchList/title/:title',
        name: 'Title Details',
        component: TitleDetails,
        meta: { title: 'Title Details' }
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
