// Server-side proxy handlers for Google Workspace APIs
// React never calls Google Workspace APIs directly with access tokens.
// Instead, requests pass through these secure server endpoints.

export interface ServerDriveFile {
  id: string;
  name: string;
  category: 'Transcript' | 'Resume' | 'SOP' | 'LOR' | 'ID' | 'Test Score' | 'Other';
  mimeType?: string;
  fileSize?: string;
  updatedAt?: string;
  source: 'google_drive';
  status: 'Live Verified';
  webViewLink?: string;
  iconLink?: string;
}

export interface ServerGmailMessage {
  id: string;
  threadId?: string;
  subject: string;
  sender: string;
  senderEmail?: string;
  date: string;
  snippet: string;
  category: 'Application' | 'Scholarship' | 'Deadline' | 'Interview' | 'Document Request' | 'Admission Decision';
  urgency: 'urgent' | 'high' | 'normal';
  requiredAction?: string;
  relatedApplicationName?: string;
  isRead?: boolean;
  source: 'gmail';
}

export interface ServerCalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime?: string;
  category: 'Application' | 'Scholarship' | 'Exam' | 'Interview' | 'Document' | 'Visa';
  googleCalendarEventId: string;
  isSyncedToGoogle: true;
  daysLeft: number;
}

// 1. Fetch Google Drive Files
export async function fetchServerDriveFiles(bearerToken: string): Promise<ServerDriveFile[]> {
  const url = 'https://www.googleapis.com/drive/v3/files?pageSize=35&fields=files(id,name,mimeType,size,modifiedTime,webViewLink,iconLink)&q=trashed=false';
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Google Drive API rejected request (${response.status}): ${errBody}`);
  }

  const data = await response.json();
  const rawFiles = data.files || [];

  return rawFiles.map((file: any) => {
    const nameLower = (file.name || '').toLowerCase();
    let category: ServerDriveFile['category'] = 'Other';

    if (nameLower.includes('transcript') || nameLower.includes('grade') || nameLower.includes('mark sheet') || nameLower.includes('academic record')) {
      category = 'Transcript';
    } else if (nameLower.includes('resume') || nameLower.includes('cv')) {
      category = 'Resume';
    } else if (nameLower.includes('sop') || nameLower.includes('statement of purpose') || nameLower.includes('personal statement') || nameLower.includes('motivation')) {
      category = 'SOP';
    } else if (nameLower.includes('lor') || nameLower.includes('recommendation') || nameLower.includes('reference')) {
      category = 'LOR';
    } else if (nameLower.includes('passport') || nameLower.includes('id') || nameLower.includes('identification') || nameLower.includes('license')) {
      category = 'ID';
    } else if (nameLower.includes('score') || nameLower.includes('ielts') || nameLower.includes('toefl') || nameLower.includes('sat') || nameLower.includes('act') || nameLower.includes('gre') || nameLower.includes('gmat')) {
      category = 'Test Score';
    }

    // Format file size
    let formattedSize = '1.2 MB';
    if (file.size) {
      const bytes = parseInt(file.size, 10);
      if (bytes < 1024 * 1024) {
        formattedSize = `${Math.round(bytes / 1024)} KB`;
      } else {
        formattedSize = `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
      }
    }

    // Format modified date
    let formattedDate = 'Recent';
    if (file.modifiedTime) {
      try {
        const d = new Date(file.modifiedTime);
        formattedDate = d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
      } catch {
        formattedDate = 'Recent';
      }
    }

    return {
      id: file.id,
      name: file.name || 'Untitled Document',
      mimeType: file.mimeType,
      category,
      fileSize: formattedSize,
      updatedAt: formattedDate,
      source: 'google_drive' as const,
      status: 'Live Verified' as const,
      webViewLink: file.webViewLink,
      iconLink: file.iconLink,
    };
  });
}

