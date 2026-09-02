// Headless benchmark runner for sorting algorithm comparisons

import { generateBubbleSortSteps } from './bubbleSort';
import { generateSelectionSortSteps } from './selectionSort';
import { generateInsertionSortSteps } from './insertionSort';
import { generateMergeSortSteps } from './mergeSort';
import { generateQuickSortSteps } from './quickSort';
import { generateHeapSortSteps } from './heapSort';

const SORT_GENERATORS = {
  bubbleSort: generateBubbleSortSteps,
  selectionSort: generateSelectionSortSteps,
  insertionSort: generateInsertionSortSteps,
  mergeSort: generateMergeSortSteps,
  quickSort: generateQuickSortSteps,
  heapSort: generateHeapSortSteps,
};

export function runSortingBenchmark(algorithms, sampleArray) {
  const results = [];

  for (const algoKey of algorithms) {
    const generator = SORT_GENERATORS[algoKey];
    if (!generator) continue;

    const startTime = performance.now();
    const steps = generator([...sampleArray]);
    const endTime = performance.now();

    const lastStep = steps[steps.length - 1] || {};
    const stats = lastStep.stats || { comparisons: 0, swaps: 0, arrayAccesses: 0 };

    results.push({
      id: algoKey,
      name: algoKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      stepsCount: steps.length,
      comparisons: stats.comparisons,
      swaps: stats.swaps,
      arrayAccesses: stats.arrayAccesses,
      executionTimeMs: Number((endTime - startTime).toFixed(2)),
    });
  }

  return results;
}
