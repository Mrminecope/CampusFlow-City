import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Building2, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Filter, 
  Calendar,
  X,
  AlertCircle,
  CheckSquare,
  Square,
  ListTodo,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Send,
  Check,
  FileEdit
} from 'lucide-react';
import { Application, University, NavigationTab } from '../../types';
import { createGoogleTaskViaServer } from '../../lib/workspaceService';
import { connectFeatureGoogleTasks, getTasksBearerToken } from '../../lib/workspaceAuth';

interface ApplicationsViewProps {
  applications: Application[];
  universities: University[];
  onAddApplication: (app: Application) => void;
  onUpdateApplicationStatus: (appId: string, status: Application['status'], progress: number) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

interface RequirementItem {
  key: string;
  title: string;
  description: string;
  completed: boolean;
  syncedToTasks: boolean;
  targetDocType?: 'sop';
}

const DEFAULT_REQUIREMENTS: RequirementItem[] = [
  {
    key: 'transcript',
    title: 'Upload transcript',
    description: 'Upload certified Term 1 high school transcript with official registrar seal.',
    completed: true,
    syncedToTasks: true,
  },
  {
    key: 'sop',
    title: 'Complete SOP',
    description: 'Draft, refine, and finalize your Statement of Purpose in Application Studio.',
    completed: false,
    syncedToTasks: true,
    targetDocType: 'sop',
  },
  {
    key: 'recommendation',
    title: 'Request recommendation',
    description: 'Request 2 confidential teacher evaluation letters (Mathematics & Physics).',
    completed: false,
    syncedToTasks: false,
  },
  {
    key: 'review',
    title: 'Review application',
    description: 'Comprehensive pre-submission review with school guidance counselor.',
    completed: false,
    syncedToTasks: false,
  },
  {
    key: 'submit',
    title: 'Submit',
    description: 'Complete final payment, sign honor pledge, and submit application package.',
    completed: false,
    syncedToTasks: false,
  },
];

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  applications,
  universities,
  onAddApplication,
  onUpdateApplicationStatus,
  setActiveTab,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  
  // Requirement tracker state per application
  const [requirementsMap, setRequirementsMap] = useState<Record<string, RequirementItem[]>>({
    'app-utoronto': DEFAULT_REQUIREMENTS,
    'app-uamsterdam': DEFAULT_REQUIREMENTS.map((r, i) => ({
      ...r,
      completed: i === 0,
      syncedToTasks: i <= 1,
    })),
    'app-uwaterloo': DEFAULT_REQUIREMENTS.map(r => ({
      ...r,
      completed: false,
      syncedToTasks: false,
    })),
  });

