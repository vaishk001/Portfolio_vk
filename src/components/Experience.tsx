import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, Award, GraduationCap, MapPin, Clock, Trophy, Star, Code, Zap, Heart, Globe, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import type { Achievement } from '../data/defaults';

const iconMap: Record<Achievement['icon'], React.ReactNode> = {
  award: <Award className="w-5 h-5" />,
  graduation: <GraduationCap className="w-5 h-5" />,
  briefcase: <Briefcase className="w-5 h-5" />,
  trophy: <Trophy className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  code: <Code className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  globe: <Globe className="w-5 h-5" />,
};

const iconColors: Record<Achievement['icon'], string> = {
  award: 'from-yellow-500 to-orange-500',
  graduation: 'from-blue-500 to-cyan-500',
  briefcase: 'from-violet-500 to-purple-600',
  trophy: 'from-amber-400 to-yellow-600',
  star: 'from-yellow-400 to-amber-500',
  code: 'from-cyan-500 to-blue-500',
  zap: 'from-orange-400 to-red-600',
  heart: 'from-rose-500 to-pink-600',
  globe: 'from-teal-400 to-emerald-600',
};

const glowColors: Record<Achievement['icon'], string> = {
  award: 'rgba(234, 179, 8, 0.25)',
  graduation: 'rgba(6, 182, 212, 0.25)',
  briefcase: 'rgba(124, 58, 237, 0.25)',
  trophy: 'rgba(245, 158, 11, 0.25)',
  star: 'rgba(251, 191, 36, 0.25)',
  code: 'rgba(6, 182, 212, 0.25)',
  zap: 'rgba(239, 68, 68, 0.25)',
  heart: 'rgba(244, 63, 94, 0.25)',
  globe: 'rgba(20, 184, 166, 0.25)',
};

