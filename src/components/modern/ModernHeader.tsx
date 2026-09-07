import React, { useState } from 'react';
import { BrandLogo } from '../BrandLogo';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  FileSpreadsheet, 
  IdCard, 
  ShoppingCart, 
  Menu, 
  X, 
  Sparkles,
  MessageCircle,
  LayoutGrid,
  Table as TableIcon,
  ShieldCheck
} from 'lucide-react';
import { ExamCategory } from '../../types';

interface ModernHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  inquiryCount: number;
  onOpenInquiryDrawer: () => void;
  onOpenCustomListModal: () => void;
  onOpenVisitingCard: () => void;
  onSelectCategory: (cat: ExamCategory) => void;
  viewMode: 'grid' | 'table';
  onToggleViewMode: (mode: 'grid' | 'table') => void;
}

export const ModernHeader: React.FC<ModernHeaderProps> = ({
  searchQuery,
  onSearchChange,
  inquiryCount,
  onOpenInquiryDrawer,
  onOpenCustomListModal,
  onOpenVisitingCard,
  onSelectCategory,
  viewMode,
  onToggleViewMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B132B]/95 text-white backdrop-blur-md border-b border-indigo-900/40 shadow-xl">
      {/* Top Operational Status Bar */}
      <div className="bg-[#070D1F] text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-indigo-950/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Warehouse status & GST */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Aminabad Wholesale Terminal: Active Dispatching
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400 text-[11px]">
              <MapPin className="w-3 h-3 text-indigo-400" />
              173/21 Dr. B.N. Verma Road, Lucknow-226018
            </span>
            <span className="text-slate-700 hidden md:inline">•</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-300 font-mono text-[11px]">
              GST: <strong className="text-amber-400">{BUSINESS_INFO.gstin}</strong>
            </span>
          </div>

          {/* Quick Direct Contacts */}
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${BUSINESS_INFO.phones[0]}`}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-400 font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 {BUSINESS_INFO.phones[0]}</span>
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="hidden sm:inline-flex items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors"
            >
              <Mail className="w-3 h-3 text-indigo-400" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo in high-contrast card */}
          <div
            className="cursor-pointer bg-white px-3 py-1.5 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
            onClick={() => onSelectCategory('all')}
          >
            <BrandLogo size="md" theme="modern" />
          </div>

          {/* Search Bar with Indigo Accent */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                id="modern-catalog-search-input"
                placeholder="Search competitive books, Ghatna Chakra, YCT, exams..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-[#121E3E] text-white placeholder-slate-400 rounded-xl border border-indigo-800/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none text-xs sm:text-sm transition-all"
              />
              <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs p-0.5 rounded-full hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action Group */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle (Grid vs Table) */}
            <div className="hidden sm:flex items-center bg-[#121E3E] rounded-xl p-1 border border-indigo-900/60">
              <button
                onClick={() => onToggleViewMode('grid')}
                className={`p-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Bento Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Grid</span>
              </button>
              <button
                onClick={() => onToggleViewMode('table')}
                className={`p-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Wholesale Table Matrix"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Table</span>
              </button>
            </div>

            {/* Upload Book List */}
            <button
              onClick={onOpenCustomListModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-200 bg-[#121E3E] hover:bg-[#1A2A54] border border-indigo-800/60 rounded-xl transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span>Paste List</span>
            </button>

            {/* Visiting Card */}
            <button
              onClick={onOpenVisitingCard}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#121E3E] hover:bg-[#1A2A54] border border-indigo-800/60 rounded-xl transition-all cursor-pointer"
            >
              <IdCard className="w-3.5 h-3.5 text-indigo-400" />
              <span>Visiting Card</span>
            </button>

            {/* Direct WhatsApp Quote */}
            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20place%20a%20bulk%20wholesale%20order%20from%20Book.com.`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Bulk Quote Cart Pill */}
            <button
              onClick={onOpenInquiryDrawer}
              id="modern-header-bulk-quote-cart-btn"
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-950/20 transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Wholesale Quote</span>
              <span className="sm:hidden">Quote</span>
              {inquiryCount > 0 && (
                <span className="px-1.5 py-0.2 bg-slate-950 text-amber-400 font-mono font-black text-xs rounded-full">
                  {inquiryCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white md:hidden rounded-lg hover:bg-slate-900 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books, Ghatna Chakra, YCT, exams..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-[#121E3E] text-xs rounded-lg border border-indigo-800/60 text-white outline-none focus:border-amber-400"
            />
            <Search className="w-3.5 h-3.5 text-indigo-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-slate-400 text-xs cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-indigo-900/50 space-y-2 pb-2">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => {
                  onOpenCustomListModal();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 bg-[#121E3E] text-amber-400 rounded-lg flex items-center gap-2 border border-indigo-800/60 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Upload Book List
              </button>
              <button
                onClick={() => {
                  onOpenVisitingCard();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 bg-[#121E3E] text-indigo-300 rounded-lg flex items-center gap-2 border border-indigo-800/60 cursor-pointer"
              >
                <IdCard className="w-4 h-4" />
                Visiting Card
              </button>
            </div>

            {/* View Mode Toggle for Mobile */}
            <div className="flex items-center justify-between bg-[#121E3E] p-2 rounded-lg border border-indigo-800/60 text-xs">
              <span className="text-slate-400">Layout Mode:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => onToggleViewMode('grid')}
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => onToggleViewMode('table')}
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>

            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20place%20a%20bulk%20wholesale%20order%20from%20Book.com.`}
              target="_blank"
              rel="noreferrer"
              className="w-full p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp (+91 {BUSINESS_INFO.whatsapp})
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
