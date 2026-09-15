import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  Clock,
  Filter,
  Check
} from 'lucide-react';
import { Scholarship, UserProfile, NavigationTab } from '../../types';

interface ScholarshipsViewProps {
  scholarships: Scholarship[];
  user: UserProfile;
  onApplyScholarship: (scholarshipId: string) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const ScholarshipsView: React.FC<ScholarshipsViewProps> = ({
  scholarships,
  user,
  onApplyScholarship,
}) => {
  const [search, setSearch] = useState('');
  const [coverageFilter, setCoverageFilter] = useState('All');
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const coverages = ['All', 'Full Tuition', 'Partial Tuition', 'One-Time Grant'];

  const filtered = scholarships.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.provider.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCoverage = coverageFilter === 'All' || s.coverageType === coverageFilter;
    return matchesSearch && matchesCoverage;
  });

  const handleApply = (id: string, name: string) => {
    onApplyScholarship(id);
    setAppliedNotice(`Application draft for "${name}" submitted with your CampusFlow Profile Data credentials!`);
    setTimeout(() => setAppliedNotice(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Scholarships & Financial Grants</h1>
          <p className="text-xs text-slate-500">
            Global merit scholarships, tuition remissions, and STEM fellowships matched to your academic profile.
          </p>
        </div>
        <div className="text-xs font-medium text-slate-600 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Your GPA ({user.gpa}) unlocks 5 high-tier awards</span>
        </div>
      </div>

      {appliedNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{appliedNotice}</span>
        </div>
      )}

      {/* Search & Coverage Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scholarship name, university, or benefactor..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {coverages.map((cov) => (
            <button
              key={cov}
              type="button"
              onClick={() => setCoverageFilter(cov)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                coverageFilter === cov
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cov}
            </button>
          ))}
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((sch) => (
          <div
            key={sch.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/70 rounded">
                      {sch.coverageType}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded">
                      {sch.matchScore}% Match
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {sch.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium">
                    {sch.provider}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-extrabold text-blue-700 text-sm">{sch.amount}</div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>Due: {sch.deadline}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {sch.description}
              </p>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <span>Eligibility: Min GPA {sch.gpaRequirement}</span>
                <span className="font-medium text-emerald-700">
                  Your GPA: {user.gpa} (Eligible)
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Target: {sch.targetDegrees.join(', ')}
              </span>

              <button
                type="button"
                onClick={() => handleApply(sch.id, sch.name)}
                disabled={sch.applied}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  sch.applied
                    ? 'bg-slate-100 text-slate-500 cursor-default'
                    : 'bg-[#1d4ed8] hover:bg-blue-700 text-white shadow-2xs'
                }`}
              >
                {sch.applied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Applied</span>
                  </>
                ) : (
                  <>
                    <Award className="w-3.5 h-3.5" />
                    <span>Apply with Passport</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
