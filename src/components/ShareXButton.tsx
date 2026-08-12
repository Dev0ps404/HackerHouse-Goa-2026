import React, { useState } from 'react';
import { shareToX } from '../lib/xShare';
import { drawCanvasFrame, type FrameFormat } from '../lib/canvas';
import { Loader2 } from './Icons';

interface ShareXButtonProps {
  imageElement: HTMLImageElement | null;
  format: FrameFormat;
  name: string;
  role: string;
  builderTitle: string;
  zoom: number;
  positionX: number;
  positionY: number;
  onToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ShareXButton: React.FC<ShareXButtonProps> = ({
  imageElement,
  format,
  name,
  role,
  builderTitle,
  zoom,
  positionX,
  positionY,
  onToast,
}) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);

    try {
      // 1. Render high-DPI Export Canvas
      const exportCanvas = document.createElement('canvas');
      drawCanvasFrame({
        canvas: exportCanvas,
        image: imageElement,
        format,
        name,
        role,
        builderTitle,
        zoom,
        positionX,
        positionY,
      });

      // 2. Convert Canvas to Blob
      const blob = await new Promise<Blob | null>((resolve) => {
        exportCanvas.toBlob((b) => resolve(b), 'image/png', 1.0);
      });

      if (!blob) {
        setIsSharing(false);
        shareToX();
        onToast('Opened X post window!', 'info');
        return;
      }

      const filename = format === 'pfp' ? 'hh-goa-2026-pfp.png' : 'hh-goa-2026-builder.png';
      const imageFile = new File([blob], filename, { type: 'image/png' });

      // Check if user is on a mobile device (iOS/Android)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        typeof navigator !== 'undefined' ? navigator.userAgent : ''
      );

      // 3. Mobile Devices ONLY: Native File Share Sheet
      if (isMobile && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        try {
          await navigator.share({
            title: 'Hacker House Goa 2026 Builder Identity',
            text: `Just claimed my HH Goa 2026 builder frame ⚡🌴 #FrameInGoa`,
            files: [imageFile],
          });
          setIsSharing(false);
          onToast('Shared successfully to X!', 'success');
          return;
        } catch (shareError: any) {
          if (shareError.name === 'AbortError') {
            setIsSharing(false);
            return;
          }
        }
      }

      // 4. Desktop Chrome / Edge / Web: Copy Image to Clipboard + Auto-Download + DIRECTLY Open X in Chrome
      let copiedToClipboard = false;
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          copiedToClipboard = true;
        }
      } catch (clipboardErr) {
        console.warn('Clipboard image write not permitted:', clipboardErr);
      }

      // Auto download image file for desktop users
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // DIRECTLY Open Twitter / X Post Window in Chrome (Bypassing Windows OS Share Dialog)
      shareToX();

      if (copiedToClipboard) {
        onToast('X opened! Image copied to clipboard — press Ctrl+V in X to paste image.', 'success');
      } else {
        onToast('X opened! Image saved to downloads — click 🖼️ icon to attach.', 'info');
      }
    } catch (err) {
      console.warn('Share error fallback:', err);
      shareToX();
      onToast('Opened X post window!', 'info');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={isSharing}
      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-sm border border-pink-400/50 shadow-xl transition-all duration-200 cursor-pointer"
    >
      {isSharing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-white" />
          <span>Opening X...</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Share to X</span>
        </>
      )}
    </button>
  );
};
