<!-- src/components/icons/IconCheckbox.vue -->
 
<template>
    <BaseIcon
        :size="size"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M7 5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2H7zm0 12V7h10l.002 10H7z M10.996 12.556 9.7 11.285l-1.4 1.43 2.704 2.647 4.699-4.651-1.406-1.422zM7 7h10v10H7z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconCheckbox",
    components: { BaseIcon },
    props: {
        size: [String, Number],
    },
};
</script>