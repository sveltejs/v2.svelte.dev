const fs = require( 'fs' );
const path = require( 'path' );

const root = path.resolve( __dirname, '../..' );

// copy files to public
function copy ( from, to ) {
	fs.writeFileSync( `${root}/${to}`, fs.readFileSync( `${root}/${from}` ) );
}

copy( `node_modules/codemirror/lib/codemirror.css`, `public/codemirror.css` );
copy( `node_modules/magic-string/dist/magic-string.umd.js`, `public/magic-string.umd.js` );