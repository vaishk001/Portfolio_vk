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
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.002 2c-5.522 0-5 2.033-5 3.89v1.942H11.5v1.17H5.2c-2.457 0-4.2 1.34-4.2 3.818v3.298c0 2.478 1.943 3.633 4.2 3.633h1.8v-2.522c0-2.478 2.022-4.5 4.5-4.5h6.3v-1.94c0-2.29-.478-4.917-5.8-4.917z" fill="#387eb8"/>
          <path d="M11.998 22c5.523 0 5-2.033 5-3.89v-1.942h-4.498v-1.17H18.8c2.457 0 4.2-1.34 4.2-3.818v-3.298c0-2.478-1.943-3.633-4.2-3.633h-1.8v2.522c0 2.478-2.022 4.5-4.5 4.5H6.2v1.94c0 2.29.478 4.917 5.8 4.917z" fill="#ffe052"/>
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
