import React, { useState, useEffect } from 'react';

interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: { duration?: number; delay?: number; ease?: string };
  whileInView?: any;
  viewport?: any;
  layoutId?: string;
  className?: string;
}

export const MotionDiv: React.FC<MotionProps> = ({
  children,
  initial,
  animate,
  transition,
  className = '',
  style,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, (transition?.delay || 0) * 1000);
    return () => clearTimeout(timer);
  }, [transition?.delay]);

  const duration = transition?.duration || 0.4;

  const dynamicStyle: React.CSSProperties = {
    transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
    opacity: mounted ? (animate?.opacity ?? 1) : (initial?.opacity ?? 0),
    transform: mounted
      ? `translateY(${animate?.y ?? 0}px) scale(${animate?.scale ?? 1}) rotateY(${animate?.rotateY ?? 0}deg)`
      : `translateY(${initial?.y ?? 0}px) scale(${initial?.scale ?? 1}) rotateY(${initial?.rotateY ?? 0}deg)`,
    ...style,
  };

  return (
    <div className={className} style={dynamicStyle} {...props}>
      {children}
    </div>
  );
};

export const MotionH1: React.FC<MotionProps> = ({ children, initial, animate, transition, className = '', ...props }) => (
  <h1 className={`${className} transition-all duration-500 ease-out`} {...props}>
    {children}
  </h1>
);

export const MotionP: React.FC<MotionProps> = ({ children, initial, animate, transition, className = '', ...props }) => (
  <p className={`${className} transition-all duration-500 ease-out`} {...props}>
    {children}
  </p>
);

export const AnimatePresence: React.FC<{ children: React.ReactNode; mode?: string }> = ({ children }) => (
  <>{children}</>
);

export const motion = {
  div: MotionDiv,
  h1: MotionH1,
  p: MotionP,
};
