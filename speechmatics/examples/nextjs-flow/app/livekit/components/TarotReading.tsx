'use client';

import { useState, useEffect } from 'react';
import { TranscriptContainer } from '@/components/TranscriptView';
import type { TranscriptGroup } from '@/lib/transcript-types';

const TAROT_CARDS = [
  // Major Arcana
  { 
    name: "The Fool", 
    meaning: "New beginnings, spontaneity, a leap of faith",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg"
  },
  { 
    name: "The Magician", 
    meaning: "Manifestation, resourcefulness, power",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar01.jpg"
  },
  { 
    name: "The High Priestess", 
    meaning: "Intuition, sacred knowledge, divine feminine",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar02.jpg"
  },
  { 
    name: "The Empress", 
    meaning: "Feminine power, beauty, nature, abundance",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar03.jpg"
  },
  { 
    name: "The Emperor", 
    meaning: "Authority, structure, control, fatherhood",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar04.jpg"
  },
  { 
    name: "The Hierophant", 
    meaning: "Tradition, conformity, morality, ethics",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar05.jpg"
  },
  { 
    name: "The Lovers", 
    meaning: "Love, harmony, relationships, values alignment",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar06.jpg"
  },
  { 
    name: "The Chariot", 
    meaning: "Direction, control, willpower, victory",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar07.jpg"
  },
  { 
    name: "Strength", 
    meaning: "Strength, courage, patience, control",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar08.jpg"
  },
  { 
    name: "The Hermit", 
    meaning: "Soul-searching, introspection, being alone",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar09.jpg"
  },
  { 
    name: "Wheel of Fortune", 
    meaning: "Change, cycles, inevitable fate",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar10.jpg"
  },
  { 
    name: "Justice", 
    meaning: "Cause and effect, clarity, truth",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar11.jpg"
  },
  { 
    name: "The Hanged Man", 
    meaning: "Sacrifice, release, martyrdom",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar12.jpg"
  },
  { 
    name: "Death", 
    meaning: "End of cycle, beginnings, change, metamorphosis",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar13.jpg"
  },
  { 
    name: "Temperance", 
    meaning: "Balance, moderation, patience, purpose",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar14.jpg"
  },
  { 
    name: "The Devil", 
    meaning: "Addiction, materialism, playfulness",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar15.jpg"
  },
  { 
    name: "The Tower", 
    meaning: "Sudden upheaval, broken pride, disaster",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar16.jpg"
  },
  { 
    name: "The Star", 
    meaning: "Hope, faith, purpose, renewal",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar17.jpg"
  },
  { 
    name: "The Moon", 
    meaning: "Illusion, fear, anxiety, subconscious",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar18.jpg"
  },
  { 
    name: "The Sun", 
    meaning: "Joy, success, celebration, positivity",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar19.jpg"
  },
  { 
    name: "Judgement", 
    meaning: "Reflection, reckoning, awakening",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar20.jpg"
  },
  { 
    name: "The World", 
    meaning: "Completion, integration, accomplishment",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar21.jpg"
  },

  // Wands
  { 
    name: "Ace of Wands", 
    meaning: "Inspiration, new opportunities, growth",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa01.jpg"
  },
  { 
    name: "Two of Wands", 
    meaning: "Planning, discovery, future planning",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa02.jpg"
  },
  { 
    name: "Three of Wands", 
    meaning: "Progress, expansion, foresight",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa03.jpg"
  },
  { 
    name: "Four of Wands", 
    meaning: "Celebration, harmony, homecoming",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa04.jpg"
  },
  { 
    name: "Five of Wands", 
    meaning: "Competition, conflict, rivalry",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa05.jpg"
  },
  { 
    name: "Six of Wands", 
    meaning: "Victory, success, public recognition",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa06.jpg"
  },
  { 
    name: "Seven of Wands", 
    meaning: "Defense, perseverance, standing your ground",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa07.jpg"
  },
  { 
    name: "Eight of Wands", 
    meaning: "Movement, swiftness, rapid progress",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa08.jpg"
  },
  { 
    name: "Nine of Wands", 
    meaning: "Resilience, persistence, last stretch",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa09.jpg"
  },
  { 
    name: "Ten of Wands", 
    meaning: "Burden, responsibility, hard work",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa10.jpg"
  },
  { 
    name: "Page of Wands", 
    meaning: "Exploration, enthusiasm, free spirit",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa11.jpg"
  },
  { 
    name: "Knight of Wands", 
    meaning: "Adventure, passion, impulsiveness",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa12.jpg"
  },
  { 
    name: "Queen of Wands", 
    meaning: "Courage, determination, vivacity",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa13.jpg"
  },
  { 
    name: "King of Wands", 
    meaning: "Vision, leadership, boldness",
    image: "https://www.sacred-texts.com/tarot/pkt/img/wa14.jpg"
  },

  // Cups
  { 
    name: "Ace of Cups", 
    meaning: "New feelings, intuition, creativity",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu01.jpg"
  },
  { 
    name: "Two of Cups", 
    meaning: "Partnership, connection, mutual feelings",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu02.jpg"
  },
  { 
    name: "Three of Cups", 
    meaning: "Celebration, friendship, community",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu03.jpg"
  },
  { 
    name: "Four of Cups", 
    meaning: "Meditation, contemplation, apathy",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu04.jpg"
  },
  { 
    name: "Five of Cups", 
    meaning: "Loss, grief, disappointment",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu05.jpg"
  },
  { 
    name: "Six of Cups", 
    meaning: "Nostalgia, childhood memories, innocence",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu06.jpg"
  },
  { 
    name: "Seven of Cups", 
    meaning: "Choices, imagination, wishful thinking",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu07.jpg"
  },
  { 
    name: "Eight of Cups", 
    meaning: "Walking away, disillusionment, leaving behind",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu08.jpg"
  },
  { 
    name: "Nine of Cups", 
    meaning: "Wishes fulfilled, comfort, happiness",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu09.jpg"
  },
  { 
    name: "Ten of Cups", 
    meaning: "Harmony, family, joy",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu10.jpg"
  },
  { 
    name: "Page of Cups", 
    meaning: "Creative opportunities, intuitive messages",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu11.jpg"
  },
  { 
    name: "Knight of Cups", 
    meaning: "Romance, charm, imagination",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu12.jpg"
  },
  { 
    name: "Queen of Cups", 
    meaning: "Compassion, calm, comfort",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu13.jpg"
  },
  { 
    name: "King of Cups", 
    meaning: "Emotional balance, diplomacy, control",
    image: "https://www.sacred-texts.com/tarot/pkt/img/cu14.jpg"
  },

  // Swords
  { 
    name: "Ace of Swords", 
    meaning: "Breakthrough, new ideas, mental clarity",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw01.jpg"
  },
  { 
    name: "Two of Swords", 
    meaning: "Difficult choices, indecision, stalemate",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw02.jpg"
  },
  { 
    name: "Three of Swords", 
    meaning: "Heartbreak, emotional pain, sorrow",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw03.jpg"
  },
  { 
    name: "Four of Swords", 
    meaning: "Rest, restoration, contemplation",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw04.jpg"
  },
  { 
    name: "Five of Swords", 
    meaning: "Conflict, tension, defeat",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw05.jpg"
  },
  { 
    name: "Six of Swords", 
    meaning: "Transition, change, rite of passage",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw06.jpg"
  },
  { 
    name: "Seven of Swords", 
    meaning: "Deception, trickery, tactics",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw07.jpg"
  },
  { 
    name: "Eight of Swords", 
    meaning: "Restriction, confusion, powerlessness",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw08.jpg"
  },
  { 
    name: "Nine of Swords", 
    meaning: "Anxiety, worry, fear",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw09.jpg"
  },
  { 
    name: "Ten of Swords", 
    meaning: "Painful endings, deep wounds, betrayal",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw10.jpg"
  },
  { 
    name: "Page of Swords", 
    meaning: "New ideas, curiosity, restlessness",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw11.jpg"
  },
  { 
    name: "Knight of Swords", 
    meaning: "Action, impulse, haste",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw12.jpg"
  },
  { 
    name: "Queen of Swords", 
    meaning: "Complexity, perceptiveness, clear boundaries",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw13.jpg"
  },
  { 
    name: "King of Swords", 
    meaning: "Mental clarity, intellectual power, authority",
    image: "https://www.sacred-texts.com/tarot/pkt/img/sw14.jpg"
  },

  // Pentacles
  { 
    name: "Ace of Pentacles", 
    meaning: "New opportunity, prosperity, manifestation",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe01.jpg"
  },
  { 
    name: "Two of Pentacles", 
    meaning: "Balance, adaptability, time management",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe02.jpg"
  },
  { 
    name: "Three of Pentacles", 
    meaning: "Teamwork, collaboration, learning",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe03.jpg"
  },
  { 
    name: "Four of Pentacles", 
    meaning: "Security, control, stability",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe04.jpg"
  },
  { 
    name: "Five of Pentacles", 
    meaning: "Need, poverty, insecurity",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe05.jpg"
  },
  { 
    name: "Six of Pentacles", 
    meaning: "Generosity, charity, giving",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe06.jpg"
  },
  { 
    name: "Seven of Pentacles", 
    meaning: "Long-term view, perseverance, investment",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe07.jpg"
  },
  { 
    name: "Eight of Pentacles", 
    meaning: "Apprenticeship, education, quality",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe08.jpg"
  },
  { 
    name: "Nine of Pentacles", 
    meaning: "Abundance, luxury, self-sufficiency",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe09.jpg"
  },
  { 
    name: "Ten of Pentacles", 
    meaning: "Wealth, inheritance, family",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe10.jpg"
  },
  { 
    name: "Page of Pentacles", 
    meaning: "Manifestation, financial opportunity, skill development",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe11.jpg"
  },
  { 
    name: "Knight of Pentacles", 
    meaning: "Efficiency, routine, responsibility",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe12.jpg"
  },
  { 
    name: "Queen of Pentacles", 
    meaning: "Practicality, creature comforts, financial security",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe13.jpg"
  },
  { 
    name: "King of Pentacles", 
    meaning: "Abundance, prosperity, security",
    image: "https://www.sacred-texts.com/tarot/pkt/img/pe14.jpg"
  }
];

