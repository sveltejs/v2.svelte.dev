const match = /version=([^\&]+)/.exec( window.location.search );

export const version = ( typeof svelte !== 'undefined' && svelte.VERSION ) ?
	svelte.VERSION :
	match ? match[1] :
	null;

console.log( `running Svelte compiler version %c${version}`, 'font-weight: bold' ); // eslint-disable-line no-console
