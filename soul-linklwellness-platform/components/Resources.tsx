import React from 'react';
import { motion } from 'framer-motion';
import type { Resource } from '../types';
import { OpenBookIllustration } from './icons/illustrations';

const resources: Resource[] = [
  {
    title: 'Mindfulness Practices',
    description: 'Learn simple mindfulness exercises to help calm your mind and stay present.',
    link: '#',
  },
  {
    title: 'Counseling Services',
    description: 'Find professional counselors and therapists in your area for dedicated support.',
    link: '#',
  },
  {
    title: 'Emergency Contacts',
    description: 'If you are in crisis, here are hotlines and services that can help you immediately.',
    link: '#',
  },
    {
    title: 'Understanding Anxiety',
    description: 'An article explaining the basics of anxiety and coping mechanisms.',
    link: '#',
  },
  {
    title: 'The Importance of Sleep',
    description: 'Discover how sleep impacts mental health and get tips for better rest.',
    link: '#',
  },
  {
    title: 'Building Resilience',
    description: 'Guidance on developing emotional strength to navigate life\'s challenges.',
    link: '#',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
  <motion.a
    href={resource.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-6 bg-light-bg dark:bg-dark-bg-secondary rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
    variants={cardVariants}
    whileHover={{ y: -5, scale: 1.03 }}
    transition={{ duration: 0.2 }}
  >
    <h3 className="text-xl font-bold text-light-accent dark:text-dark-accent mb-2">{resource.title}</h3>
    <p className="text-light-text/80 dark:text-dark-text/80">{resource.description}</p>
  </motion.a>
);

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const Resources: React.FC = () => {
  return (
    <motion.section 
      id="resources" 
      className="py-20 md:py-32"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <OpenBookIllustration className="w-20 h-20 mx-auto mb-4 text-light-accent/80 dark:text-dark-accent/80" />
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Helpful Resources
          </h2>
          <p className="text-lg text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto">
            A collection of supportive links, articles, and contacts to aid in your journey.
          </p>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {resources.map((res) => (
            <ResourceCard key={res.title} resource={res} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};