export const cCodeTemplates = {
  bubbleSort: () => `#include <stdio.h>
#include <stdlib.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("\\nOriginal array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    bubbleSort(arr, n);

    printf("\\nSorted array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,

  selectionSort: () => `#include <stdio.h>
#include <stdlib.h>

void selectionSort(int arr[], int n) {
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

int main() {
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("\\nOriginal array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    selectionSort(arr, n);

    printf("\\nSorted array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,

  insertionSort: () => `#include <stdio.h>
#include <stdlib.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
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
    printf("Enter the number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("\\nOriginal array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    insertionSort(arr, n);

    printf("\\nSorted array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,

  mergeSort: () => `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int L[n1], R[n2];
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

void mergeSort(int arr[], int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

int main() {
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("\\nOriginal array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    mergeSort(arr, 0, n - 1);

    printf("\\nSorted array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,

  quickSort: () => `#include <stdio.h>
#include <stdlib.h>

void swap(int* a, int* b) { int temp = *a; *a = *b; *b = temp; }

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("\\nOriginal array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    quickSort(arr, 0, n - 1);

    printf("\\nSorted array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,

  heapSort: () => `#include <stdio.h>
#include <stdlib.h>

void swap(int* a, int* b) { int temp = *a; *a = *b; *b = temp; }

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1, right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("\\nOriginal array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    heapSort(arr, n);

    printf("\\nSorted array:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,

  stack: () => `#include <stdio.h>

#define MAX_SIZE 100

int stack[MAX_SIZE];
int top = -1;

void push(int value) {
    if (top < MAX_SIZE - 1) {
        stack[++top] = value;
        printf("Pushed %d\\n", value);
    } else {
        printf("Stack overflow\\n");
    }
}

void pop() {
    if (top >= 0) {
        printf("Popped %d\\n", stack[top--]);
    } else {
        printf("Stack is empty\\n");
    }
}

void display() {
    printf("Stack: ");
    for (int i = top; i >= 0; i--) {
        printf("%d ", stack[i]);
    }
    printf("\\n");
}

int main() {
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);
    printf("Enter %d elements to push:\\n", n);
    for (int i = 0; i < n; i++) {
        int x;
        scanf("%d", &x);
        push(x);
    }
    display();
    printf("\\nPopping %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        pop();
    }
    display();
    return 0;
}`,

  queue: () => `#include <stdio.h>

#define MAX_SIZE 100

int queue[MAX_SIZE];
int front = 0, rear = -1;

void enqueue(int value) {
    if (rear < MAX_SIZE - 1) {
        queue[++rear] = value;
        printf("Enqueued %d\\n", value);
    } else {
        printf("Queue overflow\\n");
    }
}

void dequeue() {
    if (front <= rear) {
        printf("Dequeued %d\\n", queue[front++]);
    } else {
        printf("Queue is empty\\n");
    }
}

void display() {
    printf("Queue: ");
    for (int i = front; i <= rear; i++) {
        printf("%d ", queue[i]);
    }
    printf("\\n");
}

int main() {
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);
    printf("Enter %d elements to enqueue:\\n", n);
    for (int i = 0; i < n; i++) {
        int x;
        scanf("%d", &x);
        enqueue(x);
    }
    display();
    printf("\\nDequeuing %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        dequeue();
    }
    display();
    return 0;
}`,

  linkedList: () => `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node* next;
} Node;

Node* head = NULL;

void insert(int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->value = value;
    newNode->next = NULL;
    
    if (!head) {
        head = newNode;
    } else {
        Node* curr = head;
        while (curr->next) curr = curr->next;
        curr->next = newNode;
    }
    printf("Inserted %d\\n", value);
}

void display() {
    printf("LinkedList: ");
    Node* curr = head;
    while (curr) {
        printf("%d -> ", curr->value);
        curr = curr->next;
    }
    printf("null\\n");
}

int main() {
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        int x;
        scanf("%d", &x);
        insert(x);
    }
    display();
    return 0;
}`,

  binarySearchTree: () => `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node* left, *right;
} Node;

Node* root = NULL;

Node* insertRec(Node* node, int value) {
    if (!node) {
        Node* newNode = (Node*)malloc(sizeof(Node));
        newNode->value = value;
        newNode->left = newNode->right = NULL;
        return newNode;
    }
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
        printf("%d ", node->value);
        inorderRec(node->right);
    }
}

int main() {
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        int x;
        scanf("%d", &x);
        root = insertRec(root, x);
        printf("Inserted %d\\n", x);
    }
    printf("\\nInorder: ");
    inorderRec(root);
    printf("\\n");
    return 0;
}`,

  hashTable: () => `#include <stdio.h>
#include <string.h>

#define MAX_SIZE 100

typedef struct {
    char key[50];
    int value;
} Entry;

Entry table[MAX_SIZE];
int size = 0;

void insert(char* key, int value) {
    strcpy(table[size].key, key);
    table[size].value = value;
    printf("Inserted key=%s, value=%d\\n", key, value);
    size++;
}

int lookup(char* key) {
    for (int i = 0; i < size; i++) {
        if (strcmp(table[i].key, key) == 0) {
            printf("Found: key=%s, value=%d\\n", key, table[i].value);
            return table[i].value;
        }
    }
    printf("Key %s not found\\n", key);
    return -1;
}

void display() {
    printf("\\nHash Table:\\n");
    for (int i = 0; i < size; i++) {
        printf("%s -> %d\\n", table[i].key, table[i].value);
    }
}

int main() {
    int n;
    printf("Enter the number of key-value pairs: ");
    scanf("%d", &n);
    printf("Enter %d key-value pairs (key value):\\n", n);
    for (int i = 0; i < n; i++) {
        char key[50];
        int value;
        scanf("%s %d", key, &value);
        insert(key, value);
    }
    display();
    char lookupKey[50];
    printf("Enter a key to lookup: ");
    scanf("%s", lookupKey);
    lookup(lookupKey);
    return 0;
}`,

  bfs: () => `#include <stdio.h>
#include <stdlib.h>

int queue[1000], front = 0, rear = 0;

void enqueue(int node) {
    queue[rear++] = node;
}

int dequeue() {
    return queue[front++];
}

void bfs(int graph[10][10], int n, int start) {
    int visited[n];
    for (int i = 0; i < n; i++) visited[i] = 0;
    
    printf("BFS Traversal: ");
    enqueue(start);
    visited[start] = 1;
    
    while (front < rear) {
        int node = dequeue();
        printf("%d ", node);
        for (int i = 0; i < n; i++) {
            if (graph[node][i] && !visited[i]) {
                enqueue(i);
                visited[i] = 1;
            }
        }
    }
    printf("\\n");
}

int main() {
    int n;
    printf("Number of nodes: ");
    scanf("%d", &n);
    int graph[10][10];
    
    printf("Enter adjacency matrix:\\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &graph[i][j]);
        }
    }
    
    int start;
    printf("Enter starting node: ");
    scanf("%d", &start);
    bfs(graph, n, start);
    return 0;
}`,

  dfs: () => `#include <stdio.h>

void dfs(int graph[10][10], int node, int n, int visited[10]) {
    visited[node] = 1;
    printf("%d ", node);
    for (int i = 0; i < n; i++) {
        if (graph[node][i] && !visited[i]) {
            dfs(graph, i, n, visited);
        }
    }
}

int main() {
    int n;
    printf("Number of nodes: ");
    scanf("%d", &n);
    int graph[10][10];
    
    printf("Enter adjacency matrix:\\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &graph[i][j]);
        }
    }
    
    int start;
    printf("Enter starting node: ");
    scanf("%d", &start);
    
    int visited[10] = {0};
    printf("\\nDFS Traversal: ");
    dfs(graph, start, n, visited);
    printf("\\n");
    return 0;
}`,

  dijkstra: () => `#include <stdio.h>
#include <limits.h>

#define INF INT_MAX

void dijkstra(int graph[10][10], int n, int start) {
    int dist[n], visited[n];
    for (int i = 0; i < n; i++) {
        dist[i] = INF;
        visited[i] = 0;
    }
    dist[start] = 0;
    
    for (int i = 0; i < n; i++) {
        int u = -1;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && (u == -1 || dist[j] < dist[u])) u = j;
        }
        visited[u] = 1;
        for (int v = 0; v < n; v++) {
            if (graph[u][v] && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    
    printf("\\nShortest distances from %d:\\n", start);
    for (int i = 0; i < n; i++) {
        printf("To %d: %s\\n", i, dist[i] == INF ? "INF" : "");
        if (dist[i] != INF) printf("%d\\n", dist[i]);
    }
}

int main() {
    int n;
    printf("Number of nodes: ");
    scanf("%d", &n);
    int graph[10][10];
    
    printf("Enter weighted adjacency matrix (0 for no edge):\\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &graph[i][j]);
        }
    }
    
    int start;
    printf("Enter starting node: ");
    scanf("%d", &start);
    dijkstra(graph, n, start);
    return 0;
}`,

  slidingWindow: () => `#include <stdio.h>

int main() {
    int n;
    printf("Enter array size: ");
    scanf("%d", &n);
    int arr[n];
    
    printf("Enter %d elements:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    int k;
    printf("Enter window size: ");
    scanf("%d", &k);
    
    if (k > n) {
        printf("Window size larger than array\\n");
        return 0;
    }
    
    printf("\\nOriginal array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\nWindow size: %d\\n", k);
    printf("Maximum in each window: ");
    
    for (int i = 0; i <= n - k; i++) {
        int max = arr[i];
        for (int j = i; j < i + k; j++) {
            if (arr[j] > max) max = arr[j];
        }
        printf("%d ", max);
    }
    printf("\\n");
    return 0;
}`,

  kruskal: () => `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int u, v, weight;
} Edge;

int parent[10];

int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
}

int unite(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return 0;
    parent[px] = py;
    return 1;
}

int cmp(const void* a, const void* b) {
    return ((Edge*)a)->weight - ((Edge*)b)->weight;
}

int main() {
    int n, m;
    printf("Number of nodes: ");
    scanf("%d", &n);
    printf("Number of edges: ");
    scanf("%d", &m);
    
    for (int i = 0; i < n; i++) parent[i] = i;
    
    Edge edges[m];
    printf("Enter edges (u v weight):\\n");
    for (int i = 0; i < m; i++) {
        scanf("%d %d %d", &edges[i].u, &edges[i].v, &edges[i].weight);
    }
    
    qsort(edges, m, sizeof(Edge), cmp);
    
    int totalWeight = 0;
    printf("\\nMinimum Spanning Tree:\\n");
    for (int i = 0; i < m; i++) {
        if (unite(edges[i].u, edges[i].v)) {
            printf("(%d, %d) weight: %d\\n", edges[i].u, edges[i].v, edges[i].weight);
            totalWeight += edges[i].weight;
        }
    }
    printf("Total weight: %d\\n", totalWeight);
    return 0;
}`,

  prims: () => `#include <stdio.h>
#include <limits.h>

#define INF INT_MAX

int main() {
    int n, m;
    printf("Number of nodes: ");
    scanf("%d", &n);
    printf("Number of edges: ");
    scanf("%d", &m);
    
    int graph[10][10];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            graph[i][j] = INF;
        }
    }
    
    printf("Enter edges (u v weight):\\n");
    for (int i = 0; i < m; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        graph[u][v] = w;
        graph[v][u] = w;
    }
    
    int visited[n];
    for (int i = 0; i < n; i++) visited[i] = 0;
    
    visited[0] = 1;
    int totalWeight = 0;
    
    printf("\\nMinimum Spanning Tree:\\n");
    for (int i = 1; i < n; i++) {
        int minWeight = INF, u = -1, v = -1;
        for (int j = 0; j < n; j++) {
            if (visited[j]) {
                for (int k = 0; k < n; k++) {
                    if (!visited[k] && graph[j][k] < minWeight) {
                        minWeight = graph[j][k];
                        u = j;
                        v = k;
                    }
                }
            }
        }
        visited[v] = 1;
        printf("(%d, %d) weight: %d\\n", u, v, minWeight);
        totalWeight += minWeight;
    }
    printf("Total weight: %d\\n", totalWeight);
    return 0;
}`,

  astar: () => `#include <stdio.h>
#include <math.h>

int main() {
    int rows, cols;
    printf("Enter grid rows: ");
    scanf("%d", &rows);
    printf("Enter grid columns: ");
    scanf("%d", &cols);
    
    int grid[rows][cols];
    printf("Enter grid (0=walkable, 1=obstacle):\\n");
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            scanf("%d", &grid[i][j]);
        }
    }
    
    int startX, startY, goalX, goalY;
    printf("Enter start position (x y): ");
    scanf("%d %d", &startX, &startY);
    printf("Enter goal position (x y): ");
    scanf("%d %d", &goalX, &goalY);
    
    printf("\\nA* Algorithm would find path from (%d, %d) to (%d, %d)\\n", startX, startY, goalX, goalY);
    printf("(Implementation details omitted for brevity)\\n");
    return 0;
}`
};

export default cCodeTemplates;
