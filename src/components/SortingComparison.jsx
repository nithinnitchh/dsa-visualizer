import React, { useState } from 'react';
import { runSortingBenchmark } from '../algorithms/sorting';
import { SORTING_ALGORITHMS } from '../utils/constants';
import { ALGORITHM_DETAILS } from '../utils/complexityData';
import { BarChart3, Play, CheckSquare, Square, Info, Sparkles, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const SortingComparison = () => {
  const [selectedAlgos, setSelectedAlgos] = useState([
    'bubbleSort',
    'insertionSort',
    'mergeSort',
    'quickSort',
  ]);
  const [sampleSize, setSampleSize] = useState(30);
  const [benchmarkResults, setBenchmarkResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const { success, warning } = useToast();

  const toggleAlgo = (id) => {
    if (selectedAlgos.includes(id)) {
      if (selectedAlgos.length === 1) {
        warning('Please keep at least 1 algorithm selected.', 'Selection Required');
        return;
      }
      setSelectedAlgos(selectedAlgos.filter(a => a !== id));
    } else {
      setSelectedAlgos([...selectedAlgos, id]);
    }
  };

  const handleRunBenchmark = () => {
    if (selectedAlgos.length === 0) return;
    setIsRunning(true);

    // Generate random array of sampleSize
    const sampleArray = Array.from({ length: sampleSize }, () => Math.floor(Math.random() * 95) + 5);

    setTimeout(() => {
      const results = runSortingBenchmark(selectedAlgos, sampleArray);
      setBenchmarkResults({
        sampleSize,
        sampleArray,
        results,
      });
      setIsRunning(false);
      success(`Benchmark completed on ${sampleSize} elements!`, 'Benchmark Done');
    }, 100);
  };

  const maxComparisons = benchmarkResults?.results
    ? Math.max(...benchmarkResults.results.map(r => r.comparisons), 1)
    : 1;

  const maxSwaps = benchmarkResults?.results
    ? Math.max(...benchmarkResults.results.map(r => r.swaps), 1)
    : 1;

  return (
    <div className="space-y-6">
      {/* Benchmark Configuration Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-500" />
              <span>Multi-Algorithm Comparative Benchmark</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select sorting algorithms and run them simultaneously on identical arrays to compare empirical operation counts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Input Size:</span>
              <select
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value={15}>15 items</option>
                <option value={30}>30 items</option>
                <option value={50}>50 items</option>
                <option value={100}>100 items</option>
              </select>
            </div>

            <button
              onClick={handleRunBenchmark}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-xl shadow-md shadow-brand-500/25 active:scale-95 transition-all disabled:opacity-50"
            >
              {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isRunning ? 'Running...' : 'Run Benchmark'}</span>
            </button>
          </div>
        </div>

        {/* Algorithm Select Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {SORTING_ALGORITHMS.map(algo => {
            const isSelected = selectedAlgos.includes(algo.id);
            return (
              <button
                key={algo.id}
                onClick={() => toggleAlgo(algo.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-brand-500/10 border-brand-500/30 text-brand-600 dark:text-brand-400'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400'
                }`}
              >
                {isSelected ? <CheckSquare className="w-3.5 h-3.5 text-brand-500" /> : <Square className="w-3.5 h-3.5" />}
                <span>{algo.name}</span>
                <span className="text-[10px] font-mono opacity-70">({algo.time})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Benchmark Results */}
      {benchmarkResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Comparisons Bar Chart */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Total Element Comparisons
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">Lower is better</span>
            </div>

            <div className="space-y-3 pt-2">
              {benchmarkResults.results.map(res => {
                const percent = Math.max(4, Math.round((res.comparisons / maxComparisons) * 100));
                return (
                  <div key={res.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">{res.name}</span>
                      <span className="font-mono font-bold text-amber-500">{res.comparisons.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Swaps & Writes Bar Chart */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Total Swaps / Array Writes
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">Lower is better</span>
            </div>

            <div className="space-y-3 pt-2">
              {benchmarkResults.results.map(res => {
                const percent = Math.max(4, Math.round((res.swaps / maxSwaps) * 100));
                return (
                  <div key={res.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">{res.name}</span>
                      <span className="font-mono font-bold text-rose-500">{res.swaps.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experimental Note */}
          <div className="col-span-1 lg:col-span-2 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300">
            <Info className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-900 dark:text-white">Measurement Note:</strong> Operation counts (comparisons, swaps, memory accesses) are experimental metrics captured directly during step generation on this specific random sample of size {sampleSize}. Asymptotic Big-O represents worst/average bounds across general input distributions.
            </p>
          </div>

        </div>
      )}

      {/* Comprehensive Complexity Comparison Matrix */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Theoretical Complexity Reference Matrix
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Algorithm</th>
                <th className="py-2.5 px-3">Best Case</th>
                <th className="py-2.5 px-3">Average Case</th>
                <th className="py-2.5 px-3">Worst Case</th>
                <th className="py-2.5 px-3">Space</th>
                <th className="py-2.5 px-3">Stable</th>
                <th className="py-2.5 px-3">In-Place</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
              {SORTING_ALGORITHMS.map(algo => {
                const details = ALGORITHM_DETAILS[algo.id] || {};
                return (
                  <tr key={algo.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-900 dark:text-white">
                      {algo.name}
                    </td>
                    <td className="py-2.5 px-3 text-emerald-500 font-bold">{details.timeComplexity?.best}</td>
                    <td className="py-2.5 px-3 text-amber-500 font-bold">{details.timeComplexity?.average}</td>
                    <td className="py-2.5 px-3 text-rose-500 font-bold">{details.timeComplexity?.worst}</td>
                    <td className="py-2.5 px-3 text-cyan-500 font-bold">{details.spaceComplexity}</td>
                    <td className="py-2.5 px-3 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        details.stable ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {details.stable ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        details.inPlace ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {details.inPlace ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
