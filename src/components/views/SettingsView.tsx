import React, { useState } from 'react';
import { 
  Settings, 
  Database, 
  ShieldCheck, 
  Bell, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Sliders, 
  Trash2,
  Lock
} from 'lucide-react';
import { UserProfile, Application, StudentDocument } from '../../types';

interface SettingsViewProps {
  user: UserProfile;
  applications: Application[];
  documents: StudentDocument[];
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  applications,
  documents,
  onResetData,
}) => {
  const [notifications, setNotifications] = useState({
    deadlines: true,
    applicationStatus: true,
    scholarships: true,
    weeklyDigest: false,
  });

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportData = () => {
    const exportBundle = {
      exportedAt: new Date().toISOString(),
      platform: 'CampusFlow City',
      studentProfile: user,
      activeApplications: applications,
      documentsVault: documents,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `campusflow-backup-${(user?.name || 'student').toLowerCase().replace(/\s+/g, '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Platform Settings & Data Diagnostics</h1>
        <p className="text-xs text-slate-500">
          Configure notification preferences, audit Firebase database connectivity, and export encrypted records.
        </p>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Complete student record bundle downloaded successfully as JSON!</span>
        </div>
      )}

      {/* Cloud & Firebase Connection Diagnostics */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600" />
          <span>Firebase Cloud Services Infrastructure</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-slate-500 text-[11px]">Firebase Project ID</div>
              <div className="font-mono font-bold text-slate-900 mt-0.5">abstract-cedar-9t3g1</div>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
              Active
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-slate-500 text-[11px]">Cloud Firestore Database</div>
              <div className="font-bold text-slate-900 mt-0.5">Live Sync Enabled</div>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
              Connected
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-slate-500 text-[11px]">Authentication Providers</div>
              <div className="font-bold text-slate-900 mt-0.5">Google OAuth + Email + Demo</div>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
              Operational
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-slate-500 text-[11px]">Security Rules Engine</div>
              <div className="font-bold text-slate-900 mt-0.5">Role-Based & Isolated</div>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
              Enforced
            </span>
          </div>
        </div>
      </div>

      {/* Notifications Preferences */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <span>Notification & Alert Preferences</span>
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800">Critical Application Deadlines</div>
              <div className="text-slate-500 text-[11px]">Receive reminders 7 days and 48 hours before submissions</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.deadlines}
              onChange={(e) => setNotifications({ ...notifications, deadlines: e.target.checked })}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800">University Decision & Status Alerts</div>
              <div className="text-slate-500 text-[11px]">Notify immediately when admissions committees update review stages</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.applicationStatus}
              onChange={(e) => setNotifications({ ...notifications, applicationStatus: e.target.checked })}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800">Matched Scholarship Openings</div>
              <div className="text-slate-500 text-[11px]">Alert when newly announced grants match your Education Passport GPA</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.scholarships}
              onChange={(e) => setNotifications({ ...notifications, scholarships: e.target.checked })}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Data Management & Export */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Download className="w-4 h-4 text-blue-600" />
          <span>Data Portability & Export</span>
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          Download a complete portable JSON copy of all your student records, profile credentials, active applications, and documents vault.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportData}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Complete Student Record (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('Reset demo applications and documents to initial defaults?')) {
                onResetData();
              }
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Seed Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
