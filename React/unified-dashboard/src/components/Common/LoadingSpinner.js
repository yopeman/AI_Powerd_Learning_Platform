import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'spinner-sm',
    md: '',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`loading-container ${className}`}>
      <div 
        className={`spinner ${sizeClasses[size]}`}
        style={{ borderTopColor: theme.colors.primary }}
      />
    </div>
  );
}