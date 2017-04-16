export function get ( url, options = {} ) {
	return new Promise( ( fulfil, reject ) => {
		const xhr = new XMLHttpRequest();
		xhr.open( 'GET', url );

		xhr.responseType = options.responseType || 'text';

		xhr.onload = () => {
			fulfil( xhr.response );
		};

		xhr.onerror = reject;

		xhr.send();
	});
}