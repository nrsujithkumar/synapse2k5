import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import type { UserRole } from './AuthPage';
import { InputWrapper, AuthButton, SocialLogins } from '../../components/ui/AuthComponents';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '../../components/ui/AuthIcons';

interface LoginFormProps { 
    role: UserRole; 
    setIsLogin: (isLogin: boolean) => void; 
}

export const LoginForm = ({ role, setIsLogin }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Please enter both email and password.'); return; }
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="text-2xl font-bold text-center mb-1">Welcome Back, <span className="capitalize text-sky-400">{role}</span></h2>
            <p className="text-center text-sm text-slate-400 mb-6">Log in to continue.</p>
            <form className="space-y-6" onSubmit={handleLogin}>
                <InputWrapper icon={<MailIcon />} placeholder="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <InputWrapper 
                    icon={<LockIcon />} 
                    placeholder="Password" 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    trailingIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />} 
                    onTrailingIconClick={() => setShowPassword(!showPassword)} 
                />
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <AuthButton>Log In</AuthButton>
            </form>
            <SocialLogins />
            <p className="text-center text-sm text-slate-400 mt-6">
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)} className="font-semibold text-sky-400 hover:underline">Sign up</button>
            </p>
        </motion.div>
    );
};