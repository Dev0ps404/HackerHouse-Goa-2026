import React, { useState } from 'react';
import { Download, Check, Loader2 } from './Icons';
import { drawCanvasFrame, type FrameFormat } from '../lib/canvas';

interface DownloadButtonProps {
  imageElement: HTMLImageElement | null;
  format: FrameFormat;
  name: string;
  role: string;
  builderTitle: string;
  zoom: number;
  positionX: number;
  positionY: number;
  onSuccessToast: (msg: string) => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  imageElement,
  format,
  name,
  role,
  builderTitle,
  zoom,
  positionX,
  positionY,
  onSuccessToast,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);

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

    exportCanvas.toBlob(
      (blob) => {
        if (!blob) {
          setIsDownloading(false);
          return;
        }

        const filename = format === 'pfp' ? 'hh-goa-2026-pfp.png' : 'hh-goa-2026-builder-card.png';

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setIsDownloading(false);
        setDownloaded(true);
        onSuccessToast(`Saved as ${filename}`);

        setTimeout(() => setDownloaded(false), 3000);
      },
      'image/png',
      1.0
    );
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-emerald-950 font-extrabold text-sm shadow-xl shadow-yellow-500/20 hover:shadow-yellow-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
    >
      {isDownloading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
          <span>Exporting PNG...</span>
        </>
      ) : downloaded ? (
        <>
          <Check className="w-4 h-4 text-emerald-950" />
          <span>Saved to Device!</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 text-emerald-950" />
          <span>Download PNG</span>
        </>
      )}
    </button>
  );
};
