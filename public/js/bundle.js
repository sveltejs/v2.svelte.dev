(function () {
'use strict';

var a = document.createElement( 'a' );
var QUERYPAIR_REGEX = /^([\w\-]+)(?:=([^&]*))?$/;
var HANDLERS = [ 'beforeenter', 'enter', 'leave' ];

var isInitial = true;

function RouteData (ref) {
	var route = ref.route;
	var pathname = ref.pathname;
	var params = ref.params;
	var query = ref.query;
	var scrollX = ref.scrollX;
	var scrollY = ref.scrollY;

	this.pathname = pathname;
	this.params = params;
	this.query = query;
	this.isInitial = isInitial;
	this.scrollX = scrollX;
	this.scrollY = scrollY;

	this._route = route;

	isInitial = false;
}

RouteData.prototype = {
	matches: function matches ( href ) {
		return this._route.matches( href );
	}
};

function Route ( path, options ) {
	var this$1 = this;

	// strip leading slash
	if ( path[0] === '/' ) {
		path = path.slice( 1 );
	}

	this.path = path;
	this.segments = path.split( '/' );

	if ( typeof options === 'function' ) {
		options = {
			enter: options
		};
	}

	HANDLERS.forEach( function (handler) {
		this$1[ handler ] = function ( route, other ) {
			var value;

			if ( options[ handler ] ) {
				value = options[ handler ]( route, other );
			}

			return roadtrip.Promise.resolve( value );
		};
	});
}

Route.prototype = {
	matches: function matches$1 ( href ) {
		a.href = href;

		var pathname = a.pathname.slice( 1 );
		var segments = pathname.split( '/' );

		return segmentsMatch( segments, this.segments );
	},

	exec: function exec ( target ) {
		var this$1 = this;

		a.href = target.href;

		var pathname = a.pathname.slice( 1 );
		var search = a.search.slice( 1 );

		var segments = pathname.split( '/' );

		if ( segments.length !== this.segments.length ) {
			return false;
		}

		var params = {};

		for ( var i = 0; i < segments.length; i += 1 ) {
			var segment = segments[i];
			var toMatch = this$1.segments[i];

			if ( toMatch[0] === ':' ) {
				params[ toMatch.slice( 1 ) ] = segment;
			}

			else if ( segment !== toMatch ) {
				return false;
			}
		}

		var query = {};
		var queryPairs = search.split( '&' );

		for ( var i$1 = 0; i$1 < queryPairs.length; i$1 += 1 ) {
			var match = QUERYPAIR_REGEX.exec( queryPairs[i$1] );

			if ( match ) {
				var key = match[1];
				var value = decodeURIComponent( match[2] );

				if ( query.hasOwnProperty( key ) ) {
					if ( typeof query[ key ] !== 'object' ) {
						query[ key ] = [ query[ key ] ];
					}

					query[ key ].push( value );
				}

				else {
					query[ key ] = value;
				}
			}
		}

		return new RouteData({
			route: this,
			pathname: pathname,
			params: params,
			query: query,
			scrollX: target.scrollX,
			scrollY: target.scrollY
		});
	}
};

function segmentsMatch ( a, b ) {
	if ( a.length !== b.length ) { return; }

	var i = a.length;
	while ( i-- ) {
		if ( ( a[i] !== b[i] ) && ( b[i][0] !== ':' ) ) {
			return false;
		}
	}

	return true;
}

var routes = [];

// Adapted from https://github.com/visionmedia/page.js
// MIT license https://github.com/visionmedia/page.js#license

function watchLinks ( callback ) {
	window.addEventListener( 'click', handler, false );
	window.addEventListener( 'touchstart', handler, false );

	function handler ( event ) {
		if ( which( event ) !== 1 ) { return; }
		if ( event.metaKey || event.ctrlKey || event.shiftKey ) { return; }
		if ( event.defaultPrevented ) { return; }

		// ensure target is a link
		var el = event.target;
		while ( el && el.nodeName !== 'A' ) {
			el = el.parentNode;
		}

		if ( !el || el.nodeName !== 'A' ) { return; }

		// Ignore if tag has
		// 1. 'download' attribute
		// 2. rel='external' attribute
		if ( el.hasAttribute('download') || el.getAttribute('rel') === 'external' ) { return; }

		// ensure non-hash for the same path
		if ( el.pathname === location.pathname && ( el.hash ) ) { return; }

		// Check for mailto: in the href
		if ( ~el.href.indexOf( 'mailto:' ) ) { return; }

		// check target
		if ( el.target ) { return; }

		// x-origin
		if ( !sameOrigin( el.href ) ) { return; }

		// rebuild path
		var path = el.pathname + el.search + ( el.hash || '' );

		// strip leading '/[drive letter]:' on NW.js on Windows
		if ( typeof process !== 'undefined' && path.match( /^\/[a-zA-Z]:\// ) ) {
			path = path.replace( /^\/[a-zA-Z]:\//, '/' );
		}

		// same page
		var orig = path;

		if ( path.indexOf( roadtrip.base ) === 0 ) {
			path = path.substr( roadtrip.base.length );
		}

		if ( roadtrip.base && orig === path ) { return; }

		// no match? allow navigation
		if ( !routes.some( function (route) { return route.matches( orig ); } ) ) { return; }

		event.preventDefault();
		callback( orig );
	}
}

function which ( event ) {
	event = event || window.event;
	return event.which === null ? event.button : event.which;
}

function sameOrigin ( href ) {
	var origin = location.protocol + '//' + location.hostname;
	if ( location.port ) { origin += ':' + location.port; }

	return ( href && ( href.indexOf( origin ) === 0 ) );
}

function isSameRoute ( routeA, routeB, dataA, dataB ) {
	if ( routeA !== routeB ) {
		return false;
	}

	return deepEqual( dataA.params, dataB.params ) && deepEqual( dataA.query, dataB.query );
}

function deepEqual ( a, b ) {
	if ( a === null && b === null ) {
		return true;
	}

	if ( isArray( a ) && isArray( b ) ) {
		var i = a.length;

		if ( b.length !== i ) { return false; }

		while ( i-- ) {
			if ( !deepEqual( a[i], b[i] ) ) {
				return false;
			}
		}

		return true;
	}

	else if ( typeof a === 'object' && typeof b === 'object' ) {
		var aKeys = Object.keys( a );
		var bKeys = Object.keys( b );

		var i$1 = aKeys.length;

		if ( bKeys.length !== i$1 ) { return false; }

		while ( i$1-- ) {
			var key = aKeys[i$1];

			if ( !b.hasOwnProperty( key ) || !deepEqual( b[ key ], a[ key ] ) ) {
				return false;
			}
		}

		return true;
	}

	return a === b;
}

var toString = Object.prototype.toString;

function isArray ( thing ) {
	return toString.call( thing ) === '[object Array]';
}

// Enables HTML5-History-API polyfill: https://github.com/devote/HTML5-History-API
var location$1 = window.history.location || window.location;

function noop () {}

var currentData = {};
var currentRoute = {
	enter: function () { return roadtrip.Promise.resolve(); },
	leave: function () { return roadtrip.Promise.resolve(); }
};

var _target;
var isTransitioning = false;

var scrollHistory = {};
var uniqueID = 1;
var currentID = uniqueID;

var roadtrip = {
	base: '',
	Promise: window.Promise,

	add: function add ( path, options ) {
		routes.push( new Route( path, options ) );
		return roadtrip;
	},

	start: function start ( options ) {
		if ( options === void 0 ) { options = {}; }

		var href = routes.some( function (route) { return route.matches( location$1.href ); } ) ?
			location$1.href :
			options.fallback;

		return roadtrip.goto( href, {
			replaceState: true,
			scrollX: window.scrollX,
			scrollY: window.scrollY
		});
	},

	goto: function goto ( href, options ) {
		if ( options === void 0 ) { options = {}; }

		scrollHistory[ currentID ] = {
			x: window.scrollX,
			y: window.scrollY
		};

		var target;
		var promise = new roadtrip.Promise( function ( fulfil, reject ) {
			target = _target = {
				href: href,
				scrollX: options.scrollX || 0,
				scrollY: options.scrollY || 0,
				options: options,
				fulfil: fulfil,
				reject: reject
			};
		});

		if ( isTransitioning ) {
			return promise;
		}

		_goto( target );
		return promise;
	}
};

watchLinks( function (href) { return roadtrip.goto( href ); } );

// watch history
window.addEventListener( 'popstate', function (event) {
	if ( !event.state ) { return; } // hashchange, or otherwise outside roadtrip's control
	var scroll = scrollHistory[ event.state.uid ];

	_target = {
		href: location$1.href,
		scrollX: scroll.x,
		scrollY: scroll.y,
		popstate: true, // so we know not to manipulate the history
		fulfil: noop,
		reject: noop
	};

	_goto( _target );
	currentID = event.state.uid;
}, false );


function _goto ( target ) {
	var newRoute;
	var data;

	for ( var i = 0; i < routes.length; i += 1 ) {
		var route = routes[i];
		data = route.exec( target );

		if ( data ) {
			newRoute = route;
			break;
		}
	}

	if ( !newRoute || isSameRoute( newRoute, currentRoute, data, currentData ) ) {
		return target.fulfil();
	}

	scrollHistory[ currentID ] = {
		x: ( currentData.scrollX = window.scrollX ),
		y: ( currentData.scrollY = window.scrollY )
	};

	isTransitioning = true;

	roadtrip.Promise.all([
		currentRoute.leave( currentData, data ),
		newRoute.beforeenter( data, currentData )
	])
		.then( function () { return newRoute.enter( data, currentData ); } )
		.then( function () {
			currentRoute = newRoute;
			currentData = data;
		})
		.then( function () {
			isTransitioning = false;

			// if the user navigated while the transition was taking
			// place, we need to do it all again
			if ( _target !== target ) {
				_goto( _target );
			} else {
				target.fulfil();
			}
		})
		.catch( target.reject );

	if ( target.popstate ) { return; }

	var uid = target.options.replaceState ? currentID : ++uniqueID;
	history[ target.options.replaceState ? 'replaceState' : 'pushState' ]( { uid: uid }, '', target.href );

	currentID = uid;
	scrollHistory[ currentID ] = {
		x: target.scrollX,
		y: target.scrollY
	};
}

function appendNode ( node, target ) {
	target.appendChild( node );
}

function insertNode ( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function detachNode ( node ) {
	node.parentNode.removeChild( node );
}

function detachBetween ( before, after ) {
	while ( before.nextSibling && before.nextSibling !== after ) {
		before.parentNode.removeChild( before.nextSibling );
	}
}

function teardownEach ( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

function createElement ( name ) {
	return document.createElement( name );
}

function createText ( data ) {
	return document.createTextNode( data );
}

function createComment () {
	return document.createComment( '' );
}

function addEventListener ( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener ( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function setAttribute ( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function get ( key ) {
	return key ? this._state[ key ] : this._state;
}

function fire ( eventName, data ) {
	var this$1 = this;

	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
	if ( !handlers ) { return; }

	for ( var i = 0; i < handlers.length; i += 1 ) {
		handlers[i].call( this$1, data );
	}
}

function observe ( key, callback, options ) {
	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;

	( group[ key ] || ( group[ key ] = [] ) ).push( callback );

	if ( !options || options.init !== false ) {
		callback.__calling = true;
		callback.call( this, this._state[ key ] );
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[ key ].indexOf( callback );
			if ( ~index ) { group[ key ].splice( index, 1 ); }
		}
	};
}

function on ( eventName, handler ) {
	if ( eventName === 'teardown' ) { return this.on( 'destroy', handler ); }

	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
	handlers.push( handler );

	return {
		cancel: function () {
			var index = handlers.indexOf( handler );
			if ( ~index ) { handlers.splice( index, 1 ); }
		}
	};
}

function set ( newState ) {
	this._set( newState );
	( this._root || this )._flush();
}

function _flush () {
	var this$1 = this;

	if ( !this._renderHooks ) { return; }

	while ( this._renderHooks.length ) {
		var hook = this$1._renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

var proto = {
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	_flush: _flush
};

function noop$1 () {}

function dispatchObservers ( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) { continue; }

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) { continue; }

		var callbacks = group[ key ];
		if ( !callbacks ) { continue; }

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) { continue; }

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

var addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\n\t[svelte-1170664323].hero, [svelte-1170664323] .hero {\n\t\tposition: relative;\n\t\tpadding: 2em 1em;\n\t\t\n\t\tbackground-color: white;\n\t\tcolor: #333;\n\t\tclear: fix;\n\t\tmin-height: calc(100vh - 7em);\n\t\tbox-sizing: border-box;\n\t}\n\n\tul[svelte-1170664323], [svelte-1170664323] ul {\n\t\tmax-width: 32em;\n\t\tpadding: 0;\n\t\tmargin: 0 0 3em 0;\n\t}\n\n\tli[svelte-1170664323], [svelte-1170664323] li {\n\t\tposition: relative;\n\t\tlist-style: none;\n\t\tmargin: 0 0 1em 0;\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tcolor: #666;\n\t}\n\n\tli[svelte-1170664323]::before, [svelte-1170664323] li::before {\n\t\tposition: absolute;\n\t\tcontent: '◆';\n\t\ttop: 0em;\n\t\tleft: -1.4em;\n\t\tfont-size: 0.8em;\n\t\t\n\t\tcolor: #ddd;\n\t}\n\n\tstrong[svelte-1170664323], [svelte-1170664323] strong {\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tmargin: 0 auto;\n\t\tcolor: #333;\n\t}\n\n\t[svelte-1170664323].left, [svelte-1170664323] .left {\n\t\tpadding: 0 0 0 1em;\n\t}\n\n\th1[svelte-1170664323], [svelte-1170664323] h1 {\n\t\tdisplay: block;\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tcolor: rgb(170,30,30);\n\t\tfont-size: 30vw;\n\t\tfont-weight: 300;\n\t\tline-height: 1;\n\t\tmargin: 0;\n\t\ttext-transform: lowercase;\n\t\tpadding: 0.5em 0 0 0;\n\t}\n\n\t[svelte-1170664323].right, [svelte-1170664323] .right {\n\t\tpadding: 0 0 0 1em;\n\t\tmargin: 0 0 2em 0;\n\t}\n\n\th2[svelte-1170664323], [svelte-1170664323] h2 {\n\t\tfont-size: 7.2vw;\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tfont-weight: 300;\n\t\tdisplay: block;\n\t\tmargin: 0 0 4rem 0;\n\t\tmax-width: 11em;\n\t}\n\n\t[svelte-1170664323].learn-svelte, [svelte-1170664323] .learn-svelte {\n\t\tbackground-color: rgb(170,30,30);\n\t\tcolor: white;\n\t\tpadding: 0.5em 2em;\n\t\tborder-radius: 0.2em;\n\t\tline-height: 1;\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tfont-size: 1.2em;\n\t\tfont-weight: 800;\n\t\ttext-transform: uppercase;\n\t\twidth: calc(100% - 1em);\n\t\tmax-width: 16em;\n\t\tdisplay: block;\n\t\ttext-align: center;\n\t}\n\n\t[svelte-1170664323].learn-svelte:hover, [svelte-1170664323] .learn-svelte:hover {\n\t\tbackground-color: rgba(170,30,30,0.9);\n\t}\n\n\t@media (min-width: 480px) {\n\t\t[svelte-1170664323].left, [svelte-1170664323] .left, [svelte-1170664323].right, [svelte-1170664323] .right {\n\t\t\tmax-width: 32em;\n\t\t\tmargin: 0 auto;\n\t\t}\n\n\t\th1[svelte-1170664323], [svelte-1170664323] h1 {\n\t\t\tfont-size: 8em;\n\t\t}\n\n\t\th2[svelte-1170664323], [svelte-1170664323] h2 {\n\t\t\tfont-size: 2em;\n\t\t\tmax-width: none;\n\t\t}\n\n\t\tli[svelte-1170664323], [svelte-1170664323] li {\n\t\t\tfont-size: 1.2em;\n\t\t}\n\t}\n\n\t@media (min-width: 960px) {\n\t\t[svelte-1170664323].hero, [svelte-1170664323] .hero {\n\t\t\tpadding: 6em 1em 2em 1em;\n\t\t\tmax-width: 64em;\n\t\t\tmargin: 0 auto;\n\t\t}\n\n\t\t[svelte-1170664323].left, [svelte-1170664323] .left {\n\t\t\tposition: relative;\n\t\t\tfloat: left;\n\t\t\twidth: 40%;\n\t\t\tbox-sizing: border-box;\n\t\t}\n\n\t\t[svelte-1170664323].right, [svelte-1170664323] .right {\n\t\t\tposition: relative;\n\t\t\tfloat: left;\n\t\t\twidth: 60%;\n\t\t\tbox-sizing: border-box;\n\t\t}\n\n\t\th1[svelte-1170664323], [svelte-1170664323] h1 {\n\t\t\tposition: relative;\n\t\t\tright: 3rem;\n\t\t\ttop: 1.4rem;\n\t\t\tfont-size: 8em;\n\t\t\ttext-align: right;\n\t\t}\n\n\t\th2[svelte-1170664323], [svelte-1170664323] h2 {\n\t\t\tfont-size: 2.8em;\n\t\t\tline-height: 1.2;\n\t\t\tmargin: 0 0 2rem 0;\n\t\t\tmax-width: 11em;\n\t\t}\n\t}\n\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-1170664323', '' );
	div.className = "hero";
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-1170664323', '' );
	div1.className = "left";
	
	appendNode( div1, div );
	
	var h1 = createElement( 'h1' );
	setAttribute( h1, 'svelte-1170664323', '' );
	
	appendNode( h1, div1 );
	appendNode( createText( "Svelte" ), h1 );
	appendNode( createText( "\n\n\t" ), div );
	
	var div2 = createElement( 'div' );
	setAttribute( div2, 'svelte-1170664323', '' );
	div2.className = "right";
	
	appendNode( div2, div );
	
	var h2 = createElement( 'h2' );
	setAttribute( h2, 'svelte-1170664323', '' );
	
	appendNode( h2, div2 );
	appendNode( createText( "The magical disappearing UI framework" ), h2 );
	appendNode( createText( "\n\n\t\t" ), div2 );
	
	var ul = createElement( 'ul' );
	setAttribute( ul, 'svelte-1170664323', '' );
	
	appendNode( ul, div2 );
	
	var li = createElement( 'li' );
	setAttribute( li, 'svelte-1170664323', '' );
	
	appendNode( li, ul );
	
	var strong = createElement( 'strong' );
	setAttribute( strong, 'svelte-1170664323', '' );
	
	appendNode( strong, li );
	appendNode( createText( "The web's JavaScript bloat crisis, solved." ), strong );
	appendNode( createText( " Svelte turns your templates into tiny, framework-less vanilla JavaScript." ), li );
	appendNode( createText( "\n\t\t\t" ), ul );
	
	var li1 = createElement( 'li' );
	setAttribute( li1, 'svelte-1170664323', '' );
	
	appendNode( li1, ul );
	
	var strong1 = createElement( 'strong' );
	setAttribute( strong1, 'svelte-1170664323', '' );
	
	appendNode( strong1, li1 );
	appendNode( createText( "Simple and familiar." ), strong1 );
	appendNode( createText( " Build apps out of composable, easy-to-write blocks using languages you already know." ), li1 );
	appendNode( createText( "\n\t\t\t" ), ul );
	
	var li2 = createElement( 'li' );
	setAttribute( li2, 'svelte-1170664323', '' );
	
	appendNode( li2, ul );
	
	var strong2 = createElement( 'strong' );
	setAttribute( strong2, 'svelte-1170664323', '' );
	
	appendNode( strong2, li2 );
	appendNode( createText( "Super fast, rock solid." ), strong2 );
	appendNode( createText( " Compile-time static analysis ensures the browser does no more work than it needs to." ), li2 );
	appendNode( createText( "\n\n\t\t" ), div2 );
	
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-1170664323', '' );
	a.className = "learn-svelte";
	a.href = "/guide";
	
	appendNode( a, div2 );
	appendNode( createText( "Learn Svelte" ), a );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: noop$1,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function Index ( options ) {
	options = options || {};
	this._state = options.data || {};
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss ) { addCss(); }
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) { this._fragment.mount( options.target, null ); }
}

Index.prototype = Object.assign( {}, proto );

Index.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) { this._fragment.update( newState, this._state ); }
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Index.prototype.teardown = Index.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var addedCss$1 = false;
function addCss$1 () {
	var style = createElement( 'style' );
	style.textContent = "\n\t[svelte-2573374625].posts, [svelte-2573374625] .posts {\n\t\t\n\t\t\n\t\tmin-height: calc(100vh - 3.9em);\n\t}\n\n\t[svelte-2573374625].post, [svelte-2573374625] .post {\n\t\tmax-width: 48em;\n\t\tmargin: 0 auto;\n\t\tpadding: 1em;\n\t\t\n\t}\n\n\th2[svelte-2573374625], [svelte-2573374625] h2 {\n\t\tfont-size: 1.8em;\n\t\tmargin: 0;\n\t\tfont-weight: 500;\n\t\tcolor: #333;\n\t}\n\n\t[svelte-2573374625].standfirst, [svelte-2573374625] .standfirst {\n\t\tfont-size: 1.4em;\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tline-height: 1.2;\n\t\tcolor: #888;\n\t\tfont-weight: 500;\n\t}\n\n\tp[svelte-2573374625], [svelte-2573374625] p {\n\t\tmargin: 0 0 1em 0;\n\t\tline-height: 1.5;\n\t}\n\n\t[svelte-2573374625].byline, [svelte-2573374625] .byline {\n\t\tfont-size: 0.8em;\n\t\tborder-top: 1px solid #eee;\n\t\tpadding: 0.5em 0;\n\t}\n\n\ttime[svelte-2573374625], [svelte-2573374625] time {\n\t\t\n\t}\n\n\tblockquote[svelte-2573374625], [svelte-2573374625] blockquote {\n\t\tcolor: #999;\n\t\tmargin: 1em 0;\n\t\tpadding: 0.5em 0 0.5em 1em;\n\t\tmax-width: 48em;\n\t\tbackground-color: #f9f9f9;\n\t\tborder-left: 2px solid #ddd;\n\t\t\n\t}\n\n\tp[svelte-2573374625], [svelte-2573374625] p {\n\t\tcolor: #666;\n\t}\n\n\t@media (min-width: 768px) {\n\t\th2[svelte-2573374625], [svelte-2573374625] h2 {\n\t\t\tfont-size: 2.4em;\n\t\t}\n\t}\n";
	appendNode( style, document.head );

	addedCss$1 = true;
}

function renderMainFragment$1 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-2573374625', '' );
	div.className = "posts";
	
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, div );
	var eachBlock_value = root.posts;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var eachBlock_value = root.posts;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock_iterations, false );
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, post, post__index, component ) {
	var article = createElement( 'article' );
	setAttribute( article, 'svelte-2573374625', '' );
	article.className = "post";
	
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-2573374625', '' );
	a.href = "/blog/" + ( post.slug );
	
	appendNode( a, article );
	
	var h2 = createElement( 'h2' );
	setAttribute( h2, 'svelte-2573374625', '' );
	
	appendNode( h2, a );
	var last_text = post.metadata.title;
	var text = createText( last_text );
	appendNode( text, h2 );
	appendNode( createText( "\n\t\t\t\t" ), a );
	
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-2573374625', '' );
	p.className = "standfirst";
	
	appendNode( p, a );
	var last_text2 = post.metadata.description;
	var text2 = createText( last_text2 );
	appendNode( text2, p );
	appendNode( createText( "\n\n\t\t\t" ), article );
	
	var p1 = createElement( 'p' );
	setAttribute( p1, 'svelte-2573374625', '' );
	p1.className = "byline";
	
	appendNode( p1, article );
	
	var a1 = createElement( 'a' );
	setAttribute( a1, 'svelte-2573374625', '' );
	var last_a1_href = post.metadata.authorURL;
	a1.href = last_a1_href;
	
	appendNode( a1, p1 );
	var last_text4 = post.metadata.author;
	var text4 = createText( last_text4 );
	appendNode( text4, a1 );
	appendNode( createText( "\n\t\t\t\t" ), p1 );
	
	var time = createElement( 'time' );
	setAttribute( time, 'svelte-2573374625', '' );
	var last_time_datetime = post.metadata.pubdate;
	time.dateTime = last_time_datetime;
	
	appendNode( time, p1 );
	var last_text6 = post.metadata.dateString;
	var text6 = createText( last_text6 );
	appendNode( text6, time );
	appendNode( createText( "\n\n\t\t\t\t" ), p1 );
	
	var a2 = createElement( 'a' );
	setAttribute( a2, 'svelte-2573374625', '' );
	a2.className = "continue-reading";
	a2.href = "/blog/" + ( post.slug );
	
	appendNode( a2, p1 );
	appendNode( createText( "continue reading »" ), a2 );

	return {
		mount: function ( target, anchor ) {
			insertNode( article, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, post, post__index ) {
			var __tmp;
		
			a.href = "/blog/" + ( post.slug );
			
			if ( ( __tmp = post.metadata.title ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			if ( ( __tmp = post.metadata.description ) !== last_text2 ) {
				text2.data = last_text2 = __tmp;
			}
			
			if ( ( __tmp = post.metadata.authorURL ) !== last_a1_href ) {
				last_a1_href = __tmp;
				a1.href = last_a1_href;
			}
			
			if ( ( __tmp = post.metadata.author ) !== last_text4 ) {
				text4.data = last_text4 = __tmp;
			}
			
			if ( ( __tmp = post.metadata.pubdate ) !== last_time_datetime ) {
				last_time_datetime = __tmp;
				time.dateTime = last_time_datetime;
			}
			
			if ( ( __tmp = post.metadata.dateString ) !== last_text6 ) {
				text6.data = last_text6 = __tmp;
			}
			
			a2.href = "/blog/" + ( post.slug );
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( article );
			}
		}
	};
}

function BlogIndex ( options ) {
	options = options || {};
	this._state = options.data || {};
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss$1 ) { addCss$1(); }
	
	this._fragment = renderMainFragment$1( this._state, this );
	if ( options.target ) { this._fragment.mount( options.target, null ); }
}

BlogIndex.prototype = Object.assign( {}, proto );

BlogIndex.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) { this._fragment.update( newState, this._state ); }
	dispatchObservers( this, this._observers.post, newState, oldState );
};

BlogIndex.prototype.teardown = BlogIndex.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var addedCss$2 = false;
function addCss$2 () {
	var style = createElement( 'style' );
	style.textContent = "\n\t[svelte-1445469362].post, [svelte-1445469362] .post {\n\t\tmax-width: 48em;\n\t\tmargin: 0 auto;\n\t\tpadding: 1em;\n\t\t\n\t}\n\n\tp[svelte-1445469362], [svelte-1445469362] p {\n\t\tmargin: 0 0 1em 0;\n\t\tline-height: 1.5;\n\t}\n\n\t[svelte-1445469362].byline, [svelte-1445469362] .byline {\n\t\tfont-size: 0.8em;\n\t\tborder-top: 1px solid #eee;\n\t\tpadding: 0.5em 0;\n\t}\n\n\ttime[svelte-1445469362], [svelte-1445469362] time {\n\t\t\n\t}\n\n\tp[svelte-1445469362], [svelte-1445469362] p {\n\t\tfont-weight: 300;\n\t\tcolor: #333;\n\t}\n\n\tp[svelte-1445469362]:last-child, [svelte-1445469362] p:last-child {\n\t\tmargin: 0;\n\t}\n\n\tstrong[svelte-1445469362], [svelte-1445469362] strong {\n\t\tcolor: #333;\n\t\tfont-weight: 700;\n\t}\n\n\tcode[svelte-1445469362], [svelte-1445469362] code {\n\t\tbackground-color: #f9f9f9;\n\t\tpadding: 0.2em 0.4em;\n\t\tborder-radius: 3px;\n\t}\n\n\t[svelte-1445469362].post, [svelte-1445469362] .post {\n\t\tpadding: 1em;\n\t}\n\n\th1[svelte-1445469362], [svelte-1445469362] h1, h2[svelte-1445469362], [svelte-1445469362] h2 {\n\t\tfont-size: 1.8em;\n\t\tmargin: 0;\n\t\tfont-weight: 500;\n\t}\n\n\th2[svelte-1445469362], [svelte-1445469362] h2 {\n\t\tcolor: #333;\n\t}\n\n\t[svelte-1445469362].standfirst, [svelte-1445469362] .standfirst {\n\t\tfont-size: 1.4em;\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tline-height: 1.2;\n\t\tcolor: #888;\n\t\tfont-weight: 500;\n\t}\n\n\tblockquote[svelte-1445469362], [svelte-1445469362] blockquote {\n\t\tcolor: #999;\n\t\tmargin: 1em 0;\n\t\tpadding: 0.5em 0 0.5em 1em;\n\t\tmax-width: 48em;\n\t\tbackground-color: #f9f9f9;\n\t\tborder-left: 2px solid #ddd;\n\t\t\n\t}\n\n\tblockquote[svelte-1445469362] p, [svelte-1445469362] blockquote p {\n\t\tcolor: #666;\n\t}\n\n\tblockquote[svelte-1445469362] strong, [svelte-1445469362] blockquote strong {\n\t\tdisplay: block;\n\t\tfont-weight: 300;\n\t\tfont-style: italic;\n\t\tcolor: #666;\n\t}\n\n\t@media (min-width: 768px) {\n\t\th1[svelte-1445469362], [svelte-1445469362] h1, h2[svelte-1445469362], [svelte-1445469362] h2 {\n\t\t\tfont-size: 2.4em;\n\t\t}\n\t}\n";
	appendNode( style, document.head );

	addedCss$2 = true;
}

function renderMainFragment$2 ( root, component ) {
	var article = createElement( 'article' );
	setAttribute( article, 'svelte-1445469362', '' );
	article.className = "post";
	
	var h1 = createElement( 'h1' );
	setAttribute( h1, 'svelte-1445469362', '' );
	
	appendNode( h1, article );
	var last_text = root.post.metadata.title;
	var text = createText( last_text );
	appendNode( text, h1 );
	appendNode( createText( "\n\t" ), article );
	
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-1445469362', '' );
	p.className = "standfirst";
	
	appendNode( p, article );
	var last_text2 = root.post.metadata.description;
	var text2 = createText( last_text2 );
	appendNode( text2, p );
	appendNode( createText( "\n\n\t" ), article );
	
	var p1 = createElement( 'p' );
	setAttribute( p1, 'svelte-1445469362', '' );
	p1.className = "byline";
	
	appendNode( p1, article );
	
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-1445469362', '' );
	var last_a_href = root.post.metadata.authorURL;
	a.href = last_a_href;
	
	appendNode( a, p1 );
	var last_text4 = root.post.metadata.author;
	var text4 = createText( last_text4 );
	appendNode( text4, a );
	appendNode( createText( " " ), p1 );
	
	var time = createElement( 'time' );
	setAttribute( time, 'svelte-1445469362', '' );
	var last_time_datetime = root.post.metadata.pubdate;
	time.dateTime = last_time_datetime;
	
	appendNode( time, p1 );
	var last_text6 = root.post.metadata.dateString;
	var text6 = createText( last_text6 );
	appendNode( text6, time );
	appendNode( createText( "\n\n\t" ), article );
	var raw_before = createElement( 'noscript' );
	appendNode( raw_before, article );
	var raw_after = createElement( 'noscript' );
	appendNode( raw_after, article );
	var last_raw = root.post.html;
	raw_before.insertAdjacentHTML( 'afterend', last_raw );

	return {
		mount: function ( target, anchor ) {
			insertNode( article, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = root.post.metadata.title ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			if ( ( __tmp = root.post.metadata.description ) !== last_text2 ) {
				text2.data = last_text2 = __tmp;
			}
			
			if ( ( __tmp = root.post.metadata.authorURL ) !== last_a_href ) {
				last_a_href = __tmp;
				a.href = last_a_href;
			}
			
			if ( ( __tmp = root.post.metadata.author ) !== last_text4 ) {
				text4.data = last_text4 = __tmp;
			}
			
			if ( ( __tmp = root.post.metadata.pubdate ) !== last_time_datetime ) {
				last_time_datetime = __tmp;
				time.dateTime = last_time_datetime;
			}
			
			if ( ( __tmp = root.post.metadata.dateString ) !== last_text6 ) {
				text6.data = last_text6 = __tmp;
			}
			
			if ( ( __tmp = root.post.html ) !== last_raw ) {
				last_raw = __tmp;
				detachBetween( raw_before, raw_after );
				raw_before.insertAdjacentHTML( 'afterend', last_raw );
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachBetween( raw_before, raw_after );
				
				detachNode( article );
			}
		}
	};
}

function BlogPost ( options ) {
	options = options || {};
	this._state = options.data || {};
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss$2 ) { addCss$2(); }
	
	this._fragment = renderMainFragment$2( this._state, this );
	if ( options.target ) { this._fragment.mount( options.target, null ); }
}

BlogPost.prototype = Object.assign( {}, proto );

BlogPost.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) { this._fragment.update( newState, this._state ); }
	dispatchObservers( this, this._observers.post, newState, oldState );
};

