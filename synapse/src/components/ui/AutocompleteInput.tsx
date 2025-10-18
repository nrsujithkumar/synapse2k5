import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { institutions } from '../../utils/institutions';
import { UniversityIcon } from './AuthIcons';
import type { Institution } from '../../pages/auth/AuthPage';

interface AutocompleteProps {
    onSelect: (institution: Institution) => void;
}

export const AutocompleteInput = ({ onSelect }: AutocompleteProps) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Institution[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.length > 0) {
            const filtered = institutions.filter(inst =>
                inst.name.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);
    
    const handleSelect = (inst: Institution) => {
        setQuery(inst.name);
        setShowSuggestions(false);
        onSelect(inst);
    }

    return (
        <div className="relative" ref={wrapperRef}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your university..."
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
            <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                        {suggestions.map((inst) => (
                            <li key={inst.id}>
                                <button
                                    onClick={() => handleSelect(inst)}
                                    className="w-full text-left p-4 hover:bg-sky-500/20 transition-colors flex items-center gap-4"
                                >
                                   <UniversityIcon className="w-6 h-6 text-slate-400"/> {inst.name}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};