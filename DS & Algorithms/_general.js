// https://coggle.it/diagram/W5E5tqYlrXvFJPsq/t/master-the-interview-click-here-for-course-link/c25f98c73a03f5b1107cd0e2f4bce29c9d78e31655e55cb0b785d56f0036c9d1

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
