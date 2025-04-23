import { NextResponse } from 'next/server';
import { TAROT_CARDS, type TarotCard } from '@/lib/tarot-cards';

export async function POST(request: Request) {
  try {
    // Log the incoming request
    console.log('📥 Received request for prompt generation');
    
    const body = await request.json();
    console.log('📦 Request body:', body);
    
    const { cardName, conversationContext } = body;
    
    if (!cardName || !conversationContext) {
      console.error('❌ Missing required fields:', { cardName, conversationContext });
      return NextResponse.json(
        { error: 'Card name and conversation context are required' },
        { status: 400 }
      );
    }

    // Log all available cards for debugging
    console.log('🃏 Available cards:', TAROT_CARDS.map(c => c.name));

    // Find the card meaning with case-insensitive matching
    const card = TAROT_CARDS.find(c => 
      c.name.toLowerCase() === cardName.toLowerCase()
    );

    if (!card) {
      console.error('❌ Card not found:', cardName);
      // Try to find a partial match
      const partialMatch = TAROT_CARDS.find(c => 
        c.name.toLowerCase().includes(cardName.toLowerCase()) ||
        cardName.toLowerCase().includes(c.name.toLowerCase())
      );

      if (partialMatch) {
        console.log('✨ Found partial match:', partialMatch.name);
        return NextResponse.json(
          { error: `Card "${cardName}" not found. Did you mean "${partialMatch.name}"?` },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: `Card "${cardName}" not found` },
        { status: 400 }
      );
    }

    console.log('🔍 Found card:', card);

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OpenAI API key not found');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const messages = [
      {
        role: "system",
        content: `You are a creative tarot card illustrator. Create a detailed prompt for DALL-E 3 to generate a tarot card image that incorporates the meaning of the card and the issue that the user is facing. The image should be mystical, detailed, and in the style of the Rider-Waite tarot deck.`
      },
      {
        role: "user",
        content: `Generate a DALL-E 3 prompt for the ${card.name} tarot card. The card's traditional meaning is: ${card.meaning}. The conversation context is: ${conversationContext}. Create a prompt that combines the card's meaning with the conversation context in a mystical and symbolic way.`
      }
    ];

    // Log the prompt being sent to ChatGPT
    console.log('🤖 Sending prompt to ChatGPT:', {
      system: messages[0].content,
      user: messages[1].content
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages,
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      return NextResponse.json(
        { error: `OpenAI API Error: ${response.status} ${response.statusText} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('📤 OpenAI Response:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid OpenAI response:', data);
      return NextResponse.json(
        { error: 'Invalid response from OpenAI API' },
        { status: 500 }
      );
    }

    const prompt = data.choices[0].message.content;
    console.log('✨ Generated prompt:', prompt);

    return NextResponse.json({ prompt });
  } catch (error) {
    console.error('❌ Error in generate-prompt:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
} 