import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
  const { data: { personal: p } } = usePortfolio();
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-transparent border-t border-white/5 py-12 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(124,58,237,0.04)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {p.firstName.charAt(0)}
              </div>
              <span className="font-display font-bold text-lg text-white">
                {p.firstName}<span className="gradient-text-static">.</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Building the web, one component at a time.<br />
              Turning coffee into code ☕
            </p>
            <div className="code-font text-xs text-violet-400 mt-3">
              &lt;Full-Stack + AI/ML /&gt;
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-2">
              {['about', 'skills', 'projects', 'experience', 'contact'].map(s => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    className="text-gray-500 hover:text-violet-400 transition-colors text-sm capitalize flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-violet-400 transition-all duration-300" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3 mb-6">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/40 border border-white/5 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={p.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/40 border border-white/5 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${p.email}`}
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/40 border border-white/5 transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-gray-600 text-xs">
              {p.email}
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm flex items-center gap-2">
            © {year} {p.firstName} {p.lastName}. Built with{' '}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> using React & Tailwind
          </p>
          <button
            onClick={scrollTop}
            className="w-9 h-9 glass rounded-xl flex items-center justify-center text-gray-500 hover:text-violet-400 border border-white/5 hover:border-violet-500/30 transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
