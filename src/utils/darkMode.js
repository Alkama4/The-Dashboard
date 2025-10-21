// src/utils/darkMode.js

// Toggle and store the user's preference in localStorage
export function toggleDarkMode() {
    const darkModeEnabled = document.documentElement.classList.toggle("dark-mode");
    document.documentElement.classList.toggle("light-mode");
    localStorage.setItem("darkMode", darkModeEnabled);

    // Dispatch a custom event
    const event = new CustomEvent("darkModeChange", { detail: { darkModeEnabled } });
    window.dispatchEvent(event);
}

// Check local storage or system preference on initialization
export function initializeDarkMode() {
    // First, check local storage
    if (localStorage.getItem("darkMode") === "true") {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
    } else if (localStorage.getItem("darkMode") === "false") {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
    } else {
        // If local storage is not set, use system preferences
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setDarkModeTo("on");
        } else {
            setDarkModeTo("off");
        }
    }

    // Listen to changes in system preferences
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
        if (event.matches) {
            setDarkModeTo("on");
        } else {
            setDarkModeTo("off");
        }
    });
}

function setDarkModeTo(mode) {
    if (mode === "on") {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
        localStorage.setItem("darkMode", true);

        // Dispatch a custom event
        const event = new CustomEvent("darkModeChange", { detail: { darkModeEnabled: true } });
        window.dispatchEvent(event);
    } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
        localStorage.setItem("darkMode", false);

        // Dispatch a custom event
        const event = new CustomEvent("darkModeChange", { detail: { darkModeEnabled: false } });
        window.dispatchEvent(event);
    }
}
