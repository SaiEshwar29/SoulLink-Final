import React from 'react';
import { motion } from 'framer-motion';
import { ConsultationIllustration, AasthaCtaIllustration } from './icons/illustrations';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const CtaSection: React.FC = () => {
    return (
        <section className="dark-grid-background py-20 md:py-32">
            <motion.div 
                className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div className="bg-brand-light text-brand-dark rounded-xl p-8 overflow-hidden" variants={cardVariants}>
                    <h3 className="text-4xl font-black mb-2">Book Your Consultation</h3>
                    <p className="text-brand-dark/70 mb-4">Your path to support and understanding</p>
                    <ConsultationIllustration className="w-full h-auto mt-8" />
                </motion.div>
                <motion.div className="bg-brand-light text-brand-dark rounded-xl p-8 overflow-hidden" variants={cardVariants}>
                    <h3 className="text-4xl font-black mb-2">Aastha – Listen, Guide, Support, Anytime</h3>
                    <p className="text-brand-dark/70 mb-4">Where innovation meets comfort</p>
                    <AasthaCtaIllustration className="w-full h-auto mt-8" />
                </motion.div>
            </motion.div>
        </section>
    );
};
