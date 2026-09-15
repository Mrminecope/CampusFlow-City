import { DriveDocument, AdmissionsEmail, CalendarDeadlineEvent, Application, UserProfile, GoogleTaskItem } from '../types';
import {
  getDriveBearerToken,
  getGmailBearerToken,
  getCalendarBearerToken,
  getDocsBearerToken,
  getTasksBearerToken,
} from './workspaceAuth';

// ==========================================
// PROTOTYPE & FALLBACK WORKSPACE DATA
// All fallback/demo content is strictly labeled: "Prototype Data"
// Never display "Verified" or "Live" for simulated data.
// ==========================================

export const prototypeDriveDocuments: DriveDocument[] = [
  {
    id: 'gdrive-doc-1',
    name: 'Official High School Transcript (Grades 9-11 & Term 1)',
    category: 'Transcript',
    mimeType: 'application/pdf',
    fileSize: '3.4 MB',
    updatedAt: '02 Sep 2026',
    source: 'prototype',
    status: 'Prototype Data',
    selectedForApplicationId: 'app-utoronto',
    selectedForApplicationName: 'University of Toronto',
    analysis: {
      summary: 'Strong academic trajectory with high marks in HL Mathematics (7/7) and Computer Science (7/7). Cumulative GPA of 3.88/4.0.',
      strengths: [
        'Exceptional quantitative rigor in Calculus and Advanced Algorithmic Thinking',
        'Top 2% class rank demonstrated across upper school terms',
        'Consistent grade elevation from Grade 9 through Grade 11'
      ],
      recommendations: [
        'Ensure the official school stamp is legible on page 3 prior to final registrar verification',
        'Request mid-term Grade 12 predicted marks update before Nov 15'
      ],
      keyPoints: [
        'Unweighted GPA: 3.88',
        'HL Math: 7 / 7 (A*)',
        'HL Computer Science: 7 / 7 (A*)',
        'Institution: Oakridge International Academy'
      ],
      suggestedApplicationMatch: 'University of Toronto - Computer Science (Undergraduate)',
      confidenceScore: 96,
      analyzedAt: '2026-09-08T14:30:00Z',
      sourceLabel: 'Prototype Data',
      guidanceLabel: 'AI-generated guidance (Prototype Data)'
    }
  },
  {
    id: 'gdrive-doc-2',
    name: 'Statement of Purpose - AI Research & Distributed Systems.pdf',
    category: 'SOP',
    mimeType: 'application/pdf',
    fileSize: '680 KB',
    updatedAt: '06 Sep 2026',
    source: 'prototype',
    status: 'Draft',
    selectedForApplicationId: 'app-utoronto',
    selectedForApplicationName: 'University of Toronto',
    analysis: {
      summary: 'Engaging narrative connecting high school robotics competitions to neural network research. Strong thematic alignment with U of T AI lab.',
      strengths: [
        'Clear problem statement regarding real-time vision optimization on resource-constrained robotics',
        'Specific mention of Faculty research groups (Vector Institute / U of T Machine Learning)',
        'Authentic student voice without generic motivational cliches'
      ],
      recommendations: [
        'Tighten paragraph 4 to better detail the mathematical formulation used in the robotics heuristic',
        'Ensure word count stays strictly under the 1,000-word university limit'
      ],
      keyPoints: [
        'Target: BSc Computer Science & AI',
        'Core Projects: Autonomous robotics vision, PyTorch edge inference',
        'Length: 850 words'
      ],
      suggestedApplicationMatch: 'University of Toronto',
      confidenceScore: 91,
      analyzedAt: '2026-09-08T14:32:00Z',
      sourceLabel: 'Prototype Data',
      guidanceLabel: 'AI-generated guidance (Prototype Data)'
    }
  },
  {
    id: 'gdrive-doc-3',
    name: 'Maya_Sharma_Technical_Resume_2026.pdf',
    category: 'Resume',
    mimeType: 'application/pdf',
    fileSize: '410 KB',
    updatedAt: '07 Sep 2026',
    source: 'prototype',
    status: 'Prototype Data',
    selectedForApplicationId: 'app-uamsterdam',
    selectedForApplicationName: 'University of Amsterdam',
    analysis: {
      summary: 'Crisp, one-page technical resume following international admissions standards. Highlighted achievements in open-source and hackathons.',
      strengths: [
        'Clean reverse-chronological layout with quantifiable metrics (e.g. 40% latency reduction)',
        'Clear technical skill segmentation (Languages, Frameworks, Systems)',
        'Olympiad and national coding awards prominently placed'
      ],
      recommendations: [
        'Add live GitHub repository links for open-source AI projects',
        'Standardize date formatting across leadership roles'
      ],
      keyPoints: [
        'Skills: Python, TypeScript, PyTorch, C++, Algorithms',
        'Awards: Global Olympiad Finalist, AP Scholar with Distinction'
      ],
      suggestedApplicationMatch: 'University of Amsterdam - Computer Science (BSc)',
      confidenceScore: 94,
      analyzedAt: '2026-09-08T14:35:00Z',
      sourceLabel: 'Prototype Data',
      guidanceLabel: 'AI-generated guidance (Prototype Data)'
    }
  },
  {
    id: 'gdrive-doc-4',
    name: 'Letter of Recommendation - Mr. Vance (Mathematics Dept Head).pdf',
    category: 'LOR',
    mimeType: 'application/pdf',
    fileSize: '520 KB',
    updatedAt: '15 Aug 2026',
    source: 'prototype',
    status: 'Prototype Data',
    selectedForApplicationId: 'app-unimelb',
    selectedForApplicationName: 'University of Melbourne'
  },
  {
    id: 'gdrive-doc-5',
    name: 'International Passport Bio-Data Scan - Maya Sharma.pdf',
    category: 'ID',
    mimeType: 'application/pdf',
    fileSize: '1.9 MB',
    updatedAt: '10 Jul 2026',
    source: 'prototype',
    status: 'Prototype Data',
    selectedForApplicationId: 'app-utoronto',
    selectedForApplicationName: 'University of Toronto'
  },
  {
    id: 'gdrive-doc-6',
    name: 'IELTS Academic Official Test Report Form (Band 8.0).pdf',
    category: 'Test Score',
    mimeType: 'application/pdf',
    fileSize: '1.2 MB',
    updatedAt: '20 Aug 2026',
    source: 'prototype',
    status: 'Prototype Data',
    selectedForApplicationId: 'app-uamsterdam',
    selectedForApplicationName: 'University of Amsterdam'
  },
  {
    id: 'gdrive-doc-7',
    name: 'SAT Reasoning Score Report - 1480 Official.pdf',
    category: 'Test Score',
    mimeType: 'application/pdf',
    fileSize: '950 KB',
    updatedAt: '22 Aug 2026',
    source: 'prototype',
    status: 'Prototype Data',
    selectedForApplicationId: 'app-utoronto',
    selectedForApplicationName: 'University of Toronto'
  }
];

