// Depth-First Search (DFS) pure step generator for Graph Traversal

export function generateDFSSteps(nodes, edges, startNodeId) {
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
  const stack = [];
  const traversalOrder = [];
  let edgesExplored = 0;

  // Initial step
  stack.push(startNode.id);

  steps.push({
    type: 'start',
    currentNodeId: startNode.id,
    visitedNodes: [...visited],
    frontierQueue: [...stack], // reuse key for callstack display
    currentEdgeId: null,
    traversalOrder: [...traversalOrder],
    description: `Starting DFS at Node ${startNode.label}. Pushed start node onto Stack.`,
    stats: { visitedCount: visited.size, edgesExplored },
  });

  function dfsRecursive(currId, parentEdgeId = null) {
    visited.add(currId);
    traversalOrder.push(currId);
    const currNode = nodes.find(n => n.id === currId);

    steps.push({
      type: 'visitNode',
      currentNodeId: currId,
      visitedNodes: [...visited],
      frontierQueue: [...stack],
      currentEdgeId: parentEdgeId,
      traversalOrder: [...traversalOrder],
      description: `Visiting Node ${currNode?.label || currId}.`,
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
        frontierQueue: [...stack],
        currentEdgeId: neighbor.edgeId,
        traversalOrder: [...traversalOrder],
        description: `Examining branch from Node ${currNode?.label} to Node ${targetNode?.label}.`,
        stats: { visitedCount: visited.size, edgesExplored },
      });

      if (!visited.has(neighbor.target)) {
        stack.push(neighbor.target);
        steps.push({
          type: 'pushStack',
          currentNodeId: currId,
          visitedNodes: [...visited],
          frontierQueue: [...stack],
          currentEdgeId: neighbor.edgeId,
          traversalOrder: [...traversalOrder],
          description: `Node ${targetNode?.label} is unvisited. Recursing deeper along this branch.`,
          stats: { visitedCount: visited.size, edgesExplored },
        });

        dfsRecursive(neighbor.target, neighbor.edgeId);
        stack.pop();

        steps.push({
          type: 'backtrack',
          currentNodeId: currId,
          visitedNodes: [...visited],
          frontierQueue: [...stack],
          currentEdgeId: neighbor.edgeId,
          traversalOrder: [...traversalOrder],
          description: `Backtracked from Node ${targetNode?.label} back to Node ${currNode?.label}.`,
          stats: { visitedCount: visited.size, edgesExplored },
        });
      }
    }
  }

  dfsRecursive(startNode.id);

  steps.push({
    type: 'finish',
    currentNodeId: null,
    visitedNodes: [...visited],
    frontierQueue: [],
    currentEdgeId: null,
    traversalOrder: [...traversalOrder],
    description: `DFS traversal complete! Visited ${traversalOrder.length} nodes across ${edgesExplored} examined edges.`,
    stats: { visitedCount: visited.size, edgesExplored },
  });

  return steps;
}
