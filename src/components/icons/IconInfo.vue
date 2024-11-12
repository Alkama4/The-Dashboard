<!-- src/components/icons/IconInfo.vue -->
 
<template>
    <BaseIcon
        :size="size"
        :color="color"
        :color-hover="colorHover"
        :transition="transition"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
        <path d="M11 11h2v6h-2zm0-4h2v2h-2z"/>    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconInfo",
    components: { BaseIcon },
    props: {
        size: [String, Number],
        color: String,
        colorHover: String,
        transition: String,
    },
};
</script>
