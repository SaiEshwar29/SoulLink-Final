import React from 'react';

const iconWrapper = (path: React.ReactNode) => (
  <div className="w-12 h-12 flex items-center justify-center rounded-md bg-brand-red/10 mb-4">
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      {path}
    </svg>
  </div>
);

export const ChatIcon = () => iconWrapper(
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.125 1.125 0 01-1.59 0l-3.72-3.72A1.125 1.125 0 013 16.897V8.511c0-.97.616-1.813 1.5-2.097m6.002 0l-2.062 2.062a1.125 1.125 0 000 1.591l2.062 2.062M18 10.5h.008v.008H18V10.5z" />
);

export const DiaryIcon = () => iconWrapper(
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
);

export const ProblemIcon = () => iconWrapper(
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
);

export const MoodIcon = () => iconWrapper(
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z" />
);

export const ListenIcon = () => iconWrapper(
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h.01M6 10h.01M9 10h.01M3.001 13.68C4.093 15.032 5.66 16 7.5 16s3.407-.968 4.499-2.32M3 7h.01M6 7h.01M9 7h.01M12 21v-3.75m-3.75.15a9.003 9.003 0 0112 0M3 3.75c.607.607 1.464 1.007 2.41 1.226C6.67 5.252 7.82 5.5 9 5.5s2.33.248 3.59.726c.946.219 1.803.619 2.41 1.226M15 7h.01M18 7h.01M21 7h.01M15 10h.01M18 10h.01M21 10h.01" />
);

export const MusicIcon = () => iconWrapper(
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 15.219a2.25 2.25 0 01-1.07-1.916V9.612a2.25 2.25 0 011.07-1.916l7.5-4.615a2.25 2.25 0 012.36 0L19.5 7.54z" />
);