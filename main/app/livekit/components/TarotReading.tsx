'use client';

import { useState, useEffect, useRef } from 'react';
import { TranscriptContainer } from '@/components/TranscriptView';
import type { TranscriptGroup } from '@/lib/transcript-types';
import { MagicSparkles } from '@/components/MagicSparkles';
import { TAROT_CARDS, type TarotCard } from '@/lib/tarot-cards';

interface TarotReadingProps {
  transcriptGroups: TranscriptGroup[];
  onReadingComplete: (cards: TarotCard[]) => void;
}

// Add this outside the component to persist across renders
const imageCache: Record<string, string> = {};
const pendingRequests: Set<string> = new Set();
const requestPromises: Record<string, Promise<string>> = {};
const preGeneratedCards: Set<string> = new Set();
const preGenerationStatus: Record<string, 'pending' | 'generating' | 'complete' | 'error'> = {};

const generateTarotImage = async (cardName: string, transcriptGroups: TranscriptGroup[]): Promise<string> => {
  // Check cache first
  if (imageCache[cardName]) {
    console.log('🎨 Using cached image for:', cardName);
    return imageCache[cardName];
  }

  // If there's already a pending request, return its promise
  if (requestPromises[cardName] !== undefined) {
    console.log('🎨 Reusing pending request for:', cardName);
    return requestPromises[cardName];
  }

  console.log('🎨 Starting image generation for card:', cardName);
  
  // Create a new promise for this request
  requestPromises[cardName] = (async () => {
    try {
      pendingRequests.add(cardName);
      
      // Format the full transcript
      const fullTranscript = transcriptGroups.map(group => {
        if (group.type === 'speaker') {
          return `${group.speaker}: ${group.data.map(word => word.text).join(' ')}`;
        } else {
          return `Agent: ${group.data.map(response => response.text).join(' ')}`;
        }
      }).join('\n');

      console.log('📜 Full transcript:', fullTranscript);
      
      // First, get a contextual prompt from GPT-4
      console.log('📤 Getting contextual prompt...');
      const promptResponse = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cardName, 
          conversationContext: fullTranscript
        }),
      });

      if (!promptResponse.ok) {
        const errorData = await promptResponse.json();
        console.error('❌ Prompt API Error:', errorData);
        throw new Error(errorData.error || `Prompt API Error: ${promptResponse.status} ${promptResponse.statusText}`);
      }

      const promptData = await promptResponse.json();
      if (!promptData.prompt) {
        console.error('❌ No prompt in response:', promptData);
        throw new Error('No prompt in response');
      }

      console.log('📝 Generated prompt:', promptData.prompt);

      // Then generate the image with the contextual prompt
      console.log('📤 Sending request to image API...');
      const apiUrl = new URL('/api/generate-image', window.location.origin);
      console.log('🌐 API URL:', apiUrl.toString());
      
      const response = await fetch(apiUrl.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptData.prompt }),
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

const preGenerateTarotImage = async (cardName: string, transcriptGroups: TranscriptGroup[]) => {
  if (preGeneratedCards.has(cardName)) {
    console.log('🎨 Card already pre-generated:', cardName);
    return;
  }

  console.log('🎨 Pre-generating image for card:', cardName);
  preGeneratedCards.add(cardName);
  preGenerationStatus[cardName] = 'generating';
  
  try {
    await generateTarotImage(cardName, transcriptGroups);
    console.log('✅ Pre-generation complete for card:', cardName);
    preGenerationStatus[cardName] = 'complete';
  } catch (error) {
    console.error('❌ Error in pre-generation for card:', cardName, error);
    preGeneratedCards.delete(cardName);
    preGenerationStatus[cardName] = 'error';
  }
};

