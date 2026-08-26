import React from 'react';
import { Link } from 'react-router-dom';
import { useCV } from '../../context/CVContext';
import { Lock, Heart, Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile } = useCV();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright & Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-white font-bold text-base tracking-tight">
              {profile.name}
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Data Analyst & Business Intelligence Specialist • © 2026 Jevance Ochieng. All rights reserved.
            </p>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#summary" className="hover:text-white transition-colors">Summary</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <Link to="/download-cv" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Download CV
            </Link>
          </div>

          {/* Back to top & Discreet Admin access */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            {/* Discreet Admin Lock Link */}
            <Link
              to="/admin"
              id="footer-admin-link"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-400 dark:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-800/40 transition-colors"
              title="CMS Admin Portal"
              aria-label="Admin Login"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};
