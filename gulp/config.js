export default {
	/**
	 *
	 */
	browserify: {
		debug: true,
		outputName: 'bundle.js',
		entries: './app.js',
		extensions: ['.js'],
		transform: ['babelify'],
		watch: [
			'./component/**/*',
			'./app.js'
		]
	},

	/**
	 *
	 */
	sass: {
		src: './sass/main.sass',
		watch: './sass/**/*.{sass,scss}',
		dest: './public/css',
		settings: {
			outputStyle: 'nested'
			// https://github.com/sass/node-sass#options
		}
	},

	/**
	 *
	 */
	server: {
		execute: 'server.js',
		watch: [
			'./server.js',
			'./router/**/*',
			'./db/**/*'
		]
	}
}