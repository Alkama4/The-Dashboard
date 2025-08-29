<!-- layouts/DashboardLayout.vue -->
<template>
    <TopBar title="Dashboard"/>
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