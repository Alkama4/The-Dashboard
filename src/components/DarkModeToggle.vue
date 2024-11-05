<!-- src/components/DarkModeToggle.vue -->
<template>
    <button @click="toggleDarkMode">
      Toggle Dark Mode
    </button>
  </template>
  
  <script>
  export default {
    mounted() {
      // Check local storage on component mount
      const darkModeEnabled = localStorage.getItem("darkMode") === "true";
      if (darkModeEnabled) {
        document.documentElement.classList.add("dark-mode");
      }
    },
    methods: {
      toggleDarkMode() {
        const darkModeEnabled = document.documentElement.classList.toggle("dark-mode");
        // Store the user's preference in localStorage
        localStorage.setItem("darkMode", darkModeEnabled);
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    padding: 8px 12px;
    cursor: pointer;
    background-color: var(--color-button-bg);
    color: var(--color-button-text);
    border: 1px solid var(--color-border);
  }
  </style>
  