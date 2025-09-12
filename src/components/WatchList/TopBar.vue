<template>
    <div class="top-bar">
        <div
            class="desktop-nav-visual"
        ></div>

        <div class="desktop-nav-wrapper">
            <div class="top-bar desktop-nav">
                <div class="side">
                    <AppSelector/>
                </div>
                <input 
                    type="text" 
                    placeholder="Search for titles" 
                    class="search"
                    v-model="searchBarValue" 
                    @focus="searchBarInput"
                    @input="searchBarInput"
                >
                <div class="side">
                    <router-link
                        v-for="(link, index) in links" 
                        :key="index"
                        :to="link.path"
                        class="no-decoration text-button desktop-only"
                        :class="{ 'category-active': $route.path === link.to || $route.path.startsWith(link.to) }"
                    >
                        {{ link.name }}
                    </router-link>
                    <i class='bx bxs-moon icon-button desktop-only' @click="localToggleDarkMode"></i>
                    
                    <i class='bx bx-menu icon-button mobile-only' @click="toggleMenu"></i>
                </div>
            </div>
        </div>
        
        <div 
            @click="toggleMenu"
            ref="mobileNav"
            class="mobile-nav backdrop"
        >
            <router-link 
                to="/" 
                class="no-decoration website-name"
                :class="{ active: $route.path === '/' }"
            >
                The Dashboard
            </router-link>
            <router-link
                v-for="(link, index) in links" 
                :key="index"
                :to="link.path"
                class="no-decoration text-button"
            >
                {{ link.name }}
            </router-link>

            <div class="seperator"></div>

            <div class="app-wrapper">
                <AppLinkButton
                    v-for="(app, i) in appLinks" 
                    :key="i" 
                    :name="app.name"
                    :path="app.path"
                    :icon="app.icon"
                />
            </div>
            <i class='bx bxs-moon icon-button dark-mode-toggle' @click="localToggleDarkMode"></i>
        </div>
    </div>
</template>

<script>
import { toggleDarkMode } from '@/utils/darkMode';
import AppLinkButton from '../common/AppLinkButton.vue';
import AppSelector from '../common/AppSelector.vue';

export default {
    name: 'top-bar',
    components: {
        AppLinkButton,
        AppSelector,
    },
    props: {
        title: {
            type: Text,
            default: 'The Dashboard',
        }
    },
    data() {
        return {
            links: [
                { 
                    name: 'Discover', 
                    path: '/watch_list/discover',
                },
                { 
                    name: 'Collections', 
                    path: '/watch_list/collections',
                },
                { 
                    name: 'Add titles',
                    path: '/watch_list/add_title',
                }
            ],
            appLinks: [
                {
                    name: 'Dashboard',
                    path: '/',
                    icon: 'bxs-dashboard'
                },
                {
                    name: 'Spendings',
                    path: '/spendings',
                    icon: 'bxs-credit-card'
                },
                {
                    name: 'Watch list',
                    path: '/watch_list',
                    icon: 'bxs-movie'
                },
            ],
            mouseoverIndex: 0,
            searchBarValue: '',
        };
    },
    methods: {
        searchBarInput() {
            this.$router.push({
                path: '/watch_list/search',
                query: {
                    ...this.$route.query,        // keep existing params
                    search_term: this.searchBarValue || undefined // add/replace
                }
            });
        },
        toggleMenu() {
            const mobileNav = this.$refs.mobileNav;
            const isShowing = mobileNav.classList.contains('show');
            
            if (isShowing) {
                mobileNav.classList.remove('show');
                document.documentElement.classList.remove('no-scroll');
            } else {
                mobileNav.classList.add('show');
                document.documentElement.classList.add('no-scroll');
            }
        },
        localToggleDarkMode() {
            toggleDarkMode();
        },
    }
};
</script>

<style scoped>
.top-bar {
    z-index: var(--z-top-bar);
}

.desktop-nav-visual {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    display: flex;
    justify-content: center;

    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-background-top-bar);
    backdrop-filter: var(--blur-top-bar);
}

.desktop-nav-wrapper {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
}

.desktop-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding-inline: var(--spacing-md);
    box-sizing: border-box;

    width: 100%;
    max-width: var(--width-top-bar);
    height: 60px;

    white-space: nowrap;
}
.desktop-nav .side {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.search {
    margin-inline: var(--spacing-xl);
    margin-left: var(--spacing-xl);
}
.search:focus-visible {
    width: 100%;
}

.website-name {
    font-weight: 800;
    font-size: var(--font-size-logo);
}

.icon-button {
    padding: 6px 10px;
}

.text-button {
    color: var(--color-text-light);
    font-size: var(--font-size-small);
    font-weight: 500;
    padding: 6px 10px;
    margin-left: 0;
    border-radius: var(--border-radius-medium);
    background-color: #24242400;
    transition: color 0.1s ease-out,
                background-color 0.1s ease-out;
}
.pointer-device .text-button:hover {
    color: var(--color-text);
}
.pointer-device .text-button:active {
    color: var(--color-text-bold);
}


.desktop-only {
    display: unset;
}
.mobile-only {
    display: none;
}

@media (max-width: 1200px) {
    .search {
        margin-right: var(--spacing-md);
    }
}
@media (max-width: 900px) {
    .mobile-only {
        display: unset;
    }
    .desktop-only {
        display: none;
    }
    .search {
        margin-left: var(--spacing-md);
        margin-right: var(--spacing-sm);
    }
}


/* - - - - - Mobile nav - - - - - */

.mobile-nav {
    padding: calc(var(--spacing-lg) + var(--spacing-md)) var(--spacing-lg);
    display: flex;
    flex-direction: column;

    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-out;
}
.mobile-nav.show {
    pointer-events: unset;
    opacity: 1;
}

.mobile-nav .website-name {
    font-size: var(--font-size-xxl);
    margin-bottom: var(--spacing-md)
}

.mobile-nav .seperator {
    margin: var(--spacing-md) 0;
}

.mobile-nav .primary-area {
    display: flex;
    flex-direction: column;
    border-top: 2px solid var(--color-border);
    padding: var(--spacing-sm) 0;
}

.mobile-nav .text-button {
    font-size: var(--font-size-lg);
}

.mobile-nav .dark-mode-toggle {
    position: absolute;
    top: 52px;
    right: 28px;
}

.mobile-nav .app-wrapper {
    display: flex;
    flex-wrap: wrap;
}

.mobile-nav .app-link-button {
    flex: 1;
}

/* Active link styling */
.text-button.router-link-active {
    color: var(--color-text-black);
    background-color: var(--color-primary);
}
.pointer-device .text-button.router-link-active:hover {    
    color: var(--color-text-black-hover);
    background-color: var(--color-primary-hover);
}

</style>