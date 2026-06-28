import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TechIcon } from './TechIcon';

const categoryIcons: Record<string, string> = {
  'Frontend': '⚛️',
  'Backend': '⚙️',
  'Databases': '🗄️',
  'DevOps & Tools': '🛠️',
  'Cybersecurity': '🔐',
  'AI/ML': '🤖',
};

const categoryColors: Record<string, { from: string; to: string; border: string; glow: string }> = {
  'Frontend': { from: 'from-blue-600', to: 'to-cyan-500', border: 'border-blue-500/30', glow: 'rgba(59,130,246,0.2)' },
  'Backend': { from: 'from-green-600', to: 'to-emerald-500', border: 'border-green-500/30', glow: 'rgba(34,197,94,0.2)' },
  'Databases': { from: 'from-purple-600', to: 'to-violet-500', border: 'border-purple-500/30', glow: 'rgba(168,85,247,0.2)' },
  'DevOps & Tools': { from: 'from-orange-600', to: 'to-amber-500', border: 'border-orange-500/30', glow: 'rgba(249,115,22,0.2)' },
  'Cybersecurity': { from: 'from-red-600', to: 'to-rose-500', border: 'border-red-500/30', glow: 'rgba(239,68,68,0.2)' },
  'AI/ML': { from: 'from-pink-600', to: 'to-fuchsia-500', border: 'border-pink-500/30', glow: 'rgba(236,72,153,0.2)' },
};

const getSkillStats = (name: string) => {
  const norm = name.toLowerCase();
  if (/react|typescript|javascript|node|express|python|mongodb/i.test(norm)) {
    return { level: 'Expert', percent: 90, status: 'Production Ready' };
  }
  if (/next|postgres|redis|sqlite|tailwind|docker|git/i.test(norm)) {
    return { level: 'Advanced', percent: 80, status: 'Active Use' };
  }
  return { level: 'Proficient', percent: 70, status: 'Active Study' };
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: { skills } } = usePortfolio();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Dynamic 3D tilt calculations on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, colors: { glow: string }) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth 3D tilt perspective
    el.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.boxShadow = `0 15px 40px ${colors.glow}, inset 0 0 15px rgba(255, 255, 255, 0.05)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    el.style.boxShadow = '';
  };

  return (
    <section id="skills" className="section-padding bg-gray-950 relative overflow-hidden" ref={ref}>
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
                className={`glass rounded-2xl overflow-hidden border ${colors.border} flex flex-col`}
                style={{
                  transition: 'transform 0.15s ease-out, box-shadow 0.25s ease',
                  willChange: 'transform',
                }}
                onMouseMove={(e) => handleMouseMove(e, colors)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Card Header */}
                <div className={`p-5 border-b border-white/5 bg-gradient-to-r ${colors.from} ${colors.to} bg-opacity-10`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{categoryIcons[cat.title] || '💻'}</span>
                    <div>
                      <h3 className="font-bold text-white text-lg">{cat.title}</h3>
                      <p className="text-white/60 text-xs">{cat.skills.length} technologies</p>
                    </div>
                    {/* Animated HUD indicator */}
                    <div className="ml-auto flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white/80 animate-pulse"
                          style={{ animationDelay: `${i * 200}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="p-5 flex-grow">
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: idx * 0.1 + i * 0.05 }}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-default transition-all duration-200 flex items-center gap-2 border ${
                          hoveredSkill === skill
                            ? `bg-gradient-to-r ${colors.from} ${colors.to} text-white border-transparent shadow-lg scale-105`
                            : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <TechIcon name={skill} className="w-4 h-4" />
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Interactive HUD Analyzer */}
                <div className="px-5 pb-5 pt-3 border-t border-white/5 bg-gray-950/40 min-h-[78px] flex flex-col justify-center rounded-b-2xl">
                  {hoveredSkill && cat.skills.includes(hoveredSkill) ? (
                    (() => {
                      const stats = getSkillStats(hoveredSkill);
                      return (
                        <div className="space-y-1.5 transition-all duration-300">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-gray-400">ANALYZING: <span className="text-white font-bold">{hoveredSkill}</span></span>
                            <span className="text-cyan-400 font-semibold">{stats.level} ({stats.percent}%)</span>
                          </div>
                          {/* Progress bar */}
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${stats.percent}%` }}
                              className={`h-full bg-gradient-to-r ${colors.from} ${colors.to}`}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <div className="text-[9px] text-gray-500 font-mono flex justify-between">
                            <span>STATUS: {stats.status}</span>
                            <span>SYS_CORE: ACTIVE</span>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-center py-2 text-gray-600 text-[10px] font-mono tracking-wider">
                      // HOVER NODE TO VIEW DIAGNOSTIC DATA
                    </div>
                  )}
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
          className="mt-20 overflow-hidden relative"
        >
          {/* Fade mask overlay */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

          {/* Marquee Row 1 (Moving Left) */}
          <div className="flex gap-4 whitespace-nowrap py-2 w-max" style={{ animation: 'marquee 30s linear infinite' }}>
            {[...skills.flatMap(c => c.skills), ...skills.flatMap(c => c.skills)].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-2 code-font text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md shadow-sm">
                <TechIcon name={s} className="w-3.5 h-3.5" />
                {s}
              </span>
            ))}
          </div>

          {/* Marquee Row 2 (Moving Right) */}
          <div className="flex gap-4 whitespace-nowrap py-2 mt-4 w-max" style={{ animation: 'marquee-reverse 35s linear infinite' }}>
            {[...skills.flatMap(c => c.skills).reverse(), ...skills.flatMap(c => c.skills).reverse()].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-2 code-font text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md shadow-sm">
                <TechIcon name={s} className="w-3.5 h-3.5" />
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default Skills;
