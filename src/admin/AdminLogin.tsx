import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { isSupabaseConfigured } from '../context/supabase';

interface Props { onLogin: () => void; }

export const AdminLogin: React.FC<Props> = ({ onLogin }) => {
  const { checkPassword } = usePortfolio();
  const [email, setEmail] = useState('vnkumavat05@gmail.com');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      const success = await checkPassword(pw, isSupabaseConfigured ? email : undefined);
      if (success) {
        onLogin();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
      setPw('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">VK Studio</h1>
          <p className="text-gray-400 text-sm mt-1">Secret Admin Panel</p>
        </div>
        <form onSubmit={submit} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-4">
          
          {isSupabaseConfigured && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="email@example.com"
                disabled={loading}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-55"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {isSupabaseConfigured ? 'Password' : 'Admin Password'}
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setError(''); }}
                placeholder="Enter password"
                autoFocus={!isSupabaseConfigured}
                disabled={loading}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-55"
              />
              <button type="button" onClick={() => setShow(!show)} disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          
          <button type="submit" disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Enter Studio'
            )}
          </button>
          {!isSupabaseConfigured && (
            <p className="text-gray-500 text-xs text-center">Local Mode (Default: VK@2025)</p>
          )}
        </form>
      </div>
    </div>
  );
};

