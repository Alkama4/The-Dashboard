<!-- src/components/icons/IconHome.vue -->
 
<template>
    <BaseIcon
        :size="size"
    >
        <!-- Unique SVG path for the Dark Mode icon goes here -->
        <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"/>
    </BaseIcon>
</template>

<script>
import BaseIcon from './BaseIcon.vue';

export default {
    name: "IconHome",
    components: { BaseIcon },
    props: {
        size: [String, Number],
    },
};
</script>

  