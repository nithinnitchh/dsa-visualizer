// Dijkstra's Pathfinding pure step generator on a 2D Grid

export function generateDijkstraSteps(gridRows, gridCols, startPos, endPos, wallsSet) {
  const steps = [];
  const startKey = `${startPos.r},${startPos.c}`;
  const endKey = `${endPos.r},${endPos.c}`;

  const distances = {};
  const previous = {};
  const visitedSet = new Set();
  const frontierSet = new Set();
  const visitedOrder = [];

  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      distances[`${r},${c}`] = Infinity;
    }
  }

  distances[startKey] = 0;
  frontierSet.add(startKey);

  steps.push({
    type: 'start',
    currentCell: startPos,
    visitedCells: [],
    frontierCells: [startPos],
    shortestPath: [],
    description: `Starting Dijkstra from Start (${startPos.r}, ${startPos.c}) toward Target (${endPos.r}, ${endPos.c}).`,
    stats: { visitedCount: 0, pathLength: 0 },
  });

  const getNeighbors = (r, c) => {
    const neighbors = [];
    const deltas = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, Right, Down, Left
    for (const [dr, dc] of deltas) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < gridRows && nc >= 0 && nc < gridCols) {
        const key = `${nr},${nc}`;
        if (!wallsSet.has(key)) {
          neighbors.push({ r: nr, c: nc, key });
        }
      }
    }
    return neighbors;
  };

  let targetFound = false;

  while (frontierSet.size > 0) {
    // Find cell in frontier with minimum distance
    let currentKey = null;
    let minDistance = Infinity;

    for (const key of frontierSet) {
      if (distances[key] < minDistance) {
        minDistance = distances[key];
        currentKey = key;
      }
    }

    if (!currentKey || minDistance === Infinity) {
      break;
    }

    frontierSet.delete(currentKey);
    visitedSet.add(currentKey);
    const [currR, currC] = currentKey.split(',').map(Number);
    const currentCell = { r: currR, c: currC };
    visitedOrder.push(currentCell);

    steps.push({
      type: 'visitCell',
      currentCell,
      visitedCells: [...visitedOrder],
      frontierCells: Array.from(frontierSet).map(k => {
        const [r, c] = k.split(',').map(Number);
        return { r, c };
      }),
      shortestPath: [],
      description: `Evaluating cell (${currR}, ${currC}) with cumulative distance ${minDistance}.`,
      stats: { visitedCount: visitedOrder.length, pathLength: 0 },
    });

    if (currentKey === endKey) {
      targetFound = true;
      break;
    }

    const neighbors = getNeighbors(currR, currC);
    for (const neighbor of neighbors) {
      if (visitedSet.has(neighbor.key)) continue;

      const altDist = distances[currentKey] + 1;
      if (altDist < distances[neighbor.key]) {
        distances[neighbor.key] = altDist;
        previous[neighbor.key] = currentKey;
        frontierSet.add(neighbor.key);

        steps.push({
          type: 'updateNeighbor',
          currentCell: { r: neighbor.r, c: neighbor.c },
          visitedCells: [...visitedOrder],
          frontierCells: Array.from(frontierSet).map(k => {
            const [r, c] = k.split(',').map(Number);
            return { r, c };
          }),
          shortestPath: [],
          description: `Discovered shorter path to neighbor (${neighbor.r}, ${neighbor.c}) with distance ${altDist}.`,
          stats: { visitedCount: visitedOrder.length, pathLength: 0 },
        });
      }
    }
  }

  if (targetFound) {
    // Reconstruct path
    const path = [];
    let curr = endKey;
    while (curr) {
      const [r, c] = curr.split(',').map(Number);
      path.unshift({ r, c });
      curr = previous[curr];
    }

    steps.push({
      type: 'finish',
      currentCell: endPos,
      visitedCells: [...visitedOrder],
      frontierCells: [],
      shortestPath: path,
      description: `Target reached! Shortest path of length ${path.length - 1} steps found after visiting ${visitedOrder.length} cells.`,
      stats: { visitedCount: visitedOrder.length, pathLength: path.length - 1 },
    });
  } else {
    steps.push({
      type: 'finish',
      currentCell: null,
      visitedCells: [...visitedOrder],
      frontierCells: [],
      shortestPath: [],
      description: `No path exists between Start and Target. Visited ${visitedOrder.length} reachable cells.`,
      stats: { visitedCount: visitedOrder.length, pathLength: 0 },
    });
  }

  return steps;
}
