import React from 'react';
import { motion } from 'framer-motion';
import { HeroIllustration } from './icons/illustrations';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-brand-red text-brand-light overflow-hidden">
      <div className="container mx-auto px-6 py-32 md:py-40 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 text-center md:text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-black mb-4 leading-tight"
            variants={itemVariants}
          >
            Unlink the pain, <br />
            Embrace healing <br />
            – with Soul Link <br />
            by your side
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl max-w-md mx-auto md:mx-0 mb-8"
            variants={itemVariants}
          >
            Because every soul deserves to be heard, Soul Link listens when you need it most.
          </motion.p>
          <motion.a
            href="#features"
            className="inline-block bg-brand-dark text-brand-light font-bold py-3 px-8 rounded-md text-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            Our solutions
          </motion.a>
        </motion.div>
        
        <motion.div 
          className="w-full md:w-1/2 mt-12 md:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <HeroIllustration className="w-full h-auto" />
        </motion.div>
      </div>
    </section>
  );
};