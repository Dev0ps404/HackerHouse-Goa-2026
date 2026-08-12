import React from 'react';
import { motion } from './Motion';
import type { FrameFormat } from '../lib/canvas';
import { UserCheck, IdCard, Users } from './Icons';

interface FormatSelectorProps {
  format: FrameFormat;
  onSelectFormat: (format: FrameFormat) => void;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({ format, onSelectFormat }) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-mono font-bold text-yellow-300 uppercase tracking-wider mb-2">
        02 / CHOOSE FORMAT
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-1.5 rounded-2xl bg-[#011F15] border border-yellow-500/30 relative">
        {/* Format Option 1: Builder Card */}
        <button
          type="button"
          onClick={() => onSelectFormat('builder')}
          className={`relative z-10 p-3 rounded-xl flex flex-col items-start text-left transition-colors cursor-pointer ${
            format === 'builder' ? 'text-white' : 'text-emerald-300 hover:text-white'
          }`}
        >
          {format === 'builder' && (
            <motion.div
              layoutId="active-format-pill"
              className="absolute inset-0 bg-yellow-400/20 border border-yellow-400 rounded-xl shadow-lg shadow-yellow-500/10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}

          <div className="relative z-10 flex items-center gap-1.5 mb-1">
            <IdCard className={`w-4 h-4 ${format === 'builder' ? 'text-yellow-400' : 'text-emerald-400'}`} />
            <span className="font-extrabold text-xs">BUILDER CARD</span>
          </div>
          <span className="relative z-10 text-[10px] text-emerald-200/80 font-mono">
            1080 × 1350 · 4:5 Poster
          </span>
        </button>

        {/* Format Option 2: PFP Frame */}
        <button
          type="button"
          onClick={() => onSelectFormat('pfp')}
          className={`relative z-10 p-3 rounded-xl flex flex-col items-start text-left transition-colors cursor-pointer ${
            format === 'pfp' ? 'text-white' : 'text-emerald-300 hover:text-white'
          }`}
        >
          {format === 'pfp' && (
            <motion.div
              layoutId="active-format-pill"
              className="absolute inset-0 bg-pink-500/20 border border-pink-500 rounded-xl shadow-lg shadow-pink-500/10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}

          <div className="relative z-10 flex items-center gap-1.5 mb-1">
            <UserCheck className={`w-4 h-4 ${format === 'pfp' ? 'text-pink-400' : 'text-emerald-400'}`} />
            <span className="font-extrabold text-xs">PFP FRAME</span>
          </div>
          <span className="relative z-10 text-[10px] text-emerald-200/80 font-mono">
            1080 × 1080 · 1:1 Avatar
          </span>
        </button>

        {/* Format Option 3: Team Frame */}
        <button
          type="button"
          onClick={() => onSelectFormat('team')}
          className={`relative z-10 p-3 rounded-xl flex flex-col items-start text-left transition-colors cursor-pointer ${
            format === 'team' ? 'text-white' : 'text-emerald-300 hover:text-white'
          }`}
        >
          {format === 'team' && (
            <motion.div
              layoutId="active-format-pill"
              className="absolute inset-0 bg-emerald-400/20 border border-emerald-400 rounded-xl shadow-lg shadow-emerald-500/10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}

          <div className="relative z-10 flex items-center gap-1.5 mb-1">
            <Users className={`w-4 h-4 ${format === 'team' ? 'text-emerald-300' : 'text-emerald-400'}`} />
            <span className="font-extrabold text-xs">TEAM FRAME</span>
          </div>
          <span className="relative z-10 text-[10px] text-emerald-200/80 font-mono">
            1350 × 1080 · 2-5 Members
          </span>
        </button>
      </div>
    </div>
  );
};
