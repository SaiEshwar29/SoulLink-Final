import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Logo } from './icons/Logo';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'FAQ', href: '#faq' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinkItems = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          onClick={onClick}
          className="text-brand-light hover:text-brand-red transition-colors duration-300 py-2 text-center text-lg md:text-base"
        >
          {link.name}
        </a>
      ))}
    </>
  );

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-sm' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="flex items-center space-x-2">
          <Logo className="h-8 w-8 text-brand-red" />
          <span className="font-bold text-xl text-brand-light">Soul Link</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLinkItems />
        </nav>

        <div className="flex items-center">
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-brand-light"
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-brand-dark z-50 flex flex-col items-center justify-center">
           <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-brand-light"
              aria-label="Close menu"
            >
              <CloseIcon className="h-8 w-8" />
            </button>
          <nav className="flex flex-col space-y-6 text-2xl font-bold">
            <NavLinkItems onClick={() => setIsMenuOpen(false)} />
          </nav>
        </div>
      )}
    </motion.header>
  );
};