<!-- layouts/DashboardLayout.vue -->
<template>
    <top-bar
        title="Dashboard"
        homeLink="/"
        :desktop-links="[
            { name: 'Account', path: '/account', icon: 'bx-user'},
        ]"
        :mobile-drawer-links="[
            { name: 'Account', path: '/account', icon: 'bx-user'},
        ]"
    />
    <main>
        <router-view/>
    </main>
    <FooterComponent/>
</template>

<script>
import TopBar from '@/components/common/TopBar.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';

export default {
    name: 'DashboardLayout',
    components: {
        TopBar,
        FooterComponent,
    },
}
</script>