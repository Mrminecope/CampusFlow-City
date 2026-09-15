import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Compass, 
  Zap,
  Lock,
  Mail,
  FolderArchive,
  Calendar,
  IdCard
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface AIIntelligenceSectionProps {
  onEnterApp: (tab: NavigationTab) => void;
}

export const AIIntelligenceSection: React.FC<AIIntelligenceSectionProps> = ({
  onEnterApp,
}) => {
  const signalSources = [
    { label: 'Google Drive Transcripts', icon: FolderArchive, count: '3 Verified' },
    { label: 'Gmail Admissions Inquiries', icon: Mail, count: 'Live Synced' },
    { label: 'Google Calendar Deadlines', icon: Calendar, count: '5 Upcoming' },
    { label: 'Active University Applications', icon: FileText, count: '3 Portals' },
    { label: 'Verified Education Passport', icon: IdCard, count: 'GPA 3.88' },
  ];

  return (
    <section id="ai-intelligence" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Gemini 2.5 Flash Decision Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0a2540] tracking-tight">
            AI-Powered Admissions Intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Unlike generic chatbots, CampusFlow City’s AI Advisor synthesizes real-time data from your emails, academic transcripts, and university portals to eliminate guesswork.
          </p>
        </div>

        {/* Architectural Showcase Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Signal Aggregator */}
          <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300">
                  Multi-Signal Context Aggregation
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                ● Model: Gemini 2.5 Flash
              </span>
            </div>

            {/* Ingestion Signals List */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Ingested Real-time Signals
              </div>
              {signalSources.map((signal, i) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-200 font-medium">{signal.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 bg-blue-900/40 px-2 py-0.5 rounded">
                      {signal.count}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Synthesized Output Banner */}
            <div className="p-4 bg-gradient-to-r from-blue-900/60 to-indigo-900/60 rounded-xl border border-blue-700/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-blue-300">
                  Synthesized Output
                </span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  High Confidence
                </span>
              </div>
              <div className="text-xs font-bold text-white">
                Next Best Action: "Submit Official High School Transcript to U of Toronto"
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Admissions decision will be blocked if transcript is not received before the November 15 Early Decision deadline.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Core Intelligence Capabilities */}
          <div className="lg:col-span-6 space-y-5">
            {/* Capability 1: Next Best Action Engine */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-2 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Next Best Action Decision Engine
                  </h3>
                  <div className="text-[11px] text-blue-600 font-medium">
                    Priority-based admissions progression
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instead of managing 40 disparate checkboxes across multiple university portals, Gemini continuously pinpoints the single highest-leverage task you need to complete today.
              </p>
            </div>

            {/* Capability 2: Application Studio Co-Writer */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-2 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Application Studio SOP Co-Writer
                  </h3>
                  <div className="text-[11px] text-indigo-600 font-medium">
                    AI-assisted Statement of Purpose drafting
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Draft, refine, and structure compelling essays with personalized suggestions grounded in your Education Passport achievements, research history, and university mission statements.
              </p>
            </div>

            {/* Capability 3: Pathway Simulator */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-2 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Pathway Simulator & Match Odds
                  </h3>
                  <div className="text-[11px] text-emerald-600 font-medium">
                    Data-backed Reach, Target, Safety modeling
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Simulate how changes in GPA, standardized test scores, or financial aid requirements adjust your admission probability across 4,200+ global programs.
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onEnterApp('advisor')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0a2540] hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <span>Launch AI Advisor Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onEnterApp('studio')}
                className="flex items-center gap-1.5 px-4 py-2.5 text-slate-700 hover:text-blue-700 text-xs font-semibold"
              >
                <span>Open Application Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
