import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing on the server.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const CANDIDATE_MODELS = ['gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];

async function generateWithFallback(params: {
  contents: string;
  config?: any;
}) {
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const ai = getGeminiClient();
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });
        if (response && response.text) {
          return response;
        }
      } catch (err: any) {
        lastError = err;
        const isUnavailable =
          err?.status === 503 ||
          err?.status === 429 ||
          err?.message?.includes('high demand') ||
          err?.message?.includes('UNAVAILABLE') ||
          err?.message?.includes('Resource exhausted');

        if (isUnavailable && attempt === 0) {
          // Brief pause before retry attempt on high demand
          await new Promise((resolve) => setTimeout(resolve, 600));
          continue;
        }
        break;
      }
    }
  }

  throw lastError || new Error('All candidate Gemini models are currently busy.');
}

function cleanJsonText(raw: string): string {
  let text = raw.trim();

  // Extract from markdown code fences if present
  const matchFence = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (matchFence && matchFence[1]) {
    text = matchFence[1].trim();
  }

  // Extract outermost JSON object or array to avoid trailing commentary issues
  const firstBrace = text.indexOf('{');
  const firstBracket = text.indexOf('[');

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    const lastBrace = text.lastIndexOf('}');
    if (lastBrace !== -1 && lastBrace > firstBrace) {
      return text.slice(firstBrace, lastBrace + 1);
    }
  } else if (firstBracket !== -1) {
    const lastBracket = text.lastIndexOf(']');
    if (lastBracket !== -1 && lastBracket > firstBracket) {
      return text.slice(firstBracket, lastBracket + 1);
    }
  }

  return text.trim();
}

/**
 * 1. EDUCATION PASSPORT AI
 * Analyzes student's grades, subjects, skills, interests, career goal, budget, and location.
 * Shows strengths, gaps, and recommended improvements.
 */
export async function analyzeEducationPassport(user: any, passport: any) {
  const ai = getGeminiClient();

  const satInfo = user.satScore ? `${user.satScore}` : 'Not provided';
  const ieltsInfo = user.ieltsScore ? `${user.ieltsScore}` : 'Not provided';
  const toeflInfo = user.toeflScore ? `${user.toeflScore}` : 'Not provided';
  const gpaInfo = user.gpa ? `${user.gpa} / ${user.maxGpa || 4.0}` : 'Not provided';
  const budgetInfo = user.budget ? `${user.budget}` : 'Not provided';
  const careerInfo = user.careerGoal ? `${user.careerGoal}` : 'Not provided';
  const targetCountries = (user.targetCountries && user.targetCountries.length > 0)
    ? user.targetCountries.join(', ')
    : (user.preferredLocation || 'Not provided');
  const skillsInfo = (user.skills && user.skills.length > 0) ? user.skills.join(', ') : 'Not provided';
  const interestsInfo = (user.interests && user.interests.length > 0) ? user.interests.join(', ') : 'Not provided';

  // Badges and coursework without sensitive numbers/IDs
  const badgesList = (passport.verifiedBadges || [])
    .map((b: any) => `${b.title} (${b.issuedBy})`)
    .join('; ') || 'None recorded';
  const academicScoresList = (passport.academicScores || [])
    .map((s: any) => `${s.subject}: ${s.grade} [${s.level}]`)
    .join('; ') || 'None recorded';

  const prompt = `You are the Lead Global Admissions Evaluator and Academic AI for CampusFlow City.
Analyze the following student profile and CampusFlow Profile Data (Prototype Data):

STUDENT PROFILE (CampusFlow Profile Data):
- Name: ${user.name || 'Candidate'}
- Current School: ${user.currentSchool || 'Not provided'}
- Graduation Year: ${user.graduationYear || 'Not provided'}
- GPA: ${gpaInfo}
- Standardized Tests: SAT: ${satInfo} | IELTS: ${ieltsInfo} | TOEFL: ${toeflInfo}
- Target Degree: ${user.targetDegree || 'Not provided'}
- Target Major: ${user.targetMajor || 'Not provided'}
- Career Goal: ${careerInfo}
- Stated Skills: ${skillsInfo}
- Stated Interests: ${interestsInfo}
- Annual Tuition/Living Budget: ${budgetInfo}
- Preferred Target Locations: ${targetCountries}

CAMPUSFLOW PROFILE DATA (PROTOTYPE DATA):
- Profile Badges & Credentials: ${badgesList}
- Coursework & Academic Subject Scores: ${academicScoresList}

TASK:
Perform a comprehensive, rigorous academic evaluation analyzing:
1. Academic rigor & transcript grades
2. Core subjects vs target major prerequisites
3. Current skills vs industry requirements
4. Interests & project alignment
5. Feasibility given student's budget and geographic target locations (or note if financial constraints are not provided)

Source Attribution Requirement:
All analysis is AI-generated guidance based on CampusFlow Prototype Data.

Return your response strictly in valid JSON matching this schema:
{
  "sourceLabel": "Based on CampusFlow Prototype Data",
  "guidanceLabel": "AI-generated guidance",
  "summary": "2-3 concise sentences offering an objective, high-level evaluation of admission competitiveness",
  "strengths": [
    {
      "category": "Academic Rigor" | "Standardized Testing" | "Subject Mastery" | "Technical Capability",
      "title": "Concise strength headline",
      "description": "Clear explanation of how this positions the candidate well",
      "evidence": "Concrete data point from GPA, SAT, IELTS, or course grade (or note if unstated)"
    }
  ],
  "gaps": [
    {
      "category": "Coursework Prerequisite" | "Extracurricular Depth" | "Financial Alignment" | "Language/Test Balance",
      "title": "Concise gap headline",
      "description": "Clear explanation of potential vulnerability in admissions or career progression",
      "riskLevel": "low" | "medium" | "high",
      "mitigation": "Strategic recommendation to overcome or hedge this gap"
    }
  ],
  "recommendedImprovements": [
    {
      "priority": "High" | "Medium",
      "title": "Actionable priority name",
      "action": "Specific concrete milestone the student should complete",
      "timeline": "e.g. Next 30-60 Days or Fall Senior Term",
      "expectedImpact": "Measurable boost to admission odds or scholarship eligibility"
    }
  ]
}

Provide 3-4 distinct strengths, 2-3 concrete gaps, and 3-4 recommended improvements.
Adhere strictly to professional education tone. Do NOT promise guaranteed admission.`;

  try {
    const response = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are an objective admissions dean and higher education data analyst. You output solely valid JSON.',
      },
    });

    const parsed = JSON.parse(cleanJsonText(response.text || '{}'));
    return {
      ...parsed,
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
      analyzedAt: new Date().toISOString(),
    };
  } catch (_err) {
    return generateFallbackPassportAnalysis(user, passport);
  }
}

/**
 * 2. OPPORTUNITY MATCHING
 * Uses Gemini to rank demo universities, courses, scholarships, and entrance exams.
 * Shows Match %, Why it matches, Missing requirements, and Next action.
 */
export async function matchOpportunities(user: any, items: any[]) {
  const ai = getGeminiClient();

  const satInfo = user.satScore ? `${user.satScore}` : 'Not provided';
  const ieltsInfo = user.ieltsScore ? `${user.ieltsScore}` : 'Not provided';
  const gpaInfo = user.gpa ? `${user.gpa} / 4.0` : 'Not provided';
  const budgetInfo = user.budget ? `${user.budget}` : 'Not provided';
  const careerInfo = user.careerGoal ? `${user.careerGoal}` : 'Not provided';
  const targetCountries = (user.targetCountries && user.targetCountries.length > 0)
    ? user.targetCountries.join(', ')
    : (user.preferredLocation || 'Not provided');
  const skillsInfo = (user.skills && user.skills.length > 0) ? user.skills.join(', ') : 'Not provided';

  const prompt = `You are the FlowAI Opportunity Matching Engine for CampusFlow City.
Given the student's CampusFlow Profile Data (Prototype Data):
- Name: ${user.name || 'Candidate'}
- GPA: ${gpaInfo}
- SAT: ${satInfo}
- IELTS: ${ieltsInfo}
- Major: ${user.targetMajor || 'Not provided'}
- Target Countries: ${targetCountries}
- Skills: ${skillsInfo}
- Budget: ${budgetInfo}
- Career Goal: ${careerInfo}

Analyze and rank each of the following ${items.length} opportunities:
${JSON.stringify(items, null, 2)}

For EACH opportunity, evaluate alignment objectively and return a JSON array matching this exact schema:
[
  {
    "id": "must match the input item id exactly",
    "title": "item title",
    "type": "university" | "course" | "scholarship" | "exam",
    "institutionOrHost": "institution or organizer name",
    "matchPercentage": number between 45 and 99,
    "matchTier": "Strong Match" | "Good Match" | "Reach" | "Safety",
    "whyItMatches": "1-2 sentences explaining why candidate's GPA, tests, skills, or target locations align (or note what is not provided)",
    "missingRequirements": ["Array of 1 to 3 specific missing items, prerequisite gaps, or required documents"],
    "nextAction": "1 clear, immediate next action the student must execute",
    "sourceLabel": "Based on CampusFlow Prototype Data",
    "guidanceLabel": "AI-generated guidance"
  }
]

Sort the returned array in descending order of matchPercentage.
Return valid JSON only.`;

  try {
    const response = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are an expert admissions ranker. Evaluate candidate fit objectively and return valid JSON array.',
      },
    });

    const parsed = JSON.parse(cleanJsonText(response.text || '[]'));
    return Array.isArray(parsed) && parsed.length > 0 ? parsed.map((item) => ({
      ...item,
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
    })) : generateFallbackOpportunityMatching(user, items);
  } catch (_err) {
    return generateFallbackOpportunityMatching(user, items);
  }
}

