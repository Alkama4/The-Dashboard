<template>
    <div class="custom-search-select" :class="{'is-open': isLogicalOpen && isStylingOpen}">
        <div 
            class="selected-option icon-align" 
            :class="{'invalid-input': invalidState}"
        >
            <input 
                class="input-field" 
                type="text" 
                v-model="selectedOption" 
                @input="updateInput"
                @focusin="open"
                @focusout="close"
                @keydown.down.prevent="handleKeyDown('down')"
                @keydown.up.prevent="handleKeyDown('up')"
                @keydown.enter.prevent="handleKeyDown('enter')"
                @keydown.tab="handleKeyDown('enter')"
            >
            <span class="longest-option">{{ longestOption }}</span>
            <span v-if="!selectedOption || selectedOption == ''" class="placeholder">{{ placeholder }}</span>
            <IconChevronDown size="28px"/>
        </div>
        <ul 
            v-if="isLogicalOpen" 
            class="options-list"
            :class="{'hidden': !isStylingOpen}"
            tabindex="-1"
        >
            <li 
                v-for="(option, index) in filteredOptions" 
                :key="option" 
                @click="selectOption(option)"
                @mouseenter="highlightedIndex = index"
                :class="{ 'highlighted': index === highlightedIndex }"
            >
                {{ option }}
            </li>
            <li v-if="filteredOptions.length == 0" class="not-found" @click.prevent>
                No matches found, using the current value.
            </li>
        </ul>
    </div>
</template>

<script>
import IconChevronDown from './icons/IconChevronDown.vue';

export default {
    components: {
        IconChevronDown,
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
    data() {
        return {
            isStylingOpen: false,
            isLogicalOpen: false,
            selectedOption: "",
            highlightedIndex: -1,
            invalidState: false,
        };
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        open() {
            if (!this.disabled) {
                this.isLogicalOpen = true;
                // On purpose do not allow animation and set without miniscule delay
                // More inline with the inputs white focus border
                this.isStylingOpen = true;
                this.highlightedIndex = -1; // Reset selection
            }
        },
        close() {
            this.isStylingOpen = false;
            setTimeout(() => {
                if (!this.isStylingOpen) {
                    this.isLogicalOpen = false;
                }
            }, 200);
        },
        toggleDropdown(event) {
            if (!this.disabled) {
                event.stopPropagation();
                this.isLogicalOpen ? this.close() : this.open(); // Toggle between open and close
            }
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.close();
            }
        },
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
            this.invalidState = false;
            this.open();
        },
        selectOption(option) {
            this.selectedOption = option;
            this.$emit('update:modelValue', option);
            this.invalidState = false;
            this.close();
        },
        handleKeyDown(direction) {
            if (!this.isLogicalOpen) return;

            if (direction === 'down') {
                this.highlightedIndex = 
                    (this.highlightedIndex + 1) % (this.filteredOptions.length + 1);
            } else if (direction === 'up') {
                this.highlightedIndex = 
                    (this.highlightedIndex - 1 + (this.filteredOptions.length + 1)) % (this.filteredOptions.length + 1);
            } else if (direction === 'enter') {
                if (this.filteredOptions[this.highlightedIndex]) {
                    this.selectOption(this.filteredOptions[this.highlightedIndex]);
                }
            }
        },
        markInvalid() {
            this.invalidState = true;
        },
    },
    computed: {
        longestOption() {
            const longestOption = this.options.reduce((longest, option) => {
                return option.length > longest.length ? option : longest;
            }, 'Select an option');
            return longestOption;
        },
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
};
</script>


<style scoped>
.custom-search-select {
    position: relative;
    height: 40px;
}
.loading.custom-search-select .selected-option {
    cursor: wait;
}

.selected-option {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-left: var(--spacing-sm);

    font-family: 'Poppins', sans-serif;
    white-space: nowrap;
    color: var(--color-text-light);
    background-color: var(--color-background-input);
    cursor: pointer;
    user-select: none;
    
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-small);
    transition: border 0.1s ease-out;
}
.selected-option:hover, 
.custom-search-select.is-open .selected-option {
    border-color: var(--color-border-hover);
}
.custom-search-select svg {
    transition: transform 0.1s ease-out;
}
.custom-search-select.is-open svg {
    transform: rotate(180deg);
}

.selected-option .longest-option {
    opacity: 0;
    padding-right: var(--spacing-sm);
}
.selected-option .visible-option {
    position: absolute;
}
.selected-option svg {
    position: absolute;
    right: 6px;
}
.selected-option .placeholder {
    color: var(--color-text-lighter);

    position: absolute;
    left: var(--spacing-sm);

    user-select: none;
    pointer-events: none;
}
.selected-option .input-field {
    border: 0;
    background-color: transparent;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
}

</style>
