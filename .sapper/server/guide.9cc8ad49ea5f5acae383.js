module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 227);
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

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_js__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_GuideContents_html__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout_html__ = __webpack_require__(183);




function throttle(fn, ms) {
	let blocked = false;

	function unblock() {
		blocked = false;
	};

	return function () {
		if (blocked) return;
		blocked = true;

		fn();
		setTimeout(unblock, ms);
	};
}

function preload() {
	return fetch(`/api/guide`).then(r => r.json()).then(sections => {
		return { sections };
	});
};

function store_1() {
	return __WEBPACK_IMPORTED_MODULE_0__store_js__["a" /* default */];
};

var Index = {};

Index.filename = "/Users/208311/Development/SVELTE/svelte.technology/routes/guide/index.html";

Index.data = function() {
	return {};
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

	state = Object.assign({}, state);

	return `${(__result.head += `
	<title>Learn Svelte</title>
`, "")}

${__WEBPACK_IMPORTED_MODULE_2__components_Layout_html__["a" /* default */]._render(__result, {page: "guide"}, { store: options.store, slotted: { default: () => `
	<div class="content" svelte-17738910>
		${ state.sections.map(section => `<section id="${section.slug}" svelte-17738910>
				<h2 svelte-17738910>${__escape(section.metadata.title)}</h2>
				${section.html}
			</section>`).join("")}
	</div>

	<div class="sidebar" svelte-17738910>
		${__WEBPACK_IMPORTED_MODULE_1__components_GuideContents_html__["a" /* default */]._render(__result, {}, { store: options.store })}
	</div>
` } })}`;
};

