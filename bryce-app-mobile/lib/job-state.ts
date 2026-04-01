// Port from bryce-app/lib/job-state.ts
// Phase machine for job documentation

export type JobPhase =
  | 'IDLE'
  | 'BEFORE_PHOTOS'
  | 'IN_PROGRESS'
  | 'AFTER_PHOTOS'
  | 'COMPLETED'
  | 'HEALTH_CHECK';

export interface PersistedJobState {
  jobId: string;
  phase: JobPhase;
  timerStartedAt: string | null;
  finalElapsedSeconds: number | null;
  photosBeforeCount: number;
  photosAfterCount: number;
  healthCheckProgress: Record<string, unknown> | null;
  healthCheckCategoryIndex: number;
  completedAt: string | null;
  updatedAt: string;
}

export interface ChemicalReading {
  ph: number | null;
  freeChlorine: number | null;
  alkalinity: number | null;
  cya: number | null;
  recordedAt: string;
}

export interface CapturedPhoto {
  id: string;
  uri: string;
  capturedAt: string;
  latitude: number | null;
  longitude: number | null;
  phase: 'before' | 'after';
  uploaded: boolean;
  serverUrl?: string;
  // Verification fields (anti-fraud)
  gpsAccuracy?: number;
  gpsVerified?: boolean;
  perceptualHash?: string;
  isDuplicate?: boolean;
}

// Chemical reading ideal ranges for color coding
export const ChemicalRanges = {
  ph: { ideal: [7.4, 7.6], acceptable: [7.2, 7.8], unit: '' },
  freeChlorine: { ideal: [1.0, 3.0], acceptable: [0.5, 5.0], unit: 'ppm' },
  alkalinity: { ideal: [80, 120], acceptable: [60, 150], unit: 'ppm' },
  cya: { ideal: [30, 50], acceptable: [20, 80], unit: 'ppm' },
} as const;

export function getChemicalStatus(
  type: keyof typeof ChemicalRanges,
  value: number | null,
): 'ideal' | 'acceptable' | 'out-of-range' | 'none' {
  if (value === null || value === undefined) return 'none';
  const range = ChemicalRanges[type];
  if (value >= range.ideal[0] && value <= range.ideal[1]) return 'ideal';
  if (value >= range.acceptable[0] && value <= range.acceptable[1]) return 'acceptable';
  return 'out-of-range';
}

export function getChemicalStatusColor(status: string): string {
  switch (status) {
    case 'ideal': return '#16a34a';
    case 'acceptable': return '#eab308';
    case 'out-of-range': return '#dc2626';
    default: return '#9ca3af';
  }
}

export function formatElapsed(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function formatElapsedReadable(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${minutes} min`;
}
