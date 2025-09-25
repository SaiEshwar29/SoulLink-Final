
// Main App.tsx for Soul Link Wellness Platform

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AasthaApp from './soul-linklwellness-platform/aastha/App';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aastha" element={<AasthaApp />} />
      </Routes>
    </HashRouter>
  );
};

export default App;