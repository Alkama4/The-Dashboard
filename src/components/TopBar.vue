<template>
    <div class="desktop-nav-wrapper">
        <div class="top-bar desktop-nav" @mouseleave="handleMouseleave()">
            <div class="primary-row">
                <div class="side">
                    <router-link 
                        to="/" 
                        class="no-decoration website-name"
                    >
                        The Dashboard
                    </router-link>
                </div>
                <div class="side">
                    <router-link
                        v-for="(link, index) in links" 
                        :key="index"
                        :to="link.to"
                        class="no-decoration text-button primary-link desktop-only"
                        :class="{ 'category-active': $route.path === link.to || $route.path.startsWith(link.to) }"
                        @mouseover="handleMouseover(index)"
                    >
                        {{ link.display }}
                    </router-link>
                    <IconDarkMode class="icon-button desktop-only" @click="localToggleDarkMode"/>
                    <IconMenu size="28px" class="icon-button mobile-only" @click="toggleMenu"/>
                </div>
            </div>
            <div class="secondary-row" ref="secondaryRow">
                <div class="secondary-row-content" ref="secondaryRowContent">
                    <router-link 
                        v-for="(link, index) in links[mouseoverIndex]?.children" 
                        :key="index"
                        class="no-decoration text-button"
                        :to="link.to"
                    >
                        {{ link.display }}
                    </router-link>
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
            <div
                v-for="(link, index) in links" 
                :key="index"
                class="primary-area"
            >
                <router-link
                    :to="link.to"
                    class="no-decoration text-button primary-link"
                >
                    {{ link.display }}
                </router-link>
                <router-link 
                    v-for="(child, index) in link.children" 
                    :key="index" 
                    :to="child.to"
                    class="no-decoration text-button primary-link"
                >
                    {{ child.display }}
                </router-link>
            </div>
            <IconDarkMode class="icon-button dark-mode-toggle" @click="localToggleDarkMode"/>
        </div>
    </div>
</template>

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
            ],
            mouseoverIndex: 0,
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
        },
        handleMouseover(index) {
            this.mouseoverIndex = index;
            setTimeout(() => {
                if (this.links[index].children.length === 0) {
                    this.$refs.secondaryRow.style.height = "0px";
                } else {
                    this.$refs.secondaryRow.style.height = this.$refs.secondaryRowContent.scrollHeight + 'px';
                }
            }, 1);
        },
        handleMouseleave() {
            this.$refs.secondaryRow.style.height = "0px";
            this.mouseoverIndex = null;
        }
    }
};
</script>

<style scoped>
/* This has the actual styling */
.desktop-nav-wrapper {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    background-color: var(--color-background-top-bar);
    backdrop-filter: blur(30px);    /* Keep under 1/2 of height */
    border-bottom: 1px solid var(--color-border);
    z-index: var(--z-top-bar);
}

.desktop-nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding-inline: var(--spacing-md);
    box-sizing: border-box;

    width: 100%;
    max-width: var(--width-top-bar);

    white-space: nowrap;
}
.desktop-nav .primary-row {
    height: 60px;
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.desktop-nav .primary-row .side {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.desktop-nav .secondary-row {
    width: 100%;
    transition: height 0.2s var(--cubic-1);
    height: 0;
    overflow: hidden;
}
.desktop-nav .secondary-row-content {
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;
    padding-top: var(--spacing-sm);
    padding-bottom: var(--spacing-md);
    border-top: 2px solid var(--color-border);
}


.website-name {
    font-weight: 800;
    font-size: var(--font-size-logo);
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
.text-button:hover {
    color: var(--color-text);
}
.text-button:active {
    color: var(--color-text-bold);
}

.icon-button {
    padding: var(--spacing-sm);
}

.desktop-only {
    display: unset;
}
.mobile-only {
    display: none;
}
@media (max-width: 650px) {
    .mobile-only {
        display: unset;
    }
    .desktop-only {
        display: none;
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

/* Active link styling */
.text-button.router-link-active {
    color: var(--color-text);
    background-color: var(--color-button-general);
}
.pointer-device .text-button.router-link-active:hover {    
    color: var(--color-text-bold);
    background-color: var(--color-button-general-hover);
}

</style>