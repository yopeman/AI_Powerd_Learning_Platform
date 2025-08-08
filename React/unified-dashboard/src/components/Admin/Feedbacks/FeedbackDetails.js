import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Message from '../../Common/Message';
import { FiMessageSquare, FiStar, FiArrowLeft, FiTrash2, FiUser, FiCalendar } from 'react-icons/fi';

export default function FeedbackDetails() {
  const [feedback, setFeedback] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
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

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <FiStar
            key={star}
            size={20}
            fill={star <= rating ? '#f59e0b' : 'none'}
            style={{ color: star <= rating ? '#f59e0b' : theme.colors.border }}
          />
        ))}
        <span className="ml-2 font-medium" style={{ color: theme.colors.text }}>
          {rating}/5
        </span>
      </div>
    );
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="space-y-6">
        <Message type="error">{error}</Message>
        <button onClick={() => navigate('/feedbacks')} className="btn btn-secondary">
          <FiArrowLeft size={20} />
          Back to Feedbacks
        </button>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="space-y-6">
        <Message type="error">Feedback not found</Message>
        <button onClick={() => navigate('/feedbacks')} className="btn btn-secondary">
          <FiArrowLeft size={20} />
          Back to Feedbacks
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h1 className="card-title">
                <FiMessageSquare size={24} />
                Feedback Details
              </h1>
              <div className="btn-group">
                <button
                  onClick={() => navigate('/feedbacks')}
                  className="btn btn-secondary"
                >
                  <FiArrowLeft size={20} />
                  Back
                </button>
                <Link
                  to={`/feedbacks/${feedback.id}/delete`}
                  className="btn btn-danger"
                >
                  <FiTrash2 size={20} />
                  Delete
                </Link>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="space-y-6">
              {/* User Information */}
              {user && (
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: theme.colors.surfaceHover }}
                >
                  <h3 className="font-semibold mb-4" style={{ color: theme.colors.text }}>
                    User Information
                  </h3>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme.colors.primary }}
                    >
                      <span className="text-white font-medium">
                        {user.first_name[0]}{user.last_name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: theme.colors.text }}>
                        {user.first_name} {user.last_name}
                      </p>
                      <p style={{ color: theme.colors.textSecondary }}>{user.email}</p>
                      <p style={{ color: theme.colors.textSecondary }}>Role: {user.role}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Content */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold" style={{ color: theme.colors.text }}>
                    Feedback & Rating
                  </h3>
                  {renderStars(feedback.rating)}
                </div>
                
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: theme.colors.surfaceHover }}
                >
                  <p 
                    className="text-lg leading-relaxed whitespace-pre-wrap"
                    style={{ color: theme.colors.text }}
                  >
                    {feedback.content}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <FiCalendar size={20} style={{ color: theme.colors.textSecondary }} />
                  <div>
                    <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                      Submitted
                    </p>
                    <p className="font-medium" style={{ color: theme.colors.text }}>
                      {new Date(feedback.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FiCalendar size={20} style={{ color: theme.colors.textSecondary }} />
                  <div>
                    <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                      Last Updated
                    </p>
                    <p className="font-medium" style={{ color: theme.colors.text }}>
                      {new Date(feedback.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}