import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FiAlertTriangle } from 'react-icons/fi';

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger'
}) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="card w-full max-w-md"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: type === 'danger' ? theme.colors.error + '20' : theme.colors.warning + '20',
                color: type === 'danger' ? theme.colors.error : theme.colors.warning
              }}
            >
              <FiAlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: theme.colors.text }}>
                {title}
              </h3>
            </div>
          </div>
          
          <p className="mb-6" style={{ color: theme.colors.textSecondary }}>
            {message}
          </p>
          
          <div className="btn-group">
            <button
              onClick={onConfirm}
              className={`btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'}`}
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}