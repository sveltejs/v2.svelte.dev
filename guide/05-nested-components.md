---
title: Nested components
---

As well as containing elements (and `if` blocks and `each` blocks), Svelte components can contain *other* Svelte components.

```html-no-repl
<div class='widget-container'>
	<Widget foo bar='static' baz='{{dynamic}}'/>
</div>

<script>
	import Widget from './Widget.html';

	export default {
		data () {
			return {
				dynamic: 'this can change'
			}
		},

		components: {
			Widget
		}
	};
</script>
```

The example above is equivalent to the following...

```js
import Widget from './Widget.html';

const widget = new Widget({
	target: document.querySelector( '.widget-container' ),
	data: {
		foo: true,
		bar: 'static',
		baz: 'this can change'
	}
});
```

...except that Svelte will ensure that the value of `baz` is kept in sync with the value of `dynamic` in the parent component, and takes care of destroying the child component when the parent is destroyed.

> Component names should be capitalised, following the widely-used JavaScript convention of capitalising constructor names. It's also an easy way to distinguish components from elements in your template.


### Yield tags

A component can contain a `{{yield}}` tag, which allows the parent component to inject content:

```html
{{#if showModal}}
	<Modal on:destroy='set({ showModal: false })'>
		<h2>Hello!</h2>
		<p>This is a modal dialog box. it can contain anything</p>
	</Modal>
{{else}}
	<button on:click='set({ showModal: true })'>show modal</button>
{{/if}}

<script>
	import Modal from './Modal.html';
	
	export default {
		components: { Modal }
	};
</script> 
```

```html-nested-Modal
<div class='modal-background' on:click='destroy()'></div>

<div class='modal'>
	{{yield}} <!-- content is injected here -->
	<button on:click='destroy()'>close modal</button>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.3);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100% - 4em);
		max-width: 32em;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
		text-align: center;
	}
</style>
```

```hidden-data
{
	"showModal": true
}
```


### <:Self> tags

Sometimes, a component needs to embed itself recursively — for example if you have a tree-like data structure. In Svelte, that's accomplished with the `<:Self>` tag:

```html
{{#if countdown > 0}}
	<p>{{countdown}}</p>
	<:Self countdown='{{countdown - 1}}'/>
{{else}}
	<p>liftoff!</p>
{{/if}}
```

```hidden-data
{
	"countdown": 5
}
```



### <:Window> tags

The special `<:Window>` tag gives you a convenient way to declaratively add event listeners to `window`. Event listeners are automatically removed when the component is destroyed.

```html
<:Window on:keydown='set({ key: event.key, keyCode: event.keyCode })'/>

{{#if key}}
	<p><kbd>{{key === ' ' ? 'Space' : key}}</kbd> (code {{keyCode}})</p>
{{else}}
	<p>click in this window and press any key</p>
{{/if}}

<style>
	kbd {
		background-color: #eee;
		border: 2px solid #f4f4f4;
		border-right-color: #ddd;
		border-bottom-color: #ddd;
		font-size: 2em;
		margin: 0 0.5em 0 0;
		padding: 0.5em 0.8em;
		font-family: Inconsolata;
	}
</style>
```

You can also bind to certain values — so far `innerWidth`, `outerWidth`, `innerHeight`, `outerHeight`, `scrollX` and `scrollY`:

```html
<:Window bind:scrollY='y'/>

<div class='background'></div>
<p class='fixed'>user has scrolled {{y}} pixels</p>

<style>
	.background {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 9999px;
		background: linear-gradient(to bottom, #7db9e8 0%,#0a1d33 100%);
	}

	.fixed {
		position: fixed;
		top: 1em;
		left: 1em;
		color: white;
	}
</style>
```