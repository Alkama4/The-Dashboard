<template>
    <div class="slider-toggle" @click="toggleSelection" @keypress="toggleSelection" tabindex="0">
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
                :style="indicatorStyle"
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SliderToggle",
    data() {
        return {
            isHovered: false,
        };
    },
    props: {
        modelValue: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            required: true,
            validator: (val) => Array.isArray(val) && val.length === 2,
        },
        colors: {
            type: Object,
            default: () => ({
                color1: "var(--color-negative)",
                color1Hover: "var(--color-negative-hover)",
                color2: "var(--color-positive)",
                color2Hover: "var(--color-positive-hover)",
            }),
        },
    },
    emits: ["update:modelValue"],
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(newValue) {
                this.$emit("update:modelValue", newValue);
            },
        },
        indicatorStyle() {
            const isOption1 = this.value === this.options[0];
            return {
                backgroundColor: this.isHovered
                    ? (isOption1 ? this.colors.color1Hover : this.colors.color2Hover)
                    : (isOption1 ? this.colors.color1 : this.colors.color2),
            };
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
    width: 200px;
    max-width: 100%;
    height: 40px;
    box-sizing: border-box;
    border-radius: var(--border-radius-sm);
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
    transition: color 0.25s ease-out, font-weight 0.25s ease-out;
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
    border-radius: var(--border-radius-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    color: white;
    transition: transform 0.25s ease-out, background-color 0.1s ease-out;
}

.selected-second {
    transform: translateX(100%);
}
</style>
