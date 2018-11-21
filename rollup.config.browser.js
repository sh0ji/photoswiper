const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

module.exports = {
	input: 'src/photoswiper.js',
	output: {
		file: 'dist/photoswiper.browser.js',
		format: 'umd',
		sourcemap: true,
		name: 'photoswiper',
	},
	plugins: [
		resolve(),
		commonjs(),
		babel(),
	],
};
