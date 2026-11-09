import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'forest-light' | 'forest-dark';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const THEME_STORAGE_KEY = 'pas_app_theme_v1';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'forest-dark') {
        return 'forest-dark';
      }
      if (saved === 'forest-light') {
        return 'forest-light';
      }
    } catch {
      // ignore
    }
    return 'forest-light'; // Default to Light (Classic removed)
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'forest-dark' ? 'forest-light' : 'forest-dark');
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-classic', 'theme-forest-light', 'theme-forest-dark', 'dark');

    root.setAttribute('data-theme', theme);

    if (theme === 'forest-dark') {
      root.classList.add('theme-forest-dark', 'dark');
    } else {
      root.classList.add('theme-forest-light');
    }
  }, [theme]);

  const isDark = theme === 'forest-dark';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'forest-light',
      setTheme: () => {},
      toggleTheme: () => {},
      isDark: false,
    };
  }
  return context;
};

