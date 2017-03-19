const cache = {};

export function script ( src ) {
	if ( !cache[ src ] ) {
		cache[ src ] = new Promise( ( fulfil, reject ) => {
			const script = document.createElement( 'script' );

			script.onload = fulfil;

			script.onerror = err => {
				cache[ src ] = null;
				reject( err );
			};

			script.src = src;

			document.querySelector( 'head' ).appendChild( script );
		});
	}

	return cache[ src ];
}

export function css ( href ) {
	if ( !cache[ href ] ) {
		cache[ href ] = new Promise( ( fulfil, reject ) => {
			const link = document.createElement( 'link' );

			link.onload = fulfil;

			link.onerror = err => {
				cache[ href ] = null;
				reject( err );
			};

			link.rel = 'stylesheet';
			link.href = href;

			document.querySelector( 'head' ).appendChild( link );
		});
	}

	return cache[ href ];
}