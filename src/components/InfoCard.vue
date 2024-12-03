<!-- Card.vue -->
<template>
    <div class="infoCard">
        <slot></slot>
    </div>
</template>
  
<script>
    export default {
        name: "InfoCard",
    };
</script>
  
<style scoped>
    .infoCard {
        padding: 1em;
        border: 0;
        border-radius: 8px;
        box-shadow: var(--shadow-card);
        background-color:var(--color-background-card);
        width: auto;
        padding-inline: auto;
    }
</style>
  