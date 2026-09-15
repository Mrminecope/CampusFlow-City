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
  EducationPassport 
} from '../types';

export const initialUser: UserProfile = {
  uid: 'demo_maya_sharma',
  name: 'Maya Sharma',
  email: 'maya.sharma@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Student',
  headline: 'Aspiring Computer Science & AI Researcher',
  passportId: 'CF-2026-8841-INTL',
  currentSchool: 'Oakridge International Academy',
  graduationYear: 2027,
  gpa: 3.88,
  maxGpa: 4.0,
  targetDegree: 'Bachelor of Science (BSc)',
  targetMajor: 'Computer Science & Software Engineering',
  targetCountries: ['Canada', 'Singapore', 'Switzerland', 'Australia', 'United Kingdom', 'United States'],
  satScore: 1480,
  ieltsScore: 8.0,
  toeflScore: 112,
  profileCompletion: 92,
  bio: 'Passionate about machine learning, distributed systems, and educational accessibility. Lead programmer for high school robotics team and active competitive coding participant.',
  skills: [
    'Python & NumPy',
    'TypeScript & React',
    'Data Structures & Algorithms',
    'PyTorch & Deep Learning Foundations',
    'Robotics C++ Systems',
    'Technical Writing & Research'
  ],
  interests: [
    'Artificial Intelligence & Deep Learning',
    'Distributed Systems & High-Performance Computing',
    'Robotics & Autonomous Navigation',
    'Educational Accessibility in STEM'
  ],
  careerGoal: 'AI Research Scientist & Distributed Systems Architect',
  budget: '$30,000 - $45,000 / year (Targeting Merit Scholarships & Research Assistantships)',
  preferredLocation: 'Canada, Singapore, Switzerland, UK, US'
};

export const initialPassport: EducationPassport = {
  passportNumber: 'CF-2026-8841-INTL',
  issueDate: '01 Sep 2026',
  expiryDate: '01 Sep 2030',
  institution: 'Oakridge International Academy',
  status: 'Verified',
  qrData: 'CF-PASSPORT-MAYA-SHARMA-VERIFIED-HASH-99812A4F',
  verifiedBadges: [
    { id: 'b1', title: 'Official Academic Transcript', issuedBy: 'International Baccalaureate Board', date: 'Jul 2026', icon: 'FileCheck' },
    { id: 'b2', title: 'IELTS Academic C1 (8.0)', issuedBy: 'British Council / IDP', date: 'Aug 2026', icon: 'Award' },
    { id: 'b3', title: 'SAT Reasoning (1480/1600)', issuedBy: 'College Board USA', date: 'Jun 2026', icon: 'CheckCircle2' },
    { id: 'b4', title: 'AP Scholar with Distinction', issuedBy: 'College Board', date: 'Aug 2026', icon: 'Sparkles' },
    { id: 'b5', title: 'Global Olympiad Finalist', issuedBy: 'International STEM League', date: 'May 2026', icon: 'Trophy' }
  ],
  academicScores: [
    { subject: 'Mathematics (Higher Level)', grade: '7 / 7 (A*)', level: 'IB HL' },
    { subject: 'Computer Science', grade: '7 / 7 (A*)', level: 'IB HL' },
    { subject: 'Physics', grade: '6 / 7 (A)', level: 'IB HL' },
    { subject: 'Chemistry', grade: '6 / 7 (A)', level: 'IB SL' },
    { subject: 'English Language & Literature', grade: '6 / 7 (A)', level: 'IB SL' },
    { subject: 'Economics', grade: '7 / 7 (A*)', level: 'IB SL' }
  ]
};

