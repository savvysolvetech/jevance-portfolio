import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Achievement } from '../../types';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Plus, Edit2, Trash2, Trophy, Sparkles, X } from 'lucide-react';

export const AdminAchievementsPage: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement, isSaving } = useCV();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    issuer_or_org: '',
    date: '',
    order_index: achievements.length + 1
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      issuer_or_org: '',
      date: '2025',
      order_index: achievements.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (ach: Achievement) => {
    setEditingId(ach.id);
    setFormData({
      title: ach.title,
      description: ach.description,
      issuer_or_org: ach.issuer_or_org || '',
      date: ach.date,
      order_index: ach.order_index
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateAchievement(editingId, formData);
    } else {
      await addAchievement(formData);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteAchievement(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div id="admin-achievements-page" className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Honors & Achievements</h1>
          <p className="text-xs text-slate-400 mt-1">Manage performance awards, hackathons, and corporate recognitions.</p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map(ach => (
          <div
            key={ach.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">{ach.title}</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">{ach.date}</span>
              </div>

              {ach.issuer_or_org && (
                <div className="text-xs font-semibold text-blue-400 mb-2">
                  {ach.issuer_or_org}
                </div>
              )}

              <p className="text-xs text-slate-300 leading-relaxed">
                {ach.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => openEditModal(ach)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeleteTargetId(ach.id)}
                className="px-3 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 text-xs font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-12 bg-slate-900 rounded-2xl border border-dashed border-slate-800">
          <p className="text-slate-400 text-sm">No achievements recorded.</p>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingId ? 'Edit Achievement' : 'Add Achievement'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Achievement Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Employee of the Quarter (Q3 2025)"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Issuer</label>
                <input
                  type="text"
                  value={formData.issuer_or_org}
                  onChange={e => setFormData({ ...formData, issuer_or_org: e.target.value })}
                  placeholder="e.g. Apex Logistics Solutions"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date *</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g. 2025"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Recognized for architecting automated reconciliation pipeline..."
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
        title="Delete Achievement"
        message="Are you sure you want to delete this achievement record?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
