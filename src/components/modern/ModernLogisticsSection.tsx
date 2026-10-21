import React from 'react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Phone, 
  MessageSquare,
  Building2,
  PackageCheck
} from 'lucide-react';

interface ModernLogisticsSectionProps {
  onOpenVisitingCard: () => void;
  onOpenCustomListModal: () => void;
}

export const ModernLogisticsSection: React.FC<ModernLogisticsSectionProps> = ({
  onOpenVisitingCard,
  onOpenCustomListModal,
}) => {
  const dispatchRoutes = [
    { district: 'Lucknow Local & Kaiserbagh', time: '2 - 4 Hours', type: 'Local Van / Hand Delivery' },
    { district: 'Kanpur, Unnao & Barabanki', time: 'Same Day (6-12h)', type: 'Direct Highway Transport' },
    { district: 'Varanasi, Prayagraj & Ayodhya', time: 'Within 24 Hours', type: 'V-Trans / Regional Express' },
    { district: 'Gorakhpur, Basti & Deoria', time: 'Within 24 Hours', type: 'Purvanchal Transport Hub' },
    { district: 'Bareilly, Aligarh, Meerut & Agra', time: '24 - 36 Hours', type: 'Western UP Freight Line' },
    { district: 'Patna, Gaya, Muzaffarpur (Bihar)', time: '24 - 48 Hours', type: 'Inter-State Bilti Dispatch' },
    { district: 'Delhi NCR, MP & Rajasthan', time: '36 - 48 Hours', type: 'National Freight Network' },
  ];

  return (
    <section className="space-y-8">
      {/* Logistics & Dispatch Grid */}
      <div className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-10 border border-indigo-900/50 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-indigo-950 pb-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              Aminabad Transport & Dispatch Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Daily Bilti Dispatches from Lucknow Wholesale Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Convenient, centralized book dispatching directly from Dr. B.N. Verma Road, Aminabad. Track your consignments with instant transport receipt photos shared on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onOpenCustomListModal}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md shadow-amber-950/20"
            >
              Order Transport Bilti
            </button>
            <button
              onClick={onOpenVisitingCard}
              className="bg-[#121E3E] hover:bg-[#1A2A54] text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold border border-indigo-800/60 transition-colors cursor-pointer"
            >
              View GST Credentials
            </button>
          </div>
        </div>

        {/* Route Timetable Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dispatchRoutes.map((route, i) => (
            <div
              key={i}
              className="bg-[#070D1F] rounded-2xl p-4 border border-indigo-950 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{route.district}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {route.type}
                </div>
              </div>
              <span className="bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                {route.time}
              </span>
            </div>
          ))}
        </div>

        {/* Owner Business Statement */}
        <div className="bg-[#070D1F] rounded-2xl p-6 border border-indigo-950 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Message from Vikash Agrawal • Book.com Lucknow
            </div>
            <h3 className="text-lg font-bold text-white">
              "Providing transparent distributor rates, zero-delay transport dispatches, and genuine publisher stock since inception."
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We serve over 650 retail bookstores and coaching institutions across North India. Call or WhatsApp our desk directly for custom margin deals on Samayik Ghatna Chakra, Youth Competition Times (YCT), Lucent GK, and UP State special editions.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phones[0]}`}
              className="bg-[#121E3E] hover:bg-[#1A2A54] text-white p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-indigo-800/60 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: +91 {BUSINESS_INFO.phones[0]}</span>
            </a>
            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=Hello%20Vikash%20ji,%20I%20want%20to%20inquire%20about%20wholesale%20books%20from%20Book.com.`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>WhatsApp: +91 {BUSINESS_INFO.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
