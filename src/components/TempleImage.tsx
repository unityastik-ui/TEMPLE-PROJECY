import { useState } from 'react';
import { Landmark } from 'lucide-react';

interface TempleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function TempleImage({ src, alt, className = '' }: TempleImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F0E6D8] to-[#E9DDCA] text-[#8E6120] p-3 ${className}`}
      >
        <Landmark className="w-7 h-7 opacity-75" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
}
