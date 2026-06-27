import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultData } from '../data/defaults';
import type { PortfolioData } from '../data/defaults';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'vk_portfolio_v1';
const PASSWORD_KEY = 'vk_admin_pass';
const DEFAULT_PASSWORD = 'VK@2025';

function loadData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultData, ...JSON.parse(raw) };
  } catch {}
  return defaultData;
}

interface PortfolioContextType {
  data: PortfolioData;
  save: (next: PortfolioData) => Promise<boolean>;
  resetToDefaults: () => void;
  checkPassword: (pw: string, email?: string) => Promise<boolean>;
  changePassword: (pw: string) => Promise<void> | void;
  uploadAsset: (file: File) => Promise<string>;
  loading: boolean;
  user: any;
  logout: () => Promise<void>;
}

const Ctx = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(loadData);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [user, setUser] = useState<any>(null);

  // Monitor Supabase Auth Session
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // 1. Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });

      // 2. Listen to changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  // Fetch portfolio data from Supabase on mount
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      setLoading(true);
      supabase
        .from('portfolio_state')
        .select('data')
        .eq('id', 'single_portfolio')
        .single()
        .then(({ data: row, error }) => {
          if (row && row.data) {
            setData({ ...defaultData, ...row.data });
          } else if (error && error.code !== 'PGRST116') {
            // PGRST116 is standard Postgres code for '0 rows returned'
            console.error('Error fetching from Supabase:', error);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch from Supabase:', err);
          setLoading(false);
        });
    }
  }, []);

  const save = async (next: PortfolioData) => {
    setData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('portfolio_state')
          .upsert({
            id: 'single_portfolio',
            data: next,
            updated_at: new Date().toISOString(),
          });

        if (error) {
          console.error('Error saving to Supabase:', error);
          alert('Error saving to Cloud Database: ' + error.message);
          return false;
        }
      } catch (err: any) {
        console.error('Failed to save to Supabase:', err);
        alert('Error saving to Cloud Database: ' + err.message);
        return false;
      }
    }
    return true;
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  };

  const checkPassword = async (pw: string, email?: string) => {
    if (isSupabaseConfigured && supabase) {
      const loginEmail = email || 'vnkumavat05@gmail.com';
      const { data: res, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: pw,
      });

      if (error) {
        console.error('Supabase Auth error:', error.message);
        throw new Error(error.message);
      }

      setUser(res.user);
      return true;
    } else {
      // Local fallback
      const stored = localStorage.getItem(PASSWORD_KEY) ?? DEFAULT_PASSWORD;
      if (pw === stored) {
        setUser({ email: 'local-admin@vk-studio.local' }); // mock user session
        return true;
      }
      throw new Error('Wrong password. Try again.');
    }
  };

  const changePassword = async (pw: string) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.updateUser({ password: pw });
      if (error) {
        console.error('Supabase Password change error:', error.message);
        throw new Error(error.message);
      }
    } else {
      localStorage.setItem(PASSWORD_KEY, pw);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const uploadAsset = async (file: File): Promise<string> => {
    if (!isSupabaseConfigured || !supabase) {
      // Local fallback: read file as Base64 data URL
      return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) return reject('Not an image');
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 6)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Supabase Storage upload error:', error);
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err: any) {
      console.error('Upload failed:', err);
      throw new Error(err.message || 'File upload failed');
    }
  };

  return (
    <Ctx.Provider
      value={{
        data,
        save,
        resetToDefaults,
        checkPassword,
        changePassword,
        uploadAsset,
        loading,
        user,
        logout,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePortfolio must be inside PortfolioProvider');
  return ctx;
};

