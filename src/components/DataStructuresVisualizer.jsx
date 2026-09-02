import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowDown, 
  Layers, 
  Plus, 
  Minus, 
  Eye, 
  Trash2, 
  Search, 
  Play, 
  Check, 
  AlertCircle,
  CornerDownRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

// 1. Stack Visualizer Component
export const StackVisualizer = ({ model, onExecuteStep }) => {
  const [inputValue, setInputValue] = useState('');
  const { warning } = useToast();

  const handlePush = (e) => {
    e.preventDefault();
    const val = Number(inputValue);
    if (!inputValue || isNaN(val)) {
      warning('Please enter a valid number.', 'Invalid Value');
      return;
    }
    const { steps } = model.push(val);
    onExecuteStep(steps);
    setInputValue('');
  };

  const handlePop = () => {
    const { steps } = model.pop();
    onExecuteStep(steps);
  };

  const handlePeek = () => {
    const { steps } = model.peek();
    onExecuteStep(steps);
  };

  const handleClear = () => {
    const steps = model.clear();
    onExecuteStep(steps);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <form onSubmit={handlePush} className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Value"
            className="w-24 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-3.5 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Push
          </button>
        </form>

        <button
          onClick={handlePop}
          className="flex items-center gap-1 px-3.5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl shadow-xs"
        >
          <Minus className="w-3.5 h-3.5" /> Pop
        </button>

        <button
          onClick={handlePeek}
          className="flex items-center gap-1 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl border border-slate-200 dark:border-slate-700"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-500" /> Peek Top
        </button>

        <button
          onClick={handleClear}
          className="flex items-center gap-1 px-3.5 py-2 text-slate-500 hover:text-rose-500 rounded-xl"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      {/* Stack Vertical Chamber */}
      <div className="relative w-full min-h-[320px] bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-end shadow-inner">
        <div className="w-48 border-x-4 border-b-4 border-slate-700 rounded-b-2xl p-2 flex flex-col-reverse gap-2 bg-slate-900/40 min-h-[240px]">
          {model.items.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs italic">
              Stack is Empty
            </div>
          ) : (
            model.items.map((val, idx) => {
              const isTop = idx === model.items.length - 1;
              return (
                <div
                  key={idx}
                  className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-between font-mono text-sm font-bold shadow-md transition-all duration-200 ${
                    isTop
                      ? 'bg-brand-500 text-white ring-2 ring-brand-400 ring-offset-2 ring-offset-slate-950 scale-105'
                      : 'bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>{val}</span>
                  {isTop && (
                    <span className="text-[10px] font-sans font-semibold px-1.5 py-0.5 rounded bg-white/20 text-white">
                      TOP
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div className="mt-3 text-xs text-slate-400 font-mono">
          Capacity: <strong className="text-white">{model.items.length}</strong> / {model.maxSize}
        </div>
      </div>
    </div>
  );
};

// 2. Queue Visualizer Component
export const QueueVisualizer = ({ model, onExecuteStep }) => {
  const [inputValue, setInputValue] = useState('');
  const { warning } = useToast();

  const handleEnqueue = (e) => {
    e.preventDefault();
    const val = Number(inputValue);
    if (!inputValue || isNaN(val)) {
      warning('Please enter a valid number.', 'Invalid Value');
      return;
    }
    const { steps } = model.enqueue(val);
    onExecuteStep(steps);
    setInputValue('');
  };

  const handleDequeue = () => {
    const { steps } = model.dequeue();
    onExecuteStep(steps);
  };

  const handlePeek = () => {
    const { steps } = model.peek();
    onExecuteStep(steps);
  };

  const handleClear = () => {
    const steps = model.clear();
    onExecuteStep(steps);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <form onSubmit={handleEnqueue} className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Value"
            className="w-24 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-3.5 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Enqueue
          </button>
        </form>

        <button
          onClick={handleDequeue}
          className="flex items-center gap-1 px-3.5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl shadow-xs"
        >
          <Minus className="w-3.5 h-3.5" /> Dequeue
        </button>

        <button
          onClick={handlePeek}
          className="flex items-center gap-1 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl border border-slate-200 dark:border-slate-700"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-500" /> Peek Front
        </button>

        <button
          onClick={handleClear}
          className="flex items-center gap-1 px-3.5 py-2 text-slate-500 hover:text-rose-500 rounded-xl"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      {/* Queue Horizontal Conduit */}
      <div className="relative w-full min-h-[260px] bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center overflow-x-auto shadow-inner">
        <div className="flex items-center gap-3 border-y-4 border-slate-700 p-4 min-w-[320px] max-w-full rounded-xl bg-slate-900/40 overflow-x-auto">
          {model.items.length === 0 ? (
            <div className="w-full text-center text-slate-500 text-xs italic py-4">
              Queue is Empty
            </div>
          ) : (
            model.items.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === model.items.length - 1;

              return (
                <div key={idx} className="flex-shrink-0 flex flex-col items-center gap-1">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center font-mono text-base font-bold shadow-md transition-all duration-200 ${
                      isFront
                        ? 'bg-emerald-500 text-white ring-2 ring-emerald-400'
                        : isRear
                        ? 'bg-indigo-500 text-white ring-2 ring-indigo-400'
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {val}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {isFront && 'FRONT'}
                    {isRear && !isFront && 'REAR'}
                    {!isFront && !isRear && `[${idx}]`}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-4 text-xs text-slate-400 font-mono">
          Capacity: <strong className="text-white">{model.items.length}</strong> / {model.maxSize}
        </div>
      </div>
    </div>
  );
};

// 3. Linked List Visualizer Component
export const LinkedListVisualizer = ({ model, onExecuteStep, activeNodeId = null }) => {
  const [valInput, setValInput] = useState('');
  const [idxInput, setIdxInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { warning } = useToast();

  const handleInsertHead = (e) => {
    e.preventDefault();
    const val = Number(valInput);
    if (!valInput || isNaN(val)) {
      warning('Enter a valid number.', 'Invalid');
      return;
    }
    const { steps } = model.insertBeginning(val);
    onExecuteStep(steps);
    setValInput('');
  };

  const handleInsertTail = () => {
    const val = Number(valInput);
    if (!valInput || isNaN(val)) {
      warning('Enter a valid number in value field.', 'Invalid');
      return;
    }
    const { steps } = model.insertEnd(val);
    onExecuteStep(steps);
    setValInput('');
  };

  const handleInsertAt = () => {
    const val = Number(valInput);
    const idx = Number(idxInput);
    if (!valInput || isNaN(val) || isNaN(idx)) {
      warning('Enter valid number & index.', 'Invalid');
      return;
    }
    const { steps } = model.insertAt(idx, val);
    onExecuteStep(steps);
    setValInput('');
    setIdxInput('');
  };

  const handleDelete = () => {
    const val = Number(valInput);
    if (!valInput || isNaN(val)) {
      warning('Enter value to delete.', 'Invalid');
      return;
    }
    const { steps } = model.deleteValue(val);
    onExecuteStep(steps);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const val = Number(searchInput);
    if (!searchInput || isNaN(val)) {
      warning('Enter search number.', 'Invalid');
      return;
    }
    const { steps } = model.search(val);
    onExecuteStep(steps);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        
        {/* Insert & Delete by Value */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={valInput}
            onChange={(e) => setValInput(e.target.value)}
            placeholder="Node value"
            className="w-24 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none"
          />
          <button
            onClick={handleInsertHead}
            className="px-2.5 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl"
          >
            + Head
          </button>
          <button
            onClick={handleInsertTail}
            className="px-2.5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl"
          >
            + Tail
          </button>
          <button
            onClick={handleDelete}
            className="px-2.5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl"
          >
            Delete
          </button>
        </div>

        {/* Insert At Position */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={idxInput}
            onChange={(e) => setIdxInput(e.target.value)}
            placeholder="Index"
            className="w-16 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none"
          />
          <button
            onClick={handleInsertAt}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl border border-slate-200 dark:border-slate-700"
          >
            Insert at Index
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="number"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search val"
            className="w-24 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl"
          >
            <Search className="w-3.5 h-3.5" /> Search
          </button>
        </form>

      </div>

      {/* Linked List Canvas */}
      <div className="w-full min-h-[260px] bg-slate-950 border border-slate-800 rounded-2xl p-6 flex items-center overflow-x-auto shadow-inner">
        <div className="flex items-center gap-2 min-w-max mx-auto">
          {/* Head Indicator */}
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-brand-400 mr-2">
            <span>HEAD</span>
            <ArrowRight className="w-4 h-4" />
          </div>

          {model.nodes.length === 0 ? (
            <span className="text-slate-500 font-mono text-xs">null (Empty List)</span>
          ) : (
            model.nodes.map((node, idx) => {
              const isActive = activeNodeId === node.id;
              return (
                <React.Fragment key={node.id}>
                  {/* Node Box */}
                  <div
                    className={`flex items-center rounded-xl border font-mono text-xs transition-all duration-200 shadow-md ${
                      isActive
                        ? 'border-amber-400 bg-amber-500/20 text-white ring-2 ring-amber-400 scale-110'
                        : 'border-slate-700 bg-slate-900 text-slate-200'
                    }`}
                  >
                    <div className="px-3.5 py-3 font-bold text-sm border-r border-slate-700">
                      {node.value}
                    </div>
                    <div className="px-2.5 py-3 text-[10px] text-slate-400 bg-slate-800/60 rounded-r-xl">
                      next
                    </div>
                  </div>

                  {/* Arrow Pointer */}
                  <div className="flex items-center text-brand-500 px-1">
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </React.Fragment>
              );
            })
          )}

          {/* Null Terminator */}
          <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 font-mono text-xs font-bold">
            NULL
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Binary Search Tree (BST) Visualizer Component
export const BSTVisualizer = ({ model, onExecuteStep, activeNodeId = null, traversalSequence = [] }) => {
  const [valInput, setValInput] = useState('');
  const { warning } = useToast();

  const handleInsert = (e) => {
    e.preventDefault();
    const val = Number(valInput);
    if (!valInput || isNaN(val)) {
      warning('Please enter a valid number.', 'Invalid');
      return;
    }
    const { steps } = model.insert(val);
    onExecuteStep(steps);
    setValInput('');
  };

  const handleSearch = () => {
    const val = Number(valInput);
    if (!valInput || isNaN(val)) {
      warning('Please enter a number to search.', 'Invalid');
      return;
    }
    const { steps } = model.search(val);
    onExecuteStep(steps);
  };

  const handleDelete = () => {
    const val = Number(valInput);
    if (!valInput || isNaN(val)) {
      warning('Please enter a number to delete.', 'Invalid');
      return;
    }
    const { steps } = model.deleteValue(val);
    onExecuteStep(steps);
  };

  const handleTraverse = (type) => {
    const steps = model.traverse(type);
    onExecuteStep(steps);
  };

  // Helper to compute layout coordinates for tree rendering
  const layoutTree = (node, depth = 0, left = 0, right = 600) => {
    if (!node) return [];
    const x = (left + right) / 2;
    const y = depth * 65 + 45;

    const current = { node, x, y };
    const leftElements = node.left ? layoutTree(node.left, depth + 1, left, x) : [];
    const rightElements = node.right ? layoutTree(node.right, depth + 1, x, right) : [];

    return [current, ...leftElements, ...rightElements];
  };

  const treeLayout = layoutTree(model.root);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        
        {/* Value Operations */}
        <form onSubmit={handleInsert} className="flex items-center gap-2">
          <input
            type="number"
            value={valInput}
            onChange={(e) => setValInput(e.target.value)}
            placeholder="BST Value"
            className="w-24 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={handleSearch}
            className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl"
          >
            Delete
          </button>
        </form>

        {/* Traversal Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={() => handleTraverse('inorder')}
            className="px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium"
          >
            Inorder
          </button>
          <button
            onClick={() => handleTraverse('preorder')}
            className="px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium"
          >
            Preorder
          </button>
          <button
            onClick={() => handleTraverse('postorder')}
            className="px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium"
          >
            Postorder
          </button>
          <button
            onClick={() => handleTraverse('levelOrder')}
            className="px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium"
          >
            Level Order
          </button>
        </div>

      </div>

      {/* BST SVG Canvas */}
      <div className="w-full h-[360px] bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-x-auto flex justify-center shadow-inner">
        <svg width="600" height="340" className="select-none">
          {/* Render Connection Edges */}
          {treeLayout.map(({ node, x, y }) => (
            <React.Fragment key={node.id}>
              {node.left && (
                <line
                  x1={x}
                  y1={y}
                  x2={(x + (x - (600 / Math.pow(2, 2)))) / 2} // approximate branch position
                  y2={y + 65}
                  stroke="#475569"
                  strokeWidth="2"
                />
              )}
              {node.right && (
                <line
                  x1={x}
                  y1={y}
                  x2={(x + (x + (600 / Math.pow(2, 2)))) / 2}
                  y2={y + 65}
                  stroke="#475569"
                  strokeWidth="2"
                />
              )}
            </React.Fragment>
          ))}

          {/* Render BST Nodes */}
          {treeLayout.map(({ node, x, y }) => {
            const isActive = activeNodeId === node.id;
            return (
              <g key={node.id} transform={`translate(${x}, ${y})`}>
                <circle
                  r="18"
                  fill={isActive ? '#f59e0b' : '#1e293b'}
                  stroke={isActive ? '#fbbf24' : '#6366f1'}
                  strokeWidth="2.5"
                  className="transition-colors duration-200"
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="Inter, sans-serif"
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal Output Sequence */}
      {traversalSequence.length > 0 && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Traversal Sequence Result
          </span>
          <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 overflow-x-auto">
            {traversalSequence.map((val, idx) => (
              <React.Fragment key={idx}>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-mono font-bold text-xs">
                  {val}
                </span>
                {idx < traversalSequence.length - 1 && <span className="text-slate-500 font-bold">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