/**
 * 3. NEXT BEST ACTION
 * Evaluates deadlines, active applications, student documents status, scholarships, and profile completion.
 * Prioritizes what the student should do next.
 */
export async function recommendNextBestActions(
  user: any,
  deadlines: any[],
  applications: any[],
  documents: any[],
  scholarships: any[],
  driveDocuments: any[] = [],
  admissionsEmails: any[] = [],
  calendarEvents: any[] = []
) {
  const ai = getGeminiClient();

  const satInfo = user.satScore ? `${user.satScore}` : 'Not provided';
  const ieltsInfo = user.ieltsScore ? `${user.ieltsScore}` : 'Not provided';
  const gpaInfo = user.gpa ? `${user.gpa} / 4.0` : 'Not provided';
  const careerInfo = user.careerGoal ? `${user.careerGoal}` : 'Not provided';
  const profileComp = user.profileCompletion !== undefined ? `${user.profileCompletion}%` : 'Not provided';

  // Sanitize documents to avoid any sensitive document numbers or personal IDs
  const sanitizedDocuments = documents.map((d: any) => ({
    title: d.title || d.name,
    category: d.category,
    status: d.status,
    type: d.type,
  }));

  // Sanitize relevant admissions emails
  const sanitizedEmails = (admissionsEmails || []).slice(0, 5).map((e: any) => ({
    subject: e.subject,
    sender: e.sender,
    category: e.category,
    urgency: e.urgency,
    requiredAction: e.requiredAction,
    relatedApplication: e.relatedApplicationName,
  }));

  // Sanitize drive docs
  const sanitizedDriveDocs = (driveDocuments || []).slice(0, 6).map((d: any) => ({
    name: d.name,
    category: d.category,
    status: d.status,
    selectedFor: d.selectedForApplicationName,
  }));

  const prompt = `You are the CampusFlow Next Best Action Counselor.
Evaluate the student's active status across admissions based on CampusFlow Profile Data (Prototype Data) and Connected Google Workspace feeds:

STUDENT PROFILE (CampusFlow Profile Data):
- Name: ${user.name || 'Candidate'}
- Profile Completion: ${profileComp}
- GPA: ${gpaInfo} | SAT: ${satInfo} | IELTS: ${ieltsInfo}
- Target Major: ${user.targetMajor || 'Not provided'}
- Stated Career Goal: ${careerInfo}

RELEVANT ADMISSIONS EMAILS (${sanitizedEmails.length} items from Admission Inbox):
${sanitizedEmails.length > 0 ? JSON.stringify(sanitizedEmails, null, 2) : 'No new admissions emails'}

UPCOMING DEADLINES & CALENDAR (${deadlines.length} items):
${deadlines.length > 0 ? JSON.stringify(deadlines.slice(0, 5), null, 2) : 'No upcoming deadlines logged'}

GOOGLE DRIVE EDUCATION DOCUMENTS (${sanitizedDriveDocs.length} items):
${sanitizedDriveDocs.length > 0 ? JSON.stringify(sanitizedDriveDocs, null, 2) : 'No documents in Drive'}

ACTIVE APPLICATIONS (${applications.length} items):
${applications.length > 0 ? JSON.stringify(applications.slice(0, 5), null, 2) : 'No active applications tracked'}

DOCUMENTS IN VAULT (${documents.length} items):
${sanitizedDocuments.length > 0 ? JSON.stringify(sanitizedDocuments.slice(0, 6), null, 2) : 'No documents recorded'}

TARGET SCHOLARSHIPS (${scholarships.length} items):
${scholarships.length > 0 ? JSON.stringify(scholarships.slice(0, 4).map((s: any) => ({ name: s.name, amount: s.amount, deadline: s.deadline })), null, 2) : 'No scholarships tracked'}

TASK:
Identify the top 4 to 5 highest-priority, time-sensitive NEXT BEST ACTIONS the student must take right now.
You MUST prioritize across these pillars:
1. Urgent admission emails requiring action (e.g. document requests from U of T or interview scheduling)
2. Imminent deadlines (items with closest due dates in Calendar)
3. Applications in progress (pending submissions or next steps)
4. Missing or draft documents in Google Drive or vault (e.g. unattached transcripts or draft SOPs)
5. High-value scholarships with upcoming nomination windows
6. Profile gaps (e.g. missing extracurriculars, recommendations, or test uploads)

Return a JSON array of prioritized actions matching this schema:
[
  {
    "id": "action-1",
    "rank": 1,
    "category": "deadline" | "application" | "missing_document" | "scholarship" | "profile_gap",
    "title": "Action title (e.g., Finalize Document Submission)",
    "urgency": "urgent" | "high" | "medium",
    "reason": "Why this matters immediately and consequences of delay",
    "action": "Concrete instruction of what button or section to visit and what to submit",
    "targetTab": "deadlines" | "applications" | "documents" | "inbox" | "scholarships" | "profile",
    "dueDate": "e.g. 14 Oct 2026 or Next 7 Days",
    "sourceLabel": "Based on CampusFlow Prototype Data",
    "guidanceLabel": "AI-generated guidance"
  }
]

Sort by urgency and rank (1 is most critical). Return valid JSON only.`;

  try {
    const response = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are an executive admissions strategist. Prioritize student actions strictly and objectively in JSON.',
      },
    });

    const parsed = JSON.parse(cleanJsonText(response.text || '[]'));
    return Array.isArray(parsed) && parsed.length > 0 ? parsed.map((item) => ({
      ...item,
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
    })) : generateFallbackNextBestActions(user, deadlines, applications, documents, scholarships);
  } catch (_err) {
    return generateFallbackNextBestActions(user, deadlines, applications, documents, scholarships);
  }
}

/**
 * DOCUMENT ANALYSIS WITH GEMINI
 * Analyzes selected education document (Transcript, Resume, SOP, LOR, ID, Test Score)
 * with evaluation, strengths, recommendations, fit score, and application pairing.
 */
export async function analyzeEducationDocument(
  user: any,
  document: any,
  application?: any
) {
  const docName = document.name || document.title || 'Education Document';
  const docCategory = document.category || 'General';
  const appTarget = application ? `${application.universityName} - ${application.program}` : (document.selectedForApplicationName || 'General University Admissions');

  const prompt = `You are the Senior Academic Admissions Evaluator for CampusFlow City.
Analyze the following student education document submitted for an international university application.

STUDENT PROFILE (CampusFlow Profile Data):
- Name: ${user.name || 'Candidate Maya Sharma'}
- Target Major: ${user.targetMajor || 'Computer Science & Software Engineering'}
- Target Degree: ${user.targetDegree || 'Bachelor of Science (BSc)'}
- Stated GPA: ${user.gpa || 3.88} / 4.0
- Target Application: ${appTarget}

DOCUMENT DETAILS:
- Title: ${docName}
- Category: ${docCategory}
- Source: ${document.source === 'google_drive' ? 'Connected Google Drive' : 'Cryptographic Vault'}
- File Size: ${document.fileSize || 'Standard'}
- Current Status: ${document.status || 'Verified'}

TASK:
Provide a rigorous, constructive, admissions-level evaluation of this ${docCategory}.
Analyze how strongly it supports admission to ${appTarget}, key strengths, points for revision or registrar verification, and critical data points extracted.

Return your response strictly in valid JSON matching this schema:
{
  "summary": "2-3 sentence executive assessment of the document's admissions caliber and relevance.",
  "strengths": [
    "Strength 1 with specific academic/profile evidence",
    "Strength 2 with specific evidence",
    "Strength 3 with specific evidence"
  ],
  "recommendations": [
    "Actionable recommendation 1 for applicant before final submission",
    "Actionable recommendation 2"
  ],
  "keyPoints": [
    "Key extracted point or metric 1 (e.g. Cumulative GPA / Test Band / Core Skills)",
    "Key extracted point 2",
    "Key extracted point 3"
  ],
  "suggestedApplicationMatch": "${appTarget}",
  "confidenceScore": 94,
  "sourceLabel": "CampusFlow Google Drive Analysis",
  "guidanceLabel": "AI-generated guidance"
}`;

  try {
    const response = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are an elite university admissions committee reader. Output solely valid JSON adhering to the schema.',
      },
    });

    const parsed = JSON.parse(cleanJsonText(response.text || '{}'));
    return {
      ...parsed,
      suggestedApplicationMatch: parsed.suggestedApplicationMatch || appTarget,
      confidenceScore: typeof parsed.confidenceScore === 'number' ? parsed.confidenceScore : 92,
      sourceLabel: 'CampusFlow Google Drive Analysis',
      guidanceLabel: 'AI-generated guidance',
      analyzedAt: new Date().toISOString(),
    };
  } catch (_err) {
    return generateFallbackDocumentAnalysis(user, document, appTarget);
  }
}

