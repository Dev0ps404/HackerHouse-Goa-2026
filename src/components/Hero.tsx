import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from './Motion';
import { ArrowRight, UserCheck, Code } from './Icons';

interface HeroProps {
  onNavigateToGenerator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToGenerator }) => {
  const [activeTab, setActiveTab] = useState<'pfp' | 'builder'>('pfp');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev === 'pfp' ? 'builder' : 'pfp'));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 overflow-hidden">
      {/* Emerald & Pink Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#004D34]/80 via-yellow-500/15 to-pink-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Copy Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Eyebrow Pill with Official Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#033B29] border border-yellow-400/40 text-yellow-300 text-xs font-mono font-bold tracking-wider mb-6 shadow-xl"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
            HACKER HOUSE GOA 2026 // OFFICIAL GENERATOR
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6"
          >
            MAKE YOUR FRAME. <br />
            <span className="text-gradient-gold">OWN YOUR </span>
            <span className="text-gradient-pink">GOA.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-emerald-100 max-w-xl mb-10 leading-relaxed font-normal"
          >
            Turn your photo into your official <strong className="text-yellow-300 font-bold">Hacker House Goa 2026</strong> builder identity. Generate high-DPI PFP frames & digital Builder ID cards instantly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onNavigateToGenerator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-emerald-950 font-black text-base shadow-xl shadow-yellow-500/25 hover:shadow-yellow-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Create My Frame</span>
              <ArrowRight className="w-5 h-5 text-emerald-950" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#033B29]/80 hover:bg-[#044D34] text-white font-bold text-base border border-yellow-500/30 hover:border-yellow-400 transition-all duration-200"
            >
              How It Works
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex items-center gap-6 text-xs text-emerald-200/80 font-mono"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              100% Client-Side
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              Retina High DPI
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              No Login Needed
            </span>
          </motion.div>
        </div>

        {/* Right Card Showcase */}
        <div className="lg:col-span-5 relative z-10 flex flex-col items-center">
          {/* Format Showcase Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#011F15]/90 border border-yellow-500/30 mb-4 shadow-xl">
            <button
              onClick={() => setActiveTab('pfp')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'pfp'
                  ? 'bg-yellow-400 text-emerald-950 shadow-md shadow-yellow-500/20'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              PFP Frame
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'builder'
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              Builder ID Card
            </button>
          </div>

          {/* Interactive Card Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-sm relative group"
          >
            {/* Ambient Card Backlight Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-emerald-500 to-pink-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500" />

            <div className="relative glass-panel rounded-3xl p-5 border-2 border-yellow-400/40 bg-[#022E1F]/95 shadow-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'pfp' ? (
                  <motion.div
                    key="pfp-preview"
                    initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: 15, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-square rounded-2xl overflow-hidden border-2 border-yellow-400/50 bg-[#004D34] flex flex-col justify-between p-4 shadow-inner"
                  >
                    {/* Background Avatar Illustration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#023826] to-[#011F15] flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-yellow-500/20 via-emerald-400/30 to-pink-500/20 border-2 border-yellow-400/40 flex items-center justify-center shadow-2xl">
                        <UserCheck className="w-20 h-20 text-yellow-300" />
                      </div>
                    </div>

                    {/* Top Official Logo Badge */}
                    <div className="relative z-10 self-center bg-[#011F15]/95 border border-yellow-400/60 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
                      <img src="/hhgoa-logo.jpg" alt="Logo" className="w-5 h-5 rounded-full object-cover border border-yellow-400" />
                      <span className="text-[11px] font-black font-mono text-yellow-300">
                        HACKER HOUSE GOA
                      </span>
                    </div>

                    {/* Bottom Frame Badge */}
                    <div className="relative z-10 self-center bg-pink-600/90 border border-pink-400/60 px-6 py-2 rounded-full text-xs font-black text-white shadow-xl tracking-wider">
                      #FrameInGoa
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="builder-preview"
                    initial={{ opacity: 0, rotateY: 15, scale: 0.95 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: -15, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-yellow-400/40 bg-[#004D34]/90 p-5 flex flex-col justify-between"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-yellow-500/20 pb-3">
                      <div className="flex items-center gap-2">
                        <img src="/hhgoa-logo.jpg" alt="Logo" className="w-6 h-6 rounded-md object-cover border border-yellow-400" />
                        <span className="font-extrabold text-sm text-yellow-300">HACKER HOUSE</span>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-pink-500/20 text-pink-300 border border-pink-500/50 font-bold">
                        BUILDER PASS
                      </span>
                    </div>

                    {/* Photo Center */}
                    <div className="my-3 self-center w-32 h-36 rounded-xl bg-[#022E1F] border-2 border-yellow-400/50 flex items-center justify-center overflow-hidden shadow-lg">
                      <Code className="w-12 h-12 text-yellow-400" />
                    </div>

                    {/* Info */}
                    <div className="text-center space-y-1">
                      <div className="font-bold text-base text-white tracking-wide">DEVANSH AGARWAL</div>
                      <div className="text-xs text-emerald-200">FULL STACK DEVELOPER</div>

                      <div className="mt-2 inline-block px-3 py-1 rounded-lg bg-yellow-400/15 border border-yellow-400/60 text-yellow-300 font-mono text-[11px] font-bold">
                        THE UI ARCHITECT
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-yellow-500/20 pt-2 text-[10px] font-mono text-emerald-300">
                      <span className="text-pink-400 font-bold">#FrameInGoa</span>
                      <span>GOA-2026 // VERIFIED</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
