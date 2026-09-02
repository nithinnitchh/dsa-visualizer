// Pure step generator for Merge Sort

export function generateMergeSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  const n = arr.length;
  const sortedIndices = [];

  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;

  steps.push({
    type: 'initial',
    indices: [],
    array: [...arr],
    description: `Starting Merge Sort on an array of ${n} elements.`,
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: [...sortedIndices],
    pivotIndex: null,
    activeRange: [0, n - 1],
  });

  function merge(left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    arrayAccesses += (mid - left + 1) + (right - mid);

    steps.push({
      type: 'range',
      indices: [],
      array: [...arr],
      description: `Merging sorted subarrays [${left}..${mid}] and [${mid + 1}..${right}].`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: null,
      activeRange: [left, right],
    });

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      arrayAccesses += 2;

      steps.push({
        type: 'compare',
        indices: [left + i, mid + 1 + j],
        array: [...arr],
        description: `Comparing ${leftArr[i]} from left sublist with ${rightArr[j]} from right sublist.`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: null,
        activeRange: [left, right],
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      swaps++;
      arrayAccesses++;

      steps.push({
        type: 'overwrite',
        indices: [k],
        array: [...arr],
        description: `Placed element ${arr[k]} into position ${k}.`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: null,
        activeRange: [left, right],
      });

      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      swaps++;
      arrayAccesses += 2;
      steps.push({
        type: 'overwrite',
        indices: [k],
        array: [...arr],
        description: `Copied remaining left element ${arr[k]} into position ${k}.`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: null,
        activeRange: [left, right],
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      swaps++;
      arrayAccesses += 2;
      steps.push({
        type: 'overwrite',
        indices: [k],
        array: [...arr],
        description: `Copied remaining right element ${arr[k]} into position ${k}.`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: null,
        activeRange: [left, right],
      });
      j++;
      k++;
    }

    // If whole array merged, mark all sorted
    if (left === 0 && right === n - 1) {
      for (let idx = 0; idx < n; idx++) {
        if (!sortedIndices.includes(idx)) sortedIndices.push(idx);
      }
    }
  }

  function mergeSortHelper(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      type: 'range',
      indices: [mid],
      array: [...arr],
      description: `Splitting range [${left}..${right}] at midpoint ${mid}.`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: mid,
      activeRange: [left, right],
    });

    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSortHelper(0, n - 1);

  steps.push({
    type: 'finish',
    indices: [],
    array: [...arr],
    description: 'Merge Sort complete. Array is fully sorted in O(n log n) time.',
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    pivotIndex: null,
    activeRange: null,
  });

  return steps;
}
