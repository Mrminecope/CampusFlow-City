import React from 'react';
import { ArrowRight, Bot, Check, ChevronRight, Clock3, FileCheck2, GraduationCap, MapPin, Search, Sparkles, Target, WandSparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { NavigationTab } from '../../types';

interface LandingHeroProps {
  onEnterApp: (tab?: NavigationTab) => void;
  onOpenAuth: () => void;
}

const journey = [
  { step: '01', title: 'Build your profile', desc: 'Turn grades, goals, budget and preferences into one Education Passport.', icon: GraduationCap },
  { step: '02', title: 'Discover the right paths', desc: 'Explore universities, courses, scholarships and opportunities in one place.', icon: Search },
  { step: '03', title: 'Get your next best action', desc: 'AI connects your deadlines, documents and applications into a clear plan.', icon: WandSparkles },
  { step: '04', title: 'Move forward with confidence', desc: 'Track progress and keep everything organized from shortlist to submission.', icon: Target },
];

export const LandingHero: React.FC<LandingHeroProps> = ({ onEnterApp, onOpenAuth }) => {
  return (
    <section className="relative overflow-hidden bg-[#f7f9fc] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute -right-32 top-40 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-amber-100/45 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-blue-800 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            CAMPUSFLOW CITY
            <span className="text-slate-300">•</span>
            Built for the journey from ambition to admission
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }} className="text-balance text-4xl font-black tracking-tight text-[#0b2340] sm:text-6xl lg:text-7xl">
            Your entire education journey,
            <span className="block bg-gradient-to-r from-blue-700 via-indigo-600 to-[#0b2340] bg-clip-text text-transparent">in one intelligent place.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.14 }} className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            CampusFlow helps students discover opportunities, understand their fit, organize applications and know what to do next — without juggling a dozen tabs and spreadsheets.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={onOpenAuth} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d4ed8] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto">
              Start your journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button type="button" onClick={() => onEnterApp('dashboard')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 sm:w-auto">
              Explore the live demo
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" />Free to get started</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" />Firebase-powered accounts</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" />Gemini-powered guidance</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }} className="mx-auto mt-14 max-w-6xl">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)]">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-slate-300" /><span className="h-2.5 w-2.5 rounded-full bg-slate-300" /><span className="h-2.5 w-2.5 rounded-full bg-slate-300" /></div>
                <span className="hidden text-[11px] font-semibold text-slate-500 sm:inline">campusflow.city / command center</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />LIVE</span>
                <span className="hidden sm:inline">Student Workspace</span>
              </div>
            </div>

            <div className="grid gap-4 bg-[#fbfcfe] p-4 sm:p-5 lg:grid-cols-[1.15fr_1.85fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0b2340] text-sm font-black text-white">MS</div>
                      <div><div className="text-sm font-bold text-slate-900">Maya Sharma</div><div className="text-[11px] text-slate-500">Education Passport</div></div>
                    </div>
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">Profile 92%</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-slate-50 p-2.5 text-center"><div className="text-[9px] font-bold uppercase tracking-wide text-slate-400">GPA</div><div className="mt-0.5 text-sm font-black text-slate-800">3.88</div></div>
                    <div className="rounded-xl bg-slate-50 p-2.5 text-center"><div className="text-[9px] font-bold uppercase tracking-wide text-slate-400">SAT</div><div className="mt-0.5 text-sm font-black text-slate-800">1490</div></div>
                    <div className="rounded-xl bg-slate-50 p-2.5 text-center"><div className="text-[9px] font-bold uppercase tracking-wide text-slate-400">IELTS</div><div className="mt-0.5 text-sm font-black text-slate-800">8.0</div></div>
                  </div>
                  <button type="button" onClick={() => onEnterApp('passport')} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800">Open Education Passport <ArrowRight className="h-3.5 w-3.5" /></button>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between"><div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-600" /><span className="text-xs font-bold text-slate-800">Your shortlist</span></div><span className="text-[10px] font-semibold text-slate-400">3 strong matches</span></div>
                  <div className="mt-3 space-y-2">
                    {['University of Toronto', 'University of British Columbia', 'NUS Singapore'].map((name, index) => (
                      <button type="button" key={name} onClick={() => onEnterApp('universities')} className="flex w-full items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 text-left transition hover:border-blue-200 hover:bg-blue-50/50">
                        <span className="text-[11px] font-semibold text-slate-700">{name}</span><span className="text-[10px] font-bold text-emerald-600">{[94, 89, 86][index]}% fit</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-[#0b2340] via-[#102b52] to-[#173e74] p-5 text-white shadow-xl sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3"><div className="rounded-xl border border-white/15 bg-white/10 p-2"><Bot className="h-5 w-5 text-blue-200" /></div><div><div className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-200">CampusFlow AI</div><div className="mt-0.5 text-sm font-bold">Your next best action</div></div></div>
                  <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-[10px] font-bold text-amber-200">High priority</span>
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex items-start gap-3"><div className="mt-0.5 rounded-lg bg-amber-300/15 p-2"><FileCheck2 className="h-4 w-4 text-amber-200" /></div><div className="min-w-0"><div className="text-sm font-bold leading-5">Finish your official transcript submission</div><div className="mt-1.5 text-[11px] leading-5 text-blue-100/80">One document is still blocking the application from moving to the next stage.</div></div></div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-semibold"><span className="inline-flex items-center gap-1.5 text-blue-100/70"><Clock3 className="h-3.5 w-3.5" />5 days remaining</span><button type="button" onClick={() => onEnterApp('advisor')} className="inline-flex items-center gap-1 text-white hover:text-blue-200">Ask AI <ArrowRight className="h-3.5 w-3.5" /></button></div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onEnterApp('applications')} className="rounded-xl border border-white/10 bg-white/10 p-3 text-left transition hover:bg-white/15"><div className="text-[10px] font-bold text-blue-200">APPLICATIONS</div><div className="mt-1 text-lg font-black">6</div><div className="text-[10px] text-blue-100/65">tracked</div></button>
                  <button type="button" onClick={() => onEnterApp('deadlines')} className="rounded-xl border border-white/10 bg-white/10 p-3 text-left transition hover:bg-white/15"><div className="text-[10px] font-bold text-blue-200">DEADLINES</div><div className="mt-1 text-lg font-black">3</div><div className="text-[10px] text-blue-100/65">this month</div></button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">One connected workflow</div><h2 className="mt-2 text-2xl font-black tracking-tight text-[#0b2340] sm:text-3xl">Less chaos. More forward motion.</h2></div><button type="button" onClick={() => onEnterApp('city')} className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-800">See Education City <ArrowRight className="h-4 w-4" /></button></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.step} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: index * 0.05 }} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center justify-between"><div className="rounded-xl bg-blue-50 p-2.5 text-blue-700"><Icon className="h-4 w-4" /></div><span className="text-[10px] font-black tracking-wider text-slate-300">{item.step}</span></div>
                  <h3 className="mt-4 text-sm font-black text-slate-900">{item.title}</h3><p className="mt-1.5 text-[11px] leading-5 text-slate-500">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-semibold text-slate-400"><Sparkles className="h-3.5 w-3.5 text-amber-500" />Designed for students who want clarity, not another dashboard to manage.</div>
      </div>
    </section>
  );
};
