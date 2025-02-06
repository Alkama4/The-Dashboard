<!-- src/components/icons/IconRemove.vue -->
 
<template>
    <BaseIcon
        :size="size"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M5 11h14v2H5z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconRemove",
    components: { BaseIcon },
    props: {
        size: [String, Number],
    },
};
</script>
