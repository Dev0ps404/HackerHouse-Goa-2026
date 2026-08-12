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
    renderPFPFormat(ctx, width, height, image, zoom, positionX, positionY, name, role);
  } else {
    renderBuilderFormat(ctx, width, height, image, zoom, positionX, positionY, name, role, builderTitle);
  }
}

/**
 * EXACT RECREATION: RETRO TROPICAL PASSPORT PFP FRAME (1080 x 1080)
 * Replicates the exact official reference design provided by user!
 */
function renderPFPFormat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  image: HTMLImageElement | null,
  zoom: number,
  posX: number,
  posY: number,
  name: string,
  role: string
) {
  // 1. Dark Emerald Outer Margin Background
  ctx.fillStyle = '#012418';
  ctx.fillRect(0, 0, width, height);

  // 2. Main Card Container (Warm Cream Retro Page)
  const margin = 24;
  const cardW = width - margin * 2;
  const cardH = height - margin * 2;
  const cardX = margin;
  const cardY = margin;

  // Outer Dark Emerald Border & Gold Inner Line
  ctx.save();
  ctx.fillStyle = '#FFFDF0'; // Warm Retro Cream
  ctx.strokeStyle = '#02402E'; // Dark Emerald
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 32);
  ctx.fill();
  ctx.stroke();

  // Thin Inner Gold Border Line
  ctx.strokeStyle = '#E2B842';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(cardX + 12, cardY + 12, cardW - 24, cardH - 24, 24);
  ctx.stroke();
  ctx.restore();

  // 3. Top Center Lanyard Slot & Hanging Pink Lanyard Tag
  ctx.save();
  ctx.fillStyle = '#012418';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 50, cardY + 6, 100, 16, 8);
  ctx.fill();

  const tagW = 130;
  const tagH = 115;
  const tagX = (width - tagW) / 2;
  const tagY = cardY + 12;

  ctx.fillStyle = '#E6005C';
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(tagX, tagY, tagW, tagH, 14);
  ctx.fill();
  ctx.stroke();

  drawVectorPalmTree(ctx, width / 2, tagY + 24, 18, '#FFE600');

  ctx.fillStyle = '#FFE600';
  ctx.font = '900 17px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HH', width / 2, tagY + 58);
  ctx.fillText('GOA', width / 2, tagY + 78);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('2026', width / 2, tagY + 98);
  ctx.restore();

  // 4. Top Left Postage Stamp (GOA INDIA)
  ctx.save();
  const stampX = cardX + 30;
  const stampY = cardY + 30;
  const stampW = 130;
  const stampH = 110;

  ctx.fillStyle = '#02402E';
  ctx.fillRect(stampX, stampY, stampW, stampH);
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(stampX + 5, stampY + 5, stampW - 10, stampH - 10);

  ctx.fillStyle = '#E6005C';
  ctx.font = '900 14px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('GOA', stampX + 14, stampY + 24);
  ctx.fillStyle = '#02402E';
  ctx.font = 'bold 11px "Space Grotesk", sans-serif';
  ctx.fillText('INDIA', stampX + 14, stampY + 38);

  ctx.fillStyle = '#FF9900';
  ctx.beginPath();
  ctx.arc(stampX + 92, stampY + 65, 15, 0, Math.PI * 2);
  ctx.fill();
  drawVectorPalmTree(ctx, stampX + 88, stampY + 52, 16, '#02402E');

  ctx.strokeStyle = '#E6005C';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const yOff = stampY + 25 + i * 14;
    ctx.moveTo(stampX + stampW + 8, yOff);
    ctx.bezierCurveTo(stampX + stampW + 24, yOff - 5, stampX + stampW + 40, yOff + 5, stampX + stampW + 56, yOff);
  }
  ctx.stroke();
  ctx.restore();

  // 5. Top Right Circular Postmark Stamp
  ctx.save();
  const circleStampX = cardX + cardW - 95;
  const circleStampY = cardY + 90;
  const circleRadius = 60;

  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(circleStampX, circleStampY, circleRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(circleStampX, circleStampY, circleRadius - 6, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#02402E';
  ctx.font = 'bold 9px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  drawCircularText(ctx, 'BUILD IN GOA ✦ SHIP FROM PARADISE', circleStampX, circleStampY, circleRadius - 12, -Math.PI / 2);
  drawVectorPalmTree(ctx, circleStampX, circleStampY - 8, 18, '#02402E');
  ctx.restore();

  // 6. Main Headline Title: HACKER GOA HOUSE
  const titleY = cardY + 178;
  ctx.save();

  ctx.fillStyle = '#02402E';
  ctx.font = '900 48px "Space Grotesk", serif';
  ctx.textAlign = 'right';
  ctx.fillText('HACKER', width / 2 - 70, titleY);

  const goaW = 85;
  const goaH = 38;
  const goaX = width / 2 - goaW / 2;
  const goaY = titleY - 34;

  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.roundRect(goaX, goaY, goaW, goaH, 10);
  ctx.fill();

  ctx.fillStyle = '#FFE600';
  ctx.font = '900 20px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GOA', width / 2, goaY + 26);

  ctx.fillStyle = '#02402E';
  ctx.font = '900 48px "Space Grotesk", serif';
  ctx.textAlign = 'left';
  ctx.fillText('HOUSE', width / 2 + 70, titleY);
  ctx.restore();

  // 7. Side Tropical Elements
  ctx.save();
  // Left Wooden Signpost (BUILD, SHIP, REPEAT)
  const signX = cardX + 65;
  const signY = cardY + 320;

  ctx.fillStyle = '#795548';
  ctx.fillRect(signX + 35, signY, 12, 150);

  ctx.fillStyle = '#FFC107';
  ctx.beginPath();
  ctx.roundRect(signX + 5, signY + 15, 75, 30, 5);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = '900 13px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BUILD', signX + 42, signY + 35);

  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.roundRect(signX - 5, signY + 55, 85, 30, 5);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 13px "Space Grotesk", sans-serif';
  ctx.fillText('SHIP', signX + 37, signY + 75);

  ctx.fillStyle = '#02402E';
  ctx.beginPath();
  ctx.roundRect(signX, signY + 95, 95, 30, 5);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 12px "Space Grotesk", sans-serif';
  ctx.fillText('REPEAT', signX + 47, signY + 115);

  // Surfboards Left
  drawSurfboard(ctx, cardX + 40, cardY + 520, 32, 120, '#FFC107');
  drawSurfboard(ctx, cardX + 75, cardY + 520, 32, 120, '#E6005C');

  // Right Badge: LET'S BUILD!
  const rightBadgeX = cardX + cardW - 100;
  const rightBadgeY = cardY + 320;
  ctx.fillStyle = '#FFC107';
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(rightBadgeX - 35, rightBadgeY, 95, 56, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#02402E';
  ctx.font = '900 13px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("LET'S", rightBadgeX + 12, rightBadgeY + 23);
  ctx.fillText('BUILD!', rightBadgeX + 12, rightBadgeY + 41);

  // Villa & Scooter Right
  drawGoaVilla(ctx, cardX + cardW - 130, cardY + 410);
  drawPinkScooter(ctx, cardX + cardW - 95, cardY + 520);
  ctx.restore();

  // 8. Central Circular Avatar Frame
  const photoCenterX = width / 2;
  const photoCenterY = cardY + 430;
  const photoRadius = 220;

  // Woven Sawtooth Pattern Ring
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

  // Circular Photo Clip
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
  const nameBoxW = 480;
  const nameBoxH = 56;
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
  ctx.font = '900 28px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayName, width / 2, infoY + nameBoxH / 2);
  ctx.restore();

  // Role Box (Solar Yellow Pill)
  infoY += nameBoxH + 14;
  const roleBoxW = 420;
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

  // 10. Bottom Pink Ribbon Banner (#FRAMEINGOA)
  const ribbonY = cardY + cardH - 70;
  const ribbonW = cardW - 140;
  const ribbonH = 54;
  const ribbonX = width / 2 - ribbonW / 2;

  ctx.save();
  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.roundRect(ribbonX, ribbonY, ribbonW, ribbonH, 14);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 26px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦   #FRAMEINGOA   ✦', width / 2, ribbonY + ribbonH / 2);
  ctx.restore();
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
  ctx.fillStyle = '#012418';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 60, cardY + 8, 120, 20, 10);
  ctx.fill();

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

  drawVectorPalmTree(ctx, width / 2, tagY + 32, 22, '#FFE600');

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

  ctx.fillStyle = '#02402E';
  ctx.fillRect(stampX, stampY, stampW, stampH);
  ctx.fillStyle = '#FFFDF0';
  ctx.fillRect(stampX + 6, stampY + 6, stampW - 12, stampH - 12);

  ctx.fillStyle = '#E6005C';
  ctx.font = '900 16px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('GOA', stampX + 16, stampY + 28);
  ctx.fillStyle = '#02402E';
  ctx.font = 'bold 12px "Space Grotesk", sans-serif';
  ctx.fillText('INDIA', stampX + 16, stampY + 44);

  ctx.fillStyle = '#FF9900';
  ctx.beginPath();
  ctx.arc(stampX + 110, stampY + 75, 18, 0, Math.PI * 2);
  ctx.fill();
  drawVectorPalmTree(ctx, stampX + 105, stampY + 60, 20, '#02402E');

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

  // 5. Top Right Circular Postmark Stamp
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

  ctx.fillStyle = '#02402E';
  ctx.font = 'bold 10px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  drawCircularText(ctx, 'BUILD IN GOA ✦ SHIP FROM PARADISE', circleStampX, circleStampY, circleRadius - 14, -Math.PI / 2);
  drawVectorPalmTree(ctx, circleStampX, circleStampY - 10, 22, '#02402E');
  ctx.restore();

  // 6. Main Headline Title: HACKER GOA HOUSE
  const titleY = cardY + 215;
  ctx.save();

  ctx.fillStyle = '#02402E';
  ctx.font = '900 58px "Space Grotesk", serif';
  ctx.textAlign = 'right';
  ctx.fillText('HACKER', width / 2 - 85, titleY);

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

  ctx.fillStyle = '#02402E';
  ctx.font = '900 58px "Space Grotesk", serif';
  ctx.textAlign = 'left';
  ctx.fillText('HOUSE', width / 2 + 85, titleY);
  ctx.restore();

  // 7. Side Vertical Details & Badges
  ctx.save();
  ctx.save();
  ctx.translate(cardX + 44, cardY + 410);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#E6005C';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('✦  28 - 31 OCT 2026  ✦', 0, 0);
  ctx.restore();

  const signX = cardX + 110;
  const signY = cardY + 430;

  ctx.fillStyle = '#795548';
  ctx.fillRect(signX + 45, signY, 14, 180);

  ctx.fillStyle = '#FFC107';
  ctx.beginPath();
  ctx.roundRect(signX + 10, signY + 20, 90, 36, 6);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = '900 15px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BUILD', signX + 55, signY + 43);

  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.roundRect(signX, signY + 68, 100, 36, 6);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 15px "Space Grotesk", sans-serif';
  ctx.fillText('SHIP', signX + 50, signY + 91);

  ctx.fillStyle = '#02402E';
  ctx.beginPath();
  ctx.roundRect(signX + 5, signY + 116, 110, 36, 6);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 14px "Space Grotesk", sans-serif';
  ctx.fillText('REPEAT', signX + 60, signY + 139);

  drawSurfboard(ctx, cardX + 65, cardY + 650, 40, 150, '#FFC107');
  drawSurfboard(ctx, cardX + 105, cardY + 650, 40, 150, '#E6005C');

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

  drawGoaVilla(ctx, cardX + cardW - 165, cardY + 500);
  drawPinkScooter(ctx, cardX + cardW - 120, cardY + 630);

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

  drawVectorQRCode(ctx, col1CenterX - 60, gridY + 70, 120);

  // --- COLUMN 2: BEACH BAG ---
  const col2CenterX = gridX + gridW / 2;
  ctx.fillStyle = '#02402E';
  ctx.font = '900 13px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦  BEACH BAG  ✦', col2CenterX, gridY + 20);

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

  ctx.beginPath();
  ctx.moveTo(x, y + size);
  ctx.quadraticCurveTo(x + 4, y + size / 2, x + 2, y);
  ctx.stroke();

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
  ctx.fillStyle = '#E6005C';
  ctx.beginPath();
  ctx.moveTo(x + 40, y);
  ctx.lineTo(x, y + 40);
  ctx.lineTo(x + 80, y + 40);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#FFC107';
  ctx.strokeStyle = '#02402E';
  ctx.lineWidth = 2;
  ctx.fillRect(x + 10, y + 40, 60, 60);
  ctx.strokeRect(x + 10, y + 40, 60, 60);

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

  ctx.fillStyle = '#333333';
  ctx.beginPath();
  ctx.arc(x + 12, y + 30, 10, 0, Math.PI * 2);
  ctx.arc(x + 52, y + 30, 10, 0, Math.PI * 2);
  ctx.fill();

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

  ctx.fillRect(x + 8, y + 8, cellSize * 2.2, cellSize * 2.2);
  ctx.fillRect(x + size - 8 - cellSize * 2.2, y + 8, cellSize * 2.2, cellSize * 2.2);
  ctx.fillRect(x + 8, y + size - 8 - cellSize * 2.2, cellSize * 2.2, cellSize * 2.2);

  drawVectorPalmTree(ctx, x + size / 2 - 2, y + size / 2 - 12, 14, '#E6005C');
  ctx.restore();
}

/**
 * Helper to draw ocean sunset illustration.
 */
function drawOceanSunset(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number, h: number) {
  ctx.save();
  ctx.fillStyle = '#FF9900';
  ctx.beginPath();
  ctx.arc(cx, cy - 6, 20, Math.PI, 0);
  ctx.fill();

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
