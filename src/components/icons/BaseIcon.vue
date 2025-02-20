<template>
    <svg
        :width="size"
        :height="size"
        :style="{ 
            minWidth: size, 
            minHeight: size,
            marginLeft: left,
            marginRight: right,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
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
        left: {
            type: [String],
            default: "0px",
        },
        right: {
            type: [String],
            default: "0px",
        }
    },
};
</script>

<style scoped>
svg {
    fill: currentColor;
    transition: fill 0.1s;
    cursor: inherit;
}
/* svg:hover {
    fill: currentColor;
} */
</style>
