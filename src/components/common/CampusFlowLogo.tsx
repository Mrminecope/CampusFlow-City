import React from 'react';

interface CampusFlowLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  lightText?: boolean;
}

export const CampusFlowLogo: React.FC<CampusFlowLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  lightText = false,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base leading-none',
    md: 'text-lg leading-tight font-extrabold',
    lg: 'text-2xl leading-tight font-extrabold',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-tight',
    md: 'text-[10px] tracking-tight font-medium',
    lg: 'text-xs tracking-normal font-medium',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Supplied CampusFlow Logo Icon Asset */}
      <div className={`relative shrink-0 ${iconSizes[size]} flex items-center justify-center overflow-hidden rounded-md`}>
        <img
          src="/CampusFlow-icon.png"
          alt="CampusFlow Logo"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to jpeg asset if needed
            (e.currentTarget as HTMLImageElement).src = '/CampusFlow.logo.jpeg';
          }}
        />
      </div>

      {/* Brand Typography matching CampusFlow design asset */}
      <div className="flex flex-col text-left">
        <span
          className={`font-black tracking-tight font-sans ${titleSizes[size]} ${
            lightText ? 'text-white' : 'text-[#0a2540]'
          }`}
        >
          CampusFlow
        </span>
        {showSubtitle && (
          <span
            className={`font-medium ${subSizes[size]} ${
              lightText ? 'text-blue-200' : 'text-[#1e3a8a]'
            }`}
          >
            University Admissions Journey
          </span>
        )}
      </div>
    </div>
  );
};