interface GeneratedCard {
  name: string;
  meaning: string;
  image: string | null;
  isReversed: boolean;
}

interface TarotReadingProps {
  transcriptGroups: TranscriptGroup[];
  onReadingComplete: (cards: GeneratedCard[]) => void;
}

const generateTarotImage = async (cardName: string): Promise<string> => {
  console.log('🎨 Starting image generation for card:', cardName);
  const prompt = `A mystical tarot card illustration of ${cardName}, highly detailed, mystical atmosphere, golden accents, intricate patterns, in the style of the Rider-Waite tarot deck, digital art, 4k, masterpiece, best quality`;
  
  try {
    console.log('📤 Sending request to our API...');
    const apiUrl = new URL('/api/generate-image', window.location.origin);
    console.log('🌐 API URL:', apiUrl.toString());
    
    const response = await fetch(apiUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    console.log('📥 Received response:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ API Error:', errorData);
      throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Image generated successfully:', data);
    
    if (!data.imageUrl) {
      console.error('❌ No image URL in response:', data);
      throw new Error('No image URL in response');
    }
    
    return data.imageUrl;
  } catch (error) {
    console.error('❌ Error in generateTarotImage:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export function TarotReading({ transcriptGroups, onReadingComplete }: TarotReadingProps) {
  const [selectedCards, setSelectedCards] = useState<GeneratedCard[]>([]);
  const [showReading, setShowReading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const drawRandomCards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Select 3 random cards
      const selectedCards = [];
      const availableCards = [...TAROT_CARDS];
      
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        const card = availableCards[randomIndex];
        const isReversed = Math.random() < 0.5;
        selectedCards.push({ ...card, isReversed });
        availableCards.splice(randomIndex, 1);
      }
      
      // Generate images for each card
      const cardsWithImages = await Promise.all(
        selectedCards.map(async (card) => {
          try {
            const imageUrl = await generateTarotImage(card.name);
            return { ...card, image: imageUrl };
          } catch (error) {
            console.error(`❌ Error generating image for ${card.name}:`, error);
            return { ...card, image: null };
          }
        })
      );
      
      setSelectedCards(cardsWithImages);
      setShowReading(true);
      
      // Send the card names to Flow
      const cardNames = cardsWithImages.map(card => card.name).join(', ');
      const message = `I have drawn the following cards for you: ${cardNames}. Let me interpret their meaning for you.`;
      onReadingComplete(cardsWithImages);
    } catch (error) {
      console.error('❌ Error in drawRandomCards:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while generating the reading');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {!showReading ? (
        <button
          onClick={drawRandomCards}
          disabled={isLoading}
          className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating your reading...' : 'Draw Your Cards'}
        </button>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {selectedCards.map((card, index) => (
              <div
                key={`${card.name}-${index}`}
                className="relative w-48 h-80"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                }}
              >
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                    style={{
                      transform: card.isReversed ? 'rotate(180deg)' : 'none',
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500 text-center p-4">Image generation failed</p>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                  <h3 className="text-white font-bold">{card.name}</h3>
                  <p className="text-white text-sm">{card.meaning}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="max-w-2xl mx-auto p-6 rounded-lg"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <h3 className="text-xl font-bold mb-4">Interpretation</h3>
            <p className="text-lg">
              {selectedCards.map((card, index) => (
                <span key={index}>
                  {card.name}: {card.meaning}
                  {index < selectedCards.length - 1 ? ' | ' : ''}
                </span>
              ))}
            </p>
          </div>
        </>
      )}
    </div>
  );
}