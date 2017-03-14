const { copy } = require( './utils.js' );

copy( `node_modules/codemirror/lib/codemirror.css`, `public/codemirror.css` );
copy( `node_modules/magic-string/dist/magic-string.umd.js`, `public/magic-string.umd.js` );