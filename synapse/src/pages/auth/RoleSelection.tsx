import React from 'react';
import { motion } from 'framer-motion';
import { StudentIcon, TeacherIcon } from '../../components/ui/AuthIcons';
import { RoleCard } from '../../components/ui/AuthComponents';
import type { UserRole } from './AuthPage';

const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 } };
const pageTransition = { type: "spring", stiffness: 300, damping: 30 };

interface RoleSelectionProps { 
    onSelect: (role: UserRole) => void; 
}

export const RoleSelection = ({ onSelect }: RoleSelectionProps) => {
    return (
        <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}>
             <h2 className="text-2xl font-bold text-center mb-8">First, tell us who you are</h2>
             <div className="flex flex-col sm:flex-row gap-6 w-full">
                 <RoleCard role="Student" description="Browse courses and track your progress." icon={<StudentIcon className="w-10 h-10 mb-4 text-sky-300"/>} onClick={() => onSelect('student')} />
                 <RoleCard role="Teacher" description="Create courses and manage students." icon={<TeacherIcon className="w-10 h-10 mb-4 text-teal-300"/>} onClick={() => onSelect('teacher')} />
             </div>
        </motion.div>
    );
};