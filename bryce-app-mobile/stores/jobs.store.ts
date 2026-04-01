import { create } from 'zustand';
import { apiGet, apiPost } from '../lib/api';
import { useBrandStore } from './brand.store';
import { sendGhlSms } from '../lib/ghl';
import type { JobPhase, CapturedPhoto, ChemicalReading } from '../lib/job-state';
import type { GpsVerification } from '../lib/gps-verification';
import { captureGpsVerification } from '../lib/gps-verification';

export interface Job {
  id: string;
  contactId: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  startTime: string;
  endTime: string;
  jobType: string;
  calendarName: string;
  brand: string;
  brandLabel: string;
  status: string;
}

export interface RouteStop {
  id: string;
  address: string;
  driveTimeFromPrev: number;
  driveDistanceFromPrev: number;
}

export interface OptimizedRoute {
  optimizedOrder: RouteStop[];
  totalDriveTime: number;
  totalDistance: number;
  ungeocodedJobs: string[];
}

interface JobsState {
  jobs: Job[];
  selectedDate: string;
  loading: boolean;
  error: string;
  optimizedRoute: OptimizedRoute | null;

  // Job documentation state
  activeJobId: string | null;
  jobPhases: Record<string, JobPhase>;
  jobTimerStarts: Record<string, string>;
  jobPhotos: Record<string, CapturedPhoto[]>;
  jobChemicals: Record<string, ChemicalReading>;
  jobNotes: Record<string, string>;
  jobElapsed: Record<string, number>;

  // GPS verification state (anti-fraud)
  jobGpsStart: Record<string, GpsVerification>;
  jobGpsEnd: Record<string, GpsVerification>;

  // Auto-text tracking
  arrivalTextSent: Record<string, boolean>;

  setSelectedDate: (date: string) => void;
  fetchJobs: () => Promise<void>;
  setActiveJob: (jobId: string | null) => void;

  // Job flow actions
  setJobPhase: (jobId: string, phase: JobPhase) => void;
  startTimer: (jobId: string) => void;
  addPhoto: (jobId: string, photo: CapturedPhoto) => void;
  setChemicals: (jobId: string, chemicals: ChemicalReading) => void;
  setNotes: (jobId: string, notes: string) => void;
  completeJob: (jobId: string, elapsed: number) => void;
  saveJobState: (jobId: string) => Promise<void>;
  loadJobState: (jobId: string) => Promise<void>;

  // GPS verification actions
  captureStartGps: (jobId: string, address: string) => Promise<GpsVerification | null>;
  captureEndGps: (jobId: string, address: string) => Promise<GpsVerification | null>;

  // Auto-text on arrival
  sendArrivalText: (jobId: string) => Promise<{ sent: boolean; error?: string }>;
}

function todayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  selectedDate: todayString(),
  loading: false,
  error: '',
  optimizedRoute: null,
  activeJobId: null,
  jobPhases: {},
  jobTimerStarts: {},
  jobPhotos: {},
  jobChemicals: {},
  jobNotes: {},
  jobElapsed: {},
  jobGpsStart: {},
  jobGpsEnd: {},
  arrivalTextSent: {},

  setSelectedDate: (date: string) => {
    set({ selectedDate: date });
  },

  fetchJobs: async () => {
    const { selectedDate } = get();
    set({ loading: true, error: '' });
    try {
      const data = await apiGet<{ jobs: Job[] }>(`/api/jobs/today?date=${selectedDate}`);
      set({ jobs: data.jobs || [], loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load jobs';
      set({ error: message, loading: false });
    }
  },

  setActiveJob: (jobId: string | null) => {
    set({ activeJobId: jobId });
  },

  setJobPhase: (jobId: string, phase: JobPhase) => {
    set((state) => ({
      jobPhases: { ...state.jobPhases, [jobId]: phase },
    }));
  },

  startTimer: (jobId: string) => {
    set((state) => ({
      jobTimerStarts: { ...state.jobTimerStarts, [jobId]: new Date().toISOString() },
    }));
  },

  addPhoto: (jobId: string, photo: CapturedPhoto) => {
    set((state) => ({
      jobPhotos: {
        ...state.jobPhotos,
        [jobId]: [...(state.jobPhotos[jobId] || []), photo],
      },
    }));
  },

  setChemicals: (jobId: string, chemicals: ChemicalReading) => {
    set((state) => ({
      jobChemicals: { ...state.jobChemicals, [jobId]: chemicals },
    }));
  },

  setNotes: (jobId: string, notes: string) => {
    set((state) => ({
      jobNotes: { ...state.jobNotes, [jobId]: notes },
    }));
  },

  completeJob: (jobId: string, elapsed: number) => {
    set((state) => ({
      jobPhases: { ...state.jobPhases, [jobId]: 'COMPLETED' as JobPhase },
      jobElapsed: { ...state.jobElapsed, [jobId]: elapsed },
    }));
  },

  captureStartGps: async (jobId: string, address: string) => {
    const verification = await captureGpsVerification(address);
    if (verification) {
      set((state) => ({
        jobGpsStart: { ...state.jobGpsStart, [jobId]: verification },
      }));
    }
    return verification;
  },

  captureEndGps: async (jobId: string, address: string) => {
    const verification = await captureGpsVerification(address);
    if (verification) {
      set((state) => ({
        jobGpsEnd: { ...state.jobGpsEnd, [jobId]: verification },
      }));
    }
    return verification;
  },

  saveJobState: async (jobId: string) => {
    const state = get();
    const phase = state.jobPhases[jobId] || 'IDLE';
    const timerStartedAt = state.jobTimerStarts[jobId] || null;
    const photos = state.jobPhotos[jobId] || [];
    const elapsed = state.jobElapsed[jobId] || null;
    const gpsStart = state.jobGpsStart[jobId] || null;
    const gpsEnd = state.jobGpsEnd[jobId] || null;

    try {
      await apiPost('/api/jobs/state', {
        jobId,
        phase,
        timerStartedAt,
        finalElapsedSeconds: elapsed,
        photosBeforeCount: photos.filter((p) => p.phase === 'before').length,
        photosAfterCount: photos.filter((p) => p.phase === 'after').length,
        healthCheckProgress: null,
        healthCheckCategoryIndex: 0,
        completedAt: phase === 'COMPLETED' ? new Date().toISOString() : null,
        gpsVerification: {
          start: gpsStart,
          end: gpsEnd,
        },
      });
    } catch (err) {
      console.error('Failed to save job state:', err);
    }
  },

  sendArrivalText: async (jobId: string) => {
    const currentState = get();

    // Don't send twice for the same job
    if (currentState.arrivalTextSent[jobId]) {
      return { sent: false, error: 'Already sent' };
    }

    const job = currentState.jobs.find((j) => j.id === jobId);
    if (!job) {
      return { sent: false, error: 'Job not found' };
    }

    if (!job.contactId) {
      return { sent: false, error: 'No contact ID for this customer' };
    }

    const brand = useBrandStore.getState().activeBrand;
    if (!brand) {
      return { sent: false, error: 'No active brand selected' };
    }

    // Build the arrival message
    const firstName = job.contactName.split(' ')[0] || job.contactName;
    const smsMessage = `Hi ${firstName}, your pool tech has arrived at ${job.address}. ${brand.smsSignature}`;

    const result = await sendGhlSms(brand, job.contactId, smsMessage);

    if (result.success) {
      set((s) => ({
        arrivalTextSent: { ...s.arrivalTextSent, [jobId]: true },
      }));
    }

    return { sent: result.success, error: result.error };
  },

  loadJobState: async (jobId: string) => {
    try {
      const data = await apiGet<{ state: { phase: JobPhase; timerStartedAt: string | null; finalElapsedSeconds: number | null } | null }>(`/api/jobs/state?jobId=${jobId}`);
      if (data.state && data.state.phase !== 'IDLE') {
        set((state) => ({
          jobPhases: { ...state.jobPhases, [jobId]: data.state!.phase },
          jobTimerStarts: data.state!.timerStartedAt
            ? { ...state.jobTimerStarts, [jobId]: data.state!.timerStartedAt! }
            : state.jobTimerStarts,
          jobElapsed: data.state!.finalElapsedSeconds != null
            ? { ...state.jobElapsed, [jobId]: data.state!.finalElapsedSeconds! }
            : state.jobElapsed,
        }));
      }
    } catch (err) {
      console.error('Failed to load job state:', err);
    }
  },
}));
