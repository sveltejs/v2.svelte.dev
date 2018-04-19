global.window = self; // egregious hack to get magic-string to work in a worker

const svelteCache = new Map();

function loadSvelte(version) {
	if (!svelteCache.has(version)) {
		if (version === 'local') {
			svelteCache.set(version, import(/* webpackChunkName: "svelte" */ 'svelte'));
		} else {
			svelteCache.set(version, new Promise((fulfil => {
				importScripts(`https://unpkg.com/svelte@${version}/compiler/svelte.js`);
				fulfil(global.svelte);
			})))
		}
	}

	return svelteCache.get(version).then(svelte => {
		global.svelte = svelte;
	});
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

let cached = {
	dom: null,
	ssr: null
};

let currentToken;

async function getBundle(mode, cache, lookup) {
	let bundle;
	let error;
	let erroredComponent;
	let warningCount = 0;

	const info = {};

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

						try {
							const { js, css, stats } = svelte.compile(component.source, {
								generate: mode,
								format: 'es',
								cascade: false,
								store: true,
								name: component.name,
								filename: component.name + '.html',
								dev: true,
								shared: false,
								onwarn: warning => {
									console.warn(warning.message);
									console.log(warning.frame);
									warningCount += 1;
								}
							});

							if (stats) {
								if (Object.keys(stats.hooks).length > 0) info.usesHooks = true;
							} else if (/[^_]oncreate/.test(component.source)) {
								info.usesHooks = true;
							}

							return js;
						} catch (err) {
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
	} catch (error) {
		return { error, erroredComponent, bundle: null, info: null, warningCount: null }
	}

	return { bundle, info, error: null, erroredComponent: null, warningCount };
}

export async function bundle(components) {
	console.clear();
	console.log(`running Svelte compiler version %c${svelte.VERSION}`, 'font-weight: bold');

	const token = currentToken = {};

	const lookup = {};
	components.forEach(component => {
		const path = `./${component.name}.${component.type}`;
		lookup[path] = component;
	});

	let error;
	let erroredComponent;

	try {
		const dom = await getBundle('dom', cached.dom, lookup);
		if (dom.error) {
			erroredComponent = dom.erroredComponent;
			throw dom.error;
		}

		if (token !== currentToken) return;

		cached.dom = dom.bundle;

		let uid = 1;
		const importMap = new Map();

		const domResult = await dom.bundle.generate({
			format: 'iife',
			name: 'SvelteComponent',
			globals: id => {
				const name = `import_${uid++}`;
				importMap.set(id, name);
				return name;
			},
			sourcemap: true
		});

		if (token !== currentToken) return;

		const ssr = dom.info.usesHooks
			? await getBundle('ssr', cached.ssr, lookup)
			: null;

		if (ssr) {
			cached.ssr = ssr.bundle;
			if (ssr.error) {
				erroredComponent = ssr.erroredComponent;
				throw ssr.error;
			}
		}

		if (token !== currentToken) return;

		const ssrResult = ssr
			? await ssr.bundle.generate({
				format: 'iife',
				name: 'SvelteComponent',
				globals: id => importMap.get(id),
				sourcemap: true
			})
			: null;

		return {
			bundle: {
				imports: dom.bundle.imports,
				importMap
			},
			dom: domResult,
			ssr: ssrResult,
			warningCount: dom.warningCount,
			error: null
		};
	} catch (err) {
		console.error(err);

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
			dom: null,
			ssr: null,
			warningCount: dom.warningCount,
			error: Object.assign({}, e, {
				message: e.message,
				stack: e.stack
			})
		};
	}
}

export function compile(component) {
	try {
		const { js } = svelte.compile(component.source, {
			// TODO make options configurable
			cascade: false,
			name: component.name,
			filename: component.name + '.html',
			dev: true
		});

		return js.code;
	} catch (err) {
		let result = `/* Error compiling component\n\n${err.message}`;
		if (err.frame) result += `\n${err.frame}`;
		result += `\n\n*/`;
		return result;
	}
}