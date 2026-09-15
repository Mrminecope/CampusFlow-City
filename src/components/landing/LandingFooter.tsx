import React from 'react';
import { CampusFlowLogo } from '../common/CampusFlowLogo';
import { Sparkles, Shield, Heart, ExternalLink } from 'lucide-react';
import { NavigationTab } from '../../types';

interface LandingFooterProps {
  onEnterApp: (tab: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onEnterApp,
  onOpenAuth,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Partnership Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <CampusFlowLogo size="md" lightText={true} />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              CampusFlow City Phase 2 is the unified global admissions ecosystem developed for FundMyCrazy. Connecting ambitious scholars with verified Education Passports, 4,200+ universities, and Gemini-powered guidance.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                An Initiative with FundMyCrazy
              </span>
            </div>
          </div>

          {/* Col 3: Core Platform Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              7 Core Pillars
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('passport')}
                  className="hover:text-white transition-colors"
                >
                  Education Passport
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('advisor')}
                  className="hover:text-white transition-colors"
                >
                  AI Advisor & Next Best Action
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('universities')}
                  className="hover:text-white transition-colors"
                >
                  University Discovery (4,200+)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('scholarships')}
                  className="hover:text-white transition-colors"
                >
                  Scholarships & Grants ($180M+)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('applications')}
                  className="hover:text-white transition-colors"
                >
                  Applications & Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('deadlines')}
                  className="hover:text-white transition-colors"
                >
                  Deadlines & Timeline
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('city')}
                  className="hover:text-white transition-colors"
                >
                  Education City (Google Maps)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Integrations & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Integrations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('documents')}
                  className="hover:text-white transition-colors"
                >
                  Google Drive Documents
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('inbox')}
                  className="hover:text-white transition-colors"
                >
                  Gmail Admission Inbox
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('deadlines')}
                  className="hover:text-white transition-colors"
                >
                  Google Calendar Two-Way Sync
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('simulator')}
                  className="hover:text-white transition-colors"
                >
                  Pathway Odds Simulator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('compare')}
                  className="hover:text-white transition-colors"
                >
                  University Comparison Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Security & Account */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Access & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                >
                  Sign In / Create Account
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Explore Interactive Demo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnterApp('settings')}
                  className="hover:text-white transition-colors"
                >
                  Security & Firestore Rules
                </button>
              </li>
              <li>
                <a
                  href="#trust"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy & Data Rights
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CampusFlow City. All rights reserved. Built for{' '}
            <span className="text-slate-300 font-semibold">FundMyCrazy</span>.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Gemini 2.5 Flash</span>
            <span>•</span>
            <span>Google Workspace OAuth</span>
            <span>•</span>
            <span>Firebase Firestore</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
