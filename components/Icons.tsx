import React from 'react';

type IconProps = {
  className?: string;
};

export const SunIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <defs>
      <radialGradient id="sunIconGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FBBF24" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="6" fill="url(#sunIconGradient)" />
    <path fill="#FBBF24" d="M12 1a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0V1.75A.75.75 0 0 1 12 1zm0 18a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1-.75-.75zm-6.1-3.2a.75.75 0 0 1 1.06-1.06l1.77 1.77a.75.75 0 1 1-1.06 1.06l-1.77-1.77zm10.32-8.42a.75.75 0 0 1 1.06-1.06l1.77 1.77a.75.75 0 1 1-1.06 1.06l-1.77-1.77zM1 12a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 12zm18 0a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75zM5.9 5.9a.75.75 0 0 1 0-1.06l1.77-1.77a.75.75 0 0 1 1.06 1.06L7 6.96a.75.75 0 0 1-1.06 0zm10.32 10.32a.75.75 0 0 1 0-1.06l1.77-1.77a.75.75 0 0 1 1.06 1.06L17 17.28a.75.75 0 0 1-1.06 0z" />
  </svg>
);

export const CloudIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 32 20">
      <path fill="#F0F9FF" d="M28.5,10.5 C31.5,10.5 32,7.5 30,6 C28.5,5 27,3 25,3 C22,0 16,0 14,3 C12,1 8,2 6,5 C3,5 0,8 1.5,12 C2.5,15.5 8,17 11.5,15.5" />
      <path fill="#E0F2FE" d="M30,12 C34,12 34,8 31,7 C30,6 28,4.5 26.5,4.5 C23,0.5 16,0.5 14,4 C11,2 7,3 5,6 C1,6 -1,10 2,14 C4,17.5 9,19 13,17.5 L13,17.5 C10.6,18.6 6.1,17.3 4.3,14.2 C2.3,10.7 4.3,6.8 8.4,6.2 C9.4,4.4 12.1,3.4 14.5,4.5 C16.5,2.1 20.4,2.1 23,4.5 C24.9,4.2 28.1,5.2 29.6,7.7 C32.1,8.9 31.7,11.8 29.5,12 Z" />
    </svg>
);


export const DropletsIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 24 24">
        <defs>
            <radialGradient id="dropGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#93C5FD"/>
                <stop offset="100%" stopColor="#3B82F6"/>
            </radialGradient>
        </defs>
        <path fill="url(#dropGrad)" d="M12 21.35C14.21 21.35 16 19.55 16 17.35C16 15.88 14.9 13.2 13.25 10.95C12.78 10.25 11.22 10.25 10.75 10.95C9.1 13.2 8 15.88 8 17.35C8 19.55 9.79 21.35 12 21.35Z"/>
        <path fill="url(#dropGrad)" d="M7 14.35C8.66 14.35 10 12.98 10 11.35C10 10.18 9.12 8.1 7.75 6.3C7.38 5.75 6.62 5.75 6.25 6.3C4.88 8.1 4 10.18 4 11.35C4 12.98 5.34 14.35 7 14.35Z"/>
        <path fill="url(#dropGrad)" d="M17 14.35C18.66 14.35 20 12.98 20 11.35C20 10.18 19.12 8.1 17.75 6.3C17.38 5.75 16.62 5.75 16.25 6.3C14.88 8.1 14 10.18 14 11.35C14 12.98 15.34 14.35 17 14.35Z"/>
        <path fill="#EFF6FF" opacity="0.7" d="M12.5 17.5 A 1 1 0 0 1 11.5 16.5 A 1 1 0 0 1 12.5 15.5 A 1 1 0 0 1 13.5 16.5 A 1 1 0 0 1 12.5 17.5 Z" transform="rotate(45 12.5 16.5)"/>
    </svg>
);

export const WaterIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 100 100">
        <path d="M 0 50 Q 25 20, 50 50 T 100 50 L 100 100 L 0 100 Z" fill="#60A5FA"/>
        <path d="M 0 60 Q 25 30, 50 60 T 100 60" fill="none" stroke="#EFF6FF" strokeWidth="5"/>
        <path d="M 0 70 Q 25 40, 50 70 T 100 70 L 100 100 L 0 100 Z" fill="#3B82F6"/>
    </svg>
);


export const XIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ArrowUp: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19V5m-7 7l7-7 7 7" />
    </svg>
);

export const ArrowDown: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 5v14m-7-7l7 7 7-7" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const QuestionMarkCircleIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M20 4.5l-1.5 1.5A9 9 0 105.64 15.36L4 13" />
    </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.5 2h-13A2.5 2.5 0 003 4.5V9a2 2 0 002 2h1.5a1.5 1.5 0 011.5 1.5v3.167a3.5 3.5 0 00-.5 1.833a3.5 3.5 0 003.5 3.5a3.5 3.5 0 003.5-3.5a3.5 3.5 0 00-.5-1.833V12.5a1.5 1.5 0 011.5-1.5H19a2 2 0 002-2V4.5A2.5 2.5 0 0018.5 2zM12 20a1.5 1.5 0 01-1.5-1.5a1.5 1.5 0 011.5-1.5a1.5 1.5 0 011.5 1.5a1.5 1.5 0 01-1.5 1.5zM19 9h-1.5a3.5 3.5 0 00-3.5 3.5v.01c.236.8.058 1.69-.5 2.49h-3c-.558-.8-.736-1.69-.5-2.49V12.5A3.5 3.5 0 006.5 9H5V4.5a.5.5 0 01.5-.5h13a.5.5 0 01.5.5V9z"/>
    </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zM9 21a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z"/>
    </svg>
);
