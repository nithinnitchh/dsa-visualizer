import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Target, 
  Square, 
  Shuffle, 
  Trash2, 
  Sparkles,
  Check
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const GridVisualizer = ({
  rows = 18,
  cols = 36,
  startPos = { r: 8, c: 5 },
  endPos = { r: 8, c: 30 },
  wallsSet = new Set(),
  onToggleWall,
  onSetWalls,
  onMoveStart,
  onMoveEnd,
  visitedCells = [],
  frontierCells = [],
  currentCell = null,
  shortestPath = [],
  isPlaying = false,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragMode, setDragMode] = useState('wall'); // 'wall' | 'start' | 'end' | 'erase'
  const { success, warning } = useToast();

  const handleCellMouseDown = (r, c) => {
    if (isPlaying) return;
    setIsMouseDown(true);

    if (r === startPos.r && c === startPos.c) {
      setDragMode('start');
      return;
    }
    if (r === endPos.r && c === endPos.c) {
      setDragMode('end');
      return;
    }

    const key = `${r},${c}`;
    if (wallsSet.has(key)) {
      setDragMode('erase');
      onToggleWall(r, c, false);
    } else {
      setDragMode('wall');
      onToggleWall(r, c, true);
    }
  };

  const handleCellMouseEnter = (r, c) => {
    if (!isMouseDown || isPlaying) return;

    if (dragMode === 'start') {
      if (r === endPos.r && c === endPos.c) return;
      onMoveStart({ r, c });
    } else if (dragMode === 'end') {
      if (r === startPos.r && c === startPos.c) return;
      onMoveEnd({ r, c });
    } else if (dragMode === 'wall') {
      if ((r === startPos.r && c === startPos.c) || (r === endPos.r && c === endPos.c)) return;
      onToggleWall(r, c, true);
    } else if (dragMode === 'erase') {
      onToggleWall(r, c, false);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setDragMode('wall');
  };

  const handleGenerateRandomMaze = () => {
    if (isPlaying) return;
    const newWalls = new Set();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if ((r === startPos.r && c === startPos.c) || (r === endPos.r && c === endPos.c)) continue;
        if (Math.random() < 0.28) {
          newWalls.add(`${r},${c}`);
        }
      }
    }
    onSetWalls(newWalls);
    success('Generated random obstacle field!', 'Maze Generated');
  };

  const handleClearWalls = () => {
    if (isPlaying) return;
    onSetWalls(new Set());
    success('Cleared all wall barriers.', 'Walls Cleared');
  };

  // Convert visited / frontier / path into lookup sets for fast O(1) rendering
  const visitedSet = new Set(visitedCells.map(cell => `${cell.r},${cell.c}`));
  const frontierSet = new Set(frontierCells.map(cell => `${cell.r},${cell.c}`));
  const pathSet = new Set(shortestPath.map(cell => `${cell.r},${cell.c}`));

  return (
    <div className="space-y-4">
      {/* Grid Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateRandomMaze}
            disabled={isPlaying}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 transition-all active:scale-95 disabled:opacity-50"
          >
            <Shuffle className="w-3.5 h-3.5 text-brand-500" />
            <span>Random Obstacles</span>
          </button>

          <button
            onClick={handleClearWalls}
            disabled={isPlaying}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 transition-all active:scale-95 disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Clear Walls</span>
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span>Start</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-rose-500" />
            <span>Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-700" />
            <span>Wall</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-indigo-500" />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-400" />
            <span>Shortest Path</span>
          </div>
        </div>

      </div>

      {/* Grid Canvas */}
      <div 
        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 overflow-x-auto shadow-inner select-none flex justify-center"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="grid gap-[2px] bg-slate-900/60 p-2 rounded-xl"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(18px, 1fr))`,
            minWidth: `${cols * 18}px`,
          }}
        >
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const key = `${r},${c}`;
              const isStart = r === startPos.r && c === startPos.c;
              const isEnd = r === endPos.r && c === endPos.c;
              const isWall = wallsSet.has(key);
              const isPath = pathSet.has(key);
              const isVisited = visitedSet.has(key);
              const isFrontier = frontierSet.has(key);
              const isCurrent = currentCell && currentCell.r === r && currentCell.c === c;

              let cellStyle = 'bg-slate-900 hover:bg-slate-800';

              if (isStart) {
                cellStyle = 'bg-emerald-500 text-white shadow-md shadow-emerald-500/40 z-10';
              } else if (isEnd) {
                cellStyle = 'bg-rose-500 text-white shadow-md shadow-rose-500/40 z-10';
              } else if (isPath) {
                cellStyle = 'bg-amber-400 animate-shortest-path z-10';
              } else if (isCurrent) {
                cellStyle = 'bg-pink-400 animate-ping z-10';
              } else if (isFrontier) {
                cellStyle = 'bg-pink-500/80 animate-pulse';
              } else if (isVisited) {
                cellStyle = 'bg-indigo-600/90 animate-pop-cell';
              } else if (isWall) {
                cellStyle = 'bg-slate-700 scale-95 rounded-xs';
              }

              return (
                <div
                  key={key}
                  onMouseDown={() => handleCellMouseDown(r, c)}
                  onMouseEnter={() => handleCellMouseEnter(r, c)}
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-xs transition-all duration-150 cursor-pointer flex items-center justify-center ${cellStyle}`}
                >
                  {isStart && <MapPin className="w-3 h-3 fill-current" />}
                  {isEnd && <Target className="w-3 h-3 fill-current" />}
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
