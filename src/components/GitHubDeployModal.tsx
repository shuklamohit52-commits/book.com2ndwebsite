import React, { useState } from 'react';
import { 
  X, 
  Github, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Terminal, 
  Globe, 
  ShieldCheck 
} from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const gitCommands = `git init
git add .
git commit -m "Deploy Book.com dual website to GitHub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white border border-slate-700">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>Deploy & Host on GitHub Pages</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Pre-Configured
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                100% automated via GitHub Actions workflow already included in this repository
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 text-xs text-slate-700">
          {/* Status Box */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-1.5">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Everything is Ready for GitHub Pages Hosting
            </div>
            <p className="text-emerald-800 leading-relaxed">
              We have configured <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold">base: './'</code> in <code className="font-mono">vite.config.ts</code> and included <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold">.github/workflows/deploy.yml</code>. Whenever you push to GitHub, it will automatically build and publish your website!
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
                  Create a new repository on GitHub
                </span>
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 font-semibold flex items-center gap-1 hover:underline text-[11px]"
                >
                  github.com/new <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-slate-500">
                Go to GitHub, create a new public repository (e.g. <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">book-com-website</code>).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
                  Push this project to your GitHub repository
                </span>
                <button
                  onClick={() => copyToClipboard(gitCommands, 2)}
                  className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedStep === 2 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Git Commands
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg overflow-x-auto font-mono text-[11px] leading-relaxed">
                {gitCommands}
              </pre>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
                Enable GitHub Pages in Repo Settings
              </span>
              <p className="text-slate-600 leading-relaxed">
                In your GitHub repo, go to <strong>Settings</strong> → <strong>Pages</strong>. Under <strong>Build and deployment</strong>, set <strong>Source</strong> to <strong>"GitHub Actions"</strong>.
              </p>
              <div className="bg-white p-2 rounded-lg border border-slate-200 text-slate-500 text-[11px]">
                💡 The included GitHub Action will automatically run, build, and deploy to <code className="font-mono text-emerald-700">https://yourusername.github.io/your-repo-name/</code>!
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-colors"
            >
              Got it, close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
