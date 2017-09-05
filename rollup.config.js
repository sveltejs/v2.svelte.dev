import fs from 'fs';
import glob from 'glob';
import hasha from 'hasha';
import hash from 'rollup-plugin-hash';
import replace from 'rollup-plugin-replace';
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import buble from 'rollup-plugin-buble';
import pkg from './package.json';

const dev = !!process.env.ROLLUP_WATCH;

function readJson(file) {
	return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

const hashed = {
	blog: readJson('manifests/content.json')['blog.json'],
	guide: readJson('manifests/content.json')['guide.json']
};

export default [
	/* bundle.js */
	{
		input: 'src/client/main.js',
		output: {
			file: 'build/bundle.js',
			format: 'iife',
		},
		plugins: [
			replace({
				'blog.[hash].json': () => hashed.blog,
				'guide.[hash].json': () => hashed.guide
			}),
			json(),
			resolve(),
			commonjs(),
			svelte({
				cascade: false,
				css (css) {
					if (dev) {
						css.write(`build/main.css`);
						hashed.css = 'main.css';
					} else {
						const hash = hasha(css.code, { algorithm: 'md5' });
						hashed.css = `main.${hash}.css`;

						css.write(`build/${hashed.css}`);
						fs.writeFileSync(`manifests/css.json`, JSON.stringify({ 'main.css': hashed.css }));
					}
				}
			}),
			buble(),
			!dev && hash({
				dest: 'build/bundle.[hash].js',
				manifest: 'manifests/bundle.json',
				manifestKey: 'bundle.js'
			}),
			!dev && uglify()
		],
		sourcemap: true
	},

	/* codemirror.js */
	{
		input: 'src/client/codemirror.js',
		output: {
			file: 'public/codemirror.js',
			format: 'amd',
		},
		plugins: [
			resolve(),
			commonjs(),
			!dev && uglify()
		],
		sourcemap: true
	},

	/* sw.js */
	{
		input: 'src/service-worker/main.js',
		output: {
			file: 'build/sw.js',
			format: 'iife',
		},
		plugins: [
			replace({
				__CACHEVERSION__: () => Date.now(),
				__MANIFEST__: generateCacheManifest
			}),
			buble(),
			!dev && hash({
				dest: 'build/sw.[hash].js',
				manifest: 'manifests/sw.json',
				manifestKey: 'sw.js'
			}),
			!dev && uglify()
		],
		sourcemap: true
	},

	/* server.js */
	{
		input: 'src/server/index.js',
		output: {
			file: 'server.js',
			format: 'cjs',
		},
		external: Object.keys(pkg.dependencies).concat([
			'path', 'fs'
		]),
		plugins: [
			replace({
				__dev__: !!dev,
				'blog.[hash].json': hashed.blog,
				'guide.[hash].json': hashed.guide
			}),
			json(),
			svelte({
				generate: 'ssr',
				cascade: false,
				css: false
			})
		]
	}
];

function generateCacheManifest() {
	// https://github.com/phamann/rollup-plugin-hash/issues/14
	hashed.bundle = readJson('manifests/bundle.json')['bundle.js'].replace('build/', '');

	const manifest = [].concat(
		// routes
		'/',
		'/guide',
		'/repl',
		'/blog',

		// js
		`/${hashed.bundle}`,
		'/curl.js',
		'/codemirror.js',
		'/magic-string.umd.js',

		// css
		`/${hashed.css}`,
		'/codemirror.css',

		// fonts
		glob.sync('fonts/**/*.woff?(2)', { cwd: 'public' }).map(x => `/${x}`),

		// content
		`/${hashed.blog}`, // don't need to include individual posts
		`/${hashed.guide}`,
		glob.sync('examples/**/*.json', { cwd: 'public' }).map(x => `/${x}`)
	);

	return JSON.stringify(manifest);
}