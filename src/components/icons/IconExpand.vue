<!-- src/components/icons/IconExpand.vue -->
 
<template>
    <BaseIcon
        :size="size"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="m21 15.344-2.121 2.121-3.172-3.172-1.414 1.414 3.172 3.172L15.344 21H21zM3 8.656l2.121-2.121 3.172 3.172 1.414-1.414-3.172-3.172L8.656 3H3zM21 3h-5.656l2.121 2.121-3.172 3.172 1.414 1.414 3.172-3.172L21 8.656zM3 21h5.656l-2.121-2.121 3.172-3.172-1.414-1.414-3.172 3.172L3 15.344z"></path>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconExpand",
    components: { BaseIcon },
    props: {
        size: [String, Number],
    },
};
</script>
