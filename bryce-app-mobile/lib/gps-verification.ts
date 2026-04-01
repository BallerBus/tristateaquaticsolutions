import * as Location from 'expo-location';

export interface GpsVerification {
  latitude: number;
  longitude: number;
  accuracy: number; // meters
  timestamp: string; // ISO
  jobAddress: string;
  distanceFromJob: number; // meters
  verified: boolean; // true if within 200m of job address
}

const VERIFICATION_RADIUS_METERS = 200;

/**
 * Haversine formula: calculates distance between two lat/lng points in meters.
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Geocode an address string to lat/lng using Expo's built-in geocoding.
 * Falls back to null if geocoding fails (device doesn't support it, no network, etc.)
 */
export async function geocodeAddress(
  address: string,
): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const results = await Location.geocodeAsync(address);
    if (results.length > 0) {
      return {
        latitude: results[0].latitude,
        longitude: results[0].longitude,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get the current device GPS position.
 * Returns null if permissions denied or location unavailable.
 */
export async function getCurrentPosition(): Promise<{
  latitude: number;
  longitude: number;
  accuracy: number;
} | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy ?? 0,
    };
  } catch {
    return null;
  }
}

/**
 * Capture a full GPS verification: gets current position, geocodes the job address,
 * calculates distance, and returns whether the tech is verified on-site.
 *
 * Returns null only if GPS position cannot be obtained at all.
 * If geocoding fails, distanceFromJob will be -1 and verified will be false.
 */
export async function captureGpsVerification(
  jobAddress: string,
): Promise<GpsVerification | null> {
  const position = await getCurrentPosition();
  if (!position) return null;

  const jobCoords = await geocodeAddress(jobAddress);

  let distanceFromJob = -1;
  let verified = false;

  if (jobCoords) {
    distanceFromJob = haversineDistance(
      position.latitude,
      position.longitude,
      jobCoords.latitude,
      jobCoords.longitude,
    );
    verified = distanceFromJob <= VERIFICATION_RADIUS_METERS;
  }

  return {
    latitude: position.latitude,
    longitude: position.longitude,
    accuracy: position.accuracy,
    timestamp: new Date().toISOString(),
    jobAddress,
    distanceFromJob: Math.round(distanceFromJob),
    verified,
  };
}

/**
 * Format distance for display. Rounds to nearest meter under 1km,
 * otherwise shows km with one decimal.
 */
export function formatDistance(meters: number): string {
  if (meters < 0) return 'Unknown';
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}
