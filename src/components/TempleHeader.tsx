import { Language } from '../types/temple';

interface TempleHeaderProps {
  title: string;
  subtitle: string;
  language: Language;
  languageToggleLabel: string;
  onChangeLanguage: (language: Language) => void;
}

export function TempleHeader({
  title,
  subtitle,
  language,
  languageToggleLabel,
  onChangeLanguage,
}: TempleHeaderProps) {
  return (
    <header className="border-b border-[#E6D9C7] bg-[#F7F3EC]">
      <div className="mx-auto max-w-5xl px-4 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0E6D8] border border-[#E6D9C7] text-[#B98539]"
            aria-hidden="true"
          >
            {/* Minimal traditional Indian temple shikhara & kalash emblem */}
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 3.5V6.5M16 6.5C14.7 6.5 13.8 7.4 13.8 8.5C13.8 9.2 14.2 9.8 14.8 10.1L11.5 15.5H20.5L17.2 10.1C17.8 9.8 18.2 9.2 18.2 8.5C18.2 7.4 17.3 6.5 16 6.5Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 15.5H23.5M10 15.5V25.5M22 15.5V25.5M13.8 25.5V20.5C13.8 19.3 14.8 18.3 16 18.3C17.2 18.3 18.2 19.3 18.2 20.5V25.5M6.5 25.5H25.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <h1 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-[#4A3525] leading-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-[15px] text-[#5F554A] leading-snug mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Simple English / Hindi language toggle */}
        <div
          role="group"
          aria-label={languageToggleLabel}
          className="inline-flex shrink-0 items-center rounded-xl border border-[#E6D9C7] bg-[#F0E6D8] p-1"
        >
          <button
            type="button"
            onClick={() => onChangeLanguage('en')}
            aria-pressed={language === 'en'}
            className={`min-h-[36px] min-w-[44px] rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] ${
              language === 'en'
                ? 'bg-[#B98539] text-white shadow-xs'
                : 'text-[#4A3525] hover:bg-[#E9DDCA]/70'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => onChangeLanguage('hi')}
            aria-pressed={language === 'hi'}
            className={`min-h-[36px] min-w-[48px] rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3525] ${
              language === 'hi'
                ? 'bg-[#B98539] text-white shadow-xs'
                : 'text-[#4A3525] hover:bg-[#E9DDCA]/70'
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>
    </header>
  );
}