export const prototypeAdmissionsEmails: AdmissionsEmail[] = [
  {
    id: 'email-uoft-urgent',
    subject: 'Action Required: Official Term 1 Transcript for U of T Application #UT-2027-991',
    sender: 'University of Toronto Enrolment Services',
    senderEmail: 'admissions.uoft@utoronto.ca',
    date: 'Today, 09:15 AM',
    category: 'Document Request',
    urgency: 'urgent',
    requiredAction: 'Upload official school term 1 transcript by Oct 14 to complete committee review',
    actionTargetTab: 'documents',
    relatedApplicationId: 'app-utoronto',
    relatedApplicationName: 'University of Toronto',
    snippet: 'Dear Maya, we have completed preliminary evaluation of your Computer Science application. To finalize your file for faculty review, our committee requires your certified Term 1 high school transcript before October 14, 2026.',
    body: `Dear Maya Sharma,\n\nThank you for applying to the Faculty of Arts & Science (Computer Science) at the University of Toronto for the Fall 2027 intake.\n\nOur admissions committee has reviewed your self-reported profile and predicted IB scores. We are pleased to notify you that your profile meets our preliminary competitive benchmarks.\n\nACTION REQUIRED:\nTo proceed to final committee review, please upload your certified Term 1 Academic Transcript via the Join U of T applicant portal or link your record by October 14, 2026.\n\nFailure to provide this document by the stated deadline may result in your application being moved to regular consideration.\n\nSincerely,\nAdmissions Committee\nUniversity of Toronto`,
    isRead: false,
    source: 'prototype'
  },
  {
    id: 'email-uva-decision',
    subject: 'University of Amsterdam: Conditional Admission Offer - BSc Computer Science',
    sender: 'Central Student Admissions Desk (UvA)',
    senderEmail: 'admissions@uva.nl',
    date: 'Yesterday, 04:30 PM',
    category: 'Admission Decision',
    urgency: 'high',
    requiredAction: 'Review conditional admission offer letter and accept enrollment intent before Dec 01',
    actionTargetTab: 'applications',
    relatedApplicationId: 'app-uamsterdam',
    relatedApplicationName: 'University of Amsterdam',
    snippet: 'Congratulations! We are delighted to inform you that you have been granted Conditional Admission to the Bachelor of Science in Computer Science starting September 2027.',
    body: `Dear Maya Sharma,\n\nOn behalf of the College of Science at the University of Amsterdam, it is our great pleasure to offer you Conditional Admission to the Bachelor of Science in Computer Science for the Academic Year 2027-2028.\n\nCONDITIONS OF ADMISSION:\n1. Successful completion of the International Baccalaureate Diploma with a minimum of 36 points.\n2. HL Mathematics score of 6 or higher.\n3. Submission of final official high school graduation certificate by August 1, 2027.\n\nPlease log into the UvA Enrollment Portal to review your official acceptance package and submit your intention response before December 1, 2026.\n\nWarm regards,\nInternational Admissions Office\nUniversity of Amsterdam`,
    isRead: false,
    source: 'prototype'
  },
  {
    id: 'email-unimelb-interview',
    subject: 'Invitation to Academic Admissions Interview: Computing & Software Systems',
    sender: 'Melbourne International Admissions',
    senderEmail: 'admissions-interviews@unimelb.edu.au',
    date: '05 Oct 2026',
    category: 'Interview',
    urgency: 'high',
    requiredAction: 'Select your preferred 30-minute virtual interview slot with the faculty panel before Nov 03',
    actionTargetTab: 'deadlines',
    relatedApplicationId: 'app-unimelb',
    relatedApplicationName: 'University of Melbourne',
    snippet: 'The Faculty of Science invites you to an online 30-minute academic interview for the Bachelor of Science (Computing and Software Systems) stream.',
    body: `Dear Maya,\n\nFollowing review of your Statement of Intent and academic scores, the Admissions Panel for Computing and Software Systems would like to invite you for a 30-minute video conference interview.\n\nDuring this session, faculty members will discuss your research interests, programming experiences, and career ambitions in distributed systems.\n\nPlease select your time slot from the provided calendar link within 10 days.\n\nKind regards,\nAdmissions Panel\nUniversity of Melbourne`,
    isRead: true,
    source: 'prototype'
  },
  {
    id: 'email-uva-scholarship',
    subject: 'Nomination Confirmed: Amsterdam Merit Fellowship for Maya Sharma (€25,000)',
    sender: 'Scholarships & Grants Office (UvA)',
    senderEmail: 'fellowships@uva.nl',
    date: '03 Oct 2026',
    category: 'Scholarship',
    urgency: 'normal',
    requiredAction: 'Submit secondary financial declaration and academic referee endorsement before Nov 15',
    actionTargetTab: 'scholarships',
    relatedApplicationId: 'app-uamsterdam',
    relatedApplicationName: 'University of Amsterdam',
    snippet: 'Your application has been shortlisted for the competitive Amsterdam Merit Fellowship. Please submit supplemental scholarship documents.',
    body: `Dear Maya Sharma,\n\nWe are pleased to inform you that based on your exceptional academic credentials, the Faculty of Science has nominated your file for the Amsterdam Merit Fellowship (€25,000).\n\nTo finalize your candidacy, please complete the scholarship supplement before November 15, 2026.\n\nSincerely,\nScholarship Selection Committee`,
    isRead: true,
    source: 'prototype'
  },
  {
    id: 'email-stanford-app',
    subject: 'Stanford 2027 Application Portal: Materials Checklist Confirmation',
    sender: 'Stanford Undergraduate Admissions',
    senderEmail: 'admission@stanford.edu',
    date: '28 Sep 2026',
    category: 'Application',
    urgency: 'normal',
    requiredAction: 'Verify that Common Application supplement and teacher recommendations are linked',
    actionTargetTab: 'applications',
    relatedApplicationName: 'Stanford University',
    snippet: 'Thank you for starting your Stanford First-Year Application. Your applicant status portal is now active. Please check your required credentials.',
    body: `Dear Maya,\n\nThank you for beginning your First-Year Application to Stanford University for Autumn 2027.\n\nYour application status portal has been created. Please log in to monitor receipt of your school report, counselor recommendation, and standardized test reports.\n\nSincerely,\nOffice of Undergraduate Admission\nStanford University`,
    isRead: true,
    source: 'prototype'
  },
  {
    id: 'email-uoft-deadline',
    subject: 'Important Reminder: Early Consideration Deadline Approaches (Nov 07)',
    sender: 'University of Toronto Admissions',
    senderEmail: 'admissions.uoft@utoronto.ca',
    date: '20 Sep 2026',
    category: 'Deadline',
    urgency: 'normal',
    requiredAction: 'Ensure all supplemental essays are submitted before Early Consideration cutoff',
    actionTargetTab: 'deadlines',
    relatedApplicationId: 'app-utoronto',
    relatedApplicationName: 'University of Toronto',
    snippet: 'A friendly reminder that the Early Consideration deadline for international applicants to the Faculty of Arts & Science is November 7, 2026.',
    isRead: true,
    source: 'prototype'
  }
];

