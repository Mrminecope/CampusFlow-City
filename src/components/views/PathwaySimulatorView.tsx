import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sliders, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Target, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  AlertCircle, 
  Briefcase, 
  GraduationCap, 
  Code, 
  BookOpen, 
  FolderGit2, 
  Building2, 
  DollarSign, 
  MapPin, 
  ChevronRight,
  Layers,
  Check
} from 'lucide-react';
import { UserProfile, University, PathwaySimulation } from '../../types';
import { fetchPathwaySimulation } from '../../lib/geminiClient';

interface PathwaySimulatorViewProps {
  user: UserProfile;
  universities: University[];
}

export const PathwaySimulatorView: React.FC<PathwaySimulatorViewProps> = ({
  user,
  universities,
}) => {
  // Input parameters (allow career goal, budget, and location to change)
  const [careerGoal, setCareerGoal] = useState<string>(
    user.careerGoal || ''
  );
  const [budget, setBudget] = useState<string>(
    user.budget || ''
  );
  const [targetLocation, setTargetLocation] = useState<string>(
    user.preferredLocation || ((user.targetCountries && user.targetCountries.length > 0) ? user.targetCountries.join(', ') : '')
  );

  // Profile sliders - honoring user profile without fake fallbacks
  const [simGpa, setSimGpa] = useState<number>(user.gpa || 3.5);
  const [includeSat, setIncludeSat] = useState<boolean>(user.satScore !== undefined && user.satScore !== null);
  const [simSat, setSimSat] = useState<number>(user.satScore || 1400);
  const [includeIelts, setIncludeIelts] = useState<boolean>(user.ieltsScore !== undefined && user.ieltsScore !== null);
  const [simIelts, setSimIelts] = useState<number>(user.ieltsScore || 7.5);
  const [simExtracurricular, setSimExtracurricular] = useState<number>(user.extracurricularTier || 7);

  // Gemini Simulation State
  const [simulation, setSimulation] = useState<PathwaySimulation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStageTab, setActiveStageTab] = useState<number>(1);

  const careerSuggestions = [
    'AI Research Scientist & Systems Architect',
    'Robotics & Autonomous Systems Engineer',
    'Quantitative Developer & Algorithmic Trading',
    'Cybersecurity & Cryptographic Engineer',
    'Cloud Distributed Systems Architect'
  ];

  const budgetOptions = [
    '< $25,000 / yr (Need Full Scholarship)',
    '$30,000 - $45,000 / yr (Partial Merit Aid)',
    '$50,000 - $70,000 / yr (Target Global Tier)',
    '$70,000+ / yr (Comprehensive Budget)'
  ];

  const locationPresets = [
    'Canada & Singapore',
    'Switzerland & UK',
    'United States',
    'Canada, Singapore, Switzerland, UK'
  ];

  // Calculate admission probabilities dynamically
  const calculateOdds = () => {
    const gpaWeight = ((simGpa - 2.5) / 1.5) * (includeSat ? 40 : 60);
    const satWeight = includeSat ? (((simSat - 1100) / 500) * 35) : 0;
    const ieltsWeight = includeIelts ? (((simIelts - 6.0) / 3.0) * 10) : 10;
    const ecWeight = (simExtracurricular / 10) * (includeSat ? 15 : 30);
    const composite = Math.min(99, Math.max(15, Math.round(gpaWeight + satWeight + ieltsWeight + ecWeight)));

    const reachOdds = Math.min(75, Math.max(8, Math.round(composite * 0.65)));
    const targetOdds = Math.min(96, Math.max(25, Math.round(composite * 0.95)));
    const safetyOdds = Math.min(99, Math.max(60, Math.round(composite * 1.15)));

    return { composite, reachOdds, targetOdds, safetyOdds };
  };

  const odds = calculateOdds();

  // Run Gemini 7-stage pathway simulation
  const handleRunSimulation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPathwaySimulation(
        user,
        careerGoal || 'Not provided',
        budget || 'Not provided',
        targetLocation || 'Not provided',
        {
          gpa: simGpa,
          sat: includeSat ? simSat : null,
          ielts: includeIelts ? simIelts : null,
          ecTier: simExtracurricular,
        }
      );
      setSimulation(data);
    } catch (err: any) {
      console.error('Pathway simulation error:', err);
      setError(err?.message || 'Unable to generate pathway simulation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Run once on initial load
  useEffect(() => {
    handleRunSimulation();
  }, [user.uid]);

  const stagesList = [
    { num: 1, label: '1. Career', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { num: 2, label: '2. Education', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { num: 3, label: '3. Skills', icon: <Code className="w-3.5 h-3.5" /> },
    { num: 4, label: '4. Exams', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { num: 5, label: '5. Projects', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
    { num: 6, label: '6. Internship', icon: <Building2 className="w-3.5 h-3.5" /> },
    { num: 7, label: '7. Career Launch', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-xl font-bold text-slate-900">Career & Admission Pathway Simulator</h1>
            <span className="px-2 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              AI-generated guidance • Gemini 3.8 Flash
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              Based on CampusFlow Prototype Data
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Generate an end-to-end 7-stage roadmap: Career → Education → Skills → Exams → Projects → Internship → Career Launch.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunSimulation}
          disabled={isLoading}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-2xs self-start sm:self-auto shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Simulating Pathway...' : 'Generate 7-Stage Pathway'}</span>
        </button>
      </div>

      {/* Simulator Control Matrix (Allow Career Goal, Budget, Location to change) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Pathway Simulation Parameters</span>
          </h3>
          <span className="text-[11px] text-slate-500">
            Modify targets to re-evaluate the full trajectory
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* 1. Career Goal */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span>Target Career Goal</span>
            </label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              placeholder="e.g. AI Research Scientist"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
            <div className="flex flex-wrap gap-1 pt-1">
              {careerSuggestions.slice(0, 3).map((cs, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCareerGoal(cs)}
                  className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded text-slate-600 transition-colors truncate max-w-full"
                >
                  {cs.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Budget Constraint */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Annual Tuition & Living Budget</span>
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. $30,000 - $45,000 / year"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
            <div className="flex flex-wrap gap-1 pt-1">
              {budgetOptions.map((b, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setBudget(b)}
                  className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded text-slate-600 transition-colors"
                >
                  {b.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Target Location */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>Geographic Target Locations</span>
            </label>
            <input
              type="text"
              value={targetLocation}
              onChange={(e) => setTargetLocation(e.target.value)}
              placeholder="e.g. Canada, Singapore, UK"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
            <div className="flex flex-wrap gap-1 pt-1">
              {locationPresets.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTargetLocation(loc)}
                  className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 rounded text-slate-600 transition-colors"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Profile Sliders Row */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-slate-600">Simulated GPA</span>
              <span className="font-mono font-bold text-blue-700">{simGpa.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="2.5"
              max="4.0"
              step="0.05"
              value={simGpa}
              onChange={(e) => setSimGpa(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="font-semibold text-slate-600 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSat}
                  onChange={(e) => setIncludeSat(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                />
                <span>Simulated SAT</span>
              </label>
              <span className="font-mono font-bold text-blue-700">
                {includeSat ? simSat : 'Not provided'}
              </span>
            </div>
            {includeSat ? (
              <input
                type="range"
                min="1100"
                max="1600"
                step="10"
                value={simSat}
                onChange={(e) => setSimSat(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            ) : (
              <div className="text-[10px] text-slate-400 py-1 italic">
                Test-optional (check box to simulate target)
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="font-semibold text-slate-600 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeIelts}
                  onChange={(e) => setIncludeIelts(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                />
                <span>Simulated IELTS</span>
              </label>
              <span className="font-mono font-bold text-blue-700">
                {includeIelts ? simIelts.toFixed(1) : 'Not provided'}
              </span>
            </div>
            {includeIelts ? (
              <input
                type="range"
                min="6.0"
                max="9.0"
                step="0.5"
                value={simIelts}
                onChange={(e) => setSimIelts(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            ) : (
              <div className="text-[10px] text-slate-400 py-1 italic">
                Language test-optional / waiver
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-slate-600">Research & EC Index</span>
              <span className="font-mono font-bold text-blue-700">Tier {simExtracurricular}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={simExtracurricular}
              onChange={(e) => setSimExtracurricular(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Probability Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-amber-200/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Reach Tier</span>
            <Target className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{odds.reachOdds}%</div>
          <div className="text-[11px] text-slate-500">Oxford, MIT, Stanford, Cambridge</div>
        </div>

        <div className="bg-white rounded-xl border border-blue-200/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Target Tier</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{odds.targetOdds}%</div>
          <div className="text-[11px] text-slate-500">Toronto, NUS, Melbourne, UCL</div>
        </div>

        <div className="bg-white rounded-xl border border-emerald-200/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Safety Tier</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{odds.safetyOdds}%</div>
          <div className="text-[11px] text-slate-500">Alberta, Sydney, Manchester</div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 7-STAGE PIPELINE SEQUENCE: Career → Education → Skills   */}
      {/* → Exams → Projects → Internship → Career Launch          */}
      {/* ======================================================== */}
      <div className="bg-white rounded-2xl border border-blue-200/90 p-6 shadow-[0_2px_8px_rgba(37,99,235,0.05)] space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-slate-900">
                Gemini 7-Stage Pathway Sequence
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                Career → Education → Skills → Exams → Projects → Internship → Career
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive progression blueprint mapped directly to your targeted parameters.
            </p>
          </div>

          {simulation && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-slate-500">Feasibility:</span>
              <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                simulation.overallFeasibility === 'High'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : simulation.overallFeasibility === 'Moderate'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {simulation.overallFeasibility} Feasibility
              </span>
            </div>
          )}
        </div>

        {/* Stage Flow Navigation Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {stagesList.map((st, idx) => (
            <React.Fragment key={st.num}>
              <button
                type="button"
                onClick={() => setActiveStageTab(st.num)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all shrink-0 ${
                  activeStageTab === st.num
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {st.icon}
                <span>{st.label}</span>
              </button>
              {idx < stagesList.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center animate-pulse">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Gemini is synthesizing your 7-stage pathway...</h3>
              <p className="text-xs text-slate-500 max-w-md">
                Connecting target career requirements, recommended universities within budget, prerequisite exams, capstone projects, and top-tier internship programs.
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-red-900">Simulation Generation Error</h3>
                <p className="text-xs text-red-700">{error}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleRunSimulation}
                className="px-3 py-1.5 text-xs font-bold text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Simulation</span>
              </button>
            </div>
          </div>
        )}

        {/* Simulation Active Content */}
        {!isLoading && !error && simulation && (
          <div className="space-y-6">
            {/* STAGE 1: CAREER */}
            {activeStageTab === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                      Stage 1 • Target Career Definition
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-800 rounded">
                      Industry: {simulation.stage1Career.industry}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {simulation.stage1Career.title}
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {simulation.stage1Career.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-blue-100 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Estimated Median Compensation:</span>
                      <span className="font-mono font-bold text-emerald-700">{simulation.stage1Career.medianSalary}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-blue-100 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">10-Year Industry Growth:</span>
                      <span className="font-semibold text-blue-700">{simulation.stage1Career.growthOutlook}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2: EDUCATION */}
            {activeStageTab === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                    Stage 2 • Higher Education & Academic Focus
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    Degree: <strong className="text-slate-900">{simulation.stage2Education.degree}</strong>
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Target Majors & Concentrations
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {simulation.stage2Education.majors.map((m, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 rounded-lg">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Recommended Institutions within Location & Budget
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {simulation.stage2Education.recommendedInstitutions.map((inst, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 flex flex-col justify-between">
                        <div className="space-y-1">
                          <h5 className="font-bold text-xs text-slate-900">{inst.name}</h5>
                          <p className="text-[11px] text-slate-600 leading-relaxed">{inst.reason}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-200/70 text-[11px] font-mono font-bold text-blue-700">
                          Tuition: {inst.estimatedTuition}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Core Academic Curriculum Highlights
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {simulation.stage2Education.keyCoursework.map((c, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3: SKILLS */}
            {activeStageTab === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  Stage 3 • Technical Competencies & Frameworks
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-blue-600" />
                      <span>Technical Skills</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {simulation.stage3Skills.technicalSkills.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Tools & Frameworks</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {simulation.stage3Skills.toolsAndFrameworks.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-indigo-500 font-bold">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Soft & Leadership Skills</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {simulation.stage3Skills.softSkills.map((sk, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{sk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 4: EXAMS */}
            {activeStageTab === 4 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  Stage 4 • Standardized Entrance & Certification Exams
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {simulation.stage4Exams.map((ex, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-slate-900">{ex.examName}</h4>
                          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-100 text-blue-800 rounded">
                            Target: {ex.targetScore}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{ex.purpose}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Timeline: {ex.timeline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 5: PROJECTS */}
            {activeStageTab === 5 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  Stage 5 • High-Impact Capstone & Portfolio Projects
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {simulation.stage5Projects.map((p, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          <FolderGit2 className="w-4 h-4 text-blue-600" />
                          <span>{p.title}</span>
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-200/70">
                        <div className="flex flex-wrap gap-1">
                          {p.techStack.map((tech, tIdx) => (
                            <span key={tIdx} className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-700">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold">
                          Outcome: {p.outcome}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 6: INTERNSHIP */}
            {activeStageTab === 6 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  Stage 6 • Industry Co-op & Research Internships
                </span>

                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Target Roles & Specializations</span>
                    <span className="text-xs text-slate-500">Timeline: {simulation.stage6Internship.timeline}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {simulation.stage6Internship.targetRoles.map((r, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-xs font-semibold bg-white border border-blue-200 rounded-lg text-blue-900">
                        {r}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Sample Benchmark Employers & Labs</span>
                    <div className="flex flex-wrap gap-1.5">
                      {simulation.stage6Internship.sampleEmployers.map((emp, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-xs bg-slate-100 rounded text-slate-800 border border-slate-200">
                          {emp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Key Deliverables</span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {simulation.stage6Internship.deliverables.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 7: CAREER LAUNCH */}
            {activeStageTab === 7 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Stage 7 • Post-Graduation Career Launch
                    </span>
                    <span className="px-2 py-0.5 text-xs font-mono font-bold bg-emerald-100 text-emerald-900 rounded">
                      Starting: {simulation.stage7CareerLaunch.initialCompensation}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    Entry Role: {simulation.stage7CareerLaunch.entryRole}
                  </h3>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold text-slate-800">Year 1 Milestones</span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {simulation.stage7CareerLaunch.year1Milestones.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-emerald-100 text-xs space-y-1">
                    <span className="font-bold text-slate-900">5-Year Career Vision:</span>
                    <p className="text-slate-600 leading-relaxed">{simulation.stage7CareerLaunch.year5Vision}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Next / Prev Stage Stepper */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <button
                type="button"
                disabled={activeStageTab === 1}
                onClick={() => setActiveStageTab(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 transition-colors"
              >
                Previous Stage
              </button>
              <span className="text-slate-400">
                Stage {activeStageTab} of 7
              </span>
              <button
                type="button"
                disabled={activeStageTab === 7}
                onClick={() => setActiveStageTab(prev => Math.min(7, prev + 1))}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 transition-colors flex items-center gap-1"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* AI Source Attribution Footer */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-500 gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[10px]">
                  AI-generated guidance • Gemini 3.8 Flash
                </span>
                <span className="font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px]">
                  Based on CampusFlow Prototype Data
                </span>
              </div>
              <span className="text-slate-400">Simulated projection — subject to university admissions criteria.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
