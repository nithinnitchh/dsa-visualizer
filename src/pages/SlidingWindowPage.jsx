import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ALGORITHM_DETAILS } from '../utils/complexityData';
import { PlaybackEngine } from '../utils/animationEngine';
import { generateSlidingWindowSteps } from '../algorithms/techniques/slidingWindow';
import { SlidingWindowVisualizer } from '../components/SlidingWindowVisualizer';
import { Controls } from '../components/Controls';
import { StatsPanel } from '../components/StatsPanel';
import { ComplexityCard } from '../components/ComplexityCard';
import { CodePanel } from '../components/CodePanel';
import generateMultiLangCode from '../utils/multilangCode';
import { TopicQuiz } from '../components/TopicQuiz';
import { StepCommentary } from '../components/StepCommentary';
import { ArrowLeftRight, Shuffle, SlidersHorizontal, Eye, TrendingUp, Hash } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';

const DEFAULT_ARRAY = [2, 1, 5, 1, 3, 2, 8, 4, 3, 9, 2, 6];

export const SlidingWindowPage = () => {
  const [rawArray, setRawArray] = useState(DEFAULT_ARRAY);
  const [windowSize, setWindowSize] = useState(3);
  const [speed, setSpeed] = useState(250);

  // Playback state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepData, setCurrentStepData] = useState(null);
  const [totalStepsCount, setTotalStepsCount] = useState(0);

  const engineRef = useRef(null);
  const { success, info } = useToast();

  const initEngine = useCallback((arr, k) => {
    if (!arr || arr.length === 0) return;

    const steps = generateSlidingWindowSteps(arr, k);

    if (engineRef.current) {
      engineRef.current.destroy();
    }

    engineRef.current = new PlaybackEngine({
      steps,
      delay: speed,
      onStep: (index, step, isDone) => {
        setCurrentStepIndex(index);
        setCurrentStepData(step);
        if (isDone) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.85 }
          });
          success(`Maximum subarray sum found: ${step.maxSum}!`, 'Done');
        }
      },
      onFinish: () => {
        setIsPlaying(false);
      },
      onStateChange: (state) => {
        setIsPlaying(state.isPlaying);
        setTotalStepsCount(state.totalSteps);
      },
    });

    setCurrentStepIndex(0);
    setCurrentStepData(steps[0] || null);
    setTotalStepsCount(steps.length);
    setIsPlaying(false);
  }, [speed, success]);

  useEffect(() => {
    initEngine(rawArray, windowSize);
    return () => {
      if (engineRef.current) engineRef.current.destroy();
    };
  }, [rawArray, windowSize, initEngine]);

  const handleRandomize = () => {
    const newArr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 12) + 1);
    setRawArray(newArr);
    success('Generated new random array.', 'Randomized');
  };

  const handleSpeedChange = (newDelay) => {
    setSpeed(newDelay);
    if (engineRef.current) engineRef.current.setDelay(newDelay);
  };

  const handlePlay = () => engineRef.current?.play();
  const handlePause = () => engineRef.current?.pause();
  const handleStepForward = () => engineRef.current?.stepForward();
  const handleStepBackward = () => engineRef.current?.stepBackward();
  const handleReset = () => {
    engineRef.current?.reset();
    info('Reset window to index 0.', 'Reset');
  };

  const currentDetails = ALGORITHM_DETAILS.slidingWindow;
  const stats = currentStepData?.stats || { currentSum: 0, maxSum: 0, windowSize };

  const customWindowStats = [
    {
      label: 'Window Size (K)',
      value: windowSize,
      icon: SlidersHorizontal,
      color: 'text-brand-500',
      bgColor: 'bg-brand-500/10',
      borderColor: 'border-brand-500/20',
    },
    {
      label: 'Active Window Sum',
      value: stats.currentSum,
      icon: Eye,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      label: 'Global Max Sum',
      value: stats.maxSum,
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      label: 'Step Progress',
      value: `${currentStepIndex + 1} / ${totalStepsCount || 1}`,
      icon: Hash,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span>Sliding Window Technique</span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20">
              O(n) Linear Time
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {currentDetails.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Window size slider */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Window K:</span>
            <input
              type="range"
              min="2"
              max="6"
              value={windowSize}
              disabled={isPlaying}
              onChange={(e) => setWindowSize(Number(e.target.value))}
              className="w-20 accent-brand-500 cursor-pointer"
            />
            <span className="font-mono font-bold text-brand-500">{windowSize}</span>
          </div>

          <button
            onClick={handleRandomize}
            disabled={isPlaying}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95 disabled:opacity-50"
          >
            <Shuffle className="w-3.5 h-3.5 text-brand-500" />
            <span>Randomize</span>
          </button>
        </div>
      </div>

      {/* 1. VISUALIZER CANVAS (PLACED ON TOP) */}
      <SlidingWindowVisualizer
        array={rawArray}
        windowRange={currentStepData?.windowRange}
        bestRange={currentStepData?.bestRange}
        currentSum={stats.currentSum}
        maxSum={stats.maxSum}
        windowSize={windowSize}
      />

      {/* 2. PLAYBACK CONTROLS (PLACED BELOW GRAPHICAL VISUALIZER) */}
      <Controls
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onStepForward={handleStepForward}
        onStepBackward={handleStepBackward}
        onReset={handleReset}
        currentStep={currentStepIndex}
        totalSteps={totalStepsCount}
        speed={speed}
        onSpeedChange={handleSpeedChange}
      />

      {/* 3. STATS & COMMENTARY */}
      <StatsPanel customStats={customWindowStats} />
      <StepCommentary description={currentStepData?.description} />

      {/* 4. COMPLEXITY & PSEUDOCODE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplexityCard details={currentDetails} />
        <CodePanel
          pseudocode={currentDetails.pseudocode}
          algorithmName={currentDetails.name}
          isDefaultOpen={true}
          inputLabel="window"
          inputValue={{ array: rawArray, k: windowSize }}
          codeByLanguage={generateMultiLangCode('slidingWindow', { array: rawArray, k: windowSize })}
        />
      </div>

      <TopicQuiz topic="slidingWindow" />

    </div>
  );
};
