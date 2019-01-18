// ___________________________________________________________________________________ Basic 

// How to debug
// Chrome dev tools
// Gulp / frameworks / webpack experience
// terminal experience

(/* GIT experience */) => {
  /*

  //Core
    git init
    git clone
    git status
    git branch
    git branch feature
    git checkout master
    git checkout -b feature
    
  //Staging, Commiting, Pushing
    git add .
    git commit -m "initial commit"
    git commit -am "initial commit"
    git push

  //Merging (development ->master)
    git checkout master
    git merge development

  //Rebasing
    git checkout development
    git rebase master
    git rebase -i HEAD~3
    git rebase --abort
    git rebase --continue

  //Stashing
    git stash
    git stash pop
    -git stash pop stash@{1}
    git stash apply
    git stash list
    git stash -u
    git stash -a
    git stash drop
    git stash drop tash@{1}

    //.gitignore
    //readme.md

  */ 
}


// ___________________________________________________________________________________ JS

add(2, 5); // 7
add(2)(5); // 7



[1, 3, 5, 8, 13, 21]; // find SUM of all array elements



//How to clone obj? Will it be shell or deep copy?
(/* possible solutions */) => {
  //  Solution 1: using Object.assign (shell)
  var obj = {a: 1, b: 2}
  var objclone = Object.assign({}, obj);
  // Now the value of objclone is {a: 1 ,b: 2} but points to a different object than obj.
  
  // Note the potential pitfall, though: Object.clone() will just do a shallow copy, not a deep copy. 
  // This means that nested objects aren’t copied. They still refer to the same nested objects as the original:
  
  let obj = {
      a: 1,
      b: 2,
      c: {
          age: 30
      }
  };
  
  var objclone = Object.assign({},obj);
  console.log('objclone: ', objclone);
  
  obj.c.age = 45;
  console.log('After Change - obj: ', obj);           // 45 - This also changes
  console.log('After Change - objclone: ', objclone); // 45




  // Solution 2: converting to JSON and back (be careful, source should be JSON safe)
  var source = {a:1, b:2, c:3};
  var target = JSON.parse(JSON.stringify(source));
  console.log(target); // {a:1, b:2, c:3}

  // Check if clones it and not changing it
  source.a = 'a';
  console.log(source.a); // 'a'
  console.log(target.a); // 1




  // Solution 3: deep copy using iteration
  function iterationCopy(src) {
    let target = {};
    for (let prop in src) {
      if (src.hasOwnProperty(prop)) {
        target[prop] = src[prop];
      }
    }
    return target;
  }
  const source = {a:1, b:2, c:3};
  const target = iterationCopy(source);
  console.log(target); // {a:1, b:2, c:3}
  // Check if clones it and not changing it
  source.a = 'a';
  console.log(source.a); // 'a'
  console.log(target.a); // 1
}



3 > 2 > 1
1 == 1 == 1
1 === 1 === 1



'abc'.duplicate(3) // should return 'abcabcabc'



console.log('abc', 5); // ?
console.log('abc' + 5); // ?
console.log(0.1 + 0.2 == 0.3); // ?


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



var a = 1; 
function b() { 
    a = 10; 
    return; 
    function a() {} 
} 
b(); 
console.log(a); // ?



var a = 100;
(function() {
  console.log(a); // ?
  var a = 200;
  console.log(a); // ?
})()



var foo = "Hello";
(function() {
  var bar = " World";
  alert(foo + bar); // ?
})();
alert(foo + bar); // ?



var xz = {
  a: 1,
  b: function() { console.warn(this.b) },
  c: () => { console.warn(this.c) }
}
var bb = xz.b;
var cc = xz.b;
xz.b();
xz.c();
bb();
cc();
(/* solution */) => {
  // ƒ () { console.warn(this.b) }
  // undefined
  // undefined
  // undefined
}



var o = { price: 5 };
var i = Object.create(o);
console.log(i.p); // ?
i.p = 8;
delete i.p;
console.log(i.p); // ?



// what output and why? lets check our closures
for (let i = 0; i < 3; i++) {
  setTimeout(function() { console.warn(i); });
}



// create such function
var addSix = createBase(6);
addSix(10); // returns 16
addSix(21); // returns 27

// solution
function createBase(baseNumber) {
  return function(N) {
    // we are referencing baseNumber here even though it was declared
    // outside of this function. Closures allow us to do this in JavaScript
    return baseNumber + N;
  }
}



var myObject = {
  foo: "bar",
  func: function() {
      var self = this;
      console.log("outer func:  this.foo = " + this.foo);
      console.log("outer func:  self.foo = " + self.foo);
      (function() {
          console.log("inner func:  this.foo = " + this.foo);
          console.log("inner func:  self.foo = " + self.foo);
      }());
  }
};
myObject.func();

(/* solution */) => {
  /*

  outer func:  this.foo = bar
  outer func:  self.foo = bar
  inner func:  this.foo = undefined
  inner func:  self.foo = bar
  
  */
}



// What is the order of logs?
console.log(1); 
setTimeout(function(){console.log(2)}, 1000); 
setTimeout(function(){console.log(3)}, 0); 
Promise.resolve().then(() => console.log(4))
console.log(5);






// Threading in JS
// Event Queue, call stack, task queue
// async typical usage
// REST API
// HTTP / XHR
// Callback hell vs promice?




// ___________________________________________________________________________________ HTML

// id vs class
// why use semantic html vs div
// Storage
// <script>, <script async> and <script defer>
// where to include <link> and <script> and why?




// ___________________________________________________________________________________ CSS

// ABCD, rules priority
// preprocessors
// frameworks
// BEM
// positioning elements
// display: none; vs visibility: hidden;
// div vs span
// responsive
// media
// bootstrap
// flex
// div, p
// div p
// div > p
// div + p
// div ~ p









// ___________________________________________________________________________________ Frameworks, advanced

// GIT
// Redux
// Node.js
// DB
// Ramda / Lodash / Underscore
// CORS
