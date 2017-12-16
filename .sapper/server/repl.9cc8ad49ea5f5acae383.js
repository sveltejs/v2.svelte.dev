module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		9: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + ({}[chunkId]||chunkId) + "." + chunkId + "." + "9cc8ad49ea5f5acae383" + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// uncatched error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using System.import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 215);
/******/ })
/************************************************************************/
/******/ ({

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Nav_html__ = __webpack_require__(184);




var Index = {};

Index.filename = "/Users/208311/Development/SVELTE/svelte.technology/routes/_components/Layout.html";

Index.data = function() {
	return {};
};

Index.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Index._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return result.html;
		}
	};
}

Index._render = function(__result, state, options) {
	__result.addComponent(Index);

	state = Object.assign({}, state);

	return `${__WEBPACK_IMPORTED_MODULE_0__Nav_html__["a" /* default */]._render(__result, {page: state.page}, { store: options.store })}

<div svelte-428658705>
	${options && options.slotted && options.slotted.default ? options.slotted.default() : ``}
</div>`;
};

Index.css = {
	code: "div[svelte-428658705]{position:relative;padding:3em 0 0 0;overflow-x:hidden}@media(min-width: 768px){div[svelte-428658705]{padding:4em 0 0 0}}",
	map: "{\"version\":3,\"file\":\"Layout.html\",\"sources\":[\"Layout.html\"],\"sourcesContent\":[\"<Nav :page/>\\n\\n<div>\\n\\t<slot></slot>\\n</div>\\n\\n<style>\\n\\tdiv {\\n\\t\\tposition: relative;\\n\\t\\tpadding: 3em 0 0 0;\\n\\t\\toverflow-x: hidden;\\n\\t}\\n\\n\\t@media (min-width: 768px) {\\n\\t\\tdiv {\\n\\t\\t\\tpadding: 4em 0 0 0;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<script>\\n\\timport Nav from './Nav.html';\\n\\n\\texport default {\\n\\t\\tcomponents: {\\n\\t\\t\\tNav\\n\\t\\t}\\n\\t};\\n</script>\"],\"names\":[],\"mappings\":\"AAOC,GAAG,kBAAC,CAAC,AACJ,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,UAAU,CAAE,MAAM,AACnB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,GAAG,kBAAC,CAAC,AACJ,OAAO,CAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AACnB,CAAC,AACF,CAAC\"}"
};

var warned = false;
Index.renderCss = function() {
	if (!warned) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned = true;
	}

	var components = [];

	components.push({
		filename: Index.filename,
		css: Index.css && Index.css.code,
		map: Index.css && Index.css.map
	});

	var seen = {};

	function addComponent(component) {
		var result = component.renderCss();
		result.components.forEach(x => {
			if (seen[x.filename]) return;
			seen[x.filename] = true;
			components.push(x);
		});
	}

	addComponent(__WEBPACK_IMPORTED_MODULE_0__Nav_html__["a" /* default */]);

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};
/* harmony default export */ __webpack_exports__["a"] = (Index);

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GuideContents_html__ = __webpack_require__(2);


function data() {
	return {
		open: false,
		route: '',
		active: null
	};
};

var Index = {};

Index.filename = "/Users/208311/Development/SVELTE/svelte.technology/routes/_components/Nav.html";

Index.data = function() {
	return data();
};

Index.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Index._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return result.html;
		}
	};
}

Index._render = function(__result, state, options) {
	__result.addComponent(Index);

	state = Object.assign(data(), state);

	return `<div class="${state.open ? "open": "closed"} mousecatcher" svelte-2829050598></div>

<div class="container" svelte-2829050598>
	<span class="menu-link" svelte-2829050598>${__escape(state.open ? 'Close' : 'Menu')}</span>
	<a href="/" class="logo" svelte-2829050598>Svelte</a>
</div>

<nav class="${state.open ? "open": "closed"}" svelte-2829050598>
	<ul class="primary" svelte-2829050598>
		<li svelte-2829050598><a class="${state.page === "guide" ? "active": ""}" href="/guide" svelte-2829050598>Guide</a></li>
		<li svelte-2829050598><a class="${state.page === "repl" ? "active": ""}" href="/repl" svelte-2829050598>REPL</a></li>
		<li svelte-2829050598><a class="${state.page === "blog" ? "active": ""}" href="/blog" svelte-2829050598>Blog</a></li>
		<li svelte-2829050598><a href="https://gitter.im/sveltejs/svelte" svelte-2829050598>Chat</a></li>
		<li svelte-2829050598><a href="https://github.com/sveltejs/svelte" svelte-2829050598>GitHub</a></li>
	</ul>

	<div class="secondary" svelte-2829050598>
		${__WEBPACK_IMPORTED_MODULE_0__GuideContents_html__["a" /* default */]._render(__result, {}, { store: options.store })}
	</div>
</nav>`;
};

Index.css = {
	code: ".mousecatcher[svelte-2829050598]{position:fixed;left:0;top:0;width:100vw;height:100vh;background-color:black;pointer-events:none;opacity:0;z-index:3}.mousecatcher.open[svelte-2829050598]{pointer-events:all;opacity:0.3}@keyframes svelte-2829050598-fadein{from{opacity:0}to{opacity:1}}.container[svelte-2829050598]{position:fixed;width:100%;height:3em;background-color:#333;color:#eee;border-bottom:2px solid rgb(170,30,30);font-family:Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";z-index:5}nav[svelte-2829050598]{position:fixed;width:14em;height:calc(100vh - 3em);top:3em;font-family:Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";background-color:white;transform:translate(-100%,0);transition:transform 0.2s cubic-bezier(.17,.67,.24,.99);border-right:1px solid #eee;z-index:5;padding:1em;user-select:none}.open[svelte-2829050598]{transform:translate(0,0);transition:transform 0.3s cubic-bezier(.17,.67,.24,.99);overflow-y:auto}.menu-link[svelte-2829050598]{display:inline;position:absolute;top:0;left:1rem;font-size:1em;line-height:3.1em;color:#ccc;cursor:pointer;font-weight:500;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}.logo[svelte-2829050598]{position:absolute;top:50%;left:50%;transform:translate(-50%, -45%);-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;line-height:1;text-transform:lowercase;color:white;font-size:1.4rem}ul[svelte-2829050598]{display:block;margin:0;padding:0;list-style:none}.primary[svelte-2829050598]{margin:0 0 2em 0}.primary[svelte-2829050598] li[svelte-2829050598]{position:relative;display:block}.primary[svelte-2829050598] .active[svelte-2829050598]{color:#333;font-weight:700}.primary[svelte-2829050598] li a[svelte-2829050598]{display:block;color:#727272;font-size:1.3em;font-weight:500;padding:0.75em 0;line-height:1}@media(min-width: 768px){.mousecatcher[svelte-2829050598],.menu-link[svelte-2829050598]{display:none}.container[svelte-2829050598]{height:4em}nav[svelte-2829050598]{width:100%;height:4em;padding:0 1.5em 0 0;transform:none;transition:none;height:0}.primary[svelte-2829050598]{position:fixed;top:0;right:1em;margin:0}.primary[svelte-2829050598] li[svelte-2829050598]{display:inline-block}.primary[svelte-2829050598] li a[svelte-2829050598]{padding:1.5em 0.5em;color:#ccc;font-size:1rem}.primary[svelte-2829050598] li a.active[svelte-2829050598]{color:white;font-weight:500}.primary[svelte-2829050598] li[svelte-2829050598]::after{position:absolute;top:1.5rem;right:-0.3em;content:'/';font-size:0.8em;color:#999}.primary[svelte-2829050598] li[svelte-2829050598]:last-child::after{content:''}.secondary[svelte-2829050598]{display:none}.logo[svelte-2829050598]{position:absolute;top:1rem;left:1rem;font-size:2em;font-weight:300;transform:none}}",
	map: "{\"version\":3,\"file\":\"Nav.html\",\"sources\":[\"Nav.html\"],\"sourcesContent\":[\"<div class='{{open ? \\\"open\\\": \\\"closed\\\"}} mousecatcher' on:click='set({ open: false })'></div>\\n\\n<div class='container'>\\n\\t<span class=\\\"menu-link\\\" on:click='toggleOpen()'>{{open ? 'Close' : 'Menu'}}</span>\\n\\t<a href='/' class='logo'>Svelte</a>\\n</div>\\n\\n<nav ref:nav class='{{open ? \\\"open\\\": \\\"closed\\\"}}' on:click='set({ open: false })'>\\n\\t<ul class='primary'>\\n\\t\\t<li><a class='{{page === \\\"guide\\\" ? \\\"active\\\": \\\"\\\"}}' href='/guide'>Guide</a></li>\\n\\t\\t<li><a class='{{page === \\\"repl\\\" ? \\\"active\\\": \\\"\\\"}}' href='/repl'>REPL</a></li>\\n\\t\\t<li><a class='{{page === \\\"blog\\\" ? \\\"active\\\": \\\"\\\"}}' href='/blog'>Blog</a></li>\\n\\t\\t<li><a href='https://gitter.im/sveltejs/svelte'>Chat</a></li>\\n\\t\\t<li><a href='https://github.com/sveltejs/svelte'>GitHub</a></li>\\n\\t</ul>\\n\\n\\t<div class='secondary'>\\n\\t\\t<GuideContents/>\\n\\t</div>\\n</nav>\\n\\n<style>\\n\\t.mousecatcher {\\n\\t\\tposition: fixed;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\twidth: 100vw;\\n\\t\\theight: 100vh;\\n\\t\\tbackground-color: black;\\n\\t\\tpointer-events: none;\\n\\t\\topacity: 0;\\n\\t\\t/*transition: opacity 0.4s;*/\\n\\t\\tz-index: 3;\\n\\t}\\n\\n\\t.mousecatcher.open {\\n\\t\\tpointer-events: all;\\n\\t\\topacity: 0.3;\\n\\t}\\n\\n\\t@keyframes fadein {\\n\\t\\tfrom { opacity: 0; }\\n\\t\\tto { opacity: 1; }\\n\\t}\\n\\n\\t.container {\\n\\t\\tposition: fixed;\\n\\t\\twidth: 100%;\\n\\t\\theight: 3em;\\n\\t\\tbackground-color: #333;\\n\\t\\tcolor: #eee;\\n\\t\\tborder-bottom: 2px solid rgb(170,30,30);\\n\\t\\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", Helvetica, Arial, sans-serif, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\", \\\"Segoe UI Symbol\\\";\\n\\t\\tz-index: 5;\\n\\t}\\n\\n\\tnav {\\n\\t\\tposition: fixed;\\n\\t\\twidth: 14em;\\n\\t\\theight: calc(100vh - 3em);\\n\\t\\ttop: 3em;\\n\\t\\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", Helvetica, Arial, sans-serif, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\", \\\"Segoe UI Symbol\\\";\\n\\t\\tbackground-color: white;\\n\\t\\ttransform: translate(-100%,0);\\n\\t\\ttransition: transform 0.2s cubic-bezier(.17,.67,.24,.99);\\n\\t\\tborder-right: 1px solid #eee;\\n\\t\\tz-index: 5;\\n\\t\\tpadding: 1em;\\n\\t\\tuser-select: none;\\n\\t}\\n\\n\\t.open {\\n\\t\\ttransform: translate(0,0);\\n\\t\\ttransition: transform 0.3s cubic-bezier(.17,.67,.24,.99);\\n\\t\\toverflow-y: auto;\\n\\t}\\n\\n\\t.menu-link {\\n\\t\\tdisplay: inline;\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tleft: 1rem;\\n\\t\\tfont-size: 1em;\\n\\t\\tline-height: 3.1em;\\n\\t\\tcolor: #ccc;\\n\\t\\tcursor: pointer;\\n\\t\\tfont-weight: 500;\\n\\t\\t-webkit-tap-highlight-color: transparent;\\n\\t\\t-webkit-touch-callout: none;\\n\\t}\\n\\n\\t.logo {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 50%;\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translate(-50%, -45%);\\n\\t\\t-webkit-tap-highlight-color: transparent;\\n\\t\\t-webkit-touch-callout: none;\\n\\t\\tline-height: 1;\\n\\t\\ttext-transform: lowercase;\\n\\t\\tcolor: white;\\n\\t\\tfont-size: 1.4rem;\\n\\t}\\n\\n\\tul {\\n\\t\\tdisplay: block;\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tlist-style: none;\\n\\t}\\n\\n\\t.primary {\\n\\t\\tmargin: 0 0 2em 0;\\n\\t}\\n\\n\\t.primary li {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\t.primary .active {\\n\\t\\tcolor: #333;\\n\\t\\tfont-weight: 700;\\n\\t}\\n\\n\\t/**/\\n\\n\\t.primary li a {\\n\\t\\tdisplay: block;\\n\\t\\tcolor: #727272;\\n\\t\\tfont-size: 1.3em;\\n\\t\\tfont-weight: 500;\\n\\t\\tpadding: 0.75em 0;\\n\\t\\tline-height: 1;\\n\\t}\\n\\n\\t@media (min-width: 768px) {\\n\\t\\t.mousecatcher, .menu-link {\\n\\t\\t\\tdisplay: none;\\n\\t\\t}\\n\\n\\t\\t.container {\\n\\t\\t\\theight: 4em;\\n\\t\\t}\\n\\n\\t\\tnav {\\n\\t\\t\\twidth: 100%;\\n\\t\\t\\theight: 4em;\\n\\t\\t\\tpadding: 0 1.5em 0 0;\\n\\t\\t\\ttransform: none;\\n\\t\\t\\ttransition: none;\\n\\t\\t\\theight: 0;\\n\\t\\t}\\n\\n\\t\\t.primary {\\n\\t\\t\\tposition: fixed;\\n\\t\\t\\ttop: 0;\\n\\t\\t\\tright: 1em;\\n\\t\\t\\tmargin: 0;\\n\\t\\t}\\n\\n\\t\\t.primary li {\\n\\t\\t\\tdisplay: inline-block;\\n\\t\\t}\\n\\n\\t\\t.primary li a {\\n\\t\\t\\tpadding: 1.5em 0.5em;\\n\\t\\t\\tcolor: #ccc;\\n\\t\\t\\tfont-size: 1rem;\\n\\t\\t}\\n\\n\\t\\t.primary li a.active {\\n\\t\\t\\tcolor: white;\\n\\t\\t\\tfont-weight: 500;\\n\\t\\t}\\n\\n\\t\\t.primary li::after {\\n\\t\\t\\tposition: absolute;\\n\\t\\t\\ttop: 1.5rem;\\n\\t\\t\\tright: -0.3em;\\n\\t\\t\\tcontent: '/';\\n\\t\\t\\tfont-size: 0.8em;\\n\\t\\t\\tcolor: #999;\\n\\t\\t}\\n\\n\\t\\t.primary li:last-child::after {\\n\\t\\t\\tcontent: '';\\n\\t\\t}\\n\\n\\t\\t.secondary {\\n\\t\\t\\tdisplay: none;\\n\\t\\t}\\n\\n\\t\\t.logo {\\n\\t\\t\\tposition: absolute;\\n\\t\\t\\ttop: 1rem;\\n\\t\\t\\tleft: 1rem;\\n\\t\\t\\tfont-size: 2em;\\n\\t\\t\\tfont-weight: 300;\\n\\t\\t\\ttransform: none;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<script>\\n\\timport GuideContents from './GuideContents.html';\\n\\n\\texport default {\\n\\t\\tdata () {\\n\\t\\t\\treturn {\\n\\t\\t\\t\\topen: false,\\n\\t\\t\\t\\troute: '',\\n\\t\\t\\t\\tactive: null\\n\\t\\t\\t};\\n\\t\\t},\\n\\n\\t\\tmethods: {\\n\\t\\t\\ttoggleOpen () {\\n\\t\\t\\t\\tconst open = this.get( 'open' );\\n\\n\\t\\t\\t\\t// if the menu is closing, scroll back to the top *after* it\\n\\t\\t\\t\\t// shuts. otherwise, scroll back to the top immediately\\n\\t\\t\\t\\t// (just in case the user reopened before it happened).\\n\\t\\t\\t\\t// The reason we don't just do it when the menu opens is\\n\\t\\t\\t\\t// that the scrollbar visibly flashes\\n\\t\\t\\t\\tif ( open ) {\\n\\t\\t\\t\\t\\tsetTimeout( () => {\\n\\t\\t\\t\\t\\t\\tif ( !this.get( 'open' ) ) {\\n\\t\\t\\t\\t\\t\\t\\tthis.refs.nav.scrollTop = 0;\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t}, 350 );\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tthis.refs.nav.scrollTop = 0;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tthis.set({ open: !open });\\n\\t\\t\\t}\\n\\t\\t},\\n\\n\\t\\tcomponents: {\\n\\t\\t\\tGuideContents\\n\\t\\t}\\n\\t};\\n</script>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

var warned = false;
Index.renderCss = function() {
	if (!warned) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned = true;
	}

	var components = [];

	components.push({
		filename: Index.filename,
		css: Index.css && Index.css.code,
		map: Index.css && Index.css.map
	});

	var seen = {};

	function addComponent(component) {
		var result = component.renderCss();
		result.components.forEach(x => {
			if (seen[x.filename]) return;
			seen[x.filename] = true;
			components.push(x);
		});
	}

	addComponent(__WEBPACK_IMPORTED_MODULE_0__GuideContents_html__["a" /* default */]);

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
/* harmony default export */ __webpack_exports__["a"] = (Index);

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svelte_store_js__ = __webpack_require__(186);


const store = new __WEBPACK_IMPORTED_MODULE_0_svelte_store_js__["a" /* Store */]({
	guide_contents: []
});

fetch(`/api/guide/contents`).then(r => r.json()).then(guide_contents => {
	store.set({ guide_contents });
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Store; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_js__ = __webpack_require__(187);


function Store(state) {
	this._observers = { pre: Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["b" /* blankObject */])(), post: Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["b" /* blankObject */])() };
	this._changeHandlers = [];
	this._dependents = [];

	this._computed = Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["b" /* blankObject */])();
	this._sortedComputedProperties = [];

	this._state = Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["a" /* assign */])({}, state);
}

Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["a" /* assign */])(Store.prototype, {
	_add: function(component, props) {
		this._dependents.push({
			component: component,
			props: props
		});
	},

	_init: function(props) {
		var state = {};
		for (var i = 0; i < props.length; i += 1) {
			var prop = props[i];
			state['$' + prop] = this._state[prop];
		}
		return state;
	},

	_remove: function(component) {
		var i = this._dependents.length;
		while (i--) {
			if (this._dependents[i].component === component) {
				this._dependents.splice(i, 1);
				return;
			}
		}
	},

	_sortComputedProperties: function() {
		var computed = this._computed;
		var sorted = this._sortedComputedProperties = [];
		var cycles;
		var visited = Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["b" /* blankObject */])();

		function visit(key) {
			if (cycles[key]) {
				throw new Error('Cyclical dependency detected');
			}

			if (visited[key]) return;
			visited[key] = true;

			var c = computed[key];

			if (c) {
				cycles[key] = true;
				c.deps.forEach(visit);
				sorted.push(c);
			}
		}

		for (var key in this._computed) {
			cycles = Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["b" /* blankObject */])();
			visit(key);
		}
	},

	compute: function(key, deps, fn) {
		var store = this;
		var value;

		var c = {
			deps: deps,
			update: function(state, changed, dirty) {
				var values = deps.map(function(dep) {
					if (dep in changed) dirty = true;
					return state[dep];
				});

				if (dirty) {
					var newValue = fn.apply(null, values);
					if (Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["c" /* differs */])(newValue, value)) {
						value = newValue;
						changed[key] = true;
						state[key] = value;
					}
				}
			}
		};

		c.update(this._state, {}, true);

		this._computed[key] = c;
		this._sortComputedProperties();
	},

	get: __WEBPACK_IMPORTED_MODULE_0__shared_js__["e" /* get */],

	observe: __WEBPACK_IMPORTED_MODULE_0__shared_js__["f" /* observe */],

	onchange: function(callback) {
		this._changeHandlers.push(callback);
		return {
			cancel: function() {
				var index = this._changeHandlers.indexOf(callback);
				if (~index) this._changeHandlers.splice(index, 1);
			}
		};
	},

	set: function(newState) {
		var oldState = this._state,
			changed = this._changed = {},
			dirty = false;

		for (var key in newState) {
			if (this._computed[key]) throw new Error("'" + key + "' is a read-only property");
			if (Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["c" /* differs */])(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["a" /* assign */])({}, oldState, newState);

		for (var i = 0; i < this._sortedComputedProperties.length; i += 1) {
			this._sortedComputedProperties[i].update(this._state, changed);
		}

		for (var i = 0; i < this._changeHandlers.length; i += 1) {
			this._changeHandlers[i](this._state, changed);
		}

		Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["d" /* dispatchObservers */])(this, this._observers.pre, changed, this._state, oldState);

		var dependents = this._dependents.slice(); // guard against mutations
		for (var i = 0; i < dependents.length; i += 1) {
			var dependent = dependents[i];
			var componentState = {};
			dirty = false;

			for (var j = 0; j < dependent.props.length; j += 1) {
				var prop = dependent.props[j];
				if (prop in changed) {
					componentState['$' + prop] = this._state[prop];
					dirty = true;
				}
			}

			if (dirty) dependent.component.set(componentState);
		}

		Object(__WEBPACK_IMPORTED_MODULE_0__shared_js__["d" /* dispatchObservers */])(this, this._observers.post, changed, this._state, oldState);
	}
});



