<template>
    <div class="custom-select" 
        :class="{'is-open': isLogicalOpen && isStylingOpen}" 
    >
        <div 
            class="selected-option icon-align" 
            :class="{'invalid-input': invalidState}"
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
            <IconChevronDown size="28px"/>
        </div>
        <ul v-if="isLogicalOpen" class="options-list" :class="{'hidden': !isStylingOpen}">
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
import IconChevronDown from './icons/IconChevronDown.vue';

export default {
    components: {
        IconChevronDown,
    },
    props: {
        options: Array,
        modelValue: String,
        disabled: Boolean,
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
        }
    },
    computed: {
        longestOptionLabel() {
            const longestOption = this.options.reduce((longest, option) => 
                option.label.length > longest.label.length ? option : longest, 
                { label: '' }
            );
            return longestOption.label;
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
    width: 100%;
    min-width: 100%;
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
.custom-select.is-open .selected-option {
    border-color: var(--color-border-hover);
}
.custom-select.is-open .selected-option {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-text);
}
.custom-select svg {
    transition: transform 0.1s ease-out;
}
.custom-select.is-open svg {
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

.selected-option .visible-option {
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: calc(100% - 40px); /* adjust based on icon size & padding */
}
</style>