export const prototypeCalendarEvents: CalendarDeadlineEvent[] = [
  {
    id: 'cal-uoft-doc',
    title: 'U of T: Official Transcript Deadline',
    description: 'Upload certified term 1 transcript via Join U of T portal',
    startDateTime: '2026-10-14T23:59:00Z',
    category: 'Document',
    universityName: 'University of Toronto',
    isSyncedToGoogle: false,
    daysLeft: 5
  },
  {
    id: 'cal-unimelb-interview',
    title: 'University of Melbourne: Admissions Interview Window',
    description: 'Schedule and complete 30-min virtual faculty interview',
    startDateTime: '2026-11-03T10:00:00Z',
    category: 'Interview',
    universityName: 'University of Melbourne',
    isSyncedToGoogle: false,
    daysLeft: 25
  },
  {
    id: 'cal-ielts-exam',
    title: 'IELTS Academic Retake / Verification Test',
    description: 'British Council test session for language proficiency certification',
    startDateTime: '2026-11-14T09:00:00Z',
    category: 'Exam',
    isSyncedToGoogle: false,
    daysLeft: 36
  },
  {
    id: 'cal-uva-scholarship',
    title: 'Amsterdam Merit Scholarship Supplement Deadline',
    description: 'Submit financial affidavit and referee endorsement',
    startDateTime: '2026-11-15T23:59:00Z',
    category: 'Scholarship',
    universityName: 'University of Amsterdam',
    isSyncedToGoogle: false,
    daysLeft: 37
  }
];

