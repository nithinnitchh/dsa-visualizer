import React from 'react';
import { Activity, ArrowLeftRight, Eye, Hash, Clock } from 'lucide-react';

export const StatsPanel = ({
  comparisons = 0,
  swaps = 0,
  arrayAccesses = 0,
  currentStep = 0,
  totalSteps = 0,
  elapsedTime = null,
  customStats = [],
}) => {
  const defaultStatItems = [
    {
      label: 'Comparisons',
      value: comparisons,
      icon: Eye,
      color: 'text-white',
      bgColor: 'bg-gradient-to-br from-amber-400 to-amber-600',
      borderColor: 'border-amber-700',
      shadowColor: 'shadow-amber-500/50',
    },
    {
      label: 'Swaps / Writes',
      value: swaps,
      icon: ArrowLeftRight,
      color: 'text-white',
      bgColor: 'bg-gradient-to-br from-red-500 to-rose-600',
      borderColor: 'border-red-700',
      shadowColor: 'shadow-red-500/50',
    },
    {
      label: 'Array Accesses',
      value: arrayAccesses,
      icon: Activity,
      color: 'text-white',
      bgColor: 'bg-gradient-to-br from-cyan-400 to-blue-600',
      borderColor: 'border-cyan-700',
      shadowColor: 'shadow-cyan-500/50',
    },
    {
      label: 'Step Progress',
      value: `${currentStep + 1} / ${totalSteps || 1}`,
      icon: Hash,
      color: 'text-white',
      bgColor: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      borderColor: 'border-purple-700',
      shadowColor: 'shadow-purple-500/50',
    },
  ];

  const itemsToRender = customStats.length > 0 ? customStats : defaultStatItems;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      {itemsToRender.map((stat, idx) => {
        const Icon = stat.icon || Activity;
        return (
          <div
            key={idx}
            className={`flex flex-col items-start gap-4 p-6 rounded-3xl ${stat.bgColor || 'bg-gradient-to-br from-brand-500 to-brand-700'} border-3 ${stat.borderColor || 'border-brand-700'} shadow-xl ${stat.shadowColor || 'shadow-brand-500/50'} hover:scale-105 transition-transform`}
          >
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/40 flex-shrink-0">
              <Icon className={`w-7 h-7 ${stat.color || 'text-white'}`} />
            </div>
            <div className="w-full">
              <p className="text-sm uppercase font-bold tracking-widest text-white/80">
                {stat.label}
              </p>
              <p className="text-4xl lg:text-5xl font-black text-white tracking-tight mt-3 drop-shadow-lg">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
