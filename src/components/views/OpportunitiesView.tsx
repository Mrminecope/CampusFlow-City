import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  AlertTriangle,
  Building2,
  GraduationCap,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { 
  Opportunity, 
  UserProfile, 
  University, 
  Course, 
  Scholarship, 
  EntranceExam, 
  OpportunityMatchResult,
  NavigationTab 
} from '../../types';
import { fetchOpportunityMatching } from '../../lib/geminiClient';

interface OpportunitiesViewProps {
  opportunities: Opportunity[];
  user?: UserProfile;
  universities?: University[];
  courses?: Course[];
  scholarships?: Scholarship[];
  exams?: EntranceExam[];
  setActiveTab?: (tab: NavigationTab) => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({ 
  opportunities,
  user,
  universities = [],
  courses = [],
  scholarships = [],
  exams = [],
  setActiveTab
}) => {
  const [viewMode, setViewMode] = useState<'matching' | 'fellowships'>('matching');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'university' | 'course' | 'scholarship' | 'exam'>('all');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [appliedId, setAppliedId] = useState<string | null>(null);

  // Gemini Matching State
  const [matches, setMatches] = useState<OpportunityMatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fellowshipTypes = ['All', 'Summer School', 'Research Fellowship', 'Exchange', 'Hackathon'];

  // Prepare items for Gemini to evaluate and rank
  const runOpportunityMatching = async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);

    const itemsToRank = [
      ...universities.slice(0, 4).map((u) => ({
        id: `uni-${u.id}`,
        type: 'university' as const,
        title: u.name,
        institutionOrHost: u.location,
        details: `${u.rankingBadge}. Majors: ${u.popularMajors.join(', ')}. Tuition: ${u.tuitionFee}. Min GPA: ${u.minGpa}, SAT: ${u.minSat}.`,
        requirements: { minGpa: u.minGpa, minSat: u.minSat, acceptanceRate: u.acceptanceRate },
      })),
      ...courses.slice(0, 3).map((c) => ({
        id: `course-${c.id}`,
        type: 'course' as const,
        title: `${c.title} (${c.degreeLevel})`,
        institutionOrHost: c.universityName,
        details: `Duration: ${c.duration}. Tuition: ${c.tuitionPerYear}. Prerequisites: ${c.prerequisites.join(', ')}.`,
        requirements: { prerequisites: c.prerequisites, minGpa: c.minGpa },
      })),
      ...scholarships.slice(0, 3).map((s) => ({
        id: `schol-${s.id}`,
        type: 'scholarship' as const,
        title: s.title,
        institutionOrHost: s.provider,
        details: `Coverage: ${s.coverageType} (${s.amount}). Criteria: ${s.criteria.join(', ')}.`,
        requirements: { minGpa: s.minGpa, criteria: s.criteria },
      })),
      ...exams.slice(0, 2).map((e) => ({
        id: `exam-${e.id}`,
        type: 'exam' as const,
        title: e.name,
        institutionOrHost: e.organizer,
        details: `Score Range: ${e.scoreRange}. Accepted By: ${e.acceptedBy}. Format: ${e.format}.`,
        requirements: { duration: e.duration },
      })),
    ];

