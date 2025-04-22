'use client';

import { useState, useEffect } from 'react';
import { TranscriptContainer } from '@/components/TranscriptView';
import type { TranscriptGroup } from '@/lib/transcript-types';

const TAROT_CARDS = [
  // Major Arcana
  { 
    name: "The Fool", 
    meaning: "New beginnings, spontaneity, a leap of faith",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-fool-meaning-tarot-card-meanings"
  },
  { 
    name: "The Magician", 
    meaning: "Manifestation, resourcefulness, power",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-magician-meaning-tarot-card-meanings"
  },
  { 
    name: "The High Priestess", 
    meaning: "Intuition, sacred knowledge, divine feminine",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-high-priestess-meaning-tarot-card-meanings"
  },
  { 
    name: "The Empress", 
    meaning: "Feminine power, beauty, nature, abundance",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-empress-meaning-tarot-card-meanings"
  },
  { 
    name: "The Emperor", 
    meaning: "Authority, structure, control, fatherhood",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-emperor-meaning-tarot-card-meanings"
  },
  { 
    name: "The Hierophant", 
    meaning: "Tradition, conformity, morality, ethics",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-hierophant-meaning-tarot-card-meanings"
  },
  { 
    name: "The Lovers", 
    meaning: "Love, harmony, relationships, values alignment",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-lovers-meaning-tarot-card-meanings"
  },
  { 
    name: "The Chariot", 
    meaning: "Direction, control, willpower, victory",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-chariot-meaning-tarot-card-meanings"
  },
  { 
    name: "Strength", 
    meaning: "Strength, courage, patience, control",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/strength-meaning-tarot-card-meanings"
  },
  { 
    name: "The Hermit", 
    meaning: "Soul-searching, introspection, being alone",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-hermit-meaning-tarot-card-meanings"
  },
  { 
    name: "Wheel of Fortune", 
    meaning: "Change, cycles, inevitable fate",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/wheel-of-fortune-meaning-tarot-card-meanings"
  },
  { 
    name: "Justice", 
    meaning: "Cause and effect, clarity, truth",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/justice-meaning-tarot-card-meanings"
  },
  { 
    name: "The Hanged Man", 
    meaning: "Sacrifice, release, martyrdom",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-hanged-man-meaning-tarot-card-meanings"
  },
  { 
    name: "Death", 
    meaning: "End of cycle, beginnings, change, metamorphosis",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/death-meaning-tarot-card-meanings"
  },
  { 
    name: "Temperance", 
    meaning: "Balance, moderation, patience, purpose",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/temperance-meaning-tarot-card-meanings"
  },
  { 
    name: "The Devil", 
    meaning: "Addiction, materialism, playfulness",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-devil-meaning-tarot-card-meanings"
  },
  { 
    name: "The Tower", 
    meaning: "Sudden upheaval, broken pride, disaster",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-tower-meaning-tarot-card-meanings"
  },
  { 
    name: "The Star", 
    meaning: "Hope, faith, purpose, renewal",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-star-meaning-tarot-card-meanings"
  },
  { 
    name: "The Moon", 
    meaning: "Illusion, fear, anxiety, subconscious",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-moon-meaning-tarot-card-meanings"
  },
  { 
    name: "The Sun", 
    meaning: "Joy, success, celebration, positivity",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-sun-meaning-tarot-card-meanings"
  },
  { 
    name: "Judgement", 
    meaning: "Reflection, reckoning, awakening",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/judgement-meaning-tarot-card-meanings"
  },
  { 
    name: "The World", 
    meaning: "Completion, integration, accomplishment",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/the-world-meaning-tarot-card-meanings"
  },

  // Wands
  { 
    name: "Ace of Wands", 
    meaning: "Inspiration, new opportunities, growth",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ace-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Two of Wands", 
    meaning: "Planning, discovery, future planning",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/two-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Three of Wands", 
    meaning: "Progress, expansion, foresight",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/three-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Four of Wands", 
    meaning: "Celebration, harmony, homecoming",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/four-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Five of Wands", 
    meaning: "Competition, conflict, rivalry",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/five-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Six of Wands", 
    meaning: "Victory, success, public recognition",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/six-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Seven of Wands", 
    meaning: "Defense, perseverance, standing your ground",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/seven-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Eight of Wands", 
    meaning: "Movement, swiftness, rapid progress",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/eight-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Nine of Wands", 
    meaning: "Resilience, persistence, last stretch",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/nine-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Ten of Wands", 
    meaning: "Burden, responsibility, hard work",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ten-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Page of Wands", 
    meaning: "Exploration, enthusiasm, free spirit",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/page-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Knight of Wands", 
    meaning: "Adventure, passion, impulsiveness",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/knight-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "Queen of Wands", 
    meaning: "Courage, determination, vivacity",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/queen-of-wands-meaning-tarot-card-meanings"
  },
  { 
    name: "King of Wands", 
    meaning: "Vision, leadership, boldness",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/king-of-wands-meaning-tarot-card-meanings"
  },

  // Cups
  { 
    name: "Ace of Cups", 
    meaning: "New feelings, intuition, creativity",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ace-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Two of Cups", 
    meaning: "Partnership, connection, mutual feelings",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/two-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Three of Cups", 
    meaning: "Celebration, friendship, community",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/three-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Four of Cups", 
    meaning: "Meditation, contemplation, apathy",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/four-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Five of Cups", 
    meaning: "Loss, grief, disappointment",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/five-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Six of Cups", 
    meaning: "Nostalgia, childhood memories, innocence",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/six-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Seven of Cups", 
    meaning: "Choices, imagination, wishful thinking",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/seven-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Eight of Cups", 
    meaning: "Walking away, disillusionment, leaving behind",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/eight-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Nine of Cups", 
    meaning: "Wishes fulfilled, comfort, happiness",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/nine-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Ten of Cups", 
    meaning: "Harmony, family, joy",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ten-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Page of Cups", 
    meaning: "Creative opportunities, intuitive messages",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/page-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Knight of Cups", 
    meaning: "Romance, charm, imagination",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/knight-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "Queen of Cups", 
    meaning: "Compassion, calm, comfort",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/queen-of-cups-meaning-tarot-card-meanings"
  },
  { 
    name: "King of Cups", 
    meaning: "Emotional balance, diplomacy, control",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/king-of-cups-meaning-tarot-card-meanings"
  },

  // Swords
  { 
    name: "Ace of Swords", 
    meaning: "Breakthrough, new ideas, mental clarity",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ace-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Two of Swords", 
    meaning: "Difficult choices, indecision, stalemate",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/two-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Three of Swords", 
    meaning: "Heartbreak, emotional pain, sorrow",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/three-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Four of Swords", 
    meaning: "Rest, restoration, contemplation",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/four-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Five of Swords", 
    meaning: "Conflict, tension, defeat",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/five-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Six of Swords", 
    meaning: "Transition, change, rite of passage",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/six-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Seven of Swords", 
    meaning: "Deception, trickery, tactics",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/seven-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Eight of Swords", 
    meaning: "Restriction, confusion, powerlessness",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/eight-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Nine of Swords", 
    meaning: "Anxiety, worry, fear",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/nine-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Ten of Swords", 
    meaning: "Painful endings, deep wounds, betrayal",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ten-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Page of Swords", 
    meaning: "New ideas, curiosity, restlessness",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/page-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Knight of Swords", 
    meaning: "Action, impulse, haste",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/knight-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "Queen of Swords", 
    meaning: "Complexity, perceptiveness, clear boundaries",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/queen-of-swords-meaning-tarot-card-meanings"
  },
  { 
    name: "King of Swords", 
    meaning: "Mental clarity, intellectual power, authority",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/king-of-swords-meaning-tarot-card-meanings"
  },

  // Pentacles
  { 
    name: "Ace of Pentacles", 
    meaning: "New opportunity, prosperity, manifestation",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ace-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Two of Pentacles", 
    meaning: "Balance, adaptability, time management",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/two-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Three of Pentacles", 
    meaning: "Teamwork, collaboration, learning",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/three-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Four of Pentacles", 
    meaning: "Security, control, stability",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/four-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Five of Pentacles", 
    meaning: "Need, poverty, insecurity",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/five-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Six of Pentacles", 
    meaning: "Generosity, charity, giving",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/six-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Seven of Pentacles", 
    meaning: "Long-term view, perseverance, investment",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/seven-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Eight of Pentacles", 
    meaning: "Apprenticeship, education, quality",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/eight-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Nine of Pentacles", 
    meaning: "Abundance, luxury, self-sufficiency",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/nine-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Ten of Pentacles", 
    meaning: "Wealth, inheritance, family",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/ten-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Page of Pentacles", 
    meaning: "Manifestation, financial opportunity, skill development",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/page-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Knight of Pentacles", 
    meaning: "Efficiency, routine, responsibility",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/knight-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "Queen of Pentacles", 
    meaning: "Practicality, creature comforts, financial security",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/queen-of-pentacles-meaning-tarot-card-meanings"
  },
  { 
    name: "King of Pentacles", 
    meaning: "Abundance, prosperity, security",
    image: "https://labyrinthos.co/blogs/tarot-card-meanings-list/king-of-pentacles-meaning-tarot-card-meanings"
  }
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
            <figure className="px-4 pt-4">
              <img 
                src={card.image} 
                alt={card.name}
                className="rounded-xl h-64 w-auto object-contain"
              />
            </figure>
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