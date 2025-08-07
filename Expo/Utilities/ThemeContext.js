import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState('medium');
  
  const toggleTheme = () => setDarkMode(!darkMode);
  
  const textSizes = {
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 20
  };
  
  const colors = darkMode ? {
    background: '#121212',
    card: '#1E1E1E',
    text: '#E0E0E0',
    border: '#424242',
    primary: '#BB86FC',
    error: '#CF6679'
  } : {
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#333333',
    border: '#E0E0E0',
    primary: '#6200EE',
    error: '#B00020'
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        darkMode, 
        toggleTheme, 
        textSize, 
        setTextSize,
        textSizes,
        colors
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);