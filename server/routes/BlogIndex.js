'use strict';

var BlogIndex = {};

BlogIndex.filename = "/www/SVELTE/svelte.technology/shared/routes/BlogIndex.html";

BlogIndex.data = function () {
	return {};
};

BlogIndex.render = function ( root, options ) {
	root = root || {};
	
	return `<div class="posts" svelte-1807342844>${ root.posts.map( post => `<article class="post" svelte-1807342844><a href="/blog/${post.slug}/" svelte-1807342844><h2 svelte-1807342844>${__escape( post.metadata.title )}</h2>
					<p class="standfirst" svelte-1807342844>${__escape( post.metadata.description )}</p></a>
	
				<p class="byline" svelte-1807342844><a href="${post.metadata.authorURL}" svelte-1807342844>${__escape( post.metadata.author )}</a>
					<time datetime="${post.metadata.pubdate}" svelte-1807342844>${__escape( post.metadata.dateString )}</time>
	
					<a class="continue-reading" href="/blog/${post.slug}/" svelte-1807342844>continue reading »</a></p></article>` ).join( '' )}</div>`;
};

BlogIndex.renderCss = function () {
	var components = [];
	
	components.push({
		filename: BlogIndex.filename,
		css: "\n\t[svelte-1807342844].posts, [svelte-1807342844] .posts {\n\t\t\n\t\t\n\t\tmin-height: calc(100vh - 3.9em);\n\t}\n\n\t[svelte-1807342844].post, [svelte-1807342844] .post {\n\t\tmax-width: 48em;\n\t\tmargin: 0 auto;\n\t\tpadding: 1em;\t\t\n\t\t\n\t}\n\n\th2[svelte-1807342844], [svelte-1807342844] h2 {\n\t\tfont-size: 1.8em;\n\t\tmargin: 0;\n\t\tfont-weight: 500;\n\t\tcolor: #333;\n\t}\n\n\t[svelte-1807342844].standfirst, [svelte-1807342844] .standfirst {\n\t\tfont-size: 1.4em;\n\t\tfont-family: Rajdhani;\n\t\tline-height: 1.2;\n\t\tcolor: #888;\n\t\tfont-weight: 500;\n\t}\n\n\tp[svelte-1807342844], [svelte-1807342844] p {\n\t\tmargin: 0 0 1em 0;\n\t\tline-height: 1.5;\n\t}\n\n\t[svelte-1807342844].byline, [svelte-1807342844] .byline {\n\t\tfont-size: 0.8em;\n\t\tborder-top: 1px solid #eee;\n\t\tpadding: 0.5em 0;\n\t}\n\n\ttime[svelte-1807342844], [svelte-1807342844] time {\n\t\t\n\t}\n\n\tblockquote[svelte-1807342844], [svelte-1807342844] blockquote {\n\t\tcolor: #999;\n\t\tmargin: 1em 0;\n\t\tpadding: 0.5em 0 0.5em 1em;\n\t\tmax-width: 48em;\n\t\tbackground-color: #f9f9f9;\n\t\tborder-left: 2px solid #ddd;\n\t\t\n\t}\n\n\tp[svelte-1807342844], [svelte-1807342844] p {\n\t\tcolor: #666;\n\t}\n\n\t@media (min-width: 768px) {\n\t\th2[svelte-1807342844], [svelte-1807342844] h2 {\n\t\t\tfont-size: 2.4em;\n\t\t}\n\t}\n",
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

module.exports = BlogIndex;
