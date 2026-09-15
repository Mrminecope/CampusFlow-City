import React from 'react';
import { 
  User, 
  IdCard, 
  Building2, 
  BookOpen, 
  Award, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  ChevronRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { OpportunityNetworkPath, NavigationTab } from '../../types';

interface OpportunityNetworkViewProps {
  network: OpportunityNetworkPath;
  compact?: boolean;
  onNavigateTab?: (tab: NavigationTab) => void;
}

interface NetworkStep {
  key: string;
  label: string;
  icon: React.ElementType;
  value: string;
  status: 'completed' | 'in_progress' | 'target' | 'career';
  tabTarget?: NavigationTab;
  badgeText: string;
}

export const OpportunityNetworkView: React.FC<OpportunityNetworkViewProps> = ({
  network,
  compact = false,
  onNavigateTab
}) => {
  const steps: NetworkStep[] = [
    {
      key: 'student',
      label: 'Student',
      icon: User,
      value: network.studentRole,
      status: 'completed',
      tabTarget: 'profile',
      badgeText: 'Active Profile'
    },
    {
      key: 'passport',
      label: 'Education Passport',
      icon: IdCard,
      value: network.passportPrerequisite,
      status: 'completed',
      tabTarget: 'passport',
      badgeText: 'Verified'
    },
    {
      key: 'university',
      label: 'University / Institution',
      icon: Building2,
      value: network.universityOrInstitution,
      status: 'in_progress',
      tabTarget: 'universities',
      badgeText: 'Target'
    },
    {
      key: 'course',
      label: 'Course / Program',
      icon: BookOpen,
      value: network.courseOrProgram,
      status: 'target',
      tabTarget: 'courses',
      badgeText: 'Curriculum'
    },
    {
      key: 'scholarship',
      label: 'Scholarship',
      icon: Award,
      value: network.scholarshipMatch,
      status: 'target',
      tabTarget: 'scholarships',
      badgeText: 'Eligible'
    },
    {
      key: 'exam',
      label: 'Exam',
      icon: GraduationCap,
      value: network.examRequirement,
      status: 'in_progress',
      tabTarget: 'exams',
      badgeText: 'Benchmark'
    },
    {
      key: 'internship',
      label: 'Internship / Co-op',
      icon: Briefcase,
      value: network.internshipLink,
      status: 'target',
      tabTarget: 'opportunities',
      badgeText: 'Work Placement'
    },
    {
      key: 'career',
      label: 'Career Outcome',
      icon: TrendingUp,
      value: network.careerOutcome,
      status: 'career',
      tabTarget: 'simulator',
      badgeText: 'Ultimate Goal'
    }
  ];

  if (compact) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Opportunity Network Pathway
          </span>
          <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
            8 Step Pipeline
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.key}>
                <div 
                  className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[11px] ${
                    step.status === 'completed'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : step.status === 'career'
                      ? 'bg-blue-50 border-blue-200 text-blue-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                  title={`${step.label}: ${step.value}`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  <span className="font-medium whitespace-nowrap">{step.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Civic Opportunity Network</h3>
            <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
              Prototype Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            End-to-end continuous pathway mapping academic credentials to career achievement.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            Student → Career Pipeline
          </span>
        </div>
      </div>

      {/* Sequential Horizontal Flow with Responsive Wrapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = step.status === 'completed';
          const isCareer = step.status === 'career';

          return (
            <div
              key={step.key}
              className={`relative flex flex-col justify-between p-3.5 rounded-lg border transition-all ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200'
                  : isCareer
                  ? 'bg-blue-50/50 border-blue-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${
                    isDone ? 'bg-emerald-100 text-emerald-700' :
                    isCareer ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Step {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800 block leading-tight">
                      {step.label}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  isDone 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : isCareer
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {step.badgeText}
                </span>
              </div>

              <p className="text-xs text-slate-700 font-medium mb-3 line-clamp-2">
                {step.value}
              </p>

              {step.tabTarget && onNavigateTab && (
                <button
                  type="button"
                  onClick={() => onNavigateTab(step.tabTarget!)}
                  className="mt-auto text-[11px] font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 transition-colors"
                >
                  <span>Explore {step.label}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
