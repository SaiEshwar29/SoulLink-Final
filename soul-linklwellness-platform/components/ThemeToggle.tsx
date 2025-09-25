
import React, { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme.tsx';
import Icon from './Icon';

declare const lucide: any;

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, [theme]);

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-900 transition-colors"
            aria-label="Toggle theme"
        >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-5 h-5" />
        </button>
    );
};

export default ThemeToggle;