import {
  UserProfile,
  EducationPassport,
  PassportAnalysisResult,
  OpportunityMatchResult,
  NextBestAction,
  PathwaySimulation,
  DeadlineItem,
  Application,
  StudentDocument,
  Scholarship,
  DriveDocument,
  AdmissionsEmail,
  CalendarDeadlineEvent,
} from '../types';

export class GeminiServiceError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'GeminiServiceError';
  }
}

/**
 * 1. Fetch Education Passport Analysis from Gemini
 */
export async function fetchPassportAnalysis(
  user: UserProfile,
  passport: EducationPassport
): Promise<PassportAnalysisResult> {
  // Strip sensitive passport numbers and identifiers
  const safePassport = {
    issueDate: passport.issueDate,
    academicScores: passport.academicScores,
    verifiedBadges: passport.verifiedBadges,
    studentDocuments: ((passport as { studentDocuments?: { title?: string; category?: string; status?: string; type?: string }[] }).studentDocuments || []).map((d) => ({
      title: d.title,
      category: d.category,
      status: d.status,
      type: d.type,
    })),
  };

  const response = await fetch('/api/gemini/passport-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, passport: safePassport }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new GeminiServiceError(
      errorData.error || `Analysis request failed with status ${response.status}`,
      response.status
    );
  }

  return response.json();
}

/**
 * 2. Match and Rank Opportunities with Gemini
 */
export async function fetchOpportunityMatching(
  user: UserProfile,
  items: Array<{
    id: string;
    type: 'university' | 'course' | 'scholarship' | 'exam';
    title: string;
    institutionOrHost: string;
    details: string;
    requirements?: any;
  }>
): Promise<OpportunityMatchResult[]> {
  const response = await fetch('/api/gemini/opportunity-matching', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, items }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new GeminiServiceError(
      errorData.error || `Opportunity matching failed with status ${response.status}`,
      response.status
    );
  }

  return response.json();
}

/**
 * 3. Fetch Next Best Actions from Gemini (reasons over profile, apps, deadlines, Drive docs, Gmail & Calendar)
 */
export async function fetchNextBestActions(
  user: UserProfile,
  deadlines: DeadlineItem[],
  applications: Application[],
  documents: StudentDocument[],
  scholarships: Scholarship[],
  driveDocuments?: DriveDocument[],
  admissionsEmails?: AdmissionsEmail[],
  calendarEvents?: CalendarDeadlineEvent[]
): Promise<NextBestAction[]> {
  const response = await fetch('/api/gemini/next-best-actions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user,
      deadlines,
      applications,
      documents,
      scholarships,
      driveDocuments,
      admissionsEmails,
      calendarEvents,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new GeminiServiceError(
      errorData.error || `Next best action failed with status ${response.status}`,
      response.status
    );
  }

  return response.json();
}

/**
 * 3b. Analyze Selected Education Document with Gemini
 */
export async function analyzeEducationDocumentWithGemini(
  user: UserProfile,
  document: DriveDocument,
  application?: Application
): Promise<NonNullable<DriveDocument['analysis']>> {
  const response = await fetch('/api/gemini/analyze-document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, document, application }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new GeminiServiceError(
      errorData.error || `Document analysis failed with status ${response.status}`,
      response.status
    );
  }

  return response.json();
}

/**
 * 4. Generate Pathway Simulation with Gemini
 */
export async function fetchPathwaySimulation(
  user: UserProfile,
  careerGoal: string,
  budget: string,
  location: string,
  academicProfile: { gpa?: number; sat?: number | null; ielts?: number | null; ecTier?: number }
): Promise<PathwaySimulation> {
  const response = await fetch('/api/gemini/pathway-simulator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user,
      careerGoal,
      budget,
      location,
      academicProfile,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new GeminiServiceError(
      errorData.error || `Pathway simulation failed with status ${response.status}`,
      response.status
    );
  }

  return response.json();
}

/**
 * 5. Send Advisor Chat to Gemini
 */
export async function sendAdvisorChat(
  user: UserProfile,
  messages: Array<{ sender: 'user' | 'assistant'; text: string }>,
  query: string,
  contextData?: any
): Promise<{ reply: string; recommendations: string[] }> {
  const response = await fetch('/api/gemini/advisor-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user,
      messages,
      query,
      contextData,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new GeminiServiceError(
      errorData.error || `Advisor chat failed with status ${response.status}`,
      response.status
    );
  }

  return response.json();
}

/**
 * 6. Explain Education City Opportunity Match with Gemini
 */
export async function fetchOpportunityMatchExplanation(
  user: UserProfile,
  passport: EducationPassport,
  place: any
): Promise<{
  matchSummary: string;
  academicFitReason: string;
  networkProgressionExplanation: string;
  financialAndCostAnalysis: string;
  keyAdvantages: string[];
  recommendedImmediateNextStep: string;
  guidanceLabel: string;
  isAiGenerated: boolean;
}> {
  const response = await fetch('/api/gemini/explain-opportunity-match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user,
      passport: {
        issueDate: passport.issueDate,
        academicScores: passport.academicScores,
        verifiedBadges: passport.verifiedBadges,
      },
      place,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new GeminiServiceError(
      errorData.error || `Opportunity match explanation failed with status ${response.status}`,
      response.status
    );
  }

  return response.json();
}

/**
 * 7. Application Studio: Draft Application Document with Gemini
 * Helps draft: Statement of Purpose, Personal Statement, Study Plan, Resume content.
 * The student retains full control over final text.
 */
export async function generateApplicationDocument(params: {
  user: UserProfile;
  docType: 'sop' | 'personal_statement' | 'study_plan' | 'resume';
  targetUniversity?: string;
  targetProgram?: string;
  promptNotes?: string;
  educationPassport?: any;
  studentExperience?: string;
}): Promise<{
  title: string;
  markdownContent: string;
  plainTextContent: string;
  sectionHeadings: string[];
  wordCount: number;
  guidanceNotes: string;
  sourceLabel: string;
  guidanceLabel: string;
  generatedAt: string;
}> {
  const response = await fetch('/api/gemini/draft-application-doc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new GeminiServiceError(
      errorData.error || `Draft generation failed with status ${response.status}`,
      response.status
    );
  }

  const json = await response.json();
  return json.data;
}

/**
 * 8. "Your Next Best Action": 7-Pillar Connected Synthesis
 * Connects Education Passport, Applications, Deadlines, Drive docs, Gmail admissions,
 * Calendar events, and Education City opportunities.
 * Returns the SINGLE most useful action and explains why.
 */
export async function fetchSingleNextBestAction(params: {
  user: UserProfile;
  passport: EducationPassport;
  applications: Application[];
  deadlines: DeadlineItem[];
  driveDocuments: DriveDocument[];
  admissionsEmails: AdmissionsEmail[];
  calendarEvents: CalendarDeadlineEvent[];
  cityOpportunities?: any[];
}): Promise<any> {
  const response = await fetch('/api/gemini/single-next-best-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new GeminiServiceError(
      errorData.error || `Next best action evaluation failed with status ${response.status}`,
      response.status
    );
  }

  const json = await response.json();
  return json.data;
}


