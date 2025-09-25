
// Main App.tsx for Soul Link Wellness Platform

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './soul-linklwellness-platform/pages/LoginPage';
import DashboardPage from './soul-linklwellness-platform/pages/DashboardPage';
import AdminPage from './soul-linklwellness-platform/pages/AdminPage';
import OnboardingPage from './soul-linklwellness-platform/pages/OnboardingPage';
import ProfilePage from './soul-linklwellness-platform/pages/ProfilePage';
import { UserProvider, useUser } from './soul-linklwellness-platform/hooks/useUser';

const App: React.FC = () => {
  return (
    <UserProvider>
      <AuthRouter />
    </UserProvider>
  );
};

const AuthRouter: React.FC = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {user ? (
          // Protected routes for logged-in users
          <>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          // Redirect to login if user is not logged in
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;