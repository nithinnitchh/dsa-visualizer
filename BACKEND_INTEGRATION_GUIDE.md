# DSA Visualizer - Backend Integration Guide

This guide explains how to integrate the new Java/Spring Boot backend with your existing React frontend.

## Overview

The backend provides REST APIs that return algorithm execution steps in JSON format. Your React components can:

1. Send an array (or graph/grid) to the backend
2. Receive detailed step-by-step execution data
3. Animate the visualization based on the steps

## Key Files Created

### Backend
- `backend/src/main/java/com/dsavisualizer/` - All backend source code
- `backend/pom.xml` - Maven dependencies
- `backend/Dockerfile` - Docker configuration
- `backend/.env.example` - Environment variable template
- `backend/README.md` - Detailed backend documentation

### Frontend Integration Files
- `frontend/src/services/api.js` - Centralized API service
- `frontend/src/services/useAlgorithms.js` - React hooks for API calls
- `frontend/.env.example` - Environment variables template

## Quick Integration Steps

### Step 1: Set Up Environment Variables

**Frontend (`frontend/.env`):**
```
VITE_API_URL=http://localhost:8080/api
```

**Backend (`backend/.env`):**
```
DATABASE_URL=jdbc:postgresql://localhost:5432/dsa_visualizer
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET=your-secret-key-minimum-32-characters
```

### Step 2: Update React Components to Use API

#### Before (JavaScript Step Generator)
```jsx
import { generateBubbleSortSteps } from '../../algorithms/sorting/bubbleSort';

function SortingVisualizer() {
  const [steps, setSteps] = useState([]);
  
  const handleSort = (array) => {
    const steps = generateBubbleSortSteps(array);
    setSteps(steps);
  };
  
  return (/* ... */);
}
```

#### After (Backend API)
```jsx
import { useSortingAlgorithm } from '../../services/useAlgorithms';

function SortingVisualizer() {
  const { execute, steps, loading, error, statistics, complexity } = useSortingAlgorithm();
  
  const handleSort = async (array) => {
    try {
      await execute('Bubble Sort', array);
    } catch (err) {
      console.error('Sorting failed:', err);
    }
  };
  
  return (
    <div>
      {loading && <p>Sorting...</p>}
      {error && <p>Error: {error}</p>}
      {statistics && (
        <div>
          <p>Comparisons: {statistics.comparisons}</p>
          <p>Swaps: {statistics.swaps}</p>
        </div>
      )}
      {complexity && (
        <div>
          <p>Best Case: {complexity.bestCase}</p>
          <p>Worst Case: {complexity.worstCase}</p>
        </div>
      )}
      {/* Visualize steps */}
    </div>
  );
}
```

### Step 3: Available Hooks

#### useSortingAlgorithm()
```javascript
const { execute, result, steps, loading, error, statistics, complexity } = 
  useSortingAlgorithm();

// Usage
await execute('Quick Sort', [8, 3, 7, 1, 5, 2]);

// Returns
// {
//   execute: function,           // Call to run algorithm
//   result: {...},              // Full API response
//   steps: [{...}, ...],        // Step-by-step execution
//   loading: boolean,           // Loading state
//   error: string,              // Error message if any
//   statistics: {...},         // Algorithm statistics
//   complexity: {...}          // Time/space complexity
// }
```

#### useGraphAlgorithm()
```javascript
const { execute, result, steps, loading, error, statistics, complexity } = 
  useGraphAlgorithm();

// Usage - BFS
await execute('BFS', adjacencyList, weights, 'A');

// Usage - Kruskal
await execute("Kruskal's", adjacencyList, weights);
```

#### usePathfindingAlgorithm()
```javascript
const { execute, result, steps, loading, error, statistics, complexity } = 
  usePathfindingAlgorithm();

// Usage
await execute('Dijkstra', grid, [0, 0], [10, 10]);
```

#### useAuth()
```javascript
const { user, isAuthenticated, loading, error, login, register, logout } = useAuth();

// Login
await login('user@example.com', 'password');

// Register
await register('user@example.com', 'username', 'password', 'password');

// Logout
logout();
```

## Complete Example: Updating SortingPage

### Original Component (JavaScript-based)
```jsx
// src/pages/SortingPage.jsx
import { generateQuickSortSteps } from '../algorithms/sorting/quickSort';

export default function SortingPage() {
  const [array, setArray] = useState([8, 3, 7, 1, 5, 2]);
  const [steps, setSteps] = useState([]);
  
  const handleSort = () => {
    const steps = generateQuickSortSteps(array);
    setSteps(steps);
  };
  
  return (
    <div>
      <button onClick={handleSort}>Sort</button>
      {/* Visualize steps */}
    </div>
  );
}
```

