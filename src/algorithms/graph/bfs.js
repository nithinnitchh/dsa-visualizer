// Breadth-First Search (BFS) pure step generator for Graph Traversal

export function generateBFSSteps(nodes, edges, startNodeId) {
  const steps = [];
  const startNode = nodes.find(n => n.id === startNodeId) || nodes[0];
  if (!startNode) return steps;

  // Build adjacency list (undirected graph)
  const adj = {};
  nodes.forEach(n => { adj[n.id] = []; });
  edges.forEach(e => {
    if (adj[e.from] && adj[e.to]) {
      adj[e.from].push({ target: e.to, edgeId: e.id });
      adj[e.to].push({ target: e.from, edgeId: e.id });
    }
  });

  const visited = new Set();
  const queue = [];
  const traversalOrder = [];
  let edgesExplored = 0;

  // Initial step
  queue.push(startNode.id);
  visited.add(startNode.id);

  steps.push({
    type: 'start',
    currentNodeId: startNode.id,
    visitedNodes: [...visited],
    frontierQueue: [...queue],
    currentEdgeId: null,
    traversalOrder: [...traversalOrder],
    description: `Starting BFS at Node ${startNode.label}. Enqueued start node.`,
    stats: { visitedCount: visited.size, edgesExplored },
  });

  while (queue.length > 0) {
    const currId = queue.shift();
    const currNode = nodes.find(n => n.id === currId);
    traversalOrder.push(currId);

    steps.push({
      type: 'visitNode',
      currentNodeId: currId,
      visitedNodes: [...visited],
      frontierQueue: [...queue],
      currentEdgeId: null,
      traversalOrder: [...traversalOrder],
      description: `Dequeued and visiting Node ${currNode?.label || currId}.`,
      stats: { visitedCount: visited.size, edgesExplored },
    });

    const neighbors = adj[currId] || [];
    for (const neighbor of neighbors) {
      edgesExplored++;
      const targetNode = nodes.find(n => n.id === neighbor.target);

      steps.push({
        type: 'examineEdge',
        currentNodeId: currId,
        visitedNodes: [...visited],
        frontierQueue: [...queue],
        currentEdgeId: neighbor.edgeId,
        traversalOrder: [...traversalOrder],
        description: `Examining edge from Node ${currNode?.label} to Node ${targetNode?.label}.`,
        stats: { visitedCount: visited.size, edgesExplored },
      });

      if (!visited.has(neighbor.target)) {
        visited.add(neighbor.target);
        queue.push(neighbor.target);

        steps.push({
          type: 'enqueue',
          currentNodeId: currId,
          visitedNodes: [...visited],
          frontierQueue: [...queue],
          currentEdgeId: neighbor.edgeId,
          traversalOrder: [...traversalOrder],
          description: `Node ${targetNode?.label} is unvisited. Marked visited and added to Queue.`,
          stats: { visitedCount: visited.size, edgesExplored },
        });
      } else {
        steps.push({
          type: 'alreadyVisited',
          currentNodeId: currId,
          visitedNodes: [...visited],
          frontierQueue: [...queue],
          currentEdgeId: neighbor.edgeId,
          traversalOrder: [...traversalOrder],
          description: `Node ${targetNode?.label} is already visited. Skipping.`,
          stats: { visitedCount: visited.size, edgesExplored },
        });
      }
    }
  }

  steps.push({
    type: 'finish',
    currentNodeId: null,
    visitedNodes: [...visited],
    frontierQueue: [],
    currentEdgeId: null,
    traversalOrder: [...traversalOrder],
    description: `BFS complete! Traversed ${traversalOrder.length} reachable nodes across ${edgesExplored} examined edges.`,
    stats: { visitedCount: visited.size, edgesExplored },
  });

  return steps;
}
