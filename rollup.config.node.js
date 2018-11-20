const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

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
	],
};
