// Theoretical Big-O complexity, descriptions, and pseudocode data

export const ALGORITHM_DETAILS = {
  // Sorting
  bubbleSort: {
    name: 'Bubble Sort',
    category: 'Sorting',
    difficulty: 'Easy',
    description: 'Bubble Sort repeatedly steps through the list, compares adjacent pairs of elements, and swaps them if they are in the wrong order until the entire array is sorted.',
    howItWorks: 'During each pass, the largest unsorted element "bubbles up" to its correct position at the end of the array. An optimized version terminates early if no swaps occurred during a pass.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    pseudocode: `function bubbleSort(arr):
    n = length(arr)
    for i from 0 to n - 1:
        swapped = false
        for j from 0 to n - i - 2:
            if arr[j] > arr[j + 1]:
                swap(arr[j], arr[j + 1])
                swapped = true
        if not swapped:
            break
    return arr`,
    keyConcepts: [
      'Adjacent element comparisons',
      'Bubbling largest element to end',
      'Early exit optimization with swapped flag',
    ],
    useCases: [
      'Educational demonstration of sorting basics',
      'Small datasets or nearly sorted arrays with few inversions',
    ],
  },

  selectionSort: {
    name: 'Selection Sort',
    category: 'Sorting',
    difficulty: 'Easy',
    description: 'Selection Sort divides the array into a sorted sublist and an unsorted sublist. In each pass, it finds the smallest element from the unsorted sublist and swaps it with the first unsorted element.',
    howItWorks: 'Maintains two subarrays: sorted (left) and unsorted (right). Each iteration scans the remaining unsorted part to locate the absolute minimum and moves it to the sorted boundary.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    pseudocode: `function selectionSort(arr):
    n = length(arr)
    for i from 0 to n - 1:
        minIndex = i
        for j from i + 1 to n - 1:
            if arr[j] < arr[minIndex]:
                minIndex = j
        if minIndex != i:
            swap(arr[i], arr[minIndex])
    return arr`,
    keyConcepts: [
      'Minimum element search in unsorted partition',
      'Boundary progression from left to right',
      'Minimal memory writes (at most n swaps)',
    ],
    useCases: [
      'When memory writes are significantly more expensive than reads (e.g. Flash memory)',
      'Small collections where simplicity is preferred',
    ],
  },

  insertionSort: {
    name: 'Insertion Sort',
    category: 'Sorting',
    difficulty: 'Easy',
    description: 'Insertion Sort builds the final sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position among the previously sorted elements.',
    howItWorks: 'Iterates through the array from index 1. For each key, shifts all greater elements in the sorted subarray to the right, then drops the key into its open spot.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    pseudocode: `function insertionSort(arr):
    n = length(arr)
    for i from 1 to n - 1:
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j = j - 1
        arr[j + 1] = key
    return arr`,
    keyConcepts: [
      'Incremental building of sorted prefix',
      'Right-shifting elements for insertion',
      'Adaptive performance for partially sorted arrays',
    ],
    useCases: [
      'Small datasets (used internally by Timsort/Introsort for subarrays < 32)',
      'Online sorting where items arrive continuously in real-time',
    ],
  },

  mergeSort: {
    name: 'Merge Sort',
    category: 'Sorting',
    difficulty: 'Medium',
    description: 'Merge Sort is an efficient, general-purpose, divide-and-conquer algorithm that recursively halves the array, sorts the halves, and then merges them back together.',
    howItWorks: 'Divides array down into single-element subarrays (base case), then repeatedly merges pairs of adjacent sorted subarrays in linear O(n) time into a unified sorted array.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    pseudocode: `function mergeSort(arr, left, right):
    if left >= right:
        return
    mid = floor((left + right) / 2)
    mergeSort(arr, left, mid)
    mergeSort(arr, mid + 1, right)
    merge(arr, left, mid, right)

function merge(arr, left, mid, right):
    create temp subarrays L and R
    i = 0, j = 0, k = left
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:
            arr[k] = L[i]; i++
        else:
            arr[k] = R[j]; j++
        k++
    copy remaining elements from L and R into arr`,
    keyConcepts: [
      'Divide and Conquer paradigm',
      'Guaranteed O(n log n) worst-case time',
      'Stable sorting preservation',
      'Auxiliary memory buffer requirement',
    ],
    useCases: [
      'External sorting on massive datasets where data does not fit in RAM',
      'Linked lists sorting where pointer manipulation requires O(1) extra space',
    ],
  },

  quickSort: {
    name: 'Quick Sort',
    category: 'Sorting',
    difficulty: 'Medium',
    description: 'Quick Sort is a highly efficient divide-and-conquer algorithm that selects a pivot element and partitions the array into values smaller and greater than the pivot, recursively sorting each side.',
    howItWorks: 'Chooses a pivot (e.g. rightmost element), reorganizes the array so elements < pivot are placed to its left and elements >= pivot to its right, then recurses on both partitions.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
    pseudocode: `function quickSort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)

function partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j from low to high - 1:
        if arr[j] < pivot:
            i++
            swap(arr[i], arr[j])
    swap(arr[i + 1], arr[high])
    return i + 1`,
    keyConcepts: [
      'Pivot selection and in-place partitioning',
      'Excellent cache locality & fast constant factors',
      'Worst-case avoided via randomized or median-of-three pivot',
    ],
    useCases: [
      'Default general-purpose standard library sort in C, C++, Rust, and Java primitives',
      'In-memory high-throughput sorting',
    ],
  },

  heapSort: {
    name: 'Heap Sort',
    category: 'Sorting',
    difficulty: 'Hard',
    description: 'Heap Sort converts the array into a Max-Heap binary tree, repeatedly extracts the maximum root element to the end of the array, and rebuilds the heap property.',
    howItWorks: 'Builds a max heap in O(n) time. Then repeatedly swaps root with the last unsorted item, shrinks heap range by 1, and calls max-heapify (sift-down) on root in O(log n) time.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    pseudocode: `function heapSort(arr):
    n = length(arr)
    for i from floor(n / 2) - 1 down to 0:
        heapify(arr, n, i)
    for i from n - 1 down to 1:
        swap(arr[0], arr[i])
        heapify(arr, i, 0)`,
    keyConcepts: [
      'Binary heap tree representation in continuous array',
      'Guaranteed O(n log n) worst-case with strictly O(1) space',
      'Max-heap sift-down operations',
    ],
    useCases: [
      'Embedded and mission-critical systems with strict memory and time guarantees',
      'Priority queues and top-K selection',
    ],
  },

  // Graph Traversal
  bfs: {
    name: 'Breadth-First Search (BFS)',
    category: 'Graph Traversal',
    difficulty: 'Medium',
    description: 'BFS explores graph vertices level by level, visiting all immediate neighbors of a node before moving to deeper descendants, utilizing a First-In-First-Out (FIFO) queue.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
    guaranteesShortest: true,
    pseudocode: `function BFS(graph, startNode):
    queue = new Queue()
    visited = new Set()
    visited.add(startNode)
    queue.enqueue(startNode)
    while not queue.isEmpty():
        current = queue.dequeue()
        for neighbor in graph.neighbors(current):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)`,
    keyConcepts: ['FIFO Queue-driven expansion', 'Level-order radial exploration', 'Shortest path in unweighted graphs'],
    useCases: ['Shortest path in unweighted graphs', 'Social networks degrees of separation', 'Web crawlers'],
  },

  dfs: {
    name: 'Depth-First Search (DFS)',
    category: 'Graph Traversal',
    difficulty: 'Medium',
    description: 'DFS traverses a graph by exploring as far as possible along each branch before backtracking, utilizing a Last-In-First-Out (LIFO) stack or call-stack recursion.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
    guaranteesShortest: false,
    pseudocode: `function DFS(graph, startNode):
    stack = [startNode]
    visited = new Set()
    while stack not empty:
        curr = stack.pop()
        if curr not in visited:
            visited.add(curr)
            for neighbor in graph.neighbors(curr):
                if neighbor not in visited:
                    stack.push(neighbor)`,
    keyConcepts: ['LIFO Stack / Recursion', 'Deep branch diving', 'Backtracking & cycle detection'],
    useCases: ['Topological sorting', 'Cycle detection', 'Connected components'],
  },

  // Minimum Spanning Tree (MST)
  kruskal: {
    name: "Kruskal's Algorithm (MST)",
    category: 'Minimum Spanning Tree',
    difficulty: 'Medium',
    description: "Kruskal's Algorithm finds a Minimum Spanning Tree for a connected, weighted graph by sorting all edges by weight and greedily adding the lowest-weight edges that do not create a cycle.",
    howItWorks: 'Uses a Disjoint Set Union (DSU / Union-Find) data structure to maintain connected components. Iterates through sorted edges; if endpoints belong to different sets, adds edge to MST and merges sets.',
    timeComplexity: {
      best: 'O(E log E)',
      average: 'O(E log E)',
      worst: 'O(E log E)',
    },
    spaceComplexity: 'O(V)',
    guaranteesShortest: true,
    pseudocode: `function Kruskal(nodes, edges):
    MST = []
    dsu = new DisjointSet(nodes)
    sort edges by weight ascending
    
    for edge (u, v, weight) in edges:
        if dsu.find(u) != dsu.find(v):
            dsu.union(u, v)
            MST.append(edge)
            if len(MST) == len(nodes) - 1:
                break
    return MST`,
    keyConcepts: [
      'Greedy edge selection by increasing weight',
      'Disjoint-Set Union (DSU) with cycle detection',
      'Optimal for sparse graphs (where E << V²)',
    ],
    useCases: [
      'Network routing and telecommunications cable layout',
      'Circuit design (VLSI wire routing)',
      'Cluster analysis and approximation algorithms (TSP)',
    ],
  },

  prim: {
    name: "Prim's Algorithm (MST)",
    category: 'Minimum Spanning Tree',
    difficulty: 'Medium',
    description: "Prim's Algorithm grows a single Minimum Spanning Tree from an arbitrary starting vertex by repeatedly adding the minimum-weight cut edge connecting the tree to an unvisited vertex.",
    howItWorks: 'Maintains a set of visited vertices. In each step, uses a Priority Queue / min-cut to select the lightest edge crossing from the visited tree to an unvisited vertex, until all vertices are included.',
    timeComplexity: {
      best: 'O(E log V)',
      average: 'O(E log V)',
      worst: 'O(E log V)',
    },
    spaceComplexity: 'O(V)',
    guaranteesShortest: true,
    pseudocode: `function Prim(graph, startNode):
    MST = []
    visited = new Set([startNode])
    pq = new MinPriorityQueue()
    insert all edges from startNode into pq
    
    while not pq.isEmpty() and len(visited) < numNodes:
        (u, v, weight) = pq.extractMin()
        if v not in visited:
            visited.add(v)
            MST.append((u, v, weight))
            for edge (v, w, weight2) in graph.edgesFrom(v):
                if w not in visited:
                    pq.insert(edge)`,
    keyConcepts: [
      'Greedy vertex-growing tree expansion',
      'Priority Queue minimum-cut selection',
      'Optimal for dense graphs with adjacency matrices',
    ],
    useCases: [
      'Power grid electrical line distribution networks',
      'Water pipeline laying optimization',
      'Maze generation algorithms',
    ],
  },

  // Pathfinding
  dijkstra: {
    name: "Dijkstra's Algorithm",
    category: 'Pathfinding',
    difficulty: 'Medium',
    description: 'Dijkstra finds the guaranteed shortest path between nodes in a weighted graph with non-negative edge weights using a greedy priority-based relaxation technique.',
    timeComplexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)',
    },
    spaceComplexity: 'O(V)',
    guaranteesShortest: true,
    pseudocode: `function Dijkstra(grid, start, target):
    distances = {all: Inf, start: 0}
    pq = new PriorityQueue()
    pq.insert(start, 0)
    while not pq.isEmpty():
        curr = pq.extractMin()
        if curr == target: return path
        for neighbor in neighbors(curr):
            alt = distances[curr] + weight(curr, neighbor)
            if alt < distances[neighbor]:
                distances[neighbor] = alt
                pq.insert(neighbor, alt)`,
    keyConcepts: ['Greedy frontier relaxation', 'Optimal shortest path', 'Non-negative weights'],
    useCases: ['GPS navigation & Google Maps', 'Network routing protocols (OSPF)'],
  },

  astar: {
    name: 'A* Search Algorithm',
    category: 'Pathfinding',
    difficulty: 'Hard',
    description: 'A* is an informed best-first search algorithm that finds the shortest path by evaluating nodes based on known path cost g(n) plus an admissible heuristic estimate h(n) to the goal: f(n) = g(n) + h(n).',
    timeComplexity: {
      best: 'O(E)',
      average: 'O(E)',
      worst: 'O(b^d)',
    },
    spaceComplexity: 'O(V)',
    guaranteesShortest: true,
    heuristic: 'Manhattan Distance',
    pseudocode: `function AStar(grid, start, target):
    openSet = new PriorityQueue()
    fScore = {start: h(start, target)}
    while not openSet.isEmpty():
        curr = openSet.extractMin()
        if curr == target: return path
        for neighbor in neighbors(curr):
            tentative_g = g[curr] + cost
            if tentative_g < g[neighbor]:
                f[neighbor] = tentative_g + h(neighbor, target)
                openSet.insert(neighbor, f[neighbor])`,
    keyConcepts: ['Heuristic guidance f = g + h', 'Admissible Manhattan heuristic', 'Targeted search'],
    useCases: ['Game AI character pathfinding', 'Robotics motion planning'],
  },

  // Algorithmic Techniques
  slidingWindow: {
    name: 'Sliding Window Technique',
    category: 'Algorithmic Techniques',
    difficulty: 'Medium',
    description: 'The Sliding Window technique transforms nested O(n²) array iterations into linear O(n) passes by maintaining a window boundary [left, right] that expands and contracts dynamically.',
    howItWorks: 'Instead of recomputing subarray sums from scratch ($O(K)$ per window), the algorithm adds the new right element and subtracts the exiting left element in $O(1)$ constant time.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(1)',
    pseudocode: `function maxSubarraySum(arr, k):
    if len(arr) < k: return null
    windowSum = sum(arr[0..k-1])
    maxSum = windowSum
    
    for right from k to len(arr) - 1:
        left = right - k
        windowSum += arr[right] - arr[left]
        maxSum = max(maxSum, windowSum)
        
    return maxSum`,
    keyConcepts: [
      'Two-pointer window boundaries [left, right]',
      'Incremental state maintenance (add right, remove left)',
      'Linear time complexity O(n)',
    ],
    useCases: [
      'Maximum / Minimum sum subarray of fixed size K',
      'Longest substring with K distinct characters',
      'Real-time network packet throughput and sliding rate limiters',
    ],
  },

  // Data Structures
  stack: {
    name: 'Stack (LIFO)',
    category: 'Data Structures',
    difficulty: 'Easy',
    description: 'A Stack is a linear data structure adhering to the Last-In-First-Out (LIFO) principle, where insertions and deletions happen exclusively at one end called the Top.',
    timeComplexity: { push: 'O(1)', pop: 'O(1)', peek: 'O(1)', search: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudocode: `class Stack:
    push(item): elements.append(item)
    pop(): return elements.pop()
    peek(): return elements[top]`,
    keyConcepts: ['LIFO order', 'Constant time top operations', 'Stack overflow & underflow'],
    useCases: ['Function call stack', 'Undo/Redo operations', 'Expression evaluation'],
  },

  queue: {
    name: 'Queue (FIFO)',
    category: 'Data Structures',
    difficulty: 'Easy',
    description: 'A Queue is a linear data structure adhering to the First-In-First-Out (FIFO) principle, where elements are inserted at the Rear and removed from the Front.',
    timeComplexity: { enqueue: 'O(1)', dequeue: 'O(1)', peek: 'O(1)', search: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudocode: `class Queue:
    enqueue(item): elements.append(item)
    dequeue(): return elements.removeFirst()
    peek(): return elements[front]`,
    keyConcepts: ['FIFO order', 'Front & Rear pointer synchronization', 'Buffering'],
    useCases: ['Task scheduling', 'BFS traversal', 'Message queues'],
  },

  linkedList: {
    name: 'Singly Linked List',
    category: 'Data Structures',
    difficulty: 'Medium',
    description: 'A Linked List is a linear dynamic data structure composed of nodes, each storing a value and a reference pointer to the subsequent node in sequence.',
    timeComplexity: { insertHead: 'O(1)', insertTail: 'O(n)', delete: 'O(n)', search: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudocode: `class Node: value, next = null
