---
title: Scoped styles
---

One of Svelte's key tenets is that components should be self-contained and reusable in different contexts. Because of that, it has a mechanism for *scoping* your CSS, so that you don't accidentally clobber other selectors on the page.

### Adding styles

Your component template can have a `<style>` tag, like so:

```html
<div class='foo'>
	Big red Comic Sans
</div>

<style>
	.foo {
		color: red;
		font-size: 2em;
		font-family: 'Comic Sans MS';
	}
</style>
```


### How it works

Open the example above in the REPL and inspect the element to see what has happened – Svelte has added a `svelte-[uniqueid]` attribute to the element, and transformed the CSS selector accordingly. Since no other element on the page can share that selector, anything else on the page with `class="foo"` will be unaffected by our styles.

This is vastly simpler than achieving the same effect via [Shadow DOM](http://caniuse.com/#search=shadow%20dom) and works everywhere without polyfills.


### Cascading rules

The usual cascading mechanism still applies – any global `.foo` styles would still be applied, and if our template had [nested components](TK) with `class="foo"` elements, they would inherit our styles.

> Scoped styles are *not* dynamic – they are shared between all instances of a component. In other words you can't use `{{mustaches}}` inside your CSS.
