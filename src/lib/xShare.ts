export const X_SHARE_HASHTAGS = ['FrameInGoa', 'HHGoa2026'];
export const X_SHARE_TEXT = `Just got my HH Goa 2026 builder frame ⚡🌴\n\nSee you in Goa.`;

/**
 * Constructs the Twitter/X Intent URL with prefilled post caption.
 */
export function buildXShareUrl(customText?: string): string {
  const text = customText || X_SHARE_TEXT;
  const hashtags = X_SHARE_HASHTAGS.join(',');
  const encodedText = encodeURIComponent(text);
  
  return `https://x.com/intent/post?text=${encodedText}&hashtags=${hashtags}`;
}

/**
 * Triggers the X sharing action by opening a popup window.
 */
export function shareToX(customText?: string): void {
  const url = buildXShareUrl(customText);
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
}
