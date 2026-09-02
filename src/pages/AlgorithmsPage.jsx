import React, { useState, useMemo } from 'react';
import { ALGORITHM_DETAILS } from '../utils/complexityData';
import { 
  Search, 
  Play, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const AlgorithmsPage = ({ onNavigate, onSearchQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(onSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = ['All', 'Sorting', 'Graph Traversal', 'Minimum Spanning Tree', 'Pathfinding', 'Data Structures', 'Algorithmic Techniques'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const algorithmList = useMemo(() => {
    return Object.entries(ALGORITHM_DETAILS).map(([id, details]) => ({
      id,
      ...details,
    }));
  }, []);

  const filteredAlgorithms = useMemo(() => {
    return algorithmList.filter(algo => {
      const matchesSearch = 
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (algo.keyConcepts && algo.keyConcepts.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (algo.useCases && algo.useCases.some(u => u.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory = selectedCategory === 'All' || algo.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || algo.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [algorithmList, searchQuery, selectedCategory, selectedDifficulty]);

  const handleLaunch = (algo) => {
    let page = 'sorting';
    if (algo.category === 'Graph Traversal' || algo.category === 'Minimum Spanning Tree') page = 'graph';
    else if (algo.category === 'Pathfinding') page = 'pathfinding';
    else if (algo.category === 'Data Structures') page = 'dataStructures';
    else if (algo.category === 'Algorithmic Techniques') page = 'slidingWindow';

    onNavigate(page, algo.id);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-brand-500" />
          <span>Algorithms & Complexity Explorer</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Comprehensive reference catalog of classic computer science algorithms, asymptotic complexity analysis, key mechanisms, and real-world applications.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search algorithms, keywords, use cases, or concepts (e.g. 'kruskal', 'sliding window', 'hash table')..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {/* Categories & Difficulty Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium mr-1">Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium mr-1">Difficulty:</span>
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Algorithms Cards Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAlgorithms.length === 0 ? (
          <div className="col-span-2 py-16 text-center text-slate-500 dark:text-slate-400 space-y-3">
            <BookOpen className="w-10 h-10 mx-auto text-slate-400 opacity-50" />
            <p className="text-sm font-medium">No algorithms found matching your search query.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
              className="text-xs text-brand-500 hover:underline font-semibold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredAlgorithms.map(algo => (
            <div
              key={algo.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-brand-500/40 hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                      {algo.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {algo.name}
                    </h3>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                    algo.difficulty === 'Easy'
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : algo.difficulty === 'Medium'
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                  }`}>
                    {algo.difficulty}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {algo.description}
                </p>

                {/* Complexity Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  {algo.timeComplexity?.average && (
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-sans text-slate-400 block">Avg Time:</span>
                      <span className="font-bold text-amber-500">{algo.timeComplexity.average}</span>
                    </div>
                  )}
                  {algo.timeComplexity?.worst && (
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-sans text-slate-400 block">Worst Time:</span>
                      <span className="font-bold text-rose-500">{algo.timeComplexity.worst}</span>
                    </div>
                  )}
                  {algo.spaceComplexity && (
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-sans text-slate-400 block">Space:</span>
                      <span className="font-bold text-cyan-500">{algo.spaceComplexity}</span>
                    </div>
                  )}
                </div>

                {/* Key Concepts */}
                {algo.keyConcepts && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Concepts
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      {algo.keyConcepts.map((concept, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                          <span>{concept}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Launch CTA */}
              <button
                onClick={() => handleLaunch(algo)}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs group"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Interactive Visualizer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
