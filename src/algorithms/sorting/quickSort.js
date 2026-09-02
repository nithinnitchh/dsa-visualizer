// Pure step generator for Quick Sort

export function generateQuickSortSteps(initialArray) {
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
    description: `Starting Quick Sort on an array of ${n} elements using Lomuto partition scheme.`,
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: [...sortedIndices],
    pivotIndex: null,
    activeRange: [0, n - 1],
  });

  function partition(low, high) {
    const pivot = arr[high];
    arrayAccesses++;
    let i = low - 1;

    steps.push({
      type: 'pivot',
      indices: [high],
      array: [...arr],
      description: `Selected pivot element ${pivot} at index ${high} for range [${low}..${high}].`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: high,
      activeRange: [low, high],
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      arrayAccesses += 2;

      steps.push({
        type: 'compare',
        indices: [j, high],
        array: [...arr],
        description: `Comparing element ${arr[j]} at index ${j} with pivot ${pivot}.`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: high,
        activeRange: [low, high],
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          swaps++;
          arrayAccesses += 4;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          steps.push({
            type: 'swap',
            indices: [i, j],
            array: [...arr],
            description: `Swapped index ${i} and index ${j} (${arr[i]} < pivot).`,
            stats: { comparisons, swaps, arrayAccesses },
            sortedIndices: [...sortedIndices],
            pivotIndex: high,
            activeRange: [low, high],
          });
        }
      }
    }

    swaps++;
    arrayAccesses += 4;
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    const pivotFinalIndex = i + 1;
    sortedIndices.push(pivotFinalIndex);

    steps.push({
      type: 'sorted',
      indices: [pivotFinalIndex],
      array: [...arr],
      description: `Placed pivot ${pivot} into its final sorted position at index ${pivotFinalIndex}.`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: pivotFinalIndex,
      activeRange: [low, high],
    });

    return pivotFinalIndex;
  }

  function quickSortHelper(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      if (!sortedIndices.includes(low)) {
        sortedIndices.push(low);
      }
    }
  }

  quickSortHelper(0, n - 1);

  steps.push({
    type: 'finish',
    indices: [],
    array: [...arr],
    description: 'Quick Sort complete. All elements are partitioned and sorted.',
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    pivotIndex: null,
    activeRange: null,
  });

  return steps;
}