/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return blankObject; });
/* unused harmony export destroy */
/* unused harmony export destroyDev */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return differs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return dispatchObservers; });
/* unused harmony export fire */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return get; });
/* unused harmony export init */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return observe; });
/* unused harmony export observeDev */
/* unused harmony export on */
/* unused harmony export onDev */
/* unused harmony export set */
/* unused harmony export _set */
/* unused harmony export setDev */
/* unused harmony export callAll */
/* unused harmony export _mount */
/* unused harmony export _unmount */
/* unused harmony export isPromise */
/* unused harmony export PENDING */
/* unused harmony export SUCCESS */
/* unused harmony export FAILURE */
/* unused harmony export removeFromStore */
/* unused harmony export proto */
/* unused harmony export protoDev */
/* unused harmony export appendNode */
/* unused harmony export insertNode */
/* unused harmony export detachNode */
/* unused harmony export detachBetween */
/* unused harmony export detachBefore */
/* unused harmony export detachAfter */
/* unused harmony export reinsertBetween */
/* unused harmony export reinsertChildren */
/* unused harmony export reinsertAfter */
/* unused harmony export reinsertBefore */
/* unused harmony export destroyEach */
/* unused harmony export createFragment */
/* unused harmony export createElement */
/* unused harmony export createSvgElement */
/* unused harmony export createText */
/* unused harmony export createComment */
/* unused harmony export addListener */
/* unused harmony export removeListener */
/* unused harmony export setAttribute */
/* unused harmony export setXlinkAttribute */
/* unused harmony export getBindingGroupValue */
/* unused harmony export toNumber */
/* unused harmony export timeRangesToArray */
/* unused harmony export children */
/* unused harmony export claimElement */
/* unused harmony export claimText */
/* unused harmony export setInputType */
/* unused harmony export setStyle */
/* unused harmony export selectOption */
/* unused harmony export selectOptions */
/* unused harmony export selectValue */
/* unused harmony export selectMultipleValue */
/* unused harmony export linear */
/* unused harmony export generateRule */
/* unused harmony export hash */
/* unused harmony export wrapTransition */
/* unused harmony export transitionManager */
/* unused harmony export noop */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return assign; });
function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function detachBetween(before, after) {
	while (before.nextSibling && before.nextSibling !== after) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function detachBefore(after) {
	while (after.previousSibling) {
		after.parentNode.removeChild(after.previousSibling);
	}
}

function detachAfter(before) {
	while (before.nextSibling) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function reinsertBetween(before, after, target) {
	while (before.nextSibling && before.nextSibling !== after) {
		target.appendChild(before.parentNode.removeChild(before.nextSibling));
	}
}

function reinsertChildren(parent, target) {
	while (parent.firstChild) target.appendChild(parent.firstChild);
}

function reinsertAfter(before, target) {
	while (before.nextSibling) target.appendChild(before.nextSibling);
}

function reinsertBefore(after, target) {
	var parent = after.parentNode;
	while (parent.firstChild !== after) target.appendChild(parent.firstChild);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function createFragment() {
	return document.createDocumentFragment();
}

function createElement(name) {
	return document.createElement(name);
}

function createSvgElement(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function setXlinkAttribute(node, attribute, value) {
	node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

function getBindingGroupValue(group) {
	var value = [];
	for (var i = 0; i < group.length; i += 1) {
		if (group[i].checked) value.push(group[i].__value);
	}
	return value;
}

function toNumber(value) {
	return value === '' ? undefined : +value;
}

function timeRangesToArray(ranges) {
	var array = [];
	for (var i = 0; i < ranges.length; i += 1) {
		array.push({ start: ranges.start(i), end: ranges.end(i) });
	}
	return array;
}

function children (element) {
	return Array.from(element.childNodes);
}

function claimElement (nodes, name, attributes, svg) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeName === name) {
			for (var j = 0; j < node.attributes.length; j += 1) {
				var attribute = node.attributes[j];
				if (!attributes[attribute.name]) node.removeAttribute(attribute.name);
			}
			return nodes.splice(i, 1)[0]; // TODO strip unwanted attributes
		}
	}

	return svg ? createSvgElement(name) : createElement(name);
}

function claimText (nodes, data) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeType === 3) {
			node.data = data;
			return nodes.splice(i, 1)[0];
		}
	}

	return createText(data);
}

function setInputType(input, type) {
	try {
		input.type = type;
	} catch (e) {}
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function selectOption(select, value) {
	for (var i = 0; i < select.options.length; i += 1) {
		var option = select.options[i];

		if (option.__value === value) {
			option.selected = true;
			return;
		}
	}
}

function selectOptions(select, value) {
	for (var i = 0; i < select.options.length; i += 1) {
		var option = select.options[i];
		option.selected = ~value.indexOf(option.__value);
	}
}

function selectValue(select) {
	var selectedOption = select.querySelector(':checked') || select.options[0];
	return selectedOption && selectedOption.__value;
}

function selectMultipleValue(select) {
	return [].map.call(select.querySelectorAll(':checked'), function(option) {
		return option.__value;
	});
}

function linear(t) {
	return t;
}

function generateRule(
	a,
	b,
	delta,
	duration,
	ease,
	fn
) {
	var keyframes = '{\n';

	for (var p = 0; p <= 1; p += 16.666 / duration) {
		var t = a + delta * ease(p);
		keyframes += p * 100 + '%{' + fn(t) + '}\n';
	}

	return keyframes + '100% {' + fn(b) + '}\n}';
}

// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
	var hash = 5381;
	var i = str.length;

	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return hash >>> 0;
}

function wrapTransition(component, node, fn, params, intro, outgroup) {
	var obj = fn(node, params);
	var duration = obj.duration || 300;
	var ease = obj.easing || linear;
	var cssText;

	// TODO share <style> tag between all transitions?
	if (obj.css && !transitionManager.stylesheet) {
		var style = createElement('style');
		document.head.appendChild(style);
		transitionManager.stylesheet = style.sheet;
	}

	if (intro) {
		if (obj.css && obj.delay) {
			cssText = node.style.cssText;
			node.style.cssText += obj.css(0);
		}

		if (obj.tick) obj.tick(0);
	}

	return {
		t: intro ? 0 : 1,
		running: false,
		program: null,
		pending: null,
		run: function(intro, callback) {
			var program = {
				start: window.performance.now() + (obj.delay || 0),
				intro: intro,
				callback: callback
			};

			if (obj.delay) {
				this.pending = program;
			} else {
				this.start(program);
			}

			if (!this.running) {
				this.running = true;
				transitionManager.add(this);
			}
		},
		start: function(program) {
			component.fire(program.intro ? 'intro.start' : 'outro.start', { node: node });

			program.a = this.t;
			program.b = program.intro ? 1 : 0;
			program.delta = program.b - program.a;
			program.duration = duration * Math.abs(program.b - program.a);
			program.end = program.start + program.duration;

			if (obj.css) {
				if (obj.delay) node.style.cssText = cssText;

				program.rule = generateRule(
					program.a,
					program.b,
					program.delta,
					program.duration,
					ease,
					obj.css
				);

				transitionManager.addRule(program.rule, program.name = '__svelte_' + hash(program.rule));

				node.style.animation = (node.style.animation || '')
					.split(', ')
					.filter(function(anim) {
						// when introing, discard old animations if there are any
						return anim && (program.delta < 0 || !/__svelte/.test(anim));
					})
					.concat(program.name + ' ' + duration + 'ms linear 1 forwards')
					.join(', ');
			}

			this.program = program;
			this.pending = null;
		},
		update: function(now) {
			var program = this.program;
			if (!program) return;

			var p = now - program.start;
			this.t = program.a + program.delta * ease(p / program.duration);
			if (obj.tick) obj.tick(this.t);
		},
		done: function() {
			var program = this.program;
			this.t = program.b;
			if (obj.tick) obj.tick(this.t);
			if (obj.css) transitionManager.deleteRule(node, program.name);
			program.callback();
			program = null;
			this.running = !!this.pending;
		},
		abort: function() {
			if (obj.tick) obj.tick(1);
			if (obj.css) transitionManager.deleteRule(node, this.program.name);
			this.program = this.pending = null;
			this.running = false;
		}
	};
}

var transitionManager = {
	running: false,
	transitions: [],
	bound: null,
	stylesheet: null,
	activeRules: {},

	add: function(transition) {
		this.transitions.push(transition);

		if (!this.running) {
			this.running = true;
			requestAnimationFrame(this.bound || (this.bound = this.next.bind(this)));
		}
	},

	addRule: function(rule, name) {
		if (!this.activeRules[name]) {
			this.activeRules[name] = true;
			this.stylesheet.insertRule('@keyframes ' + name + ' ' + rule, this.stylesheet.cssRules.length);
		}
	},

	next: function() {
		this.running = false;

		var now = window.performance.now();
		var i = this.transitions.length;

		while (i--) {
			var transition = this.transitions[i];

			if (transition.program && now >= transition.program.end) {
				transition.done();
			}

			if (transition.pending && now >= transition.pending.start) {
				transition.start(transition.pending);
			}

			if (transition.running) {
				transition.update(now);
				this.running = true;
			} else if (!transition.pending) {
				this.transitions.splice(i, 1);
			}
		}

		if (this.running) {
			requestAnimationFrame(this.bound);
		} else if (this.stylesheet) {
			var i = this.stylesheet.cssRules.length;
			while (i--) this.stylesheet.deleteRule(i);
			this.activeRules = {};
		}
	},

	deleteRule: function(node, name) {
		node.style.animation = node.style.animation
			.split(', ')
			.filter(function(anim) {
				return anim.slice(0, name.length) !== name;
			})
			.join(', ');
	}
};

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function destroyDev(detach) {
	destroy.call(this, detach);
	this.destroy = function() {
		console.warn('Component was already destroyed');
	};
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function observeDev(key, callback, options) {
	var c = (key = '' + key).search(/[^\w]/);
	if (c > -1) {
		var message =
			'The first argument to component.observe(...) must be the name of a top-level property';
		if (c > 0)
			message += ", i.e. '" + key.slice(0, c) + "' rather than '" + key + "'";

		throw new Error(message);
	}

	return observe.call(this, key, callback, options);
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function onDev(eventName, handler) {
	if (eventName === 'teardown') {
		console.warn(
			"Use component.on('destroy', ...) instead of component.on('teardown', ...) which has been deprecated and will be unsupported in Svelte 2"
		);
		return this.on('destroy', handler);
	}

	return on.call(this, eventName, handler);
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function setDev(newState) {
	if (typeof newState !== 'object') {
		throw new Error(
			this._debugName + '.set was called without an object of data key-values to update.'
		);
	}

	this._checkReadOnly(newState);
	set.call(this, newState);
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function isPromise(value) {
	return value && typeof value.then === 'function';
}

var PENDING = {};
var SUCCESS = {};
var FAILURE = {};

function removeFromStore() {
	this.store._remove(this);
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};

var protoDev = {
	destroy: destroyDev,
	get: get,
	fire: fire,
	observe: observeDev,
	on: onDev,
	set: setDev,
	teardown: destroyDev,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};




/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function data() {
	return {
		contents: []
	}
};

var Index = {};

Index.filename = "/Users/208311/Development/SVELTE/svelte.technology/routes/_components/GuideContents.html";

Index.data = function() {
	return data();
};

Index.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Index._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return result.html;
		}
	};
}

Index._render = function(__result, state, options) {
	__result.addComponent(Index);

	state = Object.assign(options.store._init(["guide_contents","activeGuideSection"]), data(), state);

	return `<ul class="guide-toc" svelte-3051345958>
	${ state.$guide_contents.map(section => `<li svelte-3051345958>
			<a class="section ${section.slug === state.$activeGuideSection ? "active": ""}" href="/guide#${section.slug}" svelte-3051345958>${__escape(section.metadata.title)}</a>
			${ section.subsections.map(subsection => `<a class="subsection ${subsection.slug === state.$activeGuideSection ? "active": ""}" href="/guide#${subsection.slug}" svelte-3051345958>${__escape(subsection.title)}</a>`).join("")}
		</li>`).join("")}
</ul>`;
};

Index.css = {
	code: ".guide-toc[svelte-3051345958]{margin:0;padding:0}.guide-toc[svelte-3051345958] li[svelte-3051345958]{display:block;margin:0 0 2em 0}.section[svelte-3051345958]{display:block;font-weight:700;color:#333;font-size:1.2rem;margin:0 0 0.15em 0}.subsection[svelte-3051345958]{display:block;font-weight:500;color:#727272;font-size:1em;margin:0 0 0.15em 0}.section.active[svelte-3051345958],.subsection.active[svelte-3051345958]{color:#aa1e1e}",
	map: "{\"version\":3,\"file\":\"GuideContents.html\",\"sources\":[\"GuideContents.html\"],\"sourcesContent\":[\"<ul class='guide-toc'>\\n\\t{{#each $guide_contents as section}}\\n\\t\\t<li>\\n\\t\\t\\t<a class='section {{section.slug === $activeGuideSection ? \\\"active\\\": \\\"\\\"}}' href='/guide#{{section.slug}}'>{{section.metadata.title}}</a>\\n\\t\\t\\t{{#each section.subsections as subsection}}\\n\\t\\t\\t\\t<a class='subsection {{subsection.slug === $activeGuideSection ? \\\"active\\\": \\\"\\\"}}' href='/guide#{{subsection.slug}}'>{{subsection.title}}</a>\\n\\t\\t\\t{{/each}}\\n\\t\\t</li>\\n\\t{{/each}}\\n</ul>\\n\\n<style>\\n\\t.guide-toc {\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\t.guide-toc li {\\n\\t\\tdisplay: block;\\n\\t\\tmargin: 0 0 2em 0;\\n\\t}\\n\\n\\t.section {\\n\\t\\tdisplay: block;\\n\\t\\tfont-weight: 700;\\n\\t\\tcolor: #333;\\n\\t\\tfont-size: 1.2rem;\\n\\t\\tmargin: 0 0 0.15em 0;\\n\\t}\\n\\n\\t.subsection {\\n\\t\\tdisplay: block;\\n\\t\\tfont-weight: 500;\\n\\t\\tcolor:#727272;\\n\\t\\tfont-size: 1em;\\n\\t\\tmargin: 0 0 0.15em 0;\\n\\t}\\n\\n\\t.section.active, .subsection.active {\\n\\t\\tcolor: #aa1e1e;\\n\\t}\\n</style>\\n\\n<script>\\n\\texport default {\\n\\t\\tdata() {\\n\\t\\t\\treturn {\\n\\t\\t\\t\\tcontents: []\\n\\t\\t\\t}\\n\\t\\t},\\n\\n\\t\\toncreate () {\\n\\t\\t\\tconst onhashchange = () => {\\n\\t\\t\\t\\tthis.store.set({ activeGuideSection: window.location.hash.slice( 1 ) });\\n\\t\\t\\t};\\n\\n\\t\\t\\twindow.addEventListener( 'hashchange', onhashchange, false );\\n\\t\\t\\tthis.on( 'destroy', () => {\\n\\t\\t\\t\\twindow.removeEventListener( 'hashchange', onhashchange, false );\\n\\t\\t\\t});\\n\\n\\t\\t\\tonhashchange();\\n\\t\\t}\\n\\t};\\n</script>\\n\"],\"names\":[],\"mappings\":\"AAYC,UAAU,mBAAC,CAAC,AACX,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACX,CAAC,AAED,6BAAU,CAAC,EAAE,mBAAC,CAAC,AACd,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AAClB,CAAC,AAED,QAAQ,mBAAC,CAAC,AACT,OAAO,CAAE,KAAK,CACd,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,AACrB,CAAC,AAED,WAAW,mBAAC,CAAC,AACZ,OAAO,CAAE,KAAK,CACd,WAAW,CAAE,GAAG,CAChB,MAAM,OAAO,CACb,SAAS,CAAE,GAAG,CACd,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,AACrB,CAAC,AAED,QAAQ,0BAAO,CAAE,WAAW,OAAO,mBAAC,CAAC,AACpC,KAAK,CAAE,OAAO,AACf,CAAC\"}"
};

var warned = false;
Index.renderCss = function() {
	if (!warned) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned = true;
	}

	var components = [];

	components.push({
		filename: Index.filename,
		css: Index.css && Index.css.code,
		map: Index.css && Index.css.map
	});

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
/* harmony default export */ __webpack_exports__["a"] = (Index);

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return decode$$1; });
/* unused harmony export encode */
var charToInteger = {};
var integerToChar = {};

'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split( '' ).forEach( function ( char, i ) {
	charToInteger[ char ] = i;
	integerToChar[ i ] = char;
});

function decode$1 ( string ) {
	var result = [],
		len = string.length,
		i,
		hasContinuationBit,
		shift = 0,
		value = 0,
		integer,
		shouldNegate;

	for ( i = 0; i < len; i += 1 ) {
		integer = charToInteger[ string[i] ];

		if ( integer === undefined ) {
			throw new Error( 'Invalid character (' + string[i] + ')' );
		}

		hasContinuationBit = integer & 32;

		integer &= 31;
		value += integer << shift;

		if ( hasContinuationBit ) {
			shift += 5;
		} else {
			shouldNegate = value & 1;
			value >>= 1;

			result.push( shouldNegate ? -value : value );

			// reset
			value = shift = 0;
		}
	}

	return result;
}

function encode$1 ( value ) {
	var result, i;

	if ( typeof value === 'number' ) {
		result = encodeInteger( value );
	} else {
		result = '';
		for ( i = 0; i < value.length; i += 1 ) {
			result += encodeInteger( value[i] );
		}
	}

	return result;
}

function encodeInteger ( num ) {
	var result = '', clamped;

	if ( num < 0 ) {
		num = ( -num << 1 ) | 1;
	} else {
		num <<= 1;
	}

	do {
		clamped = num & 31;
		num >>= 5;

		if ( num > 0 ) {
			clamped |= 32;
		}

		result += integerToChar[ clamped ];
	} while ( num > 0 );

	return result;
}

function decodeSegments ( encodedSegments ) {
	var i = encodedSegments.length;
	var segments = new Array( i );

	while ( i-- ) { segments[i] = decode$1( encodedSegments[i] ); }
	return segments;
}

function decode$$1 ( mappings ) {
	var sourceFileIndex = 0;   // second field
	var sourceCodeLine = 0;    // third field
	var sourceCodeColumn = 0;  // fourth field
	var nameIndex = 0;         // fifth field

	var lines = mappings.split( ';' );
	var numLines = lines.length;
	var decoded = new Array( numLines );

	var i;
	var j;
	var line;
	var generatedCodeColumn;
	var decodedLine;
	var segments;
	var segment;
	var result;

	for ( i = 0; i < numLines; i += 1 ) {
		line = lines[i];

		generatedCodeColumn = 0; // first field - reset each time
		decodedLine = [];

		segments = decodeSegments( line.split( ',' ) );

		for ( j = 0; j < segments.length; j += 1 ) {
			segment = segments[j];

			if ( !segment.length ) {
				break;
			}

			generatedCodeColumn += segment[0];

			result = [ generatedCodeColumn ];
			decodedLine.push( result );

			if ( segment.length === 1 ) {
				// only one field!
				continue;
			}

			sourceFileIndex  += segment[1];
			sourceCodeLine   += segment[2];
			sourceCodeColumn += segment[3];

			result.push( sourceFileIndex, sourceCodeLine, sourceCodeColumn );

			if ( segment.length === 5 ) {
				nameIndex += segment[4];
				result.push( nameIndex );
			}
		}

		decoded[i] = decodedLine;
	}

	return decoded;
}

