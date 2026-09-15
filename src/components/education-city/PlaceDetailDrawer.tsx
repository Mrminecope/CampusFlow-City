import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  ArrowLeftRight, 
  Compass, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  DollarSign, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Bot, 
  Share2, 
  HelpCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { EducationCityPlace, UserProfile, EducationPassport, NavigationTab } from '../../types';
import { OpportunityNetworkView } from './OpportunityNetworkView';
import { fetchOpportunityMatchExplanation } from '../../lib/geminiClient';

interface PlaceDetailDrawerProps {
  place: EducationCityPlace | null;
  user: UserProfile;
  passport: EducationPassport;
  onClose: () => void;
  onToggleSave: (placeId: string) => void;
  onToggleJourney: (placeId: string) => void;
  onToggleCompare: (place: EducationCityPlace) => void;
  isSaved: boolean;
  isInJourney: boolean;
  isCompared: boolean;
  onNavigateTab: (tab: NavigationTab) => void;
}

interface GeminiExplanationState {
  matchSummary: string;
  academicFitReason: string;
  networkProgressionExplanation: string;
  financialAndCostAnalysis: string;
  keyAdvantages: string[];
  recommendedImmediateNextStep: string;
  guidanceLabel: string;
  isAiGenerated: boolean;
}

export const PlaceDetailDrawer: React.FC<PlaceDetailDrawerProps> = ({
  place,
  user,
  passport,
  onClose,
  onToggleSave,
  onToggleJourney,
  onToggleCompare,
  isSaved,
  isInJourney,
  isCompared,
  onNavigateTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'network' | 'costs' | 'gemini'>('overview');
  const [geminiExplanation, setGeminiExplanation] = useState<GeminiExplanationState | null>(null);
  const [isLoadingGemini, setIsLoadingGemini] = useState(false);
  const [geminiError, setGeminiError] = useState<string | null>(null);

  if (!place) return null;

  const handleAskGemini = async () => {
    setIsLoadingGemini(true);
    setGeminiError(null);
    setActiveSubTab('gemini');
    try {
      const result = await fetchOpportunityMatchExplanation(user, passport, place);
      setGeminiExplanation(result);
    } catch (err: any) {
      console.error('Error fetching Gemini match explanation:', err);
      setGeminiError('Gemini analysis request paused. Displaying civic evaluation.');
    } finally {
      setIsLoadingGemini(false);
    }
  };

  const getMatchTierBadge = (tier: string) => {
    switch (tier) {
      case 'Strong Match':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Good Match':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Reach':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div 
      id="place-detail-drawer"
      className="bg-white border-l border-slate-200 flex flex-col h-full overflow-hidden shadow-xl"
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-900 text-white">
              {place.category}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
              {place.subCategory}
            </span>
            <span className="text-[10px] font-medium bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
              Prototype Data
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
            title="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {place.name}
        </h2>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span className="line-clamp-1">{place.address}</span>
          {place.distanceKm !== undefined && (
            <span className="shrink-0 font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
              {place.distanceKm.toFixed(1)} km away
            </span>
          )}
        </div>

        {/* Top Metric Bar */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/80">
          <div className="p-2 bg-white rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Student Match</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base font-bold text-slate-900">{place.matchScore}%</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getMatchTierBadge(place.matchTier)}`}>
                {place.matchTier}
              </span>
            </div>
          </div>

          <div className="p-2 bg-white rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Cost</span>
            <div className="text-xs font-bold text-slate-900 mt-0.5 truncate" title={place.estimatedCost.tuitionOrFee}>
              {place.estimatedCost.tuitionOrFee}
            </div>
          </div>
        </div>

        {/* Action Buttons: Save, Journey, Compare, Ask Gemini */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          <button
            type="button"
            onClick={() => onToggleSave(place.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold border transition-all ${
              isSaved
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-600" /> : <Bookmark className="w-4 h-4" />}
            <span className="text-[10px] mt-1">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleJourney(place.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold border transition-all ${
              isInJourney
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] mt-1">{isInJourney ? 'In Journey' : '+ Journey'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleCompare(place)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold border transition-all ${
              isCompared
                ? 'bg-purple-50 border-purple-300 text-purple-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 text-purple-600" />
            <span className="text-[10px] mt-1">{isCompared ? 'Comparing' : 'Compare'}</span>
          </button>

          <button
            type="button"
            onClick={handleAskGemini}
            className="flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold bg-gradient-to-b from-blue-700 to-indigo-800 text-white shadow-2xs hover:opacity-95 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span className="text-[10px] mt-1">Ask Gemini</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-slate-200 px-4 bg-white text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveSubTab('overview')}
          className={`py-3 px-2.5 border-b-2 transition-colors ${
            activeSubTab === 'overview'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Programs & Details
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('network')}
          className={`py-3 px-2.5 border-b-2 transition-colors ${
            activeSubTab === 'network'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Opportunity Network
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('costs')}
          className={`py-3 px-2.5 border-b-2 transition-colors ${
            activeSubTab === 'costs'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Estimated Cost & Aid
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveSubTab('gemini');
            if (!geminiExplanation && !isLoadingGemini) {
              handleAskGemini();
            }
          }}
          className={`py-3 px-2.5 border-b-2 transition-colors flex items-center gap-1 ${
            activeSubTab === 'gemini'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Gemini Match</span>
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {/* OVERVIEW TAB */}
        {activeSubTab === 'overview' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Overview & Civic Mission
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                {place.description}
              </p>
            </div>

            {/* Programs Section */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>Featured Programs & Tracks ({place.programs.length})</span>
                <GraduationCap className="w-4 h-4 text-slate-400" />
              </h4>
              <div className="space-y-2">
                {place.programs.map((program, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 flex items-center justify-between gap-2"
                  >
                    <span>{program}</span>
                    <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold shrink-0">
                      Curriculum
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities Section */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>Available Opportunities & Fellowships</span>
                <Briefcase className="w-4 h-4 text-slate-400" />
              </h4>
              <div className="space-y-2">
                {place.opportunities.map((opp, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-lg border border-emerald-200/80 bg-emerald-50/40 text-xs font-medium text-emerald-950 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{opp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            {place.keyHighlights?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Institutional Strengths
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {place.keyHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* OPPORTUNITY NETWORK TAB */}
        {activeSubTab === 'network' && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
              <p className="font-semibold text-slate-900 mb-1">
                Continuous Education Pipeline
              </p>
              <p>
                CampusFlow connects your verified high school credentials directly to career attainment through this 8-step civic pathway.
              </p>
            </div>

            <OpportunityNetworkView 
              network={place.opportunityNetwork} 
              onNavigateTab={onNavigateTab}
            />
          </div>
        )}

        {/* ESTIMATED COST & FINANCIAL AID TAB */}
        {activeSubTab === 'costs' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Annual Tuition / Program Fee</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  {place.estimatedCost.tuitionOrFee}
                </p>
              </div>

              {place.estimatedCost.livingCost && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Living Expenses</span>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {place.estimatedCost.livingCost}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400">Financial Aid & Scholarship Availability</span>
                <p className="text-xs text-slate-700 mt-1 bg-blue-50/70 p-2.5 rounded-lg border border-blue-200">
                  {place.estimatedCost.financialAid}
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">Student Budget Alignment</p>
              <p>
                Student stated budget: <strong>{user.budget || '$30,000 - $50,000 / yr'}</strong>.
              </p>
              <p className="text-[11px] text-slate-500">
                Data provided as civic planning benchmarks. Consult university registrar for verified invoicing.
              </p>
            </div>
          </div>
        )}

        {/* GEMINI AI EXPLANATION TAB */}
        {activeSubTab === 'gemini' && (
          <div className="space-y-4">
            {isLoadingGemini && (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-800">
                  Gemini is analyzing your Education Passport and {place.name}...
                </p>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Cross-referencing your verified GPA ({user.gpa}), SAT score ({user.satScore}), target major ({user.targetMajor}), and career outcomes.
                </p>
              </div>
            )}

            {!isLoadingGemini && geminiExplanation && (
              <div className="space-y-4">
                <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-blue-700 shrink-0" />
                    <h4 className="text-xs font-bold text-blue-950">
                      Why This Matches Your Student Profile
                    </h4>
                  </div>
                  <p className="text-xs text-blue-900 leading-relaxed">
                    {geminiExplanation.matchSummary}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">
                    Academic Fit & Prerequisites
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {geminiExplanation.academicFitReason}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">
                    Opportunity Pathway Walkthrough
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {geminiExplanation.networkProgressionExplanation}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">
                    Cost & Financial Strategy
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {geminiExplanation.financialAndCostAnalysis}
                  </p>
                </div>

                {geminiExplanation.keyAdvantages?.length > 0 && (
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900">
                      Key Competitive Advantages
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {geminiExplanation.keyAdvantages.map((adv, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-800">
                    Recommended Immediate Next Action
                  </span>
                  <p className="text-xs font-semibold text-emerald-950">
                    {geminiExplanation.recommendedImmediateNextStep}
                  </p>
                </div>

                <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-2 pt-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-medium text-slate-600">
                    {geminiExplanation.guidanceLabel || 'AI-generated guidance'}
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 font-medium text-amber-800">
                    Prototype Data
                  </span>
                </div>
              </div>
            )}

            {!isLoadingGemini && !geminiExplanation && (
              <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <Bot className="w-8 h-8 text-blue-600 mx-auto" />
                <h4 className="text-xs font-bold text-slate-800">
                  Analyze Opportunity Fit with Gemini
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Get a personalized, multi-factor explanation of how this institution connects your Education Passport to career milestones.
                </p>
                <button
                  type="button"
                  onClick={handleAskGemini}
                  className="px-4 py-2 bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold shadow-2xs hover:bg-blue-700 transition-colors"
                >
                  Generate Fit Explanation
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Next Action Bar */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Action</span>
            <span className="text-xs font-bold text-slate-900 block truncate max-w-[180px] sm:max-w-xs">
              {place.nextAction.label}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (place.nextAction.tabTarget) {
                onNavigateTab(place.nextAction.tabTarget);
              }
            }}
            className="px-4 py-2.5 bg-[#1d4ed8] hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span>Proceed</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
