<template>
    <div class="custom-select" 
        :class="{'is-open': isLogicalOpen && isStylingOpen}" 
    >
        <div 
            class="selected-option icon-align" 
            :class="{ 'invalid-input': invalidState, 'has-clear': clearButtonVisible }"
            tabindex="0"
            @keydown.down.prevent="handleKeyDown('down')" 
            @keydown.up.prevent="handleKeyDown('up')" 
            @keydown.enter.prevent="handleKeyDown('enter')"
            @keydown.esc.prevent="handleKeyDown('esc')"
            @click="isStylingOpen ? close() : open()"
            @blur="close"
        >
            <!-- <span class="longest-option">{{ longestOptionLabel }}</span> -->
            <span v-if="selectedOption?.label" class="visible-option">{{ selectedOption.label }}</span>
            <span v-else class="visible-option text-lighter">Select an option</span>
            <i class="bx bx-chevron-down chevron"></i>
        </div>
        <i 
            class="bx bx-x icon-button clear-btn"
            :class="{'disabled': !clearButtonVisible}"
            @click.stop.prevent="clearSelection"
        ></i>
        <ul v-if="isLogicalOpen" class="options-list" :class="{'hidden': !isStylingOpen, 'has-clear': clearButtonVisible}">
            <li v-for="(option, index) in options" 
                :key="option.value" 
                @click="selectOption(option)" 
                @mouseenter="highlightedIndex = index"
                :class="{ 'highlighted': index === highlightedIndex }"
            >
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    components: {
    },
    props: {
        options: Array,
        modelValue: [String, Number],
        disabled: Boolean,
        hasClearButton: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            isStylingOpen: false,
            isLogicalOpen: false,
            selectedOption: null,
            highlightedIndex: 0,
            invalidState: false,
        };
    },
    mounted() {
        this.updateSelectedOption(this.modelValue)
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        open() {
            if (!this.disabled) {
                this.isLogicalOpen = true;
                this.isStylingOpen = true;
                this.highlightedIndex = this.options.findIndex(opt => opt.value === this.modelValue);
            }
        },
        close() {
            this.isStylingOpen = false;
            setTimeout(() => {
                if (this.isStylingOpen == false) {
                    this.isLogicalOpen = false;
                }
            }, 200);
        },
        toggleDropdown(event) {
            if (!this.disabled) {
                event.stopPropagation();
                this.isLogicalOpen ? this.close() : this.open();
            }
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.close();
            }
        },
        selectOption(option) {
            this.close();
            this.$emit('update:modelValue', option.value);
            this.selectedOption = option;
            this.invalidState = false;
        },
        handleKeyDown(direction) {
            if (!this.isStylingOpen) this.open();
            if (!this.isLogicalOpen) this.open();

            if (direction === 'down') {
                this.highlightedIndex = (this.highlightedIndex + 1) % this.options.length;
            } else if (direction === 'up') {
                this.highlightedIndex = (this.highlightedIndex - 1 + this.options.length) % this.options.length;
            } else if (direction === 'enter') {
                if (!this.isStylingOpen) {
                    this.open();
                } else if (this.options[this.highlightedIndex]) {
                    this.selectOption(this.options[this.highlightedIndex]);
                }
            } else if (direction === 'esc') {
                this.close();
            }
        },
        markInvalid() {
            this.invalidState = true;
        },
        updateSelectedOption() {
            this.selectedOption = this.options.find(opt => opt.value === this.modelValue) || null;
        },
        clearSelection() {
            this.selectedOption = null;
            this.$emit('update:modelValue', null);
            this.invalidState = false;
        }
    },
    computed: {
        longestOptionLabel() {
            const longestOption = this.options.reduce((longest, option) => 
                option.label.length > longest.label.length ? option : longest, 
                { label: '' }
            );
            return longestOption.label;
        },
        clearButtonVisible() {
            return this.hasClearButton && this.selectedOption
        }
    },
    watch: {
        modelValue: 'updateSelectedOption',
        options: 'updateSelectedOption',
    },
};
</script>

<style scoped>
.custom-select {
    position: relative;
    height: 40px;
    max-width: 100%;
    min-width: 75px;
    width: max-content;
}

.loading.custom-select .selected-option {
    cursor: wait;
}

.selected-option {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: var(--spacing-sm);
    z-index: 10;

    font-family: 'Poppins', sans-serif;
    white-space: nowrap;
    color: var(--color-text-light);
    background-color: var(--color-background-input);
    cursor: pointer;
    user-select: none;
    
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-medium);
    transition: border 0.1s ease-out,
                width 0.2s var(--cubic-1);
}
.selected-option:hover, 
.custom-select.is-open .selected-option {
    border-color: var(--color-border-hover);
}
.custom-select.is-open .selected-option {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-text);
}
.custom-select .chevron {
    position: absolute;
    right: 6px;
    transition: transform 0.1s ease-out;
}
.custom-select.is-open .chevron {
    transform: rotate(180deg);
}

.selected-option .longest-option {
    opacity: 0;
    padding-right: var(--spacing-sm);
}
.selected-option .visible-option {
    position: absolute;
}

.selected-option .visible-option {
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
}

.selected-option.has-clear {
    width: calc(100% - 40px);
}
.options-list.has-clear {
    width: calc(100% - 40px);
}

.bx {
    font-size: var(--font-size-xxl);
}

.clear-btn {
    position: absolute;
    right: var(--spacing-xs);
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 5;
}
.clear-btn.disabled {
    pointer-events: none;
}
</style>
