
import React from 'react';

export const AsthaAvatar: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-light-accent/20 dark:bg-dark-accent/20 border-2 border-light-accent dark:border-dark-accent flex items-center justify-center ${className}`}>
    <svg 
        viewBox="0 0 24 24" 
        className="w-6 h-6 text-light-accent dark:text-dark-accent"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 18.5C18.5 16.567 15.6863 15 12 15C8.31371 15 5.5 16.567 5.5 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);
