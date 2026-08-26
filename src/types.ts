export interface Profile {
  id: string;
  name: string;
  professional_title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website?: string;
  profile_image: string;
  career_summary: string;
  years_of_experience: number;
  areas_of_expertise: string[];
  hero_tagline: string;
  status_badge: string;
  open_for_work: boolean;
  updated_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  order_index: number;
}

export interface Education {
  id: string;
  institution: string;
  qualification: string;
  field_of_study: string;
  grade_or_honors?: string;
  location?: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description?: string;
  order_index: number;
}

export type SkillCategory = string;

export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
  icon_name?: string;
  is_featured: boolean;
  order_index: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  technologies: string[];
  category: string;
  github_url?: string;
  live_url?: string;
  image_url?: string;
  metrics?: string;
  date: string;
  is_featured: boolean;
  order_index: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  image_url?: string;
  order_index: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  issuer_or_org?: string;
  date: string;
  order_index: number;
}

export interface Referee {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  relationship?: string;
  is_public: boolean;
  order_index: number;
}

export interface DocumentRecord {
  id: string;
  name: string;
  file_name: string;
  file_url: string;
  file_size?: string;
  file_type: string;
  uploaded_at: string;
  is_active: boolean;
  raw_base64?: string;
}

export type ResumeDocument = DocumentRecord;

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'editor';
}

export interface NotificationToast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
