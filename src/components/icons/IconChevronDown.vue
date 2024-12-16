<!-- src/components/icons/IconChevronDown.vue -->
 
<template>
    <BaseIcon
        :size="size"
        :color="color"
        :color-hover="colorHover"
        :transition="transition"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconChevronDown",
    components: { BaseIcon },
    props: {
        size: [String, Number],
        color: String,
        colorHover: String,
        transition: String,
    },
};
</script>
