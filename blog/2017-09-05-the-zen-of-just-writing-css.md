---
title: The zen of Just Writing CSS
description: TKTKTK
pubdate: 2017-09-05
author: Rich Harris
authorURL: https://twitter.com/Rich_Harris
---

It's fashionable to dislike CSS. There are lots of reasons why that's the case, but it boils down to this: CSS is *unpredictable*. If you've never had the experience of tweaking a style rule and accidentally breaking some layout that you thought was completely unrelated — usually when you're trying to ship — then you're either new at this or you're a much better programmer than the rest of us.

So the JavaScript community rolled up its sleeves and got to work. Over the last couple of years, there's been a Cambrian explosion of libraries aimed at making CSS behave, collectively referred to as *CSS-in-JS*.

What you might not realise is that **the biggest problems with CSS can be solved without CSS-in-JS**. Without those problems, writing CSS isn't just tolerable — it's enjoyable. And you don't have to find solutions to the problems that CSS-in-JS introduces.

This article isn't in any way intended as criticism of the hard work the CSS-in-JS community has done, but rather to illustrate why an alternative approach — based on Single File Components — is so damn delightful.


## The biggest problem with CSS

Everything in CSS is global. Because of that, styles intended for one bit of markup often end up affecting another. Because of *that*, developers often resort to wild namespacing conventions (not 'rules', since they're very difficult to enforce) that mostly just increase your risk of RSI.

It gets worse when you're working on a team. No-one dares touch styles authored by someone else, because it's often unclear what they're doing, what markup they apply to, and what disasters will unfold if you remove them.

The consequence of all this is the **append-only stylesheet**. There's no way of knowing which code can safely be removed, so it's common to undo some existing style with another, more specific style — even on relatively small projects.


## Single File Components change all that

The idea behind SFCs is simple: you write your components in an HTML file that (optionally) contains a `<style>` and `<script>` attribute describing the component's styles and behaviour. Svelte, Ractive, Vue and Polymer all follow this basic pattern.

(For the rest of this article we'll be using Svelte, obviously. But if the idea of using a template language makes you shudder — your fears are misplaced, but that's a topic for another day — then just use Vue which lets you use JSX in your SFCs.)

<aside>[Read the introductory blog post](https://svelte.technology/blog/frameworks-without-the-framework) if you're new to Svelte. Or [read](https://twitter.com/padolsey/status/899717303234908160) [the](https://twitter.com/sveltejs/status/901818357644701696) [testimonials](https://twitter.com/sveltejs/status/901818106309476352).</aside>

Several wonderful things happen as a result:

* Your styles are *scoped to the component*. No more leakage, no more unpredictable cascade. And no more sesquipedalian classnames designed to prevent conflicts.
* You don't need to go spelunking through your folder structure to find the rules that are breaking your stuff.
* The compiler (in Svelte's case) can **identify and remove unused styles**. No more append-only stylesheets!





### Notes...

* how the scoping works
* tight coupling between separate files
* 'but tools can fix [x]'
* single file components
* what we can't do yet
* devtools workflow
* sourcemaps
* linting, highlighting, codepen
* scrapable web, readable classes, anti-patterns
* love it or loathe it, you must learn it