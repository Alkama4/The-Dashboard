<template>
    <div id="topBar">
        <div id="topBarContent">
            <div class="topBarSide">
                <router-link to="/" class="websiteName">The Dashboard</router-link>
            </div>
            <div class="topBarSide">
                <router-link class="navButton" to="/spendings">Spendings</router-link>
                <router-link class="navButton" to="/about">About page</router-link>
                <router-link class="navButton" to="/settings">Settings</router-link>
                <IconDarkMode class="navButton" @click="$emit('toggle-dark-mode')" 
                    color="var(--color-button-nav)" 
                    color-hover="var(--color-button-nav-hover)"
                    transition="0.1s"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import IconDarkMode from './icons/IconDarkMode.vue';

    export default {
        name: 'TopBar',
        components: {
            IconDarkMode,
        },
    }
</script>

<style scoped>

    #topBar {
        width: 100vw;
        position: fixed;
        background-color: var(--color-background-top-bar);
        /* border-bottom: 1px solid var(--color-border); */
        transition: box-shadow 0.3s;
    }
        
    #topBarContent {
        background-color: transparent;
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

    .topBarSide {
        margin-inline: var(--spacing-md);
    }

    .navButton {
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
    .navButton:hover {
        color: var(--color-button-nav-hover);
        box-shadow: 0 0 0 transparent;
    }

    .websiteName {
        font-weight: 700;
        font-size: var(--font-size-logo);
        text-decoration: none;
        color: var(--color-text-bold);
    }

</style>