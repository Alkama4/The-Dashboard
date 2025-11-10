<template>
    <div 
        class="dropdown-menu"
        :class="{'active': isOpen}"
        @blur="closeMenu"
        tabindex="0"
    >
        <i 
            class="bx bx-dots-vertical-rounded icon-button circle-bg" 
            :class="{'hover-circle-bg': !bgMode}"
            @click.stop.prevent="toggleMenu"
        ></i>
        <Transition name="dropdown-fade">
            <ul v-if="isOpen" class="menu card" @click.prevent>
                <li v-for="(item, index) in options" 
                    :key="index" 
                    @click="handleClick(item)"
                >
                    <i v-if="item.icon" class="bx" :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                </li>
            </ul>
        </Transition>
        <Teleport to="body">
            <MobileDrawer ref="dropDownDrawer">
                <ul class="menu mobile">
                    <li v-for="(item, index) in options" 
                        :key="index" 
                        :class="{ 'no-border': index == 0 }"
                        @click="handleClick(item)"
                    >
                        <i v-if="item.icon" class="bx" :class="item.icon"></i>
                        <span>{{ item.label }}</span>
                    </li>
                </ul>
            </MobileDrawer>
        </Teleport>
    </div>
</template>

<script>
import MobileDrawer from './MobileDrawer.vue';
import { isTouchDevice } from '@/utils/config';

export default {
    name: "DropdownMenu",
    components: {
        MobileDrawer
    },
    props: {
        options: {
            type: Array,
            required: true // [{ label: "Option 1", action: () => {} }]
        },
        bgMode: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            isOpen: false
        };
    },
    methods: {
        openMenu() {
            if (isTouchDevice) {
                this.$refs.dropDownDrawer.open();
            } else {
                this.isOpen = true;
            }
        },
        closeMenu() {
            this.isOpen = false;
        },
        toggleMenu() {
            if (isTouchDevice) {
                this.$refs.dropDownDrawer.open();
            } else {
                this.isOpen = !this.isOpen;
            }
        },
        handleClick(item) {
            if (item.action && typeof item.action === "function") {
                item.action();
            }
            this.$refs.dropDownDrawer.close();
            this.closeMenu();
        }
    }
};
</script>


<style scoped>
.dropdown-menu {
    position: absolute;
    height: fit-content;
    width: fit-content;
    display: flex;
}
.dropdown-menu.active {
    opacity: 1;
}

.dropdown-menu .bx-dots-vertical-rounded {
    font-size: var(--font-size-xl);
}

.menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin: 0;
    padding: var(--spacing-xs);
    border-radius: var(--border-radius-sm);
    list-style: none;
    user-select: none;
    z-index: var(--z-drop-down);
}
.menu li {
    padding: 6px 16px;
    padding-right: 32px;
    border-radius: var(--border-radius-xs);
    cursor: pointer;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 16px;
    color: var(--color-text);
    font-weight: 400;
    font-size: var(--font-size-md);
}
.menu li i {
    font-size: var(--font-size-lg);
}
.pointer-device .menu li:hover {
    background: var(--color-background-card-hover);
    color: var(--color-text-bold);
}

.menu.mobile {
    position: static;
    padding: 0;
}
.menu.mobile li {
    padding: var(--spacing-md) var(--spacing-sm);
    gap: var(--spacing-md);
    color: var(--color-text);
    font-weight: 400;
    font-size: 1rem;
    border-top: 2px solid var(--color-border);
}
.menu.mobile li.no-border {
    border: unset;
}
.menu.mobile li i {
    font-size: var(--font-size-xl);
}

.dropdown-fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}
.dropdown-fade-enter-active {
    transition: all 0.2s ease;
}
.dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
.dropdown-fade-leave-active {
    transition: all 0.2s ease;
}

</style>
