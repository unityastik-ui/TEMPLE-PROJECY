import { useEffect, useState } from 'react';
import { ArrowUpRight, Compass, Info, MapPin, Navigation, X } from 'lucide-react';
import { UiTranslations } from '../data/translations';
import { Coordinates, Language, LocationWithDistance } from '../types/temple';
import { getGoogleMapsDirectionsUrl } from '../utils/geo';
import { TempleImage } from './TempleImage';

interface TempleMapModalProps {
  isOpen: boolean;
  locations: LocationWithDistance[];
  userCoords: Coordinates | null;
  language: Language;
  copy: UiTranslations['mapModal'];
  insidePremisesLabel: string;
  nearbyLabel: string;
  initialSelectedId?: string | null;
  isDemoMode?: boolean;
  sampleDistancePrefix?: string;
  onClose: () => void;
  onSelectForDetails: (location: LocationWithDistance) => void;
  onOfflineDirections?: (location: LocationWithDistance) => void;
}

export function TempleMapModal({
  isOpen,
  locations,
  userCoords,
  language,
  copy,
  insidePremisesLabel,
  nearbyLabel,
  initialSelectedId = null,
  isDemoMode = false,
  sampleDistancePrefix = 'Sample distance:',
  onClose,
  onSelectForDetails,
  onOfflineDirections,
}: TempleMapModalProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialSelectedId ?? locations[0]?.id ?? 'samadhi-mandir',
  );

  useEffect(() => {
    if (isOpen && initialSelectedId) {
      setSelectedId(initialSelectedId);
    }
  }, [isOpen, initialSelectedId]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedLocation =
    locations.find((loc) => loc.id === selectedId) ?? locations[0];

  const directionsHref = selectedLocation
    ? getGoogleMapsDirectionsUrl(
        {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
        userCoords,
      )
    : '#';

  const handleDirectionsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      selectedLocation &&
      onOfflineDirections &&
      typeof navigator !== 'undefined' &&
      !navigator.onLine
    ) {
      e.preventDefault();
      onClose();
      onOfflineDirections(selectedLocation);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#4A3525]/45 backdrop-blur-[2px] sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="temple-map-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl border border-[#E6D9C7] bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="h-1.5 w-10 rounded-full bg-[#E6D9C7]" aria-hidden="true" />
        </div>

        {/* Modal header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#E6D9C7] px-5 py-3.5">
          <div>
            <h2
              id="temple-map-title"
              className="font-display text-xl font-bold text-[#4A3525]"
            >
              {copy.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#766959]">{copy.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeAria}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#4A3525] transition-colors hover:bg-[#F0E6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable map + selected place preview */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
          <div className="flex items-start gap-2 rounded-xl bg-[#F0E6D8] px-3.5 py-2.5 text-xs sm:text-sm text-[#5F554A]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#8E6120]" aria-hidden="true" />
            <span>
              {copy.disclaimerPrefix}{' '}
              <strong className="font-semibold text-[#4A3525]">
                {copy.disclaimerHighlight}
              </strong>{' '}
              {copy.disclaimerSuffix}
            </span>
          </div>

          {/* Illustrative Temple Grounds Schematic */}
          <div className="relative h-[320px] sm:h-[360px] w-full overflow-hidden rounded-2xl border border-[#E6D9C7] bg-[#F7F3EC]">
            <svg
              viewBox="0 0 400 320"
              preserveAspectRatio="none"
              className="h-full w-full"
              aria-hidden="true"
            >
              {/* Soft outer ground */}
              <rect x="0" y="0" width="400" height="320" fill="#F7F3EC" />

              {/* Lendi Garden green-beige sanctuary zone (top right) */}
              <rect
                x="284"
                y="14"
                width="102"
                height="98"
                rx="14"
                fill="#EBE6D7"
                stroke="#D6CCB8"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Main Temple Premises Courtyard */}
              <rect
                x="24"
                y="24"
                width="244"
                height="210"
                rx="16"
                fill="#FFFFFF"
                stroke="#D7C3A5"
                strokeWidth="2"
              />

              {/* Subtle inner walking pathways */}
              <path
                d="M 110 156 L 235 134 L 220 68"
                fill="none"
                stroke="#E9DDCA"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 88 214 L 110 156"
                fill="none"
                stroke="#E9DDCA"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 268 95 L 328 74"
                fill="none"
                stroke="#E9DDCA"
                strokeWidth="4"
                strokeDasharray="5 4"
              />

              {/* Main Road at the bottom */}
              <rect x="0" y="254" width="400" height="24" fill="#E9DDCA" />
              <line
                x1="0"
                y1="266"
                x2="400"
                y2="266"
                stroke="#F7F3EC"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />

              {/* Labels inside SVG */}
              <text
                x="38"
                y="45"
                fill="#8A7D6D"
                fontSize="10"
                fontWeight="600"
                letterSpacing="0.8"
              >
                {copy.premisesSvgLabel}
              </text>
              <text
                x="14"
                y="270"
                fill="#766959"
                fontSize="9.5"
                fontWeight="600"
                letterSpacing="0.8"
              >
                {copy.mainRoadSvgLabel}
              </text>
            </svg>

            {/* Compass Indicator */}
            <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[11px] font-semibold text-[#766959] border border-[#E6D9C7]">
              <Compass className="h-3.5 w-3.5 text-[#B98539]" aria-hidden="true" />
              <span>{copy.compassNorth}</span>
            </div>

            {/* Interactive Location Pins */}
            {locations.map((loc) => {
              const isSelected = loc.id === selectedLocation?.id;
              const locName = loc.name[language];
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedId(loc.id)}
                  style={{
                    left: `${loc.mapPosition.x}%`,
                    top: `${loc.mapPosition.y}%`,
                  }}
                  aria-pressed={isSelected}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs sm:text-[13px] font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap ${
                    isSelected
                      ? 'z-20 scale-105 bg-[#B98539] text-white shadow-md ring-2 ring-white'
                      : 'z-10 bg-white/95 text-[#4A3525] border border-[#D7C3A5] shadow-sm hover:border-[#B98539] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <MapPin
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isSelected ? 'text-white' : 'text-[#B98539]'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{locName}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Location Quick Card */}
          {selectedLocation && (
            <div className="rounded-2xl border border-[#E6D9C7] bg-[#FAF7F2] p-4">
              <div className="flex items-start gap-3.5">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#E9DDCA]">
                  <TempleImage
                    src={selectedLocation.image}
                    alt={selectedLocation.name[language]}
                    className="h-full w-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold text-[#4A3525]">
                    {selectedLocation.name[language]}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#8E6120] tabular-nums">
                    {selectedLocation.isInsidePremises
                      ? insidePremisesLabel
                      : nearbyLabel}
                    {selectedLocation.distanceLabel
                      ? ` · ${isDemoMode ? `${sampleDistancePrefix} ` : ''}${selectedLocation.distanceLabel}`
                      : ''}
                    {selectedLocation.walkingTimeLabel
                      ? ` · ${selectedLocation.walkingTimeLabel}`
                      : ''}
                  </p>
                  <p className="mt-1 text-sm text-[#5F554A] line-clamp-2">
                    {selectedLocation.shortDescription[language]}
                  </p>
                </div>
              </div>

              <div className="mt-3.5 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDirectionsClick}
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#B98539] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#A3732E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap"
                >
                  <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{copy.getDirections}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 opacity-85" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectForDetails(selectedLocation);
                  }}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#E6D9C7] bg-white px-4 py-2.5 text-sm font-semibold text-[#4A3525] transition-colors hover:bg-[#F0E6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap"
                >
                  {copy.viewDetailsBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
