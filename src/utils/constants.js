// Algorithm categories and constants for DSA Visualizer

export const CATEGORIES = {
  SORTING: 'sorting',
  GRAPH: 'graph',
  PATHFINDING: 'pathfinding',
  DATA_STRUCTURES: 'dataStructures',
  TECHNIQUES: 'techniques',
};

export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

export const SORTING_ALGORITHMS = [
  { id: 'bubbleSort', name: 'Bubble Sort', category: 'Sorting', difficulty: 'Easy', time: 'O(n²)', space: 'O(1)', stable: true, inPlace: true },
  { id: 'selectionSort', name: 'Selection Sort', category: 'Sorting', difficulty: 'Easy', time: 'O(n²)', space: 'O(1)', stable: false, inPlace: true },
  { id: 'insertionSort', name: 'Insertion Sort', category: 'Sorting', difficulty: 'Easy', time: 'O(n²)', space: 'O(1)', stable: true, inPlace: true },
  { id: 'mergeSort', name: 'Merge Sort', category: 'Sorting', difficulty: 'Medium', time: 'O(n log n)', space: 'O(n)', stable: true, inPlace: false },
  { id: 'quickSort', name: 'Quick Sort', category: 'Sorting', difficulty: 'Medium', time: 'O(n log n)', space: 'O(log n)', stable: false, inPlace: true },
  { id: 'heapSort', name: 'Heap Sort', category: 'Sorting', difficulty: 'Hard', time: 'O(n log n)', space: 'O(1)', stable: false, inPlace: true },
];

export const GRAPH_ALGORITHMS = [
  { id: 'bfs', name: 'Breadth-First Search (BFS)', category: 'Graph Traversal', difficulty: 'Medium', time: 'O(V + E)', space: 'O(V)', structure: 'Queue (FIFO)' },
  { id: 'dfs', name: 'Depth-First Search (DFS)', category: 'Graph Traversal', difficulty: 'Medium', time: 'O(V + E)', space: 'O(V)', structure: 'Stack (LIFO / Recursion)' },
  { id: 'kruskal', name: "Kruskal's Algorithm (MST)", category: 'Minimum Spanning Tree', difficulty: 'Medium', time: 'O(E log E)', space: 'O(V)', structure: 'Disjoint-Set Union (DSU)' },
  { id: 'prim', name: "Prim's Algorithm (MST)", category: 'Minimum Spanning Tree', difficulty: 'Medium', time: 'O(E log V)', space: 'O(V)', structure: 'Min-Priority Queue' },
];

export const PATHFINDING_ALGORITHMS = [
  { id: 'dijkstra', name: "Dijkstra's Algorithm", category: 'Pathfinding', difficulty: 'Medium', time: 'O((V + E) log V)', space: 'O(V)', guaranteesShortest: true, weighted: true },
  { id: 'astar', name: 'A* Search Algorithm', category: 'Pathfinding', difficulty: 'Hard', time: 'O(E)', space: 'O(V)', guaranteesShortest: true, heuristic: 'Manhattan Distance' },
];

export const DATA_STRUCTURES = [
  { id: 'stack', name: 'Stack (LIFO)', category: 'Linear Data Structure', operations: ['Push', 'Pop', 'Peek', 'Clear'] },
  { id: 'queue', name: 'Queue (FIFO)', category: 'Linear Data Structure', operations: ['Enqueue', 'Dequeue', 'Peek', 'Clear'] },
  { id: 'linkedList', name: 'Singly Linked List', category: 'Dynamic Data Structure', operations: ['Insert Head', 'Insert Tail', 'Insert At', 'Delete', 'Search'] },
  { id: 'binarySearchTree', name: 'Binary Search Tree (BST)', category: 'Tree Structure', operations: ['Insert', 'Search', 'Delete', 'Inorder', 'Preorder', 'Postorder', 'Level Order'] },
  { id: 'hashTable', name: 'Hash Table', category: 'Associative Structure', operations: ['Insert', 'Search', 'Delete', 'Separate Chaining', 'Linear Probing'] },
];

export const SPEED_LEVELS = [
  { label: '0.25x', value: 800 },
  { label: '0.5x', value: 400 },
  { label: '1x', value: 200 },
  { label: '2x', value: 100 },
  { label: '4x', value: 40 },
  { label: '10x', value: 10 },
];

export const DEFAULT_ARRAY_SIZE = 15;
export const MIN_ARRAY_SIZE = 5;
export const MAX_ARRAY_SIZE = 60;
export const MIN_ARRAY_VALUE = 5;
export const MAX_ARRAY_VALUE = 100;

export const GRID_ROWS = 18;
export const GRID_COLS = 36;
