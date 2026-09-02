// Kruskal's Minimum Spanning Tree (MST) pure step generator

class DisjointSet {
  constructor(elements) {
    this.parent = {};
    elements.forEach(el => {
      this.parent[el] = el;
    });
  }

  find(i) {
    if (this.parent[i] === i) return i;
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true;
    }
    return false;
  }
}

export function generateKruskalSteps(nodes, edges) {
  const steps = [];
  if (nodes.length === 0 || edges.length === 0) return steps;

  // Clone and sort edges by weight ascending
  const sortedEdges = [...edges].sort((a, b) => (a.weight || 1) - (b.weight || 1));
  const nodeIds = nodes.map(n => n.id);
  const dsu = new DisjointSet(nodeIds);

  const mstEdgeIds = [];
  const rejectedEdgeIds = [];
  let totalWeight = 0;

  // Initial step
  steps.push({
    type: 'start',
    currentNodeId: null,
    currentEdgeId: null,
    mstEdgeIds: [...mstEdgeIds],
    rejectedEdgeIds: [...rejectedEdgeIds],
    traversalOrder: [],
    description: `Starting Kruskal's MST. Sorted ${edges.length} edges in ascending order of weight.`,
    stats: { totalWeight, mstEdgesCount: 0, edgesChecked: 0 },
  });

  let edgesChecked = 0;

  for (const edge of sortedEdges) {
    edgesChecked++;
    const uNode = nodes.find(n => n.id === edge.from);
    const vNode = nodes.find(n => n.id === edge.to);
    const edgeWeight = edge.weight || 1;

    steps.push({
      type: 'examineEdge',
      currentNodeId: null,
      currentEdgeId: edge.id,
      mstEdgeIds: [...mstEdgeIds],
      rejectedEdgeIds: [...rejectedEdgeIds],
      traversalOrder: [],
      description: `Examining lightest candidate edge (${uNode?.label} — ${vNode?.label}) with weight ${edgeWeight}.`,
      stats: { totalWeight, mstEdgesCount: mstEdgeIds.length, edgesChecked },
    });

    const rootU = dsu.find(edge.from);
    const rootV = dsu.find(edge.to);

    if (rootU !== rootV) {
      dsu.union(edge.from, edge.to);
      mstEdgeIds.push(edge.id);
      totalWeight += edgeWeight;

      steps.push({
        type: 'acceptEdge',
        currentNodeId: null,
        currentEdgeId: edge.id,
        mstEdgeIds: [...mstEdgeIds],
        rejectedEdgeIds: [...rejectedEdgeIds],
        traversalOrder: [],
        description: `Accepted edge (${uNode?.label} — ${vNode?.label}, wt: ${edgeWeight}) into MST. No cycle formed.`,
        stats: { totalWeight, mstEdgesCount: mstEdgeIds.length, edgesChecked },
      });

      // If MST has V - 1 edges, we are done
      if (mstEdgeIds.length === nodes.length - 1) {
        break;
      }
    } else {
      rejectedEdgeIds.push(edge.id);

      steps.push({
        type: 'rejectEdge',
        currentNodeId: null,
        currentEdgeId: edge.id,
        mstEdgeIds: [...mstEdgeIds],
        rejectedEdgeIds: [...rejectedEdgeIds],
        traversalOrder: [],
        description: `Rejected edge (${uNode?.label} — ${vNode?.label}) because adding it would create a cycle!`,
        stats: { totalWeight, mstEdgesCount: mstEdgeIds.length, edgesChecked },
      });
    }
  }

  steps.push({
    type: 'finish',
    currentNodeId: null,
    currentEdgeId: null,
    mstEdgeIds: [...mstEdgeIds],
    rejectedEdgeIds: [...rejectedEdgeIds],
    traversalOrder: [],
    description: `Kruskal's MST Complete! Connected ${nodes.length} nodes using ${mstEdgeIds.length} edges. Total MST Weight: ${totalWeight}.`,
    stats: { totalWeight, mstEdgesCount: mstEdgeIds.length, edgesChecked },
  });

  return steps;
}
