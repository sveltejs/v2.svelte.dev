const cache = {};

export function getComponentFromGist ( id ) {
	let cancelled = false;

	if ( !cache[ id ] ) {
		cache[ id ] = new Promise( ( resolve, reject ) => {
			const request = new XMLHttpRequest();
			request.open( 'GET', `https://api.github.com/gists/${id}` );
			request.onload = () => resolve( request );
			request.onerror = () => reject( new TypeError('Network request failed') );
			request.send();
		} )
			.then( r => JSON.parse(r.responseText) )
			.then( gist => {
				const sourceFile = gist.files[ 'component.html' ];
				const source = sourceFile && sourceFile.content;

				const jsonFile = gist.files[ 'data.json' ];
				const json = jsonFile && jsonFile.content;

				return {
					id,
					source,
					json: json || '{}'
				};
			})
			.catch( err => {
				cache[ id ] = null;
				throw err;
			});
	}

	const promise = cache[ id ].then( component => {
		if ( cancelled ) throw new Error( `Request was cancelled` );
		return component;
	});

	promise.cancel = () => {
		cancelled = true;
	};

	return promise;
}

export function saveComponentAsGist ( source, json ) {
	const body = JSON.stringify({
		description: 'Svelte component',
		public: true,
		files: {
			'component.html': {
				content: source
			},
			'data.json': {
				content: json
			}
		}
	});

	return new Promise( ( resolve, reject ) => {
		const request = new XMLHttpRequest();
		request.withCredentials = true;
		request.open( 'POST', `https://api.github.com/gists` );
		request.onload = () => resolve( request );
		request.onerror = () => reject( new TypeError('Network request failed') );
		request.send(body);
	} )
		.then( r => JSON.parse(r.responseText) )
		.then( gist => gist.id );
}