/**
 * 4. PATHWAY SIMULATOR
 * Generates the full 7-stage chain:
 * Career → Education → Skills → Exams → Projects → Internship → Career
 * Allows career goal, budget, and location to dynamically change.
 */
export async function simulatePathway(
  user: any,
  careerGoal: string,
  budget: string,
  location: string,
  academicProfile: { gpa?: number; sat?: number; ielts?: number; ecTier?: number }
) {
  const ai = getGeminiClient();

  const careerTarget = careerGoal || (user?.careerGoal ? user.careerGoal : 'Not provided');
  const budgetTarget = budget || (user?.budget ? user.budget : 'Not provided');
  const locationTarget = location || (user?.preferredLocation || (user?.targetCountries?.length ? user.targetCountries.join(', ') : 'Not provided'));

  const gpaStr = academicProfile?.gpa ? `${academicProfile.gpa} / 4.0` : (user?.gpa ? `${user.gpa} / 4.0` : 'Not provided');
  const satStr = academicProfile?.sat ? `${academicProfile.sat} / 1600` : (user?.satScore ? `${user.satScore} / 1600` : 'Not provided');
  const ieltsStr = academicProfile?.ielts ? `${academicProfile.ielts} / 9.0` : (user?.ieltsScore ? `${user.ieltsScore} / 9.0` : 'Not provided');
  const ecStr = academicProfile?.ecTier ? `${academicProfile.ecTier} / 10` : 'Not provided';

  const prompt = `You are the CampusFlow Chief Academic & Career Pathway Architect.
Generate a realistic, comprehensive, end-to-end 7-stage educational and career roadmap based on CampusFlow Profile Data (Prototype Data):

INPUT PARAMETERS:
- Target Career Goal: ${careerTarget}
- Annual Budget / Funding Constraints: ${budgetTarget}
- Target Geographic Location(s): ${locationTarget}
- Academic Profile (CampusFlow Profile Data):
  - GPA: ${gpaStr}
  - SAT: ${satStr}
  - IELTS: ${ieltsStr}
  - Extracurricular/Research Tier: ${ecStr}

TASK:
Synthesize the structured 7-stage sequential trajectory:
Stage 1: CAREER TARGET (Role Definition, Industry Outlook & Landscape)
Stage 2: EDUCATION (Degree Level, Majors, Recommended Institutions within Budget & Location)
Stage 3: SKILLS (High-Leverage Technical, Analytical & Applied Capabilities to master)
Stage 4: EXAMS (Entrance tests, standardized benchmarks, and minimum scores required)
Stage 5: PROJECTS (High-impact portfolio projects & capstones)
Stage 6: INTERNSHIP (Co-op placements, corporate or academic research fellowships)
Stage 7: CAREER LAUNCH (Entry-level milestones, target companies, and 5-year career vision)

Return your response strictly in valid JSON matching this schema:
{
  "sourceLabel": "Based on CampusFlow Prototype Data",
  "guidanceLabel": "AI-generated guidance",
  "careerGoal": "${careerTarget}",
  "budget": "${budgetTarget}",
  "location": "${locationTarget}",
  "stages": {
    "careerTarget": {
      "title": "Exact Target Career Title",
      "industry": "Industry Sector",
      "medianStartingSalary": "e.g. $95,000 - $130,000 USD",
      "outlook": "e.g. +28% growth over next decade (High Demand)",
      "description": "2 sentences describing core responsibilities and real-world impact"
    },
    "education": {
      "recommendedDegree": "e.g. Bachelor of Science in target field",
      "targetMajors": ["Major 1", "Major 2"],
      "topInstitutions": [
        {
          "name": "Institution Name",
          "country": "Country",
          "whySelected": "Why it fits the student's budget, academic profile, and location preference",
          "estimatedTuition": "Tuition per year"
        }
      ],
      "curriculumHighlights": ["Course/Area 1", "Course/Area 2", "Course/Area 3"]
    },
    "skills": {
      "technical": ["3 to 5 core technical languages/frameworks"],
      "analytical": ["3 to 4 analytical or mathematical capabilities"],
      "tools": ["3 to 4 industry tools/platforms"]
    },
    "exams": [
      {
        "name": "Exam Name (e.g. SAT, IELTS Academic, AP subject tests)",
        "targetScore": "Target Score Threshold",
        "purpose": "Why this exam matters for the target institutions",
        "timeline": "When to take it"
      }
    ],
    "projects": [
      {
        "title": "Project Title",
        "description": "Concrete project specification",
        "techStack": ["Tool 1", "Tool 2"],
        "expectedOutcome": "Measurable output (e.g. Published open-source library, research paper, deployed system)"
      }
    ],
    "internship": [
      {
        "role": "Internship / Research Fellowship Title",
        "industryTarget": "Type of lab or tech enterprise",
        "timeline": "e.g. Summer after Year 2 or Year 3 Co-op",
        "keyDeliverable": "Deliverable or achievement"
      }
    ],
    "careerLaunch": {
      "entryRole": "First full-time role title",
      "targetCompanies": ["Target Company/Lab 1", "Target Company/Lab 2", "Target Company/Lab 3"],
      "yearOneMilestones": ["Milestone 1", "Milestone 2"],
      "fiveYearVision": "Where this pathway leads in 5 years"
    }
  }
}

Return valid JSON only. Keep descriptions professional, educational, and realistic.`;

  try {
    const response = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are a career pathway architect. Output solely valid JSON adhering to the specified schema.',
      },
    });

    const parsed = JSON.parse(cleanJsonText(response.text || '{}'));
    return {
      ...parsed,
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
      generatedAt: new Date().toISOString(),
    };
  } catch (_err) {
    return generateFallbackPathway(user, careerTarget, budgetTarget, locationTarget, academicProfile);
  }
}

/**
 * 5. AI ADVISOR
 * Interactive Gemini-powered Academic Counselor.
 * Uses CampusFlow Profile Data and platform data layer to answer student queries about
 * universities, courses, scholarships, deadlines, applications, and careers.
 */
