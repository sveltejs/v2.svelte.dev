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

	return version === 'local' ? version : svelte.VERSION;
}

let cache;
let currentToken;

export async function bundle(components) {
	console.clear();
	console.log(`running Svelte compiler version %c${svelte.VERSION}`, 'font-weight: bold');

	const token = currentToken = {};

	const lookup = {};
	components.forEach(component => {
		const path = `./${component.name}.${component.type}`;
		lookup[path] = component;
	});

	let warningCount = 0;
	let error;
	let erroredComponent;

	try {
		const bundle = await rollup.rollup({
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

						try {
							const { code, map } = svelte.compile(component.source, {
								cascade: false,
								name: component.name,
								filename: component.name + '.html',
								dev: true,
								shared: true,
								onwarn: warning => {
									console.warn(warning.message);
									console.log(warning.frame);
									warningCount += 1;
								}
							});

							return { code, map };
						} catch (err) {
							error = err;
							erroredComponent = component;
							throw err;
						}
					}
				}
			}],
			onwarn(warning) {
				console.warn(warning);
				warnings.push(warning);
				warningCount += 1;
			},
			cache
		});

		if (token !== currentToken) return;

		cache = bundle;

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
		const e = error || err;
		delete e.toString;

		if (erroredComponent && e.loc) {
			const { line, column } = e.loc;
			// for some reason error.loc gets borked up, maybe by Rollup?
			// TODO investigation. In the meantime, fix it here
			const { locate } = await import(/* webpackChunkName: "locate-character" */ 'locate-character');
			e.loc = locate(erroredComponent.source, e.pos, { offsetLine: 1 });
			e.loc.file = erroredComponent.name;
			e.message = e.message.replace(` (${line}:${column})`, '');
		}

		return {
			bundle: null,
			warningCount,
			error: Object.assign({}, e, {
				message: e.message,
				stack: e.stack
			})
		};
	}
}

export function compile(component) {
	try {
		const { code } = svelte.compile(component.source, {
			// TODO make options configurable
			cascade: false,
			name: component.name,
			filename: component.name + '.html',
			dev: true
		});

		return code;
	} catch (err) {
		let result = `/* Error compiling component\n\n${err.message}`;
		if (err.frame) result += `\n${err.frame}`;
		result += `\n\n*/`;
		return result;
	}
}