function encode$$1 ( decoded ) {
	var offsets = {
		generatedCodeColumn: 0,
		sourceFileIndex: 0,   // second field
		sourceCodeLine: 0,    // third field
		sourceCodeColumn: 0,  // fourth field
		nameIndex: 0          // fifth field
	};

	return decoded.map( function (line) {
		offsets.generatedCodeColumn = 0; // first field - reset each time
		return line.map( encodeSegment ).join( ',' );
	}).join( ';' );

	function encodeSegment ( segment ) {
		if ( !segment.length ) {
			return segment;
		}

		var result = new Array( segment.length );

		result[0] = segment[0] - offsets.generatedCodeColumn;
		offsets.generatedCodeColumn = segment[0];

		if ( segment.length === 1 ) {
			// only one field!
			return encode$1( result );
		}

		result[1] = segment[1] - offsets.sourceFileIndex;
		result[2] = segment[2] - offsets.sourceCodeLine;
		result[3] = segment[3] - offsets.sourceCodeColumn;

		offsets.sourceFileIndex  = segment[1];
		offsets.sourceCodeLine   = segment[2];
		offsets.sourceCodeColumn = segment[3];

		if ( segment.length === 5 ) {
			result[4] = segment[4] - offsets.nameIndex;
			offsets.nameIndex = segment[4];
		}

		return encode$1( result );
	}
}


//# sourceMappingURL=sourcemap-codec.es.js.map


/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_locate_character__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout_html__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CodeMirror_html__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Viewer_html__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ComponentSelector_html__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ExampleSelector_html__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_gist_js__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_debounce_js__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_load_js__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_get_js__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__store_js__ = __webpack_require__(185);












function loadCodemirror() {
	return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 232)).then(CodeMirror => {
		return (window.CodeMirror = CodeMirror);
	});
}

const versionMatch = typeof window !== 'undefined' && /version=([^&]+)/.exec(window.location.search);
let dataQuery;

function loadSvelte() {
	const version = versionMatch ? versionMatch[1] : 'latest';
	if (version === 'local') return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 233));
	return __WEBPACK_IMPORTED_MODULE_8__utils_load_js__["a" /* script */](`https://unpkg.com/svelte@${version}/compiler/svelte.js`).then(() => window.svelte);
}

function tryParseData(encoded) {
	try {
		return JSON.parse(decodeURIComponent(atob(encoded)));
	} catch (err) {
		return {};
	}
}

function compile(component) {
	const warnings = [];

	if (component.type === 'js') return { code: component.source, map: null, warnings };

	const { code, map } = svelte.compile(component.source || '', {
		cascade: false,
		name: component.name,
		filename: component.name + '.html',
		onwarn: warning => {
			warnings.push(warning);
		}
	});

	return { code, map, warnings };
}

function runtimeErrorLoc(runtimeError, selectedComponent) {
	if (!runtimeError || !selectedComponent) return null;
	if (runtimeError.filename !== `${selectedComponent.name}.${selectedComponent.type}`) return;

	return runtimeError.loc;
};

function githubGist(gist) {
	return 'https://gist.github.com/anonymous/' + gist;
};

function data() {
	const search = typeof window !== 'undefined' ? window.location.search : '';
	const gistMatch = /gist=([^&]+)$/.exec(search);
	const dataMatch = /data=([^&]+)$/.exec(search);

	let gist = null;
	let components = [];
	let selectedExample = null;
	let data = {};

	if (dataMatch) {
		dataQuery = dataMatch[1]; // so we don't lose it from the URL later
		const parsed = tryParseData(dataMatch[1]);

		if (parsed.source && !parsed.components) {
			// legacy
			components = [
				{
					name: 'App',
					type: 'html',
					entry: true,
					source: parsed.source
				}
			];
		} else {
			components = parsed.components;
			components.forEach(component => {
				if (!component.type) component.type = 'html';
			});
		}

		data = parsed.data;
	}

	let selectedComponent = null;

	if (components && components.length > 0) {
		selectedComponent = components[0];
	} else if (gistMatch) {
		gist = gistMatch[1];
	}

	return {
		horizontalDividerPos: 50,
		verticalDividerPos: 50,
		showGenerated: false,

		// TODO remove this post-https://github.com/sveltejs/svelte/issues/424
		false: false,
		true: true,
		null: null,

		selectedExample: null,
		selectedComponent,

		gist,
		components,
		data,
		json: JSON.stringify(data, null, '  '),

		loadedCodemirror: false,
		editorRotation: 0,
		flip: ''
	};
};

function preload() {
	return fetch(`/api/examples`).then(r => r.json()).then(example_contents => {
		return { example_contents };
	});
};

function store_1() {
	return __WEBPACK_IMPORTED_MODULE_10__store_js__["a" /* default */];
}

function stringifyComponents(components) {
	return JSON.stringify(
		components.map(component => {
			return {
				name: component.name,
				source: component.source
			};
		})
	);
}

var Index = {};

Index.filename = "/Users/208311/Development/SVELTE/svelte.technology/routes/repl/index.html";

Index.data = function() {
	return data();
};

Index.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	options.store = store_1();
	var html = Index._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return result.html;
		}
	};
}

Index._render = function(__result, state, options) {
	__result.addComponent(Index);

	state = Object.assign(data(), state);

	state.runtimeErrorLoc = runtimeErrorLoc(state.runtimeError, state.selectedComponent);
	state.githubGist = githubGist(state.gist);

	var settled = false;
	var tmp;

	while (!settled) {
		settled = true;

		if (!('selectedExample' in state)) {
			tmp = __WEBPACK_IMPORTED_MODULE_5__ExampleSelector_html__["a" /* default */].data();
			if ('selectedExample' in tmp) {
				state.selectedExample = tmp.selectedExample;
				settled = false;
			}
		}

		if (!('selectedComponent' in state)&&(state.selectedComponent)) {
			tmp = __WEBPACK_IMPORTED_MODULE_4__ComponentSelector_html__["a" /* default */].data();
			if ('selectedComponent' in tmp) {
				state.selectedComponent = tmp.selectedComponent;
				settled = false;
			}
		}

		if (!('code' in state)&&(state.loadedCodemirror)&&(state.selectedComponent)&&(state.showGenerated && state.selectedComponent.compiled)) {
			tmp = __WEBPACK_IMPORTED_MODULE_2__CodeMirror_html__["a" /* default */].data();
			if ('selectedComponent' in tmp) {
				state.code = tmp.selectedComponent;
				settled = false;
			}
		}

		if (!('code' in state)&&(state.loadedCodemirror)) {
			tmp = __WEBPACK_IMPORTED_MODULE_2__CodeMirror_html__["a" /* default */].data();
			if ('json' in tmp) {
				state.code = tmp.json;
				settled = false;
			}
		}

		if (!('error' in state)&&(state.loadedSvelte)&&(state.bundle)) {
			tmp = __WEBPACK_IMPORTED_MODULE_3__Viewer_html__["a" /* default */].data();
			if ('runtimeError' in tmp) {
				state.error = tmp.runtimeError;
				settled = false;
			}
		}
	}

	return `${(__result.head += `
	<title>Svelte REPL</title>
`, "")}

${__WEBPACK_IMPORTED_MODULE_1__components_Layout_html__["a" /* default */]._render(__result, {page: "repl"}, { store: options.store, slotted: { default: () => `
	<div class="repl-container" svelte-1505907988>
		<div class="left" style="width: ${state.verticalDividerPos}%;" svelte-1505907988>
			<section class="input" svelte-1505907988>
				<div class="app-controls" svelte-1505907988>
					${__WEBPACK_IMPORTED_MODULE_5__ExampleSelector_html__["a" /* default */]._render(__result, {example_contents: state.example_contents, selectedExample: state.selectedExample}, { store: options.store })}

					<div style="position: absolute; right: 0.5em; z-index: 2;">
						<button style="width: 6em;" disabled="${state.downloading}" class="btn ${state.downloading ? "active" : ""}" svelte-1505907988>${__escape(state.downloading ? 'zipping' : 'download')}</button>
						<button disabled="${state.saving}" class="btn ${state.saving ? "active" : ""}" svelte-1505907988>${__escape(state.saving ? 'saving' : 'save')}</button>

						${ state.gist ? `<a class="gist-link" href="${state.githubGist}" title="Link to saved gist" target="_blank" svelte-1505907988>gist</a>` : `` }
					</div>
				</div>

				<div class="module-controls" svelte-1505907988>
					${ state.selectedComponent ? `${__WEBPACK_IMPORTED_MODULE_4__ComponentSelector_html__["a" /* default */]._render(__result, {components: state.components, selectedComponent: state.selectedComponent}, { store: options.store })}` : `` }
				</div>

				${ state.loadedCodemirror ? `<div class="editor-wrapper ${state.flip}" svelte-1505907988>
						${ state.selectedComponent ? `${ state.showGenerated && state.selectedComponent.compiled ? `${__WEBPACK_IMPORTED_MODULE_2__CodeMirror_html__["a" /* default */]._render(__result, {mode: "javascript", code: state.selectedComponent.compiled.code, readonly: true}, { store: options.store })}` : `${__WEBPACK_IMPORTED_MODULE_2__CodeMirror_html__["a" /* default */]._render(__result, {mode: state.selectedComponent.type === "js" ? "javascript" : "handlebars", error: state.sourceError, errorLoc: state.sourceErrorLoc || state.runtimeErrorLoc, warningCount: state.warningCount, code: state.selectedComponent.source}, { store: options.store })}` }` : `` }

						<button class="btn editor-toggle" svelte-1505907988>
							<span class="flip-text" svelte-1505907988>${__escape(state.showGenerated ? 'output' : 'input')}</span>
						</button>
					</div>` : `<p class="loading" svelte-1505907988>loading editor...</p>` }
			</section>
		</div>

		<div class="right" style="width: ${100 - state.verticalDividerPos}%;" svelte-1505907988>
			<h2 class="show-if-mobile" svelte-1505907988>data.json</h2>
			<div class="bottom" style="height: ${100 - state.horizontalDividerPos}%;" svelte-1505907988>
				${ state.loadedCodemirror ? `${__WEBPACK_IMPORTED_MODULE_2__CodeMirror_html__["a" /* default */]._render(__result, {mode: "javascript", error: state.dataError, errorLoc: state.dataErrorLoc, code: state.json}, { store: options.store })}` : `<p class="loading" svelte-1505907988>loading editor...</p>` }
			</div>

			<h2 class="show-if-mobile" svelte-1505907988>Rendered component</h2>
			<div class="top" style="height: ${state.horizontalDividerPos}%;" svelte-1505907988>
				${ state.loadedSvelte ? `${ state.bundle ? `${__WEBPACK_IMPORTED_MODULE_3__Viewer_html__["a" /* default */]._render(__result, {bundle: state.bundle, data: state.data, bundleError: state.bundleError, error: state.runtimeError}, { store: options.store })}` : `` }` : `<p class="loading" svelte-1505907988>loading Svelte compiler...</p>` }

				${ state.dragging ? `<div class="mousecatcher" svelte-1505907988></div>` : `` }
			</div>

			<div class="divider horizontal-divider" style="top: calc(${state.horizontalDividerPos}% - 8px)" svelte-1505907988></div>
		</div>

		<div class="divider vertical-divider" style="left: calc(${state.verticalDividerPos}% - 8px)" svelte-1505907988></div>
	</div>
` } })}`;
};

