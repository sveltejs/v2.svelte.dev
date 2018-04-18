---
title: Introduction
---

### What is Svelte?

If you've ever built a JavaScript application, the chances are you've encountered – or at least heard of – frameworks like React, Angular, Vue and Ractive. Like Svelte, these tools all share a goal of making it easy to build slick interactive user interfaces.

But Svelte has a crucial difference: rather than interpreting your application code at *run time*, your app is converted into ideal JavaScript at *build time*. That means you don't pay the performance cost of the framework's abstractions, or incur a penalty when your app first loads.

And because there's no overhead, you can easily adopt Svelte in an existing app incrementally, or ship widgets as standalone packages that work anywhere.

[Read the introductory blog post](/blog/frameworks-without-the-framework) to learn more about Svelte's goals and philosophy.


### Understanding Svelte components

In Svelte, an application is composed from one or more *components*. A component is a reusable self-contained block of code that encapsulates markup, styles and behaviours that belong together.

Like Ractive and Vue, Svelte promotes the concept of *single-file components*: a component is just an `.html` file. Here's a simple example:

```html
<!--{ title: 'Hello world!' }-->
<h1>Hello {name}!</h1>
```

```json
/* { hidden: true } */
{
	name: 'world'
}
```

> Wherever you see <strong style="font-weight: 700; font-size: 16px; font-family: Inconsolata, monospace; color: rgba(170,30,30, 0.8)">REPL</strong> links, click through for an interactive example

Svelte turns this into a JavaScript module that you can import into your app:

```js
/* { filename: 'main.js' } */
import App from './App.html';

const app = new App({
	target: document.querySelector('main'),
	data: { name: 'world' }
});

// change the data associated with the template
app.set({ name: 'everybody' });

// detach the component and clean everything up
app.destroy();
```

Congratulations, you've just learned about half of Svelte's API!


### Getting started

Normally, this is the part where the instructions might tell you to add the framework to your page as a `<script>` tag. But because Svelte runs at build time, it works a little bit differently.

The best way to use Svelte is to integrate it into your build system – there are plugins for Rollup, Browserify, Gulp and others, with more on the way. See [here](https://github.com/sveltejs/svelte/#svelte) for an up-to-date list.

> You will need to have [Node.js](https://nodejs.org/en/) installed, and have some familiarity with the command line

#### Getting started using the REPL

Going to the [REPL](/repl) and pressing the *download* button on any of the examples will give you a .zip file containing everything you need to run that example locally. Just unzip it, `cd` to the directory, and run `npm install` and `npm run dev`. See [this blog post](/blog/the-easiest-way-to-get-started) for more information.

#### Getting started using degit

[degit](https://github.com/Rich-Harris/degit) is a tool for creating projects from templates store in git repos. Install it globally...

```bash
npm install -g degit
```

...then you can use it to spin up a new project:

```bash
degit sveltejs/template my-new-project
cd my-new-project
npm install
npm run dev
```

You can use any git repo you like — these are the 'official' templates:

* [sveltejs/template](https://github.com/sveltejs/template) — this is what you get by downloading from the REPL
* [sveltejs/template-webpack](https://github.com/sveltejs/template-webpack) — similar, but uses [webpack](https://webpack.js.org/) instead of [Rollup](https://rollupjs.org/guide/en)

> There is also a Command Line Interface, [svelte-cli](https://github.com/sveltejs/svelte-cli), but it's not recommended for production use.