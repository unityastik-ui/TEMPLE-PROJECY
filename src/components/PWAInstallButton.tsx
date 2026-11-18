import { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { UiTranslations } from '../data/translations';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  copy: UiTranslations['install'];
}

const isStandaloneDemo =
  typeof __IS_STANDALONE_DEMO__ !== 'undefined' && __IS_STANDALONE_DEMO__;

export function PWAInstallButton({ copy }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isStandaloneDemo || isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E6D9C7] bg-[#FAF7F2] px-4 py-2 text-sm font-semibold text-[#4A3525] transition-colors hover:bg-[#E9DDCA] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap"
      >
        <Download className="h-4 w-4 shrink-0 text-[#8E6120]" aria-hidden="true" />
        <span>{copy.buttonLabel}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E6D9C7] bg-[#FAF7F2] px-4 py-2 text-sm font-semibold text-[#4A3525] transition-colors hover:bg-[#E9DDCA] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] whitespace-nowrap"
        >
          <Share className="h-4 w-4 shrink-0 text-[#8E6120]" aria-hidden="true" />
          <span>{copy.iosButtonLabel}</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#4A3525]/45 backdrop-blur-[2px] sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-t-3xl sm:rounded-2xl border border-[#E6D9C7] bg-white p-5 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-2">
                <h3
                  id="ios-install-title"
                  className="font-display text-xl font-bold text-[#4A3525]"
                >
                  {copy.iosModalTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label={copy.closeLabel}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#4A3525] hover:bg-[#F0E6D8]"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <ol className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#5F554A] list-decimal list-inside">
                <li>{copy.iosStep1}</li>
                <li>{copy.iosStep2}</li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#B98539] px-4 py-2.5 text-[15px] font-semibold text-white hover:bg-[#A3732E]"
              >
                {copy.closeLabel}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}
