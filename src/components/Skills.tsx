import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const categoryIcons: Record<string, string> = {
  'Frontend': '⚛️',
  'Backend': '⚙️',
  'Databases': '🗄️',
  'DevOps & Tools': '🛠️',
  'Cybersecurity': '🔐',
  'AI/ML': '🤖',
};

const categoryColors: Record<string, { from: string; to: string; border: string; glow: string }> = {
  'Frontend': { from: 'from-blue-600', to: 'to-cyan-500', border: 'border-blue-500/30', glow: 'rgba(59,130,246,0.25)' },
  'Backend': { from: 'from-green-600', to: 'to-emerald-500', border: 'border-green-500/30', glow: 'rgba(34,197,94,0.25)' },
  'Databases': { from: 'from-purple-600', to: 'to-violet-500', border: 'border-purple-500/30', glow: 'rgba(168,85,247,0.25)' },
  'DevOps & Tools': { from: 'from-orange-600', to: 'to-amber-500', border: 'border-orange-500/30', glow: 'rgba(249,115,22,0.25)' },
  'Cybersecurity': { from: 'from-red-600', to: 'to-rose-500', border: 'border-red-500/30', glow: 'rgba(239,68,68,0.25)' },
  'AI/ML': { from: 'from-pink-600', to: 'to-fuchsia-500', border: 'border-pink-500/30', glow: 'rgba(236,72,153,0.25)' },
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: { skills } } = usePortfolio();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="section-padding bg-gray-950 relative" ref={ref}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(124,58,237,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="code-font text-cyan-400 text-sm tracking-widest mb-3">// tech stack</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="gradient-text-static">Weapons</span> of Choice
          </h2>
          <div className="section-line" />
          <p className="mt-6 text-gray-500 max-w-xl mx-auto">
            A curated toolkit forged through real-world projects, hackathons, and late-night debugging sessions.
          </p>
        </motion.div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((cat, idx) => {
            const colors = categoryColors[cat.title] || categoryColors['Frontend'];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`glass rounded-2xl overflow-hidden border ${colors.border} card-hover group`}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${colors.glow}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                {/* Card Header */}
                <div className={`p-5 border-b border-white/5 bg-gradient-to-r ${colors.from} ${colors.to} bg-opacity-10`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{categoryIcons[cat.title] || '💻'}</span>
                    <div>
                      <h3 className="font-bold text-white text-lg">{cat.title}</h3>
                      <p className="text-white/60 text-xs">{cat.skills.length} technologies</p>
                    </div>
                    {/* Animated indicator */}
                    <div className="ml-auto flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white/80 transition-all"
                          style={{ transitionDelay: `${i * 60}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: idx * 0.1 + i * 0.05 }}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-default transition-all duration-200 ${
                          hoveredSkill === skill
                            ? `bg-gradient-to-r ${colors.from} ${colors.to} text-white shadow-lg`
                            : 'bg-white/5 text-gray-400 border border-white/5 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 overflow-hidden"
        >
          <div className="flex gap-6 animate-marquee whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
            {[...skills.flatMap(c => c.skills), ...skills.flatMap(c => c.skills)].map((s, i) => (
              <span key={i} className="code-font text-gray-700 text-sm px-3 py-1 border border-white/5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Skills;
