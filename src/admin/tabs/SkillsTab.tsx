import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import type { SkillCategory } from '../../data/defaults';

const genId = () => `s_${Date.now()}`;
const inp = "w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

const COLORS = [
  { label: 'Blue', value: 'text-blue-500' },
  { label: 'Green', value: 'text-green-500' },
  { label: 'Purple', value: 'text-purple-500' },
  { label: 'Orange', value: 'text-orange-500' },
  { label: 'Red', value: 'text-red-500' },
  { label: 'Cyan', value: 'text-cyan-500' },
  { label: 'Yellow', value: 'text-yellow-500' },
  { label: 'Pink', value: 'text-pink-500' },
];

export const SkillsTab: React.FC = () => {
  const { data, save } = usePortfolio();
  const [cats, setCats] = useState<SkillCategory[]>(data.skills);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    save({ ...data, skills: cats });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addCat = () =>
    setCats(cs => [...cs, { id: genId(), title: 'New Category', color: 'text-blue-500', skills: [] }]);

  const removeCat = (id: string) => setCats(cs => cs.filter(c => c.id !== id));

  const updateCat = (id: string, field: keyof SkillCategory, val: unknown) =>
    setCats(cs => cs.map(c => c.id === id ? { ...c, [field]: val } : c));

  const addSkill = (id: string) =>
    setCats(cs => cs.map(c => c.id === id ? { ...c, skills: [...c.skills, ''] } : c));

  const updateSkill = (catId: string, idx: number, val: string) =>
    setCats(cs => cs.map(c => c.id === catId
      ? { ...c, skills: c.skills.map((s, i) => i === idx ? val : s) }
      : c));

  const removeSkill = (catId: string, idx: number) =>
    setCats(cs => cs.map(c => c.id === catId
      ? { ...c, skills: c.skills.filter((_, i) => i !== idx) }
      : c));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Skills</h2>
        <div className="flex gap-2">
          <button onClick={addCat}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Category
          </button>
          <button onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${saved ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-500'} text-white`}>
            <Save className="w-4 h-4" />{saved ? 'Saved!' : 'Save All'}
          </button>
        </div>
      </div>

      {cats.map(cat => (
        <div key={cat.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <GripVertical className="w-4 h-4 text-gray-600" />
            <input className={`${inp} flex-1`} value={cat.title}
              onChange={e => updateCat(cat.id, 'title', e.target.value)} placeholder="Category name" />
            <select className={`${inp} w-36`} value={cat.color}
              onChange={e => updateCat(cat.id, 'color', e.target.value)}>
              {COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <button onClick={() => removeCat(cat.id)} className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pl-7">
            {cat.skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2">
                <input className={`${inp} flex-1`} value={skill}
                  onChange={e => updateSkill(cat.id, i, e.target.value)} placeholder="Skill name" />
                <button onClick={() => removeSkill(cat.id, i)} className="text-gray-600 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button onClick={() => addSkill(cat.id)}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm transition-colors col-span-2 justify-start">
              <Plus className="w-3.5 h-3.5" /> Add skill
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
