// Big O complexity chart & explanation
// https://towardsdatascience.com/understanding-time-complexity-with-python-examples-2bda6e8158a7

/* Time complexity

  Excellent
    O(1)        - constant (no loops, assignment)
    O(log n)    - logarithmic (usually searching algorithms have log n if they are sorted (Binary Tree Search))
  Fair
    O(n)        - linear (single loop of n items)
  Bad
    O(n log n)  - log linear (usually sorting operations)
  Horrible
    O(n^2)      - quadratic (2 nested loops, comparing with each element in array)
    O(2^n)      - exponential (recursive algorithms that solves a problem of size N)
    O(n!)       - factorial (nested loop for every element)
*/

/* Rules - how to calculate f() complexity

  Rule 1: Worst Case
  Rule 2: Remove Constants
  Rule 3: Different terms for inputs (a+b) (a*b)  (next operation: +, nested operation: *)
  Rule 4: Drop Non Dominants
*/

/* What causes TIME complexity
  operations (+, -, *, /)
  comparisons (<, >, ==)
  looping (for, while)
  outside function call (function())
*/

/* What causes SPACE complexity
  variables
  data structures
  function call
  allocations
*/