### Updated Component (Backend API)
```jsx
// src/pages/SortingPage.jsx
import { useSortingAlgorithm } from '../services/useAlgorithms';

export default function SortingPage() {
  const [array, setArray] = useState([8, 3, 7, 1, 5, 2]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Quick Sort');
  const { execute, steps, loading, error, statistics, complexity } = useSortingAlgorithm();
  
  const handleSort = async () => {
    try {
      await execute(selectedAlgorithm, array);
    } catch (err) {
      console.error('Sorting failed:', err);
    }
  };
  
  return (
    <div>
      <select value={selectedAlgorithm} onChange={(e) => setSelectedAlgorithm(e.target.value)}>
        <option>Bubble Sort</option>
        <option>Selection Sort</option>
        <option>Insertion Sort</option>
        <option>Merge Sort</option>
        <option>Quick Sort</option>
        <option>Heap Sort</option>
      </select>
      
      <button onClick={handleSort} disabled={loading}>
        {loading ? 'Sorting...' : 'Sort'}
      </button>
      
      {error && <div className="error">{error}</div>}
      
      {complexity && (
        <div className="complexity">
          <h3>Complexity</h3>
          <p>Best: {complexity.bestCase}</p>
          <p>Average: {complexity.averageCase}</p>
          <p>Worst: {complexity.worstCase}</p>
          <p>Space: {complexity.spaceComplexity}</p>
        </div>
      )}
      
      {statistics && (
        <div className="statistics">
          <h3>Statistics</h3>
          <p>Comparisons: {statistics.comparisons}</p>
          <p>Swaps: {statistics.swaps}</p>
          <p>Array Accesses: {statistics.arrayAccesses}</p>
          <p>Total Steps: {statistics.totalSteps}</p>
          <p>Execution Time: {statistics.executionTimeMs}ms</p>
        </div>
      )}
      
      {steps.length > 0 && (
        <ArrayVisualizer steps={steps} />
      )}
    </div>
  );
}
```

## API Response Format

All algorithm responses follow this format:

```json
{
  "algorithm": "String",
  "category": "SORTING|GRAPH_TRAVERSAL|GRAPH_MST|PATHFINDING",
  "originalInput": {...},
  "result": {...},
  "steps": [
    {
      "stepNumber": 0,
      "type": "INITIAL|COMPARE|SWAP|ASSIGN|MARK_SORTED|...",
      "description": "Human-readable step description",
      "array": [1, 2, 3],                    // For sorting
      "indices": [0, 1],                      // Highlighted indices
      "statistics": {
        "comparisons": 0,
        "swaps": 0,
        "arrayAccesses": 0
      }
    },
    // ... more steps
  ],
  "totalSteps": 25,
  "statistics": {
    "comparisons": 12,
    "swaps": 5,
    "arrayAccesses": 42,
    "totalSteps": 25,
    "executionTimeMs": 2
  },
  "complexity": {
    "bestCase": "O(n log n)",
    "averageCase": "O(n log n)",
    "worstCase": "O(n²)",
    "spaceComplexity": "O(log n)",
    "isStable": false,
    "isInPlace": true
  },
  "success": true
}
```

## Error Handling

The API service automatically handles errors:

```javascript
const { execute, error } = useSortingAlgorithm();

try {
  await execute('Quick Sort', [8, 3, 7, 1, 5, 2]);
} catch (err) {
  // Error is automatically set in the hook
  console.log(error); // "API Error: 400 Bad Request"
}
```

## Authentication

Use the `useAuth()` hook for user management:

```jsx
import { useAuth } from '../services/useAlgorithms';

function LoginPage() {
  const { login, isAuthenticated, user, error, loading } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
      if (isAuthenticated) {
        // Redirect to dashboard
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  return (
    // Login form
  );
}
```

## Running the Application

### Option 1: Docker Compose (Recommended)
```bash
docker-compose up -d
# Frontend: http://localhost:5173
# Backend: http://localhost:8080/api
```

### Option 2: Local Development
```bash
# Terminal 1: Backend
cd backend
mvn spring-boot:run

# Terminal 2: Frontend
cd frontend
npm run dev
```

## Accessing Swagger Documentation

Once the backend is running, visit:
```
http://localhost:8080/api/docs/swagger-ui.html
```

This interactive documentation allows you to test all API endpoints directly.

## Performance Tips

1. **Caching**: The `useSortingAlgorithm()` hook caches results per algorithm
2. **Memoization**: Use React.memo for algorithm visualization components
3. **Lazy Loading**: Load only the algorithms the user needs
4. **Batch Requests**: If testing multiple algorithms, consider batch endpoints

## Troubleshooting

### "Failed to fetch from API"
- Verify backend is running (`http://localhost:8080/api`)
- Check `VITE_API_URL` in `frontend/.env`
- Check browser console for CORS errors

### "Invalid JWT token"
- User token may have expired
- Login again with `useAuth().login()`
- Clear localStorage and refresh

### "Algorithm not found"
- Verify algorithm name matches exactly (case-sensitive)
- Check available algorithms in the API documentation

## Next Steps

1. Update each component to use the appropriate hook (`useSortingAlgorithm`, etc.)
2. Remove the JavaScript algorithm implementations if no longer needed
3. Test all features thoroughly
4. Deploy to production with proper environment variables

## API Endpoints Reference

### Sorting
- `POST /algorithms/sorting/bubble`
- `POST /algorithms/sorting/selection`
- `POST /algorithms/sorting/insertion`
- `POST /algorithms/sorting/merge`
- `POST /algorithms/sorting/quick`
- `POST /algorithms/sorting/heap`

### Graph
- `POST /algorithms/graph/bfs`
- `POST /algorithms/graph/dfs`
- `POST /algorithms/graph/kruskal`
- `POST /algorithms/graph/prim`

### Pathfinding
- `POST /algorithms/pathfinding/dijkstra`
- `POST /algorithms/pathfinding/astar`

### Authentication
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

For detailed documentation, visit: `http://localhost:8080/api/docs/swagger-ui.html`
