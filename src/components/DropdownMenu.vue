<template>
    <div 
        class="dropdown-menu"
        @blur="closeMenu"
        tabindex="0"
    >
        <IconThreeDots size="32px" @click="toggleMenu" class="icon-button"/>
        <ul v-if="isOpen" class="menu card">
            <li v-for="(item, index) in options" 
                :key="index" 
                @click="handleClick(item)">
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<script>
import IconThreeDots from './icons/IconThreeDots.vue';

export default {
    name: "DropdownMenu",
    components: {
        IconThreeDots,
    },
    props: {
        options: {
            type: Array,
            required: true // [{ label: "Option 1", action: () => {} }]
        },
    },
    data() {
        return {
            isOpen: false
        };
    },
    methods: {
        // openMenu() {
        //     this.isOpen = true;
        // },
        closeMenu() {
            this.isOpen = false;
        },
        toggleMenu() {
            this.isOpen = !this.isOpen;
        },
        handleClick(item) {
            if (item.action && typeof item.action === "function") {
                item.action();
            }
            this.closeMenu();
        }
    }
};
</script>


<style scoped>
.dropdown-menu {
    position: relative;
    height: fit-content;
    width: fit-content;
    display: flex;
}
.menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin: 0;
    padding: var(--border-radius-medium) 0;
    border-radius: var(--border-radius-medium);
    list-style: none;
}
.menu li {
    padding: var(--spacing-xs) 12px;
    cursor: pointer;
    white-space: nowrap;
    color: var(--color-text-light);
}
.menu li:hover {
    background: var(--color-background-card-hover);
    color: var(--color-text);
}
</style>
