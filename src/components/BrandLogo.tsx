import React, { useState } from 'react';

export const OFFICIAL_LOGO_URL = 'https://cdn.jsdelivr.net/gh/luckymohittiwari52-oss/quiz-assets@main/images/imag28.png';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'white';
  showSubtitle?: boolean;
  className?: string;
  theme?: 'classic' | 'modern';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'full',
  showSubtitle = false,
  className = '',
  theme = 'classic',
}) => {
  const [imageError, setImageError] = useState(false);

  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-13',
    lg: 'h-16 sm:h-20',
    xl: 'h-22 sm:h-28',
  }[size];

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      id="official-book-com-logo"
    >
      {!imageError ? (
        <img
          src={OFFICIAL_LOGO_URL}
          alt="Book.Com - Educational Books Supplier Lucknow"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className={`${heightClasses} w-auto max-w-full object-contain drop-shadow-xs transition-transform duration-300 hover:scale-[1.02]`}
        />
      ) : (
        /* Vector fallback if network blocks image */
        <div className="flex items-center gap-2 font-serif font-black text-2xl tracking-tight">
          <span className={theme === 'modern' ? 'text-amber-400' : 'text-red-600'}>
            Book.Com
          </span>
          <span className="text-xs bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-sans font-bold">
            Lucknow
          </span>
        </div>
      )}

      {showSubtitle && (
        <span
          className={`mt-1.5 inline-block text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs ${
            theme === 'modern' ? 'bg-indigo-600' : 'bg-[#E52E2D]'
          }`}
        >
          Educational Books Supplier
        </span>
      )}
    </div>
  );
};
