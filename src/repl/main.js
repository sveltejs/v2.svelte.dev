import Repl from './Repl.html';
import examples from './examples.js';

function tryParseData ( encoded ) {
	try {
		return JSON.parse( decodeURIComponent( atob( encoded ) ) );
	} catch ( err ) {
		return {};
	}
}

if ( typeof svelte !== 'undefined' ) {
	const dataMatch = /data=(.+)$/.exec( window.location.search );
	const { source, data } = dataMatch ? tryParseData( dataMatch[1] ) : {};

	const gistMatch = /gist=(.+)$/.exec( window.location.search );
	const gist = gistMatch ? gistMatch[1] : ( source ? null : examples[0].gist );

	const repl = new Repl({
		target: document.querySelector( 'main' ),
		data: {
			gist,
			source,
			data
		}
	});

	window.repl = repl;
} else {
	document.querySelector( 'main' ).innerHTML = `<p style='text-align: center; margin: 0; padding: 4em 3em 8em 3em; line-height: 1.5;'>Svelte generates components that work in all modern JavaScript environments, but the Svelte compiler only runs in Node 6+ and browsers that support ES2015 features. Please reopen this page in a different browser such as Chrome.</p>`;
}
