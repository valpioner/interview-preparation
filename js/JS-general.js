//Ctrl+K+0 - unfold

/////////////////////////////////////////////////////////////////////////
///////////////////     GENERAL QUESTIONS     ///////////////////////////
/////////////////////////////////////////////////////////////////////////

// IIFE
// Hoisting
// Class vs function ?
// pure function ?
// reduce
// array methods
// obj methods
// string methods
// ES6 features ?
// for in vs for of
// foreach vs .map
// static
// closure
// this
// how prototypes work
// {} == {}?
// call vs apply vs bind
// mutable vs immutable
// pure functions - don't affect outer scope
// First-class functions - can be passed as an argument, returned as values, assigned or stored in data structures
// event bubbling / event capturing (trickling)
// DOM
// Threading in JS
// Event Queue, call stack, task queue
// async typical usage
// REST API
// HTTP / XHR
// Describe basic components of JS engine
// Module/IIFE (f(){some code})()

{ // ES6+ features https://github.com/lukehoban/es6features
  /*
    ES6 (2015):

    () =>
    class, extends
    enhanced object literals: (Shorthand for ‘handler: handler’, __proto__, {methods(){}}, super calls, dynamic props)
    template strings + string interpolation: `${prop} \nsdf`
    destructuring: var [a, , b, c=5] = [1,2,3]; var { op: a, lhs: { op: b }, rhs: c } = getASTNode(); g({name: 5})
    default + rest + spread: function f(x, y=12); function f(x, ...y); f(...[1,2,3])
    let + const
    iterators + for..of
    generators
    unicode
    modules (import, export)
    module loaders
    map + set + weakmap + weakset
    promises
    math + number + string + array + object APIs
    proxies
    symbols
    subclassable built-ins
    binary and octal literals
    reflect api
    tail calls

    ES7 (2016):

    Array.prototype.includes()
    Exponentiation operator **

    ES8 (2017):

    async, await
    shared memory and atomics
    Object.values/Object.entries
    String padding // myString.padStart(2); // or padEnd
    Object.getOwnPropertyDescriptors()
    Trailing commas in function parameter lists and calls // function test(a,b,c, ) // notice the comma after c

    ES9 (2018):

    Asynchronous Iteration
    Rest/Spread Properties
    RegExp named capture groups
    RegExp Unicode Property Escapes
    RegExp Lookbehind Assertions
    s (dotAll) flag for regular expressions
    Promise.prototype.finally()
    Template Literal Revision

    ES10 (2019):

    Array.flat: [[1,2],3]).flat() // [1,2,3]
    Array.flatMap: equivalent of map().flat()
    Object.fromEntries: reverse operation from Object.entries
    String.trimStart() & String.trimEnd(): Remove extra spaces in a string
    Optional Catch binding: remove the need to add a param to the catch (Now you can do } catch {instead of } catch(e) {
    Function.toString has been revisited to have a consistent behaviour
    Symbol Description
    BigInt — arbitrary large numbers (Thanks @redeyes2015 for correction)
    Improvement on Unicode support for JSON.stringify()
    Array.sort now retains order if keys are equal
    Make JavaScript a superset of JSON
  */
}}

{ // 'use strict'
  /*
    Used to enforce stricter parsing and error handling of a js code at a runtime.
    Errors that would normally be ignored would generate errors, or throw exceptions 
  */
}

{ // Data Types
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
}

{ // Comparison, Castings, find Data Type
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

  5 + null;       // returns 5         because null is converted to 0
  '5' + null;     // returns "5null"   because null is converted to "null"
  '5' + 2;        // returns "52"      because 2 is converted to "2"
  '5' - 2;        // returns 3         because "5" is converted to 5
  '5' * '2';      // returns 10        because "5" and "2" are converted to 5 and 2
  true + 0;       // 1
  true + 'xz';    // 'truexz'
  true + true;    // 2
  true + false;   // 1

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

  1 < 2 < 3; // true (true < 3)
  3 > 2 > 1; // false (true > 1)
  (1 == 1) == 1; // true
  (1 === 1) === 1; // false
  0.1 + 0.2 == 0.3; // false (could be true, floating value issue)
}



///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////     WHAT OUTPUT & WHY ?     //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////     WHAT OUTPUT & WHY ?
// NFE (Named Function Expression)
var foo = function bar(){ return 12; };
typeof bar(); // ReferenceError: bar is not defined,
// to fix - check type of assigned variable instead, or use function declaration and check func type


