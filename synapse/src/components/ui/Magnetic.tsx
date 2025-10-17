import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

interface MagneticProps {
  children: React.ReactElement;
}

export const Magnetic = ({ children }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      ref={ref}
      animate={{ x: x * 0.2, y: y * 0.2 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
};