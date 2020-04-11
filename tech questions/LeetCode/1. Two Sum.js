/* Task:

  🟢 1. Two Sum 👽 🥶
  https://leetcode.com/problems/two-sum/

  Description by google:
  https://www.youtube.com/watch?v=XKu_SEDAykw

  Given an array of integers, return indices of the two numbers such that they add up to a specific target.

  You may assume that each input would have exactly one solution, and you may not use the same element twice.

  Example:

  Given nums = [2, 7, 11, 15], target = 9,

  Because nums[0] + nums[1] = 2 + 7 = 9,
  return [0, 1].

*/

/* My description:

  - worst approach -  with 2 nested loops - O(a*b)
  - still bad approach - binary search inside 1 loop - O(n log n)
  - good approach - check sum of first & last and move towards the center (first to end then last to beginning) - O(n) - if input is sorted, if not we can sort first but then it will be O(n log n), same as binary search approach
  - if input is unsorted - iterate 1 loop and save complement number (n - current) in separate array and find if current === complement from that array. Using Hashtable. - O(n)

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const comp = {};
  for (let i = 0; i < nums.length; i++) {
    if (comp[nums[i]] >= 0) {
      return [comp[nums[i]], i];
    }
    comp[target - nums[i]] = i;
  }
};
