import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackIcon } from '../../components/ui/AuthIcons';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import type { UserRole, AuthState, Institution } from './AuthPage';

const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 } };
const pageTransition = { type: "spring", stiffness: 300, damping: 30 };

interface AuthFormsProps { 
    role: UserRole; 
    institution: Institution | null;
    onBack: () => void; 
    setAuthState: (state: AuthState) => void; 
    setUserName: (name: string) => void; 
    initialForm: 'login' | 'signup';
}

export const AuthForms = ({ role, institution, onBack, setAuthState, setUserName, initialForm }: AuthFormsProps) => {
    const [isLogin, setIsLogin] = useState(initialForm === 'login');

    const handleSignupSuccess = (name: string) => { 
        setUserName(name); 
        setAuthState('onboarding'); 
    };

    return (
        <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}>
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4"><BackIcon /> Back</button>
            <AnimatePresence mode="wait">
                {isLogin 
                    ? <LoginForm key="login" role={role} setIsLogin={setIsLogin} />
                    : <SignUpForm key="signup" role={role} institution={institution} setIsLogin={setIsLogin} onSignupSuccess={handleSignupSuccess} />
                }
            </AnimatePresence>
        </motion.div>
    );
};