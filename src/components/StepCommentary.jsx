import React from 'react';
import { Terminal, Sparkles } from 'lucide-react';

export const StepCommentary = ({ description, stepType = 'info' }) => {
  return (
    <div className="w-full flex flex-col gap-3 px-8 py-6 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 border-3 border-blue-700 text-white shadow-2xl">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 border-2 border-white/40 backdrop-blur-sm">
          <Sparkles className="w-6 h-6 text-white animate-pulse-subtle" />
        </div>
        <span className="text-sm uppercase font-mono font-black tracking-widest text-white drop-shadow-lg">
          Step Explanation
        </span>
      </div>
      <p className="text-lg sm:text-2xl font-bold text-white leading-relaxed ml-12 drop-shadow-lg">
        {description || 'Ready. Click Play or Step to begin algorithm execution.'}
      </p>
    </div>
  );
};
