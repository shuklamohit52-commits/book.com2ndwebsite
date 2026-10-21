import React from 'react';
import { WebsiteTheme } from '../types';
import { 
  Sparkles, 
  Layers, 
  ArrowLeftRight, 
  Github, 
  Info,
  Check,
  Zap
} from 'lucide-react';

interface WebsiteSwitcherBannerProps {
  currentTheme: WebsiteTheme;
  onSwitchTheme: (theme: WebsiteTheme) => void;
  onOpenGitHubModal: () => void;
}

export const WebsiteSwitcherBanner: React.FC<WebsiteSwitcherBannerProps> = ({
  currentTheme,
  onSwitchTheme,
  onOpenGitHubModal,
}) => {
  return (
    <div
      id="website-version-switcher-banner"
      className="bg-slate-950 text-white border-b border-slate-800 text-xs px-3 sm:px-6 py-2 sticky top-0 z-50 shadow-md backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Left: Indicator of Dual Website Runner */}
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            <Zap className="w-3 h-3 text-slate-950 fill-current" />
            Dual Website Engine
          </span>
          <span className="text-slate-300 font-medium text-[11px] sm:text-xs hidden md:inline">
            Same listings & wholesale details • Running 2 distinct layouts & color palettes:
          </span>
        </div>

        {/* Center/Right: Website Selector Buttons & GitHub Host Helper */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {/* Website 1 (Classic Red & Navy) */}
          <button
            onClick={() => onSwitchTheme('classic')}
            id="switch-to-website-1-btn"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              currentTheme === 'classic'
                ? 'bg-red-600 text-white shadow-md ring-2 ring-red-400/50 scale-[1.02]'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span>Website 1: Classic Red B2B</span>
            {currentTheme === 'classic' && <Check className="w-3.5 h-3.5 ml-0.5 text-white" />}
          </button>

          {/* Website 2 (Modern Royal Navy & Indigo) */}
          <button
            onClick={() => onSwitchTheme('modern')}
            id="switch-to-website-2-btn"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              currentTheme === 'modern'
                ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/50 scale-[1.02]'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Website 2: Royal Navy & Indigo Pro</span>
            {currentTheme === 'modern' && <Check className="w-3.5 h-3.5 ml-0.5 text-white" />}
          </button>

          {/* GitHub Hosting Guide CTA */}
          <button
            onClick={onOpenGitHubModal}
            id="github-hosting-guide-btn"
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 px-3 py-1.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
            title="GitHub Pages hosting guide and workflow"
          >
            <Github className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Host on GitHub</span>
            <span className="sm:hidden">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};
