import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Experience } from '../../types';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Plus, Edit2, Trash2, Calendar, MapPin, Tag, Trophy, X } from 'lucide-react';

export const AdminExperiencePage: React.FC = () => {
  const { experience, addExperience, updateExperience, deleteExperience, isSaving } = useCV();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    order_index: 0
  });

  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [newResp, setNewResp] = useState('');

  const [achievements, setAchievements] = useState<string[]>([]);
  const [newAch, setNewAch] = useState('');

  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      company: '',
      position: '',
      location: 'Nairobi, Kenya',
      start_date: '',
      end_date: 'Present',
      is_current: false,
      description: '',
      order_index: experience.length + 1
    });
    setResponsibilities([]);
    setAchievements([]);
    setTechnologies([]);
    setModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData({
      company: exp.company,
      position: exp.position,
      location: exp.location || '',
      start_date: exp.start_date,
      end_date: exp.end_date || '',
      is_current: exp.is_current,
      description: exp.description || '',
      order_index: exp.order_index
    });
    setResponsibilities(exp.responsibilities || []);
    setAchievements(exp.achievements || []);
    setTechnologies(exp.technologies || []);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      responsibilities,
      achievements,
      technologies
    };

    if (editingId) {
      await updateExperience(editingId, payload);
    } else {
      await addExperience(payload);
    }

    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteExperience(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div id="admin-experience-page" className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Work Experience Management</h1>
          <p className="text-xs text-slate-400 mt-1">Add, update, or remove career milestones and measurable achievements.</p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Experience</span>
        </button>
      </div>

      {/* Experience List Cards */}
      <div className="space-y-4">
        {experience.map(exp => (
          <div
            key={exp.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row justify-between gap-6"
          >
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-white">{exp.position}</h3>
                <span className="text-blue-400 font-semibold text-sm">@ {exp.company}</span>
                {exp.is_current && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Current Position
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}
                </span>
                {exp.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                )}
              </div>

              {exp.description && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{exp.description}</p>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex md:flex-col justify-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
              <button
                onClick={() => openEditModal(exp)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => setDeleteTargetId(exp.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 text-xs font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}

        {experience.length === 0 && (
          <div className="text-center py-12 bg-slate-900 rounded-2xl border border-dashed border-slate-800">
            <p className="text-slate-400 text-sm">No work experience records found. Click "Add New Experience" to create one.</p>
          </div>
        )}
      </div>

      {/* Experience Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingId ? 'Edit Work Experience' : 'Add New Work Experience'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Logistics"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Position / Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={e => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g. Data Analyst"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Nairobi, Kenya"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.start_date}
                    onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                    placeholder="e.g. 2024-03 or Jan 2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="text"
                    disabled={formData.is_current}
                    value={formData.is_current ? 'Present' : formData.end_date}
                    onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                    placeholder="e.g. 2026-01 or Present"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.is_current}
                      onChange={e => setFormData({ ...formData, is_current: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-700"
                    />
                    <span>I currently work here</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Overview Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of scope..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40 resize-none"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Key Responsibilities</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newResp}
                    onChange={e => setNewResp(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newResp.trim()) {
                          setResponsibilities([...responsibilities, newResp.trim()]);
                          setNewResp('');
                        }
                      }
                    }}
                    placeholder="Type responsibility and press Enter..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newResp.trim()) {
                        setResponsibilities([...responsibilities, newResp.trim()]);
                        setNewResp('');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5">
                  {responsibilities.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-slate-950 rounded-lg text-xs text-slate-300">
                      <span>• {r}</span>
                      <button
                        type="button"
                        onClick={() => setResponsibilities(responsibilities.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 ml-2"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
                  <Trophy className="w-3.5 h-3.5" />
                  Key Achievements
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newAch}
                    onChange={e => setNewAch(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newAch.trim()) {
                          setAchievements([...achievements, newAch.trim()]);
                          setNewAch('');
                        }
                      }
                    }}
                    placeholder="e.g. Reduced costs by 20% through process automation..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-amber-500/20 text-white text-xs focus:ring-2 focus:ring-amber-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newAch.trim()) {
                        setAchievements([...achievements, newAch.trim()]);
                        setNewAch('');
                      }
                    }}
                    className="px-3 py-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5">
                  {achievements.map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-amber-500/5 border border-amber-500/10 rounded-lg text-xs text-amber-200">
                      <span className="flex items-center gap-1.5"><Trophy className="w-3 h-3 text-amber-400 shrink-0" />{a}</span>
                      <button
                        type="button"
                        onClick={() => setAchievements(achievements.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 ml-2 shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies Used (Tags)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTech}
                    onChange={e => setNewTech(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newTech.trim()) {
                          setTechnologies([...technologies, newTech.trim()]);
                          setNewTech('');
                        }
                      }
                    }}
                    placeholder="e.g. PostgreSQL, Power BI..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newTech.trim()) {
                        setTechnologies([...technologies, newTech.trim()]);
                        setNewTech('');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {technologies.map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-xs text-slate-200">
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => setTechnologies(technologies.filter((_, idx) => idx !== i))}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20"
                >
                  {isSaving ? 'Saving...' : editingId ? 'Update Record' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Work Experience"
        message="Are you sure you want to delete this experience record? This action will immediately remove it from your live public CV."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
