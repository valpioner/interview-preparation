// what is event loop, queue

// what are async operations in JS?
// timers - setTimeout(f, delay), setInterval(f, delay), timers operated in single thread

/////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////
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