  // Google Tasks confirmation modal state
  const [taskToConfirm, setTaskToConfirm] = useState<{
    app: Application;
    req: RequirementItem;
  } | null>(null);
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);
  const [taskSuccessMessage, setTaskSuccessMessage] = useState<string | null>(null);
  const [taskErrorMessage, setTaskErrorMessage] = useState<string | null>(null);
  const [hasTasksAuth, setHasTasksAuth] = useState<boolean>(Boolean(getTasksBearerToken()));

  // Add Application form state
  const [selectedUniId, setSelectedUniId] = useState(universities[0]?.id || '');
  const [programName, setProgramName] = useState('Computer Science (BSc)');
  const [intake, setIntake] = useState('Fall 2027');
  const [deadline, setDeadline] = useState('2027-01-15');
  const [notes, setNotes] = useState('');

  const statuses: Application['status'][] = [
    'Draft',
    'Documents Pending',
    'In Progress',
    'Submitted',
    'Under Review',
    'Admitted'
  ];

  const activeApp = applications.find(a => a.id === selectedAppId) || applications[0];
  const activeRequirements = requirementsMap[activeApp?.id] || DEFAULT_REQUIREMENTS;

  const handleToggleRequirement = (key: string) => {
    if (!activeApp) return;
    const current = requirementsMap[activeApp.id] || DEFAULT_REQUIREMENTS;
    const updated = current.map(item =>
      item.key === key ? { ...item, completed: !item.completed } : item
    );
    setRequirementsMap({
      ...requirementsMap,
      [activeApp.id]: updated,
    });

    // Update application progress calculation
    const completedCount = updated.filter(u => u.completed).length;
    const newProgress = Math.round((completedCount / updated.length) * 100);
    const newStatus: Application['status'] =
      newProgress === 100 ? 'Submitted' : newProgress > 40 ? 'In Progress' : 'Documents Pending';
    onUpdateApplicationStatus(activeApp.id, newStatus, newProgress);
  };

  const handleConnectGoogleTasks = async () => {
    const res = await connectFeatureGoogleTasks();
    if (res.success) {
      setHasTasksAuth(true);
      setTaskSuccessMessage('Google Tasks connected via OAuth.');
      setTimeout(() => setTaskSuccessMessage(null), 3000);
    } else {
      setTaskErrorMessage(res.error || 'Failed to connect Google Tasks.');
      setTimeout(() => setTaskErrorMessage(null), 4000);
    }
  };

  const handlePromptAddTask = (req: RequirementItem) => {
    if (!activeApp) return;
    setTaskToConfirm({
      app: activeApp,
      req,
    });
  };

  const handleConfirmAddTask = async () => {
    if (!taskToConfirm) return;
    setIsSubmittingTask(true);
    setTaskErrorMessage(null);

    const taskTitle = `${taskToConfirm.req.title} - ${taskToConfirm.app.universityName}`;
    const taskNotes = `${taskToConfirm.req.description} (Program: ${taskToConfirm.app.program} • Deadline: ${taskToConfirm.app.deadline})`;

    try {
      const res = await createGoogleTaskViaServer({
        title: taskTitle,
        notes: taskNotes,
        due: taskToConfirm.app.deadline,
        confirmed: true,
      });

      if (res.success) {
        // Mark as synced in state
        const current = requirementsMap[taskToConfirm.app.id] || DEFAULT_REQUIREMENTS;
        const updated = current.map(item =>
          item.key === taskToConfirm.req.key ? { ...item, syncedToTasks: true } : item
        );
        setRequirementsMap({
          ...requirementsMap,
          [taskToConfirm.app.id]: updated,
        });

        setTaskSuccessMessage(`Added "${taskToConfirm.req.title}" to Google Tasks with confirmation.`);
        setTimeout(() => setTaskSuccessMessage(null), 4000);
        setTaskToConfirm(null);
      } else {
        setTaskErrorMessage(res.error || 'Failed to add task to Google Tasks.');
      }
    } catch (err: any) {
      setTaskErrorMessage(err?.message || 'Error communicating with Google Tasks.');
    } finally {
      setIsSubmittingTask(false);
    }
  };

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const uni = universities.find(u => u.id === selectedUniId) || universities[0];
    const newApp: Application = {
      id: `app-${Date.now()}`,
      universityId: uni.id,
      universityName: uni.name,
      crestUrl: uni.crestUrl,
      program: programName,
      degree: 'Bachelor of Science (BSc)',
      intake,
      status: 'Documents Pending',
      progress: 20,
      nextStep: 'Upload official transcripts & SOP',
      deadline,
      appliedDate: new Date().toISOString().split('T')[0],
      notes,
    };
    onAddApplication(newApp);
    setRequirementsMap({
      ...requirementsMap,
      [newApp.id]: DEFAULT_REQUIREMENTS.map(r => ({ ...r, completed: false, syncedToTasks: false })),
    });
    setSelectedAppId(newApp.id);
    setShowAddModal(false);
    setNotes('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-slate-900">University Application Hub</h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              Prototype Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track admission milestones, sync application requirements with Google Tasks, and draft essays in Application Studio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button
              id="apps-table-view-btn"
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Table View
            </button>
            <button
              id="apps-kanban-view-btn"
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Kanban Board
            </button>
          </div>

          <button
            id="apps-new-application-btn"
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {taskSuccessMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{taskSuccessMessage}</span>
        </div>
      )}
      {taskErrorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{taskErrorMessage}</span>
        </div>
      )}

      {/* View Mode 1: Table View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">University</th>
                  <th className="py-3 px-4">Program & Intake</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 w-44">Completion</th>
                  <th className="py-3 px-4">Next Step</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => {
                  const isSelected = activeApp?.id === app.id;
                  return (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/40' : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={app.crestUrl}
                            alt=""
                            className="w-6 h-6 object-contain shrink-0"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                          <div>
                            <span className="font-bold text-slate-900">{app.universityName}</span>
                            {isSelected && (
                              <span className="ml-2 px-1.5 py-0.2 bg-blue-100 text-blue-700 text-[10px] font-semibold rounded">
                                Selected
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        <div className="font-medium">{app.program}</div>
                        <div className="text-[11px] text-slate-400">{app.intake}</div>
                      </td>

                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={app.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as Application['status'];
                            const newProg = newStatus === 'Submitted' ? 100 : newStatus === 'Admitted' ? 100 : app.progress;
                            onUpdateApplicationStatus(app.id, newStatus, newProg);
                          }}
                          className="text-[11px] font-semibold px-2 py-1 rounded-full border border-slate-200 bg-white text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {statuses.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700 text-xs w-8">{app.progress}%</span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${app.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                        {app.nextStep}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                        {app.deadline}
                      </td>

                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setActiveTab('studio')}
                            className="px-2 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50 rounded border border-blue-200 transition-colors flex items-center gap-1"
                            title="Open Application Studio"
                          >
                            <FileEdit className="w-3 h-3" />
                            Studio
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* View Mode 2: Kanban Board */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {statuses.map((status) => {
            const list = applications.filter(a => a.status === status);
            return (
              <div key={status} className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 min-h-[360px] flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">{status}</span>
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                    {list.length}
                  </span>
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto">
                  {list.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      className={`p-3 bg-white rounded-lg border shadow-2xs space-y-2 cursor-pointer transition-all text-xs ${
                        activeApp?.id === app.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-xs">{app.universityName}</div>
                      <div className="text-[11px] text-slate-600 line-clamp-1">{app.program}</div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${app.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{app.progress}%</span>
                      </div>

                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Due: {app.deadline}</span>
                      </div>
                    </div>
                  ))}

                  {list.length === 0 && (
                    <div className="h-24 flex items-center justify-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-lg">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* GOOGLE TASKS: Application Requirements & Next Actions Tracker */}
      {/* ============================================================ */}
      {activeApp && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Next Actions & Requirements: {activeApp.universityName}
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded uppercase">
                  Google Tasks
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Check off application requirements or add them directly to your Google Tasks with explicit confirmation.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!hasTasksAuth ? (
                <button
                  id="apps-connect-tasks-btn"
                  onClick={handleConnectGoogleTasks}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Connect Google Tasks
                </button>
              ) : (
                <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Tasks Connected
                </span>
              )}

              <button
                id="apps-open-studio-shortcut-btn"
                onClick={() => setActiveTab('studio')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>Open Application Studio</span>
              </button>
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="space-y-2.5">
            {activeRequirements.map((req) => (
              <div
                key={req.key}
                className={`p-3 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  req.completed
                    ? 'bg-slate-50/80 border-slate-200 text-slate-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    id={`apps-req-toggle-${req.key}`}
                    onClick={() => handleToggleRequirement(req.key)}
                    className="mt-0.5 text-slate-600 hover:text-blue-600 transition-colors shrink-0"
                    title={req.completed ? 'Mark pending' : 'Mark completed'}
                  >
                    {req.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${req.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {req.title}
                      </span>
                      {req.syncedToTasks && (
                        <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                          Synced to Tasks
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{req.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center shrink-0">
                  {req.targetDocType === 'sop' && (
                    <button
                      id="apps-req-draft-sop-btn"
                      onClick={() => setActiveTab('studio')}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-blue-500" />
                      <span>Draft in Application Studio →</span>
                    </button>
                  )}

                  <button
                    id={`apps-req-add-task-${req.key}`}
                    onClick={() => handlePromptAddTask(req)}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md transition-colors flex items-center gap-1.5"
                  >
                    <ListTodo className="w-3.5 h-3.5 text-slate-500" />
                    <span>{req.syncedToTasks ? 'Update in Tasks' : 'Add to Google Tasks'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal: Add to Google Tasks */}
      {taskToConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Add to Google Tasks</h3>
              </div>
              <button
                type="button"
                onClick={() => setTaskToConfirm(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg space-y-1">
                <p className="font-bold text-slate-900 text-xs">{taskToConfirm.req.title}</p>
                <p className="text-slate-600">{taskToConfirm.req.description}</p>
                <p className="text-[11px] text-slate-500 pt-1">
                  <strong>Target:</strong> {taskToConfirm.app.universityName} • {taskToConfirm.app.program}
                </p>
                <p className="text-[11px] text-slate-500">
                  <strong>Due Date:</strong> {taskToConfirm.app.deadline}
                </p>
              </div>

              <p className="text-slate-600 text-xs">
                This will create a new actionable item in your Google Tasks account so you can track this deadline across your Google Calendar and mobile devices.
              </p>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setTaskToConfirm(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  id="apps-confirm-add-task-btn"
                  type="button"
                  onClick={handleConfirmAddTask}
                  disabled={isSubmittingTask}
                  className="px-4 py-2 bg-[#1d4ed8] hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmittingTask ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Adding to Tasks...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm & Add to Google Tasks</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Add New University Application</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select University</label>
                <select
                  value={selectedUniId}
                  onChange={(e) => setSelectedUniId(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                >
                  {universities.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.country})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Major / Program</label>
                <input
                  type="text"
                  required
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  placeholder="e.g. Computer Science (BSc)"
                  className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Intake Term</label>
                  <input
                    type="text"
                    required
                    value={intake}
                    onChange={(e) => setIntake(e.target.value)}
                    placeholder="Fall 2027"
                    className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Submission Deadline</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Early consideration round. Need draft for supplemental essay #2."
                  className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1d4ed8] hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Add to Active Applications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
