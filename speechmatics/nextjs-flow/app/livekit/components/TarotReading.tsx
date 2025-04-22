'use client';

import { useState, useEffect } from 'react';
import { TranscriptContainer } from '@/components/TranscriptView';
import type { TranscriptGroup } from '@/lib/transcript-types';

const TAROT_CARDS = [
  // Major Arcana
  { 
    name: "The Fool", 
    meaning: "New beginnings, spontaneity, a leap of faith",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/fool.jpg"
  },
  { 
    name: "The Magician", 
    meaning: "Manifestation, resourcefulness, power",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/magician.jpg"
  },
  { 
    name: "The High Priestess", 
    meaning: "Intuition, sacred knowledge, divine feminine",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/highpriestess.jpg"
  },
  { 
    name: "The Empress", 
    meaning: "Feminine power, beauty, nature, abundance",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/empress.jpg"
  },
  { 
    name: "The Emperor", 
    meaning: "Authority, structure, control, fatherhood",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/emperor.jpg"
  },
  { 
    name: "The Hierophant", 
    meaning: "Tradition, conformity, morality, ethics",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/hierophant.jpg"
  },
  { 
    name: "The Lovers", 
    meaning: "Love, harmony, relationships, values alignment",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/lovers.jpg"
  },
  { 
    name: "The Chariot", 
    meaning: "Direction, control, willpower, victory",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/chariot.jpg"
  },
  { 
    name: "Strength", 
    meaning: "Strength, courage, patience, control",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/strength.jpg"
  },
  { 
    name: "The Hermit", 
    meaning: "Soul-searching, introspection, being alone",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/hermit.jpg"
  },
  { 
    name: "Wheel of Fortune", 
    meaning: "Change, cycles, inevitable fate",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/wheeloffortune.jpg"
  },
  { 
    name: "Justice", 
    meaning: "Cause and effect, clarity, truth",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/justice.jpg"
  },
  { 
    name: "The Hanged Man", 
    meaning: "Sacrifice, release, martyrdom",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/hangedman.jpg"
  },
  { 
    name: "Death", 
    meaning: "End of cycle, beginnings, change, metamorphosis",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/death.jpg"
  },
  { 
    name: "Temperance", 
    meaning: "Balance, moderation, patience, purpose",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/temperance.jpg"
  },
  { 
    name: "The Devil", 
    meaning: "Addiction, materialism, playfulness",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/devil.jpg"
  },
  { 
    name: "The Tower", 
    meaning: "Sudden upheaval, broken pride, disaster",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/tower.jpg"
  },
  { 
    name: "The Star", 
    meaning: "Hope, faith, purpose, renewal",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/star.jpg"
  },
  { 
    name: "The Moon", 
    meaning: "Illusion, fear, anxiety, subconscious",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/moon.jpg"
  },
  { 
    name: "The Sun", 
    meaning: "Joy, success, celebration, positivity",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/sun.jpg"
  },
  { 
    name: "Judgement", 
    meaning: "Reflection, reckoning, awakening",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/judgement.jpg"
  },
  { 
    name: "The World", 
    meaning: "Completion, integration, accomplishment",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/world.jpg"
  },

  // Wands
  { 
    name: "Ace of Wands", 
    meaning: "Inspiration, new opportunities, growth",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/aceofwands.jpg"
  },
  { 
    name: "Two of Wands", 
    meaning: "Planning, discovery, future planning",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/twoofwands.jpg"
  },
  { 
    name: "Three of Wands", 
    meaning: "Progress, expansion, foresight",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/threeofwands.jpg"
  },
  { 
    name: "Four of Wands", 
    meaning: "Celebration, harmony, homecoming",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/fourofwands.jpg"
  },
  { 
    name: "Five of Wands", 
    meaning: "Competition, conflict, rivalry",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/fiveofwands.jpg"
  },
  { 
    name: "Six of Wands", 
    meaning: "Victory, success, public recognition",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/sixofwands.jpg"
  },
  { 
    name: "Seven of Wands", 
    meaning: "Defense, perseverance, standing your ground",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/sevenofwands.jpg"
  },
  { 
    name: "Eight of Wands", 
    meaning: "Movement, swiftness, rapid progress",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/eightofwands.jpg"
  },
  { 
    name: "Nine of Wands", 
    meaning: "Resilience, persistence, last stretch",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/nineofwands.jpg"
  },
  { 
    name: "Ten of Wands", 
    meaning: "Burden, responsibility, hard work",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/tenofwands.jpg"
  },
  { 
    name: "Page of Wands", 
    meaning: "Exploration, enthusiasm, free spirit",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/pageofwands.jpg"
  },
  { 
    name: "Knight of Wands", 
    meaning: "Adventure, passion, impulsiveness",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/knightofwands.jpg"
  },
  { 
    name: "Queen of Wands", 
    meaning: "Courage, determination, vivacity",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/queenofwands.jpg"
  },
  { 
    name: "King of Wands", 
    meaning: "Vision, leadership, boldness",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/kingofwands.jpg"
  },

  // Cups
  { 
    name: "Ace of Cups", 
    meaning: "New feelings, intuition, creativity",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/aceofcups.jpg"
  },
  { 
    name: "Two of Cups", 
    meaning: "Partnership, connection, mutual feelings",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/twoofcups.jpg"
  },
  { 
    name: "Three of Cups", 
    meaning: "Celebration, friendship, community",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/threeofcups.jpg"
  },
  { 
    name: "Four of Cups", 
    meaning: "Meditation, contemplation, apathy",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/fourofcups.jpg"
  },
  { 
    name: "Five of Cups", 
    meaning: "Loss, grief, disappointment",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/fiveofcups.jpg"
  },
  { 
    name: "Six of Cups", 
    meaning: "Nostalgia, childhood memories, innocence",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/sixofcups.jpg"
  },
  { 
    name: "Seven of Cups", 
    meaning: "Choices, imagination, wishful thinking",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/sevenofcups.jpg"
  },
  { 
    name: "Eight of Cups", 
    meaning: "Walking away, disillusionment, leaving behind",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/eightofcups.jpg"
  },
  { 
    name: "Nine of Cups", 
    meaning: "Wishes fulfilled, comfort, happiness",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/nineofcups.jpg"
  },
  { 
    name: "Ten of Cups", 
    meaning: "Harmony, family, joy",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/tenofcups.jpg"
  },
  { 
    name: "Page of Cups", 
    meaning: "Creative opportunities, intuitive messages",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/pageofcups.jpg"
  },
  { 
    name: "Knight of Cups", 
    meaning: "Romance, charm, imagination",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/knightofcups.jpg"
  },
  { 
    name: "Queen of Cups", 
    meaning: "Compassion, calm, comfort",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/queenofcups.jpg"
  },
  { 
    name: "King of Cups", 
    meaning: "Emotional balance, diplomacy, control",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/kingofcups.jpg"
  },

  // Swords
  { 
    name: "Ace of Swords", 
    meaning: "Breakthrough, new ideas, mental clarity",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/aceofswords.jpg"
  },
  { 
    name: "Two of Swords", 
    meaning: "Difficult choices, indecision, stalemate",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/twoofswords.jpg"
  },
  { 
    name: "Three of Swords", 
    meaning: "Heartbreak, emotional pain, sorrow",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/threeofswords.jpg"
  },
  { 
    name: "Four of Swords", 
    meaning: "Rest, restoration, contemplation",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/fourofswords.jpg"
  },
  { 
    name: "Five of Swords", 
    meaning: "Conflict, tension, defeat",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/fiveofswords.jpg"
  },
  { 
    name: "Six of Swords", 
    meaning: "Transition, change, rite of passage",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/sixofswords.jpg"
  },
  { 
    name: "Seven of Swords", 
    meaning: "Deception, trickery, tactics",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/sevenofswords.jpg"
  },
  { 
    name: "Eight of Swords", 
    meaning: "Restriction, confusion, powerlessness",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/eightofswords.jpg"
  },
  { 
    name: "Nine of Swords", 
    meaning: "Anxiety, worry, fear",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/nineofswords.jpg"
  },
  { 
    name: "Ten of Swords", 
    meaning: "Painful endings, deep wounds, betrayal",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/tenofswords.jpg"
  },
  { 
    name: "Page of Swords", 
    meaning: "New ideas, curiosity, restlessness",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/pageofswords.jpg"
  },
  { 
    name: "Knight of Swords", 
    meaning: "Action, impulse, haste",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/knightofswords.jpg"
  },
  { 
    name: "Queen of Swords", 
    meaning: "Complexity, perceptiveness, clear boundaries",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/queenofswords.jpg"
  },
  { 
    name: "King of Swords", 
    meaning: "Mental clarity, intellectual power, authority",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/kingofswords.jpg"
  },

  // Pentacles
  { 
    name: "Ace of Pentacles", 
    meaning: "New opportunity, prosperity, manifestation",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/aceofpentacles.jpg"
  },
  { 
    name: "Two of Pentacles", 
    meaning: "Balance, adaptability, time management",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/twoofpentacles.jpg"
  },
  { 
    name: "Three of Pentacles", 
    meaning: "Teamwork, collaboration, learning",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/threeofpentacles.jpg"
  },
  { 
    name: "Four of Pentacles", 
    meaning: "Security, control, stability",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/fourofpentacles.jpg"
  },
  { 
    name: "Five of Pentacles", 
    meaning: "Need, poverty, insecurity",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/fiveofpentacles.jpg"
  },
  { 
    name: "Six of Pentacles", 
    meaning: "Generosity, charity, giving",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/sixofpentacles.jpg"
  },
  { 
    name: "Seven of Pentacles", 
    meaning: "Long-term view, perseverance, investment",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/sevenofpentacles.jpg"
  },
  { 
    name: "Eight of Pentacles", 
    meaning: "Apprenticeship, education, quality",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/eightofpentacles.jpg"
  },
  { 
    name: "Nine of Pentacles", 
    meaning: "Abundance, luxury, self-sufficiency",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/nineofpentacles.jpg"
  },
  { 
    name: "Ten of Pentacles", 
    meaning: "Wealth, inheritance, family",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/tenofpentacles.jpg"
  },
  { 
    name: "Page of Pentacles", 
    meaning: "Manifestation, financial opportunity, skill development",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/pageofpentacles.jpg"
  },
  { 
    name: "Knight of Pentacles", 
    meaning: "Efficiency, routine, responsibility",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/knightofpentacles.jpg"
  },
  { 
    name: "Queen of Pentacles", 
    meaning: "Practicality, creature comforts, financial security",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/queenofpentacles.jpg"
  },
  { 
    name: "King of Pentacles", 
    meaning: "Abundance, prosperity, security",
    image: "https://www.tarotcardmeanings.net/images/tarotcards/rider-waite/kingofpentacles.jpg"
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