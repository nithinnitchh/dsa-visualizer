// Pure step generator for Sliding Window Technique

export function generateSlidingWindowSteps(initialArray, windowSize = 3) {
  const steps = [];
  const arr = [...initialArray];
  const n = arr.length;
  const k = Math.min(windowSize, n);

  if (n === 0 || k <= 0) return steps;

  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }

  let maxSum = currentSum;
  let bestRange = [0, k - 1];

  // Initial step: Compute first window
  steps.push({
    type: 'initial_window',
    windowRange: [0, k - 1],
    bestRange: [...bestRange],
    currentSum,
    maxSum,
    array: [...arr],
    description: `Initialized first window [0..${k - 1}] (${arr.slice(0, k).join(' + ')} = ${currentSum}). Current Max Sum: ${maxSum}.`,
    stats: { currentSum, maxSum, windowSize: k, stepIndex: 0 },
  });

  for (let right = k; right < n; right++) {
    const left = right - k + 1;
    const exitingVal = arr[left - 1];
    const enteringVal = arr[right];

    // Step: Exiting and entering elements
    currentSum = currentSum - exitingVal + enteringVal;

    const isNewMax = currentSum > maxSum;
    if (isNewMax) {
      maxSum = currentSum;
      bestRange = [left, right];
    }

    steps.push({
      type: isNewMax ? 'new_max' : 'slide',
      windowRange: [left, right],
      bestRange: [...bestRange],
      currentSum,
      maxSum,
      array: [...arr],
      description: isNewMax
        ? `Slid window to [${left}..${right}]: Subtracted ${exitingVal}, Added ${enteringVal} → New Window Sum: ${currentSum} (🎉 NEW MAXIMUM!)`
        : `Slid window to [${left}..${right}]: Subtracted ${exitingVal}, Added ${enteringVal} → Window Sum: ${currentSum}. Max remains ${maxSum}.`,
      stats: { currentSum, maxSum, windowSize: k, stepIndex: right - k + 1 },
    });
  }

  steps.push({
    type: 'finish',
    windowRange: [...bestRange],
    bestRange: [...bestRange],
    currentSum: maxSum,
    maxSum,
    array: [...arr],
    description: `Sliding Window complete! Maximum sum of size ${k} is ${maxSum} in subarray range [${bestRange[0]}..${bestRange[1]}]. (O(n) time complexity)`,
    stats: { currentSum: maxSum, maxSum, windowSize: k, stepIndex: n - k + 1 },
  });

  return steps;
}
