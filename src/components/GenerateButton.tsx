import React from 'react';
import { Sparkles, ArrowRight, Loader2 } from './Icons';

interface GenerateButtonProps {
  disabled: boolean;
  isGenerating: boolean;
  onGenerate: () => void;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  disabled,
  isGenerating,
  onGenerate,
}) => {
  return (
    <button
      type="button"
      disabled={disabled || isGenerating}
      onClick={onGenerate}
      className={`w-full relative group overflow-hidden py-4 px-6 rounded-2xl font-black text-base transition-all duration-300 shadow-xl ${
        disabled
          ? 'bg-[#033B29] text-emerald-600 cursor-not-allowed border border-emerald-800/50'
          : 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-emerald-950 shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
      }`}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-emerald-950" />
            <span>GENERATING FRAME...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-emerald-950" />
            <span>GENERATE MY FRAME</span>
            <ArrowRight className="w-5 h-5 text-emerald-950 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </div>
    </button>
  );
};
