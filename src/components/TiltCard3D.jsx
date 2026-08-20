import React, { useRef, useState } from 'react';

export const TiltCard3D = ({
  children,
  className = '',
  maxRotation = 8,
  perspective = 1000,
  scale = 1.02,
  glowColor = 'rgba(16, 185, 129, 0.15)',
}) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width;
    const yPct = mouseY / height;

    const rY = (xPct - 0.5) * (maxRotation * 2);
    const rX = (0.5 - yPct) * (maxRotation * 2);

    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({
      x: xPct * 100,
      y: yPct * 100,
      opacity: 1,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* Dynamic Holographic Glare Layer */}
        <div
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glowColor}, transparent 60%)`,
            opacity: glarePosition.opacity,
            transition: 'opacity 0.3s ease-out',
            pointerEvents: 'none',
          }}
          className="absolute inset-0 rounded-3xl z-30"
        />
      </div>
    </div>
  );
};
