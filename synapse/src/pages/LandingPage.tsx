import React from 'react';
import { CursorBlob } from '../components/ui/CursorBlob';
import { IntroductionSection } from './landing/IntroductionSection';
import { CoreFeaturesSection } from './landing/CoreFeaturesSection';
import { HowItWorksSection } from './landing/HowItWorksSection';
import { AboutSection } from './landing/AboutSection';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

interface LandingPageProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setView: (initialForm: 'login' | 'signup') => void;
}

export const LandingPage = ({ theme, toggleTheme, setView }: LandingPageProps) => {
    return (
        <div className="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans antialiased">
            {theme === 'dark' && (
                <>
                    <div className="aurora-bg"></div>
                    <CursorBlob />
                </>
            )}
            <div className="relative z-10">
                <Navbar theme={theme} toggleTheme={toggleTheme} setView={setView} />
                <main>
                    <IntroductionSection setView={setView} />
                    <CoreFeaturesSection />
                    <HowItWorksSection theme={theme} />
                    <AboutSection />
                </main>
                <Footer />
            </div>
        </div>
    );
};