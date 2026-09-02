// Pure step generator for Heap Sort

export function generateHeapSortSteps(initialArray) {
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
    description: `Starting Heap Sort. Step 1: Transforming array of ${n} elements into a Max-Heap.`,
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: [...sortedIndices],
    pivotIndex: null,
    activeRange: [0, n - 1],
  });

  function heapify(heapSize, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < heapSize) {
      comparisons++;
      arrayAccesses += 2;
      steps.push({
        type: 'compare',
        indices: [left, largest],
        array: [...arr],
        description: `Comparing left child at index ${left} (${arr[left]}) with node at index ${largest} (${arr[largest]}).`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: largest,
        activeRange: [0, heapSize - 1],
      });
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < heapSize) {
      comparisons++;
      arrayAccesses += 2;
      steps.push({
        type: 'compare',
        indices: [right, largest],
        array: [...arr],
        description: `Comparing right child at index ${right} (${arr[right]}) with largest candidate at index ${largest} (${arr[largest]}).`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: largest,
        activeRange: [0, heapSize - 1],
      });
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      swaps++;
      arrayAccesses += 4;
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      steps.push({
        type: 'swap',
        indices: [i, largest],
        array: [...arr],
        description: `Sifting down: Swapped parent index ${i} with larger child index ${largest}.`,
        stats: { comparisons, swaps, arrayAccesses },
        sortedIndices: [...sortedIndices],
        pivotIndex: largest,
        activeRange: [0, heapSize - 1],
      });

      heapify(heapSize, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      type: 'range',
      indices: [i],
      array: [...arr],
      description: `Heapifying subtree rooted at index ${i} (${arr[i]}).`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: i,
      activeRange: [0, n - 1],
    });
    heapify(n, i);
  }

  steps.push({
    type: 'range',
    indices: [0],
    array: [...arr],
    description: 'Max-Heap constructed! Root element at index 0 is the global maximum.',
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: [...sortedIndices],
    pivotIndex: 0,
    activeRange: [0, n - 1],
  });

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    swaps++;
    arrayAccesses += 4;
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    sortedIndices.push(i);

    steps.push({
      type: 'swap',
      indices: [0, i],
      array: [...arr],
      description: `Extracted maximum ${arr[i]} from root to sorted index ${i}.`,
      stats: { comparisons, swaps, arrayAccesses },
      sortedIndices: [...sortedIndices],
      pivotIndex: null,
      activeRange: [0, i - 1],
    });

    // Call heapify on the reduced heap
    heapify(i, 0);
  }

  sortedIndices.push(0);

  steps.push({
    type: 'finish',
    indices: [],
    array: [...arr],
    description: 'Heap Sort complete. All elements are sorted in O(n log n) guaranteed time.',
    stats: { comparisons, swaps, arrayAccesses },
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    pivotIndex: null,
    activeRange: null,
  });

  return steps;
}
