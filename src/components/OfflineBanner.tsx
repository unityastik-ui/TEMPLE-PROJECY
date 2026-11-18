import { WifiOff } from 'lucide-react';
import { UiTranslations } from '../data/translations';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface OfflineBannerProps {
  copy: UiTranslations['offline'];
}

export function OfflineBanner({ copy }: OfflineBannerProps) {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-start gap-2.5 rounded-2xl border border-[#E6D9C7] bg-[#F0E6D8] px-4 py-3 text-sm sm:text-[15px] text-[#4A3525]"
    >
      <WifiOff
        className="mt-0.5 h-4 w-4 shrink-0 text-[#8E6120]"
        aria-hidden="true"
      />
      <div>
        <span className="font-semibold">{copy.title}</span>{' '}
        <span className="text-[#5F554A]">{copy.description}</span>
      </div>
    </div>
  );
}
