import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FiHome, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

export default function PageNotFound() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="card max-w-2xl mx-auto">
          <div className="card-body p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: theme.colors.warning + '20', color: theme.colors.warning }}
              >
                <FiAlertTriangle size={48} />
              </div>
              <h1 
                className="text-6xl font-bold mb-4"
                style={{ color: theme.colors.primary }}
              >
                404
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.text }}>
                Page Not Found
              </h2>
              <p className="text-lg mb-8" style={{ color: theme.colors.textSecondary }}>
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>

              <div className="btn-group justify-center">
                <Link to="/" className="btn btn-primary btn-lg">
                  <FiHome size={20} />
                  Go to Dashboard
                </Link>
                <button 
                  onClick={() => navigate(-1)}
                  className="btn btn-secondary btn-lg"
                >
                  <FiArrowLeft size={20} />
                  Go Back
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}