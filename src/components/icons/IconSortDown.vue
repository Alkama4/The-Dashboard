<!-- src/components/icons/IconSortDown.vue -->
 
<template>
    <BaseIcon
        :size="size"
        :color="color"
        :color-hover="colorHover"
        :transition="transition"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="m 6 20 l 4 -4 H 7 V 4 H 5 v 12 H 2 z m 5 -11 h 9 v 2 h -9 z m 0 4 h 7 v 2 h -7 z m 0 -8 h 11 v 2 H 11 z m 0 12 h 5 v 2 h -5 z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconSortDown",
    components: { BaseIcon },
    props: {
        size: [String, Number],
        color: String,
        colorHover: String,
        transition: String,
    },
};
</script>