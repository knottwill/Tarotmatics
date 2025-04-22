'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="mystic-container py-12 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-mystical text-mystical-gold mb-8 text-center">
            About Tarot Reading
          </h1>
          
          <div className="max-w-3xl mx-auto bg-mystical-dark bg-opacity-50 p-6 md:p-8 rounded-lg shadow-lg">
            <p className="text-lg font-reading mb-6">
              Tarot cards have been used for centuries as tools for divination, self-reflection, and spiritual guidance. 
              A traditional tarot deck consists of 78 cards, including 22 Major Arcana cards representing life's karmic 
              and spiritual lessons, and 56 Minor Arcana cards that reflect the trials and tribulations of everyday life.
            </p>
            
            <h2 className="text-2xl font-mystical text-mystical-gold mb-4">
              The Three-Card Reading
            </h2>
            <p className="text-lg font-reading mb-6">
              The three-card spread is one of the most versatile and straightforward tarot readings. Each position represents 
              a different aspect or timeframe:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-mystical-medium bg-opacity-40 p-4 rounded-lg">
                <h3 className="text-xl font-mystical text-mystical-gold mb-2">Past</h3>
                <p className="font-reading">
                  Reveals influences from the past that are affecting your current situation. 
                  This card shows the foundation upon which your present circumstances are built.
                </p>
              </div>
              
              <div className="bg-mystical-medium bg-opacity-40 p-4 rounded-lg">
                <h3 className="text-xl font-mystical text-mystical-gold mb-2">Present</h3>
                <p className="font-reading">
                  Represents the current energies surrounding your question or situation. 
                  This card highlights immediate challenges, opportunities, or decisions.
                </p>
              </div>
              
              <div className="bg-mystical-medium bg-opacity-40 p-4 rounded-lg">
                <h3 className="text-xl font-mystical text-mystical-gold mb-2">Future</h3>
                <p className="font-reading">
                  Indicates potential outcomes or energies that are developing. 
                  This card offers guidance on where your current path is leading.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-mystical text-mystical-gold mb-4">
              Interpreting Your Reading
            </h2>
            <p className="text-lg font-reading mb-6">
              Tarot reading is both an art and an intuitive practice. While each card has traditional meanings, 
              the true power of tarot comes from how the cards interact with each other and resonate with your 
              specific question or life situation. Tarotmatics uses advanced AI to interpret these connections 
              and provide personalized insights.
            </p>
            
            <h2 className="text-2xl font-mystical text-mystical-gold mb-4">
              The Major Arcana
            </h2>
            <p className="text-lg font-reading mb-6">
              In Tarotmatics, we focus on the 22 Major Arcana cards, which represent significant life events, 
              karmic lessons, and spiritual truths. These powerful cards often indicate important transitions, 
              revelations, or milestones in your journey.
            </p>
            
            <div className="mt-8 text-center">
              <Link href="/reading" className="mystic-button inline-block">
                Begin Your Reading
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      
      <footer className="p-4 text-center">
        <Link href="/" className="text-mystical-accent hover:text-mystical-gold transition-colors duration-300">
          Return to Home
        </Link>
      </footer>
    </main>
  );
} 