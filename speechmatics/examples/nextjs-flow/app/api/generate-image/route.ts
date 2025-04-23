import { NextResponse } from 'next/server';

// Simple test endpoint
export async function GET() {
  return NextResponse.json({ message: 'API is working' });
}

export async function POST(request: Request) {
  console.log('🔄 POST request received');
  
  try {
    // Log request details
    console.log('Request URL:', request.url);
    console.log('Request method:', request.method);
    
    const { prompt } = await request.json();
    console.log('Request body:', prompt);
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    // Call Stable Diffusion API
    const response = await fetch('https://stablediffusionapi.com/api/v4/dreambooth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: process.env.STABLE_DIFFUSION_API_KEY || '',
          prompt: prompt,
          negative_prompt: "blurry, low quality, distorted, ugly, bad anatomy, bad proportions",
          model_id: "realistic-vision-v51",
          width: "512",
          height: "512",
          samples: "1",
          num_inference_steps: "20",
          guidance_scale: 7.5,
          safety_checker: "yes",
          webhook: null,
          track_id: null
        }),
      });
    console.log('Response:', response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Stable Diffusion API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      return NextResponse.json(
        { error: `Stable Diffusion API Error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.output || !data.output[0]) {
      return NextResponse.json(
        { error: 'Invalid response from Stable Diffusion API' },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl: data.output[0] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
} 