import React from 'react';
import { ArrowLeftRight, Check, Sparkles, Zap, TrendingUp } from 'lucide-react';

export const SlidingWindowVisualizer = ({
  array = [],
  windowRange = [0, 2],
  bestRange = [0, 2],
  currentSum = 0,
  maxSum = 0,
  windowSize = 3,
}) => {
  const [wLeft, wRight] = windowRange || [0, 0];
  const [bLeft, bRight] = bestRange || [0, 0];

  return (
    <div className="space-y-6">
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/20">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Window Bounds</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              Indices [{wLeft} .. {wRight}] (Size: {windowSize})
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Current Window Sum</span>
            <div className="text-base font-bold font-mono text-amber-500 mt-0.5">
              {currentSum}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Maximum Sum Encountered</span>
            <div className="text-base font-bold font-mono text-emerald-500 mt-0.5">
              {maxSum} (Range [{bLeft}..{bRight}])
            </div>
          </div>
        </div>
      </div>

      {/* Array Elements with Sliding Window Highlight */}
      <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 overflow-x-auto shadow-inner">
        <div className="flex items-center justify-center gap-2 min-w-max py-6">
          {array.map((val, idx) => {
            const inWindow = idx >= wLeft && idx <= wRight;
            const isWindowStart = idx === wLeft;
            const isWindowEnd = idx === wRight;
            const isBest = idx >= bLeft && idx <= bRight;

            return (
              <div key={idx} className="flex flex-col items-center gap-2 relative">
                {/* Index label */}
                <span className={`text-[10px] font-mono font-semibold ${
                  inWindow ? 'text-brand-400 font-bold' : 'text-slate-500'
                }`}>
                  [{idx}]
                </span>

                {/* Number Box */}
                <div
                  className={`w-14 h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-base shadow-md transition-all duration-300 relative ${
                    inWindow
                      ? 'bg-brand-500 text-white ring-4 ring-brand-400/40 scale-105 z-10 shadow-brand-500/30'
                      : isBest
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-600/50'
                      : 'bg-slate-900 text-slate-300 border border-slate-800'
                  }`}
                >
                  <span>{val}</span>

                  {/* Window boundary tags */}
                  {isWindowStart && (
                    <span className="absolute -top-3 left-1 text-[9px] font-sans font-bold px-1 rounded bg-brand-700 text-white">
                      L
                    </span>
                  )}
                  {isWindowEnd && (
                    <span className="absolute -top-3 right-1 text-[9px] font-sans font-bold px-1 rounded bg-brand-700 text-white">
                      R
                    </span>
                  )}
                </div>

                {/* Subarray indicator */}
                <span className="text-[9px] font-mono text-slate-500 h-4">
                  {inWindow ? 'active' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
