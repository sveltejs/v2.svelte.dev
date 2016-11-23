export default function debounce ( fn, delay ) {
	let timeout;

	return function () {
		clearTimeout( timeout );

		timeout = setTimeout( () => {
			fn.apply( this, arguments );
		}, delay || 250 );
	};
}
