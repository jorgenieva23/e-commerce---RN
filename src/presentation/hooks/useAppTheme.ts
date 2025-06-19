import { useThemeContext } from '../context/ThemeContext';

export const useAppTheme = () => {
  const { theme, evaTheme, isThemeReady, toggleTheme } = useThemeContext();
  
  return {
    theme,
    evaTheme,
    isThemeReady,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
}; 