Index.css = {
	code: ".repl-container[svelte-1505907988]{min-height:calc(100vh - 3em);background-color:#f4f4f4}@keyframes svelte-1505907988-pulse{0%{opacity:1;transform:scale(1.5)}50%{opacity:0;transform:scale(1)}100%{opacity:1;transform:scale(1.5)}}@-webkit-keyframes pulse {}@keyframes svelte-1505907988-fade-in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes fade-in {}.left[svelte-1505907988],.right[svelte-1505907988]{position:relative}@media(max-width: 767px){.left[svelte-1505907988],.right[svelte-1505907988]{width:100% !important}.top[svelte-1505907988],.bottom[svelte-1505907988]{height:auto !important}}.divider[svelte-1505907988]{position:absolute;z-index:10;display:none}h2[svelte-1505907988]{margin:1em 0 0 0;padding:0 8px;font-weight:500;font-size:1.2em}.editor-wrapper[svelte-1505907988]{z-index:5;transform-style:preserve-3d;animation-fill-mode:forwards}.repl-container[svelte-1505907988] .editor-toggle[svelte-1505907988]{position:absolute;bottom:1em;right:1em;z-index:10;background:white url(/icons/flip.svg) no-repeat calc(100% - 0.7em) 50%;background-size:1.4em 1em;padding-right:2.5em}.flip-text[svelte-1505907988]{}.editor-toggle[svelte-1505907988]:hover .flip-text[svelte-1505907988]{}.flip-out[svelte-1505907988]{animation-name:svelte-1505907988-flip-out;animation-duration:0.2s;animation-timing-function:ease-in}.flip-pause[svelte-1505907988]{opacity:0}.flip-in[svelte-1505907988]{animation-name:svelte-1505907988-flip-in;animation-duration:0.2s;animation-timing-function:ease-out}@keyframes svelte-1505907988-flip-out{from{transform:rotateY(0deg)}to{transform:rotateY(90deg)}}@keyframes svelte-1505907988-flip-in{from{transform:rotateY(-90deg)}to{transform:rotateY(0deg)}}@media(min-width: 768px){.show-if-mobile[svelte-1505907988]{display:none}.repl-container[svelte-1505907988]{min-height:auto;height:calc(100vh - 4em);background-color:white;overflow:hidden}.screen-too-small[svelte-1505907988]{display:none}.left[svelte-1505907988],.right[svelte-1505907988],.divider[svelte-1505907988]{display:block}.left[svelte-1505907988],.right[svelte-1505907988]{height:100%;float:left}.top[svelte-1505907988],.bottom[svelte-1505907988]{position:absolute;width:100%}.top[svelte-1505907988]{top:0}.bottom[svelte-1505907988]{bottom:0}.left[svelte-1505907988] .editor-wrapper[svelte-1505907988]{padding-right:8px;height:auto;height:100%}section[svelte-1505907988]{height:100%}}.divider[svelte-1505907988]::after{content:'';position:absolute;background-color:#eee}.vertical-divider[svelte-1505907988]{padding:0 8px;width:0;height:100%;cursor:ew-resize}.vertical-divider[svelte-1505907988]::after{left:8px;top:0;width:1px;height:100%}.horizontal-divider[svelte-1505907988]{padding:8px 0;width:100%;height:0;cursor:ns-resize}.horizontal-divider[svelte-1505907988]::after{top:8px;left:0;width:100%;height:1px}.loading[svelte-1505907988]{text-align:center;color:#999;font-weight:300;margin:2em 0 0 0}.input[svelte-1505907988]{padding:5.4em 0 0 0;perspective:1500px;perspective-origin:50% 0%}@media(min-width: 768px){.input[svelte-1505907988]{perspective-origin:50% 50%}}.app-controls[svelte-1505907988],.module-controls[svelte-1505907988]{position:absolute;left:0;width:100%}.app-controls[svelte-1505907988]{top:0;border-bottom:1px solid #eee;background-color:#f4f4f4;padding:0.5em;height:3em}.module-controls[svelte-1505907988]{top:3em;border-bottom:1px solid #eee;height:2.4em}.repl-container[svelte-1505907988] button{font-family:Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";font-size:inherit;background-color:white;cursor:pointer;outline:none;line-height:1;border:none}.repl-container[svelte-1505907988] .btn{display:block;float:right;padding:calc(0.5em - 1px) 1em;margin:0 0 0 0.5em;border-radius:2px;color:rgb(170,30,30);border:1px solid rgba(170,30,30,0.3);font-weight:500;box-sizing:border-box}.repl-container[svelte-1505907988] .btn:hover{border:1px solid rgb(170,30,30)}.repl-container[svelte-1505907988] .btn.active{background-color:rgb(170,30,30);color:white}.gist-link[svelte-1505907988]{float:right;line-height:2;font-family:Rajdhani;font-weight:400;padding:0 0.1em;display:none}@media(min-width: 768px){.gist-link[svelte-1505907988]{display:block}}.mousecatcher[svelte-1505907988]{position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(255,255,255,0.01)}.repl-container[svelte-1505907988] .message{position:relative;border-radius:0.2em;margin:0;padding:0.5em 0.5em 0.5em 2.5em;color:white}.repl-container[svelte-1505907988] .message::before{content:'!';position:absolute;left:0.7em;top:0.55em;font-size:0.8em;font-weight:800;width:1em;height:1em;text-align:center;line-height:1;padding:0.2em 0.15em 0.1em 0.15em;border-radius:50%;color:white;border:2px solid white}.repl-container[svelte-1505907988] .error.message{background-color:rgb(170,30,30)}.repl-container[svelte-1505907988] .warning.message{background-color:rgb(160,100,30)}.repl-container[svelte-1505907988] .info.message{background-color:#666}.repl-container[svelte-1505907988] .error .filename{cursor:pointer}",
	map: "{\"version\":3,\"file\":\"index.html\",\"sources\":[\"index.html\"],\"sourcesContent\":[\"<:Head>\\n\\t<title>Svelte REPL</title>\\n</:Head>\\n\\n<Layout page='repl'>\\n\\t<div class='repl-container'>\\n\\t\\t<div class='left' style='width: {{verticalDividerPos}}%;'>\\n\\t\\t\\t<section class='input'>\\n\\t\\t\\t\\t<div class='app-controls'>\\n\\t\\t\\t\\t\\t<ExampleSelector :example_contents bind:selectedExample/>\\n\\n\\t\\t\\t\\t\\t<div style='position: absolute; right: 0.5em; z-index: 2;'>\\n\\t\\t\\t\\t\\t\\t<button style='width: 6em;' disabled='{{downloading}}' class='btn {{downloading ? \\\"active\\\" : \\\"\\\"}}' on:click='download()'>{{downloading ? 'zipping' : 'download'}}</button>\\n\\t\\t\\t\\t\\t\\t<button disabled='{{saving}}' class='btn {{saving ? \\\"active\\\" : \\\"\\\"}}' on:click='save()'>{{saving ? 'saving' : 'save'}}</button>\\n\\n\\t\\t\\t\\t\\t\\t{{#if gist}}\\n\\t\\t\\t\\t\\t\\t\\t<a class='gist-link' href=\\\"{{githubGist}}\\\" title=\\\"Link to saved gist\\\" target=\\\"_blank\\\">gist</a>\\n\\t\\t\\t\\t\\t\\t{{/if}}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t<div class='module-controls'>\\n\\t\\t\\t\\t\\t{{#if selectedComponent}}\\n\\t\\t\\t\\t\\t\\t<ComponentSelector\\n\\t\\t\\t\\t\\t\\t\\tref:selector\\n\\t\\t\\t\\t\\t\\t\\t:components\\n\\t\\t\\t\\t\\t\\t\\tbind:selectedComponent\\n\\t\\t\\t\\t\\t\\t\\ton:create='createComponent()'\\n\\t\\t\\t\\t\\t\\t\\ton:remove='removeComponent(selectedComponent)'\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{{/if}}\\n\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t{{#if loadedCodemirror}}\\n\\t\\t\\t\\t\\t<div ref:editorWrapper class='editor-wrapper {{flip}}'>\\n\\t\\t\\t\\t\\t\\t{{#if selectedComponent}}\\n\\t\\t\\t\\t\\t\\t\\t{{#if showGenerated && selectedComponent.compiled}}\\n\\t\\t\\t\\t\\t\\t\\t\\t<CodeMirror ref:editor mode='javascript' code='{{selectedComponent.compiled.code}}' readonly/>\\n\\t\\t\\t\\t\\t\\t\\t{{else}}\\n\\t\\t\\t\\t\\t\\t\\t\\t<CodeMirror\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tref:editor\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tmode='{{selectedComponent.type === \\\"js\\\" ? \\\"javascript\\\" : \\\"handlebars\\\"}}'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tbind:code='selectedComponent.source'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\terror='{{sourceError}}'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\terrorLoc='{{sourceErrorLoc || runtimeErrorLoc}}'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\twarningCount='{{warningCount}}'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ton:navigate='navigate(event)'\\n\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t{{/if}}\\n\\t\\t\\t\\t\\t\\t{{/if}}\\n\\n\\t\\t\\t\\t\\t\\t<button class='btn editor-toggle' on:click='flip()'>\\n\\t\\t\\t\\t\\t\\t\\t<span class='flip-text'>{{showGenerated ? 'output' : 'input'}}</span>\\n\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{{else}}\\n\\t\\t\\t\\t\\t<p class='loading'>loading editor...</p>\\n\\t\\t\\t\\t{{/if}}\\n\\t\\t\\t</section>\\n\\t\\t</div>\\n\\n\\t\\t<div ref:right class='right' style='width: {{100 - verticalDividerPos}}%;'>\\n\\t\\t\\t<h2 class='show-if-mobile'>data.json</h2>\\n\\t\\t\\t<div class='bottom' style='height: {{100 - horizontalDividerPos}}%;'>\\n\\t\\t\\t\\t{{#if loadedCodemirror}}\\n\\t\\t\\t\\t\\t<CodeMirror ref:data mode='javascript' bind:code='json' error='{{dataError}}' errorLoc='{{dataErrorLoc}}'/>\\n\\t\\t\\t\\t{{else}}\\n\\t\\t\\t\\t\\t<p class='loading'>loading editor...</p>\\n\\t\\t\\t\\t{{/if}}\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<h2 class='show-if-mobile'>Rendered component</h2>\\n\\t\\t\\t<div class='top' style='height: {{horizontalDividerPos}}%;'>\\n\\t\\t\\t\\t{{#if loadedSvelte}}\\n\\t\\t\\t\\t\\t{{#if bundle}}\\n\\t\\t\\t\\t\\t\\t<Viewer :bundle :data :bundleError bind:error='runtimeError' on:change='updateData(event)' on:navigate='navigate(event)'/>\\n\\t\\t\\t\\t\\t{{/if}}\\n\\t\\t\\t\\t{{else}}\\n\\t\\t\\t\\t\\t<p class='loading'>loading Svelte compiler...</p>\\n\\t\\t\\t\\t{{/if}}\\n\\n\\t\\t\\t\\t{{#if dragging}}\\n\\t\\t\\t\\t\\t<div class='mousecatcher'></div>\\n\\t\\t\\t\\t{{/if}}\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<div class='divider horizontal-divider' style='top: calc({{horizontalDividerPos}}% - 8px)' on:drag='setHorizontal(event)'></div>\\n\\t\\t</div>\\n\\n\\t\\t<div class='divider vertical-divider' style='left: calc({{verticalDividerPos}}% - 8px)' on:drag='setVertical(event)'></div>\\n\\t</div>\\n</Layout>\\n\\n<style>\\n\\t.repl-container {\\n\\t\\tmin-height: calc(100vh - 3em);\\n\\t\\tbackground-color: #f4f4f4;\\n\\t}\\n\\n\\t@keyframes pulse {\\n\\t\\t0%   { opacity: 1; transform: scale(1.5); }\\n\\t\\t50%  { opacity: 0; transform: scale(1); }\\n\\t\\t100% { opacity: 1; transform: scale(1.5); }\\n\\t}\\n\\n\\t@-webkit-keyframes pulse {\\n\\t\\t0%   { opacity: 1; transform: scale(1.5); }\\n\\t\\t50%  { opacity: 0; transform: scale(1); }\\n\\t\\t100% { opacity: 1; transform: scale(1.5); }\\n\\t}\\n\\n\\t@keyframes fade-in {\\n\\t\\t0%   { opacity: 0; }\\n\\t\\t100% { opacity: 1; }\\n\\t}\\n\\n\\t@-webkit-keyframes fade-in {\\n\\t\\t0%   { opacity: 0; }\\n\\t\\t100% { opacity: 1; }\\n\\t}\\n\\n\\t.left, .right {\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t@media (max-width: 767px) {\\n\\t\\t.left, .right {\\n\\t\\t\\twidth: 100% !important; /* override divider-set width */\\n\\t\\t}\\n\\n\\t\\t.top, .bottom {\\n\\t\\t\\theight: auto !important;\\n\\t\\t}\\n\\t}\\n\\n\\t.divider {\\n\\t\\tposition: absolute;\\n\\t\\tz-index: 10;\\n\\t\\tdisplay: none;\\n\\t}\\n\\n\\th2 {\\n\\t\\tmargin: 1em 0 0 0;\\n\\t\\tpadding: 0 8px;\\n\\t\\tfont-weight: 500;\\n\\t\\tfont-size: 1.2em;\\n\\t}\\n\\n\\t.editor-wrapper {\\n\\t\\tz-index: 5;\\n\\t\\ttransform-style: preserve-3d;\\n\\t\\tanimation-fill-mode: forwards;\\n\\t}\\n\\n\\t.repl-container .editor-toggle {\\n\\t\\tposition: absolute;\\n\\t\\tbottom: 1em;\\n\\t\\tright: 1em;\\n\\t\\tz-index: 10;\\n\\t\\tbackground: white url(/icons/flip.svg) no-repeat calc(100% - 0.7em) 50%;\\n\\t\\tbackground-size: 1.4em 1em;\\n\\t\\tpadding-right: 2.5em;\\n\\t}\\n\\n\\t.flip-text {\\n\\t\\t/*display: none;*/\\n\\t}\\n\\n\\t.editor-toggle:hover .flip-text {\\n\\t\\t/*display: inline-block;*/\\n\\t}\\n\\n\\t.flip-out {\\n\\t\\tanimation-name: flip-out;\\n\\t\\tanimation-duration: 0.2s;\\n\\t\\tanimation-timing-function: ease-in;\\n\\t}\\n\\n\\t.flip-pause {\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t.flip-in {\\n\\t\\tanimation-name: flip-in;\\n\\t\\tanimation-duration: 0.2s;\\n\\t\\tanimation-timing-function: ease-out;\\n\\t}\\n\\n\\t@keyframes flip-out {\\n\\t\\tfrom { transform: rotateY(0deg); }\\n\\t\\tto { transform: rotateY(90deg); }\\n\\t}\\n\\n\\t@keyframes flip-in {\\n\\t\\tfrom { transform: rotateY(-90deg); }\\n\\t\\tto { transform: rotateY(0deg); }\\n\\t}\\n\\n\\t@media (min-width: 768px) {\\n\\t\\t.show-if-mobile {\\n\\t\\t\\tdisplay: none;\\n\\t\\t}\\n\\n\\t\\t.repl-container {\\n\\t\\t\\tmin-height: auto;\\n\\t\\t\\theight: calc(100vh - 4em);\\n\\t\\t\\tbackground-color: white;\\n\\t\\t\\toverflow: hidden;\\n\\t\\t}\\n\\n\\t\\t.screen-too-small {\\n\\t\\t\\tdisplay: none;\\n\\t\\t}\\n\\n\\t\\t.left, .right, .divider {\\n\\t\\t\\tdisplay: block;\\n\\n\\t\\t}\\n\\n\\t\\t.left, .right {\\n\\t\\t\\theight: 100%;\\n\\t\\t\\tfloat: left;\\n\\t\\t}\\n\\n\\t\\t.top, .bottom {\\n\\t\\t\\tposition: absolute;\\n\\t\\t\\twidth: 100%;\\n\\t\\t}\\n\\n\\t\\t.top { top: 0; }\\n\\t\\t.bottom { bottom: 0; }\\n\\n\\t\\t.left .editor-wrapper {\\n\\t\\t\\t/* make it easier to interact with scrollbar */\\n\\t\\t\\tpadding-right: 8px;\\n\\t\\t\\theight: auto;\\n\\t\\t\\theight: 100%;\\n\\t\\t}\\n\\n\\t\\tsection {\\n\\t\\t\\theight: 100%;\\n\\t\\t}\\n\\t}\\n\\n\\t.divider::after {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\tbackground-color: #eee;\\n\\t}\\n\\n\\t.vertical-divider {\\n\\t\\tpadding: 0 8px;\\n\\t\\twidth: 0;\\n\\t\\theight: 100%;\\n\\t\\tcursor: ew-resize;\\n\\t}\\n\\n\\t.vertical-divider::after {\\n\\t\\tleft: 8px;\\n\\t\\ttop: 0;\\n\\t\\twidth: 1px;\\n\\t\\theight: 100%;\\n\\t}\\n\\n\\t.horizontal-divider {\\n\\t\\tpadding: 8px 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 0;\\n\\t\\tcursor: ns-resize;\\n\\t}\\n\\n\\t.horizontal-divider::after {\\n\\t\\ttop: 8px;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 1px;\\n\\t}\\n\\n\\t.loading {\\n\\t\\ttext-align: center;\\n\\t\\tcolor: #999;\\n\\t\\tfont-weight: 300;\\n\\t\\tmargin: 2em 0 0 0;\\n\\t}\\n\\n\\t.input {\\n\\t\\tpadding: 5.4em 0 0 0;\\n\\t\\tperspective: 1500px;\\n\\t\\tperspective-origin: 50% 0%;\\n\\t}\\n\\n\\t@media (min-width: 768px) {\\n\\t\\t.input {\\n\\t\\t\\tperspective-origin: 50% 50%;\\n\\t\\t}\\n\\t}\\n\\n\\t.app-controls, .module-controls {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t.app-controls {\\n\\t\\ttop: 0;\\n\\t\\tborder-bottom: 1px solid #eee;\\n\\t\\tbackground-color: #f4f4f4;\\n\\t\\tpadding: 0.5em;\\n\\t\\theight: 3em;\\n\\t}\\n\\n\\t.module-controls {\\n\\t\\ttop: 3em;\\n\\t\\tborder-bottom: 1px solid #eee;\\n\\t\\theight: 2.4em;\\n\\t}\\n\\n\\t.repl-container :global(button) {\\n\\t\\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", Helvetica, Arial, sans-serif, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\", \\\"Segoe UI Symbol\\\";\\n\\t\\tfont-size: inherit;\\n\\t\\tbackground-color: white;\\n\\t\\tcursor: pointer;\\n\\t\\toutline: none;\\n\\t\\tline-height: 1;\\n\\t\\tborder: none;\\n\\t}\\n\\n\\t.repl-container :global(.btn) {\\n\\t\\tdisplay: block;\\n\\t\\tfloat: right;\\n\\t\\tpadding: calc(0.5em - 1px) 1em;\\n\\t\\tmargin: 0 0 0 0.5em;\\n\\t\\tborder-radius: 2px;\\n\\t\\tcolor: rgb(170,30,30);\\n\\t\\tborder: 1px solid rgba(170,30,30,0.3);\\n\\t\\tfont-weight: 500;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\n\\t.repl-container :global(.btn):hover {\\n\\t\\tborder: 1px solid rgb(170,30,30);\\n\\t}\\n\\n\\t.repl-container :global(.btn).active {\\n\\t\\tbackground-color: rgb(170,30,30);\\n\\t\\tcolor: white;\\n\\t}\\n\\n\\t.gist-link {\\n\\t\\tfloat: right;\\n\\t\\tline-height: 2;\\n\\t\\tfont-family: Rajdhani;\\n\\t\\tfont-weight: 400;\\n\\t\\tpadding: 0 0.1em;\\n\\t\\tdisplay: none;\\n\\t}\\n\\n\\t@media (min-width: 768px) {\\n\\t\\t.gist-link {\\n\\t\\t\\tdisplay: block;\\n\\t\\t}\\n\\t}\\n\\n\\t.mousecatcher {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tbackground: rgba(255,255,255,0.01);\\n\\t}\\n\\n\\t.repl-container :global(.message) {\\n\\t\\tposition: relative;\\n\\t\\tborder-radius: 0.2em;\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0.5em 0.5em 0.5em 2.5em;\\n\\t\\tcolor: white;\\n\\t}\\n\\n\\t.repl-container :global(.message::before) {\\n\\t\\tcontent: '!';\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0.7em;\\n\\t\\ttop: 0.55em;\\n\\t\\tfont-size: 0.8em;\\n\\t\\tfont-weight: 800;\\n\\t\\twidth: 1em;\\n\\t\\theight: 1em;\\n\\t\\ttext-align: center;\\n\\t\\tline-height: 1;\\n\\t\\tpadding: 0.2em 0.15em 0.1em 0.15em;\\n\\t\\tborder-radius: 50%;\\n\\t\\tcolor: white;\\n\\t\\tborder: 2px solid white;\\n\\t}\\n\\n\\t.repl-container :global(.error.message) {\\n\\t\\tbackground-color: rgb(170,30,30);\\n\\t}\\n\\n\\t.repl-container :global(.warning.message) {\\n\\t\\tbackground-color: rgb(160,100,30);\\n\\t}\\n\\n\\t.repl-container :global(.info.message) {\\n\\t\\tbackground-color: #666;\\n\\t}\\n\\n\\t.repl-container :global(.error) :global(.filename) {\\n\\t\\tcursor: pointer;\\n\\t}\\n</style>\\n\\n<script>\\n\\timport { locate } from 'locate-character';\\n\\timport Layout from '../_components/Layout.html';\\n\\timport CodeMirror from './_CodeMirror.html';\\n\\timport Viewer from './_Viewer.html';\\n\\timport ComponentSelector from './_ComponentSelector.html';\\n\\timport ExampleSelector from './_ExampleSelector.html';\\n\\timport { getComponentFromGist, saveComponentAsGist } from './_utils/gist.js';\\n\\timport debounce from './_utils/debounce.js';\\n\\timport * as load from './_utils/load.js';\\n\\timport { get } from './_utils/get.js';\\n\\timport store from '../_store.js';\\n\\n\\tfunction loadCodemirror() {\\n\\t\\treturn import('./_codemirror.js').then(CodeMirror => {\\n\\t\\t\\treturn (window.CodeMirror = CodeMirror);\\n\\t\\t});\\n\\t}\\n\\n\\tconst versionMatch = typeof window !== 'undefined' && /version=([^&]+)/.exec(window.location.search);\\n\\tlet dataQuery;\\n\\n\\tfunction loadSvelte() {\\n\\t\\tconst version = versionMatch ? versionMatch[1] : 'latest';\\n\\t\\tif (version === 'local') return import('svelte');\\n\\t\\treturn load.script(`https://unpkg.com/svelte@${version}/compiler/svelte.js`).then(() => window.svelte);\\n\\t}\\n\\n\\tfunction tryParseData(encoded) {\\n\\t\\ttry {\\n\\t\\t\\treturn JSON.parse(decodeURIComponent(atob(encoded)));\\n\\t\\t} catch (err) {\\n\\t\\t\\treturn {};\\n\\t\\t}\\n\\t}\\n\\n\\tfunction compile(component) {\\n\\t\\tconst warnings = [];\\n\\n\\t\\tif (component.type === 'js') return { code: component.source, map: null, warnings };\\n\\n\\t\\tconst { code, map } = svelte.compile(component.source || '', {\\n\\t\\t\\tcascade: false,\\n\\t\\t\\tname: component.name,\\n\\t\\t\\tfilename: component.name + '.html',\\n\\t\\t\\tonwarn: warning => {\\n\\t\\t\\t\\twarnings.push(warning);\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\treturn { code, map, warnings };\\n\\t}\\n\\n\\texport default {\\n\\t\\tstore: () => store,\\n\\n\\t\\tdata() {\\n\\t\\t\\tconst search = typeof window !== 'undefined' ? window.location.search : '';\\n\\t\\t\\tconst gistMatch = /gist=([^&]+)$/.exec(search);\\n\\t\\t\\tconst dataMatch = /data=([^&]+)$/.exec(search);\\n\\n\\t\\t\\tlet gist = null;\\n\\t\\t\\tlet components = [];\\n\\t\\t\\tlet selectedExample = null;\\n\\t\\t\\tlet data = {};\\n\\n\\t\\t\\tif (dataMatch) {\\n\\t\\t\\t\\tdataQuery = dataMatch[1]; // so we don't lose it from the URL later\\n\\t\\t\\t\\tconst parsed = tryParseData(dataMatch[1]);\\n\\n\\t\\t\\t\\tif (parsed.source && !parsed.components) {\\n\\t\\t\\t\\t\\t// legacy\\n\\t\\t\\t\\t\\tcomponents = [\\n\\t\\t\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\t\\t\\tname: 'App',\\n\\t\\t\\t\\t\\t\\t\\ttype: 'html',\\n\\t\\t\\t\\t\\t\\t\\tentry: true,\\n\\t\\t\\t\\t\\t\\t\\tsource: parsed.source\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t];\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tcomponents = parsed.components;\\n\\t\\t\\t\\t\\tcomponents.forEach(component => {\\n\\t\\t\\t\\t\\t\\tif (!component.type) component.type = 'html';\\n\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tdata = parsed.data;\\n\\t\\t\\t}\\n\\n\\t\\t\\tlet selectedComponent = null;\\n\\n\\t\\t\\tif (components && components.length > 0) {\\n\\t\\t\\t\\tselectedComponent = components[0];\\n\\t\\t\\t} else if (gistMatch) {\\n\\t\\t\\t\\tgist = gistMatch[1];\\n\\t\\t\\t}\\n\\n\\t\\t\\treturn {\\n\\t\\t\\t\\thorizontalDividerPos: 50,\\n\\t\\t\\t\\tverticalDividerPos: 50,\\n\\t\\t\\t\\tshowGenerated: false,\\n\\n\\t\\t\\t\\t// TODO remove this post-https://github.com/sveltejs/svelte/issues/424\\n\\t\\t\\t\\tfalse: false,\\n\\t\\t\\t\\ttrue: true,\\n\\t\\t\\t\\tnull: null,\\n\\n\\t\\t\\t\\tselectedExample: null,\\n\\t\\t\\t\\tselectedComponent,\\n\\n\\t\\t\\t\\tgist,\\n\\t\\t\\t\\tcomponents,\\n\\t\\t\\t\\tdata,\\n\\t\\t\\t\\tjson: JSON.stringify(data, null, '  '),\\n\\n\\t\\t\\t\\tloadedCodemirror: false,\\n\\t\\t\\t\\teditorRotation: 0,\\n\\t\\t\\t\\tflip: ''\\n\\t\\t\\t};\\n\\t\\t},\\n\\n\\t\\tcomputed: {\\n\\t\\t\\truntimeErrorLoc(runtimeError, selectedComponent) {\\n\\t\\t\\t\\tif (!runtimeError || !selectedComponent) return null;\\n\\t\\t\\t\\tif (runtimeError.filename !== `${selectedComponent.name}.${selectedComponent.type}`) return;\\n\\n\\t\\t\\t\\treturn runtimeError.loc;\\n\\t\\t\\t},\\n\\t\\t\\tgithubGist(gist) {\\n\\t\\t\\t\\treturn 'https://gist.github.com/anonymous/' + gist;\\n\\t\\t\\t}\\n\\t\\t},\\n\\n\\t\\tmethods: {\\n\\t\\t\\tcreateComponent() {\\n\\t\\t\\t\\tconst components = this.get('components');\\n\\n\\t\\t\\t\\tconst newComponent = {\\n\\t\\t\\t\\t\\tname: this.uid++ ? `Component${this.uid}` : 'Component1',\\n\\t\\t\\t\\t\\ttype: 'html',\\n\\t\\t\\t\\t\\tsource: '',\\n\\t\\t\\t\\t\\tedit: true\\n\\t\\t\\t\\t};\\n\\n\\t\\t\\t\\tcomponents.push(newComponent);\\n\\n\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\tcomponents,\\n\\n\\t\\t\\t\\t\\t// for some reason we need to unset selectedComponent before\\n\\t\\t\\t\\t\\t// resetting it, otherwise the editor remains bound to the\\n\\t\\t\\t\\t\\t// previous component. TODO look into this bug\\n\\t\\t\\t\\t\\tselectedComponent: null\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\tselectedComponent: newComponent\\n\\t\\t\\t\\t});\\n\\t\\t\\t\\tdocument.getElementById(newComponent.name).scrollIntoView(false);\\n\\t\\t\\t\\tthis.refs.selector.focusLast();\\n\\t\\t\\t},\\n\\n\\t\\t\\tremoveComponent(component) {\\n\\t\\t\\t\\tconst components = this.get('components');\\n\\n\\t\\t\\t\\tlet selectedComponent;\\n\\n\\t\\t\\t\\tif (component.entry) {\\n\\t\\t\\t\\t\\t// App.html can't be removed\\n\\t\\t\\t\\t\\tcomponent.source = '';\\n\\t\\t\\t\\t\\tselectedComponent = component;\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tconst index = components.indexOf(component);\\n\\t\\t\\t\\t\\tif (~index) {\\n\\t\\t\\t\\t\\t\\tcomponents.splice(index, 1);\\n\\t\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\t\\tconsole.error(`Could not find component! That's... odd`);\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\tselectedComponent = components[index] || components[components.length - 1];\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\tcomponents,\\n\\t\\t\\t\\t\\tselectedComponent\\n\\t\\t\\t\\t});\\n\\t\\t\\t},\\n\\n\\t\\t\\tflip() {\\n\\t\\t\\t\\tif (window.innerWidth < 768) {\\n\\t\\t\\t\\t\\tthis.flipMobile();\\n\\t\\t\\t\\t\\treturn;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tif (this.flipping) return;\\n\\t\\t\\t\\tthis.flipping = true;\\n\\n\\t\\t\\t\\tconst wrapper = this.refs.editorWrapper;\\n\\t\\t\\t\\tconst showGenerated = this.get('showGenerated');\\n\\n\\t\\t\\t\\tconst handleFlipOutEnd = () => {\\n\\t\\t\\t\\t\\twrapper.removeEventListener('animationend', handleFlipOutEnd);\\n\\t\\t\\t\\t\\twrapper.removeEventListener('webkitAnimationEnd', handleFlipOutEnd);\\n\\n\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\tshowGenerated: !showGenerated,\\n\\t\\t\\t\\t\\t\\tflip: 'flip-pause'\\n\\t\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\t\\tconst handleFlipInEnd = () => {\\n\\t\\t\\t\\t\\t\\twrapper.removeEventListener('animationend', handleFlipInEnd);\\n\\t\\t\\t\\t\\t\\twrapper.removeEventListener('webkitAnimationEnd', handleFlipInEnd);\\n\\n\\t\\t\\t\\t\\t\\tthis.flipping = false;\\n\\n\\t\\t\\t\\t\\t\\tthis.set({ flip: '' });\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\twrapper.addEventListener('animationend', handleFlipInEnd);\\n\\t\\t\\t\\t\\twrapper.addEventListener('webkitAnimationEnd', handleFlipInEnd);\\n\\n\\t\\t\\t\\t\\tsetTimeout(() => {\\n\\t\\t\\t\\t\\t\\tthis.set({ flip: 'flip-in' });\\n\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\twrapper.addEventListener('animationend', handleFlipOutEnd);\\n\\t\\t\\t\\twrapper.addEventListener('webkitAnimationEnd', handleFlipOutEnd);\\n\\n\\t\\t\\t\\tthis.set({ flip: 'flip-out' });\\n\\t\\t\\t},\\n\\n\\t\\t\\tflipMobile() {\\n\\t\\t\\t\\tconst bcr1 = this.refs.editorWrapper.getBoundingClientRect();\\n\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\tshowGenerated: !this.get('showGenerated')\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\t// if top is visible, keep it that way\\n\\t\\t\\t\\tif (bcr1.top > 0) return;\\n\\n\\t\\t\\t\\tconst bcr2 = this.refs.editorWrapper.getBoundingClientRect();\\n\\t\\t\\t\\tconst d = bcr2.bottom - bcr1.bottom;\\n\\t\\t\\t\\twindow.scrollTo(0, window.scrollY + d);\\n\\t\\t\\t},\\n\\n\\t\\t\\tsetHorizontal(event) {\\n\\t\\t\\t\\tconst { top, bottom } = this.refs.right.getBoundingClientRect();\\n\\n\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\thorizontalDividerPos: 100 * (event.clientY - top) / (bottom - top)\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.refs.data.resize();\\n\\t\\t\\t},\\n\\n\\t\\t\\tsetVertical(event) {\\n\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\tverticalDividerPos: 100 * event.clientX / window.innerWidth\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.refs.editor.resize();\\n\\t\\t\\t\\tthis.refs.data.resize();\\n\\t\\t\\t},\\n\\n\\t\\t\\tupdateData({ key, value }) {\\n\\t\\t\\t\\tconst data = JSON.parse(this.get('json'));\\n\\t\\t\\t\\tdata[key] = value;\\n\\t\\t\\t\\tthis.set({ json: JSON.stringify(data, null, '  ') });\\n\\t\\t\\t},\\n\\n\\t\\t\\tsave() {\\n\\t\\t\\t\\tthis.set({ saving: true });\\n\\n\\t\\t\\t\\tsaveComponentAsGist(this.get('components'), this.get('json')).then(id => {\\n\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\tsaving: false,\\n\\t\\t\\t\\t\\t\\tgist: id,\\n\\t\\t\\t\\t\\t\\tselectedExample: null\\n\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\tthis.updateUrl();\\n\\t\\t\\t\\t});\\n\\t\\t\\t},\\n\\n\\t\\t\\tupdateBundle() {\\n\\t\\t\\t\\t// TODO do this in a worker\\n\\t\\t\\t\\tconst components = this.get('components');\\n\\n\\t\\t\\t\\tif (!components || !components.length) return;\\n\\t\\t\\t\\tif (components.some(c => !c.compiled)) return;\\n\\n\\t\\t\\t\\tconsole.clear();\\n\\t\\t\\t\\tconsole.log(`running Svelte compiler version %c${svelte.VERSION}`, 'font-weight: bold');\\n\\n\\t\\t\\t\\tif (this.bundlePromise) this.bundlePromise.cancel();\\n\\n\\t\\t\\t\\tconst lookup = {};\\n\\t\\t\\t\\tlet warningCount = 0;\\n\\t\\t\\t\\tfor (let i = 0; i < components.length; i += 1) {\\n\\t\\t\\t\\t\\tconst component = components[i];\\n\\t\\t\\t\\t\\tconst w = component.compiled.warnings.length;\\n\\t\\t\\t\\t\\twarningCount += w;\\n\\n\\t\\t\\t\\t\\tif (w > 0) {\\n\\t\\t\\t\\t\\t\\tconsole.group(`${component.name}.${component.type}: ${w} ${w === 1 ? 'warning' : 'warnings'}`);\\n\\t\\t\\t\\t\\t\\tcomponent.compiled.warnings.forEach(warning => {\\n\\t\\t\\t\\t\\t\\t\\tconsole.warn(warning.message);\\n\\t\\t\\t\\t\\t\\t\\tconsole.log(warning.frame);\\n\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\tconsole.groupEnd();\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\tconst path = `./${component.name}.${component.type}`;\\n\\n\\t\\t\\t\\t\\tif (path in lookup) {\\n\\t\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\t\\tbundleError: new Error(`Multiple ${component.name}.${component.type} components`)\\n\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\treturn;\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\tlookup[path] = {\\n\\t\\t\\t\\t\\t\\tcode: component.compiled.code,\\n\\t\\t\\t\\t\\t\\tmap: component.compiled.map\\n\\t\\t\\t\\t\\t};\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tthis.set({ warningCount });\\n\\n\\t\\t\\t\\tlet cancelled = false;\\n\\n\\t\\t\\t\\tlet uid = 1;\\n\\t\\t\\t\\tconst importMap = new Map();\\n\\t\\t\\t\\tconst input = './App.html';\\n\\n\\t\\t\\t\\tthis.bundlePromise = rollup.rollup({\\n\\t\\t\\t\\t\\tinput,\\n\\t\\t\\t\\t\\texternal: id => {\\n\\t\\t\\t\\t\\t\\treturn id[0] !== '.';\\n\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\tplugins: [{\\n\\t\\t\\t\\t\\t\\tresolveId(importee, importer) {\\n\\t\\t\\t\\t\\t\\t\\tif (importee[0] === '.') return importee;\\n\\t\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\t\\tload(id) {\\n\\t\\t\\t\\t\\t\\t\\tif (id in lookup) return lookup[id];\\n\\t\\t\\t\\t\\t\\t\\tif (id[0] === '.') {\\n\\t\\t\\t\\t\\t\\t\\t\\tthrow new Error(`file does not exist`);\\n\\t\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\t\\treturn null;\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t}],\\n\\t\\t\\t\\t\\tonwarn(warning) {\\n\\t\\t\\t\\t\\t\\tif (warning.code === 'MISSING_GLOBAL_NAME') return;\\n\\t\\t\\t\\t\\t\\tconsole.warn(warning.message);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}).then(bundle => {\\n\\t\\t\\t\\t\\tif (cancelled) return;\\n\\n\\t\\t\\t\\t\\treturn bundle.generate({\\n\\t\\t\\t\\t\\t\\tformat: 'iife',\\n\\t\\t\\t\\t\\t\\tname: 'SvelteComponent',\\n\\t\\t\\t\\t\\t\\tglobals: id => {\\n\\t\\t\\t\\t\\t\\t\\tconst name = `import_${uid++}`;\\n\\t\\t\\t\\t\\t\\t\\timportMap.set(id, name);\\n\\t\\t\\t\\t\\t\\t\\treturn name;\\n\\t\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\t\\tsourcemap: true\\n\\t\\t\\t\\t\\t}).then(({ code, map }) => {\\n\\t\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\t\\tbundle: {\\n\\t\\t\\t\\t\\t\\t\\t\\tcode,\\n\\t\\t\\t\\t\\t\\t\\t\\tmap,\\n\\t\\t\\t\\t\\t\\t\\t\\timports: bundle.imports,\\n\\t\\t\\t\\t\\t\\t\\t\\timportMap\\n\\t\\t\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\t\\t\\tbundleError: null,\\n\\t\\t\\t\\t\\t\\t\\truntimeError: null\\n\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t}).catch(err => {\\n\\t\\t\\t\\t\\tconsole.error(err.stack);\\n\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\tbundleError: err\\n\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.bundlePromise.cancel = () => {\\n\\t\\t\\t\\t\\tcancelled = true;\\n\\t\\t\\t\\t};\\n\\t\\t\\t},\\n\\n\\t\\t\\tupdateUrl() {\\n\\t\\t\\t\\tif (typeof history === 'undefined') return;\\n\\n\\t\\t\\t\\tconst gist = this.get('gist');\\n\\t\\t\\t\\tconst selectedExample = this.get('selectedExample');\\n\\n\\t\\t\\t\\tconst params = {};\\n\\t\\t\\t\\tif (typeof svelte !== 'undefined') {\\n\\t\\t\\t\\t\\tparams.version = versionMatch && versionMatch[1] === 'local' ? 'local' : svelte.VERSION;\\n\\t\\t\\t\\t} else if (versionMatch) {\\n\\t\\t\\t\\t\\tparams.version = versionMatch[1];\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tif (gist) {\\n\\t\\t\\t\\t\\tparams.gist = gist;\\n\\t\\t\\t\\t} else if (selectedExample) {\\n\\t\\t\\t\\t\\tparams.example = selectedExample.id;\\n\\t\\t\\t\\t} else if (dataQuery) {\\n\\t\\t\\t\\t\\tparams.data = dataQuery;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tconst queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');\\n\\t\\t\\t\\tconst url = queryString ? `/repl?${queryString}` : '/repl';\\n\\n\\t\\t\\t\\thistory.replaceState({}, 'x', url);\\n\\t\\t\\t},\\n\\n\\t\\t\\tnavigate(filename) {\\n\\t\\t\\t\\tconst name = filename.replace(/\\\\.html$/, '');\\n\\t\\t\\t\\tconst { components, selectedComponent } = this.get();\\n\\n\\t\\t\\t\\tif (selectedComponent.name === name) return;\\n\\n\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\tselectedComponent: components.find(c => c.name === name)\\n\\t\\t\\t\\t});\\n\\t\\t\\t},\\n\\n\\t\\t\\tdownload() {\\n\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\tdownloading: true\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tPromise.all([\\n\\t\\t\\t\\t\\timport('jszip'),\\n\\t\\t\\t\\t\\timport('file-saver')\\n\\t\\t\\t\\t]).then(([JSZip, saveAs]) => {\\n\\t\\t\\t\\t\\tconst zip = new JSZip();\\n\\n\\t\\t\\t\\t\\tget('/svelte-app.zip', { responseType: 'arraybuffer' })\\n\\t\\t\\t\\t\\t\\t.then(JSZip.loadAsync)\\n\\t\\t\\t\\t\\t\\t.then(zip => {\\n\\t\\t\\t\\t\\t\\t\\tconst { bundle, components, data } = this.get();\\n\\n\\t\\t\\t\\t\\t\\t\\t// remove any dotfiles that snuck in\\n\\t\\t\\t\\t\\t\\t\\tObject.keys(zip.files).forEach(key => {\\n\\t\\t\\t\\t\\t\\t\\t\\tconst file = key.split('/').pop();\\n\\t\\t\\t\\t\\t\\t\\t\\tif (file[0] === '.') zip.remove(key);\\n\\t\\t\\t\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\t\\t\\t\\t// add component files\\n\\t\\t\\t\\t\\t\\t\\tcomponents.forEach(component => {\\n\\t\\t\\t\\t\\t\\t\\t\\tzip.file(`src/${component.name}.${component.type}`, component.source);\\n\\t\\t\\t\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\t\\t\\t\\t// add entry point\\n\\t\\t\\t\\t\\t\\t\\tzip.file(`src/main.js`, `import App from './App.html';\\n\\nvar app = new App({\\n\\ttarget: document.body,\\n\\tdata: ${JSON.stringify(data, null, '\\\\t').replace(/\\\\n/g, '\\\\n\\\\t')}\\n});\\n\\nexport default app;` );\\n\\n\\t\\t\\t\\t\\t\\t\\tconst go = () => {\\n\\t\\t\\t\\t\\t\\t\\t\\tzip.generateAsync({ type: 'blob' })\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t.then(blob => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdownloading: false\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsaveAs(blob, 'svelte-app.zip');\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t\\t};\\n\\n\\t\\t\\t\\t\\t\\t\\tif (bundle.imports.length > 0) {\\n\\t\\t\\t\\t\\t\\t\\t\\tzip.file('package.json')\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t.async('string')\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t.then(JSON.parse)\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t.then(pkg => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconst deps = {};\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tbundle.imports.forEach(mod => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconst match = /^[^@\\\\/]+/.exec(mod);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdeps[match[0]] = 'latest';\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tpkg.dependencies = deps;\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tzip.file('package.json', JSON.stringify(pkg, null, '  '));\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t})\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t.then(go);\\n\\t\\t\\t\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\t\\t\\t\\tgo();\\n\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t});\\n\\t\\t\\t},\\n\\n\\t\\t\\tfindExample(id) {\\n\\t\\t\\t\\tconst { example_contents } = this.get();\\n\\n\\t\\t\\t\\tid = decodeURIComponent(id);\\n\\n\\t\\t\\t\\tfor (let i = 0; i < example_contents.length; i += 1) {\\n\\t\\t\\t\\t\\tconst group = example_contents[i];\\n\\t\\t\\t\\t\\tfor (let j = 0; j < group.examples.length; j += 1) {\\n\\t\\t\\t\\t\\t\\tconst example = group.examples[j];\\n\\t\\t\\t\\t\\t\\tif (example.id === id) return example;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t},\\n\\n\\t\\tpreload() {\\n\\t\\t\\treturn fetch(`/api/examples`).then(r => r.json()).then(example_contents => {\\n\\t\\t\\t\\treturn { example_contents };\\n\\t\\t\\t});\\n\\t\\t},\\n\\n\\t\\toncreate() {\\n\\t\\t\\tthis.uid = 0;\\n\\t\\t\\tthis.flipping = false;\\n\\t\\t\\tthis.bundlePromise = null;\\n\\n\\t\\t\\tloadCodemirror().then(() => {\\n\\t\\t\\t\\tthis.set({ loadedCodemirror: true });\\n\\t\\t\\t});\\n\\n\\t\\t\\tlet exampleComponents;\\n\\t\\t\\tlet lastSelectedExample;\\n\\n\\t\\t\\tconst { gist, components } = this.get();\\n\\t\\t\\tif (!gist && components.length === 0) {\\n\\t\\t\\t\\tconst exampleMatch = /example=([^&]+)$/.exec(window.location.search);\\n\\t\\t\\t\\tconst selectedExample = this.findExample(exampleMatch ? exampleMatch[1] : 'hello-world');\\n\\t\\t\\t\\tthis.set({ selectedExample });\\n\\t\\t\\t}\\n\\n\\t\\t\\tthis.observe('selectedExample', example => {\\n\\t\\t\\t\\tif (!example) return;\\n\\t\\t\\t\\tconst id = example.id;\\n\\n\\t\\t\\t\\tlastSelectedExample = id;\\n\\t\\t\\t\\tfetch(`/api/examples/${id}`).then(r => r.json()).then(example => {\\n\\t\\t\\t\\t\\texampleComponents = stringifyComponents(example.components);\\n\\n\\t\\t\\t\\t\\tif (window.svelte) {\\n\\t\\t\\t\\t\\t\\texample.components.forEach(component => {\\n\\t\\t\\t\\t\\t\\t\\tcomponent.compiled = compile(component);\\n\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\tcomponents: example.components,\\n\\t\\t\\t\\t\\t\\tselectedComponent: example.components[0],\\n\\t\\t\\t\\t\\t\\tjson: JSON.stringify(example.data, null, '  ')\\n\\t\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\t\\tthis.updateBundle();\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.set({ gist: null });\\n\\t\\t\\t\\tthis.updateUrl();\\n\\t\\t\\t});\\n\\n\\t\\t\\tif (!this.get('gist')) {\\n\\t\\t\\t\\tthis.set({ json: JSON.stringify(this.get('data'), null, '  ') });\\n\\t\\t\\t}\\n\\n\\t\\t\\tthis.observe('gist', gist => {\\n\\t\\t\\t\\tif (!gist) return;\\n\\n\\t\\t\\t\\tif (this.promise) this.promise.cancel();\\n\\t\\t\\t\\tthis.promise = getComponentFromGist(gist);\\n\\n\\t\\t\\t\\tthis.promise\\n\\t\\t\\t\\t\\t.then(({ components, json }) => {\\n\\t\\t\\t\\t\\t\\tif (window.svelte) {\\n\\t\\t\\t\\t\\t\\t\\tcomponents.forEach(component => {\\n\\t\\t\\t\\t\\t\\t\\t\\ttry {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tcomponent.compiled = compile(component);\\n\\t\\t\\t\\t\\t\\t\\t\\t} catch (err) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tconsole.error(err.stack);\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsourceError: err,\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsourceErrorLoc: err.loc\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\tthis.set({ components, json, selectedComponent: components[0] });\\n\\t\\t\\t\\t\\t})\\n\\t\\t\\t\\t\\t.catch(err => {\\n\\t\\t\\t\\t\\t\\talert('Error loading from gist.github.com – please try again later!');\\n\\t\\t\\t\\t\\t\\tconsole.error(err.stack);\\n\\t\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.set({ selectedExample: null });\\n\\t\\t\\t\\tthis.updateUrl();\\n\\t\\t\\t});\\n\\n\\t\\t\\tloadSvelte().then(svelte => {\\n\\t\\t\\t\\twindow.svelte = svelte;\\n\\n\\t\\t\\t\\tthis.set({ loadedSvelte: true });\\n\\n\\t\\t\\t\\tthis.get('components').forEach(component => {\\n\\t\\t\\t\\t\\ttry {\\n\\t\\t\\t\\t\\t\\tcomponent.compiled = compile(component);\\n\\t\\t\\t\\t\\t} catch (err) {\\n\\t\\t\\t\\t\\t\\tconsole.error(err.stack);\\n\\n\\t\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\t\\tsourceError: err,\\n\\t\\t\\t\\t\\t\\t\\tsourceErrorLoc: err.loc\\n\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.observe('selectedComponent', (selectedComponent, previousComponent) => {\\n\\t\\t\\t\\t\\tif (!selectedComponent) return;\\n\\t\\t\\t\\t\\tif (previousComponent && selectedComponent !== previousComponent) return;\\n\\n\\t\\t\\t\\t\\t// if component has been edited, unset selectedExample\\n\\t\\t\\t\\t\\tif (stringifyComponents(this.get('components')) !== exampleComponents) {\\n\\t\\t\\t\\t\\t\\tthis.set({ selectedExample: null });\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\ttry {\\n\\t\\t\\t\\t\\t\\tselectedComponent.compiled = compile(selectedComponent);\\n\\t\\t\\t\\t\\t\\tthis.set({ selectedComponent, sourceError: null, sourceErrorLoc: null });\\n\\n\\t\\t\\t\\t\\t\\tif (this.get('loadedRollup')) {\\n\\t\\t\\t\\t\\t\\t\\tthis.updateBundle();\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t} catch (err) {\\n\\t\\t\\t\\t\\t\\tconsole.error(err.stack);\\n\\n\\t\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\t\\tsourceError: err,\\n\\t\\t\\t\\t\\t\\t\\tsourceErrorLoc: err.loc\\n\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.updateUrl();\\n\\t\\t\\t});\\n\\n\\t\\t\\timport('rollup/dist/rollup.browser.js').then(rollup => {\\n\\t\\t\\t\\tthis.set({ loadedRollup: true });\\n\\t\\t\\t\\twindow.rollup = rollup;\\n\\n\\t\\t\\t\\tthis.updateBundle();\\n\\t\\t\\t});\\n\\n\\t\\t\\tthis.observe('json', json => {\\n\\t\\t\\t\\ttry {\\n\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\tdata: JSON.parse(json),\\n\\t\\t\\t\\t\\t\\tdataError: null,\\n\\t\\t\\t\\t\\t\\tdataErrorLoc: null\\n\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t} catch (err) {\\n\\t\\t\\t\\t\\tconsole.error(err.stack);\\n\\n\\t\\t\\t\\t\\tconst match = /in JSON at position (\\\\d+)/.exec(err.message);\\n\\n\\t\\t\\t\\t\\tif (match) {\\n\\t\\t\\t\\t\\t\\tconst loc = locate(json, +match[1], { offsetLine: 1 });\\n\\t\\t\\t\\t\\t\\tthis.set({\\n\\t\\t\\t\\t\\t\\t\\tdataError: {\\n\\t\\t\\t\\t\\t\\t\\t\\tmessage: err.message.slice(0, match.index).trim(),\\n\\t\\t\\t\\t\\t\\t\\t\\tloc\\n\\t\\t\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\t\\t\\tdataErrorLoc: loc\\n\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\t\\t},\\n\\n\\t\\tevents: {\\n\\t\\t\\tdrag(node, callback) {\\n\\t\\t\\t\\tconst mousedown = event => {\\n\\t\\t\\t\\t\\tif (event.which !== 1) return;\\n\\n\\t\\t\\t\\t\\tevent.preventDefault();\\n\\n\\t\\t\\t\\t\\tthis.set({ dragging: true });\\n\\n\\t\\t\\t\\t\\tconst onmouseup = () => {\\n\\t\\t\\t\\t\\t\\tthis.set({ dragging: false });\\n\\n\\t\\t\\t\\t\\t\\twindow.removeEventListener('mousemove', callback, false);\\n\\t\\t\\t\\t\\t\\twindow.removeEventListener('mouseup', onmouseup, false);\\n\\t\\t\\t\\t\\t};\\n\\n\\t\\t\\t\\t\\twindow.addEventListener('mousemove', callback, false);\\n\\t\\t\\t\\t\\twindow.addEventListener('mouseup', onmouseup, false);\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tnode.addEventListener('mousedown', mousedown, false);\\n\\n\\t\\t\\t\\treturn {\\n\\t\\t\\t\\t\\tteardown() {\\n\\t\\t\\t\\t\\t\\tnode.removeEventListener('mousedown', onmousedown, false);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t};\\n\\t\\t\\t}\\n\\t\\t},\\n\\n\\t\\tcomponents: {\\n\\t\\t\\tLayout,\\n\\t\\t\\tCodeMirror,\\n\\t\\t\\tViewer,\\n\\t\\t\\tComponentSelector,\\n\\t\\t\\tExampleSelector\\n\\t\\t}\\n\\t};\\n\\n\\tfunction stringifyComponents(components) {\\n\\t\\treturn JSON.stringify(\\n\\t\\t\\tcomponents.map(component => {\\n\\t\\t\\t\\treturn {\\n\\t\\t\\t\\t\\tname: component.name,\\n\\t\\t\\t\\t\\tsource: component.source\\n\\t\\t\\t\\t};\\n\\t\\t\\t})\\n\\t\\t);\\n\\t}\\n</script>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

var warned = false;
Index.renderCss = function() {
	if (!warned) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned = true;
	}

	var components = [];

	components.push({
		filename: Index.filename,
		css: Index.css && Index.css.code,
		map: Index.css && Index.css.map
	});

	var seen = {};

	function addComponent(component) {
		var result = component.renderCss();
		result.components.forEach(x => {
			if (seen[x.filename]) return;
			seen[x.filename] = true;
			components.push(x);
		});
	}

	addComponent(__WEBPACK_IMPORTED_MODULE_1__components_Layout_html__["a" /* default */]);
	addComponent(__WEBPACK_IMPORTED_MODULE_2__CodeMirror_html__["a" /* default */]);
	addComponent(__WEBPACK_IMPORTED_MODULE_3__Viewer_html__["a" /* default */]);
	addComponent(__WEBPACK_IMPORTED_MODULE_4__ComponentSelector_html__["a" /* default */]);
	addComponent(__WEBPACK_IMPORTED_MODULE_5__ExampleSelector_html__["a" /* default */]);

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

Index.preload = preload;

var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getLocator */
/* unused harmony export locate */
function getLocator(source, options) {
    if (options === void 0) { options = {}; }
    var offsetLine = options.offsetLine || 0;
    var offsetColumn = options.offsetColumn || 0;
    var originalLines = source.split('\n');
    var start = 0;
    var lineRanges = originalLines.map(function (line, i) {
        var end = start + line.length + 1;
        var range = { start: start, end: end, line: i };
        start = end;
        return range;
    });
    var i = 0;
    function rangeContains(range, index) {
        return range.start <= index && index < range.end;
    }
    function getLocation(range, index) {
        return { line: offsetLine + range.line, column: offsetColumn + index - range.start, character: index };
    }
    function locate(search, startIndex) {
        if (typeof search === 'string') {
            search = source.indexOf(search, startIndex || 0);
        }
        var range = lineRanges[i];
        var d = search >= range.end ? 1 : -1;
        while (range) {
            if (rangeContains(range, search))
                return getLocation(range, search);
            i += d;
            range = lineRanges[i];
        }
    }
    ;
    return locate;
}
function locate(source, search, options) {
    if (typeof options === 'number') {
        throw new Error('locate takes a { startIndex, offsetLine, offsetColumn } object as the third argument');
    }
    return getLocator(source, options)(search, options && options.startIndex);
}



/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Index = {};

Index.filename = "/Users/208311/Development/SVELTE/svelte.technology/routes/repl/_CodeMirror.html";

Index.data = function() {
	return {};
};

Index.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Index._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return result.html;
		}
	};
}

