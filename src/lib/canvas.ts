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

  if (format === 'pfp') {
    renderPFPFormat(ctx, width, height, image, zoom, positionX, positionY);
  } else {
    renderBuilderFormat(ctx, width, height, image, zoom, positionX, positionY, name, role, builderTitle);
  }
}

/**
 * ULTRA-PREMIUM FORMAT A: PFP FRAME OVERLAY (1080 x 1080)
 * Hacker House Goa 2026 Brand Signature
 */
function renderPFPFormat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  image: HTMLImageElement | null,
  zoom: number,
  posX: number,
  posY: number
) {
  // 1. Rich Deep Emerald Background & Top Radial Glow
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, width * 0.75);
  bgGrad.addColorStop(0, '#044D34');
  bgGrad.addColorStop(0.5, '#023322');
  bgGrad.addColorStop(1, '#011A11');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Top Gold Light Spotlight Beam
  const topSpot = ctx.createRadialGradient(width / 2, 0, 10, width / 2, 0, 500);
  topSpot.addColorStop(0, 'rgba(255, 230, 0, 0.22)');
  topSpot.addColorStop(0.6, 'rgba(255, 230, 0, 0.04)');
  topSpot.addColorStop(1, 'transparent');
  ctx.fillStyle = topSpot;
  ctx.fillRect(0, 0, width, 550);

  // Bottom Pink Glow Accent
  const botSpot = ctx.createRadialGradient(width / 2, height, 10, width / 2, height, 450);
  botSpot.addColorStop(0, 'rgba(255, 0, 122, 0.2)');
  botSpot.addColorStop(1, 'transparent');
  ctx.fillStyle = botSpot;
  ctx.fillRect(0, height - 450, width, 450);

  // Cyber Circuit Grid Lines
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 230, 0, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 36) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 36) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Photo Aperture Geometry
  const photoSize = width * 0.82;
  const photoX = (width - photoSize) / 2;
  const photoY = (height - photoSize) / 2 + 8;
  const borderRadius = 44;

  // Heavy Outer Shadow for 3D Depth
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 15;
  ctx.fillStyle = '#011F15';
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoSize, photoSize, borderRadius);
  ctx.fill();
  ctx.restore();

  // Draw Photo
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoSize, photoSize, borderRadius);
  ctx.clip();

  if (image) {
    drawTransformedImage(ctx, image, photoX, photoY, photoSize, photoSize, zoom, posX, posY);
  } else {
    ctx.fillStyle = '#022C1F';
    ctx.fillRect(photoX, photoY, photoSize, photoSize);

    ctx.fillStyle = 'rgba(255, 230, 0, 0.5)';
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DROP PHOTO HERE', photoX + photoSize / 2, photoY + photoSize / 2);
  }

  // Inner Vignette Tint
  const innerVignette = ctx.createRadialGradient(
    photoX + photoSize / 2,
    photoY + photoSize / 2,
    photoSize * 0.35,
    photoX + photoSize / 2,
    photoY + photoSize / 2,
    photoSize * 0.55
  );
  innerVignette.addColorStop(0, 'transparent');
  innerVignette.addColorStop(1, 'rgba(1, 20, 14, 0.45)');
  ctx.fillStyle = innerVignette;
  ctx.fillRect(photoX, photoY, photoSize, photoSize);

  ctx.restore();

  // 3. Multi-Layered Glowing Framing Border
  ctx.save();

  // Outer Neon Glow Ring
  ctx.lineWidth = 10;
  const outerBorderGrad = ctx.createLinearGradient(photoX, photoY, photoX + photoSize, photoY + photoSize);
  outerBorderGrad.addColorStop(0, '#FFE600');
  outerBorderGrad.addColorStop(0.35, '#FF007A');
  outerBorderGrad.addColorStop(0.7, '#00F0FF');
  outerBorderGrad.addColorStop(1, '#FFE600');
  
  ctx.strokeStyle = outerBorderGrad;
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoSize, photoSize, borderRadius);
  ctx.stroke();

  // Inner Metallic Gold Rim
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.roundRect(photoX + 4, photoY + 4, photoSize - 8, photoSize - 8, borderRadius - 4);
  ctx.stroke();

  ctx.restore();

  // 4. Premium Top Header Badge (HACKER HOUSE GOA Branding)
  const headerY = 48;
  const badgeW = 540;
  const badgeH = 68;
  const badgeX = (width - badgeW) / 2;

  ctx.save();
  // Glass Badge Shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;

  // Glass Pill Fill
  const badgeGrad = ctx.createLinearGradient(badgeX, headerY, badgeX + badgeW, headerY + badgeH);
  badgeGrad.addColorStop(0, 'rgba(1, 35, 24, 0.96)');
  badgeGrad.addColorStop(1, 'rgba(2, 24, 17, 0.96)');
  ctx.fillStyle = badgeGrad;
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(badgeX, headerY, badgeW, badgeH, 34);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Logo Text inside Top Header Badge
  ctx.save();
  ctx.fillStyle = '#FFE600';
  ctx.font = '900 24px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(255, 230, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.fillText('HACKER HOUSE', badgeX + 32, headerY + badgeH / 2);
  ctx.restore();

  // Central Hot Pink Goa Badge
  const pinkW = 82;
  const pinkH = 38;
  const pinkX = badgeX + 258;
  const pinkY = headerY + (badgeH - pinkH) / 2;

  ctx.save();
  ctx.fillStyle = '#FF007A';
  ctx.shadowColor = 'rgba(255, 0, 122, 0.6)';
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.roundRect(pinkX, pinkY, pinkW, pinkH, 12);
  ctx.fill();

  ctx.fillStyle = '#FFE600';
  ctx.font = 'bold 18px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GOA', pinkX + pinkW / 2, pinkY + pinkH / 2 + 1);
  ctx.restore();

  // Tag info right
  ctx.save();
  ctx.fillStyle = '#A7F3D0';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('2026 // BUILDER', badgeX + badgeW - 28, headerY + badgeH / 2);
  ctx.restore();

  // 5. Premium Bottom Hashtag Pill (#FrameInGoa)
  const footerY = height - 112;
  const pillW = 620;
  const pillH = 74;
  const pillX = (width - pillW) / 2;

  ctx.save();
  ctx.shadowColor = 'rgba(255, 0, 122, 0.5)';
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 8;

  // Pink Electric Gradient
  const pinkPillGrad = ctx.createLinearGradient(pillX, footerY, pillX + pillW, footerY);
  pinkPillGrad.addColorStop(0, '#FF007A');
  pinkPillGrad.addColorStop(0.5, '#E6006B');
  pinkPillGrad.addColorStop(1, '#FF007A');

  ctx.fillStyle = pinkPillGrad;
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.roundRect(pillX, footerY, pillW, pillH, 37);
  ctx.fill();
  ctx.stroke();

  // Inner Highlight Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(pillX + 3, footerY + 3, pillW - 6, pillH - 6, 34);
  ctx.stroke();

  // Hashtag Text
  ctx.fillStyle = '#FFE600';
  ctx.font = '900 34px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 8;
  ctx.fillText('#FrameInGoa', pillX + pillW / 2, footerY + pillH / 2 - 2);

  ctx.restore();

  // 6. Futuristic HUD Corner Accessories
  drawUltraCornerHUD(ctx, photoX - 22, photoY - 22, photoSize + 44, photoSize + 44);
}

