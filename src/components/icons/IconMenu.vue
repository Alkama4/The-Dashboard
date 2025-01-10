<!-- src/components/icons/IconSettings.vue -->
 
<template>
    <BaseIcon
        :size="size"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>    
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconSettings",
    components: { BaseIcon },
    props: {
        size: [String, Number],
    },
};
</script>
