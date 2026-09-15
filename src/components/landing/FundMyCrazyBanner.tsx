import React from 'react';
import { 
  Sparkles, 
  Award, 
  ArrowRight, 
  TrendingUp, 
  Compass, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface FundMyCrazyBannerProps {
  onEnterApp: (tab: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const FundMyCrazyBanner: React.FC<FundMyCrazyBannerProps> = ({
  onEnterApp,
  onOpenAuth,
}) => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 border-b border-amber-200/60 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-amber-300/80 shadow-md p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                    The FundMyCrazy Initiative
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    Partner Platform
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  Audacious Dreams Require Real Capital
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-2xl font-black text-amber-600">$180,000,000+</div>
              <div className="text-[11px] font-semibold text-slate-500">In Active Matched Awards</div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            CampusFlow City Phase 2 was built for FundMyCrazy to dismantle the financial walls blocking extraordinary scholars worldwide. We believe students with the boldest, craziest ideas shouldn't be held back by traditional tuition barriers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/70 space-y-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                Global STEM Fellowships
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Full-tuition grants for builders, coders, and researchers.
              </p>
            </div>
            <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/70 space-y-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                Non-Traditional Founders
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Funding for students pursuing disruptive thesis projects and ventures.
              </p>
            </div>
            <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/70 space-y-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                First-Generation Scholars
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Living stipend assistance and comprehensive travel relocation aid.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-slate-500 font-medium">
              Are you an applicant with a moonshot ambition? Match your profile today.
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onEnterApp('scholarships')}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>Search Matched Scholarships</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
