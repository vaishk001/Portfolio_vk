import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../context/supabase';
import { Trash2, Mail, Calendar, User, Clock, Inbox } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export const MessagesTab: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error: fetchErr } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchErr) {
          // If the table doesn't exist yet, we guide the user to create it
          if (fetchErr.code === '42P01' || fetchErr.message.includes('does not exist')) {
            setError('table_missing');
          } else {
            throw fetchErr;
          }
        } else {
          setMessages(data || []);
        }
      } else {
        // LocalStorage fallback
        const raw = localStorage.getItem('vk_contact_messages');
        setMessages(raw ? JSON.parse(raw) : []);
      }
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      if (isSupabaseConfigured && supabase) {
        const { error: delErr } = await supabase
          .from('contact_messages')
          .delete()
          .eq('id', id);

        if (delErr) throw delErr;
      }

      // Update local state (works for both Supabase and localStorage fallback)
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      
      if (!isSupabaseConfigured || !supabase) {
        localStorage.setItem('vk_contact_messages', JSON.stringify(updated));
      }
    } catch (err: any) {
      console.error('Error deleting message:', err);
      alert('Failed to delete message: ' + (err.message || err));
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + 
             d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm font-mono">Fetching messages...</p>
      </div>
    );
  }

  if (error === 'table_missing') {
    return (
      <div className="bg-gray-800 border border-yellow-600/30 rounded-xl p-6 space-y-4 max-w-2xl">
        <h3 className="text-lg font-bold text-yellow-400">Database Setup Required</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          The Supabase connection is active, but the <code className="bg-gray-950 px-1.5 py-0.5 rounded text-indigo-300 text-xs">contact_messages</code> table does not exist in your database yet.
        </p>
        <p className="text-gray-400 text-sm">
          Please run the following SQL statement in your <strong>Supabase Dashboard &gt; SQL Editor</strong> to initialize the table:
        </p>
        <pre className="bg-gray-950 p-4 rounded-lg text-xs text-gray-300 font-mono overflow-x-auto border border-gray-800 leading-5">
{`-- Create contact_messages table
create table public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.contact_messages enable row level security;

-- Create policy to allow anonymous inserts (anyone can send a message)
create policy "Allow anonymous inserts" on public.contact_messages
  for insert with check (true);

-- Create policy to allow authenticated users to view/delete messages (admin only)
create policy "Allow admin select" on public.contact_messages
  for select using (auth.role() = 'authenticated');

create policy "Allow admin delete" on public.contact_messages
  for delete using (auth.role() = 'authenticated');`}
        </pre>
        <button 
          onClick={fetchMessages}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Check Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Inbox Messages</h2>
          <p className="text-xs text-gray-500 mt-1">Read and manage inquiries received from your portfolio</p>
        </div>
        <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs px-2.5 py-1 rounded-full font-mono font-semibold">
          {messages.length} received
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-900/40 rounded-2xl border border-gray-800/80">
          <Inbox className="w-10 h-10 text-gray-600 mb-3" />
          <p className="text-gray-400 text-sm font-semibold">Your inbox is empty</p>
          <p className="text-gray-600 text-xs mt-1">Messages sent through your contact form will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700/80 transition-all space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/20 px-2 py-0.5 rounded">
                    {msg.subject}
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-sm font-semibold text-white">{msg.name}</span>
                    <span className="text-gray-600 text-xs">•</span>
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <a href={`mailto:${msg.email}`} className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline">{msg.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(msg.created_at)}</span>
                  </div>
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors p-1"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-950/40 border border-white/5 rounded-lg p-3 text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
