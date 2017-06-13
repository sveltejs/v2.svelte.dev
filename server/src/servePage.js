import fs from 'fs';

// TODO this is unfortunate... would be nice to have a neater solution
const hashed = __dev__ ? {
	bundle: '/bundle.js',
	css: '/main.css'
} : {
	bundle: require( '../manifests/bundle.json' )[ 'bundle.js' ].replace( 'client/dist', '' ),
	css: require( '../manifests/css.json' )[ 'main.css' ].replace( 'client/dist', '' )
};

let template = fs.readFileSync( `templates/index.html`, 'utf-8' );
if ( !__dev__ ) {
	// TODO come up with a better approach than this massive hack...
	template = template
		.replace( '/bundle.js', hashed.bundle )
		.replace( '/main.css', hashed.css );
}

const templateChunks = [];
const pattern = /__(\w+)__/g;
let match;
let c = 0;

while ( match = pattern.exec( template ) ) {
	templateChunks.push({
		type: 'static',
		content: template.slice( c, match.index )
	});

	templateChunks.push({
		type: 'dynamic',
		content: match[1]
	});

	c = match.index + match[0].length;
}

templateChunks.push({
	type: 'static',
	content: template.slice( c )
});

const preload = [
	`<${hashed.bundle}>; rel=preload; as=script`,
	`<${hashed.css}>; rel=preload; as=style`,

	// only preload the essential fonts for initial render
	`</fonts/rajdhani-light.woff2>; rel=preload; as=font; type='font/woff2'`,
	`</fonts/roboto-regular.woff2>; rel=preload; as=font; type='font/woff2'`
].join( ', ' );

export default function servePage ( res, data ) {
	res.writeHead( 200, {
		'Content-Type': 'text/html',
		Link: preload
	});

	let promise = Promise.resolve();
	templateChunks.forEach( chunk => {
		promise = promise.then( () => {
			if ( chunk.type === 'static' ) {
				res.write( chunk.content );
			}

			else {
				return Promise.resolve( data[ chunk.content ] ).then( content => {
					res.write( content );
				});
			}
		});
	});

	return promise.then( () => {
		res.end();
	});
}