    try {
      const results = await fetchOpportunityMatching(user, itemsToRank);
      setMatches(results);
    } catch (err: any) {
      console.error('Opportunity matching error:', err);
      setError(err?.message || 'Failed to rank opportunities with Gemini. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && matches.length === 0) {
      runOpportunityMatching();
    }
  }, [user?.uid]);

  // Filter matched items
  const filteredMatches = matches.filter((m) => {
    const matchesCategory = categoryFilter === 'all' || m.type === categoryFilter;
    const matchesSearch = 
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.institutionOrHost.toLowerCase().includes(search.toLowerCase()) ||
      m.whyItMatches.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter fellowship catalog
  const filteredFellowships = opportunities.filter((o) => {
    const matchesSearch = 
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.host.toLowerCase().includes(search.toLowerCase()) ||
      o.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || o.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'university':
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'course':
        return <GraduationCap className="w-4 h-4 text-indigo-600" />;
      case 'scholarship':
        return <Award className="w-4 h-4 text-amber-600" />;
      case 'exam':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-xl font-bold text-slate-900">Opportunity Matching & Exploration</h1>
            <span className="px-2 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              AI-generated guidance • Gemini 3.8 Flash
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              Based on CampusFlow Prototype Data
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Intelligent admissions match engine evaluating global universities, degree programs, scholarships, and standardized entrance benchmarks.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('matching')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'matching'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Opportunity Matching</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('fellowships')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'fellowships'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Fellowships & Summer Programs</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: GEMINI OPPORTUNITY MATCHING                      */}
      {/* ======================================================== */}
      {viewMode === 'matching' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ranked universities, courses, scholarships, or exams..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All Ranked' },
                { id: 'university', label: 'Universities' },
                { id: 'course', label: 'Courses' },
                { id: 'scholarship', label: 'Scholarships' },
                { id: 'exam', label: 'Entrance Exams' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryFilter(c.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    categoryFilter === c.id
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}

              <button
                type="button"
                onClick={runOpportunityMatching}
                disabled={isLoading}
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0 ml-1"
                title="Re-run Gemini ranking"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Re-rank</span>
              </button>
            </div>
          </div>

          {/* Student Profile Context Banner */}
          {user && (
            <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-blue-900">Evaluated against CampusFlow Profile Data:</span>
                <span className="text-slate-700">
                  GPA {user.gpa ? `${user.gpa}/4.0` : 'Not provided'} • SAT {user.satScore !== undefined ? user.satScore : 'Not provided'} • IELTS {user.ieltsScore !== undefined ? user.ieltsScore : 'Not provided'} • {user.targetMajor || 'Not provided'}
                </span>
              </div>
              <div className="text-[11px] text-blue-700 font-medium shrink-0">
                Target Regions: {(user.targetCountries && user.targetCountries.length > 0) ? user.targetCountries.join(', ') : (user.preferredLocation || 'Not provided')}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="py-16 bg-white rounded-xl border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center animate-pulse">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Gemini is ranking admissions opportunities...</h3>
                <p className="text-xs text-slate-500 max-w-md">
                  Analyzing match percentages, prerequisite fit, GPA safety thresholds, and actionable next steps.
                </p>
              </div>
            </div>
          )}

          {/* Error State with Retry */}
          {!isLoading && error && (
            <div className="p-5 bg-red-50/80 border border-red-200 rounded-xl space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-red-900">Opportunity Matching Service Unavailable</h3>
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={runOpportunityMatching}
                  className="px-3.5 py-1.5 text-xs font-bold text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Opportunity Matching</span>
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredMatches.length === 0 && (
            <div className="py-12 bg-white rounded-xl border border-slate-200/80 text-center space-y-3">
              <p className="text-xs text-slate-500">No opportunities match your search criteria or category filter.</p>
              <button
                type="button"
                onClick={() => { setSearch(''); setCategoryFilter('all'); }}
                className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Matches Grid */}
          {!isLoading && !error && filteredMatches.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMatches.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-blue-200 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top Row: Category + Match Percentage Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-slate-100 rounded-lg">
                          {getCategoryIcon(item.type)}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          {item.type}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-semibold text-slate-600 truncate max-w-[180px]">
                          {item.institutionOrHost}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                          item.matchTier === 'Strong Match'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.matchTier === 'Good Match'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : item.matchTier === 'Reach'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}>
                          {item.matchTier}
                        </span>
                        <div className="flex items-baseline gap-0.5 bg-blue-600 text-white px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold shadow-2xs">
                          <span>{item.matchPercentage}</span>
                          <span className="text-[10px] opacity-90">%</span>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    {/* Why It Matches Box */}
                    <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100/80 space-y-1">
                      <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span>Why It Matches</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.whyItMatches}
                      </p>
                    </div>

                    {/* Missing Requirements List */}
                    {item.missingRequirements && item.missingRequirements.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                          <span>Missing Requirements / Submission Gaps</span>
                        </div>
                        <ul className="space-y-1">
                          {item.missingRequirements.map((req, rIdx) => (
                            <li
                              key={rIdx}
                              className="text-xs text-slate-600 flex items-start gap-1.5 bg-slate-50 p-1.5 rounded border border-slate-100"
                            >
                              <span className="text-amber-500 font-bold shrink-0">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Next Action Footer */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      <div className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="font-bold text-blue-700 shrink-0 mt-0.5">Next Action:</span>
                        <span className="text-slate-600 line-clamp-2">{item.nextAction}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (item.type === 'university') setActiveTab?.('universities');
                          else if (item.type === 'course') setActiveTab?.('courses');
                          else if (item.type === 'scholarship') setActiveTab?.('scholarships');
                          else if (item.type === 'exam') setActiveTab?.('exams');
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-2xs shrink-0 self-end sm:self-auto"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-50">
                      <span>AI-generated guidance</span>
                      <span>Based on CampusFlow Prototype Data</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: FELLOWSHIPS & SUMMER PROGRAMS CATALOG            */}
      {/* ======================================================== */}
      {viewMode === 'fellowships' && (
        <div className="space-y-6">
          {/* Search & Type Filters */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search programs, host institutions, or topics..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {fellowshipTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    typeFilter === t
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Opportunities List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFellowships.map((opp) => (
              <div
                key={opp.id}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded">
                          {opp.type}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-purple-50 text-purple-700 rounded">
                          {opp.tag}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">
                        {opp.title}
                      </h3>
                      <div className="text-xs text-slate-600 font-medium mt-0.5">
                        {opp.host}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{opp.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{opp.duration}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-800 font-medium">
                    {opp.stipendOrFunding}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Deadline: {opp.deadline}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setAppliedId(opp.id);
                      setTimeout(() => setAppliedId(null), 3000);
                    }}
                    className={`px-3.5 py-1.5 font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      appliedId === opp.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#1d4ed8] hover:bg-blue-700 text-white shadow-2xs'
                    }`}
                  >
                    {appliedId === opp.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Registered!</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Opportunity</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
