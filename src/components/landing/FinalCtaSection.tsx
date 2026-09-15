import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  GraduationCap 
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface FinalCtaSectionProps {
  onEnterApp: (tab?: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onEnterApp,
  onOpenAuth,
}) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#0a2540] via-slate-900 to-blue-950 text-white relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-200">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>CampusFlow City Phase 2 • Free for All Global Students</span>
        </div>

        {/* Title */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Ready to Accelerate Your Global Education Journey?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Join thousands of ambitious scholars tracking 4,200+ universities, unlocking matched scholarships, and submitting winning applications with Gemini AI guidance.
          </p>
        </div>

        {/* Action Button Cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            id="final-cta-signup"
            type="button"
            onClick={onOpenAuth}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Create Free Account / Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="final-cta-demo"
            type="button"
            onClick={() => onEnterApp('dashboard')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Launch Live Demo</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-4">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            No Credit Card Required
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Zero-Trust Firestore Isolation
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            FundMyCrazy Verified Partnership
          </span>
        </div>
      </div>
    </section>
  );
};
