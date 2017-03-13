'use strict';

var Guide = {};

Guide.filename = "/Users/rharris/Documents/www/SVELTE/svelte.technology/shared/routes/Guide.html";

Guide.data = function () {
	return {};
};

Guide.render = function ( root, options ) {
	root = root || {};
	
	return `<div class="content" svelte-3791285122>${ root.sections.map( section => `<section id="${section.slug}" svelte-3791285122><h2 svelte-3791285122>${__escape( section.metadata.title )}</h2>
				${section.html}</section>` ).join( '' )}</div>`;
};

Guide.renderCss = function () {
	var components = [];
	
	components.push({
		filename: Guide.filename,
		css: "\n\t[svelte-3791285122].content, [svelte-3791285122] .content {\n\t\twidth: 100%;\n\t\tpadding: 1em;\n\t}\n\n\th2[svelte-3791285122], [svelte-3791285122] h2 {\n\t\tpadding: 1rem 0 0 0;\n\t\tmargin: 0 0 1rem 0;\n\t\tfont-size: 2.4em;\n\t\tfont-weight: 400;\n\t}\n\n\th3[svelte-3791285122], [svelte-3791285122] h3 {\n\t\tfont-size: 1.2em;\n\t\tfont-weight: 800;\n\t\tmargin: 2em 0 0 0;\n\t}\n\n\tp[svelte-3791285122], [svelte-3791285122] p {\n\t\tmargin: 0 0 1em 0;\n\t\tfont-family: Roboto;\n\t\tfont-weight: 300;\n\t\tcolor: #181818;\n\t\tline-height: 1.5;\n\t}\n\n\ta[svelte-3791285122], [svelte-3791285122] a {\n\t\tborder-bottom: 1px solid #e3d9d9;\n\t}\n\n\tstrong[svelte-3791285122], [svelte-3791285122] strong {\n\t\tfont-weight: 500;\n\t}\n\n\tcode[svelte-3791285122], [svelte-3791285122] code {\n\t\tbackground-color: #f9f9f9;\n\t\tpadding: 0.2em 0.4em;\n\t\tborder-radius: 3px;\n\t}\n\n\tsection[svelte-3791285122]:first-child h3, [svelte-3791285122] section:first-child h3 {\n\t\tborder: none;\n\t}\n\n\tsection[svelte-3791285122], [svelte-3791285122] section {\n\t\tborder-bottom: 1px solid #eee;\n\t\tmax-width: 64em;\n\t\tmargin: 0 auto 2em auto;\n\t\tpadding: 0 0 4em 0;\n\t}\n\n\tsection[svelte-3791285122]:last-child, [svelte-3791285122] section:last-child {\n\t\tborder: none;\n\t}\n\n\tsection[svelte-3791285122] > pre, [svelte-3791285122] section > pre, [svelte-3791285122].CodeMirror, [svelte-3791285122] .CodeMirror {\n\t\tbackground-color: #f9f9f9;\n\t\tborder-left: 2px solid #eee;\n\t\tpadding: 8px;\n\t\tmargin: 0 0 1em 0;\n\t}\n\n\tsection[svelte-3791285122] > pre, [svelte-3791285122] section > pre {\n\t\tpadding: 12px 8px 12px 12px;\n\t\tborder-radius: 3px;\n\t}\n\n\tp[svelte-3791285122], [svelte-3791285122] p, ul[svelte-3791285122], [svelte-3791285122] ul {\n\t\tmax-width: 48em;\n\t}\n\n\tli[svelte-3791285122], [svelte-3791285122] li {\n\t\tmargin: 0;\n\t}\n\n\t[svelte-3791285122].open-in-repl, [svelte-3791285122] .open-in-repl {\n\t\tposition: absolute;\n\t\tz-index: 99;\n\t\tright: 0;\n\t}\n\n\t[svelte-3791285122].open-in-repl::after, [svelte-3791285122] .open-in-repl::after {\n\t\tposition: absolute;\n\t\tcontent: 'open in repl';\n\t\ttext-transform: uppercase;\n\t\tright: 0.5em;\n\t\ttop: 0.5em;\n\t\tborder: 1px solid rgba(0,0,0,0.1);\n\t\tfont-family: Rajdhani;\n\t\tfont-weight: 500;\n\t\ttext-align: center;\n\t\twhite-space: pre;\n\t\tpadding: 0.25em 0.5em 0.1em 0.5em;\n\t\tline-height: 1;\n\t\tborder-radius: 0.1em;\n\t\tcolor: rgba(170,30,30,0.8);\n\t\tbackground-color: rgb(253,242,242);\n\t}\n\n\t[svelte-3791285122].open-in-repl:hover::after, [svelte-3791285122] .open-in-repl:hover::after {\n\t\tcolor: white;\n\t\tbackground-color: rgba(170,30,30,1);\n\t}\n\n\tblockquote[svelte-3791285122], [svelte-3791285122] blockquote {\n\t\tposition: relative;\n\t\tcolor: #999;\n\t\tmargin: 1em 0;\n\t\tpadding: 0.5em 0 0.5em 2em;\n\t\tmax-width: 48em;\n\t\tborder-top: 1px solid #eee;\n\t\tborder-bottom: 1px solid #eee;\n\t}\n\n\tblockquote[svelte-3791285122] p, [svelte-3791285122] blockquote p {\n\t\tcolor: #666;\n\t}\n\n\tblockquote[svelte-3791285122] p:last-child, [svelte-3791285122] blockquote p:last-child {\n\t\tmargin: 0;\n\t}\n\n\tblockquote[svelte-3791285122]::before, [svelte-3791285122] blockquote::before {\n\t\tcontent: '!';\n\t\tposition: absolute;\n\t\tleft: 0.5em;\n\t\ttop: 0.8em;\n\t\tcolor: rgba(170,0,0, 0.7);\n\t\tfont-size: 0.8em;\n\t\tfont-weight: 800;\n\t\twidth: 1em;\n\t\theight: 1em;\n\t\ttext-align: center;\n\t\tline-height: 1;\n\t\tpadding: 0.15em 0.1em 0.1em 0.1em;\n\t\tborder-radius: 50%;\n\t\tborder: 2px solid rgba(170,30,30,0.7);\n\t}\n\n\t@media (min-width: 768px) {\n\t\t[svelte-3791285122].content, [svelte-3791285122] .content {\n\t\t\tpadding: 2em 2em 2em 16em;\n\t\t}\n\t}\n\n",
		map: null // TODO
	});
	
	return {
		css: components.map( x => x.css ).join( '\n' ),
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

function __escape ( html ) {
	return String( html ).replace( /["'&<>]/g, match => escaped[ match ] );
}

module.exports = Guide;
