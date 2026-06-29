import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = "w-4 h-4" }) => {
  const norm = name.toLowerCase().replace(/[\s\.\-\/]/g, '');

  switch (norm) {
    case 'react':
    case 'reactjs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30, 12, 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90, 12, 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150, 12, 12)" />
          <circle cx="12" cy="12" r="2" fill="#61dafb" />
        </svg>
      );
    case 'next':
    case 'nextjs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="black" />
          <path d="M16.5 16.5L11.5 9v7.5H10V7.5h1.5l5 7.5V7.5h1.5v9h-1.5z" fill="white" />
        </svg>
      );
    case 'html':
    case 'html5':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.7 6.1H7.8l.3 3.3h7.6l-.3 3.5-3.4 1.1-3.4-1.1-.2-2.3H5.1l.4 4.8 6.5 2.1 6.5-2.1.8-8.5.1-1.3z" fill="#E34F26" />
        </svg>
      );
    case 'css':
    case 'css3':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.7 6.1H7.8l.3 3.3h7.6l-.3 3.5-3.4 1.1-3.4-1.1-.2-2.3H5.1l.4 4.8 6.5 2.1 6.5-2.1.8-8.5.1-1.3z" fill="#1572B6" />
        </svg>
      );
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.002 2c-5.522 0-5 2.033-5 3.89v1.942H11.5v1.17H5.2c-2.457 0-4.2 1.34-4.2 3.818v3.298c0 2.478 1.943 3.633 4.2 3.633h1.8v-2.522c0-2.478 2.022-4.5 4.5-4.5h6.3v-1.94c0-2.29-.478-4.917-5.8-4.917z" fill="#387eb8"/>
          <path d="M11.998 22c5.523 0 5-2.033 5-3.89v-1.942h-4.498v-1.17H18.8c2.457 0 4.2-1.34 4.2-3.818v-3.298c0-2.478-1.943-3.633-4.2-3.633h-1.8v2.522c0 2.478-2.022 4.5-4.5 4.5H6.2v1.94c0 2.29.478 4.917 5.8 4.917z" fill="#ffe052"/>
        </svg>
      );
    case 'django':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.2 2c-.6 0-1.2.1-1.8.3v5.1c.6-.4 1.2-.6 1.9-.6 1.8 0 2.9 1.3 2.9 3.4v2.5c0 2.1-1.1 3.4-2.9 3.4-.7 0-1.3-.2-1.9-.6v1.1c.7.4 1.6.6 2.4.6 2.8 0 4.3-1.8 4.3-4.5V10c0-2.7-1.5-4.5-4.3-4.5-.2 0-.4 0-.6.1V2h-1.8zm-4.3 7.1c-.8 0-1.5.3-2 .8v5.2c.5.5 1.2.8 2 .8 1.1 0 1.7-.7 1.7-2V11c0-1.3-.6-1.9-1.7-1.9z" fill="#092E20" />
        </svg>
      );
    case 'fastapi':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <rect width="24" height="24" rx="5" fill="#009688" />
          <path d="M13 3L6 13h5v8l7-10h-5z" fill="white" />
        </svg>
      );
    case 'nodejs':
    case 'node':
      return (
        <svg className={`${className} text-emerald-500`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4 6.5v9L12 22l8-4.5v-9L12 2zm-1 15.5L6.5 15v-5L11 7.5v10zm6.5-2.5l-4.5 2.5v-10l4.5 2.5v5z" />
        </svg>
      );
    case 'express':
    case 'expressjs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 'mongodb':
    case 'mongo':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C9.5 5.5 8 9 8 12.5c0 3 1.5 5.5 4 7.5 2.5-2 4-4.5 4-7.5C16 9 14.5 5.5 12 2zm0 15c-1.5-1.5-2.5-3-2.5-5 0-2 1-4.5 2.5-7 1.5 2.5 2.5 5 2.5 7 0 2-1 3.5-2.5 5z" fill="#47A248"/>
        </svg>
      );
    case 'redis':
      return (
        <svg className={`${className} text-red-500`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 10l-10-5v6l10 5 10-5v-6l-10 5z" />
        </svg>
      );
    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.2 2c-5.5 0-10 4.5-10 10 0 4.2 2.6 7.8 6.3 9.3l-.2-1.3c-.1-.7.2-1.4.8-1.7 1.2-.6 2.3-1.6 2.8-2.9l.4-1c.2-.5.7-.8 1.2-.8h1.2c1.1 0 2-.9 2-2V9.2c0-1.1-.9-2-2-2h-3.4c-.6 0-1.1-.3-1.4-.8l-.8-1.3C8.4 4.3 7.2 4 6 4H5.3c-.6 0-1 .4-1 1s.4 1 1 1H6c.8 0 1.6.2 2.3.6l.8 1.3c.6.9 1.6 1.5 2.7 1.5H16c.6 0 1 .4 1 1v2.4c0 .6-.4 1-1 1h-1.2c-1.1 0-2 .9-2 2v.2c0 .6-.3 1.1-.8 1.4-.7.4-1.2 1-1.4 1.8l-.4 2.2c1.3.4 2.8.6 4.2.4 4.8-.6 8.2-5 7.6-9.8C22.6 6.4 17.8 2 12.2 2z" fill="#00758F" />
        </svg>
      );
    case 'postgresql':
    case 'postgres':
      return (
        <svg className={`${className} text-blue-400`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm2.5 14.5c-.3.3-.7.5-1.2.5-.7 0-1.2-.4-1.3-1.1h2.5c0-.6-.3-1.1-.8-1.4-.5-.3-1.1-.4-1.7-.2v-2.3h2.5c0-.8-.6-1.5-1.5-1.5h-1v-1h2c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-5.5v11.5c0 .8.7 1.5 1.5 1.5h2.2c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5z" />
        </svg>
      );
    case 'sqlite':
      return (
        <svg className={`${className} text-sky-400`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 6v12l10 4 10-4V6l-10-4zm8 15.3l-8 3.2-8-3.2V8.7l8-3.2 8 3.2v8.6z" />
        </svg>
      );
    case 'firebase':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.89 15.75L10.22 2.2a.96.96 0 0 1 1.76 0l1.71 3.25z" fill="#FFA611" />
          <path d="M13.69 5.45l2.25 4.3-8.8 8.4z" fill="#F38220" />
          <path d="M3.89 15.75L12 21.8c.32.24.78.24 1.1 0l7.01-5.3L13.69 5.45z" fill="#DD2C00" />
        </svg>
      );
    case 'supabase':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.4 11.6l-9.1-5.5a.8.8 0 0 0-1.2.7v3.2c0 .4-.2.7-.5.9L2.6 15.7c-.7.4-.7 1.4 0 1.8l9.1 5.5a.8.8 0 0 0 1.2-.7v-3.2c0-.4.2-.7.5-.9l8-4.8c.7-.4.7-1.4 0-1.8z" fill="#3ECF8E" />
        </svg>
      );
    case 'typescript':
    case 'ts':
      return (
        <svg className={`${className} text-blue-500`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 2h20v20H2V2zm12.5 11.5c.3 0 .5-.2.5-.5v-4c0-.3-.2-.5-.5-.5h-4c-.3 0-.5.2-.5.5v1h1v-.5h2.5V11H12v1h1.5v1H11v1h3.5zm4 0c.3 0 .5-.2.5-.5v-4c0-.3-.2-.5-.5-.5h-3.5v5h3.5zm-1.5-1H16v-2.5h1.5V12.5z" />
        </svg>
      );
    case 'javascript':
    case 'js':
      return (
        <svg className={`${className} text-yellow-400`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 2h20v20H2V2zm16.5 14.5c0-1.5-.8-2.2-2.3-2.7l-.8-.3c-.6-.2-.8-.4-.8-.8v-.1c0-.4.3-.6.9-.6.7 0 1 .3 1.1.9h1.3c-.2-1.3-1.1-2-2.4-2s-2.3.8-2.3 2.1c0 1.3.8 2 2.2 2.5l.8.3c.7.2.9.5.9.9v.1c0 .5-.4.7-1.1.7-.8 0-1.2-.4-1.3-1.1H12c.1 1.4 1 2.2 2.5 2.2s2.5-.8 2.5-2.2z" />
        </svg>
      );
    case 'tailwind':
    case 'tailwindcss':
      return (
        <svg className={`${className} text-cyan-400`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 6.5c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3-1-1-2.1-2.2-4.6-2.2zM6.5 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3-1-1-2.1-2.2-4.6-2.2z" />
        </svg>
      );
    case 'docker':
      return (
        <svg className={`${className} text-sky-500`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.98 4.218c-.23 0-.41.19-.41.42v2.508c0 .23.18.42.41.42h2.51c.23 0 .41-.19.41-.42v-2.508c0-.23-.18-.42-.41-.42h-2.51zm-3.34 0c-.23 0-.41.19-.41.42v2.508c0 .23.18.42.41.42h2.51c.23 0 .41-.19.41-.42v-2.508c0-.23-.18-.42-.41-.42h-2.51zm-3.34 0c-.23 0-.41.19-.41.42v2.508c0 .23.18.42.41.42h2.51c.23 0 .41-.19.41-.42v-2.508c0-.23-.18-.42-.41-.42H7.3zm10.02 3.344c-.23 0-.41.19-.41.42v2.508c0 .23.18.42.41.42h2.51c.23 0 .41-.19.41-.42v-2.508c0-.23-.18-.42-.41-.42h-2.51zm-3.34 0c-.23 0-.41.19-.41.42v2.508c0 .23.18.42.41.42h2.51c.23 0 .41-.19.41-.42v-2.508c0-.23-.18-.42-.41-.42h-2.51zm-3.34 0c-.23 0-.41.19-.41.42v2.508c0 .23.18.42.41.42h2.51c.23 0 .41-.19.41-.42v-2.508c0-.23-.18-.42-.41-.42H10.63zm-3.34 0c-.23 0-.41.19-.41.42v2.508c0 .23.18.42.41.42h2.51c.23 0 .41-.19.41-.42v-2.508c0-.23-.18-.42-.41-.42H7.3zM2 13.06c0 4.14 3.36 7.5 7.5 7.5h8.92c1.7 0 3.08-1.38 3.08-3.08v-1.12c0-1.7-1.38-3.08-3.08-3.08h-1.42c.26-.81.26-1.69 0-2.5H9.5c-4.14 0-7.5 3.36-7.5 7.5zm5.5-2.5c-.23 0-.41.19-.41.42v2.508c0 .23.18.42.41.42h2.51c.23 0 .41-.19.41-.42V10.98c0-.23-.18-.42-.41-.42H7.5z" />
        </svg>
      );
    case 'git':
    case 'github':
      return (
        <svg className={`${className} text-orange-500`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.13 10.93L13.07 3.87a1.5 1.5 0 0 0-2.12 0l-1.92 1.92 3.06 3.06a1.5 1.5 0 0 1 2.12 0 1.5 1.5 0 0 1 0 2.12L10.3 14.9a1.5 1.5 0 0 1-2.12 0l-3.06-3.06-1.92 1.92a1.5 1.5 0 0 0 0 2.12l7.06 7.06a1.5 1.5 0 0 0 2.12 0l7.06-7.06a1.5 1.5 0 0 0 0-2.12z" />
        </svg>
      );
    case 'linux':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a4.5 4.5 0 00-4.5 4.5c0 1.8.8 3.5 1.5 5.1-.3.4-.7.9-.7 1.4 0 .8.4 1.3 1.2 1.3a2 2 0 001-.4c.7.4 1.5.7 2.3.8-.5.8-1.5 1.3-2.5 1.3-.5 0-.8.2-1 .4 0 .4.5.9 1.5.9 2.5 0 4.5-1.3 4.5-3.1 0-.3 0-.6-.1-.8 1.1-.3 1.9-1.1 1.9-2.2 0-.5-.2-.9-.5-1.3.7-1.6 1.5-3.3 1.5-5.1A4.5 4.5 0 0012 2zm-1.5 5a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z" fill="#FCC624" />
        </svg>
      );
    case 'postman':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <rect width="24" height="24" rx="5" fill="#FF6C37" />
          <path d="M18.8 9.2l-6-4.5a1.2 1.2 0 00-1.6 0l-6 4.5A1.2 1.2 0 005 10.2v6.4A1.2 1.2 0 006.2 17.8h11.6a1.2 1.2 0 001.2-1.2v-6.4a1.2 1.2 0 00-.2-1zM12 7.5a1.5 1.5 0 11-1.5 1.5A1.5 1.5 0 0112 7.5zm4 7.5H8v-1.5h8z" fill="white" />
        </svg>
      );
    case 'vscode':
    case 'visualstudio':
    case 'visualstudiocode':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.15 2.587L17.87.103a1.01 1.01 0 0 0-1.119.192L8.66 7.79 3.528 3.9a1.014 1.014 0 0 0-1.25.016L.26 5.86c-.347.307-.347.858 0 1.164L4.85 11.23.26 15.353c-.347.307-.347.858 0 1.164l2.018 1.944a1.013 1.013 0 0 0 1.25.016l5.132-3.89 8.09 7.495a1.008 1.008 0 0 0 1.12.192l5.28-2.484c.51-.24.85-.754.85-1.32V3.907c0-.566-.34-.1-.85-.32zm-6.52 14.505l-6.8-5.118 6.8-5.118v10.236z" fill="#007ACC" />
        </svg>
      );
    case 'aws':
      return (
        <svg className={`${className} text-amber-500`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 13.98c-.62-.23-.96-.65-.96-1.22 0-.96.96-1.42 2.53-1.42v.85c0 .34-.17.6-.53.74-.29.11-.74.17-1.04.05zm1.57-2.61c-1.57 0-3.32.26-3.32 2.1 0 1.25.96 1.82 2.1 1.82.96 0 1.88-.43 2.1-1.12v.94h1.17V12.1h-2.05v1.27z" />
        </svg>
      );
    case 'cybersecurity':
    case 'security':
    case 'penetrationtesting':
    case 'vulnerabilityscanning':
    case 'nmap':
    case 'scapy':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    default:
      // Code/Terminal fallback icon
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
};
