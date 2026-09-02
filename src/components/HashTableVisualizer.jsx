import React, { useState } from 'react';
import { Plus, Search, Trash2, ArrowRight, Hash, Database, AlertTriangle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const HashTableVisualizer = ({ model, onExecuteStep, activeHashIndex = null }) => {
  const [keyInput, setKeyInput] = useState('');
  const [valInput, setValInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { warning } = useToast();

  const handleInsert = (e) => {
    e.preventDefault();
    if (!keyInput) {
      warning('Please enter a key.', 'Invalid Key');
      return;
    }
    const val = valInput || `val-${keyInput}`;
    const numKey = !isNaN(Number(keyInput)) ? Number(keyInput) : keyInput;
    const { steps } = model.insert(numKey, val);
    onExecuteStep(steps);
    setKeyInput('');
    setValInput('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput) {
      warning('Please enter a key to search.', 'Invalid Search');
      return;
    }
    const numKey = !isNaN(Number(searchInput)) ? Number(searchInput) : searchInput;
    const { steps } = model.search(numKey);
    onExecuteStep(steps);
  };

  const handleDelete = () => {
    if (!searchInput) {
      warning('Please enter a key in the search field to delete.', 'Key Required');
      return;
    }
    const numKey = !isNaN(Number(searchInput)) ? Number(searchInput) : searchInput;
    const { steps } = model.deleteKey(numKey);
    onExecuteStep(steps);
  };

  const handleClear = () => {
    const steps = model.clear();
    onExecuteStep(steps);
  };

  return (
    <div className="space-y-6">
      
      {/* Controls Form */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        
        {/* Insert key-value */}
        <form onSubmit={handleInsert} className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Key (e.g. 23 or 'apple')"
            className="w-36 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none"
          />
          <input
            type="text"
            value={valInput}
            onChange={(e) => setValInput(e.target.value)}
            placeholder="Value"
            className="w-28 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-3.5 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl"
          >
            <Plus className="w-3.5 h-3.5" /> Insert (Key, Val)
          </button>
        </form>

        {/* Search & Delete */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Lookup Key"
            className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl"
          >
            <Search className="w-3.5 h-3.5" /> Search
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-2 text-slate-500 hover:text-rose-500 rounded-xl"
          >
            Clear
          </button>
        </form>

      </div>

      {/* Hash Table Visual Grid */}
      <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-inner space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-2 border-b border-slate-800">
          <span>Hash Function: <strong>h(k) = k % {model.size}</strong></span>
          <span>Collision Strategy: <strong>Separate Chaining</strong></span>
        </div>

        <div className="space-y-2 pt-2">
          {model.buckets.map((bucket, idx) => {
            const isActive = activeHashIndex === idx;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/40'
                    : 'border-slate-800 bg-slate-900/50'
                }`}
              >
                {/* Bucket Index */}
                <div className={`w-14 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 ${
                  isActive ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-300'
                }`}>
                  Slot [{idx}]
                </div>

                <div className="text-slate-600 text-xs">→</div>

                {/* Chained Linked Nodes */}
                <div className="flex items-center gap-2 overflow-x-auto min-h-[40px] flex-1">
                  {bucket.length === 0 ? (
                    <span className="text-slate-600 font-mono text-xs italic">null (Empty)</span>
                  ) : (
                    bucket.map((item, itemIdx) => (
                      <React.Fragment key={item.id}>
                        <div className="flex items-center px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs text-slate-200 shadow-sm flex-shrink-0">
                          <span className="font-bold text-brand-400 mr-1">{item.key}</span>
                          <span className="text-slate-400">: "{item.value}"</span>
                        </div>
                        {itemIdx < bucket.length - 1 && (
                          <span className="text-brand-500 font-bold text-xs">→</span>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>

                {bucket.length > 1 && (
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{bucket.length} Collision Chain</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
