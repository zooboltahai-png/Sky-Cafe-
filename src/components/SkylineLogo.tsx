import React from 'react';

interface SkylineLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
}

export const SkylineLogo: React.FC<SkylineLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-stone-900',
  subtextColor = 'text-stone-500'
}) => {
  const sizeMap = {
    sm: { img: 'w-9 h-9', text: 'text-lg', sub: 'text-[10px]' },
    md: { img: 'w-11 h-11', text: 'text-xl sm:text-2xl', sub: 'text-[11px]' },
    lg: { img: 'w-16 h-16', text: 'text-2xl sm:text-3xl', sub: 'text-xs' },
    xl: { img: 'w-24 h-24', text: 'text-3xl sm:text-4xl', sub: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official circular badge logo */}
      <div className={`relative shrink-0 ${currentSize.img} rounded-full overflow-hidden shadow-xs ring-1 ring-brand-green-dark/30 bg-brand-green/20`}>
        <img
          src="/images/brand/skyline_cafe_logo.png"
          alt="Skyline Cafe Malta"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-editorial font-bold tracking-tight ${textColor} ${currentSize.text} transition-colors`}>
              Skyline Cafe
            </span>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-brand-green/60 text-brand-burgundy tracking-wider border border-brand-green-dark/30">
              Malta
            </span>
          </div>
          <span className={`uppercase font-medium tracking-widest ${subtextColor} ${currentSize.sub} mt-1`}>
            Sliema Waterfront
          </span>
        </div>
      )}
    </div>
  );
};
