import React from 'react';
import { shareToX } from '../lib/xShare';

interface ShareXButtonProps {
  onInfoToast: (msg: string) => void;
}

export const ShareXButton: React.FC<ShareXButtonProps> = ({ onInfoToast }) => {
  const handleShare = () => {
    shareToX();
    onInfoToast('Opened X post window! Don\'t forget to attach your downloaded graphic.');
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-sm border border-pink-400/50 shadow-xl transition-all duration-200 cursor-pointer"
    >
      <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      <span>Share to X</span>
    </button>
  );
};
