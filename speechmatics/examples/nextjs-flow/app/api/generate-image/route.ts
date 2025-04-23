import { NextResponse } from 'next/server';

// Simple test endpoint
export async function GET() {
  return NextResponse.json({ message: 'API is working' });
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    console.log('prompt', prompt)
    console.log('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY)

    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
          response_format: "url" // important!
        }),
      });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      return NextResponse.json(
        { error: `OpenAI API Error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.data || !data.data[0] || !data.data[0].url) {
      return NextResponse.json(
        { error: 'Invalid response from OpenAI API' },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl: data.data[0].url });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
} 