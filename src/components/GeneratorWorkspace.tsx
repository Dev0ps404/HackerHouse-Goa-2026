import React from 'react';
import { useImageProcessor } from '../hooks/useImageProcessor';
import { UploadZone } from './UploadZone';
import { FormatSelector } from './FormatSelector';
import { IdentityForm } from './IdentityForm';
import { ImageEditor } from './ImageEditor';
import { Preview } from './Preview';
import { GenerateButton } from './GenerateButton';
import { ResultView } from './ResultView';

interface GeneratorWorkspaceProps {
  onToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const GeneratorWorkspace: React.FC<GeneratorWorkspaceProps> = ({ onToast }) => {
  const {
    imageState,
    processFile,
    setFormat,
    setName,
    setRole,
    setZoom,
    setPosition,
    resetPosition,
    removeImage,
    setGenerating,
    setGenerated,
  } = useImageProcessor();

  const handleGenerate = () => {
    if (imageState.format === 'builder') {
      if (!imageState.name.trim() || !imageState.role.trim()) {
        onToast('Please enter your name and stack/role for your Builder ID card.', 'error');
        return;
      }
    }

    if (!imageState.imageElement) {
      onToast('Please upload a photo first!', 'error');
      return;
    }

    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      onToast('Hacker House Goa 2026 Frame generated successfully!', 'success');
    }, 950);
  };

  const handleResetAll = () => {
    setGenerated(false);
  };

  return (
    <section id="generator" className="py-16 px-4 sm:px-6 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#004D34]/80 via-yellow-500/10 to-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#033B29] border border-yellow-400/40 text-xs font-mono text-yellow-300 mb-3 shadow-lg">
            ⚡ GENERATOR WORKSPACE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            CREATE YOUR <span className="text-yellow-400">IDENTITY</span>
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base">
            Upload your photo, select your format, customize your details, and export your branded Hacker House Goa graphic.
          </p>
        </div>

        {/* Display ResultView or Workspace Grid */}
        {imageState.isGenerated ? (
          <ResultView
            imageElement={imageState.imageElement}
            format={imageState.format}
            name={imageState.name}
            role={imageState.role}
            builderTitle={imageState.builderTitle}
            zoom={imageState.zoom}
            positionX={imageState.positionX}
            positionY={imageState.positionY}
            onResetAll={handleResetAll}
            onToast={onToast}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Controls */}
            <div className="lg:col-span-6 space-y-6 glass-panel rounded-3xl p-6 sm:p-8 border border-yellow-500/30 shadow-2xl bg-[#022E1F]/90">
              <UploadZone
                imageUrl={imageState.imageUrl}
                file={imageState.file}
                isProcessing={imageState.isProcessing}
                error={imageState.error}
                onFileSelect={processFile}
                onRemove={removeImage}
              />

              <FormatSelector format={imageState.format} onSelectFormat={setFormat} />

              {imageState.format === 'builder' && (
                <IdentityForm
                  name={imageState.name}
                  role={imageState.role}
                  builderTitle={imageState.builderTitle}
                  onNameChange={setName}
                  onRoleChange={setRole}
                />
              )}

              {imageState.imageElement && (
                <ImageEditor
                  zoom={imageState.zoom}
                  positionX={imageState.positionX}
                  positionY={imageState.positionY}
                  onZoomChange={setZoom}
                  onPositionChange={setPosition}
                  onReset={resetPosition}
                />
              )}

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-emerald-300 border-t border-emerald-900">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  Your photo is processed in your browser.
                </span>
              </div>

              <GenerateButton
                disabled={!imageState.imageElement}
                isGenerating={imageState.isGenerating}
                onGenerate={handleGenerate}
              />
            </div>

            {/* Right Column: Live Interactive Preview */}
            <div className="lg:col-span-6 lg:sticky lg:top-28 flex flex-col items-center">
              <Preview
                imageElement={imageState.imageElement}
                format={imageState.format}
                name={imageState.name}
                role={imageState.role}
                builderTitle={imageState.builderTitle}
                zoom={imageState.zoom}
                positionX={imageState.positionX}
                positionY={imageState.positionY}
                isGenerating={imageState.isGenerating}
                onPositionChange={setPosition}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
