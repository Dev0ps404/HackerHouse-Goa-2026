import { generateBuilderId } from './builderId';
import { getSmartBuilderProfile } from './builderTitles';
import { generateQRCodeDataUrl } from './qr';
import { drawPalmTree, drawSunBurst, drawWaveLines, drawDefaultAvatar } from './vectorAssets';
import type { TeamMember, BuilderData } from '../types/team';

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

let cachedQrImg: HTMLImageElement | null = null;
let cachedQrDataUrl: string | null = null;

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
 * Main rendering engine for Hacker House Goa 2026 graphics.
 * 100% Pure Dynamic Canvas Rendering — NO static background reference image.
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

  const builderData: BuilderData = {
    photo: image,
    name: name.trim(),
    role: role.trim(),
    stack: role.trim(),
    builderClass: builderTitle || getSmartBuilderProfile(role, name).title,
    builderId: generateBuilderId(name, role),
    zoom,
    positionX,
    positionY,
  };

  if (format === 'pfp') {
    renderPFPFormat(ctx, width, height, builderData);
  } else if (format === 'team') {
    renderTeamFormat(ctx, width, height, teamMembers);
  } else {
    renderBuilderFormat(ctx, width, height, builderData);
  }

  // Synthesize subtle vintage print paper grain texture
  applyPaperPrintTexture(ctx, width, height);

  // Asynchronously draw real scannable QR code if not already cached
  getOrGenerateQR().then((qrImg) => {
    if (qrImg && format === 'builder') {
      ctx.drawImage(qrImg, 90, 1135, 110, 110);
    }
  });
}

/**
 * INDIVIDUAL BUILDER CARD (1080 × 1350)
 * 100% Pure Dynamic Canvas Graphic Composition
 */
