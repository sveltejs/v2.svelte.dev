const fs = require( 'fs' );
const path = require( 'path' );
const assert = require( 'assert' );
const { mkdirp } = require( './utils.js' );

const root = path.resolve( __dirname, '../..' );

const manifest = require( `${root}/examples/manifest.json` );
const examples = fs.readdirSync( `${root}/examples` ).filter( file => file[0] !== '.' && file !== 'manifest.json' );

assert.deepEqual( examples.sort(), manifest.slice().sort() );

mkdirp( `${root}/public/examples` );

const summary = [];
manifest.forEach( file => {
	const example = require( `${root}/examples/${file}/example.json` );
	example.source = fs.readFileSync( `${root}/examples/${file}/source.html`, 'utf-8' );

	fs.writeFileSync( `${root}/public/examples/${file}.json`, JSON.stringify( example ) );

	summary.push({
		id: file,
		title: example.title
	});
});

fs.writeFileSync( `${root}/shared/routes/Repl/examples.js`, `
// this file is auto-generated, don't edit it
export default ${JSON.stringify( summary )};
`.trim() );