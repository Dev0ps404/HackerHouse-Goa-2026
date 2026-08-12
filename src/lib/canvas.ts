import templateImgUrl from '../assets/hhgoa-template.png';
import { generateBuilderId } from './builderId';
import { getSmartBuilderProfile } from './builderTitles';
import type { TeamMember } from '../types/team';

export type FrameFormat = 'pfp' | 'builder' | 'team';

export interface RenderOptions {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement | null;
  format: FrameFormat;
  name: string;
  role: string;
  builderTitle: string;
  zoom: number; // 0.5 to 2.5
  positionX: number; // -100 to 100
  positionY: number; // -100 to 100
  teamMembers?: TeamMember[];
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
  const { canvas, image, format, name, role, builderTitle, zoom, positionX, positionY, teamMembers = [] } = options;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 1080;
  let height = 1350;

  if (format === 'pfp') {
    width = 1080;
    height = 1080;
  } else if (format === 'team') {
    width = 1350;
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
    renderPFPFormat(ctx, width, height, image, zoom, positionX, positionY, name, role, builderTitle);
  } else if (format === 'team') {
    renderTeamFormat(ctx, width, height, teamMembers);
  } else {
    renderBuilderFormat(ctx, width, height, image, zoom, positionX, positionY, name, role, builderTitle);
  }

  // Synthesize subtle vintage print paper grain texture
  applyPaperPrintTexture(ctx, width, height);
}

/**
 * INDIVIDUAL BUILDER CARD (1080 x 1350)
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
  _builderTitle: string
) {
  // 1. Draw Master Reference Poster Background (1080 x 1350)
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
    ctx.fillStyle = '#02402E';
    ctx.fillRect(photoCenterX - photoRadius, photoCenterY - photoRadius, photoRadius * 2, photoRadius * 2);
    ctx.fillStyle = '#FFC107';
    ctx.font = 'bold 32px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DROP PHOTO HERE', photoCenterX, photoCenterY);
  }
  ctx.restore();

  // 3. Smart Profile Computation
  const smartProfile = getSmartBuilderProfile(role);
  const builderSerialId = generateBuilderId(name, role);

  // 4. User Name Overlay Box (cx=540, cy=782)
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

  // 5. User Role Overlay Box (cx=540, cy=860)
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

  // 6. Dynamic Builder Class Title in Column 1 (cx=242, cy=970)
  const titleX = 242;
  const titleY = 970;

  ctx.save();
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(titleX - 95, titleY - 14, 190, 28);

  ctx.fillStyle = '#E6005C';
  ctx.font = '900 18px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(smartProfile.title.toUpperCase(), titleX, titleY);
  ctx.restore();

  // 7. Dynamic Builder Serial ID Overlay in Column 3 (cx=838, cy=1170)
  ctx.save();
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(838 - 60, 1170 - 10, 120, 20);

  ctx.fillStyle = '#02402E';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(builderSerialId, 838, 1170);
  ctx.restore();
}

/**
 * PFP FRAME (1080 x 1080)
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
 * TEAM FRAME MODE (1350 x 1080 Landscape)
 * Supports 2 to 5 Team Members in a single combined collectible graphic!
 */
