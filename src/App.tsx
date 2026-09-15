import React, { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  auth, 
  getUserProfileFromFirestore, 
  saveUserProfileToFirestore,
  saveUserApplication,
  fetchUserApplicationsFromFirestore,
  logoutUser 
} from './lib/firebase';
import { 
  UserProfile, 
  University, 
  Course, 
  Application, 
  DeadlineItem, 
  Scholarship, 
  EntranceExam, 
  StudentDocument, 
  Opportunity, 
  EducationPassport,
  NavigationTab,
  DriveDocument,
  AdmissionsEmail,
  CalendarDeadlineEvent
} from './types';
import { 
  initialUser, 
  initialPassport, 
  initialUniversities, 
  initialApplications, 
  initialDeadlines, 
  initialCourses, 
  initialScholarships, 
  initialExams, 
  initialDocuments, 
  initialOpportunities 
} from './data/mockData';
import {
  fallbackDriveDocuments,
  fallbackAdmissionsEmails,
  fallbackCalendarEvents,
  fetchLiveGoogleDriveDocuments,
  fetchLiveGmailAdmissionsEmails,
  fetchLiveGoogleCalendarEvents
} from './lib/workspaceService';
import { getCachedAccessToken, signInWithGoogle } from './lib/firebase';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { AuthModal } from './components/common/AuthModal';