export async function advisorChat(
  user: any,
  messages: Array<{ sender: 'user' | 'assistant'; text: string }>,
  userQuery: string,
  contextData?: any
) {
  const ai = getGeminiClient();

  const conversationHistory = messages
    .slice(-6)
    .map((m) => `${m.sender === 'user' ? 'Student' : 'FlowAI Advisor'}: ${m.text}`)
    .join('\n\n');

  const satInfo = user.satScore ? `${user.satScore}` : 'Not provided';
  const ieltsInfo = user.ieltsScore ? `${user.ieltsScore}` : 'Not provided';
  const toeflInfo = user.toeflScore ? `${user.toeflScore}` : 'Not provided';
  const gpaInfo = user.gpa ? `${user.gpa} / 4.0` : 'Not provided';
  const budgetInfo = user.budget ? `${user.budget}` : 'Not provided';
  const careerInfo = user.careerGoal ? `${user.careerGoal}` : 'Not provided';
  const targetCountries = (user.targetCountries && user.targetCountries.length > 0)
    ? user.targetCountries.join(', ')
    : (user.preferredLocation || 'Not provided');
  const skillsInfo = (user.skills && user.skills.length > 0) ? user.skills.join(', ') : 'Not provided';
  const interestsInfo = (user.interests && user.interests.length > 0) ? user.interests.join(', ') : 'Not provided';
  const profileComp = user.profileCompletion !== undefined ? `${user.profileCompletion}%` : 'Not provided';

  // Read university, deadline, application, scholarship data strictly from the contextData (application data layer)
  const applicationsInfo = Array.isArray(contextData?.applications) && contextData.applications.length > 0
    ? contextData.applications.map((a: any) => `${a.university} - ${a.major} [Status: ${a.status}]`).join('; ')
    : (contextData?.applicationsCount ? `${contextData.applicationsCount} active application(s)` : 'No active applications logged');

  const universitiesInfo = Array.isArray(contextData?.universities) && contextData.universities.length > 0
    ? contextData.universities.map((u: any) => `${u.name} (${u.country})`).join(', ')
    : 'No universities currently tracked in active profile';

  const deadlinesInfo = Array.isArray(contextData?.deadlines) && contextData.deadlines.length > 0
    ? contextData.deadlines.map((d: any) => `${d.title} (${d.date} • ${d.category || 'Admissions'})`).join('; ')
    : 'No upcoming deadlines logged';

  const scholarshipsInfo = Array.isArray(contextData?.scholarships) && contextData.scholarships.length > 0
    ? contextData.scholarships.map((s: any) => `${s.name} (${s.amount})`).join('; ')
    : 'No scholarships tracked in active profile';

  const prompt = `You are FlowAI, the senior AI Academic Counselor for CampusFlow City.
You provide world-class, empathetic, highly actionable university admissions guidance.

STUDENT PROFILE CONTEXT (CampusFlow Profile Data):
- Name: ${user.name || 'Candidate'}
- Current School: ${user.currentSchool || 'Not provided'} (Graduation: ${user.graduationYear || 'Not provided'})
- Unweighted GPA: ${gpaInfo}
- Standardized Tests: SAT: ${satInfo} | IELTS: ${ieltsInfo} | TOEFL: ${toeflInfo}
- Target Degree & Major: ${user.targetDegree || 'Not provided'}${user.targetMajor ? ` in ${user.targetMajor}` : ''}
- Target Countries: ${targetCountries}
- Stated Career Goal: ${careerInfo}
- Skills: ${skillsInfo}
- Interests: ${interestsInfo}
- Budget: ${budgetInfo}
- Profile Completion: ${profileComp}

APPLICATION DATA LAYER CONTEXT (From CampusFlow Platform State):
- Active Applications: ${applicationsInfo}
- Tracked Universities: ${universitiesInfo}
- Upcoming Deadlines: ${deadlinesInfo}
- Scholarships Tracked: ${scholarshipsInfo}

RECENT CONVERSATION HISTORY:
${conversationHistory || 'None'}

STUDENT QUERY:
"${userQuery}"

GUIDELINES:
1. Ground your response specifically in ${user.name || 'the student'}'s CampusFlow Profile Data (GPA, test scores, target major, and target regions) or note when data points are not provided.
2. Clearly identify that your guidance is AI-generated guidance based on CampusFlow Prototype Data.
3. Structure your answer cleanly with Markdown headings, bullet points, and bold key terms.
4. Be direct, authoritative, and encouraging. Never invent false institutional partnerships or promise guaranteed admissions.
5. Also return 2 to 4 suggested follow-up questions or actionable steps that the student can explore next.

Return your response strictly in valid JSON matching this schema:
{
  "reply": "Comprehensive, beautifully formatted markdown response to the student's question",
  "recommendations": [
    "Suggested follow-up question or action 1",
    "Suggested follow-up question or action 2",
    "Suggested follow-up question or action 3"
  ]
}`;

  try {
    const response = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are FlowAI, a professional higher education counselor. Return response in JSON with reply and recommendations.',
      },
    });

    const parsed = JSON.parse(cleanJsonText(response.text || '{}'));
    return {
      reply: parsed.reply || generateFallbackAdvisorReply(user, userQuery, contextData).reply,
      recommendations: parsed.recommendations || [
        'Compare admission chances across target regions',
        'Review my Statement of Purpose structure',
        'Explore merit scholarships matching my profile',
      ],
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
    };
  } catch (_err) {
    return generateFallbackAdvisorReply(user, userQuery, contextData);
  }
}

/**
 * 6. APPLICATION STUDIO: GEMINI DRAFTING ASSISTANT
 * Helps student draft:
 * - Statement of Purpose
 * - Personal Statement
 * - Study Plan
 * - Resume content
 * The student maintains full control of the final content before creating/opening in Google Docs.
 */
export async function draftApplicationDocument(params: {
  user: any;
  docType: 'sop' | 'personal_statement' | 'study_plan' | 'resume';
  targetUniversity?: string;
  targetProgram?: string;
  promptNotes?: string;
  educationPassport?: any;
  studentExperience?: string;
}) {
  const { user, docType, targetUniversity, targetProgram, promptNotes, educationPassport, studentExperience } = params;
  const uni = targetUniversity || 'Target University';
  const prog = targetProgram || user?.targetMajor || 'Undergraduate Degree';
  const name = user?.name || 'Candidate';
  const gpa = user?.gpa ? `${user.gpa} / ${user.maxGpa || 4.0}` : '3.88 / 4.0';

  let docTypeTitle = 'Statement of Purpose';
  let specificInstructions = '';

  if (docType === 'sop') {
    docTypeTitle = `Statement of Purpose - ${uni}`;
    specificInstructions = `
Draft an exceptional, rigorous Statement of Purpose (SOP) structured into:
1. Academic Catalyst & Research Motivation
2. Core Academic Foundations & Quantitative Milestones
3. Independent Projects, Applied Research & Technical Breakthroughs
4. Faculty, Laboratory & Programmatic Fit at ${uni}
5. Long-term Trajectory & Vision
Adhere strictly to standard admissions essay structure.`;
  } else if (docType === 'personal_statement') {
    docTypeTitle = `Personal Statement - ${uni}`;
    specificInstructions = `
Draft a compelling, authentic Personal Statement focused on:
1. Formative Personal Catalyst & Intellectual Discovery
2. Resilience, Overcoming Obstacles & Self-Directed Inquiry
3. Personal Values, Community Contribution & Diverse Perspectives
4. How Studying at ${uni} in ${prog} will crystallize this journey.
Keep the voice mature, grounded, and free of generic clichés.`;
  } else if (docType === 'study_plan') {
    docTypeTitle = `Academic Study Plan - ${prog} (${uni})`;
    specificInstructions = `
Draft a comprehensive, semester-by-semester Study Plan covering:
1. Academic Objectives & Specialization Focus in ${prog}
2. Year 1 & Year 2 Foundational & Core Laboratory Coursework
3. Year 3 Advanced Seminars, Independent Research & Electives
4. Year 4 Senior Capstone / Undergraduate Thesis Proposal
5. Post-Graduation Career or Doctoral Trajectory.`;
  } else if (docType === 'resume') {
    docTypeTitle = `Academic & Technical Resume - ${name}`;
    specificInstructions = `
Draft clean, high-impact academic resume content including:
1. Professional Summary / Objective statement tailored to ${uni} ${prog}
2. Education section with GPA (${gpa}), relevant coursework, and honors
3. Technical & Applied Skills breakdown (Languages, Frameworks, Systems, Methodologies)
4. Academic Projects & Research Experience formatted with XYZ bullet points (Accomplished [X], measured by [Y], by doing [Z])
5. Leadership, Extracurriculars & Honors.`;
  }

  const prompt = `You are the Lead Admissions Counselor and Executive Writing Mentor at CampusFlow City.
Draft an initial academic draft for a student application document. The student will review, refine, and retain complete control of the final content before exporting to Google Docs.

DOCUMENT TYPE: ${docTypeTitle}
TARGET INSTITUTION: ${uni}
TARGET PROGRAM: ${prog}
STUDENT PROFILE (Prototype Data):
- Name: ${name}
- GPA: ${gpa}
- Standardized Scores: SAT: ${user?.satScore || '1490'} | IELTS: ${user?.ieltsScore || '8.0'}
- Skills: ${(user?.skills || []).join(', ') || 'Computer Science, Machine Learning, Python'}
- Career Goal: ${user?.careerGoal || 'AI Research Scientist'}
- Special Notes / Student Prompt: ${promptNotes || 'Focus on academic rigor, passion for research, and concrete problem-solving'}
- Additional Student Notes: ${studentExperience || 'None provided'}
- Passport Badges/Grades: ${educationPassport ? JSON.stringify(educationPassport.academicScores?.slice(0, 4) || []) : 'Top tier academic metrics'}

TASK REQUIREMENTS:
${specificInstructions}

Format requirements:
- Return valid JSON matching the following schema:
{
  "title": "${docTypeTitle}",
  "markdownContent": "Full formatted Markdown draft with headings (##), structured paragraphs, and clean bullet points",
  "plainTextContent": "Clean, formatted plain text ready for direct Google Docs document insertion",
  "sectionHeadings": ["Section 1 Title", "Section 2 Title"],
  "wordCount": 650,
  "guidanceNotes": "3 constructive coaching notes explaining how the student can personalize and polish this draft before final submission",
  "sourceLabel": "Prototype Data",
  "guidanceLabel": "AI-generated guidance"
}

Ensure the writing is academically rigorous, articulate, and realistic.`;

  try {
    const response = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are an admissions writing coach. Generate rigorous, structured university admissions drafts in JSON.',
      },
    });

    const parsed = JSON.parse(cleanJsonText(response.text || '{}'));
    return {
      ...parsed,
      title: parsed.title || docTypeTitle,
      sourceLabel: 'Prototype Data',
      guidanceLabel: 'AI-generated guidance',
      generatedAt: new Date().toISOString(),
    };
  } catch (_err) {
    return generateFallbackApplicationDoc(params);
  }
}

/**
 * 7. "YOUR NEXT BEST ACTION" CONNECTED GEMINI ENGINE
 * Connects all 7 student data pillars:
 * 1. Education Passport
 * 2. Applications
 * 3. Deadlines
 * 4. Drive documents
 * 5. Gmail admissions
 * 6. Calendar events
 * 7. Education City opportunities
 *
 * Returns the SINGLE most useful action and explains WHY.
 */
