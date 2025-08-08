import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Message from '../../Common/Message';
import ConfirmDialog from '../../Common/ConfirmDialog';
import { FiMessageX, FiArrowLeft, FiStar } from 'react-icons/fi';

export default function DeleteFeedback() {
  const [feedback, setFeedback] = useState(null);
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
    const fetchData = async () => {
      try {
        const feedbackRes = await api.get(`/feedbacks/${id}`);
        if (feedbackRes.data.success) {
          setFeedback(feedbackRes.data.data);
          
          const userRes = await api.get(`/users/${feedbackRes.data.data.userId}`);
          if (userRes.data.success) {
            setUser(userRes.data.data);
          }
        } else {
          setError(feedbackRes.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await api.delete(`/feedbacks/${id}`);
      if (response.data.success) {
        setSuccess('Feedback deleted successfully!');
        setTimeout(() => navigate('/feedbacks'), 2000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete feedback');
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <FiStar
            key={star}
            size={16}
            fill={star <= rating ? '#f59e0b' : 'none'}
            style={{ color: star <= rating ? '#f59e0b' : theme.colors.border }}
          />
        ))}
        <span className="ml-2" style={{ color: theme.colors.text }}>
          ({rating}/5)
        </span>
      </div>
    );
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
              <FiMessageX size={24} />
              Delete Feedback
            </h1>
            <p className="card-subtitle">
              This action cannot be undone
            </p>
          </div>

          <div className="card-body">
            {error && <Message type="error">{error}</Message>}
            {success && <Message type="success">{success}</Message>}

            {feedback && user && !success && (
              <div>
                <div 
                  className="p-6 rounded-lg mb-6"
                  style={{ backgroundColor: theme.colors.error + '10', border: `1px solid ${theme.colors.error}30` }}
                >
                  <h3 className="font-semibold mb-4" style={{ color: theme.colors.text }}>
                    You are about to delete this feedback:
                  </h3>
                  
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: theme.colors.primary }}
                      >
                        <span className="text-white font-medium">
                          {user.first_name[0]}{user.last_name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: theme.colors.text }}>
                          {user.first_name} {user.last_name}
                        </p>
                        <p style={{ color: theme.colors.textSecondary }}>{user.email}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <p className="text-sm mb-2" style={{ color: theme.colors.textSecondary }}>
                        Rating:
                      </p>
                      {renderStars(feedback.rating)}
                    </div>

                    {/* Feedback Content */}
                    <div>
                      <p className="text-sm mb-2" style={{ color: theme.colors.textSecondary }}>
                        Feedback:
                      </p>
                      <div 
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: theme.colors.surface }}
                      >
                        <p style={{ color: theme.colors.text }}>
                          {feedback.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="btn-group">
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="btn btn-danger"
                    disabled={deleting}
                  >
                    <FiMessageX size={20} />
                    Delete Feedback
                  </button>

                  <button
                    onClick={() => navigate('/feedbacks')}
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
        title="Delete Feedback"
        message="Are you sure you want to delete this feedback? This action cannot be undone."
        confirmText={deleting ? 'Deleting...' : 'Delete Feedback'}
        type="danger"
      />
    </div>
  );
}