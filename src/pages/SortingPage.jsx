import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SORTING_ALGORITHMS, DEFAULT_ARRAY_SIZE, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE } from '../utils/constants';
import { ALGORITHM_DETAILS } from '../utils/complexityData';
import { PlaybackEngine } from '../utils/animationEngine';
import { 
  generateBubbleSortSteps, 
  generateSelectionSortSteps, 
  generateInsertionSortSteps, 
  generateMergeSortSteps, 
  generateQuickSortSteps, 
  generateHeapSortSteps 
} from '../algorithms/sorting';
import { Controls } from '../components/Controls';
import { StatsPanel } from '../components/StatsPanel';
import { ComplexityCard } from '../components/ComplexityCard';
import { StepCommentary } from '../components/StepCommentary';
import { ArrayVisualizer, CustomArrayModal } from '../components/ArrayVisualizer';
import { CodePanel } from '../components/CodePanel';
import generateMultiLangCode from '../utils/multilangCode';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';

const SORT_GENERATORS = {
  bubbleSort: generateBubbleSortSteps,
  selectionSort: generateSelectionSortSteps,
  insertionSort: generateInsertionSortSteps,
  mergeSort: generateMergeSortSteps,
  quickSort: generateQuickSortSteps,
  heapSort: generateHeapSortSteps,
};

