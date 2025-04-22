'use client';

import { useState, useEffect } from 'react';
import { TranscriptContainer } from '@/components/TranscriptView';
import type { TranscriptGroup } from '@/lib/transcript-types';

const TAROT_CARDS = [
  // Major Arcana
  { name: "The Fool", meaning: "New beginnings, spontaneity, a leap of faith" },
  { name: "The Magician", meaning: "Manifestation, resourcefulness, power" },
  { name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine" },
  { name: "The Empress", meaning: "Feminine power, beauty, nature, abundance" },
  { name: "The Emperor", meaning: "Authority, structure, control, fatherhood" },
  { name: "The Hierophant", meaning: "Tradition, conformity, morality, ethics" },
  { name: "The Lovers", meaning: "Love, harmony, relationships, values alignment" },
  { name: "The Chariot", meaning: "Direction, control, willpower, victory" },
  { name: "Strength", meaning: "Strength, courage, patience, control" },
  { name: "The Hermit", meaning: "Soul-searching, introspection, being alone" },
  { name: "Wheel of Fortune", meaning: "Change, cycles, inevitable fate" },
  { name: "Justice", meaning: "Cause and effect, clarity, truth" },
  { name: "The Hanged Man", meaning: "Sacrifice, release, martyrdom" },
  { name: "Death", meaning: "End of cycle, beginnings, change, metamorphosis" },
  { name: "Temperance", meaning: "Balance, moderation, patience, purpose" },
  { name: "The Devil", meaning: "Addiction, materialism, playfulness" },
  { name: "The Tower", meaning: "Sudden upheaval, broken pride, disaster" },
  { name: "The Star", meaning: "Hope, faith, purpose, renewal" },
  { name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious" },
  { name: "The Sun", meaning: "Joy, success, celebration, positivity" },
  { name: "Judgement", meaning: "Reflection, reckoning, awakening" },
  { name: "The World", meaning: "Completion, integration, accomplishment" },

  // Wands
  { name: "Ace of Wands", meaning: "Inspiration, new opportunities, growth" },
  { name: "Two of Wands", meaning: "Planning, discovery, future planning" },
  { name: "Three of Wands", meaning: "Progress, expansion, foresight" },
  { name: "Four of Wands", meaning: "Celebration, harmony, homecoming" },
  { name: "Five of Wands", meaning: "Competition, conflict, rivalry" },
  { name: "Six of Wands", meaning: "Victory, success, public recognition" },
  { name: "Seven of Wands", meaning: "Defense, perseverance, standing your ground" },
  { name: "Eight of Wands", meaning: "Movement, swiftness, rapid progress" },
  { name: "Nine of Wands", meaning: "Resilience, persistence, last stretch" },
  { name: "Ten of Wands", meaning: "Burden, responsibility, hard work" },
  { name: "Page of Wands", meaning: "Exploration, enthusiasm, free spirit" },
  { name: "Knight of Wands", meaning: "Adventure, passion, impulsiveness" },
  { name: "Queen of Wands", meaning: "Courage, determination, vivacity" },
  { name: "King of Wands", meaning: "Vision, leadership, boldness" },

  // Cups
  { name: "Ace of Cups", meaning: "New feelings, intuition, creativity" },
  { name: "Two of Cups", meaning: "Partnership, connection, mutual feelings" },
  { name: "Three of Cups", meaning: "Celebration, friendship, community" },
  { name: "Four of Cups", meaning: "Meditation, contemplation, apathy" },
  { name: "Five of Cups", meaning: "Loss, grief, disappointment" },
  { name: "Six of Cups", meaning: "Nostalgia, childhood memories, innocence" },
  { name: "Seven of Cups", meaning: "Choices, imagination, wishful thinking" },
  { name: "Eight of Cups", meaning: "Walking away, disillusionment, leaving behind" },
  { name: "Nine of Cups", meaning: "Wishes fulfilled, comfort, happiness" },
  { name: "Ten of Cups", meaning: "Harmony, family, joy" },
  { name: "Page of Cups", meaning: "Creative opportunities, intuitive messages" },
  { name: "Knight of Cups", meaning: "Romance, charm, imagination" },
  { name: "Queen of Cups", meaning: "Compassion, calm, comfort" },
  { name: "King of Cups", meaning: "Emotional balance, diplomacy, control" },

  // Swords
  { name: "Ace of Swords", meaning: "Breakthrough, new ideas, mental clarity" },
  { name: "Two of Swords", meaning: "Difficult choices, indecision, stalemate" },
  { name: "Three of Swords", meaning: "Heartbreak, emotional pain, sorrow" },
  { name: "Four of Swords", meaning: "Rest, restoration, contemplation" },
  { name: "Five of Swords", meaning: "Conflict, tension, defeat" },
  { name: "Six of Swords", meaning: "Transition, change, rite of passage" },
  { name: "Seven of Swords", meaning: "Deception, trickery, tactics" },
  { name: "Eight of Swords", meaning: "Restriction, confusion, powerlessness" },
  { name: "Nine of Swords", meaning: "Anxiety, worry, fear" },
  { name: "Ten of Swords", meaning: "Painful endings, deep wounds, betrayal" },
  { name: "Page of Swords", meaning: "New ideas, curiosity, restlessness" },
  { name: "Knight of Swords", meaning: "Action, impulse, haste" },
  { name: "Queen of Swords", meaning: "Complexity, perceptiveness, clear boundaries" },
  { name: "King of Swords", meaning: "Mental clarity, intellectual power, authority" },

  // Pentacles
  { name: "Ace of Pentacles", meaning: "New opportunity, prosperity, manifestation" },
  { name: "Two of Pentacles", meaning: "Balance, adaptability, time management" },
  { name: "Three of Pentacles", meaning: "Teamwork, collaboration, learning" },
  { name: "Four of Pentacles", meaning: "Security, control, stability" },
  { name: "Five of Pentacles", meaning: "Need, poverty, insecurity" },
  { name: "Six of Pentacles", meaning: "Generosity, charity, giving" },
  { name: "Seven of Pentacles", meaning: "Long-term view, perseverance, investment" },
  { name: "Eight of Pentacles", meaning: "Apprenticeship, education, quality" },
  { name: "Nine of Pentacles", meaning: "Abundance, luxury, self-sufficiency" },
  { name: "Ten of Pentacles", meaning: "Wealth, inheritance, family" },
  { name: "Page of Pentacles", meaning: "Manifestation, financial opportunity, skill development" },
  { name: "Knight of Pentacles", meaning: "Efficiency, routine, responsibility" },
  { name: "Queen of Pentacles", meaning: "Practicality, creature comforts, financial security" },
  { name: "King of Pentacles", meaning: "Abundance, prosperity, security" }
];

interface TarotReadingProps {
  transcriptGroups: TranscriptGroup[];
  onReadingComplete: (cards: typeof TAROT_CARDS[0][]) => void;
}

export function TarotReading({ transcriptGroups, onReadingComplete }: TarotReadingProps) {
  const [selectedCards, setSelectedCards] = useState<typeof TAROT_CARDS[0][]>([]);
  const [showReading, setShowReading] = useState(false);

  useEffect(() => {
    // Check the latest transcript group for tarot reading mentions
    const latestGroup = transcriptGroups[transcriptGroups.length - 1];
    if (latestGroup && latestGroup.type === 'agent') {
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
            setShowReading(true);
            onReadingComplete(foundCards);
          }
        }
      }
    }
  }, [transcriptGroups, showReading, onReadingComplete]);

  if (!showReading) {
    return null;
  }

  return (
    <div className="mt-8 p-4 bg-base-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Your Tarot Reading</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedCards.map((card) => (
          <div key={card.name} className="card bg-base-100">
            <div className="card-body">
              <h3 className="card-title">{card.name}</h3>
              <p>{card.meaning}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 