import React from 'react';

interface HarunaLogoProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const HarunaLogo: React.FC<HarunaLogoProps> = ({ className = '', size = 'md' }) => {
  const iconClass = size === 'sm' ? 'w-6 h-5' : 'w-[28px] h-[22px]';
  const textClass = size === 'sm' ? 'text-[16px]' : 'text-[18px]';

  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        viewBox="0 0 36 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClass}
        aria-hidden="true"
      >
        <path
          d="M7.5 2L1.5 26H9.2L15.2 2H7.5Z"
          fill="#0D1117"
        />
        <path
          d="M26.8 2L20.8 26H28.5L34.5 2H26.8Z"
          fill="#0D1117"
        />
        <path
          d="M11.8 11.2L10.3 17.2H24.2L25.7 11.2H11.8Z"
          fill="#0D1117"
        />
      </svg>
      <span className={`${textClass} font-extrabold tracking-[0.04em] text-[#0D1117] leading-none`}>
        HARUNA
      </span>
    </span>
  );
};
