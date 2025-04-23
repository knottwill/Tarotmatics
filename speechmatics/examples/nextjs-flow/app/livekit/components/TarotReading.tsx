'use client';

import { useState, useEffect, useRef } from 'react';
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

interface TarotReadingProps {
  transcriptGroups: TranscriptGroup[];
  onReadingComplete: (cards: typeof TAROT_CARDS[0][]) => void;
}

// Add this outside the component to persist across renders
const imageCache: Record<string, string> = {};
const pendingRequests: Set<string> = new Set();
const requestPromises: Record<string, Promise<string>> = {};

const generateTarotImage = async (cardName: string): Promise<string> => {
  // Check cache first
  if (imageCache[cardName]) {
    console.log('🎨 Using cached image for:', cardName);
    return imageCache[cardName];
  }

  // If there's already a pending request, return its promise
  if (requestPromises[cardName]) {
    console.log('🎨 Reusing pending request for:', cardName);
    return requestPromises[cardName];
  }

  console.log('🎨 Starting image generation for card:', cardName);
  const prompt = `A mystical tarot card illustration of ${cardName}, highly detailed, mystical atmosphere, golden accents, intricate patterns, in the style of the Rider-Waite tarot deck, digital art, 4k, masterpiece, best quality`;
  
  // Create a new promise for this request
  requestPromises[cardName] = (async () => {
    try {
      pendingRequests.add(cardName);
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
      
      // Cache the image URL
      imageCache[cardName] = data.imageUrl;
      return data.imageUrl;
    } catch (error) {
      console.error('❌ Error in generateTarotImage:', error);
      throw error;
    } finally {
      pendingRequests.delete(cardName);
      delete requestPromises[cardName];
    }
  })();

  return requestPromises[cardName];
};

export function TarotReading({ transcriptGroups, onReadingComplete }: TarotReadingProps) {
  const [selectedCards, setSelectedCards] = useState<typeof TAROT_CARDS[0][]>([]);
  const [isReadingComplete, setIsReadingComplete] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingCards, setLoadingCards] = useState<Set<string>>(new Set());
  const lastProcessedGroupRef = useRef<string>('');

  useEffect(() => {
    // Check the latest transcript group for tarot reading mentions
    const latestGroup = transcriptGroups[transcriptGroups.length - 1];
    if (!latestGroup || latestGroup.type !== 'agent') return;

    // Skip if we've already processed this group
    const groupId = JSON.stringify(latestGroup);
    if (groupId === lastProcessedGroupRef.current) return;
    lastProcessedGroupRef.current = groupId;

    const text = latestGroup.data
      .map(response => response.text)
      .join(' ')
      .toLowerCase();
    
    // Check for any mention of cards or reading
    if (text.includes('card') || text.includes('reading')) {
      // Create a regex pattern that matches any card name
      const cardPattern = new RegExp(
        TAROT_CARDS.map(card => 
          card.name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        ).join('|'),
        'g'
      );

      // Find all card mentions in the text
      const cardMatches = text.match(cardPattern);
      
      if (cardMatches && cardMatches.length > 0) {
        // Get unique card names
        const uniqueCardNames = [...new Set(cardMatches)];
        
        // Find the corresponding card objects
        const foundCards = uniqueCardNames
          .map(cardName => TAROT_CARDS.find(card => 
            card.name.toLowerCase() === cardName
          ))
          .filter((card): card is typeof TAROT_CARDS[0] => card !== undefined);

        if (foundCards.length > 0) {
          setSelectedCards(foundCards);
          setIsReadingComplete(true);
          onReadingComplete(foundCards);
          
          // Generate images for each card that hasn't been cached yet
          setIsGenerating(true);
          foundCards.forEach(card => {
            if (!imageCache[card.name] && !pendingRequests.has(card.name)) {
              setLoadingCards(prev => new Set([...prev, card.name]));
              generateTarotImage(card.name)
                .then(() => {
                  setLoadingCards(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(card.name);
                    return newSet;
                  });
                })
                .catch(error => {
                  console.error(`Error generating image for ${card.name}:`, error);
                  setLoadingCards(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(card.name);
                    return newSet;
                  });
                });
            }
          });
          
          // Flip each card with a delay
          foundCards.forEach((_, index) => {
            setTimeout(() => {
              setFlippedCards(prev => [...prev, index]);
            }, index * 500); // 500ms delay between each flip
          });
        }
      }
    }
  }, [transcriptGroups, onReadingComplete]);

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20 w-[70%] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Your Tarot Reading
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div 
            key={index}
            className={`bg-gray-900/50 rounded-lg p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 ${
              isReadingComplete && !flippedCards.includes(index) ? 'animate-pulse' : ''
            }`}
          >
            <div className="aspect-[2/3] mb-4 rounded-lg overflow-hidden relative">
              <div className={`absolute inset-0 transition-transform duration-500 transform-gpu ${
                flippedCards.includes(index) ? 'rotate-y-180' : ''
              }`}>
                <img 
                  src="/tarot/reverse.png" 
                  alt="Card Back"
                  className="w-full h-full object-cover"
                />
              </div>
              {selectedCards[index] && (
                <div className={`absolute inset-0 transition-transform duration-500 transform-gpu ${
                  flippedCards.includes(index) ? 'rotate-y-0' : 'rotate-y-180'
                }`}>
                  {loadingCards.has(selectedCards[index].name) ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                  ) : (
                    <img
                      src={imageCache[selectedCards[index].name] || selectedCards[index].image} 
                      alt={selectedCards[index].name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}
            </div>
            {selectedCards[index] && flippedCards.includes(index) && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-purple-400">{selectedCards[index].name}</h3>
                <p className="text-sm text-gray-300">{selectedCards[index].meaning}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {isGenerating && (
        <div className="mt-4 text-center text-purple-400">
          Generating your cards...
        </div>
      )}
    </div>
  );
} 