import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
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
import CreateAccountPage from '@/views/CreateAccountPage.vue';

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
        path: '/spendings/new_entry',
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
        path: '/create_account',
        name: 'Create account',
        component: CreateAccountPage,
        meta: { title: 'Create account' }
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
        path: '/watch_list',
        name: 'Watch list',
        component: WatchList,
        meta: { title: 'Watch list' }
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
    history: process.env.VUE_APP_STANDALONE_BUILD === 'false' 
    ? createWebHistory(process.env.BASE_URL) 
    : createWebHashHistory(process.env.BASE_URL),
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
