import React, { useRef, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import type { Project } from '../../data/defaults';

const genId = () => `p_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

const emptyProject = (): Project => ({
  id: genId(), title: '', description: '', techStack: [], features: [],
  github: '', live: '', category: 'Full-Stack', image: '', images: [],
});

const PRESET_CATEGORIES = ['Full-Stack', 'Backend', 'Cybersecurity', 'Mobile', 'ML / AI', 'Other'];

/* ── Image Uploader sub-component ── */
interface ImageUploaderProps {
  projectId: string;
  images: string[];
  onChange: (imgs: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ projectId, images, onChange }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { uploadAsset } = usePortfolio();

  const readFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (!file.type.startsWith('image/')) {
          alert(`File "${file.name}" is not an image.`);
          return null;
        }
        return await uploadAsset(file);
      });

      const urls = await Promise.all(uploadPromises);
      const validUrls = urls.filter((url): url is string => url !== null);
      if (validUrls.length > 0) {
        onChange([...images, ...validUrls]);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => {
    const next = images.filter((_, i) => i !== idx);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer ${
          dragging
            ? 'border-indigo-400 bg-indigo-900/20'
            : 'border-gray-600 hover:border-gray-500 bg-gray-900/50'
        } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
        onClick={() => !uploading && fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!uploading) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!uploading) readFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={fileRef}
          id={`img-upload-${projectId}`}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(e) => readFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center justify-center py-2">
            <Loader2 className="w-6 h-6 text-indigo-400 animate-spin mb-2" />
            <p className="text-sm text-indigo-400 font-medium">Uploading images to cloud...</p>
          </div>
        ) : (
          <>
            <Upload className="w-6 h-6 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-400">
              <span className="text-indigo-400 font-medium">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs text-gray-600 mt-1">PNG, JPG, GIF, WebP — multiple allowed</p>
          </>
        )}
      </div>

      {/* Thumbnails grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((src, idx) => (
            <div key={idx} className="relative group aspect-video rounded-lg overflow-hidden border border-gray-700">
              <img src={src} alt={`preview ${idx + 1}`} className="w-full h-full object-cover" />
              {/* Order badge */}
              <span className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                {idx + 1}
              </span>
              {/* Delete button */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-500 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !uploading && (
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <ImageIcon className="w-3.5 h-3.5" />
          No images uploaded yet — the carousel will show a placeholder
        </div>
      )}
    </div>
  );
};

/* ── Main Tab ── */
export const ProjectsTab: React.FC = () => {
  const { data, save } = usePortfolio();
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Track which projects are using a custom (non-preset) category
  const [customCategories, setCustomCategories] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    data.projects.forEach(p => {
      if (!PRESET_CATEGORIES.includes(p.category)) {
        map[p.id] = p.category;
      }
    });
    return map;
  });

  const update = (id: string, field: keyof Project, val: unknown) =>
    setProjects(ps => ps.map(p => p.id === id ? { ...p, [field]: val } : p));

  const updateList = (id: string, field: 'techStack' | 'features', raw: string) =>
    update(id, field, raw.split('\n'));

  const addProject = () => {
    const p = emptyProject();
    setProjects(ps => [...ps, p]);
    setExpanded(p.id);
  };

  const remove = (id: string) => setProjects(ps => ps.filter(p => p.id !== id));

  const handleSave = () => {
    const cleaned = projects.map(p => ({
      ...p,
      techStack: p.techStack.map(s => s.trim()).filter(Boolean),
      features: p.features.map(s => s.trim()).filter(Boolean),
    }));
    save({ ...data, projects: cleaned });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Projects</h2>
        <div className="flex gap-2">
          <button onClick={addProject}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Project
          </button>
          <button onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${saved ? 'bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}>
            <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save All'}
          </button>
        </div>
      </div>

      {projects.map(p => (
        <div key={p.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
            <div className="flex items-center gap-3">
              {/* First uploaded image as mini-preview */}
              {(p.images?.[0] || p.image) ? (
                <img
                  src={p.images?.[0] || p.image}
                  alt=""
                  className="w-9 h-9 rounded-lg object-cover border border-gray-600 flex-shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-gray-700 border border-gray-600 flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-4 h-4 text-gray-500" />
                </div>
              )}
              <span className="text-white font-medium">{p.title || 'Untitled Project'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-indigo-400 bg-indigo-900/40 px-2 py-0.5 rounded-full">{p.category}</span>
              {p.images && p.images.length > 0 && (
                <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded-full">
                  {p.images.length} img{p.images.length !== 1 ? 's' : ''}
                </span>
              )}
              <button onClick={e => { e.stopPropagation(); remove(p.id); }}
                className="text-gray-500 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
              {expanded === p.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>
          </div>

          {expanded === p.id && (
            <div className="border-t border-gray-700 p-4 grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Title">
                  <input className={inp} value={p.title} onChange={e => update(p.id, 'title', e.target.value)} placeholder="My Awesome Project" />
                </Field>
                <Field label="Category">
                  <select
                    className={inp}
                    value={customCategories[p.id] !== undefined ? 'Other' : p.category}
                    onChange={e => {
                      const val = e.target.value;
                      if (val === 'Other') {
                        setCustomCategories(prev => ({ ...prev, [p.id]: '' }));
                        update(p.id, 'category', '');
                      } else {
                        setCustomCategories(prev => {
                          const next = { ...prev };
                          delete next[p.id];
                          return next;
                        });
                        update(p.id, 'category', val);
                      }
                    }}
                  >
                    {PRESET_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  {customCategories[p.id] !== undefined && (
                    <input
                      className={`${inp} mt-2`}
                      value={customCategories[p.id]}
                      onChange={e => {
                        const val = e.target.value;
                        setCustomCategories(prev => ({ ...prev, [p.id]: val }));
                        update(p.id, 'category', val);
                      }}
                      placeholder="e.g. Cybersecurity + AI"
                      autoFocus
                    />
                  )}
                </Field>
              </div>

              <Field label="Description">
                <textarea className={`${inp} resize-none`} rows={2} value={p.description}
                  onChange={e => update(p.id, 'description', e.target.value)} placeholder="What does this project do?" />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="GitHub URL">
                  <input className={inp} value={p.github} onChange={e => update(p.id, 'github', e.target.value)} placeholder="https://github.com/..." />
                </Field>
                <Field label="Live URL (optional)">
                  <input className={inp} value={p.live ?? ''} onChange={e => update(p.id, 'live', e.target.value || null)} placeholder="https://..." />
                </Field>
              </div>

              {/* ── Multi-Image Upload ── */}
              <Field label={`Project Images (${p.images?.length ?? 0} uploaded — slides automatically)`}>
                <ImageUploader
                  projectId={p.id}
                  images={p.images ?? []}
                  onChange={(imgs) => update(p.id, 'images', imgs)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Tech Stack (one per line)">
                  <textarea className={`${inp} resize-none`} rows={4} value={p.techStack.join('\n')}
                    onChange={e => updateList(p.id, 'techStack', e.target.value)} placeholder={"React\nNode.js\nMongoDB"} />
                </Field>
                <Field label="Features (one per line)">
                  <textarea className={`${inp} resize-none`} rows={4} value={p.features.join('\n')}
                    onChange={e => updateList(p.id, 'features', e.target.value)} placeholder={"User auth\nSearch & filter"} />
                </Field>
              </div>
            </div>
          )}
        </div>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500">No projects yet. Click "Add Project" to start.</div>
      )}
    </div>
  );
};

const inp = "w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);
