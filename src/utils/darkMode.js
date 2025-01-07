// src/utils/darkMode.js

// Toggle and store the user's preference in localStorage
export function toggleDarkMode() {
    const darkModeEnabled = document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", darkModeEnabled);

    // Dispatch a custom event
    const event = new CustomEvent("darkModeChange", { detail: { darkModeEnabled } });
    window.dispatchEvent(event);
}

// Check local storage or system preference on initialization
export function initializeDarkMode() {
    // First, check localstorage
    if (localStorage.getItem("darkMode") === "true") {
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("darkMode", true);
    } else {
        // If localstorage isnt set to dark, check the system preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("dark-mode");
            localStorage.setItem("darkMode", true);
        }
    }
}
