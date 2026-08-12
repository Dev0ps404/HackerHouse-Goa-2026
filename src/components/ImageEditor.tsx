import React from 'react';
import { ZoomIn, ZoomOut, Move, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from './Icons';

interface ImageEditorProps {
  zoom: number;
  positionX: number;
  positionY: number;
  onZoomChange: (zoom: number) => void;
  onPositionChange: (posX: number, posY: number) => void;
  onReset: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
  zoom,
  positionX,
  positionY,
  onZoomChange,
  onPositionChange,
  onReset,
}) => {
  const step = 5;

  return (
    <div className="w-full space-y-4 p-4 rounded-2xl glass-panel border border-yellow-500/30 bg-[#022E1F]/90">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-1.5">
          <Move className="w-3.5 h-3.5 text-yellow-400" />
          IMAGE POSITION & ZOOM
        </label>
        <button
          type="button"
          onClick={onReset}
          className="text-[11px] font-mono text-emerald-300 hover:text-yellow-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Zoom Slider */}
      <div>
        <div className="flex items-center justify-between text-xs text-emerald-200 mb-1.5">
          <span className="flex items-center gap-1">
            <ZoomOut className="w-3.5 h-3.5" />
            Zoom
          </span>
          <span className="font-mono text-yellow-300 font-bold">{zoom.toFixed(1)}x</span>
          <ZoomIn className="w-3.5 h-3.5" />
        </div>
        <input
          type="range"
          min="0.5"
          max="2.5"
          step="0.05"
          value={zoom}
          onChange={(e) => onZoomChange(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg bg-[#011F15] appearance-none cursor-pointer accent-yellow-400"
        />
      </div>

      {/* Directional Pad */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <span className="text-xs text-emerald-200 font-medium">Pan position:</span>
        <div className="grid grid-cols-3 gap-1 w-28">
          <div />
          <button
            type="button"
            onClick={() => onPositionChange(positionX, Math.max(-100, positionY - step))}
            className="p-1.5 rounded-lg bg-[#033B29] hover:bg-[#044D34] text-white flex items-center justify-center border border-yellow-500/30 cursor-pointer"
            title="Pan Up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <div />

          <button
            type="button"
            onClick={() => onPositionChange(Math.max(-100, positionX - step), positionY)}
            className="p-1.5 rounded-lg bg-[#033B29] hover:bg-[#044D34] text-white flex items-center justify-center border border-yellow-500/30 cursor-pointer"
            title="Pan Left"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onReset}
            className="p-1.5 rounded-lg bg-[#033B29] hover:bg-[#044D34] text-yellow-300 flex items-center justify-center border border-yellow-500/30 text-[10px] font-mono font-bold cursor-pointer"
            title="Center"
          >
            ●
          </button>
          <button
            type="button"
            onClick={() => onPositionChange(Math.min(100, positionX + step), positionY)}
            className="p-1.5 rounded-lg bg-[#033B29] hover:bg-[#044D34] text-white flex items-center justify-center border border-yellow-500/30 cursor-pointer"
            title="Pan Right"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div />
          <button
            type="button"
            onClick={() => onPositionChange(positionX, Math.min(100, positionY + step))}
            className="p-1.5 rounded-lg bg-[#033B29] hover:bg-[#044D34] text-white flex items-center justify-center border border-yellow-500/30 cursor-pointer"
            title="Pan Down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <div />
        </div>
      </div>
    </div>
  );
};
