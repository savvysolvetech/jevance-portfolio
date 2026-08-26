import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useAuth } from '../../context/AuthContext';

import { ConfirmDialog } from '../ui/ConfirmDialog';
import { 
  Database, 
  Cloud, 
  HardDrive, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  RotateCcw, 
  ShieldCheck, 
  ExternalLink, 
  Code,
  FileCode,
  Info,
  Server
} from 'lucide-react';

const FIRESTORE_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to all collections
    // Only allow authenticated admin users to write
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`;

export const AdminSettingsPage: React.FC = () => {
  const { exportDataAsJSON, importDataFromJSON, resetToDefaultData, showToast } = useCV();
  const { isFirebaseLive, user } = useAuth();

  const [copiedRules, setCopiedRules] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [importFileInput, setImportFileInput] = useState<HTMLInputElement | null>(null);

  const handleCopyRules = () => {
    navigator.clipboard.writeText(FIRESTORE_RULES);
    setCopiedRules(true);
    showToast('Firestore Rules copied to clipboard!', 'success');
    setTimeout(() => setCopiedRules(false), 2500);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jevance_ochieng_cv_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Database backup downloaded successfully.');
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const res = await importDataFromJSON(text);
        if (typeof res === 'boolean') {
          if (res) {
            showToast('Data imported successfully into your CV database!', 'success');
          } else {
            showToast('Failed to import JSON.', 'error');
          }
        } else if (res && typeof res === 'object') {
          if (res.success) {
            showToast('Data imported successfully into your CV database!', 'success');
          } else {
            showToast(res.error || 'Failed to import JSON.', 'error');
          }
        }
      } catch (err: any) {
        showToast('Invalid JSON file format.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div id="admin-settings-page" className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold text-white">Database, Storage & Environment Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure Firebase Firestore backend, view security rules, export backups, and manage offline storage.
        </p>
      </div>

      {/* Connection Mode Status */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${isFirebaseLive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-blue-500/15 text-blue-400'}`}>
              {isFirebaseLive ? <Cloud className="w-6 h-6" /> : <HardDrive className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isFirebaseLive ? 'Firebase Cloud Database Connected' : 'Local Storage Engine Active'}
              </h2>
              <p className="text-xs text-slate-400">
                {isFirebaseLive 
                  ? 'All changes synchronize live to your Firebase Firestore cloud database.' 
                  : 'Currently operating in browser local persistence mode. Ready for one-click Firebase cloud migration.'}
              </p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
            isFirebaseLive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
          }`}>
            {isFirebaseLive ? 'LIVE CLOUD' : 'STANDALONE'}
          </span>
        </div>

        {/* Firebase Environment Variables Checklist */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-mono text-slate-300">VITE_FIREBASE_API_KEY</span>
            <span className={`font-semibold ${import.meta.env.VITE_FIREBASE_API_KEY ? 'text-emerald-400' : 'text-slate-500'}`}>
              {import.meta.env.VITE_FIREBASE_API_KEY ? 'Configured' : 'Optional (Fallback Active)'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-mono text-slate-300">VITE_FIREBASE_PROJECT_ID</span>
            <span className={`font-semibold ${import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'text-emerald-400' : 'text-slate-500'}`}>
              {import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Configured' : 'Optional (Fallback Active)'}
            </span>
          </div>
        </div>
      </div>

      {/* Complete Step-by-Step Firebase Setup Guide & Schema */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-400" />
              <span>Firebase Firestore Security Rules</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Copy and deploy these Firestore security rules in your Firebase project.
            </p>
          </div>

          <button
            onClick={handleCopyRules}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-semibold shadow-sm transition-all"
          >
            {copiedRules ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedRules ? 'Copied Rules!' : 'Copy Security Rules'}</span>
          </button>
        </div>

        {/* SQL Code Preview Block */}
        <div className="relative rounded-xl bg-slate-950 border border-slate-800 overflow-hidden max-h-64 overflow-y-auto p-4">
          <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
            {FIRESTORE_RULES}
          </pre>
        </div>

        {/* Step by Step instructions */}
        <div className="pt-2 space-y-2 text-xs text-slate-300">
          <h3 className="font-bold text-white text-sm">To connect your live Firebase database:</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1">
            <li>Create a project at <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Firebase Console</a>.</li>
            <li>Enable <strong>Firestore Database</strong> and <strong>Authentication</strong> (Email/Password).</li>
            <li>In the Firestore <strong>Rules</strong> tab, paste the rules above and publish.</li>
            <li>Register a web app in your project settings to get the Firebase config.</li>
            <li>Add the config values to your environment secrets or `.env` (e.g., <code className="text-blue-300 font-mono">VITE_FIREBASE_API_KEY</code>).</li>
          </ol>
        </div>
      </div>

      {/* Data Backup & Restore */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-400" />
          <span>JSON Database Backup & Restore</span>
        </h2>
        <p className="text-xs text-slate-400">
          Export your entire CV portfolio data as a portable JSON backup file, or restore from a previous backup.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleDownloadBackup}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Export JSON Database Backup</span>
          </button>

          <button
            onClick={() => importFileInput?.click()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Import JSON Backup File</span>
          </button>
          <input
            ref={el => setImportFileInput(el)}
            type="file"
            accept=".json,application/json"
            onChange={e => e.target.files?.[0] && handleImportFile(e.target.files[0])}
            className="hidden"
          />
        </div>
      </div>

      {/* Danger Zone: Reset to Initial Defaults */}
      <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4">
        <h2 className="text-base font-bold text-rose-400 flex items-center gap-2">
          <RotateCcw className="w-5 h-5" />
          <span>Reset to Default Seed Data</span>
        </h2>
        <p className="text-xs text-slate-300">
          Reset all CV sections, sample projects, experiences, and certifications back to Jevance Ochieng's default baseline profile.
        </p>

        <div>
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-semibold border border-rose-500/30 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Data to Defaults</span>
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={resetConfirmOpen}
        title="Reset Data to Defaults"
        message="Are you sure you want to reset all CV portfolio sections to their initial default records? Any custom additions will be overwritten."
        confirmText="Yes, Reset to Defaults"
        onConfirm={async () => {
          await resetToDefaultData();
          setResetConfirmOpen(false);
        }}
        onCancel={() => setResetConfirmOpen(false)}
      />

    </div>
  );
};
