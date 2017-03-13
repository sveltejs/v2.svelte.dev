'use strict';

var template = (function () {
	return {
		data () {
			return {
				route: ''
			};
		}
	};
}());

var Nav = {};

Nav.filename = "/Users/rharris/Documents/www/SVELTE/svelte.technology/shared/components/Nav.html";

Nav.data = function () {
	return template.data();
};

Nav.render = function ( root, options ) {
	root = Object.assign( template.data(), root || {} );
	
	return `<nav svelte-2534109826><span class="menu-link" svelte-2534109826>Menu</span>
		<a href="/" class="logo" svelte-2534109826>Svelte</a>
	
		<ul class="navigation" svelte-2534109826><li svelte-2534109826><a class="${root.route === "guide" ? "active": ""}" href="/guide" svelte-2534109826>Guide</a></li>
			<li svelte-2534109826><a class="${root.route === "repl" ? "active": ""}" href="/repl" svelte-2534109826>REPL</a></li>
			<li svelte-2534109826><a class="${root.route === "blog" ? "active": ""}" href="/blog" svelte-2534109826>Blog</a></li>
			<li svelte-2534109826><a href="https://gitter.im/sveltejs/svelte" svelte-2534109826>Chat</a></li>
			<li svelte-2534109826><a href="https://github.com/sveltejs/svelte" svelte-2534109826>GitHub</a></li></ul></nav>`;
};

