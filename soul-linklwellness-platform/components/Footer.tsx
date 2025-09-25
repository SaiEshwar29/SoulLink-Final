import React from 'react';
import { FacebookIcon, TwitterIcon, LinkedInIcon } from './icons/SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark-secondary text-brand-light">
      <div className="container mx-auto px-6 pt-12">
        <div className="flex justify-center mb-8">
          <a href="#" className="mx-4 text-brand-light/70 hover:text-brand-light transition-colors"><FacebookIcon /></a>
          <a href="#" className="mx-4 text-brand-light/70 hover:text-brand-light transition-colors"><TwitterIcon /></a>
          <a href="#" className="mx-4 text-brand-light/70 hover:text-brand-light transition-colors"><LinkedInIcon /></a>
        </div>
      </div>
      <div className="bg-brand-light text-brand-dark mt-8 py-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-bold">250 Executive Park Blvd, Suite 3400</h4>
            <p className="text-sm">San Francisco CA 94134</p>
          </div>
          <div className="flex justify-center">
            <h4 className="font-bold">Your Logo</h4>
          </div>
          <div className="md:text-right">
            <h4 className="font-bold">+1-555-555-5556</h4>
            <p className="text-sm">info@yourcompany.example.com</p>
          </div>
        </div>
        <div className="container mx-auto px-6 text-center text-brand-dark/60 text-sm mt-8 border-t border-brand-dark/10 pt-6">
          Copyright © {new Date().getFullYear()} Company name
        </div>
      </div>
    </footer>
  );
};