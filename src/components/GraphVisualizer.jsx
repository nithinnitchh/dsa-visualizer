import React, { useState, useRef } from 'react';
import { Plus, Trash2, Link2, MousePointer } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const GraphVisualizer = ({
  nodes = [],
  edges = [],
  onUpdateGraph,
  currentNodeId = null,
  visitedNodes = [],
  frontierQueue = [],
  currentEdgeId = null,
  mstEdgeIds = [],
  rejectedEdgeIds = [],
  traversalOrder = [],
  startNodeId = null,
  onSelectStartNode,
  isPlaying = false,
  isMstMode = false,
}) => {
  const svgRef = useRef(null);
  const [draggedNodeId, setDraggedNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedForEdge, setSelectedForEdge] = useState(null);
  const [edgeWeightInput, setEdgeWeightInput] = useState(4);
  const [mode, setMode] = useState('select'); // 'select' | 'addNode' | 'addEdge' | 'remove'
  const { success, warning, error, info } = useToast();

  const handleMouseDown = (e, nodeId) => {
    if (isPlaying) return;
    if (mode === 'addEdge') {
      handleNodeClickForEdge(nodeId);
      return;
    }
    if (mode === 'remove') {
      handleRemoveNode(nodeId);
      return;
    }

    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    setDraggedNodeId(nodeId);
    setDragOffset({
      x: (e.clientX - svgRect.left) - node.x,
      y: (e.clientY - svgRect.top) - node.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggedNodeId || !svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const newX = Math.max(30, Math.min(svgRect.width - 30, (e.clientX - svgRect.left) - dragOffset.x));
    const newY = Math.max(30, Math.min(svgRect.height - 30, (e.clientY - svgRect.top) - dragOffset.y));

    const updatedNodes = nodes.map(n => 
      n.id === draggedNodeId ? { ...n, x: newX, y: newY } : n
    );
    onUpdateGraph(updatedNodes, edges);
  };

  const handleMouseUp = () => {
    setDraggedNodeId(null);
  };

  const handleSvgClick = (e) => {
    if (mode !== 'addNode' || isPlaying) return;
    if (e.target.tagName !== 'svg' && e.target.tagName !== 'rect') return;

    if (nodes.length >= 12) {
      warning('Maximum of 12 nodes recommended for visual clarity.', 'Limit Reached');
      return;
    }

    const svgRect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;

    const nextChar = String.fromCharCode(65 + nodes.length);
    const newNode = {
      id: `node-${Date.now()}`,
      label: nextChar,
      x,
      y,
    };

    onUpdateGraph([...nodes, newNode], edges);
    success(`Added Node ${newNode.label}`, 'Node Added');
    setMode('select');
  };

  const handleNodeClickForEdge = (nodeId) => {
    if (!selectedForEdge) {
      setSelectedForEdge(nodeId);
      info('Select target node to complete edge.', 'Connecting Edge');
    } else {
      if (selectedForEdge === nodeId) {
        setSelectedForEdge(null);
        return;
      }

      const exists = edges.some(e => 
        (e.from === selectedForEdge && e.to === nodeId) ||
        (e.from === nodeId && e.to === selectedForEdge)
      );

      if (exists) {
        warning('Edge already exists between these nodes.', 'Duplicate Edge');
      } else {
        const newEdge = {
          id: `edge-${selectedForEdge}-${nodeId}-${Date.now()}`,
          from: selectedForEdge,
          to: nodeId,
          weight: Math.max(1, Number(edgeWeightInput) || 3),
        };
        onUpdateGraph(nodes, [...edges, newEdge]);
        success(`Edge connected with weight ${newEdge.weight}!`, 'Edge Created');
      }
      setSelectedForEdge(null);
      setMode('select');
    }
  };

  const handleRemoveNode = (nodeId) => {
    if (nodes.length <= 2) {
      error('Graph must have at least 2 nodes.', 'Cannot Remove');
      return;
    }
    const updatedNodes = nodes.filter(n => n.id !== nodeId);
    const updatedEdges = edges.filter(e => e.from !== nodeId && e.to !== nodeId);
    
    if (startNodeId === nodeId && updatedNodes.length > 0) {
      onSelectStartNode(updatedNodes[0].id);
    }
    onUpdateGraph(updatedNodes, updatedEdges);
    success('Node and connected edges removed.', 'Node Removed');
  };

  const handleRemoveEdge = (edgeId) => {
    if (isPlaying) return;
    const updatedEdges = edges.filter(e => e.id !== edgeId);
    onUpdateGraph(nodes, updatedEdges);
    success('Edge removed.', 'Edge Removed');
  };

  return (
    <div className="space-y-4">
      {/* Workspace Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        
        {/* Mode Selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={() => { setMode('select'); setSelectedForEdge(null); }}
            disabled={isPlaying}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'select'
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <MousePointer className="w-3.5 h-3.5" />
            <span>Select / Move</span>
          </button>

          <button
            onClick={() => { setMode('addNode'); setSelectedForEdge(null); }}
            disabled={isPlaying}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'addNode'
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Node</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => { setMode('addEdge'); setSelectedForEdge(null); }}
              disabled={isPlaying}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                mode === 'addEdge'
                  ? 'bg-brand-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Add Edge</span>
            </button>
            {mode === 'addEdge' && (
              <input
                type="number"
                min="1"
                max="99"
                value={edgeWeightInput}
                onChange={(e) => setEdgeWeightInput(e.target.value)}
                placeholder="Wt"
                className="w-14 px-1.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-center font-mono"
                title="Weight for new edge"
              />
            )}
          </div>

          <button
            onClick={() => { setMode('remove'); setSelectedForEdge(null); }}
            disabled={isPlaying}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'remove'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>

        {/* Start Node Selector */}
        {!isMstMode && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Start Node:</span>
            <select
              value={startNodeId || ''}
              onChange={(e) => onSelectStartNode(e.target.value)}
              disabled={isPlaying}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono font-bold rounded-lg px-3 py-1.5 focus:outline-none"
            >
              {nodes.map(n => (
                <option key={n.id} value={n.id}>Node {n.label}</option>
              ))}
            </select>
          </div>
        )}

      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full h-[380px] sm:h-[430px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-inner select-none">
        
        <div className="absolute top-3 left-3 z-10 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400 backdrop-blur-md">
          {mode === 'addNode' && '👉 Click canvas to place node'}
          {mode === 'addEdge' && (selectedForEdge ? '👉 Click target node to link edge' : '👉 Click 1st node for edge')}
          {mode === 'remove' && '👉 Click on node/edge to delete'}
          {mode === 'select' && 'Drag nodes freely to arrange'}
        </div>

        <svg
          ref={svgRef}
          className="w-full h-full cursor-crosshair"
          onClick={handleSvgClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <defs>
            <pattern id="graph-grid-ext" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#graph-grid-ext)" />

          {/* Render Edges */}
          {edges.map(edge => {
            const sourceNode = nodes.find(n => n.id === edge.from);
            const targetNode = nodes.find(n => n.id === edge.to);
            if (!sourceNode || !targetNode) return null;

            const isMst = mstEdgeIds.includes(edge.id);
            const isRejected = rejectedEdgeIds.includes(edge.id);
            const isCurrentEdge = currentEdgeId === edge.id;
            const isTraversed = !isMstMode && visitedNodes.includes(edge.from) && visitedNodes.includes(edge.to);

            let strokeColor = '#334155'; // slate-700
            let strokeWidth = 2.5;
            let strokeDash = 'none';

            if (isCurrentEdge) {
              strokeColor = '#f59e0b'; // amber-500
              strokeWidth = 4.5;
            } else if (isMst) {
              strokeColor = '#10b981'; // emerald-500
              strokeWidth = 4;
            } else if (isRejected) {
              strokeColor = '#475569';
              strokeWidth = 1.5;
              strokeDash = '4 4';
            } else if (isTraversed) {
              strokeColor = '#10b981';
              strokeWidth = 3;
            }

            const midX = (sourceNode.x + targetNode.x) / 2;
            const midY = (sourceNode.y + targetNode.y) / 2;

            return (
              <g key={edge.id} className="cursor-pointer" onClick={() => mode === 'remove' && handleRemoveEdge(edge.id)}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                  strokeLinecap="round"
                  className="transition-colors duration-200"
                />

                {/* Edge Weight Badge */}
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x="-12"
                    y="-9"
                    width="24"
                    height="18"
                    rx="6"
                    fill={isMst ? '#064e3b' : isCurrentEdge ? '#78350f' : '#0f172a'}
                    stroke={isMst ? '#10b981' : isCurrentEdge ? '#f59e0b' : '#334155'}
                    strokeWidth="1.5"
                  />
                  <text
                    textAnchor="middle"
                    dy="3.5"
                    fill={isMst ? '#34d399' : isCurrentEdge ? '#fbbf24' : '#94a3b8'}
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {edge.weight || 1}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Render Nodes */}
          {nodes.map(node => {
            const isCurrent = currentNodeId === node.id;
            const isVisited = visitedNodes.includes(node.id);
            const isFrontier = frontierQueue.includes(node.id) && !isVisited;
            const isStart = startNodeId === node.id && !isMstMode;
            const isEdgeSelected = selectedForEdge === node.id;

            let fillColor = '#1e293b';
            let strokeColor = '#64748b';
            let glow = false;

            if (isCurrent) {
              fillColor = '#f59e0b';
              strokeColor = '#fbbf24';
              glow = true;
            } else if (isVisited) {
              fillColor = '#10b981';
              strokeColor = '#34d399';
            } else if (isFrontier) {
              fillColor = '#ec4899';
              strokeColor = '#f472b6';
            } else if (isStart) {
              fillColor = '#6366f1';
              strokeColor = '#818cf8';
            } else if (isEdgeSelected) {
              fillColor = '#8b5cf6';
              strokeColor = '#a78bfa';
            }

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                className="cursor-pointer"
              >
                {glow && (
                  <circle
                    r="28"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    className="animate-ping opacity-60"
                  />
                )}

                {isStart && (
                  <circle
                    r="25"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    className="animate-spin-slow"
                  />
                )}

                <circle
                  r="20"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="3"
                  className="transition-colors duration-200 hover:scale-105"
                />

                <text
                  textAnchor="middle"
                  dy="5"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="Inter, sans-serif"
                  className="select-none pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal / MST Footer Sequence */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {isMstMode ? 'Minimum Spanning Tree Edges' : 'Visited Nodes Sequence'}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
            {isMstMode ? `${mstEdgeIds.length} / ${nodes.length - 1} Edges` : `${traversalOrder.length} Visited`}
          </span>
        </div>

        <div className="flex items-center gap-2 min-h-[40px] p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 overflow-x-auto">
          {isMstMode ? (
            mstEdgeIds.length === 0 ? (
              <span className="text-xs text-slate-400 italic">No MST edges selected yet</span>
            ) : (
              mstEdgeIds.map((eId, idx) => {
                const edge = edges.find(e => e.id === eId);
                const u = nodes.find(n => n.id === edge?.from);
                const v = nodes.find(n => n.id === edge?.to);
                return (
                  <span key={idx} className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-mono font-bold text-xs shadow-xs">
                    {u?.label} — {v?.label} (wt: {edge?.weight})
                  </span>
                );
              })
            )
          ) : (
            traversalOrder.length === 0 ? (
              <span className="text-xs text-slate-400 italic">No nodes visited yet</span>
            ) : (
              traversalOrder.map((id, idx) => {
                const node = nodes.find(n => n.id === id);
                return (
                  <React.Fragment key={idx}>
                    <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-mono font-bold text-xs shadow-xs">
                      {node?.label || id}
                    </span>
                    {idx < traversalOrder.length - 1 && <span className="text-slate-400 text-xs font-bold">→</span>}
                  </React.Fragment>
                );
              })
            )
          )}
        </div>
      </div>

    </div>
  );
};