Index._render = function(__result, state, options) {
	__result.addComponent(Index);

	state = Object.assign({}, state);

	return `<div class="codemirror-container" svelte-4104114949>
	<textarea tabindex="2" svelte-4104114949></textarea>

	${ state.error ? `<p class="error message" svelte-4104114949>
			${ state.error.loc ? `<strong>
					${ state.error.filename ? `<span class="filename">${__escape(state.error.filename)}</span>` : `` }

					(${__escape(state.error.loc.line)}:${__escape(state.error.loc.column)})
				</strong>` : `` }

			${__escape(state.error.message)}
		</p>` : `${ state.warningCount > 0 ? `<p class="warning message" svelte-4104114949>
			Compiled, but with ${__escape(state.warningCount)} ${__escape(state.warningCount === 1 ? 'warning' : 'warnings')} — check the console for details
		</p>` : `` }` }
</div>`;
};

Index.css = {
	code: ".codemirror-container[svelte-4104114949]{width:100%;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin:0 0 1em 0}.codemirror-container[svelte-4104114949] .CodeMirror{border-radius:3px;font-family:Inconsolata, monospace;font-size:16px;line-height:1.2;font-weight:400;color:#333;height:auto;min-height:60px}@media(min-width: 768px){.codemirror-container[svelte-4104114949]{height:100%;border:none}.codemirror-container[svelte-4104114949] .CodeMirror{height:100%}}.codemirror-container[svelte-4104114949] .CodeMirror-gutters{border-right:1px solid #eee}textarea[svelte-4104114949]{width:100%;border:none}.codemirror-container[svelte-4104114949] .message[svelte-4104114949]{bottom:1em;left:1em;position:absolute;z-index:20}.codemirror-container[svelte-4104114949] .error-loc{position:relative;border-bottom:2px solid rgb(200,0,0)}.codemirror-container[svelte-4104114949] .error-line{background-color:rgba(200,0,0,0.05)}",
	map: "{\"version\":3,\"file\":\"_CodeMirror.html\",\"sources\":[\"_CodeMirror.html\"],\"sourcesContent\":[\"<div class='codemirror-container'>\\n\\t<textarea tabindex='2' ref:editor></textarea>\\n\\n\\t{{#if error}}\\n\\t\\t<p class='error message'>\\n\\t\\t\\t{{#if error.loc}}\\n\\t\\t\\t\\t<strong>\\n\\t\\t\\t\\t\\t{{#if error.filename}}\\n\\t\\t\\t\\t\\t\\t<span class='filename' on:click='fire(\\\"navigate\\\", error.filename)'>{{error.filename}}</span>\\n\\t\\t\\t\\t\\t{{/if}}\\n\\n\\t\\t\\t\\t\\t({{error.loc.line}}:{{error.loc.column}})\\n\\t\\t\\t\\t</strong>\\n\\t\\t\\t{{/if}}\\n\\n\\t\\t\\t{{error.message}}\\n\\t\\t</p>\\n\\t{{elseif warningCount > 0}}\\n\\t\\t<p class='warning message'>\\n\\t\\t\\tCompiled, but with {{warningCount}} {{warningCount === 1 ? 'warning' : 'warnings'}} — check the console for details\\n\\t\\t</p>\\n\\t{{/if}}\\n</div>\\n\\n<style>\\n\\t.codemirror-container {\\n\\t\\twidth: 100%;\\n\\t\\tborder-top: 1px solid #ccc;\\n\\t\\tborder-bottom: 1px solid #ccc;\\n\\t\\tmargin: 0 0 1em 0;\\n\\t}\\n\\n\\t.codemirror-container :global(.CodeMirror) {\\n\\t\\tborder-radius: 3px;\\n\\t\\tfont-family: Inconsolata, monospace;\\n\\t\\tfont-size: 16px;\\n\\t\\tline-height: 1.2;\\n\\t\\tfont-weight: 400;\\n\\t\\tcolor: #333;\\n\\t\\theight: auto;\\n\\t\\tmin-height: 60px;\\n\\t}\\n\\n\\t@media (min-width: 768px) {\\n\\t\\t.codemirror-container {\\n\\t\\t\\theight: 100%;\\n\\t\\t\\tborder: none;\\n\\t\\t}\\n\\n\\t\\t.codemirror-container :global(.CodeMirror) {\\n\\t\\t\\theight: 100%;\\n\\t\\t}\\n\\t}\\n\\n\\t.codemirror-container :global(.CodeMirror-gutters) {\\n\\t\\tborder-right: 1px solid #eee;\\n\\t}\\n\\n\\ttextarea {\\n\\t\\twidth: 100%;\\n\\t\\tborder: none;\\n\\t}\\n\\n\\t.codemirror-container .message {\\n\\t\\tbottom: 1em;\\n\\t\\tleft: 1em;\\n\\t\\tposition: absolute;\\n\\t\\tz-index: 20;\\n\\t}\\n\\n\\t.codemirror-container :global(.error-loc) {\\n\\t\\tposition: relative;\\n\\t\\tborder-bottom: 2px solid rgb(200,0,0);\\n\\t}\\n\\n\\t.codemirror-container :global(.error-line) {\\n\\t\\tbackground-color: rgba(200,0,0,0.05);\\n\\t}\\n</style>\\n\\n<script>\\n\\texport default {\\n\\t\\toncreate() {\\n\\t\\t\\tthis.updating = false;\\n\\n\\t\\t\\tthis.observe('mode', this.createEditor);\\n\\n\\t\\t\\tthis.observe('code', code => {\\n\\t\\t\\t\\tif (!this.updating && code != null) {\\n\\t\\t\\t\\t\\tthis.updating = true;\\n\\t\\t\\t\\t\\tthis.editor.setValue(code);\\n\\t\\t\\t\\t\\tthis.updating = false;\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\n\\t\\t\\tlet marker;\\n\\t\\t\\tlet line;\\n\\t\\t\\tthis.observe('errorLoc', loc => {\\n\\t\\t\\t\\tif (marker) marker.clear();\\n\\n\\t\\t\\t\\tif (loc == null) {\\n\\t\\t\\t\\t\\tthis.set({ errorLine: null });\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tconst line = loc.line - 1;\\n\\t\\t\\t\\t\\tconst ch = loc.column;\\n\\n\\t\\t\\t\\t\\tmarker = this.editor.markText({ line, ch }, { line, ch: ch + 1 }, {\\n\\t\\t\\t\\t\\t\\tclassName: 'error-loc'\\n\\t\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\t\\tthis.set({ errorLine: line });\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\n\\t\\t\\tthis.observe('errorLine', (line, previousLine) => {\\n\\t\\t\\t\\tif (previousLine != null) this.editor.removeLineClass(previousLine, 'wrap', 'error-line');\\n\\t\\t\\t\\tif (line != null) this.editor.addLineClass(line, 'wrap', 'error-line');\\n\\t\\t\\t});\\n\\n\\t\\t\\tthis.on('destroy', () => {\\n\\t\\t\\t\\tthis.editor.toTextArea();\\n\\t\\t\\t});\\n\\n\\t\\t\\t// TODO this is a bug. oncreate should only be called once\\n\\t\\t\\t// the component is actually in the DOM\\n\\t\\t\\tsetTimeout(() => {\\n\\t\\t\\t\\tthis.editor.refresh();\\n\\t\\t\\t});\\n\\t\\t},\\n\\n\\t\\tmethods: {\\n\\t\\t\\tcreateEditor() {\\n\\t\\t\\t\\tif (this.editor) {\\n\\t\\t\\t\\t\\tthis.editor.toTextArea();\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tconst { mode, code, readonly } = this.get();\\n\\n\\t\\t\\t\\tconst modes = {\\n\\t\\t\\t\\t\\tjson: {\\n\\t\\t\\t\\t\\t\\tname: 'javascript',\\n\\t\\t\\t\\t\\t\\tjson: true\\n\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\thandlebars: {\\n\\t\\t\\t\\t\\t\\tname: 'handlebars',\\n\\t\\t\\t\\t\\t\\tbase: 'text/html'\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t};\\n\\n\\t\\t\\t\\tthis.editor = window.CodeMirror.fromTextArea(this.refs.editor, {\\n\\t\\t\\t\\t\\tlineNumbers: true,\\n\\t\\t\\t\\t\\tlineWrapping: true,\\n\\t\\t\\t\\t\\tindentWithTabs: true,\\n\\t\\t\\t\\t\\tindentUnit: 2,\\n\\t\\t\\t\\t\\ttabSize: 2,\\n\\t\\t\\t\\t\\tvalue: code,\\n\\t\\t\\t\\t\\tmode: modes[mode] || {\\n\\t\\t\\t\\t\\t\\tname: mode\\n\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\treadOnly: readonly\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.editor.on('change', instance => {\\n\\t\\t\\t\\t\\tif (!this.updating) {\\n\\t\\t\\t\\t\\t\\tthis.updating = true;\\n\\t\\t\\t\\t\\t\\tthis.set({ code: instance.getValue() });\\n\\t\\t\\t\\t\\t\\tthis.updating = false;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t});\\n\\t\\t\\t},\\n\\n\\t\\t\\tresize() {\\n\\t\\t\\t\\tthis.editor.refresh();\\n\\t\\t\\t}\\n\\t\\t}\\n\\t};\\n</script>\"],\"names\":[],\"mappings\":\"AAyBC,qBAAqB,mBAAC,CAAC,AACtB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC1B,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC7B,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AAClB,CAAC,AAED,wCAAqB,CAAC,AAAQ,WAAW,AAAE,CAAC,AAC3C,aAAa,CAAE,GAAG,CAClB,WAAW,CAAE,WAAW,CAAC,CAAC,SAAS,CACnC,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,qBAAqB,mBAAC,CAAC,AACtB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,AACb,CAAC,AAED,wCAAqB,CAAC,AAAQ,WAAW,AAAE,CAAC,AAC3C,MAAM,CAAE,IAAI,AACb,CAAC,AACF,CAAC,AAED,wCAAqB,CAAC,AAAQ,mBAAmB,AAAE,CAAC,AACnD,YAAY,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AAC7B,CAAC,AAED,QAAQ,mBAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACb,CAAC,AAED,wCAAqB,CAAC,QAAQ,mBAAC,CAAC,AAC/B,MAAM,CAAE,GAAG,CACX,IAAI,CAAE,GAAG,CACT,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,AACZ,CAAC,AAED,wCAAqB,CAAC,AAAQ,UAAU,AAAE,CAAC,AAC1C,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,AACtC,CAAC,AAED,wCAAqB,CAAC,AAAQ,WAAW,AAAE,CAAC,AAC3C,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,AACrC,CAAC\"}"
};

