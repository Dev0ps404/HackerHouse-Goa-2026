import { useState, useCallback, useEffect, useRef } from 'react';
import type { FrameFormat } from '../lib/canvas';
import type { TeamMember } from '../types/team';
import { generateBuilderTitle } from '../lib/builderTitles';
import heic2any from 'heic2any';

export interface ImageState {
  file: File | null;
  imageUrl: string | null;
  imageElement: HTMLImageElement | null;
  format: FrameFormat;
  name: string;
  role: string;
  builderTitle: string;
  zoom: number;
  positionX: number;
  positionY: number;
  teamMembers: TeamMember[];
  isProcessing: boolean;
  isGenerating: boolean;
  isGenerated: boolean;
  error: string | null;
}

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp', '.bmp', '.gif', '.svg'];

const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'DEVASHISH', role: 'AI ENGINEER', imageUrl: null, imageElement: null, zoom: 1.0, positionX: 0, positionY: 0 },
  { id: '2', name: 'MADHAVAN', role: 'FULL STACK', imageUrl: null, imageElement: null, zoom: 1.0, positionX: 0, positionY: 0 },
  { id: '3', name: 'ROHIT', role: 'UI/UX DESIGNER', imageUrl: null, imageElement: null, zoom: 1.0, positionX: 0, positionY: 0 },
];

export function useImageProcessor() {
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    imageUrl: null,
    imageElement: null,
    format: 'builder', // Default to 4:5 builder card format
    name: '',
    role: '',
    builderTitle: 'THE BUILDER',
    zoom: 1.0,
    positionX: 0,
    positionY: 0,
    teamMembers: DEFAULT_TEAM_MEMBERS,
    isProcessing: false,
    isGenerating: false,
    isGenerated: false,
    error: null,
  });

  const activeUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (activeUrlRef.current) {
        URL.revokeObjectURL(activeUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (imageState.role) {
      const generated = generateBuilderTitle(imageState.role);
      setImageState((prev) => ({ ...prev, builderTitle: generated }));
    }
  }, [imageState.role]);

  const processFile = useCallback(async (file: File) => {
    setImageState((prev) => ({
      ...prev,
      isProcessing: true,
      error: null,
    }));

    try {
      let processableFile = file;
      const filename = file.name.toLowerCase();
      const isHeic = filename.endsWith('.heic') || filename.endsWith('.heif') || file.type.includes('heic') || file.type.includes('heif');

      if (isHeic) {
        try {
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.9,
          });

          const blobResult = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
          processableFile = new File([blobResult], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
            type: 'image/jpeg',
          });
        } catch (heicErr) {
          console.warn('HEIC conversion error:', heicErr);
          throw new Error('Failed to process HEIC file. Please upload a JPG or PNG image.');
        }
      }

      const hasImageMime = processableFile.type ? processableFile.type.startsWith('image/') : false;
      const hasImageExt = SUPPORTED_EXTENSIONS.some((ext) => filename.endsWith(ext));

      if (!hasImageMime && !hasImageExt) {
        throw new Error('That file format is not supported. Please upload a JPG, PNG, or HEIC image.');
      }

      const objectUrl = URL.createObjectURL(processableFile);
      if (activeUrlRef.current) {
        URL.revokeObjectURL(activeUrlRef.current);
      }
      activeUrlRef.current = objectUrl;

      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image. File may be corrupt or inaccessible.'));
        img.src = objectUrl;
      });

      setImageState((prev) => ({
        ...prev,
        file: processableFile,
        imageUrl: objectUrl,
        imageElement: img,
        zoom: 1.0,
        positionX: 0,
        positionY: 0,
        isProcessing: false,
        error: null,
      }));
    } catch (err: any) {
      setImageState((prev) => ({
        ...prev,
        isProcessing: false,
        error: err.message || 'Error loading photo.',
      }));
    }
  }, []);

  const setFormat = useCallback((format: FrameFormat) => {
    setImageState((prev) => ({ ...prev, format }));
  }, []);

  const setName = useCallback((name: string) => {
    setImageState((prev) => ({ ...prev, name }));
  }, []);

  const setRole = useCallback((role: string) => {
    setImageState((prev) => ({ ...prev, role }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setImageState((prev) => ({ ...prev, zoom }));
  }, []);

  const setPosition = useCallback((positionX: number, positionY: number) => {
    setImageState((prev) => ({ ...prev, positionX, positionY }));
  }, []);

  const resetPosition = useCallback(() => {
    setImageState((prev) => ({ ...prev, zoom: 1.0, positionX: 0, positionY: 0 }));
  }, []);

  const removeImage = useCallback(() => {
    if (activeUrlRef.current) {
      URL.revokeObjectURL(activeUrlRef.current);
      activeUrlRef.current = null;
    }
    setImageState((prev) => ({
      ...prev,
      file: null,
      imageUrl: null,
      imageElement: null,
      isGenerated: false,
      error: null,
    }));
  }, []);

  // Team Member Management Actions
  const addTeamMember = useCallback(() => {
    setImageState((prev) => {
      if (prev.teamMembers.length >= 5) return prev;
      const newId = String(Date.now());
      const newMember: TeamMember = {
        id: newId,
        name: `BUILDER ${prev.teamMembers.length + 1}`,
        role: 'DEVELOPER',
        imageUrl: null,
        imageElement: null,
        zoom: 1.0,
        positionX: 0,
        positionY: 0,
      };
      return { ...prev, teamMembers: [...prev.teamMembers, newMember] };
    });
  }, []);

  const removeTeamMember = useCallback((id: string) => {
    setImageState((prev) => {
      if (prev.teamMembers.length <= 2) return prev;
      return { ...prev, teamMembers: prev.teamMembers.filter((m) => m.id !== id) };
    });
  }, []);

  const updateTeamMember = useCallback((id: string, updates: Partial<TeamMember>) => {
    setImageState((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }));
  }, []);

  const setGenerating = useCallback((isGenerating: boolean) => {
    setImageState((prev) => ({ ...prev, isGenerating }));
  }, []);

  const setGenerated = useCallback((isGenerated: boolean) => {
    setImageState((prev) => ({ ...prev, isGenerated }));
  }, []);

  return {
    imageState,
    processFile,
    setFormat,
    setName,
    setRole,
    setZoom,
    setPosition,
    resetPosition,
    removeImage,
    addTeamMember,
    removeTeamMember,
    updateTeamMember,
    setGenerating,
    setGenerated,
  };
}
