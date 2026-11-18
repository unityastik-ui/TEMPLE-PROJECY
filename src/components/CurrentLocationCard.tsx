import { LocateFixed, Map, MapPin } from 'lucide-react';
import { DemoStartingPoint } from '../data/demoLocations';
import { UiTranslations } from '../data/translations';
import { GpsStatus, Language } from '../types/temple';

interface CurrentLocationCardProps {
  gpsStatus: GpsStatus;
  locationLabel: string | null;
  locationHelper: string | null;
  copy: UiTranslations['currentLocation'];
  demoCopy?: UiTranslations['demoLocation'];
  isStandaloneDemo?: boolean;
  isDemoModeActive?: boolean;
  activeDemoPointId?: string | null;
  demoPoints?: DemoStartingPoint[];
  language?: Language;
  onSelectDemoPoint?: (pointId: string) => void;
  onDetectLocation: () => void;
  onOpenMap: () => void;
}

export function CurrentLocationCard({
  gpsStatus,
  locationLabel,
  locationHelper,
  copy,
  demoCopy,
  isStandaloneDemo = false,
  isDemoModeActive = false,
  activeDemoPointId = null,
  demoPoints = [],
  language = 'en',
  onSelectDemoPoint,
  onDetectLocation,
  onOpenMap,
}: CurrentLocationCardProps) {
  const isRequesting = gpsStatus === 'requesting';

  const getButtonLabel = () => {
    if (isRequesting) return copy.detectingBtn;
    if (!isDemoModeActive && gpsStatus === 'granted') return copy.refreshBtn;
    if (!isDemoModeActive && (gpsStatus === 'denied' || gpsStatus === 'error')) {
      return copy.retryBtn;
    }
    return copy.detectBtn;
  };

  return (
    <section
      aria-labelledby="current-location-heading"
      className="rounded-2xl border border-[#E6D9C7] bg-white p-4 sm:p-5 shadow-[0_2px_12px_rgba(74,53,37,0.04)]"
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0E6D8] text-[#B98539]"
          aria-hidden="true"
        >
          <MapPin className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <h2
              id="current-location-heading"
              className="font-sans text-xs font-bold tracking-wider text-[#766959]"
            >
              {copy.heading}
            </h2>
            {isStandaloneDemo && demoCopy && (
              <span className="text-xs font-semibold text-[#8E6120]">
                · {isDemoModeActive ? demoCopy.demoTag : gpsStatus === 'granted' ? demoCopy.liveGpsTag : ''}
              </span>
            )}
          </div>

          {isDemoModeActive && locationLabel ? (
            <div className="mt-1">
              <p className="text-lg font-semibold text-[#4A3525] leading-snug">
                {locationLabel}
              </p>
              {locationHelper && (
                <p className="text-[15px] text-[#5F554A] mt-0.5 leading-snug">
                  {locationHelper}
                </p>
              )}
              {demoCopy && (
                <p className="text-xs sm:text-sm text-[#766959] mt-1 leading-snug">
                  {demoCopy.helperNote}
                </p>
              )}
            </div>
          ) : gpsStatus === 'granted' && locationLabel ? (
            <div className="mt-1">
              <p className="text-lg font-semibold text-[#4A3525] leading-snug">
                {locationLabel}
              </p>
              {locationHelper && (
                <p className="text-[15px] text-[#5F554A] mt-0.5 leading-snug">
                  {locationHelper}
                </p>
              )}
            </div>
          ) : gpsStatus === 'requesting' ? (
            <p className="mt-1 text-base font-medium text-[#4A3525]">
              {copy.requesting}
            </p>
          ) : gpsStatus === 'denied' ? (
            <div className="mt-1">
              <p className="text-base font-semibold text-[#4A3525]">
                {copy.deniedTitle}
              </p>
              <p className="text-[15px] text-[#5F554A] mt-0.5 leading-snug">
                {copy.deniedDetail}
              </p>
            </div>
          ) : gpsStatus === 'unavailable' || gpsStatus === 'error' ? (
            <div className="mt-1">
              <p className="text-base font-semibold text-[#4A3525]">
                {copy.unavailableTitle}
              </p>
              <p className="text-[15px] text-[#5F554A] mt-0.5 leading-snug">
                {copy.unavailableDetail}
              </p>
            </div>
          ) : (
            <p className="mt-1 text-[15px] text-[#5F554A] leading-relaxed">
              {copy.idlePrompt}
            </p>
          )}
        </div>
      </div>

      {/* Presentation Demo Starting Point Selector (only rendered in standalone demo HTML) */}
      {isStandaloneDemo && demoPoints.length > 0 && onSelectDemoPoint && demoCopy && (
        <div className="mt-3.5 pt-3 border-t border-[#E6D9C7]/70">
          <p className="text-xs font-semibold text-[#766959] mb-2">
            {demoCopy.selectorLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {demoPoints.map((pt) => {
              const isSelected = isDemoModeActive && activeDemoPointId === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => onSelectDemoPoint(pt.id)}
                  aria-pressed={isSelected}
                  className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#4A3525] text-white'
                      : 'border border-[#E6D9C7] bg-[#F7F3EC] text-[#4A3525] hover:bg-[#E9DDCA]'
                  }`}
                >
                  {pt.shortLabel[language]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={onDetectLocation}
          disabled={isRequesting}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#B98539] px-5 py-3 text-sm sm:text-[15px] font-semibold text-white transition-colors hover:bg-[#A3732E] active:scale-[0.99] disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap"
        >
          <LocateFixed className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{getButtonLabel()}</span>
        </button>

        <button
          type="button"
          onClick={onOpenMap}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#E6D9C7] bg-[#F0E6D8] px-5 py-3 text-sm sm:text-[15px] font-semibold text-[#4A3525] transition-colors hover:bg-[#E9DDCA] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap"
        >
          <Map className="h-4 w-4 shrink-0 text-[#8E6120]" aria-hidden="true" />
          <span>{copy.viewMapBtn}</span>
        </button>
      </div>
    </section>
  );
}
