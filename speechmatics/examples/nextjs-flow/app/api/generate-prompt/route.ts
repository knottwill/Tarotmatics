import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { transcript, cardName } = await request.json();
    console.log('📝 Generating prompt for card:', cardName);
    console.log('💬 Conversation context length:', transcript.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a creative tarot card designer. Create a detailed DALL-E prompt for generating a tarot card image that reflects both the traditional meaning of the card and the context of the conversation. The prompt should be specific, detailed, and include artistic style guidance.`
          },
          {
            role: 'user',
            content: `Generate a DALL-E prompt for the ${cardName} tarot card based on this conversation context: ${transcript}. The prompt should create an image that captures both the traditional meaning of the card and the personal context of the reading.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Error generating prompt:', error);
      throw new Error(error.error?.message || 'Failed to generate prompt');
    }

    const data = await response.json();
    const prompt = data.choices[0].message.content;
    console.log('✨ Generated prompt:', prompt);
    console.log('📊 Prompt length:', prompt.length);

    return NextResponse.json({ prompt });
  } catch (error) {
    console.error('❌ Error in generate-prompt route:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    );
  }
} 