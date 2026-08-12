import templateImgUrl from '../assets/hhgoa-template.png';

export type FrameFormat = 'pfp' | 'builder';

export interface RenderOptions {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement | null;
  format: FrameFormat;
  name: string;
  role: string;
  builderTitle: string;
  zoom: number; // 0.5 to 2.5 (default 1.0)
  positionX: number; // -100 to 100 (% offset)
  positionY: number; // -100 to 100 (% offset)
}

let cachedTemplateImg: HTMLImageElement | null = null;
let isTemplateLoading = false;
const loadListeners: Array<() => void> = [];

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

/**
 * Main rendering engine for Hacker House Goa 2026 graphics.
 */
export function drawCanvasFrame(options: RenderOptions): void {
  const { canvas, image, format, name, role, builderTitle, zoom, positionX, positionY } = options;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 1080;
  const height = format === 'pfp' ? 1080 : 1350;

  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);

  if (!cachedTemplateImg || !cachedTemplateImg.complete) {
    loadTemplateImage(() => {
      drawCanvasFrame(options);
    });
  }

  if (format === 'pfp') {
    renderPFPFormat(ctx, width, height, image, zoom, positionX, positionY, name, role, builderTitle);
  } else {
    renderBuilderFormat(ctx, width, height, image, zoom, positionX, positionY, name, role, builderTitle);
  }
}

/**
 * EXACT OFFICIAL REFERENCE DESIGN: BUILDER ID CARD (1080 x 1350)
 * 100% Perfect Pixel Alignment matching Reference Poster Template
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
  role: string,
  builderTitle: string
) {
  // 1. Draw Master Reference Poster Background (1080 x 1350)
  if (cachedTemplateImg && cachedTemplateImg.complete && cachedTemplateImg.naturalWidth > 0) {
    ctx.drawImage(cachedTemplateImg, 0, 0, width, height);
  } else {
    ctx.fillStyle = '#FFFDF0';
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Central Circular Photo Aperture (Aligned inside template's woven ring: cx=540, cy=472, radius=240)
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
    ctx.fillStyle = '#02402E';
    ctx.fillRect(photoCenterX - photoRadius, photoCenterY - photoRadius, photoRadius * 2, photoRadius * 2);
    ctx.fillStyle = '#FFC107';
    ctx.font = 'bold 32px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DROP PHOTO HERE', photoCenterX, photoCenterY);
  }
  ctx.restore();

  // 3. User Name Overlay Box (Replaces template name box cleanly at cx=540, cy=782)
  const displayName = name.trim() ? name.toUpperCase() : 'YOUR NAME';
  const nameBoxW = 630;
  const nameBoxH = 70;
  const nameBoxX = photoCenterX - nameBoxW / 2;
  const nameBoxY = 747;

  ctx.save();
  ctx.fillStyle = '#02402E'; // Dark Emerald
  ctx.strokeStyle = '#E2B842'; // Gold Border
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(nameBoxX, nameBoxY, nameBoxW, nameBoxH, 20);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 32px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayName, photoCenterX, nameBoxY + nameBoxH / 2);
  ctx.restore();

  // 4. User Role Overlay Box (Replaces template role box cleanly at cx=540, cy=860)
  const displayRole = role.trim() ? role.toUpperCase() : 'FULL STACK DEVELOPER';
  const roleBoxW = 520;
  const roleBoxH = 54;
  const roleBoxX = photoCenterX - roleBoxW / 2;
  const roleBoxY = 833;

  ctx.save();
  ctx.fillStyle = '#FFC107'; // Solar Yellow
  ctx.strokeStyle = '#02402E'; // Dark Emerald Line
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(roleBoxX, roleBoxY, roleBoxW, roleBoxH, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#E6005C'; // Pink Text
  ctx.font = '900 20px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`⚡   ${displayRole}   ⚡`, photoCenterX, roleBoxY + roleBoxH / 2);
  ctx.restore();

  // 5. Dynamic Builder Class Title in Column 1 (cx=242, cy=970)
  const displayTitle = builderTitle || 'TERMINAL WIZARD';
  const titleX = 242;
  const titleY = 970;

  ctx.save();
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(titleX - 95, titleY - 14, 190, 28);

  ctx.fillStyle = '#E6005C';
  ctx.font = '900 18px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayTitle.toUpperCase(), titleX, titleY);
  ctx.restore();
}

/**
 * EXACT OFFICIAL REFERENCE DESIGN: PFP FRAME (1080 x 1080)
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
  role: string,
  _builderTitle: string
) {
  if (cachedTemplateImg && cachedTemplateImg.complete && cachedTemplateImg.naturalWidth > 0) {
    ctx.drawImage(cachedTemplateImg, 0, 0, width, height);
  } else {
    ctx.fillStyle = '#FFFDF0';
    ctx.fillRect(0, 0, width, height);
  }

  const photoCenterX = 540;
  const photoCenterY = 380;
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
    ctx.fillStyle = '#02402E';
    ctx.fillRect(photoCenterX - photoRadius, photoCenterY - photoRadius, photoRadius * 2, photoRadius * 2);
    ctx.fillStyle = '#FFC107';
    ctx.font = 'bold 30px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DROP PHOTO HERE', photoCenterX, photoCenterY);
  }
  ctx.restore();

  // Name Box
  const displayName = name.trim() ? name.toUpperCase() : 'YOUR NAME';
  const nameBoxW = 630;
  const nameBoxH = 70;
  const nameBoxX = photoCenterX - nameBoxW / 2;
  const nameBoxY = 620;

  ctx.save();
  ctx.fillStyle = '#02402E';
  ctx.strokeStyle = '#E2B842';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(nameBoxX, nameBoxY, nameBoxW, nameBoxH, 20);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 32px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayName, photoCenterX, nameBoxY + nameBoxH / 2);
  ctx.restore();

  // Role Box
  const displayRole = role.trim() ? role.toUpperCase() : 'FULL STACK DEVELOPER';
  const roleBoxW = 520;
  const roleBoxH = 54;
  const roleBoxX = photoCenterX - roleBoxW / 2;
  const roleBoxY = 705;

  ctx.save();
  ctx.fillStyle = '#FFC107';
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(roleBoxX, roleBoxY, roleBoxW, roleBoxH, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#E6005C';
  ctx.font = '900 20px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`⚡   ${displayRole}   ⚡`, photoCenterX, roleBoxY + roleBoxH / 2);
  ctx.restore();
}

/**
 * Helper to draw transformed image.
 */
function drawTransformedImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number,
  zoom: number,
  posX: number,
  posY: number
) {
  const imgW = image.naturalWidth || image.width;
  const imgH = image.naturalHeight || image.height;

  if (imgW === 0 || imgH === 0) return;

  const scale = Math.max(boxW / imgW, boxH / imgH) * zoom;
  const drawW = imgW * scale;
  const drawH = imgH * scale;

  const offsetX = (posX / 100) * (boxW * 0.5);
  const offsetY = (posY / 100) * (boxH * 0.5);

  const drawX = boxX + (boxW - drawW) / 2 + offsetX;
  const drawY = boxY + (boxH - drawH) / 2 + offsetY;

  ctx.drawImage(image, drawX, drawY, drawW, drawH);
}
