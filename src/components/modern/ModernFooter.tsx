import React from 'react';
import { BrandLogo } from '../BrandLogo';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { ExamCategory } from '../../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  MessageCircle,
  Building
} from 'lucide-react';

interface ModernFooterProps {
  onSelectCategory: (cat: ExamCategory) => void;
  onOpenVisitingCard: () => void;
  onOpenCustomListModal: () => void;
}

export const ModernFooter: React.FC<ModernFooterProps> = ({
  onSelectCategory,
  onOpenVisitingCard,
  onOpenCustomListModal,
}) => {
  return (
    <footer className="bg-[#070D1F] text-slate-300 border-t border-indigo-950/60">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-[#0E1B3D] to-[#070D1F] text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">Fast-Track Wholesale Quotation Desk</h3>
              <p className="text-xs text-slate-300">
                Direct publisher discount quotes, instant transport booking, and dealer bilti dispatch from Aminabad
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20place%20a%20bulk%20wholesale%20order%20from%20Book.com.`}
              target="_blank"
              rel="noreferrer"
              className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp: +91 {BUSINESS_INFO.whatsapp}
            </a>

            <a
              href={`tel:${BUSINESS_INFO.phones[0]}`}
              className="bg-[#121E3E] hover:bg-[#1A2A54] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all border border-indigo-800/60 flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Call: {BUSINESS_INFO.phones[0]}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-4 inline-block shadow-md">
              <BrandLogo size="md" theme="modern" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Book.com is Lucknow's prominent wholesale supplier and distributor of competitive examinations and educational textbooks in Aminabad. Supplying genuine publisher editions of Samayik Ghatna Chakra, Youth Competition Times (YCT), Lucent, and NCERT to retailers, colleges, and libraries nationwide.
            </p>

            {/* Official Credentials */}
            <div className="bg-[#0B132B] rounded-2xl p-4 border border-indigo-900/40 space-y-2 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Verified Legal Business Details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                <div>
                  <span className="text-slate-500 block">GSTIN:</span>
                  <span className="font-semibold text-amber-400">{BUSINESS_INFO.gstin}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PAN:</span>
                  <span className="font-semibold text-slate-200">{BUSINESS_INFO.pan}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Trade Hub:</span>
                  <span className="font-semibold text-slate-200">Aminabad, Lucknow</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Account:</span>
                  <span className="font-semibold text-indigo-300">Book.Com Current A/c</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Categories Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-400" />
              Exam Categories
            </h4>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES_DATA.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      const el = document.getElementById('modern-catalog-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 text-left cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-indigo-500 flex-shrink-0" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Wholesale Hub Contacts */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Warehouse Location & Desk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Book.com (Managed by Vikash Agrawal)</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    173/21 Dr. B.N. Verma Road, Opposite Old Medicine Market, Aminabad, Lucknow, Uttar Pradesh - 226018
                  </p>
                  <a
                    href="https://maps.google.com/?q=Aminabad+Lucknow+Dr+BN+Verma+Road"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline text-[11px] inline-flex items-center gap-1 mt-1 font-semibold"
                  >
                    Google Maps Pin <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${BUSINESS_INFO.phones[0]}`} className="hover:text-white font-semibold">
                    +91 {BUSINESS_INFO.phones[0]}
                  </a>
                  {' , '}
                  <a href={`tel:${BUSINESS_INFO.phones[1]}`} className="hover:text-white font-semibold">
                    +91 {BUSINESS_INFO.phones[1]}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">{BUSINESS_INFO.workingHours}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={onOpenVisitingCard}
                className="bg-[#121E3E] hover:bg-[#1A2A54] text-slate-200 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-indigo-800/60 transition-colors cursor-pointer"
              >
                Visiting Card
              </button>
              <button
                onClick={onOpenCustomListModal}
                className="bg-[#121E3E] hover:bg-[#1A2A54] text-slate-200 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-indigo-800/60 transition-colors cursor-pointer"
              >
                Upload Book List
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-indigo-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Book.com • Educational Books Supplier • Lucknow. Managed by Vikash Agrawal. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Wholesale B2B Catalog Portal</span>
            <span>•</span>
            <span className="text-slate-400">Aminabad Trade Market</span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20inquire%20about%20wholesale%20books%20from%20Book.com.`}
        target="_blank"
        rel="noreferrer"
        id="modern-floating-whatsapp-btn"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 ring-4 ring-emerald-500/20 cursor-pointer"
        title="Direct WhatsApp Wholesale Inquiry"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        <span className="hidden sm:inline text-xs font-black tracking-wide">
          WhatsApp Wholesale
        </span>
      </a>
    </footer>
  );
};
