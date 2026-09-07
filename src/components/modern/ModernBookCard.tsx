import React, { useState } from 'react';
import { Book } from '../../types';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { 
  Eye, 
  Plus, 
  Check, 
  MessageSquare, 
  Flame, 
  Sparkles, 
  Percent, 
  BookOpen 
} from 'lucide-react';

interface ModernBookCardProps {
  book: Book;
  isInInquiry: boolean;
  onAddToInquiry: (book: Book, qty: number) => void;
  onQuickView: (book: Book) => void;
}

export const ModernBookCard: React.FC<ModernBookCardProps> = ({
  book,
  isInInquiry,
  onAddToInquiry,
  onQuickView,
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(book.minOrderQty || 10);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAdd = () => {
    onAddToInquiry(book, selectedQty);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWhatsAppBookInquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Hello Vikash ji (Book.com Lucknow), I want wholesale price and stock inquiry for:\n\n*Book:* ${book.title}\n*Publisher:* ${book.publisher}\n*Quantity:* ${selectedQty} copies\n*MRP:* ₹${book.mrp}\n\nPlease share best wholesale rate & delivery timeline.`;
    window.open(`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const unitRate = book.wholesaleEstimatedPrice || Math.round(book.mrp * (1 - book.wholesaleDiscountPercent / 100));

  return (
    <div
      id={`modern-book-card-${book.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-500/80 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
    >
      {/* Top Floating Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {book.bestseller && (
          <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
            <Flame className="w-3 h-3 text-slate-950 fill-current" />
            Top Bestseller
          </span>
        )}
        {book.isNewRelease && (
          <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-300" />
            2025-26 Edition
          </span>
        )}
      </div>

      {/* Language / Medium Tag */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-[#0B132B]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md border border-indigo-900/40">
          {book.language}
        </span>
      </div>

      {/* Cover Image Frame */}
      <div
        onClick={() => onQuickView(book)}
        className="relative bg-gradient-to-b from-slate-100 via-indigo-50/40 to-slate-200/60 p-5 flex items-center justify-center cursor-pointer overflow-hidden border-b border-slate-100 min-h-[210px]"
      >
        <div className="relative z-1 w-36 h-50 sm:w-38 sm:h-52 rounded-r-md rounded-l-xs shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1 overflow-hidden bg-slate-900 flex flex-col justify-between border-y border-r border-slate-300/40">
          {/* Spine crease effect */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10 pointer-events-none border-r border-white/10" />

          {!imageError ? (
            <div className="relative w-full h-full flex flex-col justify-between bg-slate-800">
              <img
                src={book.coverImage}
                alt={book.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-transparent p-2.5 pt-6 text-white z-5">
                <p className="text-[10px] font-black uppercase text-amber-400 truncate tracking-wide">
                  {book.publisher}
                </p>
                <p className="text-[11px] font-bold line-clamp-2 leading-tight drop-shadow-md">
                  {book.title}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="w-full h-full p-3.5 text-white flex flex-col justify-between relative"
              style={{
                background: `linear-gradient(135deg, ${book.accentColor || '#1D4ED8'}, #0f172a)`
              }}
            >
              <div className="pl-2 flex items-center justify-between">
                <span className="text-[9px] font-extrabold tracking-wider uppercase opacity-90 truncate max-w-[100px]">
                  {book.publisher}
                </span>
                <BookOpen className="w-3.5 h-3.5 opacity-80" />
              </div>
              <div className="pl-2 my-auto">
                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  {book.categoryName}
                </div>
                <h3 className="text-xs font-black line-clamp-3 leading-snug mt-0.5">
                  {book.title}
                </h3>
              </div>
              <div className="pl-2 border-t border-white/20 pt-1.5 flex items-center justify-between text-[8px] font-bold">
                <span>{book.edition}</span>
                <span className="bg-white/20 px-1 py-0.5 rounded text-[8px]">{book.binding || 'Paperback'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#070D1F]/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(book);
            }}
            className="bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-xl shadow-2xl flex items-center gap-1.5 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-pointer transform group-hover:scale-105 duration-200"
          >
            <Eye className="w-4 h-4 text-indigo-600" />
            Specs & Breakdown
          </button>
        </div>
      </div>

      {/* Book Metadata & Pricing */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-semibold text-indigo-700 truncate max-w-[140px]">
              {book.publisher}
            </span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-semibold">
              MOQ: {book.minOrderQty} pcs
            </span>
          </div>

          <h3
            onClick={() => onQuickView(book)}
            className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-indigo-700 cursor-pointer transition-colors leading-snug"
            title={book.title}
          >
            {book.title}
          </h3>

          {book.hindiTitle && (
            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
              {book.hindiTitle}
            </p>
          )}

          <p className="text-[11px] text-slate-400 mt-1 truncate">
            {book.author}
          </p>
        </div>

        {/* Clean Wholesale Pricing Row */}
        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 space-y-1.5">
          <div className="flex items-baseline justify-between">
            <div className="text-xs text-slate-500">
              MRP: <span className="line-through">₹{book.mrp}</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100/90 border border-amber-200 px-2 py-0.5 rounded">
              <Percent className="w-3 h-3 text-amber-700" />
              <span>{book.wholesaleDiscountPercent}% Trade Margin</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/60">
            <span className="text-xs font-semibold text-slate-600">Wholesale Net:</span>
            <span className="text-base font-black text-slate-900 font-mono">
              ₹{unitRate}
              <span className="text-[10px] text-slate-400 font-normal ml-0.5">/unit</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-24">
              <select
                value={selectedQty}
                onChange={(e) => setSelectedQty(Number(e.target.value))}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-2 py-2 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value={book.minOrderQty}>{book.minOrderQty} copies</option>
                <option value={book.minOrderQty * 2}>{book.minOrderQty * 2} copies</option>
                <option value={50}>50 (Carton)</option>
                <option value={100}>100 (Bulk Lot)</option>
                <option value={200}>200+ copies</option>
              </select>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
                addedAnimation
                  ? 'bg-indigo-600 text-white'
                  : isInInquiry
                  ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Added!
                </>
              ) : isInInquiry ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  In Quote ({selectedQty})
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Add to Quote
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleWhatsAppBookInquire}
            className="w-full py-1.5 px-3 rounded-xl text-[11px] font-semibold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
            WhatsApp Bulk Rate Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};
