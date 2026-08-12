import React, { useEffect } from 'react';
import { motion } from './Motion';
import { DownloadButton } from './DownloadButton';
import { ShareXButton } from './ShareXButton';
import { RotateCcw, CheckCircle2 } from './Icons';
import { drawCanvasFrame, type FrameFormat } from '../lib/canvas';
import type { TeamMember } from '../types/team';
import confetti from 'canvas-confetti';

interface ResultViewProps {
  imageElement: HTMLImageElement | null;
  format: FrameFormat;
  name: string;
  role: string;
  builderTitle: string;
  zoom: number;
  positionX: number;
  positionY: number;
  teamMembers?: TeamMember[];
  onResetAll: () => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  imageElement,
  format,
  name,
  role,
  builderTitle,
  zoom,
  positionX,
  positionY,
  teamMembers = [],
  onResetAll,
  onToast,
}) => {
  // Trigger subtle festive confetti burst on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFE600', '#FF007A', '#00F0FF', '#FFFFFF'],
      });
    } catch (e) {
      // Ignore if confetti fails
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex flex-col items-center text-center space-y-6"
    >
      {/* Success Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#033B29] border border-yellow-400/40 text-yellow-300 font-mono text-xs font-bold shadow-lg">
        <CheckCircle2 className="w-4 h-4 text-yellow-400" />
        YOUR HH GOA 2026 FRAME IS READY
      </div>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        OWN YOUR <span className="text-gradient-gold">GOA IDENTITY</span>
      </h2>

      {/* Prominent Generated Preview Box */}
      <div
        className={`relative w-full ${
          format === 'team' ? 'max-w-[540px]' : 'max-w-[420px]'
        } rounded-3xl glass-panel p-3 border-2 border-yellow-400/40 bg-[#022E1F] shadow-2xl overflow-hidden glow-gold`}
      >
        <div
          className={`relative w-full rounded-2xl overflow-hidden bg-[#011F15] shadow-inner ${
            format === 'pfp'
              ? 'aspect-square'
              : format === 'team'
              ? 'aspect-[1350/1080]'
              : 'aspect-[1080/1350]'
          }`}
        >
          <canvas
            ref={(canvas) => {
              if (canvas) {
                drawCanvasFrame({
                  canvas,
                  image: imageElement,
                  format,
                  name,
                  role,
                  builderTitle,
                  zoom,
                  positionX,
                  positionY,
                  teamMembers,
                });
              }
            }}
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-2">
        <DownloadButton
          imageElement={imageElement}
          format={format}
          name={name}
          role={role}
          builderTitle={builderTitle}
          zoom={zoom}
          positionX={positionX}
          positionY={positionY}
          teamMembers={teamMembers}
          onSuccessToast={(msg) => onToast(msg, 'success')}
        />

        <ShareXButton
          imageElement={imageElement}
          format={format}
          name={name}
          role={role}
          builderTitle={builderTitle}
          zoom={zoom}
          positionX={positionX}
          positionY={positionY}
          teamMembers={teamMembers}
          onToast={onToast}
        />
      </div>

      {/* Create Another Button */}
      <button
        type="button"
        onClick={onResetAll}
        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-emerald-300 hover:text-yellow-300 transition-colors pt-2 cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Create Another Frame / Edit
      </button>
    </motion.div>
  );
};
