import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TechIcon } from './TechIcon';

const colorMap: Record<string, { from: string; to: string; border: string; glow: string; text: string }> = {
  'text-blue-500': { from: 'from-blue-600', to: 'to-cyan-500', border: 'border-blue-500/30', glow: 'rgba(59,130,246,0.15)', text: 'text-blue-400' },
  'text-green-500': { from: 'from-green-600', to: 'to-emerald-500', border: 'border-green-500/30', glow: 'rgba(34,197,94,0.15)', text: 'text-green-400' },
  'text-purple-500': { from: 'from-purple-600', to: 'to-violet-500', border: 'border-purple-500/30', glow: 'rgba(168,85,247,0.15)', text: 'text-purple-400' },
  'text-orange-500': { from: 'from-orange-600', to: 'to-amber-500', border: 'border-orange-500/30', glow: 'rgba(249,115,22,0.15)', text: 'text-orange-400' },
  'text-red-500': { from: 'from-red-600', to: 'to-rose-500', border: 'border-red-500/30', glow: 'rgba(239,68,68,0.15)', text: 'text-red-400' },
  'text-cyan-500': { from: 'from-cyan-600', to: 'to-teal-500', border: 'border-cyan-500/30', glow: 'rgba(6,182,212,0.15)', text: 'text-cyan-400' },
  'text-yellow-500': { from: 'from-yellow-600', to: 'to-amber-500', border: 'border-yellow-500/30', glow: 'rgba(234,179,8,0.15)', text: 'text-yellow-400' },
  'text-pink-500': { from: 'from-pink-600', to: 'to-fuchsia-500', border: 'border-pink-500/30', glow: 'rgba(236,72,153,0.15)', text: 'text-pink-400' },
};

const getCategoryColors = (colorClass: string) => {
  return colorMap[colorClass] || colorMap['text-blue-500'];
};

const getCategoryIcon = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes('front')) return '⚛️';
  if (t.includes('back')) return '⚙️';
  if (t.includes('data')) return '🗄️';
  if (t.includes('devops') || t.includes('tool')) return '🛠️';
  if (t.includes('cyber') || t.includes('security') || t.includes('protect')) return '🔐';
  if (t.includes('ai') || t.includes('ml') || t.includes('machine') || t.includes('intell') || t.includes('learn')) return '🤖';
  if (t.includes('design') || t.includes('ui') || t.includes('ux') || t.includes('graphic')) return '🎨';
  if (t.includes('cloud') || t.includes('aws') || t.includes('infra') || t.includes('server')) return '☁️';
  return '💻';
};

const getSkillStats = (name: string) => {
  const norm = name.toLowerCase();
  if (/react|typescript|javascript|node|express|python|mongodb|next|django/i.test(norm)) {
    return { level: 'Expert', percent: 90, status: 'Production Ready' };
  }
  if (/postgres|redis|sqlite|tailwind|docker|git|supabase|mysql|firebase/i.test(norm)) {
    return { level: 'Advanced', percent: 80, status: 'Active Use' };
  }
  return { level: 'Proficient', percent: 70, status: 'Active Study' };
};

const getGridClasses = (count: number) => {
  if (count === 1) return 'grid-cols-1 max-w-xl mx-auto';
  if (count === 2) return 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto';
  if (count === 3) return 'grid-cols-1 md:grid-cols-3';
  if (count === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
};

const getMarqueeItems = (list: string[]) => {
  if (list.length === 0) return [];
  let repeated = [...list];
  while (repeated.length < 24) {
    repeated = [...repeated, ...list];
  }
  return [...repeated, ...repeated];
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
    <section id="skills" className="section-padding bg-transparent relative overflow-hidden" ref={ref}>
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
        <div className={`grid gap-6 ${getGridClasses(skills.length)}`}>
          {skills.map((cat, idx) => {
            const colors = getCategoryColors(cat.color);
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
                <div className={`p-5 border-b border-white/5 bg-gradient-to-r ${colors.from} ${colors.to} bg-opacity-10 relative overflow-hidden`}>
                  {/* Subtle Grid overlay inside header */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <span className="text-2xl">{getCategoryIcon(cat.title)}</span>
                    <div>
                      <h3 className="font-bold text-white text-lg tracking-tight">{cat.title}</h3>
                      <p className="text-white/60 text-xs font-mono">{cat.skills.length} technologies</p>
                    </div>
                    {/* Animated HUD indicator */}
                    <div className="ml-auto flex gap-1.5">
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
                <div className="p-5 flex-grow relative">
                  {/* Grid background */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  
                  <div className="flex flex-wrap gap-2.5 relative z-10">
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
                <div className="px-5 pb-5 pt-3 border-t border-white/5 bg-gray-950/60 min-h-[82px] flex flex-col justify-center rounded-b-2xl relative">
                  {hoveredSkill && cat.skills.includes(hoveredSkill) ? (
                    (() => {
                      const stats = getSkillStats(hoveredSkill);
                      return (
                        <div className="space-y-2 transition-all duration-300 relative z-10">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-gray-400">ANALYZING: <span className="text-white font-bold">{hoveredSkill}</span></span>
                            <span className={`${colors.text} font-semibold`}>{stats.level} ({stats.percent}%)</span>
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
                    <div className="flex flex-col items-center justify-center py-1 text-gray-600 text-[10px] font-mono tracking-wider space-y-1 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-ping" />
                        <span>SYSTEMS_READY: STANDBY</span>
                      </div>
                      <span className="opacity-50 text-[9px]">// HOVER NODE FOR REAL-TIME DIAGNOSTICS</span>
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
          className="mt-24 overflow-hidden relative py-4"
        >
          {/* Fade mask overlay */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

          {/* Marquee Row 1 (Moving Left) */}
          <div className="flex gap-4 whitespace-nowrap py-1 w-max" style={{ animation: 'marquee 40s linear infinite' }}>
            {getMarqueeItems(skills.flatMap(c => c.skills)).map((s, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 code-font text-gray-300 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/10 hover:text-white hover:scale-105">
                <TechIcon name={s} className="w-4 h-4" />
                {s}
              </span>
            ))}
          </div>

          {/* Marquee Row 2 (Moving Right) */}
          <div className="flex gap-4 whitespace-nowrap py-1 mt-5 w-max" style={{ animation: 'marquee-reverse 45s linear infinite' }}>
            {getMarqueeItems(skills.flatMap(c => c.skills).reverse()).map((s, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 code-font text-gray-300 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-violet-500/40 hover:bg-white/10 hover:text-white hover:scale-105">
                <TechIcon name={s} className="w-4 h-4" />
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
