const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  // Check the environment
  outputDir: process.env.NODE_ENV === 'production'
    ? '\\\\192.168.0.2\\www\\local-nginx' // Network drive for production build
    : path.resolve(__dirname, 'dist'), // Local folder for development (you can change 'dist' to any folder you prefer)

  transpileDependencies: true,

  devServer: {
    // You can configure devServer options here if needed
    // contentBase: path.join(__dirname, 'dist'), // Serve files from 'dist' directory during development
    // compress: true,
    port: 80
  }
});
