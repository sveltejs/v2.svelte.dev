---
title: Server-side rendering
---

So far, we've discussed creating Svelte components *on the client*, which is to say the browser. But you can also render Svelte components in Node.js. This can result in better perceived performance as it means the application starts rendering while the page is still downloading, before any JavaScript executes. It also has SEO advantages in some cases, and can be beneficial for people running older browsers that can't or won't run your JavaScript for whatever reason.


### Rendering HTML

To use the server-side renderer, we must first *register* it. This means that when you `require` a component `.html` file, it gets intercepted by the SSR compiler:

```js
require( 'svelte/ssr/register' );
```

After that, you can load components like so:

```js
const thing = require( './components/Thing.html' );
```

Components have a different API in Node.js – rather than creating instances with `set(...)` and `get(...)` methods, a component is an object with a `render(data)` method which returns HTML (the `data` object is the same as you would use when instantiating a component in the browser, and is optional):

```js
const data = { answer: 42 };
const html = thing.render( data );
```

Any [default data](#default-data), [computed properties](#computed-properties), [helpers](#helpers) and [nested components](#nested-components) will work as expected.


### Rendering CSS

You can also render your component's ([scoped](#scoped-styles)) CSS, including that of any nested components:

```js
const { css, components } = thing.renderCss();
```

You could put the resulting `css` in a separate stylesheet, or include them in the page inside a `<style>` tag. If you do this, you will probably want to prevent the client-side compiler from including the CSS again. For `svelte-cli`, use the `--no-css` flag. In build tool integrations like `rollup-plugin-svelte`, pass the `css: false` option.

> The `components` array contains an object for each nested component that contains styles, allowing you to dedupe styles across multiple top-level components. Most of the time, you won't need to do this.
