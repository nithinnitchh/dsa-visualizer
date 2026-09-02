import React from 'react';
import { Clock, HardDrive, CheckCircle2, XCircle, Zap, ShieldCheck } from 'lucide-react';

export const ComplexityCard = ({ details }) => {
  if (!details) return null;

  const {
    timeComplexity = {},
    spaceComplexity = 'O(1)',
    stable,
    inPlace,
    guaranteesShortest,
    heuristic,
    category,
  } = details;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-500" />
          <span>Complexity & Attributes</span>
        </h3>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20 font-semibold">
          {category || 'Algorithm'}
        </span>
      </div>

      {/* Time Complexity Table */}
      <div className="rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold">
            <tr>
              <th className="py-2 px-3">Case</th>
              <th className="py-2 px-3">Time Complexity</th>
              <th className="py-2 px-3">Behavior</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200 font-mono">
            {timeComplexity.best && (
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-emerald-600 dark:text-emerald-400">
                  Best Case
                </td>
                <td className="py-2.5 px-3 font-bold">{timeComplexity.best}</td>
                <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">Optimal configuration</td>
              </tr>
            )}
            {timeComplexity.average && (
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-amber-600 dark:text-amber-400">
                  Average Case
                </td>
                <td className="py-2.5 px-3 font-bold">{timeComplexity.average}</td>
                <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">Random distribution</td>
              </tr>
            )}
            {timeComplexity.worst && (
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-rose-600 dark:text-rose-400">
                  Worst Case
                </td>
                <td className="py-2.5 px-3 font-bold">{timeComplexity.worst}</td>
                <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">Adversarial ordering</td>
              </tr>
            )}
            {/* Direct operations if data structure (push, pop, etc.) */}
            {timeComplexity.push && (
              <tr>
                <td className="py-2 px-3 font-sans font-medium">Push / Enqueue</td>
                <td className="py-2 px-3 font-bold">{timeComplexity.push}</td>
                <td className="py-2 px-3 font-sans text-slate-500 text-[11px]">Top / Rear Insert</td>
              </tr>
            )}
            {timeComplexity.pop && (
              <tr>
                <td className="py-2 px-3 font-sans font-medium">Pop / Dequeue</td>
                <td className="py-2 px-3 font-bold">{timeComplexity.pop}</td>
                <td className="py-2 px-3 font-sans text-slate-500 text-[11px]">Removal</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Space & Algorithm Properties Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
        {/* Space Complexity */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <HardDrive className="w-4 h-4 text-cyan-500 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Space Complexity</div>
            <div className="font-mono font-bold text-slate-900 dark:text-white">{spaceComplexity}</div>
          </div>
        </div>

        {/* Stability */}
        {stable !== undefined && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            {stable ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            )}
            <div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Stability</div>
              <div className="font-semibold text-slate-900 dark:text-white">{stable ? 'Stable' : 'Unstable'}</div>
            </div>
          </div>
        )}

        {/* In-Place */}
        {inPlace !== undefined && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            {inPlace ? (
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
            )}
            <div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Memory Type</div>
              <div className="font-semibold text-slate-900 dark:text-white">{inPlace ? 'In-Place' : 'Out-of-Place'}</div>
            </div>
          </div>
        )}

        {/* Shortest Path Guarantee */}
        {guaranteesShortest !== undefined && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            {guaranteesShortest ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
            )}
            <div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Shortest Path</div>
              <div className="font-semibold text-slate-900 dark:text-white">{guaranteesShortest ? 'Guaranteed' : 'Not Guaranteed'}</div>
            </div>
          </div>
        )}

        {/* Heuristic */}
        {heuristic && (
          <div className="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <Zap className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Heuristic</div>
              <div className="font-semibold text-slate-900 dark:text-white truncate">{heuristic}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