/////////////////////////////////////////////////     WHAT OUTPUT & WHY ?
var z = 1, y = z = typeof y; // here associativity of the assignment is Right to Left
console.log(y); // undefined


/////////////////////////////////////////////////     WHAT OUTPUT & WHY ?
var trees = ["redwood","bay","cedar","oak"];
delete trees[2];
console.log(trees.length);  // 4
console.log(trees);         // ["redwood","bay", empty ,"oak"]
console.log(trees[2]);      // undefined


/////////////////////////////////////////////////     WHAT OUTPUT & WHY ?
var output = (function(x){
  delete x; // delete won't work here because it deletes only obj props, but not variables (neither local nor global)
  return x;
})(0); // 0


/////////////////////////////////////////////////     WHAT OUTPUT & WHY ?
var x = { foo : 1};
var output = (function(){
  delete x.foo;
  return x.foo;
})();
console.log(output); // undefined


/////////////////////////////////////////////////     WHAT OUTPUT & WHY ?
console.log(
  (function f(n) {
    return n > 1 ? n * f(n - 1) : n;
  })(10)
); // 10!


/////////////////////////////////////////////////     WHAT OUTPUT & WHY ?
var foo = new Object();
var bar = new Object();
var map = new Object();
map[foo] = 'foo'; // map = {[object Object]: 'foo'}
map[bar] = 'bar'; // map = {[object Object]: 'bar'}
console.log(map[foo]); // bar


/////////////////////////////////////////////////     WHAT OUTPUT & WHY ?
var a = {},
  b = { key: 'b' },
  c = { key: 'c' };
a[b] = 123; // a = {[object Object]: 123}
a[c] = 456; // a = {[object Object]: 456}
console.log(a[b]); // {[object Object]: 456}


/////////////////////////////////////////////////     WHAT OUTPUT & WHY ?
var arr1 = 'john'.split('');
var arr2 = arr1.reverse();
var arr3 = 'jones'.split('');
arr2.push(arr3);
console.log('array 1: length=' + arr1.length + ' last=' + arr1.slice(-1)); // "array 1: length=5 last=j,o,n,e,s"
console.log('array 2: length=' + arr2.length + ' last=' + arr2.slice(-1)); // "array 2: length=5 last=j,o,n,e,s"



/////////////////////////////////////////////////////////////////////////
//////////////////////     COMMON TASKS     /////////////////////////////
/////////////////////////////////////////////////////////////////////////

{ // reverse string
  '0123456789'.split('').reverse().join('');
}

{ // check if input string is palindrome
  function isPalindrome(str) {
    var strAlphaNumeric = str.replace(/\W/g, '').toLowerCase();
    return strAlphaNumeric == strAlphaNumeric.split('').reverse().join('');
  }
  console.log(isPalindrome('level')); // logs 'true'
  console.log(isPalindrome('levels')); // logs 'false'
  console.log(isPalindrome('A car, a man, a maraca')); // logs 'true'
}

{ // how to empty an array?
  array = [];
  array.length = 0;
  while(array.length > 0) { array.pop(); }
  array.splice(0, array.length)
}

{ // how to remove duplicates from array?

  // solution #1 (Fast #1)
  [...new Set(arr)] // or Array.from(new Set(arr))

  // solution #2 (Fast #2)
  arr.filter((elem, index, self) => index === self.indexOf(elem));

  // solution #3 (Fast #3) - slowest method when almost no dubs.
  arr.reduce((uniqueArr, currentItem) =>
    unique.includes(currentItem) ? uniqueArr : [...uniqueArr, currentItem], []);

  // solution #4
  arr => {
    let unique = {};
    arr.forEach(e => { if (!unique[e]) unique[e] = true; });
    return Object.keys(unique); // be aware, it returns array of strings only.
  }

  // solution #5
  arr => {
    let unique = [];
    for (el of arr) unique[el] = 0;
    return [...Object.keys(unique)]
  }

  // solution #6
  arr => {
    let unique = [];
    for (el of arr) { if (!unique.includes(el)) unique.push(el) };
    return unique;
  }
}

{ // find SUM of all array elements
  [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((acc, current) => acc + current, 0);
}

{ // create func that will give such result (relates to Partial Applied function)
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
}

{ // create func that will give such result
  add(2, 5); // 7
  add(2)(5); // 7 // closure

  // solution
  const add = (a, b) => (b ? a + b : b => a + b);
}

{ // how to copy/clone object || arr
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
