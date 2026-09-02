/**
 * Centralized API service layer for communicating with the DSA Visualizer backend.
 * All backend API calls should go through this service to ensure consistent
 * error handling, authentication token management, and request/response handling.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.baseUrl = API_URL;
    this.token = localStorage.getItem('authToken');
  }

  /**
   * Set authentication token
   */
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  /**
   * Clear authentication token
   */
  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  /**
   * Get authorization headers
   */
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Make API request with error handling
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: this.getHeaders(options.includeAuth !== false),
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);

      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken();
          window.dispatchEvent(new Event('auth-expired'));
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request Failed: ${endpoint}`, error);
      throw error;
    }
  }

  // ============================================
  // AUTHENTICATION ENDPOINTS
  // ============================================

  /**
   * Register a new user
   */
  async register(email, username, password, confirmPassword) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, username, password, confirmPassword }),
      includeAuth: false,
    });
  }

  /**
   * Login user
   */
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      includeAuth: false,
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  /**
   * Logout user
   */
  logout() {
    this.clearToken();
  }

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    return this.request('/auth/me', {
      method: 'GET',
    });
  }

  // ============================================
  // SORTING ALGORITHM ENDPOINTS
  // ============================================

  /**
   * Execute Bubble Sort
   */
  async executeBubbleSort(array) {
    return this.request('/algorithms/sorting/bubble', {
      method: 'POST',
      body: JSON.stringify({ array }),
    });
  }

  /**
   * Execute Selection Sort
   */
  async executeSelectionSort(array) {
    return this.request('/algorithms/sorting/selection', {
      method: 'POST',
      body: JSON.stringify({ array }),
    });
  }

  /**
   * Execute Insertion Sort
   */
  async executeInsertionSort(array) {
    return this.request('/algorithms/sorting/insertion', {
      method: 'POST',
      body: JSON.stringify({ array }),
    });
  }

  /**
   * Execute Merge Sort
   */
  async executeMergeSort(array) {
    return this.request('/algorithms/sorting/merge', {
      method: 'POST',
      body: JSON.stringify({ array }),
    });
  }

  /**
   * Execute Quick Sort
   */
  async executeQuickSort(array) {
    return this.request('/algorithms/sorting/quick', {
      method: 'POST',
      body: JSON.stringify({ array }),
    });
  }

  /**
   * Execute Heap Sort
   */
  async executeHeapSort(array) {
    return this.request('/algorithms/sorting/heap', {
      method: 'POST',
      body: JSON.stringify({ array }),
    });
  }

  /**
   * Generic sorting algorithm executor
   */
  async executeSortingAlgorithm(algorithmName, array) {
    const algorithms = {
      'Bubble Sort': this.executeBubbleSort,
      'Selection Sort': this.executeSelectionSort,
      'Insertion Sort': this.executeInsertionSort,
      'Merge Sort': this.executeMergeSort,
      'Quick Sort': this.executeQuickSort,
      'Heap Sort': this.executeHeapSort,
    };

    const executor = algorithms[algorithmName];
    if (!executor) {
      throw new Error(`Unknown sorting algorithm: ${algorithmName}`);
    }

    return executor.call(this, array);
  }

  // ============================================
  // GRAPH ALGORITHM ENDPOINTS
  // ============================================

  /**
   * Execute BFS (Breadth-First Search)
   */
  async executeBFS(adjacencyList, weights, startVertex) {
    return this.request('/algorithms/graph/bfs', {
      method: 'POST',
      body: JSON.stringify({ adjacencyList, weights, startVertex }),
    });
  }

  /**
   * Execute DFS (Depth-First Search)
   */
  async executeDFS(adjacencyList, weights, startVertex) {
    return this.request('/algorithms/graph/dfs', {
      method: 'POST',
      body: JSON.stringify({ adjacencyList, weights, startVertex }),
    });
  }

  /**
   * Execute Kruskal's Algorithm (MST)
   */
  async executeKruskal(adjacencyList, weights) {
    return this.request('/algorithms/graph/kruskal', {
      method: 'POST',
      body: JSON.stringify({ adjacencyList, weights }),
    });
  }

  /**
   * Execute Prim's Algorithm (MST)
   */
  async executePrim(adjacencyList, weights, startVertex) {
    return this.request('/algorithms/graph/prim', {
      method: 'POST',
      body: JSON.stringify({ adjacencyList, weights, startVertex }),
    });
  }

  /**
   * Generic graph algorithm executor
   */
  async executeGraphAlgorithm(algorithmName, adjacencyList, weights, startVertex = null) {
    const algorithms = {
      'BFS': this.executeBFS,
      'DFS': this.executeDFS,
      "Kruskal's": this.executeKruskal,
      "Prim's": this.executePrim,
    };

    const executor = algorithms[algorithmName];
    if (!executor) {
      throw new Error(`Unknown graph algorithm: ${algorithmName}`);
    }

    if (algorithmName === "Kruskal's") {
      return executor.call(this, adjacencyList, weights);
    }

    return executor.call(this, adjacencyList, weights, startVertex);
  }

  // ============================================
  // PATHFINDING ALGORITHM ENDPOINTS
  // ============================================

  /**
   * Execute Dijkstra's Algorithm
   */
  async executeDijkstra(grid, start, end) {
    return this.request('/algorithms/pathfinding/dijkstra', {
      method: 'POST',
      body: JSON.stringify({ grid, start, end }),
    });
  }

  /**
   * Execute A* Search Algorithm
   */
  async executeAStar(grid, start, end) {
    return this.request('/algorithms/pathfinding/astar', {
      method: 'POST',
      body: JSON.stringify({ grid, start, end }),
    });
  }

  /**
   * Generic pathfinding algorithm executor
   */
  async executePathfindingAlgorithm(algorithmName, grid, start, end) {
    const algorithms = {
      'Dijkstra': this.executeDijkstra,
      'A*': this.executeAStar,
    };

    const executor = algorithms[algorithmName];
    if (!executor) {
      throw new Error(`Unknown pathfinding algorithm: ${algorithmName}`);
    }

    return executor.call(this, grid, start, end);
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.token;
  }

  /**
   * Test API connection
   */
  async testConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/docs/api-docs`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export default new ApiService();

// Export class for testing purposes
export { ApiService };
