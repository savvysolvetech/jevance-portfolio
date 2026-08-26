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
  name: 'Jevance Ochieng Osano',
  professional_title:
    'Environmental Planning & Management | EHS/HSSE | Waste & Recycling Operations',
  email: 'jevanceochieng@gmail.com',
  phone: '+254 717045299 / +254735996346',
  location: 'Kenya',
  linkedin: '',
  github: '',
  website: '',
  profile_image:
    'https://i.ibb.co/MkBQjqZT/Whats-App-Image-2026-08-26-at-12-41-07.jpg',
  career_summary:
    'Environmental Planning and Management professional with experience in EHS/HSSE management, waste and recycling operations, environmental compliance, research, team supervision, and operational coordination. Experienced in managing health, safety, security, and environmental requirements across multiple facilities, supporting environmental and occupational safety audits, coordinating waste collection services, developing databases, and leading material recovery facility operations.',
  years_of_experience: 7,
  areas_of_expertise: [
    'Environmental, Health & Safety (EHS/HSSE) Management',
    'Waste & Recycling Operations Management',
    'Environmental Policy & Compliance',
    'Risk Assessment & Safety Audits',
    'Environmental Impact Assessment & Audit',
    'Supervisory Leadership & Team Coordination'
  ],
  hero_tagline:
    'Driving safe, compliant, and efficient environmental and waste management operations through strong leadership, data, and continuous improvement.',
  status_badge: 'Available for Full-time & Contract Roles',
  open_for_work: true,
  updated_at: new Date().toISOString()
};

