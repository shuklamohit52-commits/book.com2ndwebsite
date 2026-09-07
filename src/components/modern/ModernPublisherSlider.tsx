import React from 'react';
import { PUBLISHERS_DATA } from '../../data/categoriesData';
import { Percent, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';

interface ModernPublisherSliderProps {
  onSelectPublisher: (publisherName: string) => void;
}

export const ModernPublisherSlider: React.FC<ModernPublisherSliderProps> = ({
  onSelectPublisher,
}) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
            <Building2 className="w-4 h-4" />
            Direct Mill & Publication Lots
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Publisher Portfolios & Wholesale Dispatches
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-md">
          Procured in bulk straight from national publication houses in Aminabad, Lucknow. Original copies with tamper-proof publisher seals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PUBLISHERS_DATA.map((pub) => (
          <div
            key={pub.id}
            onClick={() => onSelectPublisher(pub.id === 'ghatnachakra' ? 'Samayik Ghatna Chakra' : pub.id === 'yct' ? 'Youth Competition Times (YCT)' : pub.name)}
            className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-500 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-[#0B132B] text-white font-mono">
                  {pub.code}
                </span>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Ready Lot
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                {pub.name}
              </h3>

              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {pub.specialty}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {pub.popularTitles.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="font-extrabold text-amber-900 flex items-center gap-1 font-mono">
                <Percent className="w-3.5 h-3.5 text-amber-600" />
                <span>{pub.discountRange.split(' ')[0]} Trade Margin</span>
              </div>
              <span className="text-slate-400 group-hover:text-indigo-600 font-semibold flex items-center gap-1 text-[11px]">
                Filter <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
