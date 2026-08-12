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
 * PFP FRAME OVERLAY (1080 x 1080)
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

  // Grid Lines
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

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.roundRect(photoX + 4, photoY + 4, photoSize - 8, photoSize - 8, borderRadius - 4);
  ctx.stroke();

  ctx.restore();

  // 4. Header Badge
  const headerY = 48;
  const badgeW = 540;
  const badgeH = 68;
  const badgeX = (width - badgeW) / 2;

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;

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

  ctx.save();
  ctx.fillStyle = '#FFE600';
  ctx.font = '900 24px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(255, 230, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.fillText('HACKER HOUSE', badgeX + 32, headerY + badgeH / 2);
  ctx.restore();

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

  ctx.save();
  ctx.fillStyle = '#A7F3D0';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('2026 // BUILDER', badgeX + badgeW - 28, headerY + badgeH / 2);
  ctx.restore();

  // 5. Bottom Hashtag Pill
  const footerY = height - 112;
  const pillW = 620;
  const pillH = 74;
  const pillX = (width - pillW) / 2;

  ctx.save();
  ctx.shadowColor = 'rgba(255, 0, 122, 0.5)';
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 8;

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

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(pillX + 3, footerY + 3, pillW - 6, pillH - 6, 34);
  ctx.stroke();

  ctx.fillStyle = '#FFE600';
  ctx.font = '900 34px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 8;
  ctx.fillText('#FrameInGoa', pillX + pillW / 2, footerY + pillH / 2 - 2);

  ctx.restore();

  drawUltraCornerHUD(ctx, photoX - 22, photoY - 22, photoSize + 44, photoSize + 44);
}

