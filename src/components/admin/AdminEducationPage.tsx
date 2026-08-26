import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Education } from '../../types';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Plus, Edit2, Trash2, GraduationCap, Calendar, MapPin, Award, X } from 'lucide-react';

export const AdminEducationPage: React.FC = () => {
  const { education, addEducation, updateEducation, deleteEducation, isSaving } = useCV();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    institution: '',
    qualification: '',
    field_of_study: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    grade_or_honors: '',
    description: '',
    order_index: education.length + 1
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      institution: '',
      qualification: 'Bachelor of Science',
      field_of_study: '',
      location: 'Nairobi, Kenya',
      start_date: '',
      end_date: '',
      is_current: false,
      grade_or_honors: '',
      description: '',
      order_index: education.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      institution: edu.institution,
      qualification: edu.qualification,
      field_of_study: edu.field_of_study,
      location: edu.location || '',
      start_date: edu.start_date,
      end_date: edu.end_date || '',
      is_current: edu.is_current,
      grade_or_honors: edu.grade_or_honors || '',
      description: edu.description || '',
      order_index: edu.order_index
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateEducation(editingId, formData);
    } else {
      await addEducation(formData);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteEducation(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div id="admin-education-page" className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Education & Qualifications</h1>
          <p className="text-xs text-slate-400 mt-1">Manage degrees, universities, honors, and coursework.</p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map(edu => (
          <div
            key={edu.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-base font-bold text-white">
                  {edu.qualification} in {edu.field_of_study}
                </h3>
              </div>

              <div className="text-xs font-semibold text-blue-400 mb-2">
                {edu.institution}
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  {edu.start_date} – {edu.is_current ? 'Present' : edu.end_date}
                </span>
                {edu.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {edu.location}
                  </span>
                )}
              </div>

              {edu.grade_or_honors && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs mb-3 border border-emerald-500/20">
                  <Award className="w-3 h-3 text-emerald-400" />
                  <span>{edu.grade_or_honors}</span>
                </div>
              )}

              {edu.description && (
                <p className="text-xs text-slate-300 leading-relaxed">{edu.description}</p>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => openEditModal(edu)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeleteTargetId(edu.id)}
                className="px-3 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 text-xs font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {education.length === 0 && (
        <div className="text-center py-12 bg-slate-900 rounded-2xl border border-dashed border-slate-800">
          <p className="text-slate-400 text-sm">No education records found.</p>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingId ? 'Edit Education' : 'Add Education Record'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Institution / University *</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={e => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g. University of Nairobi"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Qualification / Degree *</label>
                  <input
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Field of Study *</label>
                  <input
                    type="text"
                    required
                    value={formData.field_of_study}
                    onChange={e => setFormData({ ...formData, field_of_study: e.target.value })}
                    placeholder="e.g. Applied Statistics / Economics"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={formData.start_date}
                    onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                    placeholder="e.g. 2020"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="text"
                    value={formData.end_date}
                    onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Honors / Grade</label>
                <input
                  type="text"
                  value={formData.grade_or_honors}
                  onChange={e => setFormData({ ...formData, grade_or_honors: e.target.value })}
                  placeholder="e.g. First Class Honours / Second Class Upper"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Coursework Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Relevant courses: Database Systems, Quantitative Analysis..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40 resize-none"
                />
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
                  {isSaving ? 'Saving...' : editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Education Record"
        message="Are you sure you want to delete this education record?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
