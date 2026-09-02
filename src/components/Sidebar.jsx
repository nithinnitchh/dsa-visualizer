import React from 'react';
import { 
  LayoutDashboard, 
  ArrowUpDown, 
  Network, 
  Compass, 
  Layers, 
  ArrowLeftRight,
  BookOpen, 
  Info,
  Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'sorting', label: 'Sorting Algorithms', icon: ArrowUpDown, badge: '6 Algos' },
  { id: 'graph', label: 'Graph & MST', icon: Network, badge: 'BFS/DFS/MST' },
  { id: 'pathfinding', label: 'Pathfinding', icon: Compass, badge: 'A* / Dijkstra' },
  { id: 'dataStructures', label: 'Data Structures', icon: Layers, badge: '5 Types' },
  { id: 'slidingWindow', label: 'Sliding Window', icon: ArrowLeftRight, badge: 'O(n)' },
  { id: 'algorithms', label: 'Algorithms Explorer', icon: BookOpen, badge: 'Catalog' },
  { id: 'about', label: 'About & Architecture', icon: Info, badge: null },
];

export const Sidebar = ({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) => {
  const handleSelect = (id) => {
    setActivePage(id);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed md:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md flex flex-col justify-between p-4 transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <div className="px-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Visualizer Modules
            </p>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25 dark:bg-brand-600'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Pro Tip Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-brand-500/10 via-indigo-500/5 to-cyan-500/10 border border-brand-500/20 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-brand-600 dark:text-brand-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intuitive Controls</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
            All visualizers position the graphical canvas in primary view with playback controls conveniently placed below.
          </p>
        </div>
      </aside>
    </>
  );
};
