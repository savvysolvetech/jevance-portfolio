import React from 'react';
import { Link } from 'react-router-dom';
import { useCV } from '../../context/CVContext';
import { 
  Download, 
  ArrowRight, 
  Linkedin, 
  Github, 
  Mail, 
  MapPin, 
  Database, 
  BarChart3, 
  FileSpreadsheet, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { profile } = useCV();

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden"
    >
      {/* Background visual accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-indigo-600/10 dark:bg-indigo-600/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status / Category Pill */}
            <div 
              id="hero-status-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{profile.status_badge || 'DATA ANALYST & BI SPECIALIST'}</span>
            </div>

            {/* Name Headline */}
            <h1 
              id="hero-name"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4"
            >
              {profile.name}
            </h1>

            {/* Professional Title Subhead */}
            <p 
              id="hero-title"
              className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-6"
            >
              {profile.professional_title}
            </p>

            {/* Introduction Bio */}
            <p 
              id="hero-tagline"
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal"
            >
              {profile.hero_tagline || profile.career_summary}
            </p>

            {/* Key Value Metric Pills */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg mb-8">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                  {profile.years_of_experience}+ Years
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Experience</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">
                  99.8%
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Data Accuracy</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                  SQL & BI
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Core Focus</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                to="/download-cv"
                id="hero-download-cv-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </Link>
              
              <button
                id="hero-view-work-btn"
                onClick={() => handleScrollToSection('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Contact & Location Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 dark:text-slate-400 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 w-full">
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.email && (
                <a 
                  href={`mailto:${profile.email}`} 
                  className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile.linkedin && (
                <a 
                  href={profile.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.github && (
                <a 
                  href={profile.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-blue-500" />
                  <span>GitHub</span>
                </a>
              )}
            </div>

          </div>

          {/* Right Visual / Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Decorative backplate */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl blur-md opacity-30 dark:opacity-40" />

              {/* Main Card */}
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
                
                {/* Photo with status indicator */}
                <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-inner group">
                  <img
                    src={profile.profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 right-2 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900" title="Available for hire" />
                </div>

                {/* Card Title & Specialties */}
                <div className="text-center mt-5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {profile.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    Data Analytics & BI Professional
                  </p>
                </div>

                {/* Tech Highlights Badge Stack */}
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <Database className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">SQL & PostgreSQL</span>
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">Expert</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Power BI & DAX</span>
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">Certified</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Excel & Google Sheets</span>
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">Advanced</span>
                  </div>
                </div>

                {/* Verified badge */}
                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Dynamic CV managed via private Admin CMS</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
