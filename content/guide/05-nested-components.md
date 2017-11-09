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


### Composing with `<slot>`

A component can contain a `<slot></slot>` element, which allows the parent component to inject content:

```html
<Box>
	<h2>Hello!</h2>
	<p>This is a box. It can contain anything.</p>
</Box>

<script>
	import Box from './Box.html';

	export default {
		components: { Box }
	};
</script>
```

```html-nested-Box
<div class='box'>
	<slot><!-- content is injected here --></slot>
</div>

<style>
	.box {
		border: 2px solid black;
		padding: 0.5em;
	}
</style>
```

```hidden-data
{}
```

The `<slot>` element can contain 'fallback content', which will be used if no children are provided for the component:

```html
<Box></Box>

<script>
	import Box from './Box.html';

	export default {
		components: { Box }
	};
</script>
```

```html-nested-Box
<div class='box'>
	<slot>
		<p class='fallback'>the box is empty!</p>
	</slot>
</div>

<style>
	.box {
		border: 2px solid black;
		padding: 0.5em;
	}

	.fallback {
		color: #999;
	}
</style>
```

```hidden-data
{}
```

You can also have *named* slots. Any elements with a corresponding `slot` attribute will fill these slots:

```html
<ContactCard>
	<span slot='name'>P. Sherman</span>
	<span slot='address'>42 Wallaby Way, Sydney</span>
</ContactCard>

<script>
	import ContactCard from './ContactCard.html';

	export default {
		components: { ContactCard }
	};
</script>
```

```html-nested-ContactCard
<div class='contact-card'>
	<h2><slot name='name'></slot></h2>
	<slot name='address'>Unknown address</slot>
	<br>
	<slot name='email'>Unknown email</slot>
</div>

<style>
	.contact-card {
		border: 2px solid black;
		padding: 0.5em;
	}
</style>
```

```hidden-data
{}
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

You can also bind to certain values — so far `innerWidth`, `outerWidth`, `innerHeight`, `outerHeight`, `scrollX`, `scrollY` and `online`:

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