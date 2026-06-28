import { useEffect, useRef } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { AdminPage } from './admin/AdminPage';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AIAssistant } from './components/AIAssistant';

/* ── Global Custom Cursor ──────────────────────────────────────────────────── */
function GlobalCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      // Expand ring on interactive elements
      const isHover = !!(e.target as HTMLElement)?.closest('a, button, [data-hover], select');
      ring.current?.classList.toggle('hover', isHover);
    };

    const animRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      }
      requestAnimationFrame(animRing);
    };

    window.addEventListener('mousemove', onMove);
    const rafId = requestAnimationFrame(animRing);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

/* ── Liquid Moving Gradient Background ── */
function LiquidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large animated fluid orbs */}
      <div className="absolute top-[5%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-violet-600/10 to-indigo-600/10 blur-[130px] animate-[float-slow_25s_infinite_ease-in-out]" />
      <div className="absolute top-[35%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-cyan-500/8 to-blue-500/8 blur-[150px] animate-[float-slow_30s_infinite_ease-in-out_2s]" />
      <div className="absolute bottom-[30%] left-[-25%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-tr from-purple-500/5 to-pink-500/5 blur-[130px] animate-[float-slow_28s_infinite_ease-in-out_4s]" />
      <div className="absolute bottom-[5%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-emerald-500/5 to-teal-500/5 blur-[130px] animate-[float-slow_22s_infinite_ease-in-out_1s]" />
    </div>
  );
}

/* ── Portfolio page ── */
function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-950 overflow-x-hidden relative">
      {/* Global Noise & Liquid Backdrop */}
      <div className="noise-overlay" />
      <LiquidBackground />

      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}

/* ── Root ── */
function App() {
  const isAdmin = window.location.pathname === '/vk-studio';

  return (
    <PortfolioProvider>
      {/* Cursor is global — works across ALL sections */}
      <GlobalCursor />
      {isAdmin ? <AdminPage /> : <Portfolio />}
    </PortfolioProvider>
  );
}

export default App;
