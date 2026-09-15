import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Calculator, 
  BookOpen,
  Sparkles,
  ExternalLink,
  Award
} from 'lucide-react';
import { EntranceExam } from '../../types';

interface EntranceExamsViewProps {
  exams: EntranceExam[];
}

export const EntranceExamsView: React.FC<EntranceExamsViewProps> = ({ exams }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'converter'>('overview');
  const [ieltsInput, setIeltsInput] = useState('8.0');

  // Interactive English score equivalencies calculator
  const calculateEquivalencies = (band: number) => {
    if (band >= 8.5) return { toefl: '115 - 120', det: '145 - 160', cefr: 'C2 Proficient' };
    if (band >= 8.0) return { toefl: '110 - 114', det: '135 - 140', cefr: 'C1 Advanced' };
    if (band >= 7.5) return { toefl: '102 - 109', det: '125 - 130', cefr: 'C1 Advanced' };
    if (band >= 7.0) return { toefl: '94 - 101', det: '115 - 120', cefr: 'B2 / C1' };
    if (band >= 6.5) return { toefl: '79 - 93', det: '105 - 110', cefr: 'B2 Competent' };
    return { toefl: '60 - 78', det: '95 - 100', cefr: 'B1 Intermediate' };
  };

  const currentEquiv = calculateEquivalencies(parseFloat(ieltsInput) || 8.0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Entrance Exams & Standardized Testing</h1>
          <p className="text-xs text-slate-500">
            Keep track of testing schedules, institutional cutoffs, preparation strategies, and score concordance.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Exam Schedule & Scores
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('converter')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'converter'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Score Concordance Tool
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded">
                      {exam.category}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded">
                      {exam.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{exam.code}</h3>
                  <div className="text-xs text-slate-500">{exam.name}</div>
                </div>

                {exam.userScore && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Your Score</span>
                    <div className="text-sm font-black text-blue-600 font-mono">{exam.userScore}</div>
                  </div>
                )}
              </div>

              {/* Date & Fee details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Next Test Date</span>
                  <div className="font-semibold text-slate-800">{exam.nextTestDate}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Reg. Deadline</span>
                  <div className="font-semibold text-slate-800">{exam.registrationDeadline}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Exam Fee</span>
                  <div className="font-semibold text-slate-800">{exam.fee}</div>
                </div>
              </div>

              {/* Required by universities */}
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5">
                  Required By Target Universities
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exam.requiredBy.map((uni, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-medium bg-blue-50/70 text-blue-700 rounded border border-blue-100"
                    >
                      {uni}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prep Tips */}
              <div className="pt-2 border-t border-slate-100 text-xs">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  High-Scoring Strategy
                </div>
                <ul className="space-y-1 text-slate-600 text-[11px] list-disc list-inside">
                  {exam.prepTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Score Concordance Tool */
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-6">
          <div className="max-w-xl space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <span>Standardized English Score Concordance Tool</span>
            </h3>
            <p className="text-xs text-slate-500">
              Convert IELTS Academic bands to equivalent scores for TOEFL iBT, Duolingo English Test (DET), and CEFR Framework levels.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 max-w-md space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Select IELTS Academic Band: <span className="text-blue-600 text-sm font-mono">{ieltsInput}</span>
            </label>
            <input
              type="range"
              min="5.5"
              max="9.0"
              step="0.5"
              value={ieltsInput}
              onChange={(e) => setIeltsInput(e.target.value)}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5.5</span>
              <span>6.5</span>
              <span>7.5</span>
              <span>8.5</span>
              <span>9.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1">
              <div className="text-[10px] text-blue-700 font-semibold uppercase">Equivalent TOEFL iBT</div>
              <div className="text-xl font-black text-slate-900 font-mono">{currentEquiv.toefl}</div>
              <div className="text-[10px] text-slate-500">Out of 120 Total Points</div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
              <div className="text-[10px] text-emerald-700 font-semibold uppercase">Equivalent Duolingo (DET)</div>
              <div className="text-xl font-black text-slate-900 font-mono">{currentEquiv.det}</div>
              <div className="text-[10px] text-slate-500">Out of 160 Total Scale</div>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1">
              <div className="text-[10px] text-purple-700 font-semibold uppercase">CEFR European Level</div>
              <div className="text-xl font-black text-slate-900 font-mono">{currentEquiv.cefr}</div>
              <div className="text-[10px] text-slate-500">Council of Europe Standard</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
