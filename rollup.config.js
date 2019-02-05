import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

const NAME = 'Photoswiper';
const COPYRIGHT_YEAR = `2016-${parseInt((new Date()).getFullYear(), 10)}`;

const banner = formatStr => `
/***
 * ${NAME} v${pkg.version}${(formatStr) ? `
 * ${formatStr}` : ''}
 * Copyright ${COPYRIGHT_YEAR} ${pkg.author.name}
 * Licensed under ${pkg.license}
 ***/`;

const terserOpts = {
	output: {
		comments(node, { value, type }) {
			if (type === 'comment2') {
				return /copyright/i.test(value);
			}
			return false;
		},
	},
};

const prod = process.env.NODE_ENV === 'production';

export default [
	// Node.js build
	{
		input: 'src/photoswiper.js',
		external: [
			'tabtrap',
			'lodash.merge',
			'photoswipe',
			'photoswipe/dist/photoswipe-ui-default'
		],
		plugins: [
			babel({
				// override targets to transpile for node 8
				presets: [['airbnb', {
					targets: { node: 8 },
				}]],
			}),
			(prod) ? terser(terserOpts) : null,
		],
		output: {
			file: pkg.main,
			format: 'cjs',
			banner: banner('Built for Node.js'),
		},
	},

	// ES module build
	{
		input: 'src/photoswiper.js',
		plugins: [
			resolve(),
    		commonjs(),
			babel({
				// https://caniuse.com/#feat=es6-module
				presets: [['airbnb', {
					targets: {
						android: 67,
						chromeandroid: 70,
						firefoxandroid: 63,
						ios: 11,
						chrome: 61,
						edge: 16,
						firefox: 60,
						safari: 11,
					},
				}]],
			}),
			(prod) ? terser(terserOpts) : null,
		],
		output: {
			file: pkg.module,
			format: 'esm',
			banner: banner('Built for ES modules'),
		},
	},

	// UMD build
	{
		input: 'src/photoswiper.js',
		plugins: [
			resolve(),
    		commonjs(),
			babel({ presets: ['airbnb'] }),
			(prod) ? terser(terserOpts) : null,
		],
		output: {
			file: pkg.browser,
			name: NAME,
			format: 'umd',
			banner: banner('Built for the browser'),
		},
	},
];
