import { useEffect } from 'react';
import { ArrowUpRight, MapPin, Navigation, X } from 'lucide-react';
import { UiTranslations } from '../data/translations';
import { Coordinates, Language, LocationWithDistance } from '../types/temple';
import { getGoogleMapsDirectionsUrl } from '../utils/geo';
import { TempleImage } from './TempleImage';

interface LocationDetailSheetProps {
  location: LocationWithDistance | null;
  userCoords: Coordinates | null;
  language: Language;
  copy: UiTranslations['detailsSheet'];
  insidePremisesLabel: string;
  nearbyLabel: string;
  isDemoMode?: boolean;
  sampleDistancePrefix?: string;
  onClose: () => void;
  onOfflineDirections?: (location: LocationWithDistance) => void;
}

export function LocationDetailSheet({
  location,
  userCoords,
  language,
  copy,
  insidePremisesLabel,
  nearbyLabel,
  isDemoMode = false,
  sampleDistancePrefix = 'Sample distance:',
  onClose,
  onOfflineDirections,
}: LocationDetailSheetProps) {
  useEffect(() => {
    if (!location) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [location, onClose]);

  if (!location) return null;

  const directionsHref = getGoogleMapsDirectionsUrl(
    { latitude: location.latitude, longitude: location.longitude },
    userCoords,
  );
  const locationName = location.name[language];

  const handleDirectionsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onOfflineDirections && typeof navigator !== 'undefined' && !navigator.onLine) {
      e.preventDefault();
      onClose();
      onOfflineDirections(location);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#4A3525]/45 backdrop-blur-[2px] sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-sheet-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl border border-[#E6D9C7] bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle indicator */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="h-1.5 w-10 rounded-full bg-[#E6D9C7]" aria-hidden="true" />
        </div>

        {/* Top close bar */}
        <div className="flex items-center justify-between gap-3 border-b border-[#E6D9C7]/70 px-5 py-3">
          <p className="text-xs font-bold tracking-wider text-[#766959]">
            {copy.headerLabel}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeAria}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#4A3525] transition-colors hover:bg-[#F0E6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-5 py-4 space-y-4">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#F0E6D8]">
            <TempleImage
              src={location.image}
              alt={locationName}
              className="h-full w-full"
            />
          </div>

          <div>
            <h2
              id="detail-sheet-title"
              className="font-display text-2xl sm:text-[26px] font-bold text-[#4A3525] leading-tight"
            >
              {locationName}
            </h2>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#766959]">
              <span className="font-medium text-[#8E6120]">
                {location.isInsidePremises ? insidePremisesLabel : nearbyLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>{location.category[language]}</span>
              {location.distanceLabel && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#4A3525] tabular-nums">
                    <MapPin className="h-3.5 w-3.5 text-[#B98539]" aria-hidden="true" />
                    {isDemoMode ? `${sampleDistancePrefix} ` : ''}
                    {location.distanceLabel}
                    {location.walkingTimeLabel ? ` (${location.walkingTimeLabel})` : ''}
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-base leading-relaxed text-[#5F554A]">
            {location.explanation[language]}
          </p>

          <div className="rounded-xl border border-[#E6D9C7] bg-[#F0E6D8]/70 p-4">
            <h3 className="font-sans text-xs font-bold tracking-wider text-[#4A3525]">
              {copy.whyImportantHeading}
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-[#5F554A]">
              {location.historicalSignificance[language]}
            </p>
          </div>
        </div>

        {/* Pinned bottom actions for one-handed thumb reach */}
        <div className="border-t border-[#E6D9C7] bg-white px-5 py-4 flex flex-col sm:flex-row gap-2.5">
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDirectionsClick}
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#B98539] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#A3732E] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap"
          >
            <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{copy.getDirections}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 opacity-85" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#E6D9C7] bg-[#F7F3EC] px-6 py-3 text-[15px] font-semibold text-[#4A3525] transition-colors hover:bg-[#E9DDCA] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap"
          >
            {copy.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
