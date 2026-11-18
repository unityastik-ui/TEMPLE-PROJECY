import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { CurrentLocationCard } from './components/CurrentLocationCard';
import { HowToUseSection } from './components/HowToUseSection';
import { LocationDetailSheet } from './components/LocationDetailSheet';
import { LocationListCard } from './components/LocationListCard';
import { OfflineBanner } from './components/OfflineBanner';
import { OfflineDirectionsModal } from './components/OfflineDirectionsModal';
import { RecommendedPlaceCard } from './components/RecommendedPlaceCard';
import { TempleHeader } from './components/TempleHeader';
import { TempleMapModal } from './components/TempleMapModal';
import { DEMO_STARTING_POINTS } from './data/demoLocations';
import { DEFAULT_TEMPLE_ID, TEMPLES } from './data/temples';
import { UI_TRANSLATIONS } from './data/translations';
import {
  Coordinates,
  GpsStatus,
  Language,
  LocationWithDistance,
  TempleConfig,
} from './types/temple';
import {
  describeUserLocation,
  enrichLocationsWithDistance,
  reverseGeocodeCoords,
} from './utils/geo';

const LANGUAGE_STORAGE_KEY = 'smart-temple-explorer-lang';
const TEMPLE_DATA_CACHE_KEY = 'smart-temple-explorer-temple-data';

const isStandaloneDemo =
  typeof __IS_STANDALONE_DEMO__ !== 'undefined' && __IS_STANDALONE_DEMO__;

function getInitialLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === 'en' || saved === 'hi') {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'en';
}

function getTempleConfig(): TempleConfig {
  const activeConfig = TEMPLES[DEFAULT_TEMPLE_ID];
  try {
    window.localStorage.setItem(
      TEMPLE_DATA_CACHE_KEY,
      JSON.stringify(activeConfig),
    );
    return activeConfig;
  } catch {
    try {
      const cached = window.localStorage.getItem(TEMPLE_DATA_CACHE_KEY);
      if (cached) {
        return JSON.parse(cached) as TempleConfig;
      }
    } catch {
      // Ignore storage access errors
    }
  }
  return activeConfig;
}

