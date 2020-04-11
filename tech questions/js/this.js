(/* this */) => {
  // 'this' keyword is a function execution context.
  // It refers to specific object depending on how function is called.
  // It also depends if js runs in scrict mode or not ('use strict')

  func(); // simple call - this = 'window' in browser or 'global' in Node, or 'undefined' in browser if scrict mode
  obj.func(); // function called as a method. 'this' points to 'obj'
  func().call({ a: 1 }, 5, 7); // function called with explicit context. 'this' refers to {a:1}, ignored in arrow f
  func().apply({ a: 1 }, [5, 7]); // function called with explicit context. 'this' refers to {a:1}, ignored in arrow f
  bind({ a: 1 }); // context is set explicitly, regardless how it is called. In this case this always points to {a:1}
  () => {}; // doesn't provide own 'this' binding, but it retains value from the enclosing lexical context
  new O(); // this = 'O'
  DOM callbacks // this === e.currentTarget, this === e.target (if target === currentTarget)
};

/////////////////////////////////////////////////////////////////////////
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
(/* output */) => {
  /*
    outer func:  this.foo = bar
    outer func:  self.foo = bar
    inner func:  this.foo = undefined
    inner func:  self.foo = bar
    */
};

/////////////////////////////////////////////////////////////////////////
// what output and why?
var value = 1;
var f = () => {
  console.log(this.value);
};
f.call({ value: 2 }); // 1, because new context is ignored in arrow functions

/////////////////////////////////////////////////////////////////////////
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
(/* output */) => {
  // ƒ () { console.warn(this.b) }
  // undefined - ('this' = window) - because ()=>
  // undefined - ('this' = window) - because f()
  // undefined - ('this' = window) - because ()=>
};

/////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////
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