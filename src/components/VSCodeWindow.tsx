import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const VSCodeWindow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ts' | 'json' | 'sh'>('ts');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(1000px) rotateX(${-y / 30}deg) rotateY(${x / 30}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      className="glass rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col font-mono text-xs w-full text-left"
      style={{
        transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
        willChange: 'transform',
        boxShadow: '0 20px 50px rgba(124, 58, 237, 0.1)'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Window Controls Header */}
      <div className="bg-gray-950/80 px-4 py-3 border-b border-white/5 flex items-center justify-between select-none">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer" />
        </div>
        <div className="text-gray-500 text-[11px] font-sans font-medium">Visual Studio Code</div>
        <div className="w-12" /> {/* spacer to balance */}
      </div>

      {/* Tabs list */}
      <div className="bg-gray-900/60 border-b border-white/5 flex text-gray-500 text-[11px]">
        <button
          onClick={() => setActiveTab('ts')}
          className={`px-4 py-2 border-r border-white/5 flex items-center gap-1.5 transition-all ${
            activeTab === 'ts'
              ? 'bg-gray-950/40 text-sky-400 border-t-2 border-t-sky-500 border-r border-r-white/5 font-semibold'
              : 'hover:bg-gray-950/20 hover:text-gray-300'
          }`}
        >
          <span className="text-sky-400">ts</span> vaishnavi.ts
        </button>
        <button
          onClick={() => setActiveTab('json')}
          className={`px-4 py-2 border-r border-white/5 flex items-center gap-1.5 transition-all ${
            activeTab === 'json'
              ? 'bg-gray-950/40 text-yellow-400 border-t-2 border-t-yellow-500 border-r border-r-white/5 font-semibold'
              : 'hover:bg-gray-950/20 hover:text-gray-300'
          }`}
        >
          <span className="text-yellow-400">{}</span> interests.json
        </button>
        <button
          onClick={() => setActiveTab('sh')}
          className={`px-4 py-2 border-r border-white/5 flex items-center gap-1.5 transition-all ${
            activeTab === 'sh'
              ? 'bg-gray-950/40 text-emerald-400 border-t-2 border-t-emerald-500 border-r border-r-white/5 font-semibold'
              : 'hover:bg-gray-950/20 hover:text-gray-300'
          }`}
        >
          <span className="text-emerald-400">$</span> developer.sh
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="bg-gray-950/60 p-4 flex-grow flex gap-4 min-h-[160px] leading-relaxed">
        {/* Line numbers column */}
        <div className="text-gray-600 select-none text-right pr-2 border-r border-white/5 flex flex-col font-mono text-[11px] w-6 shrink-0">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>

        {/* Code representation */}
        <div className="flex-grow font-mono text-[12px] overflow-x-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'ts' && (
              <motion.div
                key="ts"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="space-y-0.5"
              >
                <div>
                  <span className="text-violet-400">const </span>
                  <span className="text-cyan-400">me </span>
                  <span className="text-white">= {'{'}</span>
                </div>
                <div className="pl-4">
                  <span className="text-white">name: </span>
                  <span className="text-green-400">"Vaishnavi Kumavat"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-white">role: </span>
                  <span className="text-green-400">"Full-Stack + AI/ML"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-white">passion: </span>
                  <span className="text-green-400">"Building cool stuff"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-white">available: </span>
                  <span className="text-cyan-400">true</span>
                </div>
                <div>
                  <span className="text-white">{'};'}</span>
                </div>
              </motion.div>
            )}

            {activeTab === 'json' && (
              <motion.div
                key="json"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="space-y-0.5"
              >
                <div><span className="text-white">{'{'}</span></div>
                <div className="pl-4">
                  <span className="text-sky-400">"focus"</span><span className="text-white">: [</span>
                  <span className="text-green-400">"Interactive Web"</span><span className="text-white">, </span>
                  <span className="text-green-400">"RAG Assistants"</span><span className="text-white">],</span>
                </div>
                <div className="pl-4">
                  <span className="text-sky-400">"loves"</span><span className="text-white">: [</span>
                  <span className="text-green-400">"Hackathons"</span><span className="text-white">, </span>
                  <span className="text-green-400">"Clean Code"</span><span className="text-white">],</span>
                </div>
                <div className="pl-4">
                  <span className="text-sky-400">"coffee_intake"</span><span className="text-white">: </span>
                  <span className="text-amber-500">"Exponential"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-sky-400">"timezone"</span><span className="text-white">: </span>
                  <span className="text-green-400">"IST"</span>
                </div>
                <div><span className="text-white">{'}'}</span></div>
              </motion.div>
            )}

            {activeTab === 'sh' && (
              <motion.div
                key="sh"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="space-y-0.5 text-gray-400"
              >
                <div>
                  <span className="text-cyan-400">$ </span>
                  <span>npm run develop --mode=enthusiast</span>
                </div>
                <div className="text-gray-500">&gt; initialising core portfolio engine...</div>
                <div className="text-green-400">&gt; UI loaded successfully (3D perspective ACTIVE)</div>
                <div className="text-cyan-400">&gt; looking for creative opportunities... [FOUND]</div>
                <div className="text-white flex items-center gap-1">
                  <span>&gt; system status: ONLINE</span>
                  <span className="w-1.5 h-3.5 bg-cyan-400 animate-pulse inline-block" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Editor Status Bar footer */}
      <div className="bg-sky-700 text-white px-3 py-1 flex items-center justify-between text-[10px] select-none">
        <div className="flex items-center gap-2">
          <span className="bg-sky-800 px-1.5 py-0.5 rounded font-bold">NORMAL</span>
          <span>main</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>TypeScript JSX</span>
        </div>
      </div>
    </div>
  );
};