function renderBuilderFormat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  data: BuilderData
) {
  const { photo, name, role, builderClass, builderId, zoom, positionX, positionY } = data;
  const profile = getSmartBuilderProfile(role, name);

  // 1. LAYER 1: Background Warm Retro Cream Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFFDF0');
  bgGrad.addColorStop(0.5, '#FFF7DF');
  bgGrad.addColorStop(1, '#F7ECC8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Tropical Sun Burst in upper center
  drawSunBurst(ctx, 540, 480, 520, 24, '#FFD40018');

  // 2. LAYER 2: Double Outer Dark Emerald Border & Inner Gold Inset Accent
  ctx.strokeStyle = '#023B2A';
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  ctx.strokeStyle = '#FFD400';
  ctx.lineWidth = 4;
  ctx.strokeRect(26, 26, width - 52, height - 52);

  ctx.strokeStyle = '#023B2A';
  ctx.lineWidth = 3;
  ctx.strokeRect(34, 34, width - 68, height - 68);

  // 3. LAYER 3: Vector Tropical Decorative Illustrations (Palms at top corners & bottom)
  drawPalmTree(ctx, 90, 220, 1.1, false, '#045D43');
  drawPalmTree(ctx, width - 90, 220, 1.1, true, '#045D43');
  drawWaveLines(ctx, 80, 1260, 200, '#045D4366');
  drawWaveLines(ctx, width - 280, 1260, 200, '#045D4366');

  // 4. LAYER 4: Brand Header & Badge
  // Top Vertical Badge: "HH GOA 2026"
  ctx.fillStyle = '#023B2A';
  ctx.beginPath();
  ctx.roundRect(70, 50, 140, 42, 10);
  ctx.fill();
  ctx.fillStyle = '#FFD400';
  ctx.font = '900 16px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HH GOA 2026', 140, 76);

  // Event Edition Stamp: "LIMITED COLLECTIBLE"
  ctx.fillStyle = '#FF007A';
  ctx.beginPath();
  ctx.roundRect(width - 240, 50, 170, 42, 10);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 13px "Courier New", monospace';
  ctx.fillText('COLLECTIBLE ID', width - 155, 75);

  // Main Vintage Typography Title: "HACKER GOA HOUSE"
  ctx.fillStyle = '#023B2A';
  ctx.font = '900 52px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText('HACKER GOA HOUSE', 540, 145);

  // Sub-header Line
  ctx.strokeStyle = '#FF007A';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(180, 162);
  ctx.lineTo(900, 162);
  ctx.stroke();

  ctx.fillStyle = '#FF007A';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.fillText('✦ OFFICIAL BUILDER PASSPORT ✦ MARCH 2026 ✦ GOA, INDIA ✦', 540, 190);

  // 5. LAYER 5: Central Photo Aperture Frame (cx=540, cy=480, radius=220)
  const photoCenterX = 540;
  const photoCenterY = 480;
  const photoRadius = 210;

  // Outer Decorative Pink Accent Ring
  ctx.strokeStyle = '#FF007A';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius + 14, 0, Math.PI * 2);
  ctx.stroke();

  // Inner Decorative Gold Accent Ring
  ctx.strokeStyle = '#FFD400';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius + 4, 0, Math.PI * 2);
  ctx.stroke();

  // Dark Emerald Bezel Frame
  ctx.strokeStyle = '#023B2A';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Clip photo aperture shape
  ctx.save();
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius, 0, Math.PI * 2);
  ctx.clip();

  if (photo) {
    drawTransformedImage(
      ctx,
      photo,
      photoCenterX - photoRadius,
      photoCenterY - photoRadius,
      photoRadius * 2,
      photoRadius * 2,
      zoom,
      positionX,
      positionY
    );
  } else {
    // Clean Retro Tropical Builder Avatar Silhouette — NEVER write "DROP PHOTO HERE"
    drawDefaultAvatar(ctx, photoCenterX, photoCenterY, photoRadius);
  }
  ctx.restore();

  // 6. LAYER 6: Identity Box (NAME & ROLE — EXACTLY ONCE EACH)
  const displayName = name ? name.toUpperCase() : 'ANONYMOUS BUILDER';
  const displayRole = role ? role.toUpperCase() : 'SOFTWARE ARCHITECT';

  // Primary Name Box (#023B2A filled rectangle with gold text)
  const nameBoxWidth = 640;
  const nameBoxHeight = 68;
  const nameBoxX = 540 - nameBoxWidth / 2;
  const nameBoxY = 730;

  ctx.fillStyle = '#023B2A';
  ctx.beginPath();
  ctx.roundRect(nameBoxX, nameBoxY, nameBoxWidth, nameBoxHeight, 16);
  ctx.fill();
  ctx.strokeStyle = '#FFD400';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#FFD400';
  ctx.font = '900 36px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(displayName, 540, nameBoxY + 46);

  // Primary Role Box (#FFD400 gold filled box with dark emerald text)
  const roleBoxWidth = 520;
  const roleBoxHeight = 50;
  const roleBoxX = 540 - roleBoxWidth / 2;
  const roleBoxY = 812;

  ctx.fillStyle = '#FFD400';
  ctx.beginPath();
  ctx.roundRect(roleBoxX, roleBoxY, roleBoxWidth, roleBoxHeight, 12);
  ctx.fill();
  ctx.strokeStyle = '#023B2A';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#023B2A';
  ctx.font = '900 22px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(displayRole, 540, roleBoxY + 33);

  // 7. LAYER 7: Details Grid (BUILDER CLASS, BEACH BAG, SHIPPING — EXACTLY ONCE EACH)
  const detailsY = 885;

  // Builder Class Badge
  ctx.fillStyle = '#FF007A';
  ctx.beginPath();
  ctx.roundRect(140, detailsY, 800, 50, 10);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 20px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`BUILDER CLASS: ${builderClass.toUpperCase()}`, 540, detailsY + 32);

  // Beach Bag & Shipping Status 2-Column Info Grid
  const gridY = detailsY + 65;

  ctx.fillStyle = '#023B2A10';
  ctx.strokeStyle = '#023B2A44';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(140, gridY, 800, 115, 14);
  ctx.fill();
  ctx.stroke();

  // Column 1: Beach Bag Essentials
  ctx.fillStyle = '#FF007A';
  ctx.font = '900 14px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('🎒 GOA BEACH BAG:', 170, gridY + 34);

  ctx.fillStyle = '#023B2A';
  ctx.font = '700 16px "Courier New", monospace';
  ctx.fillText(profile.beachBag.toUpperCase(), 170, gridY + 62);
  ctx.fillText('SPECS: 100% OPEN SOURCE ✦ TROPICAL READY', 170, gridY + 90);

  // Divider Line
  ctx.strokeStyle = '#023B2A33';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(560, gridY + 15);
  ctx.lineTo(560, gridY + 100);
  ctx.stroke();

  // Column 2: Currently Shipping
  ctx.fillStyle = '#FF007A';
  ctx.font = '900 14px "Courier New", monospace';
  ctx.fillText('🚀 CURRENTLY SHIPPING:', 590, gridY + 34);

  ctx.fillStyle = '#023B2A';
  ctx.font = '700 16px "Courier New", monospace';
  ctx.fillText(profile.shipping.toUpperCase(), 590, gridY + 62);
  ctx.fillText(`STATUS: VERIFIED BUILDER ✦ ${profile.stackBadge}`, 590, gridY + 90);

  // 8. LAYER 8: Footer Metadata (QR, Builder ID, Barcode, Tagline)
  const footerY = 1090;

  ctx.fillStyle = '#023B2A';
  ctx.fillRect(70, footerY, 940, 180);

  // Draw Real QR Code Frame (Left)
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(80, footerY + 10, 130, 130);
  if (cachedQrImg) {
    ctx.drawImage(cachedQrImg, 90, footerY + 20, 110, 110);
  } else {
    // Fallback QR Graphic pattern
    drawFallbackQrPattern(ctx, 90, footerY + 20, 110);
  }
  ctx.fillStyle = '#FFD400';
  ctx.font = '900 10px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN FOR GITHUB', 145, footerY + 155);

  // Builder ID & Verification Stamp (Center)
  ctx.fillStyle = '#FFD400';
  ctx.font = '900 24px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`SERIAL: ${builderId}`, 540, footerY + 45);

  ctx.fillStyle = '#FFFDF0';
  ctx.font = '700 16px "Courier New", monospace';
  ctx.fillText('LOCATION: MORJIM BEACH, GOA', 540, footerY + 75);
  ctx.fillText('ORGANIZER: HACKER HOUSE GOA TEAM', 540, footerY + 100);

  // Vector Barcode Graphic (Right)
  drawVectorBarcode(ctx, 770, footerY + 25, 180, 75, builderId);
  ctx.fillStyle = '#FFD400';
  ctx.font = '900 11px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(builderId, 860, footerY + 115);

  // #FRAMEINGOA Tagline Footer Bar
  ctx.fillStyle = '#FF007A';
  ctx.fillRect(70, footerY + 140, 940, 40);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 18px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('#FRAMEINGOA ✦ SHARE YOUR GOA BUILDER IDENTITY ✦ HH GOA 2026', 540, footerY + 166);
}

