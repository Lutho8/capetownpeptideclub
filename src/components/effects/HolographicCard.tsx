import { useRef, useState, useCallback, type ReactNode } from 'react';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function HolographicCard({ children, className = '', onClick }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('rotateX(0deg) rotateY(0deg)');
    setGlarePos({ x: 50, y: 50 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative group cursor-pointer ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="relative w-full h-full rounded-xl transition-transform duration-150 ease-out will-change-transform"
        style={{
          transform: transform,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated gradient border */}
        <div
          className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: isHovered
              ? 'conic-gradient(from 0deg, transparent 0%, #c8ff00 20%, transparent 40%, #8b7aff 60%, transparent 80%, #c8ff00 100%)'
              : 'none',
            filter: 'blur(0.5px)',
            animation: isHovered ? 'spin 4s linear infinite' : 'none',
            zIndex: 0,
          }}
        />

        {/* Card content */}
        <div className="relative z-10 w-full h-full bg-black/90 backdrop-blur-sm rounded-xl border border-white/[0.06] group-hover:border-white/[0.14] transition-colors duration-300 overflow-hidden">
          {children}

          {/* Glare effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(200,255,0,0.08) 0%, transparent 60%)`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
