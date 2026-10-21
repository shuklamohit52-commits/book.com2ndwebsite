import React, { useState } from 'react';
import { Book } from '../../types';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { 
  Eye, 
  Plus, 
  Check, 
  MessageSquare, 
  Percent, 
  Flame, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ModernBookTableProps {
  books: Book[];
  isInInquiry: (bookId: string) => boolean;
  onAddToInquiry: (book: Book, qty: number) => void;
  onQuickView: (book: Book) => void;
}

export const ModernBookTable: React.FC<ModernBookTableProps> = ({
  books,
  isInInquiry,
  onAddToInquiry,
  onQuickView,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const getQty = (book: Book) => quantities[book.id] || book.minOrderQty || 10;

  const handleQtyChange = (bookId: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [bookId]: Math.max(1, val) }));
  };

  const handleAddRow = (book: Book) => {
    const qty = getQty(book);
    onAddToInquiry(book, qty);
    setAddedIds((prev) => ({ ...prev, [book.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [book.id]: false }));
    }, 1200);
  };

  const handleWhatsApp = (book: Book) => {
    const qty = getQty(book);
    const text = `Hello Vikash ji (Book.com Lucknow), I need wholesale price and stock availability for:\n*${book.title}*\n*Publisher:* ${book.publisher}\n*Quantity:* ${qty} copies\n*MRP:* ₹${book.mrp}\n\nPlease quote best wholesale rate & delivery timeline.`;
    window.open(`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#0B132B] text-white font-semibold text-[11px] uppercase tracking-wider border-b border-indigo-900/60">
              <th className="py-3.5 px-4">Book Title & Publisher</th>
              <th className="py-3.5 px-3">Stream / Category</th>
              <th className="py-3.5 px-3 text-right">Printed MRP</th>
              <th className="py-3.5 px-3 text-center">Trade Margin</th>
              <th className="py-3.5 px-3 text-right">Wholesale Rate</th>
              <th className="py-3.5 px-3 text-center">Order Qty</th>
              <th className="py-3.5 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {books.map((book) => {
              const inQuote = isInInquiry(book.id);
              const isAdded = addedIds[book.id];
              const qty = getQty(book);
              const unitWholesale = book.wholesaleEstimatedPrice || Math.round(book.mrp * (1 - book.wholesaleDiscountPercent / 100));

              return (
                <tr
                  key={book.id}
                  className="hover:bg-slate-50/90 transition-colors group"
                >
                  {/* Title & Publisher */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="flex items-start gap-2.5">
                      <div
                        onClick={() => onQuickView(book)}
                        className="w-10 h-14 rounded bg-slate-800 flex-shrink-0 overflow-hidden shadow-xs cursor-pointer border border-slate-300 relative"
                      >
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-extrabold text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                            {book.publisher}
                          </span>
                          {book.bestseller && (
                            <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1 rounded border border-amber-200">
                              Bestseller
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">
                            {book.language}
                          </span>
                        </div>
                        <h4
                          onClick={() => onQuickView(book)}
                          className="font-bold text-slate-900 hover:text-indigo-700 cursor-pointer mt-0.5 line-clamp-1 text-xs"
                          title={book.title}
                        >
                          {book.title}
                        </h4>
                        {book.hindiTitle && (
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {book.hindiTitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-3">
                    <span className="text-slate-600 font-medium text-[11px]">
                      {book.categoryName}
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono">
                      MOQ: {book.minOrderQty} copies
                    </div>
                  </td>

                  {/* MRP */}
                  <td className="py-3.5 px-3 text-right font-semibold text-slate-500 font-mono">
                    ₹{book.mrp}
                  </td>

                  {/* Trade Margin */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-amber-900 bg-amber-100/90 border border-amber-200 px-2 py-0.5 rounded-full font-mono">
                      <Percent className="w-2.5 h-2.5 text-amber-700" />
                      {book.wholesaleDiscountPercent}%
                    </span>
                  </td>

                  {/* Wholesale Rate */}
                  <td className="py-3.5 px-3 text-right">
                    <span className="text-sm font-black text-slate-900 font-mono">
                      ₹{unitWholesale}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-sans">
                      /copy
                    </span>
                  </td>

                  {/* Qty Input */}
                  <td className="py-3.5 px-3 text-center">
                    <input
                      type="number"
                      min={book.minOrderQty}
                      step={5}
                      value={qty}
                      onChange={(e) => handleQtyChange(book.id, Number(e.target.value))}
                      className="w-16 bg-slate-100 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-center text-slate-900 outline-none focus:border-indigo-500"
                    />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleAddRow(book)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          isAdded
                            ? 'bg-indigo-600 text-white'
                            : inQuote
                            ? 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Added
                          </>
                        ) : inQuote ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            In Quote
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            Add Quote
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleWhatsApp(book)}
                        className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer border border-indigo-200"
                        title="Inquire this title on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onQuickView(book)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                        title="Quick View Specs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
