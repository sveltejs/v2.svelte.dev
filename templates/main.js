import app from 'sapper/runtime/app.js';

app.init(document.querySelector('#sapper'), __routes__);

if (__dev__) {
	import('sapper/webpack/hmr');

	if (module.hot) {
		module.hot.accept();
	}
}