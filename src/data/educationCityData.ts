import { EducationCityPlace } from '../types';

export const INITIAL_EDUCATION_CITY_PLACES: EducationCityPlace[] = [
  // ==========================================
  // INDIAN EDUCATION LOCATIONS (PRIMARY DEMO)
  // ==========================================

  // 1. UNIVERSITIES (INDIA / DELHI NCR)
  {
    id: 'city-in-uni-1',
    name: 'Indian Institute of Technology Delhi (IIT Delhi)',
    category: 'University',
    subCategory: 'Institute of National Importance (Technical Research)',
    address: 'Hauz Khas, New Delhi, Delhi 110016',
    locality: 'Hauz Khas',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.5450, lng: 77.1926 },
    programs: [
      'B.Tech in Computer Science & Engineering',
      'B.Tech in Mathematics & Computing',
      'M.Tech & Ph.D. in Artificial Intelligence (Yardi School of AI)'
    ],
    opportunities: [
      'Summer Undergraduate Research Award (SURA) Fellowship',
      'IIT Delhi Technology Business Incubator (FITT) Residency',
      'Institute Merit-cum-Means (MCM) Scholarship'
    ],
    matchScore: 97,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: '₹2,25,000 INR / yr',
      livingCost: '₹12,000 INR / mo (Hostel & Boarding)',
      financialAid: 'Tuition waivers for eligible categories and merit-based assistance'
    },
    nextAction: {
      label: 'Explore JEE Advanced Eligibility & Cutoffs',
      actionType: 'explore',
      tabTarget: 'exams'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (STEM & AI Track)',
      passportPrerequisite: 'Verified Grade 12 (CBSE / ISC / State Board 90%+), Top Percentile',
      universityOrInstitution: 'IIT Delhi (Department of Computer Science & Engineering)',
      courseOrProgram: 'B.Tech in Computer Science & Engineering',
      scholarshipMatch: 'Institute Merit-cum-Means Scholarship (Tuition waiver + stipend)',
      examRequirement: 'JEE Advanced Rank Qualification (Top Percentile)',
      internshipLink: 'Academic Research Laboratory & Technical Practicum',
      careerOutcome: 'Systems Architect & Computational Research Scientist'
    },
    description: 'National technical university recognized for computational research, algorithmic modeling, and engineering innovation located in Hauz Khas.',
    keyHighlights: [
      'Designated Institute of National Importance with academic research links',
      'Home to the Yardi School of Artificial Intelligence and advanced robotics facilities',
      'Active student innovation ecosystem with on-campus venture incubation'
    ],
    contactInfo: {
      email: 'admissions@admin.iitd.ac.in',
      website: 'https://home.iitd.ac.in'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-in-uni-2',
    name: 'University of Delhi (Faculty of Technology & Sciences - North Campus)',
    category: 'University',
    subCategory: 'Central Public University (Collegiate System)',
    address: 'University Enclave, North Campus, Delhi 110007',
    locality: 'University Enclave, North Campus',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6890, lng: 77.2085 },
    programs: [
      'B.Tech in Computer Science & Engineering',
      'B.Sc. (Hons) in Mathematics & Computing',
      'Integrated M.Sc. in Informatics & Data Science'
    ],
    opportunities: [
      'Cluster Innovation Centre (CIC) Real-World Project Incubation',
      'Delhi University Research Grant for Young Scholars',
      'Inter-Collegiate Hackathon & Algorithmic Challenge Series'
    ],
    matchScore: 94,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: '₹48,000 INR / yr',
      livingCost: '₹10,500 INR / mo (Hostel / Campus PG)',
      financialAid: 'Post-Matric Central Scholarships & University Need-Based Waivers'
    },
    nextAction: {
      label: 'Check CUET UG Score Benchmarks',
      actionType: 'explore',
      tabTarget: 'exams'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Mathematics & Computing Track)',
      passportPrerequisite: 'Verified Higher Secondary Certificate, Academic Honors in Math',
      universityOrInstitution: 'University of Delhi (North Campus)',
      courseOrProgram: 'B.Tech in Computer Science & Engineering',
      scholarshipMatch: 'National Merit Scholarship & DU Need Assistance',
      examRequirement: 'CUET UG (Mathematics, Physics, Chemistry / General Test)',
      internshipLink: 'Delhi Knowledge Cluster / Public Data Systems Internship',
      careerOutcome: 'Full-Stack Computational Specialist & Data Engineer'
    },
    description: 'Central university enclave in North Delhi hosting collegiate faculties, extensive research archives, and degree programs in computer science and mathematical analytics.',
    keyHighlights: [
      'Centrally located collegiate campus with expansive library resources',
      'Cluster Innovation Centre promoting applied engineering projects',
      'Vibrant academic debate, cultural, and competitive coding societies'
    ],
    contactInfo: {
      email: 'dean_acad@du.ac.in',
      website: 'https://du.ac.in'
    },
    isSaved: false,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-in-uni-3',
    name: 'Indraprastha Institute of Information Technology Delhi (IIIT-Delhi)',
    category: 'University',
    subCategory: 'State Autonomous Research Institute',
    address: 'Okhla Industrial Estate, Phase III, Near Govind Puri Metro, New Delhi 110020',
    locality: 'Okhla Industrial Estate, Phase III',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.5447, lng: 77.2726 },
    programs: [
      'B.Tech in Computer Science and Artificial Intelligence (CSAI)',
      'B.Tech in Computer Science and Applied Mathematics (CSAM)',
      'M.Tech in Computational Biology & Machine Learning'
    ],
    opportunities: [
      'Infosys Centre for Artificial Intelligence Student Fellowships',
      'Undergraduate Summer Research Scheme (UGRS) with Faculty',
      'Direct Industry Co-op Placement Windows'
    ],
    matchScore: 93,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: '₹4,30,000 INR / yr',
      livingCost: '₹14,000 INR / mo (Hostel & Boarding)',
      financialAid: 'Delhi Govt Merit-cum-Means Fee Waiver Scheme (for qualifying applicants)'
    },
    nextAction: {
      label: 'Review JAC Delhi Counseling Requirements',
      actionType: 'explore',
      tabTarget: 'applications'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Machine Learning Track)',
      passportPrerequisite: 'Verified Class 12 Math/Physics (92%+), Competitive JEE Score',
      universityOrInstitution: 'IIIT-Delhi (Okhla Campus)',
      courseOrProgram: 'B.Tech in Computer Science & Artificial Intelligence',
      scholarshipMatch: 'Delhi NCT Merit-cum-Means Scholarship',
      examRequirement: 'JEE Main (Qualified for JAC Delhi Counseling)',
      internshipLink: 'IIIT-D Computing Lab Summer Student Residency',
      careerOutcome: 'Applied Machine Learning Engineer & Systems Developer'
    },
    description: 'State autonomous research institution in Okhla specialized in information technology, mathematical computing, and artificial intelligence.',
    keyHighlights: [
      'Curriculum closely aligned with contemporary computer science standards',
      'Dedicated faculty research publications in computing and data sciences',
      'Modern campus equipped with high-throughput computational lab clusters'
    ],
    contactInfo: {
      email: 'admin-academic@iiitd.ac.in',
      website: 'https://iiitd.ac.in'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },

  // 2. COLLEGES (INDIA / DELHI NCR)
  {
    id: 'city-in-col-1',
    name: 'St. Stephen\'s College (University of Delhi)',
    category: 'College',
    subCategory: 'Constituent Undergraduate Science & Arts College',
    address: 'Sudhir Bose Marg, University Enclave, North Campus, Delhi 110007',
    locality: 'University Enclave, North Campus',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6922, lng: 77.2144 },
    programs: [
      'B.Sc. (Hons) in Mathematics',
      'B.Sc. (Hons) in Physics',
      'B.Sc. in Physical Sciences with Computer Science'
    ],
    opportunities: [
      'Centenary Science Research Fellowship',
      'Academic Exchange Seminars with Collegiate Partners',
      'College Student Aid & Endowment Bursaries'
    ],
    matchScore: 92,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: '₹44,000 INR / yr',
      livingCost: '₹9,800 INR / mo (Campus Residence / PG)',
      financialAid: 'Endowed bursaries and merit-based college tuition fee concessions'
    },
    nextAction: {
      label: 'Explore CUET Subject Combinations & Interview Format',
      actionType: 'explore',
      tabTarget: 'exams'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Mathematical Sciences Focus)',
      passportPrerequisite: 'Verified Academic Records, Strong Foundation in Mathematics',
      universityOrInstitution: 'St. Stephen\'s College (University of Delhi)',
      courseOrProgram: 'B.Sc. (Hons) in Mathematics',
      scholarshipMatch: 'College Memorial Merit Bursary',
      examRequirement: 'CUET UG + College Admission Aptitude Assessment',
      internshipLink: 'Academic Research Fellowship Opportunities',
      careerOutcome: 'Quantitative Analyst & Theoretical Computing Specialist'
    },
    description: 'Undergraduate collegiate institution in North Campus offering scientific training, small tutorial systems, and student academic societies.',
    keyHighlights: [
      'Small-group tutorials promoting individual academic mentorship',
      'Active scientific and mathematical societies organizing collegiate symposia',
      'Long-standing tradition of academic programs and student fellowships'
    ],
    contactInfo: {
      email: 'admissions@ststephens.edu',
      website: 'https://ststephens.edu'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },
  {
    id: 'city-in-col-2',
    name: 'Hindu College (University of Delhi)',
    category: 'College',
    subCategory: 'Constituent Undergraduate Science College',
    address: 'Sudhir Bose Marg, University Enclave, North Campus, Delhi 110007',
    locality: 'University Enclave, North Campus',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6908, lng: 77.2110 },
    programs: [
      'B.Sc. (Hons) in Statistics & Analytics',
      'B.Sc. (Hons) in Mathematics',
      'B.Sc. (Hons) in Physics'
    ],
    opportunities: [
      'Undergraduate Science Foundation Research Grant',
      'Data Analytics & Computational Modeling Club Projects',
      'National Science Olympiad Mentoring Series'
    ],
    matchScore: 91,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: '₹28,500 INR / yr',
      livingCost: '₹9,000 INR / mo (Hostel / Campus PG)',
      financialAid: 'Post-Matric Scholarships & Hindu College Student Welfare Fund'
    },
    nextAction: {
      label: 'Review DU CSAS Allocation Cutoffs',
      actionType: 'explore',
      tabTarget: 'applications'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Data & Statistics Stream)',
      passportPrerequisite: 'Verified Class 12 Scores, High Performance in Quantitative Disciplines',
      universityOrInstitution: 'Hindu College (University of Delhi)',
      courseOrProgram: 'B.Sc. (Hons) in Statistics & Analytics',
      scholarshipMatch: 'Central Sector Scholarship Scheme for College Students',
      examRequirement: 'CUET UG (Quantitative & Core Science Domain Papers)',
      internshipLink: 'Analytics & Statistical Modeling Practicum with Indian Tech Labs',
      careerOutcome: 'Data Scientist & Statistical Systems Architect'
    },
    description: 'Collegiate institution offering undergraduate programs in statistical computing, mathematics, and experimental sciences in North Campus.',
    keyHighlights: [
      'Longstanding academic reputation among undergraduate collegiate faculties',
      'Equipped experimental labs and dedicated computational data resources',
      'Vibrant student intellectual culture with multiple active subject forums'
    ],
    contactInfo: {
      email: 'principal@hinducollege.ac.in',
      website: 'https://hinducollege.ac.in'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },
  {
    id: 'city-in-col-3',
    name: 'Delhi Technological University (DTU - Formerly DCE)',
    category: 'College',
    subCategory: 'State Technical University & Engineering Institution',
    address: 'Shahbad Daulatpur, Bawana Road, Delhi 110042',
    locality: 'Shahbad Daulatpur, Bawana',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.7499, lng: 77.1170 },
    programs: [
      'B.Tech in Software Engineering',
      'B.Tech in Information Technology',
      'B.Tech in Mathematics & Computing'
    ],
    opportunities: [
      'DTU Innovation and Incubation Foundation (IIF)',
      'Student Autonomous Vehicle & Robotics Lab (Team Defianz & UAS)',
      'Annual Technical Hackathon & Industry Mentorship Weeks'
    ],
    matchScore: 90,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: '₹2,20,000 INR / yr',
      livingCost: '₹10,500 INR / mo (Hostel / Campus PG)',
      financialAid: 'Fee concessions for meritorious students and economically weaker sections'
    },
    nextAction: {
      label: 'View JAC Delhi Counseling Matrix',
      actionType: 'explore',
      tabTarget: 'exams'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Software Engineering Focus)',
      passportPrerequisite: 'Verified Class 12 Science Stream, Valid JEE Main Score',
      universityOrInstitution: 'Delhi Technological University (Bawana Road Campus)',
      courseOrProgram: 'B.Tech in Software Engineering',
      scholarshipMatch: 'Delhi Govt Higher Education Financial Support Scheme',
      examRequirement: 'JEE Main (Admissions through Joint Admission Counseling Delhi)',
      internshipLink: 'Technical Internship at NCR Software Engineering Labs',
      careerOutcome: 'Senior Cloud & Systems Software Engineer'
    },
    description: 'Technical institution with an eight-decade heritage of engineering education, active student technical projects, competitive coding societies, and campus incubation.',
    keyHighlights: [
      'Extensive 160-acre campus with dedicated computational centers',
      'Active student teams participating in national and collegiate engineering events',
      'Alumni community across technology enterprises and public research'
    ],
    contactInfo: {
      email: 'academic@dtu.ac.in',
      website: 'https://dtu.ac.in'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },

  // 3. LEARNING HUBS (INDIA / DELHI NCR)
  {
    id: 'city-in-hub-1',
    name: 'National Science Centre & Innovation Hub',
    category: 'Learning Hub',
    subCategory: 'National STEM Discovery & Prototyping Center',
    address: 'Bhairon Road, Near Gate No. 1 Pragati Maidan, New Delhi 110001',
    locality: 'Pragati Maidan',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6133, lng: 77.2458 },
    programs: [
      'Robotics & Microcontroller Prototyping Workshop Series',
      'Makerspace Open Fabrication Lab & 3D Modeling Clinic',
      'Weekend Computational Science & Physics Demonstrations'
    ],
    opportunities: [
      'National Innovation Festival Project Exhibitor Pass',
      'Student Maker Residency & Equipment Access',
      'Mentoring Sessions with Science Educators'
    ],
    matchScore: 89,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: '₹1,500 INR / workshop course',
      livingCost: 'Non-residential facility',
      financialAid: 'Nominal public fees and student laboratory access hours'
    },
    nextAction: {
      label: 'Register for Weekend STEM Maker Workshop',
      actionType: 'register',
      tabTarget: 'opportunities'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Hardware & Applied AI Prototyping)',
      passportPrerequisite: 'Student Verification ID, Active Project Proposal',
      universityOrInstitution: 'National Science Centre Innovation Hub (Pragati Maidan)',
      courseOrProgram: 'Hands-on Prototyping & Applied Robotics Track',
      scholarshipMatch: 'National Science Fair Project Grant',
      examRequirement: 'None (Open Educational Enrolment)',
      internshipLink: 'Student Lab Mentor Residency at Science Centre',
      careerOutcome: 'Robotics Prototyper & Hardware-AI Systems Developer'
    },
    description: 'Civic science learning and prototyping centre located near Pragati Maidan, equipped with digital fabrication tools, optics benches, and hands-on discovery laboratories.',
    keyHighlights: [
      'Equipped Innovation Hub with 3D printers, laser cutters, and electronics benches',
      'Regular interactive seminars conducted by practicing scientists and educators',
      'Annual national exhibitions showcasing youth scientific prototypes'
    ],
    contactInfo: {
      email: 'nscdelhi@gmail.com',
      website: 'https://nscd.gov.in'
    },
    isSaved: false,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-in-hub-2',
    name: 'British Council Learning & Education Resource Centre',
    category: 'Learning Hub',
    subCategory: 'International Higher Education Advising & Language Resource Hub',
    address: '17 Kasturba Gandhi Marg, Connaught Place, New Delhi 110001',
    locality: 'Connaught Place',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6272, lng: 77.2223 },
    programs: [
      'IELTS Academic Preparation & Masterclasses',
      'Higher Education Advising & Scholarship Clinics',
      'Academic Writing & Scientific Communication Seminars'
    ],
    opportunities: [
      'GREAT Scholarships & Women in STEM Information Workshops',
      'Digital Library Access to Academic Journals',
      'Alumni Networking & Peer Counseling Sessions'
    ],
    matchScore: 88,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: '₹6,000 - ₹14,000 INR / module',
      livingCost: 'Non-residential facility',
      financialAid: 'Open advising seminars and digital academic access options'
    },
    nextAction: {
      label: 'Book Educational Advising Session',
      actionType: 'book',
      tabTarget: 'opportunities'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Global Education & Research Track)',
      passportPrerequisite: 'Academic Passport ID, Target Program List',
      universityOrInstitution: 'British Council New Delhi Learning Hub',
      courseOrProgram: 'Advanced Academic Communication & IELTS Masterclass',
      scholarshipMatch: 'Scholarship Guidance & Information Workshops',
      examRequirement: 'IELTS Academic Preparation Diagnostic',
      internshipLink: 'Peer Advising Assistant at Education Hub',
      careerOutcome: 'Global Research Scholar & Scientific Communicator'
    },
    description: 'Educational resource and advising centre in Connaught Place, offering standardized language preparation, scholarship seminars, and academic research resources.',
    keyHighlights: [
      'Higher education pathway advising and study guidance',
      'Digital learning collection with journal subscriptions',
      'Centrally situated in Connaught Place with regular student guidance workshops'
    ],
    contactInfo: {
      email: 'delhi.enquiry@britishcouncil.in',
      website: 'https://britishcouncil.in'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },

  // 4. EXAM CENTERS (INDIA / DELHI NCR)
  {
    id: 'city-in-exam-1',
    name: 'National Testing Agency (NTA) City Examination Centre - Okhla',
    category: 'Exam Center',
    subCategory: 'Official National Computer-Based Testing Venue',
    address: 'C-102, Phase II, Okhla Industrial Area, New Delhi 110020',
    locality: 'Okhla Phase II',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.5305, lng: 77.2730 },
    programs: [
      'JEE Main (Joint Entrance Examination - CBT)',
      'CUET UG (Common University Entrance Test - Undergraduate)',
      'CSIR NET & UGC NET Computer-Based Testing Sessions'
    ],
    opportunities: [
      'Official Pre-Examination CBT Familiarization Sessions',
      'Biometric Check-in & Candidate Verification Terminals',
      'PwD Candidate Support & Accessible Testing Workstations'
    ],
    matchScore: 95,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Standard National Application Fee (₹650 - ₹1,600 INR)',
      livingCost: 'Day venue only',
      financialAid: 'Concessionary fee categories per government notification'
    },
    nextAction: {
      label: 'Review Admit Card Details & Exam Timings',
      actionType: 'explore',
      tabTarget: 'deadlines'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (National Entrance Examinee)',
      passportPrerequisite: 'Official Government ID (Aadhaar / Passport) & Verified Admit Card',
      universityOrInstitution: 'NTA Official Examination Centre (Okhla Node)',
      courseOrProgram: 'National University Entrance & Aptitude Testing Series',
      scholarshipMatch: 'National Talent Search & Meritorious Testing Awards',
      examRequirement: 'JEE Main / CUET UG Scheduled Shift Verification',
      internshipLink: 'N/A (Standardized Testing Assessment Venue)',
      careerOutcome: 'Eligible Candidate for National Institute Admissions'
    },
    description: 'Computer-based examination venue equipped with secure biometric terminals, synchronized timers, and proctoring for national university admissions.',
    keyHighlights: [
      'Testing laboratory designed for standardized digital exams',
      'Adherence to NTA security protocols, biometric scans, and CCTV monitoring',
      'Accessible location adjacent to public transit in South East Delhi'
    ],
    contactInfo: {
      email: 'jeemain@nta.ac.in',
      website: 'https://nta.ac.in'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-in-exam-2',
    name: 'IDP IELTS Official Computer Test Centre - Connaught Place',
    category: 'Exam Center',
    subCategory: 'Standardized International Language Testing Venue',
    address: '6th Floor, Gopal Das Bhawan, 28 Barakhamba Road, Connaught Place, New Delhi 110001',
    locality: 'Connaught Place',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6300, lng: 77.2270 },
    programs: [
      'IELTS Academic on Computer',
      'IELTS for UKVI (Academic & General)',
      'One Skill Retake (OSR) Testing Sessions'
    ],
    opportunities: [
      'Official Computer-Delivered Practice Material Access',
      'Same-Day Speaking Test Scheduling Options',
      'Fast Electronic Score Reporting (e-TRF in 3-5 days)'
    ],
    matchScore: 93,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: 'Standard Test Fee (~₹17,000 INR per session)',
      livingCost: 'Day venue only',
      financialAid: 'Institutional test fee vouchers where sponsored'
    },
    nextAction: {
      label: 'Check Available Test Dates & Slot Booking',
      actionType: 'book',
      tabTarget: 'deadlines'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (International Language Verification)',
      passportPrerequisite: 'Valid International Passport (Mandatory Check-in Requirement)',
      universityOrInstitution: 'IDP Official Computer Test Centre (Barakhamba Road)',
      courseOrProgram: 'IELTS Academic Computer-Delivered Test',
      scholarshipMatch: 'Target Band Score for International Application Requirements',
      examRequirement: 'IELTS Academic on Computer (Listening, Reading, Writing, Speaking)',
      internshipLink: 'International Credential for Study & Work Abroad Considerations',
      careerOutcome: 'Verified International Language Credential for Admissions'
    },
    description: 'Certified test delivery venue offering modern testing workstations, noise-reducing headsets, and proctored computer suites for university admissions testing.',
    keyHighlights: [
      'Modern computer cubicles with high-definition displays and specialized headsets',
      'Electronic test score delivery within typical 3 to 5 business day timeframe',
      'Central New Delhi location near Barakhamba Road Metro Station'
    ],
    contactInfo: {
      email: 'ielts.india@idp.com',
      website: 'https://ieltsidpindia.com'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },
  {
    id: 'city-in-exam-3',
    name: 'ETS Prometric Testing Centre Delhi',
    category: 'Exam Center',
    subCategory: 'Standardized Graduate Admissions Testing Center',
    address: '8th Floor, Pinnacle Tower, Janakpuri District Centre, New Delhi 110058',
    locality: 'Janakpuri',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6288, lng: 77.0789 },
    programs: [
      'GRE General Test (Computer Delivered)',
      'TOEFL iBT Examination',
      'Professional Certification & International Admissions Assessments'
    ],
    opportunities: [
      'Official Pre-Exam Diagnostic Environmental Review',
      'Unofficial Quantitative & Verbal Score Summary at Test Completion',
      'Electronic Score Reports Sent to Selected Institutions'
    ],
    matchScore: 91,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: 'Standard ETS Fee (~$220 USD / exam equivalent)',
      livingCost: 'Day venue only',
      financialAid: 'ETS GRE Fee Reduction Program (fee waiver options for eligible applicants)'
    },
    nextAction: {
      label: 'Verify Slot Availability & Testing Guidelines',
      actionType: 'explore',
      tabTarget: 'deadlines'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Graduate & International Track)',
      passportPrerequisite: 'Valid Original Passport as Primary Identity Verification',
      universityOrInstitution: 'Prometric Testing Center Delhi (Janakpuri)',
      courseOrProgram: 'GRE / TOEFL Standardized Examination Delivery',
      scholarshipMatch: 'Score Target for Graduate Fellowships & Assistantships',
      examRequirement: 'Computer-Based GRE General Test',
      internshipLink: 'Standardized Academic Credential Verification',
      careerOutcome: 'Admissions Qualification for Graduate Study Programs'
    },
    description: 'Testing facility providing quiet, temperature-controlled, and secure testing environments for standardized university exams.',
    keyHighlights: [
      'Individual testing cubicles with proctors and continuous monitoring',
      'Frequent test dates offered during academic admissions seasons',
      'Convenient transit connectivity via Janakpuri West Metro Station'
    ],
    contactInfo: {
      email: 'delhicenter@prometric.com',
      website: 'https://prometric.com'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },

  // 5. INTERNSHIPS (INDIA / DELHI NCR)
  {
    id: 'city-in-intern-1',
    name: 'C-DAC Student Research Internship (High Performance Computing & AI)',
    category: 'Internship',
    subCategory: 'National Autonomous R&D Lab Technical Internship',
    address: 'C-DAC Innovation Park, B-30, Institutional Area, Sector 62, Noida, Delhi NCR 201307',
    locality: 'Sector 62, Noida',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6276, lng: 77.3639 },
    programs: [
      'High Performance Computing & PARAM Supercomputing Systems',
      'Multilingual AI, NLP, and Indian Language Model Training',
      'Cryptographic Systems & Secure Software Architecture'
    ],
    opportunities: [
      'Access to National Supercomputing Mission Workstations',
      'Research Stipend (₹15,000 - ₹25,000 INR / mo for selected fellows)',
      'Potential Co-authorship on Peer-Reviewed Technical Publications'
    ],
    matchScore: 96,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Research Internship (No student fee)',
      livingCost: '₹11,000 INR / mo (Local accommodation in Noida)',
      financialAid: 'Monthly research stipend + project completion certificate'
    },
    nextAction: {
      label: 'Submit Technical Project Proposal & Academic Resume',
      actionType: 'apply',
      tabTarget: 'documents'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Computational Systems Researcher)',
      passportPrerequisite: 'Verified Academic Standing in Computer Science, Strong Python/C++ Skills',
      universityOrInstitution: 'Centre for Development of Advanced Computing (Sector 62 Noida)',
      courseOrProgram: 'Supercomputing & Language Intelligence Internship',
      scholarshipMatch: 'C-DAC Young Researcher Honorarium',
      examRequirement: 'Technical Interview & Algorithmic Problem Solving Assessment',
      internshipLink: 'R&D Internship with Research Scientists',
      careerOutcome: 'High Performance Computing Specialist & AI Systems Engineer'
    },
    description: 'Technical research internship with national computing R&D organization under MeitY, focusing on supercomputing architecture, language models, and distributed computing.',
    keyHighlights: [
      'Practical training on high-performance supercomputing clusters',
      'Guidance by research scientists in parallel computing',
      'Project completion credentials recognized across academic institutions'
    ],
    contactInfo: {
      email: 'hrd-noida@cdac.in',
      website: 'https://cdac.in'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-in-intern-2',
    name: 'Microsoft India Development Center (IDC) Student Tech Fellowship',
    category: 'Internship',
    subCategory: 'Enterprise Software & Cloud AI Engineering Fellowship',
    address: 'DLF Cyber City, Building 10, Tower B, Gurugram, Delhi NCR 122002',
    locality: 'DLF Cyber City, Gurugram',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.4950, lng: 77.0890 },
    programs: [
      'Applied Machine Learning in Enterprise Cloud Architectures',
      'Large Scale Distributed Systems & Microservices Engineering',
      'Responsible AI & Algorithmic Ethics Practicum'
    ],
    opportunities: [
      'Student Fellowship Stipend (₹75,000 - ₹95,000 INR / mo)',
      '1-on-1 Mentorship with Software Engineering Leads',
      'Evaluation Opportunity for Continuing Career Consideration'
    ],
    matchScore: 97,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Paid Industry Fellowship (No student cost)',
      livingCost: 'Covered via stipend (Gurugram NCR housing)',
      financialAid: 'Corporate stipend + hardware resource access'
    },
    nextAction: {
      label: 'Explore Student Fellowship Application Window',
      actionType: 'apply',
      tabTarget: 'documents'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Cloud & AI Engineering Fellow)',
      passportPrerequisite: 'Verified Coding Profile, Data Structures & Algorithms Competency',
      universityOrInstitution: 'Microsoft India Development Center (Cyber City Gurugram)',
      courseOrProgram: 'Student Software Engineering Fellowship',
      scholarshipMatch: 'Competitive Corporate Student Fellowship Stipend',
      examRequirement: 'Online Coding Assessment & Technical Design Interviews',
      internshipLink: '10-12 Week Summer Engineering Placement',
      careerOutcome: 'Software Development Engineer & Cloud Intelligence Specialist'
    },
    description: 'Summer software engineering fellowship located in DLF Cyber City, providing hands-on experience building scalable cloud services, machine learning models, and developer tooling.',
    keyHighlights: [
      'Opportunity to contribute to production-scale engineering systems',
      'Technical mentorship with software engineers and project leads',
      'Modern campus in the Gurugram technology corridor'
    ],
    contactInfo: {
      email: 'university-recruiting-india@microsoft.com',
      website: 'https://careers.microsoft.com'
    },
    isSaved: false,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-in-intern-3',
    name: 'NITI Aayog National Data & Analytics Platform (NDAP) Young Scholar Internship',
    category: 'Internship',
    subCategory: 'Public Policy Data Science & Applied Analytics Internship',
    address: 'NITI Bhawan, Sansad Marg, New Delhi 110001',
    locality: 'Sansad Marg',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6225, lng: 77.2115 },
    programs: [
      'Public Policy Data Pipelines & Interactive Visualization',
      'Econometric Modeling on Large-Scale National Socio-Economic Datasets',
      'Open Government Data Standards & Machine-Readable APIs'
    ],
    opportunities: [
      'Mentorship by Policy Economists and Analytics Advisors',
      'Official Experience Credential Issued by NITI Aayog (Govt of India)',
      'Potential Co-authorship of Analytical Policy Briefs'
    ],
    matchScore: 90,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: 'Govt Student Internship Scheme (No fees)',
      livingCost: '₹12,000 INR / mo (Central New Delhi transit/stay)',
      financialAid: 'Formal government credential recognized for higher education'
    },
    nextAction: {
      label: 'Submit Statement of Purpose for Public Policy Track',
      actionType: 'apply',
      tabTarget: 'documents'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Data Science for Public Policy)',
      passportPrerequisite: 'Verified Undergraduate Record, Demonstrated Analytics / Python Skills',
      universityOrInstitution: 'NITI Aayog (National Institution for Transforming India)',
      courseOrProgram: 'National Data & Analytics Platform Young Scholar Fellowship',
      scholarshipMatch: 'Public Sector Analytical Fellowship Credential',
      examRequirement: 'Academic Merit & Statement of Purpose Evaluation',
      internshipLink: '6 to 12 Week Summer Policy Analytics Placement',
      careerOutcome: 'Public Policy Data Scientist & Socio-Economic Systems Analyst'
    },
    description: 'Internship program with public policy think tank focusing on data science and econometric modeling to explore governance and development data.',
    keyHighlights: [
      'Exposure to multi-sectoral national socio-economic data sets',
      'Mentorship from quantitative policy researchers and economists',
      'Central New Delhi location on historic Sansad Marg'
    ],
    contactInfo: {
      email: 'internship-niti@gov.in',
      website: 'https://niti.gov.in'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },

  // 6. MENTORS (INDIA / DELHI NCR)
  {
    id: 'city-in-mentor-1',
    name: 'Dr. Arvind Swaminathan (Senior Research Fellow & Admissions Mentor)',
    category: 'Mentor',
    subCategory: 'Academic Research & Higher Education Admissions Mentor',
    address: 'Qutab Institutional Area, New Delhi 110016',
    locality: 'Qutab Institutional Area',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.5360, lng: 77.1840 },
    programs: [
      'Undergraduate Statement of Purpose & Research Proposal Critique',
      'Competitive STEM Admissions & Olympiad Strategic Roadmapping',
      'Interview Preparation for Higher Technical & Postgraduate Admissions'
    ],
    opportunities: [
      'Bi-Weekly 1-on-1 Academic Counseling Cohorts',
      'Guidance on Research Paper Writing for Student Conferences',
      'Advisory on Fellowship and Grant Applications'
    ],
    matchScore: 96,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Pro-bono civic advising & sponsored non-profit workshops',
      livingCost: 'N/A (Virtual & in-person clinic)',
      financialAid: 'Complimentary mentoring for verified public school scholars'
    },
    nextAction: {
      label: 'Schedule 1-on-1 Academic Review Clinic',
      actionType: 'contact',
      tabTarget: 'advisor'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Research Scholar Aspirant)',
      passportPrerequisite: 'Verified Academic Passport, Draft Research Interests',
      universityOrInstitution: 'Admissions & Academic Advisory Forum (Qutab Area)',
      courseOrProgram: 'Advanced Higher Education Mentorship Series',
      scholarshipMatch: 'Sponsored Mentorship Fellowship',
      examRequirement: 'Review of Candidate Standardized Test Profiles',
      internshipLink: 'Referral to Research Laboratories & Faculty Projects',
      careerOutcome: 'Competitive Candidate for Computational Engineering Programs'
    },
    description: 'Academic researcher and admissions mentor advising students on competitive admissions to national institutes and international graduate programs in computer science.',
    keyHighlights: [
      'Extensive experience guiding students into computational engineering programs',
      'Deep focus on scientific clarity, portfolio presentation, and problem-solving',
      'Regular pro-bono clinics for students from government and non-metro schools'
    ],
    contactInfo: {
      email: 'mentor.swaminathan@campusflow.edu',
      website: 'https://campusflow.city/mentors/swaminathan'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-in-mentor-2',
    name: 'Priyanka Sengupta (Global Fellowships & Higher Education Advisor)',
    category: 'Mentor',
    subCategory: 'International Scholarships & Higher Education Strategist',
    address: 'Connaught Circus, Block B, New Delhi 110001',
    locality: 'Connaught Place',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6328, lng: 77.2195 },
    programs: [
      'International Fellowship Strategy Incubator',
      'Holistic Profile Curation for Global STEM Scholarships',
      'Leadership Essays & Video Interview Preparation Workshops'
    ],
    opportunities: [
      '8-Week Structured Fellowship Application Cohort',
      'Mock Panel Interviews with International Scholars',
      'Peer Mentorship Network Across University Chapters'
    ],
    matchScore: 94,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Subsidized workshop fees (Need-based fee waivers available)',
      livingCost: 'N/A',
      financialAid: 'Need-based fee waivers available for eligible applicants'
    },
    nextAction: {
      label: 'Request Fellowship Roadmap Consultation',
      actionType: 'contact',
      tabTarget: 'advisor'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Global Fellowship Track)',
      passportPrerequisite: 'Demonstrated Academic Excellence & Extracurricular Leadership',
      universityOrInstitution: 'Global Education Advisory Guild (Connaught Place)',
      courseOrProgram: 'International Fellowship Strategy & Leadership Masterclass',
      scholarshipMatch: 'Fellowship Guidance & Application Mentoring',
      examRequirement: 'Comprehensive Essay & Academic Portfolio Review',
      internshipLink: 'Academic Research Network Introductions',
      careerOutcome: 'Competitive Global Fellowship Scholar & Tech Leader'
    },
    description: 'Higher education adviser specializing in postgraduate application strategy for computing, engineering, and data science students.',
    keyHighlights: [
      'Former fellowship recipient with application evaluation expertise',
      'Specialized curriculum on personal statements and leadership narratives',
      'Regular advisory sessions hosted across Delhi NCR university campuses'
    ],
    contactInfo: {
      email: 'priyanka.sengupta@campusflow.edu',
      website: 'https://campusflow.city/mentors/sengupta'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },

  // 7. OPPORTUNITIES (INDIA / DELHI NCR)
  {
    id: 'city-in-opp-1',
    name: 'Delhi Youth Innovation & Applied AI Research Challenge',
    category: 'Opportunity',
    subCategory: 'Statewide Competitive STEM Innovation Summit',
    address: 'Pragati Maidan Exhibition Complex, New Delhi 110001',
    locality: 'Pragati Maidan',
    city: 'Delhi NCR',
    stateOrRegion: 'Delhi NCR',
    country: 'India',
    coordinates: { lat: 28.6180, lng: 77.2380 },
    programs: [
      'Applied AI for Urban Sustainability Challenge Track',
      'Student Computational Prototyping & Hackathon Showcase',
      'Scientific Poster Presentations Judged by Academic Panel'
    ],
    opportunities: [
      'Project Seed Grant of up to ₹2,50,000 INR for Top Student Teams',
      'Incubation Sandbox Access at Delhi Universities',
      'Certificate of Merit Issued by Department of Science & Technology'
    ],
    matchScore: 95,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Free Participation for Shortlisted Student Teams',
      livingCost: 'N/A',
      financialAid: 'Travel reimbursements and project prototyping grants available'
    },
    nextAction: {
      label: 'Submit 2-Page Abstract & Technical Blueprint',
      actionType: 'explore',
      tabTarget: 'documents'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Team Lead / AI Prototyper)',
      passportPrerequisite: 'Verified Student Enrollment, Project Working Code Repository',
      universityOrInstitution: 'Delhi Youth Innovation Secretariat (Pragati Maidan)',
      courseOrProgram: 'Urban AI & Civic Technology Innovation Challenge',
      scholarshipMatch: 'State Innovation Project Seed Grant',
      examRequirement: 'Technical Abstract Screening & Live Prototype Demo',
      internshipLink: 'Incubation Fellowship with University Hardware-AI Labs',
      careerOutcome: 'Student Founder & Innovative Technical Researcher'
    },
    description: 'Student challenge uniting college innovators and young researchers to develop solutions for civic, environmental, and technological questions using machine learning and computing.',
    keyHighlights: [
      'Supported by academic and technology research stakeholders in Delhi NCR',
      'Mentorship from technology practitioners and faculty advisors',
      'Showcase exhibition attended by engineering faculty, incubators, and mentors'
    ],
    contactInfo: {
      email: 'innovate@delhiedu.gov.in',
      website: 'https://innovate.delhi.gov.in'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },

  // ==========================================
  // INTERNATIONAL EDUCATION LOCATIONS (OPTIONAL SEARCH/FILTER)
  // ==========================================
  {
    id: 'city-uni-1',
    name: 'University of Toronto (St. George Campus)',
    category: 'University',
    subCategory: 'Comprehensive Public Research University',
    address: '27 King\'s College Cir, Toronto, ON M5S 1A1',
    locality: 'Downtown Toronto',
    city: 'Toronto',
    stateOrRegion: 'Ontario',
    country: 'Canada',
    coordinates: { lat: 43.6629, lng: -79.3957 },
    programs: [
      'B.S. in Computer Science & Artificial Intelligence',
      'Data Systems & Software Engineering',
      'Cognitive Science & Robotics'
    ],
    opportunities: [
      'PEY Co-op Work Term (12-16 month engineering internship)',
      'Vector Institute AI Undergraduate Research Fellowship',
      'Lester B. Pearson International Scholarship'
    ],
    matchScore: 96,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: '$60,510 CAD / yr',
      livingCost: '$1,650 CAD / mo',
      financialAid: 'Merit-based international bursaries and co-op work-term earnings'
    },
    nextAction: {
      label: 'Review Active Application #UT-99421',
      actionType: 'apply',
      tabTarget: 'applications'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (CS & AI Focus)',
      passportPrerequisite: 'Verified IB Diploma (38/45), GPA 3.85, Official Transcript',
      universityOrInstitution: 'University of Toronto (Faculty of Arts & Science)',
      courseOrProgram: 'B.S. Computer Science (Machine Learning Stream)',
      scholarshipMatch: 'Lester B. Pearson International Scholarship Candidate',
      examRequirement: 'IELTS Academic 7.5 (Achieved Band 8.0) + SAT 1490',
      internshipLink: 'Vector Institute / Research Lab Co-op Placement',
      careerOutcome: 'Applied AI Research Scientist & Systems Specialist'
    },
    description: 'Canadian research university known for work in computational intelligence, machine learning, and comprehensive science programs.',
    keyHighlights: [
      'Comprehensive public research university in Canada',
      'Proximity to downtown Toronto technology and innovation centres',
      'Dedicated International Student Centre & academic advisory'
    ],
    contactInfo: {
      email: 'admissions.help@utoronto.ca',
      website: 'https://utoronto.ca'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-uni-2',
    name: 'University of British Columbia (Vancouver)',
    category: 'University',
    subCategory: 'Major Comprehensive Research University',
    address: '2329 West Mall, Vancouver, BC V6T 1Z4',
    locality: 'Point Grey',
    city: 'Vancouver',
    stateOrRegion: 'British Columbia',
    country: 'Canada',
    coordinates: { lat: 49.2606, lng: -123.2460 },
    programs: [
      'B.Sc. in Computer Science',
      'Integrated Cognitive Systems',
      'Clean Energy & Environmental Engineering'
    ],
    opportunities: [
      'UBC Science Co-op student placements',
      'International Leader of Tomorrow (ILOT) Award',
      'Pacific Institute for the Mathematical Sciences (PIMS)'
    ],
    matchScore: 92,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: '$45,800 CAD / yr',
      livingCost: '$1,800 CAD / mo',
      financialAid: 'President\'s International Scholar Award available'
    },
    nextAction: {
      label: 'Submit SOP & Honors to UBC Portal',
      actionType: 'apply',
      tabTarget: 'applications'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (STEM Scholar)',
      passportPrerequisite: 'IB Math Analysis & Approaches HL (Grade 6+), GPA 3.85',
      universityOrInstitution: 'University of British Columbia (Point Grey)',
      courseOrProgram: 'Bachelor of Science (Computer Science Specialization)',
      scholarshipMatch: 'UBC Karen McKellin International Leader Award',
      examRequirement: 'English 12 equivalent (IELTS 8.0 Verified)',
      internshipLink: 'UBC Co-op Placement Opportunities',
      careerOutcome: 'Systems Architect & Computational Engineer'
    },
    description: 'Set against coastal mountains and Pacific beaches, UBC is a major research institution offering programs in sustainability and computational sciences.',
    keyHighlights: [
      'Internationally recognized academic programs in Computer Science',
      'Pacific Northwest innovation corridor link to regional tech hubs',
      'Seaside campus with modern research laboratories'
    ],
    contactInfo: {
      email: 'international.admissions@ubc.ca',
      website: 'https://ubc.ca'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },
  {
    id: 'city-uni-3',
    name: 'Massachusetts Institute of Technology (MIT)',
    category: 'University',
    subCategory: 'Polytechnic & Research Institution',
    address: '77 Massachusetts Ave, Cambridge, MA 02139',
    locality: 'Cambridge / Kendall',
    city: 'Cambridge',
    stateOrRegion: 'Massachusetts',
    country: 'United States',
    coordinates: { lat: 42.3601, lng: -71.0942 },
    programs: [
      'Course 6-3: Computer Science and Engineering',
      'Course 6-4: Artificial Intelligence and Decision Making',
      'Center for Brains, Minds and Machines (CBMM)'
    ],
    opportunities: [
      'UROP (Undergraduate Research Opportunities Program)',
      'Need-blind financial aid evaluation for international applicants',
      'Kendall Square Innovation Ecosystem programs'
    ],
    matchScore: 89,
    matchTier: 'Reach',
    estimatedCost: {
      tuitionOrFee: '$61,990 USD / yr',
      livingCost: '$2,100 USD / mo',
      financialAid: 'Demonstrated financial need met based on applicant eligibility'
    },
    nextAction: {
      label: 'Complete MIT Maker Portfolio Supplement',
      actionType: 'explore',
      tabTarget: 'documents'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (Competitive Applicant)',
      passportPrerequisite: 'Standardized SAT 1490, Math II Level 800, Research Portfolio',
      universityOrInstitution: 'MIT Schwarzman College of Computing',
      courseOrProgram: 'B.S. in Artificial Intelligence & Decision Making (6-4)',
      scholarshipMatch: 'MIT Need-Based Financial Aid Consideration',
      examRequirement: 'SAT 1490, AP Physics C / IB HL Math Analysis',
      internshipLink: 'MIT Research Lab Summer Undergraduate Fellowship',
      careerOutcome: 'Deep Learning Foundation Model Researcher & Computing Specialist'
    },
    description: 'Renowned polytechnic and research institute recognized for engineering, physics, and computer science in Kendall Square, Cambridge.',
    keyHighlights: [
      'Leading institution for computing and engineering research',
      'Need-blind admissions with demonstrated financial aid policy',
      'Strong legacy of entrepreneurial innovation and alumni ventures'
    ],
    contactInfo: {
      email: 'admissions@mit.edu',
      website: 'https://mit.edu'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },

  // 2. COLLEGES
  {
    id: 'city-col-1',
    name: 'Seneca Polytechnic (Newnham Campus)',
    category: 'College',
    subCategory: 'Applied Arts & Technology Institute',
    address: '1750 Finch Ave E, North York, ON M2J 2X5',
    locality: 'North York',
    city: 'Toronto',
    stateOrRegion: 'Ontario',
    country: 'Canada',
    coordinates: { lat: 43.7955, lng: -79.3496 },
    programs: [
      'Software Development Honours Bachelor Degree (BSD)',
      'Artificial Intelligence and Machine Learning Post-Grad',
      'Cloud Architecture & Cybersecurity Diploma'
    ],
    opportunities: [
      'Seneca Works Co-op Program with regional employer network',
      'Applied Research Innovation Fund (ARIF)',
      'University degree articulation transfer routes'
    ],
    matchScore: 88,
    matchTier: 'Safety',
    estimatedCost: {
      tuitionOrFee: '$18,400 CAD / yr',
      livingCost: '$1,350 CAD / mo',
      financialAid: 'International academic entrance merit scholarships ($2,000 - $5,000)'
    },
    nextAction: {
      label: 'Explore Accelerated Degree Transfer Tracks',
      actionType: 'explore',
      tabTarget: 'courses'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (Applied Career Route)',
      passportPrerequisite: 'High School Diploma with Grade 12 Math (Min 70%)',
      universityOrInstitution: 'Seneca Polytechnic (Faculty of Applied Science)',
      courseOrProgram: 'Honours Bachelor of Technology - Software Development',
      scholarshipMatch: 'Seneca International Academic Excellence Award',
      examRequirement: 'Duolingo English 115+ or IELTS 6.5',
      internshipLink: 'Seneca Helix Innovation Incubator Co-op',
      careerOutcome: 'Full-Stack Software Engineer & Applications Developer'
    },
    description: 'Canadian polytechnic delivering practical technical education, project collaborations, and pathway bridges to university programs.',
    keyHighlights: [
      'Industry-accredited software labs and applied computing curriculum',
      'Affordable tuition with integrated co-op work experience options',
      'Pathway options to Ontario universities'
    ],
    contactInfo: {
      email: 'international.info@senecapolytechnic.ca',
      website: 'https://senecapolytechnic.ca'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },
  {
    id: 'city-col-2',
    name: 'King\'s College London (Strand Campus)',
    category: 'College',
    subCategory: 'Constituent College of University of London',
    address: 'Strand, London WC2R 2LS',
    locality: 'Strand',
    city: 'London',
    stateOrRegion: 'Greater London',
    country: 'United Kingdom',
    coordinates: { lat: 51.5115, lng: -0.1160 },
    programs: [
      'BSc Computer Science with a Year in Industry',
      'BSc Artificial Intelligence',
      'MSc Data Science and Computational Intelligence'
    ],
    opportunities: [
      'Central London Tech sector internship placement options',
      'King\'s Global Health and Computing joint research projects',
      'Chevening and Commonwealth scholarship eligibility'
    ],
    matchScore: 91,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: '£31,260 / yr',
      livingCost: '£1,450 / mo',
      financialAid: 'King\'s International Scholar Award (£10,000)'
    },
    nextAction: {
      label: 'Review UCAS Application Deadlines',
      actionType: 'apply',
      tabTarget: 'deadlines'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (UK Candidate)',
      passportPrerequisite: 'IB 35+ with 6 in HL Math, Personal Statement',
      universityOrInstitution: 'King\'s College London (Faculty of Natural & Math Sciences)',
      courseOrProgram: 'BSc Computer Science (with Industrial Placement)',
      scholarshipMatch: 'King\'s Undergraduate International Scholarship',
      examRequirement: 'IELTS Academic 7.0 with no band below 6.5',
      internshipLink: 'London Tech Sector Student Placement',
      careerOutcome: 'Fintech Software Engineer & Algorithmic Developer'
    },
    description: 'Member of the UK Russell Group situated in central London, offering computing faculty and industry connections across London.',
    keyHighlights: [
      'Russell Group university in central London',
      'Location between Covent Garden and the River Thames',
      'Graduate Route post-study work authorization eligibility'
    ],
    contactInfo: {
      email: 'admissions.enquiries@kcl.ac.uk',
      website: 'https://kcl.ac.uk'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },

  // 3. LEARNING HUBS
  {
    id: 'city-hub-1',
    name: 'MaRS Discovery District & Vector Institute',
    category: 'Learning Hub',
    subCategory: 'Urban Innovation District & AI Accelerator',
    address: '661 University Ave, Toronto, ON M5G 1M1',
    locality: 'Downtown Toronto',
    city: 'Toronto',
    stateOrRegion: 'Ontario',
    country: 'Canada',
    coordinates: { lat: 43.6596, lng: -79.3897 },
    programs: [
      'Vector Institute Postgraduate Machine Learning Workshops',
      'MaRS Student Founder Incubator & Pitch Sessions',
      'DeepTech Venture Residency Program'
    ],
    opportunities: [
      'Networking with regional technology startups',
      'Vector AI Master\'s Scholarships ($17,500 CAD stipend)',
      'Research colloquiums with AI scientists'
    ],
    matchScore: 97,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Sponsored / Subsidized for affiliated students',
      livingCost: '$0 (Resource Center)',
      financialAid: 'Research grants and founder stipends up to $25,000'
    },
    nextAction: {
      label: 'Register for Next Colloquium on Foundation Models',
      actionType: 'book',
      tabTarget: 'opportunities'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (Student AI Innovator)',
      passportPrerequisite: 'Enrolled in Accredited STEM Bachelor, Linear Algebra & Python',
      universityOrInstitution: 'Vector Institute for Artificial Intelligence',
      courseOrProgram: 'Applied Deep Learning Practicum & Research Residency',
      scholarshipMatch: 'Vector Institute AI Study Award ($17,500)',
      examRequirement: 'Technical code assessment (Python/PyTorch)',
      internshipLink: 'Research Assistant at MaRS HealthTech Lab',
      careerOutcome: 'Machine Learning Engineer at Tech Venture'
    },
    description: 'Urban innovation hub connecting student developers, researchers, and early-stage companies in downtown Toronto.',
    keyHighlights: [
      'Co-located with Vector Institute and University of Toronto precinct',
      'Regular student hackathons and technology seminars',
      'Coworking space and mentorship access for university fellows'
    ],
    contactInfo: {
      email: 'community@marsdd.com',
      website: 'https://marsdd.com'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-hub-2',
    name: 'Cambridge Innovation Center (CIC Kendall)',
    category: 'Learning Hub',
    subCategory: 'Venture Incubation & Research Coworking',
    address: 'One Broadway, Cambridge, MA 02142',
    locality: 'Kendall Square',
    city: 'Cambridge',
    stateOrRegion: 'Massachusetts',
    country: 'United States',
    coordinates: { lat: 42.3619, lng: -71.0858 },
    programs: [
      'Venture Cafe Cambridge Thursday Gathering',
      'Kendall Square Student Entrepreneur Exchange',
      'Life Sciences & AI Collaborative Sprint'
    ],
    opportunities: [
      'Access to Cambridge technology startups',
      'Student mentor office hours with advisors',
      'Prototyping facilities and cloud resource access'
    ],
    matchScore: 90,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: 'Free entry for verified university student ID holders',
      livingCost: '$0 (Hub)',
      financialAid: 'Venture micro-grants up to $10,000 USD'
    },
    nextAction: {
      label: 'Book Student Office Hours at Venture Cafe',
      actionType: 'book',
      tabTarget: 'opportunities'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (Student Founder)',
      passportPrerequisite: 'Active University Student ID (CampusFlow Passport)',
      universityOrInstitution: 'CIC Kendall Square Ecosystem',
      courseOrProgram: 'Student Founder Masterclass & Pitch Series',
      scholarshipMatch: 'CIC Venture Student Seed Grant',
      examRequirement: 'None (Portfolio & Project Pitch)',
      internshipLink: 'Part-time Incubator Fellow with Kendall AI startup',
      careerOutcome: 'Tech Founder & Product Lead'
    },
    description: 'Kendall Square innovation facility providing students access to biotech ventures, software developers, and research networks.',
    keyHighlights: [
      'Adjacent to MIT campus and Cambridge Red Line transit',
      'Active community of ventures and research initiatives',
      'Weekly open gatherings bringing together regional technologists'
    ],
    contactInfo: {
      email: 'kendall@cic.com',
      website: 'https://cic.com'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },

  // 4. EXAM CENTERS
  {
    id: 'city-exam-1',
    name: 'Prometric Testing Center (Toronto Downtown)',
    category: 'Exam Center',
    subCategory: 'Official Standardized Testing Center',
    address: '2140 Yonge St, Suite 202, Toronto, ON M4S 2A7',
    locality: 'Midtown Toronto',
    city: 'Toronto',
    stateOrRegion: 'Ontario',
    country: 'Canada',
    coordinates: { lat: 43.7042, lng: -79.3980 },
    programs: [
      'GRE General Test (Computer-Delivered)',
      'TOEFL iBT Official Test',
      'USMLE & Professional Licensure Testing'
    ],
    opportunities: [
      'Official proctored testing with instant score preview',
      'Weekend test slots with wheelchair accessibility',
      'Direct score transmission to selected institutions'
    ],
    matchScore: 94,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: '$220 USD (GRE) / $245 USD (TOEFL iBT)',
      livingCost: '$0',
      financialAid: 'ETS Fee Reduction Certificate covers 50% for eligible students'
    },
    nextAction: {
      label: 'Reserve GRE / TOEFL Test Slot',
      actionType: 'register',
      tabTarget: 'exams'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Graduate Standardized Track)',
      passportPrerequisite: 'Valid Government Passport & National ID',
      universityOrInstitution: 'Prometric Standardized Testing Network',
      courseOrProgram: 'GRE Quantitative & Verbal Testing Session',
      scholarshipMatch: 'ETS Fee Reduction Certificate Eligibility',
      examRequirement: 'Target GRE Scores for Desired Program Benchmarks',
      internshipLink: 'Admissions Requirement for Graduate Programs',
      careerOutcome: 'Graduate Admissions Qualification for International Programs'
    },
    description: 'Certified testing facility offering climate-controlled soundproof testing stations, biometric identity verification, and proctored computer testing.',
    keyHighlights: [
      'Authorized testing facility for ETS and Prometric exams',
      'Located near Eglinton Subway Station',
      'Noise-reducing headsets and individual testing cubicles'
    ],
    contactInfo: {
      email: 'candidatecare@prometric.com',
      phone: '+1 (416) 488-8884',
      website: 'https://prometric.com'
    },
    isSaved: false,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-exam-2',
    name: 'Pearson VUE Professional Test Centre (Boston Financial)',
    category: 'Exam Center',
    subCategory: 'Pearson VUE Authorized Testing Center',
    address: '295 Devonshire St, 2nd Floor, Boston, MA 02110',
    locality: 'Financial District',
    city: 'Boston',
    stateOrRegion: 'Massachusetts',
    country: 'United States',
    coordinates: { lat: 42.3551, lng: -71.0560 },
    programs: [
      'GMAT Focus Edition (Business Admissions)',
      'AWS & Cloud Computing Certification Exams',
      'PTE Academic English Language Test'
    ],
    opportunities: [
      'Pearson VUE digital credential verification',
      'Unofficial test score summary at test completion',
      'Score transmission to designated academic institutions'
    ],
    matchScore: 89,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: '$275 USD (GMAT) / $215 USD (PTE Academic)',
      livingCost: '$0',
      financialAid: 'University voucher discount codes accepted where applicable'
    },
    nextAction: {
      label: 'Schedule GMAT Focus Test Date',
      actionType: 'register',
      tabTarget: 'exams'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (Tech Management Track)',
      passportPrerequisite: 'Unexpired International Passport',
      universityOrInstitution: 'Pearson VUE Authorized Testing Infrastructure',
      courseOrProgram: 'GMAT Focus Exam & Cloud Certification',
      scholarshipMatch: 'Exam Voucher Eligibility',
      examRequirement: 'Target Program Score Requirements',
      internshipLink: 'Academic Qualification for Graduate Study',
      careerOutcome: 'Technical Product Management & Systems Leadership'
    },
    description: 'Testing centre equipped with biometric verification, test administrators, and dedicated testing stations.',
    keyHighlights: [
      'Central Boston location with direct access to South Station',
      'Open multiple days per week including early morning sessions',
      'Score reporting to participating graduate business programs'
    ],
    contactInfo: {
      email: 'pvamericascustomerservice@pearson.com',
      phone: '+1 (617) 482-1080',
      website: 'https://pearsonvue.com'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },

  // 5. MENTORS
  {
    id: 'city-mentor-1',
    name: 'Dr. Aris Thorne (Vector Institute Senior Fellow)',
    category: 'Mentor',
    subCategory: 'Computer Science Faculty & AI Admissions Advisor',
    address: '661 University Ave (Vector Institute), Toronto, ON M5G 1M1',
    locality: 'Downtown Toronto',
    city: 'Toronto',
    stateOrRegion: 'Ontario',
    country: 'Canada',
    coordinates: { lat: 43.6588, lng: -79.3905 },
    programs: [
      '1-on-1 Graduate & Undergraduate Admissions Review',
      'Statement of Purpose (SOP) Technical Thesis Critiques',
      'Research Proposal & Machine Learning Portfolio Guidance'
    ],
    opportunities: [
      'Mentorship sessions on admissions planning and portfolio',
      'Academic project advice and faculty alignment',
      'Referral to research seminars and reading groups'
    ],
    matchScore: 98,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Free (Sponsored by CampusFlow Student Mentorship Initiative)',
      livingCost: '$0',
      financialAid: 'Complimentary civic education mentoring'
    },
    nextAction: {
      label: 'Request 30-Min SOP Review Session',
      actionType: 'book',
      tabTarget: 'documents'
    },
    opportunityNetwork: {
      studentRole: 'Candidate Maya Sharma (Mentee)',
      passportPrerequisite: 'Draft SOP, Current GPA Transcript, Target University List',
      universityOrInstitution: 'CampusFlow Civic Mentorship Network (U of T & Vector)',
      courseOrProgram: 'Admissions Strategy & Research Portfolio Mentorship',
      scholarshipMatch: 'Mentorship on major fellowship essays',
      examRequirement: 'Completed English Proficiency (Band 8 achieved)',
      internshipLink: 'Guidance on research laboratory applications',
      careerOutcome: 'Admissions Preparation for Ph.D. or Research Master\'s Programs'
    },
    description: 'Former university admissions reader and research scientist specializing in multimodal neural architectures and student academic mentoring.',
    keyHighlights: [
      'Extensive experience advising applicants to competitive computer science programs',
      'Specialized in aligning student projects with research proposals',
      'Active mentor in academic advising networks'
    ],
    contactInfo: {
      email: 'mentor.thorne@campusflow.org',
      website: 'https://campusflow.city/mentors/thorne'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-mentor-2',
    name: 'Elena Rostova (MIT CSAIL Alum & Fellow)',
    category: 'Mentor',
    subCategory: 'Tech Industry Mentor & Admissions Coach',
    address: '32 Vassar St, Stata Center, Cambridge, MA 02139',
    locality: 'Cambridge / Stata Center',
    city: 'Cambridge',
    stateOrRegion: 'Massachusetts',
    country: 'United States',
    coordinates: { lat: 42.3616, lng: -71.0906 },
    programs: [
      'Undergraduate STEM Portfolio Preparation',
      'Technical Interview Practice (Data Structures & System Design)',
      'International Student Study & Application Guidance'
    ],
    opportunities: [
      'Access to Cambridge tech community networks',
      'Mock interview practice for technology fellowships',
      'Peer review cohort with international STEM applicants'
    ],
    matchScore: 93,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: 'Free for verified students on CampusFlow',
      livingCost: '$0',
      financialAid: 'Pro bono civic advising supported by tech alumni'
    },
    nextAction: {
      label: 'Book Technical Mock Interview',
      actionType: 'book',
      tabTarget: 'advisor'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (Engineering Mentee)',
      passportPrerequisite: 'Verified GitHub Project Portfolio, Resume Draft',
      universityOrInstitution: 'CSAIL Alumni Mentorship Circle',
      courseOrProgram: 'Technical Portfolio & Interview Mastery Series',
      scholarshipMatch: 'Guidance for fellowship and scholarship applications',
      examRequirement: 'SAT Math 750+ / AP Calculus BC',
      internshipLink: 'Preparation for Software Engineering Internships',
      careerOutcome: 'Software Engineering Internship Placement Candidate'
    },
    description: 'AI Engineer and computer science alumna passionate about guiding students and international scholars into competitive STEM pathways.',
    keyHighlights: [
      'Over 6 years coaching high school and college students in computing',
      'Author of student technical preparation and application materials',
      'Positive feedback across past student cohorts'
    ],
    contactInfo: {
      email: 'elena.rostova@campusflow.org',
      website: 'https://campusflow.city/mentors/elena'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  },

  // 6. INTERNSHIPS
  {
    id: 'city-intern-1',
    name: 'Vector Institute Undergraduate Research Residency',
    category: 'Internship',
    subCategory: 'Applied Artificial Intelligence Research Term',
    address: '661 University Ave, Suite 710, Toronto, ON M5G 1M1',
    locality: 'Downtown Toronto',
    city: 'Toronto',
    stateOrRegion: 'Ontario',
    country: 'Canada',
    coordinates: { lat: 43.6601, lng: -79.3900 },
    programs: [
      'Summer Research Associate in Machine Learning',
      'Natural Language Processing & Generative AI Lab Placement',
      'Opportunities for student paper submissions'
    ],
    opportunities: [
      'Academic stipend for 16-week summer term',
      'Access to high-performance GPU cluster resources',
      'Mentorship with academic research chairs'
    ],
    matchScore: 97,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Stipend-supported Research Term',
      livingCost: 'Offset by research stipend',
      financialAid: 'Travel allowance for eligible out-of-province / international students'
    },
    nextAction: {
      label: 'Submit Research Resume & Transcript',
      actionType: 'apply',
      tabTarget: 'documents'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (Research Fellow)',
      passportPrerequisite: 'Transcript with solid academic standing in Math & CS',
      universityOrInstitution: 'Vector Institute for AI',
      courseOrProgram: '16-Week Applied Machine Learning Residency',
      scholarshipMatch: 'Vector Undergraduate Research Stipend',
      examRequirement: 'Demonstrated PyTorch/Python coding sample',
      internshipLink: 'Academic research experience and lab mentoring',
      careerOutcome: 'Computational Research Associate & Systems Developer'
    },
    description: 'Canadian research residency for undergraduates. Fellows work alongside faculty on AI algorithms, ethics, and computational applications.',
    keyHighlights: [
      'Prominent AI research facility in North America',
      'Strong student publication opportunities at major conferences',
      'Access to computational datasets and collaborative project labs'
    ],
    contactInfo: {
      email: 'internships@vectorinstitute.ai',
      website: 'https://vectorinstitute.ai'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-intern-2',
    name: 'RBC Borealis AI Software & ML Co-op',
    category: 'Internship',
    subCategory: 'Financial Technology AI Research Laboratory',
    address: '88 Queens Quay W, Toronto, ON M5J 0B8',
    locality: 'Toronto Waterfront',
    city: 'Toronto',
    stateOrRegion: 'Ontario',
    country: 'Canada',
    coordinates: { lat: 43.6425, lng: -79.3789 },
    programs: [
      'PEY Co-op Software Engineer (12-16 month placement)',
      'Quantitative Machine Learning Summer Internship',
      'Privacy & Secure Multi-Party Computation Team'
    ],
    opportunities: [
      'Competitive compensation package',
      'Hybrid work model with waterfront office location',
      'Opportunities for full-time career consideration for graduating seniors'
    ],
    matchScore: 94,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Paid Industry Employment',
      livingCost: 'Offset by monthly compensation',
      financialAid: 'Health benefits and corporate wellness coverage'
    },
    nextAction: {
      label: 'Link PEY Co-op Candidate Profile',
      actionType: 'apply',
      tabTarget: 'opportunities'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (Co-op Candidate)',
      passportPrerequisite: 'Enrolled in Computer Science or Engineering program',
      universityOrInstitution: 'RBC Borealis AI Labs (Toronto Waterfront)',
      courseOrProgram: 'Machine Learning Systems & Enterprise AI Co-op',
      scholarshipMatch: 'RBC Future Launch Scholarship Program',
      examRequirement: 'Technical coding screening (Algorithms & Data Structures)',
      internshipLink: '12-Month Professional Experience Year (PEY)',
      careerOutcome: 'Machine Learning Engineer & Systems Developer'
    },
    description: 'Industrial AI research institute combining scientific inquiry with scalable financial engineering and privacy technologies.',
    keyHighlights: [
      'Led by industry research scientists in machine learning',
      'Integration with university co-op placement offices',
      'Student cohort hack days, learning sessions, and patent workshops'
    ],
    contactInfo: {
      email: 'careers@borealisai.com',
      website: 'https://borealisai.com'
    },
    isSaved: false,
    inJourney: true,
    isPrototypeData: true
  },

  // 7. EDUCATION OPPORTUNITIES
  {
    id: 'city-opp-1',
    name: 'Mitacs Globalink Research Internship',
    category: 'Opportunity',
    subCategory: 'Funded International Summer Research Exchange',
    address: '401 Bay St, Suite 1600, Toronto, ON M5H 2Y4',
    locality: 'Downtown Toronto',
    city: 'Toronto',
    stateOrRegion: 'Ontario',
    country: 'Canada',
    coordinates: { lat: 43.6521, lng: -79.3812 },
    programs: [
      '12-Week Competitive Research Project with Canadian Faculty',
      'Professional Development & Scientific Writing Workshops',
      'Globalink Graduate Fellowship Eligibility'
    ],
    opportunities: [
      'Funded travel, housing support, and living stipend',
      'Mentorship from Canadian university faculty and graduate students',
      'Eligibility support for Canadian provincial graduate pathways'
    ],
    matchScore: 95,
    matchTier: 'Strong Match',
    estimatedCost: {
      tuitionOrFee: 'Funded Program ($0 Tuition Cost to Student)',
      livingCost: 'Stipend and accommodation support provided',
      financialAid: 'Grant covering flights, visa fees, and health insurance'
    },
    nextAction: {
      label: 'Check Application Window & Eligibility',
      actionType: 'explore',
      tabTarget: 'scholarships'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (Globalink Scholar)',
      passportPrerequisite: 'Completed min 1-2 years of undergraduate study, strong GPA',
      universityOrInstitution: 'Mitacs & Participating Canadian Universities',
      courseOrProgram: 'International Research Exchange Fellowship',
      scholarshipMatch: 'Mitacs Globalink Award',
      examRequirement: 'Language proficiency verification where required',
      internshipLink: '12-Week Faculty Supervised Research Project',
      careerOutcome: 'International Academic Research & Graduate Study Pathway'
    },
    description: 'Canadian initiative connecting international undergraduate students with faculty mentors across Canada for a 12-week summer research internship.',
    keyHighlights: [
      'Supported by Government of Canada and participating academic institutions',
      'Alumni are eligible for competitive fellowship consideration for Canadian Master\'s degrees',
      'Available across multiple disciplines with strong participation in STEM'
    ],
    contactInfo: {
      email: 'globalink@mitacs.ca',
      website: 'https://mitacs.ca'
    },
    isSaved: true,
    inJourney: true,
    isPrototypeData: true
  },
  {
    id: 'city-opp-2',
    name: 'Harvard & MIT Summer Research Colloquium on AI Governance',
    category: 'Opportunity',
    subCategory: 'Academic Symposium & Youth Policy Fellowship',
    address: 'Harvard Yard, Cambridge, MA 02138',
    locality: 'Harvard Yard',
    city: 'Cambridge',
    stateOrRegion: 'Massachusetts',
    country: 'United States',
    coordinates: { lat: 42.3744, lng: -71.1169 },
    programs: [
      'Undergraduate AI Policy & Safety Intensive',
      'Global Ethics in Autonomous Systems Working Group',
      'Policy Paper Showcase'
    ],
    opportunities: [
      'Travel bursaries for eligible international students',
      'Keynote addresses from researchers in tech and public policy',
      'Certificate of Academic Participation'
    ],
    matchScore: 91,
    matchTier: 'Good Match',
    estimatedCost: {
      tuitionOrFee: 'Free (Selected Applicants)',
      livingCost: 'Accommodation options provided during symposium',
      financialAid: 'Travel grants available based on merit and application review'
    },
    nextAction: {
      label: 'Submit 500-Word Statement of Interest',
      actionType: 'explore',
      tabTarget: 'documents'
    },
    opportunityNetwork: {
      studentRole: 'Maya Sharma (Policy & Ethics Fellow)',
      passportPrerequisite: 'Coursework in Computer Science, Philosophy, or Social Sciences',
      universityOrInstitution: 'Berkman Klein Center for Internet & Society',
      courseOrProgram: 'AI Governance & Safety Summer Fellowship',
      scholarshipMatch: 'Youth Travel Grant Consideration',
      examRequirement: 'Writing sample evaluation',
      internshipLink: 'Summer Policy Research Fellow with Academic Labs',
      careerOutcome: 'AI Policy Analyst & Research Specialist'
    },
    description: 'Academic symposium bringing together undergraduate scholars to explore the ethical governance, technical safeguards, and public policy implications of artificial intelligence.',
    keyHighlights: [
      'Held across Harvard Yard and MIT academic facilities',
      'Connects student developers with international policy researchers',
      'Participants discuss research findings with academic advisors'
    ],
    contactInfo: {
      email: 'aigov@harvard.edu',
      website: 'https://cyber.harvard.edu'
    },
    isSaved: false,
    inJourney: false,
    isPrototypeData: true
  }
];
