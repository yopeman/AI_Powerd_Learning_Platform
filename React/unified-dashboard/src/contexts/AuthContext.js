import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../utils/api';
import store from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const savedToken = store.get('token');
      const savedUser = store.get('user');
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authApi.post('/login', credentials);
      const { success, data, message } = response.data;

      if (success) {
        if (data.user.role === 'admin' || data.user.role === 'assistant') {
          setToken(data.token);
          setUser(data.user);
          store.set('token', data.token);
          store.set('user', data.user);
          return { success: true };
        } else {
          return { 
            success: false, 
            message: 'You need admin or assistant privileges to access this dashboard' 
          };
        }
      } else {
        return { success: false, message };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    store.clear();
  };

  const isAuthenticated = () => !!token && !!user;
  const isAdmin = () => user?.role === 'admin';
  const isAssistant = () => user?.role === 'assistant';

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isAssistant
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};