BlogPost.prototype.teardown = BlogPost.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var contents = [{"html":"<h3 id=\"what-is-svelte-\">What is Svelte?</h3>\n<p>If you&#39;ve ever built a JavaScript application, the chances are you&#39;ve encountered – or at least heard of – frameworks like React, Angular, Vue and Ractive. Like Svelte, these tools all share a goal of making it easy to build slick interactive user interfaces.</p>\n<p>But Svelte has a crucial difference: rather than interpreting your application code at <em>run time</em>, your app is converted into ideal JavaScript at <em>build time</em>. That means you don&#39;t pay the performance cost of the framework&#39;s abstractions, or incur a penalty when your app first loads.</p>\n<p>And because there&#39;s no overhead, you can easily adopt Svelte in an existing app incrementally, or ship widgets as standalone packages that work anywhere.</p>\n<p><a href=\"/blog/frameworks-without-the-framework\">Read the introductory blog post</a> to learn more about Svelte&#39;s goals and philosophy.</p>\n<h3 id=\"understanding-svelte-components\">Understanding Svelte components</h3>\n<p>In Svelte, an application is composed from one or more <em>components</em>. A component is a reusable self-contained block of code that encapsulates markup, styles and behaviours that belong together.</p>\n<p>Like Ractive and Vue, Svelte promotes the concept of <em>single-file components</em>: a component is just an <code>.html</code> file. Here&#39;s a simple example:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0MhLS0lMjBBcHAuaHRtbCUyMC0tJTNFJTVDbiUzQ2gxJTNFSGVsbG8lMjAlN0IlN0JuYW1lJTdEJTdEISUzQyUyRmgxJTNFJTVDbiUyMiUyQyUyMmRhdGElMjIlM0ElN0IlMjJuYW1lJTIyJTNBJTIyd29ybGQlMjIlN0QlN0Q='></a><pre><code><span class=\"hljs-comment\">&lt;!-- App.html --&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">h1</span>&gt;</span>Hello {{name}}!<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">h1</span>&gt;</span>\n</code></pre>\n<p>Svelte turns this into a JavaScript module that you can import into your app:</p>\n<pre><code><span class=\"hljs-comment\">// main.js</span>\n<span class=\"hljs-keyword\">import</span> App <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'./App.html'</span>;\n\n<span class=\"hljs-keyword\">const</span> app = <span class=\"hljs-keyword\">new</span> App({\n  <span class=\"hljs-attr\">target</span>: <span class=\"hljs-built_in\">document</span>.querySelector( <span class=\"hljs-string\">'main'</span> ),\n  <span class=\"hljs-attr\">data</span>: { <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">'world'</span> }\n});\n\n<span class=\"hljs-comment\">// change the data associated with the template</span>\napp.set({ <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">'everybody'</span> });\n\n<span class=\"hljs-comment\">// detach the component and clean everything up</span>\napp.teardown();\n</code></pre>\n<p>Congratulations, you&#39;ve just learned about half of Svelte&#39;s API!</p>\n<h3 id=\"getting-started\">Getting started</h3>\n<p>Normally, this is the part where the instructions might tell you to add the framework to your page as a <code>&lt;script&gt;</code> tag. But because Svelte runs at build time, it works a little bit differently.</p>\n<p>The best way to use Svelte is to integrate it into your build system – there are plugins for Rollup, Browserify, Gulp and others, with more on the way. See <a href=\"https://github.com/sveltejs/svelte/#svelte\">here</a> for an up-to-date list.</p>\n<p>Right now, for the purposes of demonstration, we&#39;ll use <a href=\"https://github.com/sveltejs/svelte-cli\">svelte-cli</a>, the command line interface.</p>\n<blockquote>\n<p>You will need to have <a href=\"https://nodejs.org/en/\">Node.js</a> installed, and have some familiarity with the command line</p>\n</blockquote>\n<p>First, install the CLI:</p>\n<pre><code>npm install -g svelte-cli\n</code></pre>\n<p>Then, create a directory for the project:</p>\n<pre><code>mkdir my-svelte-project\n<span class=\"hljs-built_in\">cd</span> my-svelte-project\n</code></pre>\n<p>Inside <code>my-svelte-project</code>, create a <code>HelloWorld.html</code> file with the following contents:</p>\n<pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">h1</span>&gt;</span>Hello {{name}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">h1</span>&gt;</span>\n</code></pre>\n<p>Compile it:</p>\n<pre><code>svelte compile --format iife HelloWorld.html &gt; HelloWorld.js\n</code></pre>\n<p>The <code>--format iife</code> bit means &#39;generate an immediately-invoked function expression&#39; – this allows us to use the component as a simple <code>&lt;script&gt;</code> tag. (By default, Svelte will create a JavaScript module instead, which is recommended for more serious applications but requires additional steps.)</p>\n<p>Create an <code>index.html</code> page and include the script we just generated:</p>\n<pre><code><span class=\"hljs-meta\">&lt;!doctype html&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">html</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">head</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">title</span>&gt;</span>My first Svelte app<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">title</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">head</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">body</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">main</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">main</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span> <span class=\"hljs-attr\">src</span>=<span class=\"hljs-string\">'HelloWorld.js'</span>&gt;</span><span class=\"undefined\"></span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n    <span class=\"hljs-keyword\">var</span> app = <span class=\"hljs-keyword\">new</span> HelloWorld({\n      <span class=\"hljs-attr\">target</span>: <span class=\"hljs-built_in\">document</span>.querySelector( <span class=\"hljs-string\">'main'</span> ),\n      <span class=\"hljs-attr\">data</span>: {\n        <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">'world'</span>\n      }\n    });\n  </span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">body</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">html</span>&gt;</span>\n</code></pre>\n<p>Finally, open the page in your browser – <code>open index.html</code> – and interact with <code>app</code> via the console using the API.</p>\n","metadata":{"title":"Introduction"},"subsections":[{"slug":"what-is-svelte-","title":"What is Svelte?"},{"slug":"understanding-svelte-components","title":"Understanding Svelte components"},{"slug":"getting-started","title":"Getting started"}],"slug":"introduction"},{"html":"<p>As we saw above, you create a component instance with the <code>new</code> keyword:</p>\n<pre><code><span class=\"hljs-keyword\">import</span> MyComponent <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'./MyComponent.html'</span>;\n\n<span class=\"hljs-keyword\">const</span> component = <span class=\"hljs-keyword\">new</span> MyComponent({\n  <span class=\"hljs-comment\">// `target` is the only required option – the element</span>\n  <span class=\"hljs-comment\">// to render the component to</span>\n  target: <span class=\"hljs-built_in\">document</span>.querySelector( <span class=\"hljs-string\">'main'</span> ),\n\n  <span class=\"hljs-comment\">// `data` is optional. A component can also have</span>\n  <span class=\"hljs-comment\">// default data – we'll learn about that later.</span>\n  data: {\n    <span class=\"hljs-attr\">questions</span>: [\n      <span class=\"hljs-string\">'life'</span>,\n      <span class=\"hljs-string\">'the universe'</span>,\n      <span class=\"hljs-string\">'everything'</span>\n    ],\n    <span class=\"hljs-attr\">answer</span>: <span class=\"hljs-number\">42</span>\n  }\n});\n</code></pre>\n<p>Every Svelte component instance has a small number of methods you can use to control it, in addition to any <a href=\"#custom-methods\">custom methods</a> you add.</p>\n<h3 id=\"component-set-data-\">component.set(data)</h3>\n<p>This updates the component&#39;s state with the new values provided and causes the DOM to update. <code>data</code> must be a plain old JavaScript object (POJO). Any properties <em>not</em> included in <code>data</code> will remain as they were.</p>\n<pre><code>component.set({\n  <span class=\"hljs-attr\">questions</span>: [\n    <span class=\"hljs-string\">'why is the sky blue?'</span>,\n    <span class=\"hljs-string\">'how do planes fly?'</span>,\n    <span class=\"hljs-string\">'where do babies come from?'</span>\n  ],\n  <span class=\"hljs-attr\">answer</span>: <span class=\"hljs-string\">'ask your mother'</span>\n});\n</code></pre>\n<blockquote>\n<p>If you&#39;ve used Ractive in the past, this is very similar to <code>ractive.set(...)</code>, except that instead of doing <code>ractive.set(&#39;foo&#39;, &#39;bar&#39;)</code> you must always do <code>ractive.set({foo: &#39;bar&#39;})</code>, and you cannot set nested keypaths directly. It&#39;s also very similar to React&#39;s <code>setState</code>, except that it causes synchronous updates, meaning the DOM is always in a predictable state.</p>\n</blockquote>\n<h3 id=\"component-get-key-\">component.get(key)</h3>\n<p>Returns the current value of <code>key</code>:</p>\n<pre><code><span class=\"hljs-built_in\">console</span>.log( component.get( <span class=\"hljs-string\">'answer'</span> ) ); <span class=\"hljs-comment\">// 'ask your mother'</span>\n</code></pre>\n<p>This will also retrieve the value of <a href=\"#computed-properties\">computed properties</a>.</p>\n<h3 id=\"component-observe-key-callback-options-\">component.observe(key, callback[, options])</h3>\n<p>This method allows you to respond to changes in state, which is particularly useful when combined with <a href=\"#lifecycle-hooks\">lifecycle hooks</a> and <a href=\"#two-way-binding\">two-way bindings</a>.</p>\n<pre><code><span class=\"hljs-keyword\">const</span> observer = component.observe( <span class=\"hljs-string\">'answer'</span>, answer =&gt; {\n  <span class=\"hljs-built_in\">console</span>.log( <span class=\"hljs-string\">`the answer is <span class=\"hljs-subst\">${answer}</span>`</span> );\n});\n<span class=\"hljs-comment\">// fires immediately with current answer:</span>\n<span class=\"hljs-comment\">// -&gt; 'the answer is ask your mother'</span>\n\ncomponent.set({ <span class=\"hljs-attr\">answer</span>: <span class=\"hljs-string\">'google it'</span> });\n<span class=\"hljs-comment\">// -&gt; 'the answer is google it'</span>\n\nobserver.cancel(); <span class=\"hljs-comment\">// further changes will be ignored</span>\n</code></pre>\n<p>The callback takes two arguments – the current value and the previous value. (The first time it is called, the second argument will be <code>undefined</code>):</p>\n<pre><code>thermometer.observe( <span class=\"hljs-string\">'temperature'</span>, ( newValue, oldValue ) =&gt; {\n  <span class=\"hljs-keyword\">if</span> ( oldValue === <span class=\"hljs-literal\">undefined</span> ) <span class=\"hljs-keyword\">return</span>;\n  <span class=\"hljs-built_in\">console</span>.log( <span class=\"hljs-string\">`it's getting <span class=\"hljs-subst\">${newValue &gt; oldValue ? <span class=\"hljs-string\">'warmer'</span> : <span class=\"hljs-string\">'colder'</span>}</span>`</span> );\n});\n</code></pre>\n<p>If you don&#39;t want the callback to fire when you first attach the observer, use <code>init: false</code>:</p>\n<pre><code>thermometer.observe( <span class=\"hljs-string\">'temperature'</span>, ( newValue, oldValue ) =&gt; {\n  <span class=\"hljs-built_in\">console</span>.log( <span class=\"hljs-string\">`it's getting <span class=\"hljs-subst\">${newValue &gt; oldValue ? <span class=\"hljs-string\">'warmer'</span> : <span class=\"hljs-string\">'colder'</span>}</span>`</span> );\n}, { <span class=\"hljs-attr\">init</span>: <span class=\"hljs-literal\">false</span> });\n</code></pre>\n<blockquote>\n<p>For <em>primitive</em> values like strings and numbers, observer callbacks are only called when the value changes. But because it&#39;s possible to mutate an object or array while preserving <em>referential equality</em>, Svelte will err on the side of caution. In other words, if you do <code>component.set({foo: component.get(&#39;foo&#39;)})</code>, and <code>foo</code> is an object or array, any <code>foo</code> observers will be triggered.</p>\n</blockquote>\n<p>By default, observers are called <em>before</em> the DOM updates, giving you a chance to perform any additional updates without touching the DOM more than is necessary. In some cases – for example, if you need to measure an element after the DOM has been updated – use <code>defer: true</code>:</p>\n<pre><code><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">redraw</span> (<span class=\"hljs-params\"></span>) </span>{\n  canvas.width = drawingApp.get( <span class=\"hljs-string\">'width'</span> );\n  canvas.height = drawingApp.get( <span class=\"hljs-string\">'height'</span> );\n  updateCanvas();\n}\n\ndrawingApp.observe( <span class=\"hljs-string\">'width'</span>, redraw, { <span class=\"hljs-attr\">defer</span>: <span class=\"hljs-literal\">true</span> });\ndrawingApp.observe( <span class=\"hljs-string\">'height'</span>, redraw, { <span class=\"hljs-attr\">defer</span>: <span class=\"hljs-literal\">true</span> });\n</code></pre>\n<p>To observe on a nested component, use refs:</p>\n<pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Widget</span> <span class=\"hljs-attr\">ref:widget</span>/&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    onrender () {\n      <span class=\"hljs-keyword\">this</span>.refs.widget.observe( <span class=\"hljs-string\">'xxx'</span>, () =&gt; {...});\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<h3 id=\"component-on-eventname-callback-\">component.on(eventName, callback)</h3>\n<p>Allows you to respond to <em>events</em>:</p>\n<pre><code><span class=\"hljs-keyword\">const</span> listener = component.on( <span class=\"hljs-string\">'thingHappened'</span>, event =&gt; {\n  <span class=\"hljs-built_in\">console</span>.log( <span class=\"hljs-string\">`A thing happened: <span class=\"hljs-subst\">${event.thing}</span>`</span> );\n});\n\n<span class=\"hljs-comment\">// some time later...</span>\nlistener.cancel();\n</code></pre>\n<h3 id=\"component-fire-eventname-event-\">component.fire(eventName, event)</h3>\n<p>The companion to <code>component.on(...)</code>:</p>\n<pre><code>component.fire( <span class=\"hljs-string\">'thingHappened'</span>, {\n  <span class=\"hljs-attr\">thing</span>: <span class=\"hljs-string\">'this event was fired'</span>\n});\n</code></pre>\n<p>At first glance <code>component.on(...)</code> and <code>component.fire(...)</code> aren&#39;t particularly useful, but it&#39;ll become more so when we learn about <a href=\"#nested-components\">nested components</a>.</p>\n<blockquote>\n<p><code>component.on(...)</code> and <code>component.observe(...)</code> look quite similar, but they have different purposes. Observers are useful for reacting to data flowing through your application and changing continuously over time, whereas events are good for modeling discrete moments such as &#39;the user made a selection, and this is what it is&#39;.</p>\n</blockquote>\n<h3 id=\"component-teardown-\">component.teardown()</h3>\n<p>Removes the component from the DOM and removes any observers and event listeners that were created. This will also fire a <code>teardown</code> event:</p>\n<pre><code>component.on( <span class=\"hljs-string\">'teardown'</span>, () =&gt; {\n  alert( <span class=\"hljs-string\">'goodbye!'</span> ); <span class=\"hljs-comment\">// please don't do this</span>\n});\n\ncomponent.teardown();\n</code></pre>\n","metadata":{"title":"Component API"},"subsections":[{"slug":"component-set-data-","title":"component.set"},{"slug":"component-get-key-","title":"component.get"},{"slug":"component-observe-key-callback-options-","title":"component.observe"},{"slug":"component-on-eventname-callback-","title":"component.on"},{"slug":"component-fire-eventname-event-","title":"component.fire"},{"slug":"component-teardown-","title":"component.teardown"}],"slug":"component-api"},{"html":"<p>Rather than reinventing the wheel, Svelte templates are built on foundations that have stood the test of time: HTML, CSS and JavaScript. There&#39;s very little extra stuff to learn.</p>\n<h3 id=\"tags\">Tags</h3>\n<p>Tags allow you to bind data to your template. Whenever your data changes (for example after <code>component.set(...)</code>), the DOM updates automatically. You can use any JavaScript expression in templates, and it will also automatically update:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NwJTNFJTdCJTdCYSU3RCU3RCUyMCUyQiUyMCU3QiU3QmIlN0QlN0QlMjAlM0QlMjAlN0IlN0JhJTIwJTJCJTIwYiU3RCU3RCUzQyUyRnAlM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiUyMmElMjIlM0ExJTJDJTIyYiUyMiUzQTIlN0QlN0Q='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>{{a}} + {{b}} = {{a + b}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n</code></pre>\n<p>You can also use tags in attributes:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NoMSUyMHN0eWxlJTNEJ2NvbG9yJTNBJTIwJTdCJTdCY29sb3IlN0QlN0QlM0InJTNFJTdCJTdCY29sb3IlN0QlN0QlM0MlMkZoMSUzRSU1Q24lMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTIyY29sb3IlMjIlM0ElMjJzdGVlbGJsdWUlMjIlN0QlN0Q='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">h1</span> <span class=\"hljs-attr\">style</span>=<span class=\"hljs-string\">'color: {{color}};'</span>&gt;</span>{{color}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">h1</span>&gt;</span>\n</code></pre>\n<blockquote>\n<p>While tags are delimited using <code>{{</code> and <code>}}</code>, Svelte does not use <a href=\"https://mustache.github.io/\">Mustache</a> syntax. Tags are just JavaScript expressions.</p>\n</blockquote>\n<h3 id=\"triples\">Triples</h3>\n<p>Ordinary tags render expressions as plain text. If you need your expression interpreted as HTML, wrap it in triple braces, <code>{{{</code> and <code>}}}</code>.</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NwJTNFVGhpcyUyMEhUTUwlM0ElMjAlN0IlN0JodG1sJTdEJTdEJTNDJTJGcCUzRSU1Q24lM0NwJTNFUmVuZGVycyUyMGFzJTNBJTIwJTdCJTdCJTdCaHRtbCU3RCU3RCU3RCUzQyUyRnAlM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiUyMmh0bWwlMjIlM0ElMjJTb21lJTIwJTNDYiUzRWJvbGQlM0MlMkZiJTNFJTIwdGV4dC4lMjIlN0QlN0Q='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>This HTML: {{html}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>Renders as: {{{html}}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n</code></pre>\n<p>As with tags, you can use any JavaScript expression in triples, and it will automatically update the document when your data changes.</p>\n<blockquote>\n<p>Triples will <strong>not</strong> sanitize the HTML before rendering it! If you are displaying user input, you are responsible for first sanitizing it. Not doing so opens you up to all sorts of different attacks.</p>\n</blockquote>\n<h3 id=\"if-blocks\">If blocks</h3>\n<p>Control whether or not part of your template is rendered by wrapping it in an if block.</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlN0IlN0IlMjNpZiUyMHVzZXIubG9nZ2VkSW4lN0QlN0QlNUNuJTIwJTIwJTNDYSUyMGhyZWYlM0QnJTJGbG9nb3V0JyUzRWxvZyUyMG91dCUzQyUyRmElM0UlNUNuJTdCJTdCJTJGaWYlN0QlN0QlNUNuJTVDbiU3QiU3QiUyM2lmJTIwIXVzZXIubG9nZ2VkSW4lN0QlN0QlNUNuJTIwJTIwJTNDYSUyMGhyZWYlM0QnJTJGbG9naW4nJTNFbG9nJTIwaW4lM0MlMkZhJTNFJTVDbiU3QiU3QiUyRmlmJTdEJTdEJTVDbiUyMiUyQyUyMmRhdGElMjIlM0ElN0IlMjJ1c2VyJTIyJTNBJTdCJTIybG9nZ2VkSW4lMjIlM0FmYWxzZSU3RCU3RCU3RA=='></a><pre><code>{{#if user.loggedIn}}\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">a</span> <span class=\"hljs-attr\">href</span>=<span class=\"hljs-string\">'/logout'</span>&gt;</span>log out<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">a</span>&gt;</span>\n{{/if}}\n\n{{#if !user.loggedIn}}\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">a</span> <span class=\"hljs-attr\">href</span>=<span class=\"hljs-string\">'/login'</span>&gt;</span>log in<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">a</span>&gt;</span>\n{{/if}}\n</code></pre>\n<p>You can combine the two blocks above with <code>{{else}}</code>:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlN0IlN0IlMjNpZiUyMHVzZXIubG9nZ2VkSW4lN0QlN0QlNUNuJTIwJTIwJTNDYSUyMGhyZWYlM0QnJTJGbG9nb3V0JyUzRWxvZyUyMG91dCUzQyUyRmElM0UlNUNuJTdCJTdCZWxzZSU3RCU3RCU1Q24lMjAlMjAlM0NhJTIwaHJlZiUzRCclMkZsb2dpbiclM0Vsb2clMjBpbiUzQyUyRmElM0UlNUNuJTdCJTdCJTJGaWYlN0QlN0QlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiUyMnVzZXIlMjIlM0ElN0IlMjJsb2dnZWRJbiUyMiUzQWZhbHNlJTdEJTdEJTdE'></a><pre><code>{{#if user.loggedIn}}\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">a</span> <span class=\"hljs-attr\">href</span>=<span class=\"hljs-string\">'/logout'</span>&gt;</span>log out<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">a</span>&gt;</span>\n{{else}}\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">a</span> <span class=\"hljs-attr\">href</span>=<span class=\"hljs-string\">'/login'</span>&gt;</span>log in<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">a</span>&gt;</span>\n{{/if}}\n</code></pre>\n<p>You can also use <code>{{elseif ...}}</code>:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlN0IlN0IlMjNpZiUyMHglMjAlM0UlMjAxMCU3RCU3RCU1Q24lMjAlMjAlM0NwJTNFJTdCJTdCeCU3RCU3RCUyMGlzJTIwZ3JlYXRlciUyMHRoYW4lMjAxMCUzQyUyRnAlM0UlNUNuJTdCJTdCZWxzZWlmJTIwNSUyMCUzRSUyMHglN0QlN0QlNUNuJTIwJTIwJTNDcCUzRSU3QiU3QnglN0QlN0QlMjBpcyUyMGxlc3MlMjB0aGFuJTIwNSUzQyUyRnAlM0UlNUNuJTdCJTdCZWxzZSU3RCU3RCU1Q24lMjAlMjAlM0NwJTNFJTdCJTdCeCU3RCU3RCUyMGlzJTIwYmV0d2VlbiUyMDUlMjBhbmQlMjAxMCUzQyUyRnAlM0UlNUNuJTdCJTdCJTJGaWYlN0QlN0QlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiUyMnglMjIlM0E3JTdEJTdE'></a><pre><code>{{#if x &gt; 10}}\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>{{x}} is greater than 10<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n{{elseif 5 &gt; x}}\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>{{x}} is less than 5<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n{{else}}\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>{{x}} is between 5 and 10<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n{{/if}}\n</code></pre>\n<h3 id=\"each-blocks\">Each blocks</h3>\n<p>Iterate over lists of data:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NoMSUzRUNhdHMlMjBvZiUyMFlvdVR1YmUlM0MlMkZoMSUzRSU1Q24lNUNuJTNDdWwlM0UlNUNuJTIwJTIwJTdCJTdCJTIzZWFjaCUyMGNhdHMlMjBhcyUyMGNhdCU3RCU3RCU1Q24lMjAlMjAlMjAlMjAlM0NsaSUzRSUzQ2ElMjB0YXJnZXQlM0QnX2JsYW5rJyUyMGhyZWYlM0QnJTdCJTdCY2F0LnZpZGVvJTdEJTdEJyUzRSU3QiU3QmNhdC5uYW1lJTdEJTdEJTNDJTJGYSUzRSUzQyUyRmxpJTNFJTVDbiUyMCUyMCU3QiU3QiUyRmVhY2glN0QlN0QlNUNuJTNDJTJGdWwlM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiUyMmNhdHMlMjIlM0ElNUIlN0IlMjJuYW1lJTIyJTNBJTIyS2V5Ym9hcmQlMjBDYXQlMjIlMkMlMjJ2aWRlbyUyMiUzQSUyMmh0dHBzJTNBJTJGJTJGd3d3LnlvdXR1YmUuY29tJTJGd2F0Y2glM0Z2JTNESi0tLWFpeXpuR1ElMjIlN0QlMkMlN0IlMjJuYW1lJTIyJTNBJTIyTWFydSUyMiUyQyUyMnZpZGVvJTIyJTNBJTIyaHR0cHMlM0ElMkYlMkZ3d3cueW91dHViZS5jb20lMkZ3YXRjaCUzRnYlM0R6X0FiZlBYVEttcyUyMiU3RCUyQyU3QiUyMm5hbWUlMjIlM0ElMjJIZW5yaSUyMFRoZSUyMEV4aXN0ZW50aWFsJTIwQ2F0JTIyJTJDJTIydmlkZW8lMjIlM0ElMjJodHRwcyUzQSUyRiUyRnd3dy55b3V0dWJlLmNvbSUyRndhdGNoJTNGdiUzRE9VdG4zcHZXbXBnJTIyJTdEJTVEJTdEJTdE'></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">h1</span>&gt;</span>Cats of YouTube<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">h1</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ul</span>&gt;</span>\n  {{#each cats as cat}}\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">li</span>&gt;</span><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">a</span> <span class=\"hljs-attr\">target</span>=<span class=\"hljs-string\">'_blank'</span> <span class=\"hljs-attr\">href</span>=<span class=\"hljs-string\">'{{cat.video}}'</span>&gt;</span>{{cat.name}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">a</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">li</span>&gt;</span>\n  {{/each}}\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ul</span>&gt;</span>\n</code></pre>\n<p>You can access the index of the current element with <em>expression</em> as <em>name</em>, <em>index</em>:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NkaXYlMjBjbGFzcyUzRCdncmlkJyUzRSU1Q24lMjAlMjAlN0IlN0IlMjNlYWNoJTIwcm93cyUyMGFzJTIwcm93JTJDJTIweSU3RCU3RCU1Q24lMjAlMjAlMjAlMjAlM0NkaXYlMjBjbGFzcyUzRCdyb3cnJTNFJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCU3QiU3QiUyM2VhY2glMjBjb2x1bW5zJTIwYXMlMjBjb2x1bW4lMkMlMjB4JTdEJTdEJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ2NvZGUlMjBjbGFzcyUzRCdjZWxsJyUzRSU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlN0J4JTIwJTJCJTIwMSU3RCU3RCUyQyU3QiU3QnklMjAlMkIlMjAxJTdEJTdEJTNBJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ3N0cm9uZyUzRSU3QiU3QnJvdyU1QmNvbHVtbiU1RCU3RCU3RCUzQyUyRnN0cm9uZyUzRSU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0MlMkZjb2RlJTNFJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCU3QiU3QiUyRmVhY2glN0QlN0QlNUNuJTIwJTIwJTIwJTIwJTNDJTJGZGl2JTNFJTVDbiUyMCUyMCU3QiU3QiUyRmVhY2glN0QlN0QlNUNuJTNDJTJGZGl2JTNFJTVDbiUyMiUyQyUyMmRhdGElMjIlM0ElN0IlMjJjb2x1bW5zJTIyJTNBJTVCJTIyZm9vJTIyJTJDJTIyYmFyJTIyJTJDJTIyYmF6JTIyJTVEJTJDJTIycm93cyUyMiUzQSU1QiU3QiUyMmZvbyUyMiUzQSUyMmElMjIlMkMlMjJiYXIlMjIlM0ElMjJiJTIyJTJDJTIyYmF6JTIyJTNBJTIyYyUyMiU3RCUyQyU3QiUyMmZvbyUyMiUzQSUyMmQlMjIlMkMlMjJiYXIlMjIlM0ElMjJlJTIyJTJDJTIyYmF6JTIyJTNBJTIyZiUyMiU3RCUyQyU3QiUyMmZvbyUyMiUzQSUyMmclMjIlMkMlMjJiYXIlMjIlM0ElMjJoJTIyJTJDJTIyYmF6JTIyJTNBJTIyaSUyMiU3RCU1RCU3RCU3RA=='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">'grid'</span>&gt;</span>\n  {{#each rows as row, y}}\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">'row'</span>&gt;</span>\n      {{#each columns as column, x}}\n        <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">code</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">'cell'</span>&gt;</span>\n          {{x + 1}},{{y + 1}}:\n          <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">strong</span>&gt;</span>{{row[column]}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">strong</span>&gt;</span>\n        <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">code</span>&gt;</span>\n      {{/each}}\n    <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n  {{/each}}\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n</code></pre>\n<h3 id=\"directives\">Directives</h3>\n<p>The last place where Svelte template syntax differs from regular HTML: <em>directives</em> allow you to add special instructions for adding <a href=\"#event-handlers\">event handlers</a>, <a href=\"#two-way-binding\">two-way bindings</a>, <a href=\"#refs\">refs</a> and so on. We&#39;ll cover each of those in later stages of this guide – for now, all you need to know is that directives can be identified by the <code>:</code> character:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NwJTNFQ291bnQlM0ElMjAlN0IlN0Jjb3VudCU3RCU3RCUzQyUyRnAlM0UlNUNuJTNDYnV0dG9uJTIwb24lM0FjbGljayUzRCdzZXQoJTdCJTIwY291bnQlM0ElMjBjb3VudCUyMCUyQiUyMDElMjAlN0QpJyUzRSUyQjElM0MlMkZidXR0b24lM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiUyMmNvdW50JTIyJTNBMCU3RCU3RA=='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>Count: {{count}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">button</span> <span class=\"hljs-attr\">on:click</span>=<span class=\"hljs-string\">'set({ count: count + 1 })'</span>&gt;</span>+1<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">button</span>&gt;</span>\n</code></pre>\n<blockquote>\n<p>Technically, the <code>:</code> character is used to denote namespaced attributes in HTML. These will <em>not</em> be treated as directives, if encountered.</p>\n</blockquote>\n","metadata":{"title":"Template syntax"},"subsections":[{"slug":"tags","title":"Tags"},{"slug":"triples","title":"Triples"},{"slug":"if-blocks","title":"If blocks"},{"slug":"each-blocks","title":"Each blocks"},{"slug":"directives","title":"Directives"}],"slug":"template-syntax"},{"html":"<p>One of Svelte&#39;s key tenets is that components should be self-contained and reusable in different contexts. Because of that, it has a mechanism for <em>scoping</em> your CSS, so that you don&#39;t accidentally clobber other selectors on the page.</p>\n<h3 id=\"adding-styles\">Adding styles</h3>\n<p>Your component template can have a <code>&lt;style&gt;</code> tag, like so:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NkaXYlMjBjbGFzcyUzRCdmb28nJTNFJTVDbiUyMCUyMEJpZyUyMHJlZCUyMENvbWljJTIwU2FucyU1Q24lM0MlMkZkaXYlM0UlNUNuJTVDbiUzQ3N0eWxlJTNFJTVDbiUyMCUyMC5mb28lMjAlN0IlNUNuJTIwJTIwJTIwJTIwY29sb3IlM0ElMjByZWQlM0IlNUNuJTIwJTIwJTIwJTIwZm9udC1zaXplJTNBJTIwMmVtJTNCJTVDbiUyMCUyMCUyMCUyMGZvbnQtZmFtaWx5JTNBJTIwJ0NvbWljJTIwU2FucyUyME1TJyUzQiU1Q24lMjAlMjAlN0QlNUNuJTNDJTJGc3R5bGUlM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiU3RCU3RA=='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">'foo'</span>&gt;</span>\n  Big red Comic Sans\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">style</span>&gt;</span><span class=\"css\">\n  <span class=\"hljs-selector-class\">.foo</span> {\n    <span class=\"hljs-attribute\">color</span>: red;\n    <span class=\"hljs-attribute\">font-size</span>: <span class=\"hljs-number\">2em</span>;\n    <span class=\"hljs-attribute\">font-family</span>: <span class=\"hljs-string\">'Comic Sans MS'</span>;\n  }\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">style</span>&gt;</span>\n</code></pre>\n<h3 id=\"how-it-works\">How it works</h3>\n<p>Open the example above in the REPL and inspect the element to see what has happened – Svelte has added a <code>svelte-[uniqueid]</code> attribute to the element, and transformed the CSS selector accordingly. Since no other element on the page can share that selector, anything else on the page with <code>class=&quot;foo&quot;</code> will be unaffected by our styles.</p>\n<p>This is vastly simpler than achieving the same effect via <a href=\"http://caniuse.com/#search=shadow%20dom\">Shadow DOM</a> and works everywhere without polyfills.</p>\n<blockquote>\n<p>Svelte will add a <code>&lt;style&gt;</code> tag to the page containing your scoped styles. Dynamically adding styles may be impossible if your site has a <a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP\">Content Security Policy</a>. If that&#39;s the case, you can use scoped styles by <a href=\"#rendering-css\">server-rendering your CSS</a> and using the <code>css: false</code> compiler option (or <code>--no-css</code> with the CLI).</p>\n</blockquote>\n<h3 id=\"cascading-rules\">Cascading rules</h3>\n<p>The usual cascading mechanism still applies – any global <code>.foo</code> styles would still be applied, and if our template had <a href=\"#nested-components\">nested components</a> with <code>class=&quot;foo&quot;</code> elements, they would inherit our styles.</p>\n<blockquote>\n<p>Scoped styles are <em>not</em> dynamic – they are shared between all instances of a component. In other words you can&#39;t use <code>{{tags}}</code> inside your CSS.</p>\n</blockquote>\n","metadata":{"title":"Scoped styles"},"subsections":[{"slug":"adding-styles","title":"Adding styles"},{"slug":"how-it-works","title":"How it works"},{"slug":"cascading-rules","title":"Cascading rules"}],"slug":"scoped-styles"},{"html":"<p>As well as scoped styles and a template, components can encapsulate <em>behaviours</em>. For that, we add a <code>&lt;script&gt;</code> element and export an object:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NkaXYlM0UlNUNuJTIwJTIwJTNDIS0tJTIwdGVtcGxhdGUlMjBnb2VzJTIwaGVyZSUyMC0tJTNFJTVDbiUzQyUyRmRpdiUzRSU1Q24lNUNuJTNDc2NyaXB0JTNFJTVDbiUyMCUyMGV4cG9ydCUyMGRlZmF1bHQlMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTJGJTJGJTIwYmVoYXZpb3VycyUyMGdvJTIwaGVyZSU1Q24lMjAlMjAlN0QlM0IlNUNuJTNDJTJGc2NyaXB0JTNFJTVDbiUyMiUyQyUyMmRhdGElMjIlM0ElN0IlN0QlN0Q='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span>&gt;</span>\n  <span class=\"hljs-comment\">&lt;!-- template goes here --&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    <span class=\"hljs-comment\">// behaviours go here</span>\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<h3 id=\"default-data\">Default data</h3>\n<p>Often, it makes sense for a component to have default data. This should be expressed as a function that returns a POJO:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NwJTNFQ291bnQlM0ElMjAlN0IlN0Jjb3VudCU3RCU3RCUzQyUyRnAlM0UlNUNuJTNDYnV0dG9uJTIwb24lM0FjbGljayUzRCdzZXQoJTdCJTIwY291bnQlM0ElMjBjb3VudCUyMCUyQiUyMDElMjAlN0QpJyUzRSUyQjElM0MlMkZidXR0b24lM0UlNUNuJTVDbiUzQ3NjcmlwdCUzRSU1Q24lMjAlMjBleHBvcnQlMjBkZWZhdWx0JTIwJTdCJTVDbiUyMCUyMCUyMCUyMGRhdGElMjAoKSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjByZXR1cm4lMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwY291bnQlM0ElMjAwJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCU3RCUzQiU1Q24lMjAlMjAlMjAlMjAlN0QlNUNuJTIwJTIwJTdEJTNCJTVDbiUzQyUyRnNjcmlwdCUzRSU1Q24lMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTdE'></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>Count: {{count}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">button</span> <span class=\"hljs-attr\">on:click</span>=<span class=\"hljs-string\">'set({ count: count + 1 })'</span>&gt;</span>+1<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">button</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    data () {\n      <span class=\"hljs-keyword\">return</span> {\n        <span class=\"hljs-attr\">count</span>: <span class=\"hljs-number\">0</span>\n      };\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<p>Data supplied at instantiation (i.e. <code>new Component(...)</code>) takes priority over defaults.</p>\n<blockquote>\n<p>The example above, like many of the examples below, uses ES2015 syntax – i.e. <code>data () {...}</code> rather than <code>data: function {...}</code>. While Svelte will generate ES5 code that runs everywhere, it <em>won&#39;t</em> convert your ES2015 code into ES5 – so if you use ES2015 and need to support older browsers, you will need an additional transpilation step in your build process using <a href=\"https://babeljs.io\">Babel</a> or <a href=\"https://buble.surge.sh\">Bublé</a>.</p>\n</blockquote>\n<h3 id=\"computed-properties\">Computed properties</h3>\n<p>Often, your program will use values that depend on other values – for example, you might have a filtered list, which depends on both the list <em>and</em> the filter. Normally in JavaScript you&#39;d have to add logic to update the dependent property when <em>any</em> of the dependencies change. This is a frequent source of bugs, and it gets worse as your application grows.</p>\n<p>Svelte allows you to express these dependencies in computed properties, which are recalculated whenever those dependencies change:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NwJTNFJTVDbiUyMCUyMFRoZSUyMHRpbWUlMjBpcyU1Q24lMjAlMjAlM0NzdHJvbmclM0UlN0IlN0Job3VycyU3RCU3RCUzQSU3QiU3Qm1pbnV0ZXMlN0QlN0QlM0ElN0IlN0JzZWNvbmRzJTdEJTdEJTNDJTJGc3Ryb25nJTNFJTVDbiUzQyUyRnAlM0UlNUNuJTVDbiUzQ3NjcmlwdCUzRSU1Q24lMjAlMjBleHBvcnQlMjBkZWZhdWx0JTIwJTdCJTVDbiUyMCUyMCUyMCUyMGRhdGElMjAoKSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjByZXR1cm4lMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwdGltZSUzQSUyMG5ldyUyMERhdGUoKSU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlN0QlM0IlNUNuJTIwJTIwJTIwJTIwJTdEJTJDJTVDbiU1Q24lMjAlMjAlMjAlMjBjb21wdXRlZCUzQSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjBob3VycyUzQSUyMHRpbWUlMjAlM0QlM0UlMjB0aW1lLmdldEhvdXJzKCklMkMlNUNuJTIwJTIwJTIwJTIwJTIwJTIwbWludXRlcyUzQSUyMHRpbWUlMjAlM0QlM0UlMjB0aW1lLmdldE1pbnV0ZXMoKSUyQyU1Q24lMjAlMjAlMjAlMjAlMjAlMjBzZWNvbmRzJTNBJTIwdGltZSUyMCUzRCUzRSUyMHRpbWUuZ2V0U2Vjb25kcygpJTVDbiUyMCUyMCUyMCUyMCU3RCU1Q24lMjAlMjAlN0QlM0IlNUNuJTNDJTJGc2NyaXB0JTNFJTVDbiUyMiUyQyUyMmRhdGElMjIlM0ElN0IlN0QlN0Q='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>\n  The time is\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">strong</span>&gt;</span>{{hours}}:{{minutes}}:{{seconds}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">strong</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    data () {\n      <span class=\"hljs-keyword\">return</span> {\n        <span class=\"hljs-attr\">time</span>: <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">Date</span>()\n      };\n    },\n\n    <span class=\"hljs-attr\">computed</span>: {\n      <span class=\"hljs-attr\">hours</span>: <span class=\"hljs-function\"><span class=\"hljs-params\">time</span> =&gt;</span> time.getHours(),\n      <span class=\"hljs-attr\">minutes</span>: <span class=\"hljs-function\"><span class=\"hljs-params\">time</span> =&gt;</span> time.getMinutes(),\n      <span class=\"hljs-attr\">seconds</span>: <span class=\"hljs-function\"><span class=\"hljs-params\">time</span> =&gt;</span> time.getSeconds()\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<p>Notice that all we need to do to tell Svelte that <code>hours</code>, <code>minutes</code> and <code>seconds</code> depend on <code>time</code> is include it as a parameter to the function. There&#39;s no costly dependency tracking involved – the dependency graph is resolved at compile time.</p>\n<blockquote>\n<p><code>computed</code> must be an object literal, and the properties must be function expressions or arrow function expressions.</p>\n</blockquote>\n<h3 id=\"lifecycle-hooks\">Lifecycle hooks</h3>\n<p>There are two &#39;hooks&#39; provided by Svelte for adding control logic – <code>oncreate</code> and <code>ondestroy</code>:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NwJTNFJTVDbiUyMCUyMFRoZSUyMHRpbWUlMjBpcyU1Q24lMjAlMjAlM0NzdHJvbmclM0UlN0IlN0Job3VycyU3RCU3RCUzQSU3QiU3Qm1pbnV0ZXMlN0QlN0QlM0ElN0IlN0JzZWNvbmRzJTdEJTdEJTNDJTJGc3Ryb25nJTNFJTVDbiUzQyUyRnAlM0UlNUNuJTVDbiUzQ3NjcmlwdCUzRSU1Q24lMjAlMjBleHBvcnQlMjBkZWZhdWx0JTIwJTdCJTVDbiUyMCUyMCUyMCUyMG9uY3JlYXRlJTIwKCklMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwdGhpcy5pbnRlcnZhbCUyMCUzRCUyMHNldEludGVydmFsKCUyMCgpJTIwJTNEJTNFJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHRoaXMuc2V0KCU3QiUyMHRpbWUlM0ElMjBuZXclMjBEYXRlKCklMjAlN0QpJTNCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCU3RCUyQyUyMDEwMDAlMjApJTNCJTVDbiUyMCUyMCUyMCUyMCU3RCUyQyU1Q24lNUNuJTIwJTIwJTIwJTIwb25kZXN0cm95JTIwKCklMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwY2xlYXJJbnRlcnZhbCglMjB0aGlzLmludGVydmFsJTIwKSUzQiU1Q24lMjAlMjAlMjAlMjAlN0QlMkMlNUNuJTVDbiUyMCUyMCUyMCUyMGRhdGElMjAoKSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjByZXR1cm4lMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwdGltZSUzQSUyMG5ldyUyMERhdGUoKSU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlN0QlM0IlNUNuJTIwJTIwJTIwJTIwJTdEJTJDJTVDbiU1Q24lMjAlMjAlMjAlMjBjb21wdXRlZCUzQSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjBob3VycyUzQSUyMHRpbWUlMjAlM0QlM0UlMjB0aW1lLmdldEhvdXJzKCklMkMlNUNuJTIwJTIwJTIwJTIwJTIwJTIwbWludXRlcyUzQSUyMHRpbWUlMjAlM0QlM0UlMjB0aW1lLmdldE1pbnV0ZXMoKSUyQyU1Q24lMjAlMjAlMjAlMjAlMjAlMjBzZWNvbmRzJTNBJTIwdGltZSUyMCUzRCUzRSUyMHRpbWUuZ2V0U2Vjb25kcygpJTVDbiUyMCUyMCUyMCUyMCU3RCU1Q24lMjAlMjAlN0QlM0IlNUNuJTNDJTJGc2NyaXB0JTNFJTVDbiUyMiUyQyUyMmRhdGElMjIlM0ElN0IlN0QlN0Q='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>\n  The time is\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">strong</span>&gt;</span>{{hours}}:{{minutes}}:{{seconds}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">strong</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    oncreate () {\n      <span class=\"hljs-keyword\">this</span>.interval = setInterval( <span class=\"hljs-function\"><span class=\"hljs-params\">()</span> =&gt;</span> {\n        <span class=\"hljs-keyword\">this</span>.set({ <span class=\"hljs-attr\">time</span>: <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">Date</span>() });\n      }, <span class=\"hljs-number\">1000</span> );\n    },\n\n    ondestroy () {\n      clearInterval( <span class=\"hljs-keyword\">this</span>.interval );\n    },\n\n    data () {\n      <span class=\"hljs-keyword\">return</span> {\n        <span class=\"hljs-attr\">time</span>: <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">Date</span>()\n      };\n    },\n\n    <span class=\"hljs-attr\">computed</span>: {\n      <span class=\"hljs-attr\">hours</span>: <span class=\"hljs-function\"><span class=\"hljs-params\">time</span> =&gt;</span> time.getHours(),\n      <span class=\"hljs-attr\">minutes</span>: <span class=\"hljs-function\"><span class=\"hljs-params\">time</span> =&gt;</span> time.getMinutes(),\n      <span class=\"hljs-attr\">seconds</span>: <span class=\"hljs-function\"><span class=\"hljs-params\">time</span> =&gt;</span> time.getSeconds()\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<h3 id=\"helpers\">Helpers</h3>\n<p>Helpers are simple functions that are used in your template. In the example above, we want to ensure that <code>minutes</code> and <code>seconds</code> are preceded with a <code>0</code> if they only have one digit, so we add a <code>leftPad</code> helper:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NwJTNFJTVDbiUyMCUyMFRoZSUyMHRpbWUlMjBpcyU1Q24lMjAlMjAlM0NzdHJvbmclM0UlN0IlN0Job3VycyU3RCU3RCUzQSU3QiU3QmxlZnRQYWQobWludXRlcyUyQyUyMDIlMkMlMjAnMCcpJTdEJTdEJTNBJTdCJTdCbGVmdFBhZChzZWNvbmRzJTJDJTIwMiUyQyUyMCcwJyklN0QlN0QlM0MlMkZzdHJvbmclM0UlNUNuJTNDJTJGcCUzRSU1Q24lNUNuJTNDc2NyaXB0JTNFJTVDbiUyMCUyMGltcG9ydCUyMGxlZnRQYWQlMjBmcm9tJTIwJ2xlZnQtcGFkJyUzQiU1Q24lNUNuJTIwJTIwZXhwb3J0JTIwZGVmYXVsdCUyMCU3QiU1Q24lMjAlMjAlMjAlMjBoZWxwZXJzJTNBJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMGxlZnRQYWQlNUNuJTIwJTIwJTIwJTIwJTdEJTJDJTVDbiU1Q24lMjAlMjAlMjAlMjBvbmNyZWF0ZSUyMCgpJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMHRoaXMuaW50ZXJ2YWwlMjAlM0QlMjBzZXRJbnRlcnZhbCglMjAoKSUyMCUzRCUzRSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB0aGlzLnNldCglN0IlMjB0aW1lJTNBJTIwbmV3JTIwRGF0ZSgpJTIwJTdEKSUzQiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMjAxMDAwJTIwKSUzQiU1Q24lMjAlMjAlMjAlMjAlN0QlMkMlNUNuJTVDbiUyMCUyMCUyMCUyMG9uZGVzdHJveSUyMCgpJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMGNsZWFySW50ZXJ2YWwoJTIwdGhpcy5pbnRlcnZhbCUyMCklM0IlNUNuJTIwJTIwJTIwJTIwJTdEJTJDJTVDbiU1Q24lMjAlMjAlMjAlMjBkYXRhJTIwKCklMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwcmV0dXJuJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHRpbWUlM0ElMjBuZXclMjBEYXRlKCklNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTdEJTNCJTVDbiUyMCUyMCUyMCUyMCU3RCUyQyU1Q24lNUNuJTIwJTIwJTIwJTIwY29tcHV0ZWQlM0ElMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwaG91cnMlM0ElMjB0aW1lJTIwJTNEJTNFJTIwdGltZS5nZXRIb3VycygpJTJDJTVDbiUyMCUyMCUyMCUyMCUyMCUyMG1pbnV0ZXMlM0ElMjB0aW1lJTIwJTNEJTNFJTIwdGltZS5nZXRNaW51dGVzKCklMkMlNUNuJTIwJTIwJTIwJTIwJTIwJTIwc2Vjb25kcyUzQSUyMHRpbWUlMjAlM0QlM0UlMjB0aW1lLmdldFNlY29uZHMoKSU1Q24lMjAlMjAlMjAlMjAlN0QlNUNuJTIwJTIwJTdEJTNCJTVDbiUzQyUyRnNjcmlwdCUzRSU1Q24lMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTdE'></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>\n  The time is\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">strong</span>&gt;</span>{{hours}}:{{leftPad(minutes, 2, '0')}}:{{leftPad(seconds, 2, '0')}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">strong</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">import</span> leftPad <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'left-pad'</span>;\n\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    <span class=\"hljs-attr\">helpers</span>: {\n      leftPad\n    },\n\n    oncreate () {\n      <span class=\"hljs-keyword\">this</span>.interval = setInterval( <span class=\"hljs-function\"><span class=\"hljs-params\">()</span> =&gt;</span> {\n        <span class=\"hljs-keyword\">this</span>.set({ <span class=\"hljs-attr\">time</span>: <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">Date</span>() });\n      }, <span class=\"hljs-number\">1000</span> );\n    },\n\n    ondestroy () {\n      clearInterval( <span class=\"hljs-keyword\">this</span>.interval );\n    },\n\n    data () {\n      <span class=\"hljs-keyword\">return</span> {\n        <span class=\"hljs-attr\">time</span>: <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">Date</span>()\n      };\n    },\n\n    <span class=\"hljs-attr\">computed</span>: {\n      <span class=\"hljs-attr\">hours</span>: <span class=\"hljs-function\"><span class=\"hljs-params\">time</span> =&gt;</span> time.getHours(),\n      <span class=\"hljs-attr\">minutes</span>: <span class=\"hljs-function\"><span class=\"hljs-params\">time</span> =&gt;</span> time.getMinutes(),\n      <span class=\"hljs-attr\">seconds</span>: <span class=\"hljs-function\"><span class=\"hljs-params\">time</span> =&gt;</span> time.getSeconds()\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<p>Of course, you could use <code>leftPad</code> inside the computed properties instead of in the template. There&#39;s no hard and fast rule about when you should use expressions with helpers versus when you should use computed properties – do whatever makes your component easier for the next developer to understand.</p>\n<blockquote>\n<p>Helper functions should be <em>pure</em> – in other words, they should not have side-effects, and their returned value should only depend on their arguments.</p>\n</blockquote>\n<h3 id=\"custom-methods\">Custom methods</h3>\n<p>In addition to the <a href=\"#component-api\">built-in methods</a>, you can add methods of your own:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NzY3JpcHQlM0UlNUNuJTIwJTIwZXhwb3J0JTIwZGVmYXVsdCUyMCU3QiU1Q24lMjAlMjAlMjAlMjBtZXRob2RzJTNBJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMHNheSUzQSUyMGZ1bmN0aW9uJTIwKCUyMG1lc3NhZ2UlMjApJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGFsZXJ0KCUyMG1lc3NhZ2UlMjApJTNCJTIwJTJGJTJGJTIwYWdhaW4lMkMlMjBwbGVhc2UlMjBkb24ndCUyMGRvJTIwdGhpcyU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlN0QlNUNuJTIwJTIwJTIwJTIwJTdEJTVDbiUyMCUyMCU3RCUzQiU1Q24lM0MlMkZzY3JpcHQlM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiU3RCU3RA=='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    <span class=\"hljs-attr\">methods</span>: {\n      <span class=\"hljs-attr\">say</span>: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"> message </span>) </span>{\n        alert( message ); <span class=\"hljs-comment\">// again, please don't do this</span>\n      }\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<p>These become part of the component&#39;s API:</p>\n<pre><code><span class=\"hljs-keyword\">import</span> MyComponent <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'./MyComponent.html'</span>;\n\n<span class=\"hljs-keyword\">var</span> component = <span class=\"hljs-keyword\">new</span> MyComponent({\n  <span class=\"hljs-attr\">target</span>: <span class=\"hljs-built_in\">document</span>.querySelector( <span class=\"hljs-string\">'main'</span> )\n});\n\ncomponent.say( <span class=\"hljs-string\">'👋'</span> );\n</code></pre>\n<p>Methods (whether built-in or custom) can also be called inside <a href=\"#event-handlers\">event handlers</a>:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NidXR0b24lMjBvbiUzQWNsaWNrJTNEJ3NheSglNUMlMjJoZWxsbyU1QyUyMiknJTNFc2F5JTIwaGVsbG8hJTNDJTJGYnV0dG9uJTNFJTVDbiUyMiUyQyUyMmRhdGElMjIlM0ElN0IlN0QlN0Q='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">button</span> <span class=\"hljs-attr\">on:click</span>=<span class=\"hljs-string\">'say(\"hello\")'</span>&gt;</span>say hello!<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">button</span>&gt;</span>\n</code></pre>\n<h3 id=\"custom-event-handlers\">Custom event handlers</h3>\n<p>Soon, we&#39;ll learn about <a href=\"#event-handlers\">event handlers</a> – if you want, skip ahead to that section first then come back here!</p>\n<p>Most of the time you can make do with the standard DOM events (the sort you&#39;d add via <code>element.addEventListener</code>, such as <code>click</code>) but sometimes you might need custom events to handle gestures, for example.</p>\n<p>Custom events are just functions that take a node and a callback as their argument, and return an object with a <code>teardown</code> method that gets called when the element is removed from the page:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NidXR0b24lMjBvbiUzQWxvbmdwcmVzcyUzRCdzZXQoJTdCJTIwZG9uZSUzQSUyMHRydWUlMjAlN0QpJyUzRWNsaWNrJTIwYW5kJTIwaG9sZCUzQyUyRmJ1dHRvbiUzRSU1Q24lNUNuJTdCJTdCJTIzaWYlMjBkb25lJTdEJTdEJTVDbiUyMCUyMCUzQ3AlM0VjbGlja2VkJTIwYW5kJTIwaGVsZCUzQyUyRnAlM0UlNUNuJTdCJTdCJTJGaWYlN0QlN0QlNUNuJTVDbiUzQ3NjcmlwdCUzRSU1Q24lMjAlMjBleHBvcnQlMjBkZWZhdWx0JTIwJTdCJTVDbiUyMCUyMCUyMCUyMGV2ZW50cyUzQSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjBsb25ncHJlc3MlMjAoJTIwbm9kZSUyQyUyMGNhbGxiYWNrJTIwKSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBmdW5jdGlvbiUyMG9ubW91c2Vkb3duJTIwKCUyMGV2ZW50JTIwKSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBjb25zdCUyMHRpbWVvdXQlMjAlM0QlMjBzZXRUaW1lb3V0KCUyMCgpJTIwJTNEJTNFJTIwY2FsbGJhY2soJTIwZXZlbnQlMjApJTJDJTIwMTAwMCUyMCklM0IlNUNuJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGZ1bmN0aW9uJTIwY2FuY2VsJTIwKCklMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwY2xlYXJUaW1lb3V0KCUyMHRpbWVvdXQlMjApJTNCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciglMjAnbW91c2V1cCclMkMlMjBjYW5jZWwlMkMlMjBmYWxzZSUyMCklM0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdEJTVDbiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJTIwJ21vdXNldXAnJTJDJTIwY2FuY2VsJTJDJTIwZmFsc2UlMjApJTNCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3RCU1Q24lNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwbm9kZS5hZGRFdmVudExpc3RlbmVyKCUyMCdtb3VzZWRvd24nJTJDJTIwb25tb3VzZWRvd24lMkMlMjBmYWxzZSUyMCklM0IlNUNuJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHJldHVybiUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB0ZWFyZG93biUyMCgpJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lciglMjAnbW91c2Vkb3duJyUyQyUyMG9ubW91c2Vkb3duJTJDJTIwZmFsc2UlMjApJTNCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3RCU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlM0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTdEJTVDbiUyMCUyMCUyMCUyMCU3RCU1Q24lMjAlMjAlN0QlM0IlNUNuJTNDJTJGc2NyaXB0JTNFJTVDbiUyMiUyQyUyMmRhdGElMjIlM0ElN0IlN0QlN0Q='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">button</span> <span class=\"hljs-attr\">on:longpress</span>=<span class=\"hljs-string\">'set({ done: true })'</span>&gt;</span>click and hold<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">button</span>&gt;</span>\n\n{{#if done}}\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>clicked and held<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n{{/if}}\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    <span class=\"hljs-attr\">events</span>: {\n      longpress ( node, callback ) {\n        <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">onmousedown</span> (<span class=\"hljs-params\"> event </span>) </span>{\n          <span class=\"hljs-keyword\">const</span> timeout = setTimeout( <span class=\"hljs-function\"><span class=\"hljs-params\">()</span> =&gt;</span> callback( event ), <span class=\"hljs-number\">1000</span> );\n\n          <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">cancel</span> (<span class=\"hljs-params\"></span>) </span>{\n            clearTimeout( timeout );\n            node.removeEventListener( <span class=\"hljs-string\">'mouseup'</span>, cancel, <span class=\"hljs-literal\">false</span> );\n          }\n\n          node.addEventListener( <span class=\"hljs-string\">'mouseup'</span>, cancel, <span class=\"hljs-literal\">false</span> );\n        }\n\n        node.addEventListener( <span class=\"hljs-string\">'mousedown'</span>, onmousedown, <span class=\"hljs-literal\">false</span> );\n\n        <span class=\"hljs-keyword\">return</span> {\n          teardown () {\n            node.removeEventListener( <span class=\"hljs-string\">'mousedown'</span>, onmousedown, <span class=\"hljs-literal\">false</span> );\n          }\n        };\n      }\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<h3 id=\"nested-components\">Nested components</h3>\n<p>So far, we&#39;ve been working with single standalone components. But if you tried to put your entire application in one component it would quickly become unwieldy.</p>\n<p>Fortunately, Svelte components can be <em>nested</em>:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NkaXYlMjBjbGFzcyUzRCd3aWRnZXQtY29udGFpbmVyJyUzRSU1Q24lMjAlMjAlM0NXaWRnZXQlMjBmb28lMjBiYXIlM0Qnc3RhdGljJyUyMGJheiUzRCclN0IlN0JkeW5hbWljJTdEJTdEJyUyRiUzRSU1Q24lM0MlMkZkaXYlM0UlNUNuJTVDbiUzQ3NjcmlwdCUzRSU1Q24lMjAlMjBpbXBvcnQlMjBXaWRnZXQlMjBmcm9tJTIwJy4lMkZXaWRnZXQuaHRtbCclM0IlNUNuJTVDbiUyMCUyMGV4cG9ydCUyMGRlZmF1bHQlMjAlN0IlNUNuJTIwJTIwJTIwJTIwZGF0YSUyMCgpJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMHJldHVybiUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBkeW5hbWljJTNBJTIwJ3RoaXMlMjBjYW4lMjBjaGFuZ2UnJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCU3RCU1Q24lMjAlMjAlMjAlMjAlN0QlMkMlNUNuJTVDbiUyMCUyMCUyMCUyMGNvbXBvbmVudHMlM0ElMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwV2lkZ2V0JTVDbiUyMCUyMCUyMCUyMCU3RCU1Q24lMjAlMjAlN0QlM0IlNUNuJTNDJTJGc2NyaXB0JTNFJTVDbiUyMiUyQyUyMmRhdGElMjIlM0ElN0IlN0QlN0Q='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">'widget-container'</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Widget</span> <span class=\"hljs-attr\">foo</span> <span class=\"hljs-attr\">bar</span>=<span class=\"hljs-string\">'static'</span> <span class=\"hljs-attr\">baz</span>=<span class=\"hljs-string\">'{{dynamic}}'</span>/&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">import</span> Widget <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'./Widget.html'</span>;\n\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    data () {\n      <span class=\"hljs-keyword\">return</span> {\n        <span class=\"hljs-attr\">dynamic</span>: <span class=\"hljs-string\">'this can change'</span>\n      }\n    },\n\n    <span class=\"hljs-attr\">components</span>: {\n      Widget\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<p>The example above is equivalent to the following...</p>\n<pre><code><span class=\"hljs-keyword\">import</span> Widget <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'./Widget.html'</span>;\n\n<span class=\"hljs-keyword\">const</span> widget = <span class=\"hljs-keyword\">new</span> Widget({\n  <span class=\"hljs-attr\">target</span>: <span class=\"hljs-built_in\">document</span>.querySelector( <span class=\"hljs-string\">'.widget-container'</span> ),\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">foo</span>: <span class=\"hljs-literal\">true</span>,\n    <span class=\"hljs-attr\">bar</span>: <span class=\"hljs-string\">'static'</span>,\n    <span class=\"hljs-attr\">baz</span>: <span class=\"hljs-string\">'this can change'</span>\n  }\n});\n</code></pre>\n<p>...except that Svelte will ensure that the value of <code>baz</code> is kept in sync with the value of <code>dynamic</code> in the parent component, and takes care of tearing down the child component when the parent is torn down.</p>\n<blockquote>\n<p>Component names should be capitalised, following the widely-used JavaScript convention of capitalising constructor names. It&#39;s also an easy way to distinguish components from elements in your template.</p>\n</blockquote>\n","metadata":{"title":"Behaviours"},"subsections":[{"slug":"default-data","title":"Default data"},{"slug":"computed-properties","title":"Computed properties"},{"slug":"lifecycle-hooks","title":"Lifecycle hooks"},{"slug":"helpers","title":"Helpers"},{"slug":"custom-methods","title":"Custom methods"},{"slug":"custom-event-handlers","title":"Custom event handlers"},{"slug":"nested-components","title":"Nested components"}],"slug":"behaviour"},{"html":"<p>Directives are element or component-level instructions to Svelte. They look like attributes, except with a <code>:</code> character.</p>\n<h3 id=\"event-handlers\">Event handlers</h3>\n<p>In most applications, you&#39;ll need to respond to the user&#39;s actions. In Svelte, this is done with the <code>on:[event]</code> directive.</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NwJTNFQ291bnQlM0ElMjAlN0IlN0Jjb3VudCU3RCU3RCUzQyUyRnAlM0UlNUNuJTNDYnV0dG9uJTIwb24lM0FjbGljayUzRCdzZXQoJTdCJTIwY291bnQlM0ElMjBjb3VudCUyMCUyQiUyMDElMjAlN0QpJyUzRSUyQjElM0MlMkZidXR0b24lM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiUyMmNvdW50JTIyJTNBMCU3RCU3RA=='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>Count: {{count}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">button</span> <span class=\"hljs-attr\">on:click</span>=<span class=\"hljs-string\">'set({ count: count + 1 })'</span>&gt;</span>+1<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">button</span>&gt;</span>\n</code></pre>\n<p>When the user clicks the button, Svelte calls <code>component.set(...)</code> with the provided arguments. You can call any method belonging to the component (whether <a href=\"#component-api\">built-in</a> or <a href=\"#custom-methods\">custom</a>), and any data property (or computed property) that&#39;s in scope:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NwJTNFU2VsZWN0JTIwYSUyMGNhdGVnb3J5JTNBJTNDJTJGcCUzRSU1Q24lNUNuJTdCJTdCJTIzZWFjaCUyMGNhdGVnb3JpZXMlMjBhcyUyMGNhdGVnb3J5JTdEJTdEJTVDbiUyMCUyMCUzQ2J1dHRvbiUyMG9uJTNBY2xpY2slM0Qnc2VsZWN0KCUyMGNhdGVnb3J5JTIwKSclM0VzZWxlY3QlMjAlN0IlN0JjYXRlZ29yeSU3RCU3RCUzQyUyRmJ1dHRvbiUzRSU1Q24lN0IlN0IlMkZlYWNoJTdEJTdEJTVDbiU1Q24lM0NzY3JpcHQlM0UlNUNuJTIwJTIwZXhwb3J0JTIwZGVmYXVsdCUyMCU3QiU1Q24lMjAlMjAlMjAlMjBkYXRhJTIwKCklMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwcmV0dXJuJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGNhdGVnb3JpZXMlM0ElMjAlNUIlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJ2FuaW1hbCclMkMlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJ3ZlZ2V0YWJsZSclMkMlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJ21pbmVyYWwnJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU1RCU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlN0QlNUNuJTIwJTIwJTIwJTIwJTdEJTJDJTVDbiU1Q24lMjAlMjAlMjAlMjBtZXRob2RzJTNBJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMHNlbGVjdCUyMCglMjBuYW1lJTIwKSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBhbGVydCglMjAlNjBzZWxlY3RlZCUyMCUyNCU3Qm5hbWUlN0QlNjAlMjApJTNCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCU3RCU1Q24lMjAlMjAlMjAlMjAlN0QlNUNuJTIwJTIwJTdEJTNCJTVDbiUzQyUyRnNjcmlwdCUzRSU1Q24lMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTdE'></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>Select a category:<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n\n{{#each categories as category}}\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">button</span> <span class=\"hljs-attr\">on:click</span>=<span class=\"hljs-string\">'select( category )'</span>&gt;</span>select {{category}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">button</span>&gt;</span>\n{{/each}}\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    data () {\n      <span class=\"hljs-keyword\">return</span> {\n        <span class=\"hljs-attr\">categories</span>: [\n          <span class=\"hljs-string\">'animal'</span>,\n          <span class=\"hljs-string\">'vegetable'</span>,\n          <span class=\"hljs-string\">'mineral'</span>\n        ]\n      }\n    },\n\n    <span class=\"hljs-attr\">methods</span>: {\n      select ( name ) {\n        alert( <span class=\"hljs-string\">`selected <span class=\"hljs-subst\">${name}</span>`</span> );\n      }\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<p>You can also access the <code>event</code> object in the method call:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NkaXYlMjBvbiUzQW1vdXNlbW92ZSUzRCdzZXQoJTdCJTIweCUzQSUyMGV2ZW50LmNsaWVudFglMkMlMjB5JTNBJTIwZXZlbnQuY2xpZW50WSUyMCU3RCknJTNFJTVDbiUyMCUyMGNvb3JkcyUzQSUyMCU3QiU3QnglN0QlN0QlMkMlN0IlN0J5JTdEJTdEJTVDbiUzQyUyRmRpdiUzRSU1Q24lNUNuJTNDc3R5bGUlM0UlNUNuJTIwJTIwZGl2JTIwJTdCJTVDbiUyMCUyMCUyMCUyMGJvcmRlciUzQSUyMDFweCUyMHNvbGlkJTIwcHVycGxlJTNCJTVDbiUyMCUyMCUyMCUyMHdpZHRoJTNBJTIwMTAwJTI1JTNCJTVDbiUyMCUyMCUyMCUyMGhlaWdodCUzQSUyMDEwMCUyNSUzQiU1Q24lMjAlMjAlN0QlNUNuJTNDJTJGc3R5bGUlM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiU3RCU3RA=='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">on:mousemove</span>=<span class=\"hljs-string\">'set({ x: event.clientX, y: event.clientY })'</span>&gt;</span>\n  coords: {{x}},{{y}}\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">style</span>&gt;</span><span class=\"css\">\n  <span class=\"hljs-selector-tag\">div</span> {\n    <span class=\"hljs-attribute\">border</span>: <span class=\"hljs-number\">1px</span> solid purple;\n    <span class=\"hljs-attribute\">width</span>: <span class=\"hljs-number\">100%</span>;\n    <span class=\"hljs-attribute\">height</span>: <span class=\"hljs-number\">100%</span>;\n  }\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">style</span>&gt;</span>\n</code></pre>\n<p>The target node can be referenced as <code>this</code>, meaning you can do this sort of thing:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NpbnB1dCUyMG9uJTNBZm9jdXMlM0QndGhpcy5zZWxlY3QoKSclM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiU3RCU3RA=='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">input</span> <span class=\"hljs-attr\">on:focus</span>=<span class=\"hljs-string\">'this.select()'</span>&gt;</span>\n</code></pre>\n<h3 id=\"custom-events\">Custom events</h3>\n<p>You can define your own custom events to handle complex user interactions like dragging and swiping. See the earlier section on <a href=\"#custom-event-handlers\">custom event handlers</a> for more information.</p>\n<h3 id=\"component-events\">Component events</h3>\n<p>Events are an excellent way for <a href=\"#nested-components\">nested components</a> to communicate with their parents. Let&#39;s revisit our earlier example, but turn it into a <code>&lt;CategoryChooser&gt;</code> component:</p>\n<pre><code><span class=\"hljs-comment\">&lt;!-- CategoryChooser.html --&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>Select a category:<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n\n{{#each categories as category}}\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">button</span> <span class=\"hljs-attr\">on:click</span>=<span class=\"hljs-string\">'fire( \"select\", { category } )'</span>&gt;</span>select {{category}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">button</span>&gt;</span>\n{{/each}}\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    data () {\n      <span class=\"hljs-keyword\">return</span> {\n        <span class=\"hljs-attr\">categories</span>: [\n          <span class=\"hljs-string\">'animal'</span>,\n          <span class=\"hljs-string\">'vegetable'</span>,\n          <span class=\"hljs-string\">'mineral'</span>\n        ]\n      }\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<p>When the user clicks a button, the component will fire a <code>select</code> event, where the <code>event</code> object has a <code>category</code> property. Any component that nests <code>&lt;CategoryChooser&gt;</code> can listen for events like so:</p>\n<pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">CategoryChooser</span> <span class=\"hljs-attr\">on:select</span>=<span class=\"hljs-string\">'playTwentyQuestions( event.category )'</span>/&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">import</span> CategoryChooser <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'./CategoryChooser.html'</span>;\n\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    <span class=\"hljs-attr\">components</span>: {\n      CategoryChooser\n    },\n\n    <span class=\"hljs-attr\">methods</span>: {\n      playTwentyQuestions ( category ) {\n        <span class=\"hljs-comment\">// TODO implement</span>\n      }\n    }\n  };\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<h3 id=\"refs\">Refs</h3>\n<p>Refs are a convenient way to store a reference to particular DOM nodes or components. Declare a ref with <code>ref:[name]</code>, and access it inside your component&#39;s methods with <code>this.refs.[name]</code>:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NjYW52YXMlMjByZWYlM0FjYW52YXMlMjB3aWR0aCUzRCcyMDAnJTIwaGVpZ2h0JTNEJzIwMCclM0UlM0MlMkZjYW52YXMlM0UlNUNuJTVDbiUzQ3NjcmlwdCUzRSU1Q24lMjAlMjBleHBvcnQlMjBkZWZhdWx0JTIwJTdCJTVDbiUyMCUyMCUyMCUyMG9uY3JlYXRlJTIwKCklMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwY29uc3QlMjBjYW52YXMlMjAlM0QlMjB0aGlzLnJlZnMuY2FudmFzJTNCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMGNvbnN0JTIwY3R4JTIwJTNEJTIwY2FudmFzLmdldENvbnRleHQoJTIwJzJkJyUyMCklM0IlNUNuJTVDbiUyMCUyMCUyMCUyMCUyMCUyMGxldCUyMHRvcm5kb3duJTIwJTNEJTIwZmFsc2UlM0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwdGhpcy5vbiglMjAndGVhcmRvd24nJTJDJTIwKCklMjAlM0QlM0UlMjB0b3JuZG93biUyMCUzRCUyMHRydWUlMjApJTNCJTVDbiU1Q24lMjAlMjAlMjAlMjAlMjAlMjBmdW5jdGlvbiUyMGxvb3AlMjAoKSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBpZiUyMCglMjB0b3JuZG93biUyMCklMjByZXR1cm4lM0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCUyMGxvb3AlMjApJTNCJTVDbiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBjb25zdCUyMGltYWdlRGF0YSUyMCUzRCUyMGN0eC5nZXRJbWFnZURhdGEoJTIwMCUyQyUyMDAlMkMlMjBjYW52YXMud2lkdGglMkMlMjBjYW52YXMuaGVpZ2h0JTIwKSUzQiU1Q24lNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZm9yJTIwKCUyMGxldCUyMHAlMjAlM0QlMjAwJTNCJTIwcCUyMCUzQyUyMGltYWdlRGF0YS5kYXRhLmxlbmd0aCUzQiUyMHAlMjAlMkIlM0QlMjA0JTIwKSUyMCU3QiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBjb25zdCUyMGklMjAlM0QlMjBwJTIwJTJGJTIwNCUzQiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBjb25zdCUyMHglMjAlM0QlMjBpJTIwJTI1JTIwY2FudmFzLndpZHRoJTNCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGNvbnN0JTIweSUyMCUzRCUyMGklMjAlMkYlMjBjYW52YXMuaGVpZ2h0JTIwJTNFJTNFJTNFJTIwMCUzQiU1Q24lNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwY29uc3QlMjB0JTIwJTNEJTIwd2luZG93LnBlcmZvcm1hbmNlLm5vdygpJTNCJTVDbiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBjb25zdCUyMHIlMjAlM0QlMjA2NCUyMCUyQiUyMCglMjAxMjglMjAqJTIweCUyMCUyRiUyMGNhbnZhcy53aWR0aCUyMCklMjAlMkIlMjAoJTIwNjQlMjAqJTIwTWF0aC5zaW4oJTIwdCUyMCUyRiUyMDEwMDAlMjApJTIwKSUzQiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBjb25zdCUyMGclMjAlM0QlMjA2NCUyMCUyQiUyMCglMjAxMjglMjAqJTIweSUyMCUyRiUyMGNhbnZhcy5oZWlnaHQlMjApJTIwJTJCJTIwKCUyMDY0JTIwKiUyME1hdGguY29zKCUyMHQlMjAlMkYlMjAxMDAwJTIwKSUyMCklM0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwY29uc3QlMjBiJTIwJTNEJTIwMTI4JTNCJTVDbiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBpbWFnZURhdGEuZGF0YSU1QiUyMHAlMjAlMkIlMjAwJTIwJTVEJTIwJTNEJTIwciUzQiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBpbWFnZURhdGEuZGF0YSU1QiUyMHAlMjAlMkIlMjAxJTIwJTVEJTIwJTNEJTIwZyUzQiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBpbWFnZURhdGEuZGF0YSU1QiUyMHAlMjAlMkIlMjAyJTIwJTVEJTIwJTNEJTIwYiUzQiU1Q24lMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBpbWFnZURhdGEuZGF0YSU1QiUyMHAlMjAlMkIlMjAzJTIwJTVEJTIwJTNEJTIwMjU1JTNCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3RCU1Q24lNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwY3R4LnB1dEltYWdlRGF0YSglMjBpbWFnZURhdGElMkMlMjAwJTJDJTIwMCUyMCklM0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwJTdEJTVDbiU1Q24lMjAlMjAlMjAlMjAlMjAlMjBsb29wKCklM0IlNUNuJTIwJTIwJTIwJTIwJTdEJTVDbiUyMCUyMCU3RCU1Q24lM0MlMkZzY3JpcHQlM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiU3RCU3RA=='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">canvas</span> <span class=\"hljs-attr\">ref:canvas</span> <span class=\"hljs-attr\">width</span>=<span class=\"hljs-string\">'200'</span> <span class=\"hljs-attr\">height</span>=<span class=\"hljs-string\">'200'</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">canvas</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n    oncreate () {\n      <span class=\"hljs-keyword\">const</span> canvas = <span class=\"hljs-keyword\">this</span>.refs.canvas;\n      <span class=\"hljs-keyword\">const</span> ctx = canvas.getContext( <span class=\"hljs-string\">'2d'</span> );\n\n      <span class=\"hljs-keyword\">let</span> torndown = <span class=\"hljs-literal\">false</span>;\n      <span class=\"hljs-keyword\">this</span>.on( <span class=\"hljs-string\">'teardown'</span>, () =&gt; torndown = <span class=\"hljs-literal\">true</span> );\n\n      <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">loop</span> (<span class=\"hljs-params\"></span>) </span>{\n        <span class=\"hljs-keyword\">if</span> ( torndown ) <span class=\"hljs-keyword\">return</span>;\n        requestAnimationFrame( loop );\n\n        <span class=\"hljs-keyword\">const</span> imageData = ctx.getImageData( <span class=\"hljs-number\">0</span>, <span class=\"hljs-number\">0</span>, canvas.width, canvas.height );\n\n        <span class=\"hljs-keyword\">for</span> ( <span class=\"hljs-keyword\">let</span> p = <span class=\"hljs-number\">0</span>; p &lt; imageData.data.length; p += <span class=\"hljs-number\">4</span> ) {\n          <span class=\"hljs-keyword\">const</span> i = p / <span class=\"hljs-number\">4</span>;\n          <span class=\"hljs-keyword\">const</span> x = i % canvas.width;\n          <span class=\"hljs-keyword\">const</span> y = i / canvas.height &gt;&gt;&gt; <span class=\"hljs-number\">0</span>;\n\n          <span class=\"hljs-keyword\">const</span> t = <span class=\"hljs-built_in\">window</span>.performance.now();\n\n          <span class=\"hljs-keyword\">const</span> r = <span class=\"hljs-number\">64</span> + ( <span class=\"hljs-number\">128</span> * x / canvas.width ) + ( <span class=\"hljs-number\">64</span> * <span class=\"hljs-built_in\">Math</span>.sin( t / <span class=\"hljs-number\">1000</span> ) );\n          <span class=\"hljs-keyword\">const</span> g = <span class=\"hljs-number\">64</span> + ( <span class=\"hljs-number\">128</span> * y / canvas.height ) + ( <span class=\"hljs-number\">64</span> * <span class=\"hljs-built_in\">Math</span>.cos( t / <span class=\"hljs-number\">1000</span> ) );\n          <span class=\"hljs-keyword\">const</span> b = <span class=\"hljs-number\">128</span>;\n\n          imageData.data[ p + <span class=\"hljs-number\">0</span> ] = r;\n          imageData.data[ p + <span class=\"hljs-number\">1</span> ] = g;\n          imageData.data[ p + <span class=\"hljs-number\">2</span> ] = b;\n          imageData.data[ p + <span class=\"hljs-number\">3</span> ] = <span class=\"hljs-number\">255</span>;\n        }\n\n        ctx.putImageData( imageData, <span class=\"hljs-number\">0</span>, <span class=\"hljs-number\">0</span> );\n      }\n\n      loop();\n    }\n  }\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n<blockquote>\n<p>Since only one element or component can occupy a given <code>ref</code>, don&#39;t use them in <code>{{#each ...}}</code> blocks. It&#39;s fine to use them in <code>{{#if ...}}</code> blocks however.</p>\n</blockquote>\n<h3 id=\"two-way-binding\">Two-way binding</h3>\n<p>It&#39;s currently fashionable to avoid two-way binding on the grounds that it creates all sorts of hard-to-debug problems and slows your application down, and that a one-way top-down data flow is &#39;easier to reason about&#39;. This is in fact high grade nonsense. It&#39;s true that two-way binding done <em>badly</em> has all sorts of issues, and that very large apps benefit from the discipline of a not permitting deeply nested components to muck about with state that might affect distant parts of the app. But when used correctly, two-way binding simplifies things greatly.</p>\n<p>Bindings are declared with the <code>bind:[attribute]</code> directive:</p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0NpbnB1dCUyMGJpbmQlM0F2YWx1ZSUzRCduYW1lJyUyMHBsYWNlaG9sZGVyJTNEJ2VudGVyJTIweW91ciUyMG5hbWUnJTNFJTVDbiUzQ3AlM0VIZWxsbyUyMCU3QiU3Qm5hbWUlMjAlN0MlN0MlMjAnc3RyYW5nZXInJTdEJTdEISUzQyUyRnAlM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiU3RCU3RA=='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">input</span> <span class=\"hljs-attr\">bind:value</span>=<span class=\"hljs-string\">'name'</span> <span class=\"hljs-attr\">placeholder</span>=<span class=\"hljs-string\">'enter your name'</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>Hello {{name || 'stranger'}}!<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n</code></pre>\n<blockquote>\n<p>Two-way binding is not yet fully implemented. Check back soon for the full list of available bindings!</p>\n</blockquote>\n<p>As well as DOM elements, you can bind to component data properties:</p>\n<pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">CategoryChooser</span> <span class=\"hljs-attr\">bind:category</span>=<span class=\"hljs-string\">'category'</span>/&gt;</span>\n</code></pre>\n<p>If the attribute and the bound property share a name, you can use this shorthand:</p>\n<pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">CategoryChooser</span> <span class=\"hljs-attr\">bind:category</span>/&gt;</span>\n</code></pre>\n<p>Here is a complete example of using two way bindings with a form: </p>\n<a class='open-in-repl' href='/repl?data=JTdCJTIyZ2lzdCUyMiUzQW51bGwlMkMlMjJzb3VyY2UlMjIlM0ElMjIlM0Nmb3JtJTIwb24lM0FzdWJtaXQlM0QnaGFuZGxlU3VibWl0KCUyMGV2ZW50JTIwKSclM0UlNUNuJTIwJTIwJTNDaW5wdXQlMjBiaW5kJTNBdmFsdWUlM0QndGVzdCclMjB0eXBlJTNEJ3RleHQnJTNFJTVDbiUyMCUyMCUzQ2J1dHRvbiUyMHR5cGUlM0Qnc3VibWl0JyUzRVN0b3JlJTNDJTJGYnV0dG9uJTNFJTVDbiUzQyUyRmZvcm0lM0UlNUNuJTVDbiUzQ3NjcmlwdCUzRSU1Q25leHBvcnQlMjBkZWZhdWx0JTIwJTdCJTVDbiUyMCUyMG1ldGhvZHMlM0ElMjAlN0IlNUNuJTIwJTIwJTIwJTIwaGFuZGxlU3VibWl0JTNBJTIwZnVuY3Rpb24lMjAoJTIwZXZlbnQlMjApJTIwJTdCJTVDbiUyMCUyMCUyMCUyMCUyMCUyMCUyRiUyRiUyMHByZXZlbnQlMjB0aGUlMjBwYWdlJTIwZnJvbSUyMHJlbG9hZGluZyU1Q24lMjAlMjAlMjAlMjAlMjAlMjBldmVudC5wcmV2ZW50RGVmYXVsdCgpJTNCJTVDbiU1Q24lMjAlMjAlMjAlMjAlMjAlMjB2YXIlMjB2YWx1ZSUyMCUzRCUyMHRoaXMuZ2V0KCUyMCd0ZXN0JyUyMCklM0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwY29uc29sZS5sb2coJTIwJ3ZhbHVlJyUyQyUyMHZhbHVlJTIwKSUzQiU1Q24lMjAlMjAlMjAlMjAlN0QlNUNuJTIwJTIwJTdEJTVDbiU3RCUzQiU1Q24lM0MlMkZzY3JpcHQlM0UlNUNuJTIyJTJDJTIyZGF0YSUyMiUzQSU3QiU3RCU3RA=='></a><pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">form</span> <span class=\"hljs-attr\">on:submit</span>=<span class=\"hljs-string\">'handleSubmit( event )'</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">input</span> <span class=\"hljs-attr\">bind:value</span>=<span class=\"hljs-string\">'test'</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">'text'</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">button</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">'submit'</span>&gt;</span>Store<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">button</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">form</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"javascript\">\n<span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n  <span class=\"hljs-attr\">methods</span>: {\n    <span class=\"hljs-attr\">handleSubmit</span>: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"> event </span>) </span>{\n      <span class=\"hljs-comment\">// prevent the page from reloading</span>\n      event.preventDefault();\n\n      <span class=\"hljs-keyword\">var</span> value = <span class=\"hljs-keyword\">this</span>.get( <span class=\"hljs-string\">'test'</span> );\n      <span class=\"hljs-built_in\">console</span>.log( <span class=\"hljs-string\">'value'</span>, value );\n    }\n  }\n};\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n","metadata":{"title":"Element directives"},"subsections":[{"slug":"event-handlers","title":"Event handlers"},{"slug":"custom-events","title":"Custom events"},{"slug":"component-events","title":"Component events"},{"slug":"refs","title":"Refs"},{"slug":"two-way-binding","title":"Two-way binding"}],"slug":"element-directives"},{"html":"<p>TODO...</p>\n","metadata":{"title":"Plugins"},"subsections":[],"slug":"plugins"},{"html":"<p>So far, we&#39;ve discussed creating Svelte components <em>on the client</em>, which is to say the browser. But you can also render Svelte components in Node.js. This can result in better perceived performance as it means the application starts rendering while the page is still downloading, before any JavaScript executes. It also has SEO advantages in some cases, and can be beneficial for people running older browsers that can&#39;t or won&#39;t run your JavaScript for whatever reason.</p>\n<h3 id=\"rendering-html\">Rendering HTML</h3>\n<p>To use the server-side renderer, we must first <em>register</em> it. This means that when you <code>require</code> a component <code>.html</code> file, it gets intercepted by the SSR compiler:</p>\n<pre><code><span class=\"hljs-built_in\">require</span>( <span class=\"hljs-string\">'svelte/ssr/register'</span> );\n</code></pre>\n<p>After that, you can load components like so:</p>\n<pre><code><span class=\"hljs-keyword\">const</span> thing = <span class=\"hljs-built_in\">require</span>( <span class=\"hljs-string\">'./components/Thing.html'</span> );\n</code></pre>\n<p>Components have a different API in Node.js – rather than creating instances with <code>set(...)</code> and <code>get(...)</code> methods, a component is an object with a <code>render(data)</code> method which returns HTML (the <code>data</code> object is the same as you would use when instantiating a component in the browser, and is optional):</p>\n<pre><code><span class=\"hljs-keyword\">const</span> data = { <span class=\"hljs-attr\">answer</span>: <span class=\"hljs-number\">42</span> };\n<span class=\"hljs-keyword\">const</span> html = thing.render( data );\n</code></pre>\n<p>Any <a href=\"#default-data\">default data</a>, <a href=\"#computed-properties\">computed properties</a>, <a href=\"#helpers\">helpers</a> and <a href=\"#nested-components\">nested components</a> will work as expected.</p>\n<blockquote>\n<p>The SSR compiler will generate a CommonJS module for each of your components – meaning that <code>import</code> and <code>export</code> statements are converted into their <code>require</code> and <code>module.exports</code> equivalents. If your components have non-component dependencies, they must also work as CommonJS modules in Node. If you&#39;re using ES2015 modules, we recommend <a href=\"https://github.com/benjamn/reify\">reify</a> for automatically converting them to CommonJS.</p>\n</blockquote>\n<h3 id=\"rendering-css\">Rendering CSS</h3>\n<p>You can also render your component&#39;s (<a href=\"#scoped-styles\">scoped</a>) CSS, including that of any nested components:</p>\n<pre><code><span class=\"hljs-keyword\">const</span> { css, components } = thing.renderCss();\n</code></pre>\n<p>You could put the resulting <code>css</code> in a separate stylesheet, or include them in the page inside a <code>&lt;style&gt;</code> tag. If you do this, you will probably want to prevent the client-side compiler from including the CSS again. For <code>svelte-cli</code>, use the <code>--no-css</code> flag. In build tool integrations like <code>rollup-plugin-svelte</code>, pass the <code>css: false</code> option.</p>\n<blockquote>\n<p>The <code>components</code> array contains an object for each nested component that contains styles, allowing you to dedupe styles across multiple top-level components. Most of the time, you won&#39;t need to do this.</p>\n</blockquote>\n","metadata":{"title":"Server-side rendering"},"subsections":[{"slug":"rendering-html","title":"Rendering HTML"},{"slug":"rendering-css","title":"Rendering CSS"}],"slug":"server-side-rendering"},{"html":"<p>This documentation is still a work-in-progress, like Svelte itself. If there are particular things that are missing or could be improved, then <a href=\"https://github.com/sveltejs/svelte.technology\">please raise an issue on GitHub</a>!</p>\n","metadata":{"title":"TODO..."},"subsections":[],"slug":"still-to-come"}];

var template$1 = (function () {
	return {
		data: function data () {
			return {
				contents: contents
			};
		},

		oncreate: function oncreate () {
			var this$1 = this;

			var onhashchange = function () {
				this$1.set({ active: window.location.hash.slice( 1 ) });
			};

			window.addEventListener( 'hashchange', onhashchange, false );
			this.on( 'teardown', function () {
				window.removeEventListener( 'hashchange', onhashchange, false );
			});

			onhashchange();
		}
	};
}());

var addedCss$4 = false;
function addCss$4 () {
	var style = createElement( 'style' );
	style.textContent = "\n\t[svelte-3887303171].guide-toc, [svelte-3887303171] .guide-toc {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t}\n\n\t[svelte-3887303171].guide-toc li, [svelte-3887303171] .guide-toc li {\n\t\tdisplay: block;\n\t\tmargin: 0 0 2em 0;\n\t}\n\n\t[svelte-3887303171].section, [svelte-3887303171] .section {\n\t\tdisplay: block;\n\t\tfont-weight: 700;\n\t\tcolor: #333;\n\t\tfont-size: 1.2rem;\n\t\tmargin: 0 0 0.15em 0;\n\t}\n\n\t[svelte-3887303171].subsection, [svelte-3887303171] .subsection {\n\t\tdisplay: block;\n\t\tfont-weight: 500;\n\t\tcolor:#727272;\n\t\tfont-size: 1em;\n\t\tmargin: 0 0 0.15em 0;\n\t}\n\n\t[svelte-3887303171].section.active, [svelte-3887303171] .section.active, [svelte-3887303171].subsection.active, [svelte-3887303171] .subsection.active {\n\t\tcolor: #aa1e1e;\n\t}\n";
	appendNode( style, document.head );

	addedCss$4 = true;
}

function renderMainFragment$4 ( root, component ) {
	var ul = createElement( 'ul' );
	setAttribute( ul, 'svelte-3887303171', '' );
	ul.className = "guide-toc";
	
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, ul );
	var eachBlock_value = root.contents;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock$2( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( ul, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var eachBlock_value = root.contents;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock$2( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock_iterations, false );
			
			if ( detach ) {
				detachNode( ul );
			}
		}
	};
}

function renderEachBlock$2 ( root, eachBlock_value, section, section__index, component ) {
	var li = createElement( 'li' );
	setAttribute( li, 'svelte-3887303171', '' );
	
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-3887303171', '' );
	a.className = "section " + ( section.slug === root.active ? "active": "" );
	a.href = "/guide#" + ( section.slug );
	
	appendNode( a, li );
	var last_text = section.metadata.title;
	var text = createText( last_text );
	appendNode( text, a );
	appendNode( createText( "\n\t\t\t" ), li );
	var eachBlock1_anchor = createComment();
	appendNode( eachBlock1_anchor, li );
	var eachBlock1_value = section.subsections;
	var eachBlock1_iterations = [];
	
	for ( var i = 0; i < eachBlock1_value.length; i += 1 ) {
		eachBlock1_iterations[i] = renderEachBlock1( root,eachBlock_value,section,section__index, eachBlock1_value, eachBlock1_value[i], i, component );
		eachBlock1_iterations[i].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, section, section__index ) {
			var __tmp;
		
			a.className = "section " + ( section.slug === root.active ? "active": "" );
			a.href = "/guide#" + ( section.slug );
			
			if ( ( __tmp = section.metadata.title ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			var eachBlock1_value = section.subsections;
			
			for ( var i = 0; i < eachBlock1_value.length; i += 1 ) {
				if ( !eachBlock1_iterations[i] ) {
					eachBlock1_iterations[i] = renderEachBlock1( root,eachBlock_value,section,section__index, eachBlock1_value, eachBlock1_value[i], i, component );
					eachBlock1_iterations[i].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
				} else {
					eachBlock1_iterations[i].update( changed, root,eachBlock_value,section,section__index, eachBlock1_value, eachBlock1_value[i], i );
				}
			}
			
			teardownEach( eachBlock1_iterations, true, eachBlock1_value.length );
			
			eachBlock1_iterations.length = eachBlock1_value.length;
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock1_iterations, false );
			
			if ( detach ) {
				detachNode( li );
			}
		}
	};
}

function renderEachBlock1 ( root, eachBlock_value, section, section__index, eachBlock1_value, subsection, subsection__index, component ) {
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-3887303171', '' );
	a.className = "subsection " + ( subsection.slug === root.active ? "active": "" );
	a.href = "/guide#" + ( subsection.slug );
	
	var last_text = subsection.title;
	var text = createText( last_text );
	appendNode( text, a );

	return {
		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, section, section__index, eachBlock1_value, subsection, subsection__index ) {
			var __tmp;
		
			a.className = "subsection " + ( subsection.slug === root.active ? "active": "" );
			a.href = "/guide#" + ( subsection.slug );
			
			if ( ( __tmp = subsection.title ) !== last_text ) {
				text.data = last_text = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( a );
			}
		}
	};
}

function GuideContents ( options ) {
	options = options || {};
	this._state = Object.assign( template$1.data(), options.data );
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss$4 ) { addCss$4(); }
	
	this._fragment = renderMainFragment$4( this._state, this );
	if ( options.target ) { this._fragment.mount( options.target, null ); }
	
	if ( options._root ) {
		options._root._renderHooks.push({ fn: template$1.oncreate, context: this });
	} else {
		template$1.oncreate.call( this );
	}
}

