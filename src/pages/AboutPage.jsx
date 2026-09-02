import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Sparkles, 
  Code2, 
  Github, 
  ExternalLink, 
  CheckCircle2,
  BookOpen,
  Zap
} from 'lucide-react';

export const AboutPage = () => {
  const technologies = [
    { name: 'React 18', desc: 'Component architecture, modular state management, and optimized virtual DOM updates' },
    { name: 'Vite', desc: 'Next-generation fast frontend tooling and ultra-low latency Hot Module Replacement' },
    { name: 'Tailwind CSS', desc: 'Utility-first modern styling with custom dark/light color palette and smooth transitions' },
    { name: 'Lucide React', desc: 'Clean, consistent developer-tool iconography' },
    { name: 'Pure Generator Architecture', desc: 'Strict decoupling of core algorithm logic from UI state for deterministic step playback' },
    { name: 'HTML Canvas & SVG', desc: 'High-performance interactive vector drawing with node dragging and matrix manipulation' },
  ];

  const implementedModules = [
    { title: 'Sorting Algorithms', items: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort (Lomuto)', 'Heap Sort', 'Multi-Algorithm Benchmark Engine'] },
    { title: 'Graph Traversal', items: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Interactive node dragging & topology sandbox', 'Live frontier queue & call-stack monitor'] },
    { title: 'Pathfinding Lab', items: ["Dijkstra's Shortest Path", 'A* Search with Manhattan Heuristics', 'Interactive wall painting & movable targets', 'Random maze & obstacle generator'] },
    { title: 'Data Structures', items: ['Stack (LIFO) with Overflow/Underflow', 'Queue (FIFO) with Front & Rear pointers', 'Singly Linked List with pointer tracing', 'Binary Search Tree (BST) with 4 Traversals'] },
  ];

  return (
    <div className="space-y-10 pb-16 max-w-4xl mx-auto">
      
      {/* Hero / Mission Statement */}
      <div className="rounded-3xl bg-gradient-to-br from-brand-900/30 via-slate-900/80 to-slate-950 border border-brand-500/20 p-8 sm:p-10 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-brand-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>About The Project</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          DSA Visualizer Platform
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          DSA Visualizer is an interactive learning platform designed to make algorithms easier to understand by turning abstract operations into visual, step-by-step animations. Built as a production-grade developer portfolio project, it bridges the gap between theoretical Big-O complexity and concrete data structure mutations.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-md shadow-brand-500/25 transition-all"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
          >
            <ExternalLink className="w-4 h-4 text-brand-400" />
            <span>Developer Portfolio</span>
          </a>
        </div>
      </div>

      {/* Architecture Highlights */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-500" />
          <span>Architectural Design & Engine</span>
        </h2>
        
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Unlike traditional educational demos where animations are tightly coupled with <code className="text-brand-500 font-mono">setTimeout</code> calls inside React components, <strong>DSA Visualizer</strong> implements a <strong>fully decoupled step-event architecture</strong>:
          </p>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800">
            Algorithm Function → Deterministic Step Events Array → Universal Playback Engine → React Canvas/SVG Renderer
          </div>

          <ul className="space-y-2 pt-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Pure Step Generators:</strong> Every algorithm is a pure JavaScript function that takes inputs and produces an immutable array of atomic steps (<code className="text-brand-400">compare</code>, <code className="text-brand-400">swap</code>, <code className="text-brand-400">visitNode</code>, <code className="text-brand-400">markSorted</code>).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Deterministic Replay:</strong> Supports full forward stepping, backward stepping, speed regulation, pausing, and instantaneous resetting without memory leaks or race conditions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Zero Backend Dependency:</strong> Completely standalone client-side execution with fast browser localStorage caching for preferences and settings.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-brand-500" />
          <span>Technologies & Tools</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {technologies.map(tech => (
            <div
              key={tech.name}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1"
            >
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                <span>{tech.name}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Implemented Algorithms Breakdown */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-500" />
          <span>Implemented Modules & Features</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {implementedModules.map(mod => (
            <div
              key={mod.title}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {mod.title}
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {mod.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Goals */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-brand-500/10 via-indigo-500/5 to-cyan-500/10 border border-brand-500/20 space-y-2">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-500" />
          <span>Learning Objectives</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Designed to assist students, self-taught developers, and interview candidates in developing intuitive mental models of algorithmic execution, understanding time/space trade-offs, and visualizing how pointers and data structures evolve in real-time.
        </p>
      </section>

    </div>
  );
};
