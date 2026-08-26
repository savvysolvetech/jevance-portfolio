import React from 'react';
import { useCV } from '../../context/CVContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCV();

  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-container" 
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4"
    >
      {toasts.map(toast => {
        let bgClass = 'bg-slate-900 border-slate-700 text-slate-100';
        let Icon = Info;
        let iconColor = 'text-blue-400';

        if (toast.type === 'success') {
          bgClass = 'bg-slate-900/95 dark:bg-slate-900/95 border-emerald-500/40 text-slate-100 shadow-lg shadow-emerald-950/30';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
        } else if (toast.type === 'error') {
          bgClass = 'bg-slate-900/95 dark:bg-slate-900/95 border-rose-500/40 text-slate-100 shadow-lg shadow-rose-950/30';
          Icon = XCircle;
          iconColor = 'text-rose-400';
        } else if (toast.type === 'warning') {
          bgClass = 'bg-slate-900/95 dark:bg-slate-900/95 border-amber-500/40 text-slate-100 shadow-lg shadow-amber-950/30';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else {
          bgClass = 'bg-slate-900/95 dark:bg-slate-900/95 border-blue-500/40 text-slate-100 shadow-lg shadow-blue-950/30';
          Icon = Info;
          iconColor = 'text-blue-400';
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${bgClass}`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
              <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
            </div>
            <button
              id={`close-toast-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/60 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