GuideContents.prototype = Object.assign( {}, proto );

GuideContents.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) { this._fragment.update( newState, this._state ); }
	dispatchObservers( this, this._observers.post, newState, oldState );
};

GuideContents.prototype.teardown = GuideContents.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var template = (function () {
	return {
		oncreate: function oncreate () {
			var this$1 = this;

			var anchors = this.refs.container.querySelectorAll( '[id]' );
			var positions;

			var onresize = function () {
				var ref = this$1.refs.container.getBoundingClientRect();
				var top = ref.top;
				positions = [].map.call( anchors, function (anchor) {
					return anchor.getBoundingClientRect().top - top;
				});
			};

			var lastId = window.location.hash.slice( 1 );

			var onscroll = function () {
				var top = -window.scrollY;

				var i = anchors.length;
				while ( i-- ) {
					if ( positions[i] + top < 40 ) {
						var anchor = anchors[i];
						var id = anchor.id;

						if ( id !== lastId ) {
							this$1.refs.contents.set({ active: id });
							this$1.fire( 'scroll', id );

							lastId = id;
						}

						return;
					}
				}
			};

			window.addEventListener( 'scroll', onscroll, true );
			window.addEventListener( 'resize', onresize, true );

			// wait for fonts to load...
			var timeouts = [
				setTimeout( onresize, 1000 ),
				setTimeout( onresize, 5000 )
			];

			this.on( 'teardown', function () {
				window.removeEventListener( 'scroll', onscroll, true );
				window.removeEventListener( 'resize', onresize, true );

				timeouts.forEach( function (timeout) { return clearTimeout( timeout ); } );
			});

			onresize();
			onscroll();
		},

		components: {
			GuideContents: GuideContents
		}
	};
}());

