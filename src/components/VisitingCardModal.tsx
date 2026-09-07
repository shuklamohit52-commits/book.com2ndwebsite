import React from 'react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { BrandLogo } from './BrandLogo';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Printer, 
  ShieldCheck, 
  Share2,
  Building2,
  Check
} from 'lucide-react';

interface VisitingCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'classic' | 'modern';
}

export const VisitingCardModal: React.FC<VisitingCardModalProps> = ({
  isOpen,
  onClose,
  theme = 'classic',
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const textToCopy = `Book.com - Vikash Agrawal (Branch Head / Proprietor)\nEducational & Competitive Books Supplier\n173/21, Dr. B.N. Verma Road, Aminabad, Lucknow-226018\nPhone: +91 9369532755, +91 9415281234\nGSTIN: 09ADTPA1819R1ZW | PAN: ADTPA1819R`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Book.com - Vikash Agrawal (Lucknow)',
        text: textToCopy,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Modal Top Bar */}
        <div className={`p-4 flex items-center justify-between border-b ${
          theme === 'modern' ? 'bg-slate-950 text-white border-slate-800' : 'bg-slate-900 text-white border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className={`w-5 h-5 ${theme === 'modern' ? 'text-emerald-400' : 'text-amber-400'}`} />
            <h2 className="text-sm font-bold">Official Business Credentials & Visiting Card</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Visiting Card Graphical Box */}
          <div
            id="printable-visiting-card"
            className="relative bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-xl overflow-hidden"
            style={{
              backgroundImage: theme === 'modern'
                ? 'radial-gradient(circle at 100% 0%, rgba(16, 185, 129, 0.08) 0%, transparent 60%), radial-gradient(circle at 0% 100%, rgba(15, 23, 42, 0.05) 0%, transparent 60%)'
                : 'radial-gradient(circle at 100% 0%, rgba(229, 46, 45, 0.08) 0%, transparent 60%), radial-gradient(circle at 0% 100%, rgba(44, 43, 130, 0.08) 0%, transparent 60%)'
            }}
          >
            {/* Top Accent Ribbon */}
            <div className={`absolute top-0 right-0 w-32 h-1 ${
              theme === 'modern' ? 'bg-gradient-to-l from-emerald-500 to-teal-400' : 'bg-gradient-to-l from-red-600 to-amber-500'
            }`} />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-2 border-b border-slate-100">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md text-white ${
                theme === 'modern' ? 'bg-slate-900' : 'bg-slate-900'
              }`}>
                Wholesale Trade Hub
              </span>

              <div className="text-right">
                <h3 className="text-lg font-extrabold text-slate-900 font-serif">
                  {BUSINESS_INFO.ownerName}
                </h3>
                <p className={`text-xs font-bold mt-0.5 ${theme === 'modern' ? 'text-emerald-700' : 'text-red-600'}`}>
                  {BUSINESS_INFO.designation}
                </p>
              </div>
            </div>

            {/* Center Logo & Tagline */}
            <div className="text-center my-3 py-2 flex flex-col items-center justify-center">
              <BrandLogo size="md" showSubtitle={true} theme={theme} />
              <p className="text-xs font-bold text-slate-700 tracking-wide mt-2">
                Competitive Examinations & Educational Books Supplier
              </p>
            </div>

            {/* Contact Details Grid */}
            <div className="space-y-2.5 text-xs text-slate-700 pt-2">
              <div className="flex items-start gap-2.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  theme === 'modern' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                }`}>
                  <Phone className="w-3 h-3" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">
                    <a href={`tel:${BUSINESS_INFO.phones[0]}`} className="hover:underline">
                      +91 {BUSINESS_INFO.phones[0]}
                    </a>
                    {' , '}
                    <a href={`tel:${BUSINESS_INFO.phones[1]}`} className="hover:underline">
                      +91 {BUSINESS_INFO.phones[1]}
                    </a>
                  </div>
                  <span className="text-[10px] text-slate-400">Direct Calls & WhatsApp Orders</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  theme === 'modern' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                }`}>
                  <Mail className="w-3 h-3" />
                </div>
                <div>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="font-bold text-slate-900 hover:underline">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  theme === 'modern' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                }`}>
                  <MapPin className="w-3 h-3" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    {BUSINESS_INFO.address}, {BUSINESS_INFO.landmark}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    {BUSINESS_INFO.city} - {BUSINESS_INFO.pincode}, {BUSINESS_INFO.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Official Registration Strip */}
            <div className="mt-4 pt-3 border-t border-dashed border-slate-300 grid grid-cols-3 gap-2 text-[10px] text-center font-mono">
              <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                <span className="text-slate-400 block">GSTIN</span>
                <span className="font-bold text-emerald-700">{BUSINESS_INFO.gstin}</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                <span className="text-slate-400 block">PAN</span>
                <span className="font-bold text-slate-800">{BUSINESS_INFO.pan}</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                <span className="text-slate-400 block">AADHAAR</span>
                <span className="font-bold text-slate-800">{BUSINESS_INFO.aadhaar}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              Print Business Card
            </button>

            <button
              onClick={handleShare}
              className={`py-2.5 px-4 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                theme === 'modern' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied Details!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share / Copy Card
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
