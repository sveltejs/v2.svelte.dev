const fs = require( 'fs' );
const path = require( 'path' );
const glob = require( 'glob' );
const { mkdirp } = require( './utils.js' );

const root = path.resolve( __dirname, '../..' );

const manifest = require( `${root}/content/examples/manifest.json` );

mkdirp( `${root}/public/examples` );

const summary = [];
const redirects = {};
manifest.forEach( group => {
	const groupSummary = [];

	group.examples.forEach( id => {
		const example = require( `${root}/content/examples/${id}/example.json` );

		if ( example.redirect ) {
			redirects[ id ] = example.redirect;
			return;
		}

		example.data = example.data || {};

		example.components = glob.sync( '**/*.+(html|js)', { cwd: `${root}/content/examples/${id}` })
			.map( file => {
				const ext = path.extname(file);
				const type = ext.slice(1);

				return {
					name: file.replace( ext, '' ),
					type,
					entry: file === 'App.html' ? true : undefined,
					source: fs.readFileSync( `${root}/content/examples/${id}/${file}`, 'utf-8' )
				};
			})
			.sort( ( a, b ) => {
				if ( a.name === 'App' ) return -1;
				if ( b.name === 'App' ) return 1;

				if ( a.type !== b.type ) {
					return a.type === 'js' ? 1 : -1;
				}

				return a.name < b.name ? -1 : 1;
			});

		fs.writeFileSync( `${root}/public/examples/${id}.json`, JSON.stringify( example ) );

		groupSummary.push({
			id,
			title: example.title
		});
	});

	summary.push({
		name: group.name,
		examples: groupSummary
	});
});

fs.writeFileSync( `${root}/src/universal/routes/Repl/examples.js`, `
// this file is auto-generated, don't edit it
export const exampleGroups = ${JSON.stringify( summary )};
export const redirects = ${JSON.stringify( redirects )};
`.trim() );