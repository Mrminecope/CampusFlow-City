import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Tag, 
  GraduationCap, 
  Award,
  Sparkles,
  Inbox
} from 'lucide-react';
import { AdmissionsEmail, NavigationTab, Application } from '../../types';

interface AdmissionInboxViewProps {
  emails: AdmissionsEmail[];
  applications: Application[];
  isGoogleConnected?: boolean;
  isGoogleAccountConnected?: boolean;
  isGmailConnected?: boolean;
  userEmail?: string;
  onConnectGmail?: () => Promise<void>;
  onDisconnectGmail?: () => void;
  onConnectGoogle?: () => void;
  onRefreshEmails: () => Promise<void>;
  setActiveTab: (tab: NavigationTab) => void;
  isLoading?: boolean;
}

export const AdmissionInboxView: React.FC<AdmissionInboxViewProps> = ({
  emails,
  applications,
  isGoogleConnected = false,
  isGoogleAccountConnected = false,
  isGmailConnected = false,
  userEmail,
  onConnectGmail,
  onDisconnectGmail,
  onConnectGoogle,
  onRefreshEmails,
  setActiveTab,
  isLoading = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEmailId, setSelectedEmailId] = useState<string>(emails[0]?.id || '');
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    'All',
    'Application',
    'Scholarship',
    'Deadline',
    'Interview',
    'Document Request',
    'Admission Decision',
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefreshEmails();
    } finally {
      setRefreshing(false);
    }
  };

  const filteredEmails = emails.filter((email) => {
    const matchesCategory = selectedCategory === 'All' || email.category === selectedCategory;
    const matchesSearch = 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (email.relatedApplicationName && email.relatedApplicationName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (email.requiredAction && email.requiredAction.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || filteredEmails[0] || emails[0];

  // Helper to match linked application
  const linkedApplication = applications.find((app) => 
    app.id === selectedEmail?.relatedApplicationId ||
    (selectedEmail?.relatedApplicationName && app.universityName.toLowerCase().includes(selectedEmail.relatedApplicationName.toLowerCase()))
  );

  const getCategoryBadgeStyle = (category: AdmissionsEmail['category']) => {
    switch (category) {
      case 'Admission Decision':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Interview':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Document Request':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Deadline':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Scholarship':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Application':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getUrgencyBadge = (urgency: AdmissionsEmail['urgency']) => {
    switch (urgency) {
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Urgent Action
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            High Priority
          </span>
        );
      case 'normal':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Standard
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Connection State */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">Admission Inbox</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-red-100 text-red-700 border border-red-200">
                  Gmail Integration
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600">
                  Prototype Data
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Centralize and categorize official university correspondence, document requests, interviews, and offers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {isGoogleConnected ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">Connected to Gmail</span>
                <span className="text-slate-500 hidden sm:inline">({userEmail || 'mrminecope@gmail.com'})</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onConnectGoogle}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg shadow-2xs transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Connect Gmail</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing || isLoading}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              title="Refresh Admissions Emails"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing || isLoading ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Security & Strict Privacy Notice */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Privacy Protection:</strong> Read-only access (<code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">gmail.readonly</code>). CampusFlow strictly <strong>never sends or deletes emails automatically</strong>.
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden lg:inline">AI Analysis Active</span>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => {
            const count = cat === 'All' ? emails.length : emails.filter((e) => e.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search sender, subject, or action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Two-Column Inbox Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Email List (Left Column) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>Admissions Messages ({filteredEmails.length})</span>
            <span className="text-[11px] text-slate-400">Click to preview details</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
            {filteredEmails.length === 0 ? (
              <div className="p-8 text-center">
                <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600">No emails found in this category</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Try selecting "All" or refining your search.</p>
              </div>
            ) : (
              filteredEmails.map((email) => {
                const isSelected = email.id === selectedEmail?.id;
                return (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmailId(email.id)}
                    className={`p-3.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/70 border-l-4 border-l-[#1d4ed8]'
                        : 'hover:bg-slate-50/80 border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                        {email.sender}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0">{email.date}</span>
                    </div>

                    <div className="text-xs font-semibold text-slate-800 line-clamp-1 mb-1.5">
                      {email.subject}
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                      {email.snippet}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getCategoryBadgeStyle(
                          email.category
                        )}`}
                      >
                        {email.category}
                      </span>
                      {getUrgencyBadge(email.urgency)}
                      {email.relatedApplicationName && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {email.relatedApplicationName}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Email Detail (Right Column) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          {selectedEmail ? (
            <div className="p-5 md:p-6 space-y-5">
              {/* Top Meta info */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded border ${getCategoryBadgeStyle(
                        selectedEmail.category
                      )}`}
                    >
                      {selectedEmail.category}
                    </span>
                    {getUrgencyBadge(selectedEmail.urgency)}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{selectedEmail.date}</span>
                </div>

                <h2 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                  {selectedEmail.subject}
                </h2>

                <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">From:</span>
                  <span>{selectedEmail.sender}</span>
                  {selectedEmail.senderEmail && (
                    <span className="text-slate-400">&lt;{selectedEmail.senderEmail}&gt;</span>
                  )}
                </div>
              </div>

              {/* REQUIRED ACTION CARD (Crucial Requirement) */}
              {selectedEmail.requiredAction && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                          Required Action
                        </div>
                        <p className="text-xs font-semibold text-amber-950 mt-0.5 leading-snug">
                          {selectedEmail.requiredAction}
                        </p>
                      </div>
                    </div>

                    {selectedEmail.actionTargetTab && (
                      <button
                        type="button"
                        onClick={() => setActiveTab(selectedEmail.actionTargetTab!)}
                        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                      >
                        <span>Take Action</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* RELATED CAMPUSFLOW APPLICATION (Crucial Requirement) */}
              {selectedEmail.relatedApplicationName && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        Linked CampusFlow Application
                      </div>
                      <div className="text-xs font-bold text-slate-900">
                        {selectedEmail.relatedApplicationName}
                        {linkedApplication && ` • ${linkedApplication.program}`}
                      </div>
                      {linkedApplication && (
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Status: <span className="font-semibold text-blue-700">{linkedApplication.status}</span> ({linkedApplication.progress}% complete)
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('applications')}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <span>View Application</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Email Content Body */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Official Message Content
                </div>
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 text-xs text-slate-700 font-sans leading-relaxed whitespace-pre-line">
                  {selectedEmail.body || selectedEmail.snippet}
                </div>
              </div>

              {/* Quick Actions & Workspace Shortcuts */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('documents')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>My Documents (Drive)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('deadlines')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Admission Calendar</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 italic">
                  Read-only mode • No emails are ever sent or deleted
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">
              <Mail className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs">Select an email to view full content and required actions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
