<!-- src/components/icons/IconSave.vue -->
 
<template>
    <BaseIcon
        :size="size"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconSave",
    components: { BaseIcon },
    props: {
        size: [String, Number],
    },
};
</script>
