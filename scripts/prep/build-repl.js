const { copy } = require( './utils.js' );

copy( `node_modules/codemirror/lib/codemirror.css`, `public/codemirror.css` );
copy( `node_modules/rollup/dist/rollup.browser.js`, `public/rollup.browser.js` );
copy( `node_modules/svelte/compiler/svelte.js`, `public/svelte.js` );