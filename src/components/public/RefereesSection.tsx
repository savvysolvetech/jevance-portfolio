import React from 'react';
import { useCV } from '../../context/CVContext';
import { UserCheck, Mail, Phone, Building2, Shield, Lock } from 'lucide-react';

export const RefereesSection: React.FC = () => {
  const { referees } = useCV();

  // Only display referees marked as public
  const publicReferees = referees.filter(r => r.is_public);

  return (
    <section id="referees" className="py-16 md:py-24 border-t border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Professional Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Professional Referees
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mt-3" />
        </div>

        {publicReferees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicReferees.map(ref => (
              <div
                key={ref.id}
                id={`referee-card-${ref.id}`}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:border-blue-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                      {ref.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {ref.name}
                      </h3>
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {ref.position}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="font-medium text-slate-700 dark:text-slate-200">{ref.company}</span>
                    </div>
                    
                    {ref.relationship && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                        Relation: {ref.relationship}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <a
                    href={`mailto:${ref.email}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                    <span className="truncate">{ref.email}</span>
                  </a>
                  <a
                    href={`tel:${ref.phone}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                    <span>{ref.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-xl mx-auto">
            <Shield className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              References Available Upon Request
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Professional and academic referees are kept confidential to protect contact privacy. Full contact details are readily provided during the formal interview process.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Request References
            </a>
          </div>
        )}

      </div>
    </section>
  );
};