export const initialExperience: Experience[] = [
  {
    id: 'exp-1',
    company: 'Takataka Solutions Limited',
    position: 'Operations Team Leader, Material Recovery Facility',
    location: 'Kenya',
    start_date: '2026-04',
    end_date: 'Present',
    is_current: true,
    description:
      'Leads material recovery facility operations with responsibility for team supervision, operational efficiency, safety compliance, performance management, and health and safety coordination.',
    responsibilities: [
      'Supervise, mentor, and coach staff on material sorting procedures.',
      'Ensure operational targets are met while maintaining high-quality throughput.',
      'Enforce safety protocols and proper use of personal protective equipment (PPE).',
      'Manage and monitor staff performance.',
      'Serve as a member of the Health and Safety Committee.'
    ],
    achievements: [],
    technologies: [
      'Waste Management',
      'Material Recovery',
      'PPE & Safety',
      'Team Leadership',
      'EHS'
    ],
    order_index: 1
  },
  {
    id: 'exp-2',
    company: 'M-taka Waste Solutions Limited',
    position: 'Facility Supervisor, Maendeleo Material Recovery Facility',
    location: 'Kenya',
    start_date: '2025-07',
    end_date: '2026-04',
    is_current: false,
    description:
      'Supervised material recovery facility operations, supported health and safety initiatives, maintained processing equipment, and assisted with operational accounting and reporting.',
    responsibilities: [
      'Supervised daily material recovery facility operations.',
      'Designed an HSE database for the material recovery facility.',
      'Coordinated staff vaccinations and deworming activities.',
      'Standardised personal protective equipment requirements.',
      'Maintained equipment including the plastic shredder and baling machine.',
      'Assisted with basic accounting tasks including daily records, stock valuation, and expense reporting.'
    ],
    achievements: [
      'Designed an HSE database for the MRF.',
      'Coordinated staff vaccinations and deworming.',
      'Standardised personal protective equipment.',
      'Maintained the plastic shredder and baling machine.'
    ],
    technologies: [
      'HSE Management',
      'Waste & Recycling',
      'M-taka',
      'Microsoft Excel',
      'Database Management',
      'Equipment Maintenance'
    ],
    order_index: 2
  },
  {
    id: 'exp-3',
    company: 'Sanergy Limited (Regen Organics)',
    position: 'Health, Safety, Security, and Environment Associate',
    location: 'Kenya',
    start_date: '2024-11',
    end_date: '2025-05',
    is_current: false,
    description:
      'Supported environmental, occupational health and safety, security, and waste management activities while coordinating compliance and operational initiatives.',
    responsibilities: [
      'Coordinated environmental, health, safety, and security activities.',
      'Coordinated waste collection services.',
      'Supported environmental and occupational safety audit processes.',
      'Coordinated staff deworming activities.',
      'Supported occupational safety and environmental compliance.'
    ],
    achievements: [
      'Reduced the cost of the annual environmental audit by 40%.',
      'Reduced the cost of Occupational Safety and Health audits by 16.7%.',
      'Reduced the cost of stack emission measurement by 7.5%.',
      'Successfully registered one site on the Directorate of Occupational Safety and Health (DOSH) portal.',
      'Effectively coordinated waste collection services.',
      'Coordinated staff deworming in two consecutive quarters.'
    ],
    technologies: [
      'EHS',
      'HSSE',
      'DOSH',
      'Environmental Auditing',
      'OSH Auditing',
      'Waste Management'
    ],
    order_index: 3
  },
  {
    id: 'exp-4',
    company: 'Sanergy Limited (Regen Organics)',
    position: 'Health, Safety, Security, and Environment Fellow',
    location: 'Kenya',
    start_date: '2024-10',
    end_date: '2024-11',
    is_current: false,
    description:
      'Supported Environment, Health and Safety activities across four facilities in Kenya, including security coordination and facility-level EHS management.',
    responsibilities: [
      'Managed Environment, Health, and Safety activities across four facilities in Kenya.',
      'Coordinated security activities across four facilities.',
      'Supported facility-level EHS compliance and operations.'
    ],
    achievements: [
      'Successfully managed EHS across four facilities in Kenya.',
      'Promoted to Health, Safety, Security, and Environment Associate after one month of fellowship.',
      'Coordinated security across four facilities in Kenya.'
    ],
    technologies: [
      'EHS',
      'HSSE',
      'Security Management',
      'Environmental Compliance'
    ],
    order_index: 4
  },
  {
    id: 'exp-5',
    company: 'Kenya Forestry Research Institute',
    position: 'Research Scientist Intern',
    location: 'Lake Victoria Eco-Region Research Programme, Kenya',
    start_date: '2022-02',
    end_date: '2023-02',
    is_current: false,
    description:
      'Conducted forestry and plant research involving progeny trials, seed germination, field data collection, experimental design, and plant propagation studies.',
    responsibilities: [
      'Assessed progeny trials of Eucalyptus urophylla and Gmelina arborea under the CAMCORE project.',
      'Performed seed germination tests for various indigenous tree species.',
      'Collected data on Osyris lanceolata (African sandalwood) from different locations.',
      'Designed and established experiments to determine the longevity of Salicylic acid against Cuscuta spp. on host plants.',
      'Participated in research evaluating different propagation methods for Ximenia americana.'
    ],
    achievements: [],
    technologies: [
      'Research',
      'Experimental Design',
      'Data Collection',
      'Seed Germination',
      'Plant Propagation',
      'Forestry Research'
    ],
    order_index: 5
  },
  {
    id: 'exp-6',
    company: 'Kenya Red Cross Society',
    position: 'Youth Committee Member',
    location: 'Kenya',
    start_date: '2019-09',
    end_date: '2022-01',
    is_current: false,
    description:
      'Participated in humanitarian, community outreach, fundraising, school-based youth initiatives, and public health activities.',
    responsibilities: [
      'Participated in humanitarian fundraising and community outreach activities.',
      'Supported COVID-19 screening activities along the Migori-Isebania Highway.',
      'Supported youth and community initiatives.'
    ],
    achievements: [
      'Participated in three Humanity Power Walk events aimed at raising funds.',
      'Established Junior Red Cross Movements in two schools.',
      'Screened random passengers along the Migori-Isebania Highway for COVID-19.'
    ],
    technologies: [
      'Community Outreach',
      'Humanitarian Operations',
      'Public Health',
      'Team Coordination'
    ],
    order_index: 6
  },
  {
    id: 'exp-7',
    company: 'Migori County Government',
    position: 'Field Attachment and Planning Practice',
    location: 'Migori County, Kenya',
    start_date: '2019-05',
    end_date: '2019-08',
    is_current: false,
    description:
      'Completed field attachment and planning practice within the Department of Environment, Natural Resources, and Disaster Management.',
    responsibilities: [
      'Supported environmental planning and natural resource management activities.',
      'Assisted with environmental event planning.',
      'Reviewed Environmental Impact Assessment and Audit reports.',
      'Supported tree seedling distribution initiatives.'
    ],
    achievements: [
      'Distributed over 5,000 tree seedlings to Technical and Vocational Training Institutions within Migori County.',
      'Assisted in planning the 2019 World Environment Day event held at Sony Sugar Green Stadium.',
      'Reviewed eight Environmental Impact Assessment and Audit reports.'
    ],
    technologies: [
      'Environmental Planning',
      'EIA',
      'Environmental Auditing',
      'Natural Resource Management'
    ],
    order_index: 7
  }
];