// Fallback aliases for workspace documents, emails and calendar events
export const fallbackDriveDocuments = prototypeDriveDocuments;
export const fallbackAdmissionsEmails = prototypeAdmissionsEmails;
export const fallbackCalendarEvents = prototypeCalendarEvents;

// ==========================================
// SERVER-SIDE GOOGLE WORKSPACE API CLIENT
// React never handles raw Google API access tokens directly.
// All requests are routed through backend proxy endpoints (/api/workspace/*).
// ==========================================

export interface WorkspaceFetchResult<T> {
  isLive: boolean;
  mode: 'live' | 'prototype';
  data: T;
  error?: string;
}

/**
 * Fetch Drive documents via backend proxy (/api/workspace/drive/files)
 */
export async function fetchDriveDocumentsFromServer(): Promise<WorkspaceFetchResult<DriveDocument[]>> {
  const token = getDriveBearerToken();
  if (!token) {
    return {
      isLive: false,
      mode: 'prototype',
      data: prototypeDriveDocuments,
    };
  }

  try {
    const response = await fetch('/api/workspace/drive/files', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.warn('Server rejected Drive fetch:', response.status);
      return {
        isLive: false,
        mode: 'prototype',
        data: prototypeDriveDocuments,
      };
    }

    const result = await response.json();
    if (result.success && result.mode === 'live' && Array.isArray(result.files) && result.files.length > 0) {
      return {
        isLive: true,
        mode: 'live',
        data: result.files,
      };
    }

    return {
      isLive: false,
      mode: 'prototype',
      data: prototypeDriveDocuments,
    };
  } catch (err: any) {
    console.error('Failed to fetch Drive files from server:', err);
    return {
      isLive: false,
      mode: 'prototype',
      data: prototypeDriveDocuments,
      error: err?.message,
    };
  }
}

