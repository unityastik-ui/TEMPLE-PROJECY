import { useEffect } from 'react';
import { Map, MapPin, WifiOff, X } from 'lucide-react';
import { UiTranslations } from '../data/translations';
import { Language, LocationWithDistance } from '../types/temple';

interface OfflineDirectionsModalProps {
  location: LocationWithDistance | null;
  language: Language;
  copy: UiTranslations['offlineDirections'];
  isDemoMode: boolean;
  onClose: () => void;
  onOpenMapForLocation: (locationId: string) => void;
}

export function OfflineDirectionsModal({
  location,
  language,
  copy,
  isDemoMode,
  onClose,
  onOpenMapForLocation,
}: OfflineDirectionsModalProps) {
  useEffect(() => {
    if (!location) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [location, onClose]);

  if (!location) return null;

  const placeName = location.name[language];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-[#4A3525]/45 backdrop-blur-[2px] sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offline-directions-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl sm:rounded-2xl border border-[#E6D9C7] bg-white p-5 sm:p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0E6D8] text-[#B98539]"
              aria-hidden="true"
            >
              <WifiOff className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-[#766959]">
                {copy.kicker}
              </p>
              <h2
                id="offline-directions-title"
                className="font-display text-xl font-bold text-[#4A3525]"
              >
                {placeName}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeBtn}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#4A3525] hover:bg-[#F0E6D8]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-base leading-relaxed text-[#4A3525]">
          {copy.message}
        </p>

        <div className="mt-3 rounded-xl border border-[#E6D9C7] bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#5F554A] space-y-1">
          <p className="flex items-center gap-1.5 font-medium text-[#4A3525]">
            <MapPin className="h-4 w-4 text-[#B98539] shrink-0" aria-hidden="true" />
            <span>
              {location.latitude.toFixed(4)}° N, {location.longitude.toFixed(4)}° E
            </span>
          </p>
          {location.distanceLabel && (
            <p className="tabular-nums text-[#8E6120]">
              {isDemoMode ? `${copy.sampleDistancePrefix} ` : ''}
              {location.distanceLabel}
              {location.walkingTimeLabel ? ` · ${location.walkingTimeLabel}` : ''}
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => {
              const id = location.id;
              onClose();
              onOpenMapForLocation(id);
            }}
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#B98539] px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#A3732E] whitespace-nowrap"
          >
            <Map className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{copy.viewMapBtn}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#E6D9C7] bg-[#F7F3EC] px-5 py-2.5 text-[15px] font-semibold text-[#4A3525] hover:bg-[#E9DDCA] whitespace-nowrap"
          >
            {copy.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
