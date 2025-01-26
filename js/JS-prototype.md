# Object Prototypes

Prototypes are the mechanism by which JavaScript objects inherit features from one another. In JavaScript, each object has a prototype, which is another object that it uses as a fallback source of properties. When an object gets a request for a property that it does not have, its prototype will be searched for the property, then the prototype’s prototype, and so on.

## Questions

```js
// Q: write your own func that will duplicate string n times

'a'.duplicate(3); // should return 'aaa'

String.prototype.duplicate = function(n) {
  // return Array(n + 1).join(this);
  return this.repeat(n);
};
```

```text
Q: Describe inheritance and the prototype chain in JavaScript. Give an example.

A: Each object has its prototype, so there is a prototype chain, with null in the end. Used for inheritance simulation. When we look for a property that object doesn't have, it traverse all proto chain to find it.
```

```text
Q: How to assign a prototype to an object?

A: Use `Object.create(proto)` or set `__proto__` property.
```

```js
// Q: what output and why?

var product = { category: 'fastfood' };
var burger = Object.create(product);

burger.category = 'drinks';
delete burger.category;

console.log(burger.category); // 5 - because it is still in proto
```

```js
// Q: describe different ways of creating an objects

// proto chain: null
var o = Object.create(null); 

// proto chain: Object.prototype -> null
var o = { id: 5, name: 'Elvis' }; 

// proto chain: Array.prototype -> Object.prototype -> null
var o = ['Elvis']; 

function F() {}

// proto chain: F.prototype -> Object.prototype -> null
var o = new F(); 
```

```js
// Q: what output and why? how to fix?

for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.warn(i);
  });
}

// 3, 3, 3 - because warn calls after the end of the loop,
// can be fixed by using 'let', 'forEach', of IIFE closure (i => {..})(i)
```
