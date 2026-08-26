import {
  Profile,
  Experience,
  Education,
  Skill,
  Project,
  Certification,
  Achievement,
  Referee,
  DocumentRecord
} from '../types';

export const initialProfile: Profile = {
  id: 'profile-main',
  name: 'Jevance Ochieng',
  professional_title: 'Data Analyst | Data Entry | Business Intelligence',
  email: 'jevance.ochieng@gmail.com',
  phone: '+254 700 000 000',
  location: 'Nairobi, Kenya / Remote',
  linkedin: 'https://linkedin.com/in/jevance-ochieng',
  github: 'https://github.com/jevanceochieng',
  website: 'https://jevanceochieng.dev',
  profile_image: 'https://i.ibb.co/MkBQjqZT/Whats-App-Image-2026-08-26-at-12-41-07.jpg',
  career_summary: 'Detail-oriented and results-driven Data Analyst & Business Intelligence Specialist with a strong foundation in transforming raw, unstructured datasets into actionable executive insights. Proficient in advanced SQL querying, relational database design (PostgreSQL), Power BI dashboard development, and meticulous automated data entry workflows in Microsoft Excel & Google Sheets. Passionate about driving data-informed business efficiency and eliminating data discrepancies.',
  years_of_experience: 3,
  areas_of_expertise: [
    'Data Cleaning & Transformation',
    'SQL Querying & PostgreSQL',
    'Business Intelligence & KPI Dashboards',
    'Microsoft Excel & Advanced Modeling',
    'Data Entry & Quality Assurance',
    'ETL Pipeline Automation'
  ],
  hero_tagline: 'Transforming complex, raw data into high-impact visual narratives, accurate reports, and strategic business intelligence.',
  status_badge: 'Available for Full-time & Contract Roles',
  open_for_work: true,
  updated_at: new Date().toISOString()
};

export const initialExperience: Experience[] = [
  {
    id: 'exp-1',
    company: 'FinTrack Analytics Solutions',
    position: 'Data Analyst',
    location: 'Nairobi / Hybrid',
    start_date: '2026-01',
    end_date: 'Present',
    is_current: true,
    description: 'Lead analyst responsible for designing executive Power BI dashboards, formulating complex SQL analytical queries, and optimizing weekly revenue reconciliation models.',
    responsibilities: [
      'Engineered structured PostgreSQL data queries to aggregate and analyze customer transaction trends across 250,000+ monthly records.',
      'Developed 8 interactive Power BI reporting dashboards utilized by senior leadership for daily KPI tracking and churn forecasting.',
      'Automated weekly ETL reconciliation workflows, cutting manual spreadsheet processing time by 45%.'
    ],
    achievements: [
      'Identified revenue leakage patterns resulting in a 12% boost in quarterly operational cost savings.',
      'Designed a standardized data cleaning pipeline that decreased validation errors by 35%.'
    ],
    technologies: ['PostgreSQL', 'Power BI', 'Advanced Excel', 'pgAdmin', 'SQL'],
    order_index: 1
  },
  {
    id: 'exp-2',
    company: 'Apex Logistics & Retail Group',
    position: 'Data Entry & Junior Analyst',
    location: 'Nairobi, Kenya',
    start_date: '2024-03',
    end_date: '2025-12',
    is_current: false,
    description: 'Managed high-volume inventory database updates, verified invoice data integrity, and produced weekly sales variance reports for regional warehouse operations.',
    responsibilities: [
      'Maintained 99.8% data entry accuracy across 50,000+ SKU inventory and purchase records.',
      'Built dynamic Excel financial models incorporating XLOOKUP, INDEX/MATCH, nested IFs, and Pivot Tables for real-time inventory tracking.',
      'Audited discrepancy logs and collaborated with supply chain teams to resolve stock mismatching.'
    ],
    achievements: [
      'Recognized for exceptional precision and awarded Employee of the Quarter (Q3 2025).',
      'Automated daily purchase order data ingestion using Google Sheets Apps Script and Power Query.'
    ],
    technologies: ['Microsoft Excel', 'Google Sheets', 'SQL', 'DBeaver', 'Data Cleaning'],
    order_index: 2
  }
];

