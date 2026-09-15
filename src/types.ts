export type NavigationTab =
  | 'landing'
  | 'dashboard'
  | 'passport'
  | 'universities'
  | 'courses'
  | 'scholarships'
  | 'exams'
  | 'opportunities'
  | 'applications'
  | 'studio'
  | 'inbox'
  | 'deadlines'
  | 'documents'
  | 'advisor'
  | 'simulator'
  | 'city'
  | 'compare'
  | 'profile'
  | 'settings';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'Student' | 'Counselor' | 'Admin';
  headline: string;
  passportId: string;
  currentSchool: string;
  graduationYear: number;
  gpa: number;
  maxGpa: number;
  targetDegree: string;
  targetMajor: string;
  targetCountries: string[];
  satScore?: number;
  actScore?: number;
  ieltsScore?: number;
  toeflScore?: number;
  profileCompletion: number;
  bio?: string;
  skills?: string[];
  interests?: string[];
  careerGoal?: string;
  budget?: string;
  preferredLocation?: string;
}

export interface University {
  id: string;
  name: string;
  logo: string;
  crestUrl: string;
  coverImage: string;
  location: string;
  city: string;
  country: string;
  ranking: number;
  rankingBadge: string; // e.g. "Top 10", "Top 50"
  matchScore: number; // e.g. 96
  matchTier: 'Strong Match' | 'Good Match' | 'Reach' | 'Safety';
  acceptanceRate: string;
  tuitionPerYear: string;
  livingCosts: string;
  description: string;
  popularMajors: string[];
  requirements: {
    minGpa: number;
    satScore?: number;
    ieltsScore?: number;
    documents: string[];
  };
  isShortlisted?: boolean;
  websiteUrl: string;
}

export interface Course {
  id: string;
  universityId: string;
  universityName: string;
  universityCountry: string;
  title: string;
  degreeLevel: 'Bachelor' | 'Master' | 'Doctorate' | 'Certificate';
  duration: string;
  tuition: string;
  applicationFee: string;
  intakeDates: string[];
  language: string;
  credits: number;
  overview: string;
  prerequisites: string[];
  deadline: string;
}

export interface Application {
  id: string;
  universityId: string;
  universityName: string;
  crestUrl: string;
  program: string;
  degree: string;
  intake: string;
  status: 'Draft' | 'Documents Pending' | 'In Progress' | 'Submitted' | 'Under Review' | 'Admitted' | 'Waitlisted' | 'Rejected';
  progress: number;
  nextStep: string;
  deadline: string;
  appliedDate?: string;
  notes?: string;
}

export interface DeadlineItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Application' | 'Document' | 'Scholarship' | 'Exam' | 'Visa';
  dateStr: string; // e.g. "2026-10-14"
  day: string; // "14"
  month: string; // "OCT"
  daysLeft: number;
  urgency: 'critical' | 'warning' | 'normal';
  universityName?: string;
  completed?: boolean;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  universityName?: string;
  amount: string;
  coverageType: 'Full Tuition' | 'Partial Tuition' | 'Stipend' | 'One-Time Grant';
  deadline: string;
  eligibleCountries: string[];
  targetDegrees: string[];
  gpaRequirement: number;
  description: string;
  matchScore: number;
  applied?: boolean;
}

export interface EntranceExam {
  id: string;
  code: string; // "SAT", "IELTS", "TOEFL", "GRE", "GMAT"
  name: string;
  category: 'Standardized' | 'English Proficiency' | 'Graduate';
  nextTestDate: string;
  registrationDeadline: string;
  fee: string;
  maxScore: string;
  userScore?: string;
  status: 'Registered' | 'Score Available' | 'Preparing' | 'Not Started';
  requiredBy: string[];
  prepTips: string[];
}

export interface StudentDocument {
  id: string;
  name: string;
  category: 'Transcript' | 'SOP' | 'LOR' | 'Passport' | 'Test Score' | 'Resume' | 'Financial';
  fileSize: string;
  updatedAt: string;
  status: 'Verified' | 'Pending Review' | 'Draft' | 'Needs Update';
  fileName: string;
}

export interface Opportunity {
  id: string;
  title: string;
  host: string;
  type: 'Internship' | 'Research Fellowship' | 'Summer School' | 'Hackathon' | 'Exchange';
  location: string;
  stipendOrFunding: string;
  duration: string;
  deadline: string;
  tag: string;
}

