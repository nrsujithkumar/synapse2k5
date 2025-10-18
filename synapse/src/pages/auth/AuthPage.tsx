import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import { institutions } from '../../utils/institutions';

import { UserIcon, MailIcon, LockIcon, StudentIcon, TeacherIcon, BackIcon, CheckCircleIcon, UniversityIcon, EyeIcon, EyeOffIcon, GoogleIcon, GitHubIcon } from '../../components/ui/AuthIcons';

// --- Type Definitions (Now self-contained) ---
type AuthState = 'roleSelection' | 'universitySelection' | 'authForm' | 'onboarding';
type UserRole = 'student' | 'teacher' | null;
interface Selections { education: string; profession: string; goal: string; interests: string[]; }
interface Institution { id: string; name: string; }

// --- Animation Variants ---
const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 }, };
const pageTransition = { type: "spring", stiffness: 300, damping: 30 };

// --- Main Auth Page Component ---
interface AuthPageProps {
    setView: (view: 'landing' | 'auth') => void;
    initialStep: 'login' | 'signup';
}

const AuthPage = ({ setView, initialStep }: AuthPageProps) => {
    const [authState, setAuthState] = useState<AuthState>('roleSelection');
    const [userRole, setUserRole] = useState<UserRole>(null);
    const [userName, setUserName] = useState<string>('');
    const [institution, setInstitution] = useState<Institution | null>(null);

    const go = (state: AuthState) => setAuthState(state);
    
    // This logic ensures that when a user is new and hasn't completed onboarding,
    // they are automatically sent to the onboarding step.
    useEffect(() => {
        if (auth.currentUser && authState !== 'onboarding') {
            const name = auth.currentUser.displayName || "User";
            setUserName(name);
            setAuthState('onboarding');
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
            <div className="aurora-bg"></div>
            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-8">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl font-bold text-white">
                        Synapse<span className="text-sky-500">.</span>
                    </motion.h1>
                </div>
                <motion.div layout className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 min-h-[500px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {authState === 'roleSelection' && <RoleSelection key="role" onSelect={(role) => { setUserRole(role); go('universitySelection'); }} />}
                        {authState === 'universitySelection' && <UniversitySelection key="uni" onBack={() => go('roleSelection')} onSelect={(inst) => { setInstitution(inst); go('authForm'); }} />}
                        {authState === 'authForm' && <AuthForms key="auth" role={userRole} institution={institution} onBack={() => go('universitySelection')} setAuthState={setAuthState} setUserName={setUserName} initialForm={initialStep} />}
                        {authState === 'onboarding' && <Onboarding key="onboarding" role={userRole} name={userName} onBack={() => go('authForm')} />}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};
export default AuthPage;

// --- All Sub-components are now inside this one file ---

// ... (Paste the complete code for RoleSelection, UniversitySelection, AuthForms, LoginForm, SignUpForm, and Onboarding components here)
// I will provide this in the next message to keep this one readable.