export const SortingPage = ({ initialAlgorithm = 'bubbleSort' }) => {
  const [selectedAlgo, setSelectedAlgo] = useState(initialAlgorithm);
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
  const [speed, setSpeed] = useState(200);
  const [rawArray, setRawArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Playback state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepData, setCurrentStepData] = useState(null);
  const [totalStepsCount, setTotalStepsCount] = useState(0);

  const engineRef = useRef(null);
  const { success, info } = useToast();

  const generateRandomArray = useCallback((size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
  }, []);

  useEffect(() => {
    const initialArr = generateRandomArray(DEFAULT_ARRAY_SIZE);
    setRawArray(initialArr);
  }, [generateRandomArray]);

  const initEngine = useCallback((arr, algoKey) => {
    if (!arr || arr.length === 0) return;

    const generator = SORT_GENERATORS[algoKey] || generateBubbleSortSteps;
    const steps = generator([...arr]);

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
          success(`${ALGORITHM_DETAILS[algoKey]?.name} completed successfully!`, 'Sorted!');
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
    if (rawArray.length > 0) {
      initEngine(rawArray, selectedAlgo);
    }
    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
      }
    };
  }, [rawArray, selectedAlgo, initEngine]);

  const handleSpeedChange = (newDelay) => {
    setSpeed(newDelay);
    if (engineRef.current) {
      engineRef.current.setDelay(newDelay);
    }
  };

  const handlePlay = () => engineRef.current?.play();
  const handlePause = () => engineRef.current?.pause();
  const handleStepForward = () => engineRef.current?.stepForward();
  const handleStepBackward = () => engineRef.current?.stepBackward();
  const handleReset = () => {
    engineRef.current?.reset();
    info('Visualizer reset to initial state.', 'Reset');
  };

  const handleRandomize = () => {
    const newArr = generateRandomArray(arraySize);
    setRawArray(newArr);
    success('Generated new random array.', 'Randomized');
  };

  const handleArraySizeChange = (newSize) => {
    setArraySize(newSize);
    const newArr = generateRandomArray(newSize);
    setRawArray(newArr);
  };

  const handleCustomArraySubmit = (customArr) => {
    setArraySize(customArr.length);
    setRawArray(customArr);
  };

  const currentDetails = ALGORITHM_DETAILS[selectedAlgo] || ALGORITHM_DETAILS.bubbleSort;
  const currentStats = currentStepData?.stats || { comparisons: 0, swaps: 0, arrayAccesses: 0 };
  const currentArray = currentStepData?.array || rawArray;
  const maxVal = Math.max(...currentArray, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 sm:p-6 flex flex-col">
      
      {/* Header Section - Compact */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Sorting Visualizer
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Learn algorithms step-by-step with {currentDetails.name}
            </p>
          </div>

          {/* Algorithm Selector */}
          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
            disabled={isPlaying}
            className="bg-white dark:bg-slate-800 border-2 border-brand-500 text-slate-900 dark:text-white text-sm font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {SORTING_ALGORITHMS.map(algo => (
              <option key={algo.id} value={algo.id}>
                {algo.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content Grid - Single Page Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
        
        {/* LEFT SIDE - Visualizer (70% on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-3 overflow-y-auto pr-2">
          
          {/* Array Visualizer - Main Focus */}
          <div className="flex-shrink-0">
            <ArrayVisualizer
              array={currentArray}
              highlightIndices={currentStepData?.indices || []}
              sortedIndices={currentStepData?.sortedIndices || []}
              pivotIndex={currentStepData?.pivotIndex ?? null}
              activeRange={currentStepData?.activeRange ?? null}
              stepType={currentStepData?.type || 'default'}
              maxValue={maxVal}
              description={currentStepData?.description}
            />
          </div>

          {/* Step Commentary - Below Controls */}
          <div className="flex-shrink-0">
            <StepCommentary description={currentStepData?.description} />
          </div>

          {/* Implementation Code Panel */}
          <div className="flex-shrink-0">
            <CodePanel
              pseudocode={currentDetails.pseudocode}
              algorithmName={currentDetails.name}
              isDefaultOpen={true}
              inputLabel="array"
              inputValue={currentArray}
              codeByLanguage={generateMultiLangCode(selectedAlgo, currentArray)}
            />
          </div>
        </div>

        {/* RIGHT SIDE - Controls + Statistics (30% on desktop) */}
        <div className="lg:col-span-1 flex flex-col gap-3 overflow-y-auto pl-2 lg:sticky lg:top-4 self-start">
          <div className="flex-shrink-0">
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
              onGenerateRandom={handleRandomize}
              onCustomInput={() => setIsModalOpen(true)}
              arraySize={arraySize}
              onArraySizeChange={handleArraySizeChange}
              minSize={MIN_ARRAY_SIZE}
              maxSize={MAX_ARRAY_SIZE}
              showArrayControls={true}
            />
          </div>
          
          {/* Stats Cards - Stacked Vertically */}
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-2">
              {/* Individual Stat Cards - More Compact */}
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-700 rounded-2xl p-3 text-white shadow-lg">
                <div className="text-xs font-bold uppercase text-amber-100">Comparisons</div>
                <div className="text-3xl font-black mt-1">{currentStats.comparisons}</div>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-rose-600 border-2 border-red-700 rounded-2xl p-3 text-white shadow-lg">
                <div className="text-xs font-bold uppercase text-red-100">Swaps</div>
                <div className="text-3xl font-black mt-1">{currentStats.swaps}</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-cyan-700 rounded-2xl p-3 text-white shadow-lg">
                <div className="text-xs font-bold uppercase text-cyan-100">Accesses</div>
                <div className="text-3xl font-black mt-1">{currentStats.arrayAccesses}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 border-2 border-purple-700 rounded-2xl p-3 text-white shadow-lg">
                <div className="text-xs font-bold uppercase text-purple-100">Progress</div>
                <div className="text-3xl font-black mt-1">{currentStepIndex + 1}/{totalStepsCount}</div>
              </div>
            </div>
          </div>

          {/* Complexity Info - Compact Card */}
          <div className="flex-shrink-0 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase mb-3">Complexity</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Best:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{currentDetails.timeComplexity?.best}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                <span className="text-slate-600 dark:text-slate-400">Worst:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{currentDetails.timeComplexity?.worst}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                <span className="text-slate-600 dark:text-slate-400">Space:</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">{currentDetails.spaceComplexity}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                <span className="text-slate-600 dark:text-slate-400">Stable:</span>
                <span className="font-bold">{currentDetails.stable ? '✅ Yes' : '❌ No'}</span>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="flex-shrink-0 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-2xl p-3">
            <h4 className="text-xs font-black text-blue-900 dark:text-blue-200 uppercase mb-2">💡 How It Works</h4>
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              Watch as elements are compared and swapped. The yellow banner shows what's happening at each step.
            </p>
          </div>
        </div>

      </div>

      {/* Custom Array Modal */}
      <CustomArrayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCustomArraySubmit}
        initialArray={rawArray}
      />

    </div>
  );
};
