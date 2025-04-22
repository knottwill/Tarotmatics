# Tarotmatics

A mystical Tarot card reading web application powered by Speechmatics conversational agent API. Users can speak their questions, watch magical animations, and receive personalized Tarot readings with AI-generated card artwork based on their query.

## Features

- Voice interaction using Speechmatics API
- Mystical animations during card shuffling
- AI-generated Tarot card artwork based on user's query
- Interactive reading experience with conversational flow
- Three-card Tarot reading format

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tarotmatics.git
   cd tarotmatics
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Speechmatics API credentials
   SPEECHMATICS_API_KEY=your_api_key_here
   
   # Optional: OpenAI API key for image generation
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
tarotmatics/
├── app/                    # Next.js app router
│   ├── about/              # About page
│   ├── reading/            # Tarot reading page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── SpeechRecognition.tsx  # Voice input component
│   └── TarotCard.tsx       # Tarot card component
├── public/                 # Static assets
├── utils/                  # Utility functions
│   ├── imageGeneration.ts  # AI image generation
│   ├── tarotDeck.ts        # Tarot deck data and functions
│   └── tarotInterpretation.ts # Card interpretation logic
├── .env.local              # Environment variables (not in repo)
├── package.json            # Project dependencies
└── tailwind.config.js      # Tailwind CSS configuration
```

## Connecting to Speechmatics API

This application is designed to work with the Speechmatics conversational agent API. The current implementation uses placeholders for the voice interaction and card interpretation, but can be easily modified to use the actual API.

To connect to the Speechmatics API:

1. Update the `SpeechRecognition.tsx` component to use the Speechmatics WebSocket API for real-time speech recognition.

2. Modify the `tarotInterpretation.ts` utility to send the card and query data to the Speechmatics conversational API and receive the interpretation.

## Customizing Card Artwork

The application is set up to use placeholder images for the Tarot cards. To enable AI-generated artwork:

1. Ensure you have an OpenAI API key set in your environment variables.

2. Uncomment the OpenAI API call in the `imageGeneration.ts` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tarot card descriptions based on traditional Rider-Waite-Smith interpretations
- UI design inspired by mystical and esoteric traditions