export const initialSkills: Skill[] = [
  // Environmental, Health & Safety
  {
    id: 'sk-1',
    name: 'Environmental, Health & Safety (EHS/HSSE) Management',
    category: 'EHS & Compliance',
    proficiency: 'Expert',
    is_featured: true,
    order_index: 1
  },
  {
    id: 'sk-2',
    name: 'Risk Assessment & Safety Audits',
    category: 'EHS & Compliance',
    proficiency: 'Advanced',
    is_featured: true,
    order_index: 2
  },
  {
    id: 'sk-3',
    name: 'Environmental Policy & Compliance Management',
    category: 'EHS & Compliance',
    proficiency: 'Advanced',
    is_featured: true,
    order_index: 3
  },
  {
    id: 'sk-4',
    name: 'Environmental Impact Assessment & Audit',
    category: 'EHS & Compliance',
    proficiency: 'Advanced',
    is_featured: true,
    order_index: 4
  },

  // Waste & Operations
  {
    id: 'sk-5',
    name: 'Waste & Recycling Operations Management',
    category: 'Waste Management',
    proficiency: 'Expert',
    is_featured: true,
    order_index: 5
  },
  {
    id: 'sk-6',
    name: 'Material Recovery Facility Operations',
    category: 'Waste Management',
    proficiency: 'Advanced',
    is_featured: true,
    order_index: 6
  },
  {
    id: 'sk-7',
    name: 'Team Supervision & Coordination',
    category: 'Leadership & Operations',
    proficiency: 'Expert',
    is_featured: true,
    order_index: 7
  },

  // Technology & Data
  {
    id: 'sk-8',
    name: 'ERP Systems (Odoo, M-taka)',
    category: 'Technology & Data',
    proficiency: 'Intermediate',
    is_featured: true,
    order_index: 8
  },
  {
    id: 'sk-9',
    name: 'Microsoft Excel',
    category: 'Technology & Data',
    proficiency: 'Advanced',
    is_featured: true,
    order_index: 9
  },
  {
    id: 'sk-10',
    name: 'Microsoft Office Suite',
    category: 'Technology & Data',
    proficiency: 'Advanced',
    is_featured: false,
    order_index: 10
  },
  {
    id: 'sk-11',
    name: 'Google Workspace',
    category: 'Technology & Data',
    proficiency: 'Advanced',
    is_featured: true,
    order_index: 11
  },
  {
    id: 'sk-12',
    name: 'Database Creation & Management',
    category: 'Technology & Data',
    proficiency: 'Advanced',
    is_featured: true,
    order_index: 12
  },
  {
    id: 'sk-13',
    name: 'Data Collection, Analysis & Reporting',
    category: 'Technology & Data',
    proficiency: 'Advanced',
    is_featured: true,
    order_index: 13
  },
  {
    id: 'sk-14',
    name: 'Artificial Intelligence Tools',
    category: 'Technology & Data',
    proficiency: 'Intermediate',
    is_featured: false,
    order_index: 14
  },

  // Environmental & Research
  {
    id: 'sk-15',
    name: 'Seed Collection & Processing',
    category: 'Research & Environmental Science',
    proficiency: 'Advanced',
    is_featured: false,
    order_index: 15
  },
  {
    id: 'sk-16',
    name: 'Seed Germination Testing',
    category: 'Research & Environmental Science',
    proficiency: 'Advanced',
    is_featured: false,
    order_index: 16
  },
  {
    id: 'sk-17',
    name: 'Tree & Plant Propagation',
    category: 'Research & Environmental Science',
    proficiency: 'Advanced',
    is_featured: false,
    order_index: 17
  },
  {
    id: 'sk-18',
    name: 'Research Concept Development',
    category: 'Research & Environmental Science',
    proficiency: 'Advanced',
    is_featured: false,
    order_index: 18
  },
  {
    id: 'sk-19',
    name: 'Experimental Design',
    category: 'Research & Environmental Science',
    proficiency: 'Advanced',
    is_featured: false,
    order_index: 19
  }
];

