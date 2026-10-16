import React from 'react';
import { ComplianceFrameworkType } from '../types/vendor';
import { CATEGORIES, COMPLIANCE_FRAMEWORKS } from '../data/vendors';
import { Filter, Check, RotateCcw, LayoutGrid, Table, ArrowUpDown, Shield } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedFrameworks: ComplianceFrameworkType[];
  onToggleFramework: (framework: ComplianceFrameworkType) => void;
  selfServeBAAOnly: boolean;
  onToggleSelfServeBAA: () => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  resultsCount: number;
  totalCount: number;
  sortBy: string;
  onSortChange: (sort: 'relevance' | 'certifications' | 'alphabetical' | 'recentAudit' | 'lowestCost') => void;
  currentView: 'grid' | 'matrix';
  onViewChange: (view: 'grid' | 'matrix') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedFrameworks,
  onToggleFramework,
  selfServeBAAOnly,
  onToggleSelfServeBAA,
  onResetFilters,
  hasActiveFilters,
  resultsCount,
  totalCount,
  sortBy,
  onSortChange,
  currentView,
  onViewChange,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Top Filter Row: Category Segmented Scroll/Buttons */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-300 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Action: Grid vs Matrix Toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 border border-slate-200">
            <button
              onClick={() => onViewChange('grid')}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentView === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => onViewChange('matrix')}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentView === 'matrix'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Compliance Matrix View"
            >
              <Table className="w-3.5 h-3.5" />
              <span>Matrix</span>
            </button>
          </div>
        </div>

        {/* Bottom Filter Row: Framework Checkboxes/Chips + Sort + Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
          {/* Framework Multi-select Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Compliance:</span>
            </span>
            {COMPLIANCE_FRAMEWORKS.map((framework) => {
              const isChecked = selectedFrameworks.includes(framework.id as ComplianceFrameworkType);
              return (
                <button
                  key={framework.id}
                  onClick={() => onToggleFramework(framework.id as ComplianceFrameworkType)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer border ${
                    isChecked
                      ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                  }`}
                  aria-pressed={isChecked}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center border ${
                      isChecked ? 'bg-blue-900 border-blue-900 text-white' : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{framework.label}</span>
                </button>
              );
            })}

            {/* Self-serve BAA modifier toggle */}
            <button
              onClick={onToggleSelfServeBAA}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer border ${
                selfServeBAAOnly
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
              }`}
              aria-pressed={selfServeBAAOnly}
              title="Only show vendors where BAA can be signed on self-serve plans without an Enterprise sales call"
            >
              <div
                className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center border ${
                  selfServeBAAOnly ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-slate-300 bg-white'
                }`}
              >
                {selfServeBAAOnly && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <span>Self-Serve BAA (No Sales Gate)</span>
            </button>
          </div>

          {/* Results count, Sort & Reset */}
          <div className="flex items-center gap-3 ml-auto text-xs">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sort-select" className="text-slate-500 font-medium sr-only">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                aria-label="Sort vendors"
                className="bg-white border border-slate-200 text-slate-700 rounded-md py-1 px-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-600 cursor-pointer"
              >
                <option value="relevance">Sort: Recommended</option>
                <option value="certifications">Sort: Most Attestations</option>
                <option value="recentAudit">Sort: Recently Audited</option>
                <option value="alphabetical">Sort: Name (A–Z)</option>
              </select>
            </div>

            {/* Results Counter */}
            <div className="text-slate-500 font-mono tabular-nums">
              Showing <span className="font-semibold text-slate-900">{resultsCount}</span> of {totalCount}
            </div>

            {/* Reset Button if active filters */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 text-blue-900 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
