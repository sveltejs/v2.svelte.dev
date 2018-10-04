/*
-----------------------------------------------
  CustomProperties – v1.0.6
  - get and set css custom-properties
  - utilize css-vars
  - talk of Lea Verou on custom-properties: https://www.youtube.com/watch?v=kZOJCVvyF-4
  - https://css-tricks.com/updating-a-css-variable-with-javascript/
-----------------------------------------------
*/

class CustomProperties {
  constructor() {
    this.root = document.documentElement;
  }

  get(name, el) {
    el = el ? el : this.root;
    return this.computed(el, '--' + name);
  }

  set(name, val, el) {
    el = el ? el : this.root;
    el.style.setProperty('--' + name, val);
    return this;
  }

  computed(el, name) {
    return String(getComputedStyle(el).getPropertyValue(name)).trim();
  }
}

export default new CustomProperties(); // init
