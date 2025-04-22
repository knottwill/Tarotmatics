import axios from 'axios';

// For demonstration purposes, we'll use placeholder images
// In a real implementation, this would connect to an AI image generation service like DALL-E or Stable Diffusion
const placeholderImages = [
  'https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1587552602070-15a466d52257?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1581390736620-51329d10a5d6?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1642332279531-76a3f457bc9f?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1645497191493-5b99564acf75?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1659025435463-a039676b45a9?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1661077587631-073319ec3d9a?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1531171573293-b9e8dea9c7c3?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1648198835787-9f1b46dd261b?q=80&w=600&auto=format',
];

/**
 * Generates a card image based on a prompt
 * In this prototype, we'll just return placeholder images,
 * but this would connect to an AI image generation service in production
 */
export async function generateCardImage(prompt: string): Promise<string> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, we would call OpenAI API here:
    // const response = await axios.post('https://api.openai.com/v1/images/generations', {
    //   model: "dall-e-3",
    //   prompt: prompt,
    //   n: 1,
    //   size: "1024x1024",
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    //   }
    // });
    // return response.data.data[0].url;
    
    // For now, return random image from placeholders
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    return placeholderImages[randomIndex];
  } catch (error) {
    console.error('Error generating image:', error);
    // Return a default image if there's an error
    return 'https://images.unsplash.com/photo-1656427868828-79eea4a41b44?q=80&w=600&auto=format';
  }
} 