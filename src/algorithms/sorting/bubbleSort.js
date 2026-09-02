// Pure step generator for Bubble Sort

export function generateBubbleSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  const n = arr.length;
  const sortedIndices = [];

  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;

  // Initial state step
  steps.push({
    type: 'initial',
    indices: [],
    array: [...arr],
    description: `Starting Bubble Sort on an array of ${n} elements.`,
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: [...sortedIndices],
    pivotIndex: null,
    activeRange: null,
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Step: Compare arr[j] and arr[j+1]
      comparisons++;
      arrayAccesses += 2;
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        description: `Comparing elements at index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]}).`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: null,
        activeRange: [0, n - i - 1],
      });

      if (arr[j] > arr[j + 1]) {
        // Step: Swap
        swaps++;
        arrayAccesses += 4;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          array: [...arr],
          description: `Swapped index ${j} and index ${j + 1} because ${arr[j + 1]} > ${arr[j]}.`,
          stats: { comparisons, swaps, arrayAccesses },
          sortedIndices: [...sortedIndices],
          pivotIndex: null,
          activeRange: [0, n - i - 1],
        });
      }
    }

    // Element at n - i - 1 is now in its sorted position
    sortedIndices.push(n - i - 1);
    steps.push({
      type: 'sorted',
      indices: [n - i - 1],
      array: [...arr],
      description: `Element ${arr[n - i - 1]} is now sorted in its final position at index ${n - i - 1}.`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: null,
      activeRange: null,
    });

    // Optimization: if no two elements were swapped in inner loop, then break
    if (!swapped) {
      // Mark all remaining as sorted
      for (let k = 0; k < n - i - 1; k++) {
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k);
        }
      }
      steps.push({
        type: 'finish',
        indices: [],
        array: [...arr],
        description: 'No swaps needed in this pass. Array is completely sorted!',
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: null,
        activeRange: null,
      });
      return steps;
    }
  }

  // Mark index 0 as sorted
  if (!sortedIndices.includes(0)) {
    sortedIndices.push(0);
  }

  steps.push({
    type: 'finish',
    indices: [],
    array: [...arr],
    description: 'Bubble Sort complete. All elements are sorted in ascending order.',
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    pivotIndex: null,
    activeRange: null,
  });

  return steps;
}
