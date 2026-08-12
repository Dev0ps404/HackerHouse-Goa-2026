import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, ShieldCheck } from './Icons';

interface HeaderProps {
  onNavigateToGenerator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToGenerator }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 transition-all duration-300 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl transition-all duration-300 pointer-events-auto ${
          scrolled
            ? 'glass-panel shadow-2xl shadow-emerald-950/80 border-yellow-500/30 backdrop-blur-xl bg-[#022C1F]/90'
            : 'bg-[#033B29]/60 border border-yellow-500/20 backdrop-blur-md'
        }`}
      >
        {/* Brand / Exact Official Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/hhgoa-logo.jpg"
            alt="Hacker House Goa Logo"
            className="w-10 h-10 rounded-xl border border-yellow-400/50 shadow-md group-hover:scale-105 transition-transform object-cover"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-extrabold tracking-tight text-white text-base leading-none">
              <span className="text-yellow-400">HACKER</span>
              <span className="text-pink-500 font-black px-1.5 rounded bg-pink-500/10 text-xs border border-pink-500/30">
                GOA
              </span>

              <span className="text-yellow-400">HOUSE</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider leading-tight mt-0.5">
              HH GOA 2026 // BUILDER IDENTITY
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-100">
          <a
            href="#how-it-works"
            className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-yellow-400" />
            How It Works
          </a>
          <a
            href="#generator"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToGenerator();
            }}
            className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            Generator
          </a>
        </nav>

        {/* Primary CTA */}
        <button
          onClick={onNavigateToGenerator}
          className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 px-4 sm:px-5 py-2 text-xs sm:text-sm font-extrabold text-emerald-950 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
            Create My Frame
          </span>
        </button>
      </div>
    </header>
  );
};
