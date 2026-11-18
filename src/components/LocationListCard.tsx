import { ChevronRight } from 'lucide-react';
import { Language, LocationWithDistance } from '../types/temple';
import { TempleImage } from './TempleImage';

interface LocationListCardProps {
  location: LocationWithDistance;
  language: Language;
  insidePremisesLabel: string;
  nearbyLabel: string;
  isDemoMode?: boolean;
  sampleDistancePrefix?: string;
  onSelect: (location: LocationWithDistance) => void;
}

export function LocationListCard({
  location,
  language,
  insidePremisesLabel,
  nearbyLabel,
  isDemoMode = false,
  sampleDistancePrefix = 'Sample distance:',
  onSelect,
}: LocationListCardProps) {
  const locationName = location.name[language];
  const categoryName = location.category[language];

  return (
    <button
      type="button"
      onClick={() => onSelect(location)}
      className="group flex w-full items-center gap-3.5 rounded-2xl border border-[#E6D9C7] bg-white p-3 sm:p-3.5 text-left transition-colors hover:border-[#B98539]/60 hover:bg-[#FAF7F2] active:scale-[0.995] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525]"
    >
      <div className="h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-xl bg-[#F0E6D8]">
        <TempleImage
          src={location.image}
          alt={locationName}
          className="h-full w-full transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg sm:text-[19px] font-bold text-[#4A3525] leading-snug">
          {locationName}
        </h3>

        <p className="mt-0.5 text-sm font-medium text-[#8E6120] tabular-nums truncate">
          {location.distanceLabel ? (
            <>
              <span>
                {isDemoMode ? `${sampleDistancePrefix} ` : ''}
                {location.distanceLabel}
              </span>
              {location.walkingTimeLabel && (
                <span> · {location.walkingTimeLabel}</span>
              )}
              <span className="text-[#8A7D6D]"> · {categoryName}</span>
            </>
          ) : (
            <span className="text-[#766959]">
              {categoryName} ·{' '}
              {location.isInsidePremises ? insidePremisesLabel : nearbyLabel}
            </span>
          )}
        </p>

        <p className="mt-1 text-[14px] sm:text-[15px] leading-snug text-[#5F554A] line-clamp-2">
          {location.shortDescription[language]}
        </p>
      </div>

      <ChevronRight
        className="h-5 w-5 shrink-0 text-[#8A7D6D] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#4A3525]"
        aria-hidden="true"
      />
    </button>
  );
}
