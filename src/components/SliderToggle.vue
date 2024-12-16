<template>
    <div class="slider-toggle" @click="toggleSelection">
        <div class="slider">
            <div class="grid-overlay">
                <span
                    class="slider-text option1"
                    :class="{ hidden: value === options[1] }"
                >
                    {{ options[0] }}
                </span>
                <span
                    class="slider-text option2"
                    :class="{ hidden: value === options[0] }"
                >
                    {{ options[1] }}
                </span>
            </div>
            <div
                class="slider-indicator"
                :class="{ 'selected-second': value === options[1] }"
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
            default: '',
            validator: (val) => val === '' || Array.isArray(val) && val.length === 2,
        },
        options: {
            type: Array,
            required: true,
            validator: (val) => Array.isArray(val) && val.length === 2,
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
            this.value = this.value === this.options[0] ? this.options[1] : this.options[0];
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
    pointer-events: none;
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
                background-color 0.1s ease-out;
}
.slider-indicator:hover {
    background-color: var(--color-negative-hover);
}

.selected-second {
    transform: translateX(100%);
    background-color: var(--color-positive); /* Adjust for the second option */
}
.selected-second:hover {
    background-color: var(--color-positive-hover); /* Adjust hover color */
}

</style>
