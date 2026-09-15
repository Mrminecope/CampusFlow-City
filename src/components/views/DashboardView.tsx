import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Heart, 
  Send, 
  Headphones, 
  ExternalLink, 
  Clock, 
  HelpCircle, 
  FileCheck, 
  Check,
  Award,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  Zap,
  Target,
  Mail,
  HardDrive,
  Compass
} from 'lucide-react';
import { 
  UserProfile, 
  Application, 
  University, 
  DeadlineItem, 
  NavigationTab,
  StudentDocument,
  Scholarship,
  NextBestAction,
  SingleNextBestAction,
  EducationPassport,
  AdmissionsEmail,
  DriveDocument,
  CalendarDeadlineEvent
} from '../../types';
import { fetchNextBestActions, fetchSingleNextBestAction, sendAdvisorChat } from '../../lib/geminiClient';
import { initialPassport } from '../../data/mockData';
import { EducationInboxWidget } from '../dashboard/EducationInboxWidget';

interface DashboardViewProps {
  user: UserProfile;
  passport?: EducationPassport;
  applications: Application[];
  universities: University[];
  deadlines: DeadlineItem[];
  documents?: StudentDocument[];
  scholarships?: Scholarship[];
  admissionsEmails?: AdmissionsEmail[];
  driveDocuments?: DriveDocument[];
  calendarEvents?: CalendarDeadlineEvent[];
  isGoogleConnected?: boolean;
  setActiveTab: (tab: NavigationTab) => void;
  onSelectUniversity: (uni: University) => void;
  onToggleShortlist: (uniId: string) => void;
  onAskAIAdvisor: (question: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  passport = initialPassport,
  applications,
  universities,
  deadlines,
  documents = [],
  scholarships = [],
  admissionsEmails = [],
  driveDocuments = [],
  calendarEvents = [],
  isGoogleConnected = false,
  setActiveTab,
  onSelectUniversity,
  onToggleShortlist,
  onAskAIAdvisor,
}) => {
  const [quickQuestion, setQuickQuestion] = useState('');
  const [advisorResponse, setAdvisorResponse] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  // Next Best Action State
  const [singleBestAction, setSingleBestAction] = useState<SingleNextBestAction | null>(null);
  const [actions, setActions] = useState<NextBestAction[]>([]);
  const [isLoadingActions, setIsLoadingActions] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [showAdditionalActions, setShowAdditionalActions] = useState(false);

  const recommendedUnis = universities.slice(0, 3);
  const activeApplications = applications.slice(0, 3);
  const upcomingDeadlines = deadlines.slice(0, 3);

  const handleFetchNextBestActions = async () => {
    setIsLoadingActions(true);
    setActionError(null);
    try {
      // 1. Fetch the 7-pillar synthesized SINGLE Next Best Action
      const singleRes = await fetchSingleNextBestAction({
        user,
        passport,
        applications,
        deadlines,
        driveDocuments,
        admissionsEmails,
        calendarEvents,
      });
      if (singleRes) {
        setSingleBestAction(singleRes);
      }

      // 2. Also fetch supplementary multi-actions
      const multiData = await fetchNextBestActions(
        user,
        deadlines,
        applications,
        documents,
        scholarships,
        driveDocuments,
        admissionsEmails,
        calendarEvents
      );
      setActions(multiData);
    } catch (err: any) {
      console.error('Next best action error:', err);
      setActionError(err?.message || 'Failed to compute next best actions with Gemini.');
    } finally {
      setIsLoadingActions(false);
    }
  };

  useEffect(() => {
    handleFetchNextBestActions();
  }, [user.uid]);

  const handleQuickPromptClick = (prompt: string) => {
    setQuickQuestion(prompt);
    executeAdvisorAnswer(prompt);
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;
    executeAdvisorAnswer(quickQuestion);
  };

  const executeAdvisorAnswer = async (query: string) => {
    setIsAnswering(true);
    setAdvisorResponse(null);
    try {
      const res = await sendAdvisorChat(
        user,
        [],
        query,
        {
          applicationsCount: applications.length,
          deadlinesCount: deadlines.length,
          scholarshipsCount: scholarships.length,
        }
      );
      setAdvisorResponse(res.reply);
    } catch (err: any) {
      console.error('Quick advisor error:', err);
      setAdvisorResponse(
        `FlowAI response error: ${err?.message || 'Unable to connect to counselor service.'}. Please retry in the AI Advisor view.`
      );
    } finally {
      setIsAnswering(false);
    }
  };

  const getActionCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'deadline':
        return <Calendar className="w-4 h-4 text-red-600" />;
      case 'application':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'missing_document':
        return <FileCheck className="w-4 h-4 text-amber-600" />;
      case 'scholarship':
        return <Award className="w-4 h-4 text-purple-600" />;
      case 'profile_gap':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* 1. Hero Welcome Banner matching competition requirements */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b2b4f] via-[#103a67] to-[#1e4e8c] text-white shadow-sm">
        {/* Background campus photo blend */}
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&auto=format&fit=crop&q=80')`
          }}
        />

        <div className="relative z-10 p-6 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded-full">
                Education Innovation Platform
              </span>
              <span className="px-2 py-0.5 text-[10px] font-medium bg-white/10 text-blue-100 rounded-full">
                Prototype Data
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                CampusFlow City
              </h1>
              <p className="text-sm md:text-base font-semibold text-blue-200 mt-0.5">
                One Education Network. Every Student.
              </p>
            </div>

            <p className="text-xs md:text-sm text-blue-100/90 font-normal leading-relaxed max-w-xl">
              Unifying verified academic credentials, admissions workflows, Google Workspace productivity, and local urban learning ecosystems.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="hero-explore-unis-btn"
                type="button"
                onClick={() => setActiveTab('universities')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1d4ed8] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <span>Explore Universities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-open-city-btn"
                type="button"
                onClick={() => setActiveTab('city')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/20 backdrop-blur-xs text-white text-xs font-semibold rounded-lg border border-white/25 transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-blue-200" />
                <span>Explore Education City</span>
              </button>

              <button
                id="hero-open-studio-btn"
                type="button"
                onClick={() => setActiveTab('studio')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-xs text-white text-xs font-semibold rounded-lg border border-white/20 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-blue-200" />
                <span>Application Studio</span>
              </button>
            </div>
          </div>

          {/* City Vision Callout on right */}
          <div className="lg:max-w-xs border-l-0 lg:border-l border-white/20 pl-0 lg:pl-6 text-right lg:text-left self-end lg:self-center">
            <blockquote className="text-sm md:text-base font-medium italic text-blue-100 leading-snug">
              “What if your entire city could help you reach your future?”
            </blockquote>
            <cite className="block mt-2 text-xs text-blue-200/80 font-normal not-italic">
              — CampusFlow City Vision
            </cite>
          </div>
        </div>
      </div>

      {/* 2. EDUCATION INBOX: Live Admissions Dispatch */}
      <EducationInboxWidget
        urgentEmail={admissionsEmails.find((e) => e.urgency === 'urgent') || admissionsEmails[0]}
        upcomingDeadline={deadlines.find((d) => !d.completed && d.daysLeft <= 14) || deadlines[0]}
        missingDocumentName={
          driveDocuments.find((d) => d.status === 'Needs Re-upload' || d.category === 'Transcript')?.name ||
          'Official Mid-Year Transcript (Term 1)'
        }
        missingDocumentTarget={
          applications[0]
            ? `${applications[0].universityName} (${applications[0].program})`
            : 'University of Toronto (Computer Science)'
        }
        recommendedAction={
          actions[0]
            ? {
                title: actions[0].title,
                description: actions[0].reason,
                targetTab: actions[0].targetTab,
              }
            : undefined
        }
        setActiveTab={setActiveTab}
        isGoogleConnected={isGoogleConnected}
      />

      {/* 3. YOUR NEXT BEST ACTION: 7-Pillar Synthesis Powered by Gemini */}
      <div className="bg-white rounded-2xl border border-blue-200/90 p-5 md:p-6 shadow-[0_2px_8px_rgba(37,99,235,0.05)] space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-2xs">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Your Next Best Action</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                AI-generated guidance
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                Prototype Data
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Evaluated across your Education Passport, Applications, Deadlines, Drive docs, Gmail admissions, Calendar, and Education City opportunities.
            </p>
          </div>

          <button
            id="dashboard-re-evaluate-action-btn"
            type="button"
            onClick={handleFetchNextBestActions}
            disabled={isLoadingActions}
            className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingActions ? 'animate-spin' : ''}`} />
            <span>{isLoadingActions ? 'Evaluating 7 Pillars...' : 'Re-evaluate Action'}</span>
          </button>
        </div>

        {/* 7 Connected Pillars Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
          <span className="text-[11px] font-semibold text-slate-500">Connected Sources:</span>
          {[
            { label: 'Education Passport', icon: CheckCircle2 },
            { label: 'Applications', icon: FileText },
            { label: 'Deadlines', icon: Clock },
            { label: 'Drive Documents', icon: HardDrive },
            { label: 'Gmail Admissions', icon: Mail },
            { label: 'Calendar Events', icon: Calendar },
            { label: 'Education City', icon: MapPin },
          ].map((src, i) => {
            const Icon = src.icon;
            return (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
              >
                <Icon className="w-3 h-3 text-blue-600" />
                <span>{src.label}</span>
              </span>
            );
          })}
        </div>

        {/* Loading State */}
        {isLoadingActions && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Gemini is synthesizing your passport, upcoming deadlines, portal documents, and city opportunities...
            </div>
          </div>
        )}

        {/* Error State with Retry */}
        {!isLoadingActions && actionError && (
          <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl space-y-2">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-red-900">Priority Evaluation Interrupted</h4>
                <p className="text-xs text-red-700">{actionError}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleFetchNextBestActions}
                className="px-3 py-1 text-xs font-bold text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry Evaluation</span>
              </button>
            </div>
          </div>
        )}

        {/* Single Most Useful Action Card */}
        {!isLoadingActions && !actionError && singleBestAction && (
          <div className="p-5 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/40 border-2 border-blue-200 rounded-xl space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                    Highest Priority
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {singleBestAction.targetEntity || applications[0]?.universityName || 'Admissions Ecosystem'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    {(singleBestAction.urgency || 'urgent').toUpperCase()}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug pt-1">
                  {singleBestAction.actionTitle}
                </h3>
              </div>

              <div className="text-right sm:shrink-0">
                <span className="text-[11px] text-slate-500 flex items-center gap-1 sm:justify-end">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Est. {singleBestAction.estimatedMinutes || 15} mins</span>
                </span>
                <span className="text-[11px] font-medium text-emerald-700">
                  {singleBestAction.impact || 'High Priority'}
                </span>
              </div>
            </div>

            {/* Why This Action Explanation */}
            <div className="p-3.5 bg-white border border-blue-100 rounded-lg space-y-1">
              <div className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Why this is your Next Best Action:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {singleBestAction.whyThisAction || singleBestAction.whyExplanation || 'Synthesized from your active application requirements, imminent deadlines, and unsubmitted documents.'}
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Source Anchor:</span>
                <span className="capitalize">
                  {(singleBestAction.sourceContext || singleBestAction.category || 'admissions').toString().replace(/_/g, ' ')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="dashboard-view-all-priorities-toggle"
                  type="button"
                  onClick={() => setShowAdditionalActions(!showAdditionalActions)}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {showAdditionalActions ? 'Hide Secondary Actions' : `View All Priorities (${actions.length})`}
                </button>

                <button
                  id="dashboard-take-single-best-action-btn"
                  type="button"
                  onClick={() => setActiveTab(singleBestAction.targetTab || 'applications')}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>{singleBestAction.actionButtonText || singleBestAction.actionStep || 'Execute Action'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Optional Secondary Actions Accordion */}
        {!isLoadingActions && !actionError && showAdditionalActions && actions.length > 0 && (
          <div className="pt-2 space-y-3 border-t border-slate-100 animate-in fade-in duration-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Secondary Priorities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {actions.map((act) => (
                <div
                  key={act.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-2.5 ${
                    act.urgency === 'urgent'
                      ? 'border-red-200 bg-red-50/20'
                      : act.urgency === 'high'
                      ? 'border-amber-200 bg-amber-50/20'
                      : 'border-slate-200 bg-slate-50/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                        #{act.priority} • {(act.category || 'action').toString().replace(/_/g, ' ')}
                      </span>
                      <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                        act.urgency === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {(act.urgency || 'normal').toUpperCase()}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-900">{act.title}</h5>
                    <p className="text-[11px] text-slate-600 mt-1">{act.reason}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">{act.action}</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab(act.targetTab || 'applications')}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors flex items-center gap-1"
                    >
                      <span>Go</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Key Metrics Row (4 compact cards) matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Applications */}
        <div 
          onClick={() => setActiveTab('applications')}
          className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 leading-tight">8</div>
                <div className="text-xs font-semibold text-slate-700">Applications</div>
                <div className="text-[11px] text-slate-500">3 in progress</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Metric 2: Universities shortlisted */}
        <div 
          onClick={() => setActiveTab('universities')}
          className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 leading-tight">24</div>
                <div className="text-xs font-semibold text-slate-700">Universities shortlisted</div>
                <div className="text-[11px] text-emerald-600 font-medium">↑ 6 this week</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Metric 3: Upcoming Deadlines */}
        <div 
          onClick={() => setActiveTab('deadlines')}
          className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 leading-tight">5</div>
                <div className="text-xs font-semibold text-slate-700">Upcoming deadlines</div>
                <div className="text-[11px] text-slate-500">Next: 14 Oct 2026</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Metric 4: Profile completion */}
        <div 
          onClick={() => setActiveTab('profile')}
          className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 leading-tight">92%</div>
                <div className="text-xs font-semibold text-slate-700">Profile completion</div>
                <div className="text-[11px] text-blue-600 font-medium hover:underline">Complete profile →</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>

      {/* 3. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Admission Journey, Active Applications, Recommended */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card: Your Admission Journey */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Your Admission Journey</h2>
                <p className="text-xs text-slate-500">Track your progress from exploration to admission.</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('simulator')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View full roadmap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Stepper with horizontal lines matching UI.png */}
            <div className="relative pt-2 pb-1">
              {/* Connector line behind */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-200 z-0" />
              <div className="absolute top-6 left-6 w-1/2 h-0.5 bg-blue-600 z-0" />

              <div className="relative z-10 grid grid-cols-5 text-center gap-1">
                {/* Step 1: Explore (Completed) */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs ring-4 ring-white">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-900">1. Explore</span>
                  <span className="text-[11px] text-emerald-600 font-medium">Completed</span>
                </div>

                {/* Step 2: Plan (Completed) */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs ring-4 ring-white">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-900">2. Plan</span>
                  <span className="text-[11px] text-emerald-600 font-medium">Completed</span>
                </div>

                {/* Step 3: Apply (In Progress) */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs ring-4 ring-white">
                    <div className="w-2.5 h-2.5 bg-white rounded-xs" />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-900">3. Apply</span>
                  <span className="text-[11px] text-blue-600 font-medium">In Progress</span>
                </div>

                {/* Step 4: Track (Upcoming) */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center ring-4 ring-white">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-600">4. Track</span>
                  <span className="text-[11px] text-slate-400">(2 remaining)</span>
                </div>

                {/* Step 5: Admitted (Goal) */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center ring-4 ring-white">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-600">5. Admitted</span>
                  <span className="text-[11px] text-slate-400">Your Goal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Active Applications table matching UI.png */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Active Applications</h2>
              <button
                type="button"
                onClick={() => setActiveTab('applications')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-left text-xs min-w-[620px]">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider pb-2">
                    <th className="py-2.5 pr-3">University</th>
                    <th className="py-2.5 px-3">Program</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 w-36">Progress</th>
                    <th className="py-2.5 px-3">Next Step</th>
                    <th className="py-2.5 pl-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* University + Crest */}
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={app.crestUrl}
                            alt=""
                            className="w-6 h-6 object-contain shrink-0"
                            onError={(e) => {
                              // fallback crest
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <span className="font-semibold text-slate-900">{app.universityName}</span>
                        </div>
                      </td>

                      {/* Program */}
                      <td className="py-3.5 px-3 text-slate-600 font-medium">
                        {app.program}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-3">
                        {app.status === 'Documents Pending' && (
                          <span className="inline-block px-2.5 py-1 text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80 rounded-full whitespace-nowrap">
                            Documents Pending
                          </span>
                        )}
                        {app.status === 'Submitted' && (
                          <span className="inline-block px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full whitespace-nowrap">
                            Submitted
                          </span>
                        )}
                        {app.status === 'In Progress' && (
                          <span className="inline-block px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full whitespace-nowrap">
                            In Progress
                          </span>
                        )}
                      </td>

                      {/* Progress Bar */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700 text-xs w-8">{app.progress}%</span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full transition-all duration-300"
                              style={{ width: `${app.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Next Step */}
                      <td className="py-3.5 px-3 text-slate-600 text-[11px]">
                        {app.nextStep}
                      </td>

                      {/* Action button */}
                      <td className="py-3.5 pl-3 text-right">
                        {app.status === 'Submitted' ? (
                          <button
                            type="button"
                            onClick={() => setActiveTab('applications')}
                            className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
                          >
                            View
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveTab('applications')}
                            className="px-3 py-1 text-xs font-semibold text-blue-600 bg-white border border-blue-400/80 rounded-lg hover:bg-blue-50 transition-colors shadow-2xs"
                          >
                            Continue
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card: Recommended for You (3 cards side by side) */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-slate-900">Recommended for You</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('city')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50/70 hover:bg-blue-100/80 px-2 py-0.5 rounded-md border border-blue-200 transition-colors"
                >
                  <MapPin className="w-3 h-3 text-blue-600" />
                  <span>Google Maps</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('universities')}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <span>View all</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Based on your profile, interests, and academic background.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedUnis.map((uni) => (
                <div
                  key={uni.id}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-white hover:border-slate-300 hover:shadow-sm transition-all flex flex-col group cursor-pointer"
                  onClick={() => onSelectUniversity(uni)}
                >
                  {/* Thumbnail Cover with Heart toggle */}
                  <div className="relative h-28 bg-slate-100 overflow-hidden">
                    <img
                      src={uni.coverImage}
                      alt={uni.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleShortlist(uni.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-red-500 shadow-xs backdrop-blur-xs transition-colors"
                      aria-label="Save university"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          uni.isShortlisted ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                        {uni.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{uni.location}</span>
                      </div>
                    </div>

                    {/* Badges: Top X and Match tier */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 rounded-md">
                        {uni.rankingBadge}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${
                        uni.matchTier === 'Strong Match'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {uni.matchTier}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 font-medium truncate pt-1 border-t border-slate-100">
                      {uni.popularMajors[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Upcoming Deadlines, FlowAI Advisor, Need Help */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Upcoming Deadlines */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Upcoming Deadlines</h2>
              <button
                type="button"
                onClick={() => setActiveTab('deadlines')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {upcomingDeadlines.map((dl) => (
                <div
                  key={dl.id}
                  onClick={() => setActiveTab('deadlines')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {/* Date Block */}
                    <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-sm font-bold text-slate-900 leading-none">{dl.day}</span>
                      <span className="text-[9px] font-bold text-slate-400 tracking-wider mt-0.5">{dl.month}</span>
                    </div>

                    {/* Title and subtitle */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{dl.title}</h4>
                      <p className="text-[11px] text-slate-500">{dl.subtitle}</p>
                    </div>
                  </div>

                  {/* Days left pill */}
                  <div>
                    {dl.daysLeft <= 7 ? (
                      <span className="px-2 py-1 text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 rounded-md whitespace-nowrap">
                        {dl.daysLeft} days left
                      </span>
                    ) : dl.daysLeft <= 14 ? (
                      <span className="px-2 py-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-md whitespace-nowrap">
                        {dl.daysLeft} days left
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 rounded-md whitespace-nowrap">
                        {dl.daysLeft} days left
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: FlowAI Advisor (Beta) */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">FlowAI Advisor</h2>
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700 rounded">
                Beta
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Ask anything about universities, courses, eligibility, requirements, or your application journey.
            </p>

            {/* Quick Prompt Pill Buttons matching screenshot */}
            <div className="space-y-2">
              {[
                'Find universities that match my profile',
                'What are my urgent deadlines?',
                'Suggest scholarships for me',
                'How can I improve my profile?'
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPromptClick(prompt)}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg flex items-center gap-2 transition-colors group"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                  <span className="truncate">{prompt}</span>
                </button>
              ))}
            </div>

            {/* Interactive Advisor Result Box */}
            {isAnswering && (
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-700 animate-pulse flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>FlowAI is reviewing your academic records...</span>
              </div>
            )}

            {advisorResponse && (
              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg text-xs text-slate-800 leading-relaxed space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>Counselor Insights</span>
                  </div>
                  <span className="text-[9px] font-medium text-slate-500 normal-case">
                    AI-generated guidance • Prototype Data
                  </span>
                </div>
                <p>{advisorResponse}</p>
                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onAskAIAdvisor(quickQuestion);
                      setActiveTab('advisor');
                    }}
                    className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Continue full chat in AI Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Chat Input Bar matching screenshot */}
            <form onSubmit={handleSendQuestion} className="relative flex items-center pt-1">
              <input
                id="flowai-quick-input"
                type="text"
                value={quickQuestion}
                onChange={(e) => setQuickQuestion(e.target.value)}
                placeholder="Ask your question..."
                className="w-full pl-3.5 pr-11 py-2 text-xs bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
              <button
                id="flowai-quick-submit"
                type="submit"
                className="absolute right-1.5 p-1.5 bg-[#0a2540] hover:bg-blue-900 text-white rounded-md transition-colors"
                aria-label="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Card: Need help with something? */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-900">Need help with something?</h3>
              <p className="text-[11px] text-slate-500">
                Explore our Help Center or chat with our admissions support team.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('advisor')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 pt-1"
              >
                <span>Get Support</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Footer matching screenshot */}
      <footer className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-2">
          <span>© 2026-2027 CampusFlow. All rights reserved.</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Prototype Data
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <a href="#about" onClick={(e) => e.preventDefault()} className="hover:text-slate-800">About</a>
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-800">Privacy</a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-800">Terms</a>
          <a href="#contact" onClick={(e) => e.preventDefault()} className="hover:text-slate-800">Contact</a>
        </div>
      </footer>
    </div>
  );
};
