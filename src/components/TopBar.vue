<template>
    <div id="top-bar">
        <div id="top-bar-content">
            <div class="top-bar-side">
                <router-link to="/" class="website-name">The Dashboard</router-link>
            </div>
            <div class="top-bar-side">
                <router-link class="nav-button desktop-button" to="/spendings">Spendings</router-link>
                <router-link class="nav-button desktop-button" to="/about">About page</router-link>
                <router-link class="nav-button desktop-button" to="/settings">Settings</router-link>
                <button class="nav-button desktop-button">
                    <IconDarkMode @click="$emit('toggle-dark-mode')" 
                        color="var(--color-button-nav)" 
                        color-hover="var(--color-button-nav-hover)"
                    />
                </button>
                <button class="nav-button mobile-button">
                    <IconMenu @click="toggleMenu()"
                        color="var(--color-button-nav)" 
                        color-hover="var(--color-button-nav-hover)"
                    />
                </button>
            </div>
        </div>
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
            }
        }
    }
</script>

<style scoped>

    #top-bar {
        width: 100vw;
        position: fixed;
        background-color: var(--color-background-top-bar);
        /* border-bottom: 1px solid var(--color-border); */
        transition: box-shadow 0.3s;
        z-index: var(--z-top-bar);
    }
        
    #top-bar-content {
        background-color: var(--color-background-top-bar);
        height: var(--top-bar-height);
        width: 100vw;
        max-width: var(--top-bar-width);
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

    .website-name {
        font-weight: 800;
        font-size: var(--font-size-logo);
        text-decoration: none;
        color: var(--color-text-bold);
        transition: transform 0.2s ease;
    }
    .website-name:hover {
        transform: rotate(20deg);
    }

    .mobile-button {
        display: none;
    }

    @media (max-width: 666px)  {
        .desktop-button {
            display: none;
        }
        .mobile-button {
            display: inline-flex;
        }
    }


</style>