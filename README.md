# 🚀 DSA Visualizer — Full-Stack Interactive Data Structures & Algorithms Lab

> **A modern, responsive, production-quality full-stack application that transforms abstract algorithms into interactive visual experiences. Built with React 18 (frontend) and Java/Spring Boot (backend), featuring real-time step-by-step algorithm visualization with a complete authentication system and persistence layer.**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=java&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.0-6DB33F?logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [UI Layout & Hierarchy](#-ui-layout--hierarchy)
- [Algorithms & Data Structures Implemented](#-algorithms--data-structures-implemented)
- [Tech Stack](#-tech-stack)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Keyboard Shortcuts](#-keyboard-shortcuts)

---

## 🌟 Overview

**DSA Visualizer** makes abstract algorithmic mechanisms intuitive through **deterministic, step-by-step visualizations**, live pseudocode tracing, Big-O complexity tables, real-time operation counters, and interactive sandbox environments.

Every algorithm is implemented as an **independent pure step generator**, decoupling computational logic from UI rendering to allow true play/pause/single-step inspection.

---

## 🖥️ UI Layout & Hierarchy

The visual layout is engineered for optimal developer experience:
1. **Algorithm & Mode Selectors**: Switch algorithm variants with instant hot swapping.
2. **Graphical Visualizer Canvas (Primary Top Focus)**: Visual elements (Array Bars, SVG Graph, 2D Grid, BST Tree, or Hash Table) are front-and-center.
3. **Playback Controls (Directly Below Canvas)**: Easy-access toolbar for Play/Pause, Step Forward/Back, Speed (0.25x - 10x), and Reset.
4. **Stats HUD & Live Commentary**: Real-time operation counters and explanatory descriptions.
5. **Complexity Table & Code Panel**: Theoretical Big-O reference matrix and syntax-highlighted pseudocode.

---

## 📚 Algorithms & Data Structures Implemented

### 1. Sorting Algorithms & Benchmark
- **Bubble Sort**: $O(n^2)$ with early-exit optimization.
- **Selection Sort**: $O(n^2)$ minimizing memory writes.
- **Insertion Sort**: $O(n^2)$ adaptive sorting.
- **Merge Sort**: $O(n \log n)$ divide-and-conquer.
- **Quick Sort**: $O(n \log n)$ Lomuto partitioning.
- **Heap Sort**: $O(n \log n)$ in-place max-heap sift-down.
- **Multi-Algorithm Benchmark**: Side-by-side empirical performance comparison.

### 2. Graph & Minimum Spanning Tree (MST)
- **Breadth-First Search (BFS)**: FIFO queue level-order traversal.
- **Depth-First Search (DFS)**: LIFO stack / recursive backtracking.
- **Kruskal's Algorithm (MST)**: Disjoint-Set Union (DSU) with cycle detection on weighted graphs.
- **Prim's Algorithm (MST)**: Greedy cut Priority Queue minimum-weight edge growth.

### 3. Pathfinding Lab
- **Dijkstra's Algorithm**: Uniform cost shortest path with distance relaxation.
- **A\* Search Algorithm**: Heuristic-guided search utilizing Manhattan distance $f(n) = g(n) + h(n)$.

### 4. Algorithmic Techniques
- **Sliding Window Technique**: Fixed window size ($K$) and variable two-pointer optimization reducing $O(n \cdot K)$ loops to $O(n)$ linear time.

### 5. Data Structures Lab
- **Stack**: LIFO operations with top pointer and overflow/underflow handling.
- **Queue**: FIFO operations with front & rear pointer synchronization.
- **Singly Linked List**: Dynamic node allocation with pointer traversal tracing.
- **Binary Search Tree (BST)**: Coordinate layout with *Inorder*, *Preorder*, *Postorder*, and *Level Order* traversals.
- **Hash Table**: Hash computation ($h(k) = k \pmod M$) with **Separate Chaining** collision resolution.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Graphics**: HTML5 Canvas & SVG Vector Graphics
- **State Management**: React Hooks & Context API with LocalStorage persistence

### Backend (NEW!)
- **Language**: Java 21
- **Framework**: Spring Boot 3.3.0
- **Authentication**: JWT + BCrypt
- **Database**: PostgreSQL 16
- **API Documentation**: Swagger/OpenAPI 3.0
- **Build Tool**: Maven
- **Testing**: JUnit 5

### DevOps
- **Containerization**: Docker & Docker Compose
- **Version Control**: Git

---

## 💻 Getting Started & Local Setup

### Quick Start with Docker (Recommended)

This is the easiest way to run the entire full-stack application:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/dsa-visualizer.git
cd dsa-visualizer

# 2. Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Start the complete stack
docker-compose up -d

# 4. Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:8080/api
# Swagger Docs: http://localhost:8080/api/docs/swagger-ui.html
# Database: localhost:5432 (username: postgres, password: postgres)

# 5. View logs
docker-compose logs -f
```

### Local Development Setup (Manual)

#### Prerequisites
- **Java 21+** and Maven 3.9+
- **Node.js 18+** and npm
- **PostgreSQL 14+**

#### Backend Setup

```bash
# 1. Start PostgreSQL (or use Docker for just the DB)
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=dsa_visualizer \
  -p 5432:5432 \
  postgres:16-alpine

# 2. Configure backend
cd backend
cp .env.example .env
# Edit .env with your database credentials

# 3. Build and run
mvn clean install
mvn spring-boot:run

# Backend will start at http://localhost:8080/api
# Swagger UI: http://localhost:8080/api/docs/swagger-ui.html
```

#### Frontend Setup (in new terminal)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start development server
npm run dev

# Frontend will start at http://localhost:5173
```

#### Build Production Versions

**Frontend:**
```bash
cd frontend
npm run build  # Creates dist/ directory
npm run preview  # Preview production build
```

**Backend:**
```bash
cd backend
mvn clean package  # Creates target/dsa-visualizer-backend-1.0.0.jar
java -jar target/dsa-visualizer-backend-1.0.0.jar  # Run JAR
```

---

## 🔗 Architecture

```
User Interface (React)
        ↓
Interactive Visualization & Controls
        ↓
API Service Layer
        ↓
REST API Calls (HTTP/JSON)
        ↓
┌─────────────────────────────────┐
│  Spring Boot Backend            │
│  ┌─────────────────────────────┐│
│  │ REST Controllers            ││
│  ├─────────────────────────────┤│
│  │ Algorithm Services          ││
│  │ (Step Generators)           ││
│  ├─────────────────────────────┤│
│  │ Java DSA Implementations    ││
│  │ • Sorting                   ││
│  │ • Graph Algorithms          ││
│  │ • Pathfinding               ││
│  ├─────────────────────────────┤│
│  │ Database Layer (JPA)        ││
│  └─────────────────────────────┘│
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│ PostgreSQL Database             │
│ • User Accounts                 │
│ • Learning Progress             │
│ • Favorites & Bookmarks         │
└─────────────────────────────────┘
```

---

## 🎯 API Endpoints

### Authentication
```
POST   /auth/register          Register new user
POST   /auth/login             Login with credentials
GET    /auth/me                Get current user profile
```

### Sorting Algorithms
```
POST   /algorithms/sorting/bubble
POST   /algorithms/sorting/selection
POST   /algorithms/sorting/insertion
POST   /algorithms/sorting/merge
POST   /algorithms/sorting/quick
POST   /algorithms/sorting/heap
```

### Graph Algorithms
```
POST   /algorithms/graph/bfs           Breadth-First Search
POST   /algorithms/graph/dfs           Depth-First Search
POST   /algorithms/graph/kruskal       Kruskal's MST
POST   /algorithms/graph/prim          Prim's MST
```

### Pathfinding
```
POST   /algorithms/pathfinding/dijkstra    Dijkstra's Algorithm
POST   /algorithms/pathfinding/astar       A* Search
```

### Example API Call

```bash
curl -X POST http://localhost:8080/api/algorithms/sorting/quick \
  -H "Content-Type: application/json" \
  -d '{
    "array": [8, 3, 7, 1, 5, 2]
  }'
```

Response includes complete step-by-step execution:
```json
{
  "algorithm": "Quick Sort",
  "steps": [
    {
      "stepNumber": 0,
      "type": "INITIAL",
      "array": [8, 3, 7, 1, 5, 2],
      "statistics": { "comparisons": 0, "swaps": 0 }
    },
    // ... more steps
  ],
  "statistics": {
    "comparisons": 12,
    "swaps": 5,
    "totalSteps": 25
  },
  "complexity": {
    "bestCase": "O(n log n)",
    "averageCase": "O(n log n)",
    "worstCase": "O(n²)"
  }
}
```

---

## 📊 User Features

### Authentication & Progress Tracking
- User registration with email verification
- Secure JWT-based login
- Track completed algorithms
- Save favorite algorithms
- View learning dashboard
- Algorithm statistics and metrics

### Educational Features
- Step-by-step algorithm visualization
- Real-time operation counters
- Complexity analysis for each algorithm
- Pseudocode display
- Interactive sandbox environment
- Algorithm properties (stable, in-place, etc.)

---

## 🚀 Production Deployment

### Docker Compose Production Setup

```yaml
# Create docker-compose.prod.yml for production
# Update environment variables
# Use volume mounts for data persistence
# Enable health checks and restart policies
```

### Environment Variables Required

**Backend:**
- `DATABASE_URL` - PostgreSQL connection string
- `DATABASE_USERNAME` - Database user
- `DATABASE_PASSWORD` - Database password
- `JWT_SECRET` - Secret key for JWT signing (minimum 32 characters)

**Frontend:**
- `VITE_API_URL` - Backend API base URL

### Pre-deployment Checklist

- [ ] Update JWT_SECRET to strong random value
- [ ] Configure database backups
- [ ] Set up HTTPS/TLS certificates
- [ ] Update CORS_ALLOWED_ORIGINS
- [ ] Enable logging and monitoring
- [ ] Run security audit
- [ ] Load test the application
- [ ] Set up CI/CD pipeline

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test                           # Run all tests
mvn test -Dtest=BubbleSortTest    # Run specific test
mvn test jacoco:report            # Generate coverage report
```

### Frontend Tests
```bash
cd frontend
npm test                           # Run all tests
npm run test:coverage              # Generate coverage report
```

---

## 📖 Full Documentation

- **Backend Documentation**: See [backend/README.md](backend/README.md)
- **API Documentation**: Available at `http://localhost:8080/api/docs/swagger-ui.html` when backend is running
- **Frontend Architecture**: See component structure in `frontend/src/components/`

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 8080 is in use
lsof -i :8080

# Try different port
export SERVER_PORT=8081
mvn spring-boot:run
```

### Database Connection Failed
```bash
# Verify PostgreSQL is running
docker ps | grep postgres

# Check connection string in .env
# Ensure database dsa_visualizer exists
```

### Frontend Can't Connect to Backend
```bash
# Verify backend is running
curl http://localhost:8080/api/docs/api-docs

# Check VITE_API_URL in frontend/.env
# Check browser console for CORS errors
```

### Docker Compose Issues
```bash
# Rebuild images
docker-compose build --no-cache

# Remove all containers and volumes
docker-compose down -v

# Start fresh
docker-compose up -d
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / Pause Visualizer |
| `→` (Right Arrow) | Step Forward |
| `←` (Left Arrow) | Step Backward |
| `R` | Reset Visualizer |
| `Ctrl + K` / `Cmd + K` | Open Quick Search Modal |
| `Esc` | Close Modals |

---

## 📄 License

MIT License © 2026. Built with ❤️ for computer science students and software engineers worldwide.
