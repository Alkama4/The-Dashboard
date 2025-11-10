<template>
    <div class="combined-buttons numeric-stepper">
        <button 
            class="left-button" 
            @click.stop="handleClick(displayValue + 1)"
        >
            {{ addText }}
        </button>
        <div class="middle-button value" @click.stop>
            {{ displayValue || 0 }}
        </div>
        <button 
            class="right-button" 
            @click.stop="handleClick(displayValue - 1)"
            :disabled="displayValue <= 0"
        >
            <IconRemove/>
        </button>
    </div>
</template>

<script>
import IconRemove from '@/components/icons/IconRemove.vue';

export default {
    name: 'NumericStepper',
    components: {
        IconRemove,
    },
    emits: ['valueUpdated'],
    props: {
        addText: {
            type: String,
            default: 'Add a watch'
        },
        displayValue: {
            type: Number,
            required: true
        }
    },
    methods: {
        handleClick(newValue) {
            this.$emit('valueUpdated', newValue);
        }
    }
}
</script>

<style scoped>
.numeric-stepper {
    border: 0px solid var(--color-border);
    border-radius: var(--spacing-sm);
    width: fit-content;
    white-space: nowrap;
}
.numeric-stepper > * {
    padding-inline: var(--spacing-md) !important;
}
.numeric-stepper .left-button {
    flex: 3;
}
.numeric-stepper .value {
    background-color: var(--color-background-card-section);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    cursor: text;
    flex: 1;
}
.numeric-stepper .right-button {
    flex: 1;
}
</style>
