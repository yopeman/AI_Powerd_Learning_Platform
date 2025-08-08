import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Pagination from '../../Common/Pagination';
import Message from '../../Common/Message';
import { FiMessageSquare, FiStar, FiEye, FiTrash2 } from 'react-icons/fi';

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [feedbacksRes, usersRes] = await Promise.all([
          api.get('/feedbacks'),
          api.get('/users')
        ]);

        if (feedbacksRes.data.success) {
          setFeedbacks(feedbacksRes.data.data);
        }
        if (usersRes.data.success) {
          setUsers(usersRes.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserById = (id) => users.find(user => user.id === id);

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFeedbacks = feedbacks.slice(startIndex, startIndex + itemsPerPage);

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
        <span className="ml-2 text-sm" style={{ color: theme.colors.textSecondary }}>
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
              <FiMessageSquare size={24} />
              User Feedback
            </h1>
            <p className="card-subtitle">
              Monitor user feedback and ratings
            </p>
          </div>

          <div className="card-body">
            {error && <Message type="error">{error}</Message>}

            {/* Feedbacks Table */}
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Rating</th>
                    <th>Feedback Preview</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFeedbacks.map((feedback) => {
                    const user = getUserById(feedback.userId);
                    return (
                      <motion.tr
                        key={feedback.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td>
                          {user ? (
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: theme.colors.primary }}
                              >
                                <span className="text-white text-sm font-medium">
                                  {user.first_name[0]}{user.last_name[0]}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium" style={{ color: theme.colors.text }}>
                                  {user.first_name} {user.last_name}
                                </p>
                                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <span style={{ color: theme.colors.textSecondary }}>Unknown User</span>
                          )}
                        </td>
                        <td>{renderStars(feedback.rating)}</td>
                        <td>
                          <p 
                            className="text-sm max-w-xs truncate"
                            style={{ color: theme.colors.textSecondary }}
                            title={feedback.content}
                          >
                            {feedback.content}
                          </p>
                        </td>
                        <td style={{ color: theme.colors.textSecondary }}>
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/feedbacks/${feedback.id}`}
                              className="btn btn-secondary btn-sm"
                              title="View Details"
                            >
                              <FiEye size={16} />
                            </Link>
                            <Link
                              to={`/feedbacks/${feedback.id}/delete`}
                              className="btn btn-danger btn-sm"
                              title="Delete Feedback"
                            >
                              <FiTrash2 size={16} />
                            </Link>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={feedbacks.length}
                />
              </div>
            )}

            {feedbacks.length === 0 && !loading && (
              <div className="text-center py-12">
                <FiMessageSquare size={48} style={{ color: theme.colors.textSecondary }} className="mx-auto mb-4" />
                <p style={{ color: theme.colors.textSecondary }}>
                  No feedback found.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}