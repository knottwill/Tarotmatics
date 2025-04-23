import { useEffect, useRef } from 'react';

export function CrystalBallAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.4;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Calculate pulsing values
      const pulseProgress = Math.sin(timeRef.current) * 0.5 + 0.5; // 0 to 1
      const currentRadius = maxRadius * (0.8 + pulseProgress * 0.2);
      const currentOpacity = 0.5 + pulseProgress * 0.3;
      
      // Create gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, currentRadius
      );
      gradient.addColorStop(0, `rgba(147, 51, 234, ${currentOpacity})`);
      gradient.addColorStop(0.5, `rgba(147, 51, 234, ${currentOpacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
      
      // Draw glow
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fill();
      
      timeRef.current += 0.01;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="w-32 h-32"
      />
    </div>
  );
} 