const fs = require( 'fs' );
const path = require( 'path' );
const marked = require( 'marked' );

const root = path.resolve( __dirname, '../..' );

const sections = fs.readdirSync( `${root}/guide` )
	.filter( file => file[0] !== '.' && path.extname( file ) === '.md' )
	.map( file => {
		const markdown = fs.readFileSync( `${root}/guide/${file}`, 'utf-8' );

		let match = /---\n([\s\S]+?)\n---/.exec( markdown );
		const frontMatter = match[1];
		const content = markdown.slice( match[0].length );

		const metadata = {};
		frontMatter.split( '\n' ).forEach( pair => {
			const colonIndex = pair.indexOf( ':' );
			metadata[ pair.slice( 0, colonIndex ).trim() ] = pair.slice( colonIndex + 1 ).trim();
		});

		const html = marked( content.replace( /^\t+/gm, match => match.split( '\t' ).join( '  ' ) ) );

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