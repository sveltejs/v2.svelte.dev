import { init } from '__app__';

init(document.querySelector('#sapper'), __routes__);

// Sadly need to comment this out pending
// https://github.com/sveltejs/sapper-template/issues/2
// if (__dev__) {
// 	import('sapper/webpack/hmr');
// 	if (module.hot) module.hot.accept();
// }