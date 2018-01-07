---
title: Static properties
---


### Setup

In some situations, you might want to add static properties to your component constructor. For that, we use the `setup` property:

```html
<p>check the console!</p>

<script>
	export default {
		setup(MyComponent) {
			// someone importing this component will be able
			// to access any properties or methods defined here:
			//
			//   import MyComponent from './MyComponent.html';
			//   console.log(MyComponent.ANSWER); // 42
			MyComponent.ANSWER = 42;
		},

		oncreate() {
			console.log('the answer is', this.constructor.ANSWER);
			console.dir(this.constructor);
		}
	};
</script>
```