export const initialEducation: Education[] = [
  {
    id: 'edu-1',
    institution: 'Kenyatta University',
    qualification: "Bachelor's Degree",
    field_of_study: 'Environmental Planning and Management',
    grade_or_honors: '',
    location: 'Kenya',
    start_date: '2015',
    end_date: '2019',
    is_current: false,
    description:
      'Academic training in environmental planning, management, natural resources, environmental assessment, and related environmental disciplines.',
    order_index: 1
  },
  {
    id: 'edu-2',
    institution: 'Kenyatta University',
    qualification: 'Certificate',
    field_of_study: 'Leadership Development and Mentorship',
    grade_or_honors: '',
    location: 'Kenya',
    start_date: '2018',
    end_date: '2019',
    is_current: false,
    description:
      'Training focused on leadership development, mentorship, teamwork, and personal development.',
    order_index: 2
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'HSE Database for Material Recovery Facility',
    description:
      'Designed an HSE database to support health, safety, and environmental information management at Maendeleo Material Recovery Facility.',
    long_description:
      'Developed and implemented an HSE database for the material recovery facility to improve the organization and management of health, safety, and environmental records.',
    technologies: [
      'Database Management',
      'Microsoft Excel',
      'HSE',
      'Data Management'
    ],
    category: 'EHS & Data Management',
    github_url: '',
    live_url: '',
    image_url:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    metrics: 'Centralized HSE Data Management',
    date: '2026-01',
    is_featured: true,
    order_index: 1
  },
  {
    id: 'proj-2',
    title: 'Environmental & Occupational Safety Audit Cost Optimization',
    description:
      'Supported initiatives that reduced environmental audit, OSH audit, and stack emission measurement costs.',
    long_description:
      'Contributed to compliance and operational initiatives at Sanergy Limited that achieved significant cost reductions in environmental auditing, occupational safety and health audits, and stack emission measurements.',
    technologies: [
      'Environmental Compliance',
      'EHS',
      'OSH Auditing',
      'Cost Optimization'
    ],
    category: 'Environmental Compliance',
    github_url: '',
    live_url: '',
    image_url:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    metrics: '40% Environmental Audit Cost Reduction',
    date: '2025-05',
    is_featured: true,
    order_index: 2
  },
  {
    id: 'proj-3',
    title: 'Tree Seedling Distribution & Environmental Outreach',
    description:
      'Supported the distribution of more than 5,000 tree seedlings to TVET institutions within Migori County.',
    long_description:
      'During field attachment with Migori County Government, participated in environmental conservation activities including large-scale tree seedling distribution and planning for World Environment Day.',
    technologies: [
      'Environmental Planning',
      'Tree Planting',
      'Natural Resource Management',
      'Community Outreach'
    ],
    category: 'Environmental Conservation',
    github_url: '',
    live_url: '',
    image_url:
      'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&q=80&w=800',
    metrics: '5,000+ Tree Seedlings Distributed',
    date: '2019-08',
    is_featured: true,
    order_index: 3
  }
];

export const initialCertifications: Certification[] = [];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Environmental Audit Cost Reduction',
    description:
      'Reduced the cost of the annual environmental audit by 40% while working as an HSSE Associate at Sanergy Limited.',
    issuer_or_org: 'Sanergy Limited (Regen Organics)',
    date: '2025-05',
    order_index: 1
  },
  {
    id: 'ach-2',
    title: 'Occupational Safety Audit Cost Reduction',
    description:
      'Reduced the cost of Occupational Safety and Health audits by 16.7%.',
    issuer_or_org: 'Sanergy Limited (Regen Organics)',
    date: '2025-05',
    order_index: 2
  },
  {
    id: 'ach-3',
    title: 'Stack Emission Measurement Cost Reduction',
    description:
      'Reduced the cost of stack emission measurement by 7.5%.',
    issuer_or_org: 'Sanergy Limited (Regen Organics)',
    date: '2025-05',
    order_index: 3
  },
  {
    id: 'ach-4',
    title: 'DOSH Portal Site Registration',
    description:
      'Successfully registered one site in the Directorate of Occupational Safety and Health (DOSH) portal.',
    issuer_or_org: 'Sanergy Limited (Regen Organics)',
    date: '2025-05',
    order_index: 4
  },
  {
    id: 'ach-5',
    title: 'Promotion to HSSE Associate',
    description:
      'Promoted to Health, Safety, Security, and Environment Associate after one month of fellowship at Sanergy Limited.',
    issuer_or_org: 'Sanergy Limited (Regen Organics)',
    date: '2024-11',
    order_index: 5
  },
  {
    id: 'ach-6',
    title: 'Environmental Seedling Distribution',
    description:
      'Distributed over 5,000 tree seedlings to Technical and Vocational Training Institutions within Migori County.',
    issuer_or_org: 'Migori County Government',
    date: '2019-08',
    order_index: 6
  }
];

export const initialReferees: Referee[] = [];

export const initialDocument: DocumentRecord = {
  id: 'doc-cv-active',
  name: 'Jevance Ochieng Osano - CV.pdf',
  file_name: 'Jevance_Ochieng_Osano_CV.pdf',
  file_url: '#',
  file_size: '',
  file_type: 'application/pdf',
  uploaded_at: new Date().toISOString(),
  is_active: true
};