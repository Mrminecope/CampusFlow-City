import React from 'react';
import { 
  FolderArchive, 
  Mail, 
  Calendar, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface GoogleWorkspaceSectionProps {
  onEnterApp: (tab: NavigationTab) => void;
}

export const GoogleWorkspaceSection: React.FC<GoogleWorkspaceSectionProps> = ({
  onEnterApp,
}) => {
  const integrations = [
    {
      name: 'Google Drive',
      badge: 'Transcripts & Portfolios',
      icon: FolderArchive,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      description:
        'Directly attach verified academic transcripts, recommendation letters, and research papers stored in your Google Drive to your college dossiers without downloading or re-uploading files.',
      features: [
        'One-click verified Drive document picker',
        'Automatic document classification (Transcripts, SOP, CV, Test Scores)',
        'Zero file duplication; data remains encrypted in your personal Drive',
      ],
      targetTab: 'documents' as NavigationTab,
      ctaText: 'View Document Hub',
    },
    {
      name: 'Gmail Admissions Inbox',
      badge: 'Email Intelligence',
      icon: Mail,
      color: 'text-red-600 bg-red-50 border-red-200',
      description:
        'Never lose a critical admissions update in personal clutter. CampusFlow City aggregates admissions officer threads, status changes, and interview invitations into a dedicated Admissions Inbox.',
      features: [
        'Automatic parsing of admissions officer status emails',
        'Actionable prompt extraction (missing docs, interview requests)',
        'Direct connection to your student Google account via OAuth 2.0',
      ],
      targetTab: 'inbox' as NavigationTab,
      ctaText: 'Open Admission Inbox',
    },
    {
      name: 'Google Calendar',
      badge: 'Deadlines & Events',
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description:
        'Two-way sync of university application deadlines, financial aid cutoffs, campus interview slots, and visa milestones directly onto your personal student Google Calendar.',
      features: [
        'Auto-populated color-coded calendar milestones',
        'Mobile push notifications before critical 7-day deadlines',
        'Timezone normalization for international submission cutoffs',
      ],
      targetTab: 'deadlines' as NavigationTab,
      ctaText: 'Check Deadlines Calendar',
    },
    {
      name: 'Google Identity & Security',
      badge: 'OAuth 2.0 & GSI',
      icon: KeyRound,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description:
        'Frictionless, passwordless student authentication using Google Identity Services (GSI). Strictly adheres to client-side token architecture with zero insecure credential storage.',
      features: [
        'Single sign-on (SSO) with your academic or personal Google account',
        'Ephemeral in-memory access token management',
        'Granular scope consent approved explicitly by you',
      ],
      targetTab: 'settings' as NavigationTab,
      ctaText: 'View Security Settings',
    },
  ];

  return (
    <section id="workspace" className="py-20 md:py-28 bg-slate-50/50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Native Workspace Integration</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0a2540] tracking-tight">
            Integrated Deeply with Google Workspace
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            CampusFlow City is designed to fit your existing student workflow. Connect your Drive documents, admissions emails, and calendar schedules in seconds.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {item.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onEnterApp(item.targetTab)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