export const initialUniversities: University[] = [
  {
    id: 'ubc',
    name: 'University of British Columbia',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&auto=format&fit=crop&q=80',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/University_of_British_Columbia_coat_of_arms.svg/200px-University_of_British_Columbia_coat_of_arms.svg.png',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
    location: 'Vancouver, Canada',
    city: 'Vancouver',
    country: 'Canada',
    ranking: 34,
    rankingBadge: 'Top 50',
    matchScore: 94,
    matchTier: 'Strong Match',
    acceptanceRate: '52%',
    tuitionPerYear: '$42,500 CAD',
    livingCosts: '$18,000 CAD / yr',
    description: 'A global centre for teaching, learning and research, consistently ranked among the top 20 public universities in the world.',
    popularMajors: ['Computer Science (BSc)', 'Data Science', 'Biochemistry', 'Mechanical Engineering'],
    requirements: {
      minGpa: 3.6,
      satScore: 1380,
      ieltsScore: 6.5,
      documents: ['Transcripts', 'Personal Profile Essay', 'English Test']
    },
    isShortlisted: true,
    websiteUrl: 'https://www.ubc.ca'
  },
  {
    id: 'nus',
    name: 'National University of Singapore',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&auto=format&fit=crop&q=80',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/200px-NUS_coat_of_arms.svg.png',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80',
    location: 'Singapore',
    city: 'Singapore',
    country: 'Singapore',
    ranking: 8,
    rankingBadge: 'Top 20',
    matchScore: 91,
    matchTier: 'Strong Match',
    acceptanceRate: '11%',
    tuitionPerYear: '$38,200 SGD',
    livingCosts: '$14,000 SGD / yr',
    description: 'Asia’s leading university with rigorous multidisciplinary curricula and high impact research across digital technology, bioscience, and sustainability.',
    popularMajors: ['Computer Science (BSc)', 'Business Analytics', 'Electrical Engineering', 'Quantitative Finance'],
    requirements: {
      minGpa: 3.85,
      satScore: 1450,
      ieltsScore: 7.0,
      documents: ['High School Transcripts', 'Standardized Test Scores', 'Achievements Portfolio']
    },
    isShortlisted: true,
    websiteUrl: 'https://www.nus.edu.sg'
  },
  {
    id: 'eth-zurich',
    name: 'ETH Zurich',
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/ETH_Z%C3%BCrich_Logo_black.svg/300px-ETH_Z%C3%BCrich_Logo_black.svg.png',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    location: 'Zurich, Switzerland',
    city: 'Zurich',
    country: 'Switzerland',
    ranking: 7,
    rankingBadge: 'Top 10',
    matchScore: 88,
    matchTier: 'Good Match',
    acceptanceRate: '27%',
    tuitionPerYear: 'CHF 1,460 / yr',
    livingCosts: 'CHF 22,000 / yr',
    description: 'Ranked world #7, ETH Zurich is world-renowned for cutting-edge science, mathematics, computer science, and engineering breakthroughs.',
    popularMajors: ['Data Science (BSc)', 'Computer Science (BSc)', 'Robotics & Control', 'Physics'],
    requirements: {
      minGpa: 3.8,
      ieltsScore: 7.5,
      documents: ['Full Transcripts', 'Comprehensive Math Syllabus', 'Motivation Letter']
    },
    isShortlisted: true,
    websiteUrl: 'https://ethz.ch'
  },
  {
    id: 'utoronto',
    name: 'University of Toronto',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&auto=format&fit=crop&q=80',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coat_of_arms.svg/200px-Utoronto_coat_of_arms.svg.png',
    coverImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&auto=format&fit=crop&q=80',
    location: 'Toronto, Canada',
    city: 'Toronto',
    country: 'Canada',
    ranking: 21,
    rankingBadge: 'Top 25',
    matchScore: 96,
    matchTier: 'Strong Match',
    acceptanceRate: '43%',
    tuitionPerYear: '$59,000 CAD',
    livingCosts: '$19,500 CAD / yr',
    description: 'Canada’s leading institution of learning, discovery and knowledge creation, recognized as a global leader in Artificial Intelligence.',
    popularMajors: ['Computer Science (Undergraduate)', 'Engineering Science', 'Rotman Commerce', 'Neuroscience'],
    requirements: {
      minGpa: 3.7,
      satScore: 1420,
      ieltsScore: 6.5,
      documents: ['Senior Transcripts', 'Supplementary Application', 'English Proficiency']
    },
    isShortlisted: true,
    websiteUrl: 'https://www.utoronto.ca'
  },
  {
    id: 'uamsterdam',
    name: 'University of Amsterdam',
    logo: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=100&auto=format&fit=crop&q=80',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Logo_Universiteit_van_Amsterdam.svg/240px-Logo_Universiteit_van_Amsterdam.svg.png',
    coverImage: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&auto=format&fit=crop&q=80',
    location: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    country: 'Netherlands',
    ranking: 53,
    rankingBadge: 'Top 60',
    matchScore: 92,
    matchTier: 'Strong Match',
    acceptanceRate: '35%',
    tuitionPerYear: '€14,800 / yr',
    livingCosts: '€12,500 / yr',
    description: 'One of Europe’s prominent research universities situated in the heart of Amsterdam with over 100 English-taught international degrees.',
    popularMajors: ['Computer Science (BSc)', 'Artificial Intelligence', 'Economics & Business', 'Psychology'],
    requirements: {
      minGpa: 3.5,
      ieltsScore: 6.5,
      documents: ['Secondary Diploma', 'Curriculum Vitae', 'Letter of Motivation']
    },
    isShortlisted: true,
    websiteUrl: 'https://www.uva.nl'
  },
  {
    id: 'unimelb',
    name: 'University of Melbourne',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&auto=format&fit=crop&q=80',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/University_of_Melbourne_Coat_of_Arms.svg/200px-University_of_Melbourne_Coat_of_Arms.svg.png',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
    location: 'Melbourne, Australia',
    city: 'Melbourne',
    country: 'Australia',
    ranking: 13,
    rankingBadge: 'Top 15',
    matchScore: 90,
    matchTier: 'Strong Match',
    acceptanceRate: '70%',
    tuitionPerYear: '$48,000 AUD',
    livingCosts: '$24,000 AUD / yr',
    description: 'Australia’s #1 university, renowned globally for academic excellence, vibrant campus culture, and state-of-the-art research hubs.',
    popularMajors: ['Computing (Bachelor)', 'Biomedicine', 'Commerce', 'Civil Engineering'],
    requirements: {
      minGpa: 3.6,
      satScore: 1360,
      ieltsScore: 6.5,
      documents: ['Academic Transcripts', 'Passport ID', 'Proof of English']
    },
    isShortlisted: true,
    websiteUrl: 'https://www.unimelb.edu.au'
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    logo: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=100&auto=format&fit=crop&q=80',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/200px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png',
    coverImage: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80',
    location: 'Cambridge, United Kingdom',
    city: 'Cambridge',
    country: 'United Kingdom',
    ranking: 2,
    rankingBadge: 'Top 5',
    matchScore: 82,
    matchTier: 'Reach',
    acceptanceRate: '15%',
    tuitionPerYear: '£37,290 / yr',
    livingCosts: '£14,500 / yr',
    description: 'One of the world’s oldest and most prestigious universities, offering collegiate tutoring and peerless intellectual development.',
    popularMajors: ['Computer Science Tripos', 'Natural Sciences', 'Mathematics', 'Engineering'],
    requirements: {
      minGpa: 3.95,
      satScore: 1520,
      ieltsScore: 7.5,
      documents: ['UCAS Application', 'Admissions Assessment (TMUA)', 'Written Work Samples', 'Interview']
    },
    isShortlisted: false,
    websiteUrl: 'https://www.cam.ac.uk'
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    logo: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=100&auto=format&fit=crop&q=80',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Stanford_University_seal_2003.svg/200px-Stanford_University_seal_2003.svg.png',
    coverImage: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&auto=format&fit=crop&q=80',
    location: 'Stanford, California, USA',
    city: 'Stanford',
    country: 'United States',
    ranking: 3,
    rankingBadge: 'Top 5',
    matchScore: 80,
    matchTier: 'Reach',
    acceptanceRate: '3.6%',
    tuitionPerYear: '$62,484 USD',
    livingCosts: '$21,500 USD / yr',
    description: 'At the heart of Silicon Valley, Stanford is the cradle of tech entrepreneurship, scientific innovation, and global leadership.',
    popularMajors: ['Computer Science (BS)', 'Symbolic Systems', 'Electrical Engineering', 'Economics'],
    requirements: {
      minGpa: 3.96,
      satScore: 1540,
      ieltsScore: 7.5,
      documents: ['Common Application', 'Stanford Essays', '3 LORs', 'Official Transcripts']
    },
    isShortlisted: false,
    websiteUrl: 'https://www.stanford.edu'
  }
];

