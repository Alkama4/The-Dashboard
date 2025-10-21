<!-- layouts/SpendingsLayout.vue -->
<template>
    <top-bar
        title="Spendings"
        home-link="/spendings"
        :desktop-links="[
            { name: 'Analytics', path: '/spendings/analytics', icon: 'bxs-bar-chart-alt-2'},
            { name: 'New Entry', path: '/spendings/new_entry', icon: 'bx-plus' },
            { name: '', path: '/spendings/new_entry', icon: 'bx-plus', mobileLink: true},
        ]"
        :mobile-drawer-links="[
            { name: 'Analytics', path: '/spendings/analytics', icon: 'bxs-bar-chart-alt-2'},
            { name: 'New Entry', path: '/spendings/new_entry', icon: 'bx-plus' },
        ]"
    />
    <main>
        <router-view />
    </main>
    <FooterComponent/>
</template>

<script>
import TopBar from '@/components/common/TopBar.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';

export default {
    name: 'SpendingsLayout',
    components: {
        TopBar,
        FooterComponent,
    }
}
</script>