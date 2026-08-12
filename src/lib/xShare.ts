export const X_SHARE_HASHTAGS = ['FrameInGoa', 'HHGoa2026'];
export const X_SHARE_TEXT = `Just claimed my HH Goa 2026 builder identity ⚡🌴`;

/**
 * Constructs the official Twitter/X Intent URL with prefilled text caption, hashtags, and website URL for auto preview card.
 */
export function buildXShareUrl(shareUrl?: string, customText?: string): string {
  const text = customText || X_SHARE_TEXT;
  const hashtags = X_SHARE_HASHTAGS.join(',');
  const encodedText = encodeURIComponent(text);
  const currentOrigin = typeof window !== 'undefined' ? window.location.href : 'https://github.com/Dev0ps404/HackerHouse-Goa-2026';
  const targetUrl = encodeURIComponent(shareUrl || currentOrigin);
  
  return `https://x.com/intent/post?text=${encodedText}&hashtags=${hashtags}&url=${targetUrl}`;
}

/**
 * Triggers the X sharing action by opening a popup window.
 */
export function shareToX(shareUrl?: string, customText?: string): void {
  const url = buildXShareUrl(shareUrl, customText);
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=520');
}