export const initialApplications: Application[] = [
  {
    id: 'app-utoronto',
    universityId: 'utoronto',
    universityName: 'University of Toronto',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coat_of_arms.svg/200px-Utoronto_coat_of_arms.svg.png',
    program: 'Computer Science (Undergraduate)',
    degree: 'Bachelor of Science (BSc)',
    intake: 'Fall 2027',
    status: 'Documents Pending',
    progress: 72,
    nextStep: 'Upload documents',
    deadline: '2026-10-14',
    appliedDate: '2026-09-02',
    notes: 'Submitted personal statement and high school predicted marks. Awaiting term 1 final transcripts upload.'
  },
  {
    id: 'app-uamsterdam',
    universityId: 'uamsterdam',
    universityName: 'University of Amsterdam',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Logo_Universiteit_van_Amsterdam.svg/240px-Logo_Universiteit_van_Amsterdam.svg.png',
    program: 'Computer Science (BSc)',
    degree: 'Bachelor of Science (BSc)',
    intake: 'Fall 2027',
    status: 'Submitted',
    progress: 100,
    nextStep: 'Awaiting decision',
    deadline: '2026-11-01',
    appliedDate: '2026-08-25',
    notes: 'All documents verified by admission committee. Selection results expected in December.'
  },
  {
    id: 'app-unimelb',
    universityId: 'unimelb',
    universityName: 'University of Melbourne',
    crestUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/University_of_Melbourne_Coat_of_Arms.svg/200px-University_of_Melbourne_Coat_of_Arms.svg.png',
    program: 'Computing (Bachelor)',
    degree: 'Bachelor of Science (BSc)',
    intake: 'Semester 1 2027',
    status: 'In Progress',
    progress: 48,
    nextStep: 'Complete application',
    deadline: '2026-11-03',
    appliedDate: '2026-09-05',
    notes: 'Statement of Intent drafted. Need recommendation letters finalized.'
  }
];

