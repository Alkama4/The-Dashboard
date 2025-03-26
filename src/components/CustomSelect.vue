<template>
    <div class="custom-select" :class="{'is-open': isLogicalOpen && isStylingOpen}">
        <div 
            class="selected-option icon-align" 
            @click="toggleDropdown"
        >
            <span>{{ selectedOption?.label || 'Select an option' }}</span>
        <IconChevronDown/>
        </div>
        <ul 
            v-if="isLogicalOpen" 
            class="options-list"
            :class="{'hidden': !isStylingOpen}"
        >
            <li v-for="option in options" :key="option.value" @click="selectOption(option)">
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
                setTimeout(() => {
                    this.isStylingOpen = true;
                }, 10);
            }
        },
        close() {
            this.isStylingOpen = false;
            setTimeout(() => {
                this.isLogicalOpen = false;
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
        selectOption(option) {
            this.$emit('update:modelValue', option.value);
            this.close();
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(value) {
                this.selectedOption = this.options.find(opt => opt.value === value) || null;
            }
        }
    }
};
</script>


<style scoped>
.custom-select {
    position: relative;
    width: 200px;
    height: 41px;
    --selected-option-border-radius: var(--border-radius-small);
}
.loading.custom-select .selected-option {
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
    color: var(--color-text-light);
    background-color: var(--color-background-input);
    cursor: pointer;
    user-select: none;
    
    border: 1px solid var(--color-border);
    border-radius: var(--selected-option-border-radius);
    transition: border 0.1s ease-out;
}
.selected-option:hover, 
.custom-select.is-open .selected-option {
    border-color: var(--color-border-hover);
}
.custom-select svg {
    transition: transform 0.1s ease-out;
}
.custom-select.is-open svg {
    transform: rotate(180deg);
}

.options-list {
    background-color: var(--color-background-input);
    border: 1px solid var(--color-border-hover);
    border-radius: var(--border-radius-small);
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    overflow: hidden;
    list-style: none;
    top: calc(100% - var(--selected-option-border-radius));
    left: 0;
    right: 0;
    padding: 6px 0;
    margin: 0;
    position: absolute;
    z-index: 10;
    user-select: none;
    
    opacity: 1;
    transition: opacity 0.2s ease-out;
}
.options-list li {
    color: var(--color-text-light);
    padding: var(--spacing-xs) var(--spacing-sm);
    cursor: pointer;
    /* transition: background-color 0.1s ease-out; */
}
.options-list li:hover {
    color: var(--color-text);
    background-color: var(--color-background-select-hover);
}
.options-list.hidden {
    opacity: 0;
}
</style>
