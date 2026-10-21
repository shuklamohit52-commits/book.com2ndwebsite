import React from 'react';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { ExamCategory } from '../../types';
import { 
  Filter, 
  RotateCcw, 
  Flame, 
  Sparkles, 
  Check, 
  ChevronRight,
  BookOpen,
  Layers
} from 'lucide-react';

interface ModernSidebarFilterProps {
  selectedCategory: ExamCategory;
  onSelectCategory: (cat: ExamCategory) => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  selectedPublisher: string;
  onSelectPublisher: (pub: string) => void;
  publishersList: string[];
  onlyBestsellers: boolean;
  onToggleBestsellers: () => void;
  onlyNewReleases: boolean;
  onToggleNewReleases: () => void;
  totalMatches: number;
  resetAllFilters: () => void;
}

export const ModernSidebarFilter: React.FC<ModernSidebarFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedLanguage,
  onSelectLanguage,
  selectedPublisher,
  onSelectPublisher,
  publishersList,
  onlyBestsellers,
  onToggleBestsellers,
  onlyNewReleases,
  onToggleNewReleases,
  totalMatches,
  resetAllFilters,
}) => {
  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedLanguage !== 'all' ||
    selectedPublisher !== 'all' ||
    onlyBestsellers ||
    onlyNewReleases;

  return (
    <aside className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
      {/* Header & Reset */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">Filters & Segments</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Quick Fast Filters */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Speed Filter:
        </span>
        <div className="space-y-1.5">
          <button
            onClick={onToggleBestsellers}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              onlyBestsellers
                ? 'bg-amber-50 text-amber-950 border border-amber-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Bestseller High Turnover
            </span>
            {onlyBestsellers && <Check className="w-3.5 h-3.5 text-amber-600" />}
          </button>

          <button
            onClick={onToggleNewReleases}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              onlyNewReleases
                ? 'bg-indigo-50 text-indigo-950 border border-indigo-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              2025-26 New Editions
            </span>
            {onlyNewReleases && <Check className="w-3.5 h-3.5 text-indigo-600" />}
          </button>
        </div>
      </div>

      {/* Exam Categories Navigation */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Exam Stream / Category:
        </span>
        <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 font-medium'
                }`}
              >
                <div>
                  <div className="line-clamp-1">{cat.name}</div>
                  <div className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {cat.hindiName}
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0 text-amber-300" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Publisher Filter */}
      <div className="space-y-2 border-t border-slate-100 pt-3">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Publisher:
        </span>
        <select
          value={selectedPublisher}
          onChange={(e) => onSelectPublisher(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="all">All Publishers ({publishersList.length})</option>
          {publishersList.map((pub) => (
            <option key={pub} value={pub}>
              {pub}
            </option>
          ))}
        </select>
      </div>

      {/* Language / Medium */}
      <div className="space-y-2 border-t border-slate-100 pt-3">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Language Medium:
        </span>
        <div className="grid grid-cols-1 gap-1.5 text-xs">
          {[
            { id: 'all', label: 'All Mediums' },
            { id: 'Hindi', label: 'Hindi Medium (हिंदी)' },
            { id: 'English', label: 'English Medium' },
            { id: 'Bilingual (Hindi/Eng)', label: 'Bilingual (द्विभाषी)' },
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => onSelectLanguage(lang.id)}
              className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                selectedLanguage === lang.id
                  ? 'bg-[#0B132B] text-white'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <span>{lang.label}</span>
              {selectedLanguage === lang.id && <Check className="w-3 h-3 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
