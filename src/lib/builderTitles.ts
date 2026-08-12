export interface SmartBuilderProfile {
  title: string;
  beachBag: Array<{ icon: string; text: string }>;
  shippingStatus: string;
}

const TITLE_MAPPINGS: Record<string, string[]> = {
  react: ['PIXEL ALCHEMIST', 'UI ARCHITECT', 'FRONTEND MAESTRO'],
  frontend: ['PIXEL ALCHEMIST', 'UI ARCHITECT', 'DOM WHISPERER'],
  node: ['API RANGER', 'SYSTEM ARCHITECT', 'BACKEND NINJA'],
  backend: ['SYSTEM ARCHITECT', 'BACKEND NINJA', 'API WIZARD'],
  ai: ['AI FORGER', 'MODEL TAMER', 'NEURAL WIZARD'],
  ml: ['AI FORGER', 'MODEL TAMER', 'TENSOR MASTER'],
  devops: ['CLOUD RANGER', 'DEPLOYMENT WIZARD', 'INFRA ARCHITECT'],
  cloud: ['CLOUD RANGER', 'INFRA ARCHITECT', 'K8S VETERAN'],
  java: ['JVM WARRIOR', 'BACKEND BUILDER', 'ENTERPRISE HERO'],
  python: ['PYTHON NOMAD', 'DATA ALCHEMIST', 'DATA EXPLORER'],
  fullstack: ['FULL STACK MAVERICK', 'TERMINAL WIZARD', 'CODE NOMAD'],
  design: ['PIXEL PERFECT', 'UX VISIONARY', 'CREATIVE ARCHITECT'],
};

const BEACH_BAG_ITEMS: Record<string, Array<{ icon: string; text: string }>> = {
  ai: [
    { icon: '🥥', text: 'COCONUT' },
    { icon: '🧠', text: 'NEURAL NETS' },
    { icon: '🎧', text: 'LO-FI BEATS' },
  ],
  devops: [
    { icon: '🥥', text: 'COCONUT' },
    { icon: '☸️', text: 'KUBERNETES' },
    { icon: '🎧', text: 'LO-FI BEATS' },
  ],
  design: [
    { icon: '🥥', text: 'COCONUT' },
    { icon: '🎨', text: 'FIGMA TOKENS' },
    { icon: '🎧', text: 'LO-FI BEATS' },
  ],
  default: [
    { icon: '🥥', text: 'COCONUT' },
    { icon: '💻', text: 'VS CODE' },
    { icon: '🎧', text: 'LO-FI BEATS' },
  ],
};

const SHIPPING_STATUSES: Record<string, string> = {
  ai: 'TRAINING MODELS',
  devops: 'AUTO SCALING',
  design: 'SHAPING EXPERIENCES',
  default: 'BUILDING THE FUTURE',
};

/**
 * Deterministically generates a fun Builder Class title based on stack/role.
 */
export function generateBuilderTitle(role: string): string {
  const normalized = role.toLowerCase().trim();

  for (const [key, titles] of Object.entries(TITLE_MAPPINGS)) {
    if (normalized.includes(key)) {
      const hash = normalized.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return titles[hash % titles.length];
    }
  }

  return 'TERMINAL WIZARD';
}

/**
 * Returns complete smart content profile (title, beach bag items, shipping status) for a builder.
 */
export function getSmartBuilderProfile(role: string): SmartBuilderProfile {
  const normalized = role.toLowerCase().trim();
  const title = generateBuilderTitle(role);

  let bagCategory = 'default';
  let shippingStatus = SHIPPING_STATUSES.default;

  if (normalized.includes('ai') || normalized.includes('ml')) {
    bagCategory = 'ai';
    shippingStatus = SHIPPING_STATUSES.ai;
  } else if (normalized.includes('devops') || normalized.includes('cloud') || normalized.includes('infra')) {
    bagCategory = 'devops';
    shippingStatus = SHIPPING_STATUSES.devops;
  } else if (normalized.includes('design') || normalized.includes('ui') || normalized.includes('ux')) {
    bagCategory = 'design';
    shippingStatus = SHIPPING_STATUSES.design;
  }

  return {
    title,
    beachBag: BEACH_BAG_ITEMS[bagCategory] || BEACH_BAG_ITEMS.default,
    shippingStatus,
  };
}
