// Pure step generator for Insertion Sort

export function generateInsertionSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  const n = arr.length;
  const sortedIndices = [0];

  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;

  steps.push({
    type: 'initial',
    indices: [0],
    array: [...arr],
    description: `Starting Insertion Sort. Initial prefix [${arr[0]}] is trivially sorted.`,
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: [...sortedIndices],
    pivotIndex: null,
    activeRange: null,
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    arrayAccesses++;

    steps.push({
      type: 'range',
      indices: [i],
      array: [...arr],
      description: `Picking key element ${key} at index ${i} to insert into sorted subarray [0..${i - 1}].`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: i,
      activeRange: [0, i],
    });

    while (j >= 0) {
      comparisons++;
      arrayAccesses++;

      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        description: `Comparing key (${key}) with sorted element ${arr[j]} at index ${j}.`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: j + 1,
        activeRange: [0, i],
      });

      if (arr[j] > key) {
        // Shift arr[j] to arr[j+1]
        swaps++;
        arrayAccesses += 2;
        arr[j + 1] = arr[j];

        steps.push({
          type: 'overwrite',
          indices: [j + 1],
          array: [...arr],
          description: `Shifted element ${arr[j]} right to index ${j + 1} to make space for key.`,
          stats: { comparisons, swaps, arrayAccesses },
          sortedIndices: [...sortedIndices],
          pivotIndex: null,
          activeRange: [0, i],
        });

        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    arrayAccesses++;

    steps.push({
      type: 'swap',
      indices: [j + 1],
      array: [...arr],
      description: `Inserted key ${key} into its correct sorted location at index ${j + 1}.`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: null,
      activeRange: [0, i],
    });

    // Subarray 0..i is now sorted
    sortedIndices.length = 0;
    for (let k = 0; k <= i; k++) {
      sortedIndices.push(k);
    }

    steps.push({
      type: 'sorted',
      indices: [...sortedIndices],
      array: [...arr],
      description: `Sorted prefix now extends up to index ${i}.`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: null,
      activeRange: null,
    });
  }

  steps.push({
    type: 'finish',
    indices: [],
    array: [...arr],
    description: 'Insertion Sort complete. All elements are sorted.',
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    pivotIndex: null,
    activeRange: null,
  });

  return steps;
}
