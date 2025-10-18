import React from 'react';
import { motion } from 'framer-motion';
import { BackIcon } from '../../components/ui/AuthIcons';
import { AutocompleteInput } from '../../components/ui/AutocompleteInput';
import type { Institution } from './AuthPage';

const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 } };
const pageTransition = { type: "spring", stiffness: 300, damping: 30 };

interface UniversitySelectionProps { 
    onBack: () => void; 
    onSelect: (institution: Institution) => void; 
}

export const UniversitySelection = ({ onBack, onSelect }: UniversitySelectionProps) => {
    return (
        <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}>
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6"><BackIcon /> Back</button>
            <h2 className="text-2xl font-bold text-center mb-2">Select Your Institution</h2>
            <p className="text-center text-slate-400 text-sm mb-6">This helps us tailor your experience.</p>
            <AutocompleteInput onSelect={onSelect} />
       </motion.div>
    );
};