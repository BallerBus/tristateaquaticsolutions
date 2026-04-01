// Direct port from bryce-app/lib/inspections.ts
// Pure TypeScript -- no web or server dependencies

export type ConditionRating = 'excellent' | 'good' | 'fair' | 'poor' | 'failed' | 'na';

export interface InspectionItem {
  id: string;
  label: string;
  maxPoints: number;
  description?: string;
}

export interface InspectionCategory {
  id: string;
  label: string;
  maxPoints: number;
  items: InspectionItem[];
}

export const INSPECTION_CATEGORIES: InspectionCategory[] = [
  {
    id: 'water_chemistry',
    label: 'Water Chemistry',
    maxPoints: 30,
    items: [
      { id: 'ph', label: 'pH', maxPoints: 5, description: 'Ideal: 7.4-7.6' },
      { id: 'free_chlorine', label: 'Free Chlorine', maxPoints: 5, description: 'Ideal: 1.0-3.0 ppm' },
      { id: 'combined_chlorine', label: 'Combined Chlorine', maxPoints: 3, description: 'Ideal: 0.0 ppm' },
      { id: 'alkalinity', label: 'Total Alkalinity', maxPoints: 5, description: 'Ideal: 80-120 ppm' },
      { id: 'calcium', label: 'Calcium Hardness', maxPoints: 4, description: 'Ideal: 200-400 ppm' },
      { id: 'cya', label: 'CYA / Stabilizer', maxPoints: 4, description: 'Ideal: 30-50 ppm' },
      { id: 'clarity', label: 'Water Clarity', maxPoints: 4, description: 'Crystal clear = full points' },
    ],
  },
  {
    id: 'equipment',
    label: 'Equipment Health',
    maxPoints: 25,
    items: [
      { id: 'pump', label: 'Pump', maxPoints: 5, description: 'Noise, leaks, age' },
      { id: 'filter', label: 'Filter', maxPoints: 5, description: 'PSI, condition, media' },
      { id: 'heater', label: 'Heater', maxPoints: 4, description: 'Ignition, temp, rust' },
      { id: 'salt_cell', label: 'Salt Cell', maxPoints: 3, description: 'Scaling, hours, output' },
      { id: 'automation', label: 'Automation / Timer', maxPoints: 3, description: 'Programs, controls' },
      { id: 'lights', label: 'Lights', maxPoints: 3, description: 'Working, brightness, wiring' },
      { id: 'skimmers', label: 'Skimmers / Returns', maxPoints: 2, description: 'Flow, baskets, covers' },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Compliance',
    maxPoints: 20,
    items: [
      { id: 'fence', label: 'Fence / Barrier', maxPoints: 5, description: '48"+ height, no gaps >4"' },
      { id: 'gate', label: 'Gate', maxPoints: 4, description: 'Self-closing, self-latching' },
      { id: 'drain_covers', label: 'Drain Covers', maxPoints: 4, description: 'VGB-compliant, intact' },
      { id: 'gfci', label: 'GFCI Protection', maxPoints: 3, description: 'All equipment protected' },
      { id: 'deck_safety', label: 'Deck Condition', maxPoints: 2, description: 'Level, no trip hazards' },
      { id: 'bonding', label: 'Electrical Bonding', maxPoints: 2, description: 'Grid intact, all bonded' },
    ],
  },
  {
    id: 'surface',
    label: 'Surface & Structure',
    maxPoints: 15,
    items: [
      { id: 'interior', label: 'Interior Surface', maxPoints: 5, description: 'Plaster, smooth, staining' },
      { id: 'tile', label: 'Tile Line', maxPoints: 3, description: 'Intact, grout, calcium' },
      { id: 'coping', label: 'Coping', maxPoints: 3, description: 'Stable, chips, mastic' },
      { id: 'deck_structure', label: 'Deck / Patio', maxPoints: 4, description: 'Cracks, drainage, level' },
    ],
  },
  {
    id: 'appearance',
    label: 'Appearance & Cleanliness',
    maxPoints: 10,
    items: [
      { id: 'water_clarity_app', label: 'Water Clarity', maxPoints: 3, description: 'Clear, hazy, cloudy, green' },
      { id: 'debris', label: 'Debris', maxPoints: 3, description: 'Surface and bottom' },
      { id: 'waterline', label: 'Waterline', maxPoints: 2, description: 'Scum line, buildup' },
      { id: 'surrounding', label: 'Surrounding Area', maxPoints: 2, description: 'Deck, vegetation, drainage' },
    ],
  },
];

export function getDeduction(rating: ConditionRating): number {
  switch (rating) {
    case 'excellent': return 0;
    case 'good': return 1;
    case 'fair': return 2;
    case 'poor': return 3;
    case 'failed': return -1;
    case 'na': return -2;
    default: return 0;
  }
}

export function getItemScore(maxPoints: number, rating: ConditionRating): number {
  const d = getDeduction(rating);
  if (d === -1) return 0;
  if (d === -2) return maxPoints;
  return Math.max(0, maxPoints - d);
}

export function getRatingLabel(rating: ConditionRating): string {
  switch (rating) {
    case 'excellent': return 'Excellent';
    case 'good': return 'Good';
    case 'fair': return 'Fair';
    case 'poor': return 'Poor';
    case 'failed': return 'Failed';
    case 'na': return 'N/A';
    default: return '';
  }
}

export function getRatingColor(rating: ConditionRating): string {
  switch (rating) {
    case 'excellent': return '#16a34a';
    case 'good': return '#65a30d';
    case 'fair': return '#eab308';
    case 'poor': return '#f97316';
    case 'failed': return '#dc2626';
    case 'na': return '#9ca3af';
    default: return '#9ca3af';
  }
}

export function getScoreRating(score: number): { label: string; color: string; bgColor: string; textColor: string } {
  if (score >= 90) return { label: 'Excellent', color: '#16a34a', bgColor: '#f0fdf4', textColor: '#166534' };
  if (score >= 80) return { label: 'Good', color: '#22c55e', bgColor: '#f0fdf4', textColor: '#166534' };
  if (score >= 70) return { label: 'Fair', color: '#eab308', bgColor: '#fefce8', textColor: '#854d0e' };
  if (score >= 50) return { label: 'Needs Work', color: '#f97316', bgColor: '#fff7ed', textColor: '#9a3412' };
  return { label: 'Critical', color: '#dc2626', bgColor: '#fef2f2', textColor: '#991b1b' };
}

export function getCategoryScoreColor(earned: number, max: number): string {
  const pct = max > 0 ? (earned / max) * 100 : 100;
  if (pct >= 90) return '#16a34a';
  if (pct >= 80) return '#22c55e';
  if (pct >= 70) return '#eab308';
  if (pct >= 50) return '#f97316';
  return '#dc2626';
}

export interface ItemResult {
  itemId: string;
  rating: ConditionRating;
  score: number;
  maxPoints: number;
  note?: string;
  photoUri?: string;
}

export interface CategoryResult {
  categoryId: string;
  items: ItemResult[];
  earned: number;
  max: number;
}

export interface StoredInspection {
  id: string;
  jobId: string;
  contactId: string;
  contactName: string;
  address: string;
  brand: string;
  brandLabel: string;
  totalScore: number;
  maxScore: number;
  categories: CategoryResult[];
  createdAt: string;
  technicianName: string;
}
