import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { Dashboard } from './pages/Dashboard';
import { SortingPage } from './pages/SortingPage';
import { GraphPage } from './pages/GraphPage';
import { PathfindingPage } from './pages/PathfindingPage';
import { DataStructuresPage } from './pages/DataStructuresPage';
import { SlidingWindowPage } from './pages/SlidingWindowPage';
import { AlgorithmsPage } from './pages/AlgorithmsPage';
import { AboutPage } from './pages/AboutPage';

function AppContent() {
  const [activePage, setActivePage] = useState('dashboard');
  const [targetAlgorithm, setTargetAlgorithm] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigate = (pageId, algoKey = null) => {
    setActivePage(pageId);
    if (algoKey) {
      setTargetAlgorithm(algoKey);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Responsive Sidebar */}
        <Sidebar
          activePage={activePage}
          setActivePage={(page) => handleNavigate(page, null)}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Dynamic Page Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {activePage === 'dashboard' && (
            <Dashboard onNavigate={handleNavigate} />
          )}

          {activePage === 'sorting' && (
            <SortingPage initialAlgorithm={targetAlgorithm || 'bubbleSort'} />
          )}

          {activePage === 'graph' && (
            <GraphPage initialAlgorithm={targetAlgorithm || 'bfs'} />
          )}

          {activePage === 'pathfinding' && (
            <PathfindingPage initialAlgorithm={targetAlgorithm || 'dijkstra'} />
          )}

          {activePage === 'dataStructures' && (
            <DataStructuresPage initialType={targetAlgorithm || 'stack'} />
          )}

          {activePage === 'slidingWindow' && (
            <SlidingWindowPage />
          )}

          {activePage === 'algorithms' && (
            <AlgorithmsPage onNavigate={handleNavigate} />
          )}

          {activePage === 'about' && (
            <AboutPage />
          )}
        </main>
      </div>

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={setIsSearchOpen}
        onSelectAlgorithm={handleNavigate}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
