<template>
    <div class="top-bar-wrapper">
        <div class="top-bar desktop-nav">
            <div class="side">
                <router-link 
                    to="/" 
                    class="no-decoration website-name"
                >
                    The Dashboard
                </router-link>
            </div>
            <div class="side">
                <div
                    v-for="(link, index) in links" 
                    :key="index"
                    class="primary-div desktop-only"
                >
                    <router-link
                        :to="link.to"
                        class="no-decoration text-button primary-link"
                        :class="{ 'category-active': $route.path === link.to || $route.path.startsWith(link.to) }"
                    >
                        {{ link.display }}
                    </router-link>
                    <div class="children" v-if="link?.children.length > 0">
                        <router-link 
                            v-for="(child, index) in link.children" 
                            :key="index" 
                            :to="child.to"
                            class="no-decoration text-button child"
                        >
                            {{ child.display }}
                        </router-link>
                    </div>
                </div>
                <IconDarkMode class="icon-button desktop-only" @click="localToggleDarkMode"/>
                <IconMenu size="28px" class="icon-button mobile-only" @click="toggleMenu"/>
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
            <div
                v-for="(link, index) in links" 
                :key="index"
                class="primary-div"
            >
                <router-link
                    :to="link.to"
                    class="no-decoration text-button primary-link"
                    >
                    {{ link.display }}
                </router-link>
                <div class="children" v-if="link.children.length > 0">
                    <router-link 
                        v-for="(child, index) in link.children" 
                        :key="index" 
                        :to="child.to"
                        class="no-decoration text-button child"
                    >
                        {{ child.display }}
                    </router-link>
                </div>
            </div>
            <IconDarkMode class="icon-button" @click="localToggleDarkMode"/>
        </div>
    </div>
</template>

    <!-- <div id="top-bar">
        <div id="top-bar-content">
            <div class="top-bar-side">
                <router-link class="website-name" to="/">The Dashboard</router-link>
            </div>
            <div class="top-bar-side">
                <router-link 
                    v-for="link in links" 
                    :key="link.to" 
                    class="nav-button desktop-button" 
                    :to="link.to"
                >
                    {{ link.display }}
                </router-link>
                <button @click="localToggleDarkMode()" class="nav-button desktop-button square-button">
                    <IconDarkMode color="var(--color-button-nav)" color-hover="var(--color-button-nav-hover)"/>
                </button>
                <button @click="toggleMenu()" class="nav-button mobile-button square-button">
                    <IconMenu color="var(--color-button-nav)" color-hover="var(--color-button-nav-hover)"/>
                </button>
            </div>
        </div>
    </div>
    <div @click="toggleMenu()" ref="mobileNav" class="mobile-nav backdrop">
        <router-link class="website-name" to="/" style="padding-bottom: var(--spacing-md);">The Dashboard</router-link>
        <router-link 
            v-for="link in links" 
            :key="link.to" 
            class="nav-button" 
            :to="link.to"
        >
            {{ link.display }}
        </router-link>
        <button @click="localToggleDarkMode(); toggleMenu()" class="nav-button square-button">
            <IconDarkMode color="var(--color-button-nav)" color-hover="var(--color-button-nav-hover)"/>
        </button>
    </div> -->

<script>
import IconDarkMode from './icons/IconDarkMode.vue';
import IconMenu from './icons/IconMenu.vue';
import { toggleDarkMode } from '@/utils/darkMode';

export default {
    name: 'top-bar',
    components: {
        IconDarkMode,
        IconMenu,
    },
    data() {
        return {
            links: [
                { 
                    display: 'Spendings', 
                    to: '/spendings',
                    children: [
                        { display: 'Analytics', to: '/spendings/analytics' },
                        { display: 'Add Transaction', to: '/spendings/new_entry' },
                    ]
                },
                { 
                    display: 'Watch List', 
                    to: '/watch_list',
                    children: [
                        { display: 'Search', to: '/watch_list/titles' },
                        { display: 'Collections', to: '/watch_list/collections' },
                        { display: 'Add Title', to: '/watch_list/add_title' },
                    ]
                },
                { 
                    display: 'Account',
                    to: '/account',
                    children: []
                }
            ]
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
        localToggleDarkMode() {
            toggleDarkMode();
        }
    }
};
</script>

<style scoped>
.top-bar-wrapper {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    background-color: var(--color-background-top-bar);
    z-index: var(--z-top-bar);
}

.top-bar {
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

.top-bar .side {
    display: flex;
    flex-direction: row;
    align-items: center;
}


.website-name {
    font-weight: 800;
    font-size: var(--font-size-logo);
}

.text-button {
    color: var(--color-text-light);
    transition: color 0.1s ease-out;
    font-size: 18px;
    font-weight: 500;
}
.text-button:hover {
    color: var(--color-text);
}
.text-button:active {
    color: var(--color-text-bold);
}

.icon-button {
    padding: var(--spacing-sm);
}

.primary-div {
    display: flex;
    position: relative;
}
.mobile-nav .primary-div {
    flex-direction: column;
    align-items: flex-end;
}
.desktop-nav .primary-div {
    align-items: center;
    height: var(--height-top-bar);
    padding-inline: var(--spacing-sm);
}

.desktop-nav .primary-div .children {
    background-color: var(--color-background-top-bar);
    pointer-events: none;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(100% - 0px);
    left: calc(-1 * var(--spacing-md));
    min-width: 120px;
    
    padding: var(--spacing-md);
    padding-inline: calc(var(--spacing-md) + var(--spacing-sm));
    padding-top: 0;
    border-radius: var(--border-radius-medium);
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    opacity: 0;

    transition: opacity 0.1s ease-out;
}
.desktop-nav .primary-div:hover .children {
    opacity: 1;
    pointer-events: all;
}

.desktop-only .primary-div .children .child {
    width: 100%;
}

.primary-div .children .child {
    /* font-weight: 400; */
    padding: var(--spacing-xs) 0;
    /* color: var(--color-text-lighter); */
}
.primary-div .children .child:hover {
    color: var(--color-text);
}

.mobile-only {
    display: none;
}
@media (max-width: 750px) {
    .mobile-only {
        display: unset;
    }
    .desktop-only {
        display: none !important;
    }
}

/* - - - - - Mobile nav - - - - - */

.mobile-nav {
    padding: calc(var(--spacing-lg) + var(--spacing-md)) var(--spacing-lg);
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-out;
}
.mobile-nav.show {
    pointer-events: unset;
    opacity: 1;
}

.mobile-nav .website-name {
    font-size: 2rem;
}
.mobile-nav .primary-div,
.mobile-nav .icon-button {
    margin-top: 32px;
}
.mobile-nav .primary-link {
    /* color: var(--color-text); */
    font-size: 1.5rem;
}
.mobile-nav .children {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.mobile-nav .child {
    margin-top: var(--spacing-xs);
    /* margin-right: var(--spacing-lg); */
    text-align: end;
    color: var(--color-text-light);
    font-size: 1.2rem;
}

.category-active {
    color: var(--color-text) !important;
}

.router-link-active {
    /* color: var(--color-text-hidden) !important;
    background-color: var(--color-text);
    padding-inline: var(--spacing-md) !important;
    border-radius: var(--border-radius-small); */
    
    color: var(--color-text) !important;
}

</style>