var addedCss$3 = false;
function addCss$3 () {
	var style = createElement( 'style' );
	style.textContent = "\n\t[svelte-1297942678].sidebar, [svelte-1297942678] .sidebar {\n\t\tposition: fixed;\n\t\tleft: 0;\n\t\ttop: 4em;\n\t\twidth: 14em;\n\t\theight: calc(100vh - 4em);\n\t\tdisplay: none;\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\toverflow-y: auto;\n\t\tpadding: 2em 1em 2em 1.5em;\n\t}\n\n\t[svelte-1297942678].content, [svelte-1297942678] .content {\n\t\twidth: 100%;\n\t\tpadding: 1em;\n\t}\n\n\th2[svelte-1297942678], [svelte-1297942678] h2 {\n\t\tpadding: 6rem 0 0 0;\n\t\tmargin: -3rem 0 1rem 0;\n\t\tfont-size: 2.4em;\n\t\tfont-weight: 400;\n\t\tpointer-events: none;\n\t}\n\n\th3[svelte-1297942678], [svelte-1297942678] h3 {\n\t\tpadding-top: 6rem;\n\t\tfont-size: 1.2em;\n\t\tfont-weight: 800;\n\t\tmargin: -3em 0 0 0;\n\t\tpointer-events: none;\n\t}\n\n\tp[svelte-1297942678], [svelte-1297942678] p {\n\t\tmargin: 0 0 1em 0;\n\t\tfont-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tfont-weight: 300;\n\t\tcolor: #181818;\n\t\tline-height: 1.5;\n\t}\n\n\t[svelte-1297942678].content a, [svelte-1297942678] .content a {\n\t\tborder-bottom: 1px solid #e3d9d9;\n\t}\n\n\tstrong[svelte-1297942678], [svelte-1297942678] strong {\n\t\tfont-weight: 500;\n\t}\n\n\tcode[svelte-1297942678], [svelte-1297942678] code {\n\t\tbackground-color: #f9f9f9;\n\t\tpadding: 0.2em 0.4em;\n\t\tborder-radius: 3px;\n\t}\n\n\tpre[svelte-1297942678] code, [svelte-1297942678] pre code {\n\t\tpadding: 0;\n\t}\n\n\tsection[svelte-1297942678]:first-child h3, [svelte-1297942678] section:first-child h3 {\n\t\tborder: none;\n\t}\n\n\tsection[svelte-1297942678], [svelte-1297942678] section {\n\t\tborder-bottom: 1px solid #eee;\n\t\tmax-width: 64em;\n\t\tmargin: 0 auto 2em auto;\n\t\tpadding: 0 0 4em 0;\n\t}\n\n\tsection[svelte-1297942678]:last-child, [svelte-1297942678] section:last-child {\n\t\tborder: none;\n\t}\n\n\tsection[svelte-1297942678] > pre, [svelte-1297942678] section > pre, [svelte-1297942678].CodeMirror, [svelte-1297942678] .CodeMirror {\n\t\tbackground-color: #f9f9f9;\n\t\tborder-left: 2px solid #eee;\n\t\tpadding: 8px;\n\t\tmargin: 0 0 1em 0;\n\t}\n\n\tsection[svelte-1297942678] > pre, [svelte-1297942678] section > pre {\n\t\tpadding: 12px 8px 12px 12px;\n\t\tborder-radius: 3px;\n\t}\n\n\tp[svelte-1297942678], [svelte-1297942678] p, ul[svelte-1297942678], [svelte-1297942678] ul {\n\t\tmax-width: 48em;\n\t}\n\n\tli[svelte-1297942678], [svelte-1297942678] li {\n\t\tmargin: 0;\n\t}\n\n\t[svelte-1297942678].open-in-repl, [svelte-1297942678] .open-in-repl {\n\t\tposition: absolute;\n\t\tz-index: 2;\n\t\tright: 0;\n\t}\n\n\t[svelte-1297942678].open-in-repl::after, [svelte-1297942678] .open-in-repl::after {\n\t\tposition: absolute;\n\t\tcontent: 'open in repl';\n\t\ttext-transform: uppercase;\n\t\tright: 0.5em;\n\t\ttop: 0.5em;\n\t\tborder: 1px solid rgba(0,0,0,0.1);\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tfont-weight: 500;\n\t\ttext-align: center;\n\t\twhite-space: pre;\n\t\tpadding: 0.25em 0.5em 0.1em 0.5em;\n\t\tline-height: 1;\n\t\tborder-radius: 0.1em;\n\t\tcolor: rgba(170,30,30,0.8);\n\t\tbackground-color: rgb(253,242,242);\n\t}\n\n\t[svelte-1297942678].open-in-repl:hover::after, [svelte-1297942678] .open-in-repl:hover::after {\n\t\tcolor: white;\n\t\tbackground-color: rgba(170,30,30,1);\n\t}\n\n\tblockquote[svelte-1297942678], [svelte-1297942678] blockquote {\n\t\tposition: relative;\n\t\tcolor: #999;\n\t\tmargin: 1em 0;\n\t\tpadding: 0.5em 0 0.5em 2em;\n\t\tmax-width: 48em;\n\t\tborder-top: 1px solid #eee;\n\t\tborder-bottom: 1px solid #eee;\n\t}\n\n\tblockquote[svelte-1297942678] p, [svelte-1297942678] blockquote p {\n\t\tcolor: #666;\n\t}\n\n\tblockquote[svelte-1297942678] p:last-child, [svelte-1297942678] blockquote p:last-child {\n\t\tmargin: 0;\n\t}\n\n\tblockquote[svelte-1297942678]::before, [svelte-1297942678] blockquote::before {\n\t\tcontent: '!';\n\t\tposition: absolute;\n\t\tleft: 0.5em;\n\t\ttop: 0.8em;\n\t\tcolor: rgba(170,0,0, 0.7);\n\t\tfont-size: 0.8em;\n\t\tfont-weight: 800;\n\t\twidth: 1em;\n\t\theight: 1em;\n\t\ttext-align: center;\n\t\tline-height: 1;\n\t\tpadding: 0.15em 0.1em 0.1em 0.1em;\n\t\tborder-radius: 50%;\n\t\tborder: 2px solid rgba(170,30,30,0.7);\n\t}\n\n\t@media (min-width: 768px) {\n\t\t[svelte-1297942678].sidebar, [svelte-1297942678] .sidebar {\n\t\t\tdisplay: block;\n\t\t}\n\n\t\t[svelte-1297942678].content, [svelte-1297942678] .content {\n\t\t\tpadding: 0 2em 2em 16em;\n\t\t}\n\n\t\th2[svelte-1297942678], [svelte-1297942678] h2 {\n\t\t\tpadding: 7rem 0 0 0;\n\t\t\tmargin: -4rem 0 1rem 0;\n\t\t}\n\n\t\th3[svelte-1297942678], [svelte-1297942678] h3 {\n\t\t\tpadding-top: 7rem;\n\t\t\tmargin: -4em 0 0 0;\n\t\t}\n\t}\n\n";
	appendNode( style, document.head );

	addedCss$3 = true;
}

