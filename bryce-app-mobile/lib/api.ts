import * as SecureStore from 'expo-secure-store';
import { useBrandStore } from '../stores/brand.store';

// API base URL -- points to the Pool Ops backend on Cloudflare tunnel
const API_BASE = 'https://bryce.ihatepoolgunk.com';

const AUTH_TOKEN_KEY = 'tsas_auth_token';

let cachedToken: string | null = null;

export async function getAuthToken(): Promise<string | null> {
  if (cachedToken) return cachedToken;
  try {
    cachedToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    return cachedToken;
  } catch {
    return null;
  }
}

export async function setAuthToken(token: string): Promise<void> {
  cachedToken = token;
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

export async function clearAuthToken(): Promise<void> {
  cachedToken = null;
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Get the active brand ID from the brand store.
 * Returns 'pcd' as default if no brand is selected.
 */
function getActiveBrandId(): string {
  const brand = useBrandStore.getState().activeBrand;
  return brand?.id || 'pcd';
}

export async function apiFetch(path: string, options: FetchOptions = {}): Promise<Response> {
  const { skipAuth, ...fetchOptions } = options;
  const url = `${API_BASE}${path}`;

  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<string, string> || {}),
  };

  if (!skipAuth) {
    const token = await getAuthToken();
    if (token) {
      headers['Cookie'] = `tsas-field-ops-auth=${token}`;
    }
  }

  // Don't set Content-Type for FormData -- let fetch set the boundary
  if (!(fetchOptions.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  // Inject active brand into the X-Brand header so the backend knows which
  // GHL sub-account and Stripe account to use
  headers['X-Brand'] = getActiveBrandId();

  return fetch(url, {
    ...fetchOptions,
    headers,
  });
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await apiFetch(path);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `API error: ${res.status}`);
  }
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const isFormData = body instanceof FormData;
  const res = await apiFetch(path, {
    method: 'POST',
    body: isFormData ? (body as FormData) : JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `API error: ${res.status}`);
  }
  return res.json();
}

// Verify PIN via backend
export async function verifyPin(pin: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });
    if (res.ok) {
      await setAuthToken('unlocked');
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export { API_BASE };
