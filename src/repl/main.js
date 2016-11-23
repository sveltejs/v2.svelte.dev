import Repl from './Repl.html';
import examples from './examples.js';

// recover state from URL
let initialState;

const match = /shareable=(.+)$/.exec( window.location.search );
if ( match ) {
	try {
		const json = decodeURIComponent( atob( match[1] ) );
		initialState = JSON.parse( json );
	} catch ( err ) {
		// do nothing
	}
}

const repl = new Repl({
	target: document.querySelector( 'main' ),
	data: initialState || { gist: examples[0].gist }
});

window.repl = repl;
