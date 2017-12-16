/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		10: 0
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
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + ({"0":"repl","1":"blog","2":"_","3":"blog_$slug$","4":"guide"}[chunkId]||chunkId) + "." + chunkId + "." + "fb1c84d729fdd4a9dfa4" + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
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
/******/ 	__webpack_require__.p = "/client/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_208311_Development_SVELTE_sapper_runtime_app_js__ = __webpack_require__(1);


__WEBPACK_IMPORTED_MODULE_0__Users_208311_Development_SVELTE_sapper_runtime_app_js__["a" /* default */].init(document.querySelector('#sapper'), [
	{ pattern: /^\/repl$/, params: match => ({}), load: () => __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 2)) },
	{ pattern: /^\/blog$/, params: match => ({}), load: () => __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 3)) },
	{ pattern: /^\/guide$/, params: match => ({}), load: () => __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, 4)) },
	{ pattern: /^\/$/, params: match => ({}), load: () => __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 5)) },
	{ pattern: /^\/blog\/([^\/]+)$/, params: match => ({ slug: match[1] }), load: () => __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 6)) }
]);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const detach = node => {
	node.parentNode.removeChild(node);
};

let component;

const scroll_history = {};
let uid = 1;
let cid;

if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual'
}

const app = {
	init(target, routes) {
		function select_route(url) {
			if (url.origin !== window.location.origin) return null;

			for (const route of routes) {
				const match = route.pattern.exec(url.pathname);
				if (match) {
					const params = route.params(match);

					const query = {};
					for (const [key, value] of url.searchParams) query[key] = value || true;

					return { route, data: { params, query } };
				}
			}
		}

		function render(Component, data, scroll) {
			Promise.resolve(
				Component.preload ? Component.preload(data) : {}
			).then(preloaded => {
				if (component) {
					component.destroy();
				} else {
					// first load — remove SSR'd <head> contents
					const start = document.querySelector('#sapper-head-start');
					let end = document.querySelector('#sapper-head-end');

					if (start && end) {
						while (start.nextSibling !== end) detach(start.nextSibling);
						detach(start);
						detach(end);
					}

					// preload additional routes
					routes.reduce((promise, route) => promise.then(route.load), Promise.resolve());
				}

				component = new Component({
					target,
					data: Object.assign(data, preloaded),
					hydrate: !!component
				});

				if (scroll) {
					window.scrollTo(scroll.x, scroll.y);
				}
			});
		}

		function navigate(url, id) {
			const selected = select_route(url);
			if (selected) {
				if (id) {
					// popstate or initial navigation
					cid = id;
				} else {
					// clicked on a link. preserve scroll state
					scroll_history[cid] = scroll_state();

					id = cid = ++uid;
					scroll_history[cid] = { x: 0, y: 0 };

					history.pushState({ id }, '', url.href);
				}

				selected.route.load().then(mod => {
					render(mod.default, selected.data, scroll_history[id]);
				});

				cid = id;
				return true;
			}
		}

		function findAnchor(node) {
			while (node && node.nodeName.toUpperCase() !== 'A') node = node.parentNode; // SVG <a> elements have a lowercase name
			return node;
		}

		window.addEventListener('click', event => {
			// Adapted from https://github.com/visionmedia/page.js
			// MIT license https://github.com/visionmedia/page.js#license
			if (which(event) !== 1) return;
			if (event.metaKey || event.ctrlKey || event.shiftKey) return;
			if (event.defaultPrevented) return;

			const a = findAnchor(event.target);
			if (!a) return;

			// check if link is inside an svg
			// in this case, both href and target are always inside an object
			const svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
			const href = svg ? a.href.baseVal : a.href;

			if (href === window.location.href) return;

			// Ignore if tag has
			// 1. 'download' attribute
			// 2. rel='external' attribute
			if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return;

			// Ignore if <a> has a target
			if (svg ? a.target.baseVal : a.target) return;

			const url = new URL(href);

			// Don't handle hash changes
			if (url.pathname === window.location.pathname && url.search === window.location.search) return;

			if (navigate(url, null)) {
				event.preventDefault();
			}
		});

		function preload(event) {
			const a = findAnchor(event.target);
			if (!a || a.rel !== 'prefetch') return;

			const selected = select_route(new URL(a.href));

			if (selected) {
				selected.route.load().then(mod => {
					if (mod.default.preload) mod.default.preload(selected.data);
				});
			}
		}

		window.addEventListener('touchstart', preload);
		window.addEventListener('mouseover', preload);

		window.addEventListener('popstate', event => {
			scroll_history[cid] = scroll_state();

			if (event.state) {
				navigate(new URL(window.location), event.state.id);
			} else {
				// hashchange
				cid = ++uid;
				history.replaceState({ id: cid }, '', window.location.href);
			}
		});

		const scroll = scroll_history[uid] = scroll_state();

		history.replaceState({ id: uid }, '', window.location.href);
		navigate(new URL(window.location), uid);
	}
};

