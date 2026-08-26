import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Referee } from '../../types';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Plus, Edit2, Trash2, Eye, EyeOff, Mail, Phone, Building2, UserCheck, Shield, X } from 'lucide-react';

export const AdminRefereesPage: React.FC = () => {
  const { referees, addReferee, updateReferee, deleteReferee, isSaving } = useCV();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    email: '',
    phone: '',
    relationship: '',
    is_public: false,
    order_index: referees.length + 1
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      position: '',
      company: '',
      email: '',
      phone: '',
      relationship: '',
      is_public: false,
      order_index: referees.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (ref: Referee) => {
    setEditingId(ref.id);
    setFormData({
      name: ref.name,
      position: ref.position,
      company: ref.company,
      email: ref.email,
      phone: ref.phone,
      relationship: ref.relationship || '',
      is_public: ref.is_public,
      order_index: ref.order_index
    });
    setModalOpen(true);
  };

  const toggleVisibility = async (ref: Referee) => {
    await updateReferee(ref.id, {
      is_public: !ref.is_public
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateReferee(editingId, formData);
    } else {
      await addReferee(formData);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteReferee(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div id="admin-referees-page" className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Professional Referees</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your professional referees and choose whether each referee is visible on the public website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Referee</span>
        </button>
      </div>

      {/* Privacy Guidance Notice */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-start gap-3">
        <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-400" />
        <div>
          <span className="font-bold text-white">Privacy Control: </span>
          Use the <strong className="text-blue-200">"Public Display" toggle</strong> on any referee card below to hide sensitive contact details from unverified web crawlers, or keep them securely stored in your private database until you choose to reveal them.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {referees.map(ref => (
          <div
            key={ref.id}
            className={`p-6 rounded-2xl bg-slate-900 border transition-all flex flex-col justify-between ${
              ref.is_public ? 'border-slate-800' : 'border-slate-800/60 opacity-90'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                    {ref.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{ref.name}</h3>
                    <p className="text-xs text-blue-400 font-medium">{ref.position}</p>
                  </div>
                </div>

                {/* Visibility Toggle Button */}
                <button
                  onClick={() => toggleVisibility(ref)}
                  className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                    ref.is_public
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                  title={ref.is_public ? 'Visible on Public Website. Click to Hide.' : 'Hidden from Public Website. Click to Make Public.'}
                >
                  {ref.is_public ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span className="text-[10px]">{ref.is_public ? 'Public' : 'Hidden'}</span>
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400 my-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-300 font-medium">{ref.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">{ref.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{ref.phone}</span>
                </div>
              </div>

              {ref.relationship && (
                <div className="text-[11px] text-slate-500 italic">
                  Relation: {ref.relationship}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => openEditModal(ref)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeleteTargetId(ref.id)}
                className="px-3 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 text-xs font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {referees.length === 0 && (
        <div className="text-center py-12 bg-slate-900 rounded-2xl border border-dashed border-slate-800">
          <p className="text-slate-400 text-sm">No referees recorded.</p>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingId ? 'Edit Referee' : 'Add New Referee'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Jane Kamau"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Position / Title *</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g. Head of Data & Analytics"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Apex Logistics Solutions"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="referee@company.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 711 000 000"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Relationship</label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={e => setFormData({ ...formData, relationship: e.target.value })}
                  placeholder="e.g. Former Direct Supervisor"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_public}
                    onChange={e => setFormData({ ...formData, is_public: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-700"
                  />
                  <span>Display this referee publicly on the website</span>
                </label>
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
        title="Delete Referee"
        message="Are you sure you want to remove this referee record?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
