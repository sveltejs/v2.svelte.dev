---
title: Custom elements
---

Svelte components can be used as custom elements by doing the following:

1. Declaring `tag` attribute on the component with a value that must contain a hyphen (`my-thing` in the example below).
2. Compiling the component by specifying `customElement: true` attribute in the build configuration (in the _rollup-plugin-svelte_ configuration shown in the demo application source).

The compiled custom elements are still full-fledged Svelte components and can be used as such in applications.

The complete source of the examples used in this section can be found at [the bottom of this page](#demo-application-source). It is a static HTML application that uses `my-thing` custom element.

### Content distribution

Custom elements can use [slots](#composing-with-slot-) for content distribution.

### Communication with main DOM tree

Custom elements create shadow DOM thereby isolating the element HTML and CSS from the main DOM tree.

**Inbound** - Data can be passed to custom elements as props.

```html-no-repl
<my-thing req="Hello custom element!"></my-thing>
```

**Outbound** - A possible way of outbound communication is dispatching Custom DOM events from the custom elements.

```js
ev.target.dispatchEvent(
	new CustomEvent('res', {
	detail: 'Hello parent!',
	bubbles: true,
	cancelable: true,
	composed: true // makes the event jump shadow DOM boundary
}));
```

> Note the `composed: true` attribute of the custom event. It enables the custom DOM event to cross the shadow DOM boundary and enter into main DOM tree.

### Observing properties

If a property is being used as a tag in the custom element template as shown below, it will be observed automatically:

```html-no-repl
<p>Received inbound request attribute: {{req}}</p>
```

You'll have to declare it manually in the component if that's not the case:

```js
export default {
	tag: 'my-thing',
	props: ['req']
}
```

### Bundling considerations

* Custom elements use ES2015 classes extension mechanism (`MyThing extends HTMLElement`). Therefore, while bundling,  make sure you don't transpile the custom element code to ES5 and use a ES2015-aware minifier such as [babel-minify](https://github.com/babel/minify).

* For ES5 support, make sure to use `Reflect.construct` aware transpiler plugin such as [babel-plugin-transform-builtin-classes](https://github.com/WebReflection/babel-plugin-transform-builtin-classes) and a polyfill like [custom-elements-es5-adapterjs](https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs).

### Demo application source

#### Custom element - MyThing.html

```html-no-repl
<section>
	<h2>I'm a custom element.</h2>
	<p>The inbound <em>req</em> property value will be displayed at the bottom on the button click.</p>
	<p>Also, a custom <em>res</em> DOM event will be dispatched up the hierarchy.</p>
	<button on:click="onClick(event)">Display Message</button>
	<p ref:msgDisplay class="req"></p>
</section>

<style>
	.req {
		font-weight: bold;
		color: navy;
	}

	section {
		border: 1px dashed lightgreen;
		padding: 10px;
		width: 550px;
		height: 200px;
	}
</style>

<script>
	export default {
		tag: 'my-thing',
		props: ['req'],

		data() {
			return {
				req: ''
			}
		},

		methods: {
			onClick(ev) {
				this.refs.msgDisplay.innerText = this.get('req');
				ev.target.dispatchEvent(
					new CustomEvent('res', {
					detail: 'Hello parent!',
					bubbles: true,
					cancelable: true,
					composed: true // makes the event jump shadow DOM boundary
				}));
			}
		}
	}
</script>

```

#### Bundle configuration for custom element - rollup.config.js

```js
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babili from 'rollup-plugin-babili';

const production = !process.env.ROLLUP_WATCH;

export default {
	entry: 'src/MyThing.html',
	dest: 'public/svelte/bundle.js',
	format: 'umd',
	moduleName: 'MyThing',
	sourceMap: true,
	plugins: [
		svelte({
			css: css => {
				css.write('public/svelte/bundle.css');
			},
			cascade: false,
			customElement: true
		}),

		resolve(),
		commonjs(),

		production && babili()
	]
};

```

#### Static HTML Application that uses my-thing custom element - index.html

```html-no-repl
<!DOCTYPE html>
<html>

	<head>
		<base href="." />
		<title>Svelte custom elements</title>
		<link rel="stylesheet" href="style.css" />
		<script src="./svelte/bundle.js"></script> <!-- The my-thing custom element bundle -->

		<script>
			document.addEventListener("DOMContentLoaded", function(event) {
				document.querySelector('my-thing').addEventListener('res', function (ev) {
					document.querySelector('.custom-elem-res').innerText = ev.detail;
				});
			});
		</script>
	</head>

	<body>
		<my-thing req="Hello custom element!"></my-thing>
		<p class="custom-elem-res"></p>
	</body>

</html>

```
