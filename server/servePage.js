const fs = require( 'fs' );

const template = fs.readFileSync( `${__dirname}/templates/index.html`, 'utf-8' );
	
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
	`</bundle.js>; rel=preload; as=script`,
	`</main.css>; rel=preload; as=style`,

	// only preload the essential fonts for initial render
	`</fonts/rajdhani-light.woff2>; rel=preload; as=font; type='font/woff2'`,
	`</fonts/roboto-regular.woff2>; rel=preload; as=font; type='font/woff2'`
].join( ', ' );

module.exports = function servePage ( res, data ) {
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
};