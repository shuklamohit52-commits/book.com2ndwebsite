import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  ArrowRight
} from 'lucide-react';

interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}

export const CatalogPagination: React.FC<CatalogPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const [jumpPageInput, setJumpPageInput] = useState<string>('');

  if (totalItems === 0 || totalPages <= 1) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shadow-2xs">
        <div>
          Showing all <span className="font-bold text-slate-900">{totalItems}</span> titles
        </div>
        <div className="flex items-center gap-2">
          <span>Titles per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 font-semibold text-slate-800 outline-none cursor-pointer"
          >
            <option value={24}>24</option>
            <option value={48}>48</option>
            <option value={72}>72</option>
            <option value={96}>96</option>
          </select>
        </div>
      </div>
    );
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show (e.g. 1 ... 4 5 6 ... 33)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2; // numbers around current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (
        pages[pages.length - 1] !== '...' &&
        (i < currentPage - delta || i > currentPage + delta)
      ) {
        pages.push('...');
      }
    }
    return pages;
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpPageInput, 10);
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      onPageChange(target);
      setJumpPageInput('');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Top Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs">
        <div className="text-slate-600">
          Showing <span className="font-extrabold text-slate-900">{startItem}–{endItem}</span> of{' '}
          <span className="font-extrabold text-indigo-700">{totalItems}</span> wholesale titles{' '}
          <span className="text-slate-400 font-mono">
            (Page {currentPage} of {totalPages})
          </span>
        </div>

        {/* Per page selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-slate-500 font-medium">Show:</span>
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {[24, 48, 72].map((num) => (
              <button
                key={num}
                onClick={() => onItemsPerPageChange(num)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  itemsPerPage === num
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <span className="text-slate-400">per page</span>
        </div>
      </div>

      {/* Main Pagination Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Previous & First Page buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            title="First Page"
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer text-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
        </div>

        {/* Numeric Page Buttons */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 py-1 text-slate-400 font-bold text-xs select-none">
                  •••
                </span>
              );
            }
            const isCurrent = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page as number)}
                className={`min-w-9 h-9 px-2 rounded-xl text-xs font-extrabold font-mono transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next & Last Page buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer text-xs"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Last Page"
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Jump to Page Quick Input */}
      {totalPages > 5 && (
        <form onSubmit={handleJumpSubmit} className="pt-2 flex items-center justify-end gap-2 text-xs">
          <span className="text-slate-500">Jump to page:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            placeholder={String(currentPage)}
            value={jumpPageInput}
            onChange={(e) => setJumpPageInput(e.target.value)}
            className="w-16 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-center font-mono font-bold text-slate-800 outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-slate-800 hover:bg-indigo-600 text-white font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
          >
            Go
          </button>
        </form>
      )}
    </div>
  );
};
