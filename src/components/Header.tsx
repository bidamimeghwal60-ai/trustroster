import React from 'react';
import { ShieldCheck, Scale, PlusCircle } from 'lucide-react';

interface HeaderProps {
  onOpenSubmitModal: () => void;
  onOpenCompareModal: () => void;
  selectedCompareCount: number;
  currentView: 'grid' | 'matrix';
  onViewChange: (view: 'grid' | 'matrix') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSubmitModal,
  onOpenCompareModal,
  selectedCompareCount,
  currentView,
  onViewChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="/" className="flex items-center gap-2.5 text-slate-900 group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck className="w-5 h-5 text-blue-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
              TrustRoster
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onViewChange('grid')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              currentView === 'grid' ? 'text-blue-900 font-semibold' : ''
            }`}
          >
            Directory
          </button>
          <button
            onClick={() => onViewChange('matrix')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              currentView === 'matrix' ? 'text-blue-900 font-semibold' : ''
            }`}
          >
            Compliance Matrix
          </button>
          <button
            onClick={onOpenCompareModal}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 text-slate-600"
          >
            <Scale className="w-4 h-4 text-slate-400" />
            <span>Compare</span>
            {selectedCompareCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-xs font-semibold bg-blue-100 text-blue-800 rounded-sm">
                {selectedCompareCount}
              </span>
            )}
          </button>
          <a
            href="#frameworks"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Standards
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSubmitModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-blue-200" />
            <span>List Your Tool</span>
          </button>
        </div>
      </div>
    </header>
  );
};
