import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [size, setTextSize] = useState('small');
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState({});
  const [textSize, setTSize] = useState(14);

  useEffect(() => {
    const checkTheme = async () => {
      const [m, s] = await Promise.all([
        AsyncStorage.getItem('theme'),  // Changed key to 'theme'
        AsyncStorage.getItem('textSize'),
      ]);
      let mode = m !== null ? JSON.parse(m) : false;
      setDarkMode(mode);
      setTextSize(s || 'small');
      setLoading(false);
    }
    checkTheme();
  }, []);  // Removed dependencies to run only once

  const toggleTheme = async () => {
    const newMode = !darkMode;  // Correct toggle logic
    await AsyncStorage.setItem('theme', JSON.stringify(newMode));  // Fixed key
    setDarkMode(newMode);  // Set to toggled value
  }

  const setSize = async (s) => {
    await AsyncStorage.setItem('textSize', s);
    setTextSize(s);
  }

  let colors_list = (current_mode) => {
    return {
      background: current_mode ? '#121212' : '#F5F5F5',
      card: current_mode ? '#1E1E1E' : '#FFFFFF',
      text: current_mode ? '#E0E0E0' : '#333333',
      border: current_mode ? '#424242' : '#E0E0E0',
      primary: current_mode ? '#BB86FC' : '#6200EE',
      error: current_mode ? '#CF6679' : '#B00020',
      shadow: current_mode ? '#FFF' : '#000',
      success: current_mode ? '#00BCD4' : '#4CAF50',
      title: current_mode ? '#E0E0E0' : '#333',
      subtitle: current_mode ? '#B0BEC5' : '#666',
      subBgTitle: current_mode ? '#444' : '#999',
      btnText: current_mode ? '#000' : '#FFF',
      inputText: current_mode ? '#333' : '#E0E0E0',
      logoutBgColor: 'rgba(255, 0, 0, 0.5)',
      indexColor: 'rgba(0, 123, 255, 0.2)', // Adjusted for better visibility
      secondary: current_mode ? '#03A9F4' : '#007BFF',
      questionBgColor: current_mode ? '#333' : 'gray',
      mdBgColor: current_mode ? '#555' : '#FFFFFF',
    }
  }

  let textSizes = {
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 20,
    xxlarge: 22,
    xxxlarge: 24,
  }

  useEffect(() => {
    setColors(colors_list(darkMode));
  }, [darkMode]);

  useEffect(() => {
    setTSize(textSizes[size]);
  }, [size]);

  return (
    <ThemeContext.Provider 
      value={{
        toggleTheme,
        setSize,
        darkMode,
        size,
        textSize,
        colors
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);