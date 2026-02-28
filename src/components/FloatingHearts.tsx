import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: Heart[] = [];
      for (let i = 0; i < 12; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          size: 8 + Math.random() * 16,
          duration: 15 + Math.random() * 20,
          delay: Math.random() * 10,
          opacity: 0.1 + Math.random() * 0.2,
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
            fontSize: `${heart.size}px`,
            color: '#D4A5A5',
            opacity: heart.opacity,
            animation: `floatUp ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          &#9829;
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--heart-opacity, 0.2);
          }
          90% {
            opacity: var(--heart-opacity, 0.2);
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default FloatingHearts;
