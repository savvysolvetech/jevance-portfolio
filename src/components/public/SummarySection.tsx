import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { User, CheckCircle2, Award, TrendingUp, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const SummarySection: React.FC = () => {
  const { profile } = useCV();
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="summary" className="py-16 md:py-24 border-t border-slate-200/70 dark:border-slate-800/70 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About / Career Summary
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Summary Text Card */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span>Executive Profile</span>
            </h3>
            
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {profile.career_summary}
            </p>

            {/* Read More / Expanded content if available */}
            {expanded && (
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 space-y-4 text-sm sm:text-base leading-relaxed animate-fadeIn">
                <p>
                  Specializing in operational data hygiene, pipeline automation, and multi-source reporting. Experienced in liaising with cross-functional leadership teams, warehouse operators, and financial controllers to design clear data governance standards.
                </p>
                <p>
                  Focused on bridging the gap between technical data warehousing in SQL and intuitive user-facing Power BI analytics, ensuring non-technical stakeholders make proactive decisions based on real-time metrics.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 flex items-center justify-between">
              <button
                id="toggle-summary-expand-btn"
                onClick={() => setExpanded(prev => !prev)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <span>{expanded ? 'Show Less' : 'Read More'}</span>
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Areas of Expertise Side Card */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Core Areas of Expertise</span>
            </h3>
            
            <ul className="space-y-3">
              {profile.areas_of_expertise && profile.areas_of_expertise.map((area, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {area}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Status</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {profile.status_badge || 'Open to Work'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
