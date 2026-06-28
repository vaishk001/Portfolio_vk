export interface PersonalInfo {
  firstName: string;
  lastName: string;
  tagline: string;
  description: string;
  bio1: string;
  bio2: string;
  bio3: string;
  photoUrl: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  education: string;
  experienceLevel: string;
  availableForWork: boolean;
  resumeUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  github: string;
  live: string | null;
  category: string;
  image: string;       // kept for backward-compat (Unsplash URL fallback)
  images?: string[];   // local uploads stored as base64 data-URLs
}

export interface SkillCategory {
  id: string;
  title: string;
  color: string; // tailwind text color class e.g. "text-blue-600"
  skills: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credential: string | null;
  url?: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'award' | 'graduation' | 'briefcase' | 'trophy' | 'star' | 'code' | 'zap' | 'heart' | 'globe';
}

export interface PortfolioData {
  personal: PersonalInfo;
  projects: Project[];
  skills: SkillCategory[];
  experience: {
    jobs: Job[];
    certifications: Certification[];
    achievements: Achievement[];
  };
}

export const defaultData: PortfolioData = {
  personal: {
    firstName: 'Vaishnavi',
    lastName: 'Kumavat',
    tagline: 'Full-Stack Developer & AI/ML Enthusiast',
    description: 'Crafting secure, scalable web applications with modern technologies. Turning complex problems into elegant solutions.',
    bio1: "I'm a 3rd-year B.Tech Computer Science & Design student with a strong foundation in software development and AI/ML. I specialize in creating scalable web applications using the MERN stack and React ecosystem.",
    bio2: "My approach combines clean code architecture, machine learning integrations, and user-focused design. I've worked on projects ranging from full-stack web applications to AI-powered tools, consistently delivering solutions that are both intelligent and scalable.",
    bio3: "Currently seeking software developer and AI/ML internship opportunities where I can contribute to impactful projects and continue growing as an engineer.",
    photoUrl: '/vk_image.jpg',
    location: 'India',
    email: 'your.email@example.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    education: 'B.Tech CSE',
    experienceLevel: 'Fresh Graduate',
    availableForWork: true,
    resumeUrl: '',
  },
  projects: [
    {
      id: 'p1',
      title: 'E-Commerce Platform',
      description: 'A full-featured online marketplace with secure payment integration and real-time inventory management.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
      features: ['User authentication with JWT', 'Product search and filtering', 'Shopping cart and wishlist', 'Secure payment gateway integration'],
      github: 'https://github.com/yourusername/ecommerce',
      live: 'https://yourproject.com',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'p2',
      title: 'Network Vulnerability Scanner',
      description: 'Security tool to identify common vulnerabilities in web applications and networks.',
      techStack: ['Python', 'Scapy', 'Flask', 'SQLite', 'React'],
      features: ['Port scanning and service detection', 'SQL injection vulnerability testing', 'XSS vulnerability detection', 'Detailed security reports generation'],
      github: 'https://github.com/yourusername/security-scanner',
      live: null,
      category: 'Cybersecurity',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'p3',
      title: 'Real-Time Collaboration Tool',
      description: 'Collaborative workspace for teams to brainstorm, share ideas, and manage projects in real-time.',
      techStack: ['Next.js', 'Socket.io', 'PostgreSQL', 'Tailwind CSS', 'Redis'],
      features: ['Real-time collaborative whiteboard', 'Video conferencing integration', 'Chat functionality', 'File sharing and role-based access control'],
      github: 'https://github.com/yourusername/collab-tool',
      live: 'https://collab-tool.vercel.app',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'p4',
      title: 'Password Strength Analyzer',
      description: 'A tool to evaluate password security and suggest improvements based on security best practices.',
      techStack: ['Python', 'Flask', 'React', 'Tailwind CSS'],
      features: ['Real-time password strength evaluation', 'Breach database checking', 'Secure password generation', 'Password policy recommendations'],
      github: 'https://github.com/yourusername/password-analyzer',
      live: 'https://password-analyzer.vercel.app',
      category: 'Cybersecurity',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    },
  ],
  skills: [
    { id: 's1', title: 'Frontend', color: 'text-blue-600', skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
    { id: 's2', title: 'Backend', color: 'text-green-600', skills: ['Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'REST APIs'] },
    { id: 's3', title: 'Databases', color: 'text-purple-600', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'] },
    { id: 's4', title: 'DevOps & Tools', color: 'text-orange-600', skills: ['Git', 'Docker', 'Linux', 'Postman', 'VS Code'] },
    { id: 's5', title: 'Cybersecurity', color: 'text-red-600', skills: ['OWASP Top 10', 'Penetration Testing', 'Network Security', 'Vulnerability Assessment'] },
  ],
  experience: {
    jobs: [
      {
        id: 'j1',
        title: 'Software Development Intern',
        company: 'Tech Company Name',
        duration: 'June 2024 - August 2024',
        location: 'Remote',
        responsibilities: [
          'Developed responsive web applications using React and Node.js',
          'Collaborated with senior developers on 3+ production features',
          'Optimized database queries, reducing load time by 30%',
          'Participated in code reviews and agile sprint planning',
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Git'],
      },
    ],
    certifications: [
      { id: 'c1', title: 'Full Stack Web Development', issuer: 'Coursera / Udemy', date: '2024', credential: 'Certificate ID: ABC123' },
      { id: 'c2', title: 'Certified Ethical Hacker (CEH) - In Progress', issuer: 'EC-Council', date: 'Expected 2025', credential: null },
      { id: 'c3', title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2024', credential: 'Certificate ID: XYZ789' },
    ],
    achievements: [
      { id: 'a1', title: 'Hackathon Winner - Smart India Hackathon 2024', description: 'Led a team of 5 to build an AI-powered healthcare solution', icon: 'award' },
      { id: 'a2', title: 'Technical Lead - College Coding Club', description: 'Organized 10+ workshops on web development and cybersecurity', icon: 'graduation' },
      { id: 'a3', title: 'Open Source Contributor', description: 'Contributed to 5+ open-source projects with 50+ commits', icon: 'briefcase' },
      { id: 'a4', title: 'Top 100 - National Coding Competition', description: 'Ranked in top 100 out of 5000+ participants', icon: 'award' },
    ],
  },
};
