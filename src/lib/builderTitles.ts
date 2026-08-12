export interface TitleMapping {
  keywords: string[];
  title: string;
}

const TITLE_RULES: TitleMapping[] = [
  {
    keywords: ['react', 'frontend', 'ui', 'ux', 'css', 'tailwind', 'design', 'web', 'next.js', 'vue', 'svelte', 'figma'],
    title: 'THE UI ARCHITECT',
  },
  {
    keywords: ['ai', 'ml', 'machine learning', 'llm', 'prompt', 'gpt', 'python', 'pytorch', 'tensorflow', 'rag', 'deep learning'],
    title: 'THE AI FORGER',
  },
  {
    keywords: ['node', 'backend', 'api', 'system', 'database', 'postgres', 'sql', 'go', 'golang', 'rust', 'java', 'c++', 'microservices'],
    title: 'THE SYSTEM ARCHITECT',
  },
  {
    keywords: ['fullstack', 'full stack', 'full-stack', 'mre', 'mern', 'next', 'typescript'],
    title: 'THE FULL STACK MAVERICK',
  },
  {
    keywords: ['cloud', 'devops', 'aws', 'docker', 'kubernetes', 'k8s', 'infra', 'infrastructure', 'serverless', 'gcp', 'azure'],
    title: 'THE CLOUD BUILDER',
  },
  {
    keywords: ['data', 'analytics', 'spark', 'pandas', 'pipeline', 'bi', 'sql', 'snowflake'],
    title: 'THE DATA EXPLORER',
  },
  {
    keywords: ['product', 'pm', 'founder', 'ceo', 'cto', 'lead', 'manager', 'strategy'],
    title: 'THE PRODUCT ALCHEMIST',
  },
  {
    keywords: ['web3', 'crypto', 'blockchain', 'solidity', 'smart contract', 'decentralized', 'eth'],
    title: 'THE DECENTRALIZED VANGUARD',
  },
  {
    keywords: ['security', 'cyber', 'pentest', 'hacker', 'auth', 'zero-trust'],
    title: 'THE CYBER SENTINEL',
  },
  {
    keywords: ['mobile', 'flutter', 'react native', 'ios', 'android', 'swift', 'kotlin'],
    title: 'THE MOBILE PIONEER',
  },
];

const FALLBACK_TITLES = [
  'THE CODE NOMAD',
  'THE DIGITAL FORGER',
  'THE PROTOCOL MAKER',
  'THE SYSTEM BUILDER',
  'THE ALGORITHM MAESTRO',
];

/**
 * Deterministically generates a Builder Title based on role/stack text.
 */
export function generateBuilderTitle(roleOrStack: string): string {
  if (!roleOrStack || roleOrStack.trim() === '') {
    return 'THE BUILDER';
  }

  const normalized = roleOrStack.toLowerCase().trim();

  // Check direct keyword matches
  for (const rule of TITLE_RULES) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return rule.title;
    }
  }

  // Hash-based deterministic fallback selection if no keyword matched
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash << 5) - hash + normalized.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % FALLBACK_TITLES.length;
  return FALLBACK_TITLES[index];
}
