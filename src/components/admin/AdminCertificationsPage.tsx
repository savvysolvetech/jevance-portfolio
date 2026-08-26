import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Certification } from '../../types';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Plus, Edit2, Trash2, Award, ExternalLink, Calendar, X, ImagePlus, Link2, Upload } from 'lucide-react';

export const AdminCertificationsPage: React.FC = () => {
  const { certifications, addCertification, updateCertification, deleteCertification, isSaving } = useCV();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [imageTab, setImageTab] = useState<'url' | 'upload'>('url');
  const [imageUploadError, setImageUploadError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    credential_id: '',
    credential_url: '',
    image_url: '',
    order_index: certifications.length + 1
  });

  const openAddModal = () => {
    setEditingId(null);
    setImageTab('url');
    setImageUploadError('');
    setFormData({
      name: '',
      issuer: 'Microsoft',
      date: '2025',
      credential_id: '',
      credential_url: '',
      image_url: '',
      order_index: certifications.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (cert: Certification) => {
    setEditingId(cert.id);
    setImageTab(cert.image_url?.startsWith('data:') ? 'upload' : 'url');
    setImageUploadError('');
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      credential_id: cert.credential_id || '',
      credential_url: cert.credential_url || '',
      image_url: cert.image_url || '',
      order_index: cert.order_index
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateCertification(editingId, formData);
    } else {
      await addCertification(formData);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteCertification(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div id="admin-certifications-page" className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Certifications &amp; Accreditations</h1>
          <p className="text-xs text-slate-400 mt-1">Manage verified credentials, certifications, and certificate images.</p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map(cert => (
          <div
            key={cert.id}
            className="rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between overflow-hidden"
          >
            {/* Certificate image thumbnail */}
            {cert.image_url ? (
              <div className="relative w-full h-36 bg-slate-950">
                <img
                  src={cert.image_url}
                  alt={`${cert.name} certificate`}
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-20 bg-slate-950/50 border-b border-slate-800">
                <Award className="w-8 h-8 text-slate-700" />
              </div>
            )}

            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-400" />
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1">{cert.name}</h3>
                <p className="text-xs font-semibold text-blue-400 mb-2">{cert.issuer}</p>

                {cert.credential_id && (
                  <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded-lg truncate">
                    ID: {cert.credential_id}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                {cert.credential_url ? (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Verify</span>
                  </a>
                ) : <span />}

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(cert)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(cert.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-rose-400 hover:bg-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {certifications.length === 0 && (
        <div className="text-center py-12 bg-slate-900 rounded-2xl border border-dashed border-slate-800">
          <p className="text-slate-400 text-sm">No certifications listed.</p>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingId ? 'Edit Certification' : 'Add Certification'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Certification Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Microsoft Certified: Power BI Data Analyst Associate"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Issuing Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.issuer}
                  onChange={e => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="e.g. Microsoft / Google / Cisco"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date Issued *</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g. 2025-11 or 2025"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  value={formData.credential_id}
                  onChange={e => setFormData({ ...formData, credential_id: e.target.value })}
                  placeholder="e.g. PL-300-88492"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Verification URL (Optional)</label>
                <input
                  type="url"
                  value={formData.credential_url}
                  onChange={e => setFormData({ ...formData, credential_url: e.target.value })}
                  placeholder="https://learn.microsoft.com/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              {/* Certificate Image — URL or Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Certificate Image (Optional)</label>
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
                    placeholder="https://example.com/certificate.jpg"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500/40"
                  />
                ) : (
                  <div>
                    <label
                      htmlFor="cert-img-upload"
                      className="flex flex-col items-center justify-center gap-2 w-full h-24 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 hover:border-emerald-500/50 cursor-pointer transition-colors"
                    >
                      <ImagePlus className="w-6 h-6 text-slate-400" />
                      <span className="text-xs text-slate-400">Click to select certificate image (PNG, JPG, WEBP)</span>
                      <input
                        id="cert-img-upload"
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
                      alt="Certificate preview"
                      className="w-full h-32 object-cover rounded-xl border border-slate-700"
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
        title="Delete Certification"
        message="Are you sure you want to delete this certification?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
