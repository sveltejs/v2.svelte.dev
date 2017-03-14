const fs = require( 'fs' );
const path = require( 'path' );
const marked = require( 'marked' );
const hljs = require( 'highlight.js' );
const { copy } = require( './utils.js' );

const root = path.resolve( __dirname, '../..' );

const langs = {
	'hidden-data': 'json',
	'html-no-repl': 'html'
};

function btoa ( str ) {
	return new Buffer( str ).toString( 'base64' );
}

const sections = fs.readdirSync( `${root}/guide` )
	.filter( file => file[0] !== '.' && path.extname( file ) === '.md' )
	.map( file => {
		const markdown = fs.readFileSync( `${root}/guide/${file}`, 'utf-8' );

		let match = /---\n([\s\S]+?)\n---/.exec( markdown );
		const frontMatter = match[1];
		let content = markdown.slice( match[0].length );

		const metadata = {};
		frontMatter.split( '\n' ).forEach( pair => {
			const colonIndex = pair.indexOf( ':' );
			metadata[ pair.slice( 0, colonIndex ).trim() ] = pair.slice( colonIndex + 1 ).trim();
		});

		// syntax highlighting
		let uid = 0;
		const replInput = {};
		const replData = {};
		const highlighted = {};

		content = content
			.replace( /```([\w-]+)?\n([\s\S]+?)```/g, ( match, lang, code ) => {
				if ( lang === 'hidden-data' ) {
					replData[ uid ] = JSON.parse( code );
					return '\n\n';
				}

				const { value } = hljs.highlight( langs[ lang ] || lang, code );
				highlighted[ ++uid ] = value;

				if ( lang === 'html' ) {
					replInput[ uid ] = code.replace( /^\t+/gm, match => match.split( '\t' ).join( '  ' ) );
				}

				return `@@${uid}`;
			});

		const html = marked( content )
			.replace( /<p>(<a class='open-in-repl'[\s\S]+?)<\/p>/g, '$1' )
			.replace( /<p>@@(\d+)<\/p>/g, ( match, id ) => {
				const pre = `<pre><code>${highlighted[ id ]}</code></pre>`;

				if ( id in replInput ) {
					const json = JSON.stringify({
						gist: null,
						source: replInput[ id ],
						data: replData[ id ] || {}
					});

					const href = `/repl?data=${btoa( encodeURIComponent( json ) )}`;
					return `<a class='open-in-repl' href='${href}'></a>${pre}`;
				}

				return pre;
			})
			.replace( /^\t+/gm, match => match.split( '\t' ).join( '  ' ) );

		const subsections = [];
		const pattern = /<h3 id="(.+?)">(.+?)<\/h3>/g;
		while ( match = pattern.exec( html ) ) {
			const slug = match[1];
			const title = match[2]
				.replace( /<\/?code>/g, '' )
				.replace( /\.(\w+).+/, '.$1' );

			subsections.push({ slug, title });
		}

		return {
			html,
			metadata,
			subsections,
			slug: file.replace( /^\d+-/, '' ).replace( /\.md$/, '' )
		};
	});

fs.writeFileSync( `${root}/public/guide.json`, JSON.stringify( sections ) );
fs.writeFileSync( `${root}/shared/components/guide-summary.json`, JSON.stringify( sections ) );