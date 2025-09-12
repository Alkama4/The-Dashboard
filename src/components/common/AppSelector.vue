<template>
    <div class="app-selector" tabindex="0" @blur="closeDrawerSafe">
        <router-link 
            to="/watch_list" 
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
    components: {
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
    top: 100%;
    left: -10px;
    display: flex;
    flex-direction: column;

    background-color: var(--color-background-top-bar);
    backdrop-filter: var(--blur-top-bar);
}

.app-option {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);

    border-radius: var(--border-radius-medium);

    font-weight: 800;
    font-size: var(--font-size-lg);
    padding: 6px var(--spacing-lg);
    padding-left: var(--spacing-sm);

    transition: background-color 0.1s ease-out,
                color 0.1s ease-out;
}
.app-option:hover {
    background-color: var(--color-primary);
    color: var(--color-text-black);
}
.app-option:active {
    background-color: var(--color-primary-active);
    color: var(--color-text-black-hover);
}

</style>