export interface EducationPassport {
  passportNumber: string;
  issueDate: string;
  expiryDate: string;
  institution: string;
  status: 'Verified' | 'Pending Verification';
  qrData: string;
  verifiedBadges: {
    id: string;
    title: string;
    issuedBy: string;
    date: string;
    icon: string;
  }[];
  academicScores: {
    subject: string;
    grade: string;
    level: string;
  }[];
}

// Real Gemini AI Interfaces
export interface PassportAnalysisResult {
  summary: string;
  strengths: {
    category: string;
    title: string;
    description: string;
    evidence: string;
  }[];
  gaps: {
    category: string;
    title: string;
    description: string;
    riskLevel: 'low' | 'medium' | 'high';
    mitigation: string;
  }[];
  recommendedImprovements: {
    priority: 'High' | 'Medium';
    title: string;
    action: string;
    timeline: string;
    expectedImpact: string;
  }[];
  analyzedAt: string;
}

export interface OpportunityMatchResult {
  id: string;
  title: string;
  type: 'university' | 'course' | 'scholarship' | 'exam';
  institutionOrHost: string;
  matchPercentage: number;
  matchTier: 'Strong Match' | 'Good Match' | 'Reach' | 'Safety';
  whyItMatches: string;
  missingRequirements: string[];
  nextAction: string;
}

export interface NextBestAction {
  id: string;
  rank: number;
  category: 'deadline' | 'application' | 'missing_document' | 'scholarship' | 'profile_gap';
  title: string;
  urgency: 'urgent' | 'high' | 'medium';
  reason: string;
  action: string;
  targetTab: NavigationTab;
  dueDate?: string;
}

export interface PathwaySimulation {
  careerGoal: string;
  budget: string;
  location: string;
  stages: {
    careerTarget: {
      title: string;
      industry: string;
      medianStartingSalary: string;
      outlook: string;
      description: string;
    };
    education: {
      recommendedDegree: string;
      targetMajors: string[];
      topInstitutions: {
        name: string;
        country: string;
        whySelected: string;
        estimatedTuition: string;
      }[];
      curriculumHighlights: string[];
    };
    skills: {
      technical: string[];
      analytical: string[];
      tools: string[];
    };
    exams: {
      name: string;
      targetScore: string;
      purpose: string;
      timeline: string;
    }[];
    projects: {
      title: string;
      description: string;
      techStack: string[];
      expectedOutcome: string;
    }[];
    internship: {
      role: string;
      industryTarget: string;
      timeline: string;
      keyDeliverable: string;
    }[];
    careerLaunch: {
      entryRole: string;
      targetCompanies: string[];
      yearOneMilestones: string[];
      fiveYearVision: string;
    };
  };
  generatedAt: string;
}

// Google Workspace & Education Inbox Interfaces
export interface WorkspaceConnectionState {
  isGoogleAccountConnected: boolean;
  isDriveConnected: boolean;
  isGmailConnected: boolean;
  isCalendarConnected: boolean;
}

export interface DriveDocument {
  id: string;
  name: string;
  mimeType?: string;
  category: 'Transcript' | 'Resume' | 'SOP' | 'LOR' | 'ID' | 'Test Score' | 'Other';
  webViewLink?: string;
  iconLink?: string;
  fileSize?: string;
  updatedAt?: string;
  source: 'google_drive' | 'vault' | 'prototype';
  status: 'Live Verified' | 'Prototype Data' | 'Pending Review' | 'Draft' | 'Needs Update';
  selectedForApplicationId?: string;
  selectedForApplicationName?: string;
  analysis?: {
    summary: string;
    strengths: string[];
    recommendations: string[];
    keyPoints: string[];
    suggestedApplicationMatch?: string;
    confidenceScore: number;
    analyzedAt: string;
    sourceLabel?: string;
    guidanceLabel?: string;
  };
}

export interface AdmissionsEmail {
  id: string;
  threadId?: string;
  subject: string;
  sender: string;
  senderEmail?: string;
  date: string;
  snippet: string;
  body?: string;
  category: 'Application' | 'Scholarship' | 'Deadline' | 'Interview' | 'Document Request' | 'Admission Decision';
  urgency: 'urgent' | 'high' | 'normal';
  requiredAction?: string;
  actionTargetTab?: NavigationTab;
  relatedApplicationId?: string;
  relatedApplicationName?: string;
  isRead?: boolean;
  source: 'gmail' | 'prototype';
}

