import React, { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { PersonalTab } from './tabs/PersonalTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { SkillsTab } from './tabs/SkillsTab';
import { ExperienceTab } from './tabs/ExperienceTab';
import { SettingsTab } from './tabs/SettingsTab';
import { usePortfolio } from '../context/PortfolioContext';
import { User, FolderGit2, Wrench, Briefcase, Settings, LogOut, ChevronRight } from 'lucide-react';

type Tab = 'personal' | 'projects' | 'skills' | 'experience' | 'settings';

const NAV: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'personal',   label: 'Personal Info',  icon: <User className="w-4 h-4" /> },
  { id: 'projects',   label: 'Projects',        icon: <FolderGit2 className="w-4 h-4" /> },
  { id: 'skills',     label: 'Skills',          icon: <Wrench className="w-4 h-4" /> },
  { id: 'experience', label: 'Experience',      icon: <Briefcase className="w-4 h-4" /> },
  { id: 'settings',   label: 'Settings',        icon: <Settings className="w-4 h-4" /> },
];

export const AdminPage: React.FC = () => {
  const { user, logout } = usePortfolio();
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>('personal');

  const isAuthorized = user !== null || loggedIn;

  if (!isAuthorized) return <AdminLogin onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-gray-950 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-800">
          <p className="text-lg font-bold text-white">VK <span className="text-indigo-400">Studio</span></p>
          <p className="text-xs text-gray-500 mt-0.5">Portfolio Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === n.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}>
              {n.icon}
              {n.label}
              {tab === n.id && <ChevronRight className="w-3 h-3 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-800">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all mb-1">
            <ChevronRight className="w-4 h-4" /> View Portfolio
          </a>
          <button onClick={() => { logout(); setLoggedIn(false); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-gray-800 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {tab === 'personal'   && <PersonalTab />}
          {tab === 'projects'   && <ProjectsTab />}
          {tab === 'skills'     && <SkillsTab />}
          {tab === 'experience' && <ExperienceTab />}
          {tab === 'settings'   && <SettingsTab />}
        </div>
      </main>
    </div>
  );
};
