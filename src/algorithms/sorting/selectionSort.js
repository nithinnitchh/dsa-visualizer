// Pure step generator for Selection Sort

export function generateSelectionSortSteps(initialArray) {
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
    description: `Starting Selection Sort on an array of ${n} elements.`,
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: [...sortedIndices],
    pivotIndex: null,
    activeRange: null,
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      type: 'range',
      indices: [i],
      array: [...arr],
      description: `Starting pass ${i + 1}. Current minimum assumed at index ${i} (${arr[i]}).`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: minIdx,
      activeRange: [i, n - 1],
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      arrayAccesses += 2;

      steps.push({
        type: 'compare',
        indices: [j, minIdx],
        array: [...arr],
        description: `Comparing candidate at index ${j} (${arr[j]}) with current minimum at index ${minIdx} (${arr[minIdx]}).`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: minIdx,
        activeRange: [i, n - 1],
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          type: 'range',
          indices: [minIdx],
          array: [...arr],
          description: `Found new smaller element (${arr[minIdx]}) at index ${minIdx}.`,
          stats: { comparisons, swaps, arrayAccesses },
          sortedIndices: [...sortedIndices],
          pivotIndex: minIdx,
          activeRange: [i, n - 1],
        });
      }
    }

    if (minIdx !== i) {
      swaps++;
      arrayAccesses += 4;
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        type: 'swap',
        indices: [i, minIdx],
        array: [...arr],
        description: `Swapped minimum element ${arr[i]} into sorted position at index ${i}.`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: null,
        activeRange: [i, n - 1],
      });
    }

    sortedIndices.push(i);
    steps.push({
      type: 'sorted',
      indices: [i],
      array: [...arr],
      description: `Index ${i} (${arr[i]}) is now sorted in place.`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: null,
      activeRange: null,
    });
  }

  sortedIndices.push(n - 1);

  steps.push({
    type: 'finish',
    indices: [],
    array: [...arr],
    description: 'Selection Sort complete. All elements are sorted.',
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    pivotIndex: null,
    activeRange: null,
  });

  return steps;
}
