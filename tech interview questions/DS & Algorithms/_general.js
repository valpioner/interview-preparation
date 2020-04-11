// Data Stuctures & Algorithms mindmap:
// https://coggle.it/diagram/W5E5tqYlrXvFJPsq/t/master-the-interview-click-here-for-course-link/c25f98c73a03f5b1107cd0e2f4bce29c9d78e31655e55cb0b785d56f0036c9d1

/* Interview questions links:

  awesome-interview-questions:
  https://github.com/MaximAbramchuck/awesome-interview-questions

  Front-end-Developer-Interview-Questions:
  https://github.com/h5bp/Front-end-Developer-Interview-Questions

  21 Essential JavaScript Interview Questions:
  https://www.codementor.io/@nihantanu/21-essential-javascript-tech-interview-practice-questions-answers-du107p62z

  37 Essential JavaScript Interview Questions (TopTal)
  https://www.toptal.com/javascript/interview-questions

  JS: Basics and Tricky Questions:
  http://www.thatjsdude.com/interview/js2.html
*/

/* Data Structures
  Arrays
  Hash Tables
  Stacks
  Queues
  Linked Lists
  Trees (Binary Tree, Ordered, Balanced - O(log n), Unbalanced - O(n)), Binary Heap
  Tries - used in searching of text (if part of word exists in a text) - O(length of the word)
  Graphs - nodes connected with edges (directed-undirected, weighted/unweighted, ceclic/acyclic)
    - Adjacent List Graph
    - Adjacent Matrix Graph
    - Edge List Graph
  ...
*/

/* Algorithms
  Sorting (arrays, trees), recursive sorting
  Dynamic Programming
  BFS + DFS (Searching)
  Recursion (working with trees, converting to tree, divide & conquer tasks)
*/

/* How to talk on interview question
  - Listen to the problem
  - Write down key points on top (sorted array, problem definition, etc)
  - Ask about inputs (is it sorted, how big, empty, sorted, decimals, negatives, dublicates) & outputs (what should return)
  - Ask if we have enough time & memory
  - Talk about most obvious approach first (like n^2), speak about it, show your critical thinking
  - Tell why that approach is not the best (time bottleneck), if approach is readable
  - Talk about small steps you want to do, write comments if needed
  - Start code in functions
  - Think about errors, safeguard it, tell about bad inputs and how to secure
  - No vars like i,j. Make core readable
  - Test your code in loud (params: 0, undefined, null, massive arrays, async code, other edge cases)
  - Ask if can return an error
  - Talk how thos code can be improved, if it works, is it readable.
  - Answer follow up questions how to handle incredibly big input (how to fin in memory, if input comes as a stream), how to support scale (answer usually divide-&-conquere - distributed processing in chunks from disk memory, write output back on disk and combine it later)

  Tips:
  - Hash maps (objects, arrays) are usually key to improve Time Complexity
  - If it's sorter array, use Binary tree to achieve O(log n). Example - Divide & Comquer
  - Hash table + soorted - are best way to optimise a code
  - Look at the Time vs Space tradeoff (hash table - use more space but optimize your process)
*/

/* Sorting algorithms

  - bubble sort         - simple    - O(n^2)                - not efficient at all
  - selection sort      - simple    - O(n^2)                - not efficient at all
  - insertion sort      - simple    - O(n) to O(n^2)        - best when list is almost sorted and few items

  - merge sort          - complex   - O(n log n)            - divide & conquer, 1st best most efficient
  - quick sort          - complex   - O(n log n) to O(n^2)  - divide & conquer, 2nd best most efficient, better memory, but has worst case speed

  - radix/counting sort - complex   - O(nk)                 - best only when working with numbers in specific small range



  When to use each sorting?

  #1 - Sort 10 schools around your house by distance:
  insertion sort (because small input)

  #2 - eBay sorts listings by the current Bid amount:
  radix/counting sort (because bid are numbers of fixed length)

  #3 - Sport scores on ESPN
  quick sort (bacause memory may be efficient)

  #4 - Massive database (can't fit all into memory) needs to sort through past year's user data
  merge sort

  #5 - Almost sorted Udemy review data needs to update and add 2 new reviews
  insertion sort (because preordered list)

  #6 - Temperature Records for the past 50 years in Canada
  if integers in small range - radix/counting sort, in other case - quick sort (to save memory)

  #7 - Large user name database needs to be sorted. Data is very random.
  merge sort || quick sort

  [].sort() uses different sortings (Mozilla - merge sort, Chrome - quick sort || insertion sort is small arrays)
*/

/* Searching algorithms (traversal)

  - linear search (build in js find in array). Best O(1), Worst O(n)
  - binary search (best for sorted list). O(log n)

  - DFS (depth first search) O(n) - PreOrder, InOrder, PostOrder
    How it works? Top to bottom, most left, if not found, 1 lvl up take right node and repeat
    Pros: less memory, best if we know that target is in a bottom of a tree/graph, best for answering does a path exist
    Cons: may be slower (espessially when tree/graph is very deep), not ood for finding shortest path

  - BFS (breadth first search) O(n).
    How it works: traverse level by level. left to right.
    Pros: best to find shortest path, checks closer nodes first, best if we know target is near top of tree/graph, good for validate a binary search tree
    Cons: more memory to store childs of each node

    When to use DFS vs BFS?
    If you know a solution is not far from the root of the tree: ----> BFS
    If the tree is very deep and solutions are rare: ----------------> BFS (DFS will take long)
    If the tree is very wide: ---------------------------------------> DFS (BFS will need too much memory)
    If solutions are frequent but located deep in the tree: ---------> DFS
    Determining whether a path exists between two nodes: ------------> DFS
    Finding the shortest path:  -------------------------------------> BFS

  - Bellman-Ford  - best for searching shortest Path with weighted trees/graph. Worst: O(n^2)
    Pros: can handle negative weights
  - Dijkstra      - best for searching shortest Path with weighted trees/graph
    Pros: less complexity, more efficient
*/

/* Dynamic Programming / Memoization

  Dynamic Programming is an optimization technique using caching (usually via closures)
  Memoization - common strategy of dynamic programming problems, specific form of caching of a job result,
    so it can be reused without calculating it once again

  Pros: we can be very efficient and avoid same calculations, good optimization, reduce complexity from O(n^2) to O(n)
  Cons: increase space complexity to store cache

  When should we optimize with memoization?
    - can be divided into subproblem?
    - recursive solution
    - are there repetitive subproblems?

  Example (how to optimize Fibonacci sequense):
  Was: O(2^n)
    let calculations = 0;
    function fibonacci(n){
        calculations++;
        return n<2 ? n : fibonacci(n-1) + fibonacci(n-2)
    }

    > fibonacci(30)
    832040
    > calculations
    2692537

  Optimized: O(n)
    let calculations = 0;
    function fibonacciMemoized() {
      let cache = {};
      return function fib(n) {
        calculations++;
        if (n in cache) {
          return cache[n];
        } else {
          if (n<2) return n;
          cache[n] = fib(n-1) + fib(n-2);
          return cache[n];
        }
      }
    }
    fibonacciMemoized()(30)

    > fibonacci(30)
    832040
    > calculations
    59

  LeetCode tasks (with using dynamic programming):
  198. House Robber
  https://leetcode.com/problems/house-robber/

  121. Best Time to Buy and Sell Stock
  https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

  70. Climbing Stairs
  https://leetcode.com/problems/climbing-stairs/
*/
