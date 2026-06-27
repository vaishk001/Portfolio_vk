import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import type { Project } from '../data/defaults';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const AIAssistant: React.FC = () => {
  const { data } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: `Hi there! 👋 I'm an AI assistant trained on Vaishnavi's resume, projects, and skills. How can I help you evaluate her for your team today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const suggestions = [
    "Tell me about her projects",
    "What are her core skills?",
    "Show me her cybersecurity work",
    "Is she available for internships?",
    "Can I download her resume?",
  ];

  // Smart Offline Local RAG Engine
  const generateOfflineResponse = (query: string): string => {
    const q = query.toLowerCase();
    const { personal, projects, skills, experience } = data;

    // Helper to format projects
    const getProjectsSummary = (filterFn?: (p: Project) => boolean) => {
      const list = filterFn ? projects.filter(filterFn) : projects;
      if (list.length === 0) return "I couldn't find any specific projects matching that criteria, but Vaishnavi has built several great full-stack and security tools.";
      return list
        .map(
          (p) =>
            `• **${p.title}** (${p.category}): ${p.description}\n  *Tech:* ${p.techStack.join(', ')}${p.github ? `\n  *Code:* [GitHub Link](${p.github})` : ''}`
        )
        .join('\n\n');
    };

    // Intent: Resume
    if (/resume|cv|download/i.test(q)) {
      return `Vaishnavi's resume is available for download. ${
        personal.resumeUrl
          ? `You can download it directly here: [Download Resume](${personal.resumeUrl}).`
          : "She is a 3rd Year B.Tech Computer Science & Design student. You can find her contact links in the header or download her resume directly from the Hero section."
      }`;
    }

    // Intent: Cybersecurity Projects
    if (/cyber|security|vulnerability|scanner|password/i.test(q)) {
      return `Vaishnavi has a strong interest in Cybersecurity. Here are her security-focused projects:\n\n${getProjectsSummary(
        (p) => p.category.toLowerCase().includes('security') || p.techStack.some(t => /sec|scapy/i.test(t))
      )}`;
    }

    // Intent: Projects generally
    if (/project|portfolio|built|developed|code|make|created/i.test(q)) {
      return `Here are the main projects Vaishnavi has built:\n\n${getProjectsSummary()}`;
    }

    // Intent: Skills
    if (/skill|know|technology|language|stack|framework|react|python|node|database/i.test(q)) {
      const skillsList = skills
        .map((cat) => `• **${cat.title}**: ${cat.skills.join(', ')}`)
        .join('\n');
      return `Vaishnavi is a versatile developer. Her core technical stack includes:\n\n${skillsList}\n\nShe specializes in the MERN stack (React, Node.js, Express, MongoDB) alongside Python for AI/ML projects.`;
    }

    // Intent: Internship Availability / Work
    if (/intern|avail|work|job|hire|open|position/i.test(q)) {
      return `Yes, Vaishnavi is actively seeking **Software Developer Intern** and **AI/ML Intern** opportunities for 2025/2026. She is based in India and is open to both remote and on-site roles.\n\nYou can reach her directly at **${personal.email || 'vnkumavat05@gmail.com'}** to discuss potential openings!`;
    }

    // Intent: Contact
    if (/contact|email|reach|linkedin|github|message/i.test(q)) {
      return `You can connect with Vaishnavi through the following channels:\n• **Email**: ${personal.email || 'vnkumavat05@gmail.com'}\n• **LinkedIn**: [LinkedIn Profile](${personal.linkedin})\n• **GitHub**: [GitHub Profile](${personal.github})\n\nYou can also use the contact form at the bottom of this page to send her an email directly.`;
    }

    // Intent: Experience
    if (/experience|job|work|internship|history/i.test(q)) {
      if (experience.jobs && experience.jobs.length > 0) {
        const jobsList = experience.jobs
          .map(
            (j) =>
              `• **${j.title}** at ${j.company} (${j.duration})\n  *Key Duties:* ${j.responsibilities.join('; ')}\n  *Tech Used:* ${j.technologies.join(', ')}`
          )
          .join('\n\n');
        return `Here is a summary of her professional experience:\n\n${jobsList}`;
      }
      return "Vaishnavi is a 3rd-year B.Tech Computer Science & Design student. She has completed internship projects, led the college coding club, and won national level hackathons like Smart India Hackathon.";
    }

    // Intent: Achievements
    if (/achievement|hackathon|winner|award|lead/i.test(q)) {
      const achs = experience.achievements
        .map((a) => `• **${a.title}**: ${a.description}`)
        .join('\n');
      return `Here are some of Vaishnavi's key achievements and leadership roles:\n\n${achs}`;
    }

    // Greetings
    if (/hello|hi|hey|greetings|welcome/i.test(q)) {
      return `Hello! How can I help you today? I can answer questions about Vaishnavi's background, technical skills, projects, or job/internship availability.`;
    }

    // Default response (fallback)
    return `I am an AI assistant representing Vaishnavi Kumavat. I can tell you about:
• Her **Projects** (like the Network Vulnerability Scanner or E-Commerce site)
• Her **Technical Skills** (React, Next.js, Python, Tailwind, databases)
• Her **Experience** (internships, hackathon wins, certifications)
• Her **Availability** for internships and contact information.

What are you most interested in learning?`;
  };

  // Google Gemini API RAG Engine
  const fetchGeminiResponse = async (query: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const { personal, projects, skills, experience } = data;
    const context = `
You are a highly professional AI Recruiter Assistant representing Vaishnavi Kumavat.
Knowledge Base:
- Name: ${personal.firstName} ${personal.lastName}
- Tagline: ${personal.tagline}
- Summary: ${personal.description}
- Bio: ${personal.bio1} ${personal.bio2} ${personal.bio3}
- Education: ${personal.education}
- Contact Email: ${personal.email}
- LinkedIn: ${personal.linkedin}
- GitHub: ${personal.github}
- Availability: ${personal.availableForWork ? 'Actively seeking Software Developer / AI/ML internships' : 'Not currently looking'}
- Skills: ${JSON.stringify(skills)}
- Projects: ${JSON.stringify(projects)}
- Experience & Certifications & Achievements: ${JSON.stringify(experience)}

Guidelines:
1. Answer the user's question naturally, professionally, and concisely (1-3 sentences when possible).
2. Recommend specific projects or skills of Vaishnavi's that match the user's inquiry.
3. Be welcoming, developer-focused, and recruiter-friendly.
4. If a question is unrelated to Vaishnavi's professional profile, politely pivot back to representing her.
5. Format links using markdown like [link text](url).
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${context}\n\nUser Question: ${query}\nAI Response:`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Gemini API');
    }

    const resData = await response.json();
    return (
      resData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I had trouble parsing the response. Please try again."
    );
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      let botResponse = '';
      if (import.meta.env.VITE_GEMINI_API_KEY) {
        botResponse = await fetchGeminiResponse(text);
      } else {
        // Fallback to high-quality local RAG matching
        await new Promise((resolve) => setTimeout(resolve, 800)); // simulate typing delay
        botResponse = generateOfflineResponse(text);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.warn('RAG Online failed, falling back to local engine:', error);
      // Fallback
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: generateOfflineResponse(text),
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9990] font-sans">
      {/* Pulse Orb Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
          aria-label="Open AI Assistant"
        >
          {/* Animated pulsing glow rings */}
          <span className="absolute -inset-1 rounded-full bg-purple-500/30 blur-sm group-hover:bg-purple-500/50 animate-ping duration-1000" />
          <span className="absolute -inset-2 rounded-full bg-cyan-500/10 blur group-hover:bg-cyan-500/20 animate-pulse" />

          {/* Pulsating Neural Core Symbol */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-950/80 border border-purple-500/30">
            <svg
              className="w-5 h-5 text-cyan-400 group-hover:text-purple-300 transition-colors animate-spin-slow"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] flex flex-col rounded-2xl border border-white/10 bg-gray-900/90 backdrop-blur-xl shadow-2xl overflow-hidden animate-float">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-b border-white/10">
            <div className="flex items-center gap-2">
              {/* Rotating glowing core icon */}
              <div className="w-8 h-8 rounded-full bg-gray-950 border border-cyan-500/30 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-cyan-400 animate-spin-slow-r"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-100 flex items-center gap-1.5">
                  AI Recruiter Bot
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </h3>
                <span className="text-[10px] text-gray-400">RAG Knowledge Engine</span>
              </div>
            </div>
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-white/5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-md leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}
                >
                  {m.text.includes('[') ? (
                    // Parse simple markdown links in offline responses
                    <span
                      dangerouslySetInnerHTML={{
                        __html: m.text.replace(
                          /\[([^\]]+)\]\(([^)]+)\)/g,
                          '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline hover:text-cyan-300 font-semibold">$1</a>'
                        ),
                      }}
                    />
                  ) : (
                    m.text
                  )}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-gray-400 text-xs py-1.5 px-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none w-fit">
                <span className="animate-pulse">Thinking</span>
                <span className="flex gap-1">
                  <span className="h-1 w-1 bg-gray-400 rounded-full animate-bounce delay-75" />
                  <span className="h-1 w-1 bg-gray-400 rounded-full animate-bounce delay-150" />
                  <span className="h-1 w-1 bg-gray-400 rounded-full animate-bounce delay-300" />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-4 py-2 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none border-t border-white/5 bg-gray-950/20">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s)}
                className="text-xs bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-gray-300 hover:text-purple-300 px-2.5 py-1.5 rounded-full transition-all duration-200 active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Message input bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 border-t border-white/10 bg-gray-950/50 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about her skills, projects, experience..."
              className="flex-1 bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-xl px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-40 text-white p-2 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center"
            >
              <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
