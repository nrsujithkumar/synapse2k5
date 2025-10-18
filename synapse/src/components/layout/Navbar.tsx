import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon, X, Menu } from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';

// Define the types for the props this component accepts
interface NavbarProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setView: (initialForm: 'login' | 'signup') => void;
}

export const Navbar = ({ theme, toggleTheme, setView }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrolled(latest > 0.05);
    });

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'About', href: '#about' },
    ];
    
    // Animation variants for the nav items to stagger in
    const navContainerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
    };

    const navItemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
    };

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
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10' : 'bg-transparent'}`}>
                <motion.div 
                    className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center"
                    initial="hidden"
                    animate="visible"
                    variants={navContainerVariants}
                >
                    <motion.a href="#home" className="text-2xl font-bold tracking-wider text-gray-900 dark:text-white" variants={navItemVariants}>
                        Synapse<span className="text-sky-500">.</span>
                    </motion.a>
                    
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <motion.div key={link.name} variants={navItemVariants}>
                               <a 
                                    href={link.href} 
                                    // THIS IS THE FIX: The hover color is now explicitly set for both modes
                                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-sky-500 transition-colors"
                                >
                                    {link.name}
                                </a>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div className="flex items-center gap-4" variants={navItemVariants}>
                        <motion.button 
                            onClick={() => setView('signup')}
                            className="hidden md:inline-block bg-sky-500 text-white font-semibold text-sm px-4 py-2 rounded-full hover:bg-sky-600 transition-colors" 
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                        <Magnetic><ThemeToggle /></Magnetic>
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-300">
                                <AnimatePresence mode="wait">
                                    {isMenuOpen 
                                        ? <motion.div key="close" initial={{opacity:0, rotate: 90}} animate={{opacity:1, rotate: 0}} exit={{opacity:0, rotate: 90}}><X size={24} /></motion.div>
                                        : <motion.div key="menu" initial={{opacity:0, rotate: -90}} animate={{opacity:1, rotate: 0}} exit={{opacity:0, rotate: -90}}><Menu size={24} /></motion.div>
                                    }
                                </AnimatePresence>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div className="h-1 bg-sky-500 origin-left" style={{ scaleX: scrollYProgress }} />
            </header>
            
            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl border-l border-gray-200/50 dark:border-white/10 shadow-2xl flex flex-col items-center justify-center space-y-8"
                        >
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="text-2xl font-bold text-gray-800 dark:text-gray-200"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};