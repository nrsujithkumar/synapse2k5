import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { BrainCircuit, TrendingUp, PenSquare, LayoutGrid, MessageSquare } from 'lucide-react';

export const HowItWorksSection = ({ theme }: { theme: 'light' | 'dark' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
    
    const steps = [
        { icon: BrainCircuit, title: "AI-Powered Adaptive Quizzes", description: "Quizzes adapt in real-time. Correct answers lead to harder questions, while wrong answers trigger easier ones to reinforce concepts, all powered by the Gemini API." },
        { icon: TrendingUp, title: "Gamified Progress Tracking", description: "The student dashboard uses animated progress bars and badges to make tracking performance feel rewarding and fun, encouraging continuous engagement." },
        { icon: PenSquare, title: "AI-Assisted Content Creation", description: "Teachers can provide a simple topic, and our AI will generate a full quiz or course description, which can then be edited and approved." },
        { icon: LayoutGrid, title: "Course & Student Management", description: "A centralized dashboard for teachers with clear lists of their courses, enrolled students, and submitted assignments, simplifying administration." },
        { icon: MessageSquare, title: "Real-time Discussion Forums", description: "Using Firestore's real-time capabilities, course forums update instantly, making conversations fluid and dynamic without needing to refresh." }
    ];

    return (
        <section id="how-it-works" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center py-24">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white">How It All Works</h2>
                    <p className="mt-4 max-w-xl mx-auto text-lg text-gray-700 dark:text-gray-300">A glimpse into the technology powering Synapse.</p>
                </div>
                
                <div className="relative max-w-2xl mx-auto">
                    {theme === 'dark' && (
                        <motion.div 
                            style={{ scaleY: scrollYProgress }} 
                            className="absolute left-6 top-0 w-1 bg-sky-400 bottom-0 origin-top" 
                        />
                    )}
                    <div className="space-y-16">
                        {steps.map((step, i) => (
                           <motion.div 
                                key={i}
                                className="relative flex items-start group"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                           >
                               <div className="absolute -left-1 top-0 flex items-center justify-center">
                                  <motion.div 
                                      className="w-14 h-14 rounded-full bg-white dark:bg-[#0a0a0a] border-2 border-sky-400/30 flex items-center justify-center group-hover:border-sky-400 transition-colors duration-300"
                                      initial={{ scale: 0 }}
                                      whileInView={{ scale: 1 }}
                                      viewport={{ once: true, amount: 0.8 }}
                                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                                  >
                                      <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
                                          <step.icon className="w-6 h-6 text-sky-400" />
                                      </motion.div>
                                  </motion.div>
                               </div>
                               <div className="pl-24">
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-sky-400 transition-colors duration-300">{step.title}</h3>
                                  <p className="mt-2 text-base text-gray-700 dark:text-gray-300">{step.description}</p>
                               </div>
                           </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};