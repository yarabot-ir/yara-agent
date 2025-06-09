import React, { useContext, useEffect } from 'react';
import useLocalStorageState from '../hooks/useLocalStoragesTate';

// interface DarkModeContextType {
//   isDarkMode: boolean;
//   toggleDarkMode: () => void;
// }

const DarkModeContext = React.createContext<any>(null);

export function DarkModeProvider({ children }: { children: any }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    'isDarkMoode',
    false // true, false
  );

  const toggleDarkMode = () => setIsDarkMode((prev: boolean) => !prev);

  useEffect(() => {
    document.documentElement.classList.add('light-mode');
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');

  return context;
}