export interface CalendarDeadlineEvent {
  id: string;
  title: string;
  description?: string;
  startDateTime: string; // ISO string or date
  endDateTime?: string;
  category: 'Application' | 'Scholarship' | 'Exam' | 'Interview' | 'Document' | 'Visa';
  universityName?: string;
  googleCalendarEventId?: string;
  isSyncedToGoogle?: boolean;
  daysLeft?: number;
}

export interface EducationInboxSummary {
  urgentEmail: AdmissionsEmail | null;
  upcomingDeadline: DeadlineItem | null;
  missingDocument: {
    id: string;
    name: string;
    category: string;
    applicationName: string;
    applicationId: string;
    dueDeadline?: string;
  } | null;
  recommendedNextAction: NextBestAction | null;
}

export type EducationCityCategory =
  | 'University'
  | 'College'
  | 'Learning Hub'
  | 'Exam Center'
  | 'Mentor'
  | 'Internship'
  | 'Opportunity';

export interface OpportunityNetworkPath {
  studentRole: string; // e.g. "Candidate Maya Sharma (CS & AI Focus)"
  passportPrerequisite: string; // e.g. "Verified IB Diploma (38/45), GPA 3.85, SOP Approved"
  universityOrInstitution: string; // e.g. "University of Toronto - St. George"
  courseOrProgram: string; // e.g. "B.S. in Computer Science & Artificial Intelligence"
  scholarshipMatch: string; // e.g. "Lester B. Pearson International Scholarship ($48,000/yr)"
  examRequirement: string; // e.g. "IELTS 7.5 Academic (Band 8+ Achieved) & SAT 1490"
  internshipLink: string; // e.g. "PEY Co-op at Vector Institute / RBC Borealis AI"
  careerOutcome: string; // e.g. "Senior Applied AI Research Scientist ($145,000+ CAD)"
}

export interface EducationCityPlace {
  id: string;
  name: string;
  category: EducationCityCategory;
  subCategory: string;
  address: string;
  locality?: string;
  city: string;
  stateOrRegion?: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceKm?: number;
  programs: string[];
  opportunities: string[];
  matchScore: number;
  matchTier: 'Strong Match' | 'Good Match' | 'Reach' | 'Safety';
  estimatedCost: {
    tuitionOrFee: string;
    livingCost?: string;
    financialAid: string;
  };
  nextAction: {
    label: string;
    actionType: 'apply' | 'explore' | 'book' | 'register' | 'contact';
    tabTarget?: NavigationTab;
  };
  opportunityNetwork: OpportunityNetworkPath;
  description: string;
  keyHighlights: string[];
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  isSaved?: boolean;
  inJourney?: boolean;
  isPrototypeData: boolean;
}

export interface GoogleTaskItem {
  id: string;
  title: string;
  notes?: string;
  due?: string;
  status: 'needsAction' | 'completed';
  webViewLink?: string;
  applicationId?: string;
  requirementKey?: string;
  isSyncedToGoogle?: boolean;
}

export interface StudioDraft {
  id: string;
  type: 'sop' | 'personal_statement' | 'study_plan' | 'resume';
  title: string;
  targetUniversity?: string;
  targetProgram?: string;
  content: string;
  plainText?: string;
  googleDocId?: string;
  googleDocUrl?: string;
  lastEditedAt: string;
  wordCount: number;
  status: 'draft' | 'exported_to_docs';
}

export interface SingleNextBestAction {
  actionTitle: string;
  category: 'deadline' | 'application' | 'document' | 'email' | 'calendar' | 'opportunity' | 'passport' | 'task';
  urgency: 'urgent' | 'high' | 'normal';
  actionStep: string;
  whyThisAction: string;
  targetTab: NavigationTab;
  supportingSignals: {
    passport?: string;
    application?: string;
    deadline?: string;
    drive?: string;
    gmail?: string;
    calendar?: string;
    cityOpportunity?: string;
  };
  sourceLabel: 'Prototype Data';
  guidanceLabel: 'AI-generated guidance';
  analyzedAt: string;
}


