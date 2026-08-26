import React from 'react';
import { useCV } from '../../context/CVContext';
import { Trophy, Calendar, Sparkles } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { achievements } = useCV();

  const sortedAchievements = [...achievements].sort((a, b) => a.order_index - b.order_index);

  return (
    <section id="achievements" className="py-16 md:py-24 border-t border-slate-200/70 dark:border-slate-800/70 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Key Achievements
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedAchievements.map(ach => (
            <div
              key={ach.id}
              id={`achievement-card-${ach.id}`}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:border-blue-500/40 transition-colors flex items-start gap-4"
            >
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {ach.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {ach.date}
                  </span>
                </div>
                {ach.issuer_or_org && (
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {ach.issuer_or_org}
                  </div>
                )}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {sortedAchievements.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No achievements currently recorded.</p>
          </div>
        )}

      </div>
    </section>
  );
};
