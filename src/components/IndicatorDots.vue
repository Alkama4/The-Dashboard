<template>
    <div class="indicator-dots" v-if="dotCount > 1">
        <div 
            v-for="index in dotCount" 
            :key="index" 
            class="dot" 
            :class="{ active: index - 1 === dotIndex }"
            @click="$emit('dotSelected', index - 1)"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'IndicatorDots',
    props: {
        dotIndex: {
            type: Number,
            required: false,
            default: 0
        },
        dotCount: {
            type: Number,
            required: true
        }
    }
};
</script>

<style scoped>
.indicator-dots {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-sm);
    margin-inline: auto;
}
.dot {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--color-text-hidden);
    transition: background-color 0.2s ease-out, width 0.2s ease-out;
    cursor: pointer;
}
.dot.active {
    background-color: var(--color-text-light);
    width: 20px;
}
.dot:hover {
    background-color: var(--color-text);
}
</style>
