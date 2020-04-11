/*

🟢 412. Fizz Buzz 👍
https://leetcode.com/problems/fizz-buzz/

Write a program that outputs the string representation of numbers from 1 to n.
But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”.
For numbers which are multiples of both three and five output “FizzBuzz”.

Example:
  n = 15,
  Return:
  [
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "7",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "14",
      "FizzBuzz"
  ]

*/

// solution #1
for (var i = 1; i <= 20; i++) {
  if (i % 15 == 0) console.log('FizzBuzz');
  else if (i % 3 == 0) console.log('Fizz');
  else if (i % 5 == 0) console.log('Buzz');
  else console.log(i);

  // solution #2
  var n = '';
  if (i % 3 == 0) n += 'Fizz';
  if (i % 5 == 0) n += 'Buzz';
  console.log(n || i);

  // solution #3
  var m3 = i % 3 == 0,
    m5 = i % 5 == 0;
  console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);

  // solution #n
  var out = '';
  !(i % 3) && (out = 'fizz');
  !(i % 5) && (out += 'buzz');
  console.log(out || i);
}

// solution #4 - shortest
for (i = 0; i < 100; )
  console.log((++i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || i);

// solution #5 - recursion
var check = function (number) {
  var fizz = number % 3 == 0,
    buzz = number % 5 == 0;
  console.log(fizz ? (buzz ? 'FizzBuzz' : 'Fizz') : buzz ? 'Buzz' : number);
  if (number != 0) {
    return check(number - 1);
  } // recursion
};
check(100);

// solution #6
[...Array(100).keys()].map((i) => {
  i++;
  console.log(
    (i % 15 == 0 && 'FizzBuzz') ||
      (i % 3 == 0 && 'Fizz') ||
      (i % 5 == 0 && 'Buzz') ||
      i
  );
});
