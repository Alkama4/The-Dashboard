// config.js

export const standAloneBuild = process.env.VUE_APP_STANDALONE_BUILD === "true";
export const isTouchDevice = 'ontouchstart' in document.documentElement;