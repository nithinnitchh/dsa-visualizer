import React, { useState, useRef, useCallback } from 'react';
import { DATA_STRUCTURES } from '../utils/constants';
import { ALGORITHM_DETAILS } from '../utils/complexityData';
import { PlaybackEngine } from '../utils/animationEngine';
import { 
  StackModel, 
  QueueModel, 
  LinkedListModel, 
  BSTModel, 
  HashTableChainingModel 
} from '../algorithms/dataStructures';
import { 
  StackVisualizer, 
  QueueVisualizer, 
  LinkedListVisualizer, 
  BSTVisualizer 
} from '../components/DataStructuresVisualizer';
import { HashTableVisualizer } from '../components/HashTableVisualizer';
import { Controls } from '../components/Controls';
import { ComplexityCard } from '../components/ComplexityCard';
import { CodePanel } from '../components/CodePanel';
import generateMultiLangCode from '../utils/multilangCode';
import { TopicQuiz } from '../components/TopicQuiz';
import { StepCommentary } from '../components/StepCommentary';
import { Layers, Database, GitCommit, Binary, Hash } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const DataStructuresPage = ({ initialType = 'stack' }) => {
  const [activeDs, setActiveDs] = useState(initialType);
  const [speed, setSpeed] = useState(300);

  // Models
  const [stackModel] = useState(() => new StackModel([15, 28, 42]));
  const [queueModel] = useState(() => new QueueModel([24, 65, 89]));
  const [linkedListModel] = useState(() => new LinkedListModel([10, 20, 30, 40]));
  const [bstModel] = useState(() => new BSTModel([50, 30, 70, 20, 40, 60, 80]));
  const [hashTableModel] = useState(() => {
    const ht = new HashTableChainingModel(7);
    ht.insert(10, 'alpha');
    ht.insert(17, 'beta'); // collision with 10 (both 10%7=3 and 17%7=3)
    ht.insert(24, 'gamma');
    return ht;
  });

  const [modelVersion, setModelVersion] = useState(0);

  // Playback state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepData, setCurrentStepData] = useState(null);
  const [totalStepsCount, setTotalStepsCount] = useState(0);

  const engineRef = useRef(null);
  const { info } = useToast();

  const handleExecuteStep = useCallback((steps) => {
    if (!steps || steps.length === 0) return;

    if (engineRef.current) {
      engineRef.current.destroy();
    }

    engineRef.current = new PlaybackEngine({
      steps,
      delay: speed,
      onStep: (index, step) => {
        setCurrentStepIndex(index);
        setCurrentStepData(step);
        setModelVersion(v => v + 1);
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
    setCurrentStepData(steps[0]);
    setTotalStepsCount(steps.length);
    setModelVersion(v => v + 1);

    if (steps.length > 1) {
      engineRef.current.play();
    }
  }, [speed]);

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
    info('Reset operation sequence.', 'Reset');
  };

  const currentDetails = ALGORITHM_DETAILS[activeDs] || ALGORITHM_DETAILS.stack;

  const getDsIcon = (id) => {
    switch (id) {
      case 'stack': return Layers;
      case 'queue': return Database;
      case 'linkedList': return GitCommit;
      case 'binarySearchTree': return Binary;
      case 'hashTable': return Hash;
      default: return Layers;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span>Data Structures Lab</span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20">
              {currentDetails.name}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {currentDetails.description}
          </p>
        </div>
      </div>

      {/* Data Structure Category Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
        {DATA_STRUCTURES.map(ds => {
          const Icon = getDsIcon(ds.id);
          const isActive = activeDs === ds.id;
          return (
            <button
              key={ds.id}
              onClick={() => {
                if (isPlaying) handlePause();
                setActiveDs(ds.id);
                setCurrentStepData(null);
                setTotalStepsCount(0);
                setCurrentStepIndex(0);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                isActive
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{ds.name}</span>
            </button>
          );
        })}
      </div>

      {/* 1. VISUALIZER CANVAS (PLACED ON TOP FOR BEST VISUAL HIERARCHY) */}
      <div key={modelVersion}>
        {activeDs === 'stack' && (
          <StackVisualizer model={stackModel} onExecuteStep={handleExecuteStep} />
        )}
        {activeDs === 'queue' && (
          <QueueVisualizer model={queueModel} onExecuteStep={handleExecuteStep} />
        )}
        {activeDs === 'linkedList' && (
          <LinkedListVisualizer
            model={linkedListModel}
            onExecuteStep={handleExecuteStep}
            activeNodeId={currentStepData?.activeNodeId}
          />
        )}
        {activeDs === 'binarySearchTree' && (
          <BSTVisualizer
            model={bstModel}
            onExecuteStep={handleExecuteStep}
            activeNodeId={currentStepData?.activeNodeId}
            traversalSequence={currentStepData?.traversalSequence || []}
          />
        )}
        {activeDs === 'hashTable' && (
          <HashTableVisualizer
            model={hashTableModel}
            onExecuteStep={handleExecuteStep}
            activeHashIndex={currentStepData?.hashIndex}
          />
        )}
      </div>

      {/* 2. PLAYBACK CONTROLS (PLACED DIRECTLY BELOW VISUALIZER) */}
      {totalStepsCount > 1 && (
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
      )}

      {/* 3. STEP COMMENTARY */}
      <StepCommentary description={currentStepData?.description} />

      {/* 4. COMPLEXITY & PSEUDOCODE PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplexityCard details={currentDetails} />
        <CodePanel
          pseudocode={currentDetails.pseudocode}
          algorithmName={currentDetails.name}
          isDefaultOpen={true}
          inputLabel={activeDs === 'stack' ? 'stack' : activeDs === 'queue' ? 'queue' : activeDs === 'linkedList' ? 'linkedList' : activeDs === 'binarySearchTree' ? 'bst' : 'hashTable'}
          inputValue={
            activeDs === 'stack'
              ? stackModel.items
              : activeDs === 'queue'
                ? queueModel.items
                : activeDs === 'linkedList'
                  ? linkedListModel.nodes.map(node => node.value)
                  : activeDs === 'binarySearchTree'
                    ? (() => {
                        const flatten = (node) => {
                          if (!node) return [];
                          return [...flatten(node.left), node.value, ...flatten(node.right)];
                        };
                        return flatten(bstModel.root);
                      })()
                    : Object.entries(hashTableModel.buckets).flatMap(([bucketIndex, bucket]) => bucket.map(item => `${item.key}:${item.value}`))
          }
          codeByLanguage={generateMultiLangCode(activeDs, (
            activeDs === 'stack'
              ? stackModel.items
              : activeDs === 'queue'
                ? queueModel.items
                : activeDs === 'linkedList'
                  ? linkedListModel.nodes.map(node => node.value)
                  : activeDs === 'binarySearchTree'
                    ? (() => {
                        const flatten = (node) => {
                          if (!node) return [];
                          return [...flatten(node.left), node.value, ...flatten(node.right)];
                        };
                        return flatten(bstModel.root);
                      })()
                    : Object.entries(hashTableModel.buckets).flatMap(([bucketIndex, bucket]) => bucket.map(item => `${item.key}:${item.value}`))
          ))}
        />
      </div>

      <TopicQuiz topic={activeDs === 'stack' ? 'stack' : activeDs === 'queue' ? 'queue' : activeDs === 'linkedList' ? 'linkedList' : activeDs === 'binarySearchTree' ? 'binarySearchTree' : 'hashTable'} />

    </div>
  );
};
