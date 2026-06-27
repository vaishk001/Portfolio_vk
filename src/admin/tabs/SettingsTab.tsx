import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, RotateCcw, ExternalLink, Key } from 'lucide-react';

const inp = "w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

export const SettingsTab: React.FC = () => {
  const { resetToDefaults, changePassword } = usePortfolio();
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [resetConfirm, setResetConfirm] = useState(false);

  const handlePwChange = () => {
    if (!newPw) { setPwMsg('Password cannot be empty.'); return; }
    if (newPw !== confirmPw) { setPwMsg('Passwords do not match.'); return; }
    changePassword(newPw);
    setNewPw(''); setConfirmPw('');
    setPwMsg('✅ Password changed successfully!');
    setTimeout(() => setPwMsg(''), 3000);
  };

  const handleReset = () => {
    if (!resetConfirm) { setResetConfirm(true); return; }
    resetToDefaults();
    setResetConfirm(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-xl font-bold text-white">Settings</h2>

      {/* Change Password */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Key className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Change Admin Password</h3>
        </div>
        <div className="space-y-3">
          <input type="password" className={inp} value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password" />
          <input type="password" className={inp} value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Confirm new password" />
          {pwMsg && <p className={`text-sm ${pwMsg.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>{pwMsg}</p>}
          <button onClick={handlePwChange}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            <Save className="w-4 h-4" /> Update Password
          </button>
        </div>
      </div>

      {/* Preview Portfolio */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <ExternalLink className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Preview Portfolio</h3>
        </div>
        <p className="text-gray-400 text-sm">Open the portfolio in a new tab to see your changes live.</p>
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <ExternalLink className="w-4 h-4" /> Open Portfolio
        </a>
      </div>

      {/* Reset to Defaults */}
      <div className="bg-gray-800 rounded-xl border border-red-900/50 p-5 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <RotateCcw className="w-4 h-4 text-red-400" />
          <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider">Danger Zone</h3>
        </div>
        <p className="text-gray-400 text-sm">This will delete all your customizations and restore default portfolio content.</p>
        <button onClick={handleReset}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${resetConfirm ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-red-400'}`}>
          <RotateCcw className="w-4 h-4" />
          {resetConfirm ? 'Click again to confirm reset' : 'Reset to Defaults'}
        </button>
        {resetConfirm && (
          <button onClick={() => setResetConfirm(false)} className="text-gray-500 text-xs hover:text-gray-400 transition-colors">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
