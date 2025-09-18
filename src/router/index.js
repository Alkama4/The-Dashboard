import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { standAloneBuild } from '@/utils/config';

const DashboardLayout = () => import('@/layouts/DashboardLayout.vue')
const SpendingsLayout = () => import('@/layouts/SpendingsLayout.vue')
const WatchListLayout  = () => import('@/layouts/WatchListLayout.vue')

const routes = [
  /*  ── Dashboard section ──────────────────────────────────────── */
  {
    path: '/',
    component: DashboardLayout,
    children: [
      { path: '', name: 'Home', component: () => import('@/views/HomePage.vue'), meta: { title: 'Home' } },
      { path: 'account', component: () => import('@/views/AccountPage.vue'), meta: { title: 'Account' } },
      { path: 'account/login', component: () => import('@/views/LogInPage.vue'), meta: { title: 'Log In' } },
      { path: 'account/create', component: () => import('@/views/CreateAccountPage.vue'), meta: { title: 'Create Account' } },
    ]
  },

  /*  ── Spendings section ───────────────────────────────────────── */
  {
    path: '/spendings',
    component: SpendingsLayout,
    children: [
      { path: '', name: 'Spendings', component: () => import('@/views/Spendings/SpendingsPage.vue'), meta: { title: 'Spendings' } },
      { path: 'new_entry', component: () => import('@/views/Spendings/NewEntryPage.vue'), meta: { title: 'New Entry' } },
      { path: 'analytics', component: () => import('@/views/Spendings/AnalyticsPage.vue'), meta: { title: 'Analytics' } },
    ]
  },

  /*  ── Watch List section ───────────────────────────────────────── */
  {
    path: '/watch_list',
    component: WatchListLayout,
    children: [
      { path: '', redirect: '/watch_list/discover' },
      { path: 'discover', name: 'Discover', component: () => import('@/views/WatchList/DiscoverPage.vue'), meta: { title: 'Discover' } },
      { path: 'add_title', component: () => import('@/views/WatchList/AddTitlePage.vue'), meta: { title: 'Add Title' } },
      { path: 'title/:titleID', component: () => import('@/views/WatchList/TitleDetailsPage.vue'), meta: { title: 'Title Details' } },
      { path: 'collections', component: () => import('@/views/WatchList/ListCollectionsPage.vue'), meta: { title: 'Collections' } },
      { path: 'collection/:collectionId', component: () => import('@/views/WatchList/CollectionDetails.vue'), meta: { title: 'Collection Details' } },
      { path: 'search', component: () => import('@/views/WatchList/ListTitlesPage.vue'), meta: { title: 'Search' } },
    ]
  },

  /*  ── Miscellaneous ─────────────────────────────────────────────── */
  { path: '/:catchAll(.*)', name: '404', component: () => import('@/views/404Page.vue'), meta: { title: '404' } },
]


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
