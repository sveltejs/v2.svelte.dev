const fs = require( 'fs' );
const path = require( 'path' );

exports.mkdirp = function mkdirp ( dir ) {
	const parent = path.dirname( dir );
	if ( parent === dir ) return;

	mkdirp( parent );
	try {
		fs.mkdirSync( dir );
	} catch ( err ) {
		if ( err.code !== 'EEXIST' ) throw err;
	}
};