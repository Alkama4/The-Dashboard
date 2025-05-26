// config.js

export const standAloneBuild = process.env.VUE_APP_STANDALONE_BUILD === "true";
export const isTouchDevice = 'ontouchstart' in document.documentElement;
export const apiUrl = process.env.VUE_APP_API_URL;