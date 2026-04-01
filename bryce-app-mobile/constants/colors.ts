export const Colors = {
  // Brand
  tsasPrimary: '#059669',   // emerald-600
  tsasLight: '#ecfdf5',     // emerald-50
  tsasDark: '#065f46',      // emerald-800
  pcdPrimary: '#7c3aed',    // violet-600
  pcdLight: '#f5f3ff',      // violet-50
  pcdDark: '#5b21b6',       // violet-800

  // UI
  background: '#f9fafb',    // gray-50
  surface: '#ffffff',
  surfaceBorder: '#e5e7eb', // gray-200
  text: '#111827',          // gray-900
  textSecondary: '#6b7280', // gray-500
  textTertiary: '#9ca3af',  // gray-400
  textLight: '#d1d5db',     // gray-300

  // Actions
  blue: '#2563eb',          // blue-600
  blueLight: '#dbeafe',     // blue-100
  blueDark: '#1d4ed8',      // blue-700
  green: '#16a34a',         // green-600
  greenLight: '#dcfce7',    // green-100
  greenDark: '#15803d',     // green-700
  red: '#dc2626',           // red-600
  redLight: '#fef2f2',      // red-50
  amber: '#d97706',         // amber-600
  amberLight: '#fffbeb',    // amber-50
  orange: '#f97316',        // orange-500
  purple: '#7c3aed',        // violet-600

  // Score colors
  scoreExcellent: '#16a34a',
  scoreGood: '#22c55e',
  scoreFair: '#eab308',
  scoreNeedsWork: '#f97316',
  scoreCritical: '#dc2626',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  hero: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;