Nav.renderCss = function () {
	var components = [];
	
	components.push({
		filename: Nav.filename,
		css: "\n\tnav[svelte-2534109826], [svelte-2534109826] nav {\n\t\ttext-align: right;\n\t\tposition: relative;\n\t\theight: 3em;\n\t\tbox-sizing: border-box;\n\t\tbackground-color: #333;\n\t\tcolor: #eee;\n\t\tborder-bottom: 2px solid rgb(170,30,30);\n\t\tfont-family: 'Rajdhani';\n\t\tpadding: 0 0.5em 0 0;\n\n\t\ttransition: all 180ms cubic-bezier(0.455, 0.03, 0.515, 0.955); \n\t}\n\n\t[svelte-2534109826].logo, [svelte-2534109826] .logo {\n\t\tposition: absolute;\n\t\ttop: 0.9rem;\n\t\tleft: 0.7rem;\n\t\tline-height: 1;\n\t\ttext-transform: lowercase;\n\t\tfont-size: 1.4em;\n\t\tcolor: white;\n\n\t\ttransition: color 180ms cubic-bezier(0.455, 0.03, 0.515, 0.955); \n\t\twill-change: color;\n\t}\n\n\tnav[svelte-2534109826]:after, [svelte-2534109826] nav:after {\n\t\tcontent: '';\n\t\tclear: both;\n\t\tdisplay: block;\n\t}\n\n\tul[svelte-2534109826], [svelte-2534109826] ul {\n\t\tdisplay: inline-block;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tclear: fix;\n\t}\n\n\tli[svelte-2534109826], [svelte-2534109826] li {\n\t\tposition: relative;\n\t\tdisplay: inline-block;\n\t}\n\n\tli[svelte-2534109826]::after, [svelte-2534109826] li::after {\n\t\tposition: absolute;\n\t\ttop: 1.1rem;\n\t\tright: -0.3em;\n\t\tcontent: '/';\n\t\tfont-size: 0.8em;\n\t\tcolor: #999;\n\t}\n\n\tli[svelte-2534109826]:last-child::after, [svelte-2534109826] li:last-child::after {\n\t\tcontent: '';\n\t}\n\n\tli[svelte-2534109826] a, [svelte-2534109826] li a {\n\t\tdisplay: block;\n\t\t\n\t\tcolor: #ccc;\n\t\tfont-size: 1em;\n\t\tpadding: 1.1em 0.3em 0.9em 0.3em;\n\t\tline-height: 1;\n\t}\n\n\t[svelte-2534109826].active, [svelte-2534109826] .active {\n\t\tcolor: white;\n\t\tfont-weight: 500;\n\t}\n\n\tli[svelte-2534109826] a:hover, [svelte-2534109826] li a:hover {\n\t\tcolor: white;\n\t}\n\n\t[svelte-2534109826].menu-link, [svelte-2534109826] .menu-link {\n\t\tdisplay: none;\n\t}\n\n\t@media (min-width: 360px) {\n\t\t[svelte-2534109826].logo, [svelte-2534109826] .logo {\n\t\t\ttop: 0.7rem;\n\t\t\tfont-size: 1.8em;\n\t\t}\n\n\t\tli[svelte-2534109826] a, [svelte-2534109826] li a {\n\t\t\tpadding: 1.1em 0.5em 0.9em 0.5em;\n\t\t}\n\t}\n\n\t@media (min-width: 768px) {\n\t\tnav[svelte-2534109826], [svelte-2534109826] nav {\n\t\t\theight: 4em;\n\t\t\tpadding: 0 1.5em 0 0;\n\t\t}\n\n\t\t[svelte-2534109826].logo, [svelte-2534109826] .logo {\n\t\t\ttop: 1rem;\n\t\t\tleft: 1.5rem;\n\t\t\tfont-size: 2em;\n\t\t\tfont-weight: 300;\n\t\t}\n\n\t\tli[svelte-2534109826]::after, [svelte-2534109826] li::after {\n\t\t\ttop: 1.5rem;\n\t\t}\n\n\t\tli[svelte-2534109826] a, [svelte-2534109826] li a {\n\t\t\tpadding: 1.5em 0.5em;\n\t\t}\n\t}\n\n\t@media (max-width: 767px) {\n\t\tnav[svelte-2534109826], [svelte-2534109826] nav {\n\t\t\tuser-select: none;\n\t\t}\n\n\t\t[svelte-2534109826].logo, [svelte-2534109826] .logo {\n\t\t\ttop: 50%;\n\t\t\tleft: 50%;\n\t\t\ttransform: translate(-50%, -45%);\n\t\n\t\t\t-webkit-tap-highlight-color: transparent;\n\t\t\t-webkit-touch-callout: none;\n\t\t}\n\n\t\tul[svelte-2534109826], [svelte-2534109826] ul {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t[svelte-2534109826].menu-link, [svelte-2534109826] .menu-link {\n\t\t\tdisplay: inline;\n\t\t\tposition: absolute;\n\t\t\t\n\t\t\ttop: 0;\n\t\t\tleft: 1rem;\n\t\t\tfont-size: 1em;\n\t\t\tfont-family: 'Rajdhani';\n\t\t\tline-height: 3.1em;\n\n\t\t\tcolor: #ccc;\n\t\t\tcursor: pointer;\n\t\t\tfont-weight: 500;\n\n\t\t\ttransition: color 180ms cubic-bezier(0.455, 0.03, 0.515, 0.955); \n\t\t\twill-change: color;\n\n\t\t\t-webkit-tap-highlight-color: transparent;\n\t\t\t-webkit-touch-callout: none;\n\t\t}\n\n\t\tnav[svelte-2534109826].hidden, [svelte-2534109826] nav.hidden {\n\t\t\tbackground-color: #fff;\n\t\t\tborder-bottom-color: rgba(0,0,0,0.09);\n\t\t}\n\n\t\t[svelte-2534109826].logo, [svelte-2534109826] .logo {\n\t\t\tcolor: rgb(170,30,30);\n\t\t}\n\n\t\t[svelte-2534109826].menu-link, [svelte-2534109826] .menu-link {\n\t\t\tcolor: #666;\n\t\t}\n\t}\n\n",
		map: null // TODO
	});
	
	return {
		css: components.map( x => x.css ).join( '\n' ),
		map: null,
		components
	};
};

module.exports = Nav;
