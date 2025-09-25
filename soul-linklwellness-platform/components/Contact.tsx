import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperPlaneIllustration } from './icons/illustrations';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend or Firestore.
    console.log({ name, email, message });
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4000); // Reset form after 4 seconds
  };

  return (
    <motion.section 
      id="contact" 
      className="py-20 md:py-32 bg-light-bg-secondary dark:bg-dark-bg-secondary/50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <PaperPlaneIllustration className="w-16 h-16 mx-auto mb-4 text-light-accent/80 dark:text-dark-accent/80" />
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
        <div className="max-w-xl mx-auto min-h-[480px]">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8 bg-light-accent/20 dark:bg-dark-accent/20 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-light-accent dark:text-dark-accent">Thank you!</h3>
                <p className="text-light-text/80 dark:text-dark-text/80 mt-2">Your message has been received.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-light-text/90 dark:text-dark-text/90 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-light-bg dark:bg-dark-bg-secondary p-3 rounded-lg border border-light-text/10 dark:border-dark-text/10 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-light-text/90 dark:text-dark-text/90 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-light-bg dark:bg-dark-bg-secondary p-3 rounded-lg border border-light-text/10 dark:border-dark-text/10 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-light-text/90 dark:text-dark-text/90 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-light-bg dark:bg-dark-bg-secondary p-3 rounded-lg border border-light-text/10 dark:border-dark-text/10 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                  />
                </div>
                <div className="text-center">
                  <motion.button
                    type="submit"
                    className="bg-light-accent text-white dark:bg-dark-accent dark:text-dark-bg font-bold py-3 px-8 rounded-full text-lg hover:opacity-90 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};