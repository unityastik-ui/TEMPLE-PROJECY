import { Coordinates, Language, LocationWithDistance, TempleConfig } from '../types/temple';

const EARTH_RADIUS_METERS = 6_371_000;
const AVERAGE_WALKING_METERS_PER_MIN = 70; // Gentle temple walking pace (~4.2 km/h)
const MAX_WALKABLE_ESTIMATE_METERS = 10_000; // Only display walking-time estimates within 10 km

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Great-circle Haversine distance in meters between two GPS coordinates.
 */
export function calculateDistanceMeters(from: Coordinates, to: Coordinates): number {
  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

export function formatDistance(meters: number, language: Language): string {
  if (meters < 1000) {
    const rounded = Math.max(5, Math.round(meters / 5) * 5);
    return language === 'hi' ? `${rounded} मी` : `${rounded} m`;
  }
  const km = (meters / 1000).toFixed(1);
  return language === 'hi' ? `${km} किमी` : `${km} km`;
}

export function formatWalkingTime(meters: number, language: Language): string | null {
  if (meters > MAX_WALKABLE_ESTIMATE_METERS) {
    return null;
  }
  const minutes = Math.max(1, Math.round(meters / AVERAGE_WALKING_METERS_PER_MIN));
  return language === 'hi' ? `~${minutes} मिनट पैदल` : `~${minutes} min walk`;
}

export function getGoogleMapsDirectionsUrl(
  destination: Coordinates,
  origin?: Coordinates | null,
): string {
  const dest = `${destination.latitude},${destination.longitude}`;
  if (origin) {
    const orig = `${origin.latitude},${origin.longitude}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(orig)}&destination=${encodeURIComponent(dest)}&travelmode=walking`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}&travelmode=walking`;
}

export function enrichLocationsWithDistance(
  temple: TempleConfig,
  userCoords: Coordinates | null,
  language: Language,
): LocationWithDistance[] {
  return temple.locations.map((loc) => {
    if (!userCoords) {
      return {
        ...loc,
        distanceMeters: null,
        distanceLabel: null,
        walkingTimeLabel: null,
      };
    }

    const distanceMeters = calculateDistanceMeters(userCoords, {
      latitude: loc.latitude,
      longitude: loc.longitude,
    });

    return {
      ...loc,
      distanceMeters,
      distanceLabel: formatDistance(distanceMeters, language),
      walkingTimeLabel: formatWalkingTime(distanceMeters, language),
    };
  });
}

export function describeUserLocation(
  userCoords: Coordinates,
  temple: TempleConfig,
  nearestLocation: LocationWithDistance | null,
  reverseGeocodedName: string | null,
  language: Language,
): { primaryLabel: string; helperDetail: string } {
  const distanceToTempleCenter = calculateDistanceMeters(
    userCoords,
    temple.centerCoordinates,
  );

  if (nearestLocation && nearestLocation.distanceMeters !== null) {
    const nearestName = nearestLocation.name[language];
    if (nearestLocation.distanceMeters <= 90) {
      return language === 'hi'
        ? {
            primaryLabel: `${nearestName} के पास, शिरडी`,
            helperDetail: `${nearestName} के भीतर या ठीक बगल में (${nearestLocation.distanceLabel} दूर)`,
          }
        : {
            primaryLabel: `Near ${nearestName}, Shirdi`,
            helperDetail: `Inside or right beside ${nearestName} (${nearestLocation.distanceLabel} away)`,
          };
    }

    if (distanceToTempleCenter <= 2500) {
      return language === 'hi'
        ? {
            primaryLabel: 'शिरडी मंदिर क्षेत्र',
            helperDetail: `सबसे नजदीकी पवित्र स्थल: ${nearestName} (${nearestLocation.distanceLabel} दूर)`,
          }
        : {
            primaryLabel: 'Shirdi Temple Area',
            helperDetail: `Closest sacred place: ${nearestName} (${nearestLocation.distanceLabel} away)`,
          };
    }
  }

  const formattedCoords = `${userCoords.latitude.toFixed(4)}° N, ${userCoords.longitude.toFixed(4)}° E`;
  const distToTemple = formatDistance(distanceToTempleCenter, language);
  const templeTitle = temple.templeName[language];

  if (reverseGeocodedName) {
    return {
      primaryLabel: reverseGeocodedName,
      helperDetail:
        language === 'hi'
          ? `${templeTitle} से ${distToTemple} दूर`
          : `${distToTemple} from ${templeTitle}`,
    };
  }

  return language === 'hi'
    ? {
        primaryLabel: `जीपीएस स्थान मिला (${formattedCoords})`,
        helperDetail: `${templeTitle} से ${distToTemple} दूर`,
      }
    : {
        primaryLabel: `GPS Location Detected (${formattedCoords})`,
        helperDetail: `${distToTemple} from ${templeTitle}`,
      };
}

export async function reverseGeocodeCoords(coords: Coordinates): Promise<string | null> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 3500);

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}&zoom=14`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as {
      address?: {
        suburb?: string;
        neighbourhood?: string;
        town?: string;
        city?: string;
        village?: string;
        state?: string;
      };
    };

    const addr = data.address;
    if (!addr) return null;

    const locality = addr.suburb || addr.neighbourhood || addr.village || addr.town || addr.city;
    const region = addr.city && locality !== addr.city ? addr.city : addr.state;

    if (locality && region) return `${locality}, ${region}`;
    return locality || region || null;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}
