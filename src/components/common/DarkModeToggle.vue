<template>
    <div 
        class="dark-mode-toggle dark-mode-button-wrapper icon-button" 
        @click.stop="toggleDark"
    >
        <i class='bx bxs-sun'></i>
        <i class='bx bxs-moon'></i>
    </div>
</template>

<script>
import { toggleDarkMode } from '@/utils/darkMode';

export default {
    name: 'DarkModeToggle',
    methods: {
        toggleDark() {
            toggleDarkMode();
        }
    }
};
</script>

<style scoped>
/* Copy the same styles from TopBar.vue */
.dark-mode-button-wrapper  {
    position: relative;
}

i {
    transition: opacity 0.2s ease-out,
                transform 0.6s var(--cubic-overshoot) !important;
}
i.bxs-moon {
    position: absolute;
}

.dark-mode-button-wrapper i.bxs-sun,
.dark-mode .dark-mode-button-wrapper i.bxs-moon {
    opacity: 1;
    transform: rotate(0deg);
}
.dark-mode-button-wrapper .bxs-moon,
.dark-mode .dark-mode-button-wrapper .bxs-sun {
    opacity: 0;
    transform: rotate(45deg);
}
</style>