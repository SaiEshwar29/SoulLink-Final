import React from 'react';

export const WavyUnderline: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0,5 Q25,-2 50,5 T100,5" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
);
