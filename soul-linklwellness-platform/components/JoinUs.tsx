import React from 'react';
import { motion } from 'framer-motion';
import { JoinUsIllustration } from './icons/illustrations';

export const JoinUs: React.FC = () => {
    return (
        <section className="dark-grid-background py-20 md:py-32">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="bg-brand-dark-secondary rounded-2xl max-w-4xl mx-auto p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="flex-shrink-0">
                        <JoinUsIllustration />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-black text-brand-light mb-4">Join our tech team for groundbreaking innovation and growth!</h2>
                        <p className="text-brand-light/70 mb-6">Join our innovative tech team dedicated to transforming industries.</p>
                        <a 
                            href="#"
                            className="inline-block bg-brand-red text-brand-light font-bold py-3 px-6 rounded-md"
                            
                        >
                            Get in touch with us
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
