import React from 'react';
import { 
  Inbox, 
  Mail, 
  Calendar, 
  FileWarning, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  ShieldCheck,
  Building2,
  HardDrive
} from 'lucide-react';
import { AdmissionsEmail, DeadlineItem, NavigationTab } from '../../types';

interface EducationInboxWidgetProps {
  urgentEmail?: AdmissionsEmail;
  upcomingDeadline?: DeadlineItem;
  missingDocumentName?: string;
  missingDocumentTarget?: string;
  recommendedAction?: {
    title: string;
    description: string;
    targetTab: NavigationTab;
  };
  setActiveTab: (tab: NavigationTab) => void;
  isGoogleConnected?: boolean;
  isGoogleAccountConnected?: boolean;
  isDriveConnected?: boolean;
  isGmailConnected?: boolean;
  isCalendarConnected?: boolean;
}

export const EducationInboxWidget: React.FC<EducationInboxWidgetProps> = ({
  urgentEmail,
  upcomingDeadline,
  missingDocumentName = 'Official Mid-Year Transcript (Term 1)',
  missingDocumentTarget = 'University of Toronto (Computer Science)',
  recommendedAction,
  setActiveTab,
  isGoogleConnected = false,
  isGoogleAccountConnected = false,
  isDriveConnected = false,
  isGmailConnected = false,
  isCalendarConnected = false,
}) => {
  // Default fallback values strictly marked as Prototype Data
  const email = urgentEmail || {
    id: 'email-fallback',
    sender: 'University of Toronto Admissions',
    subject: 'Action Required: Official Term 1 Transcript Pending',
    category: 'Document Request' as const,
    urgency: 'urgent' as const,
    date: 'Today, 09:30 AM',
    snippet: 'Please upload certified term 1 transcript via the student portal or connected Drive vault to complete file review.',
    requiredAction: 'Upload official term 1 transcript by Oct 14',
    actionTargetTab: 'documents' as NavigationTab,
    source: 'prototype' as const,
  };

  const deadline = upcomingDeadline || {
    id: 'dl-fallback',
    title: 'University of Amsterdam Supplement',
    subtitle: 'Upload motivational letter & certified high school curriculum',
    daysLeft: 9,
    day: '15',
    month: 'OCT',
    urgency: 'critical' as const,
    category: 'Application' as const,
    completed: false,
    dateStr: '2026-10-15',
  };

  const recAction = recommendedAction || {
    title: 'Finalize Statement of Purpose for Amsterdam',
    description: 'Assign verified SOP draft from Google Drive to lock priority consideration before the Oct 15 cutoff.',
    targetTab: 'documents' as NavigationTab,
  };

  const hasAnyLive = isDriveConnected || isGmailConnected || isCalendarConnected;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Widget Header */}
      <div className="p-4 md:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-2xs shrink-0">
            <Inbox className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold text-slate-900">Education Inbox</h2>
              {hasAnyLive ? (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Workspace Connected
                </span>
              ) : (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Admissions Dispatch
                </span>
              )}
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Prototype Data
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Urgent correspondence, impending deadlines, missing credentials, and recommended admissions steps.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('inbox')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-lg border border-slate-200 transition-colors shadow-2xs self-start sm:self-auto"
          >
            <span>Open Full Inbox</span>
            <ArrowRight className="w-3 h-3 text-blue-600" />
          </button>
        </div>
      </div>

      {/* 4-Column Structured Scannable Grid */}
      <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. URGENT EMAIL */}
        <div className="bg-red-50/40 border border-red-200/90 rounded-xl p-4 flex flex-col justify-between hover:border-red-300 transition-all group">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-red-700">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Urgent Email</span>
              </div>
              <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                isGmailConnected && email.source === 'gmail'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {isGmailConnected && email.source === 'gmail' ? 'Live Gmail' : 'Prototype Data'}
              </span>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-900 truncate">
                {email.sender}
              </div>
              <div className="text-xs font-semibold text-slate-800 line-clamp-2 mt-0.5">
                {email.subject}
              </div>
            </div>

            <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
              {email.requiredAction || email.snippet}
            </p>
          </div>

          <div className="pt-3 mt-3 border-t border-red-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium">{email.date}</span>
            <button
              type="button"
              onClick={() => setActiveTab('inbox')}
              className="text-xs font-bold text-red-700 hover:text-red-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              <span>View Email</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. UPCOMING DEADLINE */}
        <div className="bg-blue-50/40 border border-blue-200/90 rounded-xl p-4 flex flex-col justify-between hover:border-blue-300 transition-all group">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-blue-700">
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Impending Deadline</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {isCalendarConnected ? 'Live Calendar' : 'Prototype Data'}
              </span>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-900 truncate">
                {deadline.title}
              </div>
              <div className="text-xs text-slate-700 line-clamp-2 mt-0.5">
                {deadline.subtitle}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Target Date: {deadline.day} {deadline.month}</span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-blue-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium">
              {isCalendarConnected ? 'Calendar Connected' : 'Prototype Schedule'}
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('deadlines')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. MISSING DOCUMENT */}
        <div className="bg-amber-50/40 border border-amber-200/90 rounded-xl p-4 flex flex-col justify-between hover:border-amber-300 transition-all group">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-amber-700">
                <FileWarning className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Required Document</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {isDriveConnected ? 'Live Drive' : 'Prototype Data'}
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-900 line-clamp-2">
                {missingDocumentName}
              </div>
              <div className="text-[11px] text-amber-900 font-medium mt-1">
                Required by {missingDocumentTarget}
              </div>
            </div>

            <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
              Required for admissions committee transcript audit and conditional evaluation.
            </p>
          </div>

          <div className="pt-3 mt-3 border-t border-amber-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium">
              {isDriveConnected ? 'Google Drive Synced' : 'Prototype Vault'}
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Upload Document</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4. RECOMMENDED ACTION */}
        <div className="bg-purple-50/40 border border-purple-200/90 rounded-xl p-4 flex flex-col justify-between hover:border-purple-300 transition-all group">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-purple-700">
                <Sparkles className="w-4 h-4 shrink-0 text-purple-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Recommended Action</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Prototype Data
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-900 line-clamp-2">
                {recAction.title}
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mt-1">
                {recAction.description}
              </p>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-purple-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium">AI Guidance</span>
            <button
              type="button"
              onClick={() => setActiveTab(recAction.targetTab)}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Take Action</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
