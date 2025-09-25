
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Soul Link Logo"
  >
    <path
      d="M50 15C35 15 25 30 25 45C25 65 40 85 50 85C60 85 75 65 75 45C75 30 65 15 50 15Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50 55C55 55 60 50 60 45C60 40 55 35 50 35C45 35 40 40 40 45C40 50 45 55 50 55Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M35 25C30 20 25 20 20 25"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
     <path
      d="M65 25C70 20 75 20 80 25"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);