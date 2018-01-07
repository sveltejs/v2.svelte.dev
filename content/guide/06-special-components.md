---
title: Special components
---

Svelte includes a handful of built-in components with special behaviour.


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

The `<:Window>` tag gives you a convenient way to declaratively add event listeners to `window`. Event listeners are automatically removed when the component is destroyed.

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


### <:Head> tags

If you're building an application with Svelte — particularly if you're using [Sapper](https://sapper.svelte.technology) — then it's likely you'll need to add some content to the `<head>` of your page, such as adding a `<title>` element.

You can do that with the `<:Head>` tag:

```html
<:Head>
	<title>{{post.title}} • My blog</title>
</:Head>
```

When [server rendering](#server-side-rendering), the `<head>` contents can be extracted separately to the rest of the markup.