---
title: Nested components
---

As well as containing elements (and `if` blocks and `each` blocks), Svelte components can contain *other* Svelte components.

```html
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
	{{yield}}
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