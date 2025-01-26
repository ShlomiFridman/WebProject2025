"use client"; // Declares this as a client-side component

import { createContext, ReactNode, useEffect, useState, useContext } from 'react';

type Theme = 'light' | 'dark'; // Type for theme options

// Context props type definition
interface ThemeContextProps {
  theme: Theme; // Current theme ('light' or 'dark')
  toggleTheme: () => void; // Function to toggle between themes
}

// Create the theme context with an undefined default
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode; // Children components to be wrapped by the provider
}

/**
 * ThemeProvider component that provides theme management across the app.
 * Saves the selected theme in localStorage and allows toggling between light and dark modes.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light'); // State to track current theme
  const [mounted, setMounted] = useState(false); // State to track if the component has mounted

  // Run effect after the component mounts, then load stored theme from localStorage
  useEffect(() => {
    setMounted(true); // Set mounted state to true
    const storedTheme = localStorage.getItem('theme'); // Get saved theme from localStorage
    if (storedTheme) {
      setTheme(storedTheme === 'dark' ? 'dark' : 'light'); // Set theme based on stored value
    }
  }, []);

  // Apply the theme to the document and save it in localStorage when theme changes
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;

      if (theme === 'dark') {
        root.classList.add('dark'); // Add dark theme to root if selected
      } else {
        root.classList.remove('dark'); // Remove dark theme
      }

      localStorage.setItem('theme', theme); // Save selected theme to localStorage
      document.documentElement.setAttribute('data-theme', theme); // Set theme attribute on HTML element
    }
  }, [theme, mounted]);

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Prevent rendering of children until the component has mounted to avoid hydration issues
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    // Provide theme and toggleTheme function to descendants
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access the current theme and the function to toggle it.
 * Must be used within a ThemeProvider.
 */
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider'); // Error if not used inside ThemeProvider
  }
  return context;
};
