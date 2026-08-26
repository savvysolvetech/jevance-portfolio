import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCV } from '../../context/CVContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  FolderGit2, 
  Award, 
  Trophy, 
  UserCheck, 
  FileText, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Database,
  Cloud,
  HardDrive,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeSection }) => {
  const { user, logout, isSupabaseLive } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { profile, lastUpdated } = useCV();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { id: 'summary', label: 'Summary & Bio', href: '/admin/summary', icon: User },
    { id: 'experience', label: 'Experience', href: '/admin/experience', icon: Briefcase },
    { id: 'education', label: 'Education', href: '/admin/education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', href: '/admin/skills', icon: Code2 },
    { id: 'projects', label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certificates', href: '/admin/certifications', icon: Award },
    { id: 'achievements', label: 'Achievements', href: '/admin/achievements', icon: Trophy },
    { id: 'referees', label: 'Referees', href: '/admin/referees', icon: UserCheck },
    { id: 'resume', label: 'Resume PDF', href: '/admin/resume', icon: FileText },
    { id: 'settings', label: 'Settings & DB', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-bold text-sm tracking-tight text-white">CV ADMIN CMS</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1"
            title="View Live Website"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        id="admin-sidebar"
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/20">
                DK
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white tracking-tight">CV Admin CMS</span>
                <span className="text-[10px] font-mono text-slate-400 truncate max-w-[130px]">{user?.email || 'Administrator'}</span>
              </div>
            </Link>
          </div>

          {/* Storage & Live Status Badge */}
          <div className="px-4 py-3">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isSupabaseLive ? (
                  <Cloud className="w-4 h-4 text-emerald-400" />
                ) : (
                  <HardDrive className="w-4 h-4 text-blue-400" />
                )}
                <span className="text-[11px] font-medium text-slate-300">
                  {isSupabaseLive ? 'Supabase Cloud Live' : 'Local State Engine'}
                </span>
              </div>
              <span className={`w-2 h-2 rounded-full ${isSupabaseLive ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)]">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.id}
                  to={item.href}
                  id={`admin-nav-${item.id}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            id="admin-view-live-site-btn"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>

          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-950 overflow-y-auto">
        {/* Top Navbar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="font-semibold text-white capitalize">{activeSection}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400 font-mono">
              Last saved: {new Date(lastUpdated).toLocaleTimeString()}
            </span>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold border border-blue-500/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Section Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
};