class LinkedList:
    insertHead(val): node.next = head; head = node`,
    keyConcepts: ['Dynamic heap allocation', 'Pointer manipulation', 'Sequential traversal'],
    useCases: ['Stack/Queue backbones', 'Symbol tables', 'Dynamic memory lists'],
  },

  binarySearchTree: {
    name: 'Binary Search Tree (BST)',
    category: 'Data Structures',
    difficulty: 'Medium',
    description: 'A Binary Search Tree is a hierarchical node-based binary tree data structure where all keys in the left subtree are smaller than the node, and all keys in the right subtree are greater.',
    timeComplexity: { insert: 'O(log n) avg', search: 'O(log n) avg', delete: 'O(log n) avg' },
    spaceComplexity: 'O(n)',
    pseudocode: `function insert(root, key):
    if not root: return Node(key)
    if key < root.val: root.left = insert(root.left, key)
    else: root.right = insert(root.right, key)
    return root`,
    keyConcepts: ['Left < Root < Right', 'Inorder yields sorted elements', 'Logarithmic search'],
    useCases: ['Dynamic dictionary lookups', 'Ordered sets', 'Syntax trees'],
  },

  hashTable: {
    name: 'Hash Table',
    category: 'Data Structures',
    difficulty: 'Medium',
    description: 'A Hash Table maps keys to values using a hash function to calculate an index into an array of buckets, achieving average O(1) constant time lookups and insertions.',
    howItWorks: 'Computes index via hash function h(k) = k mod M. Collisions are resolved using Separate Chaining (linked lists at each bucket) or Open Addressing (Linear Probing to find next open slot).',
    timeComplexity: {
      insert: 'O(1) avg / O(n) worst',
      search: 'O(1) avg / O(n) worst',
      delete: 'O(1) avg / O(n) worst',
    },
    spaceComplexity: 'O(n)',
    pseudocode: `class HashTable:
    buckets = array of size M
    hash(key): return key % M
    
    insert(key, value):
        index = hash(key)
        buckets[index].append((key, value))
        
    search(key):
        index = hash(key)
        for (k, v) in buckets[index]:
            if k == key: return v
        return null`,
    keyConcepts: [
      'Hash Function: h(k) = k % TableSize',
      'Collision Resolution: Separate Chaining & Linear Probing',
      'Load Factor α = n / M',
    ],
    useCases: [
      'Database indexing & caching layers (Redis, Memcached)',
      'Associative arrays, Maps, and Sets in programming languages',
      'Cryptographic checksums and symbol tables in compilers',
    ],
  },
};
