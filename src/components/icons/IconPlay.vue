<!-- src/components/icons/IconPlay.vue -->
 
<template>
    <BaseIcon
        :size="size"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M7 6v12l10-6z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconPlay",
    components: { BaseIcon },
    props: {
        size: [String, Number],
    },
};
</script>
