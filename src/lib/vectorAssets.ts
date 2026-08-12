/**
 * Pure Canvas 2D Vector Assets for Hacker House Goa 2026
 * Programmatically draws vintage tropical graphics, palm trees, sun bursts, and badges.
 */

/**
 * Draws stylized tropical palm tree silhouettes
 */
export function drawPalmTree(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number = 1,
  flipX: boolean = false,
  color: string = '#045D43'
): void {
  ctx.save();
  ctx.translate(x, y);
  if (flipX) {
    ctx.scale(-scale, scale);
  } else {
    ctx.scale(scale, scale);
  }

  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;

  // Trunk
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-15, -60, -30, -120);
  ctx.quadraticCurveTo(-22, -120, 10, 0);
  ctx.closePath();
  ctx.fill();

  // Trunk ridges
  ctx.beginPath();
  for (let i = 1; i <= 6; i++) {
    const ty = -i * 18;
    const tx = -i * 4;
    ctx.moveTo(tx - 6, ty);
    ctx.lineTo(tx + 6, ty + 4);
  }
  ctx.stroke();

  // Palm Leaves (Fronds)
  const palmCenter = { x: -26, y: -120 };
  const fronds = [
    { angle: -Math.PI * 0.75, length: 70, curve: -30 },
    { angle: -Math.PI * 0.5, length: 85, curve: -20 },
    { angle: -Math.PI * 0.25, length: 75, curve: 15 },
    { angle: 0, length: 65, curve: 35 },
    { angle: -Math.PI * 0.9, length: 60, curve: -40 },
    { angle: Math.PI * 0.15, length: 50, curve: 40 },
  ];

  fronds.forEach(({ angle, length, curve }) => {
    ctx.save();
    ctx.translate(palmCenter.x, palmCenter.y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(length / 2, curve, length, 0);
    ctx.quadraticCurveTo(length / 2, curve + 15, 0, 0);
    ctx.fill();

    // Leaf feathery spikes
    ctx.beginPath();
    for (let p = 10; p < length; p += 8) {
      const progress = p / length;
      const spikeLen = Math.sin(progress * Math.PI) * 14;
      ctx.moveTo(p, curve * progress);
      ctx.lineTo(p - 2, curve * progress + spikeLen);
      ctx.moveTo(p, curve * progress);
      ctx.lineTo(p - 2, curve * progress - spikeLen * 0.5);
    }
    ctx.stroke();

    ctx.restore();
  });

  // Coconuts
  ctx.fillStyle = '#023023';
  ctx.beginPath();
  ctx.arc(palmCenter.x - 4, palmCenter.y + 6, 6, 0, Math.PI * 2);
  ctx.arc(palmCenter.x + 4, palmCenter.y + 8, 5, 0, Math.PI * 2);
  ctx.arc(palmCenter.x, palmCenter.y + 12, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Draws vintage tropical sun burst rays
 */
export function drawSunBurst(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rayCount: number = 16,
  color: string = '#FFD40022'
): void {
  ctx.save();
  ctx.fillStyle = color;
  const angleStep = (Math.PI * 2) / rayCount;

  for (let i = 0; i < rayCount; i++) {
    if (i % 2 === 0) continue;
    const startAngle = i * angleStep;
    const endAngle = (i + 1) * angleStep;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Draws subtle ocean wave line graphics
 */
export function drawWaveLines(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  color: string = '#045D4355'
): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  ctx.beginPath();
  const waveLength = 40;
  const waveHeight = 6;

  for (let i = 0; i < 3; i++) {
    const rowY = y + i * 12;
    ctx.moveTo(x, rowY);
    for (let currentX = x; currentX < x + width; currentX += waveLength) {
      ctx.quadraticCurveTo(
        currentX + waveLength / 4,
        rowY - waveHeight,
        currentX + waveLength / 2,
        rowY
      );
      ctx.quadraticCurveTo(
        currentX + (3 * waveLength) / 4,
        rowY + waveHeight,
        currentX + waveLength,
        rowY
      );
    }
  }
  ctx.stroke();
  ctx.restore();
}

/**
 * Draws stylized builder avatar silhouette for empty state preview (never contains "DROP PHOTO HERE")
 */
export function drawDefaultAvatar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
): void {
  ctx.save();

  // Background gradient inside aperture
  const grad = ctx.createLinearGradient(cx, cy - radius, cx, cy + radius);
  grad.addColorStop(0, '#044D37');
  grad.addColorStop(1, '#012419');
  ctx.fillStyle = grad;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  // Tropical sun motif behind head
  ctx.fillStyle = '#FFD40033';
  ctx.beginPath();
  ctx.arc(cx, cy - 20, radius * 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Head Silhouette with retro sunglasses
  ctx.fillStyle = '#FFF7DF';
  // Head
  ctx.beginPath();
  ctx.arc(cx, cy - 30, 60, 0, Math.PI * 2);
  ctx.fill();

  // Sunglasses
  ctx.fillStyle = '#FF007A';
  ctx.beginPath();
  ctx.roundRect(cx - 50, cy - 42, 42, 22, 6);
  ctx.roundRect(cx + 8, cy - 42, 42, 22, 6);
  ctx.fill();
  ctx.strokeStyle = '#FFD400';
  ctx.lineWidth = 3;
  ctx.stroke();
  // Glasses bridge
  ctx.beginPath();
  ctx.moveTo(cx - 8, cy - 32);
  ctx.lineTo(cx + 8, cy - 32);
  ctx.stroke();

  // Shoulders / Torso
  ctx.fillStyle = '#FFF7DF';
  ctx.beginPath();
  ctx.arc(cx, cy + 140, 110, Math.PI * 1.1, Math.PI * 1.9);
  ctx.fill();

  // Watermark text in vintage typography
  ctx.fillStyle = '#FFD40099';
  ctx.font = '900 13px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HH GOA BUILDER', cx, cy + 90);

  ctx.restore();
}
