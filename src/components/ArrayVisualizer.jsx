import React, { useState } from 'react';
import { 
  BarChart3, 
  LayoutGrid, 
  Check, 
  ArrowLeftRight, 
  Sparkles, 
  ShieldCheck, 
  X,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ArrayVisualizer = ({
  array = [],
  highlightIndices = [],
  sortedIndices = [],
  pivotIndex = null,
  activeRange = null,
  stepType = 'default',
  maxValue = 100,
  description = '',
}) => {
  const [viewMode, setViewMode] = useState('both'); // 'both' | 'bars' | 'cards'
  const isSorted = sortedIndices.length === array.length && array.length > 0;

  // Active indices being compared/swapped
  const [idxA, idxB] = highlightIndices.length === 2 ? highlightIndices : [highlightIndices[0], null];
  const valA = idxA !== undefined && array[idxA] !== undefined ? array[idxA] : null;
  const valB = idxB !== null && idxB !== undefined && array[idxB] !== undefined ? array[idxB] : null;

  // Derive comparison logic for beginner banner
  let comparisonBanner = null;
  if (valA !== null && valB !== null) {
    const isGreater = valA > valB;
    if (stepType === 'compare') {
      comparisonBanner = (
        <div className="flex flex-col gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 border border-yellow-600 text-white font-mono shadow-lg">
          <div className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-900">Comparison</div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="bg-white/15 px-3 py-2 rounded-xl border border-white/30">
              <span className="text-xs font-bold">arr[{idxA}]</span>
              <span className="block text-lg font-black text-yellow-100">{valA}</span>
            </div>
            <span className="text-2xl font-black">{isGreater ? '>' : '≤'}</span>
            <div className="bg-white/15 px-3 py-2 rounded-xl border border-white/30">
              <span className="text-xs font-bold">arr[{idxB}]</span>
              <span className="block text-lg font-black text-yellow-100">{valB}</span>
            </div>
          </div>
          <div className={`px-3 py-2 rounded-xl text-center font-black text-xs border ${
            isGreater ? 'bg-red-600 border-red-800' : 'bg-green-600 border-green-800'
          }`}>
            {isGreater ? 'Must swap' : 'Already ordered'}
          </div>
        </div>
      );
    } else if (stepType === 'swap') {
      comparisonBanner = (
        <div className="flex flex-col gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 border border-red-700 text-white font-mono shadow-lg">
          <div className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-red-100">Swap</div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="bg-white/15 px-3 py-2 rounded-xl border border-white/30">
              <span className="text-xs font-bold">arr[{idxA}]</span>
              <span className="block text-lg font-black text-red-100">{valA}</span>
            </div>
            <span className="text-2xl font-black">⇄</span>
            <div className="bg-white/15 px-3 py-2 rounded-xl border border-white/30">
              <span className="text-xs font-bold">arr[{idxB}]</span>
              <span className="block text-lg font-black text-red-100">{valB}</span>
            </div>
          </div>
          <div className="px-3 py-2 rounded-xl text-center font-black text-[11px] bg-white/10 border border-white/30 text-white">
            Swapped: {valA} ↔ {valB}
          </div>
        </div>
      );
    }
  } else if (pivotIndex !== null && array[pivotIndex] !== undefined) {
    comparisonBanner = (
      <div className="flex flex-col gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 border border-purple-700 text-white font-mono shadow-lg">
        <div className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-purple-100">Pivot</div>
        <div className="bg-white/15 px-3 py-2 rounded-xl border border-white/30 inline-block mx-auto">
          <span className="text-xs font-bold">arr[{pivotIndex}] = </span>
          <span className="text-2xl font-black text-purple-100">{array[pivotIndex]}</span>
        </div>
        <div className="px-3 py-2 rounded-xl text-center font-black text-[11px] bg-white/10 border border-white/30 text-white">
          Left smaller • Right larger
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* Top Bar: View Mode Switcher & Comparison Callout */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px]">
        
        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('both')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'both'
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Both</span>
          </button>

          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'cards'
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <LayoutGrid className="w-3 h-3" />
            <span>Cards</span>
          </button>

          <button
            onClick={() => setViewMode('bars')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'bars'
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <BarChart3 className="w-3 h-3" />
            <span>Bars</span>
          </button>
        </div>

        {/* Live Comparison math badge */}
        {comparisonBanner || (
          <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">
            {isSorted ? '🎉 Array is fully sorted!' : 'Press Play or Step to watch step-by-step'}
          </span>
        )}

      </div>

      {/* 1. BEGINNER MEMORY CARDS / TILE VIEW */}
      {(viewMode === 'cards' || viewMode === 'both') && (
        <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 overflow-x-auto shadow-inner">
          <div className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Textbook Array Memory Structure</span>
            <span className="text-[10px] text-slate-500">Array indices [0 .. {array.length - 1}]</span>
          </div>

          <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max py-4">
            {array.map((value, idx) => {
              const isComparing = highlightIndices.includes(idx) && (stepType === 'compare' || stepType === 'initial');
              const isSwapping = highlightIndices.includes(idx) && (stepType === 'swap' || stepType === 'overwrite');
              const isPivot = pivotIndex === idx;
              const isElementSorted = sortedIndices.includes(idx);

              // Pointer label
              let pointerLabel = null;
              if (isPivot) pointerLabel = 'PIVOT';
              else if (isSwapping) pointerLabel = 'SWAP';
              else if (isComparing) pointerLabel = idx === idxA ? 'j' : 'j+1';

              let cardBg = 'bg-slate-900 border-slate-700 text-slate-200';
              if (isElementSorted) cardBg = 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-emerald-500/20';
              else if (isSwapping) cardBg = 'bg-rose-950 border-rose-500 text-rose-300 ring-2 ring-rose-500 shadow-rose-500/30 scale-105';
              else if (isComparing) cardBg = 'bg-amber-950 border-amber-500 text-amber-300 ring-2 ring-amber-500 shadow-amber-500/30 scale-105';
              else if (isPivot) cardBg = 'bg-purple-950 border-purple-500 text-purple-300 ring-2 ring-purple-500 shadow-purple-500/30';

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 relative group">
                  {/* Pointer Pin above card */}
                  <div className="h-5 flex items-center justify-center">
                    {pointerLabel ? (
                      <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-amber-500 text-black shadow-xs animate-bounce-short">
                        ▼ {pointerLabel}
                      </span>
                    ) : (
                      <span className="opacity-0">·</span>
                    )}
                  </div>

                  {/* Card Block */}
                  <div
                    className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-base shadow-md transition-all duration-200 ${cardBg}`}
                  >
                    <span>{value}</span>
                    {isElementSorted && (
                      <Check className="w-3 h-3 text-emerald-400 mt-0.5" />
                    )}
                  </div>

                  {/* Array Index underneath */}
                  <span className={`text-[10px] font-mono font-bold ${
                    isComparing || isSwapping ? 'text-amber-400' : 'text-slate-500'
                  }`}>
                    [{idx}]
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. VERTICAL BARS CHART VIEW */}
      {(viewMode === 'bars' || viewMode === 'both') && (
        <div className="relative w-full h-64 sm:h-72 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-end overflow-hidden shadow-inner">
          
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 backdrop-blur-md">
              Vertical Magnitude Bars ({array.length} Elements)
            </span>
          </div>

          <div className="w-full h-full flex items-end justify-center gap-1 sm:gap-1.5 pt-8">
            {array.map((value, idx) => {
              const heightPercent = Math.max(8, Math.round((value / maxValue) * 100));
              const isComparing = highlightIndices.includes(idx) && (stepType === 'compare' || stepType === 'initial');
              const isSwapping = highlightIndices.includes(idx) && (stepType === 'swap' || stepType === 'overwrite');
              const isPivot = pivotIndex === idx;
              const isElementSorted = sortedIndices.includes(idx);
              const inRange = activeRange && idx >= activeRange[0] && idx <= activeRange[1];

              let barBg = 'bg-brand-500 dark:bg-brand-600';
              let borderColor = 'border-brand-400/40';

              if (isElementSorted) {
                barBg = 'bg-emerald-500';
                borderColor = 'border-emerald-300';
              } else if (isSwapping) {
                barBg = 'bg-rose-500';
                borderColor = 'border-rose-300';
              } else if (isComparing) {
                barBg = 'bg-amber-500';
                borderColor = 'border-amber-300';
              } else if (isPivot) {
                barBg = 'bg-purple-500';
                borderColor = 'border-purple-300';
              } else if (inRange) {
                barBg = 'bg-indigo-500/80';
                borderColor = 'border-indigo-400';
              }

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center justify-end h-full max-w-[48px] group transition-all duration-150 relative"
                >
                  {array.length <= 32 && (
                    <span className={`text-[10px] sm:text-xs font-mono font-bold mb-1 transition-colors ${
                      isComparing || isSwapping ? 'text-white scale-110' : 'text-slate-400 group-hover:text-white'
                    }`}>
                      {value}
                    </span>
                  )}

                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-md sm:rounded-t-lg border-t-2 ${borderColor} ${barBg} transition-all duration-150 flex items-start justify-center pt-1`}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-900 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 pointer-events-none transition-opacity z-20 whitespace-nowrap">
                      Index {idx}: <strong>{value}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Visualizer Legend */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-500" />
          <span>Unsorted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>Swap</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          <span>Pivot</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Sorted</span>
        </div>
      </div>

    </div>
  );
};

export const CustomArrayModal = ({ isOpen, onClose, onSubmit, initialArray = [] }) => {
  const [inputText, setInputText] = useState(initialArray.join(', '));
  const { error, success } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = inputText
      .split(/[,\s]+/)
      .map(s => s.trim())
      .filter(Boolean)
      .map(Number);

    if (parsed.length < 3) {
      error('Please enter at least 3 numbers.', 'Invalid Array');
      return;
    }

    if (parsed.length > 50) {
      error('Maximum array size is 50 elements.', 'Array Too Large');
      return;
    }

    if (parsed.some(isNaN)) {
      error('Please enter only valid numbers separated by commas.', 'Invalid Characters');
      return;
    }

    onSubmit(parsed);
    success(`Loaded custom array with ${parsed.length} elements.`, 'Array Updated');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Enter Custom Array
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter numbers separated by commas or spaces (e.g. <code>45, 12, 89, 34, 78, 23</code>).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="w-full p-3 font-mono text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-xl"
            >
              Apply Array
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
