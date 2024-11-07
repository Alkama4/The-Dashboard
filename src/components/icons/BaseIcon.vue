<!-- src/components/icons/BaseIcon.vue -->
<template>
    <svg
        :width="size"
        :height="size"
        :fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        :style="{
            transition: transition,
            cursor: 'pointer'
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- Use `<slot />` to let each icon inject its unique SVG paths -->
        <slot />
    </svg>
</template>

<script>
export default {
    name: "BaseIcon",
    props: {
        size: {
            type: [String, Number],
            default: "25px",
        },
        color: {
            type: String,
            default: "var(--color-text)",
        },
        colorHover: {
            type: String,
            default: "var(--color-text)",
        },
        transition: {
            type: String,
            default: "0s",
        },
    },
    data() {
        return {
            currentColor: this.color,
        };
    },
    methods: {
        onMouseEnter() {
            this.currentColor = this.colorHover;
        },
        onMouseLeave() {
            this.currentColor = this.color;
        },
    },
};
</script>
