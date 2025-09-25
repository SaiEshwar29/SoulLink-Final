
// Main App.tsx for Soul Link Wellness Platform

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './soul-linklwellness-platform/pages/LoginPage';
import DashboardPage from './soul-linklwellness-platform/pages/DashboardPage';
import AdminPage from './soul-linklwellness-platform/pages/AdminPage';
import OnboardingPage from './soul-linklwellness-platform/pages/OnboardingPage';
import ProfilePage from './soul-linklwellness-platform/pages/ProfilePage';
import AasthaApp from './soul-linklwellness-platform/aastha/App';
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Soul Link...</p>
        </div>
      </div>
    );
  }
  
  return (
    <HashRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        
        {/* Protected routes for authenticated users */}
        {user ? (
          <>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/aastha" element={<AasthaApp />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          // Redirect to login if user is not logged in
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;