var warned = false;
Index.renderCss = function() {
	if (!warned) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned = true;
	}

	var components = [];

	components.push({
		filename: Index.filename,
		css: Index.css && Index.css.code,
		map: Index.css && Index.css.map
	});

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
/* harmony default export */ __webpack_exports__["a"] = (Index);

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_getLocationFromStack_js__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sourcemap_codec__ = __webpack_require__(209);



let importCache = {};

function fetchImport(id, curl) {
	return new Promise((fulfil, reject) => {
		curl([`https://bundle.run/${id}`]).then(module => {
			importCache[id] = module;
			fulfil(module);
		}, err => {
			console.error(err.stack);
			reject(new Error(`Error loading ${id} from bundle.run`));
		});
	});
}

const namespaceSpecifier = /\*\s+as\s+(\w+)/;
const namedSpecifiers = /\{(.+)\}/;

function parseSpecifiers(specifiers) {
	specifiers = specifiers.trim();

	let match = namespaceSpecifier.exec(specifiers);
	if (match) {
		return {
			namespace: true,
			name: match[1]
		};
	}

	let names = [];

	specifiers = specifiers.replace(namedSpecifiers, (match, str) => {
		names = str.split(',').map(name => {
			const split = name.split('as');
			const exported = split[0].trim();
			const local = (split[1] || exported).trim();

			return { local, exported };
		});

		return '';
	});

	match = /\w+/.exec(specifiers);

	return {
		namespace: false,
		names,
		default: match ? match[0] : null
	};
}



var Index = {};

Index.filename = "/Users/208311/Development/SVELTE/svelte.technology/routes/repl/_Viewer.html";

Index.data = function() {
	return {};
};

Index.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Index._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return result.html;
		}
	};
}

