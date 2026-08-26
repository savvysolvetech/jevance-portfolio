import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  Profile, 
  Experience, 
  Education, 
  Skill, 
  Project, 
  Certification, 
  Achievement, 
  Referee, 
  DocumentRecord,
  NotificationToast
} from '../types';
import { 
  initialProfile, 
  initialExperience, 
  initialSkills, 
  initialEducation, 
  initialProjects, 
  initialCertifications, 
  initialAchievements, 
  initialReferees, 
  initialDocument 
} from '../data/initialData';
import { db, isFirebaseConfigured } from '../lib/firebaseClient';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';

interface CVContextType {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  referees: Referee[];
  documents: DocumentRecord[];
  resumeDocuments: DocumentRecord[];
  activeDocument: DocumentRecord | null;
  isLoading: boolean;
  isSaving: boolean;
  lastUpdated: string;
  toasts: NotificationToast[];
  
  // Toast helper
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Profile operations
  updateProfile: (updated: Partial<Profile>) => Promise<boolean>;

  // Experience CRUD
  addExperience: (exp: Omit<Experience, 'id'>) => Promise<boolean>;
  updateExperience: (id: string, exp: Partial<Experience>) => Promise<boolean>;
  deleteExperience: (id: string) => Promise<boolean>;

  // Education CRUD
  addEducation: (edu: Omit<Education, 'id'>) => Promise<boolean>;
  updateEducation: (id: string, edu: Partial<Education>) => Promise<boolean>;
  deleteEducation: (id: string) => Promise<boolean>;

  // Skills CRUD
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<boolean>;
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;

