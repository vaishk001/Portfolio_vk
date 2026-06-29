import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowDown, 
  Braces, 
  Cpu, 
  Layers, 
  Zap,
  Database,
  Globe,
  Terminal,
  Code,
  Flame
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/* ─── Typing Hook ─── */
function useTypingEffect(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(w => (w + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ─── Neural Network Canvas ─── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = 55;
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.5 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.4;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124, 58, 237, 0.7)';
        ctx.fill();
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(124, 58, 237, 0.8)';
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />;
}

/* ─── Magnetic Wrapper Component ─── */
interface MagneticProps {
  children: React.ReactElement;
  pull?: number;
}
const Magnetic: React.FC<MagneticProps> = ({ children, pull = 0.35 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 120, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * pull);
    y.set((clientY - centerY) * pull);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block w-full sm:w-auto"
    >
      {children}
    </motion.div>
  );
};

/* ─── Floating Code Card ─── */
const FloatingCard = ({ delay, className, children, x, y }: { delay: number; className: string; children: React.ReactNode; x: any; y: any }) => (
  <motion.div
    style={{ x, y }}
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 3.5 + delay, ease: 'easeInOut', delay }}
    className={`absolute glass rounded-xl px-4 py-3 border border-white/10 z-20 shadow-2xl shadow-black/40 ${className}`}
  >
    {children}
  </motion.div>
);

/* ─── Floating Tech Icon Background Elements ─── */
const FloatingTechIcon = ({ icon, delay, xLeft, yTop, x, y }: { icon: React.ReactNode; delay: number; xLeft: string; yTop: string; x: any; y: any }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.4, 0.8, 0.4],
      y: [0, -15, 0],
      rotate: [0, 8, -8, 0]
    }}
    transition={{ 
      repeat: Infinity, 
      duration: 6 + delay, 
      ease: 'easeInOut', 
      delay 
    }}
    style={{ left: xLeft, top: yTop, x, y }}
    className="absolute p-3 rounded-xl bg-gray-900/40 border border-white/5 backdrop-blur-md shadow-lg text-gray-500 hover:text-violet-400 hover:border-violet-500/20 hover:scale-110 transition-all duration-300 z-20 cursor-pointer pointer-events-auto"
  >
    {icon}
  </motion.div>
);

