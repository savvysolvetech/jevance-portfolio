import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCV } from '../../context/CVContext';
import { 
  Download, 
  Printer, 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Calendar,
  Sparkles,
  Award,
  BookOpen,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DownloadCVView: React.FC = () => {
  const { 
    profile, 
    experience, 
    education, 
    skills, 
    projects, 
    certifications, 
    referees, 
    activeDocument,
    showToast 
  } = useCV();

  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadActiveCV = () => {
    setDownloading(true);

    try {
      // Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      if (activeDocument?.raw_base64) {
        // Direct download of administrator uploaded PDF file
        const link = document.createElement('a');
        link.href = activeDocument.raw_base64;
        link.download = activeDocument.file_name || `${profile.name.replace(/\s+/g, '_')}_CV.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Active PDF Resume downloaded successfully!');
      } else {
        // Trigger browser native print/save as PDF dialog for the pixel-perfect CV
        setTimeout(() => {
          window.print();
          showToast('Print / Save as PDF prompt opened.');
        }, 300);
      }
    } catch (e) {
      window.print();
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  const publicReferees = referees.filter(r => r.is_public);

  return (
    <div id="download-cv-page" className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Action Bar (hidden in print) */}
      <div className="max-w-4xl mx-auto mb-8 no-print">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              id="download-active-cv-btn"
              onClick={handleDownloadActiveCV}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 active:scale-98 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing File...' : 'Download Active CV'}</span>
            </button>
          </div>
        </div>

        {activeDocument && (
          <div className="mt-3 flex items-center justify-between px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-mono">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              Active file: {activeDocument.file_name} ({activeDocument.file_size || '245 KB'})
            </span>
            <span>Uploaded: {new Date(activeDocument.uploaded_at).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Printable / Viewable High Resolution CV Paper */}
      <div 
        id="cv-paper-container" 
        className="max-w-4xl mx-auto bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-8 sm:p-12 print:p-0 print:border-none print:shadow-none"
      >
        
        {/* CV Header */}
        <header className="border-b-2 border-slate-900 pb-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-950">
                {profile.name}
              </h1>
              <p className="text-base font-bold text-blue-700 mt-1 tracking-wide">
                {profile.professional_title}
              </p>
            </div>
            
            <div className="text-xs text-slate-600 space-y-1 font-mono text-left sm:text-right">
              {profile.email && <div className="flex sm:justify-end items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-600" /> {profile.email}</div>}
              {profile.phone && <div className="flex sm:justify-end items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-blue-600" /> {profile.phone}</div>}
              {profile.location && <div className="flex sm:justify-end items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-600" /> {profile.location}</div>}
              {profile.linkedin && <div className="flex sm:justify-end items-center gap-1.5"><Linkedin className="w-3.5 h-3.5 text-blue-600" /> {profile.linkedin}</div>}
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-8">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b border-slate-200 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed font-normal">
            {profile.career_summary}
          </p>
        </section>

        {/* Technical & Core Skills */}
        <section className="mb-8">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b border-slate-200 pb-1 mb-3">
            Technical & Analytical Core Competencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {skills.map(s => (
              <div key={s.id} className="flex items-center justify-between border-b border-slate-100 py-1">
                <span className="font-semibold text-slate-800">{s.name}</span>
                <span className="text-slate-500 font-mono text-[11px]">{s.proficiency}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-8">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b border-slate-200 pb-1 mb-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map(exp => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <span className="text-sm font-bold text-slate-950">{exp.position}</span>
                    <span className="text-slate-600 font-semibold text-xs ml-2">@ {exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}
                  </span>
                </div>

                {exp.description && (
                  <p className="text-xs text-slate-700 leading-relaxed">{exp.description}</p>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                    {exp.responsibilities.map((r, idx) => (
                      <li key={idx} className="leading-relaxed">{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Education */}
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b border-slate-200 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.qualification} in {edu.field_of_study}</div>
                  <div className="text-blue-700 font-semibold">{edu.institution}</div>
                  <div className="text-slate-500 font-mono mt-0.5">{edu.start_date} – {edu.end_date}</div>
                  {edu.grade_or_honors && <div className="text-slate-600 font-medium mt-1">{edu.grade_or_honors}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b border-slate-200 pb-1 mb-3">
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map(cert => (
                <div key={cert.id} className="text-xs">
                  <div className="font-bold text-slate-900">{cert.name}</div>
                  <div className="text-slate-600">{cert.issuer} • <span className="font-mono">{cert.date}</span></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Referees */}
        {publicReferees.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b border-slate-200 pb-1 mb-3">
              Referees
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {publicReferees.map(ref => (
                <div key={ref.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">{ref.name}</div>
                  <div className="text-slate-600 font-medium">{ref.position} - {ref.company}</div>
                  <div className="text-slate-500 font-mono mt-1">{ref.email} | {ref.phone}</div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
