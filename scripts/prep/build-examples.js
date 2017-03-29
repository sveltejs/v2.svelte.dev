const fs = require( 'fs' );
const path = require( 'path' );
const assert = require( 'assert' );
const glob = require( 'glob' );
const { mkdirp } = require( './utils.js' );

const root = path.resolve( __dirname, '../..' );

const manifest = require( `${root}/examples/manifest.json` );
const examples = fs.readdirSync( `${root}/examples` ).filter( file => file[0] !== '.' && file !== 'manifest.json' );

assert.deepEqual( examples.sort(), manifest.slice().sort() );

mkdirp( `${root}/public/examples` );

const summary = [];
manifest.forEach( id => {
	const example = require( `${root}/examples/${id}/example.json` );

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

	summary.push({
		id,
		title: example.title
	});
});

fs.writeFileSync( `${root}/shared/routes/Repl/examples.js`, `
// this file is auto-generated, don't edit it
export default ${JSON.stringify( summary )};
`.trim() );