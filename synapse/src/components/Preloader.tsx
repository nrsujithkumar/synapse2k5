import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
    const words = ["Learn", "Connect", "Grow", "Synapse"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index === words.length - 1) return;

        // THIS IS THE FIX: Changed the delay from 800ms to 600ms for a slightly faster pace.
        const timer = setTimeout(() => {
            setIndex(index + 1);
        }, 600); // Each word now displays for 0.6 seconds.

        return () => clearTimeout(timer);
    }, [index]);

    const handleAnimationComplete = () => {
        // A short delay after the final animation before transitioning out.
        setTimeout(onComplete, 200);
    };

    return (
        <div className="relative text-5xl font-bold text-gray-900 dark:text-white overflow-hidden h-16 flex items-center">
            <motion.div
                key={index}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center"
            >
                <span>{words[index]}</span>
                {index === words.length - 1 && (
                    <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="text-sky-400"
                        onAnimationComplete={handleAnimationComplete}
                    >
                        .
                    </motion.span>
                )}
            </motion.div>
        </div>
    );
};