export const cppCodeTemplates = {
  bubbleSort: () => `#include <iostream>
#include <vector>
#include <algorithm>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    int n;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;

    std::vector<int> arr(n);
    std::cout << "Enter " << n << " elements:\\n";
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i];
    }

    std::cout << "\\nOriginal array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";

    bubbleSort(arr);

    std::cout << "\\nSorted array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}`,

  selectionSort: () => `#include <iostream>
#include <vector>
#include <algorithm>

void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            std::swap(arr[i], arr[minIdx]);
        }
    }
}

int main() {
    int n;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;

    std::vector<int> arr(n);
    std::cout << "Enter " << n << " elements:\\n";
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i];
    }

    std::cout << "\\nOriginal array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";

    selectionSort(arr);

    std::cout << "\\nSorted array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}`,

  insertionSort: () => `#include <iostream>
#include <vector>

void insertionSort(std::vector<int>& arr) {
    for (size_t i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int n;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;

    std::vector<int> arr(n);
    std::cout << "Enter " << n << " elements:\\n";
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i];
    }

    std::cout << "\\nOriginal array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";

    insertionSort(arr);

    std::cout << "\\nSorted array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}`,

  mergeSort: () => `#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    std::vector<int> L(n1), R(n2);

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

int main() {
    int n;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;

    std::vector<int> arr(n);
    std::cout << "Enter " << n << " elements:\\n";
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i];
    }

    std::cout << "\\nOriginal array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";

    mergeSort(arr, 0, n - 1);

    std::cout << "\\nSorted array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}`,

  quickSort: () => `#include <iostream>
#include <vector>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int n;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;

    std::vector<int> arr(n);
    std::cout << "Enter " << n << " elements:\\n";
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i];
    }

    std::cout << "\\nOriginal array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";

    quickSort(arr, 0, n - 1);

    std::cout << "\\nSorted array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}`,

  heapSort: () => `#include <iostream>
#include <vector>

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();

    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    int n;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;

    std::vector<int> arr(n);
    std::cout << "Enter " << n << " elements:\\n";
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i];
    }

    std::cout << "\\nOriginal array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";

    heapSort(arr);

    std::cout << "\\nSorted array:\\n";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}`,

  stack: () => `#include <iostream>
#include <vector>

class Stack {
    std::vector<int> items;
public:
    void push(int value) {
        items.push_back(value);
        std::cout << "Pushed " << value << "\\n";
    }
    void pop() {
        if (!items.empty()) {
            std::cout << "Popped " << items.back() << "\\n";
            items.pop_back();
        } else {
            std::cout << "Stack is empty\\n";
        }
    }
    void display() {
        std::cout << "Stack: ";
        for (int i = items.size() - 1; i >= 0; i--) {
            std::cout << items[i] << " ";
        }
        std::cout << "\\n";
    }
};

int main() {
    int n;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;
    Stack stack;
    std::cout << "Enter " << n << " elements to push:\\n";
    for (int i = 0; i < n; i++) {
        int x;
        std::cin >> x;
        stack.push(x);
    }
    stack.display();
    std::cout << "\\nPopping " << n << " elements:\\n";
    for (int i = 0; i < n; i++) {
        stack.pop();
    }
    stack.display();
    return 0;
}`,

  queue: () => `#include <iostream>
#include <queue>

int main() {
    int n;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;
    std::queue<int> q;
    
    std::cout << "Enter " << n << " elements to enqueue:\\n";
    for (int i = 0; i < n; i++) {
        int x;
        std::cin >> x;
        q.push(x);
        std::cout << "Enqueued " << x << "\\n";
    }
    
    std::cout << "\\nQueue (front to back): ";
    std::queue<int> temp = q;
    while (!temp.empty()) {
        std::cout << temp.front() << " ";
        temp.pop();
    }
    std::cout << "\\n";
    
    std::cout << "\\nDequeuing " << n << " elements:\\n";
    while (!q.empty()) {
        std::cout << "Dequeued " << q.front() << "\\n";
        q.pop();
    }
    return 0;
}`,

  linkedList: () => `#include <iostream>

struct Node {
    int value;
    Node* next;
    Node(int v) : value(v), next(nullptr) {}
};

class LinkedList {
    Node* head = nullptr;
public:
    void insert(int value) {
        Node* newNode = new Node(value);
        if (!head) {
            head = newNode;
        } else {
            Node* curr = head;
            while (curr->next) curr = curr->next;
            curr->next = newNode;
        }
        std::cout << "Inserted " << value << "\\n";
    }
    void display() {
        std::cout << "LinkedList: ";
        Node* curr = head;
        while (curr) {
            std::cout << curr->value << " -> ";
            curr = curr->next;
        }
        std::cout << "null\\n";
    }
};

int main() {
    int n;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;
    LinkedList ll;
    std::cout << "Enter " << n << " elements:\\n";
    for (int i = 0; i < n; i++) {
        int x;
        std::cin >> x;
        ll.insert(x);
    }
    ll.display();
    return 0;
}`,

  binarySearchTree: () => `#include <iostream>

struct Node {
    int value;
    Node* left, *right;
    Node(int v) : value(v), left(nullptr), right(nullptr) {}
};

class BST {
    Node* root = nullptr;
    Node* insertRec(Node* node, int value) {
        if (!node) return new Node(value);
        if (value < node->value) {
            node->left = insertRec(node->left, value);
        } else {
            node->right = insertRec(node->right, value);
        }
        return node;
    }
    void inorderRec(Node* node) {
        if (node) {
            inorderRec(node->left);
            std::cout << node->value << " ";
            inorderRec(node->right);
        }
    }
public:
    void insert(int value) {
        root = insertRec(root, value);
        std::cout << "Inserted " << value << "\\n";
    }
    void inorder() {
        std::cout << "Inorder: ";
        inorderRec(root);
        std::cout << "\\n";
    }
};

int main() {
    int n;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;
    BST bst;
    std::cout << "Enter " << n << " elements:\\n";
    for (int i = 0; i < n; i++) {
        int x;
        std::cin >> x;
        bst.insert(x);
    }
    bst.inorder();
    return 0;
}`,

  hashTable: () => `#include <iostream>
#include <unordered_map>
#include <string>

int main() {
    int n;
    std::cout << "Enter the number of key-value pairs: ";
    std::cin >> n;
    std::cin.ignore();
    
    std::unordered_map<std::string, int> ht;
    std::cout << "Enter " << n << " key-value pairs (key value):\\n";
    for (int i = 0; i < n; i++) {
        std::string key;
        int value;
        std::cin >> key >> value;
        ht[key] = value;
        std::cout << "Inserted key=" << key << ", value=" << value << "\\n";
    }
    
    std::cout << "\\nHash Table:\\n";
    for (auto& p : ht) {
        std::cout << p.first << " -> " << p.second << "\\n";
    }
    
    std::string lookupKey;
    std::cout << "Enter a key to lookup: ";
    std::cin >> lookupKey;
    if (ht.count(lookupKey)) {
        std::cout << "Found: " << lookupKey << " -> " << ht[lookupKey] << "\\n";
    } else {
        std::cout << "Key not found\\n";
    }
    return 0;
}`,

  bfs: () => `#include <iostream>
#include <vector>
#include <queue>

std::vector<int> bfs(std::vector<std::vector<int>>& graph, int start) {
    std::vector<int> traversal;
    std::vector<bool> visited(graph.size(), false);
    std::queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        traversal.push_back(node);
        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    return traversal;
}

int main() {
    int n;
    std::cout << "Number of nodes: ";
    std::cin >> n;
    std::vector<std::vector<int>> graph(n);
    
    std::cout << "Enter adjacency list (space-separated neighbors):\\n";
    std::cin.ignore();
    for (int i = 0; i < n; i++) {
        std::string line;
        std::getline(std::cin, line);
        std::vector<int> neighbors;
        std::stringstream ss(line);
        int neighbor;
        while (ss >> neighbor) {
            neighbors.push_back(neighbor);
        }
        graph[i] = neighbors;
    }
    
    int start;
    std::cout << "Enter starting node: ";
    std::cin >> start;
    std::vector<int> result = bfs(graph, start);
    
    std::cout << "\\nBFS Traversal: ";
    for (int node : result) std::cout << node << " ";
    std::cout << "\\n";
    return 0;
}`,

  dfs: () => `#include <iostream>
#include <vector>

void dfs(std::vector<std::vector<int>>& graph, int node, std::vector<bool>& visited, std::vector<int>& traversal) {
    visited[node] = true;
    traversal.push_back(node);
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited, traversal);
        }
    }
}

int main() {
    int n;
    std::cout << "Number of nodes: ";
    std::cin >> n;
    std::vector<std::vector<int>> graph(n);
    
    std::cout << "Enter adjacency list (space-separated neighbors):\\n";
    std::cin.ignore();
    for (int i = 0; i < n; i++) {
        std::string line;
        std::getline(std::cin, line);
        std::vector<int> neighbors;
        std::stringstream ss(line);
        int neighbor;
        while (ss >> neighbor) {
            neighbors.push_back(neighbor);
        }
        graph[i] = neighbors;
    }
    
    int start;
    std::cout << "Enter starting node: ";
    std::cin >> start;
    
    std::vector<bool> visited(n, false);
    std::vector<int> traversal;
    dfs(graph, start, visited, traversal);
    
    std::cout << "\\nDFS Traversal: ";
    for (int node : traversal) std::cout << node << " ";
    std::cout << "\\n";
    return 0;
}`,

  dijkstra: () => `#include <iostream>
#include <vector>
#include <limits>

const int INF = std::numeric_limits<int>::max();

std::vector<int> dijkstra(std::vector<std::vector<std::pair<int, int>>>& graph, int start, int n) {
    std::vector<int> dist(n, INF);
    std::vector<bool> visited(n, false);
    dist[start] = 0;
    
    for (int i = 0; i < n; i++) {
        int u = -1;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && (u == -1 || dist[j] < dist[u])) u = j;
        }
        visited[u] = true;
        for (auto& edge : graph[u]) {
            int v = edge.first, w = edge.second;
            if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }
    }
    return dist;
}

int main() {
    int n, m;
    std::cout << "Number of nodes: ";
    std::cin >> n;
    std::cout << "Number of edges: ";
    std::cin >> m;
    
    std::vector<std::vector<std::pair<int, int>>> graph(n);
    std::cout << "Enter edges (src dst weight):\\n";
    for (int i = 0; i < m; i++) {
        int src, dst, w;
        std::cin >> src >> dst >> w;
        graph[src].push_back({dst, w});
    }
    
    int start;
    std::cout << "Enter starting node: ";
    std::cin >> start;
    
    std::vector<int> distances = dijkstra(graph, start, n);
    std::cout << "\\nShortest distances from " << start << ":\\n";
    for (int i = 0; i < n; i++) {
        std::cout << "To " << i << ": " << (distances[i] == INF ? "INF" : std::to_string(distances[i])) << "\\n";
    }
    return 0;
}`,

  slidingWindow: () => `#include <iostream>
#include <vector>
#include <algorithm>

std::vector<int> slidingWindowMax(std::vector<int>& arr, int k) {
    std::vector<int> result;
    if (k > arr.size()) return result;
    for (int i = 0; i <= arr.size() - k; i++) {
        int maxVal = *std::max_element(arr.begin() + i, arr.begin() + i + k);
        result.push_back(maxVal);
    }
    return result;
}

int main() {
    int n;
    std::cout << "Enter array size: ";
    std::cin >> n;
    std::vector<int> arr(n);
    
    std::cout << "Enter " << n << " elements:\\n";
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i];
    }
    
    int k;
    std::cout << "Enter window size: ";
    std::cin >> k;
    
    std::vector<int> result = slidingWindowMax(arr, k);
    
    std::cout << "\\nOriginal array: ";
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";
    std::cout << "Window size: " << k << "\\n";
    std::cout << "Maximum in each window: ";
    for (int x : result) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}`,

  kruskal: () => `#include <iostream>
#include <vector>
#include <algorithm>

struct Edge {
    int u, v, weight;
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

class UnionFind {
    std::vector<int> parent;
public:
    UnionFind(int n) : parent(n) {
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        parent[px] = py;
        return true;
    }
};

int main() {
    int n, m;
    std::cout << "Number of nodes: ";
    std::cin >> n;
    std::cout << "Number of edges: ";
    std::cin >> m;
    
    std::vector<Edge> edges;
    std::cout << "Enter edges (u v weight):\\n";
    for (int i = 0; i < m; i++) {
        Edge e;
        std::cin >> e.u >> e.v >> e.weight;
        edges.push_back(e);
    }
    
    std::sort(edges.begin(), edges.end());
    UnionFind uf(n);
    std::vector<Edge> mst;
    int totalWeight = 0;
    
    for (auto& e : edges) {
        if (uf.unite(e.u, e.v)) {
            mst.push_back(e);
            totalWeight += e.weight;
        }
    }
    
    std::cout << "\\nMinimum Spanning Tree:\\n";
    for (auto& e : mst) {
        std::cout << "(" << e.u << ", " << e.v << ") weight: " << e.weight << "\\n";
    }
    std::cout << "Total weight: " << totalWeight << "\\n";
    return 0;
}`,

  prims: () => `#include <iostream>
#include <vector>
#include <limits>

const int INF = std::numeric_limits<int>::max();

int main() {
    int n, m;
    std::cout << "Number of nodes: ";
    std::cin >> n;
    std::cout << "Number of edges: ";
    std::cin >> m;
    
    std::vector<std::vector<std::pair<int, int>>> adj(n);
    std::cout << "Enter edges (u v weight):\\n";
    for (int i = 0; i < m; i++) {
        int u, v, w;
        std::cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    
    std::vector<bool> visited(n, false);
    std::vector<std::pair<int, int>> mst;
    int totalWeight = 0;
    visited[0] = true;
    
    for (int i = 1; i < n; i++) {
        int minWeight = INF, u = -1, v = -1;
        for (int j = 0; j < n; j++) {
            if (visited[j]) {
                for (auto& edge : adj[j]) {
                    if (!visited[edge.first] && edge.second < minWeight) {
                        minWeight = edge.second;
                        u = j;
                        v = edge.first;
                    }
                }
            }
        }
        visited[v] = true;
        mst.push_back({u, v});
        totalWeight += minWeight;
    }
    
    std::cout << "\\nMinimum Spanning Tree:\\n";
    for (auto& e : mst) {
        std::cout << "(" << e.first << ", " << e.second << ")\\n";
    }
    std::cout << "Total weight: " << totalWeight << "\\n";
    return 0;
}`,

  astar: () => `#include <iostream>
#include <vector>

int main() {
    int rows, cols;
    std::cout << "Enter grid rows: ";
    std::cin >> rows;
    std::cout << "Enter grid columns: ";
    std::cin >> cols;
    
    std::vector<std::vector<int>> grid(rows, std::vector<int>(cols));
    std::cout << "Enter grid (0=walkable, 1=obstacle):\\n";
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            std::cin >> grid[i][j];
        }
    }
    
    int startX, startY, goalX, goalY;
    std::cout << "Enter start position (x y): ";
    std::cin >> startX >> startY;
    std::cout << "Enter goal position (x y): ";
    std::cin >> goalX >> goalY;
    
    std::cout << "\\nA* Algorithm would find path from (" << startX << ", " << startY 
              << ") to (" << goalX << ", " << goalY << ")\\n";
    std::cout << "(Implementation details omitted for brevity)\\n";
    return 0;
}`
};

export default cppCodeTemplates;
