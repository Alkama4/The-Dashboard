<template>
    <div id="sideBar">
        <button @click="$emit('toggle-side-bar')">📃</button>
        <button><router-link to="/">Home</router-link></button>
        <button><router-link to="/About">New Page</router-link></button>
    </div>
</template>

<script>
    export default {
        name: 'SideBar'
    }
</script>

<style scoped>
    #sideBar {
        grid-area: sidebar;
        background-color: #444;
        display: flex;
        flex-direction: column;
        background-color: var(--color-background-side-bar);
    }
</style>