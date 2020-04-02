(/* closure */) => {
  // Closure is a locally declared variable related to a function which stays in memory when the function has returned.
  // Closure is an inner function that has access to the variables in the outer (enclosing) function’s scope chain.

  // Closure is the combination of a function bundled together (enclosed) with references to its surrounding state
  // (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner
  // function. In JavaScript, closures are created every time a function is created, at function creation time. // MDN

  // A closure is a function, along with all variables or functions that were in-scope at the time that the closure was
  // created. In JavaScript, a closure is implemented as an “inner function”; i.e., a function defined within the body
  // of another function. // TopTal

  // Closures used for encapsulation, to separate lexical scopes in loops
  // Closure has three scopes: local, outer f-tions, global

  // Example:
  function outer() {
    var name = 'Ben'; // this var is enclosed by inner f-tion that is been returned after outer f-tion called.
    return function inner() {
      console.log(name);
    };
  }
  // Generate the closure
  var closureFunc = outer();
  // Use the closure
  closureFunc();


  // Example
  // TODO check if correct
  (function(x) {...})(x) //IIFE aka module pattern
};


///////////////////////////////////////////////////////////////////////// hoisting & scope
// what output and why?
(function () {
  try {
    throw new Error();
  } catch (x /* inner scope */) {
    var x = 1, y = 2; // hoisted to beginning of a func as undefined, inner 'x' is redefined, hoisted 'y' is redefined
    console.log(x); // 1 - from inner scope
  }
  console.log(x); // undefined - from func outer scope
  console.log(y); // 2 - from func outer scope scope
})();

///////////////////////////////////////////////////////////////////////// hoisting & scope
// what output and why?
var xz = 2;
(function () {
    console.log(xz); // 'xz' is hoisted on the beginning of a func with 'undefined' value
    var xz = 5;
    console.log(xz); // 5
})()

///////////////////////////////////////////////////////////////////////// hoisting & scope
// what output and why?
var xz = 2;
(function b() {
  console.log(xz); // ƒ xz() {} - because of hoisting
  xz = 10;
  return;
  function xz() {}
})()
console.log(xz); // 2

///////////////////////////////////////////////////////////////////////// hoisting & scope
// what output and why?
var b = 1;
(function outer(){
   	var b = 2
    (function inner(){
        b++; // NaN
        var b = 3; // hoisted to the beginning of inner f, but here defined as 3.
        console.log(b) // 3
    })()
})()

///////////////////////////////////////////////////////////////////////// hoisting & scope
// what output and why?
var foo = "Hello";
(function() {
  console.log(foo + bar); // Helloundefined
  var bar = ' World';
  console.log(foo + bar); // Hello World
})();
console.log(foo + bar); // error -> bar is not defined (bar encapsulated in inner scope)

///////////////////////////////////////////////////////////////////////// hoisting
// if there is a difference?
var foo = function(){}  // function expression, only foo=undefined is hoisted
function foo(){}        // function statement, may be referenced before definition due to hoisting

///////////////////////////////////////////////////////////////////////// hoisting
// what output and why?
function foo() { return 1; }
alert(foo());   // 2, both 'foo' are hoisted, last one owerwrites.
function foo() { return 2; }

// what output and why?
var foo = function() { return 1; }
alert(foo());   // 1, func expression owerwrites hoisted values
foo = function() { return 2; }

///////////////////////////////////////////////////////////////////////// hoisting
// why wrap a file in a function block?
var myPlugin = (function($) { /* jQuery plugin code referencing $ */ } )(jQuery);
/*
  This is Immediately Invoked Function Expression (IIFE). It creates a private namespace.
    - to encapsulate 'private' and expose 'public' members and not to polute global manespace,
    - to avoid name clashes between other libs and modules,
    - short aliases for global variables,
    - performance boost, because it is faster to debug with local variable then with global,
    - benefits for compression (minificaiton)
*/