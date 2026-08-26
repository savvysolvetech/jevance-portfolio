import React from 'react';
import { useCV } from '../../context/CVContext';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { education } = useCV();

  const sortedEducation = [...education].sort((a, b) => a.order_index - b.order_index);

  return (
    <section id="education" className="py-16 md:py-24 border-t border-slate-200/70 dark:border-slate-800/70 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education & Qualifications
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mt-3" />
        </div>

        {/* Education List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedEducation.map(edu => (
            <div
              key={edu.id}
              id={`edu-card-${edu.id}`}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:border-blue-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{edu.start_date} – {edu.is_current ? 'Present' : edu.end_date}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {edu.qualification} in {edu.field_of_study}
                </h3>
                
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                  {edu.institution}
                </div>

                {edu.location && (
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{edu.location}</span>
                  </div>
                )}

                {edu.grade_or_honors && (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium border border-emerald-500/20">
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{edu.grade_or_honors}</span>
                  </div>
                )}

                {edu.description && (
                  <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {sortedEducation.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No education records found.</p>
          </div>
        )}

      </div>
    </section>
  );
};
