export const csharpCodeTemplates = {
  bubbleSort: () => `using System;

class Program {
    static void BubbleSort(int[] arr) {
        int n = arr.Length;
        for (int i = 0; i < n - 1; i++) {
            bool swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    static void Main() {
        Console.Write("Enter the number of elements: ");
        int n = int.Parse(Console.ReadLine());
        int[] arr = new int[n];
        Console.WriteLine("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            arr[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine("\\nOriginal array:");
        Console.WriteLine(string.Join(", ", arr));
        BubbleSort(arr);
        Console.WriteLine("\\nSorted array:");
        Console.WriteLine(string.Join(", ", arr));
    }
}`,

  selectionSort: () => `using System;

class Program {
    static void SelectionSort(int[] arr) {
        int n = arr.Length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            if (minIdx != i) {
                int temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
            }
        }
    }

    static void Main() {
        Console.Write("Enter the number of elements: ");
        int n = int.Parse(Console.ReadLine());
        int[] arr = new int[n];
        Console.WriteLine("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            arr[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine("\\nOriginal array:");
        Console.WriteLine(string.Join(", ", arr));
        SelectionSort(arr);
        Console.WriteLine("\\nSorted array:");
        Console.WriteLine(string.Join(", ", arr));
    }
}`,

  insertionSort: () => `using System;

class Program {
    static void InsertionSort(int[] arr) {
        for (int i = 1; i < arr.Length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    static void Main() {
        Console.Write("Enter the number of elements: ");
        int n = int.Parse(Console.ReadLine());
        int[] arr = new int[n];
        Console.WriteLine("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            arr[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine("\\nOriginal array:");
        Console.WriteLine(string.Join(", ", arr));
        InsertionSort(arr);
        Console.WriteLine("\\nSorted array:");
        Console.WriteLine(string.Join(", ", arr));
    }
}`,

  mergeSort: () => `using System;

class Program {
    static void MergeSort(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        MergeSort(arr, left, mid);
        MergeSort(arr, mid + 1, right);
        Merge(arr, left, mid, right);
    }

    static void Merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1, n2 = right - mid;
        int[] L = new int[n1];
        int[] R = new int[n2];
        Array.Copy(arr, left, L, 0, n1);
        Array.Copy(arr, mid + 1, R, 0, n2);

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    static void Main() {
        Console.Write("Enter the number of elements: ");
        int n = int.Parse(Console.ReadLine());
        int[] arr = new int[n];
        Console.WriteLine("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            arr[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine("\\nOriginal array:");
        Console.WriteLine(string.Join(", ", arr));
        MergeSort(arr, 0, arr.Length - 1);
        Console.WriteLine("\\nSorted array:");
        Console.WriteLine(string.Join(", ", arr));
    }
}`,

  quickSort: () => `using System;

class Program {
    static int Partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp1 = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp1;
        return i + 1;
    }

    static void QuickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = Partition(arr, low, high);
            QuickSort(arr, low, pi - 1);
            QuickSort(arr, pi + 1, high);
        }
    }

    static void Main() {
        Console.Write("Enter the number of elements: ");
        int n = int.Parse(Console.ReadLine());
        int[] arr = new int[n];
        Console.WriteLine("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            arr[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine("\\nOriginal array:");
        Console.WriteLine(string.Join(", ", arr));
        QuickSort(arr, 0, arr.Length - 1);
        Console.WriteLine("\\nSorted array:");
        Console.WriteLine(string.Join(", ", arr));
    }
}`,

  heapSort: () => `using System;

class Program {
    static void Heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1, right = 2 * i + 2;
        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            Heapify(arr, n, largest);
        }
    }

    static void HeapSort(int[] arr) {
        int n = arr.Length;
        for (int i = n / 2 - 1; i >= 0; i--) Heapify(arr, n, i);
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            Heapify(arr, i, 0);
        }
    }

    static void Main() {
        Console.Write("Enter the number of elements: ");
        int n = int.Parse(Console.ReadLine());
        int[] arr = new int[n];
        Console.WriteLine("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            arr[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine("\\nOriginal array:");
        Console.WriteLine(string.Join(", ", arr));
        HeapSort(arr);
        Console.WriteLine("\\nSorted array:");
        Console.WriteLine(string.Join(", ", arr));
    }
}`,

  stack: () => `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Stack<int> stack = new Stack<int>();
        
        Console.Write("Enter the number of elements: ");
        int n = int.Parse(Console.ReadLine());
        
        Console.WriteLine("Enter " + n + " elements to push:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            int value = int.Parse(Console.ReadLine());
            stack.Push(value);
            Console.WriteLine("Pushed " + value);
        }
        
        Console.WriteLine("\\nStack (top to bottom): " + string.Join(", ", stack));
        
        Console.WriteLine("\\nPopping " + n + " elements:");
        while (stack.Count > 0) {
            Console.WriteLine("Popped " + stack.Pop());
        }
    }
}`,

  queue: () => `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Queue<int> queue = new Queue<int>();
        
        Console.Write("Enter the number of elements: ");
        int n = int.Parse(Console.ReadLine());
        
        Console.WriteLine("Enter " + n + " elements to enqueue:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            int value = int.Parse(Console.ReadLine());
            queue.Enqueue(value);
            Console.WriteLine("Enqueued " + value);
        }
        
        Console.WriteLine("\\nQueue (front to back): " + string.Join(", ", queue));
        
        Console.WriteLine("\\nDequeuing " + n + " elements:");
        while (queue.Count > 0) {
            Console.WriteLine("Dequeued " + queue.Dequeue());
        }
    }
}`,

  linkedList: () => `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        LinkedList<int> ll = new LinkedList<int>();
        
        Console.Write("Enter the number of elements: ");
        int n = int.Parse(Console.ReadLine());
        
        Console.WriteLine("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            int value = int.Parse(Console.ReadLine());
            ll.AddLast(value);
            Console.WriteLine("Inserted " + value);
        }
        
        Console.WriteLine("\\nLinkedList: " + string.Join(" -> ", ll) + " -> null");
    }
}`,

  binarySearchTree: () => `using System;
using System.Collections.Generic;

class TreeNode {
    public int value;
    public TreeNode left, right;
    public TreeNode(int v) { value = v; }
}

class BST {
    private TreeNode root;
    
    public void Insert(int value) {
        root = InsertRec(root, value);
        Console.WriteLine("Inserted " + value);
    }
    
    private TreeNode InsertRec(TreeNode node, int value) {
        if (node == null) return new TreeNode(value);
        if (value < node.value) {
            node.left = InsertRec(node.left, value);
        } else {
            node.right = InsertRec(node.right, value);
        }
        return node;
    }
    
    public void Inorder() {
        Console.Write("Inorder: ");
        InorderRec(root);
        Console.WriteLine();
    }
    
    private void InorderRec(TreeNode node) {
        if (node != null) {
            InorderRec(node.left);
            Console.Write(node.value + " ");
            InorderRec(node.right);
        }
    }
}

class Program {
    static void Main() {
        Console.Write("Enter the number of elements: ");
        int n = int.Parse(Console.ReadLine());
        BST bst = new BST();
        
        Console.WriteLine("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            bst.Insert(int.Parse(Console.ReadLine()));
        }
        
        bst.Inorder();
    }
}`,

  hashTable: () => `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Dictionary<string, int> ht = new Dictionary<string, int>();
        
        Console.Write("Enter the number of key-value pairs: ");
        int n = int.Parse(Console.ReadLine());
        
        Console.WriteLine("Enter " + n + " key-value pairs (format: key value):");
        for (int i = 0; i < n; i++) {
            string[] parts = Console.ReadLine().Split(' ');
            string key = parts[0];
            int value = int.Parse(parts[1]);
            ht[key] = value;
            Console.WriteLine("Inserted key=" + key + ", value=" + value);
        }
        
        Console.WriteLine("\\nHash Table:");
        foreach (var pair in ht) {
            Console.WriteLine(pair.Key + " -> " + pair.Value);
        }
        
        Console.Write("Enter a key to lookup: ");
        string lookupKey = Console.ReadLine();
        if (ht.ContainsKey(lookupKey)) {
            Console.WriteLine("Found: key=" + lookupKey + ", value=" + ht[lookupKey]);
        } else {
            Console.WriteLine("Key not found");
        }
    }
}`,

  bfs: () => `using System;
using System.Collections.Generic;

class Program {
    static List<int> BFS(List<int>[] graph, int start) {
        List<int> traversal = new List<int>();
        bool[] visited = new bool[graph.Length];
        Queue<int> q = new Queue<int>();
        
        q.Enqueue(start);
        visited[start] = true;
        
        while (q.Count > 0) {
            int node = q.Dequeue();
            traversal.Add(node);
            foreach (int neighbor in graph[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.Enqueue(neighbor);
                }
            }
        }
        return traversal;
    }
    
    static void Main() {
        Console.Write("Number of nodes: ");
        int n = int.Parse(Console.ReadLine());
        List<int>[] graph = new List<int>[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new List<int>();
        }
        
        Console.WriteLine("Enter adjacency list for each node (space-separated neighbors):");
        for (int i = 0; i < n; i++) {
            string[] neighbors = Console.ReadLine().Split(' ');
            foreach (string neighbor in neighbors) {
                if (!string.IsNullOrEmpty(neighbor)) {
                    graph[i].Add(int.Parse(neighbor));
                }
            }
        }
        
        Console.Write("Enter starting node: ");
        int start = int.Parse(Console.ReadLine());
        List<int> result = BFS(graph, start);
        
        Console.WriteLine("\\nBFS Traversal: " + string.Join(", ", result));
    }
}`,

  dfs: () => `using System;
using System.Collections.Generic;

class Program {
    static void DFS(List<int>[] graph, int node, bool[] visited, List<int> traversal) {
        visited[node] = true;
        traversal.Add(node);
        foreach (int neighbor in graph[node]) {
            if (!visited[neighbor]) {
                DFS(graph, neighbor, visited, traversal);
            }
        }
    }
    
    static void Main() {
        Console.Write("Number of nodes: ");
        int n = int.Parse(Console.ReadLine());
        List<int>[] graph = new List<int>[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new List<int>();
        }
        
        Console.WriteLine("Enter adjacency list for each node (space-separated neighbors):");
        for (int i = 0; i < n; i++) {
            string[] neighbors = Console.ReadLine().Split(' ');
            foreach (string neighbor in neighbors) {
                if (!string.IsNullOrEmpty(neighbor)) {
                    graph[i].Add(int.Parse(neighbor));
                }
            }
        }
        
        Console.Write("Enter starting node: ");
        int start = int.Parse(Console.ReadLine());
        
        List<int> traversal = new List<int>();
        bool[] visited = new bool[n];
        DFS(graph, start, visited, traversal);
        
        Console.WriteLine("\\nDFS Traversal: " + string.Join(", ", traversal));
    }
}`,

  dijkstra: () => `using System;
using System.Collections.Generic;

class Program {
    static int[] Dijkstra(List<(int, int)>[] graph, int start, int n) {
        int[] dist = new int[n];
        bool[] visited = new bool[n];
        for (int i = 0; i < n; i++) dist[i] = int.MaxValue;
        dist[start] = 0;
        
        for (int i = 0; i < n; i++) {
            int u = -1;
            for (int j = 0; j < n; j++) {
                if (!visited[j] && (u == -1 || dist[j] < dist[u])) u = j;
            }
            visited[u] = true;
            foreach (var (v, w) in graph[u]) {
                if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
            }
        }
        return dist;
    }
    
    static void Main() {
        Console.Write("Number of nodes: ");
        int n = int.Parse(Console.ReadLine());
        Console.Write("Number of edges: ");
        int m = int.Parse(Console.ReadLine());
        
        List<(int, int)>[] graph = new List<(int, int)>[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new List<(int, int)>();
        }
        
        Console.WriteLine("Enter edges (src dst weight):");
        for (int i = 0; i < m; i++) {
            string[] parts = Console.ReadLine().Split(' ');
            int src = int.Parse(parts[0]);
            int dst = int.Parse(parts[1]);
            int weight = int.Parse(parts[2]);
            graph[src].Add((dst, weight));
        }
        
        Console.Write("Enter starting node: ");
        int start = int.Parse(Console.ReadLine());
        int[] distances = Dijkstra(graph, start, n);
        
        Console.WriteLine("\\nShortest distances from " + start + ":");
        for (int i = 0; i < n; i++) {
            Console.WriteLine("To " + i + ": " + (distances[i] == int.MaxValue ? "INF" : distances[i].ToString()));
        }
    }
}`,

  slidingWindow: () => `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static int[] SlidingWindowMax(int[] arr, int k) {
        if (k > arr.Length) return new int[0];
        int[] result = new int[arr.Length - k + 1];
        for (int i = 0; i <= arr.Length - k; i++) {
            result[i] = 0;
            for (int j = i; j < i + k; j++) {
                result[i] = Math.Max(result[i], arr[j]);
            }
        }
        return result;
    }
    
    static void Main() {
        Console.Write("Enter array size: ");
        int n = int.Parse(Console.ReadLine());
        int[] arr = new int[n];
        
        Console.WriteLine("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            Console.Write("Element " + (i + 1) + ": ");
            arr[i] = int.Parse(Console.ReadLine());
        }
        
        Console.Write("Enter window size: ");
        int k = int.Parse(Console.ReadLine());
        int[] result = SlidingWindowMax(arr, k);
        
        Console.WriteLine("\\nOriginal array: " + string.Join(", ", arr));
        Console.WriteLine("Window size: " + k);
        Console.WriteLine("Maximum in each window: " + string.Join(", ", result));
    }
}`,

  kruskal: () => `using System;
using System.Collections.Generic;
using System.Linq;

class Edge : IComparable<Edge> {
    public int u, v, weight;
    public Edge(int u, int v, int w) { this.u = u; this.v = v; weight = w; }
    public int CompareTo(Edge other) { return weight - other.weight; }
}

class UnionFind {
    int[] parent;
    public UnionFind(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }
    public int Find(int x) { if (parent[x] != x) parent[x] = Find(parent[x]); return parent[x]; }
    public bool Unite(int x, int y) {
        int px = Find(x), py = Find(y);
        if (px == py) return false;
        parent[px] = py;
        return true;
    }
}

class Program {
    static void Main() {
        Console.Write("Number of nodes: ");
        int n = int.Parse(Console.ReadLine());
        Console.Write("Number of edges: ");
        int m = int.Parse(Console.ReadLine());
        
        List<Edge> edges = new List<Edge>();
        Console.WriteLine("Enter edges (u v weight):");
        for (int i = 0; i < m; i++) {
            string[] parts = Console.ReadLine().Split(' ');
            edges.Add(new Edge(int.Parse(parts[0]), int.Parse(parts[1]), int.Parse(parts[2])));
        }
        
        edges.Sort();
        UnionFind uf = new UnionFind(n);
        List<Edge> mst = new List<Edge>();
        int totalWeight = 0;
        
        foreach (Edge e in edges) {
            if (uf.Unite(e.u, e.v)) {
                mst.Add(e);
                totalWeight += e.weight;
            }
        }
        
        Console.WriteLine("\\nMinimum Spanning Tree:");
        foreach (Edge e in mst) {
            Console.WriteLine("(" + e.u + ", " + e.v + ") weight: " + e.weight);
        }
        Console.WriteLine("Total weight: " + totalWeight);
    }
}`,

  prims: () => `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Console.Write("Number of nodes: ");
        int n = int.Parse(Console.ReadLine());
        Console.Write("Number of edges: ");
        int m = int.Parse(Console.ReadLine());
        
        List<(int, int)>[] adj = new List<(int, int)>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<(int, int)>();
        }
        
        Console.WriteLine("Enter edges (u v weight):");
        for (int i = 0; i < m; i++) {
            string[] parts = Console.ReadLine().Split(' ');
            int u = int.Parse(parts[0]);
            int v = int.Parse(parts[1]);
            int w = int.Parse(parts[2]);
            adj[u].Add((v, w));
            adj[v].Add((u, w));
        }
        
        bool[] visited = new bool[n];
        List<(int, int)> mst = new List<(int, int)>();
        int totalWeight = 0;
        visited[0] = true;
        
        for (int i = 1; i < n; i++) {
            int minWeight = int.MaxValue, u = -1, v = -1;
            for (int j = 0; j < n; j++) {
                if (visited[j]) {
                    foreach (var (neighbor, w) in adj[j]) {
                        if (!visited[neighbor] && w < minWeight) {
                            minWeight = w;
                            u = j;
                            v = neighbor;
                        }
                    }
                }
            }
            visited[v] = true;
            mst.Add((u, v));
            totalWeight += minWeight;
        }
        
        Console.WriteLine("\\nMinimum Spanning Tree:");
        foreach (var (u, v) in mst) {
            Console.WriteLine("(" + u + ", " + v + ")");
        }
        Console.WriteLine("Total weight: " + totalWeight);
    }
}`,

  astar: () => `using System;

class Program {
    static void Main() {
        Console.Write("Enter grid rows: ");
        int rows = int.Parse(Console.ReadLine());
        Console.Write("Enter grid columns: ");
        int cols = int.Parse(Console.ReadLine());
        
        int[,] grid = new int[rows, cols];
        Console.WriteLine("Enter grid (0=walkable, 1=obstacle):");
        for (int i = 0; i < rows; i++) {
            string[] line = Console.ReadLine().Split(' ');
            for (int j = 0; j < cols; j++) {
                grid[i, j] = int.Parse(line[j]);
            }
        }
        
        Console.Write("Enter start position (x y): ");
        string[] start = Console.ReadLine().Split(' ');
        int startX = int.Parse(start[0]), startY = int.Parse(start[1]);
        
        Console.Write("Enter goal position (x y): ");
        string[] goal = Console.ReadLine().Split(' ');
        int goalX = int.Parse(goal[0]), goalY = int.Parse(goal[1]);
        
        Console.WriteLine("\\nA* Algorithm would find path from (" + startX + ", " + startY + 
                         ") to (" + goalX + ", " + goalY + ")");
        Console.WriteLine("(Implementation details omitted for brevity)");
    }
}`
};

export default csharpCodeTemplates;
