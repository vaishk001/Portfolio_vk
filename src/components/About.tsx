import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Rocket, GraduationCap, MapPin, User } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { VSCodeWindow } from './VSCodeWindow';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: { personal: p } } = usePortfolio();

  // Dynamic 3D tilt calculations for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(1000px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const highlights = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Full-Stack Dev',
      description: 'MERN stack, Next.js, TypeScript — building end-to-end scalable apps',
      color: 'from-violet-600 to-purple-700',
      glow: 'rgba(124,58,237,0.2)',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI/ML Engineer',
      description: 'Integrating intelligent models — NLP, Computer Vision, predictive APIs',
      color: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6,182,212,0.2)',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Product Thinker',
      description: 'Turning complex problems into clean, user-centric digital experiences',
      color: 'from-pink-500 to-rose-600',
      glow: 'rgba(236,72,153,0.2)',
    },
  ];

  const infoItems = [
    { icon: <User className="w-4 h-4" />, label: 'Level', value: p.experienceLevel, color: 'text-violet-400' },
    { icon: <GraduationCap className="w-4 h-4" />, label: 'Education', value: p.education, color: 'text-cyan-400' },
    { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: p.location, color: 'text-green-400' },
  ];

  return (
    <section id="about" className="section-padding bg-gray-900 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="code-font text-violet-400 text-sm tracking-widest mb-3">// about me</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            The Developer <span className="gradient-text-static">Behind the Code</span>
          </h2>
          <div className="section-line" />
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-20">
          {/* Left: Photo with 3D Tilt and Glow */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative cursor-pointer"
            style={{
              transition: 'transform 0.15s ease-out',
              willChange: 'transform',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Decorative rings — hidden on small screens to avoid overflow */}
            <div className="hidden lg:block absolute -top-6 -left-6 w-full h-full border border-violet-500/20 rounded-2xl pointer-events-none" />
            <div className="hidden lg:block absolute -bottom-6 -right-6 w-full h-full border border-cyan-500/20 rounded-2xl pointer-events-none" />

            {/* Gradient border wrapper */}
            <div className="gradient-border relative z-10">
              <div className="rounded-2xl overflow-hidden relative">
                <img
                  src={p.photoUrl}
                  alt={`${p.firstName} ${p.lastName}`}
                  className="w-full h-64 sm:h-80 lg:h-[440px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="glass rounded-xl px-4 py-3 border border-white/10">
                    <p className="font-bold text-white text-lg">{p.firstName} {p.lastName}</p>
                    <p className="code-font text-violet-400 text-sm">Developer & AI/ML Enthusiast</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 glass rounded-xl p-3 border border-violet-500/30 z-20 pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-green-400">Available to hire</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text & Interactive VS Code Widget */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white leading-snug">
              Passionate about building things that <span className="gradient-text-static">matter</span>
            </h3>

            <p className="text-gray-400 leading-relaxed">{p.bio1}</p>
            <p className="text-gray-400 leading-relaxed">{p.bio2}</p>
            <p className="text-gray-400 leading-relaxed">{p.bio3}</p>

            {/* Info items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {infoItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="glass rounded-xl p-4 border border-white/5 hover:border-violet-500/30 transition-colors"
                >
                  <div className={`${item.color} mb-2`}>{item.icon}</div>
                  <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                  <div className="text-sm font-semibold text-white">{item.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Premium tabbed VS Code window mockup */}
            <div className="pt-2">
              <VSCodeWindow />
            </div>
          </motion.div>
        </div>

        {/* Highlight Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
              className="glass rounded-2xl p-6 border border-white/5 cursor-pointer"
              style={{
                transition: 'transform 0.15s ease-out, box-shadow 0.25s ease',
                willChange: 'transform',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