export async function evaluateSingleNextBestAction(params: {
  user: any;
  passport: any;
  applications: any[];
  deadlines: any[];
  driveDocuments: any[];
  admissionsEmails: any[];
  calendarEvents: any[];
  cityOpportunities?: any[];
}) {
  const {
    user,
    passport,
    applications = [],
    deadlines = [],
    driveDocuments = [],
    admissionsEmails = [],
    calendarEvents = [],
    cityOpportunities = [],
  } = params;

  const prompt = `You are the CampusFlow City Central Intelligence Engine.
Analyze the student's complete academic ecosystem across ALL SEVEN (7) CONNECTED PILLARS:
1. Education Passport: (GPA: ${user?.gpa || '3.88'}, Target Major: ${user?.targetMajor || 'Computer Science'}, Verified Badges: ${(passport?.verifiedBadges || []).length})
2. Active Applications: ${JSON.stringify((applications || []).map((a: any) => ({ university: a.universityName, program: a.program, status: a.status, nextStep: a.nextStep, deadline: a.deadline })), null, 2)}
3. Upcoming Deadlines: ${JSON.stringify((deadlines || []).slice(0, 5).map((d: any) => ({ title: d.title, date: d.dateStr, daysLeft: d.daysLeft, urgency: d.urgency, category: d.category })), null, 2)}
4. Drive Documents: ${JSON.stringify((driveDocuments || []).slice(0, 5).map((d: any) => ({ name: d.name, category: d.category, status: d.status, selectedFor: d.selectedForApplicationName })), null, 2)}
5. Gmail Admissions Inbox: ${JSON.stringify((admissionsEmails || []).slice(0, 5).map((e: any) => ({ subject: e.subject, sender: e.sender, urgency: e.urgency, action: e.requiredAction })), null, 2)}
6. Calendar Events: ${JSON.stringify((calendarEvents || []).slice(0, 5).map((c: any) => ({ title: c.title, start: c.startDateTime, category: c.category })), null, 2)}
7. Education City Opportunities: ${JSON.stringify((cityOpportunities || []).slice(0, 4).map((o: any) => ({ name: o.name, matchScore: o.matchScore, nextAction: o.nextAction?.label })), null, 2)}

TASK:
Identify and synthesize the SINGLE MOST USEFUL NEXT BEST ACTION the student should execute right now.
Do NOT return multiple actions. Select the ONE single highest-impact, most time-sensitive action and explain with precision WHY it is the single most useful action.

Return strictly in valid JSON matching this schema:
{
  "actionTitle": "Clear, direct imperative action title",
  "category": "document" | "application" | "deadline" | "email" | "calendar" | "opportunity" | "passport" | "task",
  "urgency": "urgent" | "high" | "normal",
  "actionStep": "Concrete, step-by-step instruction on what to do right now",
  "whyThisAction": "In-depth, 2-3 sentence strategic explanation detailing exactly WHY this single action is the most impactful move right now, connecting the specific emails, deadlines, and application requirements.",
  "targetTab": "applications" | "documents" | "deadlines" | "inbox" | "studio" | "passport" | "city",
  "supportingSignals": {
    "gmail": "Summary of relevant Gmail admissions signal",
    "deadline": "Summary of calendar/deadline signal",
    "drive": "Summary of drive documents signal",
    "application": "Summary of active application signal",
    "passport": "Summary of passport credential signal",
    "calendar": "Summary of calendar event signal",
    "cityOpportunity": "Summary of city opportunity signal"
  },
  "sourceLabel": "Prototype Data",
  "guidanceLabel": "AI-generated guidance"
}`;

  try {
    const response = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are the CampusFlow Next Best Action Engine. Synthesize all 7 inputs to return the single most useful action with why.',
      },
    });

    const parsed = JSON.parse(cleanJsonText(response.text || '{}'));
    return {
      ...parsed,
      sourceLabel: 'Prototype Data',
      guidanceLabel: 'AI-generated guidance',
      analyzedAt: new Date().toISOString(),
    };
  } catch (_err) {
    return generateFallbackSingleNextBestAction(params);
  }
}


// ==========================================
// RESILIENT DOMAIN FALLBACK GENERATORS
// Used when all candidate models are experiencing spikes or unavailable
// ==========================================

function generateFallbackPassportAnalysis(user: any, passport: any) {
  const gpa = user?.gpa ? Number(user.gpa) : null;
  const major = user?.targetMajor || 'target program';
  const degree = user?.targetDegree || 'Undergraduate';
  const name = user?.name || 'Candidate';

  const strengths = [
    gpa && gpa >= 3.5
      ? `Strong cumulative academic standing (${gpa}/4.0) within target discipline prerequisites.`
      : `Established coursework in ${user?.targetMajor || 'core academic areas'} with demonstrable potential.`,
    user?.skills?.length
      ? `Technical proficiency and foundational skill profile across ${user.skills.slice(0, 3).join(', ')}.`
      : `Balanced academic interests aligned with competitive university benchmarks.`,
    user?.satScore
      ? `Standardized testing benchmark verified with SAT score of ${user.satScore}.`
      : `Extracurricular and leadership initiatives demonstrated across high school milestones.`
  ];

  const gaps = [
    !user?.satScore && !user?.ieltsScore
      ? 'Standardized test requirements (SAT/ACT and English proficiency) are not yet logged in profile.'
      : 'Competitive research publications or university-level project portfolio could be strengthened.',
    user?.budget && user.budget.toLowerCase().includes('need')
      ? 'Need-based financial aid requirement necessitates targeted institutional scholarship applications.'
      : 'Supplemental personal statement drafts require refinement for top-tier selective programs.'
  ];

  const recommendedImprovements = [
    {
      priority: 'High',
      title: 'Standardized & Language Testing Strategy',
      action: user?.ieltsScore ? 'Prepare score delivery reports for priority deadline universities.' : 'Complete diagnostic practice exams and book examination testing windows.',
      timeline: 'Next 30-45 Days',
      expectedImpact: 'Essential prerequisite verification for global admissions eligibility.'
    },
    {
      priority: 'High',
      title: 'Statement of Purpose & Portfolio Finalization',
      action: `Draft and refine academic statement highlighting specific interest in ${major}.`,
      timeline: 'Next 60 Days',
      expectedImpact: 'Significantly improves evaluation score during qualitative holistic admissions review.'
    },
    {
      priority: 'Medium',
      title: 'Target Institutional Scholarship Applications',
      action: 'Filter scholarship catalog by merit and major requirements to submit early applications.',
      timeline: 'Upcoming Term',
      expectedImpact: 'Offsets estimated annual tuition and living expenses.'
    }
  ];

  return {
    sourceLabel: 'Based on CampusFlow Prototype Data',
    guidanceLabel: 'AI-generated guidance',
    analyzedAt: new Date().toISOString(),
    overallScore: gpa ? Math.min(96, Math.round(gpa * 23.5)) : 82,
    percentileTier: gpa && gpa >= 3.8 ? 'Top 5% Cohort' : 'Top 15% Cohort',
    summary: `Admissions and academic profile evaluation for ${name} seeking ${degree} admission in ${major}. Demonstrates competitive baseline metrics with solid alignment toward accredited institutions.`,
    evaluationSummary: `Admissions and academic profile evaluation for ${name} seeking ${degree} admission in ${major}. Demonstrates competitive baseline metrics with solid alignment toward accredited institutions.`,
    strengths,
    gaps,
    recommendedImprovements
  };
}

function generateFallbackOpportunityMatching(user: any, items: any[]) {
  if (!Array.isArray(items) || items.length === 0) return [];

  const userGpa = user?.gpa ? Number(user.gpa) : 3.5;

  return items.map((item, index) => {
    const isScholarship = item.type === 'scholarship';
    const baseMatch = Math.max(52, Math.min(95, 92 - index * 6 + (userGpa >= 3.8 ? 4 : 0)));
    const tier = baseMatch >= 88 ? 'Strong Match' : baseMatch >= 75 ? 'Good Match' : baseMatch >= 65 ? 'Reach' : 'Safety';

    return {
      id: item.id || `item-${index}`,
      title: item.title || item.name || 'Academic Opportunity',
      type: item.type || 'university',
      institutionOrHost: item.institutionOrHost || item.institution || item.provider || 'CampusFlow Partner',
      matchPercentage: baseMatch,
      matchTier: tier,
      whyItMatches: `Aligned with candidate's academic profile (${user?.targetMajor || 'chosen major'}) and target study benchmarks.`,
      missingRequirements: isScholarship
        ? ['Institutional scholarship essay submission', 'Official transcript verification']
        : ['Statement of Purpose review', 'Academic letter of recommendation'],
      nextAction: isScholarship
        ? 'Submit application before the priority funding deadline.'
        : 'Bookmark program and verify credit transfer eligibility.',
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
    };
  });
}

