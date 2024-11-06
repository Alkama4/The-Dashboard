<!-- src/components/icons/IconInfo.vue -->

<template>
    <svg
        :width="size"
        :height="size"
        :fill="color"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
        <path d="M11 11h2v6h-2zm0-4h2v2h-2z"/>
    </svg>
</template>

<script>
    export default {
        name: "IconInfo",
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
