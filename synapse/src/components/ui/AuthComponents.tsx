import React from 'react';
import { motion } from 'framer-motion';
import { GoogleIcon, GitHubIcon } from './AuthIcons';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../../utils/firebase';

export const SocialLogins = () => {
    const handleSocialLogin = async (providerName: 'google' | 'github') => {
        const provider = providerName === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // After successful login, the onAuthStateChanged listener in App.tsx will handle the redirect.
        } catch (error) {
            console.error(`Error with ${providerName} sign-in:`, error);
        }
    };

    return (
        <>
            <div className="flex items-center my-6"><div className="flex-grow border-t border-slate-600"></div><span className="flex-shrink mx-4 text-slate-400 text-sm">or continue with</span><div className="flex-grow border-t border-slate-600"></div></div>
            <div className="flex gap-4">
                <SocialButton provider="Google" icon={<GoogleIcon />} onClick={() => handleSocialLogin('google')} />
                <SocialButton provider="GitHub" icon={<GitHubIcon />} onClick={() => handleSocialLogin('github')} />
            </div>
        </>
    );
};

const SocialButton = ({ provider, icon, onClick }: { provider: string; icon: React.ReactNode; onClick: () => void; }) => (
    <motion.button type="button" onClick={onClick} whileHover={{ y: -2 }} className="w-full flex items-center justify-center gap-2 bg-slate-700/50 border border-slate-600 rounded-lg py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors">
        {icon} {provider}
    </motion.button>
);

export const RoleCard = ({ role, description, icon, onClick }: { role: string; description: string; icon: React.ReactNode; onClick: () => void; }) => { 
    const isStudent = role === 'Student'; 
    const colors = isStudent ? "border-sky-500/50 hover:border-sky-500 bg-gradient-to-br from-slate-800 to-sky-900/20" : "border-teal-500/50 hover:border-teal-500 bg-gradient-to-br from-slate-800 to-teal-900/20"; 
    return (
        <motion.button onClick={onClick} className={`w-full p-6 border ${colors} rounded-xl flex flex-col items-center text-center transition-all duration-300 shadow-lg`} whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }} whileTap={{ scale: 0.95 }}>
            {icon}
            <h3 className="text-xl font-bold text-slate-100">{role}</h3>
            <p className="text-sm text-slate-400 mt-1">{description}</p>
        </motion.button>
    );
}

export const PasswordStrengthMeter = ({ password }: { password: string; }) => {
    const getStrength = (p: string) => { let score = 0; if (p.length >= 8) score++; if (p.match(/[A-Z]/)) score++; if (p.match(/[0-9]/)) score++; if (p.match(/[^A-Za-z0-9]/)) score++; return score; };
    const strength = getStrength(password);
    const strengthLabels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-sky-500", "bg-green-500"];
    
    if (!password) { return ( <div className="space-y-2 text-xs"> <div className="w-full bg-slate-700 rounded-full h-2 flex gap-1"> {[...Array(5)].map((_, i) => <div key={i} className="h-2 bg-slate-700 rounded-full" style={{ width: '20%' }} />)} </div> <p className="text-right h-4 text-slate-500">&nbsp;</p> </div> ); }

    return (<div className="space-y-2 text-xs"><div className="w-full bg-slate-700 rounded-full h-2 flex gap-1">{[...Array(5)].map((_, i) => <div key={i} className={`h-2 rounded-full transition-all ${i < strength ? strengthColors[strength-1] : 'bg-slate-700'}`} style={{ width: '20%' }} />)}</div><p className={`text-right h-4 font-medium ${["text-red-400", "text-orange-400", "text-yellow-400", "text-sky-400", "text-green-400"][strength-1] || 'text-slate-500'}`}>{strengthLabels[strength-1] || ''}</p></div>);
}

interface InputWrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onTrailingIconClick?: () => void;
}
export const InputWrapper = ({ icon, trailingIcon, onTrailingIconClick, ...props }: InputWrapperProps) => (
    <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
        <input {...props} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 pl-10 pr-10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" />
        {trailingIcon && (
            <button type="button" onClick={onTrailingIconClick} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {trailingIcon}
            </button>
        )}
    </div>
);

export const AuthButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => (
    <motion.button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} {...props}>{children}</motion.button>
);