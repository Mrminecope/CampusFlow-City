import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  School, 
  GraduationCap, 
  Award, 
  MapPin, 
  Save, 
  CheckCircle2, 
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { UserProfile } from '../../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => Promise<void> | void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentSchool: user.currentSchool,
    graduationYear: user.graduationYear,
    gpa: user.gpa,
    satScore: user.satScore !== undefined && user.satScore !== null ? String(user.satScore) : '',
    ieltsScore: user.ieltsScore !== undefined && user.ieltsScore !== null ? String(user.ieltsScore) : '',
    targetDegree: user.targetDegree,
    targetCountries: user.targetCountries.join(', '),
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onUpdateUser({
        name: formData.name,
        currentSchool: formData.currentSchool,
        graduationYear: Number(formData.graduationYear),
        gpa: Number(formData.gpa),
        satScore: formData.satScore.trim() !== '' ? Number(formData.satScore) : undefined,
        ieltsScore: formData.ieltsScore.trim() !== '' ? Number(formData.ieltsScore) : undefined,
        targetDegree: formData.targetDegree,
        targetCountries: formData.targetCountries.split(',').map(s => s.trim()).filter(Boolean),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Profile & Credentials</h1>
          <p className="text-xs text-slate-500">
            Manage your academic records, target admissions criteria, and institutional contact preferences.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Prototype Data
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Synced with Firestore</span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile changes successfully synchronized with your Firestore record and Education Passport!</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-blue-500/30 shadow-md shrink-0">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded">
              CampusFlow Profile Data
            </span>
          </div>
          <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
            <School className="w-3.5 h-3.5" />
            {user.currentSchool} • Class of {user.graduationYear}
          </p>
          <p className="text-xs text-blue-600 font-mono pt-1">
            CF-Passport: {user.passportId || 'CF-INTL-PROTOTYPE'}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-5 text-xs"
      >
        <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Edit2 className="w-4 h-4 text-blue-600" />
          <span>Academic & Personal Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={formData.email}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Secondary School / College</label>
            <input
              type="text"
              required
              value={formData.currentSchool}
              onChange={(e) => setFormData({ ...formData, currentSchool: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Graduation Year</label>
            <input
              type="number"
              required
              value={formData.graduationYear}
              onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Cumulative GPA (out of 4.0)</label>
            <input
              type="number"
              step="0.01"
              max="4.0"
              required
              value={formData.gpa}
              onChange={(e) => setFormData({ ...formData, gpa: Number(e.target.value) })}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              SAT Reasoning Test Score <span className="font-normal text-slate-400">(Optional)</span>
            </label>
            <input
              type="number"
              step="10"
              max="1600"
              value={formData.satScore}
              placeholder="Not provided"
              onChange={(e) => setFormData({ ...formData, satScore: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              IELTS Academic Overall Band <span className="font-normal text-slate-400">(Optional)</span>
            </label>
            <input
              type="number"
              step="0.5"
              max="9.0"
              value={formData.ieltsScore}
              placeholder="Not provided"
              onChange={(e) => setFormData({ ...formData, ieltsScore: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Major / Degree</label>
            <input
              type="text"
              required
              value={formData.targetDegree}
              onChange={(e) => setFormData({ ...formData, targetDegree: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Target Study Destinations (Comma-separated)</label>
            <input
              type="text"
              value={formData.targetCountries}
              onChange={(e) => setFormData({ ...formData, targetCountries: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-800"
              placeholder="e.g. Canada, Singapore, Switzerland, United Kingdom, United States"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-[#1d4ed8] hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 shadow-xs transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Syncing to Firebase...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
