'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-mystical font-bold text-mystical-gold tracking-wider mb-6 text-shadow-lg">
          Tarotmatics
        </h1>
        <p className="text-xl md:text-2xl font-reading text-mystical-accent mb-12 max-w-2xl mx-auto">
          Discover your mystical journey through the arcana, guided by the celestial voices of the cards.
        </p>

        <div className="space-y-6 md:space-y-0 md:space-x-6 flex flex-col md:flex-row justify-center items-center">
          <Link 
            href="/reading"
            className="mystic-button group"
            onMouseEnter={() => setIsAnimating(true)}
            onMouseLeave={() => setIsAnimating(false)}
          >
            <span className="flex items-center justify-center">
              Begin Your Reading
              <motion.span
                className="ml-2"
                animate={isAnimating ? {
                  rotate: [0, 15, -15, 10, -10, 0],
                } : {}}
                transition={{ duration: 1 }}
              >
                ✨
              </motion.span>
            </span>
          </Link>
          
          <Link href="/about" className="text-mystical-accent underline hover:text-mystical-gold transition-colors duration-300">
            Learn About Tarot
          </Link>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-4 left-0 right-0 text-center text-sm text-mystical-accent opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Powered by Speechmatics & AI
      </motion.div>
    </main>
  );
} 