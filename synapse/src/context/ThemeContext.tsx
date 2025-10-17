
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Define the shape of our context's value
interface ThemeContextProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Create the provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // This effect runs whenever the theme state changes
    useEffect(() => {
        const root = window.document.documentElement;
        // Remove any existing theme class
        root.classList.remove('light', 'dark');
        // Add the new theme class
        root.classList.add(theme);
    }, [theme]);

    // The function to toggle the theme
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider> 
    );
};

// Create a custom hook to easily access the theme context
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
