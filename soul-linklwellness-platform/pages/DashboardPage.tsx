
import React, { useEffect } from 'react';
import Logo from '../components/Logo';
import Icon from '../components/Icon';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { supabase } from '../components/supabaseClient';

declare const lucide: any;

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const firstName = user?.name.split(' ')[0] || 'User';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };
  
  useEffect(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }, []);

  const featureCards = [
    { icon: 'calendar-clock', title: 'Upcoming Appointments', description: 'Review your scheduled consultations.', buttonText: 'View Schedule', href: '/booking.html' },
    { icon: 'clipboard-check', title: 'Wellness Check-in', description: 'Take a moment to reflect on your well-being.', buttonText: 'Start Check-in', href: '/checkin.html' },
    { icon: 'calendar-plus', title: 'Book a Consultation', description: 'Schedule a session with a professional.', buttonText: 'Book Now', href: '/booking.html' },
    { icon: 'library', title: 'Resource Hub', description: 'Explore articles, videos, and tools for wellness.', buttonText: 'Explore Hub', href: '/resources.html' },
    { icon: 'users', title: 'Peer Support Forum', description: 'Connect with a community that understands.', buttonText: 'Join Forum', href: '/forum.html' },
];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo />
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="font-medium text-sky-600">Dashboard</Link>
              <Link to="/profile" className="font-medium text-slate-600 hover:text-sky-600">Profile</Link>
            </nav>
            <div className="flex items-center space-x-4">
                <button onClick={handleLogout} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
                Logout
                </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-slate-800">Welcome back, {firstName}!</h1>
          <p className="mt-2 text-lg text-slate-500">We're here to support you on your wellness journey.</p>
        </section>

        <section className="mb-12">
            <div className="bg-gradient-to-br from-sky-100 to-sky-50 p-8 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-bold text-sky-900">Aastha Wellness Hub</h2>
                    <p className="mt-3 text-sky-800/80">Your personal AI-powered companion, Aastha, is here to listen and provide guidance 24/7. Start a conversation whenever you need to talk.</p>
                </div>
                <Link to="/aastha" className="bg-sky-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-sky-700 transition-transform hover:scale-105 transform inline-block">
                    Chat with Aastha
                </Link>
            </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center">
                    <Icon name={card.icon} className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-grow mt-4">
                  <h3 className="text-xl font-bold text-slate-800">{card.title}</h3>
                  <p className="mt-2 text-slate-500">{card.description}</p>
                </div>
                <div className="mt-6">
                  <a href={card.href || '#'} className="font-bold text-sky-600 hover:text-sky-500">{card.buttonText}</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} SoulLink. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-slate-800">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;