<template>
    <div class="tri-state-toggle combined-buttons">
        <button 
            class="left-button"
            :class="{ 'button-primary': modelValue === button1Value }"
            @click="toggle(button1Value)"
        >
            {{ button1Text }}
        </button>
        <button 
            class="right-button"
            :class="{ 'button-primary': modelValue === button2Value }"
            @click="toggle(button2Value)"
        >
            {{ button2Text }}
        </button>
    </div>
</template>

<script>
export default {
    name: "TriStateToggle",
    props: {
        modelValue: String,
        button1Text: {
            type: String,
            default: "Button 1"
        },
        button2Text: {
            type: String,
            default: "Button 2"
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
.tri-state-toggle {
    flex: 1;
    white-space: nowrap;
}
.tri-state-toggle button {
    padding-inline: calc(var(--spacing-md) + var(--spacing-sm));
}
</style>