// 2. Fetch Gmail Admissions Messages
export async function fetchServerGmailMessages(bearerToken: string): Promise<ServerGmailMessage[]> {
  const query = encodeURIComponent('admission OR university OR application OR acceptance OR scholarship OR deadline OR interview OR transcript');
  const listUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=15&q=${query}`;

  const listResponse = await fetch(listUrl, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!listResponse.ok) {
    const errBody = await listResponse.text();
    throw new Error(`Gmail API rejected message listing (${listResponse.status}): ${errBody}`);
  }

  const listData = await listResponse.json();
  const messageRefs = listData.messages || [];

  if (messageRefs.length === 0) {
    return [];
  }

  const detailedPromises = messageRefs.map(async (ref: { id: string; threadId?: string }) => {
    try {
      const detailUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${ref.id}?format=full`;
      const detailResponse = await fetch(detailUrl, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });

      if (!detailResponse.ok) return null;
      const msg = await detailResponse.json();

      const headers: { [key: string]: string } = {};
      (msg.payload?.headers || []).forEach((h: any) => {
        if (h.name && h.value) {
          headers[h.name.toLowerCase()] = h.value;
        }
      });

      const subject = headers['subject'] || 'Admissions Update';
      const sender = headers['from'] || 'University Admissions';
      const dateHeader = headers['date'] || 'Recent';

      // Clean sender email
      const emailMatch = sender.match(/<([^>]+)>/);
      const senderEmail = emailMatch ? emailMatch[1] : sender;

      const snippet = msg.snippet || '';
      const lowerSub = subject.toLowerCase();
      const lowerSnip = snippet.toLowerCase();

      let category: ServerGmailMessage['category'] = 'Application';
      let urgency: ServerGmailMessage['urgency'] = 'normal';
      let requiredAction = 'Review admissions notice';

      if (lowerSub.includes('decision') || lowerSub.includes('offer') || lowerSub.includes('accepted') || lowerSub.includes('congratulations')) {
        category = 'Admission Decision';
        urgency = 'high';
        requiredAction = 'Review formal admission decision in university portal';
      } else if (lowerSub.includes('interview') || lowerSnip.includes('interview')) {
        category = 'Interview';
        urgency = 'high';
        requiredAction = 'Confirm and reserve admissions interview slot';
      } else if (lowerSub.includes('transcript') || lowerSub.includes('document') || lowerSub.includes('missing') || lowerSub.includes('upload')) {
        category = 'Document Request';
        urgency = 'urgent';
        requiredAction = 'Upload required academic credential to complete file';
      } else if (lowerSub.includes('scholarship') || lowerSub.includes('grant') || lowerSub.includes('fellowship')) {
        category = 'Scholarship';
        urgency = 'normal';
        requiredAction = 'Review scholarship offer or submit financial documents';
      } else if (lowerSub.includes('deadline') || lowerSub.includes('reminder') || lowerSub.includes('cutoff')) {
        category = 'Deadline';
        urgency = 'high';
        requiredAction = 'Finalize pending submissions before deadline cutoff';
      }

      let relatedApp: string | undefined;
      const lowerFrom = sender.toLowerCase();
      if (lowerSub.includes('toronto') || lowerFrom.includes('utoronto')) {
        relatedApp = 'University of Toronto';
      } else if (lowerSub.includes('amsterdam') || lowerFrom.includes('uva.nl')) {
        relatedApp = 'University of Amsterdam';
      } else if (lowerSub.includes('melbourne') || lowerFrom.includes('unimelb')) {
        relatedApp = 'University of Melbourne';
      } else if (lowerSub.includes('stanford')) {
        relatedApp = 'Stanford University';
      }

      return {
        id: msg.id,
        threadId: msg.threadId,
        subject,
        sender,
        senderEmail,
        date: dateHeader,
        snippet,
        category,
        urgency,
        requiredAction,
        relatedApplicationName: relatedApp,
        isRead: false,
        source: 'gmail' as const,
      };
    } catch {
      return null;
    }
  });

  const resolved = await Promise.all(detailedPromises);
  return resolved.filter(Boolean) as ServerGmailMessage[];
}

// 3. Fetch Google Calendar Events
export async function fetchServerCalendarEvents(bearerToken: string): Promise<ServerCalendarEvent[]> {
  const timeMin = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&singleEvents=true&orderBy=startTime&maxResults=25`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Google Calendar API rejected request (${response.status}): ${errBody}`);
  }

  const data = await response.json();
  const items = data.items || [];

  return items.map((item: any) => {
    const start = item.start?.dateTime || item.start?.date || new Date().toISOString();
    const diffMs = new Date(start).getTime() - Date.now();
    const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

    const summary = item.summary || 'Admissions Event';
    const lower = summary.toLowerCase();
    let category: ServerCalendarEvent['category'] = 'Application';

    if (lower.includes('interview')) category = 'Interview';
    else if (lower.includes('scholarship')) category = 'Scholarship';
    else if (lower.includes('exam') || lower.includes('sat') || lower.includes('ielts')) category = 'Exam';
    else if (lower.includes('document') || lower.includes('transcript')) category = 'Document';
    else if (lower.includes('visa')) category = 'Visa';

    return {
      id: item.id,
      title: summary,
      description: item.description || '',
      startDateTime: start,
      endDateTime: item.end?.dateTime || item.end?.date,
      category,
      googleCalendarEventId: item.id,
      isSyncedToGoogle: true as const,
      daysLeft,
    };
  });
}

