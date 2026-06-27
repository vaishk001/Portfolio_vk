import React from 'react';

interface ProjectArchitectureProps {
  projectId: string;
  techStack: string[];
}

export const ProjectArchitecture: React.FC<ProjectArchitectureProps> = ({ projectId, techStack }) => {
  // Extract key tech names for the generic fallback
  const frontendTech = techStack.find(t => /react|next|vue|html|css|tailwind/i.test(t)) || 'Frontend Client';
  const backendTech = techStack.find(t => /node|express|flask|python|django|fastapi|server/i.test(t)) || 'API Server';
  const dbTech = techStack.find(t => /mongo|postgre|sql|redis|db|firebase/i.test(t)) || 'Database';

  // Rendering specific SVGs based on project ID
  switch (projectId) {
    case 'p1': // E-Commerce Platform
      return (
        <svg viewBox="0 0 420 200" className="w-full h-full bg-gray-950/40 rounded-xl border border-white/5 p-2 font-mono">
          <defs>
            <linearGradient id="purpleCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid background */}
          <path d="M 0 40 L 420 40 M 0 80 L 420 80 M 0 120 L 420 120 M 0 160 L 420 160 M 80 0 L 80 200 M 160 0 L 160 200 M 240 0 L 240 200 M 320 0 L 320 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

          {/* Node: React Client */}
          <g transform="translate(15, 60)">
            <rect width="80" height="45" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="40" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">React SPA</text>
            <text x="40" y="34" fill="#a78bfa" fontSize="8" textAnchor="middle">Vercel (Host)</text>
          </g>

          {/* Node: Node.js API */}
          <g transform="translate(160, 60)">
            <rect width="80" height="45" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="40" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Node / Express</text>
            <text x="40" y="34" fill="#22d3ee" fontSize="8" textAnchor="middle">Render (API)</text>
          </g>

          {/* Node: MongoDB Atlas */}
          <g transform="translate(310, 30)">
            <rect width="90" height="40" rx="8" fill="#062f17" stroke="#10b981" strokeWidth="1.5" />
            <text x="45" y="18" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">MongoDB</text>
            <text x="45" y="30" fill="#34d399" fontSize="8" textAnchor="middle">Atlas Cloud</text>
          </g>

          {/* Node: Redis Cache */}
          <g transform="translate(310, 110)">
            <rect width="90" height="40" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="45" y="18" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Redis Cache</text>
            <text x="45" y="30" fill="#f87171" fontSize="8" textAnchor="middle">In-Memory</text>
          </g>

          {/* Node: Stripe API */}
          <g transform="translate(160, 145)">
            <rect width="80" height="30" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="40" y="18" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Stripe Gateway</text>
          </g>

          {/* Request flows (Paths) */}
          {/* React -> API */}
          <path id="p1_client_api" d="M 95 82.5 L 160 82.5" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#7c3aed" filter="url(#glow1)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 95 82.5 L 160 82.5" />
          </circle>

          {/* API -> MongoDB */}
          <path id="p1_api_db" d="M 240 75 Q 275 50 310 50" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#10b981" filter="url(#glow1)">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 240 75 Q 275 50 310 50" />
          </circle>

          {/* API -> Redis */}
          <path id="p1_api_redis" d="M 240 90 Q 275 130 310 130" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#ef4444" filter="url(#glow1)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 240 90 Q 275 130 310 130" />
          </circle>

          {/* API -> Stripe */}
          <path id="p1_api_stripe" d="M 200 105 L 200 145" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#6366f1" filter="url(#glow1)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 200 105 L 200 145" />
          </circle>
        </svg>
      );

    case 'p2': // Network Vulnerability Scanner
      return (
        <svg viewBox="0 0 420 200" className="w-full h-full bg-gray-950/40 rounded-xl border border-white/5 p-2 font-mono">
          <defs>
            <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path d="M 0 40 L 420 40 M 0 80 L 420 80 M 0 120 L 420 120 M 0 160 L 420 160 M 80 0 L 80 200 M 160 0 L 160 200 M 240 0 L 240 200 M 320 0 L 320 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

          {/* Node: React UI */}
          <g transform="translate(15, 60)">
            <rect width="80" height="45" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="40" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">React UI</text>
            <text x="40" y="34" fill="#a78bfa" fontSize="8" textAnchor="middle">Web Terminal</text>
          </g>

          {/* Node: Flask API */}
          <g transform="translate(150, 60)">
            <rect width="90" height="45" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="45" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Flask API</text>
            <text x="45" y="34" fill="#22d3ee" fontSize="8" textAnchor="middle">Python Backend</text>
          </g>

          {/* Node: Scapy Engine */}
          <g transform="translate(150, 140)">
            <rect width="90" height="35" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
            <text x="45" y="16" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Scapy Engine</text>
            <text x="45" y="28" fill="#f87171" fontSize="8" textAnchor="middle">Raw Packet Gen</text>
          </g>

          {/* Node: Target Network */}
          <g transform="translate(310, 140)">
            <rect width="95" height="35" rx="6" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
            <text x="47" y="16" fill="#f87171" fontSize="8" textAnchor="middle" fontWeight="bold">Target Network</text>
            <text x="47" y="28" fill="#ef4444" fontSize="8" textAnchor="middle">Hosts / Ports</text>
          </g>

          {/* Node: SQLite */}
          <g transform="translate(310, 60)">
            <rect width="95" height="40" rx="8" fill="#062f17" stroke="#10b981" strokeWidth="1.5" />
            <text x="47" y="18" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">SQLite DB</text>
            <text x="47" y="30" fill="#34d399" fontSize="8" textAnchor="middle">Scan History</text>
          </g>

          {/* Flows */}
          {/* React -> Flask */}
          <path d="M 95 82.5 L 150 82.5" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#7c3aed" filter="url(#glow2)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 95 82.5 L 150 82.5" />
          </circle>

          {/* Flask -> Scapy */}
          <path d="M 195 105 L 195 140" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#06b6d4" filter="url(#glow2)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 195 105 L 195 140" />
          </circle>

          {/* Flask -> SQLite */}
          <path d="M 240 82.5 L 310 82.5" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#10b981" filter="url(#glow2)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 240 82.5 L 310 82.5" />
          </circle>

          {/* Scapy -> Target */}
          <path d="M 240 157.5 L 310 157.5" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#ef4444" filter="url(#glow2)">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 240 157.5 L 310 157.5" />
          </circle>
        </svg>
      );

    case 'p3': // Real-Time Collaboration Tool
      return (
        <svg viewBox="0 0 420 200" className="w-full h-full bg-gray-950/40 rounded-xl border border-white/5 p-2 font-mono">
          <defs>
            <filter id="glow3" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path d="M 0 40 L 420 40 M 0 80 L 420 80 M 0 120 L 420 120 M 0 160 L 420 160 M 80 0 L 80 200 M 160 0 L 160 200 M 240 0 L 240 200 M 320 0 L 320 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

          {/* User 1 */}
          <g transform="translate(15, 35)">
            <rect width="80" height="40" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="40" y="18" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Collaborator 1</text>
            <text x="40" y="30" fill="#a78bfa" fontSize="8" textAnchor="middle">Next.js UI</text>
          </g>

          {/* User 2 */}
          <g transform="translate(15, 110)">
            <rect width="80" height="40" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="40" y="18" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Collaborator 2</text>
            <text x="40" y="30" fill="#a78bfa" fontSize="8" textAnchor="middle">Next.js UI</text>
          </g>

          {/* Node: Socket.io Server */}
          <g transform="translate(160, 70)">
            <rect width="90" height="45" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="45" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Socket.io</text>
            <text x="45" y="34" fill="#22d3ee" fontSize="8" textAnchor="middle">WS Coordinator</text>
          </g>

          {/* Node: Redis PubSub */}
          <g transform="translate(310, 35)">
            <rect width="95" height="40" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="47" y="18" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Redis Adapter</text>
            <text x="47" y="30" fill="#f87171" fontSize="8" textAnchor="middle">State Sync</text>
          </g>

          {/* Node: PostgreSQL */}
          <g transform="translate(310, 110)">
            <rect width="95" height="40" rx="8" fill="#172554" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="47" y="18" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">PostgreSQL</text>
            <text x="47" y="30" fill="#60a5fa" fontSize="8" textAnchor="middle">Document DB</text>
          </g>

          {/* WS Flows */}
          {/* User 1 <-> WS */}
          <path d="M 95 55 Q 127.5 55 160 80" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#06b6d4" filter="url(#glow3)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 95 55 Q 127.5 55 160 80" />
          </circle>

          {/* User 2 <-> WS */}
          <path d="M 95 130 Q 127.5 130 160 100" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#06b6d4" filter="url(#glow3)">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 95 130 Q 127.5 130 160 100" />
          </circle>

          {/* WS -> Redis */}
          <path d="M 250 82.5 Q 280 82.5 310 55" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#ef4444" filter="url(#glow3)">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 250 82.5 Q 280 82.5 310 55" />
          </circle>

          {/* WS -> Postgres */}
          <path d="M 250 92.5 Q 280 92.5 310 130" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#3b82f6" filter="url(#glow3)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 250 92.5 Q 280 92.5 310 130" />
          </circle>
        </svg>
      );

    case 'p4': // Password Strength Analyzer
      return (
        <svg viewBox="0 0 420 200" className="w-full h-full bg-gray-950/40 rounded-xl border border-white/5 p-2 font-mono">
          <defs>
            <filter id="glow4" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path d="M 0 40 L 420 40 M 0 80 L 420 80 M 0 120 L 420 120 M 0 160 L 420 160 M 80 0 L 80 200 M 160 0 L 160 200 M 240 0 L 240 200 M 320 0 L 320 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

          {/* Node: React UI */}
          <g transform="translate(15, 60)">
            <rect width="80" height="45" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="40" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">React SPA</text>
            <text x="40" y="34" fill="#a78bfa" fontSize="8" textAnchor="middle">Password UI</text>
          </g>

          {/* Node: Flask Backend */}
          <g transform="translate(160, 60)">
            <rect width="90" height="45" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="45" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Flask API</text>
            <text x="45" y="34" fill="#22d3ee" fontSize="8" textAnchor="middle">Entropy Calc</text>
          </g>

          {/* Node: HIBP API */}
          <g transform="translate(310, 60)">
            <rect width="95" height="45" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="47" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">HIBP API</text>
            <text x="47" y="34" fill="#f87171" fontSize="8" textAnchor="middle">Breach Database</text>
          </g>

          {/* Flows */}
          {/* React -> Flask */}
          <path d="M 95 82.5 L 160 82.5" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#7c3aed" filter="url(#glow4)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 95 82.5 L 160 82.5" />
          </circle>

          {/* Flask -> HIBP */}
          <path d="M 250 82.5 L 310 82.5" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#ef4444" filter="url(#glow4)">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 250 82.5 L 310 82.5" />
          </circle>
        </svg>
      );

    default: // Dynamic Fallback for Custom Projects
      return (
        <svg viewBox="0 0 420 200" className="w-full h-full bg-gray-950/40 rounded-xl border border-white/5 p-2 font-mono">
          <defs>
            <filter id="glow5" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path d="M 0 40 L 420 40 M 0 80 L 420 80 M 0 120 L 420 120 M 0 160 L 420 160 M 80 0 L 80 200 M 160 0 L 160 200 M 240 0 L 240 200 M 320 0 L 320 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

          {/* Node: Client (Frontend) */}
          <g transform="translate(15, 60)">
            <rect width="80" height="45" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="40" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Client App</text>
            <text x="40" y="34" fill="#a78bfa" fontSize="8" textAnchor="middle" clipPath="ellipse(35px, 10px)">{frontendTech}</text>
          </g>

          {/* Node: API Server */}
          <g transform="translate(160, 60)">
            <rect width="85" height="45" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="42.5" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">API Gateway</text>
            <text x="42.5" y="34" fill="#22d3ee" fontSize="8" textAnchor="middle">{backendTech}</text>
          </g>

          {/* Node: Database */}
          <g transform="translate(310, 60)">
            <rect width="90" height="45" rx="8" fill="#062f17" stroke="#10b981" strokeWidth="1.5" />
            <text x="45" y="20" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">Data Store</text>
            <text x="45" y="34" fill="#34d399" fontSize="8" textAnchor="middle">{dbTech}</text>
          </g>

          {/* Flows */}
          {/* Client -> Server */}
          <path d="M 95 82.5 L 160 82.5" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#7c3aed" filter="url(#glow5)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 95 82.5 L 160 82.5" />
          </circle>

          {/* Server -> Database */}
          <path d="M 245 82.5 L 310 82.5" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1.5" fill="none" />
          <circle r="3" fill="#10b981" filter="url(#glow5)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 245 82.5 L 310 82.5" />
          </circle>
        </svg>
      );
  }
};
