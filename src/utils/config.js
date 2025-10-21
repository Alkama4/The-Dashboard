// config.js

export const standAloneBuild = process.env.VUE_APP_STANDALONE_BUILD === "true";
export const isTouchDevice = 'ontouchstart' in document.documentElement;
export const apiUrl = process.env.VUE_APP_API_URL;
export const portainerUrl = process.env.VUE_APP_PORTAINER_URL;
export const newReleaseCutoffDate = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
export const isDarkmode = () => !!localStorage.getItem("darkMode");
