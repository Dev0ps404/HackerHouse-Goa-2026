import templateImgUrl from '../assets/hhgoa-template.png';
import { generateBuilderId } from './builderId';
import { getSmartBuilderProfile } from './builderTitles';
import { generateQRCodeDataUrl } from './qr';

export type FrameFormat = 'pfp' | 'builder';

export interface RenderOptions {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement | null;
  format: FrameFormat;
  name: string;
  role: string;
  builderTitle?: string;
  zoom: number; // 0.5 to 2.5
  positionX: number; // -100 to 100
  positionY: number; // -100 to 100
}

let cachedTemplateImg: HTMLImageElement | null = null;
let isTemplateLoading = false;
const loadListeners: Array<() => void> = [];

let cachedQrImg: HTMLImageElement | null = null;
let cachedQrDataUrl: string | null = null;

function loadTemplateImage(onComplete?: () => void) {
  if (cachedTemplateImg && cachedTemplateImg.complete && cachedTemplateImg.naturalWidth > 0) {
    onComplete?.();
    return;
  }

  if (onComplete) {
    loadListeners.push(onComplete);
  }

  if (typeof window === 'undefined') return;

  if (!isTemplateLoading) {
    isTemplateLoading = true;
    const img = new Image();
    img.src = templateImgUrl;
    img.onload = () => {
      cachedTemplateImg = img;
      isTemplateLoading = false;
      while (loadListeners.length > 0) {
        const callback = loadListeners.shift();
        callback?.();
      }
    };
    img.onerror = (err) => {
      console.error('Failed to load master artwork template:', err);
      isTemplateLoading = false;
    };
  }
}

if (typeof window !== 'undefined') {
  loadTemplateImage();
}

async function getOrGenerateQR(): Promise<HTMLImageElement | null> {
  if (cachedQrImg) return cachedQrImg;
  try {
    const dataUrl = await generateQRCodeDataUrl();
    if (dataUrl !== cachedQrDataUrl) {
      cachedQrDataUrl = dataUrl;
      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
      cachedQrImg = img;
    }
    return cachedQrImg;
  } catch (err) {
    return null;
  }
}

/**
 * Master Canvas Rendering Engine for Hacker House Goa 2026 Collectible Builder Card.
 */
export function drawCanvasFrame(options: RenderOptions): void {
  const { canvas, image, format, name, role, zoom, positionX, positionY } = options;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 1080;
  let height = 1350;

  if (format === 'pfp') {
    width = 1080;
    height = 1080;
  }

  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);

  if (!cachedTemplateImg || !cachedTemplateImg.complete) {
    loadTemplateImage(() => {
      drawCanvasFrame(options);
    });
  }

  if (format === 'pfp') {
    renderPFPFormat(ctx, width, height, image, zoom, positionX, positionY, name, role);
  } else {
    renderBuilderFormat(ctx, width, height, image, zoom, positionX, positionY, name, role);
  }

  // Synthesize paper print noise texture
  applyPaperPrintTexture(ctx, width, height);

  // Asynchronously overlay scannable QR code
  getOrGenerateQR().then((qrImg) => {
    if (qrImg && format === 'builder') {
      ctx.drawImage(qrImg, 90, 1135, 110, 110);
    }
  });
}

/**
 * INDIVIDUAL BUILDER CARD (1080 × 1350)
 * Uses Master Artwork Poster Template with pixel-perfect aperture and text overlays.
 */
