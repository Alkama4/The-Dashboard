// src/utils/darkMode.js

export function toggleDarkMode() {
    const darkModeEnabled = document.documentElement.classList.toggle("dark-mode");
    // Store the user's preference in localStorage
    localStorage.setItem("darkMode", darkModeEnabled);
  }
  
  export function initializeDarkMode() {
    // Check local storage on initialization
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    if (darkModeEnabled) {
      document.documentElement.classList.add("dark-mode");
    }
  }
  