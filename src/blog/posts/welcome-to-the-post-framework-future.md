---
title: Frameworks without the framework: welcome to the future of front end development
description: Why didn't we think of this sooner?
pubdate: 2016-11-26
author: Rich Harris
authorURL: https://twitter.com/Rich_Harris
---

> Wait, this new framework has a *runtime*? Ugh. Thanks, I'll pass
> – front end developers in 2018

We're shipping too much code to our users. Like a lot of front end developers, I've been in denial about that fact, thinking that it was fine to serve 100kb of JavaScript on page load – just use [one less .jpg!](https://twitter.com/miketaylr/status/227056824275333120) – and that what *really* mattered was performance once your app was already interactive.

But I was wrong. 100kb of .js isn't equivalent to 100kb of .jpg. It's not just the network time that'll kill your app's startup performance, but the time spent parsing and evaluating your script, during which time the browser becomes completely unresponsive. On mobile, those milliseconds rack up very quickly.

If you're not convinced that this is a problem, follow [Alex Russell](https://twitter.com/slightlylate) on Twitter. Alex [hasn't been making many friends in the framework community lately](https://twitter.com/slightlylate/status/728355959022587905), but he's not wrong. But the proposed alternative to using frameworks like Angular, React and Ember – [Polymer](https://www.polymer-project.org/1.0/) – has failed to gain traction in the front end community, and it's certainly not for a lack of marketing.

Perhaps we need to rethink the whole problem?


## What problem do frameworks solve?

The common view is that frameworks make it easier to manage the complexity of your code: the framework abstracts away all the fussy implementation details with techniques like virtual DOM diffing. But that's not really true. At best, frameworks *move the complexity around*, away from code that you had to write and into code you didn't.

Instead, the reason that ideas like React are so wildly successful is that they make it easier to manage the complexity of your *concepts*. Frameworks are primarily a tool for structuring your thoughts, not your code.

Given that, what if the framework *didn't actually run in the browser*? What if instead it converted your application into pure vanilla JavaScript, just like Babel converts ES2016+ to ES5? You'd pay no upfront cost of shipping a hefty runtime, and your app would get seriously fast, because there'd be no layers of abstraction between your app and the browser.


## Introducing Svelte, a paradigm shift in front end development

Svelte is a new framework that does exactly that. You write your components using HTML, CSS and JavaScript (plus a few extra bits you can learn in under 5 minutes), and during your build process Svelte compiles them into tiny standalone JavaScript modules. By statically analysing the component template, we can make sure that the browser does as little work as possible.

The [Svelte implementation of TodoMVC](http://svelte-todomvc.surge.sh/) weighs 3.1kb zipped (TK – check with latest version). For comparison, React plus ReactDOM *without any app code* weigh about 45kb zipped. It takes about 10x as long for the browser just to evaluate React as it does for Svelte to be up and running with an interactive TodoMVC.

And once your app *is* up and running, Svelte absolutely smokes React performance-wise. It's not even close. Here are some charts:
