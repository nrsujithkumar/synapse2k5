import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, User } from 'lucide-react';

export const CoreFeaturesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const features = [
        { icon: BookOpen, audience: "FOR TEACHERS", title: "Effortless Course Management", description: "Streamline your entire workflow from creation to grading. Design engaging courses, create assignments with ease, and unleash our AI co-pilot to generate adaptive quizzes that challenge every student at their own level. With our real-time discussion forums and easy file uploads, you have everything you need to build a thriving digital classroom." },
        { icon: User, audience: "FOR STUDENTS", title: "A Personalized Learning Journey", description: "Say goodbye to one-size-fits-all education. Synapse creates a learning path tailored to your pace and style. Track your progress on a gamified dashboard, master skills with our AI-powered adaptive quizzes that get harder as you get smarter, and never miss a beat with instant notifications for grades and new assignments." }
    ];

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } };
    const cardVariants = { hidden: { opacity: 0, y: 50, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } } };
    
    return (
        <section id="features" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white">Built for Modern Education</h2>
                <p className="mt-4 max-w-xl mx-auto text-lg text-gray-700 dark:text-gray-300">Tools for every role in the learning ecosystem.</p>
            </div>
            <motion.div 
                className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {features.map((feature, i) => (
                    <motion.div key={i} variants={cardVariants}>
                        <motion.div 
                            className="relative p-8 h-full rounded-3xl bg-white dark:bg-white/5 shadow-md hover:shadow-2xl dark:shadow-none border border-gray-200/50 dark:border-white/10 backdrop-blur-xl overflow-hidden flex flex-col transition-shadow duration-300"
                            initial="rest"
                            whileHover="hover"
                        >
                            <div className="flex items-center gap-4">
                                <motion.div variants={{ hover: { scale: 1.1, y: -5 } }} transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
                                    <feature.icon className="w-8 h-8 text-sky-400" />
                                </motion.div>
                                <span className="text-sm font-bold tracking-widest text-sky-400 uppercase">{feature.audience}</span>
                            </div>
                            <motion.h3 variants={{ hover: { skewX: -3, color: '#38bdf8' } }} className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">{feature.title}</motion.h3>
                            <p className="mt-4 text-base text-gray-700 dark:text-gray-300 flex-grow">{feature.description}</p>
                       </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};