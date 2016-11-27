---
title: Introduction
---

### What is Svelte?

If you've ever built a JavaScript application, the chances are you've encountered – or at least heard of – frameworks like React, Angular, Vue and Ractive. Like Svelte, these tools all share a goal of making it easy to build slick interactive user interfaces.

But Svelte has a crucial difference: rather than interpreting your application code at *run time*, your app is converted into ideal JavaScript at *build time*. That means you don't pay the performance cost of the framework's abstractions, or incur a penalty when your app first loads.

And because there's no overhead, you can easily adopt Svelte in an existing app incrementally, or ship widgets as standalone packages that work anywhere.

[Read the introductory blog post](/blog/frameworks-without-the-framework/) to learn more about Svelte's goals and philosophy.


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
	target: document.querySelector( 'main' ),
	data: { name: 'world' }
});

// change the data associated with the template
app.set({ name: 'everybody' });

// detach the component and clean everything up
app.teardown();
```

Congratulations, you've just learned about half of Svelte's API!


### Getting started

Normally, this is the part where the instructions would tell you to add a `<script>` tag to your page or install something from npm. But because Svelte runs at build time, it works a little bit differently.

The best way to use Svelte is to integrate it into your build system. You can use Svelte with [Rollup](http://rollupjs.org) via [rollup-plugin-svelte](https://github.com/rollup/rollup-plugin-svelte), with more build tool integrations following soon.

Right now, for the purposes of demonstration, we'll use [svelte-cli](https://github.com/sveltejs/svelte-cli), the command line interface.

> You will need to have [Node.js](https://nodejs.org/en/) installed, and have some familiarity with the command line

First, install the CLI:

```bash
npm install -g svelte-cli
```

Then, create our component file:

```bash
mkdir my-svelte-project
cd my-svelte-project
echo "<h1>Hello {{name}}\!</h1>" > HelloWorld.html
```

Compile it:

```bash
svelte compile --format iife HelloWorld.html > HelloWorld.js
```

The `--format iife` bit means 'generate an immediately-invoked function expression' – this allows us to use the component as a simple `<script>` tag. (By default, Svelte will create a JavaScript module instead, which is recommended for more serious applications but requires additional steps.)

Create an `index.html` page and include the script we just generated:

```html
<!doctype html>
<html>
<head>
	<title>My first Svelte app</title>
</head>
<body>
	<main></main>
	<script src='HelloWorld.js'></script>
	<script>
		var app = new HelloWorld({
			target: document.querySelector( 'main' ),
			data: {
				name: 'world'
			}
		});
	</script>
</body>
</html>
```

Finally, open the page in your browser – `open index.html` – and interact with `app` via the console using the API.