/**
 * EXACT RECREATION: RETRO TROPICAL PASSPORT BUILDER ID CARD (1080 x 1350)
 * Replicates the exact official reference design provided by user!
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
  // 1. Dark Emerald Outer Background
  ctx.fillStyle = '#012418';
  ctx.fillRect(0, 0, width, height);

  // 2. Main Card Container (Warm Cream Retro Page)
  const margin = 28;
  const cardW = width - margin * 2;
  const cardH = height - margin * 2;
  const cardX = margin;
  const cardY = margin;

  // Heavy Card Outer Border (Dark Emerald Green & Gold Inner Line)
  ctx.save();
  ctx.fillStyle = '#FFFDF0'; // Warm Retro Cream
  ctx.strokeStyle = '#02402E'; // Dark Emerald
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 36);
  ctx.fill();
  ctx.stroke();

  // Thin Inner Gold Border Line
  ctx.strokeStyle = '#E2B842';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(cardX + 12, cardY + 12, cardW - 24, cardH - 24, 28);
  ctx.stroke();
  ctx.restore();

  // 3. Top Center Lanyard Slot & Hanging Pink Lanyard Badge
  ctx.save();
  // Lanyard Slot Cutout
  ctx.fillStyle = '#012418';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 60, cardY + 8, 120, 20, 10);
  ctx.fill();

  // Hanging Hot Pink Lanyard Tag (#E6005C)
  const tagW = 150;
  const tagH = 140;
  const tagX = (width - tagW) / 2;
  const tagY = cardY + 14;

  ctx.fillStyle = '#E6005C';
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(tagX, tagY, tagW, tagH, 18);
  ctx.fill();
  ctx.stroke();

  // Gold Palm Tree Icon in Tag
  drawVectorPalmTree(ctx, width / 2, tagY + 32, 22, '#FFE600');

  // Text inside Lanyard Tag
  ctx.fillStyle = '#FFE600';
  ctx.font = '900 20px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HH', width / 2, tagY + 70);
  ctx.fillText('GOA', width / 2, tagY + 94);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText('2026', width / 2, tagY + 118);
  ctx.restore();

  // 4. Top Left Postage Stamp (GOA INDIA)
  ctx.save();
  const stampX = cardX + 36;
  const stampY = cardY + 36;
  const stampW = 150;
  const stampH = 130;

  // Stamp Serrated Border
  ctx.fillStyle = '#02402E';
  ctx.fillRect(stampX, stampY, stampW, stampH);
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(stampX + 6, stampY + 6, stampW - 12, stampH - 12);

  // Stamp Contents
  ctx.fillStyle = '#E6005C';
  ctx.font = '900 16px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('GOA', stampX + 16, stampY + 28);
  ctx.fillStyle = '#02402E';
  ctx.font = 'bold 12px "Space Grotesk", sans-serif';
  ctx.fillText('INDIA', stampX + 16, stampY + 44);

  // Stamp Palm & Sun
  ctx.fillStyle = '#FF9900';
  ctx.beginPath();
  ctx.arc(stampX + 110, stampY + 75, 18, 0, Math.PI * 2);
  ctx.fill();
  drawVectorPalmTree(ctx, stampX + 105, stampY + 60, 20, '#02402E');

  // Stamp Wavy Cancel Lines
  ctx.strokeStyle = '#E6005C';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const yOff = stampY + 30 + i * 16;
    ctx.moveTo(stampX + stampW + 10, yOff);
    ctx.bezierCurveTo(stampX + stampW + 30, yOff - 6, stampX + stampW + 50, yOff + 6, stampX + stampW + 70, yOff);
  }
  ctx.stroke();
  ctx.restore();

  // 5. Top Right Circular Postmark Stamp (BUILD IN GOA * SHIP FROM PARADISE)
  ctx.save();
  const circleStampX = cardX + cardW - 120;
  const circleStampY = cardY + 110;
  const circleRadius = 75;

  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(circleStampX, circleStampY, circleRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(circleStampX, circleStampY, circleRadius - 8, 0, Math.PI * 2);
  ctx.stroke();

  // Circular Text
  ctx.fillStyle = '#02402E';
  ctx.font = 'bold 10px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Circular Text Along Arc
  drawCircularText(ctx, 'BUILD IN GOA ✦ SHIP FROM PARADISE', circleStampX, circleStampY, circleRadius - 14, -Math.PI / 2);
  drawVectorPalmTree(ctx, circleStampX, circleStampY - 10, 22, '#02402E');
  ctx.restore();

  // 6. Main Headline Title: HACKER GOA HOUSE
  const titleY = cardY + 215;
  ctx.save();

  // "HACKER" Text (Left)
  ctx.fillStyle = '#02402E';
  ctx.font = '900 58px "Space Grotesk", serif';
  ctx.textAlign = 'right';
  ctx.fillText('HACKER', width / 2 - 85, titleY);

  // "GOA" Pink Badge (Center)
  const goaW = 100;
  const goaH = 46;
  const goaX = width / 2 - goaW / 2;
  const goaY = titleY - 40;

  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.roundRect(goaX, goaY, goaW, goaH, 12);
  ctx.fill();

  ctx.fillStyle = '#FFE600';
  ctx.font = '900 24px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GOA', width / 2, goaY + 31);

  // "HOUSE" Text (Right)
  ctx.fillStyle = '#02402E';
  ctx.font = '900 58px "Space Grotesk", serif';
  ctx.textAlign = 'left';
  ctx.fillText('HOUSE', width / 2 + 85, titleY);
  ctx.restore();

  // 7. Side Vertical Details & Badges
  ctx.save();
  // Left Vertical Date: ✦ 28 - 31 OCT 2026 ✦
  ctx.save();
  ctx.translate(cardX + 44, cardY + 410);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#E6005C';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('✦  28 - 31 OCT 2026  ✦', 0, 0);
  ctx.restore();

  // Left Wooden Signpost (BUILD, SHIP, REPEAT)
  const signX = cardX + 110;
  const signY = cardY + 430;

  // Pole
  ctx.fillStyle = '#795548';
  ctx.fillRect(signX + 45, signY, 14, 180);

  // Sign 1: BUILD (Yellow)
  ctx.fillStyle = '#FFC107';
  ctx.beginPath();
  ctx.roundRect(signX + 10, signY + 20, 90, 36, 6);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = '900 15px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BUILD', signX + 55, signY + 43);

  // Sign 2: SHIP (Pink)
  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.roundRect(signX, signY + 68, 100, 36, 6);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 15px "Space Grotesk", sans-serif';
  ctx.fillText('SHIP', signX + 50, signY + 91);

  // Sign 3: REPEAT (Emerald)
  ctx.fillStyle = '#02402E';
  ctx.beginPath();
  ctx.roundRect(signX + 5, signY + 116, 110, 36, 6);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 14px "Space Grotesk", sans-serif';
  ctx.fillText('REPEAT', signX + 60, signY + 139);

  // Left Surfboards & Palm Leaves (Bottom Left)
  drawSurfboard(ctx, cardX + 65, cardY + 650, 40, 150, '#FFC107');
  drawSurfboard(ctx, cardX + 105, cardY + 650, 40, 150, '#E6005C');

  // Right Badge: LET'S BUILD!
  const rightBadgeX = cardX + cardW - 140;
  const rightBadgeY = cardY + 390;
  ctx.fillStyle = '#FFC107';
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(rightBadgeX - 45, rightBadgeY, 120, 68, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#02402E';
  ctx.font = '900 16px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("LET'S", rightBadgeX + 15, rightBadgeY + 28);
  ctx.fillText('BUILD!', rightBadgeX + 15, rightBadgeY + 50);

  // Right Villa House Illustration & Pink Scooter
  drawGoaVilla(ctx, cardX + cardW - 165, cardY + 500);
  drawPinkScooter(ctx, cardX + cardW - 120, cardY + 630);

  // Right Vertical Location: ✦ GOA, INDIA ✦
  ctx.save();
  ctx.translate(cardX + cardW - 36, cardY + 410);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = '#E6005C';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('✦  GOA, INDIA  ✦', 0, 0);
  ctx.restore();
  ctx.restore();

  // 8. Central Circular Avatar Frame
  const photoCenterX = width / 2;
  const photoCenterY = cardY + 470;
  const photoRadius = 210;

  // Sawtooth Pattern Ring Around Circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius + 18, 0, Math.PI * 2);
  ctx.fillStyle = '#FFC107';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius + 10, 0, Math.PI * 2);
  ctx.fillStyle = '#E6005C';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius + 4, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFDF0';
  ctx.fill();

  // Circular Photo Mask
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius, 0, Math.PI * 2);
  ctx.clip();

  if (image) {
    drawTransformedImage(
      ctx,
      image,
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
    ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DROP PHOTO', photoCenterX, photoCenterY);
  }
  ctx.restore();

  // 9. Name & Role Pill Boxes Below Avatar
  let infoY = photoCenterY + photoRadius + 30;

  // Name Box (Dark Emerald Pill)
  const nameBoxW = 460;
  const nameBoxH = 54;
  const nameBoxX = width / 2 - nameBoxW / 2;

  ctx.save();
  ctx.fillStyle = '#02402E';
  ctx.strokeStyle = '#FFC107';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(nameBoxX, infoY, nameBoxW, nameBoxH, 18);
  ctx.fill();
  ctx.stroke();

  const displayName = name.trim() ? name.toUpperCase() : 'YOUR NAME';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 26px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayName, width / 2, infoY + nameBoxH / 2);
  ctx.restore();

  // Role Box (Solar Yellow Pill)
  infoY += nameBoxH + 14;
  const roleBoxW = 410;
  const roleBoxH = 46;
  const roleBoxX = width / 2 - roleBoxW / 2;

  ctx.save();
  ctx.fillStyle = '#FFC107';
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(roleBoxX, infoY, roleBoxW, roleBoxH, 16);
  ctx.fill();
  ctx.stroke();

  const displayRole = role.trim() ? role.toUpperCase() : 'FULL STACK DEVELOPER';
  ctx.fillStyle = '#E6005C';
  ctx.font = '900 16px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`⚡  ${displayRole}  ⚡`, width / 2, infoY + roleBoxH / 2);
  ctx.restore();

  // 10. Bottom 3-Column Section (Divided by Dotted Lines)
  const gridY = infoY + roleBoxH + 34;
  const gridW = cardW - 70;
  const gridH = 300;
  const gridX = cardX + 35;

  ctx.save();
  // Dotted Column Lines
  ctx.strokeStyle = '#E6005C';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);

  const col1X = gridX + gridW / 3;
  const col2X = gridX + (gridW * 2) / 3;

  ctx.beginPath();
  ctx.moveTo(col1X, gridY);
  ctx.lineTo(col1X, gridY + gridH - 40);
  ctx.moveTo(col2X, gridY);
  ctx.lineTo(col2X, gridY + gridH - 40);
  ctx.stroke();
  ctx.setLineDash([]);

  // --- COLUMN 1: BUILDER CLASS ---
  const col1CenterX = gridX + gridW / 6;
  ctx.fillStyle = '#02402E';
  ctx.font = '900 13px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦  BUILDER CLASS  ✦', col1CenterX, gridY + 20);

  const displayTitle = builderTitle || 'TERMINAL WIZARD';
  ctx.fillStyle = '#E6005C';
  ctx.font = '900 18px "Space Grotesk", sans-serif';
  ctx.fillText(displayTitle.toUpperCase(), col1CenterX, gridY + 48);

  // Draw Decorative QR Code
  drawVectorQRCode(ctx, col1CenterX - 60, gridY + 70, 120);

  // --- COLUMN 2: BEACH BAG ---
  const col2CenterX = gridX + gridW / 2;
  ctx.fillStyle = '#02402E';
  ctx.font = '900 13px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦  BEACH BAG  ✦', col2CenterX, gridY + 20);

  // Beach Bag List
  const listItems = [
    { icon: '🥥', text: 'COCONUT' },
    { icon: '💻', text: 'VS CODE' },
    { icon: '🎧', text: 'LO-FI BEATS' },
  ];

  ctx.font = '900 13px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  listItems.forEach((item, idx) => {
    const itemY = gridY + 58 + idx * 36;
    ctx.fillText(item.icon, col2CenterX - 45, itemY);
    ctx.fillStyle = '#02402E';
    ctx.fillText(item.text, col2CenterX - 15, itemY);
  });

  // Sunset Ocean Wave Illustration at bottom of Col 2
  drawOceanSunset(ctx, col2CenterX, gridY + 215, 110, 45);

  // --- COLUMN 3: CURRENTLY SHIPPING ---
  const col3CenterX = gridX + (gridW * 5) / 6;
  ctx.fillStyle = '#02402E';
  ctx.font = '900 13px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦  CURRENTLY SHIPPING  ✦', col3CenterX, gridY + 20);

  ctx.fillStyle = '#E6005C';
  ctx.font = '900 16px "Space Grotesk", sans-serif';
  ctx.fillText('BUILDING THE FUTURE', col3CenterX, gridY + 46);

  // Wavy lines
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 2; i++) {
    const wy = gridY + 70 + i * 8;
    ctx.moveTo(col3CenterX - 70, wy);
    ctx.bezierCurveTo(col3CenterX - 35, wy - 4, col3CenterX + 35, wy + 4, col3CenterX + 70, wy);
  }
  ctx.stroke();

  ctx.fillStyle = '#02402E';
  ctx.font = '900 12px "Space Grotesk", sans-serif';
  ctx.fillText('BUILDER ID', col3CenterX, gridY + 112);

  ctx.fillStyle = '#02402E';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('#HH-GOA-7757', col3CenterX, gridY + 130);

  // Vector Barcode
  drawVectorBarcode(ctx, col3CenterX - 75, gridY + 148, 150, 42);

  ctx.restore();

  // 11. Bottom Pink Ribbon Banner (#FRAMEINGOA)
  const ribbonY = cardY + cardH - 65;
  const ribbonW = cardW - 180;
  const ribbonH = 50;
  const ribbonX = width / 2 - ribbonW / 2;

  ctx.save();
  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.roundRect(ribbonX, ribbonY, ribbonW, ribbonH, 12);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 24px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦   #FRAMEINGOA   ✦', width / 2, ribbonY + ribbonH / 2);
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
 * Helper to draw vector palm tree.
 */