export const initialSkills: Skill[] = [
  // Spreadsheets & Reporting
  { id: 'sk-1', name: 'Microsoft Excel (Advanced)', category: 'Spreadsheets & Reporting', proficiency: 'Expert', is_featured: true, order_index: 1 },
  { id: 'sk-2', name: 'Google Sheets & Macros', category: 'Spreadsheets & Reporting', proficiency: 'Expert', is_featured: true, order_index: 2 },
  { id: 'sk-3', name: 'Pivot Tables & Power Query', category: 'Spreadsheets & Reporting', proficiency: 'Expert', is_featured: true, order_index: 3 },

  // Database & SQL
  { id: 'sk-4', name: 'SQL (Structured Query Language)', category: 'Database & SQL', proficiency: 'Expert', is_featured: true, order_index: 4 },
  { id: 'sk-5', name: 'PostgreSQL', category: 'Database & SQL', proficiency: 'Advanced', is_featured: true, order_index: 5 },
  { id: 'sk-6', name: 'Relational Database Design', category: 'Database & SQL', proficiency: 'Advanced', is_featured: false, order_index: 6 },

  // Business Intelligence
  { id: 'sk-7', name: 'Power BI', category: 'Business Intelligence', proficiency: 'Advanced', is_featured: true, order_index: 7 },
  { id: 'sk-8', name: 'DAX & Data Modeling', category: 'Business Intelligence', proficiency: 'Intermediate', is_featured: false, order_index: 8 },
  { id: 'sk-9', name: 'KPI & Executive Dashboards', category: 'Business Intelligence', proficiency: 'Expert', is_featured: true, order_index: 9 },

  // Data Analysis
  { id: 'sk-10', name: 'Data Cleaning & Validation', category: 'Data Analysis', proficiency: 'Expert', is_featured: true, order_index: 10 },
  { id: 'sk-11', name: 'Exploratory Data Analysis (EDA)', category: 'Data Analysis', proficiency: 'Advanced', is_featured: true, order_index: 11 },
  { id: 'sk-12', name: 'Descriptive Statistics & Trend Analysis', category: 'Data Analysis', proficiency: 'Advanced', is_featured: false, order_index: 12 },

  // Tools & Workflows
  { id: 'sk-13', name: 'pgAdmin & DBeaver', category: 'Tools & Workflows', proficiency: 'Advanced', is_featured: true, order_index: 13 },
  { id: 'sk-14', name: 'Jupyter Notebooks', category: 'Tools & Workflows', proficiency: 'Intermediate', is_featured: false, order_index: 14 },
  { id: 'sk-15', name: 'High-Speed Precision Data Entry', category: 'Tools & Workflows', proficiency: 'Expert', is_featured: true, order_index: 15 }
];

export const initialEducation: Education[] = [
  {
    id: 'edu-1',
    institution: 'University of Nairobi',
    qualification: 'Bachelor of Science',
    field_of_study: 'Business Information Technology / Computer Science',
    grade_or_honors: 'Second Class Honours (Upper Division)',
    location: 'Nairobi, Kenya',
    start_date: '2020-09',
    end_date: '2024-07',
    is_current: false,
    description: 'Comprehensive coursework focused on Database Systems, Information Systems Management, Business Statistics, and Data Management.',
    order_index: 1
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Executive Sales & Churn Analytics Dashboard',
    description: 'Interactive Power BI reporting suite analyzing multi-channel revenue, customer retention rates, and branch performance metrics.',
    long_description: 'Constructed an end-to-end business intelligence pipeline connecting relational sales databases to dynamic Power BI visualizations. Formulated custom DAX measures for Year-over-Year (YoY) revenue growth, cohort retention analysis, and product profitability rankings.',
    technologies: ['Power BI', 'DAX', 'SQL', 'PostgreSQL', 'Data Modeling'],
    category: 'BI Dashboard',
    github_url: 'https://github.com/jevanceochieng/powerbi-sales-churn-dashboard',
    live_url: 'https://app.powerbi.com/view?r=eyJrIjoiZGVtbyIsImMiOjEwfQ',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    metrics: '+18% Sales Visibility | 250k+ Data Points Processed',
    date: '2026-02',
    is_featured: true,
    order_index: 1
  },
  {
    id: 'proj-2',
    title: 'Retail Inventory & Stock Discrepancy Optimizer',
    description: 'PostgreSQL & SQL query repository engineered to detect warehouse stock mismatches and track supplier lead times.',
    long_description: 'Designed relational schemas and complex SQL stored queries to reconcile physical inventory counts against digital point-of-sale logs, preventing stockouts and highlighting overdue supplier deliveries.',
    technologies: ['PostgreSQL', 'SQL', 'pgAdmin', 'DBeaver', 'Relational Schemas'],
    category: 'Database Design',
    github_url: 'https://github.com/jevanceochieng/retail-inventory-sql-analysis',
    image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    metrics: '99.8% Inventory Integrity | 35% Discrepancy Reduction',
    date: '2025-10',
    is_featured: true,
    order_index: 2
  },
  {
    id: 'proj-3',
    title: 'Automated Financial Reconciliation & Modeling Tool',
    description: 'Advanced Microsoft Excel workbook featuring automated Power Query ETL pipelines and error-checking reconciliation logic.',
    long_description: 'Developed an automated Excel workbook for multi-currency bank account and vendor invoice reconciliation. Features dynamic pivot dashboards, macro buttons, and automated mismatch alerts.',
    technologies: ['Microsoft Excel', 'Power Query', 'VBA/Macros', 'Google Sheets'],
    category: 'Spreadsheets & Reporting',
    github_url: 'https://github.com/jevanceochieng/excel-financial-reconciliation-tool',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    metrics: '45% Faster Monthly Close | Zero Formula Errors',
    date: '2025-06',
    is_featured: true,
    order_index: 3
  }
];

