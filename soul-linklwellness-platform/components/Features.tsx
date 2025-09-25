import React from 'react';
import { motion } from 'framer-motion';
import { ChatIcon, DiaryIcon, ProblemIcon, MoodIcon, ListenIcon, MusicIcon } from './icons/FeatureIcons';

const features = [
  {
    icon: <ChatIcon />,
    title: 'Intelligent Chatbot',
    description: 'a chatbot designed to listen, understand, and connect with you.',
  },
  {
    icon: <DiaryIcon />,
    title: 'Digital Diary',
    description: 'Secure your thoughts in a diary with a nostalgic page-flip design.',
  },
  {
    icon: <ProblemIcon />,
    title: 'Problem Understanding',
    description: 'Understands your emotions and offers thoughtful support.',
  },
  {
    icon: <MoodIcon />,
    title: 'Mood Tracker',
    description: 'Track moods with manual logs and AI insights.',
  },
  {
    icon: <ListenIcon />,
    title: 'Active Listening',
    description: 'No judgment, no rush — Aastha patiently listens to everything you share.',
  },
  {
    icon: <MusicIcon />,
    title: 'Jam with Aastha',
    description: 'Enjoy music recommendations that match your mood.',
  },
];

const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-32 dark-grid-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-brand-light mb-4">
            CORE FEATURES OF Aastha
          </h2>
          <p className="text-lg text-brand-light/80 max-w-2xl mx-auto">
            How Aastha can help you with
          </p>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.title} 
              className="p-6 border border-brand-light/10 rounded-lg"
              variants={cardVariants}
            >
              <div className="flex items-start gap-4">
                <div className="text-brand-red">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-brand-light mb-2">{feature.title}</h3>
                  <p className="text-brand-light/70">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};