// 4. Create Google Calendar Event (Explicit Confirmation Required)
export async function createServerCalendarEvent(
  bearerToken: string,
  payload: {
    title: string;
    description: string;
    startDateTime: string;
    endDateTime?: string;
    confirmed: boolean;
  }
): Promise<{ id: string; summary: string; htmlLink?: string }> {
  if (!payload.confirmed) {
    throw new Error('Explicit confirmation is required before creating calendar events.');
  }

  if (!payload.title || !payload.startDateTime) {
    throw new Error('Title and startDateTime are required to create a calendar event.');
  }

  const end = payload.endDateTime || new Date(new Date(payload.startDateTime).getTime() + 60 * 60 * 1000).toISOString();

  const body = {
    summary: payload.title,
    description: payload.description,
    start: { dateTime: new Date(payload.startDateTime).toISOString() },
    end: { dateTime: new Date(end).toISOString() },
  };

  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Google Calendar API failed to create event (${response.status}): ${errBody}`);
  }

  const created = await response.json();
  return {
    id: created.id,
    summary: created.summary,
    htmlLink: created.htmlLink,
  };
}

// 5. Create Google Doc in Google Docs API
export interface ServerGoogleDocResult {
  id: string;
  title: string;
  documentUrl: string;
}

export async function createServerGoogleDoc(
  bearerToken: string,
  payload: {
    title: string;
    content: string;
  }
): Promise<ServerGoogleDocResult> {
  if (!payload.title || !payload.title.trim()) {
    throw new Error('Title is required to create a Google Doc.');
  }

  // 1. Create document
  const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: payload.title }),
  });

  if (!createRes.ok) {
    const errBody = await createRes.text();
    throw new Error(`Google Docs API failed to create document (${createRes.status}): ${errBody}`);
  }

  const createdDoc = await createRes.json();
  const documentId = createdDoc.documentId;

  // 2. Insert content if provided
  if (payload.content && payload.content.trim()) {
    try {
      const updateRes = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              insertText: {
                location: { index: 1 },
                text: payload.content,
              },
            },
          ],
        }),
      });

      if (!updateRes.ok) {
        console.warn(`Could not insert text into Google Doc ${documentId}:`, await updateRes.text());
      }
    } catch (insertErr) {
      console.warn('Text insert error into created Google Doc:', insertErr);
    }
  }

  return {
    id: documentId,
    title: createdDoc.title || payload.title,
    documentUrl: `https://docs.google.com/document/d/${documentId}/edit`,
  };
}

// 6. Google Tasks API: Fetch, Create, and Update Status
export interface ServerGoogleTask {
  id: string;
  title: string;
  notes?: string;
  due?: string;
  status: 'needsAction' | 'completed';
  webViewLink?: string;
}

export async function fetchServerGoogleTasks(bearerToken: string): Promise<ServerGoogleTask[]> {
  const url = 'https://tasks.googleapis.com/tasks/v1/lists/@default/tasks?showCompleted=true&maxResults=50';
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${bearerToken}` },
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Google Tasks API rejected request (${response.status}): ${errBody}`);
  }

  const data = await response.json();
  const items = data.items || [];

  return items.map((item: any) => ({
    id: item.id,
    title: item.title || 'Application Next Action',
    notes: item.notes || '',
    due: item.due,
    status: item.status === 'completed' ? 'completed' : 'needsAction',
    webViewLink: item.webViewLink || 'https://tasks.google.com',
  }));
}

export async function createServerGoogleTask(
  bearerToken: string,
  payload: {
    title: string;
    notes?: string;
    due?: string;
    confirmed: boolean;
  }
): Promise<ServerGoogleTask> {
  if (!payload.confirmed) {
    throw new Error('Explicit confirmation is required before creating a Google Task.');
  }
  if (!payload.title || !payload.title.trim()) {
    throw new Error('Task title is required.');
  }

  const body: any = {
    title: payload.title,
    notes: payload.notes || '',
  };
  if (payload.due) {
    body.due = new Date(payload.due).toISOString();
  }

  const response = await fetch('https://tasks.googleapis.com/tasks/v1/lists/@default/tasks', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Google Tasks API failed to create task (${response.status}): ${errBody}`);
  }

  const created = await response.json();
  return {
    id: created.id,
    title: created.title,
    notes: created.notes,
    due: created.due,
    status: created.status === 'completed' ? 'completed' : 'needsAction',
    webViewLink: created.webViewLink || 'https://tasks.google.com',
  };
}

export async function updateServerGoogleTaskStatus(
  bearerToken: string,
  taskId: string,
  completed: boolean
): Promise<{ success: boolean }> {
  const status = completed ? 'completed' : 'needsAction';
  const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/@default/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Google Tasks API failed to update task status (${response.status}): ${errBody}`);
  }

  return { success: true };
}

