import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Heart, 
  Search, 
  SlidersHorizontal, 
  ExternalLink, 
  X, 
  Check, 
  DollarSign, 
  Sparkles,
  Award,
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { University, NavigationTab } from '../../types';

interface UniversitiesViewProps {
  universities: University[];
  onToggleShortlist: (uniId: string) => void;
  onApplyUniversity: (uni: University) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const UniversitiesView: React.FC<UniversitiesViewProps> = ({
  universities,
  onToggleShortlist,
  onApplyUniversity,
  setActiveTab,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [activeUniModal, setActiveUniModal] = useState<University | null>(null);

  const countries = ['All', 'Canada', 'Singapore', 'Switzerland', 'Australia', 'United Kingdom', 'United States', 'Netherlands'];
  const matchTiers = ['All', 'Strong Match', 'Good Match', 'Reach'];

  const filteredUnis = universities.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase()) ||
      u.popularMajors.some(m => m.toLowerCase().includes(search.toLowerCase()));
    const matchesCountry = selectedCountry === 'All' || u.country.toLowerCase() === selectedCountry.toLowerCase();
    const matchesTier = selectedTier === 'All' || u.matchTier === selectedTier;
    return matchesSearch && matchesCountry && matchesTier;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Explore Global Universities</h1>
          <p className="text-xs text-slate-500">
            Discover accredited institutions across top academic hubs with personalized eligibility match scores.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900">{filteredUnis.length}</span> institutions
        </div>
      </div>

      {/* Search & Country Filter Tabs */}
      <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search university name, city, or major..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          {/* Match Tier Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 hidden md:inline">Match:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-700 font-medium"
            >
              {matchTiers.map((tier) => (
                <option key={tier} value={tier}>{tier === 'All' ? 'All Matches' : tier}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Country Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          {countries.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCountry(c)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCountry === c
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* University Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUnis.map((uni) => (
          <div
            key={uni.id}
            onClick={() => setActiveUniModal(uni)}
            className="bg-white rounded-xl border border-slate-200/90 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Cover Photo with Badges and Shortlist Heart */}
              <div className="relative h-36 bg-slate-100 overflow-hidden">
                <img
                  src={uni.coverImage}
                  alt={uni.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-white/90 backdrop-blur-xs text-blue-800 rounded shadow-xs">
                    World #{uni.ranking}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded shadow-xs backdrop-blur-xs ${
                    uni.matchTier === 'Strong Match'
                      ? 'bg-emerald-500/90 text-white'
                      : uni.matchTier === 'Good Match'
                      ? 'bg-blue-600/90 text-white'
                      : 'bg-amber-500/90 text-white'
                  }`}>
                    {uni.matchScore}% Match
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleShortlist(uni.id);
                  }}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-red-500 shadow-sm backdrop-blur-xs transition-colors"
                  aria-label="Toggle shortlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      uni.isShortlisted ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                      {uni.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{uni.location}</span>
                    </div>
                  </div>

                  <img
                    src={uni.crestUrl}
                    alt=""
                    className="w-8 h-8 object-contain shrink-0"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {uni.description}
                </p>

                {/* Key metrics row */}
                <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Tuition</span>
                    <div className="font-semibold text-slate-800 text-xs truncate">{uni.tuitionPerYear}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Acceptance Rate</span>
                    <div className="font-semibold text-slate-800 text-xs">{uni.acceptanceRate}</div>
                  </div>
                </div>

                {/* Popular Majors tags */}
                <div className="flex flex-wrap gap-1">
                  {uni.popularMajors.slice(0, 2).map((major, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 rounded"
                    >
                      {major}
                    </span>
                  ))}
                  {uni.popularMajors.length > 2 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                      +{uni.popularMajors.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 pt-0 flex items-center justify-between gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveUniModal(uni);
                }}
                className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center"
              >
                Details
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('city');
                }}
                className="py-1.5 px-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors text-center flex items-center justify-center gap-1"
                title="View on Google Maps"
              >
                <MapPin className="w-3 h-3 text-blue-600" />
                <span className="hidden sm:inline">Map</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onApplyUniversity(uni);
                }}
                className="flex-1 py-1.5 text-xs font-semibold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg transition-colors text-center shadow-2xs"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* University Detail Modal */}
      {activeUniModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header Cover */}
            <div className="relative h-44 bg-slate-900 shrink-0">
              <img
                src={activeUniModal.coverImage}
                alt={activeUniModal.name}
                className="w-full h-full object-cover opacity-60"
              />
              <button
                type="button"
                onClick={() => setActiveUniModal(null)}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div className="text-white space-y-1">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-600 rounded">
                    World Ranking #{activeUniModal.ranking}
                  </span>
                  <h2 className="text-xl font-bold">{activeUniModal.name}</h2>
                  <p className="text-xs text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeUniModal.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5">Overview</h4>
                <p className="text-slate-600 leading-relaxed">{activeUniModal.description}</p>
              </div>

              {/* Requirements & Admissions criteria */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Min GPA</span>
                  <div className="font-bold text-slate-800 text-sm mt-0.5">{activeUniModal.requirements.minGpa} / 4.0</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Est. Tuition</span>
                  <div className="font-bold text-slate-800 text-sm mt-0.5 truncate">{activeUniModal.tuitionPerYear}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Acceptance</span>
                  <div className="font-bold text-slate-800 text-sm mt-0.5">{activeUniModal.acceptanceRate}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Living Cost</span>
                  <div className="font-bold text-slate-800 text-sm mt-0.5 truncate">{activeUniModal.livingCosts}</div>
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-2">Required Application Documents</h4>
                <div className="flex flex-wrap gap-2">
                  {activeUniModal.requirements.documents.map((doc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 font-medium rounded-md border border-blue-100 flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-blue-600" />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Majors */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-2">Popular Degree Programs</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeUniModal.popularMajors.map((major, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                      <span className="font-medium text-slate-800">{major}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
              <a
                href={activeUniModal.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Visit Official Admissions Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('city');
                    setActiveUniModal(null);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5"
                  title="View on Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>View on Map</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleShortlist(activeUniModal.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    activeUniModal.isShortlisted
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {activeUniModal.isShortlisted ? 'Shortlisted' : 'Save to Shortlist'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onApplyUniversity(activeUniModal);
                    setActiveUniModal(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
