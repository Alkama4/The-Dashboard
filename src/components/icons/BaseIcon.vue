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
            cursor: 'inherit'
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
    computed: {
        isParentDisabled() {
            const parentElement = this.$el.parentNode;
            return parentElement && (parentElement.hasAttribute("disabled") || parentElement.classList.contains("disabled"));
        },
    },
    mounted() {
        const parentElement = this.$el.parentNode;

        if (parentElement) {
            // Check if the parent is already hovered
            if (parentElement.matches(":hover") && !this.isParentDisabled) {
                this.currentColor = this.colorHover;
            }

            parentElement.addEventListener("mouseenter", this.onParentMouseEnter);
            parentElement.addEventListener("mouseleave", this.onParentMouseLeave);
        }
    },
    beforeUnmount() {
        const parentElement = this.$el.parentNode;

        if (parentElement) {
            parentElement.removeEventListener("mouseenter", this.onParentMouseEnter);
            parentElement.removeEventListener("mouseleave", this.onParentMouseLeave);
        }
    },
    methods: {
        onParentMouseEnter() {
            if (!this.isParentDisabled) {
                this.currentColor = this.colorHover;
            }
        },
        onParentMouseLeave() {
            this.currentColor = this.color;
        },
    },
};
</script>
