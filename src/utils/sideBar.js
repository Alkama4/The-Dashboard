// src/utils/sideBar.js

// Define the sidebar sizes
const sidebarSizes = {
    collapsed: "50px 1fr",
    expanded: "250px 1fr"
};

// Toggles the sidebar size and stores the state in localStorage
export function toggleSideBar() {
    const app = document.getElementById("app");
    let sidebarExpanded = localStorage.getItem('sidebarExpanded') === 'true';

    const newWidth = sidebarExpanded ? sidebarSizes.collapsed : sidebarSizes.expanded;
    app.style.setProperty('grid-template-columns', newWidth);

    sidebarExpanded = !sidebarExpanded;
    localStorage.setItem('sidebarExpanded', sidebarExpanded);    
}

// Initializes the sidebar size based on the value stored in localStorage
export function initializeSideBar() {
    const app = document.getElementById("app");
    let sidebarExpanded = localStorage.getItem('sidebarExpanded') === 'true';

    const newWidth = sidebarExpanded ? sidebarSizes.expanded : sidebarSizes.collapsed;
    app.style.setProperty('grid-template-columns', newWidth);
}
