import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FiHome, FiUsers, FiBook, FiAward, FiBarChart2,
  FiDollarSign, FiMessageSquare, FiSettings, FiBookOpen,
  FiLayers, FiFileText, FiUser
} from 'react-icons/fi';

export default function Sidebar({ collapsed, mobileOpen, onClose }) {
  const location = useLocation();
  const { user, isAdmin, isAssistant } = useAuth();
  const { theme } = useTheme();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const adminMenuItems = [
    { path: '/', label: 'Dashboard', icon: <FiHome size={20} /> },
    { path: '/users', label: 'Users', icon: <FiUsers size={20} /> },
    { path: '/fields', label: 'Fields', icon: <FiBook size={20} /> },
    { path: '/assistants', label: 'Assistants', icon: <FiUser size={20} /> },
    { path: '/amounts', label: 'Payments', icon: <FiDollarSign size={20} /> },
    { path: '/feedbacks', label: 'Feedbacks', icon: <FiMessageSquare size={20} /> },
    { path: '/certificates', label: 'Certificates', icon: <FiAward size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <FiBarChart2 size={20} /> },
  ];

  const assistantMenuItems = [
    { path: '/', label: 'Dashboard', icon: <FiHome size={20} /> },
    { path: '/my-fields', label: 'My Fields', icon: <FiBook size={20} /> },
    { path: '/courses', label: 'Courses', icon: <FiBookOpen size={20} /> },
    { path: '/chapters', label: 'Chapters', icon: <FiLayers size={20} /> },
    { path: '/topics', label: 'Topics', icon: <FiFileText size={20} /> },
  ];

  const menuItems = isAdmin() ? adminMenuItems : assistantMenuItems;

  const sidebarStyle = {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    color: theme.colors.text
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
        style={sidebarStyle}
      >
        <div className="p-6">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 mb-8 text-decoration-none"
            onClick={onClose}
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <FiBook size={24} color="white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold" style={{ color: theme.colors.text }}>
                  AiPLP
                </h1>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {isAdmin() ? 'Admin Dashboard' : 'Assistant Dashboard'}
                </p>
              </div>
            )}
          </Link>

          {/* User Info */}
          {!collapsed && user && (
            <div 
              className="mb-6 p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.surfaceHover }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  <span className="text-white font-medium">
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" style={{ color: theme.colors.text }}>
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm truncate" style={{ color: theme.colors.textSecondary }}>
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav>
            <ul className="space-y-2">
              {menuItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-decoration-none ${
                      isActive(item.path) ? 'active' : ''
                    }`}
                    style={{
                      backgroundColor: isActive(item.path) ? theme.colors.primary : 'transparent',
                      color: isActive(item.path) ? 'white' : theme.colors.text
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.path)) {
                        e.target.style.backgroundColor = theme.colors.surfaceHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.path)) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}