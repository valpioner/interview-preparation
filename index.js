//Ctrl+K+0

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

    _________________How do I undo things in Git?___________________
    //https://www.atlassian.com/git/tutorials/undoing-changes


    -----------------Undo Uncommitted Changes-----------------


    Delete all not commited changes (both staged/unstaged) aka reset to last (~HEAD) commit:
    git reset --hard

    Unstage all staged changes:
    git reset

    Unstage specific file:
    git reset 1.txt
    git reset -- 1.txt

    Discard all unstaged changes:
    git checkout .

    Discard specific unstaged file:
    git checkout 1.txt
    git checkout -- 1.txt

    -----------------Undo Committed Changes-----------------


    Change msg of last commit:
    git commit --amend -m “This is changed commit msg”

    Add missing changes to last commit:
    git add .
    git commit --amend -m “This is updated commit msg”

    Rollback file to a certain commit in history (rollback changes are staged):
    git checkout <commit_ID> path/to/the/file.txt

    Creates new commit with reverted chancges from specific commit (conflicts may occure):
    //prefer to use on public repos to avoid confusion
    git revert <commit_ID>

    Reset working HEAD to specific commit. All commits after this commit will be removed from history
    // prefer to use on local/private branch
    git reset --hard <commit_ID> //use --keep instead of --hard to keep local changes






    -----------------------------------
    git branch

    git log
    git log --oneline
    git log --branches=*

  */
}


// ___________________________________________________________________________________ JS

add(2, 5); // 7
add(2)(5); // 7



[1, 3, 5, 8, 13, 21]; // find SUM of all array elements



//How to clone obj? Will it be shell or deep copy?
(/* possible solutions */) => {
  //  Solution 1: using Spread Operator ... (shell)
  let arrClone = [...array];
  let objClone = { ...obj };


  //  Solution 2: using Object.assign (shell)
  var obj = {a: 1, b: 2, c: { age: 30 }}
  var objClone = Object.assign({}, obj);


  // Solution 3: converting to JSON and back (be careful, source should be JSON safe)
  var obj = {a:1, b:2, c:3};
  var objClone = JSON.parse(JSON.stringify(source));
  

  // Solution 4: deep copy using iteration
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


//__________________________________________________________hos.ng
var a = 1; 
function b() { 
    a = 10; 
    return; 
    function a() {} 
} 
b(); 
console.log(a); // ?
(/* solution */) => {
  // 1
}



var a = 100;
(function() {
  console.log(a); // ?
  var a = 200;
  console.log(a); // ?
})();
(/* solution */) => {
  // undefined - because of hoisting
  // 200
}


//____________________________________________________________sco.e
var foo = "Hello";
(function() {
  var bar = " World";
  console.log(foo + bar); // ?
})();
console.log(foo + bar); // ?
(/* solution */) => {
  // Hello World
  // error -> bar is not defined
}


//______________________________________________________________this
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





//_______________________________________________________________proto
var o = { price: 5 };
var i = Object.create(o);
console.log(i.price); // ?
i.price = 8;
delete i.price;
console.log(i.price); // ?
(/* solution */) => {
  // 5
  // 5
}



//_________________________________________________________________
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


//_____________________________________________________________async
// What is the order of logs?
console.log(1); 
setTimeout(function(){console.log(2)}, 1000); 
setTimeout(function(){console.log(3)}, 0); 
Promise.resolve().then(() => console.log(4))
console.log(5);
(/* result */) => {
  // 1
  // 5
  // 4
  // 3
  // 2
}






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
