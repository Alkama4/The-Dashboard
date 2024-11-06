<!-- src/components/icons/IconSettings.vue -->

<template>
    <svg
        :width="size"
        :height="size"
        :fill="color"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>    
    </svg>
</template>

<script>
    export default {
        name: "IconSettings",
        props: {
            size: {
                type: [String, Number],
                default: "var(--size-icon)",
            },
            color: {
                type: String,
                default: "var(--color-button-general-text)",
            },
        },
    };
</script>