function renderTeamFormat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  members: TeamMember[]
) {
  // Background: Deep Forest Green & Retro Cream Paper Container
  ctx.fillStyle = '#012418';
  ctx.fillRect(0, 0, width, height);

  const margin = 28;
  const cardW = width - margin * 2;
  const cardH = height - margin * 2;
  const cardX = margin;
  const cardY = margin;

  // Main Card Base
  ctx.save();
  ctx.fillStyle = '#FFFDF0';
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 36);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#E2B842';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(cardX + 12, cardY + 12, cardW - 24, cardH - 24, 28);
  ctx.stroke();
  ctx.restore();

  // Top Header Banner
  ctx.save();
  ctx.fillStyle = '#02402E';
  ctx.font = '900 48px "Space Grotesk", serif';
  ctx.textAlign = 'center';
  ctx.fillText('HACKER HOUSE GOA 2026', width / 2, cardY + 80);

  ctx.fillStyle = '#E6005C';
  ctx.font = '900 22px "Space Grotesk", sans-serif';
  ctx.fillText('✦   OFFICIAL BUILDER TEAM   ✦', width / 2, cardY + 120);
  ctx.restore();

  // Calculate layout spacing based on team members count (2 to 5)
  const displayMembers = members.length > 0 ? members.slice(0, 5) : [
    { id: '1', name: 'DEVASHISH', role: 'AI ENGINEER', imageUrl: null, imageElement: null, zoom: 1, positionX: 0, positionY: 0 },
    { id: '2', name: 'MADHAVAN', role: 'FULL STACK', imageUrl: null, imageElement: null, zoom: 1, positionX: 0, positionY: 0 },
    { id: '3', name: 'ROHIT', role: 'UI/UX DESIGNER', imageUrl: null, imageElement: null, zoom: 1, positionX: 0, positionY: 0 },
  ];

  const count = displayMembers.length;
  const radius = count > 3 ? 120 : 150;
  const spacing = cardW / (count + 1);
  const photoY = cardY + 410;

  displayMembers.forEach((member, idx) => {
    const cx = cardX + spacing * (idx + 1);

    // Circular Photo Frame with Woven Ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, photoY, radius + 12, 0, Math.PI * 2);
    ctx.fillStyle = '#FFC107';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, photoY, radius + 6, 0, Math.PI * 2);
    ctx.fillStyle = '#E6005C';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, photoY, radius, 0, Math.PI * 2);
    ctx.clip();

    if (member.imageElement) {
      drawTransformedImage(
        ctx,
        member.imageElement,
        cx - radius,
        photoY - radius,
        radius * 2,
        radius * 2,
        member.zoom || 1,
        member.positionX || 0,
        member.positionY || 0
      );
    } else {
      ctx.fillStyle = '#02402E';
      ctx.fillRect(cx - radius, photoY - radius, radius * 2, radius * 2);
      ctx.fillStyle = '#FFC107';
      ctx.font = 'bold 20px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`BUILDER ${idx + 1}`, cx, photoY);
    }
    ctx.restore();

    // Member Name Pill
    const mName = member.name.trim() ? member.name.toUpperCase() : `BUILDER ${idx + 1}`;
    const nameW = count > 3 ? 200 : 250;
    const nameH = 46;

    ctx.save();
    ctx.fillStyle = '#02402E';
    ctx.strokeStyle = '#E2B842';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(cx - nameW / 2, photoY + radius + 24, nameW, nameH, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `900 ${count > 3 ? 18 : 22}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(mName, cx, photoY + radius + 24 + nameH / 2);
    ctx.restore();

    // Member Role Pill
    const mRole = member.role.trim() ? member.role.toUpperCase() : 'BUILDER';
    const roleW = count > 3 ? 180 : 220;
    const roleH = 38;

    ctx.save();
    ctx.fillStyle = '#FFC107';
    ctx.strokeStyle = '#02402E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cx - roleW / 2, photoY + radius + 78, roleW, roleH, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#E6005C';
    ctx.font = `900 ${count > 3 ? 13 : 15}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`⚡ ${mRole} ⚡`, cx, photoY + radius + 78 + roleH / 2);
    ctx.restore();
  });

  // Bottom Pink Ribbon Banner (#FRAMEINGOA)
  const ribbonY = cardY + cardH - 85;
  const ribbonW = cardW - 200;
  const ribbonH = 58;
  const ribbonX = width / 2 - ribbonW / 2;

  ctx.save();
  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.roundRect(ribbonX, ribbonY, ribbonW, ribbonH, 14);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 28px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦   #FRAMEINGOA   //   HH GOA 2026   ✦', width / 2, ribbonY + ribbonH / 2);
  ctx.restore();
}

/**
 * Synthesizes vintage paper print grain noise onto canvas.
 */
function applyPaperPrintTexture(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.035;

  const noiseCanvas = document.createElement('canvas');
  noiseCanvas.width = 200;
  noiseCanvas.height = 200;
  const noiseCtx = noiseCanvas.getContext('2d');

  if (noiseCtx) {
    const imgData = noiseCtx.createImageData(200, 200);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.floor(Math.random() * 255);
      data[i] = noise;
      data[i + 1] = noise;
      data[i + 2] = noise;
      data[i + 3] = 255;
    }

    noiseCtx.putImageData(imgData, 0, 0);

    const pattern = ctx.createPattern(noiseCanvas, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
    }
  }

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
