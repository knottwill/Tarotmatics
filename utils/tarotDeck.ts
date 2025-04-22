// Basic Tarot card data
interface TarotCard {
  id: number;
  name: string;
  description: string;
  keywords: string[];
}

// Major Arcana only for this demo
const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    description: "New beginnings, innocence, spontaneity, a free spirit",
    keywords: ["beginnings", "innocence", "adventure", "potential"]
  },
  {
    id: 1,
    name: "The Magician",
    description: "Manifestation, resourcefulness, power, inspired action",
    keywords: ["manifestation", "power", "action", "creation"]
  },
  {
    id: 2,
    name: "The High Priestess",
    description: "Intuition, sacred knowledge, divine feminine, the subconscious mind",
    keywords: ["intuition", "wisdom", "subconscious", "mystery"]
  },
  {
    id: 3,
    name: "The Empress",
    description: "Femininity, beauty, nature, nurturing, abundance",
    keywords: ["abundance", "nurturing", "fertility", "creation"]
  },
  {
    id: 4,
    name: "The Emperor",
    description: "Authority, establishment, structure, a father figure",
    keywords: ["authority", "structure", "control", "leadership"]
  },
  {
    id: 5,
    name: "The Hierophant",
    description: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions",
    keywords: ["tradition", "conformity", "knowledge", "belief"]
  },
  {
    id: 6,
    name: "The Lovers",
    description: "Love, harmony, relationships, values alignment, choices",
    keywords: ["love", "harmony", "relationships", "choice"]
  },
  {
    id: 7,
    name: "The Chariot",
    description: "Control, willpower, success, action, determination",
    keywords: ["determination", "control", "success", "direction"]
  },
  {
    id: 8,
    name: "Strength",
    description: "Strength, courage, persuasion, influence, compassion",
    keywords: ["courage", "patience", "compassion", "inner strength"]
  },
  {
    id: 9,
    name: "The Hermit",
    description: "Soul searching, introspection, being alone, inner guidance",
    keywords: ["introspection", "solitude", "guidance", "reflection"]
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    description: "Good luck, karma, life cycles, destiny, a turning point",
    keywords: ["change", "cycles", "fate", "turning point"]
  },
  {
    id: 11,
    name: "Justice",
    description: "Justice, fairness, truth, cause and effect, law",
    keywords: ["justice", "fairness", "truth", "karma"]
  },
  {
    id: 12,
    name: "The Hanged Man",
    description: "Pause, surrender, letting go, new perspectives",
    keywords: ["surrender", "perspective", "sacrifice", "waiting"]
  },
  {
    id: 13,
    name: "Death",
    description: "Endings, change, transformation, transition",
    keywords: ["transformation", "endings", "change", "transition"]
  },
  {
    id: 14,
    name: "Temperance",
    description: "Balance, moderation, patience, purpose",
    keywords: ["balance", "moderation", "patience", "harmony"]
  },
  {
    id: 15,
    name: "The Devil",
    description: "Shadow self, attachment, addiction, restriction, sexuality",
    keywords: ["attachment", "addiction", "materialism", "bondage"]
  },
  {
    id: 16,
    name: "The Tower",
    description: "Sudden change, upheaval, chaos, revelation, awakening",
    keywords: ["disruption", "chaos", "revelation", "awakening"]
  },
  {
    id: 17,
    name: "The Star",
    description: "Hope, faith, purpose, renewal, spirituality",
    keywords: ["hope", "inspiration", "renewal", "healing"]
  },
  {
    id: 18,
    name: "The Moon",
    description: "Illusion, fear, anxiety, subconscious, intuition",
    keywords: ["illusion", "fear", "intuition", "subconscious"]
  },
  {
    id: 19,
    name: "The Sun",
    description: "Positivity, fun, warmth, success, vitality",
    keywords: ["joy", "success", "vitality", "enlightenment"]
  },
  {
    id: 20,
    name: "Judgment",
    description: "Rebirth, inner calling, absolution",
    keywords: ["judgment", "rebirth", "calling", "awakening"]
  },
  {
    id: 21,
    name: "The World",
    description: "Completion, accomplishment, travel, lesson learned",
    keywords: ["completion", "fulfillment", "accomplishment", "wholeness"]
  }
];

/**
 * Shuffles the tarot deck
 */
export function shuffleDeck(): TarotCard[] {
  // Create a copy of the deck
  const deck = [...majorArcana];
  
  // Fisher-Yates shuffle algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
}

/**
 * Draws a specified number of cards from a deck
 */
export function drawCards(deck: TarotCard[], count: number): TarotCard[] {
  // Make sure we don't try to draw more cards than are in the deck
  count = Math.min(count, deck.length);
  
  // Draw the first 'count' cards from the shuffled deck
  return deck.slice(0, count);
}

export default majorArcana; 