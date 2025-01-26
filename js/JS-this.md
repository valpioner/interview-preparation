# `this` keyword in JavaScript

`this` is a keyword in JavaScript that refers to the object. It has different values depending on how the functions is called.

- `fn();`
  - `this` is `window` in browser or `global` in Node, or `undefined` in browser if strict mode.
- `obj.fn();`
  - `this` is `obj`.
- `fn().call({ a: 1 }, 5, 7);`
  - `this` is `{ a: 1 }`. Ignored in arrow fn.
- `fn().apply({ a: 1 }, [5, 7]);`
  - `this` is `{ a: 1 }`. Ignored in arrow fn.
- `fn().bind({ a: 1 });`
  - `this` is `{ a: 1 }`.
- `() => {};`
  - `this` is the same as in the enclosing lexical context.
- `new Person();`
  - `this` is the new object `Person`.
- `DOM callbacks`
  - `this` is the element that triggered the event. this === e.currentTarget, this === e.target (if target === currentTarget)

## Questions

```js
// what output and why?

var myObject = {
  xz: 'New York',

  func: function() {
    var self = this;

    console.log('outer func:  this.xz = ' + this.xz);
    console.log('outer func:  self.xz = ' + self.xz);

    (function() {
      console.log('inner func:  this.xz = ' + this.xz);
      console.log('inner func:  self.xz = ' + self.xz);
    })();
  }
};

myObject.func();

// outer func:  this.foo = bar
// outer func:  self.foo = bar
// inner func:  this.foo = undefined
// inner func:  self.foo = bar
```

```js
// what output and why?

var value = 1;

var f = () => {
  console.log(this.value);
};

f.call({ value: 2 }); // 1, because new context is ignored in arrow functions
```

```js
// what output and why?
var o = {
  f1: function() { console.warn(this.f1); },
  f2: () => { console.warn(this.f2); }
};

o.f1();
o.f2();

var f1_ref = o.f1;
var f2_ref = o.f2;

f1_ref();
f2_ref();

// ƒ () { console.warn(this.b) }
// undefined - ('this' = window) - because ()=>
// undefined - ('this' = window) - because f()
// undefined - ('this' = window) - because ()=>

```

```js
// what output and why?

var o = {
  f: function() {
    return this.a + this.b;
  }
};

var p = Object.create(o);

p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```

```js
// what output and why?

var length = 10;

function fn() {
 console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);

// 10
// 2 - because arguments[0](); will have this=arguments
```
