import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedWordsProps {
    text: string;
    el?: 'p' | 'h1' | 'span';
    className?: string;
    containerVariants: unknown;
    wordVariants: unknown;
    animate: string;
    onAnimationComplete?: () => void;
}

export const AnimatedWords = ({ text, el: Wrapper = 'p', ...props }: AnimatedWordsProps) => {
    const words = text.split(' ');
    const MotionWrapper = motion[Wrapper];

    return (
        <MotionWrapper
            className={props.className}
            variants={props.containerVariants}
            initial="hidden"
            animate={props.animate}
            onAnimationComplete={props.onAnimationComplete}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={props.wordVariants}
                    style={{ display: 'inline-block' }}
                >
                    {word + (i !== words.length - 1 ? '\u00A0' : '')}
                </motion.span>
            ))}
        </MotionWrapper>
    );
};