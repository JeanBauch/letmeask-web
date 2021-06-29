import { createContext, ReactNode, useEffect, useState } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../global/theme';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem('theme')

    return (storagedTheme ?? 'light') as Theme;
  });
  
  const [theme, setTheme] = useState(() => {
    const storagedTheme = localStorage.getItem('theme')

    return (storagedTheme === 'light' ? lightTheme : darkTheme);
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme])

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    setTheme(currentTheme === 'light' ? darkTheme : lightTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme}}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}