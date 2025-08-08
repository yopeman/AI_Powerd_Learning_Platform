import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import MainContent from '../Layout/MainContent';
import { useAuthGuard } from '../../utils/auth';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  
  // Protect the dashboard route
  useAuthGuard();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div 
      className="dashboard-container"
      style={{ 
        backgroundColor: theme.colors.background,
        color: theme.colors.text 
      }}
    >
      <Sidebar 
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <Header 
          onToggleSidebar={toggleSidebar}
          onToggleMobileMenu={toggleMobileMenu}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="content-area">
          <MainContent />
        </div>
      </div>
    </div>
  );
}