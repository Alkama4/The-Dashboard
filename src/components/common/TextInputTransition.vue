<template>
    <div class="mobile-custom-search-select">
        <div class="input-wrapper" :style="{ height: wrapperHeight + 'px' }">
            <input
                ref="input"
                v-model="selectedOption"
                type="text"
                :class="{ fixed: inputActive }"
                :style="inputActive ? fixedStyle : {}"
                :disabled="transitionActive || disabled"
                :placeholder="placeholder"
                @focus="activate"
                @blur="deactivate"
            />
        </div>
        <div
            class="backdrop"
            :class="{ active: backdropActive }"
        >
            <ul 
                class="options-list"
                tabindex="-1"
            >
                <li 
                    v-for="(option, index) in filteredOptions" 
                    :key="index" 
                    @click.prevent="selectOption(option)"
                >
                    {{ option }}
                </li>
                <li v-if="filteredOptions.length == 0" class="not-found" @click.prevent>
                    No matches found, using the current value.
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { isTouchDevice } from '@/utils/config'

export default {
    data() {
        return {
            inputActive: false,
            backdropActive: false,
            transitionActive: false,
            selectedOption: "",
            highlightedIndex: -1,
            fixedStyle: {},
            lastRect: null,
            wrapperHeight: 0,
            isTouchDevice: isTouchDevice,
            doNotTouchNoScroll: false,
        }
    },
    props: {
        options: {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: "Select an option"
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    mounted() {
        // Detect the input height and set wrapperHeight
        this.wrapperHeight = this.$refs.input.getBoundingClientRect().height
    },
    unmounted() {
        // Remove if we set it and the component is exited unnaturally
        if (!this.doNotTouchNoScroll) {
            document.documentElement.classList.remove('no-scroll');
        }
    },
    methods: {
        updateWrapperHeight() {
            this.wrapperHeight = this.$refs.input.getBoundingClientRect().height
        },
        activate(e) {
            if (!this.inputActive) {
                const rect = e.target.getBoundingClientRect()
                this.lastRect = rect
                this.fixedStyle = {
                    position: "fixed",
                    left: rect.left + "px",
                    top: rect.top + "px",
                    width: rect.width + "px"
                }

                this.transitionActive = true;
                this.inputActive = true;
                this.backdropActive = true;
                this.$nextTick(() => {
                    requestAnimationFrame(() => {
                        this.transitionActive = false;
                        this.fixedStyle.top = "var(--spacing-md)"
                        this.fixedStyle.left = "var(--spacing-md)"
                        this.fixedStyle.width = "calc(100vw - var(--spacing-md) * 2)"
                    })
                })
                
                // If there isn't a no-scroll style add it
                if (!document.documentElement.classList.contains('no-scroll')) {
                    document.documentElement.classList.add('no-scroll');

                // Else add a flag to not remove it later, since something else is handling it
                } else {
                    this.doNotTouchNoScroll = true;
                }
            }
        },
        deactivate() {
            if (this.lastRect) {
                this.fixedStyle.top = this.lastRect.top + "px"
                this.fixedStyle.left = this.lastRect.left + "px"
                this.fixedStyle.width = this.lastRect.width + "px"
            }

            // Remove no-scroll styling if not disabled
            if (!this.doNotTouchNoScroll) {
                document.documentElement.classList.remove('no-scroll');
            }

            this.transitionActive = true;
            this.backdropActive = false;
            setTimeout(() => {
                this.transitionActive = false;
                this.inputActive = false
                this.fixedStyle = {}
            }, 400)
        },
        selectOption(option) {
            console.log(option)
            this.selectedOption = option;
            this.$emit('update:modelValue', option);
            this.invalidState = false;
            this.close();
        },
    },
    computed: {
        filteredOptions() {
            if (!this.selectedOption) return this.options;
            return this.options.filter(option =>
                option.toLowerCase().includes(this.selectedOption.toLowerCase())
            );
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(value) {
                this.selectedOption = value || "";
            }
        }
    }
}
</script>

<style scoped>
.input-wrapper {
    position: relative;
}

.backdrop {
    z-index: var(--z-index-fullscreen);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-out;
}
.backdrop.active {
    opacity: 1;
}

.options-list {
    position: absolute;
    top: calc(var(--spacing-md) * 2 + 40px);
    left: var(--spacing-md);
    right: var(--spacing-md);
}

input {
    transition: width 0.4s ease,
                top 0.4s ease,
                left 0.4s ease;
    width: 400px;
}

.fixed {
    z-index: 9999999999;
}
</style>
