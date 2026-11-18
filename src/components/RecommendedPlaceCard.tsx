import { ArrowUpRight, Info, Navigation } from 'lucide-react';
import { UiTranslations } from '../data/translations';
import { Coordinates, Language, LocationWithDistance } from '../types/temple';
import { getGoogleMapsDirectionsUrl } from '../utils/geo';
import { TempleImage } from './TempleImage';

interface RecommendedPlaceCardProps {
  location: LocationWithDistance;
  hasGps: boolean;
  isDemoMode?: boolean;
  sampleDistancePrefix?: string;
  userCoords: Coordinates | null;
  language: Language;
  copy: UiTranslations['recommended'];
  onSelectLocation: (location: LocationWithDistance) => void;
  onOfflineDirections?: (location: LocationWithDistance) => void;
}

export function RecommendedPlaceCard({
  location,
  hasGps,
  isDemoMode = false,
  sampleDistancePrefix = 'Sample distance:',
  userCoords,
  language,
  copy,
  onSelectLocation,
  onOfflineDirections,
}: RecommendedPlaceCardProps) {
  const directionsHref = getGoogleMapsDirectionsUrl(
    { latitude: location.latitude, longitude: location.longitude },
    userCoords,
  );
  const locationName = location.name[language];

  const handleDirectionsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onOfflineDirections && typeof navigator !== 'undefined' && !navigator.onLine) {
      e.preventDefault();
      onOfflineDirections(location);
    }
  };

  return (
    <section aria-labelledby="recommended-place-heading">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2
          id="recommended-place-heading"
          className="font-sans text-xs font-bold tracking-wider text-[#766959]"
        >
          {copy.heading}
        </h2>
      </div>

      <article className="overflow-hidden rounded-2xl border border-[#E6D9C7] bg-white shadow-[0_4px_20px_rgba(74,53,37,0.06)] md:grid md:grid-cols-12 md:items-stretch">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0E6D8] md:col-span-5 md:aspect-auto md:min-h-[250px]">
          <TempleImage
            src={location.image}
            alt={locationName}
            className="h-full w-full"
          />
        </div>

        <div className="flex flex-col justify-between p-5 sm:p-6 md:col-span-7">
          <div>
            <p className="text-sm font-medium text-[#8E6120]">
              {hasGps || isDemoMode ? (
                <span>
                  {copy.nearestTag}
                  {location.distanceLabel && (
                    <span className="tabular-nums">
                      {' '}
                      · {isDemoMode ? `${sampleDistancePrefix} ` : ''}
                      {location.distanceLabel}
                      {location.walkingTimeLabel ? ` · ${location.walkingTimeLabel}` : ''}
                    </span>
                  )}
                </span>
              ) : (
                <span>{copy.suggestedTag}</span>
              )}
            </p>

            <h3 className="mt-1 font-display text-2xl sm:text-[26px] font-bold text-[#4A3525] leading-tight">
              {language === 'en' ? locationName.toUpperCase() : locationName}
            </h3>

            <p className="mt-2.5 text-base leading-relaxed text-[#5F554A]">
              {location.shortDescription[language]}
            </p>

            {!hasGps && !isDemoMode && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#F0E6D8] px-3.5 py-2.5 text-sm text-[#5F554A]">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#8E6120]" aria-hidden="true" />
                <span>{copy.noGpsNotice}</span>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDirectionsClick}
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#B98539] px-5 py-3 text-sm sm:text-[15px] font-semibold text-white transition-colors hover:bg-[#A3732E] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap"
            >
              <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{copy.getDirections}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 opacity-85" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => onSelectLocation(location)}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#E6D9C7] bg-[#F7F3EC] px-5 py-3 text-sm sm:text-[15px] font-semibold text-[#4A3525] transition-colors hover:bg-[#E9DDCA] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap"
            >
              {copy.readSignificance}
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
