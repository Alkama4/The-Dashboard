<template>
    <div class="app-selector" tabindex="0" @blur="closeDrawerSafe">
        <router-link 
            :to="homeLink" 
            class="no-decoration website-name"
        >
            {{ activeApp.name }}
        </router-link>
        <i 
            class="bx bx-chevron-down icon-button name-chevron"
            @click.stop.prevent="toggleDrawer"
        ></i>
        <div class="app-drawer card" v-if="showDrawer">
            <router-link 
                v-for="(app, i) in appLinks"
                :key="i"
                :to="app.path"
                class="app-option no-decoration"
                @click="closeDrawer"
            >
                <i
                    class="bx"
                    :class="app.icon"
                ></i>
                {{ app.name }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppSelector',
    data() {
        return {
            showDrawer: false,
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
                    name: 'Watchlist',
                    path: '/watch_list',
                    icon: 'bxs-movie'
                },
            ],
        }
    },
    props: {
        homeLink: {
            type: String,
            default: "/"
        },
    },
    methods: {
        closeDrawerSafe(e) {
            if (!this.$el.contains(e.relatedTarget)) {
                this.showDrawer = false
            }
        },
        closeDrawer() {
            this.showDrawer = false;
        },
        toggleDrawer() {
            this.showDrawer = !this.showDrawer;
        }
    },
    computed: {
        activeApp() {
            let current = this.appLinks.find(app => 
                this.$route.path.startsWith(app.path) && app.path !== '/'
            )
            return current || this.appLinks[0] // fallback Dashboard
        }
    }
}
</script>

<style scoped>
.app-selector {
    position: relative;
    display: flex;
    align-items: center;
}

.website-name {
    font-weight: 800;
    font-size: var(--font-size-logo);
}
.name-chevron {
    padding-left: var(--spacing-xs);
    font-size: 30px;
}

.app-drawer {
    cursor: auto;
    position: absolute;
    padding: var(--spacing-sm);
    top: calc(100% + var(--spacing-sm));
    left: -10px;
    display: flex;
    flex-direction: column;

    background-color: var(--color-background-top-bar);
    backdrop-filter: var(--blur-top-bar);
}

.app-option {
    display: flex;
    align-items: center;
    gap: 12px;

    border-radius: var(--border-radius-sm);

    font-weight: 500;
    font-size: var(--font-size-lg);
    padding: 8px var(--spacing-xl);
    padding-left: 12px;

    transition: color 0.1s ease-out,
                background-color 0.1s ease-out,
                box-shadow 0.1s ease-out;
}
.app-option.router-link-active {
    color: var(--color-button-nav-text);
    background-color: var(--color-button-nav-bg);
}
.app-option:hover {
    color: var(--color-button-nav-text-hover);
    background-color: var(--color-button-nav-bg-hover);
    box-shadow: var(--shadow-button-hover);
}
.app-option:active {
    color: var(--color-button-nav-text-active);
    background-color: var(--color-button-nav-bg-active);
    box-shadow: var(--shadow-button-active);
}

</style>