Index.css = {
	code: ".sidebar[svelte-17738910]{position:fixed;left:0;top:4em;width:14em;height:calc(100vh - 4em);display:none;font-family:Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";overflow-y:auto;padding:2em 1em 2em 1.5em}.content[svelte-17738910]{width:100%;padding:1em}h2[svelte-17738910]{padding:6rem 0 0 0;margin:-3rem 0 1rem 0;font-size:2.4em;font-weight:400;pointer-events:none}section[svelte-17738910] pre h2{margin:0 0 1em 0;padding:0.2em 0;border-bottom:1px solid rgba(0,0,0,0.1);font-size:1.2em;color:rgba(0,0,0,0.5)}section[svelte-17738910] h3{padding-top:6rem;font-size:1.2em;font-weight:800;margin:-3em 0 0 0;pointer-events:none}section[svelte-17738910] p{margin:0 0 1em 0;font-family:Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";font-weight:300;color:#181818;line-height:1.5}section[svelte-17738910] a{border-bottom:1px solid #e3d9d9}section[svelte-17738910] strong{font-weight:500}section[svelte-17738910] code{background-color:#f9f9f9;padding:0.2em 0.4em;border-radius:3px}section[svelte-17738910] pre code{padding:0}section[svelte-17738910]:first-child h3{border:none}section[svelte-17738910]{border-bottom:1px solid #eee;max-width:64em;margin:0 auto 2em auto;padding:0 0 4em 0}section[svelte-17738910]:last-child{border:none}section[svelte-17738910]>pre,section[svelte-17738910] .CodeMirror{background-color:#f9f9f9;border-left:2px solid #eee;padding:8px;margin:0 0 1em 0}section[svelte-17738910]>pre{padding:12px 8px 12px 12px;border-radius:3px}section[svelte-17738910] p,section[svelte-17738910] ul{max-width:48em}section[svelte-17738910] ul{line-height:1.5}section[svelte-17738910] li{margin:0}section[svelte-17738910] .open-in-repl{position:absolute;z-index:2;right:0}section[svelte-17738910] .open-in-repl::after{position:absolute;content:'open in repl';text-transform:uppercase;right:0.5em;top:0.5em;border:1px solid rgba(0,0,0,0.1);font-family:Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";font-weight:500;text-align:center;white-space:pre;padding:0.25em 0.5em 0.1em 0.5em;line-height:1;border-radius:0.1em;color:rgba(170,30,30,0.8);background-color:rgb(253,242,242)}section[svelte-17738910] .open-in-repl:hover::after{color:white;background-color:rgba(170,30,30,1)}section[svelte-17738910] blockquote{position:relative;color:#999;margin:1em 0;padding:0.5em 0 0.5em 2em;max-width:48em;border-top:1px solid #eee;border-bottom:1px solid #eee}section[svelte-17738910] blockquote p{color:#666}section[svelte-17738910] blockquote p:last-child{margin:0}section[svelte-17738910] blockquote::before{content:'!';position:absolute;left:0.5em;top:0.8em;color:rgba(170,0,0, 0.7);font-size:0.8em;font-weight:800;width:1em;height:1em;text-align:center;line-height:1;padding:0.15em 0.1em 0.1em 0.1em;border-radius:50%;border:2px solid rgba(170,30,30,0.7)}@media(min-width: 768px){.sidebar[svelte-17738910]{display:block}.content[svelte-17738910]{padding:0 2em 2em 16em}h2[svelte-17738910]{padding:7rem 0 0 0;margin:-4rem 0 1rem 0}section[svelte-17738910] h3{padding-top:7rem;margin:-4em 0 0 0}}",
	map: "{\"version\":3,\"file\":\"index.html\",\"sources\":[\"index.html\"],\"sourcesContent\":[\"<:Head>\\n\\t<title>Learn Svelte</title>\\n</:Head>\\n\\n<Layout page='guide'>\\n\\t<div ref:container class='content'>\\n\\t\\t{{#each sections as section}}\\n\\t\\t\\t<section id='{{section.slug}}'>\\n\\t\\t\\t\\t<h2>{{section.metadata.title}}</h2>\\n\\t\\t\\t\\t{{{section.html}}}\\n\\t\\t\\t</section>\\n\\t\\t{{/each}}\\n\\t</div>\\n\\n\\t<div class='sidebar'>\\n\\t\\t<GuideContents ref:contents/>\\n\\t</div>\\n</Layout>\\n\\n<style>\\n\\t.sidebar {\\n\\t\\tposition: fixed;\\n\\t\\tleft: 0;\\n\\t\\ttop: 4em;\\n\\t\\twidth: 14em;\\n\\t\\theight: calc(100vh - 4em);\\n\\t\\tdisplay: none;\\n\\t\\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", Helvetica, Arial, sans-serif, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\", \\\"Segoe UI Symbol\\\";\\n\\t\\toverflow-y: auto;\\n\\t\\tpadding: 2em 1em 2em 1.5em;\\n\\t}\\n\\n\\t.content {\\n\\t\\twidth: 100%;\\n\\t\\tpadding: 1em;\\n\\t}\\n\\n\\th2 {\\n\\t\\tpadding: 6rem 0 0 0;\\n\\t\\tmargin: -3rem 0 1rem 0;\\n\\t\\tfont-size: 2.4em;\\n\\t\\tfont-weight: 400;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\tsection :global(pre) :global(h2) {\\n\\t\\tmargin: 0 0 1em 0;\\n\\t\\tpadding: 0.2em 0;\\n\\t\\tborder-bottom: 1px solid rgba(0,0,0,0.1);\\n\\t\\tfont-size: 1.2em;\\n\\t\\tcolor: rgba(0,0,0,0.5);\\n\\t}\\n\\n\\tsection :global(h3) {\\n\\t\\tpadding-top: 6rem;\\n\\t\\tfont-size: 1.2em;\\n\\t\\tfont-weight: 800;\\n\\t\\tmargin: -3em 0 0 0;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\tsection :global(p) {\\n\\t\\tmargin: 0 0 1em 0;\\n\\t\\tfont-family: Roboto, -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", Helvetica, Arial, sans-serif, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\", \\\"Segoe UI Symbol\\\";\\n\\t\\tfont-weight: 300;\\n\\t\\tcolor: #181818;\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\tsection :global(a) {\\n\\t\\tborder-bottom: 1px solid #e3d9d9;\\n\\t}\\n\\n\\tsection :global(strong) {\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\n\\tsection :global(code) {\\n\\t\\tbackground-color: #f9f9f9;\\n\\t\\tpadding: 0.2em 0.4em;\\n\\t\\tborder-radius: 3px;\\n\\t}\\n\\n\\tsection :global(pre) :global(code) {\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\tsection:first-child :global(h3) {\\n\\t\\tborder: none;\\n\\t}\\n\\n\\tsection {\\n\\t\\tborder-bottom: 1px solid #eee;\\n\\t\\tmax-width: 64em;\\n\\t\\tmargin: 0 auto 2em auto;\\n\\t\\tpadding: 0 0 4em 0;\\n\\t}\\n\\n\\tsection:last-child {\\n\\t\\tborder: none;\\n\\t}\\n\\n\\tsection > :global(pre), section :global(.CodeMirror) {\\n\\t\\tbackground-color: #f9f9f9;\\n\\t\\tborder-left: 2px solid #eee;\\n\\t\\tpadding: 8px;\\n\\t\\tmargin: 0 0 1em 0;\\n\\t}\\n\\n\\tsection > :global(pre) {\\n\\t\\tpadding: 12px 8px 12px 12px;\\n\\t\\tborder-radius: 3px;\\n\\t}\\n\\n\\tsection :global(p), section :global(ul) {\\n\\t\\tmax-width: 48em;\\n\\t}\\n\\n\\tsection :global(ul) {\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\tsection :global(li) {\\n\\t\\tmargin: 0;\\n\\t}\\n\\n\\tsection :global(.open-in-repl) {\\n\\t\\tposition: absolute;\\n\\t\\tz-index: 2;\\n\\t\\tright: 0;\\n\\t}\\n\\n\\tsection :global(.open-in-repl::after) {\\n\\t\\tposition: absolute;\\n\\t\\tcontent: 'open in repl';\\n\\t\\ttext-transform: uppercase;\\n\\t\\tright: 0.5em;\\n\\t\\ttop: 0.5em;\\n\\t\\tborder: 1px solid rgba(0,0,0,0.1);\\n\\t\\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", Helvetica, Arial, sans-serif, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\", \\\"Segoe UI Symbol\\\";\\n\\t\\tfont-weight: 500;\\n\\t\\ttext-align: center;\\n\\t\\twhite-space: pre;\\n\\t\\tpadding: 0.25em 0.5em 0.1em 0.5em;\\n\\t\\tline-height: 1;\\n\\t\\tborder-radius: 0.1em;\\n\\t\\tcolor: rgba(170,30,30,0.8);\\n\\t\\tbackground-color: rgb(253,242,242);\\n\\t}\\n\\n\\tsection :global(.open-in-repl:hover::after) {\\n\\t\\tcolor: white;\\n\\t\\tbackground-color: rgba(170,30,30,1);\\n\\t}\\n\\n\\tsection :global(blockquote) {\\n\\t\\tposition: relative;\\n\\t\\tcolor: #999;\\n\\t\\tmargin: 1em 0;\\n\\t\\tpadding: 0.5em 0 0.5em 2em;\\n\\t\\tmax-width: 48em;\\n\\t\\tborder-top: 1px solid #eee;\\n\\t\\tborder-bottom: 1px solid #eee;\\n\\t}\\n\\n\\tsection :global(blockquote) :global(p) {\\n\\t\\tcolor: #666;\\n\\t}\\n\\n\\tsection :global(blockquote) :global(p:last-child) {\\n\\t\\tmargin: 0;\\n\\t}\\n\\n\\tsection :global(blockquote::before) {\\n\\t\\tcontent: '!';\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0.5em;\\n\\t\\ttop: 0.8em;\\n\\t\\tcolor: rgba(170,0,0, 0.7);\\n\\t\\tfont-size: 0.8em;\\n\\t\\tfont-weight: 800;\\n\\t\\twidth: 1em;\\n\\t\\theight: 1em;\\n\\t\\ttext-align: center;\\n\\t\\tline-height: 1;\\n\\t\\tpadding: 0.15em 0.1em 0.1em 0.1em;\\n\\t\\tborder-radius: 50%;\\n\\t\\tborder: 2px solid rgba(170,30,30,0.7);\\n\\t}\\n\\n\\t@media (min-width: 768px) {\\n\\t\\t.sidebar {\\n\\t\\t\\tdisplay: block;\\n\\t\\t}\\n\\n\\t\\t.content {\\n\\t\\t\\tpadding: 0 2em 2em 16em;\\n\\t\\t}\\n\\n\\t\\th2 {\\n\\t\\t\\tpadding: 7rem 0 0 0;\\n\\t\\t\\tmargin: -4rem 0 1rem 0;\\n\\t\\t}\\n\\n\\t\\tsection :global(h3) {\\n\\t\\t\\tpadding-top: 7rem;\\n\\t\\t\\tmargin: -4em 0 0 0;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<script>\\n\\timport store from '../_store.js';\\n\\timport GuideContents from '../_components/GuideContents.html';\\n\\timport Layout from '../_components/Layout.html';\\n\\n\\tfunction throttle(fn, ms) {\\n\\t\\tlet blocked = false;\\n\\n\\t\\tfunction unblock() {\\n\\t\\t\\tblocked = false;\\n\\t\\t};\\n\\n\\t\\treturn function () {\\n\\t\\t\\tif (blocked) return;\\n\\t\\t\\tblocked = true;\\n\\n\\t\\t\\tfn();\\n\\t\\t\\tsetTimeout(unblock, ms);\\n\\t\\t};\\n\\t}\\n\\n\\texport default {\\n\\t\\tstore() {\\n\\t\\t\\treturn store;\\n\\t\\t},\\n\\n\\t\\tpreload() {\\n\\t\\t\\treturn fetch(`/api/guide`).then(r => r.json()).then(sections => {\\n\\t\\t\\t\\treturn { sections };\\n\\t\\t\\t});\\n\\t\\t},\\n\\n\\t\\toncreate() {\\n\\t\\t\\tconst anchors = this.refs.container.querySelectorAll('[id]');\\n\\t\\t\\tlet positions;\\n\\n\\t\\t\\tconst onresize = () => {\\n\\t\\t\\t\\tconst { top } = this.refs.container.getBoundingClientRect();\\n\\t\\t\\t\\tpositions = [].map.call(anchors, anchor => {\\n\\t\\t\\t\\t\\treturn anchor.getBoundingClientRect().top - top;\\n\\t\\t\\t\\t});\\n\\t\\t\\t}\\n\\n\\t\\t\\tlet lastId = window.location.hash.slice(1);\\n\\n\\t\\t\\tconst onscroll = () => {\\n\\t\\t\\t\\tconst top = -window.scrollY;\\n\\n\\t\\t\\t\\tlet i = anchors.length;\\n\\t\\t\\t\\twhile (i--) {\\n\\t\\t\\t\\t\\tif (positions[i] + top < 40) {\\n\\t\\t\\t\\t\\t\\tconst anchor = anchors[i];\\n\\t\\t\\t\\t\\t\\tconst { id } = anchor;\\n\\n\\t\\t\\t\\t\\t\\tif (id !== lastId) {\\n\\t\\t\\t\\t\\t\\t\\tthis.store.set({ activeGuideSection: id });\\n\\t\\t\\t\\t\\t\\t\\tthis.fire('scroll', id);\\n\\n\\t\\t\\t\\t\\t\\t\\tlastId = id;\\n\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\treturn;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t};\\n\\n\\t\\t\\twindow.addEventListener('scroll', onscroll, true);\\n\\t\\t\\twindow.addEventListener('resize', onresize, true);\\n\\n\\t\\t\\t// wait for fonts to load...\\n\\t\\t\\tconst timeouts = [\\n\\t\\t\\t\\tsetTimeout(onresize, 1000),\\n\\t\\t\\t\\tsetTimeout(onresize, 5000)\\n\\t\\t\\t];\\n\\n\\t\\t\\tthis.on('destroy', () => {\\n\\t\\t\\t\\twindow.removeEventListener('scroll', onscroll, true);\\n\\t\\t\\t\\twindow.removeEventListener('resize', onresize, true);\\n\\n\\t\\t\\t\\ttimeouts.forEach(timeout => clearTimeout(timeout));\\n\\t\\t\\t});\\n\\n\\t\\t\\tonresize();\\n\\t\\t\\tonscroll();\\n\\t\\t},\\n\\n\\t\\tcomponents: {\\n\\t\\t\\tGuideContents,\\n\\t\\t\\tLayout\\n\\t\\t}\\n\\t};\\n</script>\"],\"names\":[],\"mappings\":\"AAoBC,QAAQ,iBAAC,CAAC,AACT,QAAQ,CAAE,KAAK,CACf,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,GAAG,CACR,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CACzB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,QAAQ,CAAC,CAAC,aAAa,CAAC,CAAC,kBAAkB,CAAC,CAAC,UAAU,CAAC,CAAC,SAAS,CAAC,CAAC,KAAK,CAAC,CAAC,UAAU,CAAC,CAAC,mBAAmB,CAAC,CAAC,gBAAgB,CAAC,CAAC,iBAAiB,CAC5J,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,AAC3B,CAAC,AAED,QAAQ,iBAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,GAAG,AACb,CAAC,AAED,EAAE,iBAAC,CAAC,AACH,OAAO,CAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,MAAM,CAAE,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CACtB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,IAAI,AACrB,CAAC,AAED,wBAAO,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,EAAE,AAAE,CAAC,AACjC,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,OAAO,CAAE,KAAK,CAAC,CAAC,CAChB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACxC,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,AACvB,CAAC,AAED,wBAAO,CAAC,AAAQ,EAAE,AAAE,CAAC,AACpB,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,cAAc,CAAE,IAAI,AACrB,CAAC,AAED,wBAAO,CAAC,AAAQ,CAAC,AAAE,CAAC,AACnB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,MAAM,CAAC,CAAC,aAAa,CAAC,CAAC,kBAAkB,CAAC,CAAC,UAAU,CAAC,CAAC,SAAS,CAAC,CAAC,KAAK,CAAC,CAAC,UAAU,CAAC,CAAC,mBAAmB,CAAC,CAAC,gBAAgB,CAAC,CAAC,iBAAiB,CAC1J,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,wBAAO,CAAC,AAAQ,CAAC,AAAE,CAAC,AACnB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,AACjC,CAAC,AAED,wBAAO,CAAC,AAAQ,MAAM,AAAE,CAAC,AACxB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,wBAAO,CAAC,AAAQ,IAAI,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,KAAK,CAAC,KAAK,CACpB,aAAa,CAAE,GAAG,AACnB,CAAC,AAED,wBAAO,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACnC,OAAO,CAAE,CAAC,AACX,CAAC,AAED,wBAAO,YAAY,CAAC,AAAQ,EAAE,AAAE,CAAC,AAChC,MAAM,CAAE,IAAI,AACb,CAAC,AAED,OAAO,iBAAC,CAAC,AACR,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC7B,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,CAAC,CAAC,IAAI,CAAC,GAAG,CAAC,IAAI,CACvB,OAAO,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AACnB,CAAC,AAED,wBAAO,WAAW,AAAC,CAAC,AACnB,MAAM,CAAE,IAAI,AACb,CAAC,AAED,wBAAO,CAAW,GAAG,AAAC,CAAE,wBAAO,CAAC,AAAQ,WAAW,AAAE,CAAC,AACrD,gBAAgB,CAAE,OAAO,CACzB,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC3B,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AAClB,CAAC,AAED,wBAAO,CAAW,GAAG,AAAE,CAAC,AACvB,OAAO,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,IAAI,CAC3B,aAAa,CAAE,GAAG,AACnB,CAAC,AAED,wBAAO,CAAC,AAAQ,CAAC,AAAC,CAAE,wBAAO,CAAC,AAAQ,EAAE,AAAE,CAAC,AACxC,SAAS,CAAE,IAAI,AAChB,CAAC,AAED,wBAAO,CAAC,AAAQ,EAAE,AAAE,CAAC,AACpB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,wBAAO,CAAC,AAAQ,EAAE,AAAE,CAAC,AACpB,MAAM,CAAE,CAAC,AACV,CAAC,AAED,wBAAO,CAAC,AAAQ,aAAa,AAAE,CAAC,AAC/B,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,CAAC,AACT,CAAC,AAED,wBAAO,CAAC,AAAQ,oBAAoB,AAAE,CAAC,AACtC,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,cAAc,CACvB,cAAc,CAAE,SAAS,CACzB,KAAK,CAAE,KAAK,CACZ,GAAG,CAAE,KAAK,CACV,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACjC,WAAW,CAAE,QAAQ,CAAC,CAAC,aAAa,CAAC,CAAC,kBAAkB,CAAC,CAAC,UAAU,CAAC,CAAC,SAAS,CAAC,CAAC,KAAK,CAAC,CAAC,UAAU,CAAC,CAAC,mBAAmB,CAAC,CAAC,gBAAgB,CAAC,CAAC,iBAAiB,CAC5J,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,MAAM,CAAC,KAAK,CAAC,KAAK,CAAC,KAAK,CACjC,WAAW,CAAE,CAAC,CACd,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,KAAK,GAAG,CAAC,EAAE,CAAC,EAAE,CAAC,GAAG,CAAC,CAC1B,gBAAgB,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,AACnC,CAAC,AAED,wBAAO,CAAC,AAAQ,0BAA0B,AAAE,CAAC,AAC5C,KAAK,CAAE,KAAK,CACZ,gBAAgB,CAAE,KAAK,GAAG,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,AACpC,CAAC,AAED,wBAAO,CAAC,AAAQ,UAAU,AAAE,CAAC,AAC5B,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CAAC,CAAC,CACb,OAAO,CAAE,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,GAAG,CAC1B,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC1B,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AAC9B,CAAC,AAED,wBAAO,CAAC,AAAQ,UAAU,AAAC,CAAC,AAAQ,CAAC,AAAE,CAAC,AACvC,KAAK,CAAE,IAAI,AACZ,CAAC,AAED,wBAAO,CAAC,AAAQ,UAAU,AAAC,CAAC,AAAQ,YAAY,AAAE,CAAC,AAClD,MAAM,CAAE,CAAC,AACV,CAAC,AAED,wBAAO,CAAC,AAAQ,kBAAkB,AAAE,CAAC,AACpC,OAAO,CAAE,GAAG,CACZ,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,KAAK,CACX,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACzB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,CAAC,CACd,OAAO,CAAE,MAAM,CAAC,KAAK,CAAC,KAAK,CAAC,KAAK,CACjC,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,EAAE,CAAC,EAAE,CAAC,GAAG,CAAC,AACtC,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,QAAQ,iBAAC,CAAC,AACT,OAAO,CAAE,KAAK,AACf,CAAC,AAED,QAAQ,iBAAC,CAAC,AACT,OAAO,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,AACxB,CAAC,AAED,EAAE,iBAAC,CAAC,AACH,OAAO,CAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,MAAM,CAAE,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,AACvB,CAAC,AAED,wBAAO,CAAC,AAAQ,EAAE,AAAE,CAAC,AACpB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AACnB,CAAC,AACF,CAAC\"}"
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

	addComponent(__WEBPACK_IMPORTED_MODULE_1__components_GuideContents_html__["a" /* default */]);
	addComponent(__WEBPACK_IMPORTED_MODULE_2__components_Layout_html__["a" /* default */]);

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

/***/ })

/******/ });