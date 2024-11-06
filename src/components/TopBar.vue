<template>
    <div id="topBar">
        <h1>Dashboard</h1>
        <button @click="$emit('toggle-dark-mode')">🌙</button>
        <button><router-link to="/Settings">⚙️</router-link></button>
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
    }

    button {
        aspect-ratio: 1;
        padding: 8px;
        background-color: var(--color-button-clean);
    }
    button:hover {
        background-color: var(--color-button-clean-hover);
    }
    button:active {
        background-color: var(--color-button-clean-active);
    }
</style>