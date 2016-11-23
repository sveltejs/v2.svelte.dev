const gobble = require( 'gobble' );
const sander = require( 'sander' );
const marked = require( 'marked' );

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

	gobble( 'node_modules/codemirror' )
		.include([ 'lib/**', 'mode/javascript/**', 'mode/shell/**', 'mode/htmlmixed/**', 'mode/xml/**', 'mode/css/**' ])
		.moveTo( 'codemirror' ),

	gobble( 'node_modules/svelte/dist' ),

	// guide
	gobble( 'src/css' ).transform( 'postcss', {
		src: 'guide/index.css',
		dest: 'guide.css',
		plugins: postcssPlugins
	}),

	gobble( 'src/guide' )
		.transform( function ( inputdir, outputdir, options, done ) {
			var markdownFiles = sander.readdirSync( inputdir ).filter( file => /\.md$/.test( file ) );

			const read = file => sander.readFileSync( inputdir, file, { encoding: 'utf-8' });

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

					const html = marked( content );

					const subsections = [];
					const pattern = /<h3 id="(.+?)">(.+?)<\/h3>/g;
					while ( match = pattern.exec( html ) ) {
						subsections.push({ slug: match[1], title: match[2] });
					}

					console.log( `subsections`, subsections )

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

			sander.writeFileSync( outputdir, 'index.html', html );
			done();
		})
		.moveTo( 'guide' ),

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
			require( 'rollup-plugin-json' )()
		],
		sourceMap: true
	})

]);