// Views
import { DashboardView } from './components/views/DashboardView';
import { AdmissionInboxView } from './components/views/AdmissionInboxView';
import { EducationPassportView } from './components/views/EducationPassportView';
import { UniversitiesView } from './components/views/UniversitiesView';
import { CoursesView } from './components/views/CoursesView';
import { ScholarshipsView } from './components/views/ScholarshipsView';
import { EntranceExamsView } from './components/views/EntranceExamsView';
import { OpportunitiesView } from './components/views/OpportunitiesView';
import { ApplicationsView } from './components/views/ApplicationsView';
import { DeadlinesView } from './components/views/DeadlinesView';
import { DocumentsView } from './components/views/DocumentsView';
import { AIAdvisorView } from './components/views/AIAdvisorView';
import { PathwaySimulatorView } from './components/views/PathwaySimulatorView';
import { EducationCityView } from './components/views/EducationCityView';
import { ApplicationStudioView } from './components/views/ApplicationStudioView';
import { CompareView } from './components/views/CompareView';
import { ProfileView } from './components/views/ProfileView';
import { SettingsView } from './components/views/SettingsView';
import { LandingView } from './components/landing/LandingView';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [passport, setPassport] = useState<EducationPassport>(initialPassport);
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>(initialDeadlines);
  const [scholarships, setScholarships] = useState<Scholarship[]>(initialScholarships);
  const [exams, setExams] = useState<EntranceExam[]>(initialExams);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [documents, setDocuments] = useState<StudentDocument[]>(initialDocuments);
  const [driveDocuments, setDriveDocuments] = useState<DriveDocument[]>(fallbackDriveDocuments);
  const [admissionsEmails, setAdmissionsEmails] = useState<AdmissionsEmail[]>(fallbackAdmissionsEmails);
  const [calendarEvents, setCalendarEvents] = useState<CalendarDeadlineEvent[]>(fallbackCalendarEvents);
  const [isGoogleConnected, setIsGoogleConnected] = useState<boolean>(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(true);

  // Monitor Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setIsFirebaseConnected(true);
        setActiveTab((current) => (current === 'landing' ? 'dashboard' : current));
        try {
          // Try fetching existing Firestore profile
          const existing = await getUserProfileFromFirestore(fbUser.uid);
          if (existing) {
            setUser((prev) => ({
              ...prev,
              ...existing,
              uid: fbUser.uid,
              email: fbUser.email || prev.email,
              name: fbUser.displayName || existing.name || prev.name,
              avatarUrl: fbUser.photoURL || prev.avatarUrl,
            }));
          } else {
            // Initialize in Firestore
            const newProfile: UserProfile = {
              ...user,
              uid: fbUser.uid,
              name: fbUser.displayName || user.name,
              email: fbUser.email || user.email,
              avatarUrl: fbUser.photoURL || user.avatarUrl,
            };
            setUser(newProfile);
            await saveUserProfileToFirestore(fbUser.uid, newProfile);
          }

          // Fetch stored applications from Firestore if available
          const savedApps = await fetchUserApplicationsFromFirestore(fbUser.uid);
          if (savedApps && savedApps.length > 0) {
            setApplications(savedApps);
          }
        } catch (syncError) {
          console.warn('Firestore user profile sync deferred:', syncError);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Handlers
  const handleToggleShortlist = (uniId: string) => {
    setUniversities((prev) =>
      prev.map((u) => (u.id === uniId ? { ...u, isShortlisted: !u.isShortlisted } : u))
    );
  };

  const handleApplyUniversity = (uni: University) => {
    // Check if application already exists
    const exists = applications.find((a) => a.universityId === uni.id);
    if (!exists) {
      const newApp: Application = {
        id: `app-${Date.now()}`,
        universityId: uni.id,
        universityName: uni.name,
        crestUrl: uni.crestUrl,
        program: uni.popularMajors[0] || 'Bachelor Program',
        degree: 'Bachelor of Science (BSc)',
        intake: 'Fall 2027',
        status: 'Documents Pending',
        progress: 25,
        nextStep: 'Submit academic transcript',
        deadline: '2027-01-15',
        appliedDate: new Date().toISOString().split('T')[0],
      };
      setApplications((prev) => [newApp, ...prev]);
      if (user.uid) {
        saveUserApplication(user.uid, newApp);
      }
    }
    setActiveTab('applications');
  };

  const handleApplyCourse = (course: Course) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      universityId: course.universityId,
      universityName: course.universityName,
      crestUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&auto=format&fit=crop&q=80',
      program: course.title,
      degree: course.degreeLevel,
      intake: course.intakeDates[0] || 'Fall 2027',
      status: 'In Progress',
      progress: 35,
      nextStep: 'Upload official transcripts',
      deadline: course.deadline,
      appliedDate: new Date().toISOString().split('T')[0],
    };
    setApplications((prev) => [newApp, ...prev]);
    if (user.uid) {
      saveUserApplication(user.uid, newApp);
    }
    setActiveTab('applications');
  };

  const handleApplyScholarship = (scholarshipId: string) => {
    setScholarships((prev) =>
      prev.map((s) => (s.id === scholarshipId ? { ...s, applied: true } : s))
    );
  };

  const handleAddApplication = (newApp: Application) => {
    setApplications((prev) => [newApp, ...prev]);
    if (user.uid) {
      saveUserApplication(user.uid, newApp);
    }
  };

  const handleUpdateApplicationStatus = (
    appId: string,
    status: Application['status'],
    progress: number
  ) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status, progress } : app))
    );
  };

  const handleAddDeadline = (newDeadline: DeadlineItem) => {
    setDeadlines((prev) => [newDeadline, ...prev]);
  };

  const handleToggleDeadline = (id: string) => {
    setDeadlines((prev) =>
      prev.map((d) => (d.id === id ? { ...d, completed: !d.completed } : d))
    );
  };

  const handleUploadDocument = (doc: StudentDocument) => {
    setDocuments((prev) => [doc, ...prev]);
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  // Google Workspace Authorization & Sync
  const handleConnectGoogle = async () => {
    try {
      const res = await signInWithGoogle();
      if (res.user) {
        setIsGoogleConnected(true);
        setUser((prev) => ({
          ...prev,
          uid: res.user.uid,
          name: res.user.displayName || prev.name,
          email: res.user.email || prev.email,
          avatarUrl: res.user.photoURL || prev.avatarUrl,
        }));

        if (res.accessToken) {
          try {
            const liveDocs = await fetchLiveGoogleDriveDocuments(res.accessToken);
            if (liveDocs.length > 0) setDriveDocuments(liveDocs);
          } catch (e) {
            console.warn('Drive sync fallback:', e);
          }

          try {
            const liveEmails = await fetchLiveGmailAdmissionsEmails(res.accessToken);
            if (liveEmails.length > 0) setAdmissionsEmails(liveEmails);
          } catch (e) {
            console.warn('Gmail sync fallback:', e);
          }

          try {
            const liveCal = await fetchLiveGoogleCalendarEvents(res.accessToken);
            if (liveCal.length > 0) setCalendarEvents(liveCal);
          } catch (e) {
            console.warn('Calendar sync fallback:', e);
          }
        }
      }
    } catch (err) {
      console.error('Google Workspace authorization error:', err);
    }
  };

  const handleRefreshEmails = async () => {
    const token = getCachedAccessToken();
    if (token) {
      const liveEmails = await fetchLiveGmailAdmissionsEmails(token);
      if (liveEmails.length > 0) setAdmissionsEmails(liveEmails);
    } else {
      setAdmissionsEmails([...fallbackAdmissionsEmails]);
    }
  };

  const handleRefreshDrive = async () => {
    const token = getCachedAccessToken();
    if (token) {
      const liveDocs = await fetchLiveGoogleDriveDocuments(token);
      if (liveDocs.length > 0) setDriveDocuments(liveDocs);
    } else {
      setDriveDocuments([...fallbackDriveDocuments]);
    }
  };

  const handleAssignDocumentToApp = (docId: string, appId: string, appName: string) => {
    setDriveDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              selectedForApplicationId: appId || undefined,
              selectedForApplicationName: appName || undefined,
            }
          : d
      )
    );
  };

  const handleUpdateUser = async (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    if (user.uid) {
      await saveUserProfileToFirestore(user.uid, updated);
    }
  };

  const handleResetData = () => {
    setUser(initialUser);
    setPassport(initialPassport);
    setUniversities(initialUniversities);
    setApplications(initialApplications);
    setDeadlines(initialDeadlines);
    setCourses(initialCourses);
    setScholarships(initialScholarships);
    setExams(initialExams);
    setOpportunities(initialOpportunities);
    setDocuments(initialDocuments);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(initialUser);
    setActiveTab('landing');
  };

  // Phase 2: CampusFlow City Landing Experience for FundMyCrazy
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <LandingView
          user={user}
          onEnterApp={(tab) => setActiveTab(tab || 'dashboard')}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onConnectGoogle={handleConnectGoogle}
        />
        {/* Authentication Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={(newUserData) => {
            setUser((prev) => ({ ...prev, ...newUserData }));
            setActiveTab('dashboard');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Navigation Bar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isFirebaseActive={isFirebaseConnected}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Clean Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          shortlistCount={universities.filter((u) => u.isShortlisted).length}
          deadlinesCount={deadlines.filter((d) => !d.completed).length}
        />

        {/* Main Workspace Area (offset by 64px on lg screens for sidebar) */}
        <main className="flex-1 lg:pl-64 overflow-y-auto bg-slate-50/40 p-4 md:p-8">
          {activeTab === 'dashboard' && (
            <DashboardView
              user={user}
              passport={passport}
              applications={applications}
              universities={universities}
              deadlines={deadlines}
              documents={documents}
              scholarships={scholarships}
              admissionsEmails={admissionsEmails}
              driveDocuments={driveDocuments}
              calendarEvents={calendarEvents}
              isGoogleConnected={isGoogleConnected}
              setActiveTab={setActiveTab}
              onSelectUniversity={handleApplyUniversity}
              onToggleShortlist={handleToggleShortlist}
              onAskAIAdvisor={(question) => {
                setActiveTab('advisor');
              }}
            />
          )}

          {activeTab === 'inbox' && (
            <AdmissionInboxView
              emails={admissionsEmails}
              applications={applications}
              isGoogleConnected={isGoogleConnected}
              userEmail={user.email}
              onConnectGoogle={handleConnectGoogle}
              onRefreshEmails={handleRefreshEmails}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'passport' && (
            <EducationPassportView user={user} passport={passport} />
          )}

          {activeTab === 'universities' && (
            <UniversitiesView
              universities={universities}
              onToggleShortlist={handleToggleShortlist}
              onApplyUniversity={handleApplyUniversity}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesView
              courses={courses}
              universities={universities}
              onApplyCourse={handleApplyCourse}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'scholarships' && (
            <ScholarshipsView
              scholarships={scholarships}
              user={user}
              onApplyScholarship={handleApplyScholarship}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'exams' && <EntranceExamsView exams={exams} />}

          {activeTab === 'opportunities' && (
            <OpportunitiesView
              opportunities={opportunities}
              user={user}
              universities={universities}
              courses={courses}
              scholarships={scholarships}
              exams={exams}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'applications' && (
            <ApplicationsView
              applications={applications}
              universities={universities}
              onAddApplication={handleAddApplication}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'deadlines' && (
            <DeadlinesView
              deadlines={deadlines}
              isGoogleConnected={isGoogleConnected}
              userEmail={user.email}
              onConnectGoogle={handleConnectGoogle}
              onAddDeadline={handleAddDeadline}
              onToggleComplete={handleToggleDeadline}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsView
              documents={documents}
              driveDocuments={driveDocuments}
              applications={applications}
              user={user}
              isGoogleConnected={isGoogleConnected}
              userEmail={user.email}
              onConnectGoogle={handleConnectGoogle}
              onRefreshDrive={handleRefreshDrive}
              onAssignDocumentToApp={handleAssignDocumentToApp}
              onUploadDocument={handleUploadDocument}
              onDeleteDocument={handleDeleteDocument}
            />
          )}

          {activeTab === 'advisor' && <AIAdvisorView user={user} />}

          {activeTab === 'simulator' && (
            <PathwaySimulatorView user={user} universities={universities} />
          )}

          {activeTab === 'city' && (
            <EducationCityView
              user={user}
              passport={passport}
              setActiveTab={setActiveTab}
              onApplyUniversity={handleApplyUniversity}
            />
          )}

          {activeTab === 'studio' && (
            <ApplicationStudioView
              user={user}
              passport={passport}
              applications={applications}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'compare' && (
            <CompareView
              universities={universities}
              onApplyUniversity={handleApplyUniversity}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView user={user} onUpdateUser={handleUpdateUser} />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              user={user}
              applications={applications}
              documents={documents}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(newUserData) => {
          setUser((prev) => ({ ...prev, ...newUserData }));
        }}
      />
    </div>
  );
}
