import React from 'react';

interface ChaiMarkProps {
  className?: string;
  size?: number;
}

export const ChaiMark: React.FC<ChaiMarkProps> = ({ className = '', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
      aria-label="Code & Chai logo mark"
      role="img"
    >
      {/* Three Rising Steam Wisps */}
      <path
        className="steam-1 stroke-chai-500 dark:stroke-chai-400"
        d="M38 35C38 30 42 28 42 22C42 16 38 14 38 8"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="steam-2 stroke-chai-500 dark:stroke-chai-400"
        d="M50 32C50 27 54 25 54 18C54 11 50 9 50 3"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="steam-3 stroke-chai-500 dark:stroke-chai-400"
        d="M62 35C62 30 66 28 66 22C66 16 62 14 62 8"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Chai Cup Body */}
      {/* Cup Outline & Fill */}
      <path
        d="M25 45C25 68 35 78 50 78C65 78 75 68 75 45H25Z"
        className="fill-cream dark:fill-espresso stroke-ink dark:stroke-parchment"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      
      {/* Chai Liquid inside Cup (decorative line) */}
      <path
        d="M27 49C35 52 45 46 55 49C65 52 71 49 73 49"
        className="stroke-chai-500 dark:stroke-chai-400"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cup Handle */}
      <path
        d="M75 52C83 52 87 56 87 61C87 66 82 70 75 70"
        className="stroke-ink dark:stroke-parchment"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cup Saucer Plate */}
      <path
        d="M18 85C35 88 65 88 82 85"
        className="stroke-ink dark:stroke-parchment"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Small terminal prompt chevron on cup (developer touch!) */}
      <path
        d="M44 60L49 65L44 70"
        className="stroke-brew-500 dark:stroke-brew-400"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="52"
        y1="70"
        x2="59"
        y2="70"
        className="stroke-brew-500 dark:stroke-brew-400"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
