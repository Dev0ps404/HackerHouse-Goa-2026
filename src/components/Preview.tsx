import React, { useRef, useEffect, useState } from 'react';
import { drawCanvasFrame, type FrameFormat } from '../lib/canvas';
import { Sparkles, Move } from './Icons';


interface PreviewProps {
  imageElement: HTMLImageElement | null;
  format: FrameFormat;
  name: string;
  role: string;
  builderTitle: string;
  zoom: number;
  positionX: number;
  positionY: number;
  isGenerating: boolean;
  onPositionChange: (posX: number, posY: number) => void;
}

export const Preview: React.FC<PreviewProps> = ({
  imageElement,
  format,
  name,
  role,
  builderTitle,
  zoom,
  positionX,
  positionY,
  isGenerating,
  onPositionChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number }>({
    x: 0,
    y: 0,
    posX: 0,
    posY: 0,
  });

  // Re-render canvas whenever parameters change
  useEffect(() => {
    if (canvasRef.current) {
      drawCanvasFrame({
        canvas: canvasRef.current,
        image: imageElement,
        format,
        name,
        role,
        builderTitle,
        zoom,
        positionX,
        positionY,
      });
    }
  }, [imageElement, format, name, role, builderTitle, zoom, positionX, positionY]);

  // Handle direct Mouse/Touch Drag to Pan on Preview Canvas
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageElement) return;
    setIsDraggingCanvas(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: positionX,
      posY: positionY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingCanvas) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const newPosX = Math.min(100, Math.max(-100, dragStartRef.current.posX + deltaX * 0.4));
    const newPosY = Math.min(100, Math.max(-100, dragStartRef.current.posY + deltaY * 0.4));

    onPositionChange(newPosX, newPosY);
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!imageElement || !e.touches[0]) return;
    setIsDraggingCanvas(true);
    dragStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      posX: positionX,
      posY: positionY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingCanvas || !e.touches[0]) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current.x;
    const deltaY = e.touches[0].clientY - dragStartRef.current.y;

    const newPosX = Math.min(100, Math.max(-100, dragStartRef.current.posX + deltaX * 0.4));
    const newPosY = Math.min(100, Math.max(-100, dragStartRef.current.posY + deltaY * 0.4));

    onPositionChange(newPosX, newPosY);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header Label */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          LIVE PREVIEW
        </span>
        {imageElement && (
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Move className="w-3 h-3 text-amber-400" />
            Drag image to pan
          </span>
        )}
      </div>

      {/* Canvas Container Card */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className={`relative w-full max-w-[420px] rounded-3xl glass-panel p-3 border border-white/15 bg-slate-950 shadow-2xl overflow-hidden transition-all duration-300 ${
          imageElement ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
      >
        {/* Aspect ratio frame box */}
        <div
          className={`relative w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner flex items-center justify-center ${
            format === 'pfp' ? 'aspect-square' : 'aspect-[1080/1350]'
          }`}
        >
          {/* Canvas Element */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain rounded-2xl"
          />

          {/* Laser Scanning Animation Overlay during Generation */}
          {isGenerating && (
            <div className="absolute inset-0 bg-amber-500/10 pointer-events-none z-20 flex flex-col justify-between">
              <div className="w-full h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-cyan-400 animate-laser-scan shadow-[0_0_20px_#FF9F1C]" />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs">
                <div className="px-5 py-2.5 rounded-full bg-slate-900/90 border border-amber-500/60 text-amber-300 font-mono text-xs font-bold animate-pulse shadow-2xl">
                  COMPOSING GRAPHIC...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
