import React, { useState, useRef } from 'react';
import { useCV } from '../../context/CVContext';
import { ResumeDocument } from '../../types';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  HardDrive,
  FileCheck,
  Sparkles
} from 'lucide-react';

export const AdminResumePage: React.FC = () => {
  const { resumeDocuments, activeDocument, uploadResumeDocument, setActiveResumeDocument, deleteResumeDocument, isSaving, showToast } = useCV();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragOver, setDragOver] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please upload a valid PDF document file (.pdf).', 'error');
      return;
    }

    // Limit to ~10MB
    if (file.size > 10 * 1024 * 1024) {
      showToast('File size exceeds 10MB limit. Please compress the PDF before uploading.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      const sizeFormatted = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;

      await uploadResumeDocument({
        name: file.name.replace(/\.pdf$/i, ''),
        file_name: file.name,
        file_url: base64,
        file_type: 'application/pdf',
        file_size: sizeFormatted,
        raw_base64: base64,
        is_active: true
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDownload = (doc: ResumeDocument) => {
    if (doc.raw_base64) {
      const link = document.createElement('a');
      link.href = doc.raw_base64;
      link.download = doc.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Downloaded ${doc.file_name}`);
    } else {
      window.open('/download-cv', '_blank');
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteResumeDocument(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div id="admin-resume-page" className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">PDF Resume Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload and activate your latest CV PDF file. The public "Download CV" button automatically serves the active file.
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New PDF</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          className="hidden"
        />
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer ${
          dragOver
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-blue-600/15 text-blue-400 flex items-center justify-center mx-auto mb-4">
          <Upload className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-white mb-1">
          Drag & drop your updated PDF CV here
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
          Support for standard PDF documents up to 10MB. Uploading automatically sets it as the active download for visitors.
        </p>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700">
          <FileText className="w-3.5 h-3.5 text-blue-400" />
          <span>Browse Files from Computer</span>
        </span>
      </div>

      {/* Currently Active Resume Card */}
      {activeDocument && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400">
                <FileCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Active Public Document</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">{activeDocument.file_name}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-1">
                  <span>Size: {activeDocument.file_size || '245 KB'}</span>
                  <span>•</span>
                  <span>Uploaded: {new Date(activeDocument.uploaded_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload(activeDocument)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Test Download</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document History & Uploaded Versions */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center justify-between">
          <span>Uploaded PDF Document Versions</span>
          <span className="text-xs font-mono text-slate-400 font-normal">{resumeDocuments.length} files</span>
        </h2>

        <div className="divide-y divide-slate-800">
          {resumeDocuments.map(doc => (
            <div key={doc.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${doc.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>{doc.file_name}</span>
                    {doc.is_active && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {doc.file_size} • {new Date(doc.uploaded_at).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {!doc.is_active && (
                  <button
                    onClick={() => setActiveResumeDocument(doc.id)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold border border-blue-500/30 transition-colors"
                  >
                    Set as Active
                  </button>
                )}

                <button
                  onClick={() => handleDownload(doc)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteTargetId(doc.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                  title="Delete File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {resumeDocuments.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No custom PDF documents stored yet. The public site uses the dynamic live CV generator until you upload one.
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Resume File"
        message="Are you sure you want to delete this PDF resume version from storage?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
