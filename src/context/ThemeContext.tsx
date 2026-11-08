import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'classic' | 'forest-light' | 'forest-dark';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  isDark: boolean;
}

const THEME_STORAGE_KEY = 'pas_app_theme_v1';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as AppTheme;
      if (saved === 'classic' || saved === 'forest-light' || saved === 'forest-dark') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'classic'; // Default to existing theme!
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-classic', 'theme-forest-light', 'theme-forest-dark', 'dark');

    root.setAttribute('data-theme', theme);

    if (theme === 'classic') {
      root.classList.add('theme-classic');
    } else if (theme === 'forest-light') {
      root.classList.add('theme-forest-light');
    } else if (theme === 'forest-dark') {
      root.classList.add('theme-forest-dark', 'dark');
    }
  }, [theme]);

  const isDark = theme === 'forest-dark';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'classic',
      setTheme: () => {},
      isDark: false,
    };
  }
  return context;
};

