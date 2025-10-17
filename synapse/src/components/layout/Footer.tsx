import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export const Footer = () => {
    const year = new Date().getFullYear();
    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'About', href: '#about' },
    ];

    return (
        <footer className="border-t border-gray-200/10 dark:border-white/10 mt-24">
            <div className="container mx-auto px-6 py-16">
                
                {/* Main footer content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Logo and Tagline */}
                    <div className="lg:col-span-5">
                        <a href="#home" className="text-2xl font-bold tracking-wider text-gray-900 dark:text-white">
                            Synapse<span className="text-sky-400">.</span>
                        </a>
                        <p className="text-base text-gray-600 dark:text-gray-400 mt-4 max-w-xs">
                            Ignite Your Potential.
                        </p>
                    </div>
                    
                    {/* Right Columns: Links */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                        
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white tracking-wider uppercase text-sm">Navigate</h3>
                            <ul className="mt-4 space-y-3">
                                {navLinks.map(link => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-base text-gray-600 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white tracking-wider uppercase text-sm">Contact</h3>
                            <ul className="mt-4 space-y-3">
                                <li>
                                    <a href="mailto:support@synapse.app" className="text-base text-gray-600 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                                        support@synapse.app
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white tracking-wider uppercase text-sm">Social</h3>
                            <ul className="mt-4 flex items-center gap-4">
                                <li>
                                    <motion.a 
                                        href="https://github.com/your-repo-link" // Remember to change this link
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-gray-600 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400"
                                    >
                                        <Github size={24} />
                                    </motion.a>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>

                {/* Bottom copyright section */}
                <div className="mt-16 pt-8 border-t border-gray-200/10 dark:border-white/10 text-center text-base text-gray-500">
                    <p>&copy; {year} Synapse Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};