export const initialCertifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'Microsoft Certified: Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    date: '2025-11',
    credential_id: 'PL-300-DK-89421',
    credential_url: 'https://learn.microsoft.com/credentials/certifications',
    order_index: 1
  },
  {
    id: 'cert-2',
    name: 'Google Data Analytics Professional Certificate',
    issuer: 'Google (Coursera)',
    date: '2024-08',
    credential_id: 'COURSERA-GDA-49102',
    credential_url: 'https://coursera.org/verify/professional-cert/google-data-analytics',
    order_index: 2
  },
  {
    id: 'cert-3',
    name: 'Advanced SQL for Relational Databases & Analytics',
    issuer: 'Udemy / 365 Data Science',
    date: '2024-05',
    credential_id: 'UC-984210984',
    order_index: 3
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Employee of the Quarter (Precision & Integrity)',
    description: 'Awarded for maintaining 99.8% data entry and reconciliation accuracy across 50,000+ sensitive operational records at Apex Logistics.',
    issuer_or_org: 'Apex Logistics & Retail Group',
    date: '2025-09',
    order_index: 1
  },
  {
    id: 'ach-2',
    title: 'Top 5 Finalist - National BI Dashboard Hackathon',
    description: 'Constructed an innovative public health resource utilization dashboard in under 48 hours using PostgreSQL and Power BI.',
    issuer_or_org: 'Kenya Tech & Analytics Community',
    date: '2024-11',
    order_index: 2
  }
];

export const initialReferees: Referee[] = [
  {
    id: 'ref-1',
    name: 'Sarah Mwangi',
    position: 'Lead Data Analytics Manager',
    company: 'FinTrack Analytics Solutions',
    email: 'sarah.mwangi@fintrackanalytics.example.com',
    phone: '+254 711 234 567',
    relationship: 'Direct Supervisor & Department Head',
    is_public: true,
    order_index: 1
  },
  {
    id: 'ref-2',
    name: 'James Ochieng',
    position: 'Operations & Database Administrator',
    company: 'Apex Logistics & Retail Group',
    email: 'j.ochieng@apexlogistics.example.com',
    phone: '+254 722 987 654',
    relationship: 'Senior Colleague & Project Lead',
    is_public: true,
    order_index: 2
  },
  {
    id: 'ref-3',
    name: 'Dr. Joseph Karanja',
    position: 'Senior Lecturer, School of Computing',
    company: 'University of Nairobi',
    email: 'jkaranja@uonbi.ac.ke',
    phone: '+254 733 112 233',
    relationship: 'Academic Advisor & Thesis Mentor',
    is_public: true, // Hidden by default, test public toggle
    order_index: 3
  }
];

export const initialDocument: DocumentRecord = {
  id: 'doc-cv-active',
  name: 'Jevance Ochieng - Official Data Analyst CV.pdf',
  file_name: 'Jevance_Ochieng_Data_Analyst_CV_2026.pdf',
  file_url: '#',
  file_size: '245 KB',
  file_type: 'application/pdf',
  uploaded_at: '2026-08-15T10:30:00Z',
  is_active: true
};
