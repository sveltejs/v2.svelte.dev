const fs = require( 'fs' );
const path = require( 'path' );

const root = path.resolve( __dirname, '../..' );

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

// copy files to public
exports.copy = function copy ( from, to ) {
	fs.writeFileSync( `${root}/${to}`, fs.readFileSync( `${root}/${from}` ) );
};

exports.updateManifest = function (data) {
	const manifest = tryRequire('../../manifests/content.json') || {};
	Object.assign(manifest, data);
	fs.writeFileSync('manifests/content.json', JSON.stringify(manifest, null, '  '));
};

function tryRequire(file) {
	try {
		return require(file);
	} catch (err) {
		return null;
	}
}