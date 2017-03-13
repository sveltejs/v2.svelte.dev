'use strict';

var BlogPost = {};

BlogPost.filename = "/Users/rharris/Documents/www/SVELTE/svelte.technology/shared/routes/BlogPost.html";

BlogPost.data = function () {
	return {};
};

BlogPost.render = function ( root, options ) {
	root = root || {};
	
	return `<article class="post" svelte-1626667663><h1 svelte-1626667663>${__escape( root.post.metadata.title )}</h1>
		<p class="standfirst" svelte-1626667663>${__escape( root.post.metadata.description )}</p>
	
		<p class="byline" svelte-1626667663><a href="${root.post.metadata.authorURL}" svelte-1626667663>${__escape( root.post.metadata.author )}</a> <time datetime="${root.post.metadata.pubdate}" svelte-1626667663>${__escape( root.post.metadata.dateString )}</time></p>
	
		${root.post.html}</article>`;
};

BlogPost.renderCss = function () {
	var components = [];
	
	components.push({
		filename: BlogPost.filename,
		css: "\n\t[svelte-1626667663].post, [svelte-1626667663] .post {\n\t\tmax-width: 48em;\n\t\tmargin: 0 auto;\n\t\tpadding: 1em;\t\t\n\t\t\n\t}\n\n\tp[svelte-1626667663], [svelte-1626667663] p {\n\t\tmargin: 0 0 1em 0;\n\t\tline-height: 1.5;\n\t}\n\n\t[svelte-1626667663].byline, [svelte-1626667663] .byline {\n\t\tfont-size: 0.8em;\n\t\tborder-top: 1px solid #eee;\n\t\tpadding: 0.5em 0;\n\t}\n\n\ttime[svelte-1626667663], [svelte-1626667663] time {\n\t\t\n\t}\n\n\tp[svelte-1626667663], [svelte-1626667663] p {\n\t\tfont-weight: 300;\n\t\tcolor: #333;\n\t}\n\n\tp[svelte-1626667663]:last-child, [svelte-1626667663] p:last-child {\n\t\tmargin: 0;\n\t}\n\n\tstrong[svelte-1626667663], [svelte-1626667663] strong {\n\t\tcolor: #333;\n\t\tfont-weight: 700;\n\t}\n\n\tcode[svelte-1626667663], [svelte-1626667663] code {\n\t\tbackground-color: #f9f9f9;\n\t\tpadding: 0.2em 0.4em;\n\t\tborder-radius: 3px;\n\t}\n\n\t[svelte-1626667663].post, [svelte-1626667663] .post {\n\t\tpadding: 1em;\n\t}\n\n\th1[svelte-1626667663], [svelte-1626667663] h1, h2[svelte-1626667663], [svelte-1626667663] h2 {\n\t\tfont-size: 1.8em;\n\t\tmargin: 0;\n\t\tfont-weight: 500;\n\t}\n\n\th2[svelte-1626667663], [svelte-1626667663] h2 {\n\t\tcolor: #333;\n\t}\n\n\t[svelte-1626667663].standfirst, [svelte-1626667663] .standfirst {\n\t\tfont-size: 1.4em;\n\t\tfont-family: Rajdhani;\n\t\tline-height: 1.2;\n\t\tcolor: #888;\n\t\tfont-weight: 500;\n\t}\n\n\tblockquote[svelte-1626667663], [svelte-1626667663] blockquote {\n\t\tcolor: #999;\n\t\tmargin: 1em 0;\n\t\tpadding: 0.5em 0 0.5em 1em;\n\t\tmax-width: 48em;\n\t\tbackground-color: #f9f9f9;\n\t\tborder-left: 2px solid #ddd;\n\t\t\n\t}\n\n\tblockquote[svelte-1626667663] p, [svelte-1626667663] blockquote p {\n\t\tcolor: #666;\n\t}\n\n\tblockquote[svelte-1626667663] strong, [svelte-1626667663] blockquote strong {\n\t\tdisplay: block;\n\t\tfont-weight: 300;\n\t\tfont-style: italic;\n\t\tcolor: #666;\n\t}\n\n\t@media (min-width: 768px) {\n\t\th1[svelte-1626667663], [svelte-1626667663] h1, h2[svelte-1626667663], [svelte-1626667663] h2 {\n\t\t\tfont-size: 2.4em;\n\t\t}\n\t}\n",
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

module.exports = BlogPost;
