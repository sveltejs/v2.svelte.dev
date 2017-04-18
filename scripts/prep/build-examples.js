const fs = require( 'fs' );
const path = require( 'path' );
const assert = require( 'assert' );
const glob = require( 'glob' );
const { mkdirp } = require( './utils.js' );

const root = path.resolve( __dirname, '../..' );

const manifest = require( `${root}/examples/manifest.json` );
const examples = fs.readdirSync( `${root}/examples` ).filter( file => file[0] !== '.' && file !== 'manifest.json' );

// check all examples exist and are used
const flattened = manifest.reduce( ( f, group ) => ( f.push( ...group.examples ), f ), [] );
assert.deepEqual( examples.sort(), flattened.slice().sort() );

mkdirp( `${root}/public/examples` );

const summary = [];
const redirects = {};
manifest.forEach( group => {
	const groupSummary = [];

	group.examples.forEach( id => {
		const example = require( `${root}/examples/${id}/example.json` );

		if ( example.redirect ) {
			redirects[ id ] = example.redirect;
			return;
		}

		example.data = example.data || {};

		example.components = glob.sync( '**/*.html', { cwd: `${root}/examples/${id}` })
			.map( file => {
				return {
					name: file.replace( /\.html$/, '' ),
					entry: file === 'App.html' ? true : undefined,
					source: fs.readFileSync( `${root}/examples/${id}/${file}`, 'utf-8' )
				};
			})
			.sort( ( a, b ) => {
				if ( a.name === 'App' ) return -1;
				if ( b.name === 'App' ) return 1;

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

fs.writeFileSync( `${root}/shared/routes/Repl/examples.js`, `
// this file is auto-generated, don't edit it
export const exampleGroups = ${JSON.stringify( summary )};
export const redirects = ${JSON.stringify( redirects )};
`.trim() );