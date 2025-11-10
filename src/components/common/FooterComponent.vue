<template>
    <footer class="footer-component">
        <div class="upper-row">
            <div class="logo">
                <router-link class="no-decoration" to="/">
                    <IconLogo/>
                    <span class="text">The Dashboard</span>
                </router-link>
            </div>
            <div class="link-stacks">
                <div 
                    v-for="(linkStack, i) in linkStacks" 
                    :key="i"
                    class="link-stack"
                >
                    <h3>{{ linkStack.name }}</h3>
                    <router-link 
                        v-for="(link, j) in linkStack.links" 
                        :key="j"
                        :to="link.to"
                        class="hover-decoration link"
                    >
                        {{ link.display }}
                    </router-link>
                </div>
            </div>
        </div>

        <div class="bottom-row">
            <div class="flex-1 align-left"></div>
            <div class="flex-1 align-center">
                &copy; 2024 Aleksi Malkki. All Rights Reserved.
            </div>
            <div class="flex-1 align-right">
                <a href="https://github.com/Alkama4/The-Dashboard" class="hover-decoration">GitHub Repository</a>
                <a href="https://alkama4.github.io/The-Dashboard/" class="hover-decoration">Demo Site</a>
                <a href="https://github.com/Alkama4/The-Dashboard?tab=Apache-2.0-1-ov-file" class="hover-decoration">License</a>
            </div>
        </div>
    </footer>
</template>

<script>
import IconLogo from '../icons/IconLogo.vue';

export default {
    name: 'FooterComponent',
    components: {
        IconLogo
    },
    data () {
        return {
            linkStacks: [
                {
                    name: 'Services',
                    links: [
                        { display: 'Dashboard', to: '/' },
                        { display: 'Spendings', to: '/spendings' },
                        { display: 'Watchlist', to: '/watch_list' }
                    ],
                },
                {
                    name: 'Account',
                    links: [
                        { display: 'Account', to: '/account' },
                        { display: 'Sign in', to: '/account/login' },
                        { display: 'New account', to: '/account/create' },
                    ],
                }
            ]
        }
    }
}
</script>

<style scoped>
.footer-component {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: auto;
    width: 100vw;
    color: var(--color-text-hidden);
    border-top: 1px solid var(--color-border);
}

.upper-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: var(--spacing-sm);
}

.logo {
    font-weight: 800;
    font-size: var(--font-size-xxl);
    color: var(--color-text);
    display: flex;
    align-items: end;
    padding-left: var(--spacing-lg);
    padding-bottom: calc(var(--spacing-lg) - var(--spacing-sm));
}
.logo .no-decoration {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
}
.logo .text {
    display: unset;
}
.logo .icon-logo {
    display: none;
}


.link-stacks {
    padding-inline: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
    gap: var(--spacing-md);
    display: flex;
    flex-direction: row;
}

.link-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    padding-right: calc(var(--spacing-xl) + var(--spacing-md));
}

.link-stack .link {
    color: var(--color-text-lighter);
    font-weight: 500;
}

.bottom-row {
    display: flex;
    justify-content: center;
    padding: var(--spacing-md) 0;
    border-top: 1px solid var(--color-border);
}
.bottom-row .no-decoration {
    color: var(--color-text);
    font-weight: 500;
    font-size: var(--font-size-xs);
}


.align-left {
    display: flex;
    justify-content: left;
    padding-left: var(--spacing-lg);
}
.align-center {
    display: flex;
    justify-content: center;
    text-align: center;
}
.align-right {
    display: flex;
    justify-content: right;
    gap: var(--spacing-md);
    padding-right: var(--spacing-lg);
}


@media (max-width: 1000px) {
    .footer-component {
        margin-inline: 5vw;
        width: 90vw;
        box-sizing: border-box;
    }

    .upper-row {
        flex-direction: column;
        padding-top: var(--spacing-md);
    }

    .logo {
        padding: 0;
    }
    .logo .text {
        display: none;
    }
    .logo .icon-logo {
        display: unset;
    }

    .link-stacks {
        width: 100%;
        padding-inline: 0;
    }
    .link-stack {
        flex: 1;
        padding-right: 0;
    }

    .bottom-row {
        flex-direction: column-reverse;
        gap: var(--spacing-sm)
    }
    .bottom-row > * {
        justify-content: left;
        text-align: left;
    }
    .align-left {
        display: none;
    }
}

</style>