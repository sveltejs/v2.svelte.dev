---
title: Behaviours
---

As well as scoped styles and a template, components can encapsulate *behaviours*. For that, we add a `<script>` element and export an object:

```html
<div>
	<!-- template goes here -->
</div>

<script>
	export default {
		// behaviours go here
	};
</script>
```


### Default data

Often, it makes sense for a component to have default data. This should be expressed as a function that returns a POJO:

```html
<p>Count: {{count}}</p>
<button on:click='set({ count: count + 1 })'>+1</button>

<script>
	export default {
		data () {
			return {
				count: 0
			};
		}
	};
</script>
```

Data supplied at instantiation (i.e. `new Component(...)`) takes priority over defaults.

> The example above, like many of the examples below, uses ES2015 syntax – i.e. `data () {...}` rather than `data: function {...}`. While Svelte will generate ES5 code that runs everywhere, it *won't* convert your ES2015 code into ES5 – so if you use ES2015 and need to support older browsers, you will need an additional transpilation step in your build process using [Babel](https://babeljs.io) or [Bublé](https://buble.surge.sh).


### Computed properties

Often, your program will use values that depend on other values – for example, you might have a filtered list, which depends on both the list *and* the filter. Normally in JavaScript you'd have to add logic to update the dependent property when *any* of the dependencies change. This is a frequent source of bugs, and it gets worse as your application grows.

Svelte allows you to express these dependencies in computed properties, which are recalculated whenever those dependencies change:

```html
<p>
	The time is
	<strong>{{hours}}:{{minutes}}:{{seconds}}</strong>
</p>

<script>
	export default {
		data () {
			return {
				time: new Date()
			};
		},

		computed: {
			hours: time => time.getHours(),
			minutes: time => time.getMinutes(),
			seconds: time => time.getSeconds()
		}
	};
</script>
```

Notice that all we need to do to tell Svelte that `hours`, `minutes` and `seconds` depend on `time` is include it as a parameter to the function. There's no costly dependency tracking involved – the dependency graph is resolved at compile time.

> `computed` must be an object literal, and the properties must be function expressions or arrow function expressions.


### Lifecycle hooks

There are two 'hooks' provided by Svelte for adding control logic – `oncreate` and `ondestroy`:

```html
<p>
	The time is
	<strong>{{hours}}:{{minutes}}:{{seconds}}</strong>
</p>

<script>
	export default {
		oncreate () {
			this.interval = setInterval( () => {
				this.set({ time: new Date() });
			}, 1000 );
		},

		ondestroy () {
			clearInterval( this.interval );
		},

		data () {
			return {
				time: new Date()
			};
		},

		computed: {
			hours: time => time.getHours(),
			minutes: time => time.getMinutes(),
			seconds: time => time.getSeconds()
		}
	};
</script>
```


### Helpers

Helpers are simple functions that are used in your template. In the example above, we want to ensure that `minutes` and `seconds` are preceded with a `0` if they only have one digit, so we add a `leftPad` helper:

```html
<p>
	The time is
	<strong>{{hours}}:{{leftPad(minutes, 2, '0')}}:{{leftPad(seconds, 2, '0')}}</strong>
</p>

<script>
	import leftPad from 'left-pad';

	export default {
		helpers: {
			leftPad
		},

		oncreate () {
			this.interval = setInterval( () => {
				this.set({ time: new Date() });
			}, 1000 );
		},

		ondestroy () {
			clearInterval( this.interval );
		},

		data () {
			return {
				time: new Date()
			};
		},

		computed: {
			hours: time => time.getHours(),
			minutes: time => time.getMinutes(),
			seconds: time => time.getSeconds()
		}
	};
</script>
```

Of course, you could use `leftPad` inside the computed properties instead of in the template. There's no hard and fast rule about when you should use expressions with helpers versus when you should use computed properties – do whatever makes your component easier for the next developer to understand.

> Helper functions should be *pure* – in other words, they should not have side-effects, and their returned value should only depend on their arguments.


### Custom methods

In addition to the [built-in methods](#component-api), you can add methods of your own:

```html
<script>
	export default {
		methods: {
			say: function ( message ) {
				alert( message ); // again, please don't do this
			}
		}
	};
</script>
```

These become part of the component's API:

```js
import MyComponent from './MyComponent.html';

var component = new MyComponent({
	target: document.querySelector( 'main' )
});

component.say( '👋' );
```

Methods (whether built-in or custom) can also be called inside [event handlers](#event-handlers):

```html
<button on:click='say("hello")'>say hello!</button>
```


### Custom event handlers

Soon, we'll learn about [event handlers](#event-handlers) – if you want, skip ahead to that section first then come back here!

Most of the time you can make do with the standard DOM events (the sort you'd add via `element.addEventListener`, such as `click`) but sometimes you might need custom events to handle gestures, for example.

Custom events are just functions that take a node and a callback as their argument, and return an object with a `destroy` method that gets called when the element is removed from the page:

```html
<button on:longpress='set({ done: true })'>click and hold</button>

{{#if done}}
	<p>clicked and held</p>
{{/if}}

<script>
	export default {
		events: {
			longpress ( node, callback ) {
				function onmousedown ( event ) {
					const timeout = setTimeout( () => callback( event ), 1000 );

					function cancel () {
						clearTimeout( timeout );
						node.removeEventListener( 'mouseup', cancel, false );
					}

					node.addEventListener( 'mouseup', cancel, false );
				}

				node.addEventListener( 'mousedown', onmousedown, false );

				return {
					destroy () {
						node.removeEventListener( 'mousedown', onmousedown, false );
					}
				};
			}
		}
	};
</script>
```


### Nested components

So far, we've been working with single standalone components. But if you tried to put your entire application in one component it would quickly become unwieldy.

Fortunately, Svelte components can be *nested*:

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
