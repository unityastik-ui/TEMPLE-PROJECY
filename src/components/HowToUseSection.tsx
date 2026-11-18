import { Compass, Info, QrCode, RefreshCw } from 'lucide-react';
import { UiTranslations } from '../data/translations';
import { PWAInstallButton } from './PWAInstallButton';

interface HowToUseSectionProps {
  copy: UiTranslations['howToUse'];
  installCopy: UiTranslations['install'];
}

const STEP_ICONS = [QrCode, Compass, RefreshCw] as const;

export function HowToUseSection({ copy, installCopy }: HowToUseSectionProps) {
  return (
    <section aria-labelledby="how-to-use-heading" className="pt-2">
      <div className="rounded-2xl border border-[#E6D9C7] bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(74,53,37,0.04)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0E6D8] text-[#B98539]"
              aria-hidden="true"
            >
              <QrCode className="h-5 w-5" />
            </div>

            <div>
              <p className="font-sans text-xs font-bold tracking-wider text-[#766959]">
                {copy.kicker}
              </p>
              <h2
                id="how-to-use-heading"
                className="mt-0.5 font-display text-xl sm:text-2xl font-bold text-[#4A3525] leading-snug"
              >
                {copy.heading}
              </h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#5F554A]">
                {copy.intro}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <PWAInstallButton copy={installCopy} />
          </div>
        </div>

        <div className="mt-5 divide-y divide-[#E6D9C7] border-t border-[#E6D9C7] md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
          {copy.steps.map((step, index) => {
            const StepIcon = STEP_ICONS[index] ?? QrCode;
            return (
              <div
                key={step.title}
                className="py-4 first:pt-4 last:pb-1 md:px-5 md:py-5 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex items-center gap-2 text-[#8E6120]">
                  <StepIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <h3 className="font-sans text-base font-bold text-[#4A3525] leading-snug">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#5F554A]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#F0E6D8] px-4 py-3 text-[15px] leading-relaxed text-[#4A3525]">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0 text-[#8E6120]"
            aria-hidden="true"
          />
          <p>{copy.reassuringTip}</p>
        </div>
      </div>
    </section>
  );
}
