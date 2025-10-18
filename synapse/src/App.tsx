import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './utils/firebase';
import { motion, AnimatePresence } from 'framer-motion';

import { Preloader } from './components/Preloader';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import AuthPage from './pages/auth/AuthPage';

export type View = 'landing' | 'auth';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [view, setView] = useState<View>('landing');
  const [initialAuthForm, setInitialAuthForm] = useState<'login' | 'signup'>('signup');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const toggleTheme = () => setTheme(p => (p === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists() && doc.data().onboardingComplete) {
                setIsOnboardingComplete(true);
            } else {
                setIsOnboardingComplete(false);
            }
        });
        return () => unsubscribe();
    }
  }, [user]);

  const handleNavigateToAuth = (initialForm: 'login' | 'signup') => {
    setInitialAuthForm(initialForm);
    setView('auth');
  };

  const renderContent = () => {
    if (isAuthLoading) return null;

    if (user) {
        // If user is logged in but hasn't finished onboarding, show the AuthPage
        // Otherwise, show the Dashboard.
        return isOnboardingComplete 
            ? <Dashboard /> 
            : <AuthPage setView={setView} initialStep={'signup'} />;
    }
    
    // If user is logged out, show the correct view
    switch (view) {
      case 'auth':
        return <AuthPage setView={setView} initialStep={initialAuthForm} />;
      default:
        return <LandingPage theme={theme} toggleTheme={toggleTheme} setView={handleNavigateToAuth} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div key="preloader" className="fixed inset-0 bg-black z-[200] flex items-center justify-center" exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            <Preloader onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
          <AnimatePresence mode="wait">
              <motion.div key={user ? (isOnboardingComplete ? 'dashboard' : 'onboarding') : view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  {renderContent()}
              </motion.div>
          </AnimatePresence>
      )}
    </>
  );
}

export default App;