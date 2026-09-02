export const pythonCodeTemplates = {
  bubbleSort: () => `# Python 3 — Bubble Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break

n = int(input("Enter the number of elements: "))
arr = []
print(f"Enter {n} elements:")
for i in range(n):
    arr.append(int(input()))

print("\\nOriginal array:")
print(arr)

bubble_sort(arr)

print("\\nSorted array:")
print(arr)`,

  selectionSort: () => `# Python 3 — Selection Sort
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]

n = int(input("Enter the number of elements: "))
arr = []
print(f"Enter {n} elements:")
for i in range(n):
    arr.append(int(input()))

print("\\nOriginal array:")
print(arr)

selection_sort(arr)

print("\\nSorted array:")
print(arr)`,

  insertionSort: () => `# Python 3 — Insertion Sort
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

n = int(input("Enter the number of elements: "))
arr = []
print(f"Enter {n} elements:")
for i in range(n):
    arr.append(int(input()))

print("\\nOriginal array:")
print(arr)

insertion_sort(arr)

print("\\nSorted array:")
print(arr)`,

  mergeSort: () => `# Python 3 — Merge Sort
def merge(arr, left, mid, right):
    n1 = mid - left + 1
    n2 = right - mid
    L = arr[left:mid + 1]
    R = arr[mid + 1:right + 1]

    i = j = 0
    k = left

    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1

    while i < n1:
        arr[k] = L[i]
        i += 1
        k += 1

    while j < n2:
        arr[k] = R[j]
        j += 1
        k += 1

def merge_sort(arr, left, right):
    if left < right:
        mid = (left + right) // 2
        merge_sort(arr, left, mid)
        merge_sort(arr, mid + 1, right)
        merge(arr, left, mid, right)

n = int(input("Enter the number of elements: "))
arr = []
print(f"Enter {n} elements:")
for i in range(n):
    arr.append(int(input()))

print("\\nOriginal array:")
print(arr)

merge_sort(arr, 0, n - 1)

print("\\nSorted array:")
print(arr)`,

  quickSort: () => `# Python 3 — Quick Sort
def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

n = int(input("Enter the number of elements: "))
arr = []
print(f"Enter {n} elements:")
for i in range(n):
    arr.append(int(input()))

print("\\nOriginal array:")
print(arr)

quick_sort(arr, 0, n - 1)

print("\\nSorted array:")
print(arr)`,

  heapSort: () => `# Python 3 — Heap Sort
def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left

    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)

n = int(input("Enter the number of elements: "))
arr = []
print(f"Enter {n} elements:")
for i in range(n):
    arr.append(int(input()))

print("\\nOriginal array:")
print(arr)

heap_sort(arr)

print("\\nSorted array:")
print(arr)`,

  stack: () => `# Python 3 — Stack Implementation
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, value):
        self.items.append(value)
        print(f"Pushed {value}")
    
    def pop(self):
        if not self.items:
            print("Stack is empty")
            return None
        value = self.items.pop()
        print(f"Popped {value}")
        return value
    
    def display(self):
        print(f"Stack (top to bottom): {self.items[::-1]}")

n = int(input("Enter the number of elements: "))
stack = Stack()
print(f"Enter {n} elements to push:")
for i in range(n):
    stack.push(int(input()))

stack.display()

print(f"\\nPopping {n} elements:")
for _ in range(n):
    stack.pop()

stack.display()`,

  queue: () => `# Python 3 — Queue Implementation
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, value):
        self.items.append(value)
        print(f"Enqueued {value}")
    
    def dequeue(self):
        if not self.items:
            print("Queue is empty")
            return None
        value = self.items.popleft()
        print(f"Dequeued {value}")
        return value
    
    def display(self):
        print(f"Queue (front to back): {list(self.items)}")

n = int(input("Enter the number of elements: "))
queue = Queue()
print(f"Enter {n} elements to enqueue:")
for i in range(n):
    queue.enqueue(int(input()))

queue.display()

print(f"\\nDequeuing {n} elements:")
for _ in range(n):
    queue.dequeue()

queue.display()`,

  linkedList: () => `# Python 3 — Linked List Implementation
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        print(f"Inserted {value}")
    
    def display(self):
        values = []
        current = self.head
        while current:
            values.append(current.value)
            current = current.next
        print(f"LinkedList: {' -> '.join(map(str, values))}")

n = int(input("Enter the number of elements: "))
ll = LinkedList()
print(f"Enter {n} elements:")
for i in range(n):
    ll.insert(int(input()))

ll.display()`,

  binarySearchTree: () => `# Python 3 — Binary Search Tree
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        if not self.root:
            self.root = TreeNode(value)
        else:
            self._insert_recursive(self.root, value)
        print(f"Inserted {value}")
    
    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self._insert_recursive(node.right, value)
    
    def inorder(self):
        result = []
        self._inorder_recursive(self.root, result)
        print(f"Inorder: {result}")
    
    def _inorder_recursive(self, node, result):
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.value)
            self._inorder_recursive(node.right, result)

n = int(input("Enter the number of elements: "))
bst = BST()
print(f"Enter {n} elements:")
for i in range(n):
    bst.insert(int(input()))

bst.inorder()`,

  hashTable: () => `# Python 3 — Hash Table (Dictionary)
class HashTable:
    def __init__(self):
        self.table = {}
    
    def insert(self, key, value):
        self.table[key] = value
        print(f"Inserted key={key}, value={value}")
    
    def lookup(self, key):
        if key in self.table:
            print(f"Found: key={key}, value={self.table[key]}")
            return self.table[key]
        else:
            print(f"Key {key} not found")
            return None
    
    def display(self):
        print(f"Hash Table: {self.table}")

n = int(input("Enter the number of key-value pairs: "))
ht = HashTable()
print(f"Enter {n} key-value pairs (one per line, space-separated):")
for i in range(n):
    key, value = input().split()
    ht.insert(key, int(value))

ht.display()

lookup_key = input("Enter a key to lookup: ")
ht.lookup(lookup_key)`,

    bfs: () => `# Python 3 — Breadth-First Search (BFS)
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    traversal = []
    
    while queue:
        node = queue.popleft()
        traversal.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return traversal

print("Enter graph as adjacency list:")
print("Example format: 0 1 2")
n = int(input("Number of nodes: "))
graph = {}
print(f"Enter adjacency list for each node (space-separated neighbors):")
for i in range(n):
    neighbors = list(map(int, input(f"Neighbors of {i}: ").split()))
    graph[i] = neighbors

start = int(input("Enter starting node: "))
result = bfs(graph, start)
print(f"\\nBFS Traversal: {result}")`,

    dfs: () => `# Python 3 — Depth-First Search (DFS)
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    traversal = [node]
    
    for neighbor in graph.get(node, []):
        if neighbor not in visited:
            traversal.extend(dfs(graph, neighbor, visited))
    
    return traversal

print("Enter graph as adjacency list:")
n = int(input("Number of nodes: "))
graph = {}
print(f"Enter adjacency list for each node (space-separated neighbors):")
for i in range(n):
    neighbors = list(map(int, input(f"Neighbors of {i}: ").split()))
    graph[i] = neighbors

start = int(input("Enter starting node: "))
result = dfs(graph, start)
print(f"\\nDFS Traversal: {result}")`,

    dijkstra: () => `# Python 3 — Dijkstra's Algorithm
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_dist, current_node = heapq.heappop(pq)
        if current_dist > distances[current_node]:
            continue
        
        for neighbor, weight in graph[current_node]:
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances

print("Enter weighted graph:")
n = int(input("Number of nodes: "))
graph = {i: [] for i in range(n)}
edges = int(input("Number of edges: "))
print("Enter each edge as: source destination weight")
for _ in range(edges):
    src, dst, weight = map(int, input().split())
    graph[src].append((dst, weight))

start = int(input("Enter starting node: "))
distances = dijkstra(graph, start)
print(f"\\nShortest distances from {start}: {distances}")`,

    slidingWindow: () => `# Python 3 — Sliding Window (Maximum in Window)
def sliding_window_max(arr, k):
    if k > len(arr):
        return []
    
    from collections import deque
    dq = deque()
    result = []
    
    for i in range(len(arr)):
        while dq and dq[0][1] < i - k + 1:
            dq.popleft()
        
        while dq and dq[-1][0] <= arr[i]:
            dq.pop()
        
        dq.append((arr[i], i))
        
        if i >= k - 1:
            result.append(dq[0][0])
    
    return result

n = int(input("Enter array size: "))
arr = []
print(f"Enter {n} elements:")
for i in range(n):
    arr.append(int(input()))

k = int(input("Enter window size: "))
result = sliding_window_max(arr, k)
print(f"\\nOriginal array: {arr}")
print(f"Window size: {k}")
print(f"Maximum in each window: {result}")`,

    kruskal: () => `# Python 3 — Kruskal's Algorithm (MST)
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px != py:
            self.parent[px] = py
            return True
        return False

def kruskal(n, edges):
    edges.sort(key=lambda x: x[2])
    uf = UnionFind(n)
    mst = []
    total_weight = 0
    
    for u, v, weight in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
            total_weight += weight
    
    return mst, total_weight

n = int(input("Number of nodes: "))
m = int(input("Number of edges: "))
edges = []
print("Enter each edge as: node1 node2 weight")
for _ in range(m):
    u, v, w = map(int, input().split())
    edges.append((u, v, w))

mst, total_weight = kruskal(n, edges)
print(f"\\nMinimum Spanning Tree: {mst}")
print(f"Total weight: {total_weight}")`,

    prims: () => `# Python 3 — Prim's Algorithm (MST)
def prims(graph, n):
    visited = [False] * n
    min_edge = [float('inf')] * n
    mst_weight = 0
    mst_edges = []
    
    min_edge[0] = 0
    
    for _ in range(n):
        u = min((i for i in range(n) if not visited[i]), key=lambda x: min_edge[x])
        visited[u] = True
        mst_weight += min_edge[u]
        
        if min_edge[u] != float('inf'):
            for v, w in graph.get(u, []):
                if not visited[v] and w < min_edge[v]:
                    min_edge[v] = w
                    mst_edges.append((u, v, w))
    
    return mst_edges, mst_weight

n = int(input("Number of nodes: "))
m = int(input("Number of edges: "))
graph = {i: [] for i in range(n)}
print("Enter each edge as: node1 node2 weight")
for _ in range(m):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))
    graph[v].append((u, w))

mst_edges, total_weight = prims(graph, n)
print(f"\\nMinimum Spanning Tree: {mst_edges}")
print(f"Total weight: {total_weight}")`,

    astar: () => `# Python 3 — A* Pathfinding Algorithm
import heapq
import math

def heuristic(pos, goal):
    return math.sqrt((pos[0] - goal[0])**2 + (pos[1] - goal[1])**2)

def astar(grid, start, goal):
    open_set = [(0, start)]
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}
    visited = set()
    
    while open_set:
        _, current = heapq.heappop(open_set)
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            return path[::-1]
        
        visited.add(current)
        x, y = current
        
        for dx, dy in [(0,1), (0,-1), (1,0), (-1,0)]:
            neighbor = (x + dx, y + dy)
            if (0 <= neighbor[0] < len(grid) and 
                0 <= neighbor[1] < len(grid[0]) and 
                grid[neighbor[0]][neighbor[1]] == 0 and 
                neighbor not in visited):
                
                tentative_g = g_score[current] + 1
                if neighbor not in g_score or tentative_g < g_score[neighbor]:
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g
                    f_score[neighbor] = tentative_g + heuristic(neighbor, goal)
                    heapq.heappush(open_set, (f_score[neighbor], neighbor))
    
    return []

rows = int(input("Enter grid rows: "))
cols = int(input("Enter grid columns: "))
grid = []
print(f"Enter {rows} rows of {cols} values (0=walkable, 1=obstacle):")
for i in range(rows):
    row = list(map(int, input().split()))
    grid.append(row)

start_x, start_y = map(int, input("Enter start position (x y): ").split())
goal_x, goal_y = map(int, input("Enter goal position (x y): ").split())

path = astar(grid, (start_x, start_y), (goal_x, goal_y))
print(f"\\nPath found: {path}")
print(f"Path length: {len(path)}")
` 
};

export default pythonCodeTemplates;
