import React from 'react';
import { CursorBlob } from '../components/ui/CursorBlob';
import { IntroductionSection } from './landing/IntroductionSection';
import { CoreFeaturesSection } from './landing/CoreFeaturesSection';
import { HowItWorksSection } from './landing/HowItWorksSection';
import { AboutSection } from './landing/AboutSection';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const LandingPage = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => {
    return (
        // These classes will now work correctly because of our config change.
        <div className="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans antialiased">
            
            {theme === 'dark' && (
                <>
                    <div className="aurora-bg"></div>
                    <CursorBlob />
                </>
            )}

            <div className="relative z-10">
                <Navbar theme={theme} toggleTheme={toggleTheme} />
                <main>
                    <IntroductionSection setView={function (): void {
                        throw new Error('Function not implemented.');
                    } } />
                    <CoreFeaturesSection />
                    <HowItWorksSection theme={theme} />
                    <AboutSection />
                </main>
                <Footer />
            </div>
        </div>
    );
};