import { motion, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

interface TiltSectionProps {
  children: React.ReactNode;
}

export const TiltSection = ({ children }: TiltSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(yPct * -20);
    rotateY.set(xPct * 20);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full"
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
};