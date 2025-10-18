import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import type { UserRole, Selections } from './AuthPage';
import { BackIcon, CheckCircleIcon } from '../../components/ui/AuthIcons';
import { AuthButton } from '../../components/ui/AuthComponents';

const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 }, };
const pageTransition = { type: "spring", stiffness: 300, damping: 30 };

const studentEducationLevels = ["High School", "Bachelor's Degree", "Master's Degree", "Ph.D."];
const teacherProfessions = ["University Professor", "High School Teacher", "Corporate Trainer", "Independent Tutor"];
const studentGoals = ["Learn a new skill", "Explore a hobby", "Prepare for a degree"];
const teacherGoals = ["Create courses", "Share my expertise", "Develop a curriculum"];
const interests = ["Physics", "History", "Computer Science", "Art & Design", "Math", "Literature", "Biology"];

// --- Individual Onboarding Step Components ---
const OnboardingStep1 = ({ name, onNext }: { name: string; onNext: () => void; }) => ( <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="text-center"> <h2 className="text-3xl font-bold mb-4">Welcome, {name}!</h2> <p className="text-slate-400 max-w-sm mx-auto mb-8">Let's personalize your experience.</p> <AuthButton onClick={onNext}>Get Started</AuthButton> </motion.div> );
const OnboardingStep2 = ({ role, onSelect }: { role: UserRole; onSelect: (value: string) => void; }) => { const q = role === 'student' ? "What's your education level?" : "What's your profession?"; const opts = role === 'student' ? studentEducationLevels : teacherProfessions; return ( <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}> <h3 className="text-xl font-bold text-center mb-6">{q}</h3> <div className="space-y-3"> {opts.map(opt => ( <motion.button key={opt} onClick={() => onSelect(opt)} className="w-full text-left p-4 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-sky-500/20 hover:border-sky-500 transition-all" whileHover={{ x: 5 }}>{opt}</motion.button> ))} </div> </motion.div> ); };
const OnboardingStep3 = ({ role, onSelect }: { role: UserRole; onSelect: (value: string) => void; }) => { const goals = role === 'student' ? studentGoals : teacherGoals; return ( <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}> <h3 className="text-xl font-bold text-center mb-6">What's your main goal on Synapse?</h3> <div className="space-y-3"> {goals.map(goal => ( <motion.button key={goal} onClick={() => onSelect(goal)} className="w-full text-left p-4 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-sky-500/20 hover:border-sky-500 transition-all" whileHover={{ x: 5 }}>{goal}</motion.button> ))} </div> </motion.div> ); };
const OnboardingStep4 = ({ role, selections, onToggle, onNext }: { role: UserRole; selections: Selections; onToggle: (value: string) => void; onNext: () => void; }) => { const q = role === 'student' ? "What topics are you interested in?" : "What topics do you teach?"; return ( <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}> <h3 className="text-xl font-bold text-center mb-6">{q}</h3> <div className="flex flex-wrap justify-center gap-3 mb-8"> {interests.map(interest => { const isSelected = selections.interests.includes(interest); return <motion.button key={interest} onClick={() => onToggle(interest)} className={`px-4 py-2 text-sm border-2 rounded-full transition-all ${isSelected ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-600 hover:border-sky-500'}`} whileTap={{ scale: 0.95 }}>{interest}</motion.button> })} </div> <AuthButton onClick={onNext} disabled={selections.interests.length === 0}>Continue</AuthButton> </motion.div> ); };
const OnboardingStep5 = () => {
    const handleGoToDashboard = async () => {
        if (auth.currentUser) {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userDocRef, { onboardingComplete: true });
        }
    };
    return ( <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="text-center flex flex-col items-center"> <CheckCircleIcon className="w-16 h-16 text-green-400" /> <h2 className="text-3xl font-bold my-4">You're all set!</h2> <p className="text-slate-400 max-w-xs mx-auto mb-8">Your experience is personalized. Get ready to start your journey.</p> <AuthButton onClick={handleGoToDashboard}>Go to Dashboard</AuthButton> </motion.div> );
};

// --- Main Onboarding Component ---
interface OnboardingProps { role: UserRole; name: string; onBack: () => void; }
export const Onboarding = ({ role, name, onBack }: OnboardingProps) => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState<Selections>({ education: '', profession: '', goal: '', interests: [] });
    const handleBackStep = () => { if (step > 1) setStep(step - 1); else onBack(); };
    const handleSelectStep2 = (value: string) => { setSelections(p => ({ ...p, [role === 'student' ? 'education' : 'profession']: value })); setStep(3); };
    const handleSelectStep3 = (goal: string) => { setSelections(p => ({ ...p, goal })); setStep(4); };
    const handleToggleInterest = (interest: string) => { setSelections(p => ({ ...p, interests: p.interests.includes(interest) ? p.interests.filter(i => i !== interest) : [...p.interests, interest] })); };

    return (
        <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="flex flex-col h-full">
            <button onClick={handleBackStep} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8"><BackIcon /> Back</button>
            <div className="flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {step === 1 && <OnboardingStep1 key={1} name={name} onNext={() => setStep(2)} />}
                    {step === 2 && <OnboardingStep2 key={2} role={role} onSelect={handleSelectStep2} />}
                    {step === 3 && <OnboardingStep3 key={3} role={role} onSelect={handleSelectStep3} />}
                    {step === 4 && <OnboardingStep4 key={4} role={role} selections={selections} onToggle={handleToggleInterest} onNext={() => setStep(5)} />}
                    {step === 5 && <OnboardingStep5 key={5} />}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};