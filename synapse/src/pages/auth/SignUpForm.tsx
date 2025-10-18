
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import type { UserRole, Institution } from './AuthPage';
import { InputWrapper, AuthButton, SocialLogins, PasswordStrengthMeter } from '../../components/ui/AuthComponents';
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '../../components/ui/AuthIcons';

interface SignUpFormProps { 
    role: UserRole; 
    institution: Institution | null;
    setIsLogin: (isLogin: boolean) => void; 
    onSignupSuccess: (name: string) => void; 
}

export const SignUpForm = ({ role, institution, setIsLogin, onSignupSuccess }: SignUpFormProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => { 
        e.preventDefault(); 
        setError('');
        if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
        if (!institution) { setError('Institution not selected. Please go back.'); return; }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid, name, email, role, 
                institutionId: institution.id, 
                institutionName: institution.name,
                onboardingComplete: false // CRITICAL FOR ONBOARDING
            });
            onSignupSuccess(name);
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') { setError('This email is already registered.'); }
            else if (err.code === 'auth/weak-password') { setError('Password must be at least 6 characters.'); }
            else { setError('Failed to create account. Please try again.'); }
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="text-2xl font-bold text-center mb-1">Create <span className="capitalize text-sky-400">{role}</span> Account</h2>
            <p className="text-center text-sm text-slate-400 mb-6">Let's get you started.</p>
            <form className="space-y-4" onSubmit={handleSignUp}>
                <InputWrapper icon={<UserIcon />} placeholder="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                <InputWrapper icon={<MailIcon />} placeholder="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <InputWrapper icon={<LockIcon />} placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} trailingIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />} onTrailingIconClick={() => setShowPassword(!showPassword)} required />
                <InputWrapper icon={<LockIcon />} placeholder="Confirm Password" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                <PasswordStrengthMeter password={password} />
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <AuthButton>Create Account</AuthButton>
            </form>
            <SocialLogins />
            <p className="text-center text-sm text-slate-400 mt-6">
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)} className="font-semibold text-sky-400 hover:underline">Log in</button>
            </p>
        </motion.div>
    );
};