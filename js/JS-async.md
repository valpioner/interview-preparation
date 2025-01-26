# Async in JavaScript

JavaScript is single-threaded, non-blocking, synchronous language. It uses browser's event loop to handle async operations.

<https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf>

<https://www.youtube.com/watch?v=8aGhZQkoFbQ>

```text
// what is call stack (execution stack)?

  call stack is a data structure which records basically where in the program we are.
  It is part of JS engine (V8 in Chrome).
  Each entry in the call stack is called 'Stack Frame' (visible in stack trace).
  Stack overflow may happen using infinite recursion. (aka while true)

```

```text
// what is event loop, how does it work (message queue)?

  <https://learn.javascript.ru/event-loop> - good explanation article
  <https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model> - specification details

  event loop constantly monitors msg queue (for tasks) and call stack and pushes 1st cb onto it when its empty
  There are 2 queues:
    'macro-tasks' (tasks) - timers, i/o
    'micro-tasks' - promises, process.nextTick (Node)
  Event Loop algorythm:
    1. exec oldest task from macro-task queue
    2. exec all tasks from micro-task queue (starting from oldest)
    3. render UI changes
    4. wait for new macro-task and repeat alg.
  Add new macro-task: setTimeout(f)
  Add new micro-task: queueMicrotask(f)
  iframe has its own js process

```

```text
// what are async operations in JS?

  Web APIs:
    timers (cb run in main thread). Exact delay is not guaranteed, run when empty call stack.
    AJAX (XHR, fetch)
    DOM
    Promises

```

```text
// TODO
// promise vs observable
```

```text
// async & await

  async keyword tells a function to return a promice instead of a value.
  await keyword used to call a func that returns a promise, can be used in async func only.
  It blocks execution of code until promise fulfills (sync operation)

  used to wait for a response in async functions.

```

```text
// promises vs callbacks?

  Callback is old approach, used for sync (loops) & async (dom) operations, may run into callback hell.
  Promises done for async operations, return obj, can be chained with multiple .then() instead of cb hell,
  run in order, better error handling, avoid inversion of control.

```

```text
// What is promise?

  Promise is an object representing intermediate state of async operation.
  Used for async operations only, return only 1 result
  var promise = new Promise((resolve, reject) => {.....});
  promise.then(onFulfilled, onRejected).catch(onRejected).finally(onFinish);

```

```text
// What is Web Worker, why to use it?
new Worker('worker.js');
/*used to run code in separate thread, they can exchange messages with main thread, but they have own event queue, they don't have access to the DOM, so mainly used for calculations, they can use several processor cores*/
```

```js
// What does this construction mean, why to use it with 0 delay? Will it run strictly in 0 ms?
setTimeout(f, 0);
/*
  run func in the end of a call stack (reasons: finish script, loop, DOM render etc.), may run later then 0 ms (4-10)
*/
```

```js
// What is the order of logs?
console.log(1);
setTimeout(function() {
  console.log(2);
}, 1000);
Promise.resolve().then(() => console.log(4));
setTimeout(function() {
  console.log(3);
}, 0);
console.log(5);
// 1, 5, 4, 3, 2
```

```js
// what output and why? How to fix?
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.warn(i);
  });
} // 3, 3, 3

// Fix 1: use let vs var // 0, 1, 2
// Fix 2: enclose i variable with IIFE
for (var i = 0; i < 3; i++) {
  setTimeout(
    (function(i) {
      console.warn(i);
    })(i)
  );
} // 0, 1, 2
//Fix 3: use forEach // [1,2,3,4,5].forEach(function (value, i) {...})
```
