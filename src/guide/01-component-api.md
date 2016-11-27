---
title: Component API
---

As we saw above, you create a component instance with the `new` keyword:

```js
import MyComponent from './MyComponent.html';

const component = new MyComponent({
	// `target` is the only required option – the element
	// to render the component to
	target: document.querySelector( 'main' ),

	// `data` is optional. A component can also have
	// default data – we'll learn about that later.
	data: {
		questions: [
			'life',
			'the universe',
			'everything'
		],
		answer: 42
	}
});
```

Every Svelte component instance has a small number of methods you can use to control it, in addition to any [custom methods](#custom-methods) you add.


### component.set(data)

This updates the component's state with the new values provided and causes the DOM to update. `data` must be a POJO. Any properties *not* included in `data` will remain as they were.

```js
component.set({
	questions: [
		'why is the sky blue?',
		'how do planes fly?',
		'where do babies come from?'
	],
	answer: 'ask your mother'
});
```

> If you've use Ractive in the past, this is very similar to `ractive.set(...)`, except that instead of doing `ractive.set('foo', 'bar')` you must always do `ractive.set({foo: 'bar'})`, and you cannot set nested keypaths directly. It's also very similar to React's `setState`, except that it causes synchronous updates, meaning the DOM is always in a predictable state.


### component.get(key)

Returns the current value of `key`:

```js
console.log( component.get( 'answer' ) ); // 'ask your mother'
```

This will also retrieve the value of [computed properties](#computed-properties).


### component.observe(key, callback[, options])

This method allows you to respond to changes in state, which is particularly useful when combined with [lifecycle hooks](#lifecycle-hooks) and [two-way bindings](#two-way-binding).

```js
const observer = component.observe( 'answer', answer => {
	console.log( `the answer is ${answer}` );
});
// fires immediately with current answer:
// -> 'the answer is ask your mother'

component.set({ answer: 'google it' });
// -> 'the answer is google it'

observer.cancel(); // further changes will be ignored
```

The callback takes two arguments – the current value and the previous value. (The first time it is called, the second argument will be `undefined`):

```js
thermometer.observe( 'temperature', ( newValue, oldValue ) => {
	if ( oldValue === undefined ) return;
	console.log( `it's getting ${newValue > oldValue ? 'warmer' : 'colder'}` );
});
```

If you don't want the callback to fire when you first attach the observer, use `init: false`:

```js
thermometer.observe( 'temperature', ( newValue, oldValue ) => {
	console.log( `it's getting ${newValue > oldValue ? 'warmer' : 'colder'}` );
}, { init: false });
```

> For *primitive* values like strings and numbers, observer callbacks are only called when the value changes. But because it's possible to mutate an object or array while preserving *referential equality*, Svelte will err on the side of caution. In other words, if you do `component.set({foo: component.get('foo')})`, and `foo` is an object or array, any `foo` observers will be triggered.

By default, observers are called *before* the DOM updates, giving you a chance to perform any additional updates without touching the DOM more than is necessary. In some cases – for example, if you need to measure an element after the DOM has been updated – use `defer: true`:

```js
function redraw () {
	canvas.width = drawingApp.get( 'width' );
	canvas.height = drawingApp.get( 'height' );
	updateCanvas();
}

drawingApp.observe( 'width', redraw, { defer: true });
drawingApp.observe( 'height', redraw, { defer: true });
```


### component.on(eventName, callback)

Allows you to respond to *events*:

```js
const listener = component.on( 'thingHappened', event => {
	console.log( `A thing happened: ${event.thing}` );
});

// some time later...
listener.cancel();
```

### component.fire(eventName, event)

The companion to `component.on(...)`:

```js
component.fire( 'thingHappened', {
	thing: 'this event was fired'
});
```


At first glance `component.on(...)` and `component.fire(...)` aren't particularly useful, but it'll become more so when we learn about [nested components](#nested-components).

> `component.on(...)` and `component.observe(...)` look quite similar, but they have different purposes. Observers are useful for reacting to data flowing through your application and changing continuously over time, whereas events are good for modeling discrete moments such as 'the user made a selection, and this is what it is'.


### component.teardown()

Removes the component from the DOM and removes any observers and event listeners that were created. This will also fire a `teardown` event:

```js
component.on( 'teardown', () => {
	alert( 'goodbye!' ); // please don't do this
});

component.teardown();
```
