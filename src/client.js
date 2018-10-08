import { init } from 'sapper/runtime.js';
import store from '../client/store.js';
import { manifest } from './manifest/client.js';

// TODO
// import CustomProperties from '../utils/css-custom-properties.js'
// new CustomProperties()

init({
  target: document.querySelector('#sapper'),
  manifest,
  store: data => {
    store.set(data);

    fetch(`api/guide/contents`)
      .then(r => r.json())
      .then(guide_contents => {
        store.set({ guide_contents });
      });

    window.store = store;
    return store;
  },
});

if (navigator.serviceWorker && navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.onstatechange = function(e) {
    if (e.target.state === 'redundant') {
      import('./components/toaster.html').then(mod => {
        mod.default.show();
      });
    }
  };
}

// if (!localStorage.fonts) {
//   import('./utils/local-fonts.js');
// }
