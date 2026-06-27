import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ExternalLink, Github, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectArchitecture } from './ProjectArchitecture';
import type { Project } from '../data/defaults';

/* ── Category helpers ── */
const categoryEmoji: Record<string, string> = {
  'Full-Stack': '🧱',
  'Cybersecurity': '🔐',
  'AI/ML': '🤖',
  'ML / AI': '🤖',
  'Frontend': '⚛️',
  'Backend': '⚙️',
  'Mobile': '📱',
  'All': '✦',
};

function getCategoryEmoji(cat: string): string {
  if (categoryEmoji[cat]) return categoryEmoji[cat];
  const lower = cat.toLowerCase();
  if (lower.includes('cyber') || lower.includes('security')) return '🔐';
  if (lower.includes('ai') || lower.includes('ml') || lower.includes('machine')) return '🤖';
  if (lower.includes('mobile') || lower.includes('android') || lower.includes('ios')) return '📱';
  if (lower.includes('front') || lower.includes('ui') || lower.includes('design')) return '⚛️';
  if (lower.includes('back') || lower.includes('api') || lower.includes('server')) return '⚙️';
  if (lower.includes('full')) return '🧱';
  if (lower.includes('data') || lower.includes('analytics')) return '📊';
  if (lower.includes('cloud') || lower.includes('devops')) return '☁️';
  return '💻';
}

/* ── Auto-sliding image carousel ── */
interface CarouselProps {
  slides: string[];        // data-URLs or external URLs
  autoInterval?: number;   // ms between slides, default 3000
}

function ImageCarousel({ slides, autoInterval = 3000 }: CarouselProps) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const next = useCallback(() => setIdx(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total]);

  // Auto-advance
  useEffect(() => {
    if (total <= 1 || paused) return;
    const id = setInterval(next, autoInterval);
    return () => clearInterval(id);
  }, [next, autoInterval, paused, total]);

  if (total === 0) {
    return (
      <div className="relative h-52 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <span className="text-gray-600 text-sm">No preview image</span>
      </div>
    );
  }

  return (
    <div
      className="relative h-44 sm:h-52 overflow-hidden group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent z-10 pointer-events-none" />

      {/* Slides */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={idx}
          src={slides[idx]}
          alt={`slide ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* Prev / Next buttons — only shown when >1 image */}
      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? 'bg-white w-4' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Project Card Component ── */
interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [view, setView] = useState<'details' | 'architecture'>('details');
  const [hovered, setHovered] = useState(false);

  const slides: string[] =
    project.images && project.images.length > 0
      ? project.images
      : project.image
      ? [project.image]
      : [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass rounded-2xl overflow-hidden border border-white/5 card-hover group flex flex-col min-h-[500px]"
      style={{
        boxShadow: hovered
          ? '0 0 50px rgba(124,58,237,0.15)'
          : '',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* ── Auto-sliding image carousel ── */}
      <div className="relative">
        <ImageCarousel slides={slides} autoInterval={3500} />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="code-font text-xs px-3 py-1 rounded-full glass border border-white/20 text-violet-300 font-medium">
            {getCategoryEmoji(project.category)} {project.category}
          </span>
        </div>

        {/* Links overlay */}
        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white hover:text-violet-400 transition-colors border border-white/10"
          >
            <Github className="w-4 h-4" />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white hover:text-cyan-400 transition-colors border border-white/10"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3 gap-2">
          <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
            {project.title}
          </h3>

          {/* Interactive view toggle */}
          <div className="flex bg-gray-950/80 p-0.5 rounded-lg border border-white/10 text-[10px] font-mono shrink-0">
            <button
              onClick={() => setView('details')}
              className={`px-2 py-1 rounded transition-colors ${
                view === 'details' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setView('architecture')}
              className={`px-2 py-1 rounded transition-colors ${
                view === 'architecture' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Architecture
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Dynamic view details or architecture */}
        <div className="mb-4 flex-grow flex flex-col justify-center min-h-[150px]">
          {view === 'details' ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Key Features</span>
              </div>
              <ul className="space-y-1">
                {project.features.slice(0, 3).map((f, fi) => (
                  <li key={fi} className="text-gray-500 text-xs flex items-start gap-2">
                    <span className="text-violet-400 mt-0.5">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center animate-fade-in">
              <ProjectArchitecture projectId={project.id} techStack={project.techStack} />
            </div>
          )}
        </div>

        {/* Tech Stack + Links */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech, ti) => (
              <span
                key={ti}
                className="code-font px-2 py-0.5 bg-violet-900/30 text-violet-300 text-xs rounded border border-violet-500/20"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Projects section ── */
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('All');
  const { data: { projects } } = usePortfolio();

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section-padding bg-gray-900 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="code-font text-violet-400 text-sm tracking-widest mb-3">// featured work</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Things I've <span className="gradient-text-static">Built</span>
          </h2>
          <div className="section-line" />

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg'
                    : 'glass border border-white/10 text-gray-400 hover:text-white hover:border-violet-500/40'
                }`}
              >
                <span>{getCategoryEmoji(cat)}</span>
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
