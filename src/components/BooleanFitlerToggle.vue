<template>
    <div class="boolean-filter-toggle combined-buttons">
        <label v-if="label != ''">{{ label }}</label>
        <button 
            class="left-button"
            :class="{ 'button-positive': modelValue === button1Value }"
            @click="toggle(button1Value)"
        >
            Yes
        </button>
        <button 
            class="right-button"
            :class="{ 'button-negative': modelValue === button2Value }"
            @click="toggle(button2Value)"
        >
            No
        </button>
    </div>
</template>

<script>
export default {
    name: "BooleanFilterToggle",
    props: {
        modelValue: String,
        label: {
            type: String,
            default: ""
        },
        button1Value: {
            default: true
        },
        button2Value: {
            default: false
        },
        unsetValue: {
            default: null
        }
    },
    emits: ['update:modelValue'],
    methods: {
        toggle(value) {
            this.$emit('update:modelValue', this.modelValue === value ? this.unsetValue : value);
        }
    }
}
</script>

<style scoped>
.boolean-filter-toggle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
label {
    margin: 0;
    margin-right: var(--spacing-md);
    white-space: nowrap;
}
.boolean-filter-toggle button {
    padding-inline: calc(var(--spacing-md) + var(--spacing-sm));
}
</style>