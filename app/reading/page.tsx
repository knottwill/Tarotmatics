'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

import TarotCard from '../../components/TarotCard';
import SpeechRecognition from '../../components/SpeechRecognition';
import { generateCardImage } from '../../utils/imageGeneration';
import { interpretCards } from '../../utils/tarotInterpretation';
import { shuffleDeck, drawCards } from '../../utils/tarotDeck';

// Types
interface Card {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  keywords: string[];
  isRevealed: boolean;
  interpretation: string;
}

export default function Reading() {
  const [stage, setStage] = useState<'initial' | 'recording' | 'shuffling' | 'drawing' | 'reading'>('initial');
  const [query, setQuery] = useState<string>('');
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  
  // Start the reading process
  const startReading = () => {
    setStage('recording');
  };

  // Handle when speech recognition is complete
  const handleSpeechResult = (transcript: string) => {
    setQuery(transcript);
    setStage('shuffling');
    
    // Add user query to conversation
    setConversation([...conversation, { role: 'user', content: transcript }]);
    
    // Begin the card draw sequence after a delay to show animation
    setTimeout(() => {
      setIsLoading(true);
      performReading(transcript);
    }, 3000);
  };

  // Perform the actual reading
  const performReading = async (userQuery: string) => {
    try {
      // Shuffle the deck animation
      const shuffledDeck = shuffleDeck();
      
      // Draw 3 cards
      const drawnCards = drawCards(shuffledDeck, 3);
      
      // Generate images for each card based on the query
      const cardsWithImages = await Promise.all(drawnCards.map(async (card, index) => {
        const imagePrompt = `Mystical tarot card art of "${card.name}" in relation to "${userQuery}". Detailed, ethereal, magical.`;
        const imageUrl = await generateCardImage(imagePrompt);
        
        return {
          ...card,
          imageUrl,
          isRevealed: false,
          interpretation: ''
        };
      }));
      
      setCards(cardsWithImages);
      setStage('drawing');
      setIsLoading(false);
      
      // Add initial assistant response
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: `I've drawn three cards for your reading about "${userQuery}". Which card would you like to explore first?` 
      }]);
      
    } catch (error) {
      console.error('Error during reading:', error);
      setIsLoading(false);
      setStage('initial');
    }
  };

  // Reveal a card when clicked
  const revealCard = async (card: Card) => {
    if (card.isRevealed) {
      setSelectedCard(card);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get interpretation from API
      const interpretation = await interpretCards([card], query);
      
      // Update the card with interpretation
      const updatedCards = cards.map(c => 
        c.id === card.id 
          ? { ...c, isRevealed: true, interpretation } 
          : c
      );
      
      setCards(updatedCards);
      
      // Find the updated card to select
      const updatedCard = updatedCards.find(c => c.id === card.id);
      if (updatedCard) {
        setSelectedCard(updatedCard);
      }
      
      // Add interpretation to conversation
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: `The ${card.name} card represents: ${interpretation}. Would you like to know more about this card's meaning or would you prefer to explore another card?` 
      }]);
      
      setStage('reading');
    } catch (error) {
      console.error('Error revealing card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user follow-up questions
  const handleUserQuestion = async (question: string) => {
    // Add user question to conversation
    setConversation(prev => [...prev, { role: 'user', content: question }]);
    
    setIsLoading(true);
    
    try {
      // TODO: Connect to Speechmatics API to get interpretation based on the question
      // This is a placeholder response
      const response = `Based on the ${selectedCard?.name}, I can tell you that ${question} relates to ${selectedCard?.keywords.join(', ')}. The cards suggest that you should trust your intuition on this matter.`;
      
      // Add response to conversation
      setConversation(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error handling follow-up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Background animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-mystical-dark opacity-50"></div>
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-mystical-light to-transparent opacity-10"></div>
        
        {/* Animated stars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col p-6 items-center justify-center mystic-container">
        <AnimatePresence mode="wait">
          {stage === 'initial' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-mystical text-mystical-gold mb-6 text-shadow">
                Your Mystical Reading
              </h1>
              <p className="text-xl font-reading text-white mb-10 max-w-2xl mx-auto">
                Speak your question or topic for the cards to reveal insights about your past, present, and future.
              </p>
              <button 
                onClick={startReading} 
                className="mystic-button"
              >
                Speak Your Question
              </button>
            </motion.div>
          )}
          
          {stage === 'recording' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <SpeechRecognition onResult={handleSpeechResult} />
              <p className="text-lg font-reading text-mystical-accent mt-4">
                Speak clearly what you wish to know...
              </p>
            </motion.div>
          )}
          
          {stage === 'shuffling' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <h2 className="text-2xl font-mystical text-mystical-gold mb-4">
                Shuffling the Deck
              </h2>
              <div className="flex justify-center space-x-4 mb-8">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="tarot-card tarot-card-back"
                    animate={{
                      x: [0, 100, -50, 0],
                      y: [0, -30, 20, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="card-pattern" />
                  </motion.div>
                ))}
              </div>
              <p className="text-lg font-reading text-white">
                Focusing on your question about: <span className="text-mystical-gold italic">{query}</span>
              </p>
            </motion.div>
          )}
          
          {stage === 'drawing' && (
            <motion.div 
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-mystical text-mystical-gold mb-6 text-center">
                Your Cards Have Been Drawn
              </h2>
              
              <p className="text-center text-lg font-reading mb-6">
                Select a card to reveal its meaning
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {cards.map((card, index) => (
                  <TarotCard
                    key={card.id}
                    card={card}
                    position={index}
                    onReveal={() => revealCard(card)}
                  />
                ))}
              </div>
            </motion.div>
          )}
          
          {stage === 'reading' && selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="sticky top-6">
                    <TarotCard
                      card={selectedCard}
                      position={cards.findIndex(c => c.id === selectedCard.id)}
                      onReveal={() => {}}
                      isSelected
                    />
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cards.map((card) => (
                        <button
                          key={card.id}
                          className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
                            card.id === selectedCard.id
                              ? 'bg-mystical-accent text-white'
                              : 'bg-mystical-dark text-mystical-accent hover:bg-mystical-medium'
                          }`}
                          onClick={() => revealCard(card)}
                        >
                          {card.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 bg-mystical-dark bg-opacity-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-mystical text-mystical-gold mb-4">
                    {selectedCard.name}
                  </h2>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-reading text-mystical-accent mb-2">Keywords:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCard.keywords.map((keyword, i) => (
                        <span key={i} className="px-2 py-1 bg-mystical-medium bg-opacity-50 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4 font-reading">
                    {conversation.map((message, i) => (
                      <div 
                        key={i}
                        className={`p-4 rounded-lg ${
                          message.role === 'assistant' 
                            ? 'bg-mystical-medium bg-opacity-30 text-white' 
                            : 'bg-mystical-light bg-opacity-20 text-mystical-accent'
                        }`}
                      >
                        {message.content}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <SpeechRecognition
                      onResult={handleUserQuestion}
                      buttonText="Ask a follow-up question"
                      compact
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {isLoading && (
          <div className="fixed inset-0 bg-mystical-dark bg-opacity-70 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <motion.div
                  className="absolute inset-0 border-4 border-mystical-gold rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <p className="text-mystical-accent font-reading">Consulting the cards...</p>
            </div>
          </div>
        )}
      </div>
      
      <footer className="relative z-10 p-4 text-center">
        <Link href="/" className="text-mystical-accent hover:text-mystical-gold transition-colors duration-300">
          Return to Home
        </Link>
      </footer>
    </main>
  );
} 