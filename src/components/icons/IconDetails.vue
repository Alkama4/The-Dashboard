<!-- src/components/icons/IconDetails.vue -->
 
<template>
    <BaseIcon
        :size="size"
        :color="color"
        :color-hover="colorHover"
        :transition="transition"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z"></path>
        <path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconDetails",
    components: { BaseIcon },
    props: {
        size: [String, Number],
        color: String,
        colorHover: String,
        transition: String,
    },
};
</script>