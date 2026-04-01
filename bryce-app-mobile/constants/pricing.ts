// Service pricing reference -- single source of truth is pricing/service-pricing.md
// These are used for payment link presets in the field

export interface PresetItem {
  value: number;
  label: string;
  note?: string;
}

export const PaymentPresets: Record<string, PresetItem[]> = {
  'opening-deposit': [
    { value: 800, label: '$800 quote', note: 'customer pays $400' },
    { value: 1000, label: '$1,000 quote', note: 'customer pays $500' },
    { value: 1200, label: '$1,200 quote', note: 'customer pays $600' },
    { value: 1500, label: '$1,500 quote', note: 'customer pays $750' },
  ],
  'maintenance-upfront': [
    { value: 600, label: '$150/wk first month' },
    { value: 700, label: '$175/wk first month' },
    { value: 820, label: '$205/wk first month' },
  ],
  'season-pass': [
    { value: 2900, label: '$2,900 pay-in-full', note: 'save $300' },
    { value: 3200, label: '$3,200 standard' },
    { value: 3300, label: '$3,300 pay-in-full', note: 'save $300' },
    { value: 3600, label: '$3,600 plus' },
  ],
  'custom': [],
};

export type PaymentMode = 'opening-deposit' | 'maintenance-upfront' | 'season-pass' | 'custom';

export const PaymentModeLabels: Record<PaymentMode, string> = {
  'opening-deposit': 'Opening (50%)',
  'maintenance-upfront': 'Maintenance',
  'season-pass': 'Season Pass',
  'custom': 'Custom',
};