function renderMainFragment$3 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-1297942678', '' );
	component.refs.container = div;
	div.className = "content";
	
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, div );
	var eachBlock_value = root.sections;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock$1( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}
	
	var text = createText( "\n\n" );
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-1297942678', '' );
	div1.className = "sidebar";
	
	var guideContents = new template.components.GuideContents({
		target: div1,
		_root: component._root || component
	});
	
	component.refs.contents = guideContents;

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			insertNode( text, target, anchor );
			insertNode( div1, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var eachBlock_value = root.sections;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock$1( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			if ( component.refs.container === div ) { component.refs.container = null; }
			
			teardownEach( eachBlock_iterations, false );
			
			if ( component.refs.contents === guideContents ) { component.refs.contents = null; }
			guideContents.destroy( false );
			
			if ( detach ) {
				detachNode( div );
				detachNode( text );
				detachNode( div1 );
			}
		}
	};
}

function renderEachBlock$1 ( root, eachBlock_value, section, section__index, component ) {
	var section1 = createElement( 'section' );
	setAttribute( section1, 'svelte-1297942678', '' );
	var last_section1_id = section.slug;
	section1.id = last_section1_id;
	
	var h2 = createElement( 'h2' );
	setAttribute( h2, 'svelte-1297942678', '' );
	
	appendNode( h2, section1 );
	var last_text = section.metadata.title;
	var text = createText( last_text );
	appendNode( text, h2 );
	appendNode( createText( "\n\t\t\t" ), section1 );
	var raw_before = createElement( 'noscript' );
	appendNode( raw_before, section1 );
	var raw_after = createElement( 'noscript' );
	appendNode( raw_after, section1 );
	var last_raw = section.html;
	raw_before.insertAdjacentHTML( 'afterend', last_raw );

	return {
		mount: function ( target, anchor ) {
			insertNode( section1, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, section, section__index ) {
			var __tmp;
		
			if ( ( __tmp = section.slug ) !== last_section1_id ) {
				last_section1_id = __tmp;
				section1.id = last_section1_id;
			}
			
			if ( ( __tmp = section.metadata.title ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			if ( ( __tmp = section.html ) !== last_raw ) {
				last_raw = __tmp;
				detachBetween( raw_before, raw_after );
				raw_before.insertAdjacentHTML( 'afterend', last_raw );
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachBetween( raw_before, raw_after );
				
				detachNode( section1 );
			}
		}
	};
}

function Guide ( options ) {
	options = options || {};
	this.refs = {};
	this._state = options.data || {};
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss$3 ) { addCss$3(); }
	this._renderHooks = [];
	
	this._fragment = renderMainFragment$3( this._state, this );
	if ( options.target ) { this._fragment.mount( options.target, null ); }
	
	this._flush();
	
	if ( options._root ) {
		options._root._renderHooks.push({ fn: template.oncreate, context: this });
	} else {
		template.oncreate.call( this );
	}
}

Guide.prototype = Object.assign( {}, proto );

Guide.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) { this._fragment.update( newState, this._state ); }
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	this._flush();
};

