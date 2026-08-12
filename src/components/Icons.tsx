import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const Sparkles: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-6.857 2.286L11 21l-2.286-6.857L2 12l6.857-2.286L11 3z" />
  </svg>
);

export const ArrowRight: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export const Compass: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

export const ShieldCheck: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export const Shield: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const UserCheck: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 11a4 4 0 100-8 4 4 0 000 8zm8.5 0l2 2 4-4" />
  </svg>
);

export const Code: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

export const UploadCloud: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 16l-4-4m0 0l-4 4m4-4v12M19 19A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
  </svg>
);

export const Sliders: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-7m0-4V3m8 18v-11m0-4V3m8 18v-3m0-4V3M1 14h6m2-6h6m2 8h6" />
  </svg>
);

export const Zap: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const Share2: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const ImageIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const RefreshCw: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M23 4v6h-6M1 20v-6h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);

export const Trash2: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
  </svg>
);

export const CheckCircle2: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const AlertTriangle: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
  </svg>
);

export const Loader2: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 12v4m8-10h-4M6 12H2m15.364-6.364l-2.828 2.828M7.464 16.536L4.636 19.364m12.728 0l-2.828-2.828M7.464 7.464L4.636 4.636" />
  </svg>
);

export const IdCard: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <circle cx="8" cy="11" r="3" />
    <line x1="14" y1="9" x2="18" y2="9" />
    <line x1="14" y1="13" x2="18" y2="13" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 18a4 4 0 016 0" />
  </svg>
);

export const User: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);

export const Code2: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const ZoomIn: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

export const ZoomOut: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

export const Move: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <polyline points="5 9 2 12 5 15" />
    <polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" />
    <polyline points="19 9 22 12 19 15" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

export const RotateCcw: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <polyline points="1 4 1 10 7 10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
);

export const ArrowUp: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

export const ArrowDown: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

export const ArrowLeft: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const Download: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export const Check: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const AlertCircle: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export const Info: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
