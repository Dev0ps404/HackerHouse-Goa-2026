import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-yellow-500/20 text-center relative z-10 bg-[#011F15]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2.5 font-extrabold text-white">
          <img src="/hhgoa-logo.jpg" alt="Logo" className="w-6 h-6 rounded-md object-cover border border-yellow-400" />
          <span className="text-yellow-400">HACKER HOUSE</span>
          <span className="text-pink-500">GOA</span>

          <span className="text-emerald-300">2026</span>
        </div>

        <div className="text-emerald-200">Built for builders.</div>

        <div className="text-pink-400 font-extrabold tracking-wider text-sm">
          #FrameInGoa
        </div>
      </div>
    </footer>
  );
};
