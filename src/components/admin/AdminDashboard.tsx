import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCV } from '../../context/CVContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, 
  Code2, 
  FolderGit2, 
  Award, 
  GraduationCap, 
  UserCheck, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sparkles,
  Cloud,
  HardDrive,
  Eye,
  Plus
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    profile, 
    experience, 
    skills, 
    projects, 
    certifications, 
    education, 
    referees, 
    activeDocument,
    lastUpdated 
  } = useCV();
  const { user, isSupabaseLive } = useAuth();
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const stats = [
    { label: 'Work Experience', count: experience.length, href: '/admin/experience', icon: Briefcase, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Technical Skills', count: skills.length, href: '/admin/skills', icon: Code2, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Projects & Work', count: projects.length, href: '/admin/projects', icon: FolderGit2, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'Certifications', count: certifications.length, href: '/admin/certifications', icon: Award, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Education Records', count: education.length, href: '/admin/education', icon: GraduationCap, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Referees', count: referees.length, href: '/admin/referees', icon: UserCheck, color: 'text-rose-500 bg-rose-500/10' },
  ];

  const sectionsStatus = [
    { name: 'Career Summary & Bio', status: 'Published', path: '/admin/summary' },
    { name: 'Experience Timeline', status: `${experience.length} Records Published`, path: '/admin/experience' },
    { name: 'Core Skills & Tools', status: `${skills.length} Skills Active`, path: '/admin/skills' },
    { name: 'Portfolio Projects', status: `${projects.length} Case Studies Active`, path: '/admin/projects' },
    { name: 'Academic Education', status: `${education.length} Credentials Published`, path: '/admin/education' },
    { name: 'Certificates & Badges', status: `${certifications.length} Certs Listed`, path: '/admin/certifications' },
    { name: 'Referees & Endorsements', status: `${referees.filter(r => r.is_public).length} Public / ${referees.length} Total`, path: '/admin/referees' },
    { name: 'Active PDF Resume', status: activeDocument ? activeDocument.file_name : 'Default Ready', path: '/admin/resume' },
  ];

  return (
    <div id="admin-dashboard-page" className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/20 to-slate-900 border border-blue-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CV CMS Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {user?.name || profile.name}
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Manage your personal CV information, project portfolio, technical skills, and downloadable PDF resume in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public CV</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.href}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group"
            >
              <div className={`p-2 rounded-xl w-fit ${stat.color} mb-3 group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold font-mono text-white block">
                  {stat.count}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {stat.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Split: Sections Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CV Sections Status Table */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">CV Sections Status</h2>
              <p className="text-xs text-slate-400">All changes made in these sections appear on your live website.</p>
            </div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              {new Date(lastUpdated).toLocaleDateString()}
            </span>
          </div>

          <div className="divide-y divide-slate-800">
            {sectionsStatus.map((sec, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-200">{sec.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline truncate max-w-[200px]">
                    {sec.status}
                  </span>
                  <Link
                    to={sec.path}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    Manage →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Info: Live Engine & Fast Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active CV Document Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Current Active PDF CV</span>
            </h3>
            {activeDocument ? (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="font-semibold text-slate-200 truncate">{activeDocument.file_name}</div>
                <div className="text-slate-500 font-mono">Size: {activeDocument.file_size || '245 KB'}</div>
                <div className="text-emerald-400 font-medium">Status: Publicly downloadable</div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No custom PDF uploaded yet. Default live CV active.</p>
            )}

            <Link
              to="/admin/resume"
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Upload / Replace PDF</span>
            </Link>
          </div>

          {/* Quick Add Shortcuts */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-sm font-bold text-white mb-3">Quick Add Shortcuts</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/admin/experience"
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                <span>Experience</span>
              </Link>
              <Link
                to="/admin/projects"
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                <span>Project</span>
              </Link>
              <Link
                to="/admin/skills"
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                <span>Skill</span>
              </Link>
              <Link
                to="/admin/certifications"
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                <span>Certificate</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
