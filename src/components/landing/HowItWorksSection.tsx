import React from 'react';
import { 
  IdCard, 
  Search, 
  Workflow, 
  Send, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface HowItWorksSectionProps {
  onEnterApp: (tab: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onEnterApp,
  onOpenAuth,
}) => {
  const steps = [
    {
      number: '01',
      title: 'Build Your Education Passport',
      tagline: 'Single source of verified truth',
      icon: IdCard,
      description:
        'Input your high school transcripts, predicted grades, standardized exam scores (SAT, ACT, IELTS), and target degree ambitions. Your digital passport instantly creates your global applicant profile.',
      tabTarget: 'passport' as NavigationTab,
      highlight: 'Tamper-resistant academic credentialing',
    },
    {
      number: '02',
      title: 'Match Universities & Scholarships',
      tagline: 'Algorithmic fit and funding',
      icon: Search,
      description:
        'Our matching engine analyzes 4,200+ universities worldwide alongside $180M+ in verified scholarships, ranking institutions by acceptance odds, budget feasibility, and FundMyCrazy grant eligibility.',
      tabTarget: 'universities' as NavigationTab,
      highlight: 'Reach, Target, and Safety distribution',
    },
    {
      number: '03',
      title: 'Connect Google Workspace',
      tagline: '1-click seamless data synchronization',
      icon: Workflow,
      description:
        'Authenticate securely with Google. Sync official transcripts from Google Drive, track university decisions in your unified Admission Inbox (Gmail), and auto-populate deadlines in Google Calendar.',
      tabTarget: 'inbox' as NavigationTab,
      highlight: 'Zero manual transcript uploads',
    },
    {
      number: '04',
      title: 'Execute with Gemini AI Guidance',
      tagline: 'Zero missed cutoffs, winning essays',
      icon: Send,
      description:
        'Receive continuous Next Best Actions. Co-write winning Statements of Purpose in the Application Studio, track multi-university application checklists, and submit before deadlines with complete confidence.',
      tabTarget: 'advisor' as NavigationTab,
      highlight: 'Daily prioritized admissions guidance',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-800">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Structured Path to Higher Education</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0a2540] tracking-tight">
            How CampusFlow City Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From initial discovery to final acceptance letter, our four-step guided framework removes complexity, confusion, and missed cutoffs.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                {/* Step Top Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors">
                      {step.number}
                    </span>
                    <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {step.title}
                    </h3>
                    <div className="text-[11px] font-semibold text-blue-600">
                      {step.tagline}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Highlight and CTA */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate font-medium">{step.highlight}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onEnterApp(step.tabTarget)}
                    className="w-full py-1.5 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Test in Dashboard</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Quick CTA */}
        <div className="mt-14 max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-bold text-base text-white">
              Ready to begin Step 1?
            </h4>
            <p className="text-xs text-blue-200">
              Create your verified Education Passport in under 3 minutes with Google Sign-In.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAuth}
            className="px-5 py-2.5 bg-white text-blue-900 font-bold text-xs rounded-xl shadow-xs hover:bg-blue-50 transition-colors shrink-0"
          >
            Create Your Passport Free
          </button>
        </div>
      </div>
    </section>
  );
};
