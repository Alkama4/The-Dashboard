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

  	transpileDependencies: true,

	devServer: {
		port: 80
	}
});
