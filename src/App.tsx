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

/* ── Portfolio page ── */
function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-950 overflow-x-hidden">
      <Header />
      <main>
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
