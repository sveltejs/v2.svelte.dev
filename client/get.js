export default function get ( url ) {
	return new Promise( ( fulfil, reject ) => {
		const xhr = new XMLHttpRequest();
		xhr.open( 'GET', url );
		xhr.onerror = reject;
		xhr.onload = () => fulfil( xhr.responseText );
		xhr.send();
	});
}