export const initialDeadlines: DeadlineItem[] = [
  {
    id: 'dl-1',
    title: 'University of Toronto',
    subtitle: 'Document submission',
    category: 'Document',
    dateStr: '2026-10-14',
    day: '14',
    month: 'OCT',
    daysLeft: 5,
    urgency: 'critical',
    universityName: 'University of Toronto',
    completed: false
  },
  {
    id: 'dl-2',
    title: 'International Student Award',
    subtitle: 'Scholarship application',
    category: 'Scholarship',
    dateStr: '2026-10-19',
    day: '19',
    month: 'OCT',
    daysLeft: 10,
    urgency: 'warning',
    universityName: 'Global Education Council',
    completed: false
  },
  {
    id: 'dl-3',
    title: 'University of Melbourne',
    subtitle: 'Final application',
    category: 'Application',
    dateStr: '2026-11-03',
    day: '03',
    month: 'NOV',
    daysLeft: 25,
    urgency: 'normal',
    universityName: 'University of Melbourne',
    completed: false
  },
  {
    id: 'dl-4',
    title: 'ETH Zurich Early Application',
    subtitle: 'Bachelor admissions round 1',
    category: 'Application',
    dateStr: '2026-11-15',
    day: '15',
    month: 'NOV',
    daysLeft: 37,
    urgency: 'normal',
    universityName: 'ETH Zurich',
    completed: false
  },
  {
    id: 'dl-5',
    title: 'IELTS Academic Retake (Optional)',
    subtitle: 'Registration deadline',
    category: 'Exam',
    dateStr: '2026-11-20',
    day: '20',
    month: 'NOV',
    daysLeft: 42,
    urgency: 'normal',
    universityName: 'British Council',
    completed: false
  }
];