/* ─── Main Hero ─── */
const Hero = () => {
  const { data: { personal: p } } = usePortfolio();
  const typed = useTypingEffect([
    'Full-Stack Developer',
    'React & Node.js Expert',
    'AI/ML Enthusiast',
    'Problem Solver',
    'Open Source Contributor',
  ]);

  const stats = [
    { icon: <Layers className="w-4 h-4" />, label: 'Projects Built', value: '15+' },
    { icon: <Braces className="w-4 h-4" />, label: 'Tech Stack', value: 'MERN+' },
    { icon: <Cpu className="w-4 h-4" />, label: 'AI/ML Models', value: '5+' },
    { icon: <Zap className="w-4 h-4" />, label: 'Available', value: 'Now' },
  ];

  // Mouse Parallax setup using framer-motion springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX - innerWidth / 2;
    const y = clientY - innerHeight / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax layers (deeper factor = less movement/deeper background)
  const ringX = useTransform(springX, (val) => val * 0.05);
  const ringY = useTransform(springY, (val) => val * 0.05);
  
  const visualX = useTransform(springX, (val) => val * 0.04);
  const visualY = useTransform(springY, (val) => val * 0.04);

  const card1X = useTransform(springX, (val) => val * 0.08);
  const card1Y = useTransform(springY, (val) => val * 0.08);

  const card2X = useTransform(springX, (val) => val * 0.06);
  const card2Y = useTransform(springY, (val) => val * 0.06);

  const card3X = useTransform(springX, (val) => val * 0.09);
  const card3Y = useTransform(springY, (val) => val * 0.09);

  const card4X = useTransform(springX, (val) => val * 0.05);
  const card4Y = useTransform(springY, (val) => val * 0.05);

  // Background items depth
  const bgIcon1X = useTransform(springX, (val) => val * -0.04);
  const bgIcon1Y = useTransform(springY, (val) => val * -0.04);
  const bgIcon2X = useTransform(springX, (val) => val * -0.06);
  const bgIcon2Y = useTransform(springY, (val) => val * -0.06);
  const bgIcon3X = useTransform(springX, (val) => val * -0.05);
  const bgIcon3Y = useTransform(springY, (val) => val * -0.05);
  const bgIcon4X = useTransform(springX, (val) => val * -0.03);
  const bgIcon4Y = useTransform(springY, (val) => val * -0.03);
  const bgIcon5X = useTransform(springX, (val) => val * -0.07);
  const bgIcon5Y = useTransform(springY, (val) => val * -0.07);

  return (
    <>
      <section 
        className="min-h-screen flex flex-col items-center justify-start relative overflow-hidden bg-transparent neural-bg select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Neural Canvas Background */}
        <NeuralCanvas />

        {/* Floating tech background icons with parallax */}
        <FloatingTechIcon icon={<Code className="w-5 h-5" />} delay={0} xLeft="8%" yTop="20%" x={bgIcon1X} y={bgIcon1Y} />
        <FloatingTechIcon icon={<Database className="w-5 h-5" />} delay={1.5} xLeft="12%" yTop="65%" x={bgIcon2X} y={bgIcon2Y} />
        <FloatingTechIcon icon={<Cpu className="w-5 h-5" />} delay={3} xLeft="85%" yTop="18%" x={bgIcon3X} y={bgIcon3Y} />
        <FloatingTechIcon icon={<Terminal className="w-5 h-5" />} delay={4.5} xLeft="78%" yTop="60%" x={bgIcon4X} y={bgIcon4Y} />
        <FloatingTechIcon icon={<Globe className="w-5 h-5" />} delay={2.2} xLeft="45%" yTop="15%" x={bgIcon5X} y={bgIcon5Y} />
        <FloatingTechIcon icon={<Flame className="w-4 h-4" />} delay={1.0} xLeft="55%" yTop="72%" x={bgIcon5X} y={bgIcon5Y} />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-blob pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-blob animation-delay-4000 pointer-events-none" />

        <div className="max-w-7xl w-full z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4 sm:px-6 md:px-12 pt-24 pb-8">
          {/* Left: Content */}
          <div className="text-left">
            {/* Status badge */}
            {p.availableForWork && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/30 text-violet-300 text-sm font-medium mb-8 shadow-lg shadow-violet-500/5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                </span>
                Open to Opportunities
              </motion.div>
            )}

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <p className="code-font text-violet-400 text-sm mb-3 tracking-widest">
                &lt;hello world /&gt;
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                <span className="text-white">I'm </span>
                <span className="gradient-text">{p.firstName}</span>
                <br />
                <span className="text-gray-200">{p.lastName}</span>
              </h1>
            </motion.div>

            {/* Typing Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-6 h-8"
            >
              <span className="code-font text-cyan-400 text-lg sm:text-xl font-semibold">{typed}</span>
              <span className="terminal-cursor" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-xl"
            >
              {p.description}
            </motion.p>

            {/* CTA Buttons - Wrapped in Magnetic containers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 md:mb-10"
            >
              <Magnetic pull={0.25}>
                <a href="#projects" className="btn-primary w-full sm:w-auto px-8 py-3.5 md:py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2">
                  View My Work <span className="text-violet-200">→</span>
                </a>
              </Magnetic>
              <Magnetic pull={0.35}>
                <a href="#contact" className="btn-secondary w-full sm:w-auto px-8 py-3.5 md:py-4 rounded-xl font-bold text-white text-center flex items-center justify-center">
                  Let's Talk
                </a>
              </Magnetic>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6"
            >
              <span className="text-gray-600 text-xs code-font font-medium uppercase tracking-wider">find me on</span>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-400 transition-all duration-300 hover:scale-120" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-all duration-300 hover:scale-120" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${p.email}`} className="text-gray-500 hover:text-violet-400 transition-all duration-300 hover:scale-120" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right: Visual with Parallax layers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="hidden lg:block relative h-[520px]"
            style={{ x: visualX, y: visualY }}
          >
            {/* Rotating rings with parallax */}
            <motion.div 
              style={{ x: ringX, y: ringY }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-80 h-80 border border-violet-500/20 rounded-full animate-spin-slow" />
              <div className="absolute w-56 h-56 border border-cyan-500/20 rounded-full animate-spin-slow-r" />
              <div className="absolute w-36 h-36 border border-violet-500/30 rounded-full animate-spin-slow" />
              {/* Center glow */}
              <div className="absolute w-20 h-20 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-full blur-xl opacity-60 animate-float" />
              <div className="absolute w-12 h-12 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-full" style={{ boxShadow: '0 0 30px rgba(124,58,237,0.8)' }} />
            </motion.div>

            {/* Floating code cards with individual spring parallax offsets */}
            <FloatingCard delay={0} className="top-8 right-4 w-56" x={card1X} y={card1Y}>
              <div className="code-font text-xs space-y-1">
                <div className="text-violet-400 font-semibold">const <span className="text-cyan-400">stack</span> = {'{'}</div>
                <div className="pl-2 text-gray-300">frontend: <span className="text-green-400">'React'</span>,</div>
                <div className="pl-2 text-gray-300">backend: <span className="text-green-400">'Node.js'</span>,</div>
                <div className="pl-2 text-gray-300">ai: <span className="text-green-400">'Python'</span></div>
                <div className="text-violet-400 font-semibold">{'}'}</div>
              </div>
            </FloatingCard>

            <FloatingCard delay={1.2} className="bottom-20 right-0 w-52" x={card2X} y={card2Y}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Model Accuracy</div>
                  <div className="text-green-400 text-xs font-semibold">94.7% ↑</div>
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-[94.7%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
              </div>
            </FloatingCard>

            <FloatingCard delay={0.6} className="bottom-8 left-4 w-48" x={card3X} y={card3Y}>
              <div className="code-font text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 font-semibold">Build passing</span>
                </div>
                <div className="text-gray-500">Tests: <span className="text-cyan-400">47/47</span></div>
                <div className="text-gray-500">Coverage: <span className="text-violet-400">98%</span></div>
              </div>
            </FloatingCard>

            <FloatingCard delay={1.8} className="top-24 left-2 w-44" x={card4X} y={card4Y}>
              <div className="text-xs space-y-1">
                <div className="code-font text-violet-400 text-xs mb-1">npm run dev</div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span className="text-gray-400 code-font text-xs">localhost:5173</span>
                </div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="w-full z-10 flex flex-wrap justify-center gap-6 sm:gap-10 pb-10 pt-4 px-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              className="text-center min-w-[60px]"
            >
              <div className="text-xl sm:text-2xl font-bold gradient-text-static">{s.value}</div>
              <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-gray-600 hover:text-violet-400 transition-colors z-10"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.a>
      </section>
    </>
  );
};

export default Hero;