function drawVectorPalmTree(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;

  // Trunk
  ctx.beginPath();
  ctx.moveTo(x, y + size);
  ctx.quadraticCurveTo(x + 4, y + size / 2, x + 2, y);
  ctx.stroke();

  // Leaves
  const leaves = [
    { dx: -size, dy: -size * 0.5 },
    { dx: size, dy: -size * 0.5 },
    { dx: -size * 0.8, dy: size * 0.2 },
    { dx: size * 0.8, dy: size * 0.2 },
    { dx: 0, dy: -size * 0.8 },
  ];

  leaves.forEach((l) => {
    ctx.beginPath();
    ctx.moveTo(x + 2, y);
    ctx.quadraticCurveTo(x + l.dx / 2, y + l.dy / 2 - 4, x + l.dx, y + l.dy);
    ctx.stroke();
  });

  ctx.restore();
}

/**
 * Helper to draw circular text along an arc.
 */
function drawCircularText(ctx: CanvasRenderingContext2D, text: string, cx: number, cy: number, radius: number, startAngle: number) {
  ctx.save();
  const anglePerChar = (Math.PI * 1.6) / text.length;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const angle = startAngle + i * anglePerChar;

    ctx.save();
    ctx.translate(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }
  ctx.restore();
}

/**
 * Helper to draw retro surfboards.
 */
