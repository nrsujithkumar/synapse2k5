import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// This is the animation we'll apply to each item.
const itemAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
};

export const AboutSection = () => {
    const ref = useRef(null);
    // This hook will trigger the animation when the section scrolls into view.
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="about" ref={ref} className="relative min-h-screen flex items-center justify-center py-24">
            <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
                
                {/* Each motion element now has its own animation props. */}
                <motion.p
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={itemAnimation}
                    transition={{ delay: 0.1 }} // Smallest delay
                    className="text-sm font-bold tracking-widest text-sky-400 uppercase"
                >
                    ABOUT SYNAPSE
                </motion.p>
                
                <motion.h2
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={itemAnimation}
                    transition={{ delay: 0.2 }} // Slightly longer delay
                    className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white"
                >
                    Forged by Code Cosmos
                </motion.h2>
                
                <motion.p
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={itemAnimation}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                    At Code Cosmos, we believe in building more than just applications; we build entire universes of possibility with code. We saw that digital education was often a static, one-way street—a collection of files and links rather than a living ecosystem.
                </motion.p>
                
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={itemAnimation}
                    transition={{ delay: 0.4 }}
                    className="my-8"
                >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Synapse is our answer.</h3>
                </motion.div>
                
                <motion.p
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={itemAnimation}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                    It’s a learning platform born from a passion for both elegant code and the limitless potential of the human mind. We've designed it to be more than a tool—it’s an intelligent partner in the educational journey.
                </motion.p>
                
                <motion.p
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={itemAnimation} // I used a single variant object here
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-semibold italic"
                >
                    Our mission is to create the connections—the synapses—that spark true learning and growth.
                </motion.p>
            </div>
        </section>
    );
};