// import { useState, useEffect } from 'react';
// import { Preloader } from './components/Preloader';
// import { LandingPage } from './pages/LandingPage';

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [theme, setTheme] = useState<'light' | 'dark'>('dark');

//   const toggleTheme = () => {
//     setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove('light', 'dark');
//     root.classList.add(theme);
//   }, [theme]);

//   return (
//     <>
//       {isLoading ? (
//         <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
//           <Preloader onComplete={() => setIsLoading(false)} />
//         </div>
//       ) : (
//         <LandingPage theme={theme} toggleTheme={toggleTheme} />
//       )}
//     </>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth'; // Import 'User' as a type
import { auth } from './utils/firebase';

import { Preloader } from './components/Preloader';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // This is our manual theme toggle function.
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // This effect manually applies the theme class to the website.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // THIS IS THE CORRECTED AUTH LISTENER
  useEffect(() => {
    // onAuthStateChanged returns an 'unsubscribe' function.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // When the auth state changes, we update our 'user' state.
      setUser(currentUser);
    });

    // This is the cleanup function. It runs when the app closes
    // to prevent memory leaks.
    return () => unsubscribe();
  }, []); // The empty array [] ensures this runs only once on startup.

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
          <Preloader onComplete={() => setIsLoading(false)} />
        </div>
      ) : (
        // The routing logic remains the same.
        // THIS IS THE NEW ROUTING LOGIC:
        // If the 'user' state is not null (meaning someone is logged in), show the Dashboard.
        // Otherwise, show the LandingPage.
        user ? <Dashboard /> : <LandingPage theme={theme} toggleTheme={toggleTheme} />
      )}
    </>
  );
}

export default App;