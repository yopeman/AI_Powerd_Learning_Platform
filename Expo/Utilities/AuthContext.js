// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app start
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    
    checkToken();
  }, []);

  const signIn = async (token) => {
    await AsyncStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      loading,
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};