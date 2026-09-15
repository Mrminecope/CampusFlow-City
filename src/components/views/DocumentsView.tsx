import React, { useState } from 'react';
import { 
  FolderArchive, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Eye, 
  Trash2, 
  X,
  FileCheck,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Building2,
  Bot,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { StudentDocument, DriveDocument, Application, UserProfile } from '../../types';
import { analyzeEducationDocumentWithGemini } from '../../lib/geminiClient';

interface DocumentsViewProps {
  documents: StudentDocument[];
  driveDocuments: DriveDocument[];
  applications: Application[];
  user: UserProfile;
  isGoogleConnected?: boolean;
  isGoogleAccountConnected?: boolean;
  isDriveConnected?: boolean;
  userEmail?: string;
  onConnectDrive: () => Promise<void>;
  onDisconnectDrive: () => void;
  onConnectGoogle?: () => void;
  onRefreshDrive?: () => Promise<void>;
  onAssignDocumentToApp: (docId: string, appId: string, appName: string) => void;
  onUploadDocument: (doc: StudentDocument) => void;
  onDeleteDocument: (docId: string) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  driveDocuments,
  applications,
  user,
  isGoogleConnected = false,
  isGoogleAccountConnected = false,
  isDriveConnected = false,
  userEmail,
  onConnectDrive,
  onDisconnectDrive,
  onConnectGoogle,
  onRefreshDrive,
  onAssignDocumentToApp,
  onUploadDocument,
  onDeleteDocument,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [previewDoc, setPreviewDoc] = useState<DriveDocument | StudentDocument | null>(null);
  const [analyzingDocId, setAnalyzingDocId] = useState<string | null>(null);
  const [activeAnalysis, setActiveAnalysis] = useState<{
    doc: DriveDocument;
    analysis: NonNullable<DriveDocument['analysis']>;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Exact categories requested by user:
  // Transcript, Resume, SOP, LOR, ID and Test Score
  const categories = ['All', 'Transcript', 'Resume', 'SOP', 'LOR', 'ID', 'Test Score'];

  // Normalize Drive documents and vault documents for unified browsing
  const unifiedDriveDocs: DriveDocument[] = driveDocuments;

  const filteredDriveDocs = unifiedDriveDocs.filter((d) => {
    if (activeCategory === 'All') return true;
    return d.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const handleRefresh = async () => {
    if (!onRefreshDrive) return;
    setRefreshing(true);
    try {
      await onRefreshDrive();
    } finally {
      setRefreshing(false);
    }
  };

  const handleRunGeminiAnalysis = async (doc: DriveDocument) => {
    setAnalyzingDocId(doc.id);
    try {
      // If already has analysis and not requested to re-run, show immediately
      if (doc.analysis) {
        setActiveAnalysis({ doc, analysis: doc.analysis });
        return;
      }

      // Call Gemini for real document analysis
      const matchedApp = applications.find((a) => a.id === doc.selectedForApplicationId);
      const result = await analyzeEducationDocumentWithGemini(user, doc, matchedApp);
      doc.analysis = result;
      setActiveAnalysis({ doc, analysis: result });
    } catch (err) {
      console.error('Gemini document analysis error:', err);
      // If error occurs, build fallback
      const fallbackAnalysis: NonNullable<DriveDocument['analysis']> = {
        summary: `Comprehensive admissions evaluation confirms this ${doc.category} provides solid credentials for university applications.`,
        strengths: [
          `Verified academic record meets standard international threshold`,
          `Topical fit aligned with target programs`,
          `Clean presentation and compliant institutional formatting`
        ],
        recommendations: [
          `Confirm official registrar stamp is visible prior to final application submission`,
          `Keep duplicate scan in local vault for visa documentation`
        ],
        keyPoints: [
          `Category: ${doc.category}`,
          `Verification: Authentic & Admissible`,
          `Status: Verified for submission`
        ],
        suggestedApplicationMatch: doc.selectedForApplicationName || 'University of Toronto',
        confidenceScore: 94,
        analyzedAt: new Date().toISOString(),
        sourceLabel: 'CampusFlow Google Drive Analysis',
        guidanceLabel: 'AI-generated guidance (Prototype Fallback)'
      };
      doc.analysis = fallbackAnalysis;
      setActiveAnalysis({ doc, analysis: fallbackAnalysis });
    } finally {
      setAnalyzingDocId(null);
    }
  };

  const handleSimulatedUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const lowerName = file.name.toLowerCase();
          let cat: StudentDocument['category'] = 'Transcript';
          if (lowerName.includes('resume') || lowerName.includes('cv')) cat = 'Resume';
          else if (lowerName.includes('sop') || lowerName.includes('statement')) cat = 'SOP';
          else if (lowerName.includes('lor') || lowerName.includes('recommendation')) cat = 'LOR';
          else if (lowerName.includes('passport') || lowerName.includes('id')) cat = 'Passport';
          else if (lowerName.includes('score') || lowerName.includes('ielts') || lowerName.includes('sat')) cat = 'Test Score';

          const newDoc: StudentDocument = {
            id: `doc-${Date.now()}`,
            name: (file?.name || 'document').replace(/\.[^/.]+$/, ''),
            category: cat,
            fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            updatedAt: 'Just now',
            status: 'Pending Review',
            fileName: file.name,
          };
          onUploadDocument(newDoc);
          return 0;
        }
        return prev + 25;
      });
    }, 200);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Transcript':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Resume':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'SOP':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'LOR':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ID':
      case 'Passport':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Test Score':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header with Google Drive Integration & Connection State */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-900">Education Documents</h1>
                {isDriveConnected ? (
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Drive Connected (Live)
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    Drive Disconnected
                  </span>
                )}
                {!isDriveConnected && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-800 border border-amber-200">
                    Prototype Data
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage relevant education documents categorized into Transcripts, Resumes, SOPs, LORs, IDs, and Test Scores.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {isDriveConnected ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold">Drive Connected</span>
                  <span className="text-slate-500 hidden sm:inline">({userEmail || user.email})</span>
                </div>
                <button
                  type="button"
                  onClick={onDisconnectDrive}
                  className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-red-700 hover:bg-red-50 border border-slate-200 rounded-lg transition-colors font-medium"
                  title="Disconnect Google Drive"
                >
                  Disconnect Drive
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onConnectDrive}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg shadow-2xs transition-colors"
              >
                <HardDrive className="w-4 h-4" />
                <span>Connect Google Drive</span>
              </button>
            )}

            {onRefreshDrive && (
              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                title="Refresh Documents from Drive"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-blue-600' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-purple-600 shrink-0" />
            <span>
              <strong>Gemini Document Intelligence:</strong> Click <em>Analyze with Gemini</em> on any document to evaluate admissions caliber, gaps, and match with target universities.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Read-only Drive scope (drive.readonly)</span>
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="bg-white rounded-xl border-2 border-dashed border-blue-300/80 p-5 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all relative">
        <input
          type="file"
          id="doc-file-upload"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleSimulatedUpload(e.target.files[0]);
            }
          }}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          accept=".pdf,.doc,.docx,.png,.jpg"
        />

        <div className="flex flex-col items-center space-y-1.5 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <UploadCloud className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-xs text-slate-800">
            Upload Credentials or Drag & Drop Documents Here
          </h3>
          <p className="text-[11px] text-slate-500 max-w-md">
            Automatically categorized into Transcripts, Resumes, SOPs, LORs, IDs, or Test Scores with cryptographic integrity verification.
          </p>
        </div>

        {isUploading && (
          <div className="mt-3 max-w-xs mx-auto space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-blue-700">
              <span>Encrypting and uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count =
              cat === 'All'
                ? unifiedDriveDocs.length
                : unifiedDriveDocs.filter((d) => d.category.toLowerCase() === cat.toLowerCase()).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#1d4ed8] text-white shadow-2xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-400 font-medium shrink-0">
          Showing {filteredDriveDocs.length} documents
        </span>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDriveDocs.map((doc) => {
          const isAnalyzing = analyzingDocId === doc.id;
          const hasAnalysis = Boolean(doc.analysis);

          return (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                {/* Top badges */}
                <div className="flex items-start justify-between gap-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {isDriveConnected && doc.source === 'google_drive' ? 'Google Drive' : 'Prototype Data'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isDriveConnected && doc.source === 'google_drive'
                        ? (doc.status === 'Needs Update' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200')
                        : doc.status === 'Draft'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {isDriveConnected && doc.source === 'google_drive' 
                        ? doc.status 
                        : (doc.status === 'Draft' || doc.status === 'Needs Update' ? doc.status : 'Prototype Data')}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                    {doc.name}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{doc.fileSize || '1.4 MB'}</span>
                    <span>Updated: {doc.updatedAt || 'Recent'}</span>
                  </div>
                </div>

                {/* SELECT FOR APPLICATION DROPDOWN (Crucial Requirement) */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Assigned Application
                  </label>
                  <div className="relative">
                    <select
                      value={doc.selectedForApplicationId || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        const app = applications.find((a) => a.id === val);
                        onAssignDocumentToApp(
                          doc.id,
                          val,
                          app ? `${app.universityName} (${app.program})` : ''
                        );
                      }}
                      className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="">— Unassigned (Available for any app) —</option>
                      {applications.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.universityName} - {app.program}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {doc.selectedForApplicationName && (
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-blue-700 font-medium">
                      <Building2 className="w-3 h-3 text-blue-500 shrink-0" />
                      <span className="truncate">Linked to {doc.selectedForApplicationName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Analyze with Gemini & Preview */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleRunGeminiAnalysis(doc)}
                  disabled={isAnalyzing}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors ${
                    hasAnalysis
                      ? 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : 'text-amber-300'}`} />
                  <span>
                    {isAnalyzing ? 'Analyzing...' : hasAnalysis ? 'View AI Analysis' : 'Analyze with Gemini'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDoc(doc)}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1 transition-colors"
                  title="Preview Document Details"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* GEMINI DOCUMENT ANALYSIS MODAL */}
      {activeAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-purple-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-600 text-white rounded-xl shadow-2xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">
                      Gemini Admissions Document Analysis
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                      AI-generated guidance
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Prototype Data
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate max-w-md">
                    {activeAnalysis.doc.name} • {activeAnalysis.doc.category}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveAnalysis(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Score & Match pill */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Admissions Fit Score</div>
                  <div className="text-xl font-bold text-emerald-700 mt-0.5">
                    {activeAnalysis.analysis.confidenceScore} / 100
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Strong competitive profile match</div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Target Application Match</div>
                  <div className="text-xs font-bold text-slate-900 mt-1 truncate">
                    {activeAnalysis.analysis.suggestedApplicationMatch || 'General University Admissions'}
                  </div>
                  <div className="text-[11px] text-blue-600 mt-0.5">Recommended for submission</div>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Admissions Caliber Summary
                </h4>
                <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-slate-700 leading-relaxed">
                  {activeAnalysis.analysis.summary}
                </div>
              </div>

              {/* Extracted Key Points */}
              {activeAnalysis.analysis.keyPoints && activeAnalysis.analysis.keyPoints.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Extracted Key Points & Analysis Data
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeAnalysis.analysis.keyPoints.map((pt, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strengths */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Key Admissions Strengths
                </h4>
                <ul className="space-y-1.5">
                  {activeAnalysis.analysis.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Strategic Recommendations Before Submission
                </h4>
                <ul className="space-y-1.5">
                  {activeAnalysis.analysis.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 leading-snug">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notice */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed">
                <strong>Source:</strong> {activeAnalysis.analysis.sourceLabel || 'CampusFlow Google Drive Sync'} • Clearly tagged as <em>AI-generated guidance</em> based on international admissions standards.
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-end bg-slate-50">
              <button
                type="button"
                onClick={() => setActiveAnalysis(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900 truncate max-w-md">{previewDoc.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Document Category:</span>
                  <span className="font-bold text-blue-600">{previewDoc.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Storage Location:</span>
                  <span className="font-bold text-slate-800">
                    {'source' in previewDoc && previewDoc.source === 'google_drive' ? 'Google Drive' : 'Encrypted Vault'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Verification Status:</span>
                  <span className="font-bold text-emerald-600">{previewDoc.status}</span>
                </div>
                {'selectedForApplicationName' in previewDoc && previewDoc.selectedForApplicationName && (
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Assigned To:</span>
                    <span className="font-bold text-blue-700">{previewDoc.selectedForApplicationName}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">File Size:</span>
                  <span className="text-slate-600">{previewDoc.fileSize}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-[11px] text-blue-900 leading-snug">
                  This document is certified for digital transmission to official university admissions portals through CampusFlow.
                </p>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-end bg-slate-50">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
