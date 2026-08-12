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
  const containerRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
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

  // Handle subtle 3D Tilt on Hover for Desktop
  const handleTiltMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isDraggingCanvas) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / (rect.height / 2)) * -8;
    const rotateY = (x / (rect.width / 2)) * 8;

    setTilt({ rotateX, rotateY });
  };

  const handleTiltLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsDraggingCanvas(false);
  };

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
    handleTiltMove(e);
    if (!isDraggingCanvas) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const newPosX = Math.min(100, Math.max(-100, dragStartRef.current.posX + deltaX * 0.4));
    const newPosY = Math.min(100, Math.max(-100, dragStartRef.current.posY + deltaY * 0.4));

    onPositionChange(newPosX, newPosY);
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
        <span className="text-xs font-mono font-bold text-[#FFE600] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          LIVE 3D COLLECTIBLE PREVIEW
        </span>
        {imageElement && (
          <span className="text-[11px] font-mono text-emerald-300 flex items-center gap-1">
            <Move className="w-3 h-3 text-yellow-400" />
            Drag photo to pan
          </span>
        )}
      </div>

      {/* 3D Perspective Card Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleTiltLeave}
        onMouseLeave={handleTiltLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTiltLeave}
        style={{
          perspective: 1000,
        }}
        className="w-full flex justify-center cursor-pointer"
      >
        <div
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: isDraggingCanvas ? 'none' : 'transform 0.15s ease-out',
          }}
          className="relative w-full max-w-[420px] rounded-3xl p-3 border border-yellow-400/30 bg-[#011F15] shadow-2xl overflow-hidden transition-all duration-300"
        >
          {/* Aspect ratio frame box */}
          <div
            className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 shadow-inner flex items-center justify-center ${
              format === 'pfp' ? 'aspect-square' : 'aspect-[1080/1350]'
            }`}
          >
            {/* Canvas Element */}
            <canvas ref={canvasRef} className="w-full h-full object-contain rounded-2xl" />

            {/* Laser Scanning Animation Overlay during Generation */}
            {isGenerating && (
              <div className="absolute inset-0 bg-yellow-500/10 pointer-events-none z-20 flex flex-col justify-between">
                <div className="w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-emerald-400 animate-laser-scan shadow-[0_0_20px_#FFE600]" />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs">
                  <div className="px-5 py-2.5 rounded-full bg-slate-900/90 border border-yellow-400/60 text-yellow-300 font-mono text-xs font-bold animate-pulse shadow-2xl">
                    COMPOSING GRAPHIC...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