Index._render = function(__result, state, options) {
	__result.addComponent(Index);

	state = Object.assign({}, state);

	return `<div class="iframe-container" svelte-1613618279>
	<iframe class="${state.error || state.pending || state.pendingImports ? "greyed-out" : ""}" srcdoc="
		<!doctype html>
		<html>
			<head>
				<link rel=&quot;stylesheet&quot; href=&quot;/repl-viewer.css&quot;>
			</head>
			<body>
				<script src=&quot;/curl.js&quot;></script>
				<script>curl.config({ dontAddFileExt: /./ });</script>
			</body>
		</html>
	" svelte-1613618279></iframe>
</div>

<div class="overlay" svelte-1613618279>
	${ state.error ? `<p class="error message" svelte-1613618279>
			${ state.error.loc ? `<strong>
					${ state.error.filename ? `<span class="filename">${__escape(state.error.filename)}</span>` : `` }

					(${__escape(state.error.loc.line)}:${__escape(state.error.loc.column)})
				</strong>` : `` }

			${__escape(state.error.message)}
		</p>` : `${ state.pending ? `<div class="pending" svelte-1613618279>
			<span svelte-1613618279>Click to run</span>
		</div>` : `${ state.pendingImports ? `<p class="info message" svelte-1613618279>loading ${__escape(state.pendingImports)} ${__escape(state.pendingImports === 1 ? 'dependency' : 'dependencies')} from https://bundle.run</p>` : `` }` }` }
</div>`;
};

Index.css = {
	code: ".iframe-container[svelte-1613618279]{border-top:1px solid #ccc;background-color:white}iframe[svelte-1613618279]{width:100%;height:calc(100vh - 3em);border:none;display:block}@media(min-width: 768px){.iframe-container[svelte-1613618279]{border:none;height:100%}iframe[svelte-1613618279]{height:100%}}.greyed-out[svelte-1613618279]{filter:grayscale(100%) blur(2px);opacity:0.15}.overlay[svelte-1613618279]{position:absolute;top:0;width:100%;height:100%;padding:1em;pointer-events:none}.overlay[svelte-1613618279] p[svelte-1613618279]{pointer-events:all}.pending[svelte-1613618279]{position:absolute;width:100%;height:100%;text-align:center;top:0;left:0;pointer-events:all}.pending[svelte-1613618279] span[svelte-1613618279]{position:absolute;top:calc(50% - 0.5em);line-height:1;left:0;text-align:center;width:100%;font-size:2em}",
	map: "{\"version\":3,\"file\":\"_Viewer.html\",\"sources\":[\"_Viewer.html\"],\"sourcesContent\":[\"<div class='iframe-container'>\\n\\t<iframe ref:child class='{{error || pending || pendingImports ? \\\"greyed-out\\\" : \\\"\\\"}}' srcdoc='\\n\\t\\t<!doctype html>\\n\\t\\t<html>\\n\\t\\t\\t<head>\\n\\t\\t\\t\\t<link rel=\\\"stylesheet\\\" href=\\\"/repl-viewer.css\\\">\\n\\t\\t\\t</head>\\n\\t\\t\\t<body>\\n\\t\\t\\t\\t<script src=\\\"/curl.js\\\"></script>\\n\\t\\t\\t\\t<script>curl.config({ dontAddFileExt: /./ });</script>\\n\\t\\t\\t</body>\\n\\t\\t</html>\\n\\t'></iframe>\\n</div>\\n\\n<div class='overlay'>\\n\\t{{#if error}}\\n\\t\\t<p class='error message'>\\n\\t\\t\\t{{#if error.loc}}\\n\\t\\t\\t\\t<strong>\\n\\t\\t\\t\\t\\t{{#if error.filename}}\\n\\t\\t\\t\\t\\t\\t<span class='filename' on:click='fire(\\\"navigate\\\", error.filename)'>{{error.filename}}</span>\\n\\t\\t\\t\\t\\t{{/if}}\\n\\n\\t\\t\\t\\t\\t({{error.loc.line}}:{{error.loc.column}})\\n\\t\\t\\t\\t</strong>\\n\\t\\t\\t{{/if}}\\n\\n\\t\\t\\t{{error.message}}\\n\\t\\t</p>\\n\\t{{elseif pending}}\\n\\t\\t<div class='pending' on:click='run()'>\\n\\t\\t\\t<span>Click to run</span>\\n\\t\\t</div>\\n\\t{{elseif pendingImports}}\\n\\t\\t<p class='info message'>loading {{pendingImports}} {{pendingImports === 1 ? 'dependency' : 'dependencies'}} from https://bundle.run</p>\\n\\t{{/if}}\\n</div>\\n\\n<style>\\n\\t.iframe-container {\\n\\t\\tborder-top: 1px solid #ccc;\\n\\t\\tbackground-color: white;\\n\\t}\\n\\n\\tiframe {\\n\\t\\twidth: 100%;\\n\\t\\theight: calc(100vh - 3em);\\n\\t\\tborder: none;\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\t@media (min-width: 768px) {\\n\\t\\t.iframe-container {\\n\\t\\t\\tborder: none;\\n\\t\\t\\theight: 100%;\\n\\t\\t}\\n\\n\\t\\tiframe {\\n\\t\\t\\theight: 100%;\\n\\t\\t}\\n\\t}\\n\\n\\t.greyed-out {\\n\\t\\tfilter: grayscale(100%) blur(2px);\\n\\t\\topacity: 0.15;\\n\\t}\\n\\n\\t.overlay {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tpadding: 1em;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\t.overlay p {\\n\\t\\tpointer-events: all;\\n\\t}\\n\\n\\t.pending {\\n\\t\\tposition: absolute;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\ttext-align: center;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\tpointer-events: all;\\n\\t}\\n\\n\\t.pending span {\\n\\t\\tposition: absolute;\\n\\t\\ttop: calc(50% - 0.5em);\\n\\t\\tline-height: 1;\\n\\t\\tleft: 0;\\n\\t\\ttext-align: center;\\n\\t\\twidth: 100%;\\n\\t\\tfont-size: 2em;\\n\\t}\\n</style>\\n\\n<script>\\n\\timport getLocationFromStack from './_utils/getLocationFromStack.js';\\n\\timport { decode } from 'sourcemap-codec';\\n\\n\\tlet importCache = {};\\n\\n\\tfunction fetchImport(id, curl) {\\n\\t\\treturn new Promise((fulfil, reject) => {\\n\\t\\t\\tcurl([`https://bundle.run/${id}`]).then(module => {\\n\\t\\t\\t\\timportCache[id] = module;\\n\\t\\t\\t\\tfulfil(module);\\n\\t\\t\\t}, err => {\\n\\t\\t\\t\\tconsole.error(err.stack);\\n\\t\\t\\t\\treject(new Error(`Error loading ${id} from bundle.run`));\\n\\t\\t\\t});\\n\\t\\t});\\n\\t}\\n\\n\\tconst namespaceSpecifier = /\\\\*\\\\s+as\\\\s+(\\\\w+)/;\\n\\tconst namedSpecifiers = /\\\\{(.+)\\\\}/;\\n\\n\\tfunction parseSpecifiers(specifiers) {\\n\\t\\tspecifiers = specifiers.trim();\\n\\n\\t\\tlet match = namespaceSpecifier.exec(specifiers);\\n\\t\\tif (match) {\\n\\t\\t\\treturn {\\n\\t\\t\\t\\tnamespace: true,\\n\\t\\t\\t\\tname: match[1]\\n\\t\\t\\t};\\n\\t\\t}\\n\\n\\t\\tlet names = [];\\n\\n\\t\\tspecifiers = specifiers.replace(namedSpecifiers, (match, str) => {\\n\\t\\t\\tnames = str.split(',').map(name => {\\n\\t\\t\\t\\tconst split = name.split('as');\\n\\t\\t\\t\\tconst exported = split[0].trim();\\n\\t\\t\\t\\tconst local = (split[1] || exported).trim();\\n\\n\\t\\t\\t\\treturn { local, exported };\\n\\t\\t\\t});\\n\\n\\t\\t\\treturn '';\\n\\t\\t});\\n\\n\\t\\tmatch = /\\\\w+/.exec(specifiers);\\n\\n\\t\\treturn {\\n\\t\\t\\tnamespace: false,\\n\\t\\t\\tnames,\\n\\t\\t\\tdefault: match ? match[0] : null\\n\\t\\t};\\n\\t}\\n\\n\\texport default {\\n\\t\\toncreate() {\\n\\t\\t\\tlet component;\\n\\n\\t\\t\\tthis.refs.child.addEventListener('load', () => {\\n\\t\\t\\t\\tconst iframe = this.refs.child;\\n\\t\\t\\t\\tconst body = iframe.contentDocument.body;\\n\\t\\t\\t\\tconst evalInIframe = iframe.contentWindow.eval;\\n\\n\\t\\t\\t\\t// intercept links, so that we can use #hashes inside the iframe\\n\\t\\t\\t\\tbody.addEventListener('click', event => {\\n\\t\\t\\t\\t\\tif (event.which !== 1) return;\\n\\t\\t\\t\\t\\tif (event.metaKey || event.ctrlKey || event.shiftKey) return;\\n\\t\\t\\t\\t\\tif (event.defaultPrevented) return;\\n\\n\\t\\t\\t\\t\\t// ensure target is a link\\n\\t\\t\\t\\t\\tlet el = event.target;\\n\\t\\t\\t\\t\\twhile (el && el.nodeName !== 'A') el = el.parentNode;\\n\\t\\t\\t\\t\\tif (!el || el.nodeName !== 'A') return;\\n\\n\\t\\t\\t\\t\\tif (el.hasAttribute('download') || el.getAttribute('rel') === 'external' || el.target) return;\\n\\n\\t\\t\\t\\t\\tevent.preventDefault();\\n\\n\\t\\t\\t\\t\\tif (el.href.startsWith(top.location.href)) {\\n\\t\\t\\t\\t\\t\\tconst hash = el.href.replace(top.location.href, '');\\n\\t\\t\\t\\t\\t\\tif (hash[0] === '#') {\\n\\t\\t\\t\\t\\t\\t\\tiframe.contentWindow.location.hash = hash;\\n\\t\\t\\t\\t\\t\\t\\treturn;\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\twindow.open(el.href, '_blank');\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tlet promise = null;\\n\\t\\t\\t\\tlet observers = null;\\n\\t\\t\\t\\tlet updating = null;\\n\\n\\t\\t\\t\\tlet toDestroy = null;\\n\\n\\t\\t\\t\\tconst init = () => {\\n\\t\\t\\t\\t\\tconst { bundle, bundleError } = this.get();\\n\\t\\t\\t\\t\\tif (bundleError) return;\\n\\n\\t\\t\\t\\t\\tconst imports = [];\\n\\t\\t\\t\\t\\tconst pattern = /\\\\bimport\\\\s+(?:(.+)\\\\s+from\\\\s+)?[\\\\'\\\"]([^\\\"\\\\']+)[\\\"\\\\']/g; // https://gist.github.com/pilwon/ff55634a29bb4456e0dd\\n\\n\\t\\t\\t\\t\\tconst missingImports = bundle.imports.filter(x => !importCache[x]);\\n\\n\\t\\t\\t\\t\\tconst ready = () => {\\n\\t\\t\\t\\t\\t\\t// TODO this is very hacky — would be great if this information\\n\\t\\t\\t\\t\\t\\t// was exposed by the compiler somehow\\n\\t\\t\\t\\t\\t\\tif (/[^_]oncreate/.test(bundle.code)) {\\n\\t\\t\\t\\t\\t\\t\\tthis.set({ pending: true });\\n\\t\\t\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\t\\t\\tthis.set({ pending: false });\\n\\t\\t\\t\\t\\t\\t\\tthis.createComponent();\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t};\\n\\n\\t\\t\\t\\t\\tthis.createComponent = () => {\\n\\t\\t\\t\\t\\t\\tthis.set({ error: null });\\n\\n\\t\\t\\t\\t\\t\\tif (toDestroy) {\\n\\t\\t\\t\\t\\t\\t\\tconst styles = iframe.contentDocument.querySelectorAll('style');\\n\\t\\t\\t\\t\\t\\t\\tlet i = styles.length;\\n\\t\\t\\t\\t\\t\\t\\twhile (i--) styles[i].parentNode.removeChild(styles[i]);\\n\\n\\t\\t\\t\\t\\t\\t\\ttoDestroy.destroy();\\n\\t\\t\\t\\t\\t\\t\\ttoDestroy = null;\\n\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\tbundle.imports.forEach(x => {\\n\\t\\t\\t\\t\\t\\t\\tconst module = importCache[x];\\n\\t\\t\\t\\t\\t\\t\\tconst name = bundle.importMap.get(x);\\n\\n\\t\\t\\t\\t\\t\\t\\tiframe.contentWindow[name] = module;\\n\\t\\t\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\t\\t\\tconst data = this.get('data');\\n\\n\\t\\t\\t\\t\\t\\ttry {\\n\\t\\t\\t\\t\\t\\t\\tevalInIframe(`${bundle.code}\\n\\t\\t\\t\\t\\t\\t\\t\\tdocument.body.innerHTML = '';\\n\\t\\t\\t\\t\\t\\t\\t\\twindow.location.hash = '';\\n\\t\\t\\t\\t\\t\\t\\t\\twindow._svelteTransitionManager = null;\\n\\n\\t\\t\\t\\t\\t\\t\\t\\tvar component = new SvelteComponent({\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ttarget: document.body,\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tdata: ${JSON.stringify(data)}\\n\\t\\t\\t\\t\\t\\t\\t\\t});`);\\n\\n\\t\\t\\t\\t\\t\\t\\tcomponent = window.app = window.component = iframe.contentWindow.component;\\n\\n\\t\\t\\t\\t\\t\\t\\tobservers = Object.keys(data).map(key => {\\n\\t\\t\\t\\t\\t\\t\\t\\treturn component.observe(key, value => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tif (updating) return;\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tupdating = true;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tthis.fire('change', { key, value });\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tupdating = false;\\n\\t\\t\\t\\t\\t\\t\\t\\t}, { init: false });\\n\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t} catch (error) {\\n\\t\\t\\t\\t\\t\\t\\t// TODO show in UI\\n\\t\\t\\t\\t\\t\\t\\tcomponent = null;\\n\\t\\t\\t\\t\\t\\t\\tobservers = null;\\n\\n\\t\\t\\t\\t\\t\\t\\tconst loc = getLocationFromStack(error.stack, bundle.map);\\n\\t\\t\\t\\t\\t\\t\\tif (loc) {\\n\\t\\t\\t\\t\\t\\t\\t\\terror.filename = loc.source;\\n\\t\\t\\t\\t\\t\\t\\t\\terror.loc = { line: loc.line, column: loc.column };\\n\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\tthis.set({ error });\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t};\\n\\n\\t\\t\\t\\t\\tlet pendingImports = missingImports.length;\\n\\t\\t\\t\\t\\tthis.set({ pendingImports });\\n\\n\\t\\t\\t\\t\\tif (missingImports.length) {\\n\\t\\t\\t\\t\\t\\tlet cancelled = false;\\n\\n\\t\\t\\t\\t\\t\\tpromise = Promise.all(\\n\\t\\t\\t\\t\\t\\t\\tmissingImports.map(id => fetchImport(id, iframe.contentWindow.curl).then(module => {\\n\\t\\t\\t\\t\\t\\t\\t\\tpendingImports -= 1;\\n\\t\\t\\t\\t\\t\\t\\t\\tthis.set({ pendingImports });\\n\\t\\t\\t\\t\\t\\t\\t\\treturn module;\\n\\t\\t\\t\\t\\t\\t\\t}))\\n\\t\\t\\t\\t\\t\\t);\\n\\t\\t\\t\\t\\t\\tpromise.cancel = () => cancelled = true;\\n\\n\\t\\t\\t\\t\\t\\tpromise\\n\\t\\t\\t\\t\\t\\t\\t.then(() => {\\n\\t\\t\\t\\t\\t\\t\\t\\tif (cancelled) return;\\n\\t\\t\\t\\t\\t\\t\\t\\tready();\\n\\t\\t\\t\\t\\t\\t\\t})\\n\\t\\t\\t\\t\\t\\t\\t.catch(error => {\\n\\t\\t\\t\\t\\t\\t\\t\\tif (cancelled) return;\\n\\t\\t\\t\\t\\t\\t\\t\\tthis.set({ error });\\n\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\t\\tready();\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tthis.observe('bundle', bundle => {\\n\\t\\t\\t\\t\\tif (!bundle) return; // TODO can this ever happen?\\n\\t\\t\\t\\t\\tif (promise) promise.cancel();\\n\\n\\t\\t\\t\\t\\ttoDestroy = component;\\n\\t\\t\\t\\t\\tcomponent = null;\\n\\n\\t\\t\\t\\t\\tif (this.get('data') !== undefined) init();\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.observe('data', data => {\\n\\t\\t\\t\\t\\ttry {\\n\\t\\t\\t\\t\\t\\tif (observers) {\\n\\t\\t\\t\\t\\t\\t\\tobservers.forEach(observer => observer.cancel());\\n\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\tif (component) {\\n\\t\\t\\t\\t\\t\\t\\tthis.set({ error: null });\\n\\t\\t\\t\\t\\t\\t\\tupdating = true;\\n\\t\\t\\t\\t\\t\\t\\tcomponent.set(data);\\n\\t\\t\\t\\t\\t\\t\\tupdating = false;\\n\\n\\t\\t\\t\\t\\t\\t\\tobservers = Object.keys(data).map(key => {\\n\\t\\t\\t\\t\\t\\t\\t\\treturn component.observe(key, value => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tif (updating) return;\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tupdating = true;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tthis.fire('change', { key, value });\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tupdating = false;\\n\\t\\t\\t\\t\\t\\t\\t\\t}, { init: false });\\n\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\t\\t\\tinit();\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t} catch (error) {\\n\\t\\t\\t\\t\\t\\tconst loc = getLocationFromStack(error.stack, this.get('bundle').map);\\n\\t\\t\\t\\t\\t\\tif (loc) {\\n\\t\\t\\t\\t\\t\\t\\terror.filename = loc.source;\\n\\t\\t\\t\\t\\t\\t\\terror.loc = { line: loc.line, column: loc.column };\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\tthis.set({ error });\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\tthis.observe('bundleError', error => {\\n\\t\\t\\t\\t\\tif (error) this.set({ error });\\n\\t\\t\\t\\t});\\n\\t\\t\\t});\\n\\t\\t},\\n\\n\\t\\tmethods: {\\n\\t\\t\\trun() {\\n\\t\\t\\t\\tthis.set({ pending: false });\\n\\t\\t\\t\\tthis.createComponent();\\n\\t\\t\\t}\\n\\t\\t}\\n\\t};\\n</script>\\n\"],\"names\":[],\"mappings\":\"AAwCC,iBAAiB,mBAAC,CAAC,AAClB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC1B,gBAAgB,CAAE,KAAK,AACxB,CAAC,AAED,MAAM,mBAAC,CAAC,AACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CACzB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,KAAK,AACf,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,iBAAiB,mBAAC,CAAC,AAClB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,AACb,CAAC,AAED,MAAM,mBAAC,CAAC,AACP,MAAM,CAAE,IAAI,AACb,CAAC,AACF,CAAC,AAED,WAAW,mBAAC,CAAC,AACZ,MAAM,CAAE,UAAU,IAAI,CAAC,CAAC,KAAK,GAAG,CAAC,CACjC,OAAO,CAAE,IAAI,AACd,CAAC,AAED,QAAQ,mBAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,GAAG,CACZ,cAAc,CAAE,IAAI,AACrB,CAAC,AAED,2BAAQ,CAAC,CAAC,mBAAC,CAAC,AACX,cAAc,CAAE,GAAG,AACpB,CAAC,AAED,QAAQ,mBAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,MAAM,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,cAAc,CAAE,GAAG,AACpB,CAAC,AAED,2BAAQ,CAAC,IAAI,mBAAC,CAAC,AACd,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CACtB,WAAW,CAAE,CAAC,CACd,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,GAAG,AACf,CAAC\"}"
};

var warned = false;
Index.renderCss = function() {
	if (!warned) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned = true;
	}

	var components = [];

	components.push({
		filename: Index.filename,
		css: Index.css && Index.css.code,
		map: Index.css && Index.css.map
	});

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
/* harmony default export */ __webpack_exports__["a"] = (Index);

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sourcemap_codec__ = __webpack_require__(209);


function getLocationFromStack(stack, map) {
	if (!stack) return;
	const last = stack.split('\n')[1];
	const match = /<anonymous>:(\d+):(\d+)\)$/.exec(last);

	if (!match) return null;

	const line = +match[1];
	const column = +match[2];

	return trace({ line, column }, map);
}

function trace(loc, map) {
	const mappings = Object(__WEBPACK_IMPORTED_MODULE_0_sourcemap_codec__["a" /* decode */])(map.mappings);
	const segments = mappings[loc.line - 1];

	for (let i = 0; i < segments.length; i += 1) {
		const segment = segments[i];
		if (segment[0] === loc.column) {
			const [, sourceIndex, line, column] = segment;
			const source = map.sources[sourceIndex].slice(2);

			return { source, line: line + 1, column };
		}
	}

	return null;
}


/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function keyEvent(code) {
	return function (node, callback) {
		node.addEventListener('keydown', handleKeydown);

		function handleKeydown(event) {
			if (event.keyCode === code) {
				callback.call(this, event);
			}
		}

		return {
			teardown() {
				node.removeEventListener('keydown', handleKeydown);
			}
		};
	}
}



var Index = {};

Index.filename = "/Users/208311/Development/SVELTE/svelte.technology/routes/repl/_ComponentSelector.html";

Index.data = function() {
	return {};
};

Index.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Index._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return result.html;
		}
	};
}

Index._render = function(__result, state, options) {
	__result.addComponent(Index);

	state = Object.assign({}, state);

	return `<div class="panel-header" svelte-3809585029>
	<ul class="file-tabs" svelte-3809585029>
		${ state.components.map(component => `<li id="${component.name}" class="${state.selectedComponent == component ? "active" : ""}" data-name="${component.name}" svelte-3809585029>
			<button class="file-tabs-item ${component.edit ? "edit-mode" : ""}" svelte-3809585029>
				${ component.name == 'App' ? `<div class="uneditable" svelte-3809585029>
						App.html
					</div>` : `${ component.edit ? `<div class="input-wrapper" svelte-3809585029>
							<input autofocus svelte-3809585029>
						</div>` : `<div class="editable" title="edit component name" svelte-3809585029>
							${__escape(component.name)}.${__escape(component.type)}
						</div>` }
					<span class="remove" svelte-3809585029>×</span>` }
			</button>
		</li>`).join("")}
	</ul>
</div>

<div class="btn-action-container" svelte-3809585029>
	<button class="add-new" title="add new component" svelte-3809585029>
		<span svelte-3809585029>+</span>
	</button>
</div>`;
};

