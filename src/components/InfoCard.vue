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
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color:var(--color-background-card);
        width: auto;
        padding-inline: auto;
    }
</style>
  