export const initialCourses: Course[] = [
  {
    id: 'c-ubc-cs',
    universityId: 'ubc',
    universityName: 'University of British Columbia',
    universityCountry: 'Canada',
    title: 'Computer Science (BSc)',
    degreeLevel: 'Bachelor',
    duration: '4 Years',
    tuition: '$42,500 CAD / yr',
    applicationFee: '$125 CAD',
    intakeDates: ['September 2027', 'January 2028'],
    language: 'English',
    credits: 120,
    overview: 'Comprehensive study of computer software, hardware design, algorithms, machine learning, and computer security with extensive co-op internship opportunities.',
    prerequisites: ['Pre-Calculus 12 (min 85%)', 'Physics 12', 'English 12'],
    deadline: 'Jan 15, 2027'
  },
  {
    id: 'c-nus-cs',
    universityId: 'nus',
    universityName: 'National University of Singapore',
    universityCountry: 'Singapore',
    title: 'Bachelor of Computing in Computer Science',
    degreeLevel: 'Bachelor',
    duration: '4 Years',
    tuition: '$38,200 SGD / yr',
    applicationFee: '$20 SGD',
    intakeDates: ['August 2027'],
    language: 'English',
    credits: 160,
    overview: 'Consistently ranked among the top 10 computer science programs in the world. Includes specialization in AI, Cyber Defense, Financial Tech, and Quantum Computing.',
    prerequisites: ['HL Mathematics (Grade 6 or 7)', 'Physics or Chemistry', 'English Language'],
    deadline: 'Feb 28, 2027'
  },
  {
    id: 'c-eth-ds',
    universityId: 'eth-zurich',
    universityName: 'ETH Zurich',
    universityCountry: 'Switzerland',
    title: 'Data Science & Applied Computing (BSc)',
    degreeLevel: 'Bachelor',
    duration: '3 Years',
    tuition: 'CHF 1,460 / yr',
    applicationFee: 'CHF 150',
    intakeDates: ['September 2027'],
    language: 'German & English',
    credits: 180,
    overview: 'Combines rigorous mathematical foundations with modern statistical learning, database systems, and big data architecture.',
    prerequisites: ['Advanced Mathematics', 'Physics', 'Language Certification'],
    deadline: 'Apr 30, 2027'
  },
  {
    id: 'c-uoft-cs',
    universityId: 'utoronto',
    universityName: 'University of Toronto',
    universityCountry: 'Canada',
    title: 'Computer Science & AI Stream (Undergraduate)',
    degreeLevel: 'Bachelor',
    duration: '4 Years',
    tuition: '$59,000 CAD / yr',
    applicationFee: '$180 CAD',
    intakeDates: ['September 2027'],
    language: 'English',
    credits: 20,
    overview: 'Home of modern deep learning breakthroughs under Geoffrey Hinton. Offers the prestigious Arts & Science Internship Program (ASIP) with top global tech firms.',
    prerequisites: ['Calculus & Advanced Functions', 'English 12', 'Physics or Chemistry'],
    deadline: 'Jan 15, 2027'
  },
  {
    id: 'c-unimelb-comp',
    universityId: 'unimelb',
    universityName: 'University of Melbourne',
    universityCountry: 'Australia',
    title: 'Bachelor of Science (Computing and Software Systems)',
    degreeLevel: 'Bachelor',
    duration: '3 Years',
    tuition: '$48,000 AUD / yr',
    applicationFee: '$100 AUD',
    intakeDates: ['March 2027', 'July 2027'],
    language: 'English',
    credits: 300,
    overview: 'Gain specialized knowledge in software development, data structures, cloud architectures, and user-centred design in vibrant Melbourne.',
    prerequisites: ['Mathematical Methods', 'English (Band 6)'],
    deadline: 'Nov 30, 2026'
  },
  {
    id: 'c-uamsterdam-ai',
    universityId: 'uamsterdam',
    universityName: 'University of Amsterdam',
    universityCountry: 'Netherlands',
    title: 'Artificial Intelligence (BSc)',
    degreeLevel: 'Bachelor',
    duration: '3 Years',
    tuition: '€14,800 / yr',
    applicationFee: '€100',
    intakeDates: ['September 2027'],
    language: 'English',
    credits: 180,
    overview: 'One of the first dedicated AI programs in Europe. Explores cognitive psychology, logic, neural networks, computer vision, and autonomous agents.',
    prerequisites: ['Mathematics HL/VWO equivalent', 'English C1'],
    deadline: 'Jan 15, 2027'
  }
];

