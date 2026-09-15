import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';

// Module-level private token store
// React components NEVER access or hold raw Google API access tokens directly.
let privateDriveToken: string | null = null;
let privateGmailToken: string | null = null;
let privateCalendarToken: string | null = null;
let privateDocsToken: string | null = null;
let privateTasksToken: string | null = null;

export const getDriveBearerToken = (): string | null => privateDriveToken;
export const getGmailBearerToken = (): string | null => privateGmailToken;
export const getCalendarBearerToken = (): string | null => privateCalendarToken;
export const getDocsBearerToken = (): string | null => privateDocsToken;
export const getTasksBearerToken = (): string | null => privateTasksToken;

/**
 * Connect Google Drive independently with feature-specific scope: drive.readonly
 */
export async function connectFeatureGoogleDrive(): Promise<{ success: boolean; error?: string }> {
  try {
    const driveProvider = new GoogleAuthProvider();
    driveProvider.addScope('https://www.googleapis.com/auth/drive.readonly');
    driveProvider.setCustomParameters({
      prompt: 'consent',
      include_granted_scopes: 'true',
    });

    const result = await signInWithPopup(auth, driveProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (credential?.accessToken) {
      privateDriveToken = credential.accessToken;
      return { success: true };
    }
    return { success: false, error: 'No Drive access token granted by Google' };
  } catch (error: any) {
    console.error('Failed to connect Google Drive:', error);
    return { success: false, error: error?.message || 'Drive permission request failed' };
  }
}

export function disconnectFeatureGoogleDrive(): void {
  privateDriveToken = null;
}

/**
 * Connect Gmail independently with feature-specific scope: gmail.readonly
 */
export async function connectFeatureGmail(): Promise<{ success: boolean; error?: string }> {
  try {
    const gmailProvider = new GoogleAuthProvider();
    gmailProvider.addScope('https://www.googleapis.com/auth/gmail.readonly');
    gmailProvider.setCustomParameters({
      prompt: 'consent',
      include_granted_scopes: 'true',
    });

    const result = await signInWithPopup(auth, gmailProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (credential?.accessToken) {
      privateGmailToken = credential.accessToken;
      return { success: true };
    }
    return { success: false, error: 'No Gmail access token granted by Google' };
  } catch (error: any) {
    console.error('Failed to connect Gmail:', error);
    return { success: false, error: error?.message || 'Gmail permission request failed' };
  }
}

export function disconnectFeatureGmail(): void {
  privateGmailToken = null;
}

/**
 * Connect Google Calendar independently with feature-specific scope: calendar.events
 */
export async function connectFeatureGoogleCalendar(): Promise<{ success: boolean; error?: string }> {
  try {
    const calProvider = new GoogleAuthProvider();
    calProvider.addScope('https://www.googleapis.com/auth/calendar.events');
    calProvider.setCustomParameters({
      prompt: 'consent',
      include_granted_scopes: 'true',
    });

    const result = await signInWithPopup(auth, calProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (credential?.accessToken) {
      privateCalendarToken = credential.accessToken;
      return { success: true };
    }
    return { success: false, error: 'No Calendar access token granted by Google' };
  } catch (error: any) {
    console.error('Failed to connect Google Calendar:', error);
    return { success: false, error: error?.message || 'Calendar permission request failed' };
  }
}

export function disconnectFeatureGoogleCalendar(): void {
  privateCalendarToken = null;
}

/**
 * Connect Google Docs independently with feature-specific scope: documents
 */
export async function connectFeatureGoogleDocs(): Promise<{ success: boolean; error?: string }> {
  try {
    const docsProvider = new GoogleAuthProvider();
    docsProvider.addScope('https://www.googleapis.com/auth/documents');
    docsProvider.setCustomParameters({
      prompt: 'consent',
      include_granted_scopes: 'true',
    });

    const result = await signInWithPopup(auth, docsProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (credential?.accessToken) {
      privateDocsToken = credential.accessToken;
      return { success: true };
    }
    return { success: false, error: 'No Google Docs access token granted by Google' };
  } catch (error: any) {
    console.error('Failed to connect Google Docs:', error);
    return { success: false, error: error?.message || 'Google Docs permission request failed' };
  }
}

export function disconnectFeatureGoogleDocs(): void {
  privateDocsToken = null;
}

/**
 * Connect Google Tasks independently with feature-specific scope: tasks
 */
export async function connectFeatureGoogleTasks(): Promise<{ success: boolean; error?: string }> {
  try {
    const tasksProvider = new GoogleAuthProvider();
    tasksProvider.addScope('https://www.googleapis.com/auth/tasks');
    tasksProvider.setCustomParameters({
      prompt: 'consent',
      include_granted_scopes: 'true',
    });

    const result = await signInWithPopup(auth, tasksProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (credential?.accessToken) {
      privateTasksToken = credential.accessToken;
      return { success: true };
    }
    return { success: false, error: 'No Google Tasks access token granted by Google' };
  } catch (error: any) {
    console.error('Failed to connect Google Tasks:', error);
    return { success: false, error: error?.message || 'Google Tasks permission request failed' };
  }
}

export function disconnectFeatureGoogleTasks(): void {
  privateTasksToken = null;
}

export function disconnectAllWorkspaceFeatures(): void {
  privateDriveToken = null;
  privateGmailToken = null;
  privateCalendarToken = null;
  privateDocsToken = null;
  privateTasksToken = null;
}

