import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Project } from '../../types';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Plus, Edit2, Trash2, FolderGit2, ExternalLink, Github, Star, X, ImagePlus, Link2, Upload } from 'lucide-react';

export const AdminProjectsPage: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, isSaving } = useCV();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [imageTab, setImageTab] = useState<'url' | 'upload'>('url');
  const [imageUploadError, setImageUploadError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    live_url: '',
    github_url: '',
    image_url: '',
    is_featured: true,
    order_index: projects.length + 1
  });

  const [techList, setTechList] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');

  const [metricsList, setMetricsList] = useState<string[]>([]);
  const [newMetric, setNewMetric] = useState('');

  const openAddModal = () => {
    setEditingId(null);
    setImageTab('url');
    setImageUploadError('');
    setFormData({
      title: '',
      description: '',
      live_url: '',
      github_url: '',
      image_url: '',
      is_featured: true,
      order_index: projects.length + 1
    });
    setTechList([]);
    setMetricsList([]);
    setModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingId(proj.id);
    setImageTab(proj.image_url?.startsWith('data:') ? 'upload' : 'url');
    setImageUploadError('');
    setFormData({
      title: proj.title,
      description: proj.description,
      live_url: proj.live_url || '',
      github_url: proj.github_url || '',
      image_url: proj.image_url || '',
      is_featured: proj.is_featured,
      order_index: proj.order_index
    });
    setTechList(proj.technologies || []);
    setMetricsList(proj.metrics || []);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: techList,
      metrics: metricsList
    };

    if (editingId) {
      await updateProject(editingId, payload);
    } else {
      await addProject(payload);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteProject(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div id="admin-projects-page" className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects & Portfolio Case Studies</h1>
          <p className="text-xs text-slate-400 mt-1">Manage public case studies, metrics, GitHub links, and live demos.</p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(proj => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{proj.title}</h3>
                  {proj.is_featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                {proj.description}
              </p>

              {proj.technologies && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {proj.github_url && (
                  <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white text-xs flex items-center gap-1">
                    <Github className="w-3.5 h-3.5" />
                    <span>Repo</span>
                  </a>
                )}
                {proj.live_url && (
                  <a href={proj.live_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(proj)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(proj.id)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-rose-400 hover:bg-slate-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 bg-slate-900 rounded-2xl border border-dashed border-slate-800">
          <p className="text-slate-400 text-sm">No projects listed. Click "Add New Project" to create one.</p>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sales Pipeline Intelligence Dashboard"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Overview & Impact *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe problem, data pipeline, tools used, and business outcome..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40 resize-none"
                />
              </div>

              {/* Image — URL or Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Project Cover Image</label>
                <div className="flex mb-3">
                  <button
                    type="button"
                    onClick={() => setImageTab('url')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-l-xl border transition-colors ${
                      imageTab === 'url'
                        ? 'bg-blue-600/10 border-blue-500/40 text-blue-300'
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    Public URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('upload')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-r-xl border-t border-r border-b transition-colors ${
                      imageTab === 'upload'
                        ? 'bg-emerald-600/10 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload File
                  </button>
                </div>

                {imageTab === 'url' ? (
                  <input
                    type="url"
                    value={formData.image_url.startsWith('data:') ? '' : formData.image_url}
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/project-screenshot.png"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                ) : (
                  <div>
                    <label
                      htmlFor="proj-img-upload"
                      className="flex flex-col items-center justify-center gap-2 w-full h-24 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 hover:border-emerald-500/50 cursor-pointer transition-colors"
                    >
                      <ImagePlus className="w-6 h-6 text-slate-400" />
                      <span className="text-xs text-slate-400">Click to select image (PNG, JPG, WEBP)</span>
                      <input
                        id="proj-img-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 5 * 1024 * 1024) {
                            setImageUploadError('Image must be under 5 MB.');
                            return;
                          }
                          setImageUploadError('');
                          const reader = new FileReader();
                          reader.onload = ev => {
                            setFormData(f => ({ ...f, image_url: ev.target?.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                    {imageUploadError && (
                      <p className="mt-1 text-xs text-rose-400">{imageUploadError}</p>
                    )}
                  </div>
                )}

                {/* Preview */}
                {formData.image_url && (
                  <div className="mt-3 relative group">
                    <img
                      src={formData.image_url}
                      alt="Project preview"
                      className="w-full h-28 object-cover rounded-xl border border-slate-700"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, image_url: '' }))}
                      className="absolute top-2 right-2 p-1 rounded-lg bg-slate-900/80 text-rose-400 hover:text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo / Dashboard URL</label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={e => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub / Code Repository URL</label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies & Tools</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTech}
                    onChange={e => setNewTech(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newTech.trim()) {
                          setTechList([...techList, newTech.trim()]);
                          setNewTech('');
                        }
                      }
                    }}
                    placeholder="e.g. Power BI, DAX, PostgreSQL..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newTech.trim()) {
                        setTechList([...techList, newTech.trim()]);
                        setNewTech('');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techList.map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-xs text-slate-200">
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => setTechList(techList.filter((_, idx) => idx !== i))}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-700"
                  />
                  <span>Feature on public homepage highlights</span>
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
                  {isSaving ? 'Saving...' : editingId ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Project"
        message="Are you sure you want to remove this project case study?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