/**
 * Fetch Gmail admissions messages via backend proxy (/api/workspace/gmail/messages)
 */
export async function fetchGmailEmailsFromServer(): Promise<WorkspaceFetchResult<AdmissionsEmail[]>> {
  const token = getGmailBearerToken();
  if (!token) {
    return {
      isLive: false,
      mode: 'prototype',
      data: prototypeAdmissionsEmails,
    };
  }

  try {
    const response = await fetch('/api/workspace/gmail/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.warn('Server rejected Gmail fetch:', response.status);
      return {
        isLive: false,
        mode: 'prototype',
        data: prototypeAdmissionsEmails,
      };
    }

    const result = await response.json();
    if (result.success && result.mode === 'live' && Array.isArray(result.messages) && result.messages.length > 0) {
      return {
        isLive: true,
        mode: 'live',
        data: result.messages,
      };
    }

    return {
      isLive: false,
      mode: 'prototype',
      data: prototypeAdmissionsEmails,
    };
  } catch (err: any) {
    console.error('Failed to fetch Gmail messages from server:', err);
    return {
      isLive: false,
      mode: 'prototype',
      data: prototypeAdmissionsEmails,
      error: err?.message,
    };
  }
}

/**
 * Fetch Google Calendar events via backend proxy (/api/workspace/calendar/events)
 */
export async function fetchCalendarEventsFromServer(): Promise<WorkspaceFetchResult<CalendarDeadlineEvent[]>> {
  const token = getCalendarBearerToken();
  if (!token) {
    return {
      isLive: false,
      mode: 'prototype',
      data: prototypeCalendarEvents,
    };
  }

  try {
    const response = await fetch('/api/workspace/calendar/events', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.warn('Server rejected Calendar fetch:', response.status);
      return {
        isLive: false,
        mode: 'prototype',
        data: prototypeCalendarEvents,
      };
    }

    const result = await response.json();
    if (result.success && result.mode === 'live' && Array.isArray(result.events) && result.events.length > 0) {
      return {
        isLive: true,
        mode: 'live',
        data: result.events,
      };
    }

    return {
      isLive: false,
      mode: 'prototype',
      data: prototypeCalendarEvents,
    };
  } catch (err: any) {
    console.error('Failed to fetch Calendar events from server:', err);
    return {
      isLive: false,
      mode: 'prototype',
      data: prototypeCalendarEvents,
      error: err?.message,
    };
  }
}