function renderBuilderFormat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  userImage: HTMLImageElement | null,
  zoom: number,
  posX: number,
  posY: number,
  name: string,
  role: string
) {
  // 1. Draw Master Poster Artwork Background
  if (cachedTemplateImg && cachedTemplateImg.complete && cachedTemplateImg.naturalWidth > 0) {
    ctx.drawImage(cachedTemplateImg, 0, 0, width, height);
  } else {
    ctx.fillStyle = '#FFFDF0';
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Central Circular Photo Aperture (cx=540, cy=472, radius=240)
  const photoCenterX = 540;
  const photoCenterY = 472;
  const photoRadius = 240;

  ctx.save();
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius, 0, Math.PI * 2);
  ctx.clip();

  if (userImage) {
    drawTransformedImage(
      ctx,
      userImage,
      photoCenterX - photoRadius,
      photoCenterY - photoRadius,
      photoRadius * 2,
      photoRadius * 2,
      zoom,
      posX,
      posY
    );
  } else {
    // Empty state backdrop in aperture
    ctx.fillStyle = '#02402E';
    ctx.fillRect(photoCenterX - photoRadius, photoCenterY - photoRadius, photoRadius * 2, photoRadius * 2);

    ctx.fillStyle = '#FFD400';
    ctx.font = '900 24px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('UPLOAD PHOTO', photoCenterX, photoCenterY);
  }
  ctx.restore();

  // 3. Name Box (#02402E fill centered at cy=640)
  const displayName = name.trim() ? name.trim().toUpperCase() : 'BUILDER NAME';

  ctx.fillStyle = '#02402E';
  ctx.beginPath();
  ctx.roundRect(540 - 315, 640 - 35, 630, 70, 16);
  ctx.fill();

  ctx.fillStyle = '#FFD400';
  ctx.font = '900 36px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(displayName, 540, 640 + 13);

  // 4. Role Box (#FFC107 fill centered at cy=712)
  const displayRole = role.trim() ? role.trim().toUpperCase() : 'FULL STACK DEVELOPER';

  ctx.fillStyle = '#FFC107';
  ctx.beginPath();
  ctx.roundRect(540 - 260, 712 - 26, 520, 52, 12);
  ctx.fill();

  ctx.fillStyle = '#02402E';
  ctx.font = '900 22px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(displayRole, 540, 712 + 8);

  // 5. Dynamic Smart Profile Details (Builder Class, Beach Bag, Shipping)
  const profile = getSmartBuilderProfile(role, name);
  const builderId = generateBuilderId(name, role);

  // Column 1: Builder Class & Specs
  ctx.fillStyle = '#02402E';
  ctx.font = '900 16px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`CLASS: ${profile.title.toUpperCase()}`, 145, 835);
  ctx.fillText(`STACK: ${profile.stackBadge}`, 145, 865);
  ctx.fillText(`BAG: ${profile.beachBag.toUpperCase()}`, 145, 895);

  // Column 2: Currently Shipping & Serial
  ctx.fillText(`SHIPPING: ${profile.shipping.toUpperCase()}`, 570, 835);
  ctx.fillText(`ID: ${builderId}`, 570, 865);
  ctx.fillText(`STATUS: VERIFIED BUILDER ✦ March 2026`, 570, 895);
}

/**
 * PFP FORMAT (1:1 1080 × 1080)
 */
function renderPFPFormat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  userImage: HTMLImageElement | null,
  zoom: number,
  posX: number,
  posY: number,
  name: string,
  role: string
) {
  const displayName = name.trim() ? name.trim().toUpperCase() : 'BUILDER';
  const displayRole = role.trim() ? role.trim().toUpperCase() : 'HH GOA 2026';

  // Deep Emerald Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#023B2A');
  bgGrad.addColorStop(1, '#011F15');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Gold Ring
  ctx.strokeStyle = '#FFD400';
  ctx.lineWidth = 16;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Avatar Circle Frame (cx=540, cy=460, radius=320)
  const cx = 540;
  const cy = 460;
  const r = 320;

  ctx.strokeStyle = '#FF007A';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 12, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#FFD400';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 2, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  if (userImage) {
    drawTransformedImage(ctx, userImage, cx - r, cy - r, r * 2, r * 2, zoom, posX, posY);
  } else {
    ctx.fillStyle = '#02402E';
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.fillStyle = '#FFD400';
    ctx.font = '900 32px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('HH GOA BUILDER', cx, cy);
  }
  ctx.restore();

  // Bottom Name Banner
  ctx.fillStyle = '#023B2A';
  ctx.beginPath();
  ctx.roundRect(100, 840, 880, 90, 20);
  ctx.fill();
  ctx.strokeStyle = '#FFD400';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#FFD400';
  ctx.font = '900 38px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(displayName, 540, 898);

  // Sub Badge
  ctx.fillStyle = '#FF007A';
  ctx.beginPath();
  ctx.roundRect(200, 945, 680, 55, 14);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 22px "Courier New", monospace';
  ctx.fillText(`⚡ ${displayRole} ⚡ HH GOA 2026`, 540, 980);
}

/**
 * Image Transformation Helper for Zoom & Pan inside Aperture
 */
function drawTransformedImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  destX: number,
  destY: number,
  destW: number,
  destH: number,
  zoom: number,
  posX: number,
  posY: number
) {
  const naturalRatio = img.naturalWidth / img.naturalHeight;
  let renderW = destW;
  let renderH = destH;

  if (naturalRatio > 1) {
    renderW = destH * naturalRatio;
  } else {
    renderH = destW / naturalRatio;
  }

  renderW *= zoom;
  renderH *= zoom;

  const offsetX = destX + (destW - renderW) / 2 + (posX / 100) * (destW / 2);
  const offsetY = destY + (destH - renderH) / 2 + (posY / 100) * (destH / 2);

  ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
}

/**
 * Synthesizes paper print noise grain texture directly on Canvas
 */
function applyPaperPrintTexture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const noiseCanvas = document.createElement('canvas');
  noiseCanvas.width = 300;
  noiseCanvas.height = 300;
  const noiseCtx = noiseCanvas.getContext('2d');
  if (!noiseCtx) return;

  const imgData = noiseCtx.createImageData(300, 300);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 35;
    data[i] = 120 + noise;
    data[i + 1] = 110 + noise;
    data[i + 2] = 90 + noise;
    data[i + 3] = 18;
  }
  noiseCtx.putImageData(imgData, 0, 0);

  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  const pattern = ctx.createPattern(noiseCanvas, 'repeat');
  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.restore();
}
