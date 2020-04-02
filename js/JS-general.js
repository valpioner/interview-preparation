//Ctrl+K+0 - unfold

// IIFE
// Hoisting
// Class vs function ?
// pure function ?
// reduce
// ask array methods
// ask obj methods
// ask string methods

// ES6 features ?
// for in vs for of
// foreach vs .map
// var vs let vs const
// ... destruct
// () =>
// static

// closure
// this
// how prototypes work
// {} == {}?
// call vs apply vs bind
// promice vs observable
// mutable vs immutable

// pure functions - don't affect outer scope
// First-class functions - can be passed as an argument, returned as values, assigned or stored in data structures
// event bubbling - parent DOM element handler will also be called after children DOM element called
// DOM

// Threading in JS
// Event Queue, call stack, task queue
// async typical usage
// REST API
// HTTP / XHR
// Callback hell vs promice?

// Module/IIFE (f(){some code})()

// Why use 'use strict'?
/* To enforce stricter parsing and error handling of a js code at a runtime.
Errors that would normally be ignored would generate errors, or throw exceptions */

(/* Data Types */) => {
  // Primitives, value type
  undefined: typeof instance === 'undefined';
  Boolean: typeof instance === 'boolean';
  Number: typeof instance === 'number'; // NaN
  String: typeof instance === 'string';
  BigInt: typeof instance === 'bigint';
  Symbol: typeof instance === 'symbol';
  Null: typeof instance === 'object';

  // Objects, ref type
  Object: typeof instance === 'object'; // structural type
  // data structures
  new Object(),
    new Array(),
    new Map(),
    new Set(),
    new WeakMap(),
    new WeakSet(),
    new Date();
  Function: typeof instance === 'function'; // derived from Object
};

(/* Comparison, Castings, find Data Type */) => {
  // == vs ===

  // cast string to number (if wrong input, might return NaN)
  '10' * 1 + // the fastest
    ''; // fast
  Number('10');
  parseInt('10');
  parseFloat('10');
  Math.floor('10');

  // cast to string
  String(x);
  x.toString();
  JSON.stringify(a);

  // cast to object
  JSON.parse();

  5 + null; // returns 5         because null is converted to 0
  '5' + null; // returns "5null"   because null is converted to "null"
  '5' + 2; // returns "52"      because 2 is converted to "2"
  '5' - 2; // returns 3         because "5" is converted to 5
  '5' * '2'; // returns 10        because "5" and "2" are converted to 5 and 2

  // Check type
  typeof 'John'; // Returns "string"
  typeof 3.14; // Returns "number"
  typeof NaN; // Returns "number"
  typeof false; // Returns "boolean"
  typeof [1, 2, 3, 4]; // Returns "object"
  typeof { name: 'John', age: 34 }; // Returns "object"
  typeof new Date(); // Returns "object"
  typeof function() {}; // Returns "function"
  typeof myCar; // Returns "undefined" *
  typeof null; // Returns "object"
};

(/* copy/clone object || arr */) => {
  // Shallow copy

  (/* Object.assign - shallow copy */) => {
    let a = { x: { z: 1 }, y: 2 };
    let b = Object.assign({}, a);
    b.x.z = 0;
    console.log(JSON.stringify(a)); // {"x":{"z":0},"y":2} - original also changed by ref
    console.log(JSON.stringify(b)); // {"x":{"z":0},"y":2}
  };

  (/* ... - shallow copy */) => {
    let a = { x: { z: 1 }, y: 2 };
    let b = { ...a };
    b.x.z = 0;
    console.log(JSON.stringify(a)); // {"x":{"z":0},"y":2} - original also changed by ref
    console.log(JSON.stringify(b)); // {"x":{"z":0},"y":2}
  };

  (/* Array.from(arr) */) => {
    let a = [{ x: 1, y: 2, z: 3 }];
    let b = Array.from(a);
    b[0].x = 0;
    console.log(JSON.stringify(a)); // [{"x":0,"y":2,"z":3}] - original also changed by ref
    console.log(JSON.stringify(b)); // [{"x":0,"y":2,"z":3}]
  };

  // Deep copy

  (/* Solution 3: converting to JSON and back (be careful, source should be JSON safe) */) => {
    let a = [{ x: { z: 1 }, y: 2 }];
    let b = JSON.parse(JSON.stringify(a));
    b[0].x.z = 0;
    console.log(JSON.stringify(a)); // [{"x":{"z":1},"y":2}]
    console.log(JSON.stringify(b)); // [{"x":{"z":0},"y":2}] - only copy changed
  };

  (/* Solution 4: deep copy using iteration */) => {
    function iterationCopy(src) {
      let target = {};
      for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
          target[prop] = src[prop];
        }
      }
      return target;
    }

    const source = { a: 1, b: 2, c: 3 };
    const target = iterationCopy(source);
    console.log(target); // {a:1, b:2, c:3}

    // Check if clones it and not changing it
    source.a = 'a';
    console.log(source.a); // 'a'
    console.log(target.a); // 1
  };

  // copy array -
};

