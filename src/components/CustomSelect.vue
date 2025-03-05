<template>
    <div class="custom-select" :class="{'is-open': isOpen}">
        <div 
            class="selected-option icon-align" 
            @click="toggleDropdown"
        >
            <span>{{ selectedOption || 'Select an option' }}</span>
            <IconChevronDown/>
        </div>
        <ul v-if="isOpen" class="options-list">
            <li v-for="option in options" :key="option" @click="selectOption(option)">
                {{ option }}
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
    },
    data() {
        return {
            isOpen: false,
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
        toggleDropdown(event) {
            event.stopPropagation();
            this.isOpen = !this.isOpen;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false;
            }
        },
        selectOption(option) {
            this.$emit('update:modelValue', option);
            this.isOpen = false;
        },
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(value) {
                this.selectedOption = value;
            }
        }
    },
};
</script>

<style scoped>
.custom-select {
    position: relative;
}
.selected-option {
    display: flex;
    justify-content: space-between;
    width: 200px;
    height: 35px;
    padding-left: var(--spacing-sm);

    font-family: 'Poppins', sans-serif;
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
.custom-select svg {
    transition: transform 0.1s ease-out;
}
.custom-select.is-open svg {
    transform: rotate(180deg);
}

.options-list {
    background-color: var(--color-background-input);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-small);

    overflow: hidden;
    list-style: none;
    top: 100%;
    left: 0;
    right: 0;
    padding: var(--border-radius-small) 0;
    margin: 0;
    position: absolute;
    z-index: 10;
}
.options-list li {
    color: var(--color-text-light);
    padding: var(--spacing-xs) var(--spacing-sm);
    cursor: pointer;
}
.options-list li:hover {
    color: var(--color-text);
    background: var(--color-button-general);
}
</style>
