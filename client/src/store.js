const cache = {};

function get ( url ) {
	return new Promise( ( fulfil, reject ) => {
		const xhr = new XMLHttpRequest();
		xhr.open( 'GET', url );
		xhr.onerror = reject;
		xhr.onload = () => fulfil( xhr.responseText );
		xhr.send();
	});
}

export function getJSON ( url ) {
	if ( !cache[ url ] ) {
		cache[ url ] = get( url )
			.then( JSON.parse )
			.catch( err => {
				cache[ url ] = null;
				throw err;
			});
	}

	return cache[ url ];
}