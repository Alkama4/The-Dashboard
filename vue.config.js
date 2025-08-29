const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
	outputDir: (() => {
		// Check if we are in production and not a standalone build
		if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_STANDALONE_BUILD !== 'true') {
			return path.normalize(process.env.VUE_APP_PRODUCTION_BUILD_PATH);
		}
		
		// Check if it's a standalone build
		if (process.env.VUE_APP_STANDALONE_BUILD === 'true') {
			return process.env.VUE_APP_STANDALONE_BUILD_PATH;
		}
		
		// Default to local folder for development
		return path.resolve(__dirname, 'dist');
	})(),
	
	// Github pages seems to require setting a public path or it otherwise uses the repo owners page like this:
	// 		https://alkama4.github.io/js/chunk-vendors.97f3093a.js
	// instead of the repos path:
	// 		https://alkama4.github.io/The-Dashboard/js/chunk-vendors.97f3093a.js
	publicPath: process.env.NODE_ENV === 'production' && process.env.VUE_APP_STANDALONE_BUILD === 'true' 
    ? '/The-Dashboard/'
    : '/', // Default to root in development or standalone builds


  	transpileDependencies: true,

	devServer: {
		port: 80
	},

	chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Dashboard';
            return args;
        });
    }
});