export const initialScholarships: Scholarship[] = [
  {
    id: 'sch-1',
    name: 'International Student Award',
    provider: 'Global Education Council & Partner Universities',
    universityName: 'Multiple Institutions',
    amount: '$15,000 / year',
    coverageType: 'Partial Tuition',
    deadline: '2026-10-19',
    eligibleCountries: ['All International Students'],
    targetDegrees: ['Bachelor', 'Master'],
    gpaRequirement: 3.7,
    description: 'Merit-based award acknowledging exceptional secondary school academic performance and leadership in extracurricular activities.',
    matchScore: 98,
    applied: true
  },
  {
    id: 'sch-2',
    name: 'Lester B. Pearson International Scholarship',
    provider: 'University of Toronto',
    universityName: 'University of Toronto',
    amount: 'Full Tuition + Books & Residence',
    coverageType: 'Full Tuition',
    deadline: '2026-11-30',
    eligibleCountries: ['Non-Canadian Citizens'],
    targetDegrees: ['Bachelor'],
    gpaRequirement: 3.9,
    description: 'The most prestigious scholarship at U of T, recognizing students who demonstrate exceptional academic achievement and creative community leadership.',
    matchScore: 92,
    applied: false
  },
  {
    id: 'sch-3',
    name: 'Women in STEM Global Excellence Grant',
    provider: 'International Tech & Engineering Foundation',
    amount: '$20,000 one-time grant',
    coverageType: 'One-Time Grant',
    deadline: '2026-12-15',
    eligibleCountries: ['Global'],
    targetDegrees: ['Bachelor', 'Master'],
    gpaRequirement: 3.6,
    description: 'Aimed at supporting promising female students pursuing degrees in Computer Science, Data Science, and Robotics engineering.',
    matchScore: 95,
    applied: false
  },
  {
    id: 'sch-4',
    name: 'Amsterdam Merit Scholarship (AMS)',
    provider: 'University of Amsterdam',
    universityName: 'University of Amsterdam',
    amount: '€25,000 / year',
    coverageType: 'Full Tuition',
    deadline: '2027-01-15',
    eligibleCountries: ['Non-EU / EEA'],
    targetDegrees: ['Bachelor', 'Master'],
    gpaRequirement: 3.8,
    description: 'Full tuition coverage for outstanding non-EU students who rank in the top 10% of their graduating class.',
    matchScore: 89,
    applied: false
  },
  {
    id: 'sch-5',
    name: 'Melbourne International Undergraduate Scholarship',
    provider: 'University of Melbourne',
    universityName: 'University of Melbourne',
    amount: '50% to 100% Tuition Fee Remission',
    coverageType: 'Full Tuition',
    deadline: '2026-12-01',
    eligibleCountries: ['All International Candidates'],
    targetDegrees: ['Bachelor'],
    gpaRequirement: 3.85,
    description: 'Awarded to high-achieving international students undertaking undergraduate study at the University of Melbourne.',
    matchScore: 93,
    applied: false
  }
];

