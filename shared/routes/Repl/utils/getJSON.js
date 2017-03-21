export default function getJSON ( url ) {
	return new Promise( ( fulfil, reject ) => {
		const xhr = new XMLHttpRequest();
		xhr.open( 'GET', url );

		xhr.onload = () => {
			fulfil( JSON.parse( xhr.responseText ) );
		};

		xhr.onerror = reject;

		xhr.send();
	});
}