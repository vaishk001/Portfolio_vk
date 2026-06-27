import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Award, GraduationCap, MapPin, Clock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import type { Achievement } from '../data/defaults';

const iconMap: Record<Achievement['icon'], React.ReactNode> = {
  award: <Award className="w-5 h-5" />,
  graduation: <GraduationCap className="w-5 h-5" />,
  briefcase: <Briefcase className="w-5 h-5" />,
};

const iconColors: Record<Achievement['icon'], string> = {
  award: 'from-yellow-500 to-orange-500',
  graduation: 'from-blue-500 to-cyan-500',
  briefcase: 'from-violet-500 to-purple-600',
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: { experience: { jobs, certifications, achievements } } } = usePortfolio();

  return (
    <section id="experience" className="section-padding bg-gray-950 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />

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
          {/* Left Column: Jobs */}
          <div className="lg:col-span-3 space-y-8">
            {jobs.length > 0 && (
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 text-lg font-bold text-white mb-6"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  Work Experience
                </motion.h3>

                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600 via-cyan-500 to-transparent" />
                  {jobs.map((job, i) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -40 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                      className="relative pl-10 sm:pl-14 pb-8"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-3.5 top-1 w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 -translate-x-1/2" style={{ boxShadow: '0 0 12px rgba(124,58,237,0.6)' }} />

                      <div className="glass rounded-2xl p-6 border border-white/5 hover:border-violet-500/30 transition-colors card-hover">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                          <div>
                            <h4 className="text-lg font-bold text-white">{job.title}</h4>
                            <p className="text-violet-400 font-semibold text-sm">{job.company}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-gray-500 text-xs">
                                <MapPin className="w-3 h-3" />{job.location}
                              </span>
                            </div>
                          </div>
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full code-font text-xs bg-violet-900/30 text-violet-300 border border-violet-500/20 whitespace-nowrap self-start">
                            <Clock className="w-3 h-3" />{job.duration}
                          </span>
                        </div>

                        <ul className="space-y-2 mb-4">
                          {job.responsibilities.map((r, ri) => (
                            <li key={ri} className="text-gray-400 text-sm flex items-start gap-2">
                              <span className="text-violet-400 mt-0.5 flex-shrink-0">▸</span>
                              {r}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                          {job.technologies.map((t, ti) => (
                            <span key={ti} className="code-font px-2 py-0.5 bg-cyan-900/20 text-cyan-400 text-xs rounded border border-cyan-500/20">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 text-lg font-bold text-white mb-6"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  Certifications
                </motion.h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="glass rounded-xl p-5 border border-white/5 hover:border-yellow-500/30 transition-colors card-hover"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Award className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm leading-tight">{cert.title}</h4>
                          <p className="text-yellow-400 text-xs font-semibold mt-1">{cert.issuer}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="code-font text-gray-500 text-xs">{cert.date}</span>
                        {cert.credential && (
                          <span className="code-font text-gray-600 text-xs">{cert.credential}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Achievements */}
          <div className="lg:col-span-2">
            {achievements.length > 0 && (
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 text-lg font-bold text-white mb-6"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
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
                      className="glass rounded-xl p-5 border border-white/5 hover:border-violet-500/30 transition-all card-hover group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconColors[a.icon]} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          {iconMap[a.icon]}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm leading-snug mb-1">
                            {a.title}
                          </h4>
                          <p className="text-gray-500 text-xs leading-relaxed">
                            {a.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Fun fact terminal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                  className="mt-6 glass rounded-xl p-4 border border-white/5 code-font text-xs"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-gray-600 ml-1">stats.sh</span>
                  </div>
                  <div className="space-y-1">
                    <div><span className="text-violet-400">$</span> <span className="text-gray-400">git log --oneline | wc -l</span></div>
                    <div className="text-green-400 pl-2">500+ commits</div>
                    <div><span className="text-violet-400">$</span> <span className="text-gray-400">ls projects/ | wc -l</span></div>
                    <div className="text-green-400 pl-2">15+ projects</div>
                    <div><span className="text-violet-400">$</span> <span className="text-gray-400">cat passion.txt</span></div>
                    <div className="text-cyan-400 pl-2">Building things that matter ✨</div>
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
