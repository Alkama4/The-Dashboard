<template>
    <div id="topBar">
        <router-link to="/">
            <h2>The Dashboard</h2>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'TopBar'
    }
</script>

<style scoped>
    #topBar {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        grid-area: topbar;
        background-color: var(--color-background-top-bar);
    }

    h2 {
        margin: 0;
        text-decoration: none;
        color: var(--color-text);
    }
</style>