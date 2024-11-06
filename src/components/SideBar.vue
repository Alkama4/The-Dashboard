<template>
    <div id="sideBar">
        <button @click="$emit('toggle-side-bar')">
            <IconMenu/>
            <span class="sideBarButtonText">Menu</span>
        </button>

        <div class="divider"></div>

        <router-link to="/" class="button-link">
            <IconHome/>
            <span class="sideBarButtonText">Home</span>
        </router-link>

        <router-link to="/about" class="button-link">
            <IconInfo/>
            <span class="sideBarButtonText">About</span>
        </router-link>

        <button @click="$emit('toggle-dark-mode')" class="firstOfBottomButtons">
            <IconDarkMode/>
            <span class="sideBarButtonText">Toggle dark mode</span>
        </button>

        <router-link to="/settings" class="button-link">
            <IconSettings/>
            <span class="sideBarButtonText">Settings</span>
        </router-link>
    </div>
</template>

<script>
    import IconHome from './icons/IconHome.vue';
    import IconInfo from './icons/IconInfo.vue';
    import IconSettings from './icons/IconSettings.vue';
    import IconMenu from './icons/IconMenu.vue';
    import IconDarkMode from './icons/IconDarkMode.vue';

    export default {
        name: 'SideBar',
        components: {
            IconHome,
            IconInfo,
            IconSettings,
            IconMenu,
            IconDarkMode,
        },
    }
</script>

<style scoped>
    #sideBar {
        grid-area: sidebar;
        display: flex;
        flex-direction: column;
        background-color: var(--color-background-side-bar);
        padding-top: var(--spacing-xs);
        padding-bottom: var(--spacing-xs);
    }

    button, .button-link {
        background-color: var(--color-button-clean);
    }
    button:hover, .button-link:hover {
        background-color: var(--color-button-clean-hover);
    }
    button:active, .button-link:active {
        background-color: var(--color-button-clean-active);
    }
    button:disabled, .button-link:disabled {
        background-color: var(--color-button-clean-disabled);
    }

    .firstOfBottomButtons {
        margin-top: auto;
    }

    .divider {
        height: 2px;
        background-color: var(--color-divider);
        margin: var(--spacing-sm);
        border-radius: 100px;
    }
</style>