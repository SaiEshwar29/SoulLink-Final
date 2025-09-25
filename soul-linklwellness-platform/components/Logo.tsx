import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <span className="text-2xl font-bold text-slate-800">SoulLink</span>
    </div>
  );
};

export default Logo;