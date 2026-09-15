import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Download, 
  Sparkles, 
  Server, 
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface TrustPrivacySectionProps {
  onEnterApp: (tab: NavigationTab) => void;
}

export const TrustPrivacySection: React.FC<TrustPrivacySectionProps> = ({
  onEnterApp,
}) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Zero-Trust Firestore Database',
      description:
        'Every Education Passport, essay draft, and application is isolated in cloud Firestore with strict security rules enforcing that only authenticated owners can read or write their data.',
      badge: 'Database Isolation',
    },
    {
      icon: Lock,
      title: 'Client-Side Ephemeral Tokens',
      description:
        'Google OAuth tokens and sensitive credentials remain strictly in memory and are never persisted in insecure browser localStorage or cookies, shielding against XSS vulnerabilities.',
      badge: 'In-Memory Security',
    },
    {
      icon: Download,
      title: 'Complete Student Data Portability',
      description:
        'You retain complete ownership of your academic records. Download your entire application dossier, passport data, and essay drafts in a standardized JSON backup at any time.',
      badge: 'Data Sovereignty',
    },
    {
      icon: FileCheck,
      title: 'Verified Official Reference Data',
      description:
        'Admission requirements, tuition fee structures, and scholarship criteria are verified against official university catalogs and national accreditation registries.',
      badge: 'Curated Registry',
    },
  ];

  return (
    <section id="trust" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Enterprise-Grade Student Protection</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0a2540] tracking-tight">
            Security & Privacy by Design
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Your higher education journey contains your most sensitive academic credentials and personal essays. We safeguard your future with rigorous cloud security.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-slate-50/60 p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-emerald-100/70 text-emerald-800 rounded-xl">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Security Guarantee Box */}
        <div className="mt-12 max-w-4xl mx-auto p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Your Data Is Never Sold or Shared with Advertisers</div>
              <div className="text-[11px] text-slate-300">CampusFlow City exists solely to empower your personal academic advancement.</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEnterApp('settings')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg border border-slate-700 transition-colors shrink-0"
          >
            Review Security Controls
          </button>
        </div>
      </div>
    </section>
  );
};