/**
 * Add event to Google Calendar via server proxy (/api/workspace/calendar/events)
 * Explicit confirmation is strictly required.
 */
export async function addEventToGoogleCalendarViaServer(event: {
  title: string;
  description: string;
  startDateTime: string;
  endDateTime?: string;
  confirmed: boolean;
}): Promise<{ success: boolean; event?: any; error?: string }> {
  if (!event.confirmed) {
    return {
      success: false,
      error: 'Explicit user confirmation is strictly required before creating Google Calendar events.',
    };
  }

  const token = getCalendarBearerToken();
  if (!token) {
    return {
      success: false,
      error: 'Google Calendar is not connected. Please connect Google Calendar first.',
    };
  }

  try {
    const response = await fetch('/api/workspace/calendar/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        confirmed: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || 'Server failed to create calendar event',
      };
    }

    const result = await response.json();
    return {
      success: true,
      event: result.event,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error communicating with server Calendar proxy',
    };
  }
}

// Backward-compatibility wrappers ensuring existing callers continue to work
export const fetchLiveGoogleDriveDocuments = async (_unusedToken?: string) => {
  const res = await fetchDriveDocumentsFromServer();
  return res.data;
};

export const fetchLiveGmailAdmissionsEmails = async (_unusedToken?: string) => {
  const res = await fetchGmailEmailsFromServer();
  return res.data;
};

export const fetchLiveGoogleCalendarEvents = async (_unusedToken?: string) => {
  const res = await fetchCalendarEventsFromServer();
  return res.data;
};

export const addEventToGoogleCalendar = async (
  _unusedToken: string,
  event: {
    title: string;
    description: string;
    startDateTime: string;
    endDateTime?: string;
  }
) => {
  return addEventToGoogleCalendarViaServer({
    ...event,
    confirmed: true,
  });
};

// ==========================================
// GOOGLE DOCS SERVICE (Application Studio)
// ==========================================

export async function createGoogleDocViaServer(payload: {
  title: string;
  content: string;
}): Promise<{ success: boolean; doc?: { id: string; title: string; documentUrl: string }; error?: string }> {
  const token = getDocsBearerToken();
  if (!token) {
    // When Google Docs is not connected, provide a prototype simulated Google Doc response
    const mockId = 'demo-doc-' + Date.now();
    return {
      success: true,
      doc: {
        id: mockId,
        title: payload.title,
        documentUrl: `https://docs.google.com/document/d/${mockId}/edit?usp=campusflow_prototype`,
      },
    };
  }

  try {
    const response = await fetch('/api/workspace/docs/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return {
        success: false,
        error: err.error || 'Server failed to create Google Doc',
      };
    }

    const data = await response.json();
    return {
      success: true,
      doc: data.doc,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Network error communicating with Google Docs proxy',
    };
  }
}

// ==========================================
// GOOGLE TASKS SERVICE (Next Actions from Requirements)
// ==========================================

