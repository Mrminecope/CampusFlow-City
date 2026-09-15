import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Bot, 
  GraduationCap, 
  MapPin, 
  Award, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  Zap,
  TrendingUp,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';
import { NavigationTab } from '../../types';

interface LandingHeroProps {
  onEnterApp: (tab?: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onEnterApp,
  onOpenAuth,
}) => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-b border-slate-200/70">
      {/* Background Subtle Geometric Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl" />
        <div className="absolute -top-24 right-1/4 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl" />
        <div className="absolute top-36 left-1/2 -translate-x-1/2 w-[550px] h-48 bg-amber-300/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 shadow-2xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wide uppercase text-blue-900">
              CampusFlow City × FundMyCrazy
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-blue-700 flex items-center gap-1">
              Phase 2 Global Launch <Sparkles className="w-3 h-3 text-amber-500" />
            </span>
          </motion.div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0a2540] tracking-tight leading-[1.12]"
          >
            One Education Network.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-900">
              Every Student.
            </span>
            <br className="hidden sm:inline" /> Every Dream Funded.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            The comprehensive admissions operating system connecting ambitious scholars with{' '}
            <strong className="font-semibold text-slate-800">4,200+ universities</strong>, verified{' '}
            <strong className="font-semibold text-slate-800">Education Passports</strong>,{' '}
            <strong className="font-semibold text-slate-800">$180M+ in matched scholarships</strong>, and{' '}
            <strong className="font-semibold text-slate-800">Gemini 2.5 AI guidance</strong>.
          </motion.p>

          {/* Primary Action Button Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
          >
            <button
              id="hero-primary-cta"
              type="button"
              onClick={onOpenAuth}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#1d4ed8] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-demo-cta"
              type="button"
              onClick={() => onEnterApp('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300/90 shadow-2xs hover:border-slate-400 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Launch Interactive Demo</span>
            </button>

            <button
              id="hero-maps-cta"
              type="button"
              onClick={() => onEnterApp('city')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 text-slate-600 hover:text-blue-700 font-semibold text-sm transition-colors"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Explore Education City Map</span>
            </button>
          </motion.div>

          {/* Trust Guarantees Micro-Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Zero-Trust Firestore Database
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Google Workspace OAuth 2.0
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              FundMyCrazy Scholarship Network
            </span>
          </motion.div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200/80 shadow-2xs text-center space-y-1">
            <div className="text-2xl md:text-3xl font-black text-[#0a2540]">4,200+</div>
            <div className="text-xs font-semibold text-slate-600">Global Universities</div>
            <div className="text-[11px] text-slate-400">QS & Times Higher Ed benchmarked</div>
          </div>
          <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200/80 shadow-2xs text-center space-y-1">
            <div className="text-2xl md:text-3xl font-black text-blue-600">$180M+</div>
            <div className="text-xs font-semibold text-slate-600">Matched Scholarships</div>
            <div className="text-[11px] text-slate-400">Merit, need & FundMyCrazy awards</div>
          </div>
          <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200/80 shadow-2xs text-center space-y-1">
            <div className="text-2xl md:text-3xl font-black text-[#0a2540]">7 Signals</div>
            <div className="text-xs font-semibold text-slate-600">Gemini Intelligence</div>
            <div className="text-[11px] text-slate-400">Next Best Action decision engine</div>
          </div>
          <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200/80 shadow-2xs text-center space-y-1">
            <div className="text-2xl md:text-3xl font-black text-emerald-600">100%</div>
            <div className="text-xs font-semibold text-slate-600">Verified Passports</div>
            <div className="text-[11px] text-slate-400">Single portable student identity</div>
          </div>
        </div>

        {/* Dynamic Interactive Command Center Mockup Preview */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
            {/* Top Browser/Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 border-b border-slate-200 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <span className="font-mono text-[11px] text-slate-600 ml-2 hidden sm:inline">
                  campusflow.city/app/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Live Sync Active
                </span>
                <button
                  type="button"
                  onClick={() => onEnterApp('dashboard')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors text-[11px]"
                >
                  <span>Open Full Dashboard</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Inner Interactive Showcase Body */}
            <div className="p-4 sm:p-6 bg-slate-50/40 space-y-4">
              {/* Row 1: Student Passport Banner + Gemini Next Best Action */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Student Education Passport Card */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-sm">
                        MS
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">Maya Sharma</div>
                        <div className="text-[11px] text-slate-500">Education Passport #CF-8924</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                      Top 5% Fit
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-center border-t border-slate-100">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">GPA</div>
                      <div className="text-sm font-bold text-slate-800">3.88 / 4.0</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">SAT</div>
                      <div className="text-sm font-bold text-slate-800">1490</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">IELTS</div>
                      <div className="text-sm font-bold text-slate-800">8.0</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Target: BSc Computer Science</span>
                    <button
                      type="button"
                      onClick={() => onEnterApp('passport')}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      View Passport →
                    </button>
                  </div>
                </div>

                {/* Gemini Next Best Action Banner (Span 2) */}
                <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-5 rounded-xl shadow-xs space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                        <Bot className="w-4 h-4 text-blue-300" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                          Gemini 2.5 Next Best Action
                        </div>
                        <div className="text-xs font-semibold text-white">
                          Synthesizing Gmail + Drive + Applications
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                      Priority: Urgent
                    </span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-lg border border-white/15 space-y-1.5">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Submit Official Term 1 Transcript to University of Toronto</span>
                      <span className="text-[11px] text-amber-300 font-mono font-semibold">5 Days Remaining</span>
                    </div>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      Admissions Officer Dr. Henderson flagged that your application is 85% complete. Transcript verified in Google Drive & ready to submit.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-300 text-[11px]">Reason: Critical path for Early Decision review</span>
                    <button
                      type="button"
                      onClick={() => onEnterApp('advisor')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <span>Execute Action in AI Advisor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Live Quick Discovery & Scholarship Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* University Discovery Item */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Top University Match</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      96% Match
                    </span>
                  </div>
                  <div className="font-bold text-xs text-slate-900">University of Toronto</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    Toronto, Canada • Rank #21
                  </div>
                  <button
                    type="button"
                    onClick={() => onEnterApp('universities')}
                    className="w-full mt-1 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    View University Profile
                  </button>
                </div>

                {/* FundMyCrazy Scholarship Award Item */}
                <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-2xs space-y-2 bg-gradient-to-b from-amber-50/40 to-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-700 uppercase flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-600" />
                      FundMyCrazy Partner Grant
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      $25,000 / Yr
                    </span>
                  </div>
                  <div className="font-bold text-xs text-slate-900">Global Tech Innovators Award</div>
                  <div className="text-[11px] text-slate-600">Full tuition grant for ambitious international STEM builders</div>
                  <button
                    type="button"
                    onClick={() => onEnterApp('scholarships')}
                    className="w-full mt-1 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200 rounded-lg transition-colors"
                  >
                    Check Eligibility & Apply
                  </button>
                </div>

                {/* Connected Workspace Status Item */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Google Workspace</span>
                    <span className="text-xs font-semibold text-blue-600">OAuth 2.0</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Drive Transcripts</span>
                      <span className="text-emerald-600 font-semibold">3 Synced</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Admissions Inbox</span>
                      <span className="text-blue-600 font-semibold">1 New Reply</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Google Calendar</span>
                      <span className="text-slate-500">2 Cutoffs This Mo</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onEnterApp('inbox')}
                    className="w-full mt-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Open Admission Inbox
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
