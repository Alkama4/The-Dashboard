<template>
    <div class="top-bar">
        <div
            class="desktop-nav-visual"
        ></div>

        <div class="desktop-nav-wrapper">
            <div class="top-bar desktop-nav">
                <div class="side">
                    <AppSelector :homeLink="homeLink"/>
                </div>
                <div class="side">
                    <component
                        v-for="(link, index) in links" 
                        :is="link.path ? 'router-link' : 'div'"
                        :key="index"
                        :to="link.path"
                        class="no-decoration"
                        :class="{ 
                            'icon-button': !link.name,
                            'text-button': link.name,
                            'desktop-only': link.showOnlyOn == 'desktop',
                            'mobile-only': link.showOnlyOn == 'mobile'
                        }"
                        @click="link.action"
                    >
                        <i class='bx' :class="link.icon"></i>
                        {{ link.name }}
                    </component>

                    <component
                        v-for="(link, index) in desktopLinks"
                        :key="index"
                        :is="link.path ? 'router-link' : 'div'"
                        :to="link.path"
                        class="no-decoration"
                        :class="{
                            'icon-button': !link.name,
                            'text-button': !!link.name,
                            'desktop-only': !link.mobileLink,
                            'mobile-only': link.mobileLink
                        }"
                        @click="link.action"
                    >
                        <i class='bx' :class="link.icon"></i>
                        {{ link.name }}
                    </component>

                    <!-- Dark mode button (componentize at some point?) -->
                    <DarkModeToggle class="desktop-only"/>
                    
                    <!-- Mobile only -->
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
                :to="homeLink" 
                class="no-decoration website-name"
                :class="{ active: $route.path === '/' }"
            >
                {{ title }}
            </router-link>

            <router-link
                v-for="(link, index) in mobileDrawerLinks"
                :key="index"
                :to="link.path"
                class="no-decoration text-button"
            >
                <i class='bx' :class="link.icon"></i>
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

            <DarkModeToggle/>
        </div>
    </div>
</template>

<script>
import AppLinkButton from '../common/AppLinkButton.vue';
import AppSelector from '../common/AppSelector.vue';
import getUsername from '@/utils/session.js'
import DarkModeToggle from './DarkModeToggle.vue';

export default {
    name: 'top-bar',
    components: {
        AppLinkButton,
        AppSelector,
        DarkModeToggle,
    },
    props: {
        title: {
            type: Text,
            default: 'The Dashboard',
        },
        homeLink: {
            type: String,
            default: "/"
        },
        desktopLinks: {
            type: Array,
            default: () => []
        },
        mobileLinks: {
            type: Array,
            default: () => []
        },
        mobileDrawerLinks: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            links: [],
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
            darkModeState: null,
        };
    },
    methods: {
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
    },
    computed: {
        username() {
            return getUsername()
        }
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

.icon-button,
.dark-mode-toggle {
    padding: 6px 10px;
    border-radius: var(--border-radius-sm);
    display: flex;
}

.text-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--color-text-3);
    font-size: var(--font-size-xsall);
    font-weight: 500;
    padding: 6px 15px;
    margin-left: 0;
    border-radius: var(--border-radius-sm);
    background-color: #24242400;
    transition: color 0.1s ease-out,
                background-color 0.1s ease-out,
                box-shadow 0.1s ease-out;
}
.text-button i {
    font-size: var(--font-size-lg);
}
.pointer-device .text-button:hover {
    color: var(--color-text-1);
}
.pointer-device .text-button:active {
    color: var(--color-text-0);
}


.desktop-only {
    display: flex;
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
        display: flex;
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
.text-button.router-link-active,
.icon-button.router-link-active {
    color: var(--color-button-nav-text);
    background-color: var(--color-button-nav-bg);
}

.pointer-device .text-button.router-link-active:hover,
.pointer-device .icon-button.router-link-active:hover {    
    color: var(--color-button-nav-text-hover);
    background-color: var(--color-button-nav-bg-hover);
    box-shadow: var(--shadow-button-hover);
}

.pointer-device .text-button.router-link-active:active,
.pointer-device .icon-button.router-link-active:active {    
    color: var(--color-button-nav-text-active);
    background-color: var(--color-button-nav-bg-active);
    box-shadow: var(--shadow-button-active);
}
</style>
