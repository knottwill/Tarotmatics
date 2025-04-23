import { useEffect, useRef } from 'react';

interface CrystalBallAnimationProps {
  isSpeaking: boolean;
}

export function CrystalBallAnimation({ isSpeaking }: CrystalBallAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const lastIsSpeakingRef = useRef<boolean>(false);

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
      
      // Draw outer glow
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius
      );
      gradient.addColorStop(0, 'rgba(147, 51, 234, 0.8)'); // Purple
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.3)');
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw pulsing circles
      const numCircles = 3;
      for (let i = 0; i < numCircles; i++) {
        const progress = (timeRef.current + i * 0.5) % 1;
        const radius = maxRadius * 0.3 * (1 - progress);
        const alpha = isSpeaking ? 1 - progress : 0.3 - progress * 0.3;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Reset time when speech state changes
      if (isSpeaking !== lastIsSpeakingRef.current) {
        timeRef.current = 0;
        lastIsSpeakingRef.current = isSpeaking;
      }
      
      timeRef.current += 0.005;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpeaking]);

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