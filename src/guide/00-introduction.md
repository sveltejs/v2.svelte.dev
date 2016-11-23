---
title: Introduction
---

### What is Svelte?

If you've ever built a JavaScript application, the chances are you've encountered – or at least heard of – frameworks like React, Angular, Vue and Ractive. Like Svelte, these tools all share a goal of making it easy to build slick interactive user interfaces.

But Svelte has a crucial difference: rather than interpreting your application code at *run time*, your components are converted into ideal JavaScript at *build time*. That means you don't pay the performance cost of the framework's abstractions, or incur a penalty when your app first loads.

And because there's no overhead, you can easily adopt Svelte in an existing app incrementally, or ship your components as standalone packages that work anywhere.


### Getting started

Normally, this is the part where the instructions would tell you to add a `<script>` tag to your page or install something from npm. But because Svelte runs at build time, it works a little bit differently.

*TODO create a CLI, explain build systems etc*


### Understanding Svelte components

In Svelte, an application is composed from one or more *components*. A component is a reusable self-contained block of code that encapsulates markup, styles and behaviours that belong together.

Like Ractive and Vue, Svelte promotes the concept of *single-file components*: a component is just an `.html` file. Here's a simple example:

```html
<!-- App.html -->
<h1>Hello {{name}}!</h1>
```

```hidden-data
{
  "name": "world"
}
```

Svelte turns this into a JavaScript module that you can import into your app:

```js
// main.js
import App from './App.html';

const app = new App({
	// `target` is the only required option – the element
	// to render the component to
	target: document.querySelector( 'main' ),

	// `data` is optional. A component can also have
	// default data – we'll learn about that later.
	data: {
		name: 'world'
	}
});

// change the data associated with the template
app.set({ name: 'everybody' });

// detach the component and clean everything up
app.teardown();
```

The `import` keyword is coming to browsers soon – for now, you'll need to use a module bundler like [Rollup](http://rollupjs.org) with [rollup-plugin-svelte](https://github.com/rollup/rollup-plugin-svelte) or [Webpack](https://webpack.js.org/) to turn your app into a `<script>` tag that you can include in a web page.

Congratulations, you've just learned about half of Svelte's API!
