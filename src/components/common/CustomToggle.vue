<template>
    <div
        class="custom-toggle"
        @click="toggle"
        tabindex="0"
    >
        <div 
            class="slider"
            :class="{'active': state}"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'CustomToggle',
    props: {
        modelValue: { 
            type: Boolean,
            required: true
        }
    },
    computed: {
        state: {
            get() { 
                return this.modelValue;
            },
            set(val) { 
                this.$emit('update:modelValue', val);
            }
        }
    },
    methods: {
        toggle() {
            this.state = !this.state;
        }
    }
}
</script>

<style scoped>
.custom-toggle {
    --width: 63px;
    --bar-width: 42px;
    height: 28px;
    width: var(--width);
    margin-inline: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: 100px;
    background-color: var(--color-background-input);
    cursor: pointer;
    position: relative;
}
.custom-toggle:hover, textarea:hover {
    border-color: var(--color-border-hover);
}
.custom-toggle:focus-visible, textarea:focus-visible {
    z-index: var(--z-input-focus);
}

.slider {
    position: absolute;
    top: 0;
    left: 0px;
    height: 100%;
    width: var(--bar-width);

    border-radius: 100px;
    background-color: var(--color-negative);

    transition: left 0.15s var(--cubic-1),
                background-color 0.15s ease-out;
}
.slider:hover {
    background-color: var(--color-negative-hover);
}
.slider:active {
    background-color: var(--color-negative-active);
}
.slider.active {
    left: calc(var(--width) - var(--bar-width));
    background-color: var(--color-positive);
}
.slider.active:hover {
    background-color: var(--color-positive-hover);
}
.slider.active:active {
    background-color: var(--color-positive-active);
}
</style>