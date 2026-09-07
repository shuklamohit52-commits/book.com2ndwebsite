import React, { useState, useMemo, useEffect } from 'react';
import { BOOKS_CATALOG } from './data/booksData';
import { CATEGORIES_DATA } from './data/categoriesData';
import { BUSINESS_INFO } from './data/businessInfo';
import { Book, ExamCategory, InquiryItem } from './types';

// Modern High-Tech Wholesale Components
import { ModernHeader } from './components/modern/ModernHeader';
import { ModernHero } from './components/modern/ModernHero';
import { ModernSidebarFilter } from './components/modern/ModernSidebarFilter';
import { ModernBookCard } from './components/modern/ModernBookCard';
import { ModernBookTable } from './components/modern/ModernBookTable';
import { ModernPublisherSlider } from './components/modern/ModernPublisherSlider';
import { ModernLogisticsSection } from './components/modern/ModernLogisticsSection';
import { ModernFooter } from './components/modern/ModernFooter';

// Modals & Drawers
import { BookQuickViewModal } from './components/BookQuickViewModal';
import { BulkInquiryDrawer } from './components/BulkInquiryDrawer';
import { CustomListInquiryModal } from './components/CustomListInquiryModal';
import { VisitingCardModal } from './components/VisitingCardModal';

// Icons
import { 
  Search, 
  LayoutGrid, 
  Table as TableIcon,
  Sparkles,
  ArrowRight,
  Globe,
  Truck,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export default function App() {
  // Modern Layout View Mode ('grid' bento cards vs 'table' high-density spreadsheet matrix)
  const [modernViewMode, setModernViewMode] = useState<'grid' | 'table'>('grid');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('all');
  const [onlyBestsellers, setOnlyBestsellers] = useState<boolean>(false);
  const [onlyNewReleases, setOnlyNewReleases] = useState<boolean>(false);

  // Modals & Drawers
  const [quickViewBook, setQuickViewBook] = useState<Book | null>(null);
  const [isInquiryDrawerOpen, setIsInquiryDrawerOpen] = useState<boolean>(false);
  const [isCustomListModalOpen, setIsCustomListModalOpen] = useState<boolean>(false);
  const [isVisitingCardModalOpen, setIsVisitingCardModalOpen] = useState<boolean>(false);

  // Bulk Inquiry Cart (with persistent storage)
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('book_com_modern_inquiry');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('book_com_modern_inquiry', JSON.stringify(inquiryItems));
    } catch {
      // ignore
    }
  }, [inquiryItems]);

  // Extract unique publisher names
  const publishersList = useMemo(() => {
    const list = Array.from(new Set(BOOKS_CATALOG.map((b) => b.publisher))).sort();
    return list;
  }, []);

  // Filtered Catalog
  const filteredBooks = useMemo(() => {
    return BOOKS_CATALOG.filter((book) => {
      // Search query (title, hindiTitle, author, publisher, isbn, categoryName)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = book.title.toLowerCase().includes(query);
        const matchHindi = book.hindiTitle?.toLowerCase().includes(query) || false;
        const matchAuthor = book.author.toLowerCase().includes(query);
        const matchPublisher = book.publisher.toLowerCase().includes(query);
        const matchCategory = book.categoryName.toLowerCase().includes(query);
        const matchIsbn = book.isbn?.toLowerCase().includes(query) || false;

        if (!matchTitle && !matchHindi && !matchAuthor && !matchPublisher && !matchCategory && !matchIsbn) {
          return false;
        }
      }

      // Exam Category with aliases support
      if (selectedCategory !== 'all') {
        const matchCategory =
          book.category === selectedCategory ||
          (selectedCategory === 'upsc-state-psc' && book.category === 'upsc-civil-services') ||
          (selectedCategory === 'upsc-civil-services' && book.category === 'upsc-state-psc') ||
          (selectedCategory === 'ssc-exams' && book.category === 'ssc-cgl-chsl') ||
          (selectedCategory === 'ssc-cgl-chsl' && book.category === 'ssc-exams') ||
          (selectedCategory === 'railways' && book.category === 'railways-rrb') ||
          (selectedCategory === 'railways-rrb' && book.category === 'railways') ||
          (selectedCategory === 'teaching-exams' && book.category === 'teaching-tet-ctet') ||
          (selectedCategory === 'teaching-tet-ctet' && book.category === 'teaching-exams') ||
          (selectedCategory === 'defence-exams' && book.category === 'defence-nda-cds') ||
          (selectedCategory === 'defence-nda-cds' && book.category === 'defence-exams') ||
          (selectedCategory === 'school-ncert' && book.category === 'ncert-school') ||
          (selectedCategory === 'ncert-school' && book.category === 'school-ncert');
        if (!matchCategory) {
          return false;
        }
      }

      // Language
      if (selectedLanguage !== 'all' && book.language !== selectedLanguage) {
        return false;
      }

      // Publisher
      if (selectedPublisher !== 'all') {
        const normPub = selectedPublisher.toLowerCase();
        const bookPub = book.publisher.toLowerCase();
        const matchPub =
          bookPub === normPub ||
          bookPub.includes(normPub) ||
          normPub.includes(bookPub) ||
          (normPub.includes('ghatna') && bookPub.includes('ghatna')) ||
          (normPub.includes('yct') && (bookPub.includes('yct') || bookPub.includes('youth'))) ||
          (normPub.includes('youth') && (bookPub.includes('yct') || bookPub.includes('youth')));
        if (!matchPub) {
          return false;
        }
      }

      // Bestseller filter
      if (onlyBestsellers && !book.bestseller) {
        return false;
      }

      // New Releases filter
      if (onlyNewReleases && !book.isNewRelease) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedLanguage,
    selectedPublisher,
    onlyBestsellers,
    onlyNewReleases,
  ]);

  // Cart operations
  const handleAddToInquiry = (book: Book, quantity: number = book.minOrderQty) => {
    setInquiryItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { book, quantity }];
      }
    });
  };

  const handleUpdateQty = (bookId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(bookId);
      return;
    }
    setInquiryItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (bookId: string) => {
    setInquiryItems((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const handleClearAll = () => {
    setInquiryItems([]);
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedLanguage('all');
    setSelectedPublisher('all');
    setOnlyBestsellers(false);
    setOnlyNewReleases(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif] bg-slate-900/10 text-slate-900">
      {/* High-Tech Modern Header */}
      <ModernHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        inquiryCount={inquiryItems.length}
        onOpenInquiryDrawer={() => setIsInquiryDrawerOpen(true)}
        onOpenCustomListModal={() => setIsCustomListModalOpen(true)}
        onOpenVisitingCard={() => setIsVisitingCardModalOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        viewMode={modernViewMode}
        onToggleViewMode={setModernViewMode}
      />

      {/* Modern Split Hero with Live Margin Calculator */}
      <ModernHero
        onOpenCustomListModal={() => setIsCustomListModalOpen(true)}
        onOpenVisitingCard={() => setIsVisitingCardModalOpen(true)}
        onSelectCategory={setSelectedCategory}
        onOpenInquiryDrawer={() => setIsInquiryDrawerOpen(true)}
      />

      {/* Main Catalog View Area */}
      <main id="modern-catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Filter Rail */}
          <div className="lg:col-span-3 sticky top-20">
            <ModernSidebarFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
              selectedPublisher={selectedPublisher}
              onSelectPublisher={setSelectedPublisher}
              publishersList={publishersList}
              onlyBestsellers={onlyBestsellers}
              onToggleBestsellers={() => setOnlyBestsellers(!onlyBestsellers)}
              onlyNewReleases={onlyNewReleases}
              onToggleNewReleases={() => setOnlyNewReleases(!onlyNewReleases)}
              totalMatches={filteredBooks.length}
              resetAllFilters={resetAllFilters}
            />
          </div>

          {/* Right Catalog View Area */}
          <div className="lg:col-span-9 space-y-5">
            {/* View Header & Stats Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <span>Available Wholesale Titles</span>
                  <span className="text-xs bg-indigo-100 text-indigo-900 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-full">
                    {filteredBooks.length} Books
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Standard trade discount range: 30% - 55% OFF based on carton lot size
                </p>
              </div>

              {/* View Mode Toggle Controls */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:inline">View Mode:</span>
                <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setModernViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      modernViewMode === 'grid'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Cards</span>
                  </button>
                  <button
                    onClick={() => setModernViewMode('table')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      modernViewMode === 'table'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span>Data Table</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredBooks.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  No matching books found
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Adjust your category, language, or publisher filters, or upload your requirements list directly.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : modernViewMode === 'grid' ? (
              /* Modern Bento Cards Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredBooks.map((book) => {
                  const isInInquiry = inquiryItems.some((item) => item.book.id === book.id);
                  return (
                    <ModernBookCard
                      key={book.id}
                      book={book}
                      isInInquiry={isInInquiry}
                      onAddToInquiry={handleAddToInquiry}
                      onQuickView={(b) => setQuickViewBook(b)}
                    />
                  );
                })}
              </div>
            ) : (
              /* Modern High-Density Spreadsheet Table View */
              <ModernBookTable
                books={filteredBooks}
                isInInquiry={(id) => inquiryItems.some((item) => item.book.id === id)}
                onAddToInquiry={handleAddToInquiry}
                onQuickView={(b) => setQuickViewBook(b)}
              />
            )}
          </div>
        </div>

        {/* Publishers Showcase Slider */}
        <ModernPublisherSlider
          onSelectPublisher={(pub) => {
            setSelectedPublisher(pub);
            const el = document.getElementById('modern-catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Logistics & Timetable Matrix */}
        <ModernLogisticsSection
          onOpenVisitingCard={() => setIsVisitingCardModalOpen(true)}
          onOpenCustomListModal={() => setIsCustomListModalOpen(true)}
        />
      </main>

      {/* Modern High-Tech Footer */}
      <ModernFooter
        onSelectCategory={setSelectedCategory}
        onOpenVisitingCard={() => setIsVisitingCardModalOpen(true)}
        onOpenCustomListModal={() => setIsCustomListModalOpen(true)}
      />

      {/* Shared Modals and Drawers (Always styled with modern theme) */}
      <BookQuickViewModal
        book={quickViewBook}
        onClose={() => setQuickViewBook(null)}
        onAddToInquiry={handleAddToInquiry}
        theme="modern"
      />

      <BulkInquiryDrawer
        isOpen={isInquiryDrawerOpen}
        onClose={() => setIsInquiryDrawerOpen(false)}
        items={inquiryItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        theme="modern"
      />

      <CustomListInquiryModal
        isOpen={isCustomListModalOpen}
        onClose={() => setIsCustomListModalOpen(false)}
        theme="modern"
      />

      <VisitingCardModal
        isOpen={isVisitingCardModalOpen}
        onClose={() => setIsVisitingCardModalOpen(false)}
        theme="modern"
      />
    </div>
  );
}
