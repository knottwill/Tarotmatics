import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
  distance: number;
}

export function MagicSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const sparklesRef = useRef<Sparkle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to viewport
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Initialize sparkles
    const initSparkles = () => {
      const sparkles: Sparkle[] = [];
      for (let i = 0; i < 30; i++) {
        sparkles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Smaller sparkles
          speed: Math.random() * 0.3 + 0.1, // Slower movement
          opacity: Math.random() * 0.3 + 0.2, // More subtle
          angle: Math.random() * Math.PI * 2,
          distance: Math.random() * 30 + 10, // Shorter trails
        });
      }
      return sparkles;
    };

    sparklesRef.current = initSparkles();

    const draw = () => {
      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update sparkles
      sparklesRef.current.forEach((sparkle) => {
        // Update position
        sparkle.x += Math.cos(sparkle.angle) * sparkle.speed;
        sparkle.y += Math.sin(sparkle.angle) * sparkle.speed;

        // Wrap around edges
        if (sparkle.x < 0) sparkle.x = canvas.width;
        if (sparkle.x > canvas.width) sparkle.x = 0;
        if (sparkle.y < 0) sparkle.y = canvas.height;
        if (sparkle.y > canvas.height) sparkle.y = 0;

        // Draw sparkle
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${sparkle.opacity})`;
        ctx.fill();

        // Add glow effect
        const gradient = ctx.createRadialGradient(
          sparkle.x,
          sparkle.y,
          0,
          sparkle.x,
          sparkle.y,
          sparkle.size * 3
        );
        gradient.addColorStop(0, `rgba(147, 51, 234, ${sparkle.opacity})`);
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
} 