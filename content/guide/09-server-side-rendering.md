---
title: Server-side rendering
---

So far, we've discussed creating Svelte components *on the client*, which is to say the browser. But you can also render Svelte components in Node.js. This can result in better perceived performance as it means the application starts rendering while the page is still downloading, before any JavaScript executes. It also has SEO advantages in some cases, and can be beneficial for people running older browsers that can't or won't run your JavaScript for whatever reason.


### Rendering HTML

To use the server-side renderer, we must first *register* it. This means that when you `require` a component `.html` file, it gets intercepted by the SSR compiler:

```js
require( 'svelte/ssr/register' );
```

If on the other hand you use a different extension than `.html` (eg. `.svelte`), you need to bootstrap the SSR compiler by passing an [options](#ssr-options) object:

```js
require( 'svelte/ssr/register' )({
  extensions: ['.svelte']
});
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

> The SSR compiler will generate a CommonJS module for each of your components – meaning that `import` and `export` statements are converted into their `require` and `module.exports` equivalents. If your components have non-component dependencies, they must also work as CommonJS modules in Node. If you're using ES2015 modules, we recommend [reify](https://github.com/benjamn/reify) for automatically converting them to CommonJS.


### Rendering CSS

You can also render your component's ([scoped](#scoped-styles)) CSS, including that of any nested components:

```js
const { css, components } = thing.renderCss();
```

You could put the resulting `css` in a separate stylesheet, or include them in the page inside a `<style>` tag. If you do this, you will probably want to prevent the client-side compiler from including the CSS again. For `svelte-cli`, use the `--no-css` flag. In build tool integrations like `rollup-plugin-svelte`, pass the `css: false` option.

> The `components` array contains an object for each nested component that contains styles, allowing you to dedupe styles across multiple top-level components. Most of the time, you won't need to do this.

### SSR Options
| | **Values** | **Description** | **Default** |
|---|---|---|---|
| `extensions` | `array` | An array of extensions to intercept | `undefined` |
