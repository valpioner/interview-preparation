# Interview questions links

## Links with questions

- [awesome-interview-questions](https://github.com/MaximAbramchuck/awesome-interview-questions)
- [Front-end-Developer-Interview-Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)
- [21 Essential JavaScript Interview Questions](https://www.codementor.io/@nihantanu/21-essential-javascript-tech-interview-practice-questions-answers-du107p62z)
- [37 Essential JavaScript Interview Questions (TopTal)](https://www.toptal.com/javascript/interview-questions)
- [JS: Basics and Tricky Questions](http://www.thatjsdude.com/interview/js2.html)

## Amazon Interview Questions

- [Past interview questions](https://www.glassdoor.ca/Interview/Amazon-Software-Development-Engineer-Interview-Questions-EI_IE6036.0,6_KO7,36.htm)

## Bonus Question asked by Amazon

    From https://www.dailycodingproblem.com/

    There's a staircase with N steps, and you can climb 1 or 2 steps at a time. Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

    For example, if N is 4, then there are 5 unique ways:
    - 1, 1, 1, 1
    - 2, 1, 1
    - 1, 2, 1
    - 1, 1, 2
    - 2, 2

    What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time. Generalize your function to take in X.

## From LeetCode

- [1. Two Sum](https://leetcode.com/problems/two-sum/)
- [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)
- [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
- [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
- [138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)
- [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)

## Facebook Interview Questions

- [1. Two Sum](https://leetcode.com/problems/two-sum/)
- [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
- [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)
- [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

## Bonus Interview Question asked by Facebook

Task: Determine the 10 most frequent words given a terabyte of strings.

[Solution](https://stackoverflow.com/questions/12525455/most-frequent-words-in-a-terabyte-of-data)

## Google Interview Questions

[Past Google Interview Questions](https://www.careercup.com/page?pid=google-interview-questions)

Bonus Interview Question asked by Google:

- Write a function which will remove any given character from a String
  - [Solution in Java](http://javarevisited.blogspot.sg/2015/04/how-to-remove-given-character-from.html)

From LeetCode:

- [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- [31. Next Permutation](https://leetcode.com/problems/next-permutation/)
- [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
- [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [139. Word Break](https://leetcode.com/problems/word-break/)
- [155. Min Stack](https://leetcode.com/problems/min-stack/)
- [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)
- [681. Next Closest Time](https://leetcode.com/problems/next-closest-time/)

```js
// reverse a string
'str'.split('').reverse().join('');

// OR
[...'str'].reverse().join('');
```

```js
// merge arrays
[...arr1, ...arr2].sort();
```

```js
// 217. Contains Duplicate: find if array contains publicates

const hasDuplicates = array => (new Set(array)).size !== array.length;
```

```js
// find common items in arrays

arr1 = [1, 2, 3];
arr2 = [3, 4, 5];
const hasCommonItem = (arr1, arr2) => {
  // worst approach - with 2 nested loops - O(a*b)

  // better approach - convert arr1 to object (1 loop) and then in second loop check if arr2 contains any prop from that object. O(a+b)

  // use build in methods - better readability
  return arr1.some((el) => arr2.includes(el));
};
```

```js
// find 1st repeating element in array
  function getFirstRepeatingElement(arr) {
    // O(n)
    let map = {};
    for (let i = 0; i< arr.length; i++) {
      if (map[arr[i]] !== undefined) {
        return arr[i]
      }
      map[arr[i]] = i;
    }
    return undefined;
  }
```

```js
// 53. Maximum Subarray: Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

  var maxSequence = arr => {
    // O(n)
    var curr_max = 0, max_so_far = 0;
    for(var i = 0; i < arr.length; i++){
      curr_max = Math.max(0, curr_max + arr[i]);
      max_so_far = Math.max(curr_max, max_so_far);
    }
    return max_so_far;
  }
```

```js
// 283. Move Zeroes: Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements. Do it without copying array.

var moveZeroes = (arr) => {
  // O(n)
  let index = 0;

  for(let i = 0; i < arr.length; i++) {
    const el = arr[i]
    if (el !== 0) {
      arr[index] = num;
      index++
    }
  }

  for(let i = index; i < arr.length; i++) {
    nums[i] = 0;
  }
}

```

```js
// Given a number N return the index value of the Fibonacci sequence

function fibonacciIterative(n) { // O(n) - linear
  let arr = [0, 1];
  for (let i = 0; i < n + 1; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr[n];
}

function fibonacciRecursive(n) { // O(2^n) - exponential
  return n < 2 ? n : fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}
```
