import React, { useRef, useState } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { AnimatedWords } from '../../components/ui/AnimatedWords';

interface IntroductionSectionProps {
    setView: (initialForm: 'login' | 'signup') => void;
}

export const IntroductionSection = ({ setView }: IntroductionSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [startSubtextAnimation, setStartSubtextAnimation] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    
    const rotateX = useSpring(0, { stiffness: 100, damping: 20 });
    const rotateY = useSpring(0, { stiffness: 100, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        const mouseX = clientX - left - width / 2;
        const mouseY = clientY - top - height / 2;
        rotateX.set((mouseY / height) * -15);
        rotateY.set((mouseX / width) * 15);
    };
    
    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } };
    const headlineWordVariants = { hidden: { opacity: 0, y: 30, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 15, stiffness: 100 } } };
    const dotVariants = { hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 12, stiffness: 200 } } };
    const pContainerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } } };
    const pWordVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

    return (
        <section ref={ref} id="home" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden" style={{ perspective: '2000px' }}>
            <motion.div className="container mx-auto px-4 sm:px-6 z-10" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter flex flex-wrap justify-center items-baseline" style={{ transform: 'translateZ(50px)' }}>
                   <AnimatedWords text="Ignite Your Synapse" wordVariants={headlineWordVariants} containerVariants={containerVariants} el="span" className="inline-block" animate={isInView ? "visible" : "hidden"} onAnimationComplete={() => setStartSubtextAnimation(true)} />
                   <motion.span variants={dotVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="inline-block ml-2 md:ml-4">
                       <div className="w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-sky-400 rounded-full"></div>
                   </motion.span>
                </h1>
                <div style={{ transform: 'translateZ(20px)' }}>
                     <AnimatedWords text="The AI-powered learning platform where teachers create, students conquer, and knowledge connects." wordVariants={pWordVariants} containerVariants={pContainerVariants} className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-700 dark:text-gray-300" animate={startSubtextAnimation ? "visible" : "hidden"} onAnimationComplete={() => setShowButtons(true)} />
                </div>
                <motion.div
                    className="mt-10 flex justify-center items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={showButtons ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    style={{ transform: 'translateZ(40px)' }}
                >
                    <motion.button onClick={() => setView('signup')} className="px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-shadow" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>Get Started</motion.button>
                    <motion.button onClick={() => setView('login')} className="px-8 py-3 bg-gray-500/10 dark:bg-gray-200/5 text-gray-800 dark:text-gray-300 font-semibold rounded-lg backdrop-blur-sm border border-gray-500/10" whileHover={{ scale: 1.05, y: -3, backgroundColor: 'rgba(107, 114, 128, 0.2)' }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>Login</motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
};