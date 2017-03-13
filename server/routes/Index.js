'use strict';

var Index = {};

Index.filename = "/Users/rharris/Documents/www/SVELTE/svelte.technology/shared/routes/Index.html";

Index.data = function () {
	return {};
};

Index.render = function ( root, options ) {
	root = root || {};
	
	return `<div class="hero" svelte-1023924744><div class="left" svelte-1023924744><h1 svelte-1023924744>Svelte</h1></div>
	
		<div class="right" svelte-1023924744><h2 svelte-1023924744>The magical disappearing UI framework</h2>
	
			<ul svelte-1023924744><li svelte-1023924744><strong svelte-1023924744>The web's obesity crisis, solved.</strong> Svelte turns your templates into tiny, framework-less vanilla JavaScript.</li>
				<li svelte-1023924744><strong svelte-1023924744>Simple and familiar.</strong> Build apps out of composable, easy-to-write blocks using languages you already know.</li>
				<li svelte-1023924744><strong svelte-1023924744>Stupid fast, rock solid.</strong> Compile-time static analysis ensures the browser does no more work than it needs to.</li></ul>
	
			<a class="learn-svelte" href="/guide" svelte-1023924744>Learn Svelte</a></div></div>`;
};

Index.renderCss = function () {
	var components = [];
	
	components.push({
		filename: Index.filename,
		css: "\n\t[svelte-1023924744].hero, [svelte-1023924744] .hero {\n\t\tposition: relative;\n\t\tpadding: 2em 1em;\n\t\t\n\t\tbackground-color: white;\n\t\tcolor: #333;\n\t\tclear: fix;\n\t\tmin-height: calc(100vh - 7em);\n\t\tbox-sizing: border-box;\n\t}\n\n\tul[svelte-1023924744], [svelte-1023924744] ul {\n\t\tmax-width: 32em;\n\t\tpadding: 0;\n\t\tmargin: 0 0 3em 0;\n\t}\n\n\tli[svelte-1023924744], [svelte-1023924744] li {\n\t\tposition: relative;\n\t\tlist-style: none;\n\t\tmargin: 0 0 1em 0;\n\t\tfont-family: Rajdhani;\n\t\tcolor: #666;\n\t}\n\n\tli[svelte-1023924744]::before, [svelte-1023924744] li::before {\n\t\tposition: absolute;\n\t\tcontent: '◆';\n\t\ttop: 0em;\n\t\tleft: -1.4em;\n\t\tfont-size: 0.8em;\n\t\t\n\t\tcolor: #ddd;\n\t}\n\n\tstrong[svelte-1023924744], [svelte-1023924744] strong {\n\t\tfont-family: 'Rajdhani';\n\t\tmargin: 0 auto;\n\t\tcolor: #333;\n\t}\n\n\t[svelte-1023924744].left, [svelte-1023924744] .left {\n\t\tpadding: 0 0 0 1em;\n\t}\n\n\th1[svelte-1023924744], [svelte-1023924744] h1 {\n\t\tdisplay: block;\n\t\tfont-family: 'Rajdhani';\n\t\tcolor: rgb(170,30,30);\n\t\tfont-size: 30vw;\n\t\tfont-weight: 300;\n\t\tline-height: 1;\n\t\tmargin: 0;\n\t\ttext-transform: lowercase;\n\t\tpadding: 0.5em 0 0 0;\n\t}\n\n\t[svelte-1023924744].right, [svelte-1023924744] .right {\n\t\tpadding: 0 0 0 1em;\n\t\tmargin: 0 0 2em 0;\n\t}\n\n\th2[svelte-1023924744], [svelte-1023924744] h2 {\n\t\tfont-size: 7.2vw;\n\t\tfont-family: 'Rajdhani';\n\t\tfont-weight: 300;\n\t\tdisplay: block;\n\t\tmargin: 0 0 4rem 0;\n\t\tmax-width: 11em;\n\t}\n\n\t[svelte-1023924744].learn-svelte, [svelte-1023924744] .learn-svelte {\n\t\tbackground-color: rgb(170,30,30);\n\t\tcolor: white;\n\t\tpadding: 0.5em 2em;\n\t\tborder-radius: 0.2em;\n\t\tline-height: 1;\n\t\tfont-family: Rajdhani;\n\t\tfont-size: 1.2em;\n\t\tfont-weight: 800;\n\t\ttext-transform: uppercase;\n\t\twidth: calc(100% - 1em);\n\t\tmax-width: 16em;\n\t\tdisplay: block;\n\t\ttext-align: center;\n\t}\n\n\t[svelte-1023924744].learn-svelte:hover, [svelte-1023924744] .learn-svelte:hover {\n\t\tbackground-color: rgba(170,30,30,0.9);\n\t}\n\n\t@media (min-width: 480px) {\n\t\t[svelte-1023924744].left, [svelte-1023924744] .left, [svelte-1023924744].right, [svelte-1023924744] .right {\n\t\t\tmax-width: 32em;\n\t\t\tmargin: 0 auto;\n\t\t}\n\n\t\th1[svelte-1023924744], [svelte-1023924744] h1 {\n\t\t\tfont-size: 8em;\n\t\t}\n\n\t\th2[svelte-1023924744], [svelte-1023924744] h2 {\n\t\t\tfont-size: 2em;\n\t\t\tmax-width: none;\n\t\t}\n\n\t\tli[svelte-1023924744], [svelte-1023924744] li {\n\t\t\tfont-size: 1.2em;\n\t\t}\n\t}\n\n\t@media (min-width: 960px) {\n\t\t[svelte-1023924744].hero, [svelte-1023924744] .hero {\n\t\t\tpadding: 6em 1em 2em 1em;\n\t\t\tmax-width: 64em;\n\t\t\tmargin: 0 auto;\n\t\t}\n\n\t\t[svelte-1023924744].left, [svelte-1023924744] .left {\n\t\t\tposition: relative;\n\t\t\tfloat: left;\n\t\t\twidth: 40%;\n\t\t\tbox-sizing: border-box;\n\t\t}\n\n\t\t[svelte-1023924744].right, [svelte-1023924744] .right {\n\t\t\tposition: relative;\n\t\t\tfloat: left;\n\t\t\twidth: 60%;\n\t\t\tbox-sizing: border-box;\n\t\t}\n\n\t\th1[svelte-1023924744], [svelte-1023924744] h1 {\n\t\t\tposition: relative;\n\t\t\tright: 3rem;\n\t\t\ttop: 1.4rem;\n\t\t\tfont-size: 8em;\n\t\t\ttext-align: right;\n\t\t}\n\n\t\th2[svelte-1023924744], [svelte-1023924744] h2 {\n\t\t\tfont-size: 2.8em;\n\t\t\tline-height: 1.2;\n\t\t\tmargin: 0 0 2rem 0;\n\t\t\tmax-width: 11em;\n\t\t}\n\t}\n\n",
		map: null // TODO
	});
	
	return {
		css: components.map( x => x.css ).join( '\n' ),
		map: null,
		components
	};
};

module.exports = Index;