Guide.prototype.teardown = Guide.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var template$3 = (function () {
	return {
		oncreate: function oncreate () {
			var this$1 = this;

			var updating = false;

			this.editor = window.CodeMirror.fromTextArea( this.refs.editor, {
				lineNumbers: true,
				lineWrapping: true,
				value: this.get( 'code' ),
				mode: this.get( 'mode' ),
				readOnly: this.get( 'readonly' )
			});

			// TODO this is a bug. oncreate should only be called once
			// the component is actually in the DOM
			setTimeout( function () {
				this$1.editor.refresh();
			});

			this.editor.on( 'change', function (instance) {
				if ( !updating ) {
					updating = true;
					this$1.set({ code: instance.getValue() });
					updating = false;
				}
			});

			this.observe( 'code', function (code) {
				if ( !updating && code != null ) {
					updating = true;
					this$1.editor.setValue( code );
					updating = false;
				}
			});

			var marker;
			this.observe( 'error', function (error) {
				if ( marker ) { marker.clear(); }
				if ( error && error.pos != null ) {
					var ref = this$1.editor.getDoc().posFromIndex( error.pos );
					var line = ref.line;
					var ch = ref.ch;

					marker = this$1.editor.markText({ line: line, ch: ch }, { line: line, ch: ch + 1 }, {
						className: 'error-loc'
					});
				}
			});

			this.on( 'teardown', function () {
				this$1.editor.toTextArea();
			});
		},

		methods: {
			resize: function resize () {
				this.editor.refresh();
			}
		}
	};
}());

var addedCss$6 = false;
function addCss$6 () {
	var style = createElement( 'style' );
	style.textContent = "\n\t[svelte-1072534328].CodeMirror, [svelte-1072534328] .CodeMirror {\n\t\tborder-radius: 3px;\n\t\tfont-family: Inconsolata, monospace;\n\t\tfont-size: 16px;\n\t\tline-height: 1.2;\n\t\tfont-weight: 400;\n\t\tcolor: #333;\n\t}\n\n\t[svelte-1072534328].CodeMirror, [svelte-1072534328] .CodeMirror {\n\t\theight: auto;\n\t}\n\n\t[svelte-1072534328].CodeMirror-scroll, [svelte-1072534328] .CodeMirror-scroll {\n\t\t\n\t}\n\n\t[svelte-1072534328].CodeMirror-gutters, [svelte-1072534328] .CodeMirror-gutters {\n\t\tborder-right: 1px solid #eee;\n\t}\n\n\t[svelte-1072534328].codemirror-container, [svelte-1072534328] .codemirror-container {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t}\n\n\t[svelte-1072534328].codemirror-container .CodeMirror, [svelte-1072534328] .codemirror-container .CodeMirror {\n\t\theight: 100%;\n\t}\n\n\ttextarea[svelte-1072534328], [svelte-1072534328] textarea {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tborder: none;\n\t}\n\n\t[svelte-1072534328].error, [svelte-1072534328] .error {\n\t\tposition: absolute;\n\t\twidth: 100%;\n\t\tbottom: 0;\n\t\tpadding: 0.5em;\n\t\tbackground-color: rgb(255,220,220);\n\t\tborder-top: 1px solid rgb(200,0,0);\n\t\tcolor: rgb(200,0,0);\n\t\tz-index: 999;\n\t\topacity: 0;\n\t\t-webkit-animation: fade-in 0.4s 1;\n\t\t-webkit-animation-delay: 0.5s;\n\t\t-webkit-animation-fill-mode: forwards;\n\t\tanimation: fade-in 0.4s 1;\n\t\tanimation-delay: 0.5s;\n\t\tanimation-fill-mode: forwards;\n\t}\n\n\t[svelte-1072534328].error-loc, [svelte-1072534328] .error-loc {\n\t\tposition: relative;\n\t}\n\n\t[svelte-1072534328].error-loc::before, [svelte-1072534328] .error-loc::before {\n\t\tposition: absolute;\n\t\tcontent: '^';\n\t\tdisplay: inline-block;\n\t\tbottom: -1.2em;\n\t\tleft: -0.2em;\n\t\t\n\t\tbackground-color: white;\n\t\tcolor: rgb(200,0,0);\n\t\tfont-size: 1em;\n\t\tfont-weight: 500;\n\t\t\n\t\t\n\t\tborder-radius: 50%;\n\t\t-webkit-animation: pulse 1s infinite;\n\t\tanimation: pulse 1s infinite;\n\t}\n";
	appendNode( style, document.head );

	addedCss$6 = true;
}

function renderMainFragment$6 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-1072534328', '' );
	div.className = "codemirror-container";
	
	var textarea = createElement( 'textarea' );
	setAttribute( textarea, 'svelte-1072534328', '' );
	component.refs.editor = textarea;
	
	appendNode( textarea, div );
	appendNode( createText( "\n\n\t" ), div );
	var ifBlock_anchor = createComment();
	appendNode( ifBlock_anchor, div );
	
	function getBlock ( root ) {
		if ( root.error ) { return renderIfBlock_0$1; }
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) { ifBlock.teardown( true ); }
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }
			}
		},
		
		teardown: function ( detach ) {
			if ( component.refs.editor === textarea ) { component.refs.editor = null; }
			if ( ifBlock ) { ifBlock.teardown( false ); }
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function renderIfBlock_0$1 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-1072534328', '' );
	div.className = "error";
	
	var last_text = root.error.message;
	var text = createText( last_text );
	appendNode( text, div );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = root.error.message ) !== last_text ) {
				text.data = last_text = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function CodeMirror ( options ) {
	options = options || {};
	this.refs = {};
	this._state = options.data || {};
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss$6 ) { addCss$6(); }
	
	this._fragment = renderMainFragment$6( this._state, this );
	if ( options.target ) { this._fragment.mount( options.target, null ); }
	
	if ( options._root ) {
		options._root._renderHooks.push({ fn: template$3.oncreate, context: this });
	} else {
		template$3.oncreate.call( this );
	}
}

CodeMirror.prototype = Object.assign( {}, template$3.methods, proto );

CodeMirror.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) { this._fragment.update( newState, this._state ); }
	dispatchObservers( this, this._observers.post, newState, oldState );
};

CodeMirror.prototype.teardown = CodeMirror.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var template$4 = (function () {
	var importCache = {};

	function fetchImport ( x ) {
		return new Promise( function ( fulfil, reject ) {
			curl([ ("https://wzrd.in/standalone/" + (x.source) + "@latest") ]).then( function (module) {
				importCache[ x.source ] = module;
				fulfil( module );
			}, function (err) {
				console.error( err.stack );
				reject( new Error( ("Error loading " + (x.source) + " from wzrd.in") ) );
			});
		});
	}

	var namespaceSpecifier = /\*\s+as\s+(\w+)/;
	var namedSpecifiers = /\{(.+)\}/;

	function parseSpecifiers ( specifiers ) {
		specifiers = specifiers.trim();

		var match = namespaceSpecifier.exec( specifiers );
		if ( match ) {
			return {
				namespace: true,
				name: match[1]
			};
		}

		var names = [];

		specifiers = specifiers.replace( namedSpecifiers, function ( match, str ) {
			names = str.split( ',' ).map( function (name) {
				var split = name.split( 'as' );
				var exported = split[0].trim();
				var local = ( split[1] || exported ).trim();

				return { local: local, exported: exported };
			});

			return '';
		});

		match = /\w+/.exec( specifiers );

		return {
			namespace: false,
			names: names,
			default: match ? match[0] : null
		};
	}

	return {
		oncreate: function oncreate () {
			var this$1 = this;

			var component;

			this.refs.child.addEventListener( 'load', function () {
				var iframe = this$1.refs.child;
				var body = iframe.contentDocument.body;
				var evalInIframe = iframe.contentWindow.eval;

				var promise = null;
				var observers = null;
				var updating = null;

				var toTeardown = null;

				this$1.observe( 'compiled', function (compiled) {
					if ( !compiled ) { return; }
					if ( promise ) { promise.cancel(); }

					toTeardown = component;
					component = null;

					setTimeout( function () { // necessary because `data` is not yet updated. TODO would be nice to fix this
						var imports = [];
						var pattern = /\bimport\s+(?:(.+)\s+from\s+)?[\'"]([^"\']+)["\']/g; // https://gist.github.com/pilwon/ff55634a29bb4456e0dd

						var code = compiled.code
							.replace( pattern, function ( match, specifiers, source ) {
								imports.push({
									specifiers: parseSpecifiers( specifiers ),
									source: source
								});

								return '';
							})
							.replace( 'export default ', '' ) + '\n\nreturn SvelteComponent;';

						var missingImports = imports.filter( function (x) { return !importCache[ x.source ]; } );

						var createComponent = function () {
							this$1.set({ error: null });

							if ( toTeardown ) {
								var styles = iframe.contentDocument.querySelectorAll( 'style' );
								var i = styles.length;
								while ( i-- ) { styles[i].parentNode.removeChild( styles[i] ); }

								toTeardown.teardown();
							}

							imports.forEach( function (x) {
								var module = importCache[ x.source ];

								if ( x.specifiers.namespace ) {
									iframe.contentWindow[ x.specifiers.name ] = module;
								} else {
									if ( x.specifiers.default ) {
										iframe.contentWindow[ x.specifiers.default ] = 'default' in module ? module.default : module;
									}

									x.specifiers.names.forEach( function (name) {
										iframe.contentWindow[ name.local ] = module[ name.exported ];
									});
								}
							});

							var data = this$1.get( 'data' );

							try {
								evalInIframe( ("\n\t\t\t\t\t\t\t\t\tvar SvelteComponent = (function () { " + code + " }());\n\t\t\t\t\t\t\t\t\tdocument.body.innerHTML = '';\n\t\t\t\t\t\t\t\t\tvar component = new SvelteComponent({\n\t\t\t\t\t\t\t\t\t\ttarget: document.body,\n\t\t\t\t\t\t\t\t\t\tdata: " + (JSON.stringify(data)) + "\n\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t"));

								component = window.component = iframe.contentWindow.component;

								observers = Object.keys( data ).map( function (key) {
									return component.observe( key, function (value) {
										if ( updating ) { return; }

										updating = true;
										this$1.fire( 'change', { key: key, value: value });
										updating = false;
									}, { init: false });
								});
							} catch ( error ) {
								// TODO show in UI
								component = null;
								observers = null;

								console.error( error.stack );

								this$1.set({ error: error });
							}
						};

						var pendingImports = missingImports.length;
						this$1.set({ pendingImports: pendingImports });

						if ( missingImports.length ) {
							var cancelled = false;

							promise = Promise.all(
								missingImports.map( function (id) { return fetchImport( id ).then( function (module) {
									pendingImports -= 1;
									this$1.set({ pendingImports: pendingImports });
									return module;
								}); })
							);
							promise.cancel = function () { return cancelled = true; };

							promise
								.then( function () {
									if ( cancelled ) { return; }
									createComponent();
								})
								.catch( function (error) {
									if ( cancelled ) { return; }
									this$1.set({ error: error });
								});
						} else {
							createComponent();
						}
					});
				});

				this$1.observe( 'data', function (data) {
					try {
						if ( observers ) {
							observers.forEach( function (observer) { return observer.cancel(); } );
						}

						if ( component ) {
							updating = true;
							component.set( data );
							updating = false;

							observers = Object.keys( data ).map( function (key) {
								return component.observe( key, function (value) {
									if ( updating ) { return; }

									updating = true;
									this$1.fire( 'change', { key: key, value: value });
									updating = false;
								}, { init: false });
							});
						}
					} catch ( err ) {
						// TODO show the error in the UI
						console.error( err );
					}
				});
			});
		}
	};
}());

var addedCss$7 = false;
function addCss$7 () {
	var style = createElement( 'style' );
	style.textContent = "\n\tiframe[svelte-1185564248], [svelte-1185564248] iframe {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tborder: none;\n\t}\n\n\t[svelte-1185564248].greyed-out, [svelte-1185564248] .greyed-out {\n\t\tfilter: grayscale(100%);\n\t\topacity: 0.4;\n\t}\n\n\t[svelte-1185564248].overlay, [svelte-1185564248] .overlay {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\twidth: 100%;\n\t\tpadding: 1em;\n\t\tpointer-events: none;\n\t}\n\n\t[svelte-1185564248].overlay p, [svelte-1185564248] .overlay p {\n\t\tposition: relative;\n\t\tborder-radius: 0.2em;\n\t\tmargin: 0;\n\t\tpadding: 0.5em 0.5em 0.5em 2.5em;\n\t\tcolor: white;\n\t}\n\n\t[svelte-1185564248].overlay p::before, [svelte-1185564248] .overlay p::before {\n\t\tcontent: '!';\n\t\tposition: absolute;\n\t\tleft: 0.7em;\n\t\ttop: 0.55em;\n\t\tfont-size: 0.8em;\n\t\tfont-weight: 800;\n\t\twidth: 1em;\n\t\theight: 1em;\n\t\ttext-align: center;\n\t\tline-height: 1;\n\t\tpadding: 0.2em 0.15em 0.1em 0.15em;\n\t\tborder-radius: 50%;\n\t\tcolor: white;\n\t\tborder: 2px solid white;\n\t}\n\n\t[svelte-1185564248].error, [svelte-1185564248] .error {\n\t\tbackground-color: rgb(170,30,30);\n\t}\n\n\t[svelte-1185564248].info, [svelte-1185564248] .info {\n\t\tbackground-color: #666;\n\t}\n";
	appendNode( style, document.head );

	addedCss$7 = true;
}

function renderMainFragment$7 ( root, component ) {
	var iframe = createElement( 'iframe' );
	setAttribute( iframe, 'svelte-1185564248', '' );
	component.refs.child = iframe;
	var last_iframe_class = root.error || root.pendingImports ? "greyed-out" : "";
	iframe.className = last_iframe_class;
	iframe.srcdoc = "\n\t<!doctype html>\n\t<html>\n\t\t<head>\n\t\t\t<link rel=\"stylesheet\" href=\"/repl-viewer.css\">\n\t\t</head>\n\t\t<body></body>\n\t</html>\n";
	
	var text = createText( "\n\n" );
	
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-1185564248', '' );
	div.className = "overlay";
	
	var ifBlock_anchor = createComment();
	appendNode( ifBlock_anchor, div );
	
	function getBlock ( root ) {
		if ( root.error ) { return renderIfBlock_0$2; }
		if ( root.pendingImports ) { return renderIfBlock_1$1; }
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }

	return {
		mount: function ( target, anchor ) {
			insertNode( iframe, target, anchor );
			insertNode( text, target, anchor );
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = root.error || root.pendingImports ? "greyed-out" : "" ) !== last_iframe_class ) {
				last_iframe_class = __tmp;
				iframe.className = last_iframe_class;
			}
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) { ifBlock.teardown( true ); }
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }
			}
		},
		
		teardown: function ( detach ) {
			if ( component.refs.child === iframe ) { component.refs.child = null; }
			if ( ifBlock ) { ifBlock.teardown( false ); }
			
			if ( detach ) {
				detachNode( iframe );
				detachNode( text );
				detachNode( div );
			}
		}
	};
}

function renderIfBlock_1$1 ( root, component ) {
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-1185564248', '' );
	p.className = "info";
	
	appendNode( createText( "loading " ), p );
	var last_text1 = root.pendingImports;
	var text1 = createText( last_text1 );
	appendNode( text1, p );
	appendNode( createText( " " ), p );
	var last_text3 = root.pendingImports === 1 ? 'dependency' : 'dependencies';
	var text3 = createText( last_text3 );
	appendNode( text3, p );
	appendNode( createText( " from wzrd.in" ), p );

	return {
		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = root.pendingImports ) !== last_text1 ) {
				text1.data = last_text1 = __tmp;
			}
			
			if ( ( __tmp = root.pendingImports === 1 ? 'dependency' : 'dependencies' ) !== last_text3 ) {
				text3.data = last_text3 = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( p );
			}
		}
	};
}

function renderIfBlock_0$2 ( root, component ) {
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-1185564248', '' );
	p.className = "error";
	
	var last_text = root.error.message;
	var text = createText( last_text );
	appendNode( text, p );

	return {
		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = root.error.message ) !== last_text ) {
				text.data = last_text = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( p );
			}
		}
	};
}

function Viewer ( options ) {
	options = options || {};
	this.refs = {};
	this._state = options.data || {};
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss$7 ) { addCss$7(); }
	
	this._fragment = renderMainFragment$7( this._state, this );
	if ( options.target ) { this._fragment.mount( options.target, null ); }
	
	if ( options._root ) {
		options._root._renderHooks.push({ fn: template$4.oncreate, context: this });
	} else {
		template$4.oncreate.call( this );
	}
}

Viewer.prototype = Object.assign( {}, proto );

Viewer.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) { this._fragment.update( newState, this._state ); }
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Viewer.prototype.teardown = Viewer.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

// this file is auto-generated, don't edit it
var examples = [{"id":"hello-world","title":"Hello World!"},{"id":"if-blocks","title":"If blocks"},{"id":"each-blocks","title":"Each blocks"},{"id":"scoped-styles","title":"Scoped styles"},{"id":"svg-clock","title":"SVG Clock"},{"id":"line-chart","title":"Line chart"},{"id":"area-chart","title":"Area chart"},{"id":"bar-chart","title":"Bar chart"},{"id":"self-references","title":"Self-references"}];

var cache = {};

function getComponentFromGist ( id ) {
	var cancelled = false;

	if ( !cache[ id ] ) {
		cache[ id ] = new Promise( function ( resolve, reject ) {
			var request = new XMLHttpRequest();
			request.open( 'GET', ("https://api.github.com/gists/" + id) );
			request.onload = function () { return resolve( request ); };
			request.onerror = function () { return reject( new TypeError('Network request failed') ); };
			request.send();
		} )
			.then( function (r) { return JSON.parse(r.responseText); } )
			.then( function (gist) {
				var sourceFile = gist.files[ 'component.html' ];
				var source = sourceFile && sourceFile.content;

				var jsonFile = gist.files[ 'data.json' ];
				var json = jsonFile && jsonFile.content;

				return {
					id: id,
					source: source,
					json: json || '{}'
				};
			})
			.catch( function (err) {
				cache[ id ] = null;
				throw err;
			});
	}

	var promise = cache[ id ].then( function (component) {
		if ( cancelled ) { throw new Error( "Request was cancelled" ); }
		return component;
	});

	promise.cancel = function () {
		cancelled = true;
	};

	return promise;
}

