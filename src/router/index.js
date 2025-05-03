import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { standAloneBuild } from '@/utils/config';

import HomePage from '@/views/HomePage.vue';
import AccountPage from '@/views/AccountPage.vue';
import LogInPage from '@/views/LogInPage.vue';
import CreateAccountPage from '@/views/CreateAccountPage.vue';
import DebugPage from '@/views/DebugPage.vue';
import FourOFourPage from '@/views/404Page.vue';

// Spendings
import SpendingsPage from '@/views/Spendings/SpendingsPage.vue';
import NewEntryPage from '@/views/Spendings/NewEntryPage.vue';
import AnalyticsPage from '@/views/Spendings/AnalyticsPage.vue';

// WatchList
import WatchList from '@/views/WatchList/WatchListPage.vue';
import AddTitle from '@/views/WatchList/AddTitlePage.vue';
import TitleDetails from '@/views/WatchList/TitleDetailsPage.vue';
import ListCollections from '@/views/WatchList/ListCollectionsPage.vue';
import ListTitles from '@/views/WatchList/ListTitlesPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: { title: 'Home' }
    },

    // ----------- /account -----------
    {
        path: '/account',
        name: 'Account',
        component: AccountPage,
        meta: { title: 'Account' }
    },
    {
        path: '/account/login',
        name: 'Log in',
        component: LogInPage,
        meta: { title: 'Log In' }
    },
    {
        path: '/account/create',
        name: 'Create account',
        component: CreateAccountPage,
        meta: { title: 'Create Account' }
    },

    // ----------- /spendings -----------
    {
        path: '/spendings',
        name: 'Spendings',
        component: SpendingsPage,
        meta: { title: 'Spendings' }
    },
    {
        path: '/spendings/new_entry',
        name: 'New Entry',
        component: NewEntryPage,
        meta: { title: 'New Entry' }
    },
    {
        path: '/spendings/analytics',
        name: 'Analytics',
        component: AnalyticsPage,
        meta: { title: 'Analytics' }
    },

    // ----------- /watch_list -----------
    {
        path: '/watch_list',
        name: 'Watch list',
        component: WatchList,
        meta: { title: 'Watch List' }
    },
    {
        path: '/watch_list/add_title',
        name: 'Add Title',
        component: AddTitle,
        meta: { title: 'Add Title' }
    },
    {
        path: '/watch_list/title/:titleID',
        name: 'Title Details',
        component: TitleDetails,
        meta: { title: 'Title Details' }
    },
    {
        path: '/watch_list/collections',
        name: 'Collections',
        component: ListCollections,
        meta: { title: 'Collections' }
    },
    {
        path: '/watch_list/titles',
        name: 'Titles',
        component: ListTitles,
        meta: { title: 'Titles' }
    },

    
    // ----------- Mixed -----------
    {
        path: '/debug',
        name: 'Debug',
        component: DebugPage,
        meta: { title: 'Debug' }
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: FourOFourPage,
        meta: { title: '404' }
    }
];


// Create the router instance
function scrollToElementWithOffset(element) {
    // Offset to compensate for topbar + a little gap
    const offset = 60 + 8;
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;

    // Scroll to the element's top position plus the offset
    window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
    });
}

const router = createRouter({
    history: standAloneBuild 
    ? createWebHashHistory(process.env.BASE_URL) 
    : createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            // Check if the element exists after a slight delay
            const element = document.getElementById(to.hash.slice(1)); // Remove the '#' from the hash
            if (element) {
                // Scroll the element into view with smooth behavior
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Reuse the scroll logic with offset
                scrollToElementWithOffset(element);

                // Return saved position in case the user is going back
                return savedPosition;
            } else {
                // If the element is not found, return saved position
                return savedPosition;
            }
        }

        // Default return for non-hash routes
        return savedPosition || { top: 0 };
    }
});

// Add the scrollToElementWithOffset function as a method on the router instance
router.scrollToElementWithOffset = scrollToElementWithOffset;
  
router.beforeEach((to, from, next) => {
    document.title = `Dashboard - ${to.meta.title || 'Default Title'}`;
    next();
});

// Export the router instance
export default router;
