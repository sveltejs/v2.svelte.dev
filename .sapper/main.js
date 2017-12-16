import app from '/Users/208311/Development/SVELTE/sapper/runtime/app.js';

app.init(document.querySelector('#sapper'), [
	{ pattern: /^\/repl$/, params: match => ({}), load: () => import(/* webpackChunkName: "repl" */ '/Users/208311/Development/SVELTE/svelte.technology/routes/repl/index.html') },
	{ pattern: /^\/blog$/, params: match => ({}), load: () => import(/* webpackChunkName: "blog" */ '/Users/208311/Development/SVELTE/svelte.technology/routes/blog/index.html') },
	{ pattern: /^\/guide$/, params: match => ({}), load: () => import(/* webpackChunkName: "guide" */ '/Users/208311/Development/SVELTE/svelte.technology/routes/guide/index.html') },
	{ pattern: /^\/$/, params: match => ({}), load: () => import(/* webpackChunkName: "_" */ '/Users/208311/Development/SVELTE/svelte.technology/routes/index.html') },
	{ pattern: /^\/blog\/([^\/]+)$/, params: match => ({ slug: match[1] }), load: () => import(/* webpackChunkName: "blog_$slug$" */ '/Users/208311/Development/SVELTE/svelte.technology/routes/blog/[slug].html') }
]);