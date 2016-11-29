const cache = {};

export function getComponentFromGist ( id ) {
	let cancelled = false;

	if ( !cache[ id ] ) {
		cache[ id ] = fetch( `https://api.github.com/gists/${id}`, { mode: 'cors' })
			.then( r => r.json() )
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

	return fetch( `https://api.github.com/gists`, { method: 'POST', body })
		.then( r => r.json() )
		.then( gist => gist.id );
}
