import React from 'react';
import { motion } from 'framer-motion';

const faqData = [
    {
        question: 'Why SoulLink ?',
        answer: 'SoulLink provides an accessible and immediate space for emotional expression and support, helping you navigate your feelings whenever you need it.'
    },
    {
        question: 'How is SoulLink different from expensive therapy apps?',
        answer: 'SoulLink is designed as a supportive companion, not a replacement for therapy. It offers a free, non-judgmental space for daily check-ins and emotional processing, making mental wellness support more accessible.'
    },
    {
        question: 'Why choose SoulLink instead of ignoring the problem?',
        answer: 'Ignoring emotional challenges can often make them feel bigger. SoulLink offers a small, manageable first step toward acknowledging and understanding your feelings in a private and secure environment.'
    }
]

const FaqItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
    return (
        <details className="border-b border-brand-light/20 py-4 group">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none">
                <span>{q}</span>
                <span className="transition-transform duration-300 transform group-open:rotate-45">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"></path></svg>
                </span>
            </summary>
            <p className="mt-2 text-brand-light/80">
                {a}
            </p>
        </details>
    )
}

export const Faq: React.FC = () => {
    return (
        <section id="faq" className="py-20 md:py-32 bg-brand-red text-brand-light">
            <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-1/3">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">
                        Frequently asked questions
                    </h2>
                    <p className="text-lg">
                        Here are some common questions about our company.
                    </p>
                </div>
                <div className="w-full md:w-2/3">
                    {faqData.map(item => (
                        <FaqItem key={item.question} q={item.question} a={item.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};