const getCertColors = (title: string, issuer: string) => {
  const t = title.toLowerCase();
  const i = issuer.toLowerCase();
  
  if (t.includes('git') || t.includes('github') || i.includes('github')) {
    return {
      glow: 'rgba(124, 58, 237, 0.3)', // Purple
      border: 'border-violet-500/20 hover:border-violet-500/40',
      badgeBg: 'from-violet-500/20 to-purple-600/20',
      badgeText: 'text-violet-400',
      iconGlow: '0 8px 16px rgba(124, 58, 237, 0.3)',
    };
  }
  if (t.includes('react') || t.includes('javascript') || t.includes('js') || t.includes('bootcamp') || t.includes('devtown')) {
    return {
      glow: 'rgba(6, 182, 212, 0.3)', // Cyan
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      badgeBg: 'from-cyan-500/20 to-blue-600/20',
      badgeText: 'text-cyan-400',
      iconGlow: '0 8px 16px rgba(6, 182, 212, 0.3)',
    };
  }
  if (t.includes('illuminate') || i.includes('iit') || t.includes('entrepreneurship')) {
    return {
      glow: 'rgba(236, 72, 153, 0.3)', // Pink
      border: 'border-pink-500/20 hover:border-pink-500/40',
      badgeBg: 'from-pink-500/20 to-rose-600/20',
      badgeText: 'text-pink-400',
      iconGlow: '0 8px 16px rgba(236, 72, 153, 0.3)',
    };
  }
  if (t.includes('azure') || t.includes('microsoft') || i.includes('microsoft')) {
    return {
      glow: 'rgba(59, 130, 246, 0.3)', // Blue
      border: 'border-blue-500/20 hover:border-blue-500/40',
      badgeBg: 'from-blue-500/20 to-sky-600/20',
      badgeText: 'text-blue-400',
      iconGlow: '0 8px 16px rgba(59, 130, 246, 0.3)',
    };
  }
  if (t.includes('web') || t.includes('html') || i.includes('dataflair')) {
    return {
      glow: 'rgba(245, 158, 11, 0.3)', // Amber
      border: 'border-amber-500/20 hover:border-amber-500/40',
      badgeBg: 'from-amber-500/20 to-yellow-600/20',
      badgeText: 'text-amber-400',
      iconGlow: '0 8px 16px rgba(245, 158, 11, 0.3)',
    };
  }
  if (t.includes('ai') || t.includes('generative') || i.includes('outskill')) {
    return {
      glow: 'rgba(168, 85, 247, 0.3)', // Fuchsia/Purple
      border: 'border-fuchsia-500/20 hover:border-fuchsia-500/40',
      badgeBg: 'from-fuchsia-500/20 to-purple-600/20',
      badgeText: 'text-fuchsia-400',
      iconGlow: '0 8px 16px rgba(168, 85, 247, 0.3)',
    };
  }
  if (t.includes('career') || i.includes('wns') || t.includes('readiness')) {
    return {
      glow: 'rgba(239, 68, 68, 0.3)', // Red
      border: 'border-red-500/20 hover:border-red-500/40',
      badgeBg: 'from-red-500/20 to-rose-600/20',
      badgeText: 'text-red-400',
      iconGlow: '0 8px 16px rgba(239, 68, 68, 0.3)',
    };
  }
  
  // Default color (Gold)
  return {
    glow: 'rgba(234, 179, 8, 0.3)',
    border: 'border-yellow-500/20 hover:border-yellow-500/40',
    badgeBg: 'from-yellow-500/20 to-orange-600/20',
    badgeText: 'text-yellow-400',
    iconGlow: '0 8px 16px rgba(234, 179, 8, 0.3)',
  };
};

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: { experience: { jobs, certifications, achievements } } } = usePortfolio();

  // Parallax background illusion state
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / (innerWidth / 2) * -15;
    const y = (clientY - innerHeight / 2) / (innerHeight / 2) * -15;
    setBgOffset({ x, y });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, glowColor: string) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    
    const rotX = -(y - rect.height / 2) / 14;
    const rotY = (x - rect.width / 2) / 14;
    
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale3d(1.025, 1.025, 1.025)`;
    el.style.boxShadow = `0 20px 45px -10px ${glowColor}, 0 0 20px -5px ${glowColor}`;
    
    const match = glowColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      el.style.borderColor = `rgba(${match[1]}, ${match[2]}, ${match[3]}, 0.45)`;
    } else {
      el.style.borderColor = glowColor;
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
    el.style.boxShadow = '';
    el.style.borderColor = '';
  };

  return (
    <section 
      id="experience" 
      className="section-padding bg-gray-950 relative overflow-hidden" 
      ref={ref}
      onMouseMove={handleSectionMouseMove}
    >
      {/* 3D Background Illusion - Interactive Parallax Grid */}
      <motion.div 
        style={{ x: bgOffset.x * 0.4, y: bgOffset.y * 0.4 }}
        className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" 
      />
      
      {/* Floating Ambient Light Blobs reacting to cursor */}
      <motion.div 
        style={{ x: bgOffset.x * 1.5, y: bgOffset.y * 1.5 }}
        className="absolute top-1/4 left-10 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        style={{ x: bgOffset.x * 2.2, y: bgOffset.y * 2.2 }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        style={{ x: bgOffset.x * 0.8, y: bgOffset.y * 0.8 }}
        className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="code-font text-violet-400 text-sm tracking-widest mb-3">// my journey</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Experience & <span className="gradient-text-static">Milestones</span>
          </h2>
          <div className="section-line" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column: Jobs & Certifications */}
          <div className="lg:col-span-3 space-y-14">
            {jobs.length > 0 && (
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 text-lg font-bold text-white mb-8"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  Work Experience
                </motion.h3>

                {/* Timeline */}
                <div className="relative">
                  {/* Timeline connecting line */}
                  <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-600 via-cyan-500 to-transparent" />
                  
                  {jobs.map((job, i) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -40 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                      className="relative pl-12 sm:pl-16 pb-8"
                    >
                      {/* Pulsing Timeline Dot */}
                      <div className="absolute left-5 top-7 -translate-x-1/2 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 z-10 border-2 border-gray-950" style={{ boxShadow: '0 0 12px rgba(124,58,237,0.8)' }} />
                        <div className="absolute w-5 h-5 rounded-full bg-violet-500/30 animate-ping pointer-events-none" />
                      </div>

                      {/* Job Card */}
                      <div
                        className="glass rounded-2xl p-6 border border-white/5 cursor-pointer relative group overflow-hidden transition-all duration-300"
                        style={{
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.15s ease-out, box-shadow 0.25s ease, border-color 0.25s ease',
                          willChange: 'transform',
                          background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.05), transparent 70%), rgba(255, 255, 255, 0.02)',
                          backdropFilter: 'blur(20px)',
                        }}
                        onMouseMove={(e) => handleCardMouseMove(e, 'rgba(124, 58, 237, 0.25)')}
                        onMouseLeave={handleCardMouseLeave}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20" />
                        
                        <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                            <div>
                              <h4 className="text-lg font-bold text-white transition-colors group-hover:text-violet-300" style={{ transform: 'translateZ(40px)' }}>{job.title}</h4>
                              <p className="text-violet-400 font-semibold text-sm" style={{ transform: 'translateZ(35px)' }}>{job.company}</p>
                              <div className="flex items-center gap-3 mt-1" style={{ transform: 'translateZ(30px)' }}>
                                <span className="flex items-center gap-1 text-gray-500 text-xs">
                                  <MapPin className="w-3 h-3" />{job.location}
                                </span>
                              </div>
                            </div>
                            <span 
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full code-font text-xs bg-violet-900/30 text-violet-300 border border-violet-500/20 whitespace-nowrap self-start transition-all"
                              style={{ transform: 'translateZ(40px)' }}
                            >
                              <Clock className="w-3 h-3" />{job.duration}
                            </span>
                          </div>

                          <ul className="space-y-2 mb-4" style={{ transform: 'translateZ(25px)' }}>
                            {job.responsibilities.map((r, ri) => (
                              <li key={ri} className="text-gray-400 text-sm flex items-start gap-2">
                                <span className="text-violet-400 mt-0.5 flex-shrink-0">▸</span>
                                {r}
                              </li>
                            ))}
                          </ul>

                          <div 
                            className="flex flex-wrap gap-2 pt-3 border-t border-white/5"
                            style={{ transform: 'translateZ(35px)' }}
                          >
                            {job.technologies.map((t, ti) => (
                              <span key={ti} className="code-font px-2.5 py-1 bg-cyan-900/20 text-cyan-400 text-xs rounded border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-colors">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications - Fully redesigned 3D Glassmorphic Cards */}
            {certifications.length > 0 && (
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 text-lg font-bold text-white mb-6"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  Certifications
                </motion.h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {certifications.map((cert, i) => {
                    const colors = getCertColors(cert.title, cert.issuer);
                    return (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        className={`glass rounded-2xl p-6 border ${colors.border} cursor-pointer relative group overflow-hidden transition-all duration-300`}
                        style={{
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.15s ease-out, box-shadow 0.25s ease, border-color 0.25s ease',
                          willChange: 'transform',
                          background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.06), transparent 70%), rgba(255, 255, 255, 0.02)',
                          backdropFilter: 'blur(24px)',
                        }}
                        onMouseMove={(e) => handleCardMouseMove(e, colors.glow)}
                        onMouseLeave={handleCardMouseLeave}
                      >
                        {/* 3D Highlight grid line inside */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20" />
                        
                        <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                          <div className="flex items-start gap-4 mb-4">
                            <div 
                              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.badgeBg} flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110`}
                              style={{ 
                                transform: 'translateZ(45px)',
                                boxShadow: colors.iconGlow,
                              }}
                            >
                              <Award className={`w-5 h-5 ${colors.badgeText}`} />
                            </div>
                            <div className="flex-grow">
                              <h4 className={`font-bold text-white text-[15px] leading-snug transition-colors group-hover:${colors.badgeText}`} style={{ transform: 'translateZ(40px)' }}>{cert.title}</h4>
                              <p className="text-gray-400 text-xs mt-1 font-medium" style={{ transform: 'translateZ(35px)' }}>{cert.issuer}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-6 pt-3 border-t border-white/5">
                            <span className="code-font text-gray-500 text-xs font-semibold" style={{ transform: 'translateZ(30px)' }}>{cert.date}</span>
                            <div className="flex items-center gap-3" style={{ transform: 'translateZ(35px)' }}>
                              {cert.credential && (
                                <span className="code-font text-[10px] text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded font-medium">{cert.credential}</span>
                              )}
                              {cert.url && (
                                <a
                                  href={cert.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center gap-1 text-xs ${colors.badgeText} hover:brightness-125 transition-all code-font font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20`}
                                >
                                  View <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Achievements & Stats Terminal */}
          <div className="lg:col-span-2 space-y-12">
            {achievements.length > 0 && (
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 text-lg font-bold text-white mb-6"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  Achievements
                </motion.h3>
                <div className="space-y-4">
                  {achievements.map((a, i) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="glass rounded-xl p-5 border border-white/5 cursor-pointer relative group overflow-hidden transition-all duration-300"
                      style={{
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.15s ease-out, box-shadow 0.25s ease, border-color 0.25s ease',
                        willChange: 'transform',
                        background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.05), transparent 70%), rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(20px)',
                      }}
                      onMouseMove={(e) => handleCardMouseMove(e, glowColors[a.icon])}
                      onMouseLeave={handleCardMouseLeave}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20" />
                      
                      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                        <div className="flex items-start gap-4">
                          <div 
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconColors[a.icon]} flex items-center justify-center text-white flex-shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-6`}
                            style={{ 
                              transform: 'translateZ(45px)',
                              boxShadow: `0 8px 16px -4px ${glowColors[a.icon].replace('0.25', '0.5')}`
                            }}
                          >
                            {iconMap[a.icon]}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm leading-snug mb-1 transition-colors group-hover:text-violet-300" style={{ transform: 'translateZ(40px)' }}>
                              {a.title}
                            </h4>
                            <p className="text-gray-400 text-xs leading-relaxed" style={{ transform: 'translateZ(35px)' }}>
                              {a.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 3D Stats.sh Terminal Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                  className="mt-6 glass rounded-xl p-5 border border-white/5 code-font text-xs cursor-pointer relative group overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.15s ease-out, box-shadow 0.25s ease, border-color 0.25s ease',
                    willChange: 'transform',
                    background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.05), transparent 70%), rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                  }}
                  onMouseMove={(e) => handleCardMouseMove(e, 'rgba(34, 197, 94, 0.25)')}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20" />
                  
                  <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                        <span className="text-gray-500 text-xs ml-1 font-medium select-none">stats.sh</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="space-y-2 text-gray-300">
                      <div>
                        <span className="text-emerald-500 font-bold">$</span> <span className="text-gray-400">git log --oneline | wc -l</span>
                      </div>
                      <div className="text-emerald-400 pl-4 font-semibold text-[13px] tracking-wide select-all" style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.3)' }}>500+ commits</div>
                      
                      <div>
                        <span className="text-emerald-500 font-bold">$</span> <span className="text-gray-400">ls projects/ | wc -l</span>
                      </div>
                      <div className="text-emerald-400 pl-4 font-semibold text-[13px] tracking-wide select-all" style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.3)' }}>15+ projects</div>
                      
                      <div>
                        <span className="text-emerald-500 font-bold">$</span> <span className="text-gray-400">cat passion.txt</span>
                      </div>
                      <div className="text-cyan-400 pl-4 font-semibold text-[13px] tracking-wide select-all" style={{ textShadow: '0 0 10px rgba(34, 211, 238, 0.3)' }}>
                        Building things that matter <span className="animate-pulse">✨</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
