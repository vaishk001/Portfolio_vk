import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import type { Job, Certification, Achievement } from '../../data/defaults';

const genId = () => `e_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`;
const inp = "w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

export const ExperienceTab: React.FC = () => {
  const { data, save } = usePortfolio();
  const [jobs, setJobs] = useState<Job[]>(data.experience.jobs);
  const [certs, setCerts] = useState<Certification[]>(data.experience.certifications);
  const [achievements, setAchievements] = useState<Achievement[]>(data.experience.achievements);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const cleanJobs = jobs.map(j => ({
      ...j,
      responsibilities: j.responsibilities.map(s => s.trim()).filter(Boolean),
      technologies: j.technologies.map(s => s.trim()).filter(Boolean),
    }));
    save({ ...data, experience: { jobs: cleanJobs, certifications: certs, achievements } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const SaveBtn = () => (
    <button onClick={handleSave}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${saved ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-500'} text-white`}>
      <Save className="w-4 h-4" />{saved ? 'Saved!' : 'Save All'}
    </button>
  );

  // ── Jobs ──────────────────────────────────────────────────────
  const addJob = () => setJobs(j => [...j, { id: genId(), title: '', company: '', duration: '', location: '', responsibilities: [], technologies: [] }]);
  const updateJob = (id: string, k: keyof Job, v: unknown) => setJobs(j => j.map(x => x.id === id ? { ...x, [k]: v } : x));
  const updateJobList = (id: string, k: 'responsibilities' | 'technologies', raw: string) =>
    updateJob(id, k, raw.split('\n'));

  // ── Certs ─────────────────────────────────────────────────────
  const addCert = () => setCerts(c => [...c, { id: genId(), title: '', issuer: '', date: '', credential: null }]);
  const updateCert = (id: string, k: keyof Certification, v: unknown) => setCerts(c => c.map(x => x.id === id ? { ...x, [k]: v } : x));

  // ── Achievements ──────────────────────────────────────────────
  const addAch = () => setAchievements(a => [...a, { id: genId(), title: '', description: '', icon: 'award' }]);
  const updateAch = (id: string, k: keyof Achievement, v: unknown) => setAchievements(a => a.map(x => x.id === id ? { ...x, [k]: v } : x));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Experience & Achievements</h2>
        <SaveBtn />
      </div>

      {/* Jobs */}
      <Section title="Work Experience" onAdd={addJob}>
        {jobs.map(j => (
          <div key={j.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-3">
            <div className="flex justify-end"><button onClick={() => setJobs(js => js.filter(x => x.id !== j.id))} className="text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Job Title"><input className={inp} value={j.title} onChange={e => updateJob(j.id, 'title', e.target.value)} /></Field>
              <Field label="Company"><input className={inp} value={j.company} onChange={e => updateJob(j.id, 'company', e.target.value)} /></Field>
              <Field label="Duration"><input className={inp} value={j.duration} onChange={e => updateJob(j.id, 'duration', e.target.value)} placeholder="June 2024 - Aug 2024" /></Field>
              <Field label="Location"><input className={inp} value={j.location} onChange={e => updateJob(j.id, 'location', e.target.value)} placeholder="Remote" /></Field>
            </div>
            <Field label="Responsibilities (one per line)">
              <textarea
                className={`${inp} resize-y min-h-[100px]`}
                rows={Math.max(4, j.responsibilities.length + 1)}
                value={j.responsibilities.join('\n')}
                onChange={e => updateJobList(j.id, 'responsibilities', e.target.value)}
                placeholder={"Developed responsive web apps using React\nOptimized database queries by 30%\nParticipated in code reviews"}
              />
              <p className="text-xs text-gray-600 mt-1">↵ Press Enter to add next responsibility</p>
            </Field>
            <Field label="Technologies (one per line)">
              <textarea
                className={`${inp} resize-y min-h-[80px]`}
                rows={Math.max(3, j.technologies.length + 1)}
                value={j.technologies.join('\n')}
                onChange={e => updateJobList(j.id, 'technologies', e.target.value)}
                placeholder={"React\nNode.js\nMongoDB"}
              />
              <p className="text-xs text-gray-600 mt-1">↵ Press Enter to add next technology</p>
            </Field>
          </div>
        ))}
        {jobs.length === 0 && <Empty text="No jobs yet" />}
      </Section>

      {/* Certifications */}
      <Section title="Certifications" onAdd={addCert}>
        {certs.map(c => (
          <div key={c.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-3">
            <div className="flex justify-end"><button onClick={() => setCerts(cs => cs.filter(x => x.id !== c.id))} className="text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"><input className={inp} value={c.title} onChange={e => updateCert(c.id, 'title', e.target.value)} /></Field>
              <Field label="Issuer"><input className={inp} value={c.issuer} onChange={e => updateCert(c.id, 'issuer', e.target.value)} /></Field>
              <Field label="Date"><input className={inp} value={c.date} onChange={e => updateCert(c.id, 'date', e.target.value)} placeholder="2024" /></Field>
              <Field label="Credential ID (optional)"><input className={inp} value={c.credential ?? ''} onChange={e => updateCert(c.id, 'credential', e.target.value || null)} /></Field>
            </div>
          </div>
        ))}
        {certs.length === 0 && <Empty text="No certifications yet" />}
      </Section>

      {/* Achievements */}
      <Section title="Achievements & Leadership" onAdd={addAch}>
        {achievements.map(a => (
          <div key={a.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-3">
            <div className="flex justify-end"><button onClick={() => setAchievements(as => as.filter(x => x.id !== a.id))} className="text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"><input className={inp} value={a.title} onChange={e => updateAch(a.id, 'title', e.target.value)} /></Field>
              <Field label="Icon">
                <select className={inp} value={a.icon} onChange={e => updateAch(a.id, 'icon', e.target.value)}>
                  <option value="award">🏆 Award</option>
                  <option value="graduation">🎓 Graduation</option>
                  <option value="briefcase">💼 Briefcase</option>
                </select>
              </Field>
            </div>
            <Field label="Description">
              <textarea className={`${inp} resize-none`} rows={2} value={a.description} onChange={e => updateAch(a.id, 'description', e.target.value)} />
            </Field>
          </div>
        ))}
        {achievements.length === 0 && <Empty text="No achievements yet" />}
      </Section>
    </div>
  );
};

const Section: React.FC<{ title: string; onAdd: () => void; children: React.ReactNode }> = ({ title, onAdd, children }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h3 className="text-base font-semibold text-gray-300">{title}</h3>
      <button onClick={onAdd} className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
        <Plus className="w-3.5 h-3.5" /> Add
      </button>
    </div>
    {children}
  </div>
);

const Empty: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-gray-600 text-sm text-center py-4">{text}</p>
);