export function TarotReading({ transcriptGroups, onReadingComplete }: TarotReadingProps) {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [isReadingComplete, setIsReadingComplete] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingCards, setLoadingCards] = useState<Set<string>>(new Set());
  const [preGenerationProgress, setPreGenerationProgress] = useState<Record<string, 'pending' | 'generating' | 'complete' | 'error'>>({});
  const lastProcessedGroupRef = useRef<string>('');

  // Update pre-generation progress when status changes
  useEffect(() => {
    setPreGenerationProgress(prev => ({ ...prev, ...preGenerationStatus }));
  }, [preGenerationStatus]);

  useEffect(() => {
    // Check the latest transcript group for tarot reading mentions
    const latestGroup = transcriptGroups[transcriptGroups.length - 1];
    if (!latestGroup || latestGroup.type !== 'agent') {
      console.log('🔍 No agent message or no latest group found');
      return;
    }

    // Skip if we've already processed this group
    const groupId = JSON.stringify(latestGroup);
    if (groupId === lastProcessedGroupRef.current) {
      console.log('🔄 Skipping already processed group');
      return;
    }
    lastProcessedGroupRef.current = groupId;

    const text = latestGroup.data
      .map(response => response.text)
      .join(' ');
    
    console.log('📝 Processing message:', text);
    
    // Check for pre-generation tags
    const preGenerateMatches = text.match(/<TAROT-PREGENERATE revealed='([^']+)' time='([^']+)'\/>/gi);
    if (preGenerateMatches) {
      console.log('🎴 Found pre-generation tags:', preGenerateMatches);
      
      for (const match of preGenerateMatches) {
        const [, cardName, time] = match.match(/<TAROT-PREGENERATE revealed='([^']+)' time='([^']+)'\/>/i) || [];
        if (cardName) {
          console.log('🎴 Pre-generating card:', { cardName, time });
          preGenerateTarotImage(cardName, transcriptGroups);
        }
      }
    }
    
    // Check for XML format tarot card reveal with time attribute
    const tarotRevealMatch = text.match(/<TAROT revealed='([^']+)' time='([^']+)'\/>/i);
    if (tarotRevealMatch) {
      console.log('🎴 Found tarot card reveal:', {
        cardName: tarotRevealMatch[1],
        time: tarotRevealMatch[2]
      });

      const cardName = tarotRevealMatch[1];
      const time = tarotRevealMatch[2].toLowerCase();
      const card = TAROT_CARDS.find(c => c.name.toLowerCase() === cardName.toLowerCase());
      
      if (card) {
        console.log('✅ Found matching card:', card.name);
        
        // Determine position based on the time attribute
        let position = 0;
        if (time === 'past') position = 0;
        else if (time === 'present') position = 1;
        else if (time === 'future') position = 2;

        console.log('📍 Card position:', { time, position });

        // Update the selected cards array
        setSelectedCards(prev => {
          const newCards = [...prev];
          newCards[position] = card;
          console.log('🃏 Updated selected cards:', newCards.map(c => c?.name));
          return newCards;
        });

        // Flip the specific card
        setFlippedCards(prev => {
          if (!prev.includes(position)) {
            const newFlipped = [...prev, position];
            console.log('🔄 Flipping card at position:', position, 'New flipped cards:', newFlipped);
            return newFlipped;
          }
          console.log('⏭️ Card already flipped at position:', position);
          return prev;
        });

        // Generate image if needed
        if (!imageCache[card.name] && !pendingRequests.has(card.name)) {
          console.log('🎨 Generating image for card:', card.name);
          setLoadingCards(prev => new Set([...prev, card.name]));
          generateTarotImage(card.name, transcriptGroups)
            .then(() => {
              console.log('✅ Image generated for card:', card.name);
              setLoadingCards(prev => {
                const newSet = new Set(prev);
                newSet.delete(card.name);
                return newSet;
              });
            })
            .catch(error => {
              console.error('❌ Error generating image for card:', card.name, error);
              setLoadingCards(prev => {
                const newSet = new Set(prev);
                newSet.delete(card.name);
                return newSet;
              });
            });
        } else {
          console.log('🖼️ Using cached image for card:', card.name);
        }
      } else {
        console.log('❌ No matching card found for:', cardName);
      }
    } else {
      console.log('❌ No tarot card reveal found in message');
    }
  }, [transcriptGroups]);

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20 w-[70%] mx-auto relative">
      <MagicSparkles />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 relative z-10">
              {index === 0 ? 'Past' : index === 1 ? 'Present' : 'Future'}
            </h3>
            <div 
              className={`bg-gray-900/50 rounded-lg p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden w-full ${
                isReadingComplete && !flippedCards.includes(index) ? 'animate-pulse' : ''
              }`}
            >
              <div className="aspect-[2/3] mb-4 rounded-lg p-1 relative">
                <div className={`absolute inset-0 transition-transform duration-500 transform-gpu ${
                  flippedCards.includes(index) ? 'rotate-y-180' : ''
                }`}>
                  <img 
                    src="/tarot/reverse.png" 
                    alt="Card Back"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                {selectedCards[index] && (
                  <div className={`absolute inset-0 transition-transform duration-500 transform-gpu ${
                    flippedCards.includes(index) ? 'rotate-y-0' : 'rotate-y-180'
                  }`}>
                    <div className="w-full h-full relative">
                      <img
                        src={selectedCards[index].image}
                        alt={selectedCards[index].name}
                        className="w-full h-full object-cover rounded-lg opacity-20"
                      />
                      {loadingCards.has(selectedCards[index].name) || preGenerationProgress[selectedCards[index].name] === 'generating' ? (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                            <p className="text-purple-400 text-sm">Generating your card...</p>
                          </div>
                        </div>
                      ) : preGenerationProgress[selectedCards[index].name] === 'error' ? (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="text-red-500 text-center">
                            <p>Error generating image</p>
                            <p className="text-sm">Please try again</p>
                          </div>
                        </div>
                      ) : !imageCache[selectedCards[index].name] ? (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                            <p className="text-purple-400 text-sm">Preparing your card...</p>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={imageCache[selectedCards[index].name]} 
                          alt={selectedCards[index].name}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg z-20"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
              {selectedCards[index] && flippedCards.includes(index) && (
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-purple-400">{selectedCards[index].name}</h3>
                  <p className="text-sm text-gray-300">{selectedCards[index].meaning}</p>
                  {preGenerationProgress[selectedCards[index].name] === 'generating' && (
                    <p className="text-xs text-purple-400 mt-1">Generating image...</p>
                  )}
                  {preGenerationProgress[selectedCards[index].name] === 'error' && (
                    <p className="text-xs text-red-400 mt-1">Failed to generate image</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isGenerating && (
        <div className="mt-4 text-center text-purple-400">
          Generating your cards...
        </div>
      )}
      {/* Show pre-generation status */}
      {Object.entries(preGenerationProgress).length > 0 && (
        <div className="mt-4 text-center">
          <h4 className="text-sm font-semibold text-purple-400 mb-2">Pre-generation Status</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {Object.entries(preGenerationProgress).map(([cardName, status]) => (
              <div key={cardName} className="flex items-center justify-center gap-1">
                <span className={`w-2 h-2 rounded-full ${
                  status === 'complete' ? 'bg-green-500' :
                  status === 'generating' ? 'bg-purple-500 animate-pulse' :
                  status === 'error' ? 'bg-red-500' :
                  'bg-gray-500'
                }`}></span>
                <span className="text-gray-300">{cardName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 