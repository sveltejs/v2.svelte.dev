---
title: Advanced
---


### Keyed each blocks

Associating a *key* with a block allows Svelte to be smarter about how it adds and removes items to and from a list. To do so, add `@key` to the end of the opening tag for the each block, where `key` is some property that uniquely identifies each member of the list:

```html-no-repl
{{#each people as person @name}}
	<div>{{person.name}}</div>
{{/each}}
```

It's easier to show the effect of this than to describe it. Open the following example in the REPL:

```html
<button on:click='update()'>update</button>

<section>
	<h2>Keyed</h2>
	{{#each people as person @name}}
		<div transition:slide>{{person.name}}</div>
	{{/each}}
</section>

<section>
	<h2>Non-keyed</h2>
	{{#each people as person}}
		<div transition:slide>{{person.name}}</div>
	{{/each}}
</section>

<style>
	button {
		display: block;
	}

	section {
		width: 20em;
		float: left;
	}
</style>

<script>
	import { slide } from 'svelte-transitions';

	var people = ['Alice', 'Barry', 'Cecilia', 'Douglas', 'Eleanor', 'Felix', 'Grace', 'Horatio', 'Isabelle'];

	function random() {
		return people
			.filter(() => Math.random() < 0.5)
			.map(name => ({ name }))
	}

	export default {
		data() {
			return { people: random() };
		},

		methods: {
			update() {
				this.set({ people: random() });
			}
		},

		transitions: { slide }
	};
</script>
```