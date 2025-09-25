import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage } from '../types';
import { Sender } from '../types';
import { getAsthaReply } from '../services/geminiService';
import { AsthaAvatar } from './icons/AsthaAvatar';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      sender: Sender.Astha,
      message: 'Hello, I\'m Astha, your guide here at Soul Link. How are you feeling today?',
      createdAt: new Date(),
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: Sender.User,
      message: userInput.trim(),
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const asthaResponse = await getAsthaReply(userMessage.message, messages);
      const asthaMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: Sender.Astha,
        message: asthaResponse,
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, asthaMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: Sender.Astha,
        message: 'I seem to be having trouble connecting. Please try again in a moment.',
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section 
      id="chatbot" 
      className="py-20 md:py-32 bg-light-bg-secondary dark:bg-dark-bg-secondary/50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Meet Astha – Your Guide, One Chat Away.
          </h2>
        </div>
        <div className="max-w-2xl mx-auto bg-light-bg dark:bg-dark-bg rounded-2xl shadow-lg overflow-hidden h-[60vh] flex flex-col">
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`flex items-start gap-4 ${
                    msg.sender === Sender.User ? 'justify-end' : ''
                  }`}
                >
                  {msg.sender === Sender.Astha && <AsthaAvatar />}
                  <div
                    className={`max-w-md p-4 rounded-2xl ${
                      msg.sender === Sender.User
                        ? 'bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-br-lg'
                        : 'bg-light-accent/20 dark:bg-dark-accent/20 text-light-text dark:text-dark-text rounded-bl-lg'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="flex items-start gap-4"
               >
                  <AsthaAvatar />
                  <div className="max-w-md p-4 rounded-2xl bg-light-accent/20 dark:bg-dark-accent/20">
                     <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce"></span>
                     </div>
                  </div>
               </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t border-light-bg-secondary dark:border-dark-bg-secondary">
            <form onSubmit={handleSendMessage} className="flex items-center gap-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Share what's on your mind..."
                className="w-full bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-shadow"
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                className="bg-light-accent text-white dark:bg-dark-accent dark:text-dark-bg rounded-full p-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !userInput.trim()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};