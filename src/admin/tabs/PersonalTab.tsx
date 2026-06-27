import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save } from 'lucide-react';

const inp = "w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-500">{hint}</p>}
  </div>
);

export const PersonalTab: React.FC = () => {
  const { data, save } = usePortfolio();
  const [form, setForm] = useState(data.personal);
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof form, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    save({ ...data, personal: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Personal Info</h2>
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${saved ? 'bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}>
          <Save className="w-4 h-4" />{saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Photo Preview */}
      <div className="flex items-center gap-4 bg-gray-800 rounded-xl p-4 border border-gray-700">
        <img src={form.photoUrl} alt="preview" className="w-20 h-20 rounded-xl object-cover border-2 border-gray-600" onError={e => (e.currentTarget.src = 'https://via.placeholder.com/80')} />
        <div className="flex-1">
          <Field label="Profile Photo URL" hint="Paste any image URL, or use /photo.jpg if you put a file in the public/ folder">
            <input className={inp} value={form.photoUrl} onChange={e => set('photoUrl', e.target.value)} placeholder="https://... or /photo.jpg" />
          </Field>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-4">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Identity</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name"><input className={inp} value={form.firstName} onChange={e => set('firstName', e.target.value)} /></Field>
          <Field label="Last Name"><input className={inp} value={form.lastName} onChange={e => set('lastName', e.target.value)} /></Field>
        </div>
        <Field label="Tagline">
          <input className={inp} value={form.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Full-Stack Developer & ..." />
        </Field>
        <Field label="Short Description (Hero section)">
          <textarea className={`${inp} resize-none`} rows={2} value={form.description} onChange={e => set('description', e.target.value)} />
        </Field>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-4">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">About Bio (3 paragraphs)</h3>
        {(['bio1', 'bio2', 'bio3'] as const).map((k, i) => (
          <Field key={k} label={`Paragraph ${i + 1}`}>
            <textarea className={`${inp} resize-none`} rows={3} value={form[k]} onChange={e => set(k, e.target.value)} />
          </Field>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-4">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Links & Contact</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email"><input className={inp} value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" /></Field>
          <Field label="Location"><input className={inp} value={form.location} onChange={e => set('location', e.target.value)} placeholder="City, Country" /></Field>
          <Field label="GitHub URL"><input className={inp} value={form.github} onChange={e => set('github', e.target.value)} placeholder="https://github.com/..." /></Field>
          <Field label="LinkedIn URL"><input className={inp} value={form.linkedin} onChange={e => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." /></Field>
          <Field label="Education"><input className={inp} value={form.education} onChange={e => set('education', e.target.value)} placeholder="B.Tech CSE" /></Field>
          <Field label="Experience Level"><input className={inp} value={form.experienceLevel} onChange={e => set('experienceLevel', e.target.value)} placeholder="Fresh Graduate" /></Field>
        </div>
        <Field label="📄 Resume URL" hint="Paste a Google Drive share link (set to Anyone with link → Viewer) OR upload resume.pdf to the public/ folder and type /resume.pdf">
          <div className="flex gap-2">
            <input
              className={inp}
              value={form.resumeUrl}
              onChange={e => set('resumeUrl', e.target.value)}
              placeholder="https://drive.google.com/file/d/YOUR_ID/view  OR  /resume.pdf"
            />
            {form.resumeUrl && (
              <a
                href={form.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Test ↗
              </a>
            )}
          </div>
        </Field>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="available" checked={form.availableForWork} onChange={e => set('availableForWork', e.target.checked)}
            className="w-4 h-4 accent-indigo-500" />
          <label htmlFor="available" className="text-sm text-gray-300">Show "Available for Internships" badge</label>
        </div>
      </div>
    </div>
  );
};
