import React from 'react';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Map,
  CheckCircle2,
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
    <section className="relative overflow-hidden border-b border-amber-200/60 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 py-16 md:py-20">
      <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-amber-300/70 bg-white p-6 shadow-md sm:p-10">
          <div className="flex flex-col gap-5 border-b border-amber-100 pb-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-3 text-white shadow-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-amber-800">
                    Fund My Crazy 2.0
                  </span>
                  <span className="rounded border border-amber-300 bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                    Our Education
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                  Reimagining the city around a student’s education journey.
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  CampusFlow City turns a fragmented education ecosystem into one connected student command center — helping people discover paths, understand fit, manage applications and act on what matters next.
                </p>
              </div>
            </div>
            <div className="shrink-0 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 md:text-right">
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-700">The challenge</div>
              <div className="mt-1 text-lg font-black text-slate-900">Reimagine education</div>
              <div className="mt-1 text-[11px] font-medium text-slate-500">Built with Gemini</div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                <Map className="h-4 w-4 text-blue-700" /> One education map
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">Bring universities, courses, scholarships, exams and opportunities into one connected view.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                <Lightbulb className="h-4 w-4 text-amber-600" /> Gemini-guided decisions
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">Turn a student’s profile, goals, deadlines and documents into clear next actions.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                <GraduationCap className="h-4 w-4 text-emerald-700" /> From idea to outcome
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">Make the journey measurable from exploration and fit through application and follow-through.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-2 text-xs font-medium text-slate-500">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>Fund My Crazy 2026 accepts one city element, a written idea and a Gemini-generated visual. A working prototype is not required.</span>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <button type="button" onClick={() => onEnterApp('city')} className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:border-slate-400 sm:w-auto">
                Explore Education City
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <a href="https://enter.fundmycrazy.com/" target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 sm:w-auto">
                Submit to Fund My Crazy
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
