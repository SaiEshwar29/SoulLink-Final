import React from 'react';
import { motion } from 'framer-motion';
import { OurApproachIllustration } from './icons/illustrations';

export const OurApproach: React.FC = () => {
  return (
    <section className="bg-brand-red text-brand-light py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            A Gentle Approach is Essential!
          </h2>
          <p className="text-lg mb-4">
            Effective support is key to our mission. We focus on transparent interactions, ensuring we align with your needs and provide a space that is both safe and empowering.
          </p>
          <p className="text-lg">
            We begin with the user — discovering their needs and delivering accordingly.
          </p>
        </motion.div>
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <OurApproachIllustration />
        </motion.div>
      </div>
    </section>
  );
};