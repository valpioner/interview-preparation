(/* closure */) => {
  // http://www.jibbering.com/faq/notes/closures/
  // https://medium.com/better-programming/a-basic-interview-question-can-you-explain-what-a-closure-is-710b75384d48

  // WHait is closure?

  // Closure is an expression (typically a function) that have access to variables in the outer (enclosing) function’s scope chain.
  // It is formed when one of inner functions is made accessible outside of the outer function, so that it may be
  // executed after the outer function has returned. Reference to such inner func creates new execution context.

  // Closure is the combination of a function bundled together (enclosed) with references to its surrounding state
  // (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner
  // function. In JavaScript, closures are created every time a function is created, at function creation time. // MDN

  // A closure is a function, along with all variables or functions that were in-scope at the time that the closure was
  // created. In JavaScript, a closure is implemented as an “inner function”; i.e., a function defined within the body
  // of another function. // TopTal

  // Closures used for encapsulation, to separate lexical scopes in loops
  // Closure has three scopes: local, outer f-tions, global
  // Anonymous Functions and IIFE’s are NOT closures (but may contain closures)

  function(){} //this is not a closure
  function outer(str) { return function inner(){ return 'Hi, ' + str }} //this is not a closure, but contains a closure
  var notAClosure = a => b => a + b; //this is not a closure, but contains a closure. Stateful funtion.
  ;(() => {var a = 1; return {closureFunc: 2 + a}})() //this is not a closure, but contains a closure

  // Where it is used?
  // in modules with public API (privilaged methods), where implementation is hidden, and only interface exposed.
  // in timers, module pattern
  // when associating Functions with object instance methods (DOM elements with obj instances)
  // in stateful functions, where return values may be changed by internal state: const secret = msg => () => msg;
  // for Partial Applied function & curring (apply function to some of its arguments)
    /*
      const partialApply = (fn, ...fixedArgs) => {
        return function (...remainingArgs) {
          return fn.apply(this, fixedArgs.concat(remainingArgs));
        };
      };
      const add = (a, b) => a + b;
      const add10 = partialApply(add, 10);
      add10(5);
    */

  // Example:
  function outer() {
    var name = 'Ben'; // this var is enclosed by inner f-tion that is been returned after outer f-tion called.
    return function inner() {
      console.log(name);
    };
  }
  // Generate the closure (closure is formed and saved in closureFunc with new executions context)
  var closureFunc = outer();
  // Use the closure
  closureFunc();
};

/////////////////////////////////////////////////////////////////////////
// what is scope? describe it.
/*
  Scope is a surrounding state. There is a global scope and local scope.
  There are two local scopes in JS: function scope function(){const a = 1} and block scope {const a = 1}
  Local/Global scope are not the same as Inner/Outer scope (it describe a scope relative to particular one).
  Local Scope has access to its scope, chain of outer local scopes & a global scope.
*/

/////////////////////////////////////////////////////////////////////////
// what is Module Pattern and why to use it?
/*
  Mudule Pattern is a Design Pattern which is used to wrap a set of variables and functions into single scope.
    Purpose:
      - create onw library
      - encapsulate private internals into internal scope,
      - expose public API,
      - avoid name clashes with other modules/libs,
      - avoid errors when composed with other libs (;)
      - provide abstractions, maintainability, reusability,
    Example:
      - (function(){...})()
      - var myLib = (function(){ return{a: 1 }})()
        brackets around f are not mandatory in this case because it is inside expression =, but better still
        to have it so it will be visible right away that it is not just a simple assignment operation
    Details:
      - IIFE used in this pattern to run function right away and save data somewhere only once (singleton)
      - we need outer brackets () to make Functions Expression but not Function Declaration
      - both approaches works (f)() = (f()). Syntatical difference only. Default useage is (f()).
      - can return API object or create global API object
*/

///////////////////////////////////////////////////////////////////////// scope
// what output and why?
var y = 1;
if (function F(){}) { y += typeof F }
console.log(y); // 1function

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