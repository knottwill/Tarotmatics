'use client';

import { useEffect, useState } from 'react';

const ParticleBackground = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const createParticle = () => {
      const size = Math.random() * 4 + 1;
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 10 + 10;
      const shape = Math.random() > 0.7 ? 'star' : 'circle';
      const rotation = Math.random() * 360;
      const scale = Math.random() * 0.5 + 0.5;

      const getShapeStyle = () => {
        if (shape === 'star') {
          return {
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          };
        }
        return {};
      };

      return (
        <div
          key={Math.random()}
          className="particle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: '-10px',
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            transform: `rotate(${rotation}deg) scale(${scale})`,
            ...getShapeStyle(),
          }}
        />
      );
    };

    const newParticles = Array.from({ length: 30 }, createParticle);
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles((prev) => {
        const newParticle = createParticle();
        return [...prev.slice(1), newParticle];
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <>{particles}</>;
};

export default ParticleBackground; 