function generateFallbackNextBestActions(user: any, deadlines: any[], applications: any[], documents: any[], scholarships: any[]) {
  const actions: any[] = [];
  let rank = 1;

  if (Array.isArray(deadlines) && deadlines.length > 0) {
    const topDeadline = deadlines[0];
    actions.push({
      rank: rank++,
      priority: 'Urgent',
      category: 'Deadlines',
      title: `Upcoming Deadline: ${topDeadline.title || 'Admissions Cutoff'}`,
      description: `Complete all pending requirements before ${topDeadline.date || 'the upcoming deadline'}.`,
      action: 'Open Deadlines view to review document checklist.',
      targetTab: 'deadlines',
      dueDate: topDeadline.date || 'Upcoming',
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
    });
  }

  if (Array.isArray(applications) && applications.length > 0) {
    const pendingApp = applications.find((a: any) => a.status === 'Draft' || a.status === 'In Progress') || applications[0];
    actions.push({
      rank: rank++,
      priority: 'High',
      category: 'Applications',
      title: `Progress Application: ${pendingApp.university || 'Target University'}`,
      description: `Review supplemental essays and required documents for ${pendingApp.major || 'your major'}.`,
      action: 'Visit Applications to finalize submission materials.',
      targetTab: 'applications',
      dueDate: 'Next 14 Days',
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
    });
  }

  if (Array.isArray(documents) && documents.length > 0) {
    const draftDoc = documents.find((d: any) => d.status === 'Draft' || d.status === 'Needs Review') || documents[0];
    actions.push({
      rank: rank++,
      priority: 'Medium',
      category: 'Documents',
      title: `Upload / Update: ${draftDoc.title || 'Transcript / Test Score'}`,
      description: `Ensure official certified copies are ready for counselor or institution review.`,
      action: 'Visit Documents view to verify file upload.',
      targetTab: 'documents',
      dueDate: 'Next 30 Days',
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
    });
  }

  if (Array.isArray(scholarships) && scholarships.length > 0) {
    const topScholarship = scholarships[0];
    actions.push({
      rank: rank++,
      priority: 'Medium',
      category: 'Scholarships',
      title: `Apply: ${topScholarship.name || 'Merit Grant'} (${topScholarship.amount || 'Funding'})`,
      description: `Check eligibility criteria and draft the scholarship essay.`,
      action: 'Review scholarship criteria and submit application.',
      targetTab: 'scholarships',
      dueDate: topScholarship.deadline || 'Before Term Start',
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
    });
  }

  if (actions.length < 4) {
    actions.push({
      rank: rank++,
      priority: 'Low',
      category: 'Profile',
      title: 'Complete Profile Data & Test Scores',
      description: 'Add unweighted GPA, standardized test scores, and target countries for enhanced AI matchmaking.',
      action: 'Go to Profile View and save updated academic records.',
      targetTab: 'profile',
      dueDate: 'Anytime',
      sourceLabel: 'Based on CampusFlow Prototype Data',
      guidanceLabel: 'AI-generated guidance',
    });
  }

  return actions;
}

function generateFallbackPathway(user: any, careerTarget: string, budgetTarget: string, locationTarget: string, academicProfile: any) {
  const goal = careerTarget || user?.careerGoal || 'Artificial Intelligence Research Scientist';
  const location = locationTarget || 'United States / Global';

  return {
    sourceLabel: 'Based on CampusFlow Prototype Data',
    guidanceLabel: 'AI-generated guidance',
    generatedAt: new Date().toISOString(),
    careerGoal: goal,
    selectedLocation: location,
    estimatedBudget: budgetTarget || user?.budget || '$35,000 / year',
    matchScore: 92,
    stages: {
      career: {
        title: goal,
        outlook: 'Exponential growth driven by global industry transformation',
        avgStartingSalary: '$110,000 - $145,000 / year',
        topHiringRegions: [location, 'North America', 'Western Europe', 'Singapore'],
      },
      education: [
        {
          tier: 'Undergraduate Program',
          degree: 'B.S. in Computer Science & Applied Mathematics',
          recommendedInstitutions: ['University of Illinois Urbana-Champaign', 'University of Toronto', 'National University of Singapore'],
          estTuitionPerYear: budgetTarget || '$38,000 / year',
          scholarshipPotential: 'High (Merit-based departmental fellowships)',
        },
      ],
      skills: [
        {
          category: 'Core Technical',
          skillsList: ['Python', 'PyTorch / TensorFlow', 'Linear Algebra & Calculus', 'Data Structures & Algorithms'],
          proficiencyTarget: 'Advanced Practitioner',
        },
        {
          category: 'Domain & Research',
          skillsList: ['Neural Network Architectures', 'Scientific Writing', 'Statistical Inference'],
          proficiencyTarget: 'Working Research Proficiency',
        },
      ],
      exams: [
        {
          examName: 'SAT / ACT Diagnostic',
          targetScore: '1500+ SAT / 34+ ACT',
          recommendedWindow: 'Fall Junior Year',
          importance: 'High for merit scholarship consideration',
        },
        {
          examName: 'TOEFL iBT / IELTS Academic',
          targetScore: '105+ TOEFL / 7.5+ IELTS',
          recommendedWindow: 'Spring Junior Year',
          importance: 'Mandatory prerequisite for visa and international admissions',
        },
      ],
      projects: [
        {
          title: 'Applied Machine Learning Benchmark Suite',
          domain: 'Open Source AI & Benchmarking',
          timeline: 'Summer between Year 1 and Year 2',
          expectedOutcome: 'Published public GitHub repository with comprehensive technical documentation',
        },
      ],
      internship: [
        {
          role: 'Machine Learning Research Intern',
          industryTarget: 'University AI Institute or DeepTech Laboratory',
          timeline: 'Summer after Year 2 or Year 3',
          keyDeliverable: 'Co-authored workshop paper or deployed production model',
        },
      ],
      careerLaunch: {
        entryRole: goal,
        targetCompanies: ['DeepMind', 'OpenAI', 'Google Research', 'Anthropic', 'Leading Tech Labs'],
        yearOneMilestones: [
          'Deliver first end-to-end production AI module',
          'Contribute to open science publications and patent filings',
        ],
        fiveYearVision: 'Senior Staff Research Scientist leading frontier model research programs',
      },
    },
  };
}

function generateFallbackAdvisorReply(user: any, userQuery: string, contextData: any) {
  const name = user?.name || 'there';
  const gpa = user?.gpa ? `${user.gpa} / 4.0` : 'Not provided';
  const major = user?.targetMajor || 'your selected field of study';

  return {
    reply: `### Academic Guidance for ${name}

Thank you for your question regarding **${userQuery}**.

Based on your **CampusFlow Profile Data**:
- **Target Field**: ${major}
- **Unweighted GPA**: ${gpa}
- **Target Countries**: ${(user?.targetCountries && user.targetCountries.length > 0) ? user.targetCountries.join(', ') : (user?.preferredLocation || 'Not provided')}

#### Key Strategy Recommendations
1. **Academic Alignment**: Ensure your upcoming semester coursework emphasizes rigorous prerequisites in ${major}. Admissions committees pay close attention to upward grade trends.
2. **Standardized & Language Milestones**: Verify examination registration deadlines well in advance of university priority deadlines.
3. **Holistic Profile Development**: Pair classroom achievements with demonstrated leadership, capstone projects, or community initiatives.
4. **Funding & Scholarships**: Prioritize early institutional application cycles to maximize eligibility for departmental fellowships and merit awards.

*Guidance generated based on CampusFlow Prototype Data.*`,
    recommendations: [
      'Compare admission acceptance rates for my target universities',
      'Review structure for my Statement of Purpose',
      'Identify merit scholarships matching my profile credentials',
    ],
    sourceLabel: 'Based on CampusFlow Prototype Data',
    guidanceLabel: 'AI-generated guidance',
  };
}

function generateFallbackDocumentAnalysis(user: any, document: any, appTarget: string) {
  const category = document.category || 'Transcript';
  const name = document.name || document.title || 'Official Document';

  const defaultSummaries: Record<string, string> = {
    Transcript: `Strong academic trajectory with high marks in advanced analytical subjects. Demonstrates rigorous coursework consistent with competitive admissions criteria for ${appTarget}.`,
    Resume: `Well-structured technical resume highlighting project experience, extracurricular leadership, and quantifiable achievements relevant to ${appTarget}.`,
    SOP: `Compelling personal narrative connecting student intellectual curiosity with future academic research goals at ${appTarget}. Clear alignment with institutional values.`,
    LOR: `Enthusiastic endorsement from academic instructor highlighting intellectual vitality, peer leadership, and classroom contribution.`,
    ID: `Verified official identification document meeting international credential standards.`,
    'Test Score': `Competitive standardized score profile satisfying and exceeding published minimum language and reasoning requirements.`,
  };

  return {
    summary: defaultSummaries[category] || `Comprehensive review of ${name} confirms strong suitability for submission to ${appTarget}.`,
    strengths: [
      `Direct topical and credential alignment with target program at ${appTarget}`,
      `Verified authenticity and professional formatting compliant with international standards`,
      `Demonstrates sustained academic engagement and high competence in prerequisites`
    ],
    recommendations: [
      `Review page scan clarity before final transmission to registrar portal`,
      `Keep digital verification receipt logged within CampusFlow vault for visa filing`
    ],
    keyPoints: [
      `Category: ${category}`,
      `Application Match: ${appTarget}`,
      `Verification Caliber: High / Admissible`
    ],
    suggestedApplicationMatch: appTarget,
    confidenceScore: 95,
    sourceLabel: 'CampusFlow Google Drive Analysis',
    guidanceLabel: 'AI-generated guidance (Prototype Fallback)',
    analyzedAt: new Date().toISOString(),
  };
}

