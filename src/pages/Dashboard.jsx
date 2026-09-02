import React from 'react';
import { 
  ArrowUpDown, 
  Network, 
  Compass, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  Play, 
  ArrowLeftRight,
  BookOpen
} from 'lucide-react';

export const Dashboard = ({ onNavigate }) => {
  const categories = [
    {
      id: 'sorting',
      title: 'Sorting Algorithms',
      icon: ArrowUpDown,
      count: '6 Algorithms',
      description: 'Explore comparison and divide-and-conquer sorting routines with real-time bar animation.',
      color: 'from-blue-500/20 to-indigo-500/10',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-500',
    },
    {
      id: 'graph',
      title: 'Graph & MST Lab',
      icon: Network,
      count: 'BFS, DFS, Kruskal, Prim',
      description: 'Build interactive graph topologies, drag nodes, and visualize MST & traversals.',
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-500',
    },
    {
      id: 'pathfinding',
      title: 'Pathfinding Lab',
      icon: Compass,
      count: 'Dijkstra & A*',
      description: 'Draw custom wall mazes and watch greedy & heuristic shortest path algorithms in action.',
      color: 'from-amber-500/20 to-orange-500/10',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-500',
    },
    {
      id: 'dataStructures',
      title: 'Data Structures',
      icon: Layers,
      count: 'Stack, Queue, LL, BST, Hash',
      description: 'Interact with linear structures, BST traversals, and Hash Table separate chaining.',
      color: 'from-purple-500/20 to-pink-500/10',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-500',
    },
    {
      id: 'slidingWindow',
      title: 'Sliding Window',
      icon: ArrowLeftRight,
      count: 'O(n) Technique',
      description: 'Dynamic two-pointer window expansion and contraction for linear array optimization.',
      color: 'from-cyan-500/20 to-blue-500/10',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-500',
    },
  ];

  const featuredAlgorithms = [
    { name: 'Bubble Sort', category: 'Sorting', page: 'sorting', algoKey: 'bubbleSort', difficulty: 'Easy', time: 'O(n²)', space: 'O(1)', badge: 'Foundational' },
    { name: 'Merge Sort', category: 'Sorting', page: 'sorting', algoKey: 'mergeSort', difficulty: 'Medium', time: 'O(n log n)', space: 'O(n)', badge: 'Divide & Conquer' },
    { name: 'Quick Sort', category: 'Sorting', page: 'sorting', algoKey: 'quickSort', difficulty: 'Medium', time: 'O(n log n)', space: 'O(log n)', badge: 'Fast In-Place' },
    { name: "Kruskal's Algorithm", category: 'Graph MST', page: 'graph', algoKey: 'kruskal', difficulty: 'Medium', time: 'O(E log E)', space: 'O(V)', badge: 'DSU Cycle Check' },
    { name: "Prim's Algorithm", category: 'Graph MST', page: 'graph', algoKey: 'prim', difficulty: 'Medium', time: 'O(E log V)', space: 'O(V)', badge: 'Greedy Cut' },
    { name: 'Sliding Window (Max Sum)', category: 'Techniques', page: 'slidingWindow', algoKey: 'slidingWindow', difficulty: 'Medium', time: 'O(n)', space: 'O(1)', badge: 'Two Pointers' },
    { name: 'Hash Table', category: 'Data Structures', page: 'dataStructures', algoKey: 'hashTable', difficulty: 'Medium', time: 'O(1) avg', space: 'O(n)', badge: 'Separate Chaining' },
    { name: "Dijkstra's Algorithm", category: 'Pathfinding', page: 'pathfinding', algoKey: 'dijkstra', difficulty: 'Medium', time: 'O((V+E) log V)', space: 'O(V)', badge: 'Shortest Path' },
    { name: 'A* Search', category: 'Pathfinding', page: 'pathfinding', algoKey: 'astar', difficulty: 'Hard', time: 'O(E)', space: 'O(V)', badge: 'Manhattan Heuristic' },
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900/30 via-slate-900/80 to-slate-950 border border-brand-500/20 p-8 sm:p-12 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Algorithmic Learning Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Visualize. Understand. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-400">
              Master DSA.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            An interactive playground for exploring data structures and algorithms through deterministic step-by-step animations, pseudocode tracing, complexity tables, and empirical benchmark comparisons.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('sorting')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Visualizing</span>
            </button>

            <button
              onClick={() => onNavigate('algorithms')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-sm font-medium hover:scale-[1.02] active:scale-95 transition-all"
            >
              <BookOpen className="w-4 h-4 text-brand-400" />
              <span>Explore All Algorithms</span>
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Algorithm Categories
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Choose a domain to start experimenting with interactive animations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate(cat.id)}
                className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/90 p-5 shadow-xs hover:shadow-xl hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color} border ${cat.borderColor}`}>
                      <Icon className={`w-4 h-4 ${cat.iconColor}`} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Algorithms Spotlight */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Featured Algorithms
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Core algorithms and techniques frequently asked in technical interviews
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredAlgorithms.map((algo) => (
            <div
              key={algo.name}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    {algo.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {algo.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {algo.name}
                  </h3>
                  <span className="inline-block mt-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Badge: {algo.badge}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 font-sans block">Time:</span>
                    <span className="font-bold text-amber-500">{algo.time}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 font-sans block">Space:</span>
                    <span className="font-bold text-cyan-500">{algo.space}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate(algo.page, algo.algoKey)}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Visualize {algo.name}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