/**
 * PFP FORMAT (1:1 Square 1080 × 1080)
 */
function renderPFPFormat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  data: BuilderData
) {
  const { photo, name, role, zoom, positionX, positionY } = data;
  const displayName = name ? name.toUpperCase() : 'GOA BUILDER';
  const displayRole = role ? role.toUpperCase() : 'HACKER HOUSE 2026';

  // 1. Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#023B2A');
  bgGrad.addColorStop(1, '#011F15');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  drawSunBurst(ctx, 540, 540, 500, 20, '#FFD40018');

  // Tropical Palms at corners
  drawPalmTree(ctx, 80, 200, 1.2, false, '#045D43');
  drawPalmTree(ctx, width - 80, 200, 1.2, true, '#045D43');

  // Outer Ring
  ctx.strokeStyle = '#FFD400';
  ctx.lineWidth = 16;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Central Large Avatar Frame (cx=540, cy=460, radius=320)
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

  if (photo) {
    drawTransformedImage(ctx, photo, cx - r, cy - r, r * 2, r * 2, zoom, positionX, positionY);
  } else {
    drawDefaultAvatar(ctx, cx, cy, r);
  }
  ctx.restore();

  // Bottom Name Badge Banner Overlay
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
 * TEAM FRAME FORMAT (5:4 Landscape 1350 × 1080)
 * Supports 2 to 5 team members smoothly
 */
function renderTeamFormat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  teamMembers: TeamMember[]
) {
  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFFDF0');
  bgGrad.addColorStop(0.5, '#FFF7DF');
  bgGrad.addColorStop(1, '#F7ECC8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  drawSunBurst(ctx, width / 2, height / 2, 600, 24, '#FFD40018');

  // Outer Border
  ctx.strokeStyle = '#023B2A';
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  ctx.strokeStyle = '#FFD400';
  ctx.lineWidth = 4;
  ctx.strokeRect(26, 26, width - 52, height - 52);

  // Header Title
  ctx.fillStyle = '#023B2A';
  ctx.font = '900 48px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HACKER HOUSE GOA 2026 ✦ SQUAD IDENTITY', width / 2, 110);

  const activeMembers = teamMembers.length > 0 ? teamMembers : [
    { id: '1', name: 'BUILDER 1', role: 'FULL STACK', imageUrl: null, imageElement: null, zoom: 1, positionX: 0, positionY: 0 },
    { id: '2', name: 'BUILDER 2', role: 'AI ENGINEER', imageUrl: null, imageElement: null, zoom: 1, positionX: 0, positionY: 0 },
    { id: '3', name: 'BUILDER 3', role: 'DESIGNER', imageUrl: null, imageElement: null, zoom: 1, positionX: 0, positionY: 0 },
  ];

  const memberCount = activeMembers.length;
  const circleRadius = memberCount <= 3 ? 150 : 120;
  const startY = 460;
  const availableWidth = width - 200;
  const spacing = availableWidth / (memberCount + 1);

  activeMembers.forEach((member, idx) => {
    const memberCX = 100 + spacing * (idx + 1);

    // Outer Decorative Rings
    ctx.strokeStyle = '#FF007A';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(memberCX, startY, circleRadius + 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#FFD400';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(memberCX, startY, circleRadius + 2, 0, Math.PI * 2);
    ctx.stroke();

    // Clip Member Photo
    ctx.save();
    ctx.beginPath();
    ctx.arc(memberCX, startY, circleRadius, 0, Math.PI * 2);
    ctx.clip();

    if (member.imageElement) {
      drawTransformedImage(
        ctx,
        member.imageElement,
        memberCX - circleRadius,
        startY - circleRadius,
        circleRadius * 2,
        circleRadius * 2,
        member.zoom,
        member.positionX,
        member.positionY
      );
    } else {
      drawDefaultAvatar(ctx, memberCX, startY, circleRadius);
    }
    ctx.restore();

    // Member Name Badge
    const badgeW = circleRadius * 2 + 30;
    ctx.fillStyle = '#023B2A';
    ctx.beginPath();
    ctx.roundRect(memberCX - badgeW / 2, startY + circleRadius + 30, badgeW, 46, 12);
    ctx.fill();
    ctx.strokeStyle = '#FFD400';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFD400';
    ctx.font = '900 18px "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(member.name.toUpperCase(), memberCX, startY + circleRadius + 59);

    // Member Role Sub-badge
    ctx.fillStyle = '#FF007A';
    ctx.beginPath();
    ctx.roundRect(memberCX - badgeW / 2 + 10, startY + circleRadius + 84, badgeW - 20, 34, 8);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 13px "Courier New", monospace';
    ctx.fillText(member.role.toUpperCase(), memberCX, startY + circleRadius + 106);
  });

  // Footer Tagline
  ctx.fillStyle = '#023B2A';
  ctx.fillRect(70, 960, width - 140, 70);
  ctx.fillStyle = '#FFD400';
  ctx.font = '900 20px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('#FRAMEINGOA ✦ OFFICIAL TEAM COLLECTIBLE PASSPORT ✦ HH GOA 2026', width / 2, 1002);
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
 * Fallback QR Code Pattern
 */
function drawFallbackQrPattern(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.fillStyle = '#023B2A';
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(x + 6, y + 6, size - 12, size - 12);

  ctx.fillStyle = '#023B2A';
  // Finder pattern top-left
  ctx.fillRect(x + 12, y + 12, 30, 30);
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(x + 18, y + 18, 18, 18);
  ctx.fillStyle = '#023B2A';
  ctx.fillRect(x + 24, y + 24, 6, 6);

  // Finder pattern top-right
  ctx.fillRect(x + size - 42, y + 12, 30, 30);
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(x + size - 36, y + 18, 18, 18);
  ctx.fillStyle = '#023B2A';
  ctx.fillRect(x + size - 30, y + 24, 6, 6);
}

/**
 * Vector Code-128 Style Barcode Generator
 */
function drawVectorBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  seedStr: string
) {
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = '#023B2A';
  let currX = x + 10;
  const endX = x + width - 10;

  for (let i = 0; currX < endX; i++) {
    const charCode = seedStr.charCodeAt(i % seedStr.length) || 65;
    const barW = (charCode % 4) + 1.5;
    const gapW = ((charCode * 3) % 4) + 1.5;

    ctx.fillRect(currX, y + 8, barW, height - 24);
    currX += barW + gapW;
  }
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
