import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Building2, 
  MapPin, 
  DollarSign, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Plus
} from 'lucide-react';
import { University, NavigationTab } from '../../types';

interface CompareViewProps {
  universities: University[];
  onApplyUniversity: (uni: University) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  universities,
  onApplyUniversity,
  setActiveTab,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    universities[0]?.id || 'u-1',
    universities[1]?.id || 'u-2',
    universities[2]?.id || 'u-3',
  ]);

  const selectedUnis = selectedIds
    .map(id => universities.find(u => u.id === id))
    .filter((u): u is University => !!u);

  const handleSelectUni = (index: number, newId: string) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">Institutional Comparison & Insights</h1>
            <span className="px-2 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full flex items-center gap-1">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Side-by-Side Matrix
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Audit admissions selectivity, tuition costs, scholarship coverage, and prerequisite requirements.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('universities')}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs self-start sm:self-auto"
        >
          View All Universities
        </button>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px] divide-y divide-slate-100">
            {/* Table Header: Uni Selection Dropdowns & Photos */}
            <thead>
              <tr className="bg-slate-50/70 divide-x divide-slate-100">
                <th className="p-4 w-48 font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                  Metric / Factor
                </th>
                {selectedUnis.map((uni, idx) => (
                  <th key={idx} className="p-4 w-72">
                    <div className="space-y-2">
                      <select
                        value={uni.id}
                        onChange={(e) => handleSelectUni(idx, e.target.value)}
                        className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {universities.map(u => (
                          <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                      </select>

                      <div className="relative h-24 rounded-lg overflow-hidden border border-slate-200">
                        <img
                          src={uni.coverImage}
                          alt={uni.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-white/90 backdrop-blur-xs text-blue-900 rounded shadow-xs">
                          Rank #{uni.ranking}
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* Location & Country */}
              <tr className="divide-x divide-slate-100 hover:bg-slate-50/40">
                <td className="p-3.5 px-4 font-semibold text-slate-500 text-[11px]">Location & Hub</td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-3.5 px-4 text-slate-800 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{uni.location}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Match Score & Tier */}
              <tr className="divide-x divide-slate-100 hover:bg-slate-50/40">
                <td className="p-3.5 px-4 font-semibold text-slate-500 text-[11px]">Your Match Odds</td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{uni.matchScore}%</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        uni.matchTier === 'Strong Match'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {uni.matchTier}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Annual Tuition */}
              <tr className="divide-x divide-slate-100 hover:bg-slate-50/40">
                <td className="p-3.5 px-4 font-semibold text-slate-500 text-[11px]">Annual Tuition (Intl)</td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-3.5 px-4 font-bold text-blue-700 font-mono text-xs">
                    {uni.tuitionPerYear}
                  </td>
                ))}
              </tr>

              {/* Living Cost */}
              <tr className="divide-x divide-slate-100 hover:bg-slate-50/40">
                <td className="p-3.5 px-4 font-semibold text-slate-500 text-[11px]">Estimated Living Cost</td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-3.5 px-4 text-slate-700">
                    {uni.livingCosts}
                  </td>
                ))}
              </tr>

              {/* Minimum GPA Requirement */}
              <tr className="divide-x divide-slate-100 hover:bg-slate-50/40">
                <td className="p-3.5 px-4 font-semibold text-slate-500 text-[11px]">Min GPA Threshold</td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-3.5 px-4">
                    <span className="font-semibold text-slate-900">{uni.requirements.minGpa} / 4.0</span>
                  </td>
                ))}
              </tr>

              {/* Acceptance Rate */}
              <tr className="divide-x divide-slate-100 hover:bg-slate-50/40">
                <td className="p-3.5 px-4 font-semibold text-slate-500 text-[11px]">Admissions Acceptance Rate</td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-3.5 px-4 text-slate-700">
                    {uni.acceptanceRate}
                  </td>
                ))}
              </tr>

              {/* Standardized Tests Accepted */}
              <tr className="divide-x divide-slate-100 hover:bg-slate-50/40">
                <td className="p-3.5 px-4 font-semibold text-slate-500 text-[11px]">Accepted Standardized Tests</td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {uni.requirements.tests.map((test, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px]">
                          {test}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Popular Majors */}
              <tr className="divide-x divide-slate-100 hover:bg-slate-50/40">
                <td className="p-3.5 px-4 font-semibold text-slate-500 text-[11px]">Popular Programs</td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-3.5 px-4">
                    <ul className="list-disc list-inside text-slate-600 space-y-0.5 text-[11px]">
                      {uni.popularMajors.slice(0, 3).map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Action Buttons */}
              <tr className="divide-x divide-slate-100 bg-slate-50/30">
                <td className="p-4 font-semibold text-slate-500 text-[11px]">Next Steps</td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-4">
                    <button
                      type="button"
                      onClick={() => onApplyUniversity(uni)}
                      className="w-full py-2 bg-[#1d4ed8] hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors shadow-2xs text-center"
                    >
                      Start Application
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