  // Projects CRUD
  addProject: (proj: Omit<Project, 'id'>) => Promise<boolean>;
  updateProject: (id: string, proj: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;

  // Certifications CRUD
  addCertification: (cert: Omit<Certification, 'id'>) => Promise<boolean>;
  updateCertification: (id: string, cert: Partial<Certification>) => Promise<boolean>;
  deleteCertification: (id: string) => Promise<boolean>;

  // Achievements CRUD
  addAchievement: (ach: Omit<Achievement, 'id'>) => Promise<boolean>;
  updateAchievement: (id: string, ach: Partial<Achievement>) => Promise<boolean>;
  deleteAchievement: (id: string) => Promise<boolean>;

  // Referees CRUD
  addReferee: (ref: Omit<Referee, 'id'>) => Promise<boolean>;
  updateReferee: (id: string, ref: Partial<Referee>) => Promise<boolean>;
  deleteReferee: (id: string) => Promise<boolean>;

  // Resume Document Operations
  uploadDocument: (doc: Omit<DocumentRecord, 'id' | 'uploaded_at'>) => Promise<boolean>;
  setActiveDocument: (id: string) => Promise<boolean>;
  deleteDocument: (id: string) => Promise<boolean>;
  uploadResumeDocument: (doc: Omit<DocumentRecord, 'id' | 'uploaded_at'>) => Promise<boolean>;
  setActiveResumeDocument: (id: string) => Promise<boolean>;
  deleteResumeDocument: (id: string) => Promise<boolean>;

  // Backup & Reset
  resetToDefaults: () => void;
  resetToDefaultData: () => void;
  exportDatabaseJSON: () => string;
  exportDataAsJSON: () => string;
  importDatabaseJSON: (jsonStr: string) => boolean | Promise<{ success: boolean; error?: string }>;
  importDataFromJSON: (jsonStr: string) => boolean | Promise<{ success: boolean; error?: string }>;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'jevance_cv_profile',
  EXPERIENCE: 'jevance_cv_experience',
  EDUCATION: 'jevance_cv_education',
  SKILLS: 'jevance_cv_skills',
  PROJECTS: 'jevance_cv_projects',
  CERTIFICATIONS: 'jevance_cv_certifications',
  ACHIEVEMENTS: 'jevance_cv_achievements',
  REFEREES: 'jevance_cv_referees',
  DOCUMENTS: 'jevance_cv_documents',
  LAST_UPDATED: 'jevance_cv_last_updated'
};

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [experience, setExperience] = useState<Experience[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
    return saved ? JSON.parse(saved) : initialExperience;
  });

  const [education, setEducation] = useState<Education[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
    return saved ? JSON.parse(saved) : initialEducation;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [certifications, setCertifications] = useState<Certification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
    return saved ? JSON.parse(saved) : initialCertifications;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [referees, setReferees] = useState<Referee[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REFEREES);
    return saved ? JSON.parse(saved) : initialReferees;
  });

  const [documents, setDocuments] = useState<DocumentRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return saved ? JSON.parse(saved) : [initialDocument];
  });

  const [lastUpdated, setLastUpdated] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.LAST_UPDATED) || new Date().toISOString();
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const markUpdated = () => {
    const now = new Date().toISOString();
    setLastUpdated(now);
    localStorage.setItem(STORAGE_KEYS.LAST_UPDATED, now);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REFEREES, JSON.stringify(referees));
  }, [referees]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;

    async function loadFromFirestore() {
      setIsLoading(true);
      try {
        const fetchCollection = async (colName: string, orderField = 'order_index', desc = false) => {
          const q = query(collection(db!, colName), orderBy(orderField, desc ? 'desc' : 'asc'));
          const snapshot = await getDocs(q);
          return snapshot.docs.map(doc => doc.data());
        };

        const profSnapshot = await getDocs(collection(db!, 'profiles'));
        if (!profSnapshot.empty) {
          setProfile(profSnapshot.docs[0].data() as Profile);
        }

        const expData = await fetchCollection('experience');
        if (expData.length > 0) setExperience(expData as Experience[]);

        const eduData = await fetchCollection('education');
        if (eduData.length > 0) setEducation(eduData as Education[]);

        const skillData = await fetchCollection('skills');
        if (skillData.length > 0) setSkills(skillData as Skill[]);

        const projData = await fetchCollection('projects');
        if (projData.length > 0) setProjects(projData as Project[]);

        const certData = await fetchCollection('certifications');
        if (certData.length > 0) setCertifications(certData as Certification[]);

        const achData = await fetchCollection('achievements');
        if (achData.length > 0) setAchievements(achData as Achievement[]);

        const refData = await fetchCollection('referees');
        if (refData.length > 0) setReferees(refData as Referee[]);

        const docData = await fetchCollection('documents', 'uploaded_at', true);
        if (docData.length > 0) setDocuments(docData as DocumentRecord[]);

      } catch (err) {
        console.error('Error fetching Firestore records, keeping local cache', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadFromFirestore();
  }, []);

  const activeDocument = documents.find(d => d.is_active) || documents[0] || null;

  const updateProfile = async (updated: Partial<Profile>): Promise<boolean> => {
    setIsSaving(true);
    const newProfile = { ...profile, ...updated, updated_at: new Date().toISOString() };
    setProfile(newProfile);
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'profiles', newProfile.id), newProfile);
      } catch (e) {
        console.warn('Firebase sync warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Profile & Career Summary updated successfully');
    return true;
  };

  const addExperience = async (expData: Omit<Experience, 'id'>): Promise<boolean> => {
    setIsSaving(true);
    const newId = 'exp-' + Date.now();
    const newRecord: Experience = { ...expData, id: newId };
    
    setExperience(prev => [newRecord, ...prev]);
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'experience', newRecord.id), newRecord);
      } catch (e) {
        console.warn('Firebase insert warning:', e);
      }
    }

    setIsSaving(false);
    showToast('New experience record added');
    return true;
  };

  const updateExperience = async (id: string, expData: Partial<Experience>): Promise<boolean> => {
    setIsSaving(true);
    setExperience(prev => prev.map(item => item.id === id ? { ...item, ...expData } : item));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'experience', id), expData);
      } catch (e) {
        console.warn('Firebase update warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Experience record updated');
    return true;
  };

  const deleteExperience = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setExperience(prev => prev.filter(item => item.id !== id));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'experience', id));
      } catch (e) {
        console.warn('Firebase delete warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Experience record removed', 'info');
    return true;
  };

  const addEducation = async (eduData: Omit<Education, 'id'>): Promise<boolean> => {
    setIsSaving(true);
    const newId = 'edu-' + Date.now();
    const newRecord: Education = { ...eduData, id: newId };
    setEducation(prev => [newRecord, ...prev]);
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'education', newRecord.id), newRecord);
      } catch (e) {
        console.warn('Firebase insert warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Education record added');
    return true;
  };

  const updateEducation = async (id: string, eduData: Partial<Education>): Promise<boolean> => {
    setIsSaving(true);
    setEducation(prev => prev.map(item => item.id === id ? { ...item, ...eduData } : item));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'education', id), eduData);
      } catch (e) {
        console.warn('Firebase update warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Education record updated');
    return true;
  };

  const deleteEducation = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setEducation(prev => prev.filter(item => item.id !== id));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'education', id));
      } catch (e) {
        console.warn('Firebase delete warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Education record removed', 'info');
    return true;
  };

  const addSkill = async (skillData: Omit<Skill, 'id'>): Promise<boolean> => {
    setIsSaving(true);
    const newId = 'sk-' + Date.now();
    const newRecord: Skill = { ...skillData, id: newId };
    setSkills(prev => [...prev, newRecord]);
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'skills', newRecord.id), newRecord);
      } catch (e) {
        console.warn('Firebase insert warning:', e);
      }
    }

    setIsSaving(false);
    showToast(`Added skill "${newRecord.name}"`);
    return true;
  };

  const updateSkill = async (id: string, skillData: Partial<Skill>): Promise<boolean> => {
    setIsSaving(true);
    setSkills(prev => prev.map(item => item.id === id ? { ...item, ...skillData } : item));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'skills', id), skillData);
      } catch (e) {
        console.warn('Firebase update warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Skill updated');
    return true;
  };

  const deleteSkill = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setSkills(prev => prev.filter(item => item.id !== id));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'skills', id));
      } catch (e) {
        console.warn('Firebase delete warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Skill deleted', 'info');
    return true;
  };

  const addProject = async (projData: Omit<Project, 'id'>): Promise<boolean> => {
    setIsSaving(true);
    const newId = 'proj-' + Date.now();
    const newRecord: Project = { ...projData, id: newId };
    setProjects(prev => [newRecord, ...prev]);
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'projects', newRecord.id), newRecord);
      } catch (e) {
        console.warn('Firebase insert warning:', e);
      }
    }

    setIsSaving(false);
    showToast(`Project "${newRecord.title}" published`);
    return true;
  };

  const updateProject = async (id: string, projData: Partial<Project>): Promise<boolean> => {
    setIsSaving(true);
    setProjects(prev => prev.map(item => item.id === id ? { ...item, ...projData } : item));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'projects', id), projData);
      } catch (e) {
        console.warn('Firebase update warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Project updated');
    return true;
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setProjects(prev => prev.filter(item => item.id !== id));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (e) {
        console.warn('Firebase delete warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Project deleted', 'info');
    return true;
  };

  const addCertification = async (certData: Omit<Certification, 'id'>): Promise<boolean> => {
    setIsSaving(true);
    const newId = 'cert-' + Date.now();
    const newRecord: Certification = { ...certData, id: newId };
    setCertifications(prev => [newRecord, ...prev]);
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'certifications', newRecord.id), newRecord);
      } catch (e) {
        console.warn('Firebase insert warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Certification added');
    return true;
  };

  const updateCertification = async (id: string, certData: Partial<Certification>): Promise<boolean> => {
    setIsSaving(true);
    setCertifications(prev => prev.map(item => item.id === id ? { ...item, ...certData } : item));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'certifications', id), certData);
      } catch (e) {
        console.warn('Firebase update warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Certification updated');
    return true;
  };

  const deleteCertification = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setCertifications(prev => prev.filter(item => item.id !== id));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'certifications', id));
      } catch (e) {
        console.warn('Firebase delete warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Certification deleted', 'info');
    return true;
  };

  const addAchievement = async (achData: Omit<Achievement, 'id'>): Promise<boolean> => {
    setIsSaving(true);
    const newId = 'ach-' + Date.now();
    const newRecord: Achievement = { ...achData, id: newId };
    setAchievements(prev => [newRecord, ...prev]);
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'achievements', newRecord.id), newRecord);
      } catch (e) {
        console.warn('Firebase insert warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Achievement recorded');
    return true;
  };

  const updateAchievement = async (id: string, achData: Partial<Achievement>): Promise<boolean> => {
    setIsSaving(true);
    setAchievements(prev => prev.map(item => item.id === id ? { ...item, ...achData } : item));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'achievements', id), achData);
      } catch (e) {
        console.warn('Firebase update warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Achievement updated');
    return true;
  };

  const deleteAchievement = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setAchievements(prev => prev.filter(item => item.id !== id));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'achievements', id));
      } catch (e) {
        console.warn('Firebase delete warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Achievement deleted', 'info');
    return true;
  };

  const addReferee = async (refData: Omit<Referee, 'id'>): Promise<boolean> => {
    setIsSaving(true);
    const newId = 'ref-' + Date.now();
    const newRecord: Referee = { ...refData, id: newId };
    setReferees(prev => [...prev, newRecord]);
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'referees', newRecord.id), newRecord);
      } catch (e) {
        console.warn('Firebase insert warning:', e);
      }
    }

    setIsSaving(false);
    showToast(`Referee "${newRecord.name}" added`);
    return true;
  };

  const updateReferee = async (id: string, refData: Partial<Referee>): Promise<boolean> => {
    setIsSaving(true);
    setReferees(prev => prev.map(item => item.id === id ? { ...item, ...refData } : item));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'referees', id), refData);
      } catch (e) {
        console.warn('Firebase update warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Referee record updated');
    return true;
  };

  const deleteReferee = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setReferees(prev => prev.filter(item => item.id !== id));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'referees', id));
      } catch (e) {
        console.warn('Firebase delete warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Referee deleted', 'info');
    return true;
  };

  const uploadDocument = async (docData: Omit<DocumentRecord, 'id' | 'uploaded_at'>): Promise<boolean> => {
    setIsSaving(true);
    const newId = 'doc-' + Date.now();
    const newRecord: DocumentRecord = {
      ...docData,
      id: newId,
      uploaded_at: new Date().toISOString(),
      is_active: docData.is_active ?? true
    };

    setDocuments(prev => {
      const updated = newRecord.is_active 
        ? prev.map(d => ({ ...d, is_active: false })) 
        : [...prev];
      return [newRecord, ...updated];
    });

    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        if (newRecord.is_active) {
          const snapshot = await getDocs(collection(db, 'documents'));
          snapshot.forEach(async (d) => {
            await updateDoc(doc(db, 'documents', d.id), { is_active: false });
          });
        }
        await setDoc(doc(db, 'documents', newRecord.id), newRecord);
      } catch (e) {
        console.warn('Firebase sync warning:', e);
      }
    }

    setIsSaving(false);
    showToast('PDF Resume uploaded & set as active CV');
    return true;
  };

  const setActiveDocument = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setDocuments(prev => prev.map(d => ({
      ...d,
      is_active: d.id === id
    })));
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        const snapshot = await getDocs(collection(db, 'documents'));
        snapshot.forEach(async (d) => {
          await updateDoc(doc(db, 'documents', d.id), { is_active: d.id === id });
        });
      } catch (e) {
        console.warn('Firebase sync warning:', e);
      }
    }

    setIsSaving(false);
    showToast('Active CV document updated');
    return true;
  };

  const deleteDocument = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setDocuments(prev => {
      const remaining = prev.filter(d => d.id !== id);
      if (remaining.length > 0 && !remaining.some(d => d.is_active)) {
        remaining[0].is_active = true;
      }
      return remaining;
    });
    markUpdated();

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'documents', id));
      } catch (e) {
        console.warn('Firebase delete warning:', e);
      }
    }

    setIsSaving(false);
    showToast('CV document removed', 'info');
    return true;
  };

  const resetToDefaults = () => {
    setProfile(initialProfile);
    setExperience(initialExperience);
    setEducation(initialEducation);
    setSkills(initialSkills);
    setProjects(initialProjects);
    setCertifications(initialCertifications);
    setAchievements(initialAchievements);
    setReferees(initialReferees);
    setDocuments([initialDocument]);
    markUpdated();
    showToast('Database reset to Jevance Ochieng defaults', 'info');
  };

  const exportDatabaseJSON = (): string => {
    const payload = {
      profile,
      experience,
      education,
      skills,
      projects,
      certifications,
      achievements,
      referees,
      documents,
      exported_at: new Date().toISOString(),
      version: '1.0.0'
    };
    return JSON.stringify(payload, null, 2);
  };

  const importDatabaseJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profile) setProfile(parsed.profile);
      if (Array.isArray(parsed.experience)) setExperience(parsed.experience);
      if (Array.isArray(parsed.education)) setEducation(parsed.education);
      if (Array.isArray(parsed.skills)) setSkills(parsed.skills);
      if (Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (Array.isArray(parsed.certifications)) setCertifications(parsed.certifications);
      if (Array.isArray(parsed.achievements)) setAchievements(parsed.achievements);
      if (Array.isArray(parsed.referees)) setReferees(parsed.referees);
      if (Array.isArray(parsed.documents)) setDocuments(parsed.documents);
      markUpdated();
      showToast('Database restored successfully from JSON backup');
      return true;
    } catch (e) {
      showToast('Invalid JSON backup file', 'error');
      return false;
    }
  };

  return (
    <CVContext.Provider
      value={{
        profile,
        experience,
        education,
        skills,
        projects,
        certifications,
        achievements,
        referees,
        documents,
        resumeDocuments: documents,
        activeDocument,
        isLoading,
        isSaving,
        lastUpdated,
        toasts,
        showToast,
        removeToast,
        updateProfile,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addCertification,
        updateCertification,
        deleteCertification,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        addReferee,
        updateReferee,
        deleteReferee,
        uploadDocument,
        setActiveDocument,
        deleteDocument,
        uploadResumeDocument: uploadDocument,
        setActiveResumeDocument: setActiveDocument,
        deleteResumeDocument: deleteDocument,
        resetToDefaults,
        resetToDefaultData: resetToDefaults,
        exportDatabaseJSON,
        exportDataAsJSON: exportDatabaseJSON,
        importDatabaseJSON,
        importDataFromJSON: importDatabaseJSON
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = (): CVContextType => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};
