import { create } from 'zustand';
import { verifyPin, isAuthenticated, clearAuthToken } from '../lib/api';

interface AuthState {
  isUnlocked: boolean;
  isChecking: boolean;
  error: string;
  checkAuth: () => Promise<void>;
  unlock: (pin: string) => Promise<boolean>;
  lock: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isUnlocked: false,
  isChecking: true,
  error: '',

  checkAuth: async () => {
    set({ isChecking: true });
    const authed = await isAuthenticated();
    set({ isUnlocked: authed, isChecking: false });
  },

  unlock: async (pin: string) => {
    set({ error: '' });
    const success = await verifyPin(pin);
    if (success) {
      set({ isUnlocked: true, error: '' });
      return true;
    }
    set({ error: 'Wrong PIN' });
    return false;
  },

  lock: async () => {
    await clearAuthToken();
    set({ isUnlocked: false });
  },
}));
