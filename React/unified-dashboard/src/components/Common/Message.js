import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';

export default function Message({ type = 'info', children, onClose }) {
  const icons = {
    success: <FiCheckCircle size={20} />,
    error: <FiXCircle size={20} />,
    warning: <FiAlertTriangle size={20} />,
    info: <FiInfo size={20} />
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`message message-${type} flex items-center gap-3`}
    >
      {icons[type]}
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto text-current opacity-70 hover:opacity-100"
        >
          <FiXCircle size={16} />
        </button>
      )}
    </motion.div>
  );
}