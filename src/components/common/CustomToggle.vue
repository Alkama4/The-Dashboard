<template>
    <div
        class="custom-toggle"
        @click="toggle"
        tabindex="0"
        :class="{
            'active': state,
            // 'primary-color-mode': primaryColorMode
        }"
    >
        <div 
            class="slider"
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
        },
        // primaryColorMode: {
        //     type: Boolean,
        //     default: true
        // }
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
    --height: 28px;
    --width: calc(var(--height) * 1.75);
    --spacing: 2px;
    height: var(--height);
    width: var(--width);
    margin-inline: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: 100px;
    background-color: var(--color-background-input);
    cursor: pointer;
    position: relative;
    background-color: var(--color-negative);
    transition: background-color 0.15s ease-out;
}
.custom-toggle:hover {
    border-color: var(--color-border-hover);
}
.custom-toggle:active {
    border-color: var(--color-border-hover);
}
.custom-toggle:focus-visible, textarea:focus-visible {
    z-index: var(--z-input-focus);
}

.custom-toggle:hover {
    background-color: var(--color-negative-hover);
}
.custom-toggle:active {
    background-color: var(--color-negative-active);
}
.custom-toggle.active {
    background-color: var(--color-positive);
}
.custom-toggle.active:hover {
    background-color: var(--color-positive-hover);
}
.custom-toggle.active:active {
    background-color: var(--color-positive-active);
}


/* .custom-toggle.primary-color-mode {
    background-color: var(--color-background-input);
}
.custom-toggle.primary-color-mode:hover {
    background-color: unset;
}
.custom-toggle.primary-color-mode:active {
    background-color: unset;
}
.custom-toggle.primary-color-mode.active {
    background-color: var(--color-primary);
}
.custom-toggle.primary-color-mode.active:hover {
    background-color: var(--color-primary-hover);
}
.custom-toggle.primary-color-mode.active:active {
    background-color: var(--color-primary-active);
} */


.slider {
    --bar-width: calc(var(--height) - var(--spacing) * 2);
    position: absolute;
    top: var(--spacing);
    bottom: var(--spacing);
    left: var(--spacing);
    width: var(--bar-width);
    background-color: var(--color-button-general);

    border-radius: 100px;

    transition: left 0.25s var(--cubic-1),
                background-color 0.15s ease-out;
}
.custom-toggle:hover .slider {
    background-color: var(--color-button-general-hover);
}
.custom-toggle:active .slider {
    background-color: var(--color-button-general-active);
}


.active .slider {
    left: calc(var(--width) - var(--bar-width) - var(--spacing));
}

</style>