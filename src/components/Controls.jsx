import React, { useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw, 
  Gauge, 
  SlidersHorizontal,
  Shuffle,
  Edit3
} from 'lucide-react';
import { SPEED_LEVELS } from '../utils/constants';

export const Controls = ({
  isPlaying,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  currentStep = 0,
  totalSteps = 0,
  speed = 200,
  onSpeedChange,
  onGenerateRandom,
  onCustomInput,
  arraySize,
  onArraySizeChange,
  minSize = 5,
  maxSize = 60,
  disabled = false,
  showArrayControls = false,
}) => {
  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid firing shortcuts when typing in inputs/textareas
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) onPause();
        else onPlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        onStepForward();
      } else if (e.code === 'ArrowLeft' && onStepBackward) {
        e.preventDefault();
        onStepBackward();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        onReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, onPlay, onPause, onStepForward, onStepBackward, onReset]);

  const progressPercent = totalSteps > 1 ? Math.min(100, Math.round((currentStep / (totalSteps - 1)) * 100)) : 0;

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      
      {/* Top Row: Playback Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Playback Buttons Group */}
        <div className="flex items-center gap-2">
          {/* Reset */}
          <button
            onClick={onReset}
            disabled={disabled}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Reset Visualizer (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Step Back */}
          {onStepBackward && (
            <button
              onClick={onStepBackward}
              disabled={disabled || currentStep <= 0 || isPlaying}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Step Backward (Left Arrow)"
            >
              <SkipBack className="w-4 h-4" />
            </button>
          )}

          {/* Play / Pause Primary Button */}
          <button
            onClick={isPlaying ? onPause : onPlay}
            disabled={disabled}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25'
                : 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/25'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{currentStep >= totalSteps - 1 && totalSteps > 0 ? 'Replay' : 'Play'}</span>
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={onStepForward}
            disabled={disabled || isPlaying || (totalSteps > 0 && currentStep >= totalSteps - 1)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Step Forward (Right Arrow)"
          >
            <span>Step</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed & Auxiliary Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Speed Selector */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs">
            <Gauge className="w-3.5 h-3.5 text-slate-400 ml-1" />
            <span className="text-slate-500 dark:text-slate-400 font-medium">Speed:</span>
            <div className="flex items-center gap-1">
              {SPEED_LEVELS.map((lvl) => (
                <button
                  key={lvl.label}
                  onClick={() => onSpeedChange(lvl.value)}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    speed === lvl.value
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Random & Custom Input Buttons (if sorting/array) */}
          {showArrayControls && (
            <div className="flex items-center gap-2">
              <button
                onClick={onGenerateRandom}
                disabled={disabled || isPlaying}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 transition-all active:scale-95 disabled:opacity-50"
                title="Generate Random Dataset"
              >
                <Shuffle className="w-3.5 h-3.5 text-brand-500" />
                <span>Randomize</span>
              </button>

              <button
                onClick={onCustomInput}
                disabled={disabled || isPlaying}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 transition-all active:scale-95 disabled:opacity-50"
                title="Enter Custom Elements"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Custom</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Row: Slider & Progress Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
        
        {/* Array Size Slider */}
        {showArrayControls && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
              Size: <span className="font-mono font-bold text-brand-500">{arraySize}</span>
            </span>
            <input
              type="range"
              min={minSize}
              max={maxSize}
              value={arraySize}
              disabled={disabled || isPlaying}
              onChange={(e) => onArraySizeChange(Number(e.target.value))}
              className="w-28 sm:w-36 accent-brand-500 cursor-pointer disabled:opacity-40"
            />
          </div>
        )}

        {/* Step Progress & Indicator */}
        <div className="flex items-center gap-4 w-full sm:w-auto sm:ml-auto">
          <div className="w-full sm:w-48 bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-200 dark:border-slate-700/50">
            <div
              className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full rounded-full transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap text-sm font-semibold">
            Step <strong className="text-lg text-slate-900 dark:text-white">{currentStep + 1}</strong> / <strong className="text-slate-900 dark:text-white">{totalSteps || 1}</strong>
          </span>
        </div>

      </div>

    </div>
  );
};
