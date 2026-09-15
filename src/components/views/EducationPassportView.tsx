import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  QrCode, 
  Download, 
  Share2, 
  CheckCircle2, 
  FileCheck, 
  Sparkles, 
  ExternalLink, 
  School, 
  GraduationCap, 
  Calendar, 
  Globe, 
  Copy, 
  Check, 
  RefreshCw, 
  AlertCircle, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { UserProfile, EducationPassport, PassportAnalysisResult } from '../../types';
import { CampusFlowLogo } from '../common/CampusFlowLogo';
import { fetchPassportAnalysis } from '../../lib/geminiClient';

interface EducationPassportViewProps {
  user: UserProfile;
  passport: EducationPassport;
}

export const EducationPassportView: React.FC<EducationPassportViewProps> = ({
  user,
  passport,
}) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Gemini AI Analysis State
  const [analysis, setAnalysis] = useState<PassportAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleRunAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setHasTriggered(true);

    try {
      const data = await fetchPassportAnalysis(user, passport);
      setAnalysis(data);
    } catch (err: any) {
      console.error('Education passport analysis error:', err);
      setError(err?.message || 'Unable to connect to Gemini analysis service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Run analysis automatically once on initial mount
  useEffect(() => {
    handleRunAnalysis();
  }, [user.uid]);

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(passport.qrData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">Digital Education Passport</h1>
            <span className="px-2 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              CampusFlow Profile Data
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              Prototype Data
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Globally verifiable student identity, transcripts, and standardized test credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            {shareSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{shareSuccess ? 'Link Copied!' : 'Share Passport'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official PDF</span>
          </button>
        </div>
      </div>

      {/* Passport Card Visual - Modern Navy Security Credential */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a2540] via-[#0f3460] to-[#16213e] text-white p-6 sm:p-8 shadow-xl border border-blue-900/50">
        {/* Background guilloche security pattern simulation */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden ring-2 ring-blue-400/50 shadow-md shrink-0">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-blue-300">
                Global Student Identity Document
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {user.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-blue-200">
                <span className="flex items-center gap-1">
                  <School className="w-3.5 h-3.5" />
                  {user.currentSchool}
                </span>
                <span>•</span>
                <span>Class of {user.graduationYear}</span>
              </div>
            </div>
          </div>

          <div className="text-left md:text-right space-y-1">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Passport Number
            </div>
            <div className="text-sm sm:text-base font-mono font-bold text-amber-300">
              {passport.passportNumber}
            </div>
            <div className="text-[11px] text-blue-300 font-semibold flex items-center md:justify-end gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              CampusFlow Profile Data
            </div>
          </div>
        </div>

        {/* Passport Grid Details */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/10 text-xs">
          <div>
            <div className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">Cumulative GPA</div>
            <div className="text-lg font-bold text-white mt-0.5">{user.gpa ? `${user.gpa} / ${user.maxGpa || 4.0}` : 'Not provided'}</div>
            <div className="text-[10px] text-blue-300 font-medium">{user.gpa ? 'Recorded GPA' : 'Profile pending'}</div>
          </div>

          <div>
            <div className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">SAT Reasoning</div>
            <div className="text-lg font-bold text-white mt-0.5">{user.satScore !== undefined ? user.satScore : 'Not provided'}</div>
            <div className="text-[10px] text-blue-300">{user.satScore !== undefined ? 'Recorded Benchmark' : 'Profile pending'}</div>
          </div>

          <div>
            <div className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">English Proficiency</div>
            <div className="text-lg font-bold text-white mt-0.5">
              {user.ieltsScore !== undefined ? `IELTS ${user.ieltsScore}` : (user.toeflScore !== undefined ? `TOEFL ${user.toeflScore}` : 'Not provided')}
            </div>
            <div className="text-[10px] text-blue-300">
              {user.ieltsScore !== undefined || user.toeflScore !== undefined ? 'Recorded Benchmark' : 'Profile pending'}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">Valid Period</div>
            <div className="text-xs font-semibold text-white mt-1">{passport.issueDate} - {passport.expiryDate}</div>
            <div className="text-[10px] text-slate-400">Prototype Credential</div>
          </div>
        </div>

        {/* Bottom Bar with QR verification code */}
        <div className="relative z-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Real SVG QR code graphic */}
            <div className="p-2 bg-white rounded-lg shadow-md shrink-0">
              <QrCode className="w-12 h-12 text-slate-900" />
            </div>
            <div className="text-xs space-y-1">
              <div className="text-white font-semibold">Cryptographic Credential Hash</div>
              <div className="font-mono text-[11px] text-blue-200 truncate max-w-xs sm:max-w-md">
                {passport.qrData}
              </div>
              <button
                type="button"
                onClick={handleCopyHash}
                className="text-[11px] text-blue-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Credential hash copied!' : 'Copy credential token'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CampusFlowLogo size="sm" lightText showSubtitle={false} />
          </div>
        </div>
      </div>

      {/* Two Column details: Verified Badges & Subject Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verified Badges */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Profile Badges & Credentials</span>
            </h3>
            <span className="text-xs text-slate-500">{passport.verifiedBadges.length} recorded</span>
          </div>

          <div className="space-y-2.5">
            {passport.verifiedBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{badge.title}</h4>
                    <p className="text-[11px] text-slate-500">{badge.issuedBy} • {badge.date}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded">
                  Prototype Data
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Coursework & Subject Grades */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Academic Coursework Breakdown</span>
            </h3>
            <span className="text-xs text-blue-700 font-semibold">CampusFlow Profile Data</span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
            {passport.academicScores.map((score, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 px-3 hover:bg-slate-50 text-xs">
                <div>
                  <span className="font-semibold text-slate-900">{score.subject}</span>
                  <span className="text-[10px] text-slate-400 ml-2">({score.level})</span>
                </div>
                <div className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {score.grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Real Gemini Education Passport AI Analysis Section */}
      <div className="bg-white rounded-2xl border border-blue-200/80 p-6 shadow-[0_2px_8px_rgba(37,99,235,0.04)] space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Education Passport AI Evaluation</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                AI-generated guidance • Gemini 3.8 Flash
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                Based on CampusFlow Prototype Data
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Rigorous evaluation analyzing grades, subjects, technical skills, interests, career goals, budget, and locations.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRunAnalysis}
            disabled={isLoading}
            className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50 self-start sm:self-auto shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Analyzing...' : 'Re-run Passport AI'}</span>
          </button>
        </div>

        {/* Analyzed Profile Criteria Tags */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Grades & Tests</span>
            <span className="font-semibold text-slate-800">
              GPA {user.gpa ? `${user.gpa}/4.0` : 'Not provided'} • SAT {user.satScore !== undefined ? user.satScore : 'Not provided'} • IELTS {user.ieltsScore !== undefined ? user.ieltsScore : 'Not provided'}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Career</span>
            <span className="font-semibold text-slate-800 truncate block">{user.careerGoal || 'Not provided'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Annual Budget</span>
            <span className="font-semibold text-slate-800 truncate block">{user.budget || 'Not provided'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Regions</span>
            <span className="font-semibold text-slate-800 truncate block">
              {(user.targetCountries && user.targetCountries.length > 0) ? user.targetCountries.join(', ') : (user.preferredLocation || 'Not provided')}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center animate-pulse">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Gemini is evaluating your Education Passport...</h3>
              <p className="text-xs text-slate-500 max-w-md">
                Analyzing transcript coursework, AP calculus/physics rigor, programming proficiencies, and institutional prerequisites.
              </p>
            </div>
          </div>
        )}

        {/* Error State with Retry */}
        {!isLoading && error && (
          <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-red-900">Education Passport Evaluation Error</h3>
                <p className="text-xs text-red-700">{error}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleRunAnalysis}
                className="px-3 py-1.5 text-xs font-bold text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Gemini Analysis</span>
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && !analysis && (
          <div className="py-8 text-center space-y-3">
            <p className="text-xs text-slate-500">No evaluation conducted yet. Click below to initiate analysis.</p>
            <button
              type="button"
              onClick={handleRunAnalysis}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              Analyze Education Passport
            </button>
          </div>
        )}

        {/* Active Analysis Content */}
        {!isLoading && !error && analysis && (
          <div className="space-y-6">
            {/* Executive Summary */}
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Holistic Admission Evaluation</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-normal">
                {analysis.summary}
              </p>
            </div>

            {/* Strengths & Gaps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Strengths */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Validated Strengths ({analysis.strengths.length})</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Competitive Edge
                  </span>
                </div>

                <div className="space-y-3">
                  {analysis.strengths.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{s.title}</h4>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded shrink-0">
                          {s.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
                      {s.evidence && (
                        <div className="text-[11px] text-emerald-800 font-mono font-medium pt-1 border-t border-emerald-100/80">
                          Evidence: {s.evidence}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Identified Gaps */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Identified Gaps & Vulnerabilities ({analysis.gaps.length})</span>
                  </h3>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Mitigation Required
                  </span>
                </div>

                <div className="space-y-3">
                  {analysis.gaps.map((g, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/30 space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{g.title}</h4>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wider ${
                          g.riskLevel === 'high'
                            ? 'bg-red-100 text-red-700'
                            : g.riskLevel === 'medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {g.riskLevel} Risk
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>
                      {g.mitigation && (
                        <div className="text-[11px] text-amber-900 font-medium pt-1 border-t border-amber-100/80 flex items-start gap-1">
                          <span className="font-bold shrink-0">Mitigation:</span>
                          <span>{g.mitigation}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Improvements */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Strategic Action Plan & Recommended Improvements ({analysis.recommendedImprovements.length})</span>
                </h3>
                <span className="text-[10px] font-semibold text-slate-500">
                  Prioritized by Admissions Impact
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {analysis.recommendedImprovements.map((imp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{imp.title}</h4>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          imp.priority === 'High'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {imp.priority} Priority
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{imp.action}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{imp.timeline}</span>
                      </span>
                      <span className="font-semibold text-blue-700">
                        {imp.expectedImpact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advisory Footer */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-500 gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[10px]">
                  AI-generated guidance
                </span>
                <span className="font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px]">
                  Based on CampusFlow Prototype Data
                </span>
                <span>• Evaluated at {new Date(analysis.analyzedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <span className="text-slate-500 font-medium text-[10px]">Advisory tool — not a guarantee of admission.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
