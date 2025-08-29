<!-- layouts/SpendingsLayout.vue -->
<template>
    <TopBar 
        title="Spendings"
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