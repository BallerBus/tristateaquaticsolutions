// Brand configuration for multi-brand support (PCD + TriState)
// Each brand has its own GHL sub-account and Stripe account

export interface BrandConfig {
  id: string;
  name: string;
  shortName: string;
  phone: string;
  ghlLocationId: string;
  ghlPitToken: string;
  colors: { primary: string; accent: string };
  smsSignature: string;
}

export const BRANDS: Record<string, BrandConfig> = {
  pcd: {
    id: 'pcd',
    name: 'Pool Cleaning Dude',
    shortName: 'PCD',
    phone: '302-496-6367',
    ghlLocationId: 'GRCLPh6B7KwWCf8PRIUt',
    ghlPitToken: 'pit-7cbfd383-eae2-41cf-a850-9d3bc6125c93',
    colors: { primary: '#1e3a5f', accent: '#14b8a6' },
    smsSignature: '- Pool Cleaning Dude',
  },
  tsas: {
    id: 'tsas',
    name: 'Tri-State Aquatic Solutions',
    shortName: 'TSAS',
    phone: '610-870-3113',
    ghlLocationId: 'A0e67CElQk4EoVK0XY2K',
    ghlPitToken: 'pit-9165f6c0-1acf-4bf8-a8ed-123aca3f94e7',
    colors: { primary: '#1e3a5f', accent: '#d4a017' },
    smsSignature: '- Tri-State Aquatic Solutions',
  },
} as const;

export type BrandId = keyof typeof BRANDS;

export function getBrand(id: string): BrandConfig {
  return BRANDS[id] || BRANDS.pcd;
}

export function getBrandList(): BrandConfig[] {
  return Object.values(BRANDS);
}
