<!-- src/components/icons/IconCheckbox.vue -->
 
<template>
    <BaseIcon
        :size="size"
        :color="color"
        :color-hover="colorHover"
        :transition="transition"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M7 5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2H7zm0 12V7h10l.002 10H7z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconCheckbox",
    components: { BaseIcon },
    props: {
        size: [String, Number],
        color: String,
        colorHover: String,
        transition: String,
    },
};
</script>
