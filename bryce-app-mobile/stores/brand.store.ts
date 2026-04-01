import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { BRANDS, getBrand, type BrandConfig, type BrandId } from '../lib/brands';

const ACTIVE_BRAND_KEY = 'tsas_active_brand';

interface BrandState {
  activeBrand: BrandConfig | null;
  isLoaded: boolean;

  loadBrand: () => Promise<void>;
  setBrand: (brandId: BrandId) => Promise<void>;
  clearBrand: () => Promise<void>;
}

export const useBrandStore = create<BrandState>((set) => ({
  activeBrand: null,
  isLoaded: false,

  loadBrand: async () => {
    try {
      const stored = await SecureStore.getItemAsync(ACTIVE_BRAND_KEY);
      if (stored && BRANDS[stored]) {
        set({ activeBrand: getBrand(stored), isLoaded: true });
      } else {
        set({ isLoaded: true });
      }
    } catch {
      set({ isLoaded: true });
    }
  },

  setBrand: async (brandId: BrandId) => {
    const brand = getBrand(brandId);
    await SecureStore.setItemAsync(ACTIVE_BRAND_KEY, brandId);
    set({ activeBrand: brand });
  },

  clearBrand: async () => {
    await SecureStore.deleteItemAsync(ACTIVE_BRAND_KEY);
    set({ activeBrand: null });
  },
}));