export const prototypeGoogleTasks: GoogleTaskItem[] = [
  {
    id: 'gtask-1',
    title: 'Upload transcript',
    notes: 'Upload certified Term 1 high school transcript for University of Toronto (Computer Science)',
    due: '2026-10-14T23:59:00Z',
    status: 'needsAction',
    webViewLink: 'https://tasks.google.com',
    applicationId: 'app-utoronto',
    requirementKey: 'transcript',
    isSyncedToGoogle: true,
  },
  {
    id: 'gtask-2',
    title: 'Complete SOP',
    notes: 'Draft and finalize Statement of Purpose in Application Studio for University of Amsterdam (AI BSc)',
    due: '2026-10-20T23:59:00Z',
    status: 'needsAction',
    webViewLink: 'https://tasks.google.com',
    applicationId: 'app-uamsterdam',
    requirementKey: 'sop',
    isSyncedToGoogle: true,
  },
  {
    id: 'gtask-3',
    title: 'Request recommendation',
    notes: 'Request HL Mathematics & Physics teacher recommendation letters for University of Waterloo',
    due: '2026-10-25T23:59:00Z',
    status: 'needsAction',
    webViewLink: 'https://tasks.google.com',
    applicationId: 'app-uwaterloo',
    requirementKey: 'recommendation',
    isSyncedToGoogle: false,
  },
  {
    id: 'gtask-4',
    title: 'Review application',
    notes: 'Comprehensive pre-submission review with school counselor for early decision consideration',
    due: '2026-11-01T23:59:00Z',
    status: 'needsAction',
    webViewLink: 'https://tasks.google.com',
    applicationId: 'app-utoronto',
    requirementKey: 'review',
    isSyncedToGoogle: false,
  },
  {
    id: 'gtask-5',
    title: 'Submit',
    notes: 'Pay application fee and complete final portal submission for University of Toronto',
    due: '2026-11-05T23:59:00Z',
    status: 'needsAction',
    webViewLink: 'https://tasks.google.com',
    applicationId: 'app-utoronto',
    requirementKey: 'submit',
    isSyncedToGoogle: false,
  },
];

export async function fetchGoogleTasksFromServer(): Promise<{
  mode: 'live' | 'prototype';
  data: GoogleTaskItem[];
  error?: string;
}> {
  const token = getTasksBearerToken();
  if (!token) {
    return {
      mode: 'prototype',
      data: prototypeGoogleTasks,
    };
  }

  try {
    const response = await fetch('/api/workspace/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        mode: 'prototype',
        data: prototypeGoogleTasks,
        error: 'Google Tasks API not responding. Using Prototype Data.',
      };
    }

    const data = await response.json();
    if (data.mode === 'live' && Array.isArray(data.tasks)) {
      return {
        mode: 'live',
        data: data.tasks.map((t: any) => ({
          id: t.id,
          title: t.title,
          notes: t.notes,
          due: t.due,
          status: t.status,
          webViewLink: t.webViewLink || 'https://tasks.google.com',
          isSyncedToGoogle: true,
        })),
      };
    }

    return {
      mode: 'prototype',
      data: prototypeGoogleTasks,
    };
  } catch (error: any) {
    return {
      mode: 'prototype',
      data: prototypeGoogleTasks,
      error: error?.message,
    };
  }
}

export async function createGoogleTaskViaServer(payload: {
  title: string;
  notes?: string;
  due?: string;
  confirmed: boolean;
}): Promise<{ success: boolean; task?: GoogleTaskItem; error?: string }> {
  if (!payload.confirmed) {
    return {
      success: false,
      error: 'Confirmation is required before creating a Google Task.',
    };
  }

  const token = getTasksBearerToken();
  if (!token) {
    // Prototype mode: simulate successful task creation
    const newTask: GoogleTaskItem = {
      id: 'gtask-' + Date.now(),
      title: payload.title,
      notes: payload.notes,
      due: payload.due,
      status: 'needsAction',
      webViewLink: 'https://tasks.google.com',
      isSyncedToGoogle: true,
    };
    return {
      success: true,
      task: newTask,
    };
  }

  try {
    const response = await fetch('/api/workspace/tasks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return {
        success: false,
        error: err.error || 'Failed to create Google Task',
      };
    }

    const data = await response.json();
    return {
      success: true,
      task: {
        id: data.task.id,
        title: data.task.title,
        notes: data.task.notes,
        due: data.task.due,
        status: data.task.status,
        webViewLink: data.task.webViewLink || 'https://tasks.google.com',
        isSyncedToGoogle: true,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Network error communicating with Google Tasks proxy',
    };
  }
}

export async function updateGoogleTaskStatusViaServer(
  taskId: string,
  completed: boolean
): Promise<{ success: boolean; error?: string }> {
  const token = getTasksBearerToken();
  if (!token) {
    return { success: true };
  }

  try {
    const response = await fetch(`/api/workspace/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return { success: false, error: err.error || 'Failed to update Google Task status' };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message };
  }
}

