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

Often, it makes sense for a component to have default data. This should be expressed as a function that returns a plain old JavaScript object (POJO):

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

There are two 'hooks' provided by Svelte for adding control logic:

```html
<p>
	The time is
	<strong>{{hours}}:{{minutes}}:{{seconds}}</strong>
</p>

<script>
	export default {
		onrender () {
			this.interval = setInterval( () => {
				this.set({ time: new Date() });
			}, 1000 );
		},

		onteardown () {
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

Helpers are simple functions that are used in your template. In the example above, we want to ensure that `minutes` and `seconds` are preceded with a `0` if they only have one digit:

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

		onrender () {
			this.interval = setInterval( () => {
				this.set({ time: new Date() });
			}, 1000 );
		},

		onteardown () {
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

Of course, you could use `leftPad` inside the computed properties instead of in the template – there's no clear rule about when you should use expressions with helpers versus when you should use computed properties. Do whatever makes your component easier for the next developer to understand.

> Helper functions should be *pure* – in other words, they should not have side-effects, and their returned value should only depend on their arguments.