export default function App() {
  const temple = useMemo(() => getTempleConfig(), []);

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>('idle');
  const [userCoords, setUserCoords] = useState<Coordinates | null>(null);
  const [reverseGeocodedName, setReverseGeocodedName] = useState<string | null>(null);

  // Demo presentation state (active only in standalone offline demo build)
  const [activeDemoPointId, setActiveDemoPointId] = useState<string | null>(
    isStandaloneDemo ? (DEMO_STARTING_POINTS[0]?.id ?? null) : null,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapFocusLocationId, setMapFocusLocationId] = useState<string | null>(null);
  const [offlineDirectionsLocation, setOfflineDirectionsLocation] =
    useState<LocationWithDistance | null>(null);

  const t = UI_TRANSLATIONS[language];

  const handleLanguageChange = useCallback((nextLang: Language) => {
    setLanguage(nextLang);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
    } catch {
      // Ignore storage access errors
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const detectLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setActiveDemoPointId(null);
      setGpsStatus('unavailable');
      return;
    }

    setGpsStatus('requesting');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setActiveDemoPointId(null);
        setUserCoords(coords);
        setGpsStatus('granted');

        if (navigator.onLine) {
          void reverseGeocodeCoords(coords).then((name) => {
            if (name) setReverseGeocodedName(name);
          });
        }
      },
      (error) => {
        setActiveDemoPointId(null);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsStatus('denied');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setGpsStatus('unavailable');
        } else {
          setGpsStatus('error');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 30000,
      },
    );
  }, []);

  // Automatically read GPS on load ONLY if permission was already granted previously (live web mode)
  useEffect(() => {
    if (isStandaloneDemo) return;
    if (!('permissions' in navigator) || typeof navigator.permissions.query !== 'function') {
      return;
    }

    let cancelled = false;
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((status) => {
        if (!cancelled && status.state === 'granted') {
          detectLocation();
        }
      })
      .catch(() => {
        // Ignore browsers that restrict permissions.query for geolocation
      });

    return () => {
      cancelled = true;
    };
  }, [detectLocation]);

  const activeDemoPoint = useMemo(() => {
    if (!isStandaloneDemo || !activeDemoPointId) return null;
    return DEMO_STARTING_POINTS.find((pt) => pt.id === activeDemoPointId) ?? null;
  }, [activeDemoPointId]);

  const isDemoModeActive = activeDemoPoint !== null;
  const effectiveCoords = activeDemoPoint ? activeDemoPoint.coordinates : userCoords;
  const hasLiveGps = !isDemoModeActive && gpsStatus === 'granted' && userCoords !== null;

  const handleSelectDemoPoint = useCallback((pointId: string) => {
    setActiveDemoPointId(pointId);
  }, []);

  const sortedLocations = useMemo<LocationWithDistance[]>(() => {
    const enriched = enrichLocationsWithDistance(temple, effectiveCoords, language);
    return [...enriched].sort((a, b) => {
      if (a.distanceMeters !== null && b.distanceMeters !== null) {
        return a.distanceMeters - b.distanceMeters;
      }
      return a.recommendedPriority - b.recommendedPriority;
    });
  }, [temple, effectiveCoords, language]);

  const nearestLocation = sortedLocations[0] ?? null;

  const recommendedLocation = useMemo<LocationWithDistance | null>(() => {
    if (effectiveCoords && nearestLocation) {
      return nearestLocation;
    }
    return (
      sortedLocations.find((loc) => loc.recommendedPriority === 1) ??
      sortedLocations[0] ??
      null
    );
  }, [effectiveCoords, nearestLocation, sortedLocations]);

  const userLocationSummary = useMemo(() => {
    if (activeDemoPoint) {
      const closestText = nearestLocation
        ? `${nearestLocation.name[language]} (${nearestLocation.distanceLabel})`
        : '';
      return {
        primaryLabel: activeDemoPoint.label[language],
        helperDetail: closestText
          ? language === 'hi'
            ? `सबसे नजदीकी नमूना स्थल: ${closestText}`
            : `Closest sacred place (sample): ${closestText}`
          : null,
      };
    }

    if (!userCoords || gpsStatus !== 'granted') return null;
    return describeUserLocation(
      userCoords,
      temple,
      nearestLocation,
      reverseGeocodedName,
      language,
    );
  }, [
    activeDemoPoint,
    nearestLocation,
    userCoords,
    gpsStatus,
    temple,
    reverseGeocodedName,
    language,
  ]);

  const filteredLocations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return sortedLocations;

    return sortedLocations.filter(
      (loc) =>
        loc.name.en.toLowerCase().includes(query) ||
        loc.name.hi.toLowerCase().includes(query) ||
        loc.category.en.toLowerCase().includes(query) ||
        loc.category.hi.toLowerCase().includes(query) ||
        loc.shortDescription.en.toLowerCase().includes(query) ||
        loc.shortDescription.hi.toLowerCase().includes(query),
    );
  }, [sortedLocations, searchQuery]);

  const insidePremisesLocations = useMemo(
    () => filteredLocations.filter((loc) => loc.isInsidePremises),
    [filteredLocations],
  );

  const nearbyLocations = useMemo(
    () => filteredLocations.filter((loc) => !loc.isInsidePremises),
    [filteredLocations],
  );

  const selectedLocation = useMemo(
    () => sortedLocations.find((loc) => loc.id === selectedLocationId) ?? null,
    [sortedLocations, selectedLocationId],
  );

  const samplePrefix = t.demoLocation.sampleDistancePrefix;

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#5F554A] flex flex-col">
      <TempleHeader
        title={temple.guideTitle[language]}
        subtitle={temple.guideSubtitle[language]}
        language={language}
        languageToggleLabel={t.languageToggleLabel}
        onChangeLanguage={handleLanguageChange}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6 sm:py-7 space-y-6 sm:space-y-8">
        {/* Offline status notice when connectivity drops inside the temple */}
        <OfflineBanner copy={t.offline} />

        {/* Section 1: Current Location */}
        <CurrentLocationCard
          gpsStatus={gpsStatus}
          locationLabel={userLocationSummary?.primaryLabel ?? null}
          locationHelper={userLocationSummary?.helperDetail ?? null}
          copy={t.currentLocation}
          demoCopy={t.demoLocation}
          isStandaloneDemo={isStandaloneDemo}
          isDemoModeActive={isDemoModeActive}
          activeDemoPointId={activeDemoPointId}
          demoPoints={DEMO_STARTING_POINTS}
          language={language}
          onSelectDemoPoint={handleSelectDemoPoint}
          onDetectLocation={detectLocation}
          onOpenMap={() => {
            setMapFocusLocationId(null);
            setIsMapOpen(true);
          }}
        />

        {/* Section 2: Recommended Place to Visit */}
        {recommendedLocation && (
          <RecommendedPlaceCard
            location={recommendedLocation}
            hasGps={hasLiveGps}
            isDemoMode={isDemoModeActive}
            sampleDistancePrefix={samplePrefix}
            userCoords={effectiveCoords}
            language={language}
            copy={t.recommended}
            onSelectLocation={(loc) => setSelectedLocationId(loc.id)}
            onOfflineDirections={(loc) => setOfflineDirectionsLocation(loc)}
          />
        )}

        {/* Section 3: Important Places to Visit + Instant Search */}
        <section aria-labelledby="important-places-heading" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="important-places-heading"
                className="font-sans text-xs font-bold tracking-wider text-[#766959]"
              >
                {t.placesList.heading}
              </h2>
              <p className="mt-1 text-sm text-[#766959]">
                {hasLiveGps || isDemoModeActive
                  ? t.placesList.sortedSubtext
                  : t.placesList.defaultSubtext}
              </p>
            </div>

            {/* Instant Search */}
            <div className="relative w-full sm:w-72">
              <label htmlFor="place-search" className="sr-only">
                {t.placesList.searchLabel}
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7D6D]"
                aria-hidden="true"
              />
              <input
                id="place-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.placesList.searchPlaceholder}
                className="min-h-[48px] w-full rounded-xl border border-[#E6D9C7] bg-white pl-10 pr-10 py-2.5 text-[15px] text-[#4A3525] placeholder:text-[#8A7D6D] focus:border-[#B98539] focus:outline-none focus:ring-2 focus:ring-[#B98539]/25"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={t.placesList.clearSearch}
                  className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#766959] hover:bg-[#F0E6D8] hover:text-[#4A3525]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {filteredLocations.length === 0 ? (
            <div className="rounded-2xl border border-[#E6D9C7] bg-white p-6 text-center">
              <p className="text-base font-semibold text-[#4A3525]">
                {t.placesList.noResultsTitle(searchQuery)}
              </p>
              <p className="mt-1 text-sm text-[#766959]">{t.placesList.noResultsHint}</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#B98539] px-5 py-2 text-sm font-semibold text-white hover:bg-[#A3732E]"
              >
                {t.placesList.showAllBtn}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {insidePremisesLocations.length > 0 && (
                <div>
                  <h3 className="mb-2.5 font-display text-lg font-bold text-[#4A3525]">
                    {t.placesList.insidePremisesHeading}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {insidePremisesLocations.map((location) => (
                      <LocationListCard
                        key={location.id}
                        location={location}
                        language={language}
                        insidePremisesLabel={t.placesList.insidePremisesLabel}
                        nearbyLabel={t.placesList.nearbyLabel}
                        isDemoMode={isDemoModeActive}
                        sampleDistancePrefix={samplePrefix}
                        onSelect={(loc) => setSelectedLocationId(loc.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {nearbyLocations.length > 0 && (
                <div>
                  <h3 className="mb-2.5 font-display text-lg font-bold text-[#4A3525]">
                    {t.placesList.nearbyHeading}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {nearbyLocations.map((location) => (
                      <LocationListCard
                        key={location.id}
                        location={location}
                        language={language}
                        insidePremisesLabel={t.placesList.insidePremisesLabel}
                        nearbyLabel={t.placesList.nearbyLabel}
                        isDemoMode={isDemoModeActive}
                        sampleDistancePrefix={samplePrefix}
                        onSelect={(loc) => setSelectedLocationId(loc.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Section 4: How to Use QR Guide */}
        <HowToUseSection copy={t.howToUse} installCopy={t.install} />
      </main>

      <footer className="border-t border-[#E6D9C7] bg-[#F0E6D8]/60 py-6 px-4 text-center">
        <div className="mx-auto max-w-5xl space-y-1 text-xs sm:text-sm text-[#766959]">
          <p className="font-semibold text-[#4A3525]">{t.footer.appTitle}</p>
          <p>
            {temple.templeName[language]}, {temple.cityRegion[language]}
          </p>
          <p className="text-[#8A7D6D]">{t.footer.developedBy}</p>
        </div>
      </footer>

      {/* Place Detail Bottom Sheet / Modal */}
      <LocationDetailSheet
        location={selectedLocation}
        userCoords={effectiveCoords}
        language={language}
        copy={t.detailsSheet}
        insidePremisesLabel={t.placesList.insidePremisesLabel}
        nearbyLabel={t.placesList.nearbyLabel}
        isDemoMode={isDemoModeActive}
        sampleDistancePrefix={samplePrefix}
        onClose={() => setSelectedLocationId(null)}
        onOfflineDirections={(loc) => setOfflineDirectionsLocation(loc)}
      />

      {/* Illustrative Temple Guide Map Modal */}
      <TempleMapModal
        isOpen={isMapOpen}
        locations={sortedLocations}
        userCoords={effectiveCoords}
        language={language}
        copy={t.mapModal}
        insidePremisesLabel={t.placesList.insidePremisesLabel}
        nearbyLabel={t.placesList.nearbyLabel}
        initialSelectedId={mapFocusLocationId}
        isDemoMode={isDemoModeActive}
        sampleDistancePrefix={samplePrefix}
        onClose={() => setIsMapOpen(false)}
        onSelectForDetails={(loc) => setSelectedLocationId(loc.id)}
        onOfflineDirections={(loc) => setOfflineDirectionsLocation(loc)}
      />

      {/* Offline Google Maps Fallback Notice */}
      <OfflineDirectionsModal
        location={offlineDirectionsLocation}
        language={language}
        copy={t.offlineDirections}
        isDemoMode={isDemoModeActive}
        onClose={() => setOfflineDirectionsLocation(null)}
        onOpenMapForLocation={(locationId) => {
          setMapFocusLocationId(locationId);
          setIsMapOpen(true);
        }}
      />
    </div>
  );
}
