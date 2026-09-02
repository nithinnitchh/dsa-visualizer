import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GRAPH_ALGORITHMS } from '../utils/constants';
import { ALGORITHM_DETAILS } from '../utils/complexityData';
import { PlaybackEngine } from '../utils/animationEngine';
import { 
  generateBFSSteps, 
  generateDFSSteps, 
  generateKruskalSteps, 
  generatePrimsSteps 
} from '../algorithms/graph';
import { GraphVisualizer } from '../components/GraphVisualizer';
import { Controls } from '../components/Controls';
import { StatsPanel } from '../components/StatsPanel';
import { ComplexityCard } from '../components/ComplexityCard';
import { StepCommentary } from '../components/StepCommentary';
import { CodePanel } from '../components/CodePanel';
import generateMultiLangCode from '../utils/multilangCode';
import { Network, Shuffle, Eye, Activity, Hash, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';

// Default initial graph with weights
const INITIAL_NODES = [
  { id: 'node-A', label: 'A', x: 120, y: 100 },
  { id: 'node-B', label: 'B', x: 280, y: 80 },
  { id: 'node-C', label: 'C', x: 140, y: 260 },
  { id: 'node-D', label: 'D', x: 320, y: 240 },
  { id: 'node-E', label: 'E', x: 480, y: 150 },
  { id: 'node-F', label: 'F', x: 450, y: 320 },
];

const INITIAL_EDGES = [
  { id: 'e-AB', from: 'node-A', to: 'node-B', weight: 4 },
  { id: 'e-AC', from: 'node-A', to: 'node-C', weight: 2 },
  { id: 'e-BD', from: 'node-B', to: 'node-D', weight: 5 },
  { id: 'e-BE', from: 'node-B', to: 'node-E', weight: 10 },
  { id: 'e-CD', from: 'node-C', to: 'node-D', weight: 3 },
  { id: 'e-DE', from: 'node-D', to: 'node-E', weight: 7 },
  { id: 'e-DF', from: 'node-D', to: 'node-F', weight: 8 },
  { id: 'e-EF', from: 'node-E', to: 'node-F', weight: 6 },
];

export const GraphPage = ({ initialAlgorithm = 'bfs' }) => {
  const [selectedAlgo, setSelectedAlgo] = useState(initialAlgorithm);
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState(INITIAL_EDGES);
  const [startNodeId, setStartNodeId] = useState('node-A');
  const [speed, setSpeed] = useState(300);

  // Playback state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepData, setCurrentStepData] = useState(null);
  const [totalStepsCount, setTotalStepsCount] = useState(0);

  const engineRef = useRef(null);
  const { success, info } = useToast();

  const isMstMode = selectedAlgo === 'kruskal' || selectedAlgo === 'prim';

  const initEngine = useCallback((curNodes, curEdges, startId, algoKey) => {
    if (curNodes.length === 0) return;

    let steps = [];
    if (algoKey === 'bfs') steps = generateBFSSteps(curNodes, curEdges, startId);
    else if (algoKey === 'dfs') steps = generateDFSSteps(curNodes, curEdges, startId);
    else if (algoKey === 'kruskal') steps = generateKruskalSteps(curNodes, curEdges);
    else if (algoKey === 'prim') steps = generatePrimsSteps(curNodes, curEdges, startId);

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
          success(`${ALGORITHM_DETAILS[algoKey]?.name} completed!`, 'Completed');
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
    initEngine(nodes, edges, startNodeId, selectedAlgo);
    return () => {
      if (engineRef.current) engineRef.current.destroy();
    };
  }, [nodes, edges, startNodeId, selectedAlgo, initEngine]);

  const handleUpdateGraph = (newNodes, newEdges) => {
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleRandomGraph = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const newNodes = letters.map((label, idx) => ({
      id: `node-${label}`,
      label,
      x: 100 + (idx % 3) * 160 + (Math.random() * 40 - 20),
      y: 80 + Math.floor(idx / 3) * 120 + (Math.random() * 30 - 15),
    }));

    const newEdges = [];
    for (let i = 0; i < newNodes.length - 1; i++) {
      newEdges.push({
        id: `e-${newNodes[i].id}-${newNodes[i + 1].id}`,
        from: newNodes[i].id,
        to: newNodes[i + 1].id,
        weight: Math.floor(Math.random() * 9) + 1,
      });
    }

    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 2; j < newNodes.length; j++) {
        if (Math.random() < 0.35) {
          newEdges.push({
            id: `e-${newNodes[i].id}-${newNodes[j].id}-${Date.now()}`,
            from: newNodes[i].id,
            to: newNodes[j].id,
            weight: Math.floor(Math.random() * 9) + 1,
          });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setStartNodeId(newNodes[0].id);
    success('Generated new random graph with weights!', 'Random Graph');
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
    info('Reset graph visualizer.', 'Reset');
  };

  const currentDetails = ALGORITHM_DETAILS[selectedAlgo] || ALGORITHM_DETAILS.bfs;
  const stats = currentStepData?.stats || { visitedCount: 0, edgesExplored: 0, totalWeight: 0 };

  const customGraphStats = isMstMode
    ? [
        {
          label: 'MST Total Weight',
          value: stats.totalWeight || 0,
          icon: Zap,
          color: 'text-amber-500',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/20',
        },
        {
          label: 'MST Edges Included',
          value: `${currentStepData?.mstEdgeIds?.length || 0} / ${nodes.length - 1}`,
          icon: Network,
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/20',
        },
        {
          label: 'Algorithm Type',
          value: selectedAlgo === 'kruskal' ? 'DSU Edge Sorting' : 'Greedy Cut PQ',
          icon: Activity,
          color: 'text-indigo-500',
          bgColor: 'bg-indigo-500/10',
          borderColor: 'border-indigo-500/20',
        },
        {
          label: 'Step Progress',
          value: `${currentStepIndex + 1} / ${totalStepsCount || 1}`,
          icon: Hash,
          color: 'text-cyan-500',
          bgColor: 'bg-cyan-500/10',
          borderColor: 'border-cyan-500/20',
        },
      ]
    : [
        {
          label: 'Visited Vertices',
          value: `${stats.visitedCount || 0} / ${nodes.length}`,
          icon: Eye,
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/20',
        },
        {
          label: 'Edges Explored',
          value: stats.edgesExplored || 0,
          icon: Network,
          color: 'text-amber-500',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/20',
        },
        {
          label: 'Auxiliary Storage',
          value: selectedAlgo === 'bfs' ? 'FIFO Queue' : 'LIFO Stack',
          icon: Activity,
          color: 'text-pink-500',
          bgColor: 'bg-pink-500/10',
          borderColor: 'border-pink-500/20',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 sm:p-6 flex flex-col">
      
      {/* Header Section - Compact */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Graph Visualizer
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Explore {currentDetails.name} algorithm
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              value={selectedAlgo}
              onChange={(e) => setSelectedAlgo(e.target.value)}
              disabled={isPlaying}
              className="bg-white dark:bg-slate-800 border-2 border-brand-500 text-slate-900 dark:text-white text-sm font-bold rounded-xl px-4 py-2.5 focus:outline-none"
            >
              {GRAPH_ALGORITHMS.map(algo => (
                <option key={algo.id} value={algo.id}>
                  {algo.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleRandomGraph}
              disabled={isPlaying}
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              🔄 Random
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Single Page Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
        
        {/* LEFT SIDE - Visualizer & Controls (70% on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-3 overflow-y-auto pr-2">
          
          {/* Graph Visualizer */}
          <div className="flex-shrink-0 h-80 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl">
            <GraphVisualizer
              nodes={nodes}
              edges={edges}
              onUpdateGraph={handleUpdateGraph}
              currentNodeId={currentStepData?.currentNodeId}
              visitedNodes={currentStepData?.visitedNodes || []}
              frontierQueue={currentStepData?.frontierQueue || []}
              currentEdgeId={currentStepData?.currentEdgeId}
              mstEdgeIds={currentStepData?.mstEdgeIds || []}
              rejectedEdgeIds={currentStepData?.rejectedEdgeIds || []}
              traversalOrder={currentStepData?.traversalOrder || []}
              startNodeId={startNodeId}
              onSelectStartNode={setStartNodeId}
              isPlaying={isPlaying}
              isMstMode={isMstMode}
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
              inputLabel="graph"
              inputValue={{ nodes, edges, startNodeId }}
              codeByLanguage={generateMultiLangCode(selectedAlgo, { nodes, edges, startNodeId })}
            />
          </div>
        </div>

        {/* RIGHT SIDE - Stats & Info Panel (30% on desktop) */}
        <div className="lg:col-span-1 flex flex-col gap-3 overflow-y-auto pl-2">
          
          {/* Stats Cards - Compact Grid */}
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-2">
              {isMstMode ? (
                <>
                  <div className="bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-700 rounded-2xl p-3 text-white shadow-lg">
                    <div className="text-xs font-bold uppercase text-amber-100">Total Weight</div>
                    <div className="text-2xl font-black mt-1">{stats.totalWeight || 0}</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-emerald-700 rounded-2xl p-3 text-white shadow-lg">
                    <div className="text-xs font-bold uppercase text-emerald-100">Edges</div>
                    <div className="text-2xl font-black mt-1">{currentStepData?.mstEdgeIds?.length || 0}/{nodes.length - 1}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-blue-700 rounded-2xl p-3 text-white shadow-lg">
                    <div className="text-xs font-bold uppercase text-blue-100">Visited</div>
                    <div className="text-2xl font-black mt-1">{stats.visitedCount || 0}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 border-2 border-purple-700 rounded-2xl p-3 text-white shadow-lg">
                    <div className="text-xs font-bold uppercase text-purple-100">Progress</div>
                    <div className="text-2xl font-black mt-1">{currentStepIndex + 1}/{totalStepsCount}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-emerald-700 rounded-2xl p-3 text-white shadow-lg">
                    <div className="text-xs font-bold uppercase text-emerald-100">Visited</div>
                    <div className="text-2xl font-black mt-1">{stats.visitedCount || 0}/{nodes.length}</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-amber-700 rounded-2xl p-3 text-white shadow-lg">
                    <div className="text-xs font-bold uppercase text-amber-100">Edges</div>
                    <div className="text-2xl font-black mt-1">{stats.edgesExplored || 0}</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-cyan-700 rounded-2xl p-3 text-white shadow-lg">
                    <div className="text-xs font-bold uppercase text-cyan-100">Storage</div>
                    <div className="text-lg font-black mt-1">{selectedAlgo === 'bfs' ? 'Queue' : 'Stack'}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 border-2 border-purple-700 rounded-2xl p-3 text-white shadow-lg">
                    <div className="text-xs font-bold uppercase text-purple-100">Progress</div>
                    <div className="text-2xl font-black mt-1">{currentStepIndex + 1}/{totalStepsCount}</div>
                  </div>
                </>
              )}
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
            </div>
          </div>

          {/* Quick Tips */}
          <div className="flex-shrink-0 bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-2xl p-3">
            <h4 className="text-xs font-black text-green-900 dark:text-green-200 uppercase mb-2">💡 Algorithm Type</h4>
            <p className="text-xs text-green-800 dark:text-green-300 font-semibold">
              {isMstMode ? 'Finds minimum spanning tree' : selectedAlgo === 'bfs' ? 'Level-by-level exploration' : 'Deep dive exploration'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
