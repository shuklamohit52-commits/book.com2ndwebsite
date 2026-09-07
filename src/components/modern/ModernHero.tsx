import React, { useState } from 'react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  Percent, 
  Truck, 
  ShieldCheck, 
  MessageSquare, 
  FileSpreadsheet,
  Package,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ExamCategory } from '../../types';

interface ModernHeroProps {
  onOpenCustomListModal: () => void;
  onOpenVisitingCard: () => void;
  onSelectCategory: (cat: ExamCategory) => void;
  onOpenInquiryDrawer: () => void;
}

export const ModernHero: React.FC<ModernHeroProps> = ({
  onOpenCustomListModal,
  onOpenVisitingCard,
  onSelectCategory,
  onOpenInquiryDrawer,
}) => {
  // Interactive Wholesale Margin Calculator State (Flat 30% discount for all titles)
  const [calcQty, setCalcQty] = useState<number>(50);
  const [avgMrp, setAvgMrp] = useState<number>(350);

  // Flat 30% discount across all 368 titles
  const currentDiscount = 30;
  const totalCatalogMrp = calcQty * avgMrp;
  const netWholesaleAmount = Math.round(totalCatalogMrp * (1 - currentDiscount / 100));
  const estimatedStoreProfit = totalCatalogMrp - netWholesaleAmount;

  return (
    <div className="relative bg-gradient-to-b from-[#070D1F] via-[#0B132B] to-[#0A1128] text-white overflow-hidden border-b border-indigo-950/60">
      {/* Royal Indigo & Gold Ambient Light Flares */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Tech-Wholesale Statement */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-700/50 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>B2B Wholesale Procurement Portal • Aminabad Lucknow</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Educational & Competitive Exams <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-indigo-300 bg-clip-text text-transparent">Wholesale Books Distribution</span>
            </h1>

            {/* Sub-text */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Single-source bulk procurement for bookstores, coaching institutions and libraries. Complete catalog of <strong>368 original titles from Samayik Ghatna Chakra & Youth Competition Times (YCT)</strong> with guaranteed <strong>Flat 30% Trade Wholesale Discount</strong> and prompt transport dispatch.
            </p>

            {/* Quick Badges Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-[#121E3E] text-slate-200 px-3 py-1.5 rounded-lg border border-indigo-800/60">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                24-48h Bilti to All UP & Bihar Districts
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#121E3E] text-slate-200 px-3 py-1.5 rounded-lg border border-indigo-800/60">
                <Percent className="w-3.5 h-3.5 text-indigo-400" />
                Flat 30% Trade Discount on All 368 Titles
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#121E3E] text-slate-200 px-3 py-1.5 rounded-lg border border-indigo-800/60">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                Original Publisher Stock & GST Bills
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  const el = document.getElementById('modern-catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg shadow-amber-950/20 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <span>Explore Catalog & Bulk Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomListModal}
                className="bg-[#121E3E] hover:bg-[#1A2A54] active:scale-95 text-slate-200 border border-indigo-800/60 font-semibold px-4 py-3 rounded-xl transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                <span>Upload Custom Book List</span>
              </button>

              <a
                href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20place%20a%20bulk%20wholesale%20order%20from%20Book.com.`}
                target="_blank"
                rel="noreferrer"
                className="bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-700/50 font-semibold px-4 py-3 rounded-xl transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>WhatsApp: {BUSINESS_INFO.whatsapp}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Wholesale Margin Calculator */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B132B]/90 rounded-3xl p-6 border border-indigo-900/50 shadow-2xl space-y-4 backdrop-blur-md">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Wholesale Margin Calculator</h2>
                    <p className="text-[11px] text-slate-400">Estimate your trade profit per carton</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
                  FLAT 30% OFF
                </span>
              </div>

              {/* Slider for Quantity */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Order Volume:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {calcQty} Copies
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={300}
                  step={5}
                  value={calcQty}
                  onChange={(e) => setCalcQty(Number(e.target.value))}
                  className="w-full h-2 bg-[#121E3E] rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>10 MOQ</span>
                  <span>50 (Carton)</span>
                  <span>100 (Bulk)</span>
                  <span>200+ (Super Wholesale)</span>
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[20, 50, 100, 200].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setCalcQty(qty)}
                    className={`py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      calcQty === qty
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-[#121E3E] hover:bg-[#1A2A54] text-slate-300 border border-indigo-900/40'
                    }`}
                  >
                    {qty} Copies
                  </button>
                ))}
              </div>

              {/* Calculation Results Card */}
              <div className="bg-[#070D1F]/90 rounded-2xl p-4 border border-indigo-950 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Trade Discount:</span>
                  <span className="font-bold text-amber-400 font-mono text-sm">
                    {currentDiscount}% OFF
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Catalog MRP Value:</span>
                  <span className="text-slate-300 font-mono">₹{totalCatalogMrp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Wholesale Cost:</span>
                  <span className="font-bold text-white font-mono">₹{netWholesaleAmount.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-indigo-950 flex justify-between items-baseline">
                  <span className="font-bold text-slate-300">Estimated Trade Profit:</span>
                  <span className="text-base font-black text-amber-400 font-mono">
                    ₹{estimatedStoreProfit.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Direct Action */}
              <button
                onClick={onOpenCustomListModal}
                className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Request Custom Quote for {calcQty} Copies</span>
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
