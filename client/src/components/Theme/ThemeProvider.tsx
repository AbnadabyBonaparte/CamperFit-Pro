import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useUIStore } from '../../stores/uiStore';
import { themes, ThemeName } from '../../constants/themes';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setTheme } = useUIStore();
  const currentTheme = themes[theme];

  useEffect(() => {
    // Apply theme CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', currentTheme.colors.primary);
    root.style.setProperty('--color-secondary', currentTheme.colors.secondary);
    root.style.setProperty('--color-background', currentTheme.colors.background);
    root.style.setProperty('--color-surface', currentTheme.colors.surface);
    root.style.setProperty('--color-text', currentTheme.colors.text);
    root.style.setProperty('--color-text-secondary', currentTheme.colors.textSecondary);
    root.style.setProperty('--color-border', currentTheme.colors.border);
    root.style.setProperty('--color-accent', currentTheme.colors.accent);
    root.style.setProperty('--color-success', currentTheme.colors.success);
    root.style.setProperty('--color-warning', currentTheme.colors.warning);
    root.style.setProperty('--color-error', currentTheme.colors.error);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, setTheme }}>
      <div
        className="transition-colors duration-300"
        style={{
          backgroundColor: currentTheme.colors.background,
          color: currentTheme.colors.text,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