function saveComponentAsGist ( source, json ) {
	var body = JSON.stringify({
		description: 'Svelte component',
		public: true,
		files: {
			'component.html': {
				content: source
			},
			'data.json': {
				content: json
			}
		}
	});

	return new Promise( function ( resolve, reject ) {
		var request = new XMLHttpRequest();
		request.open( 'POST', "https://api.github.com/gists" );
		request.onload = function () { return resolve( request ); };
		request.onerror = function () { return reject( new TypeError('Network request failed') ); };
		request.send(body);
	} )
		.then( function (r) { return JSON.parse(r.responseText); } )
		.then( function (gist) { return gist.id; } );
}

var cache$1 = {};



function css ( href ) {
	if ( !cache$1[ href ] ) {
		cache$1[ href ] = new Promise( function ( fulfil, reject ) {
			var link = document.createElement( 'link' );

			link.onload = fulfil;

			link.onerror = function (err) {
				cache$1[ href ] = null;
				reject( err );
			};

			link.rel = 'stylesheet';
			link.href = href;

			document.querySelector( 'head' ).appendChild( link );
		});
	}

	return cache$1[ href ];
}

function getJSON ( url ) {
	return new Promise( function ( fulfil, reject ) {
		var xhr = new XMLHttpRequest();
		xhr.open( 'GET', url );

		xhr.onload = function () {
			fulfil( JSON.parse( xhr.responseText ) );
		};

		xhr.onerror = reject;

		xhr.send();
	});
}

var template$2 = (function () {
	var sourceById = {};

	function loadCodemirror () {
		return Promise.all([
			curl([ '/codemirror.js' ]),
			css( '/codemirror.css' ) ]).then( function (ref) {
			var CodeMirror$$1 = ref[0];

			return ( window.CodeMirror = CodeMirror$$1 );
		});
	}

	var versionMatch = typeof window !== 'undefined' && /version=([^&]+)/.exec( window.location.search );

	function loadSvelte () {
		var url = versionMatch ?
			'https://unpkg.com/svelte@' + versionMatch[1] + '/compiler/svelte.js' :
			'https://unpkg.com/svelte/compiler/svelte.js';

		return curl([ url ]);
	}

	function tryParseData ( encoded ) {
		try {
			return JSON.parse( decodeURIComponent( atob( encoded ) ) );
		} catch ( err ) {
			return {};
		}
	}

	return {
		data: function data () {
			var search = typeof window !== 'undefined' ? window.location.search : '';
			var dataMatch = /data=([^&]+)$/.exec( search ); // TODO I think this is legacy... can probably remove
			var gistMatch = /gist=([^&]+)$/.exec( search );
			var exampleMatch = /example=([^&]+)$/.exec( search );

			var gist = null;
			var source = null;
			var selectedExample = null;
			var data = {};

			if ( dataMatch ) {
				var assign;
				((assign = tryParseData( dataMatch[1] ), source = assign.source, data = assign.data));
			}

			if ( !source ) {
				if ( gistMatch ) {
					gist = gistMatch[1];
				} else {
					selectedExample = exampleMatch ? exampleMatch[1] : examples[0].id;
				}
			}

			return {
				horizontalDividerPos: 50,
				verticalDividerPos: 50,

				examples: examples,
				selectedExample: selectedExample,

				gist: gist,
				source: source,
				data: data,
				json: JSON.stringify( data, null, '  ' ),

				loadedCodemirror: false
			};
		},

		methods: {
			setHorizontal: function setHorizontal ( event ) {
				var ref = this.refs.right.getBoundingClientRect();
				var top = ref.top;
				var bottom = ref.bottom;

				this.set({
					horizontalDividerPos: 100 * ( event.clientY - top ) / ( bottom - top )
				});

				this.refs.data.resize();
			},

			setVertical: function setVertical ( event ) {
				this.set({
					verticalDividerPos: 100 * event.clientX / window.innerWidth
				});

				this.refs.editor.resize();
				this.refs.data.resize();
			},

			updateData: function updateData (ref) {
				var key = ref.key;
				var value = ref.value;

				var data = JSON.parse( this.get( 'json' ) );
				data[ key ] = value;
				this.set({ json: JSON.stringify( data, null, '  ' ) });
			},

			save: function save () {
				var this$1 = this;

				this.set({ saving: true });

				saveComponentAsGist( this.get( 'source' ), this.get( 'json' ) ).then( function (id) {
					this$1.updateUrl();
					this$1.set({ saving: false });
				});
			},

			updateUrl: function updateUrl () {
				if ( typeof history === 'undefined' ) { return; }

				var gist = this.get( 'gist' );
				var selectedExample = this.get( 'selectedExample' );

				var params = {};
				if ( typeof svelte !== 'undefined' ) {
					params.version = svelte.VERSION;
				} else if ( versionMatch ) {
					params.version = versionMatch[1];
				}

				if ( gist ) {
					params.gist = gist;
				} else if ( selectedExample ) {
					params.example = selectedExample;
				}

				var queryString = Object.keys( params ).map( function (key) { return (key + "=" + (params[key])); } ).join( '&' );
				var url = queryString ? ("/repl?" + queryString) : '/repl';

				history.replaceState( {}, 'x', url );
			}
		},

		oncreate: function oncreate () {
			var this$1 = this;

			loadCodemirror().then( function () {
				this$1.set({ loadedCodemirror: true });
			});

			this.observe( 'selectedExample', function (id) {
				if ( !id ) { return; }

				getJSON( ("/examples/" + id + ".json") ).then( function (example) {
					this$1.set( { source: example.source, json: JSON.stringify( example.data , null, '  ' ) } );
				});

				this$1.set({ gist: null });
				this$1.updateUrl();
			});

			if ( !this.get( 'gist' ) ) {
				this.set({ json: JSON.stringify( this.get( 'data' ), null, '  ' ) });
			}

			this.observe( 'gist', function (gist) {
				if ( !gist ) { return; }

				if ( this$1.promise ) { this$1.promise.cancel(); }
				this$1.promise = getComponentFromGist( gist );

				this$1.promise
					.then( function (ref) {
						var source = ref.source;
						var json = ref.json;

						sourceById[ gist ] = source;
						this$1.set({ source: source, json: json });
					})
					.catch( function (err) {
						alert( 'Error loading from gist.github.com – please try again later!' );
						console.error( err.stack );
					});

				this$1.set({ selectedExample: null });
				this$1.updateUrl();
			});

			loadSvelte().then( function (svelte) {
				console.log( ("running Svelte compiler version %c" + (svelte.VERSION)), 'font-weight: bold' );
				window.svelte = svelte;

				this$1.set({ loadedSvelte: true });

				this$1.observe( 'source', function (source) {
					if ( !source ) { return; }

					var expectedSource = sourceById[ this$1.get( 'gist' ) ];

					if ( source && expectedSource && source !== expectedSource ) {
						this$1.set({ gist: null });
					}

					try {
						var compiled = svelte.compile( source );
						this$1.set({ compiled: compiled, sourceError: null });
					} catch ( err ) {
						console.error( err.stack );

						this$1.set({
							sourceError: { message: err.shortMessage || err.message, pos: err.pos }
						});
					}
				});

				this$1.updateUrl();
			});

			this.observe( 'json', function (json) {
				var data;

				try {
					data = JSON.parse( json );
					this$1.set({ dataError: null });
				} catch ( err ) {
					console.error( err.stack );

					var match = /(.+)in JSON at position (\d+)/.exec( err.message );

					if ( match ) {
						this$1.set({
							dataError: { message: match[1], pos: +match[2] }
						});
					}
				}

				if ( data ) {
					this$1.set({ data: data });
				}
			});
		},

		events: {
			drag: function drag ( node, callback ) {
				var this$1 = this;

				var mousedown = function (event) {
					if ( event.which !== 1 ) { return; }

					event.preventDefault();

					this$1.set({ dragging: true });

					var onmouseup = function () {
						this$1.set({ dragging: false });

						window.removeEventListener( 'mousemove', callback, false );
						window.removeEventListener( 'mouseup', onmouseup, false );
					};

					window.addEventListener( 'mousemove', callback, false );
					window.addEventListener( 'mouseup', onmouseup, false );
				};

				node.addEventListener( 'mousedown', mousedown, false );

				return {
					teardown: function teardown () {
						node.removeEventListener( 'mousedown', onmousedown, false );
					}
				};
			}
		},

		components: {
			CodeMirror: CodeMirror,
			Viewer: Viewer
		}
	};
}());

var addedCss$5 = false;
function addCss$5 () {
	var style = createElement( 'style' );
	style.textContent = "\n\t@keyframes svelte-4194056845-pulse {\n\t\t0%   { opacity: 1; transform: scale(1.5); }\n\t\t50%  { opacity: 0; transform: scale(1); }\n\t\t100% { opacity: 1; transform: scale(1.5); }\n\t}\n\n\t@-webkit-keyframes pulse {\n\t\t[svelte-4194056845]0%, [svelte-4194056845] 0%   { opacity: 1; transform: scale(1.5); }\n\t\t[svelte-4194056845]50%, [svelte-4194056845] 50%  { opacity: 0; transform: scale(1); }\n\t\t[svelte-4194056845]100%, [svelte-4194056845] 100% { opacity: 1; transform: scale(1.5); }\n\t}\n\n\t@keyframes svelte-4194056845-fade-in {\n\t\t0%   { opacity: 0; }\n\t\t100% { opacity: 1; }\n\t}\n\n\t@-webkit-keyframes fade-in {\n\t\t[svelte-4194056845]0%, [svelte-4194056845] 0%   { opacity: 0; }\n\t\t[svelte-4194056845]100%, [svelte-4194056845] 100% { opacity: 1; }\n\t}\n\n\t[svelte-4194056845].screen-too-small, [svelte-4194056845] .screen-too-small {\n\t\ttext-align: center;\n\t\tmargin: 0;\n\t\tpadding: 4em 3em 8em 3em;\n\t\tline-height: 1.5;\n\t}\n\n\t[svelte-4194056845].left, [svelte-4194056845] .left, [svelte-4194056845].right, [svelte-4194056845] .right {\n\t\tposition: relative;\n\t\theight: 100%;\n\t\tfloat: left;\n\t\tdisplay: none;\n\t}\n\n\t[svelte-4194056845].divider, [svelte-4194056845] .divider {\n\t\tposition: absolute;\n\t\tz-index: 10;\n\t\tdisplay: none;\n\t}\n\n\t@media (min-width: 768px) {\n\t\t[svelte-4194056845].repl-container, [svelte-4194056845] .repl-container {\n\t\t\theight: calc(100vh - 4em);\n\t\t}\n\n\t\t[svelte-4194056845].screen-too-small, [svelte-4194056845] .screen-too-small {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t[svelte-4194056845].left, [svelte-4194056845] .left, [svelte-4194056845].right, [svelte-4194056845] .right, [svelte-4194056845].divider, [svelte-4194056845] .divider {\n\t\t\tdisplay: block;\n\t\t}\n\t}\n\n\t[svelte-4194056845].divider::after, [svelte-4194056845] .divider::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tbackground-color: #eee;\n\t}\n\n\t[svelte-4194056845].vertical-divider, [svelte-4194056845] .vertical-divider {\n\t\tpadding: 0 8px;\n\t\twidth: 0;\n\t\theight: 100%;\n\t\tcursor: ew-resize;\n\t}\n\n\t[svelte-4194056845].vertical-divider::after, [svelte-4194056845] .vertical-divider::after {\n\t\tleft: 8px;\n\t\ttop: 0;\n\t\twidth: 1px;\n\t\theight: 100%;\n\t}\n\n\t[svelte-4194056845].horizontal-divider, [svelte-4194056845] .horizontal-divider {\n\t\tpadding: 8px 0;\n\t\twidth: 100%;\n\t\theight: 0;\n\t\tcursor: ns-resize;\n\t}\n\n\t[svelte-4194056845].horizontal-divider::after, [svelte-4194056845] .horizontal-divider::after {\n\t\ttop: 8px;\n\t\tleft: 0;\n\t\twidth: 100%;\n\t\theight: 1px;\n\t}\n\n\t[svelte-4194056845].loading, [svelte-4194056845] .loading {\n\t\ttext-align: center;\n\t\tcolor: #999;\n\t\tfont-weight: 300;\n\t\tmargin: 2em 0 0 0;\n\t}\n\n\tsection[svelte-4194056845], [svelte-4194056845] section {\n\t\tpadding: 3em 0 0 0;\n\t\theight: 100%;\n\t}\n\n\t[svelte-4194056845].controls, [svelte-4194056845] .controls {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 100%;\n\t\theight: 3em;\n\t\tpadding: 0.5em;\n\t\tbackground-color: #f7f7f7;\n\t\tborder-bottom: 1px solid #eee;\n\t\tbox-sizing: border-box;\n\t}\n\n\t[svelte-4194056845].controls button, [svelte-4194056845] .controls button {\n\t\tdisplay: block;\n\t\tfloat: left;\n\t\tpadding: calc(0.5em - 1px) 1em;\n\t\tmargin: 0 0.5em 0 0;\n\t\tborder-radius: 0.2em;\n\t\tcolor: rgb(170,30,30);\n\t\tborder: 1px solid rgb(170,30,30);\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tfont-weight: 500;\n\t\tfont-size: inherit;\n\t\toutline: none;\n\t\tline-height: 1;\n\t\tbox-sizing: border-box;\n\t\tbackground-color: white;\n\t\tcursor: pointer;\n\t}\n\n\t[svelte-4194056845].controls button.active, [svelte-4194056845] .controls button.active {\n\t\tbackground-color: rgb(170,30,30);\n\t\tcolor: white;\n\t}\n\n\tselect[svelte-4194056845], [svelte-4194056845] select {\n\t\tposition: absolute;\n\t\tright: 0.5em;\n\t\ttop: 50%;\n\t\ttransform: translate(0,-50%);\n\t}\n\n\t[svelte-4194056845].mousecatcher, [svelte-4194056845] .mousecatcher {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tbackground: rgba(255,255,255,0.01);\n\t}\n";
	appendNode( style, document.head );

	addedCss$5 = true;
}

function renderMainFragment$5 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-4194056845', '' );
	div.className = "repl-container";
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-4194056845', '' );
	div1.className = "left";
	div1.style.cssText = "width: " + ( root.verticalDividerPos ) + "%;";
	
	appendNode( div1, div );
	
	var section = createElement( 'section' );
	setAttribute( section, 'svelte-4194056845', '' );
	section.className = "input";
	
	appendNode( section, div1 );
	
	var div2 = createElement( 'div' );
	setAttribute( div2, 'svelte-4194056845', '' );
	div2.className = "controls";
	
	appendNode( div2, section );
	
	var button = createElement( 'button' );
	setAttribute( button, 'svelte-4194056845', '' );
	var last_button_class = root.showGenerated ? "" : "active";
	button.className = last_button_class;
	
	function clickHandler ( event ) {
		component.set({ showGenerated: false });
	}
	
	addEventListener( button, 'click', clickHandler );
	
	appendNode( button, div2 );
	appendNode( createText( "input" ), button );
	appendNode( createText( "\n\t\t\t\t" ), div2 );
	
	var button1 = createElement( 'button' );
	setAttribute( button1, 'svelte-4194056845', '' );
	var last_button1_class = root.showGenerated ? "active" : "";
	button1.className = last_button1_class;
	
	function clickHandler1 ( event ) {
		component.set({ showGenerated: true });
	}
	
	addEventListener( button1, 'click', clickHandler1 );
	
	appendNode( button1, div2 );
	appendNode( createText( "output" ), button1 );
	appendNode( createText( "\n\t\t\t\t" ), div2 );
	
	var button2 = createElement( 'button' );
	setAttribute( button2, 'svelte-4194056845', '' );
	var last_button2_class = root.saving ? "active" : "";
	button2.className = last_button2_class;
	
	function clickHandler2 ( event ) {
		component.save();
	}
	
	addEventListener( button2, 'click', clickHandler2 );
	
	appendNode( button2, div2 );
	var last_text4 = root.saving ? 'saving' : 'save';
	var text4 = createText( last_text4 );
	appendNode( text4, button2 );
	appendNode( createText( "\n\n\t\t\t\t" ), div2 );
	
	var select = createElement( 'select' );
	setAttribute( select, 'svelte-4194056845', '' );
	
	var select_updating = false;
	
	function selectChangeHandler () {
		select_updating = true;
		var selectedOption = select.selectedOptions[0] || select.options[0];
		component._set({ selectedExample: selectedOption && selectedOption.__value });
		select_updating = false;
	}
	
	addEventListener( select, 'change', selectChangeHandler );
	
	select.__svelte = {
		root: root
	};
	
	appendNode( select, div2 );
	
	var option1 = createElement( 'option' );
	setAttribute( option1, 'svelte-4194056845', '' );
	var last_option1_value = root.null;
	option1.__value = last_option1_value;
	option1.value = option1.__value;
	option1.disabled = true;
	
	appendNode( option1, select );
	appendNode( createText( "Select an example" ), option1 );
	appendNode( createText( "\n\n\t\t\t\t\t" ), select );
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, select );
	var eachBlock_value = root.examples;
	var eachBlock_iterations = [];
	
	for ( var i1 = 0; i1 < eachBlock_value.length; i1 += 1 ) {
		eachBlock_iterations[i1] = renderEachBlock$3( root, eachBlock_value, eachBlock_value[i1], i1, component );
		eachBlock_iterations[i1].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}
	
	var value = root.selectedExample;
	for ( var i = 0; i < select.options.length; i += 1 ) {
		var option = select.options[i];
	
		if ( option.__value === value ) {
			option.selected = true;
			break;
		}
	}
	
	appendNode( createText( "\n\n\t\t\t" ), section );
	var ifBlock_anchor = createComment();
	appendNode( ifBlock_anchor, section );
	
	function getBlock ( root ) {
		if ( root.loadedCodemirror ) { return renderIfBlock_0; }
		return renderIfBlock_1;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }
	appendNode( createText( "\n\n\t" ), div );
	
	var div3 = createElement( 'div' );
	setAttribute( div3, 'svelte-4194056845', '' );
	component.refs.right = div3;
	div3.className = "right";
	div3.style.cssText = "width: " + ( 100 - root.verticalDividerPos ) + "%;";
	
	appendNode( div3, div );
	
	var div4 = createElement( 'div' );
	setAttribute( div4, 'svelte-4194056845', '' );
	div4.className = "top";
	div4.style.cssText = "height: " + ( root.horizontalDividerPos ) + "%;";
	
	appendNode( div4, div3 );
	var ifBlock2_anchor = createComment();
	appendNode( ifBlock2_anchor, div4 );
	
	function getBlock2 ( root ) {
		if ( root.loadedSvelte ) { return renderIfBlock2_0; }
		return renderIfBlock2_1;
	}
	
	var currentBlock2 = getBlock2( root );
	var ifBlock2 = currentBlock2 && currentBlock2( root, component );
	
	if ( ifBlock2 ) { ifBlock2.mount( ifBlock2_anchor.parentNode, ifBlock2_anchor ); }
	appendNode( createText( "\n\n\t\t\t" ), div4 );
	var ifBlock3_anchor = createComment();
	appendNode( ifBlock3_anchor, div4 );
	
	function getBlock3 ( root ) {
		if ( root.dragging ) { return renderIfBlock3_0; }
		return null;
	}
	
	var currentBlock3 = getBlock3( root );
	var ifBlock3 = currentBlock3 && currentBlock3( root, component );
	
	if ( ifBlock3 ) { ifBlock3.mount( ifBlock3_anchor.parentNode, ifBlock3_anchor ); }
	appendNode( createText( "\n\n\t\t" ), div3 );
	
	var div5 = createElement( 'div' );
	setAttribute( div5, 'svelte-4194056845', '' );
	div5.className = "bottom";
	div5.style.cssText = "height: " + ( 100 - root.horizontalDividerPos ) + "%;";
	
	appendNode( div5, div3 );
	var ifBlock4_anchor = createComment();
	appendNode( ifBlock4_anchor, div5 );
	
	function getBlock4 ( root ) {
		if ( root.loadedCodemirror ) { return renderIfBlock4_0; }
		return renderIfBlock4_1;
	}
	
	var currentBlock4 = getBlock4( root );
	var ifBlock4 = currentBlock4 && currentBlock4( root, component );
	
	if ( ifBlock4 ) { ifBlock4.mount( ifBlock4_anchor.parentNode, ifBlock4_anchor ); }
	appendNode( createText( "\n\n\t\t" ), div3 );
	
	var div6 = createElement( 'div' );
	setAttribute( div6, 'svelte-4194056845', '' );
	div6.className = "divider horizontal-divider";
	div6.style.cssText = "top: calc(" + ( root.horizontalDividerPos ) + "% - 8px)";
	
	var dragHandler = template$2.events.drag.call( component, div6, function ( event ) {
		component.setHorizontal(event);
	});
	
	appendNode( div6, div3 );
	appendNode( createText( "\n\n\t" ), div );
	
	var div7 = createElement( 'div' );
	setAttribute( div7, 'svelte-4194056845', '' );
	div7.className = "divider vertical-divider";
	div7.style.cssText = "left: calc(" + ( root.verticalDividerPos ) + "% - 8px)";
	
	var dragHandler1 = template$2.events.drag.call( component, div7, function ( event ) {
		component.setVertical(event);
	});
	
	appendNode( div7, div );
	appendNode( createText( "\n\n\t" ), div );
	
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-4194056845', '' );
	p.className = "screen-too-small";
	
	appendNode( p, div );
	appendNode( createText( "Please open this page on a larger screen!" ), p );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			div1.style.cssText = "width: " + ( root.verticalDividerPos ) + "%;";
			
			if ( ( __tmp = root.showGenerated ? "" : "active" ) !== last_button_class ) {
				last_button_class = __tmp;
				button.className = last_button_class;
			}
			
			if ( ( __tmp = root.showGenerated ? "active" : "" ) !== last_button1_class ) {
				last_button1_class = __tmp;
				button1.className = last_button1_class;
			}
			
			if ( ( __tmp = root.saving ? "active" : "" ) !== last_button2_class ) {
				last_button2_class = __tmp;
				button2.className = last_button2_class;
			}
			
			if ( ( __tmp = root.saving ? 'saving' : 'save' ) !== last_text4 ) {
				text4.data = last_text4 = __tmp;
			}
			
			if ( !select_updating ) {
				var value = root.selectedExample;
				for ( var i = 0; i < select.options.length; i += 1 ) {
					var option = select.options[i];
				
					if ( option.__value === value ) {
						option.selected = true;
						break;
					}
				}
			}
			
			select.__svelte.root = root;
			
			if ( ( __tmp = root.null ) !== last_option1_value ) {
				last_option1_value = __tmp;
				option1.__value = last_option1_value;
			}
			
			option1.value = option1.__value;
			
			var eachBlock_value = root.examples;
			
			for ( var i1 = 0; i1 < eachBlock_value.length; i1 += 1 ) {
				if ( !eachBlock_iterations[i1] ) {
					eachBlock_iterations[i1] = renderEachBlock$3( root, eachBlock_value, eachBlock_value[i1], i1, component );
					eachBlock_iterations[i1].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i1].update( changed, root, eachBlock_value, eachBlock_value[i1], i1 );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) { ifBlock.teardown( true ); }
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }
			}
			
			div3.style.cssText = "width: " + ( 100 - root.verticalDividerPos ) + "%;";
			
			div4.style.cssText = "height: " + ( root.horizontalDividerPos ) + "%;";
			
			var _currentBlock2 = currentBlock2;
			currentBlock2 = getBlock2( root );
			if ( _currentBlock2 === currentBlock2 && ifBlock2) {
				ifBlock2.update( changed, root );
			} else {
				if ( ifBlock2 ) { ifBlock2.teardown( true ); }
				ifBlock2 = currentBlock2 && currentBlock2( root, component );
				if ( ifBlock2 ) { ifBlock2.mount( ifBlock2_anchor.parentNode, ifBlock2_anchor ); }
			}
			
			var _currentBlock3 = currentBlock3;
			currentBlock3 = getBlock3( root );
			if ( _currentBlock3 === currentBlock3 && ifBlock3) {
				ifBlock3.update( changed, root );
			} else {
				if ( ifBlock3 ) { ifBlock3.teardown( true ); }
				ifBlock3 = currentBlock3 && currentBlock3( root, component );
				if ( ifBlock3 ) { ifBlock3.mount( ifBlock3_anchor.parentNode, ifBlock3_anchor ); }
			}
			
			div5.style.cssText = "height: " + ( 100 - root.horizontalDividerPos ) + "%;";
			
			var _currentBlock4 = currentBlock4;
			currentBlock4 = getBlock4( root );
			if ( _currentBlock4 === currentBlock4 && ifBlock4) {
				ifBlock4.update( changed, root );
			} else {
				if ( ifBlock4 ) { ifBlock4.teardown( true ); }
				ifBlock4 = currentBlock4 && currentBlock4( root, component );
				if ( ifBlock4 ) { ifBlock4.mount( ifBlock4_anchor.parentNode, ifBlock4_anchor ); }
			}
			
			div6.style.cssText = "top: calc(" + ( root.horizontalDividerPos ) + "% - 8px)";
			
			div7.style.cssText = "left: calc(" + ( root.verticalDividerPos ) + "% - 8px)";
		},
		
		teardown: function ( detach ) {
			removeEventListener( button, 'click', clickHandler );
			removeEventListener( button1, 'click', clickHandler1 );
			removeEventListener( button2, 'click', clickHandler2 );
			removeEventListener( select, 'change', selectChangeHandler );
			
			teardownEach( eachBlock_iterations, false );
			
			if ( ifBlock ) { ifBlock.teardown( false ); }
			if ( component.refs.right === div3 ) { component.refs.right = null; }
			if ( ifBlock2 ) { ifBlock2.teardown( false ); }
			if ( ifBlock3 ) { ifBlock3.teardown( false ); }
			if ( ifBlock4 ) { ifBlock4.teardown( false ); }
			dragHandler.teardown();
			dragHandler1.teardown();
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function renderIfBlock4_1 ( root, component ) {
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-4194056845', '' );
	p.className = "loading";
	
	appendNode( createText( "loading editor..." ), p );

	return {
		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
		},
		
		update: noop$1,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( p );
			}
		}
	};
}

