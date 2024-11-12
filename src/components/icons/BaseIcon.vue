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
    >
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
            default: "var(--color-text-bold)",
        },
        transition: {
            type: String,
            default: "0.1s",
        },
    },
    data() {
        return {
            currentColor: this.color,
        };
    },
    mounted() {
        // Find the parent element
        const parentElement = this.$el.parentNode;

        if (parentElement) {
            // Attach event listeners to the parent element
            parentElement.addEventListener("mouseenter", this.onParentMouseEnter);
            parentElement.addEventListener("mouseleave", this.onParentMouseLeave);
        }
    },
    beforeUnmount() {
        // Cleanup event listeners when component is destroyed
        const parentElement = this.$el.parentNode;
        
        if (parentElement) {
            parentElement.removeEventListener("mouseenter", this.onParentMouseEnter);
            parentElement.removeEventListener("mouseleave", this.onParentMouseLeave);
        }
    },
    methods: {
        onParentMouseEnter() {
            this.currentColor = this.colorHover;
        },
        onParentMouseLeave() {
            this.currentColor = this.color;
        },
    },
};
</script>
