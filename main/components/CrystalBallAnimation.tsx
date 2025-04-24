import { useEffect, useRef } from 'react';
import { useFlowEventListener } from '@speechmatics/flow-client-react';

export function CrystalBallAnimation({ color = 'purple' }: { color?: 'purple' | 'blue' }) {
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
      const currentOpacity = 0.3 + pulseProgress * 0.7; // Increased range from 0.3-1.0
      
      // Create gradient with dynamic color
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, currentRadius
      );
      const baseColor = color === 'purple' ? '147, 51, 234' : '59, 130, 246';
      gradient.addColorStop(0, `rgba(${baseColor}, ${currentOpacity})`);
      gradient.addColorStop(0.5, `rgba(${baseColor}, ${currentOpacity * 0.6})`);
      gradient.addColorStop(1, `rgba(${baseColor}, 0)`);
      
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
  }, [color]);

  return (
    <div className="relative w-48 h-48">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
} 