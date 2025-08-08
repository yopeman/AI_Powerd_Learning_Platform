import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  FiMenu, FiChevronLeft, FiChevronRight, FiUser, 
  FiLogOut, FiMoon, FiSun, FiSettings 
} from 'react-icons/fi';

export default function Header({ onToggleSidebar, onToggleMobileMenu, sidebarCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme, theme } = useTheme();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/users')) return 'User Management';
    if (path.startsWith('/fields')) return 'Field Management';
    if (path.startsWith('/assistants')) return 'Assistant Management';
    if (path.startsWith('/amounts')) return 'Payment Settings';
    if (path.startsWith('/feedbacks')) return 'User Feedback';
    if (path.startsWith('/certificates')) return 'Certificates';
    if (path.startsWith('/analytics')) return 'Analytics';
    if (path.startsWith('/my-fields')) return 'My Fields';
    if (path.startsWith('/courses')) return 'Course Management';
    if (path.startsWith('/chapters')) return 'Chapter Management';
    if (path.startsWith('/topics')) return 'Topic Management';
    return 'Dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const headerStyle = {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    color: theme.colors.text
  };

  return (
    <header className="header" style={headerStyle}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: theme.colors.text }}
          >
            <FiMenu size={20} />
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ 
              color: theme.colors.text,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.surfaceHover;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            {sidebarCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>

          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
              {getPageTitle()}
            </h1>
            <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
              {location.pathname}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              color: theme.colors.text,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.surfaceHover;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button 
              className="flex items-center gap-2 p-2 rounded-lg transition-colors"
              style={{ 
                color: theme.colors.text,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.colors.surfaceHover;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
              onClick={() => navigate('/profile')}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <span className="text-white font-medium text-sm">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </span>
              </div>
              <span className="hidden md:block font-medium">
                {user?.first_name} {user?.last_name}
              </span>
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              color: theme.colors.error,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.surfaceHover;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}