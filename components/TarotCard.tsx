import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Card {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  keywords: string[];
  isRevealed: boolean;
  interpretation: string;
}

interface TarotCardProps {
  card: Card;
  position: number;
  onReveal: () => void;
  isSelected?: boolean;
}

export default function TarotCard({ card, position, onReveal, isSelected = false }: TarotCardProps) {
  // Position indicates if this is Past (0), Present (1), or Future (2)
  const positionNames = ['Past', 'Present', 'Future'];
  const positionName = positionNames[position] || '';
  
  // Card flip animation
  const flipVariants = {
    hidden: { 
      rotateY: 0,
    },
    visible: { 
      rotateY: 180,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <motion.div
      className={`tarot-card ${isSelected ? 'scale-105 shadow-2xl' : ''}`}
      onClick={onReveal}
      whileHover={{ scale: isSelected ? 1.05 : 1.05 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        transition: { 
          delay: position * 0.2,
          duration: 0.5
        }
      }}
    >
      <motion.div 
        className="w-full h-full relative preserve-3d"
        initial="hidden"
        animate={card.isRevealed ? "visible" : "hidden"}
        variants={flipVariants}
      >
        {/* Card Front (Revealed) */}
        <div className="absolute backface-hidden w-full h-full rotate-y-180 rounded-lg overflow-hidden border-2 border-mystical-gold">
          {card.imageUrl && (
            <Image
              src={card.imageUrl}
              alt={card.name}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <h3 className="text-lg font-mystical text-mystical-gold">{card.name}</h3>
            <p className="text-xs text-white/80">{positionName}</p>
          </div>
        </div>
        
        {/* Card Back (Hidden) */}
        <div className="absolute backface-hidden w-full h-full tarot-card-back rounded-lg overflow-hidden">
          <div className="card-pattern" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 opacity-40">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#e6c057">
                <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
              </svg>
            </div>
          </div>
          <p className="absolute bottom-3 left-0 right-0 text-center text-sm font-mystical text-white/60">
            {positionName}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
} 