(/* async js */) => {
  // setTimeout(f, delay), setInterval(f, delay), clearInterval(id) - timers are operated in single thread.
  // DOM events
};

/////////////////////////////////////////////////////////////////////////
// write func that checks if input string is palindrome
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return (
    str ==
    str
      .split('')
      .reverse()
      .join('')
  );
}
console.log(isPalindrome('level')); // logs 'true'
console.log(isPalindrome('levels')); // logs 'false'
console.log(isPalindrome('A car, a man, a maraca')); // logs 'true'

/////////////////////////////////////////////////////////////////////////
// how to reverse string
'0123456789'
  .split('')
  .reverse()
  .join('');

/////////////////////////////////////////////////////////////////////////
// create func that will give such result
add(2, 5); // 7
add(2)(5); // 7 // closure

// solution
const add = (a, b) => (b ? a + b : b => a + b);

/////////////////////////////////////////////////////////////////////////
// create func that will give such result
var addSix = createBase(6);
addSix(10); // returns 16 // closure
addSix(21); // returns 27 // closure

// solution #1
function createBase(baseNumber) {
  return function(n) {
    // we are referencing baseNumber here even though it was declared
    // outside of this function. Closures allow us to do this in JavaScript
    return baseNumber + n;
  };
}

// solution #2 (usine arrow f)
const createBase = base => n => base + n; // second function is a closure.

/////////////////////////////////////////////////////////////////////////
// find SUM of all array elements
[1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((acc, current) => acc + current, 0);

/////////////////////////////////////////////////////////////////////////
// what output and why?
var arr1 = 'john'.split('');
var arr2 = arr1.reverse();
var arr3 = 'jones'.split('');
arr2.push(arr3);
console.log('array 1: length=' + arr1.length + ' last=' + arr1.slice(-1));
console.log('array 2: length=' + arr2.length + ' last=' + arr2.slice(-1));
//"array 1: length=5 last=j,o,n,e,s"
//"array 2: length=5 last=j,o,n,e,s"

/////////////////////////////////////////////////////////////////////////
// what output and why?
var a = {},
  b = { key: 'b' },
  c = { key: 'c' };
a[b] = 123; // a = {[object Object]: 123}
a[c] = 456; // a = {[object Object]: 456}
console.log(a[b]); // {[object Object]: 456}

/////////////////////////////////////////////////////////////////////////
// what output and why?
var foo = new Object();
var bar = new Object();
var map = new Object();

map[foo] = 'foo'; // map = {[object Object]: 'foo'}
map[bar] = 'bar'; // map = {[object Object]: 'bar'}

console.log(map[foo]); // bar

/////////////////////////////////////////////////////////////////////////
// what output and why?
console.log(
  (function f(n) {
    return n > 1 ? n * f(n - 1) : n;
  })(10)
); // 10!

/////////////////////////////////////////////////////////////////////////
// what output and why?
1 < 2 < 3; // true (true < 3)
3 > 2 > 1; // false (true > 1)
(1 == 1) == 1; // true
(1 === 1) === 1; // false
0.1 + 0.2 == 0.3; // false (could be true, floating value issue)
