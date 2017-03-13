const fs = require( 'fs' );
const path = require( 'path' );
const rollup = require( 'rollup' );
const svelte = require( 'rollup-plugin-svelte' );
const { mkdirp } = require( './utils.js' );

const root = path.resolve( __dirname, '../..' );

// generate bundles for each route, plus the nav
[ 'routes/Index', 'routes/BlogIndex', 'routes/BlogPost', 'routes/Guide', 'components/Nav' ].forEach( entry => {
	rollup.rollup({
		entry: `${root}/shared/${entry}.html`,
		plugins: [
			svelte({
				generate: 'ssr',
				css: false
			})
		]
	}).then( bundle => {
		const { code } = bundle.generate({ format: 'cjs' });

		const dest = `${root}/server/${entry}.js`;
		mkdirp( path.dirname( dest ) );

		fs.writeFileSync( dest, code );
	});
});