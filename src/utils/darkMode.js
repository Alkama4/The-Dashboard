// src/utils/darkMode.js

// Toggle and store the user's preference in localStorage
export function toggleDarkMode() {
    const darkModeEnabled = document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", darkModeEnabled);
}

// Check local storage on initialization
export function initializeDarkMode() {
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    if (darkModeEnabled) {
        document.documentElement.classList.add("dark-mode");
    }
}