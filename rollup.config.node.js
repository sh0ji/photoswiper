const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

module.exports = {
	input: 'src/photoswiper.js',
	output: {
		file: 'dist/photoswiper.js',
		format: 'cjs',
		sourcemap: true,
	},
	plugins: [
		resolve(),
		commonjs(),
		babel(),
	],
};
