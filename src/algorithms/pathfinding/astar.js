// A* Search pure step generator on a 2D Grid

export function generateAStarSteps(gridRows, gridCols, startPos, endPos, wallsSet) {
  const steps = [];
  const startKey = `${startPos.r},${startPos.c}`;
  const endKey = `${endPos.r},${endPos.c}`;

  // Manhattan distance heuristic
  const heuristic = (r, c) => Math.abs(r - endPos.r) + Math.abs(c - endPos.c);

  const gScore = {};
  const fScore = {};
  const previous = {};
  const openSet = new Set();
  const closedSet = new Set();
  const visitedOrder = [];

  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      gScore[`${r},${c}`] = Infinity;
      fScore[`${r},${c}`] = Infinity;
    }
  }

  gScore[startKey] = 0;
  fScore[startKey] = heuristic(startPos.r, startPos.c);
  openSet.add(startKey);

  steps.push({
    type: 'start',
    currentCell: startPos,
    visitedCells: [],
    frontierCells: [startPos],
    shortestPath: [],
    description: `Starting A* Search. Initial heuristic h(start) = ${fScore[startKey]}.`,
    stats: { visitedCount: 0, pathLength: 0 },
  });

  const getNeighbors = (r, c) => {
    const neighbors = [];
    const deltas = [[-1, 0], [0, 1], [1, 0], [0, -1]];
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

  while (openSet.size > 0) {
    // Find node in openSet with lowest fScore
    let currentKey = null;
    let lowestF = Infinity;

    for (const key of openSet) {
      if (fScore[key] < lowestF) {
        lowestF = fScore[key];
        currentKey = key;
      }
    }

    if (!currentKey) break;

    openSet.delete(currentKey);
    closedSet.add(currentKey);
    const [currR, currC] = currentKey.split(',').map(Number);
    const currentCell = { r: currR, c: currC };
    visitedOrder.push(currentCell);

    steps.push({
      type: 'visitCell',
      currentCell,
      visitedCells: [...visitedOrder],
      frontierCells: Array.from(openSet).map(k => {
        const [r, c] = k.split(',').map(Number);
        return { r, c };
      }),
      shortestPath: [],
      description: `Exploring cell (${currR}, ${currC}) with f = ${fScore[currentKey]} (g=${gScore[currentKey]} + h=${heuristic(currR, currC)}).`,
      stats: { visitedCount: visitedOrder.length, pathLength: 0 },
    });

    if (currentKey === endKey) {
      targetFound = true;
      break;
    }

    const neighbors = getNeighbors(currR, currC);
    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor.key)) continue;

      const tentativeG = gScore[currentKey] + 1;

      if (tentativeG < gScore[neighbor.key]) {
        previous[neighbor.key] = currentKey;
        gScore[neighbor.key] = tentativeG;
        const h = heuristic(neighbor.r, neighbor.c);
        fScore[neighbor.key] = tentativeG + h;
        openSet.add(neighbor.key);

        steps.push({
          type: 'updateNeighbor',
          currentCell: { r: neighbor.r, c: neighbor.c },
          visitedCells: [...visitedOrder],
          frontierCells: Array.from(openSet).map(k => {
            const [r, c] = k.split(',').map(Number);
            return { r, c };
          }),
          shortestPath: [],
          description: `Discovered candidate cell (${neighbor.r}, ${neighbor.c}) with f = ${tentativeG + h} (g=${tentativeG}, h=${h}).`,
          stats: { visitedCount: visitedOrder.length, pathLength: 0 },
        });
      }
    }
  }

  if (targetFound) {
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
      description: `A* found optimal path of length ${path.length - 1} steps in ${visitedOrder.length} visited cells (Heuristic-directed).`,
      stats: { visitedCount: visitedOrder.length, pathLength: path.length - 1 },
    });
  } else {
    steps.push({
      type: 'finish',
      currentCell: null,
      visitedCells: [...visitedOrder],
      frontierCells: [],
      shortestPath: [],
      description: `No path exists to Target. Explored ${visitedOrder.length} cells before exhausting open set.`,
      stats: { visitedCount: visitedOrder.length, pathLength: 0 },
    });
  }

  return steps;
}
