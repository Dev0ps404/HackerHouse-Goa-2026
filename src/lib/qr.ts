import QRCode from 'qrcode';

export const QR_TARGET_URL = 'https://github.com/Dev0ps404/HackerHouse-Goa-2026';

/**
 * Generates a Data URL for a scannable QR Code.
 */
export async function generateQRCodeDataUrl(url?: string): Promise<string> {
  const target = url || QR_TARGET_URL;
  try {
    const dataUrl = await QRCode.toDataURL(target, {
      width: 256,
      margin: 1,
      color: {
        dark: '#02402E', // Deep Goa Emerald
        light: '#FFFDF0', // Warm Retro Cream
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch (err) {
    console.warn('Error generating QR code:', err);
    return '';
  }
}
