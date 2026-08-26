import React from 'react';
import { useCV } from '../../context/CVContext';
import { Briefcase, Calendar, MapPin, CheckCircle, Trophy, Tag } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experience } = useCV();

  // Sort by order_index or start_date descending
  const sortedExperience = [...experience].sort((a, b) => {
    if (a.is_current && !b.is_current) return -1;
    if (!a.is_current && b.is_current) return 1;
    return a.order_index - b.order_index;
  });

  return (
    <section id="experience" className="py-16 md:py-24 border-t border-slate-200/70 dark:border-slate-800/70 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work Experience
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mt-3" />
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
          
          {sortedExperience.map((exp, index) => (
            <div key={exp.id} id={`exp-item-${exp.id}`} className="relative group">
              
              {/* Timeline Node Icon */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center ${
                exp.is_current 
                  ? 'bg-blue-600 shadow-md shadow-blue-500/30 ring-4 ring-blue-500/20' 
                  : 'bg-slate-400 dark:bg-slate-700'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Experience Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:border-blue-500/40 transition-colors">
                
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {exp.position}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</span>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}
                    </span>
                    {exp.is_current && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Current Role
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Overview Description */}
                {exp.description && (
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {/* Key Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                      Key Responsibilities & Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-5 p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Key Measurable Achievements</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies used */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Tools:
                    </span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}

          {sortedExperience.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 text-sm">No experience records available.</p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