export const initialExams: EntranceExam[] = [
  {
    id: 'exam-sat',
    code: 'SAT',
    name: 'Scholastic Assessment Test',
    category: 'Standardized',
    nextTestDate: '05 Dec 2026',
    registrationDeadline: '20 Nov 2026',
    fee: '$104 USD (International)',
    maxScore: '1600',
    userScore: '1480 (98th percentile)',
    status: 'Score Available',
    requiredBy: ['US Colleges (Optional/Required)', 'NUS Singapore', 'U of T (Optional)'],
    prepTips: ['Focus on Desmos graphing calculator tricks for Math section', 'Practice digital adaptive timing on Bluebook App']
  },
  {
    id: 'exam-ielts',
    code: 'IELTS',
    name: 'International English Language Testing System (Academic)',
    category: 'English Proficiency',
    nextTestDate: '14 Nov 2026',
    registrationDeadline: '03 Nov 2026',
    fee: '$245 USD',
    maxScore: 'Band 9.0',
    userScore: 'Band 8.0 (C1 / Expert)',
    status: 'Score Available',
    requiredBy: ['University of Toronto (min 6.5)', 'UBC (min 6.5)', 'ETH Zurich (min 7.5)', 'Uni of Melbourne (min 6.5)'],
    prepTips: ['Maintain structural coherence in Task 2 essay with clear thesis and topical sentences', 'Practice reading skimming for paragraph headings']
  },
  {
    id: 'exam-act',
    code: 'ACT',
    name: 'American College Testing',
    category: 'Standardized',
    nextTestDate: '12 Dec 2026',
    registrationDeadline: '13 Nov 2026',
    fee: '$181 USD',
    maxScore: '36',
    userScore: '33',
    status: 'Score Available',
    requiredBy: ['All US Universities', 'Canadian & European Universities'],
    prepTips: ['Speed is crucial: 35 minutes for 40 questions in the Science section']
  },
  {
    id: 'exam-tmua',
    code: 'TMUA',
    name: 'Test of Mathematics for University Admission',
    category: 'Standardized',
    nextTestDate: '21 Oct 2026',
    registrationDeadline: 'Passed',
    fee: '£78 GBP',
    maxScore: '9.0',
    userScore: '7.8',
    status: 'Score Available',
    requiredBy: ['University of Cambridge', 'Imperial College London', 'LSE'],
    prepTips: ['Emphasize mathematical logic, negation of statements, and proof deduction']
  }
];

export const initialDocuments: StudentDocument[] = [
  {
    id: 'doc-1',
    name: 'Official High School Transcript (Grades 9-11 & Term 1)',
    category: 'Transcript',
    fileSize: '3.4 MB',
    updatedAt: '02 Sep 2026',
    status: 'Verified',
    fileName: 'Maya_Sharma_Official_Transcript_2026.pdf'
  },
  {
    id: 'doc-2',
    name: 'Statement of Purpose (Computer Science & AI Focus)',
    category: 'SOP',
    fileSize: '640 KB',
    updatedAt: '05 Sep 2026',
    status: 'Verified',
    fileName: 'Maya_Sharma_SOP_Undergraduate_CS.pdf'
  },
  {
    id: 'doc-3',
    name: 'Letter of Recommendation - Mr. Vance (Mathematics Dept Head)',
    category: 'LOR',
    fileSize: '420 KB',
    updatedAt: '15 Aug 2026',
    status: 'Verified',
    fileName: 'LOR_Vance_Math_Oakridge.pdf'
  },
  {
    id: 'doc-4',
    name: 'Letter of Recommendation - Dr. H. Kim (Robotics Mentor)',
    category: 'LOR',
    fileSize: '510 KB',
    updatedAt: '06 Sep 2026',
    status: 'Pending Review',
    fileName: 'LOR_Dr_Kim_Robotics.pdf'
  },
  {
    id: 'doc-5',
    name: 'IELTS Academic Official Test Report Form (TRF)',
    category: 'Test Score',
    fileSize: '1.2 MB',
    updatedAt: '20 Aug 2026',
    status: 'Verified',
    fileName: 'IELTS_Academic_TRF_MayaSharma_8.0.pdf'
  },
  {
    id: 'doc-6',
    name: 'International Passport Bio-Data Scan',
    category: 'Passport',
    fileSize: '2.1 MB',
    updatedAt: '10 Jul 2026',
    status: 'Verified',
    fileName: 'Passport_Scan_Bio_MayaSharma.pdf'
  },
  {
    id: 'doc-7',
    name: 'Financial Guarantee Affidavit & Sponsor Bank Letter',
    category: 'Financial',
    fileSize: '1.8 MB',
    updatedAt: '08 Sep 2026',
    status: 'Draft',
    fileName: 'Financial_Affidavit_Draft_2026.pdf'
  }
];