/**
 * EXECUTIVE PROFESSIONAL BUILDER ID CARD (1080 x 1350)
 * Hacker House Goa 2026 VIP Builder Pass
 */
function renderBuilderFormat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  image: HTMLImageElement | null,
  zoom: number,
  posX: number,
  posY: number,
  name: string,
  role: string,
  builderTitle: string
) {
  // 1. Deep Emerald Base & Multi-Spotlight Lighting
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#044D34');
  bgGrad.addColorStop(0.35, '#023826');
  bgGrad.addColorStop(1, '#01160E');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Top Yellow Ambient Spotlight
  const topGlow = ctx.createRadialGradient(width / 2, 80, 20, width / 2, 80, 580);
  topGlow.addColorStop(0, 'rgba(255, 230, 0, 0.28)');
  topGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, width, 650);

  // Bottom Hot Pink Ambient Spotlight
  const botGlow = ctx.createRadialGradient(width / 2, height - 100, 20, width / 2, height - 100, 550);
  botGlow.addColorStop(0, 'rgba(255, 0, 122, 0.28)');
  botGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = botGlow;
  ctx.fillRect(0, height - 650, width, 650);

  // Cyber Circuit Background Grid
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 230, 0, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 36) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 36) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Main Card Container Box
  const margin = 32;
  const cardW = width - margin * 2;
  const cardH = height - margin * 2;
  const cardX = margin;
  const cardY = margin;

  // Heavy Glass Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 50;
  ctx.shadowOffsetY = 22;

  // Dark Emerald Glass Panel
  ctx.fillStyle = 'rgba(2, 38, 26, 0.96)';
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 40);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Inner Metallic Gold Rim Line
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(cardX + 6, cardY + 6, cardW - 12, cardH - 12, 34);
  ctx.stroke();
  ctx.restore();

  // 3. Card Top Header Section
  const headerH = 115;
  ctx.save();

  ctx.strokeStyle = 'rgba(255, 230, 0, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cardX, cardY + headerH);
  ctx.lineTo(cardX + cardW, cardY + headerH);
  ctx.stroke();

  // Logo Brand Text (Yellow "HACKER HOUSE" + Hot Pink "GOA")
  ctx.fillStyle = '#FFE600';
  ctx.font = '900 32px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(255, 230, 0, 0.4)';
  ctx.shadowBlur = 10;
  ctx.fillText('HACKER HOUSE', cardX + 40, cardY + headerH / 2);

  // Pink Goa Pill
  const tagW = 86;
  const tagH = 38;
  const tagX = cardX + 332;
  const tagY = cardY + (headerH - tagH) / 2;

  ctx.fillStyle = '#FF007A';
  ctx.shadowColor = 'rgba(255, 0, 122, 0.6)';
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.roundRect(tagX, tagY, tagW, tagH, 12);
  ctx.fill();

  ctx.fillStyle = '#FFE600';
  ctx.font = 'bold 18px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GOA', tagX + tagW / 2, tagY + tagH / 2 + 1);

  // VIP Pass Badge (Right)
  ctx.fillStyle = 'rgba(255, 0, 122, 0.16)';
  ctx.strokeStyle = '#FF007A';
  ctx.lineWidth = 2;
  const passW = 186;
  const passH = 42;
  const passX = cardX + cardW - passW - 40;
  const passY = cardY + (headerH - passH) / 2;

  ctx.beginPath();
  ctx.roundRect(passX, passY, passW, passH, 21);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER PASS', passX + passW / 2, passY + passH / 2);

  ctx.restore();

  // 4. Portrait Photo Frame Section
  const photoW = 430;
  const photoH = 490;
  const photoX = cardX + (cardW - photoW) / 2;
  const photoY = cardY + 142;

  // Photo 3D Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = '#011A11';
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoW, photoH, 28);
  ctx.fill();
  ctx.restore();

  // Draw Photo
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoW, photoH, 28);
  ctx.clip();

  if (image) {
    drawTransformedImage(ctx, image, photoX, photoY, photoW, photoH, zoom, posX, posY);
  } else {
    ctx.fillStyle = '#012A1D';
    ctx.fillRect(photoX, photoY, photoW, photoH);

    ctx.fillStyle = 'rgba(255, 230, 0, 0.5)';
    ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('UPLOAD PHOTO', photoX + photoW / 2, photoY + photoH / 2);
  }

  ctx.restore();

  // Photo Dual Glowing Border
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoW, photoH, 28);
  ctx.lineWidth = 5;

  const photoBorderGrad = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
  photoBorderGrad.addColorStop(0, '#FFE600');
  photoBorderGrad.addColorStop(0.5, '#FF007A');
  photoBorderGrad.addColorStop(1, '#FFE600');
  ctx.strokeStyle = photoBorderGrad;
  ctx.stroke();
  ctx.restore();

  // 5. User Details & Title Section
  let currentY = photoY + photoH + 28;

  // Name
  const displayName = name.trim() ? name.toUpperCase() : 'YOUR NAME';
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 44px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 8;
  ctx.fillText(displayName, width / 2, currentY);

  // Stack/Role
  currentY += 54;
  const displayRole = role.trim() ? role.toUpperCase() : 'FULL STACK BUILDER';
  ctx.fillStyle = '#A7F3D0';
  ctx.font = '600 20px "Inter", sans-serif';
  ctx.fillText(displayRole, width / 2, currentY);

  // Generated Title Banner (Hot Pink & Gold)
  currentY += 42;
  const displayTitle = builderTitle || 'THE BUILDER';

  ctx.font = '900 22px "Space Grotesk", sans-serif';
  const textMetrics = ctx.measureText(displayTitle);
  const titleBoxW = Math.max(textMetrics.width + 68, 380);
  const titleBoxH = 52;
  const titleBoxX = (width - titleBoxW) / 2;

  const titleBoxGrad = ctx.createLinearGradient(titleBoxX, currentY, titleBoxX + titleBoxW, currentY);
  titleBoxGrad.addColorStop(0, '#FF007A');
  titleBoxGrad.addColorStop(1, '#E6006B');

  ctx.shadowColor = 'rgba(255, 0, 122, 0.5)';
  ctx.shadowBlur = 16;

  ctx.fillStyle = titleBoxGrad;
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(titleBoxX, currentY, titleBoxW, titleBoxH, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFE600';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 6;
  ctx.fillText(displayTitle, width / 2, currentY + titleBoxH / 2);

  ctx.restore();

  // 6. EXECUTIVE EVENT METADATA GRID (Fills middle gap elegantly!)
  currentY += titleBoxH + 32;
  const gridW = cardW - 80;
  const gridH = 100;
  const gridX = cardX + 40;

  ctx.save();
  ctx.fillStyle = 'rgba(1, 26, 17, 0.85)';
  ctx.strokeStyle = 'rgba(255, 230, 0, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(gridX, currentY, gridW, gridH, 20);
  ctx.fill();
  ctx.stroke();

  // Grid Vertical Separators
  ctx.strokeStyle = 'rgba(255, 230, 0, 0.15)';
  ctx.beginPath();
  ctx.moveTo(gridX + gridW / 3, currentY + 12);
  ctx.lineTo(gridX + gridW / 3, currentY + gridH - 12);
  ctx.moveTo(gridX + (gridW * 2) / 3, currentY + 12);
  ctx.lineTo(gridX + (gridW * 2) / 3, currentY + gridH - 12);
  ctx.stroke();

  // Grid Cell 1: LOCATION
  ctx.fillStyle = '#FFE600';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('LOCATION', gridX + gridW / 6, currentY + 20);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 15px "Space Grotesk", sans-serif';
  ctx.fillText('GOA, INDIA', gridX + gridW / 6, currentY + 42);

  ctx.fillStyle = '#A7F3D0';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('15.2993° N', gridX + gridW / 6, currentY + 66);

  // Grid Cell 2: PASS ACCESS
  ctx.fillStyle = '#FFE600';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('ACCESS LEVEL', gridX + gridW / 2, currentY + 20);

  ctx.fillStyle = '#FF007A';
  ctx.font = 'bold 15px "Space Grotesk", sans-serif';
  ctx.fillText('ALL ACCESS', gridX + gridW / 2, currentY + 42);

  ctx.fillStyle = '#A7F3D0';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('VIP BUILDER', gridX + gridW / 2, currentY + 66);

  // Grid Cell 3: PASS SERIAL ID
  ctx.fillStyle = '#FFE600';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('PASS SERIAL', gridX + (gridW * 5) / 6, currentY + 20);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 15px "Space Grotesk", sans-serif';
  ctx.fillText('#HH26-8942', gridX + (gridW * 5) / 6, currentY + 42);

  ctx.fillStyle = '#34D399';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('● VERIFIED', gridX + (gridW * 5) / 6, currentY + 66);

  ctx.restore();

  // 7. Security Barcode & Footer Section
  const cardFooterY = cardY + cardH - 80;
  ctx.save();

  // Divider Line
  ctx.strokeStyle = 'rgba(255, 230, 0, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cardX + 40, cardFooterY);
  ctx.lineTo(cardX + cardW - 40, cardFooterY);
  ctx.stroke();

  // Hashtag Text Left
  ctx.fillStyle = '#FF007A';
  ctx.font = '900 28px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('#FrameInGoa', cardX + 44, cardFooterY + 38);

  // Draw Realistic Security Barcode (Right)
  const barcodeX = cardX + cardW - 240;
  const barcodeY = cardFooterY + 16;
  const barcodeH = 34;

  const barPattern = [3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 4, 2, 1, 3];
  let currentBarX = barcodeX;

  ctx.fillStyle = '#FFE600';
  for (let i = 0; i < barPattern.length; i++) {
    const w = barPattern[i];
    if (i % 2 === 0) {
      ctx.fillRect(currentBarX, barcodeY, w + 1, barcodeH);
    }
    currentBarX += w + 2;
  }

  ctx.fillStyle = '#A7F3D0';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('HH-GOA-2026 // PASS', cardX + cardW - 44, barcodeY + barcodeH + 14);

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

/**
 * Ultra-futuristic corner reticles and HUD markers.
 */
function drawUltraCornerHUD(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = 'rgba(255, 230, 0, 0.5)';
  ctx.shadowBlur = 10;

  const len = 28;

  // Top Left
  ctx.beginPath();
  ctx.moveTo(x, y + len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.stroke();

  // Top Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + len);
  ctx.stroke();

  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(x, y + h - len);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + len, y + h);
  ctx.stroke();

  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - len);
  ctx.stroke();

  // Reticle Plus Signs (+)
  ctx.fillStyle = '#FF007A';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('+', x - 12, y - 8);
  ctx.fillText('+', x + w + 4, y - 8);
  ctx.fillText('+', x - 12, y + h + 18);
  ctx.fillText('+', x + w + 4, y + h + 18);

  ctx.restore();
}
