import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { ALGORITHM_DETAILS } from '../utils/complexityData';

export const SearchModal = ({ isOpen, onClose, onSelectAlgorithm }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      } else if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = Object.entries(ALGORITHM_DETAILS)
    .filter(([id, data]) => {
      const q = query.toLowerCase();
      return (
        data.name.toLowerCase().includes(q) ||
        data.category.toLowerCase().includes(q) ||
        data.description.toLowerCase().includes(q)
      );
    })
    .slice(0, 8);

  const handleSelect = (id, category) => {
    let page = 'sorting';
    if (category === 'Graph Traversal' || category === 'Minimum Spanning Tree') page = 'graph';
    else if (category === 'Pathfinding') page = 'pathfinding';
    else if (category === 'Data Structures') page = 'dataStructures';
    else if (category === 'Algorithmic Techniques') page = 'slidingWindow';

    onSelectAlgorithm(page, id);
    onClose(false);
    setQuery('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search algorithms, techniques, complexity..."
            autoFocus
            className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={() => onClose(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No matching algorithms or structures found.
            </div>
          ) : (
            results.map(([id, item]) => (
              <button
                key={id}
                onClick={() => handleSelect(id, item.category)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-left transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 border border-brand-500/20 font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all ml-2" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with mouse or enter</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
};