function which(event) {
	event = event || window.event;
	return event.which === null ? event.button : event.which;
}

function scroll_state() {
	return {
		x: window.scrollX,
		y: window.scrollY
	};
}

/* harmony default export */ __webpack_exports__["a"] = (app);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmIxYzg0ZDcyOWZkZDRhOWRmYTQiLCJ3ZWJwYWNrOi8vLy4vLnNhcHBlci9tYWluLmpzIiwid2VicGFjazovLy8uLi9zYXBwZXIvcnVudGltZS9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxXQUFXLEVBQUU7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVEQUErQyw0REFBNEQ7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQSxrREFBMEMsb0JBQW9CLFdBQVc7O0FBRXpFO0FBQ0E7Ozs7Ozs7Ozs7QUMvSUE7O0FBRUE7QUFDQSxFQUFFLDBDQUEwQywrRkFBbUk7QUFDL0ssRUFBRSwwQ0FBMEMsK0ZBQW1JO0FBQy9LLEVBQUUsMkNBQTJDLCtGQUFxSTtBQUNsTCxFQUFFLHNDQUFzQywrRkFBMkg7QUFDbkssRUFBRSxtREFBbUQsaUJBQWlCO0FBQ3RFLEc7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGFBQWEsZUFBZSxnQkFBZ0I7QUFDNUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLDRCQUE0Qjs7QUFFNUIsd0JBQXdCLEtBQUs7QUFDN0I7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4RUFBOEU7QUFDOUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQSx3QkFBd0IsVUFBVTtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhEIiwiZmlsZSI6Im1haW4uZmIxYzg0ZDcyOWZkZDRhOWRmYTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gd2luZG93W1wid2VicGFja0pzb25wXCJdO1xuIFx0d2luZG93W1wid2VicGFja0pzb25wXCJdID0gZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBleGVjdXRlTW9kdWxlcykge1xuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW10sIHJlc3VsdDtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGNodW5rSWRzLCBtb3JlTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMpO1xuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0cyB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHQxMDogMFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgPT09IDApIHtcbiBcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkgeyByZXNvbHZlKCk7IH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZENodW5rRGF0YVsyXTtcbiBcdFx0fVxuXG4gXHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0fSk7XG4gXHRcdGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2U7XG5cbiBcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xuIFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDAwMDtcblxuIFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0fVxuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCIwXCI6XCJyZXBsXCIsXCIxXCI6XCJibG9nXCIsXCIyXCI6XCJfXCIsXCIzXCI6XCJibG9nXyRzbHVnJFwiLFwiNFwiOlwiZ3VpZGVcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuXCIgKyBjaHVua0lkICsgXCIuXCIgKyBcImZiMWM4NGQ3MjlmZGQ0YTlkZmE0XCIgKyBcIi5qc1wiO1xuIFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZSwgMTIwMDAwKTtcbiBcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0ZnVuY3Rpb24gb25TY3JpcHRDb21wbGV0ZSgpIHtcbiBcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRjaHVua1sxXShuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC4nKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiBcdFx0cmV0dXJuIHByb21pc2U7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9jbGllbnQvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZiMWM4NGQ3MjlmZGQ0YTlkZmE0IiwiaW1wb3J0IGFwcCBmcm9tICcvVXNlcnMvMjA4MzExL0RldmVsb3BtZW50L1NWRUxURS9zYXBwZXIvcnVudGltZS9hcHAuanMnO1xuXG5hcHAuaW5pdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FwcGVyJyksIFtcblx0eyBwYXR0ZXJuOiAvXlxcL3JlcGwkLywgcGFyYW1zOiBtYXRjaCA9PiAoe30pLCBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJyZXBsXCIgKi8gJy9Vc2Vycy8yMDgzMTEvRGV2ZWxvcG1lbnQvU1ZFTFRFL3N2ZWx0ZS50ZWNobm9sb2d5L3JvdXRlcy9yZXBsL2luZGV4Lmh0bWwnKSB9LFxuXHR7IHBhdHRlcm46IC9eXFwvYmxvZyQvLCBwYXJhbXM6IG1hdGNoID0+ICh7fSksIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcImJsb2dcIiAqLyAnL1VzZXJzLzIwODMxMS9EZXZlbG9wbWVudC9TVkVMVEUvc3ZlbHRlLnRlY2hub2xvZ3kvcm91dGVzL2Jsb2cvaW5kZXguaHRtbCcpIH0sXG5cdHsgcGF0dGVybjogL15cXC9ndWlkZSQvLCBwYXJhbXM6IG1hdGNoID0+ICh7fSksIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcImd1aWRlXCIgKi8gJy9Vc2Vycy8yMDgzMTEvRGV2ZWxvcG1lbnQvU1ZFTFRFL3N2ZWx0ZS50ZWNobm9sb2d5L3JvdXRlcy9ndWlkZS9pbmRleC5odG1sJykgfSxcblx0eyBwYXR0ZXJuOiAvXlxcLyQvLCBwYXJhbXM6IG1hdGNoID0+ICh7fSksIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIl9cIiAqLyAnL1VzZXJzLzIwODMxMS9EZXZlbG9wbWVudC9TVkVMVEUvc3ZlbHRlLnRlY2hub2xvZ3kvcm91dGVzL2luZGV4Lmh0bWwnKSB9LFxuXHR7IHBhdHRlcm46IC9eXFwvYmxvZ1xcLyhbXlxcL10rKSQvLCBwYXJhbXM6IG1hdGNoID0+ICh7IHNsdWc6IG1hdGNoWzFdIH0pLCBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJibG9nXyRzbHVnJFwiICovICcvVXNlcnMvMjA4MzExL0RldmVsb3BtZW50L1NWRUxURS9zdmVsdGUudGVjaG5vbG9neS9yb3V0ZXMvYmxvZy9bc2x1Z10uaHRtbCcpIH1cbl0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vLnNhcHBlci9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTAiLCJjb25zdCBkZXRhY2ggPSBub2RlID0+IHtcblx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xufTtcblxubGV0IGNvbXBvbmVudDtcblxuY29uc3Qgc2Nyb2xsX2hpc3RvcnkgPSB7fTtcbmxldCB1aWQgPSAxO1xubGV0IGNpZDtcblxuaWYgKCdzY3JvbGxSZXN0b3JhdGlvbicgaW4gaGlzdG9yeSkge1xuXHRoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gJ21hbnVhbCdcbn1cblxuY29uc3QgYXBwID0ge1xuXHRpbml0KHRhcmdldCwgcm91dGVzKSB7XG5cdFx0ZnVuY3Rpb24gc2VsZWN0X3JvdXRlKHVybCkge1xuXHRcdFx0aWYgKHVybC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHJldHVybiBudWxsO1xuXG5cdFx0XHRmb3IgKGNvbnN0IHJvdXRlIG9mIHJvdXRlcykge1xuXHRcdFx0XHRjb25zdCBtYXRjaCA9IHJvdXRlLnBhdHRlcm4uZXhlYyh1cmwucGF0aG5hbWUpO1xuXHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRjb25zdCBwYXJhbXMgPSByb3V0ZS5wYXJhbXMobWF0Y2gpO1xuXG5cdFx0XHRcdFx0Y29uc3QgcXVlcnkgPSB7fTtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiB1cmwuc2VhcmNoUGFyYW1zKSBxdWVyeVtrZXldID0gdmFsdWUgfHwgdHJ1ZTtcblxuXHRcdFx0XHRcdHJldHVybiB7IHJvdXRlLCBkYXRhOiB7IHBhcmFtcywgcXVlcnkgfSB9O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVuZGVyKENvbXBvbmVudCwgZGF0YSwgc2Nyb2xsKSB7XG5cdFx0XHRQcm9taXNlLnJlc29sdmUoXG5cdFx0XHRcdENvbXBvbmVudC5wcmVsb2FkID8gQ29tcG9uZW50LnByZWxvYWQoZGF0YSkgOiB7fVxuXHRcdFx0KS50aGVuKHByZWxvYWRlZCA9PiB7XG5cdFx0XHRcdGlmIChjb21wb25lbnQpIHtcblx0XHRcdFx0XHRjb21wb25lbnQuZGVzdHJveSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGZpcnN0IGxvYWQg4oCUIHJlbW92ZSBTU1InZCA8aGVhZD4gY29udGVudHNcblx0XHRcdFx0XHRjb25zdCBzdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzYXBwZXItaGVhZC1zdGFydCcpO1xuXHRcdFx0XHRcdGxldCBlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FwcGVyLWhlYWQtZW5kJyk7XG5cblx0XHRcdFx0XHRpZiAoc3RhcnQgJiYgZW5kKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAoc3RhcnQubmV4dFNpYmxpbmcgIT09IGVuZCkgZGV0YWNoKHN0YXJ0Lm5leHRTaWJsaW5nKTtcblx0XHRcdFx0XHRcdGRldGFjaChzdGFydCk7XG5cdFx0XHRcdFx0XHRkZXRhY2goZW5kKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBwcmVsb2FkIGFkZGl0aW9uYWwgcm91dGVzXG5cdFx0XHRcdFx0cm91dGVzLnJlZHVjZSgocHJvbWlzZSwgcm91dGUpID0+IHByb21pc2UudGhlbihyb3V0ZS5sb2FkKSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29tcG9uZW50ID0gbmV3IENvbXBvbmVudCh7XG5cdFx0XHRcdFx0dGFyZ2V0LFxuXHRcdFx0XHRcdGRhdGE6IE9iamVjdC5hc3NpZ24oZGF0YSwgcHJlbG9hZGVkKSxcblx0XHRcdFx0XHRoeWRyYXRlOiAhIWNvbXBvbmVudFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoc2Nyb2xsKSB7XG5cdFx0XHRcdFx0d2luZG93LnNjcm9sbFRvKHNjcm9sbC54LCBzY3JvbGwueSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG5hdmlnYXRlKHVybCwgaWQpIHtcblx0XHRcdGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0X3JvdXRlKHVybCk7XG5cdFx0XHRpZiAoc2VsZWN0ZWQpIHtcblx0XHRcdFx0aWYgKGlkKSB7XG5cdFx0XHRcdFx0Ly8gcG9wc3RhdGUgb3IgaW5pdGlhbCBuYXZpZ2F0aW9uXG5cdFx0XHRcdFx0Y2lkID0gaWQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gY2xpY2tlZCBvbiBhIGxpbmsuIHByZXNlcnZlIHNjcm9sbCBzdGF0ZVxuXHRcdFx0XHRcdHNjcm9sbF9oaXN0b3J5W2NpZF0gPSBzY3JvbGxfc3RhdGUoKTtcblxuXHRcdFx0XHRcdGlkID0gY2lkID0gKyt1aWQ7XG5cdFx0XHRcdFx0c2Nyb2xsX2hpc3RvcnlbY2lkXSA9IHsgeDogMCwgeTogMCB9O1xuXG5cdFx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUoeyBpZCB9LCAnJywgdXJsLmhyZWYpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2VsZWN0ZWQucm91dGUubG9hZCgpLnRoZW4obW9kID0+IHtcblx0XHRcdFx0XHRyZW5kZXIobW9kLmRlZmF1bHQsIHNlbGVjdGVkLmRhdGEsIHNjcm9sbF9oaXN0b3J5W2lkXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGNpZCA9IGlkO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmaW5kQW5jaG9yKG5vZGUpIHtcblx0XHRcdHdoaWxlIChub2RlICYmIG5vZGUubm9kZU5hbWUudG9VcHBlckNhc2UoKSAhPT0gJ0EnKSBub2RlID0gbm9kZS5wYXJlbnROb2RlOyAvLyBTVkcgPGE+IGVsZW1lbnRzIGhhdmUgYSBsb3dlcmNhc2UgbmFtZVxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXHRcdFx0Ly8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS92aXNpb25tZWRpYS9wYWdlLmpzXG5cdFx0XHQvLyBNSVQgbGljZW5zZSBodHRwczovL2dpdGh1Yi5jb20vdmlzaW9ubWVkaWEvcGFnZS5qcyNsaWNlbnNlXG5cdFx0XHRpZiAod2hpY2goZXZlbnQpICE9PSAxKSByZXR1cm47XG5cdFx0XHRpZiAoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KSByZXR1cm47XG5cdFx0XHRpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuXG5cdFx0XHRjb25zdCBhID0gZmluZEFuY2hvcihldmVudC50YXJnZXQpO1xuXHRcdFx0aWYgKCFhKSByZXR1cm47XG5cblx0XHRcdC8vIGNoZWNrIGlmIGxpbmsgaXMgaW5zaWRlIGFuIHN2Z1xuXHRcdFx0Ly8gaW4gdGhpcyBjYXNlLCBib3RoIGhyZWYgYW5kIHRhcmdldCBhcmUgYWx3YXlzIGluc2lkZSBhbiBvYmplY3Rcblx0XHRcdGNvbnN0IHN2ZyA9IHR5cGVvZiBhLmhyZWYgPT09ICdvYmplY3QnICYmIGEuaHJlZi5jb25zdHJ1Y3Rvci5uYW1lID09PSAnU1ZHQW5pbWF0ZWRTdHJpbmcnO1xuXHRcdFx0Y29uc3QgaHJlZiA9IHN2ZyA/IGEuaHJlZi5iYXNlVmFsIDogYS5ocmVmO1xuXG5cdFx0XHRpZiAoaHJlZiA9PT0gd2luZG93LmxvY2F0aW9uLmhyZWYpIHJldHVybjtcblxuXHRcdFx0Ly8gSWdub3JlIGlmIHRhZyBoYXNcblx0XHRcdC8vIDEuICdkb3dubG9hZCcgYXR0cmlidXRlXG5cdFx0XHQvLyAyLiByZWw9J2V4dGVybmFsJyBhdHRyaWJ1dGVcblx0XHRcdGlmIChhLmhhc0F0dHJpYnV0ZSgnZG93bmxvYWQnKSB8fCBhLmdldEF0dHJpYnV0ZSgncmVsJykgPT09ICdleHRlcm5hbCcpIHJldHVybjtcblxuXHRcdFx0Ly8gSWdub3JlIGlmIDxhPiBoYXMgYSB0YXJnZXRcblx0XHRcdGlmIChzdmcgPyBhLnRhcmdldC5iYXNlVmFsIDogYS50YXJnZXQpIHJldHVybjtcblxuXHRcdFx0Y29uc3QgdXJsID0gbmV3IFVSTChocmVmKTtcblxuXHRcdFx0Ly8gRG9uJ3QgaGFuZGxlIGhhc2ggY2hhbmdlc1xuXHRcdFx0aWYgKHVybC5wYXRobmFtZSA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICYmIHVybC5zZWFyY2ggPT09IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpIHJldHVybjtcblxuXHRcdFx0aWYgKG5hdmlnYXRlKHVybCwgbnVsbCkpIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIHByZWxvYWQoZXZlbnQpIHtcblx0XHRcdGNvbnN0IGEgPSBmaW5kQW5jaG9yKGV2ZW50LnRhcmdldCk7XG5cdFx0XHRpZiAoIWEgfHwgYS5yZWwgIT09ICdwcmVmZXRjaCcpIHJldHVybjtcblxuXHRcdFx0Y29uc3Qgc2VsZWN0ZWQgPSBzZWxlY3Rfcm91dGUobmV3IFVSTChhLmhyZWYpKTtcblxuXHRcdFx0aWYgKHNlbGVjdGVkKSB7XG5cdFx0XHRcdHNlbGVjdGVkLnJvdXRlLmxvYWQoKS50aGVuKG1vZCA9PiB7XG5cdFx0XHRcdFx0aWYgKG1vZC5kZWZhdWx0LnByZWxvYWQpIG1vZC5kZWZhdWx0LnByZWxvYWQoc2VsZWN0ZWQuZGF0YSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgcHJlbG9hZCk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHByZWxvYWQpO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgZXZlbnQgPT4ge1xuXHRcdFx0c2Nyb2xsX2hpc3RvcnlbY2lkXSA9IHNjcm9sbF9zdGF0ZSgpO1xuXG5cdFx0XHRpZiAoZXZlbnQuc3RhdGUpIHtcblx0XHRcdFx0bmF2aWdhdGUobmV3IFVSTCh3aW5kb3cubG9jYXRpb24pLCBldmVudC5zdGF0ZS5pZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBoYXNoY2hhbmdlXG5cdFx0XHRcdGNpZCA9ICsrdWlkO1xuXHRcdFx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZSh7IGlkOiBjaWQgfSwgJycsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGNvbnN0IHNjcm9sbCA9IHNjcm9sbF9oaXN0b3J5W3VpZF0gPSBzY3JvbGxfc3RhdGUoKTtcblxuXHRcdGhpc3RvcnkucmVwbGFjZVN0YXRlKHsgaWQ6IHVpZCB9LCAnJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXHRcdG5hdmlnYXRlKG5ldyBVUkwod2luZG93LmxvY2F0aW9uKSwgdWlkKTtcblx0fVxufTtcblxuZnVuY3Rpb24gd2hpY2goZXZlbnQpIHtcblx0ZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG5cdHJldHVybiBldmVudC53aGljaCA9PT0gbnVsbCA/IGV2ZW50LmJ1dHRvbiA6IGV2ZW50LndoaWNoO1xufVxuXG5mdW5jdGlvbiBzY3JvbGxfc3RhdGUoKSB7XG5cdHJldHVybiB7XG5cdFx0eDogd2luZG93LnNjcm9sbFgsXG5cdFx0eTogd2luZG93LnNjcm9sbFlcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3NhcHBlci9ydW50aW1lL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEwIl0sInNvdXJjZVJvb3QiOiIifQ==