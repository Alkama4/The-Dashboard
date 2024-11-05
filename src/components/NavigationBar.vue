<template>
    <div id="navigationBar">
        <h2>Dashboard</h2>
        <button @click="$emit('toggle-dark-mode')">🌙</button>
    </div>
</template>

<script>
    console.log("Test");
</script>

<style scoped>
    #navigationBar {
        position: fixed;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0%;
        width: 100%;
        height: var(--height-navigation-bar);
        background-color: var(--color-background-element);
    }

    h2 {
        margin: 0;
    }
</style>