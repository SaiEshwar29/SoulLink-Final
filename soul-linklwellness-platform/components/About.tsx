import React from 'react';
import { motion } from 'framer-motion';
import { AboutIllustration } from './icons/illustrations';
import { WavyUnderline } from './WavyUnderline';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

export const About: React.FC = () => {
  return (
    <motion.section 
      id="about" 
      className="py-20 md:py-32 dark-grid-background"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <AboutIllustration />
        </motion.div>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-brand-light mb-6 leading-tight">
            SoulLink – Your Bridge to <br />
            <span className="relative">
              Inner Strength
              <WavyUnderline className="absolute -bottom-2 left-0 w-full h-auto text-brand-red" />
            </span>
          </h2>
          <p className="text-lg text-brand-light/80 max-w-xl mx-auto md:mx-0">
            SoulLink is a compassionate platform built to support mental and emotional well-being.
          </p>
          <p className="text-lg text-brand-light/80 max-w-xl mx-auto md:mx-0 mt-4">
            Through our AI companion Aastha, we provide a safe space for sharing, healing, and growth — anytime, anywhere.
          </p>
        </div>
      </div>
    </motion.section>
  );
};