function drawSurfboard(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Stripe
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y);
  ctx.lineTo(x + w / 2, y + h);
  ctx.stroke();
  ctx.restore();
}

/**
 * Helper to draw retro Goa Portuguese villa house.
 */
function drawGoaVilla(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  // Roof (Pink)
  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.moveTo(x + 40, y);
  ctx.lineTo(x, y + 40);
  ctx.lineTo(x + 80, y + 40);
  ctx.closePath();
  ctx.fill();

  // Body (Yellow)
  ctx.fillStyle = '#FFC107';
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2;
  ctx.fillRect(x + 10, y + 40, 60, 60);
  ctx.strokeRect(x + 10, y + 40, 60, 60);

  // Door
  ctx.fillStyle = '#02402E';
  ctx.fillRect(x + 32, y + 70, 16, 30);
  ctx.restore();
}

/**
 * Helper to draw retro pink scooter.
 */
function drawPinkScooter(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.fillStyle = '#E6005C';
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2;

  // Wheels
  ctx.fillStyle = '#333333';
  ctx.beginPath();
  ctx.arc(x + 12, y + 30, 10, 0, Math.PI * 2);
  ctx.arc(x + 52, y + 30, 10, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.roundRect(x, y + 10, 60, 16, 6);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

/**
 * Helper to draw vector QR code.
 */
function drawVectorQRCode(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.fillStyle = '#02402E';
  ctx.fillRect(x, y, size, size);

  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(x + 6, y + 6, size - 12, size - 12);

  ctx.fillStyle = '#02402E';
  const cellSize = (size - 16) / 7;

  // Corners
  ctx.fillRect(x + 8, y + 8, cellSize * 2.2, cellSize * 2.2);
  ctx.fillRect(x + size - 8 - cellSize * 2.2, y + 8, cellSize * 2.2, cellSize * 2.2);
  ctx.fillRect(x + 8, y + size - 8 - cellSize * 2.2, cellSize * 2.2, cellSize * 2.2);

  // Center palm icon
  drawVectorPalmTree(ctx, x + size / 2 - 2, y + size / 2 - 12, 14, '#E6005C');
  ctx.restore();
}

/**
 * Helper to draw ocean sunset illustration.
 */
function drawOceanSunset(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number, h: number) {
  ctx.save();
  // Sun
  ctx.fillStyle = '#FF9900';
  ctx.beginPath();
  ctx.arc(cx, cy - 6, 20, Math.PI, 0);
  ctx.fill();

  // Waves
  ctx.fillStyle = '#02402E';
  ctx.beginPath();
  ctx.roundRect(cx - w / 2, cy - 2, w, h, 8);
  ctx.fill();
  ctx.restore();
}

/**
 * Helper to draw vector barcode.
 */
function drawVectorBarcode(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  const barPattern = [3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4];
  let curX = x;

  ctx.fillStyle = '#02402E';
  for (let i = 0; i < barPattern.length; i++) {
    const bw = barPattern[i];
    if (i % 2 === 0) {
      ctx.fillRect(curX, y, bw + 1.2, h);
    }
    curX += bw + 3;
  }
  ctx.restore();
}

/**
 * Ultra-futuristic corner reticles.
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

  ctx.fillStyle = '#FF007A';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('+', x - 12, y - 8);
  ctx.fillText('+', x + w + 4, y - 8);
  ctx.fillText('+', x - 12, y + h + 18);
  ctx.fillText('+', x + w + 4, y + h + 18);

  ctx.restore();
}
