export const javascriptCodeTemplates = {
  bubbleSort: () => `const readline = require('readline');

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of elements: ', (n) => {
  const count = parseInt(n);
  const arr = [];
  let index = 0;

  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        arr.push(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      console.log('\\nOriginal array:');
      console.log(arr);

      bubbleSort(arr);

      console.log('\\nSorted array:');
      console.log(arr);
      rl.close();
    }
  };

  askForElement();
});`,

  selectionSort: () => `const readline = require('readline');

function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of elements: ', (n) => {
  const count = parseInt(n);
  const arr = [];
  let index = 0;

  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        arr.push(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      console.log('\\nOriginal array:');
      console.log(arr);

      selectionSort(arr);

      console.log('\\nSorted array:');
      console.log(arr);
      rl.close();
    }
  };

  askForElement();
  askForElement();
});`,

  insertionSort: () => `const readline = require('readline');

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of elements: ', (n) => {
  const count = parseInt(n);
  const arr = [];
  let index = 0;

  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        arr.push(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      console.log('\\nOriginal array:');
      console.log(arr);

      insertionSort(arr);

      console.log('\\nSorted array:');
      console.log(arr);
      rl.close();
    }
  };

  askForElement();
});`,

  mergeSort: () => `const readline = require('readline');

function merge(arr, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  const L = arr.slice(left, mid + 1);
  const R = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

function mergeSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
  return arr;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of elements: ', (n) => {
  const count = parseInt(n);
  const arr = [];
  let index = 0;

  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        arr.push(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      console.log('\\nOriginal array:');
      console.log(arr);

      mergeSort(arr);

      console.log('\\nSorted array:');
      console.log(arr);
      rl.close();
    }
  };

  askForElement();
});`,

  quickSort: () => `const readline = require('readline');

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of elements: ', (n) => {
  const count = parseInt(n);
  const arr = [];
  let index = 0;

  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        arr.push(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      console.log('\\nOriginal array:');
      console.log(arr);

      quickSort(arr);

      console.log('\\nSorted array:');
      console.log(arr);
      rl.close();
    }
  };

  askForElement();
});`,

  heapSort: () => `const readline = require('readline');

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of elements: ', (n) => {
  const count = parseInt(n);
  const arr = [];
  let index = 0;

  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        arr.push(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      console.log('\\nOriginal array:');
      console.log(arr);

      heapSort(arr);

      console.log('\\nSorted array:');
      console.log(arr);
      rl.close();
    }
  };

  askForElement();
});`,

  stack: () => `const readline = require('readline');

class Stack {
  constructor() {
    this.items = [];
  }
  
  push(value) {
    this.items.push(value);
    console.log(\`Pushed \${value}\`);
  }
  
  pop() {
    if (this.items.length > 0) {
      console.log(\`Popped \${this.items.pop()}\`);
    } else {
      console.log('Stack is empty');
    }
  }
  
  display() {
    console.log('Stack: ' + this.items.reverse().join(', '));
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of elements: ', (n) => {
  const count = parseInt(n);
  const stack = new Stack();
  let index = 0;
  
  console.log(\`Enter \${count} elements to push:\`);
  
  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        stack.push(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      stack.display();
      console.log(\`\\nPopping \${count} elements:\`);
      for (let i = 0; i < count; i++) {
        stack.pop();
      }
      stack.display();
      rl.close();
    }
  };
  
  askForElement();
});`,

  queue: () => `const readline = require('readline');

class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(value) {
    this.items.push(value);
    console.log(\`Enqueued \${value}\`);
  }
  
  dequeue() {
    if (this.items.length > 0) {
      console.log(\`Dequeued \${this.items.shift()}\`);
    } else {
      console.log('Queue is empty');
    }
  }
  
  display() {
    console.log('Queue: ' + this.items.join(', '));
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of elements: ', (n) => {
  const count = parseInt(n);
  const queue = new Queue();
  let index = 0;
  
  console.log(\`Enter \${count} elements to enqueue:\`);
  
  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        queue.enqueue(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      queue.display();
      console.log(\`\\nDequeuing \${count} elements:\`);
      for (let i = 0; i < count; i++) {
        queue.dequeue();
      }
      queue.display();
      rl.close();
    }
  };
  
  askForElement();
});`,

  linkedList: () => `const readline = require('readline');

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  insert(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = newNode;
    }
    console.log(\`Inserted \${value}\`);
  }
  
  display() {
    let result = '';
    let curr = this.head;
    while (curr) {
      result += curr.value + ' -> ';
      curr = curr.next;
    }
    result += 'null';
    console.log('LinkedList: ' + result);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of elements: ', (n) => {
  const count = parseInt(n);
  const ll = new LinkedList();
  let index = 0;
  
  console.log(\`Enter \${count} elements:\`);
  
  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        ll.insert(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      ll.display();
      rl.close();
    }
  };
  
  askForElement();
});`,

  binarySearchTree: () => `const readline = require('readline');

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    this.root = this._insertRec(this.root, value);
    console.log(\`Inserted \${value}\`);
  }
  
  _insertRec(node, value) {
    if (!node) return new TreeNode(value);
    if (value < node.value) {
      node.left = this._insertRec(node.left, value);
    } else {
      node.right = this._insertRec(node.right, value);
    }
    return node;
  }
  
  inorder() {
    const result = [];
    this._inorderRec(this.root, result);
    console.log('Inorder: ' + result.join(' '));
  }
  
  _inorderRec(node, result) {
    if (node) {
      this._inorderRec(node.left, result);
      result.push(node.value);
      this._inorderRec(node.right, result);
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of elements: ', (n) => {
  const count = parseInt(n);
  const bst = new BST();
  let index = 0;
  
  console.log(\`Enter \${count} elements:\`);
  
  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        bst.insert(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      bst.inorder();
      rl.close();
    }
  };
  
  askForElement();
});`,

  hashTable: () => `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of key-value pairs: ', (n) => {
  const count = parseInt(n);
  const hashtable = {};
  let index = 0;
  
  console.log(\`Enter \${count} key-value pairs (format: key value):\`);
  
  const askForPair = () => {
    if (index < count) {
      rl.question(\`Pair \${index + 1}: \`, (line) => {
        const [key, value] = line.split(' ');
        hashtable[key] = parseInt(value);
        console.log(\`Inserted key=\${key}, value=\${value}\`);
        index++;
        askForPair();
      });
    } else {
      console.log('\\nHash Table:', hashtable);
      
      rl.question('Enter a key to lookup: ', (key) => {
        if (key in hashtable) {
          console.log(\`Found: key=\${key}, value=\${hashtable[key]}\`);
        } else {
          console.log(\`Key \${key} not found\`);
        }
        rl.close();
      });
    }
  };
  
  askForPair();
});`,

  bfs: () => `const readline = require('readline');

function bfs(graph, start, n) {
  const visited = new Array(n).fill(false);
  const queue = [start];
  const traversal = [];
  visited[start] = true;
  
  while (queue.length > 0) {
    const node = queue.shift();
    traversal.push(node);
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
  return traversal;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Number of nodes: ', (n) => {
  const nodeCount = parseInt(n);
  const graph = {};
  let nodeIndex = 0;
  
  console.log('Enter adjacency list for each node (space-separated neighbors):');
  
  const askForNode = () => {
    if (nodeIndex < nodeCount) {
      rl.question(\`Neighbors of node \${nodeIndex}: \`, (line) => {
        graph[nodeIndex] = line.split(' ').filter(x => x).map(Number);
        nodeIndex++;
        askForNode();
      });
    } else {
      rl.question('Enter starting node: ', (start) => {
        const startNode = parseInt(start);
        const result = bfs(graph, startNode, nodeCount);
        console.log('\\nBFS Traversal:', result);
        rl.close();
      });
    }
  };
  
  askForNode();
});`,

  dfs: () => `const readline = require('readline');

function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  const traversal = [node];
  
  for (const neighbor of (graph[node] || [])) {
    if (!visited.has(neighbor)) {
      traversal.push(...dfs(graph, neighbor, visited));
    }
  }
  
  return traversal;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Number of nodes: ', (n) => {
  const nodeCount = parseInt(n);
  const graph = {};
  let nodeIndex = 0;
  
  console.log('Enter adjacency list for each node (space-separated neighbors):');
  
  const askForNode = () => {
    if (nodeIndex < nodeCount) {
      rl.question(\`Neighbors of node \${nodeIndex}: \`, (line) => {
        graph[nodeIndex] = line.split(' ').filter(x => x).map(Number);
        nodeIndex++;
        askForNode();
      });
    } else {
      rl.question('Enter starting node: ', (start) => {
        const startNode = parseInt(start);
        const result = dfs(graph, startNode);
        console.log('\\nDFS Traversal:', result);
        rl.close();
      });
    }
  };
  
  askForNode();
});`,

  dijkstra: () => `const readline = require('readline');

function dijkstra(graph, start, n) {
  const dist = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);
  dist[start] = 0;
  
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
    }
    visited[u] = true;
    
    for (const [v, w] of graph[u] || []) {
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    }
  }
  
  return dist;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Number of nodes: ', (n) => {
  const nodeCount = parseInt(n);
  rl.question('Number of edges: ', (m) => {
    const edgeCount = parseInt(m);
    const graph = {};
    let edgeIndex = 0;
    
    console.log('Enter edges (src dst weight):');
    
    const askForEdge = () => {
      if (edgeIndex < edgeCount) {
        rl.question(\`Edge \${edgeIndex + 1}: \`, (line) => {
          const [src, dst, w] = line.split(' ').map(Number);
          if (!graph[src]) graph[src] = [];
          graph[src].push([dst, w]);
          edgeIndex++;
          askForEdge();
        });
      } else {
        rl.question('Enter starting node: ', (start) => {
          const startNode = parseInt(start);
          const distances = dijkstra(graph, startNode, nodeCount);
          console.log(\`\\nShortest distances from \${startNode}:\`);
          for (let i = 0; i < nodeCount; i++) {
            console.log(\`To \${i}: \${distances[i] === Infinity ? 'INF' : distances[i]}\`);
          }
          rl.close();
        });
      }
    };
    
    askForEdge();
  });
});`,

  slidingWindow: () => `const readline = require('readline');

function slidingWindowMax(arr, k) {
  if (k > arr.length) return [];
  const result = [];
  for (let i = 0; i <= arr.length - k; i++) {
    const max = Math.max(...arr.slice(i, i + k));
    result.push(max);
  }
  return result;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter array size: ', (n) => {
  const count = parseInt(n);
  const arr = [];
  let index = 0;
  
  console.log(\`Enter \${count} elements:\`);
  
  const askForElement = () => {
    if (index < count) {
      rl.question(\`Element \${index + 1}: \`, (value) => {
        arr.push(parseInt(value));
        index++;
        askForElement();
      });
    } else {
      rl.question('Enter window size: ', (k) => {
        const result = slidingWindowMax(arr, parseInt(k));
        console.log('\\nOriginal array:', arr);
        console.log('Window size:', k);
        console.log('Maximum in each window:', result);
        rl.close();
      });
    }
  };
  
  askForElement();
});`,

  kruskal: () => `const readline = require('readline');

class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const px = this.find(x), py = this.find(y);
    if (px === py) return false;
    this.parent[px] = py;
    return true;
  }
}

function kruskal(n, edges) {
  edges.sort((a, b) => a[2] - b[2]);
  const uf = new UnionFind(n);
  const mst = [];
  let totalWeight = 0;
  
  for (const [u, v, w] of edges) {
    if (uf.union(u, v)) {
      mst.push([u, v, w]);
      totalWeight += w;
    }
  }
  
  return [mst, totalWeight];
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Number of nodes: ', (n) => {
  const nodeCount = parseInt(n);
  rl.question('Number of edges: ', (m) => {
    const edgeCount = parseInt(m);
    const edges = [];
    let edgeIndex = 0;
    
    console.log('Enter edges (u v weight):');
    
    const askForEdge = () => {
      if (edgeIndex < edgeCount) {
        rl.question(\`Edge \${edgeIndex + 1}: \`, (line) => {
          const [u, v, w] = line.split(' ').map(Number);
          edges.push([u, v, w]);
          edgeIndex++;
          askForEdge();
        });
      } else {
        const [mst, totalWeight] = kruskal(nodeCount, edges);
        console.log('\\nMinimum Spanning Tree:');
        for (const [u, v, w] of mst) {
          console.log(\`(\${u}, \${v}) weight: \${w}\`);
        }
        console.log('Total weight:', totalWeight);
        rl.close();
      }
    };
    
    askForEdge();
  });
});`,

  prims: () => `const readline = require('readline');

function prims(graph, n) {
  const visited = new Array(n).fill(false);
  const mst = [];
  let totalWeight = 0;
  visited[0] = true;
  
  for (let i = 1; i < n; i++) {
    let minWeight = Infinity, u = -1, v = -1;
    for (let j = 0; j < n; j++) {
      if (visited[j]) {
        for (const [neighbor, w] of graph[j] || []) {
          if (!visited[neighbor] && w < minWeight) {
            minWeight = w;
            u = j;
            v = neighbor;
          }
        }
      }
    }
    visited[v] = true;
    mst.push([u, v]);
    totalWeight += minWeight;
  }
  
  return [mst, totalWeight];
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Number of nodes: ', (n) => {
  const nodeCount = parseInt(n);
  rl.question('Number of edges: ', (m) => {
    const edgeCount = parseInt(m);
    const graph = {};
    let edgeIndex = 0;
    
    console.log('Enter edges (u v weight):');
    
    const askForEdge = () => {
      if (edgeIndex < edgeCount) {
        rl.question(\`Edge \${edgeIndex + 1}: \`, (line) => {
          const [u, v, w] = line.split(' ').map(Number);
          if (!graph[u]) graph[u] = [];
          if (!graph[v]) graph[v] = [];
          graph[u].push([v, w]);
          graph[v].push([u, w]);
          edgeIndex++;
          askForEdge();
        });
      } else {
        const [mst, totalWeight] = prims(graph, nodeCount);
        console.log('\\nMinimum Spanning Tree:');
        for (const [u, v] of mst) {
          console.log(\`(\${u}, \${v})\`);
        }
        console.log('Total weight:', totalWeight);
        rl.close();
      }
    };
    
    askForEdge();
  });
});`,

  astar: () => `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter grid rows: ', (rows) => {
  rl.question('Enter grid columns: ', (cols) => {
    const rowCount = parseInt(rows);
    const colCount = parseInt(cols);
    console.log(\`Enter \${rowCount} rows of \${colCount} values (0=walkable, 1=obstacle):\`);
    
    const grid = [];
    let rowIndex = 0;
    
    const askForRow = () => {
      if (rowIndex < rowCount) {
        rl.question(\`Row \${rowIndex + 1}: \`, (line) => {
          grid.push(line.split(' ').map(Number));
          rowIndex++;
          askForRow();
        });
      } else {
        rl.question('Enter start position (x y): ', (start) => {
          const [startX, startY] = start.split(' ').map(Number);
          rl.question('Enter goal position (x y): ', (goal) => {
            const [goalX, goalY] = goal.split(' ').map(Number);
            console.log(\`\\nA* Algorithm would find path from (\${startX}, \${startY}) to (\${goalX}, \${goalY})\`);
            console.log('(Implementation details omitted for brevity)');
            rl.close();
          });
        });
      }
    };
    
    askForRow();
  });
});`
};

export default javascriptCodeTemplates;
