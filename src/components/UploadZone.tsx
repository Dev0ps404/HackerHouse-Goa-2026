import React, { useState, useRef } from 'react';
import { UploadCloud, ImageIcon, RefreshCw, Trash2, CheckCircle2, AlertTriangle, Loader2 } from './Icons';

interface UploadZoneProps {
  imageUrl: string | null;
  file: File | null;
  isProcessing: boolean;
  error: string | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  imageUrl,
  file,
  isProcessing,
  error,
  onFileSelect,
  onRemove,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
      // Reset input value so selecting the same file again triggers onChange
      e.target.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-mono font-bold text-yellow-300 uppercase tracking-wider mb-2">
        01 / UPLOAD PHOTO
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.jpg,.jpeg,.png,.heic,.heif,.webp,.bmp"
        onChange={handleFileChange}
        className="hidden"
      />

      {imageUrl && file ? (
        /* Uploaded State */
        <div className="glass-panel rounded-2xl p-4 border border-yellow-400/40 flex items-center justify-between gap-4 bg-[#022E1F]/90 shadow-xl">
          <div className="flex items-center gap-3.5 overflow-hidden">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-yellow-400 shrink-0 bg-[#011F15]">
              <img src={imageUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-yellow-300">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-yellow-400" />
                <span>PHOTO LOADED</span>
              </div>
              <p className="text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-[240px]">
                {file.name}
              </p>
              <p className="text-[11px] text-emerald-300 font-mono">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl bg-[#033B29] hover:bg-[#044D34] text-yellow-300 border border-yellow-400/50 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              title="Replace photo"
            >
              <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
              <span className="hidden sm:inline">Replace</span>
            </button>

            <button
              onClick={onRemove}
              className="p-2.5 rounded-xl bg-[#033B29] hover:bg-pink-950/80 text-pink-300 border border-pink-500/40 transition-all cursor-pointer"
              title="Remove photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-yellow-400 bg-yellow-400/10 scale-[1.01] shadow-2xl shadow-yellow-500/20'
              : error
              ? 'border-pink-500 bg-pink-950/20 hover:border-pink-400'
              : 'border-yellow-500/30 bg-[#022E1F]/60 hover:border-yellow-400 hover:bg-[#023826]/80'
          }`}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader2 className="w-10 h-10 text-yellow-400 animate-spin mb-3" />
              <p className="text-sm font-bold text-yellow-300">Processing photo...</p>
              <p className="text-xs text-emerald-300 mt-1 font-mono">Optimizing for Canvas engine</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-[#033B29] border border-yellow-400/40 flex items-center justify-center text-yellow-300 mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>

              <h4 className="text-base font-bold text-white mb-1">
                DROP YOUR PHOTO HERE
              </h4>
              <p className="text-xs text-emerald-200 mb-3">
                or <span className="text-yellow-300 underline font-bold">click to browse</span>
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#011F15] border border-yellow-500/30 text-[11px] font-mono text-yellow-300">
                <ImageIcon className="w-3 h-3 text-yellow-400" />
                JPG · PNG · HEIC
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2.5 flex items-center gap-2 p-3 rounded-xl bg-pink-950/60 border border-pink-500/50 text-pink-200 text-xs font-medium">
          <AlertTriangle className="w-4 h-4 text-pink-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
