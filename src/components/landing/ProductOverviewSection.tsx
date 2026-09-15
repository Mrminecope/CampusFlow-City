import React, { useState } from 'react';
import { 
  IdCard, 
  Bot, 
  Building2, 
  Award, 
  FileText, 
  CalendarDays, 
  MapPin, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe2,
  Compass,
  Edit3
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface ProductOverviewSectionProps {
  onEnterApp: (tab: NavigationTab) => void;
}

export const ProductOverviewSection: React.FC<ProductOverviewSectionProps> = ({
  onEnterApp,
}) => {
  const [activeTabKey, setActiveTabKey] = useState<string>('passport');

  const products = [
    {
      id: 'passport',
      tabTarget: 'passport' as NavigationTab,
      name: 'Education Passport',
      tagline: 'Single verified student identity & cross-border credentials',
      icon: IdCard,
      accentColor: 'blue',
      description:
        'A comprehensive digital passport unifying academic transcripts, standardized test scores (SAT/ACT/IELTS), verified GPA calculations, extracurricular milestones, and research pursuits in one tamper-resistant portfolio.',
      features: [
        'Verified GPA scoring across international 4.0, 5.0, and 10.0 scales',
        'Standardized exam benchmarks with percentile ranking',
        'Target major & country mobility preferences',
        'One-click exportable academic record for admissions officers',
      ],
      badgeText: 'Academic Identity',
      ctaText: 'View Education Passport',
      previewComponent: (
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-5 rounded-xl border border-blue-800/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <IdCard className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-blue-300">
                Official Education Passport
              </span>
            </div>
            <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
              #CF-2027-8924
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">GPA Metric</div>
              <div className="text-lg font-bold text-white">3.88 / 4.0</div>
            </div>
            <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">SAT Composite</div>
              <div className="text-lg font-bold text-blue-300">1490</div>
            </div>
            <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">IELTS Academic</div>
              <div className="text-lg font-bold text-emerald-400">Band 8.0</div>
            </div>
            <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Status</div>
              <div className="text-xs font-bold text-amber-300 mt-1">Verified ✓</div>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span>Primary Discipline:</span>
              <span className="font-semibold text-white">Computer Science & AI</span>
            </div>
            <div className="flex justify-between">
              <span>Mobility Targets:</span>
              <span className="font-semibold text-white">Canada, United States, Germany, Singapore</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'advisor',
      tabTarget: 'advisor' as NavigationTab,
      name: 'AI Advisor & Next Best Action',
      tagline: 'Gemini 2.5 Flash multi-signal decision engine',
      icon: Bot,
      accentColor: 'indigo',
      description:
        'Cuts through the noise of admissions by continuously synthesizing incoming emails, Google Drive transcripts, active application portals, and approaching deadlines to generate the single highest-impact next step.',
      features: [
        '7-signal context ingestion (Drive, Gmail, Calendar, Apps, Passport)',
        'Zero-hallucination grounded guidance with transparent reasoning',
        'Direct links to actionable tools (Document Uploader, Application Studio)',
        'Interactive admissions counselor Q&A chat backed by Gemini',
      ],
      badgeText: 'Powered by Gemini 2.5',
      ctaText: 'Open AI Advisor',
      previewComponent: (
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-700">
                <Bot className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-slate-800">Next Best Action Recommendation</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              High Leverage
            </span>
          </div>

          <div className="p-3.5 bg-indigo-50/60 rounded-lg border border-indigo-100 space-y-1.5">
            <div className="text-xs font-bold text-indigo-950">
              Draft Statement of Purpose for TU Munich (MSc Informatics)
            </div>
            <p className="text-[11px] text-indigo-900/80 leading-relaxed">
              Your profile has a 91% match with TU Munich’s program. The preliminary faculty review deadline is in 18 days. Application Studio has a pre-populated draft template ready.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Estimated time to complete: 45 mins</span>
            <span className="text-indigo-600 font-semibold">Priority Rank #1</span>
          </div>
        </div>
      ),
    },
    {
      id: 'universities',
      tabTarget: 'universities' as NavigationTab,
      name: 'University Discovery',
      tagline: 'Explore and compare 4,200+ global higher-ed institutions',
      icon: Building2,
      accentColor: 'blue',
      description:
        'A comprehensive worldwide institutional directory. Filter institutions by global ranking, acceptance rates, tuition budgets, country, language of instruction, and automated profile match scores.',
      features: [
        'Algorithmic match scoring (0–100%) calculated against your Education Passport',
        'Side-by-side University Comparison engine with cost-of-living breakdowns',
        'Direct-to-application portal routing with document requirement checklists',
        'Detailed faculty research strengths and post-graduation employment rates',
      ],
      badgeText: '4,200+ Institutions',
      ctaText: 'Explore Universities',
      previewComponent: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-slate-900">University of Toronto</div>
                <div className="text-[10px] text-slate-500">Canada • Rank #21</div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                96% Match
              </span>
            </div>
            <div className="text-[11px] text-slate-600">Acceptance Rate: 43% • Tuition: $48k CAD</div>
            <div className="text-[10px] text-blue-600 font-semibold">Top Majors: Computer Science, Biotech</div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-slate-900">National Univ. of Singapore</div>
                <div className="text-[10px] text-slate-500">Singapore • Rank #8</div>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                94% Match
              </span>
            </div>
            <div className="text-[11px] text-slate-600">Acceptance Rate: 12% • Tuition: $32k SGD</div>
            <div className="text-[10px] text-blue-600 font-semibold">Top Majors: AI, Data Science</div>
          </div>
        </div>
      ),
    },
    {
      id: 'scholarships',
      tabTarget: 'scholarships' as NavigationTab,
      name: 'Scholarships & Grants Hub',
      tagline: 'Matched financial aid and FundMyCrazy full-ride grants',
      icon: Award,
      accentColor: 'amber',
      description:
        'Never let finances hinder academic potential. CampusFlow City indexes over $180M in merit, need-based, and partner grants, including specialized funding from FundMyCrazy for audacious and creative applicants.',
      features: [
        'Automated eligibility matching against your GPA, nationality, and major',
        'Direct tracking of scholarship application deadlines and essay prompts',
        'FundMyCrazy Partner Grants specifically for non-traditional achievers',
        'Full-tuition, living stipend, and research fellowship categorization',
      ],
      badgeText: '$180M+ Indexed',
      ctaText: 'Search Scholarships',
      previewComponent: (
        <div className="bg-gradient-to-br from-amber-500/10 via-amber-100/30 to-white p-4 rounded-xl border border-amber-300/60 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              FundMyCrazy Featured Award
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-600 text-white">
              $25,000 / Year
            </span>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Global Tech Innovators & Trailblazers Scholarship</div>
            <p className="text-[11px] text-slate-600 mt-1">
              Provides full tuition funding and project seed funding for undergraduate and graduate STEM innovators applying internationally.
            </p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-amber-200/50">
            <span>Eligibility: 3.5+ GPA • Global Applicants</span>
            <span className="text-amber-800 font-semibold">Deadline: Dec 15</span>
          </div>
        </div>
      ),
    },
    {
      id: 'applications',
      tabTarget: 'applications' as NavigationTab,
      name: 'Applications & Studio',
      tagline: 'End-to-end multi-university tracking & SOP drafting',
      icon: FileText,
      accentColor: 'emerald',
      description:
        'Streamline complex admission workflows with multi-college kanban tracking, document status checklists, and the Application Studio — an AI-assisted writing environment for Statements of Purpose, essays, and resumes.',
      features: [
        'Multi-stage status pipeline: In Progress, Documents Pending, Under Review, Accepted',
        'Application Studio with live word count, structure guidelines, and Gemini critique',
        'Direct linking of verified Google Drive transcripts to respective universities',
        'Real-time checklist progression indicators for each target university',
      ],
      badgeText: 'Admissions Workspace',
      ctaText: 'Manage Applications',
      previewComponent: (
        <div className="space-y-2.5">
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">University of Toronto — BSc Computer Science</div>
              <div className="text-[10px] text-slate-500">Next Step: Submit official high school transcript</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                85% Complete
              </span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">TU Munich — MSc Informatics</div>
              <div className="text-[10px] text-slate-500">Next Step: Finalize Statement of Purpose draft</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                60% Complete
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'deadlines',
      tabTarget: 'deadlines' as NavigationTab,
      name: 'Deadlines & Timeline',
      tagline: 'Zero-miss tracking synced directly with Google Calendar',
      icon: CalendarDays,
      accentColor: 'red',
      description:
        'Eliminate missed deadlines forever. Every application requirement, scholarship cutoff, standardized testing date, and visa milestone is plotted on an interactive timeline with automated reminders.',
      features: [
        'Two-way sync with Google Calendar via Workspace OAuth',
        'Color-coded urgency tiers (Urgent <7 days, Upcoming <30 days, Future)',
        'Custom student reminder creation with completion checkoffs',
        'Automatic deadline updates sourced from university admissions offices',
      ],
      badgeText: 'Calendar Sync',
      ctaText: 'View Deadlines',
      previewComponent: (
        <div className="space-y-2">
          <div className="p-3 bg-red-50/60 rounded-lg border border-red-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div>
                <div className="text-xs font-bold text-red-950">University of Toronto — Term 1 Transcript</div>
                <div className="text-[10px] text-red-700">Required for Early Consideration</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded">
              5 Days Left
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
              <div>
                <div className="text-xs font-bold text-slate-800">Amsterdam Merit Scholarship Application</div>
                <div className="text-[10px] text-slate-500">Financial Aid Office Cutoff</div>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded">
              18 Days Left
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'city',
      tabTarget: 'city' as NavigationTab,
      name: 'Education City (Interactive Map)',
      tagline: 'Explore global campus hubs and living realities on Google Maps',
      icon: MapPin,
      accentColor: 'blue',
      description:
        'Higher education is not just about rankings — it is about where you will thrive. Education City visualizes university campuses, research clusters, living costs, and student housing on Google Maps Platform.',
      features: [
        'Interactive Google Maps interface with campus boundary markers',
        'Local cost of living indices (rent, transit, groceries, insurance)',
        'Tech corridors, biomedical hubs, and industry co-op proximity filters',
        'Transit accessibility and international student community ratings',
      ],
      badgeText: 'Google Maps Platform',
      ctaText: 'Explore Education City',
      previewComponent: (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-2xs h-48 bg-slate-100">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-4 flex flex-col justify-end text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
              Interactive Global Map Layer
            </span>
            <div className="text-xs font-bold">Toronto Innovation & Biotech Precinct</div>
            <div className="text-[11px] text-slate-200">
              U of Toronto St. George Campus • Mars Discovery District • 12 Global Tech Hubs
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentProduct = products.find((p) => p.id === activeTabKey) || products[0];

  return (
    <section id="features" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>The 7 Pillars of CampusFlow City</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0a2540] tracking-tight">
            An End-to-End Operating System for Global Scholars
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every tool required to discover, prepare, fund, and conquer your international university admission journey — seamlessly interconnected in one unified platform.
          </p>
        </div>

        {/* Interactive Pillar Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {products.map((p) => {
            const Icon = p.icon;
            const isSelected = p.id === activeTabKey;
            return (
              <button
                key={p.id}
                id={`tab-btn-${p.id}`}
                type="button"
                onClick={() => setActiveTabKey(p.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#0a2540] text-white shadow-sm shadow-slate-900/20 scale-105'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Product Spotlight Card */}
        <div className="max-w-5xl mx-auto bg-slate-50/70 rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details & Features */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                  {currentProduct.badgeText}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {currentProduct.name}
                </h3>
                <p className="text-xs font-semibold text-blue-700">
                  {currentProduct.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentProduct.description}
                </p>
              </div>

              {/* Key Features List */}
              <div className="space-y-2">
                {currentProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <div className="p-0.5 bg-emerald-100 text-emerald-700 rounded-full shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  id={`open-app-${currentProduct.id}`}
                  type="button"
                  onClick={() => onEnterApp(currentProduct.tabTarget)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1d4ed8] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{currentProduct.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Live Interactive Visual Mock */}
            <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Interactive Module Preview</span>
                <span className="text-blue-600">Active Live State</span>
              </div>
              {currentProduct.previewComponent}
            </div>
          </div>
        </div>

        {/* 7-Card Grid Reference for Quick Overview */}
        <div className="mt-14 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => onEnterApp(p.tabTarget)}
                className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-slate-100 group-hover:bg-blue-50 text-slate-700 group-hover:text-blue-600 rounded-lg transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {p.name}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                  {p.tagline}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
