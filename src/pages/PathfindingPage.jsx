import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PATHFINDING_ALGORITHMS, GRID_ROWS, GRID_COLS } from '../utils/constants';
import { ALGORITHM_DETAILS } from '../utils/complexityData';
import { PlaybackEngine } from '../utils/animationEngine';
import { generateDijkstraSteps, generateAStarSteps } from '../algorithms/pathfinding';
import { GridVisualizer } from '../components/GridVisualizer';
import { Controls } from '../components/Controls';
import { StatsPanel } from '../components/StatsPanel';
import { ComplexityCard } from '../components/ComplexityCard';
import { StepCommentary } from '../components/StepCommentary';
import { CodePanel } from '../components/CodePanel';
import generateMultiLangCode from '../utils/multilangCode';
import { Eye, Route, Hash, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';

export const PathfindingPage = ({ initialAlgorithm = 'dijkstra' }) => {
  const [selectedAlgo, setSelectedAlgo] = useState(initialAlgorithm);
  const [startPos, setStartPos] = useState({ r: 8, c: 5 });
  const [endPos, setEndPos] = useState({ r: 8, c: 30 });
  const [wallsSet, setWallsSet] = useState(new Set());
  const [speed, setSpeed] = useState(40);

  // Playback state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepData, setCurrentStepData] = useState(null);
  const [totalStepsCount, setTotalStepsCount] = useState(0);

  const engineRef = useRef(null);
  const { success, info } = useToast();

  const initEngine = useCallback((rows, cols, start, end, walls, algoKey) => {
    const generator = algoKey === 'astar' ? generateAStarSteps : generateDijkstraSteps;
    const steps = generator(rows, cols, start, end, walls);

    if (engineRef.current) {
      engineRef.current.destroy();
    }

    engineRef.current = new PlaybackEngine({
      steps,
      delay: speed,
      onStep: (index, step, isDone) => {
        setCurrentStepIndex(index);
        setCurrentStepData(step);
        if (isDone && step.shortestPath && step.shortestPath.length > 0) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.85 }
          });
          success(`Shortest path found! Path length: ${step.shortestPath.length - 1} steps.`, 'Target Reached!');
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
    initEngine(GRID_ROWS, GRID_COLS, startPos, endPos, wallsSet, selectedAlgo);
    return () => {
      if (engineRef.current) engineRef.current.destroy();
    };
  }, [startPos, endPos, wallsSet, selectedAlgo, initEngine]);

  const handleToggleWall = (r, c, add) => {
    const key = `${r},${c}`;
    const nextSet = new Set(wallsSet);
    if (add) nextSet.add(key);
    else nextSet.delete(key);
    setWallsSet(nextSet);
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
    info('Pathfinding visualizer reset.', 'Reset');
  };

  const currentDetails = ALGORITHM_DETAILS[selectedAlgo] || ALGORITHM_DETAILS.dijkstra;
  const stats = currentStepData?.stats || { visitedCount: 0, pathLength: 0 };

  const customPathStats = [
    {
      label: 'Explored Cells',
      value: stats.visitedCount,
      icon: Eye,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
    },
    {
      label: 'Shortest Path Length',
      value: stats.pathLength > 0 ? `${stats.pathLength} steps` : 'Searching...',
      icon: Route,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      label: 'Heuristic Strategy',
      value: selectedAlgo === 'astar' ? 'Manhattan Distance' : 'Uniform Cost (None)',
      icon: Zap,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
    },
    {
      label: 'Step Progress',
      value: `${currentStepIndex + 1} / ${totalStepsCount || 1}`,
      icon: Hash,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 sm:p-6 flex flex-col">
      
      {/* Header Section - Compact */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Pathfinding Visualizer
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Find shortest path with {currentDetails.name}
            </p>
          </div>

          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
            disabled={isPlaying}
            className="bg-white dark:bg-slate-800 border-2 border-brand-500 text-slate-900 dark:text-white text-sm font-bold rounded-xl px-4 py-2.5 focus:outline-none"
          >
            {PATHFINDING_ALGORITHMS.map(algo => (
              <option key={algo.id} value={algo.id}>
                {algo.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content Grid - Single Page Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
        
        {/* LEFT SIDE - Visualizer & Controls (70% on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-3 overflow-y-auto pr-2">
          
          {/* Grid Visualizer */}
          <div className="flex-shrink-0 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3">
            <GridVisualizer
              rows={GRID_ROWS}
              cols={GRID_COLS}
              startPos={startPos}
              endPos={endPos}
              wallsSet={wallsSet}
              onToggleWall={handleToggleWall}
              onSetWalls={setWallsSet}
              onMoveStart={setStartPos}
              onMoveEnd={setEndPos}
              visitedCells={currentStepData?.visitedCells || []}
              frontierCells={currentStepData?.frontierCells || []}
              currentCell={currentStepData?.currentCell || null}
              shortestPath={currentStepData?.shortestPath || []}
              isPlaying={isPlaying}
            />
          </div>

          {/* Controls Section */}
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
            />
          </div>

          {/* Step Commentary */}
          <div className="flex-shrink-0">
            <StepCommentary description={currentStepData?.description} />
          </div>

          {/* Implementation Code Panel */}
          <div className="flex-shrink-0">
            <CodePanel
              pseudocode={currentDetails.pseudocode}
              algorithmName={currentDetails.name}
              isDefaultOpen={true}
              inputLabel="grid"
              inputValue={{ rows: GRID_ROWS, cols: GRID_COLS, start: startPos, end: endPos, walls: Array.from(wallsSet) }}
              codeByLanguage={generateMultiLangCode(selectedAlgo, { rows: GRID_ROWS, cols: GRID_COLS, start: startPos, end: endPos, walls: Array.from(wallsSet) })}
            />
          </div>
        </div>

        {/* RIGHT SIDE - Stats & Info Panel (30% on desktop) */}
        <div className="lg:col-span-1 flex flex-col gap-3 overflow-y-auto pl-2">
          
          {/* Stats Cards - Compact Grid */}
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-indigo-700 rounded-2xl p-3 text-white shadow-lg">
                <div className="text-xs font-bold uppercase text-indigo-100">Explored</div>
                <div className="text-2xl font-black mt-1">{stats.visitedCount}</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-amber-700 rounded-2xl p-3 text-white shadow-lg">
                <div className="text-xs font-bold uppercase text-amber-100">Path Length</div>
                <div className="text-2xl font-black mt-1">{stats.pathLength > 0 ? stats.pathLength : '...'}</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-cyan-700 rounded-2xl p-3 text-white shadow-lg">
                <div className="text-xs font-bold uppercase text-cyan-100">Strategy</div>
                <div className="text-lg font-black mt-1">{selectedAlgo === 'astar' ? 'A*' : 'Dijkstra'}</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-emerald-700 rounded-2xl p-3 text-white shadow-lg">
                <div className="text-xs font-bold uppercase text-emerald-100">Progress</div>
                <div className="text-2xl font-black mt-1">{currentStepIndex + 1}/{totalStepsCount}</div>
              </div>
            </div>
          </div>

          {/* Complexity Info */}
          <div className="flex-shrink-0 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase mb-3">Complexity</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Time:</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">{currentDetails.timeComplexity?.average}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                <span className="text-slate-600 dark:text-slate-400">Space:</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">{currentDetails.spaceComplexity}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                <span className="text-slate-600 dark:text-slate-400">Guarantee:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">✅ Optimal</span>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="flex-shrink-0 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-2xl p-3">
            <h4 className="text-xs font-black text-purple-900 dark:text-purple-200 uppercase mb-2">💡 How to Use</h4>
            <p className="text-xs text-purple-800 dark:text-purple-300 font-semibold leading-relaxed">
              Click to place walls. Then press Play to find the shortest path from 🟢 start to 🔴 end.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
