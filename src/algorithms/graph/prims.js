// Prim's Minimum Spanning Tree (MST) pure step generator

export function generatePrimsSteps(nodes, edges, startNodeId) {
  const steps = [];
  if (nodes.length === 0 || edges.length === 0) return steps;

  const startNode = nodes.find(n => n.id === startNodeId) || nodes[0];
  const visited = new Set([startNode.id]);
  const mstEdgeIds = [];
  let totalWeight = 0;
  let edgesChecked = 0;

  // Build adjacency lookup
  const adj = {};
  nodes.forEach(n => { adj[n.id] = []; });
  edges.forEach(e => {
    const wt = e.weight || 1;
    if (adj[e.from] && adj[e.to]) {
      adj[e.from].push({ target: e.to, edgeId: e.id, weight: wt });
      adj[e.to].push({ target: e.from, edgeId: e.id, weight: wt });
    }
  });

  steps.push({
    type: 'start',
    currentNodeId: startNode.id,
    visitedNodes: [...visited],
    mstEdgeIds: [...mstEdgeIds],
    currentEdgeId: null,
    traversalOrder: [startNode.id],
    description: `Starting Prim's Algorithm at root Node ${startNode.label}. Growing MST greedily from this vertex.`,
    stats: { totalWeight, mstEdgesCount: 0, edgesChecked: 0 },
  });

  while (visited.size < nodes.length) {
    // Find candidate cut edges crossing from visited set to unvisited set
    let bestEdge = null;
    let minWeight = Infinity;
    let newVertex = null;

    for (const u of visited) {
      const neighbors = adj[u] || [];
      for (const edge of neighbors) {
        if (!visited.has(edge.target)) {
          edgesChecked++;
          if (edge.weight < minWeight) {
            minWeight = edge.weight;
            bestEdge = edge;
            newVertex = edge.target;
          }
        }
      }
    }

    if (!bestEdge) {
      // Disconnected component
      break;
    }

    const targetNode = nodes.find(n => n.id === newVertex);

    steps.push({
      type: 'examineEdge',
      currentNodeId: newVertex,
      visitedNodes: [...visited],
      mstEdgeIds: [...mstEdgeIds],
      currentEdgeId: bestEdge.edgeId,
      traversalOrder: [...visited],
      description: `Selected minimum weight cut edge with weight ${bestEdge.weight} connecting to Node ${targetNode?.label}.`,
      stats: { totalWeight, mstEdgesCount: mstEdgeIds.length, edgesChecked },
    });

    visited.add(newVertex);
    mstEdgeIds.push(bestEdge.edgeId);
    totalWeight += bestEdge.weight;

    steps.push({
      type: 'acceptEdge',
      currentNodeId: newVertex,
      visitedNodes: [...visited],
      mstEdgeIds: [...mstEdgeIds],
      currentEdgeId: bestEdge.edgeId,
      traversalOrder: [...visited],
      description: `Added Node ${targetNode?.label} and edge into the MST. Tree now has ${visited.size} vertices.`,
      stats: { totalWeight, mstEdgesCount: mstEdgeIds.length, edgesChecked },
    });
  }

  steps.push({
    type: 'finish',
    currentNodeId: null,
    visitedNodes: [...visited],
    mstEdgeIds: [...mstEdgeIds],
    currentEdgeId: null,
    traversalOrder: [...visited],
    description: `Prim's MST Complete! Connected all ${visited.size} vertices. Total MST Weight: ${totalWeight}.`,
    stats: { totalWeight, mstEdgesCount: mstEdgeIds.length, edgesChecked },
  });

  return steps;
}
