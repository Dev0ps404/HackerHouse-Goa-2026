/**
 * Deterministically generates a unique, stable 4-digit serial hash for a builder based on their input.
 */
export function generateBuilderId(name: string, role: string): string {
  const combined = `${name.toLowerCase().trim()}:${role.toLowerCase().trim()}`;
  if (!name.trim() && !role.trim()) {
    return '#HH-GOA-7757';
  }

  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  const positiveHash = Math.abs(hash) % 9000 + 1000;
  return `#HH-GOA-${positiveHash}`;
}
