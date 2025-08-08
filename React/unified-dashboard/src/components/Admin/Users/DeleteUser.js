import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Message from '../../Common/Message';
import ConfirmDialog from '../../Common/ConfirmDialog';
import { FiUserX, FiArrowLeft } from 'react-icons/fi';

export default function DeleteUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  
  const { id } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await api.delete(`/users/${id}`);
      if (response.data.success) {
        setSuccess('User deleted successfully!');
        setTimeout(() => navigate('/users'), 2000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">
              <FiUserX size={24} />
              Delete User
            </h1>
            <p className="card-subtitle">
              This action cannot be undone
            </p>
          </div>

          <div className="card-body">
            {error && <Message type="error">{error}</Message>}
            {success && <Message type="success">{success}</Message>}

            {user && !success && (
              <div>
                <div 
                  className="p-6 rounded-lg mb-6"
                  style={{ backgroundColor: theme.colors.error + '10', border: `1px solid ${theme.colors.error}30` }}
                >
                  <h3 className="font-semibold mb-4" style={{ color: theme.colors.text }}>
                    You are about to delete:
                  </h3>
                  
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme.colors.primary }}
                    >
                      <span className="text-white text-xl font-bold">
                        {user.first_name[0]}{user.last_name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg" style={{ color: theme.colors.text }}>
                        {user.first_name} {user.last_name}
                      </p>
                      <p style={{ color: theme.colors.textSecondary }}>{user.email}</p>
                      <p style={{ color: theme.colors.textSecondary }}>Role: {user.role}</p>
                    </div>
                  </div>
                </div>

                <div className="btn-group">
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="btn btn-danger"
                    disabled={deleting}
                  >
                    <FiUserX size={20} />
                    Delete User
                  </button>

                  <button
                    onClick={() => navigate('/users')}
                    className="btn btn-secondary"
                  >
                    <FiArrowLeft size={20} />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${user?.first_name} ${user?.last_name}? This action cannot be undone and will remove all associated data.`}
        confirmText={deleting ? 'Deleting...' : 'Delete User'}
        type="danger"
      />
    </div>
  );
}