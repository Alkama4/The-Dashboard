<template>
    <div id="top-bar">
        <div id="top-bar-content">
            <div class="top-bar-side">
                <router-link class="website-name" to="/" >The Dashboard</router-link>
            </div>
            <div class="top-bar-side">
                <router-link class="nav-button desktop-button" to="/spendings">Spendings data</router-link>
                <!-- <router-link class="nav-button desktop-button" to="/spendings">Spendings analysis</router-link> -->
                <router-link class="nav-button desktop-button" to="/newentry">New entry</router-link>
                <router-link class="nav-button desktop-button" to="/about">About page</router-link>
                <router-link class="nav-button desktop-button" to="/settings">Settings</router-link>
                <button @click="$emit('toggle-dark-mode')" class="nav-button desktop-button square-button">
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
        <router-link class="nav-button" to="/spendings">Spendings data</router-link>
        <!-- <router-link class="nav-button" to="/spendings">Spendings analysis</router-link> -->
        <router-link class="nav-button" to="/newentry">New entry</router-link>
        <router-link class="nav-button" to="/about">About page</router-link>
        <router-link class="nav-button" to="/settings">Settings</router-link>
        <button @click="$emit('toggle-dark-mode'); toggleMenu()" class="nav-button square-button">
            <IconDarkMode color="var(--color-button-nav)" color-hover="var(--color-button-nav-hover)"/>
        </button>
    </div>
</template>

<script>
    import IconDarkMode from './icons/IconDarkMode.vue';
    import IconMenu from './icons/IconMenu.vue';

    export default {
        name: 'top-bar',
        components: {
            IconDarkMode,
            IconMenu
        },
        methods: {
            toggleMenu() {
               console.log("Menu toggled");
               this.$refs['mobileNav'].classList.toggle("expanded");
            }
        }
    }
</script>

<style scoped>

    #top-bar {
        width: 100vw;
        top: 0;
        left: 0;
        position: fixed;
        background-color: var(--color-background-top-bar);
        /* border-bottom: 1px solid var(--color-border); */
        transition: box-shadow 0.3s;
        z-index: var(--z-top-bar);
    }
        
    #top-bar-content {
        background-color: var(--color-background-top-bar);
        height: var(--height-top-bar);
        width: 100vw;
        max-width: var(--width-top-bar);
        margin-inline: auto;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
    }

    .top-bar-side {
        margin-inline: var(--spacing-md);
    }

    .nav-button {
        color: var(--color-button-nav);
        font-size: large;
        font-weight: 500;
        text-decoration: none;
        margin: 0;
        padding: var(--spacing-sm);
        transition: color 0.1s;
        background-color: transparent;

        /* Keep elements aligned horizontally */
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle; /* Align the icon with text */
    }
    .nav-button:hover {
        color: var(--color-button-nav-hover);
        box-shadow: 0 0 0 transparent;  /* To keep from the default box-shadow popping up */
    }
    .nav-button:active {
        color: var(--color-button-nav-hover);
        box-shadow: 0 0 0 transparent;  /* To keep from the default box-shadow popping up */
    }

    .website-name {
        font-weight: 800;
        font-size: var(--font-size-logo);
        text-decoration: none;
        color: var(--color-primary);
        padding: var(--spacing-sm);
        padding-left: 0;
        transition: color 0.2s ease;
    }
    .website-name:hover {
        color: var(--color-primary-hover);
    }

    .mobile-button {
        display: none;
        position: relative;
        /* z-index: var(--z-mobile-nav-toggle-button); */
    }

    .square-button {
        aspect-ratio: 1;
    }

    @media (max-width: 777px)  {
        .desktop-button {
            display: none;
        }
        .mobile-button {
            display: inline-flex;
        }
    }
    @media (min-width: 778px)  {
        .mobile-nav {
            display: none !important;
        }
    }


    /* - - - - Mobile Navigation - - - - */
    .mobile-nav {
        z-index: var(--z-mobile-nav);
        padding: var(--spacing-lg);

        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;

        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease-out, visibility 0s 0.2s;
    }

    .mobile-nav.expanded {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.2s ease-out;
    }

    .mobile-nav .nav-button {
        display: block;
        font-size: var(--font-size-large);
        opacity: 0;
        transform: translateX(100px);
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        transition-delay: 0.3s;
    }

    .mobile-nav.expanded .nav-button {
        opacity: 1;
        transform: translateX(0);
    }

    .mobile-nav.expanded .nav-button:nth-child(2) {
        transition-delay: 0.05s;
    }

    .mobile-nav.expanded .nav-button:nth-child(3) {
        transition-delay: 0.1s;
    }

    .mobile-nav.expanded .nav-button:nth-child(4) {
        transition-delay: 0.15s;
    }

    .mobile-nav.expanded .nav-button:nth-child(5) {
        transition-delay: 0.2s;
    }

</style>