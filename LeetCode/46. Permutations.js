/*

  🟡 46. Permutations
  https://leetcode.com/problems/permutations/

  Given a collection of distinct integers, return all possible permutations.

  Example:

  Input: [1,2,3]
  Output:
  [
    [1,2,3],
    [1,3,2],
    [2,1,3],
    [2,3,1],
    [3,1,2],
    [3,2,1]
  ]

*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var permute = function (nums) {
  var permutations = [];

  // base conditions
  if (!nums) return result;
  if (nums.length < 2) return result.push(nums);

  // iterative solution
  for (var i = 0; i < nums.length; i++) {
    if (nums.indexOf(nums[i]) !== i) continue; // skip dublicates
    var remainingString =
      string.slice(0, i) + string.slice(i + 1, string.length);
    for (var subPermutation of permut(remainingString))
      permutations.push(char + subPermutation);
  }

  // using resursion
  findPermutationsRecursively(nums, [], result);

  return permutations;
};

// using resursion
function findPermutationsRecursively(nums, currentResult, finalResult) {
  if (nums.length === 0) {
    finalResult.push(currentResult.slice());
    return;
  }

  for (var i = 0; i < nums.length; i++) {
    var num = nums[i];

    currentResult.push(num);
    var newNums = nums.slice(0, i).concat(nums.slice(i + 1));
    findPermutationsRecursively(newNums, currentResult, finalResult);
    currentResult.pop();
  }
}
