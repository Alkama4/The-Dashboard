// src/utils/darkMode.js

// Toggle and store the user's preference in localStorage
export function toggleDarkMode() {
    const darkModeEnabled = document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", darkModeEnabled);
}

// Check local storage or system preference on initialization
export function initializeDarkMode() {
    // First, check for the user preference in localStorage
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    
    if (darkModeEnabled) {
        document.documentElement.classList.add("dark-mode");
    } else if (darkModeEnabled === null) {
        // If no user preference is set, check the system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
            document.documentElement.classList.add("dark-mode");
        }
    }

}