function renderIfBlock4_0 ( root, component ) {
	var codeMirror_initialData = {
		mode: "javascript",
		error: root.dataError
	};
	
	if ( 'json' in root ) { codeMirror_initialData.code = root.json; }
	var codeMirror = new template$2.components.CodeMirror({
		target: null,
		_root: component._root || component,
		data: codeMirror_initialData
	});
	
	component.refs.data = codeMirror;
	
	var codeMirror_updating = false;
	
	component._bindings.push( function () {
		if ( codeMirror._torndown ) { return; }
		codeMirror.observe( 'code', function ( value ) {
			codeMirror_updating = true;
			component._set({ json: value });
			codeMirror_updating = false;
		});
	});
	
	codeMirror._context = {
		root: root
	};

	return {
		mount: function ( target, anchor ) {
			codeMirror._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( !codeMirror_updating && 'json' in changed ) {
				codeMirror._set({ code: root.json });
			}
			
			codeMirror._context.root = root;
			
			var codeMirror_changes = {};
			
			if ( 'dataError' in changed ) { codeMirror_changes.error = root.dataError; }
			
			if ( Object.keys( codeMirror_changes ).length ) { codeMirror.set( codeMirror_changes ); }
		},
		
		teardown: function ( detach ) {
			if ( component.refs.data === codeMirror ) { component.refs.data = null; }
			codeMirror.destroy( detach );
		}
	};
}

function renderIfBlock3_0 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-4194056845', '' );
	div.className = "mousecatcher";

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: noop$1,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function renderIfBlock2_1 ( root, component ) {
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-4194056845', '' );
	p.className = "loading";
	
	appendNode( createText( "loading Svelte compiler..." ), p );

	return {
		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
		},
		
		update: noop$1,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( p );
			}
		}
	};
}

function renderIfBlock2_0 ( root, component ) {
	var viewer_initialData = {
		compiled: root.compiled,
		data: root.data
	};
	var viewer = new template$2.components.Viewer({
		target: null,
		_root: component._root || component,
		data: viewer_initialData
	});
	
	viewer.on( 'change', function ( event ) {
		component.updateData(event);
	});

	return {
		mount: function ( target, anchor ) {
			viewer._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var viewer_changes = {};
			
			if ( 'compiled' in changed ) { viewer_changes.compiled = root.compiled; }
			if ( 'data' in changed ) { viewer_changes.data = root.data; }
			
			if ( Object.keys( viewer_changes ).length ) { viewer.set( viewer_changes ); }
		},
		
		teardown: function ( detach ) {
			viewer.destroy( detach );
		}
	};
}

function renderIfBlock_1 ( root, component ) {
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-4194056845', '' );
	p.className = "loading";
	
	appendNode( createText( "loading editor..." ), p );

	return {
		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
		},
		
		update: noop$1,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( p );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var ifBlock1_anchor = createComment();
	
	function getBlock1 ( root ) {
		if ( root.showGenerated ) { return renderIfBlock1_0; }
		return renderIfBlock1_1;
	}
	
	var currentBlock1 = getBlock1( root );
	var ifBlock1 = currentBlock1 && currentBlock1( root, component );

	return {
		mount: function ( target, anchor ) {
			insertNode( ifBlock1_anchor, target, anchor );
			if ( ifBlock1 ) { ifBlock1.mount( ifBlock1_anchor.parentNode, ifBlock1_anchor ); }
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var _currentBlock1 = currentBlock1;
			currentBlock1 = getBlock1( root );
			if ( _currentBlock1 === currentBlock1 && ifBlock1) {
				ifBlock1.update( changed, root );
			} else {
				if ( ifBlock1 ) { ifBlock1.teardown( true ); }
				ifBlock1 = currentBlock1 && currentBlock1( root, component );
				if ( ifBlock1 ) { ifBlock1.mount( ifBlock1_anchor.parentNode, ifBlock1_anchor ); }
			}
		},
		
		teardown: function ( detach ) {
			if ( ifBlock1 ) { ifBlock1.teardown( detach ); }
			
			if ( detach ) {
				detachNode( ifBlock1_anchor );
			}
		}
	};
}

function renderIfBlock1_1 ( root, component ) {
	var codeMirror_initialData = {
		mode: "htmlmixed",
		error: root.sourceError
	};
	
	if ( 'source' in root ) { codeMirror_initialData.code = root.source; }
	var codeMirror = new template$2.components.CodeMirror({
		target: null,
		_root: component._root || component,
		data: codeMirror_initialData
	});
	
	component.refs.editor = codeMirror;
	
	var codeMirror_updating = false;
	
	component._bindings.push( function () {
		if ( codeMirror._torndown ) { return; }
		codeMirror.observe( 'code', function ( value ) {
			codeMirror_updating = true;
			component._set({ source: value });
			codeMirror_updating = false;
		});
	});
	
	codeMirror._context = {
		root: root
	};

	return {
		mount: function ( target, anchor ) {
			codeMirror._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( !codeMirror_updating && 'source' in changed ) {
				codeMirror._set({ code: root.source });
			}
			
			codeMirror._context.root = root;
			
			var codeMirror_changes = {};
			
			if ( 'sourceError' in changed ) { codeMirror_changes.error = root.sourceError; }
			
			if ( Object.keys( codeMirror_changes ).length ) { codeMirror.set( codeMirror_changes ); }
		},
		
		teardown: function ( detach ) {
			if ( component.refs.editor === codeMirror ) { component.refs.editor = null; }
			codeMirror.destroy( detach );
		}
	};
}

function renderIfBlock1_0 ( root, component ) {
	var codeMirror_initialData = {
		mode: "javascript",
		readonly: true,
		code: root.compiled.code
	};
	var codeMirror = new template$2.components.CodeMirror({
		target: null,
		_root: component._root || component,
		data: codeMirror_initialData
	});
	
	component.refs.editor = codeMirror;

	return {
		mount: function ( target, anchor ) {
			codeMirror._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var codeMirror_changes = {};
			
			if ( 'compiled' in changed ) { codeMirror_changes.code = root.compiled.code; }
			
			if ( Object.keys( codeMirror_changes ).length ) { codeMirror.set( codeMirror_changes ); }
		},
		
		teardown: function ( detach ) {
			if ( component.refs.editor === codeMirror ) { component.refs.editor = null; }
			codeMirror.destroy( detach );
		}
	};
}

function renderEachBlock$3 ( root, eachBlock_value, example, example__index, component ) {
	var option = createElement( 'option' );
	setAttribute( option, 'svelte-4194056845', '' );
	var last_option_value = example.id;
	option.__value = last_option_value;
	option.value = option.__value;
	
	var last_text = example.title;
	var text = createText( last_text );
	appendNode( text, option );

	return {
		mount: function ( target, anchor ) {
			insertNode( option, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, example, example__index ) {
			var __tmp;
		
			if ( ( __tmp = example.id ) !== last_option_value ) {
				last_option_value = __tmp;
				option.__value = last_option_value;
			}
			
			option.value = option.__value;
			
			if ( ( __tmp = example.title ) !== last_text ) {
				text.data = last_text = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( option );
			}
		}
	};
}

function index ( options ) {
	var this$1 = this;

	options = options || {};
	this.refs = {};
	this._state = Object.assign( template$2.data(), options.data );
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss$5 ) { addCss$5(); }
	this._renderHooks = [];
	
	this._bindings = [];
	this._fragment = renderMainFragment$5( this._state, this );
	if ( options.target ) { this._fragment.mount( options.target, null ); }
	while ( this._bindings.length ) { this$1._bindings.pop()(); }
	
	this._flush();
	
	if ( options._root ) {
		options._root._renderHooks.push({ fn: template$2.oncreate, context: this });
	} else {
		template$2.oncreate.call( this );
	}
}

index.prototype = Object.assign( {}, template$2.methods, proto );

index.prototype._set = function _set ( newState ) {
	var this$1 = this;

	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) { this._fragment.update( newState, this._state ); }
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	while ( this._bindings.length ) { this$1._bindings.pop()(); }
	
	this._flush();
};

index.prototype.teardown = index.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var template$5 = (function () {
	return {
		data: function data () {
			return {
				open: false,
				route: '',
				active: null
			};
		},

		methods: {
			toggleOpen: function toggleOpen () {
				var this$1 = this;

				var open = this.get( 'open' );

				// if the menu is closing, scroll back to the top *after* it
				// shuts. otherwise, scroll back to the top immediately
				// (just in case the user reopened before it happened).
				// The reason we don't just do it when the menu opens is
				// that the scrollbar visibly flashes
				if ( open ) {
					setTimeout( function () {
						if ( !this$1.get( 'open' ) ) {
							this$1.refs.nav.scrollTop = 0;
						}
					}, 350 );
				} else {
					this.refs.nav.scrollTop = 0;
				}

				this.set({ open: !open });
			}
		},

		components: {
			GuideContents: GuideContents
		}
	};
}());

var addedCss$8 = false;
function addCss$8 () {
	var style = createElement( 'style' );
	style.textContent = "\n\t[svelte-2624607971].mousecatcher, [svelte-2624607971] .mousecatcher {\n\t\tposition: fixed;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\twidth: 100vw;\n\t\theight: 100vh;\n\t\tbackground-color: black;\n\t\tpointer-events: none;\n\t\topacity: 0;\n\t\t\n\t\tz-index: 3;\n\t}\n\n\t[svelte-2624607971].mousecatcher.open, [svelte-2624607971] .mousecatcher.open {\n\t\tpointer-events: all;\n\t\topacity: 0.3;\n\t}\n\n\t@keyframes svelte-2624607971-fadein {\n\t\tfrom { opacity: 0; }\n\t\tto { opacity: 1; }\n\t}\n\n\t[svelte-2624607971].container, [svelte-2624607971] .container {\n\t\tposition: fixed;\n\t\twidth: 100%;\n\t\theight: 3em;\n\t\tbackground-color: #333;\n\t\tcolor: #eee;\n\t\tborder-bottom: 2px solid rgb(170,30,30);\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tz-index: 3;\n\t}\n\n\tnav[svelte-2624607971], [svelte-2624607971] nav {\n\t\tposition: fixed;\n\t\twidth: 14em;\n\t\theight: calc(100vh - 3em);\n\t\ttop: 3em;\n\t\tfont-family: Rajdhani, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\t\tbackground-color: white;\n\t\ttransform: translate(-100%,0);\n\t\ttransition: transform 0.2s cubic-bezier(.17,.67,.24,.99);\n\t\tborder-right: 1px solid #eee;\n\t\tz-index: 3;\n\t\tpadding: 1em;\n\t\tuser-select: none;\n\t\toverflow-y: auto;\n\t}\n\n\t[svelte-2624607971].open, [svelte-2624607971] .open {\n\t\ttransform: translate(0,0);\n\t\ttransition: transform 0.3s cubic-bezier(.17,.67,.24,.99);\n\t}\n\n\t[svelte-2624607971].menu-link, [svelte-2624607971] .menu-link {\n\t\tdisplay: inline;\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 1rem;\n\t\tfont-size: 1em;\n\t\tline-height: 3.1em;\n\t\tcolor: #ccc;\n\t\tcursor: pointer;\n\t\tfont-weight: 500;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\t-webkit-touch-callout: none;\n\t}\n\n\t[svelte-2624607971].logo, [svelte-2624607971] .logo {\n\t\tposition: absolute;\n\t\ttop: 50%;\n\t\tleft: 50%;\n\t\ttransform: translate(-50%, -45%);\n\t\t-webkit-tap-highlight-color: transparent;\n\t\t-webkit-touch-callout: none;\n\t\tline-height: 1;\n\t\ttext-transform: lowercase;\n\t\tcolor: white;\n\t\tfont-size: 1.4rem;\n\t}\n\n\tul[svelte-2624607971], [svelte-2624607971] ul {\n\t\tdisplay: block;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tlist-style: none;\n\t}\n\n\t[svelte-2624607971].primary, [svelte-2624607971] .primary {\n\t\tmargin: 0 0 2em 0;\n\t}\n\n\t[svelte-2624607971].primary li, [svelte-2624607971] .primary li {\n\t\tposition: relative;\n\t\tdisplay: block;\n\t}\n\n\t[svelte-2624607971].primary .active, [svelte-2624607971] .primary .active {\n\t\tcolor: #333;\n\t\tfont-weight: 700;\n\t}\n\n\t\n\n\t[svelte-2624607971].primary li a, [svelte-2624607971] .primary li a {\n\t\tdisplay: block;\n\t\tcolor: #727272;\n\t\tfont-size: 1.3em;\n\t\tfont-weight: 500;\n\t\tpadding: 0.75em 0;\n\t\tline-height: 1;\n\t}\n\n\t\n\n\n\n\t\n\n\t@media (min-width: 360px) {\n\t\t\n\n\t\t\n\t}\n\n\t@media (min-width: 768px) {\n\t\t[svelte-2624607971].mousecatcher, [svelte-2624607971] .mousecatcher, [svelte-2624607971].menu-link, [svelte-2624607971] .menu-link {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t[svelte-2624607971].container, [svelte-2624607971] .container {\n\t\t\theight: 4em;\n\t\t}\n\n\t\tnav[svelte-2624607971], [svelte-2624607971] nav {\n\t\t\twidth: 100%;\n\t\t\theight: 4em;\n\t\t\tpadding: 0 1.5em 0 0;\n\t\t\ttransform: none;\n\t\t\ttransition: none;\n\t\t\theight: 0;\n\t\t}\n\n\t\t[svelte-2624607971].primary, [svelte-2624607971] .primary {\n\t\t\tposition: fixed;\n\t\t\ttop: 0;\n\t\t\tright: 1em;\n\t\t\tmargin: 0;\n\t\t}\n\n\t\t[svelte-2624607971].primary li, [svelte-2624607971] .primary li {\n\t\t\tdisplay: inline-block;\n\t\t}\n\n\t\t[svelte-2624607971].primary li a, [svelte-2624607971] .primary li a {\n\t\t\tpadding: 1.5em 0.5em;\n\t\t\tcolor: #ccc;\n\t\t\tfont-size: 1rem;\n\t\t}\n\n\t\t[svelte-2624607971].primary li a.active, [svelte-2624607971] .primary li a.active {\n\t\t\tcolor: white;\n\t\t\tfont-weight: 500;\n\t\t}\n\n\t\t[svelte-2624607971].primary li::after, [svelte-2624607971] .primary li::after {\n\t\t\tposition: absolute;\n\t\t\ttop: 1.5rem;\n\t\t\tright: -0.3em;\n\t\t\tcontent: '/';\n\t\t\tfont-size: 0.8em;\n\t\t\tcolor: #999;\n\t\t}\n\n\t\tli[svelte-2624607971]:last-child::after, [svelte-2624607971] li:last-child::after {\n\t\t\tcontent: '';\n\t\t}\n\n\t\t[svelte-2624607971].secondary, [svelte-2624607971] .secondary {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t\n\n\t\t[svelte-2624607971].logo, [svelte-2624607971] .logo {\n\t\t\tposition: absolute;\n\t\t\ttop: 1rem;\n\t\t\tleft: 1rem;\n\t\t\tfont-size: 2em;\n\t\t\tfont-weight: 300;\n\t\t\ttransform: none;\n\t\t}\n\t}\n";
	appendNode( style, document.head );

	addedCss$8 = true;
}

function renderMainFragment$8 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-2624607971', '' );
	div.className = "" + ( root.open ? "open": "closed" ) + " mousecatcher";
	
	function clickHandler ( event ) {
		component.set({ open: false });
	}
	
	addEventListener( div, 'click', clickHandler );
	
	var text = createText( "\n\n" );
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-2624607971', '' );
	div1.className = "container";
	
	var span = createElement( 'span' );
	setAttribute( span, 'svelte-2624607971', '' );
	span.className = "menu-link";
	
	function clickHandler1 ( event ) {
		component.toggleOpen();
	}
	
	addEventListener( span, 'click', clickHandler1 );
	
	appendNode( span, div1 );
	var last_text1 = root.open ? 'Close' : 'Menu';
	var text1 = createText( last_text1 );
	appendNode( text1, span );
	appendNode( createText( "\n\t" ), div1 );
	
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-2624607971', '' );
	a.href = "/";
	a.className = "logo";
	
	appendNode( a, div1 );
	appendNode( createText( "Svelte" ), a );
	var text4 = createText( "\n\n" );
	
	var nav = createElement( 'nav' );
	setAttribute( nav, 'svelte-2624607971', '' );
	component.refs.nav = nav;
	var last_nav_class = root.open ? "open": "closed";
	nav.className = last_nav_class;
	
	function clickHandler2 ( event ) {
		component.set({ open: false });
	}
	
	addEventListener( nav, 'click', clickHandler2 );
	
	var ul = createElement( 'ul' );
	setAttribute( ul, 'svelte-2624607971', '' );
	ul.className = "primary";
	
	appendNode( ul, nav );
	
	var li = createElement( 'li' );
	setAttribute( li, 'svelte-2624607971', '' );
	
	appendNode( li, ul );
	
	var a1 = createElement( 'a' );
	setAttribute( a1, 'svelte-2624607971', '' );
	var last_a1_class = root.route === "guide" ? "active": "";
	a1.className = last_a1_class;
	a1.href = "/guide";
	
	appendNode( a1, li );
	appendNode( createText( "Guide" ), a1 );
	appendNode( createText( "\n\t\t" ), ul );
	
	var li1 = createElement( 'li' );
	setAttribute( li1, 'svelte-2624607971', '' );
	
	appendNode( li1, ul );
	
	var a2 = createElement( 'a' );
	setAttribute( a2, 'svelte-2624607971', '' );
	var last_a2_class = root.route === "repl" ? "active": "";
	a2.className = last_a2_class;
	a2.href = "/repl";
	
	appendNode( a2, li1 );
	appendNode( createText( "REPL" ), a2 );
	appendNode( createText( "\n\t\t" ), ul );
	
	var li2 = createElement( 'li' );
	setAttribute( li2, 'svelte-2624607971', '' );
	
	appendNode( li2, ul );
	
	var a3 = createElement( 'a' );
	setAttribute( a3, 'svelte-2624607971', '' );
	var last_a3_class = root.route === "blog" ? "active": "";
	a3.className = last_a3_class;
	a3.href = "/blog";
	
	appendNode( a3, li2 );
	appendNode( createText( "Blog" ), a3 );
	appendNode( createText( "\n\t\t" ), ul );
	
	var li3 = createElement( 'li' );
	setAttribute( li3, 'svelte-2624607971', '' );
	
	appendNode( li3, ul );
	
	var a4 = createElement( 'a' );
	setAttribute( a4, 'svelte-2624607971', '' );
	a4.href = "https://gitter.im/sveltejs/svelte";
	
	appendNode( a4, li3 );
	appendNode( createText( "Chat" ), a4 );
	appendNode( createText( "\n\t\t" ), ul );
	
	var li4 = createElement( 'li' );
	setAttribute( li4, 'svelte-2624607971', '' );
	
	appendNode( li4, ul );
	
	var a5 = createElement( 'a' );
	setAttribute( a5, 'svelte-2624607971', '' );
	a5.href = "https://github.com/sveltejs/svelte";
	
	appendNode( a5, li4 );
	appendNode( createText( "GitHub" ), a5 );
	appendNode( createText( "\n\n\t" ), nav );
	
	var div2 = createElement( 'div' );
	setAttribute( div2, 'svelte-2624607971', '' );
	div2.className = "secondary";
	
	appendNode( div2, nav );
	
	var guideContents_initialData = {
		active: root.active
	};
	var guideContents = new template$5.components.GuideContents({
		target: div2,
		_root: component._root || component,
		data: guideContents_initialData
	});

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			insertNode( text, target, anchor );
			insertNode( div1, target, anchor );
			insertNode( text4, target, anchor );
			insertNode( nav, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			div.className = "" + ( root.open ? "open": "closed" ) + " mousecatcher";
			
			if ( ( __tmp = root.open ? 'Close' : 'Menu' ) !== last_text1 ) {
				text1.data = last_text1 = __tmp;
			}
			
			if ( ( __tmp = root.open ? "open": "closed" ) !== last_nav_class ) {
				last_nav_class = __tmp;
				nav.className = last_nav_class;
			}
			
			if ( ( __tmp = root.route === "guide" ? "active": "" ) !== last_a1_class ) {
				last_a1_class = __tmp;
				a1.className = last_a1_class;
			}
			
			if ( ( __tmp = root.route === "repl" ? "active": "" ) !== last_a2_class ) {
				last_a2_class = __tmp;
				a2.className = last_a2_class;
			}
			
			if ( ( __tmp = root.route === "blog" ? "active": "" ) !== last_a3_class ) {
				last_a3_class = __tmp;
				a3.className = last_a3_class;
			}
			
			var guideContents_changes = {};
			
			if ( 'active' in changed ) { guideContents_changes.active = root.active; }
			
			if ( Object.keys( guideContents_changes ).length ) { guideContents.set( guideContents_changes ); }
		},
		
		teardown: function ( detach ) {
			removeEventListener( div, 'click', clickHandler );
			removeEventListener( span, 'click', clickHandler1 );
			if ( component.refs.nav === nav ) { component.refs.nav = null; }
			removeEventListener( nav, 'click', clickHandler2 );
			guideContents.destroy( false );
			
			if ( detach ) {
				detachNode( div );
				detachNode( text );
				detachNode( div1 );
				detachNode( text4 );
				detachNode( nav );
			}
		}
	};
}

function Nav ( options ) {
	options = options || {};
	this.refs = {};
	this._state = Object.assign( template$5.data(), options.data );
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss$8 ) { addCss$8(); }
	this._renderHooks = [];
	
	this._fragment = renderMainFragment$8( this._state, this );
	if ( options.target ) { this._fragment.mount( options.target, null ); }
	
	this._flush();
}

Nav.prototype = Object.assign( {}, template$5.methods, proto );

Nav.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) { this._fragment.update( newState, this._state ); }
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	this._flush();
};

Nav.prototype.teardown = Nav.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function get$1 ( url ) {
	return new Promise( function ( fulfil, reject ) {
		var xhr = new XMLHttpRequest();
		xhr.open( 'GET', url );
		xhr.onerror = reject;
		xhr.onload = function () { return fulfil( xhr.responseText ); };
		xhr.send();
	});
}

var header = document.querySelector( 'header' );
var main = document.querySelector( 'main' );

var nav = new Nav({
	target: ( header.innerHTML = '', header )
});

var view;

// legacy
function redirect ( from, to ) {
	roadtrip.add( from, {
		enter: function (route) {
			if ( typeof to === 'function' ) { to = to( route ); }
			roadtrip.goto( to, { replaceState: true });
		}
	});
}

redirect( '/blog/', '/blog' );
redirect( '/guide/', '/guide' );
redirect( '/blog/:slug/', function (route) { return ("/blog/" + (route.params.slug)); } );
redirect( '/repl/', function (route) {
	var query = Object.keys( route.query ).map( function (key) { return (key + "=" + (route.query[key])); } ).join( '&' );
	return query ? ("/repl?" + query) : '/repl';
});

roadtrip
	.add( '/', {
		enter: function enter ( route ) {
			nav.set({ route: 'index' });

			if ( route.isInitial ) { return; } // page is static

			document.title = 'Svelte • The magical disappearing UI framework';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			view = new Index({
				target: main
			});

			window.scrollTo( route.scrollX, route.scrollY );
		}
	})
	.add( '/blog', {
		enter: function enter ( route ) {
			nav.set({ route: 'blog' });

			if ( route.isInitial ) { return; } // page is static

			document.title = 'Svelte • The magical disappearing UI framework';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			return get$1( "/blog.json" ).then( JSON.parse ).then( function (posts) {
				view = new BlogIndex({
					target: main,
					data: {
						posts: posts
					}
				});

				window.scrollTo( route.scrollX, route.scrollY );
			});
		}
	})
	.add( '/blog/:slug', {
		enter: function enter ( route ) {
			nav.set({ route: 'blog' });

			if ( route.isInitial ) { return; } // page is static

			return get$1( ("/blog/" + (route.params.slug) + ".json") ).then( JSON.parse ).then( function (post) {
				document.title = (post.metadata.title) + " • Svelte";

				if ( view ) {
					view.destroy();
				} else {
					main.innerHTML = '';
				}

				view = new BlogPost({
					target: main,
					data: {
						post: post
					}
				});

				// TODO this doesn't work because it's the <main> that scrolls, not the window
				window.scrollTo( route.scrollX, route.scrollY );
			});
		}
	})
	.add( '/guide', {
		enter: function enter ( route ) {
			nav.set({ route: 'guide' });

			document.title = 'Learn Svelte';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			return get$1( "/guide.json" ).then( JSON.parse ).then( function (sections) {
				view = new Guide({
					target: main,
					data: {
						sections: sections
					}
				});

				view.on( 'scroll', function (id) {
					nav.set({ active: id });
				});

				if ( route.scrollY === 0 ) {
					// scroll to section
					if ( window.location.hash.length > 1 ) {
						var h = main.querySelector( window.location.hash );
						if ( h ) { window.scrollTo( 0, h.getBoundingClientRect().top ); }
					}
				} else {
					window.scrollTo( route.scrollX, route.scrollY );
				}
			});
		}
	})
	.add( '/repl', {
		enter: function enter ( route ) {
			nav.set({ route: 'repl' });

			document.title = 'Svelte REPL';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			view = new index({
				target: main
			});
		}
	});

roadtrip.start();

}());
//# sourceMappingURL=bundle.js.map
