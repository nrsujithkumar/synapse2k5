// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
// import { Sun, Moon, X, Menu } from 'lucide-react';
// import { Magnetic } from '../ui/Magnetic';

// export const Navbar = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => {
//     const [scrolled, setScrolled] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const { scrollYProgress } = useScroll();

//     useMotionValueEvent(scrollYProgress, "change", (latest) => {
//         setScrolled(latest > 0.05);
//     });

//     const navLinks = [
//         { name: 'Features', href: '#features' },
//         { name: 'How It Works', href: '#how-it-works' },
//         { name: 'About', href: '#about' },
//     ];
    
//     // Animation variants for the nav items to stagger in
//     const navContainerVariants = {
//         hidden: {},
//         visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
//     };

//     const navItemVariants = {
//         hidden: { y: -20, opacity: 0 },
//         visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
//     };

//     const ThemeToggle = () => (
//         <button
//             onClick={toggleTheme}
//             className="w-10 h-10 bg-gray-200/50 dark:bg-white/5 backdrop-blur-md border border-gray-300/50 dark:border-white/10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-sky-500 transition-colors duration-300"
//         >
//             <AnimatePresence mode="wait">
//                 <motion.div key={theme} initial={{opacity:0, rotate: -90}} animate={{opacity:1, rotate: 0}} exit={{opacity:0, rotate: 90}} transition={{duration: 0.2}}>
//                     {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
//                 </motion.div>
//             </AnimatePresence>
//         </button>
//     );

//     return (
//         <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10' : 'bg-transparent'}`}>
//             <motion.div 
//                 className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center"
//                 initial="hidden"
//                 animate="visible"
//                 variants={navContainerVariants}
//             >
//                 <motion.a href="#home" className="text-2xl font-bold tracking-wider text-gray-900 dark:text-white" variants={navItemVariants}>
//                     Synapse<span className="text-sky-500">.</span>
//                 </motion.a>
//                 <nav className="hidden md:flex items-center gap-8">
//                     {navLinks.map(link => (
//                         <motion.div key={link.name} variants={navItemVariants}>
//                            {/* THIS IS THE FIX: A simple link with a clean hover effect */}
//                            <a 
//                                 href={link.href} 
//                                 className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-500 transition-colors"
//                             >
//                                 {link.name}
//                             </a>
//                         </motion.div>
//                     ))}
//                 </nav>
//                 <motion.div className="flex items-center gap-4" variants={navItemVariants}>
//                     <motion.button className="hidden md:inline-block bg-sky-500 text-white font-semibold text-sm px-4 py-2 rounded-full hover:bg-sky-600 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                         Get Started
//                     </motion.button>
//                     <Magnetic><ThemeToggle /></Magnetic>
//                     <div className="md:hidden">
//                         <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-300">
//                             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                         </button>
//                     </div>
//                 </motion.div>
//             </motion.div>
//             <motion.div className="h-1 bg-sky-500 origin-left" style={{ scaleX: scrollYProgress }} />
//         </header>
//     );
// };
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon, X, Menu } from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';

export const Navbar = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrolled(latest > 0.05);
    });

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'About', href: '#about' },
    ];

    const ThemeToggle = () => (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 bg-gray-200/50 dark:bg-white/5 backdrop-blur-md border border-gray-300/50 dark:border-white/10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-sky-500 transition-colors duration-300"
        >
            <AnimatePresence mode="wait">
                <motion.div key={theme} initial={{opacity:0, rotate: -90}} animate={{opacity:1, rotate: 0}} exit={{opacity:0, rotate: 90}} transition={{duration: 0.2}}>
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
            </AnimatePresence>
        </button>
    );

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                <a href="#home" className="text-2xl font-bold tracking-wider text-gray-900 dark:text-white">
                    Synapse<span className="text-sky-500">.</span>
                </a>
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        // THIS IS THE FIX for blue text. It now works in both modes.
                        <a key={link.name} href={link.href} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-sky-500 transition-colors">
                            {link.name}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <motion.button className="hidden md:inline-block bg-sky-500 text-white font-semibold text-sm px-4 py-2 rounded-full hover:bg-sky-600 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Get Started
                    </motion.button>
                    <Magnetic><ThemeToggle /></Magnetic>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-300">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            <motion.div className="h-1 bg-sky-500 origin-left" style={{ scaleX: scrollYProgress }} />
        </header>
    );
};