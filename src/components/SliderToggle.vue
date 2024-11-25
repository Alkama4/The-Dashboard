<template>
    <div class="slider-toggle" @click="toggleSelection">
        <div class="slider">
            <div class="grid-overlay">
                <span class="slider-text expense" :class="{ hidden: value === 'income' }">Expense</span>
                <span class="slider-text income" :class="{ hidden: value === 'expense' }">Income</span>
            </div>
            <div
                class="slider-indicator"
                :class="{ 'income-selected': value === 'income' }"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SliderToggle',
    props: {
        modelValue: {
            type: String,
            default: 'expense',
            validator: (val) => ['expense', 'income'].includes(val),
        },
    },
    emits: ['update:modelValue'],
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(newValue) {
                this.$emit('update:modelValue', newValue);
            },
        },
    },
    methods: {
        toggleSelection() {
            this.value = this.value === 'expense' ? 'income' : 'expense';
        },
    },
};
</script>

<style scoped>
.slider-toggle {
    width: 100%;
    max-width: 200px;
    height: 35px;
    border-radius: var(--border-radius-small);
    background-color: var(--color-background-input);
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid var(--color-border);
    transition: border 0.1s ease-out;
}

.slider-toggle:hover {
    border: 1px solid var(--color-border-hover);
}

.slider {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}

.grid-overlay {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 100%;
    position: absolute;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.slider-text {
    color: var(--color-text-white-hover);
    font-weight: 600;
    text-transform: capitalize;
    transition: color 0.25s ease-out,
                font-weight 0.25s ease-out;
    pointer-events: none;
    user-select: none;
    text-align: center;
}

.hidden {
    color: var(--color-text-lighter);
}

.slider-indicator {
    width: 50%;
    height: 100%;
    background-color: var(--color-negative);
    border-radius: var(--border-radius-small);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    color: white;
    transition: transform 0.25s ease-out,
                background-color 0.25s ease-out;
}

.income-selected {
    transform: translateX(100%);
    background-color: var(--color-positive);
}
</style>
