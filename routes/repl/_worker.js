global.window = self; // egregious hack to get magic-string to work in a worker

function loadSvelte(version) {
	if (version === 'local') {
		return import(/* webpackChunkName: "svelte" */ 'svelte').then(s => {
			global.svelte = s;
		});
	}

	importScripts(`https://unpkg.com/svelte@${version}/compiler/svelte.js`);
}

export async function init(version) {
	await Promise.all([
		import(/* webpackChunkName: "rollup" */ 'rollup/dist/rollup.browser.js').then(r => {
			global.rollup = r;
		}),
		loadSvelte(version)
	]);

	return svelte.VERSION;
}

let bundle;
let currentToken;

export async function compile(components) {
	const token = currentToken = {};

	console.clear();
	console.log(`running Svelte compiler version %c${svelte.VERSION}`, 'font-weight: bold');

	const lookup = {};
	components.forEach(component => {
		const path = `./${component.name}.${component.type}`;
		lookup[path] = component;
	});

	let warningCount = 0;

	try {
		bundle = await rollup.rollup({
			input: './App.html',
			external: id => {
				return id[0] !== '.';
			},
			plugins: [{
				resolveId(importee, importer) {
					if (importee in lookup) return importee;
				},
				load(id) {
					if (id in lookup) {
						const component = lookup[id];

						if (component.type === 'js') return component.source;

						const { code, map } = svelte.compile(component.source, {
							cascade: false,
							name: component.name,
							filename: component.name + '.html',
							dev: true,
							onwarn: warning => {
								console.warn(warning.message);
								console.log(warning.frame);
								warningCount += 1;
							}
						});

						return { code, map };
					}
				}
			}],
			onwarn(warning) {
				console.warn(warning);
				warnings.push(warning);
				warningCount += 1;
			},
			cache: bundle
		});

		if (token !== currentToken) return;

		let uid = 1;
		const importMap = new Map();

		const { code, map } = await bundle.generate({
			format: 'iife',
			name: 'SvelteComponent',
			globals: id => {
				const name = `import_${uid++}`;
				importMap.set(id, name);
				return name;
			},
			sourcemap: true
		});

		return {
			bundle: {
				code,
				map,
				imports: bundle.imports,
				importMap
			},
			warningCount,
			error: null
		};
	} catch (err) {
		return {
			bundle: null,
			warningCount,
			error: err.message
		};
	}
}