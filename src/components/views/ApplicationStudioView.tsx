import React, { useState } from 'react';
import {
  FileEdit,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Download,
  RotateCcw,
  BookOpen,
  Send,
  Building2,
  GraduationCap,
  FileText,
  AlertCircle,
  FileCheck,
  FileCode,
  Info,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { UserProfile, EducationPassport, StudioDraft, Application } from '../../types';
import { generateApplicationDocument } from '../../lib/geminiClient';
import { createGoogleDocViaServer } from '../../lib/workspaceService';
import { connectFeatureGoogleDocs, getDocsBearerToken } from '../../lib/workspaceAuth';

interface ApplicationStudioViewProps {
  user: UserProfile;
  passport: EducationPassport;
  applications: Application[];
  onNavigateTab: (tab: any) => void;
}

type DocType = 'sop' | 'personal_statement' | 'study_plan' | 'resume';

const DOC_TYPES: { id: DocType; label: string; description: string; icon: any }[] = [
  {
    id: 'sop',
    label: 'Statement of Purpose',
    description: 'Academic catalyst, research rigor, university laboratories, and career trajectory.',
    icon: FileText,
  },
  {
    id: 'personal_statement',
    label: 'Personal Statement',
    description: 'Intellectual curiosity, resilience through obstacles, values, and diverse contribution.',
    icon: GraduationCap,
  },
  {
    id: 'study_plan',
    label: 'Study Plan',
    description: '4-year semester breakdown, course prerequisites, lab research, and capstone proposal.',
    icon: BookOpen,
  },
  {
    id: 'resume',
    label: 'Resume / CV',
    description: 'Academic metrics, technical proficiencies, project outcomes, and leadership roles.',
    icon: FileCode,
  },
];

export const ApplicationStudioView: React.FC<ApplicationStudioViewProps> = ({
  user,
  passport,
  applications,
  onNavigateTab,
}) => {
  const [selectedType, setSelectedType] = useState<DocType>('sop');
  const [targetUniversity, setTargetUniversity] = useState<string>(
    applications[0]?.universityName || 'University of Toronto'
  );
  const [targetProgram, setTargetProgram] = useState<string>(
    applications[0]?.program || user.targetMajor || 'Computer Science (BSc)'
  );
  const [promptNotes, setPromptNotes] = useState<string>(
    'Emphasize my autonomous robotics edge-vision research and strong mathematical foundation (HL Math 7/7).'
  );
  const [studentExperience, setStudentExperience] = useState<string>(
    'Captain of high school robotics Olympiad team; Gold Medalist in National High School Coding Olympiad.'
  );

  // Editor and draft state
  const [draftTitle, setDraftTitle] = useState<string>('Statement of Purpose - University of Toronto');
  const [draftContent, setDraftContent] = useState<string>(`# Statement of Purpose
## Candidate: ${user.name}
### Applying for: ${applications[0]?.program || 'Computer Science (BSc)'} at ${applications[0]?.universityName || 'University of Toronto'}

---

## 1. Academic Catalyst & Research Trajectory
My passion for computing began with curiosity about how mathematical abstraction translates into real-world autonomous intelligence. Throughout my upper secondary coursework, I discovered that algorithms are not merely computational routines, but instruments capable of expanding human potential. Maintaining a cumulative unweighted GPA of ${user.gpa}/4.0, my rigorous coursework in Higher Level Mathematics and Advanced Algorithmic Thinking cemented my determination to pursue ${applications[0]?.program || 'Computer Science'} at ${applications[0]?.universityName || 'University of Toronto'}.

## 2. Quantitative Foundations & Technical Projects
Beyond traditional coursework, I sought opportunities to test theoretical principles through rigorous implementation. I engineered an open-source autonomous perception pipeline designed for resource-constrained embedded systems, achieving a 40% reduction in inference latency. This challenge highlighted the delicate balance between algorithmic fidelity and computational efficiency, inspiring me to explore systems-level distributed computing and machine learning architectures.

## 3. Institutional Fit & Laboratories
The Department of Computer Science stands at the global forefront of foundational intelligence and distributed systems. I am eager to participate in collaborative research laboratories and faculty seminars exploring robust algorithmic reasoning.

## 4. Long-Term Trajectory
My ultimate goal is to lead fundamental research in dependable computing systems. With world-class faculty mentorship and a vibrant peer community, I am confident I will synthesize theoretical rigor with high-impact societal solutions.`);

  const [guidanceNotes, setGuidanceNotes] = useState<string>(
    'Review section 3 to reference specific lab publications or faculty members whose research directly aligns with your project goals.'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [createdDocUrl, setCreatedDocUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Export history
  const [savedDocs, setSavedDocs] = useState<StudioDraft[]>([
    {
      id: 'doc-sop-initial',
      type: 'sop',
      title: 'Statement of Purpose - University of Toronto',
      targetUniversity: 'University of Toronto',
      targetProgram: 'Computer Science (BSc)',
      content: draftContent,
      lastEditedAt: 'Today, 2:15 PM',
      wordCount: 345,
      status: 'draft',
    },
  ]);

  const [hasDocsAuth, setHasDocsAuth] = useState<boolean>(Boolean(getDocsBearerToken()));

  const wordCount = draftContent.trim() ? draftContent.trim().split(/\s+/).length : 0;
  const charCount = draftContent.length;

  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const result = await generateApplicationDocument({
        user,
        docType: selectedType,
        targetUniversity,
        targetProgram,
        promptNotes,
        educationPassport: passport,
        studentExperience,
      });

      setDraftTitle(result.title);
      setDraftContent(result.markdownContent);
      setGuidanceNotes(result.guidanceNotes);
      setSuccessMsg(`Generated draft with ${result.wordCount} words based on your Education Passport.`);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to generate application draft with Gemini.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConnectDocs = async () => {
    const res = await connectFeatureGoogleDocs();
    if (res.success) {
      setHasDocsAuth(true);
      setSuccessMsg('Google Docs successfully connected via OAuth.');
    } else {
      setErrorMsg(res.error || 'Failed to connect Google Docs.');
    }
  };

  const handleExportToGoogleDocs = async () => {
    setIsExporting(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await createGoogleDocViaServer({
        title: draftTitle,
        content: draftContent,
      });

      if (res.success && res.doc) {
        setCreatedDocUrl(res.doc.documentUrl);
        setSuccessMsg(`Google Doc created: "${res.doc.title}". You have complete control to edit in Google Docs.`);

        const newSaved: StudioDraft = {
          id: res.doc.id,
          type: selectedType,
          title: res.doc.title,
          targetUniversity,
          targetProgram,
          content: draftContent,
          googleDocId: res.doc.id,
          googleDocUrl: res.doc.documentUrl,
          lastEditedAt: 'Just now',
          wordCount,
          status: 'exported_to_docs',
        };
        setSavedDocs([newSaved, ...savedDocs]);
      } else {
        setErrorMsg(res.error || 'Could not export to Google Docs.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error exporting to Google Docs.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([draftContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(draftTitle || 'statement').toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 rounded">
                Google Docs Integration
              </span>
              <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded">
                Prototype Data
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileEdit className="w-7 h-7 text-blue-600" />
              Application Studio
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Draft admissions essays, personal statements, study plans, and technical resumes with Gemini guidance, then export to Google Docs. You maintain full control over the final content.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!hasDocsAuth ? (
              <button
                id="studio-connect-docs-btn"
                onClick={handleConnectDocs}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                Connect Google Docs
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Google Docs Ready
              </div>
            )}

            <button
              id="studio-export-docs-btn"
              onClick={handleExportToGoogleDocs}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors disabled:opacity-50"
            >
              {isExporting ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <ExternalLink className="w-4 h-4" />
              )}
              Create & Open in Google Docs
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {createdDocUrl && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900">Google Doc Created Successfully</p>
                <p className="text-xs text-emerald-700">You retain 100% control to review, edit, and collaborate in Google Docs.</p>
              </div>
            </div>
            <a
              id="studio-view-created-doc-link"
              href={createdDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
            >
              Open Google Doc ↗
            </a>
          </div>
        )}

        {errorMsg && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && !createdDocUrl && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 text-xs text-blue-700">
            <Check className="w-4 h-4 shrink-0 text-blue-600" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Document Type Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DOC_TYPES.map((dt) => {
          const Icon = dt.icon;
          const isSelected = selectedType === dt.id;
          return (
            <button
              key={dt.id}
              id={`studio-doctype-${dt.id}`}
              onClick={() => {
                setSelectedType(dt.id);
                setDraftTitle(`${dt.label} - ${targetUniversity}`);
              }}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-blue-50/60 border-blue-500 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
              <h3 className="text-xs font-bold text-slate-900">{dt.label}</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                {dt.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Context & Gemini Controls (5 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Gemini Drafting Parameters
              </h3>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                AI-generated guidance
              </span>
            </div>

            {/* Target University */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Institution
              </label>
              <div className="relative">
                <input
                  id="studio-target-uni-input"
                  type="text"
                  value={targetUniversity}
                  onChange={(e) => setTargetUniversity(e.target.value)}
                  placeholder="e.g. University of Toronto"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Target Program */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Degree / Program
              </label>
              <input
                id="studio-target-prog-input"
                type="text"
                value={targetProgram}
                onChange={(e) => setTargetProgram(e.target.value)}
                placeholder="e.g. Computer Science (BSc)"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Focus Prompt / Specific Angle */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Focus Highlights & Tone
              </label>
              <textarea
                id="studio-prompt-notes-input"
                rows={3}
                value={promptNotes}
                onChange={(e) => setPromptNotes(e.target.value)}
                placeholder="Describe your research focus, lab interests, or key questions to emphasize..."
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Extracurriculars / Projects */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Projects & Experience
              </label>
              <textarea
                id="studio-student-exp-input"
                rows={2}
                value={studentExperience}
                onChange={(e) => setStudentExperience(e.target.value)}
                placeholder="Any specific projects or awards to incorporate..."
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Education Passport Connected Signals */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
              <p className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                Passport Context Grounding
              </p>
              <p className="text-[11px] text-slate-500">
                GPA: <span className="font-semibold text-slate-800">{user.gpa}/4.0</span> • Verified Badges:{' '}
                <span className="font-semibold text-slate-800">{passport.verifiedBadges?.length || 4} verified</span>
              </p>
              <p className="text-[10px] text-slate-400 italic">
                Drafts are customized to your verified academic records.
              </p>
            </div>

            {/* Action button */}
            <button
              id="studio-generate-draft-btn"
              onClick={handleGenerateDraft}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin text-blue-400" />
                  Generating draft with Gemini...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  Generate Initial Draft
                </>
              )}
            </button>
          </div>

          {/* Coaching Notes */}
          {guidanceNotes && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <Info className="w-4 h-4 text-amber-700" />
                <h4 className="text-xs font-bold text-amber-900">Writing Mentor Notes</h4>
                <span className="text-[10px] font-medium text-amber-700 ml-auto bg-amber-100 px-1.5 py-0.5 rounded">
                  AI-generated guidance
                </span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">{guidanceNotes}</p>
            </div>
          )}

          {/* Quick Drafts History */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              Document Versions
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {savedDocs.map((sd) => (
                <div
                  key={sd.id}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold text-slate-800 truncate">{sd.title}</p>
                    <p className="text-[10px] text-slate-500">
                      {sd.wordCount} words • {sd.lastEditedAt}
                    </p>
                  </div>
                  {sd.googleDocUrl ? (
                    <a
                      href={sd.googleDocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 text-[10px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 flex items-center gap-1 shrink-0"
                    >
                      Docs ↗
                    </a>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">Local</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Full Editor & Final Content Control (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col h-full min-h-[580px]">
            {/* Editor Toolbar */}
            <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <input
                  id="studio-doc-title-input"
                  type="text"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="text-sm font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-hidden px-1 py-0.5 w-full"
                  title="Click to rename document"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-white border border-slate-200 rounded-md">
                  {wordCount} words • {charCount} chars
                </span>

                <button
                  id="studio-copy-btn"
                  onClick={handleCopyText}
                  className="p-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
                  title="Copy formatted text"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>

                <button
                  id="studio-download-btn"
                  onClick={handleDownloadTxt}
                  className="p-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
                  title="Download Markdown file"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Note on user control */}
            <div className="px-4 py-2 bg-blue-50/40 border-b border-blue-100 text-[11px] text-blue-900 flex items-center justify-between">
              <span>
                <strong>User Control:</strong> You have full control over this text. Edit, rephrase, or personalize any section before creating your Google Doc.
              </span>
              <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => onNavigateTab('applications')}>
                View Application Checklist →
              </span>
            </div>

            {/* Main Editable Area */}
            <div className="p-4 flex-1 flex flex-col">
              <textarea
                id="studio-document-editor"
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                className="w-full flex-1 p-4 font-mono text-xs text-slate-800 bg-slate-50/30 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 leading-relaxed resize-none min-h-[440px]"
                placeholder="Your document content appears here..."
              />
            </div>

            {/* Bottom Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-[11px] bg-slate-100 text-slate-700 font-medium rounded">
                  Markdown & Rich Text Supported
                </span>
                <span className="text-[11px] text-slate-400">
                  Direct export into Google Docs
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="studio-secondary-open-docs-btn"
                  onClick={handleExportToGoogleDocs}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors disabled:opacity-50"
                >
                  {isExporting ? (
                    <RotateCcw className="w-4 h-4 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                  Create & Open in Google Docs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