/**
 * 7. EDUCATION CITY - OPPORTUNITY MATCH EXPLANATION
 * Uses Gemini to explain why an opportunity/institution in Education City matches the student.
 * Explains academic fit, opportunity network pathway, financial/cost factors, and recommended next action.
 */
export async function explainOpportunityMatch(user: any, passport: any, place: any) {
  const prompt = `
You are a distinguished, objective, and civic-minded Higher Education Admissions Advisor in CampusFlow Education City.
A student is considering the following opportunity/institution from the Education City interactive network:

STUDENT PROFILE:
- Name: ${user.name || 'Maya Sharma'}
- Target Major: ${user.targetMajor || 'Computer Science & Artificial Intelligence'}
- Career Goal: ${user.careerGoal || 'AI Research Scientist'}
- Current GPA: ${user.gpa || 3.85} / ${user.maxGpa || 4.0}
- Standardized Scores: SAT ${user.satScore || 1490}, IELTS ${user.ieltsScore || 8.0}
- Skills: ${(user.skills || ['Python', 'Machine Learning', 'Linear Algebra']).join(', ')}
- Interests: ${(user.interests || ['Deep Learning', 'Robotics', 'Quantum Computing']).join(', ')}
- Budget / Financial Preferences: ${user.budget || '$30,000 - $50,000/yr'}
- Target Countries: ${(user.targetCountries || ['Canada', 'United States', 'United Kingdom']).join(', ')}

EDUCATION PASSPORT CREDENTIALS:
- Verified Status: ${passport?.status || 'Verified'}
- Passport ID: ${passport?.passportNumber || 'CF-EDU-2026-8891'}
- Verified Badges: ${(passport?.verifiedBadges || []).map((b: any) => b.title).join(', ') || 'AP Scholar with Distinction, Math Olympiad Gold'}

SELECTED EDUCATION CITY NODE:
- Name: ${place.name}
- Category: ${place.category} (${place.subCategory || ''})
- Location: ${place.address || ''}, ${place.city}, ${place.country}
- Key Programs: ${(place.programs || []).join(', ')}
- Available Opportunities: ${(place.opportunities || []).join(', ')}
- Match Score: ${place.matchScore}% (${place.matchTier})
- Estimated Cost: Tuition/Fee: ${place.estimatedCost?.tuitionOrFee || 'N/A'}, Living Cost: ${place.estimatedCost?.livingCost || 'N/A'}, Aid: ${place.estimatedCost?.financialAid || 'N/A'}
- Stated Next Action: ${place.nextAction?.label || 'Explore'}
- Opportunity Network Path:
  * Student: ${place.opportunityNetwork?.studentRole || user.name}
  * Passport: ${place.opportunityNetwork?.passportPrerequisite || 'Verified Credentials'}
  * Institution: ${place.opportunityNetwork?.universityOrInstitution || place.name}
  * Course: ${place.opportunityNetwork?.courseOrProgram || 'Specialized Program'}
  * Scholarship: ${place.opportunityNetwork?.scholarshipMatch || 'Merit Aid'}
  * Exam: ${place.opportunityNetwork?.examRequirement || 'Standardized Testing'}
  * Internship: ${place.opportunityNetwork?.internshipLink || 'Industry Placement'}
  * Career: ${place.opportunityNetwork?.careerOutcome || 'Target Career'}

TASK:
Provide a rigorous, practical, professional, and civic explanation of why this opportunity matches the student.
DO NOT use neon, holographic, or sci-fi terminology. Keep tone dignified, empowering, and pragmatic.
Structure your output as strict JSON with this exact schema:
{
  "matchSummary": "A concise, compelling 2-3 sentence overview of why this opportunity is an exceptional fit for the student.",
  "academicFitReason": "Specific breakdown of how student's GPA, coursework, and verified skills align with prerequisites.",
  "networkProgressionExplanation": "A step-by-step walkthrough explaining how the progression flows from Student -> Education Passport -> Institution -> Course -> Scholarship -> Exam -> Internship -> Ultimate Career.",
  "financialAndCostAnalysis": "Practical analysis of tuition, living expenses, and strategies to offset costs using scholarships/internships.",
  "keyAdvantages": [
    "Advantage 1 with concrete relevance to student goals",
    "Advantage 2 with concrete relevance to student goals",
    "Advantage 3 with concrete relevance to student goals"
  ],
  "recommendedImmediateNextStep": "One clear, high-impact tactical next action the student should take right now.",
  "guidanceLabel": "AI-generated guidance"
}
`;

  try {
    const response = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const text = response?.text || '';
    const cleaned = cleanJsonText(text);
    const parsed = JSON.parse(cleaned);
    return {
      ...parsed,
      isAiGenerated: true,
      guidanceLabel: 'AI-generated guidance',
      modelUsed: 'gemini-flash-latest',
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn('Falling back to local template for explainOpportunityMatch:', error);
    return generateFallbackOpportunityMatch(user, place);
  }
}

function generateFallbackOpportunityMatch(user: any, place: any) {
  const studentName = user?.name || 'Maya Sharma';
  const major = user?.targetMajor || 'Computer Science & Artificial Intelligence';
  const goal = user?.careerGoal || 'AI Research Scientist';

  return {
    matchSummary: `${place.name} aligns exceptionally well with ${studentName}'s background in ${major}. With a match score of ${place.matchScore}%, your demonstrated GPA (${user?.gpa || 3.85}) and analytical coursework fulfill the core competitive benchmarks for this ${place.category.toLowerCase()}.`,
    academicFitReason: `Your verified academic score profile (GPA ${user?.gpa || 3.85}, SAT ${user?.satScore || 1490}) places you in the upper decile of prospective applicants. Coursework in ${(user?.skills || ['Python', 'Calculus', 'Machine Learning']).slice(0, 2).join(' and ')} directly fulfills prerequisites for ${place.programs?.[0] || 'core programs'}.`,
    networkProgressionExplanation: `The opportunity pathway maps cleanly from your verified Education Passport (${user?.passportId || 'CF-EDU-2026'}) into ${place.opportunityNetwork?.universityOrInstitution || place.name}. Completing ${place.opportunityNetwork?.courseOrProgram || place.programs?.[0] || 'the program'} unlocks ${place.opportunityNetwork?.scholarshipMatch || 'merit fellowships'}, while satisfying ${place.opportunityNetwork?.examRequirement || 'exam benchmarks'}. This bridges directly into ${place.opportunityNetwork?.internshipLink || 'premier research co-ops'}, propelling you toward ${place.opportunityNetwork?.careerOutcome || goal}.`,
    financialAndCostAnalysis: `Estimated tuition/fee of ${place.estimatedCost?.tuitionOrFee || 'standard rates'} can be substantially mitigated through ${place.estimatedCost?.financialAid || 'merit awards and paid internships'}. ${place.estimatedCost?.livingCost ? `Living expenses of approximately ${place.estimatedCost.livingCost} should be budgeted in advance.` : ''}`,
    keyAdvantages: [
      `Direct pedagogical and technological alignment with ${major}`,
      `Robust access to ${place.opportunities?.[0] || 'industry research fellowships'}`,
      `Documented track record of placing graduates into high-impact roles in ${goal}`
    ],
    recommendedImmediateNextStep: place.nextAction?.label ? `Proceed with '${place.nextAction.label}' to lock in priority consideration.` : `Initiate pre-application review on your Education Passport dashboard.`,
    guidanceLabel: 'AI-generated guidance',
    isAiGenerated: false,
    generatedAt: new Date().toISOString(),
  };
}

function generateFallbackApplicationDoc(params: any) {
  const { user, docType, targetUniversity, targetProgram, promptNotes } = params;
  const uni = targetUniversity || 'University of Toronto';
  const prog = targetProgram || user?.targetMajor || 'Computer Science (BSc)';
  const name = user?.name || 'Maya Sharma';
  const gpa = user?.gpa ? `${user.gpa} / 4.0` : '3.88 / 4.0';

  if (docType === 'sop') {
    const markdown = `# Statement of Purpose
## Candidate: ${name}
### Applying for: ${prog} at ${uni}

---

## 1. Academic Catalyst & Research Trajectory
My passion for computing began with curiosity about how mathematical abstraction translates into real-world autonomous intelligence. Throughout my upper secondary coursework, I discovered that algorithms are not merely computational routines, but instruments capable of expanding human potential. Maintaining a cumulative unweighted GPA of ${gpa}, my rigorous coursework in Higher Level Mathematics and Advanced Algorithmic Thinking cemented my determination to pursue ${prog} at ${uni}.

## 2. Quantitative Foundations & Technical Projects
Beyond traditional coursework, I sought opportunities to test theoretical principles through rigorous implementation. I engineered an open-source autonomous perception pipeline designed for resource-constrained embedded systems, achieving a 40% reduction in inference latency. This challenge highlighted the delicate balance between algorithmic fidelity and computational efficiency, inspiring me to explore systems-level distributed computing and machine learning architectures.

## 3. Why ${uni}
${uni} stands at the global forefront of computer science and transformative research. I am eager to contribute to collaborative research laboratories exploring robust intelligence and reliable distributed systems. The faculty's pioneering contributions provide the ideal intellectual environment for my academic curiosity.

## 4. Long-Term Vision & Societal Impact
My ultimate goal is to lead fundamental research in dependable computing systems. With the rigorous academic training, world-class faculty mentorship, and multidisciplinary community at ${uni}, I am confident I will synthesize theoretical mastery with high-impact societal solutions.`;

    return {
      title: `Statement of Purpose - ${uni}`,
      markdownContent: markdown,
      plainTextContent: markdown.replace(/[#*_-]/g, '').trim(),
      sectionHeadings: [
        'Academic Catalyst & Research Trajectory',
        'Quantitative Foundations & Technical Projects',
        `Why ${uni}`,
        'Long-Term Vision & Societal Impact'
      ],
      wordCount: 420,
      guidanceNotes: 'Personalize section 3 with specific research laboratories or faculty whose publications you follow. Ensure your unique voice remains authentic.',
      sourceLabel: 'Prototype Data',
      guidanceLabel: 'AI-generated guidance',
      generatedAt: new Date().toISOString(),
    };
  } else if (docType === 'personal_statement') {
    const markdown = `# Personal Statement
## Candidate: ${name}
### Application for: ${uni} - ${prog}

---

## The Intersection of Curiosity and Perseverance
Growing up, my world was defined by systematic inquiry. Whether taking apart old radio receivers or debugging complex logic gates, I learned that persistent curiosity turns frustration into revelation. 

During my junior year, leading our school's robotics Olympiad team through unexpected sensor calibration failures taught me humility and resilience. Instead of settling for superficial workarounds, our team methodically isolated hardware noise from algorithmic drift. That experience reshaped how I view challenges: as invitations to question assumptions and build more resilient architectures.

At ${uni}, I look forward to bringing this relentless intellectual spirit, collaborating with peers from diverse backgrounds, and dedicating myself to the highest standard of academic inquiry in ${prog}.`;

    return {
      title: `Personal Statement - ${uni}`,
      markdownContent: markdown,
      plainTextContent: markdown.replace(/[#*_-]/g, '').trim(),
      sectionHeadings: [
        'The Intersection of Curiosity and Perseverance',
        'Leadership Under Ambiguity',
        `Contribution to the ${uni} Community`
      ],
      wordCount: 360,
      guidanceNotes: 'Add one specific anecdote from your formative experiences to bring your personal narrative to life before export.',
      sourceLabel: 'Prototype Data',
      guidanceLabel: 'AI-generated guidance',
      generatedAt: new Date().toISOString(),
    };
  } else if (docType === 'study_plan') {
    const markdown = `# Undergraduate Academic Study Plan
## Candidate: ${name}
### Degree Program: ${prog} at ${uni}

---

## Year 1: Foundational Theory & Computational Systems
- **Core Coursework:** Discrete Mathematics, Data Structures & Algorithms, Principles of Computer Organization, Calculus for Applied Sciences.
- **Milestone:** Establish top academic standing (GPA 3.8+) and participate in departmental research seminars.

## Year 2: Systems, Algorithms & Advanced Mathematics
- **Core Coursework:** Operating Systems, Distributed Systems, Probability & Statistics for Data Science, Theory of Computation.
- **Milestone:** Secure an undergraduate research assistantship in machine learning systems.

## Year 3: Advanced Seminars & Interdisciplinary Electives
- **Core Coursework:** Neural Network Architectures, Computer Systems Performance, Artificial Intelligence Laboratory.
- **Milestone:** Co-op/internship placement in industry research engineering.

## Year 4: Capstone Project & Senior Thesis
- **Focus:** Complete undergraduate honors thesis on efficient neural inference on edge devices.
- **Milestone:** Submit thesis paper to peer-reviewed student symposium and prepare graduate fellowship applications.`;

    return {
      title: `Academic Study Plan - ${prog} (${uni})`,
      markdownContent: markdown,
      plainTextContent: markdown.replace(/[#*_-]/g, '').trim(),
      sectionHeadings: [
        'Year 1: Foundational Theory & Computational Systems',
        'Year 2: Systems, Algorithms & Advanced Mathematics',
        'Year 3: Advanced Seminars & Interdisciplinary Electives',
        'Year 4: Capstone Project & Senior Thesis'
      ],
      wordCount: 310,
      guidanceNotes: 'Review the university course catalog for exact course codes to customize this study plan with precision.',
      sourceLabel: 'Prototype Data',
      guidanceLabel: 'AI-generated guidance',
      generatedAt: new Date().toISOString(),
    };
  } else {
    // Resume
    const markdown = `# Curriculum Vitae / Academic Resume
## ${name}
**Candidate for ${prog}** | Email: student@campusflow.city | Portfolio: Verified Education Passport

---

### EDUCATION
**Oakridge International Academy** (Graduating 2027)
- Cumulative GPA: ${gpa} (Top 2% Class Cohort)
- Standardized Benchmarks: SAT 1490/1600 (Math: 780, Reading/Writing: 710) | IELTS Academic: 8.0/9.0
- Key Coursework: IB Higher Level Mathematics: Analysis and Approaches (7/7), IB HL Computer Science (7/7), IB HL Physics (7/7)

### TECHNICAL PROFICIENCIES
- **Languages:** Python, Java, C++, TypeScript, SQL
- **Frameworks & Tools:** PyTorch, React, Git, Linux/UNIX, Node.js
- **Domains:** Algorithmic Optimization, Distributed Computing, Machine Learning

### ACADEMIC & RESEARCH PROJECTS
- **Edge Vision Inference Engine (PyTorch, C++):** Designed an embedded object detection pipeline achieving 40% latency reduction on low-power devices.
- **Distributed Consensus Simulator:** Built an interactive visualization tool for Raft consensus mechanisms used by over 300 students.

### HONORS & LEADERSHIP
- National High School Coding Olympiad — Finalist & Gold Medalist (2026)
- Captain, Robotics Engineering & Autonomous Navigation Team (2025–2026)
- Peer Tutor in Advanced Mathematics and Algorithmic Logic`;

    return {
      title: `Academic & Technical Resume - ${name}`,
      markdownContent: markdown,
      plainTextContent: markdown.replace(/[#*_-]/g, '').trim(),
      sectionHeadings: [
        'Education',
        'Technical Proficiencies',
        'Academic & Research Projects',
        'Honors & Leadership'
      ],
      wordCount: 290,
      guidanceNotes: 'Add links to your actual GitHub repositories or competition certificates before sharing with admissions committees.',
      sourceLabel: 'Prototype Data',
      guidanceLabel: 'AI-generated guidance',
      generatedAt: new Date().toISOString(),
    };
  }
}

function generateFallbackSingleNextBestAction(params: any) {
  const { deadlines = [], admissionsEmails = [], applications = [] } = params;

  const urgentEmail = admissionsEmails.find((e: any) => e.urgency === 'urgent') || admissionsEmails[0];
  const upcomingDl = deadlines.find((d: any) => !d.completed && d.daysLeft <= 14) || deadlines[0];
  const appTarget = applications[0]?.universityName || 'University of Toronto';

  return {
    actionTitle: 'Submit Official Term 1 Transcript to University of Toronto',
    category: 'document',
    urgency: 'urgent',
    actionStep: 'Attach your verified Term 1 transcript from Google Drive and submit it before the October 14 priority deadline.',
    whyThisAction: `Your admissions inbox received an urgent notification from University of Toronto Admissions requesting your official Term 1 transcript by Oct 14 (${upcomingDl?.daysLeft || 5} days remaining). Your certified transcript document is already stored in your Drive documents, so taking this action right now prevents your file from being delayed or deferred to regular decision.`,
    targetTab: 'documents',
    supportingSignals: {
      gmail: urgentEmail ? `${urgentEmail.sender}: ${urgentEmail.subject}` : 'Admissions officer requested Term 1 academic update',
      deadline: upcomingDl ? `${upcomingDl.title} due on ${upcomingDl.dateStr} (${upcomingDl.daysLeft} days remaining)` : 'Critical deadline approaching in 5 days',
      drive: 'Official Mid-Year Transcript (Term 1) is ready in Google Drive',
      application: `${appTarget} status: Documents Pending (72% complete)`,
      passport: 'Academic score verified: GPA 3.88 with top quantitative percentiles',
      calendar: 'Submission reminder synced to primary calendar',
      cityOpportunity: 'University of Toronto Computer Science aligns with top research benchmarks in Education City'
    },
    sourceLabel: 'Prototype Data',
    guidanceLabel: 'AI-generated guidance',
    analyzedAt: new Date().toISOString(),
  };
}



