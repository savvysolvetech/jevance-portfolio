import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Skill, SkillProficiency } from '../../types';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Plus, Edit2, Trash2, Code2, X, Tag, Settings2, ChevronDown, ChevronUp } from 'lucide-react';

const DEFAULT_CATEGORIES = [
  'Environmental, Health & Safety (EHS)',
  'Waste & Recycling Operations',
  'Environmental Policy & Compliance',
  'Data & Database Management',
  'Tools & Operations',
  'Other'
];

const proficiencies: SkillProficiency[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const AdminSkillsPage: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill, isSaving } = useCV();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Dynamic categories state
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [showCatManager, setShowCatManager] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');
  const [catToDelete, setCatToDelete] = useState<string | null>(null);

  const addCategory = () => {
    const trimmed = newCatInput.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories(prev => [...prev, trimmed]);
    setNewCatInput('');
  };

  const removeCategory = (cat: string) => {
    setCategories(prev => prev.filter(c => c !== cat));
    setCatToDelete(null);
  };

  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    proficiency: SkillProficiency;
    is_featured: boolean;
    order_index: number;
  }>({
    name: '',
    category: categories[0] || 'Other',
    proficiency: 'Advanced',
    is_featured: true,
    order_index: skills.length + 1
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: categories[0] || 'Other',
      proficiency: 'Advanced',
      is_featured: true,
      order_index: skills.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      is_featured: skill.is_featured,
      order_index: skill.order_index
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      await updateSkill(editingId, formData);
    } else {
      await addSkill(formData);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteSkill(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const allDisplayCategories = categories.filter(c => skills.some(s => s.category === c));

  return (
    <div id="admin-skills-page" className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills &amp; Tools Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, or remove technical skills. Changes update the public CV immediately.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCatManager(v => !v)}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              showCatManager
                ? 'bg-violet-600/10 border-violet-500/40 text-violet-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
            }`}
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Manage Categories</span>
            {showCatManager ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
          </button>
        </div>
      </div>

      {/* Category Manager Panel */}
      {showCatManager && (
        <div className="p-5 rounded-2xl bg-violet-950/20 border border-violet-500/20 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-violet-500/10">
            <Tag className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-violet-300">Skill Category Manager</h3>
            <span className="ml-auto text-xs text-slate-400 font-mono">{categories.length} categories</span>
          </div>

          {/* Add new category */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newCatInput}
              onChange={e => setNewCatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCategory(); } }}
              placeholder="e.g. Machine Learning, Cloud Platforms, Soft Skills..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-violet-500/20 text-white text-sm focus:ring-2 focus:ring-violet-500/30 placeholder-slate-500"
            />
            <button
              type="button"
              onClick={addCategory}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>

          {/* Current categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              const count = skills.filter(s => s.category === cat).length;
              return (
                <div
                  key={cat}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs"
                >
                  <Code2 className="w-3 h-3 text-violet-400" />
                  <span className="text-slate-200 font-medium">{cat}</span>
                  <span className="text-slate-500 font-mono">({count})</span>
                  <button
                    type="button"
                    onClick={() => setCatToDelete(cat)}
                    title={`Delete category "${cat}"`}
                    className="text-slate-500 hover:text-rose-400 transition-colors ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
            {categories.length === 0 && (
              <p className="text-xs text-slate-500 italic">No categories yet. Add one above.</p>
            )}
          </div>
        </div>
      )}

      {/* Grouped Skills by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allDisplayCategories.map(cat => {
          const categorySkills = skills.filter(s => s.category === cat);
          if (categorySkills.length === 0) return null;

          return (
            <div key={cat} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>{cat}</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {categorySkills.length}
                </span>
              </div>

              <div className="space-y-2">
                {categorySkills.map(skill => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <span>{skill.name}</span>
                        {skill.is_featured && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" title="Featured Key Skill" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {skill.proficiency}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(skill)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800"
                        title="Edit Skill"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(skill.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12 bg-slate-900 rounded-2xl border border-dashed border-slate-800">
          <p className="text-slate-400 text-sm">No skills recorded. Click "Add New Skill" to create one.</p>
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. PostgreSQL or Power BI"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category *
                </label>
                {categories.length > 0 ? (
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300">
                    No categories yet — close this modal and add categories first using "Manage Categories".
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Proficiency Level *
                </label>
                <select
                  value={formData.proficiency}
                  onChange={e => setFormData({ ...formData, proficiency: e.target.value as SkillProficiency })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                >
                  {proficiencies.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-700"
                  />
                  <span>Mark as Featured Key Skill on Hero / Resume</span>
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
                  disabled={isSaving || categories.length === 0}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : editingId ? 'Update Skill' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Skill Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Skill"
        message="Are you sure you want to remove this skill from your CV?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Delete Category Confirmation */}
      <ConfirmDialog
        isOpen={!!catToDelete}
        title={`Delete Category`}
        message={`Are you sure you want to delete the "${catToDelete}" category? Skills already using this category will keep their label, but it will no longer appear in the dropdown for new skills.`}
        onConfirm={() => catToDelete && removeCategory(catToDelete)}
        onCancel={() => setCatToDelete(null)}
      />

    </div>
  );
};