Index.css = {
	code: ".module-name[svelte-3809585029]{position:relative;display:block}.panel-header[svelte-3809585029]{padding:0 40px 0.5em 0}button[svelte-3809585029]{display:block;float:right;padding:calc(0.5em - 1px)}.dropdown[svelte-3809585029]{position:relative;display:block;float:left;padding:0 2em 0 0}.dropdown[svelte-3809585029]::after{content:'▼';position:absolute;right:1rem;top:0.55rem;font-size:0.8em;color:#999;pointer-events:none}.input-wrapper[svelte-3809585029]{position:relative;display:block;float:left;line-height:1}.input-wrapper[svelte-3809585029] input[svelte-3809585029]{width:100%;font-size:16px;font-family:Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";border:none;color:#aa1e1e;padding:4px 10px;outline:none}.widther[svelte-3809585029]{display:block;font-family:inherit;font-size:inherit;border:1px solid #eee;padding:calc(0.5em - 1px) 0.25em;line-height:1}.file-extension[svelte-3809585029]{display:inline-block;padding:calc(0.5em - 1px) 0;color:#999;left:-0.2em;pointer-events:none}.file-tabs[svelte-3809585029]{border:none;padding-left:0;margin:0;list-style-type:none;white-space:nowrap;overflow-x:auto;overflow-y:hidden}.file-tabs[svelte-3809585029]>li[svelte-3809585029]{display:inline-block;float:none;margin-bottom:0;margin:0 0.5em 0 0;vertical-align:top}.file-tabs[svelte-3809585029] li.active[svelte-3809585029]{background-color:#fff}.file-tabs[svelte-3809585029] li.active button[svelte-3809585029]{border-bottom:1px solid #666}button.file-tabs-item[svelte-3809585029]{float:none;border-bottom:1px solid #eee;border-radius:0;color:#333;position:relative;display:block;padding:0.4em 0 0 0;margin:0;height:2.4em;box-sizing:border-box;line-height:1.4;font-weight:300}.edit-mode[svelte-3809585029]{padding-bottom:8px;padding-top:8px}.file-tabs-input[svelte-3809585029]{padding:10px 15px}.editable[svelte-3809585029],.uneditable[svelte-3809585029]{display:inline-block;margin-right:4px;padding:0 0.7em 0 0.5em;position:relative}.uneditable[svelte-3809585029]{padding-left:1em}.remove[svelte-3809585029]{position:absolute;display:none;right:0;width:20px;text-align:right;padding:0.7em 0 0.5em 0.5em;top:0}li.active[svelte-3809585029] .editable[svelte-3809585029]{cursor:text}li.active[svelte-3809585029] .remove[svelte-3809585029]{display:inline-block}.btn-action-container[svelte-3809585029]{position:absolute;right:0;top:0}button.add-new[svelte-3809585029]{border:none;width:2.4em;height:2.4em;color:#999;background:none}.add-new[svelte-3809585029] span[svelte-3809585029]{position:absolute;font-size:2em;font-weight:300;top:0;line-height:1.3;left:0;width:100%}.add-new[svelte-3809585029]:hover{border:none;color:#333}",
	map: "{\"version\":3,\"file\":\"_ComponentSelector.html\",\"sources\":[\"_ComponentSelector.html\"],\"sourcesContent\":[\"<div class=\\\"panel-header\\\">\\n\\t<ul ref:files class=\\\"file-tabs\\\" on:dblclick='fire(\\\"create\\\")'>\\n\\t\\t{{#each components as component}}\\n\\t\\t<li id='{{component.name}}' class='{{ selectedComponent == component ? \\\"active\\\" : \\\"\\\" }}' data-name='{{component.name}}' on:dblclick='event.stopPropagation()'>\\n\\t\\t\\t<button class='file-tabs-item {{ component.edit ? \\\"edit-mode\\\" : \\\"\\\"}}' on:click='selectComponent(component, selectedComponent)'>\\n\\t\\t\\t\\t{{#if component.name == 'App'}}\\n\\t\\t\\t\\t\\t<div class='uneditable'>\\n\\t\\t\\t\\t\\t\\tApp.html\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{{else}}\\n\\t\\t\\t\\t\\t{{#if component.edit}}\\n\\t\\t\\t\\t\\t\\t<div class='input-wrapper'>\\n\\t\\t\\t\\t\\t\\t\\t<input autofocus ref:name bind:value='component.name' on:focus='selectInput(this)' on:blur='closeEdit(selectedComponent)' on:enter='this.blur()' />\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{{else}}\\n\\t\\t\\t\\t\\t\\t<div class='editable' title='edit component name' on:click='editTab(component, selectedComponent)'>\\n\\t\\t\\t\\t\\t\\t\\t{{component.name}}.{{component.type}}\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{{/if}}\\n\\t\\t\\t\\t\\t<span class='remove' on:click='remove(component)'>&times;</span>\\n\\t\\t\\t\\t{{/if}}\\n\\t\\t\\t</button>\\n\\t\\t</li>\\n\\t\\t{{/each}}\\n\\t</ul>\\n</div>\\n\\n<div class=\\\"btn-action-container\\\">\\n\\t<button class='add-new' on:click='fire(\\\"create\\\")' title=\\\"add new component\\\">\\n\\t\\t<span>+</span>\\n\\t</button>\\n</div>\\n\\n<style>\\n\\t.module-name {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\t.panel-header {\\n\\t\\tpadding: 0 40px 0.5em 0;\\n\\t}\\n\\n\\tbutton {\\n\\t\\tdisplay: block;\\n\\t\\tfloat: right;\\n\\t\\tpadding: calc(0.5em - 1px);\\n\\t}\\n\\n\\t.dropdown {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: block;\\n\\t\\tfloat: left;\\n\\t\\tpadding: 0 2em 0 0;\\n\\t}\\n\\n\\t.dropdown::after {\\n\\t\\tcontent: '▼';\\n\\t\\tposition: absolute;\\n\\t\\tright: 1rem;\\n\\t\\ttop: 0.55rem;\\n\\t\\tfont-size: 0.8em;\\n\\t\\tcolor: #999;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\t.input-wrapper {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: block;\\n\\t\\tfloat: left;\\n\\t\\tline-height: 1;\\n\\t\\t/* margin: 0 0.3em 0 0; */\\n\\t}\\n\\n\\t.input-wrapper input {\\n\\t\\twidth: 100%;\\n\\t\\t/* background-color: #e7e7e7; */\\n\\t\\tfont-size: 16px;\\n\\t\\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", Helvetica, Arial, sans-serif, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\", \\\"Segoe UI Symbol\\\";\\n\\t\\tborder: none;\\n\\t\\tcolor: #aa1e1e;\\n\\t\\tpadding: 4px 10px;\\n\\t\\toutline: none;\\n\\t}\\n\\n\\t.widther {\\n\\t\\tdisplay: block;\\n\\t\\tfont-family: inherit;\\n\\t\\tfont-size: inherit;\\n\\t\\tborder: 1px solid #eee;\\n\\t\\tpadding: calc(0.5em - 1px) 0.25em;\\n\\t\\tline-height: 1;\\n\\t}\\n\\n\\t.file-extension {\\n\\t\\tdisplay: inline-block;\\n\\t\\tpadding: calc(0.5em - 1px) 0;\\n\\t\\tcolor: #999;\\n\\t\\tleft: -0.2em;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\t.file-tabs {\\n\\t\\tborder: none;\\n\\t\\tpadding-left: 0;\\n\\t\\tmargin: 0;\\n\\t\\tlist-style-type: none;\\n\\t\\twhite-space: nowrap;\\n\\t\\toverflow-x: auto;\\n\\t\\toverflow-y: hidden;\\n\\t}\\n\\n\\t.file-tabs > li {\\n\\t\\tdisplay: inline-block;\\n\\t\\tfloat: none;\\n\\t\\tmargin-bottom: 0;\\n\\t\\tmargin: 0 0.5em 0 0;\\n\\t\\tvertical-align: top;\\n\\t}\\n\\n\\t.file-tabs li.active {\\n\\t\\tbackground-color: #fff;\\n\\t}\\n\\n\\t.file-tabs li.active button {\\n\\t\\tborder-bottom: 1px solid #666;\\n\\t\\t/* font-weight: 500; */\\n\\t}\\n\\n\\tbutton.file-tabs-item {\\n\\t\\tfloat: none;\\n\\t\\tborder-bottom: 1px solid #eee;\\n\\t\\tborder-radius: 0;\\n\\t\\tcolor: #333;\\n\\t\\tposition: relative;\\n\\t\\tdisplay: block;\\n\\t\\t/* padding: 0 0.7em; */\\n\\t\\tpadding: 0.4em 0 0 0;\\n\\t\\tmargin: 0;\\n\\t\\theight: 2.4em;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tline-height: 1.4;\\n\\t\\tfont-weight: 300;\\n\\t}\\n\\n\\t/* .file-tabs-item:hover {\\n\\t\\tborder: none;\\n\\t} */\\n\\n\\t.edit-mode {\\n\\t\\tpadding-bottom: 8px;\\n\\t\\tpadding-top: 8px;\\n\\t}\\n\\n\\t.file-tabs-input {\\n\\t\\tpadding: 10px 15px;\\n\\t}\\n\\n\\t.editable, .uneditable {\\n\\t\\tdisplay: inline-block;\\n\\t\\tmargin-right: 4px;\\n\\t\\tpadding: 0 0.7em 0 0.5em;\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.uneditable {\\n\\t\\tpadding-left: 1em;\\n\\t}\\n\\n\\t.remove {\\n\\t\\tposition: absolute;\\n\\t\\tdisplay: none;\\n\\t\\tright: 0;\\n\\t\\twidth: 20px;\\n\\t\\ttext-align: right;\\n\\t\\tpadding: 0.7em 0 0.5em 0.5em;\\n\\t\\ttop: 0;\\n\\t}\\n\\n\\tli.active .editable {\\n\\t\\tcursor: text;\\n\\t}\\n\\n\\tli.active .remove {\\n\\t\\tdisplay: inline-block;\\n\\t}\\n\\n\\t.btn-action-container {\\n\\t\\tposition: absolute;\\n\\t\\tright: 0;\\n\\t\\ttop: 0;\\n\\t}\\n\\n\\tbutton.add-new {\\n\\t\\tborder: none;\\n\\t\\twidth: 2.4em;\\n\\t\\theight: 2.4em;\\n\\t\\tcolor: #999;\\n\\t\\tbackground: none;\\n\\t}\\n\\n\\t.add-new span {\\n\\t\\tposition: absolute;\\n\\t\\tfont-size: 2em;\\n\\t\\tfont-weight: 300;\\n\\t\\ttop: 0;\\n\\t\\tline-height: 1.3;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t.add-new:hover {\\n\\t\\tborder: none;\\n\\t\\tcolor: #333;\\n\\t}\\n</style>\\n\\n<script>\\n\\tfunction keyEvent(code) {\\n\\t\\treturn function (node, callback) {\\n\\t\\t\\tnode.addEventListener('keydown', handleKeydown);\\n\\n\\t\\t\\tfunction handleKeydown(event) {\\n\\t\\t\\t\\tif (event.keyCode === code) {\\n\\t\\t\\t\\t\\tcallback.call(this, event);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\n\\t\\t\\treturn {\\n\\t\\t\\t\\tteardown() {\\n\\t\\t\\t\\t\\tnode.removeEventListener('keydown', handleKeydown);\\n\\t\\t\\t\\t}\\n\\t\\t\\t};\\n\\t\\t}\\n\\t}\\n\\n\\texport default {\\n\\t\\tmethods: {\\n\\t\\t\\tselectComponent(component, selectedComponent) {\\n\\t\\t\\t\\tif (selectedComponent != component) {\\n\\t\\t\\t\\t\\tselectedComponent.edit = false;\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\tthis.set({ selectedComponent: component })\\n\\t\\t\\t},\\n\\t\\t\\teditTab(component, selectedComponent) {\\n\\t\\t\\t\\tif (selectedComponent == component) {\\n\\t\\t\\t\\t\\tselectedComponent.edit = true;\\n\\t\\t\\t\\t\\tthis.set({ selectedComponent });\\n\\t\\t\\t\\t\\t// this.refs.name.focus();\\n\\t\\t\\t\\t}\\n\\t\\t\\t},\\n\\t\\t\\tcloseEdit(selectedComponent) {\\n\\t\\t\\t\\tconst match = /(.+)\\\\.(html|js)$/.exec(selectedComponent.name);\\n\\t\\t\\t\\tselectedComponent.name = match ? match[1] : selectedComponent.name;\\n\\t\\t\\t\\tif (match && match[2]) selectedComponent.type = match[2];\\n\\t\\t\\t\\tselectedComponent.edit = false;\\n\\t\\t\\t\\tthis.set({ selectedComponent });\\n\\t\\t\\t},\\n\\t\\t\\tremove(component) {\\n\\t\\t\\t\\tlet result = confirm(`Are you sure you want to delete ${component.name}.${component.type}?`);\\n\\t\\t\\t\\tif (result) {\\n\\t\\t\\t\\t\\tthis.fire('remove');\\n\\t\\t\\t\\t\\tlet components = this.get('components');\\n\\t\\t\\t\\t\\tthis.set({ selectedComponent: components[components.length - 1] });\\n\\t\\t\\t\\t}\\n\\t\\t\\t},\\n\\t\\t\\tselectInput(input) {\\n\\t\\t\\t\\tsetTimeout(() => {\\n\\t\\t\\t\\t\\tinput.select();\\n\\t\\t\\t\\t});\\n\\t\\t\\t},\\n\\t\\t\\tfocusLast() {\\n\\n\\t\\t\\t}\\n\\t\\t},\\n\\n\\t\\tevents: {\\n\\t\\t\\tenter: keyEvent(13)\\n\\t\\t}\\n\\t};\\n</script>\"],\"names\":[],\"mappings\":\"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\"}"
};

var warned = false;
Index.renderCss = function() {
	if (!warned) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned = true;
	}

	var components = [];

	components.push({
		filename: Index.filename,
		css: Index.css && Index.css.code,
		map: Index.css && Index.css.map
	});

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
/* harmony default export */ __webpack_exports__["a"] = (Index);

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Index = {};

Index.filename = "/Users/208311/Development/SVELTE/svelte.technology/routes/repl/_ExampleSelector.html";

Index.data = function() {
	return {};
};

Index.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Index._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return result.html;
		}
	};
}

Index._render = function(__result, state, options) {
	__result.addComponent(Index);

	state = Object.assign({}, state);

	return `<div class="select-wrapper" svelte-420476576>
	<select svelte-420476576>
		<option value="${null}" disabled>Select an example</option>

		${ state.example_contents.map(group => `<optgroup label="${group.name}">
				${ group.examples.map(example => `<option value="${example}">${__escape(example.title)}</option>`).join("")}
			</optgroup>`).join("")}
	</select>

	<div class="visible" svelte-420476576>
		<span svelte-420476576>${__escape(state.selectedExample ? state.selectedExample.title : 'Select an example')}</span>
	</div>
</div>`;
};

Index.css = {
	code: ".select-wrapper[svelte-420476576]{position:relative;display:block;float:left;padding:0 1.5em 0 0;font-family:Rajdhani;font-weight:300;font-size:1em;line-height:1.2}.select-wrapper[svelte-420476576]::after{content:'▼';position:absolute;right:0.8rem;top:0.85rem;font-size:0.7em;color:rgba(0,0,0,0.4);pointer-events:none}select[svelte-420476576]{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0}.visible[svelte-420476576]{pointer-events:none;padding:5px 0.4em;font-size:20px}.visible[svelte-420476576] span[svelte-420476576]{top:0.05em}",
	map: "{\"version\":3,\"file\":\"_ExampleSelector.html\",\"sources\":[\"_ExampleSelector.html\"],\"sourcesContent\":[\"<div class='select-wrapper'>\\n\\t<select bind:value='selectedExample'>\\n\\t\\t<option value='{{null}}' disabled>Select an example</option>\\n\\n\\t\\t{{#each example_contents as group}}\\n\\t\\t\\t<optgroup label='{{group.name}}'>\\n\\t\\t\\t\\t{{#each group.examples as example}}\\n\\t\\t\\t\\t\\t<option value='{{example}}'>{{example.title}}</option>\\n\\t\\t\\t\\t{{/each}}\\n\\t\\t\\t</optgroup>\\n\\t\\t{{/each}}\\n\\t</select>\\n\\n\\t<div class='visible'>\\n\\t\\t<span>{{selectedExample ? selectedExample.title : 'Select an example'}}</span>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.select-wrapper {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: block;\\n\\t\\tfloat: left;\\n\\t\\tpadding: 0 1.5em 0 0;\\n\\t\\t/* background-color: white;\\n\\t\\tborder: 1px solid #333;\\n\\t\\tborder-radius: 2px; */\\n\\t\\tfont-family: Rajdhani;\\n\\t\\tfont-weight: 300;\\n\\t\\tfont-size: 1em;\\n\\t\\tline-height: 1.2;\\n\\t}\\n\\n\\t.select-wrapper::after {\\n\\t\\tcontent: '▼';\\n\\t\\tposition: absolute;\\n\\t\\tright: 0.8rem;\\n\\t\\ttop: 0.85rem;\\n\\t\\tfont-size: 0.7em;\\n\\t\\tcolor: rgba(0,0,0,0.4);\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\tselect {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t.visible {\\n\\t\\tpointer-events: none;\\n\\t\\tpadding: 5px 0.4em;\\n\\t\\tfont-size: 20px;\\n\\t}\\n\\n\\t.visible span {\\n\\t\\ttop: 0.05em;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAmBC,eAAe,kBAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAIpB,WAAW,CAAE,QAAQ,CACrB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,iCAAe,OAAO,AAAC,CAAC,AACvB,OAAO,CAAE,GAAG,CACZ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,MAAM,CACb,GAAG,CAAE,OAAO,CACZ,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACtB,cAAc,CAAE,IAAI,AACrB,CAAC,AAED,MAAM,kBAAC,CAAC,AACP,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,AACX,CAAC,AAED,QAAQ,kBAAC,CAAC,AACT,cAAc,CAAE,IAAI,CACpB,OAAO,CAAE,GAAG,CAAC,KAAK,CAClB,SAAS,CAAE,IAAI,AAChB,CAAC,AAED,0BAAQ,CAAC,IAAI,kBAAC,CAAC,AACd,GAAG,CAAE,MAAM,AACZ,CAAC\"}"
};

var warned = false;
Index.renderCss = function() {
	if (!warned) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned = true;
	}

	var components = [];

	components.push({
		filename: Index.filename,
		css: Index.css && Index.css.code,
		map: Index.css && Index.css.map
	});

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
/* harmony default export */ __webpack_exports__["a"] = (Index);

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getComponentFromGist */
/* unused harmony export saveComponentAsGist */
const cache = {};

function request(method, url, data) {
	return new Promise((fulfil, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onload = () => {
			const response = JSON.parse(xhr.responseText);
			if (xhr.status >= 400) {
				reject(new Error(response.message));
			}
			fulfil(response);
		};
		xhr.onerror = reject;
		xhr.send(data);
	});
}

function get(url) {
	return request('GET', url);
}

function post(url, data) {
	return request('POST', url, data);
}

function getComponentFromGist(id) {
	let cancelled = false;

	if (!cache[id]) {
		cache[id] = get(`https://api.github.com/gists/${id}`)
			.catch(() => get(`/gists/${id}`))
			.then(gist => {
				const components = [];

				const componentFiles = Object.keys(gist.files).filter(file =>
					/\.(html|js)$/.test(file)
				);

				if (
					componentFiles.length === 1 &&
					componentFiles[0] === 'component.html'
				) {
					// legacy
					components.push({
						name: 'App',
						type: 'html',
						entry: true,
						source: gist.files['component.html'].content
					});
				} else {
					componentFiles.forEach(file => {
						const ext = /\.(html|js)$/.exec(file)[0];
						const name = file.slice(0, -ext.length);
						const type = ext.slice(1);

						const source = gist.files[file].content;

						components.push({ name, type, entry: name === 'App', source });
					});
				}

				const jsonFile = gist.files['data.json'];
				const json = (jsonFile && jsonFile.content) || '{}';

				return { components, json };
			})
			.catch(err => {
				cache[id] = null;
				throw err;
			});
	}

	const promise = cache[id].then(component => {
		if (cancelled) throw new Error(`Request was cancelled`);
		return component;
	});

	promise.cancel = () => {
		cancelled = true;
	};

	return promise;
}

function saveComponentAsGist(components, json) {
	const files = {
		'README.md': {
			content: `# Svelte component\n\nThis gist was generated by the [Svelte REPL](https://svelte.technology/repl). Visit https://svelte.technology/repl?gist=this_gist_id to see it.`
		},

		'data.json': {
			content: json
		}
	};

	components.forEach(component => {
		files[`${component.name}.${component.type}`] = {
			content: component.source
		};
	});

	const body = JSON.stringify({
		description: 'Svelte component',
		public: true,
		files
	});

	return post(`/gists`, body)
		.catch(() => post(`https://api.github.com/gists`, body))
		.then(gist => gist.id);
}


/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function debounce(fn, delay) {
	let timeout;

	return function() {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			fn.apply(this, arguments);
		}, delay || 250);
	};
}


/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = script;
const cache = {};

function script(src) {
	if (!cache[src]) {
		cache[src] = new Promise((fulfil, reject) => {
			const script = document.createElement('script');

			script.onload = fulfil;

			script.onerror = err => {
				cache[src] = null;
				reject(err);
			};

			script.src = src;

			document.querySelector('head').appendChild(script);
		});
	}

	return cache[src];
}

// export function css(href) {
// 	if (!cache[href]) {
// 		cache[href] = new Promise((fulfil, reject) => {
// 			const link = document.createElement('link');

// 			link.onload = fulfil;

// 			link.onerror = err => {
// 				cache[href] = null;
// 				reject(err);
// 			};

// 			link.rel = 'stylesheet';
// 			link.href = href;

// 			document.querySelector('head').appendChild(link);
// 		});
// 	}

// 	return cache[href];
// }


/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export get */
// TODO do we need this?
function get(url, options = {}) {
	return new Promise((fulfil, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);

		xhr.responseType = options.responseType || 'text';

		xhr.onload = () => {
			fulfil(xhr.response);
		};

		xhr.onerror = reject;

		xhr.send();
	});
}


/***/ })

/******/ });