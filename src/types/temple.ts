export type Language = 'en' | 'hi';

export type LocalizedText = Record<Language, string>;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TempleLocation {
  id: string;
  name: LocalizedText;
  category: LocalizedText;
  latitude: number;
  longitude: number;
  image: string;
  shortDescription: LocalizedText;
  explanation: LocalizedText;
  historicalSignificance: LocalizedText;
  isInsidePremises: boolean;
  directionsUrl: string;
  recommendedPriority: number;
  /**
   * Relative coordinates (0–100) on the illustrative temple grounds diagram.
   * Used solely for the schematic visitor orientation guide, not as GPS coordinates.
   */
  mapPosition: {
    x: number;
    y: number;
  };
}

export interface TempleConfig {
  id: string;
  guideTitle: LocalizedText;
  guideSubtitle: LocalizedText;
  templeName: LocalizedText;
  cityRegion: LocalizedText;
  centerCoordinates: Coordinates;
  locations: TempleLocation[];
}

export interface LocationWithDistance extends TempleLocation {
  distanceMeters: number | null;
  distanceLabel: string | null;
  walkingTimeLabel: string | null;
}

export type GpsStatus =
  | 'idle'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'unavailable'
  | 'error';
