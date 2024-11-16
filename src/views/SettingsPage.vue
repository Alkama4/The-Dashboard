<template>
    <div>
        <h1>Settings page</h1>
        <p>Settings go here</p>
        <TestingComponent/>
    </div>
</template>
  
<script>
    import TestingComponent from '../components/TestingComponent.vue'

    export default {
        name: 'SettingsPage',
        components: {
            TestingComponent,
        }
    }
</script>
  
<style scoped>
    /* Add your styles here */
</style>
  