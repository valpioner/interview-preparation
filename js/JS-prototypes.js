/////////////////////////////////////////////////////////////////////////
// write your own func that will duplicate string n times
'abc'.duplicate(3); // should return 'abcabcabc'
// TODO

// Describe inheritance and the prototype chain in JavaScript. Give an example.
/* Each object has its prototype, so there is a prototype chain, with null in the end. Used for inheritance simulation.
When we look for a property that object doesn't have, it traverse all proto chain to find it. */

/////////////////////////////////////////////////////////////////////////
// what output and why?
var product = { category: 'fastfood' };
var burger = Object.create(product);
burger.category = 'drinks';
delete burger.category;
console.log(burger.category); // 5 - because it is still in proto

/////////////////////////////////////////////////////////////////////////
// describe different ways of creating an objects
var o = Object.create(null); // proto chain: null
var o = { id: 5, name: 'Elvis' }; // proto chain: Object.prototype -> null
var o = ['Elvis']; // proto chain: Array.prototype -> Object.prototype -> null
function F() {}
var o = new F(); // proto chain: F.prototype -> Object.prototype -> null

/////////////////////////////////////////////////////////////////////////
// what output and why? how to fix?
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.warn(i);
  });
}
// 3, 3, 3 - because warn calls after the end of the loop,
// can be fixed by using 'let', 'forEach', of IIFE closure (i => {..})(i)
