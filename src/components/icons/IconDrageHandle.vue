<!-- src/components/icons/IconDragHandle.vue -->
 
<template>
    <BaseIcon
        :size="size"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconDragHandle",
    components: { BaseIcon },
    props: {
        size: [String, Number],
    },
};
</script>
