<!-- src/components/icons/IconSortUp.vue -->
 
<template>
    <BaseIcon
        :size="size"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M 11 9 H 18 V 11 H 11 Z M 11 13 H 20 V 15 H 11 Z M 11 5 H 16 V 7 H 11 Z M 11 17 H 22 V 19 H 11 Z M 5 20 H 7 V 8 H 10 L 6 4 L 2 8 H 5 Z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconSortUp",
    components: { BaseIcon },
    props: {
        size: [String, Number],
    },
};
</script>