import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Soul Link
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your Mental Wellness Companion
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Companion</h3>
            <p className="text-gray-600">Chat with Aastha, your AI wellness buddy</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">Connect with others in our support forum</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Book Sessions</h3>
            <p className="text-gray-600">Schedule counseling appointments</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <a 
            href="/auth.html" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          <div className="text-sm text-gray-500">
            <a href="/forum.html" className="hover:text-blue-600">Forum</a> • 
            <a href="/about.html" className="hover:text-blue-600 ml-2">About</a> • 
            <a href="/resources.html" className="hover:text-blue-600 ml-2">Resources</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
