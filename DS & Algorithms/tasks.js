.
{ // reverse a string
  'str'.split('').reverse().join('');
  // OR
  [...'str'].reverse().join('');
}

{ // merge arrays

  [...arr1, ...arr2].sort();
}

{ // 217. Contains Duplicate: find if array contains publicates

  const hasDuplicates = array => (new Set(array)).size !== array.length;
}

{ // find common items in arrays

  arr1 = [1, 2, 3];
  arr2 = [3, 4, 5];
  const hasCommonItem = (arr1, arr2) => {
    // worst approach - with 2 nested loops - O(a*b)

    // better approach - convert arr1 to object (1 loop) and then in second loop check if arr2 contains any prop from that object. O(a+b)

    // use build in methods - better readability
    return arr1.some((el) => arr2.includes(el));
  };
}

{ // find 1st repeating element in array
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
}

{ //1. Two Sum: If there is a sum of any pair that equals n? ()

  (arr) => {};
  // worst approach -  with 2 nested loops - O(a*b)
  // still bad approach - binary search inside 1 loop - O(n log n)
  // good approach - check sum of first & last and move towards the center (first to end then last to beginning) - O(n) - if input is sorted, if not we can sort first but then it will be O(n log n), same as binary search approach
  // if input is unsorted - iterate 1 loop and save complement number (n - current) in separate array and find if current === complement from that array. Using Hashtable. - O(n)
  const hasPairsWithSum = (arr, sum) => {
    // if return true/false
    // const complementsSet = new Set();
    // arr.forEach(element => {
    //   if (complementsSet.has(element)) return true;
    //   complementsSet.add(sum - element);
    // });
    //return false;

    // if return indexes
    const comp = {};
    for(let i=0; i<nums.length; i++){
      if(comp[nums[i]] >= 0){
        return [comp[nums[i] ], i]
      }
      comp[target-nums[i]] = i
    }
  };
}

{ // 53. Maximum Subarray: Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

  var maxSequence = arr => {
    // O(n)
    var curr_max = 0, max_so_far = 0;
    for(var i = 0; i < arr.length; i++){
      curr_max = Math.max(0, curr_max + arr[i]);
      max_so_far = Math.max(curr_max, max_so_far);
    }
    return max_so_far;
  }
}

{ // 283. Move Zeroes: Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements. Do it without copying array.

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

}

{ // 189. Rotate Array: Given an array, rotate the array to the right by k steps, where k is non-negative.
  const rotate = (arr, k) => arr.unshift(...arr.splice(-k))
}

{ // Given a number N return the index value of the Fibonacci sequence

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
}
