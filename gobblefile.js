const gobble = require( 'gobble' );
const path = require( 'path' );
const fs = require( 'fs' );
const marked = require( 'marked' );
const Entities = require( 'html-entities' ).AllHtmlEntities;

const entities = new Entities();

const postcssPlugins = [
	require( 'postcss-import' ),
	require( 'postcss-nested' ),
	require( 'postcss-clearfix' )
];

module.exports = gobble([

	// shared stuff
	gobble( 'src/files' ),

	gobble( 'src/css' ).transform( 'postcss', {
		src: 'main.css',
		dest: 'main.css',
		plugins: postcssPlugins
	}),

	gobble( 'node_modules/curl-amd/dist/curl' ),

	gobble( 'node_modules/codemirror/lib' ).include( 'codemirror.css' ),
	gobble( 'node_modules/codemirror' )
		.transform( 'concat', {
			dest: 'codemirror-bundle.js',
			files: [
				'lib/codemirror.js',
				'mode/javascript/javascript.js',
				'mode/shell/shell.js',
				'mode/htmlmixed/htmlmixed.js',
				'mode/xml/xml.js',
				'mode/css/css.js'
			]
		})
		.transformIf( gobble.env() === 'production', 'uglifyjs' ),

	gobble( 'node_modules/magic-string/dist/magic-string.umd.js' ),
	gobble( 'node_modules/svelte/compiler' ),

	// guide
	gobble( 'src/css' ).transform( 'postcss', {
		src: 'guide/index.css',
		dest: 'guide.css',
		plugins: postcssPlugins
	}),
	//
	gobble( 'src/guide' )
		.transform( function ( inputdir, outputdir, options, done ) {
			var markdownFiles = fs.readdirSync( inputdir ).filter( file => /\.md$/.test( file ) );

			const read = file => fs.readFileSync( path.join( inputdir, file ), 'utf-8' );

			var templates = {
				index: read( 'index.html' ),
				section: read( 'section.html' )
			};

			var sections = markdownFiles
				.map( file => {
					var markdown = read( file );

					var match = /---\n([\s\S]+?)\n---/.exec( markdown );
					var frontMatter = match[1];
					var content = markdown.slice( match[0].length );

					var metadata = {};
					frontMatter.split( '\n' ).forEach( pair => {
						var colonIndex = pair.indexOf( ':' );
						metadata[ pair.slice( 0, colonIndex ).trim() ] = pair.slice( colonIndex + 1 );
					});

					const html = marked( content.replace( /^\t+/gm, match => match.split( '\t' ).join( '  ' ) ) );

					const subsections = [];
					const pattern = /<h3 id="(.+?)">(.+?)<\/h3>/g;
					while ( match = pattern.exec( html ) ) {
						const slug = match[1];
						const title = match[2]
							.replace( /<\/?code>/g, '' )
							.replace( /\.(\w+).+/, '.$1' )

						subsections.push({ slug, title });
					}

					return {
						html,
						metadata,
						subsections,
						slug: file.replace( /^\d+-/, '' ).replace( /\.md$/, '' )
					};
				});

			var main = sections.map( section => {
				return templates.section.replace( /\{\{([^\}]+)\}\}/g, function ( match, keypath ) {
					return section.metadata[ keypath ] || section[ keypath ];
				});
			}).join( '\n' );

			var sidebar = sections.map( section => {
				return `
					<li>
						<a class='section' href='#${section.slug}'>${section.metadata.title}</a>
						${section.subsections.map( subsection => {
							return `<a class='subsection' href='#${subsection.slug}'>${subsection.title}</a>`
						}).join( '\n' )}
					</li>`;
			}).join( '\n' );

			var html = templates.index
				.replace( '{{>sidebar}}', sidebar )
				.replace( '{{>main}}', main );

			fs.writeFileSync( path.join( outputdir, 'index.html' ), html );
			done();
		})
		.moveTo( 'guide' ),

	// blog
	gobble( 'src/blog' )
		.transform( function ( inputdir, outputdir, options, done ) {
			const read = file => fs.readFileSync( path.join( inputdir, file ), 'utf-8' );

			const templates = {
				index: read( 'index.html' ),
				post: read( 'post.html' )
			};

			const posts = fs.readdirSync( path.join( inputdir, 'posts' ) )
				.filter( file => /\.md$/.test( file ) )
				.map( file => {
					const markdown = read( `posts/${file}` );

					const match = /---\n([\s\S]+?)\n---/.exec( markdown );
					const frontMatter = match[1];
					const content = markdown.slice( match[0].length );

					var metadata = {};
					frontMatter.split( '\n' ).forEach( pair => {
						var colonIndex = pair.indexOf( ':' );
						metadata[ pair.slice( 0, colonIndex ).trim() ] = pair.slice( colonIndex + 1 ).trim();
					});

					const date = new Date( metadata.pubdate );
					metadata.dateString = date.toDateString();

					const html = marked( content.replace( /^\t+/gm, match => match.split( '\t' ).join( '  ' ) ) );

					return {
						html,
						metadata,
						slug: file.replace( /^\d+-/, '' ).replace( /\.md$/, '' )
					};
				});

			posts.forEach( post => {
				const rendered = templates.post.replace( /<@\s*(\w+)\s*@>/g, ( match, key ) => {
					return key in post.metadata ? entities.encode( post.metadata[ key ] ) :
					       key in post ? post[ key ] : match;
				});

				fs.mkdirSync( path.join( outputdir, post.slug ) );
				fs.writeFileSync( path.join( outputdir, `${post.slug}/index.html` ), rendered );
			});

			const preview = posts.map( post => {
				return `
					<article class='post'>
						<a href='/blog/${post.slug}/'>
							<h2>${post.metadata.title}</h2>
							<p class='standfirst'>${post.metadata.description}</p>
						</a>

						<p class='byline'>
							<a href='${post.metadata.authorURL}'>${post.metadata.author}</a>
							<time datetime='${post.metadata.pubdate}'>${post.metadata.dateString}</time>

							<a class='continue-reading' href='/blog/${post.slug}/'>continue reading &raquo;</a>
						</p>
					</article>
				`;
			});

			var index = templates.index.replace( '<@posts@>', preview );

			fs.writeFileSync( path.join( outputdir, 'index.html' ), index );
			done();
		})
		.moveTo( 'blog' ),

	gobble( 'src/css' ).transform( 'postcss', {
		src: 'blog/index.css',
		dest: 'blog/index.css',
		plugins: postcssPlugins
	}),

	// repl
	gobble( 'src/css' ).transform( 'postcss', {
		src: 'repl/index.css',
		dest: 'repl.css',
		plugins: postcssPlugins
	}),

	gobble( 'src/css' ).transform( 'postcss', {
		src: 'repl-viewer/index.css',
		dest: 'repl-viewer.css',
		plugins: postcssPlugins
	}),

	gobble( 'src/repl' ).transform( 'rollup', {
		entry: 'main.js',
		dest: 'repl.js',
		format: 'iife',
		plugins: [
			require( 'rollup-plugin-svelte' )(),
			require( 'rollup-plugin-buble' )()
		],
		sourceMap: true
	})

]);