export const initialOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'MIT Beaver Works Summer High School AI Institute (BWSI)',
    host: 'Massachusetts Institute of Technology (MIT)',
    type: 'Summer School',
    location: 'Cambridge, MA & Virtual',
    stipendOrFunding: 'Full Tuition Waiver for Accepted Candidates',
    duration: '4 Weeks (July 2027)',
    deadline: 'Mar 15, 2027',
    tag: 'Competitive STEM'
  },
  {
    id: 'opp-2',
    title: 'CERN High School Students Physics & Computing Internship',
    host: 'CERN (European Organization for Nuclear Research)',
    type: 'Research Fellowship',
    location: 'Geneva, Switzerland',
    stipendOrFunding: 'Travel & Daily Allowance Provided',
    duration: '2 Weeks (August 2027)',
    deadline: 'Jan 20, 2027',
    tag: 'Global Research'
  },
  {
    id: 'opp-3',
    title: 'Oxford Global Youth Leadership & Public Policy Colloquium',
    host: 'University of Oxford Outreach',
    type: 'Exchange',
    location: 'Oxford, United Kingdom',
    stipendOrFunding: 'Scholarship Grants Available',
    duration: '10 Days',
    deadline: 'Feb 10, 2027',
    tag: 'Leadership'
  },
  {
    id: 'opp-4',
    title: 'Global Youth Hackathon: AI for Sustainable Education',
    host: 'UNESCO & CampusFlow Partner Hub',
    type: 'Hackathon',
    location: 'Virtual Worldwide',
    stipendOrFunding: '$10,000 Prize Pool + Incubation',
    duration: '48 Hours (Nov 2026)',
    deadline: 'Nov 05, 2026',
    tag: 'Innovation'
  }
];

export const educationCityDistricts = [
  {
    id: 'dist-na',
    name: 'North American Innovation Corridor',
    region: 'North America',
    cities: ['Toronto', 'Vancouver', 'Boston', 'San Francisco / Bay Area'],
    institutionsCount: 84,
    popularMajors: ['Computer Science', 'Biomedical Engineering', 'Commerce & Finance'],
    avgTuition: '$38,000 - $65,000 USD/yr',
    avgLivingCost: '$18,000 - $24,000 USD/yr',
    workPermit: 'Post-Graduation Work Permit (1 to 3 Years)',
    description: 'Home to Silicon Valley, the Toronto AI corridor (Vector Institute), and the historic Cambridge university cluster.'
  },
  {
    id: 'dist-eu',
    name: 'European Continental Knowledge Belt',
    region: 'Europe',
    cities: ['Zurich', 'Amsterdam', 'Munich', 'Stockholm', 'Paris'],
    institutionsCount: 92,
    popularMajors: ['Artificial Intelligence', 'Mechanical Systems', 'Data Analytics', 'Sustainable Energy'],
    avgTuition: '€1,500 - €18,000 EUR/yr',
    avgLivingCost: '€12,000 - €22,000 EUR/yr',
    workPermit: 'Search Year / Orientation Visa (1 Year)',
    description: 'World-leading public technical universities with low tuition fees, high English proficiency, and close proximity to European tech giants.'
  },
  {
    id: 'dist-apac',
    name: 'Asia-Pacific Tech & Research Quad',
    region: 'Asia-Pacific',
    cities: ['Singapore', 'Melbourne', 'Sydney', 'Tokyo', 'Seoul'],
    institutionsCount: 76,
    popularMajors: ['Quantitative Finance', 'Computer Science', 'Cybersecurity', 'Logistics'],
    avgTuition: '$30,000 - $48,000 AUD/SGD/yr',
    avgLivingCost: '$14,000 - $22,000 AUD/SGD/yr',
    workPermit: '2 to 4 Years Post-Study Work Stream',
    description: 'Dynamic economic growth hub with state-of-the-art campus facilities, high safety indexes, and global career launchpads.'
  },
  {
    id: 'dist-uk',
    name: 'UK Russell Group Collegiate Quarter',
    region: 'United Kingdom',
    cities: ['London', 'Cambridge', 'Oxford', 'Edinburgh', 'Manchester'],
    institutionsCount: 55,
    popularMajors: ['Mathematics', 'Computing Tripos', 'Economics', 'Law'],
    avgTuition: '£22,000 - £42,000 GBP/yr',
    avgLivingCost: '£12,000 - £16,000 GBP/yr',
    workPermit: 'Graduate Route Visa (2 Years)',
    description: 'Centuries of academic tradition combined with modern frontier science and direct access to London’s global financial center.'
  }
];
