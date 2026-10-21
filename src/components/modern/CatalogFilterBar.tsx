import React from 'react';
import { ExamCategory } from '../../types';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { 
  Building2, 
  ArrowUpDown, 
  Layers, 
  Check, 
  X,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';

interface CatalogFilterBarProps {
  selectedPublisher: string;
  onSelectPublisher: (pub: string) => void;
  publishersWithCounts: { name: string; count: number }[];
  selectedCategory: ExamCategory;
  onSelectCategory: (cat: ExamCategory) => void;
  sortBy: string;
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc' | 'discount-desc' | 'title-asc') => void;
  viewMode: 'grid' | 'table';
  onToggleViewMode: (mode: 'grid' | 'table') => void;
  totalCount: number;
  filteredCount: number;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const CatalogFilterBar: React.FC<CatalogFilterBarProps> = ({
  selectedPublisher,
  onSelectPublisher,
  publishersWithCounts,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  viewMode,
  onToggleViewMode,
  totalCount,
  filteredCount,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="space-y-4">
      {/* Publisher Quick Tabs (Horizontal Scrolling Bar) */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>Select by Publisher Lot:</span>
          </div>
          {selectedPublisher !== 'all' && (
            <button
              onClick={() => onSelectPublisher('all')}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              Clear Publisher
            </button>
          )}
        </div>

        {/* Scrollable Publisher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-200">
          <button
            onClick={() => onSelectPublisher('all')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedPublisher === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>All Publishers</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              selectedPublisher === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              {totalCount}
            </span>
          </button>

          {publishersWithCounts.map(({ name, count }) => {
            const isSelected = selectedPublisher.toLowerCase() === name.toLowerCase();
            return (
              <button
                key={name}
                onClick={() => onSelectPublisher(name)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 text-slate-700 border border-slate-200/80'
                }`}
              >
                <span className="line-clamp-1">{name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Category Quick Pills + Sort Dropdown + View Mode */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Results Count & Active Category */}
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>Catalog Inventory</span>
              <span className="text-xs bg-indigo-100 text-indigo-900 border border-indigo-200 font-mono font-bold px-2.5 py-0.5 rounded-full">
                {filteredCount} {filteredCount === 1 ? 'Title' : 'Titles'}
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              {selectedPublisher !== 'all' 
                ? `Showing exclusively for ${selectedPublisher}`
                : 'Browse across 19 national publication houses'}
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="hidden lg:flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg cursor-pointer"
            >
              <X className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Right: Sort & View Toggle */}
        <div className="flex flex-wrap items-center gap-2.5 justify-between md:justify-end">
          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="featured">Featured / Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount-desc">Trade Margin % (High to Low)</option>
              <option value="title-asc">Title: A to Z</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => onToggleViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
