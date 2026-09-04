import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type ThemeLayout = 'terminal' | 'canvas' | 'minimal';

interface ThemeContextType {
  layoutTheme: ThemeLayout;
  setLayoutTheme: (theme: ThemeLayout) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [layoutTheme, setLayoutThemeState] = useState<ThemeLayout>('terminal'); // Default

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-layout-theme') as ThemeLayout;
    if (savedTheme && ['terminal', 'canvas', 'minimal'].includes(savedTheme)) {
      setLayoutThemeState(savedTheme);
    }
  }, []);

  const setLayoutTheme = (theme: ThemeLayout) => {
    setLayoutThemeState(theme);
    localStorage.setItem('portfolio-layout-theme', theme);
    // Add a class to body for global style targeting if needed
    document.body.className = `theme-${theme}`;
  };

  return (
    <ThemeContext.Provider value={{ layoutTheme, setLayoutTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
