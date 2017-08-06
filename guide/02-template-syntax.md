---
title: Template syntax
---

Rather than reinventing the wheel, Svelte templates are built on foundations that have stood the test of time: HTML, CSS and JavaScript. There's very little extra stuff to learn.


### Tags

Tags allow you to bind data to your template. Whenever your data changes (for example after `component.set(...)`), the DOM updates automatically. You can use any JavaScript expression in templates, and it will also automatically update:

```html
<p>{{a}} + {{b}} = {{a + b}}</p>
```

```hidden-data
{
	"a": 1,
	"b": 2
}
```

You can also use tags in attributes:

```html
<h1 style='color: {{color}};'>{{color}}</h1>
```

```hidden-data
{
	"color": "steelblue"
}
```

> While tags are delimited using `{{` and `}}`, Svelte does not use [Mustache](https://mustache.github.io/) syntax. Tags are just JavaScript expressions.


### Triples

Ordinary tags render expressions as plain text. If you need your expression interpreted as HTML, wrap it in triple braces, `{{{` and `}}}`.

```html
<p>This HTML: {{html}}</p>
<p>Renders as: {{{html}}}</p>
```

```hidden-data
{
	"html": "Some <b>bold</b> text."
}
```

As with tags, you can use any JavaScript expression in triples, and it will automatically update the document when your data changes.

> Triples will **not** sanitize the HTML before rendering it! If you are displaying user input, you are responsible for first sanitizing it. Not doing so opens you up to all sorts of different attacks.


### If blocks

Control whether or not part of your template is rendered by wrapping it in an if block.

```html
{{#if user.loggedIn}}
	<a href='/logout'>log out</a>
{{/if}}

{{#if !user.loggedIn}}
	<a href='/login'>log in</a>
{{/if}}
```

```hidden-data
{
	"user": { "loggedIn": false }
}
```

You can combine the two blocks above with `{{else}}`:

```html
{{#if user.loggedIn}}
	<a href='/logout'>log out</a>
{{else}}
	<a href='/login'>log in</a>
{{/if}}
```

```hidden-data
{
	"user": { "loggedIn": false }
}
```

You can also use `{{elseif ...}}`:

```html
{{#if x > 10}}
	<p>{{x}} is greater than 10</p>
{{elseif 5 > x}}
	<p>{{x}} is less than 5</p>
{{else}}
	<p>{{x}} is between 5 and 10</p>
{{/if}}
```

```hidden-data
{
	"x": 7
}
```

### Each blocks

Iterate over lists of data:

```html
<h1>Cats of YouTube</h1>

<ul>
	{{#each cats as cat}}
		<li><a target='_blank' href='{{cat.video}}'>{{cat.name}}</a></li>
	{{/each}}
</ul>
```

```hidden-data
{
	"cats": [
		{
			"name": "Keyboard Cat",
			"video": "https://www.youtube.com/watch?v=J---aiyznGQ"
		},
		{
			"name": "Maru",
			"video": "https://www.youtube.com/watch?v=z_AbfPXTKms"
		},
		{
			"name": "Henri The Existential Cat",
			"video": "https://www.youtube.com/watch?v=OUtn3pvWmpg"
		}
	]
}
```

You can access the index of the current element with *expression* as *name*, *index*:

```html
<div class='grid'>
	{{#each rows as row, y}}
		<div class='row'>
			{{#each columns as column, x}}
				<code class='cell'>
					{{x + 1}},{{y + 1}}:
					<strong>{{row[column]}}</strong>
				</code>
			{{/each}}
		</div>
	{{/each}}
</div>
```

```hidden-data
{
	"columns": [ "foo", "bar", "baz" ],
	"rows": [
		{ "foo": "a", "bar": "b", "baz": "c" },
		{ "foo": "d", "bar": "e", "baz": "f" },
		{ "foo": "g", "bar": "h", "baz": "i" }
  ]
}
```

By default, each instance of the each-block only considers its position in the list. This means that if the list `a, b, c` becomes `a, c`, rather than removing the second instance (representing `b`), Svelte actually removes the third instance and changes the value of the second instance from `b` to `c`.

The solution to this is to use *keyed* each-blocks, which gives each instance an 'identity'. We do that with the `@` symbol, followed by a property that uniquely identifies each object in the list such as `@name`:

```html
<button on:click='update()'>update</button>

<!-- try removing the @name -->
{{#each people as person @name}}
	<div transition:slide>{{person.name}}</div>
{{/each}}

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

### Directives

The last place where Svelte template syntax differs from regular HTML: *directives* allow you to add special instructions for adding [event handlers](#event-handlers), [two-way bindings](#two-way-binding), [refs](#refs) and so on. We'll cover each of those in later stages of this guide – for now, all you need to know is that directives can be identified by the `:` character:

```html
<p>Count: {{count}}</p>
<button on:click='set({ count: count + 1 })'>+1</button>
```

```hidden-data
{
	"count": 0
}
```

> Technically, the `:` character is used to denote namespaced attributes in HTML. These will *not* be treated as directives, if encountered.
