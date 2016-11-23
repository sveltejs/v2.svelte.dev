---
title: Template syntax
---

Rather than reinventing the wheel, Svelte templates are built on foundations that have stood the test of time: HTML, CSS and JavaScript. There's very little extra stuff to learn.


### Mustaches

Mustaches allow you to bind data to your template. Whenever your data changes (see TK below), the DOM updates automatically. You can use any JavaScript expression in templates, and it will also automatically update:

```html
<p>{{a}} + {{b}} = {{a + b}}</p>
```

```hidden-data
{
  "a": 1,
  "b": 2
}
```

You can also use mustaches in attributes:

```html
<h1 style='color: {{color}};'>{{color}}</h1>
```

```hidden-data
{
  "color": "steelblue"
}
```


### If blocks




### Each blocks
