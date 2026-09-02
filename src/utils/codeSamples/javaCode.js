export const javaCodeTemplates = {
  bubbleSort: () => `import java.util.Arrays;
import java.util.Scanner;

public class BubbleSort {

    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
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

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();

        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("\\nOriginal array:");
        System.out.println(Arrays.toString(arr));

        bubbleSort(arr);

        System.out.println("\\nSorted array:");
        System.out.println(Arrays.toString(arr));

        sc.close();
    }
}`,

  selectionSort: () => `import java.util.Arrays;
import java.util.Scanner;

public class SelectionSort {

    static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                int temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
            }
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();

        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("\\nOriginal array:");
        System.out.println(Arrays.toString(arr));

        selectionSort(arr);

        System.out.println("\\nSorted array:");
        System.out.println(Arrays.toString(arr));

        sc.close();
    }
}`,

  insertionSort: () => `import java.util.Arrays;
import java.util.Scanner;

public class InsertionSort {

    static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();

        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("\\nOriginal array:");
        System.out.println(Arrays.toString(arr));

        insertionSort(arr);

        System.out.println("\\nSorted array:");
        System.out.println(Arrays.toString(arr));

        sc.close();
    }
}`,

  mergeSort: () => `import java.util.Arrays;
import java.util.Scanner;

public class MergeSort {

    // Merge two sorted parts
    static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] L = new int[n1];
        int[] R = new int[n2];

        // Copy elements
        for (int i = 0; i < n1; i++)
            L[i] = arr[left + i];

        for (int j = 0; j < n2; j++)
            R[j] = arr[mid + 1 + j];

        int i = 0, j = 0, k = left;

        // Merge the two arrays
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

        // Copy remaining elements of L
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        // Copy remaining elements of R
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    // Merge Sort function
    static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;

            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            merge(arr, left, mid, right);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();

        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("\\nOriginal array:");
        System.out.println(Arrays.toString(arr));

        mergeSort(arr, 0, n - 1);

        System.out.println("\\nSorted array:");
        System.out.println(Arrays.toString(arr));

        sc.close();
    }
}`,

  quickSort: () => `import java.util.Arrays;
import java.util.Scanner;

public class QuickSort {

    static int partition(int[] arr, int low, int high) {
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
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();

        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("\\nOriginal array:");
        System.out.println(Arrays.toString(arr));

        quickSort(arr, 0, n - 1);

        System.out.println("\\nSorted array:");
        System.out.println(Arrays.toString(arr));

        sc.close();
    }
}`,

  heapSort: () => `import java.util.Arrays;
import java.util.Scanner;

public class HeapSort {

    static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest])
            largest = left;

        if (right < n && arr[right] > arr[largest])
            largest = right;

        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            heapify(arr, n, largest);
        }
    }

    static void heapSort(int[] arr) {
        int n = arr.length;

        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);

        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();

        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("\\nOriginal array:");
        System.out.println(Arrays.toString(arr));

        heapSort(arr);

        System.out.println("\\nSorted array:");
        System.out.println(Arrays.toString(arr));

        sc.close();
    }
}`,

  stack: () => `import java.util.Scanner;

public class Stack {
    private int[] items;
    private int top = -1;

    public Stack(int capacity) {
        items = new int[capacity];
    }

    public void push(int value) {
        if (top < items.length - 1) {
            items[++top] = value;
            System.out.println("Pushed " + value);
        } else {
            System.out.println("Stack overflow");
        }
    }

    public void pop() {
        if (top >= 0) {
            System.out.println("Popped " + items[top--]);
        } else {
            System.out.println("Stack is empty");
        }
    }

    public void display() {
        System.out.print("Stack: ");
        for (int i = top; i >= 0; i--) {
            System.out.print(items[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();
        Stack stack = new Stack(n);

        System.out.println("Enter " + n + " elements to push:");
        for (int i = 0; i < n; i++) {
            stack.push(sc.nextInt());
        }

        stack.display();

        System.out.println("\\nPopping " + n + " elements:");
        for (int i = 0; i < n; i++) {
            stack.pop();
        }

        stack.display();
        sc.close();
    }
}`,

  queue: () => `import java.util.Scanner;

public class Queue {
    private int[] items;
    private int front = 0, rear = -1;

    public Queue(int capacity) {
        items = new int[capacity];
    }

    public void enqueue(int value) {
        if (rear < items.length - 1) {
            items[++rear] = value;
            System.out.println("Enqueued " + value);
        } else {
            System.out.println("Queue overflow");
        }
    }

    public void dequeue() {
        if (front <= rear) {
            System.out.println("Dequeued " + items[front++]);
        } else {
            System.out.println("Queue is empty");
        }
    }

    public void display() {
        System.out.print("Queue: ");
        for (int i = front; i <= rear; i++) {
            System.out.print(items[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();
        Queue queue = new Queue(n);

        System.out.println("Enter " + n + " elements to enqueue:");
        for (int i = 0; i < n; i++) {
            queue.enqueue(sc.nextInt());
        }

        queue.display();

        System.out.println("\\nDequeuing " + n + " elements:");
        for (int i = 0; i < n; i++) {
            queue.dequeue();
        }

        queue.display();
        sc.close();
    }
}`,

  linkedList: () => `import java.util.Scanner;

public class LinkedList {
    class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    private Node head = null;

    public void insert(int value) {
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        System.out.println("Inserted " + value);
    }

    public void display() {
        System.out.print("LinkedList: ");
        Node current = head;
        while (current != null) {
            System.out.print(current.value + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();
        LinkedList ll = new LinkedList();

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            ll.insert(sc.nextInt());
        }

        ll.display();
        sc.close();
    }
}`,

  binarySearchTree: () => `import java.util.Scanner;

public class BST {
    class Node {
        int value;
        Node left, right;
        Node(int value) { this.value = value; }
    }

    private Node root = null;

    public void insert(int value) {
        root = insertRec(root, value);
        System.out.println("Inserted " + value);
    }

    private Node insertRec(Node node, int value) {
        if (node == null) return new Node(value);
        if (value < node.value) {
            node.left = insertRec(node.left, value);
        } else {
            node.right = insertRec(node.right, value);
        }
        return node;
    }

    public void inorder() {
        System.out.print("Inorder: ");
        inorderRec(root);
        System.out.println();
    }

    private void inorderRec(Node node) {
        if (node != null) {
            inorderRec(node.left);
            System.out.print(node.value + " ");
            inorderRec(node.right);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();
        BST bst = new BST();

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            bst.insert(sc.nextInt());
        }

        bst.inorder();
        sc.close();
    }
}`,

  hashTable: () => `import java.util.Scanner;
import java.util.HashMap;

public class HashTable {
    private HashMap<String, Integer> table = new HashMap<>();

    public void insert(String key, int value) {
        table.put(key, value);
        System.out.println("Inserted key=" + key + ", value=" + value);
    }

    public void lookup(String key) {
        if (table.containsKey(key)) {
            System.out.println("Found: key=" + key + ", value=" + table.get(key));
        } else {
            System.out.println("Key " + key + " not found");
        }
    }

    public void display() {
        System.out.println("Hash Table: " + table);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of key-value pairs: ");
        int n = sc.nextInt();
        sc.nextLine();
        HashTable ht = new HashTable();

        System.out.println("Enter " + n + " key-value pairs (format: key value):");
        for (int i = 0; i < n; i++) {
            String[] parts = sc.nextLine().split(" ");
            ht.insert(parts[0], Integer.parseInt(parts[1]));
        }

        ht.display();

        System.out.print("Enter a key to lookup: ");
        String key = sc.next();
        ht.lookup(key);
        sc.close();
    }
}`,

  bfs: () => `import java.util.Scanner;
import java.util.Queue;
import java.util.LinkedList;
import java.util.ArrayList;

public class BFS {
    static ArrayList<Integer> bfs(ArrayList<Integer>[] graph, int start) {
        ArrayList<Integer> traversal = new ArrayList<>();
        boolean[] visited = new boolean[graph.length];
        Queue<Integer> queue = new LinkedList<>();

        queue.add(start);
        visited[start] = true;

        while (!queue.isEmpty()) {
            int node = queue.poll();
            traversal.add(node);
            for (int neighbor : graph[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
        return traversal;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Number of nodes: ");
        int n = sc.nextInt();
        ArrayList<Integer>[] graph = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new ArrayList<>();
        }

        System.out.println("Enter adjacency list for each node (space-separated neighbors):");
        for (int i = 0; i < n; i++) {
            String[] neighbors = sc.nextLine().split(" ");
            for (String neighbor : neighbors) {
                if (!neighbor.isEmpty()) {
                    graph[i].add(Integer.parseInt(neighbor));
                }
            }
        }

        System.out.print("Enter starting node: ");
        int start = sc.nextInt();
        ArrayList<Integer> result = bfs(graph, start);
        System.out.println("\\nBFS Traversal: " + result);
        sc.close();
    }
}`,

  dfs: () => `import java.util.Scanner;
import java.util.ArrayList;

public class DFS {
    static void dfs(ArrayList<Integer>[] graph, int node, boolean[] visited, ArrayList<Integer> traversal) {
        visited[node] = true;
        traversal.add(node);
        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                dfs(graph, neighbor, visited, traversal);
            }
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Number of nodes: ");
        int n = sc.nextInt();
        sc.nextLine();
        ArrayList<Integer>[] graph = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new ArrayList<>();
        }

        System.out.println("Enter adjacency list for each node (space-separated neighbors):");
        for (int i = 0; i < n; i++) {
            String[] neighbors = sc.nextLine().split(" ");
            for (String neighbor : neighbors) {
                if (!neighbor.isEmpty()) {
                    graph[i].add(Integer.parseInt(neighbor));
                }
            }
        }

        System.out.print("Enter starting node: ");
        int start = sc.nextInt();
        ArrayList<Integer> traversal = new ArrayList<>();
        boolean[] visited = new boolean[n];
        dfs(graph, start, visited, traversal);
        System.out.println("\\nDFS Traversal: " + traversal);
        sc.close();
    }
}`,

  dijkstra: () => `import java.util.Scanner;
import java.util.ArrayList;

public class Dijkstra {
    static int[] dijkstra(ArrayList<int[]>[] graph, int start, int n) {
        int[] dist = new int[n];
        boolean[] visited = new boolean[n];
        for (int i = 0; i < n; i++) dist[i] = Integer.MAX_VALUE;
        dist[start] = 0;

        for (int i = 0; i < n; i++) {
            int u = -1;
            for (int j = 0; j < n; j++) {
                if (!visited[j] && (u == -1 || dist[j] < dist[u])) u = j;
            }
            visited[u] = true;
            for (int[] edge : graph[u]) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
            }
        }
        return dist;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Number of nodes: ");
        int n = sc.nextInt();
        System.out.print("Number of edges: ");
        int m = sc.nextInt();
        ArrayList<int[]>[] graph = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new ArrayList<>();
        }

        System.out.println("Enter edges (src dst weight):");
        for (int i = 0; i < m; i++) {
            int src = sc.nextInt(), dst = sc.nextInt(), weight = sc.nextInt();
            graph[src].add(new int[]{dst, weight});
        }

        System.out.print("Enter starting node: ");
        int start = sc.nextInt();
        int[] distances = dijkstra(graph, start, n);
        System.out.println("\\nShortest distances from " + start + ": ");
        for (int i = 0; i < n; i++) {
            System.out.println("To " + i + ": " + (distances[i] == Integer.MAX_VALUE ? "INF" : distances[i]));
        }
        sc.close();
    }
}`,

  slidingWindow: () => `import java.util.Scanner;

public class SlidingWindow {
    static int[] slidingWindowMax(int[] arr, int k) {
        if (k > arr.length) return new int[0];
        int[] result = new int[arr.length - k + 1];
        for (int i = 0; i <= arr.length - k; i++) {
            int max = arr[i];
            for (int j = i; j < i + k; j++) {
                max = Math.max(max, arr[j]);
            }
            result[i] = max;
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter array size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.print("Enter window size: ");
        int k = sc.nextInt();
        int[] result = slidingWindowMax(arr, k);

        System.out.print("\\nOriginal array: ");
        for (int num : arr) System.out.print(num + " ");
        System.out.println();
        System.out.println("Window size: " + k);
        System.out.print("Maximum in each window: ");
        for (int num : result) System.out.print(num + " ");
        System.out.println();
        sc.close();
    }
}`,

  kruskal: () => `import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;

public class Kruskal {
    static class Edge implements Comparable<Edge> {
        int u, v, weight;
        Edge(int u, int v, int weight) { this.u = u; this.v = v; this.weight = weight; }
        public int compareTo(Edge other) { return this.weight - other.weight; }
    }

    static class UnionFind {
        int[] parent;
        UnionFind(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }
        int find(int x) { if (parent[x] != x) parent[x] = find(parent[x]); return parent[x]; }
        boolean union(int x, int y) {
            int px = find(x), py = find(y);
            if (px == py) return false;
            parent[px] = py;
            return true;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Number of nodes: ");
        int n = sc.nextInt();
        System.out.print("Number of edges: ");
        int m = sc.nextInt();
        ArrayList<Edge> edges = new ArrayList<>();

        System.out.println("Enter edges (u v weight):");
        for (int i = 0; i < m; i++) {
            edges.add(new Edge(sc.nextInt(), sc.nextInt(), sc.nextInt()));
        }

        Collections.sort(edges);
        UnionFind uf = new UnionFind(n);
        ArrayList<Edge> mst = new ArrayList<>();
        int totalWeight = 0;

        for (Edge e : edges) {
            if (uf.union(e.u, e.v)) {
                mst.add(e);
                totalWeight += e.weight;
            }
        }

        System.out.println("\\nMinimum Spanning Tree:");
        for (Edge e : mst) {
            System.out.println("(" + e.u + ", " + e.v + ") weight: " + e.weight);
        }
        System.out.println("Total weight: " + totalWeight);
        sc.close();
    }
}`,

  prims: () => `import java.util.Scanner;
import java.util.ArrayList;

public class Prims {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Number of nodes: ");
        int n = sc.nextInt();
        System.out.print("Number of edges: ");
        int m = sc.nextInt();
        ArrayList<Integer>[] adj = new ArrayList[n];
        int[][] weights = new int[n][n];

        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
            for (int j = 0; j < n; j++) weights[i][j] = Integer.MAX_VALUE;
        }

        System.out.println("Enter edges (u v weight):");
        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt(), w = sc.nextInt();
            adj[u].add(v);
            adj[v].add(u);
            weights[u][v] = w;
            weights[v][u] = w;
        }

        boolean[] visited = new boolean[n];
        int totalWeight = 0;
        visited[0] = true;
        ArrayList<String> mst = new ArrayList<>();

        for (int i = 1; i < n; i++) {
            int minWeight = Integer.MAX_VALUE, u = -1, v = -1;
            for (int j = 0; j < n; j++) {
                if (visited[j]) {
                    for (int k : adj[j]) {
                        if (!visited[k] && weights[j][k] < minWeight) {
                            minWeight = weights[j][k];
                            u = j;
                            v = k;
                        }
                    }
                }
            }
            visited[v] = true;
            mst.add("(" + u + ", " + v + ") weight: " + minWeight);
            totalWeight += minWeight;
        }

        System.out.println("\\nMinimum Spanning Tree:");
        for (String edge : mst) System.out.println(edge);
        System.out.println("Total weight: " + totalWeight);
        sc.close();
    }
}`,

  astar: () => `import java.util.Scanner;

public class AStar {
    static int heuristic(int[] pos, int[] goal) {
        return Math.abs(pos[0] - goal[0]) + Math.abs(pos[1] - goal[1]);
    }

    static boolean isValid(int x, int y, int rows, int cols, int[][] grid) {
        return x >= 0 && x < rows && y >= 0 && y < cols && grid[x][y] == 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter grid rows: ");
        int rows = sc.nextInt();
        System.out.print("Enter grid columns: ");
        int cols = sc.nextInt();
        int[][] grid = new int[rows][cols];

        System.out.println("Enter grid (0=walkable, 1=obstacle):");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                grid[i][j] = sc.nextInt();
            }
        }

        System.out.print("Enter start position (x y): ");
        int[] start = {sc.nextInt(), sc.nextInt()};
        System.out.print("Enter goal position (x y): ");
        int[] goal = {sc.nextInt(), sc.nextInt()};

        System.out.println("\\nA* Algorithm would find path from " + java.util.Arrays.toString(start) + 
                         " to " + java.util.Arrays.toString(goal));
        System.out.println("(Implementation details omitted for brevity)");
        sc.close();
    }
}`
};

export default javaCodeTemplates;
