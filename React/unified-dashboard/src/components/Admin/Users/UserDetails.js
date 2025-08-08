import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Message from '../../Common/Message';
import { FiUser, FiEdit, FiTrash2, FiArrowLeft, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
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

  const getRoleBadge = (role) => {
    const roleStyles = {
      admin: 'badge-error',
      assistant: 'badge-warning',
      student: 'badge-info'
    };
    return <span className={`badge ${roleStyles[role] || 'badge-info'}`}>{role}</span>;
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="space-y-6">
        <Message type="error">{error}</Message>
        <button onClick={() => navigate('/users')} className="btn btn-secondary">
          <FiArrowLeft size={20} />
          Back to Users
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <Message type="error">User not found</Message>
        <button onClick={() => navigate('/users')} className="btn btn-secondary">
          <FiArrowLeft size={20} />
          Back to Users
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
                <FiUser size={24} />
                User Details
              </h1>
              <div className="btn-group">
                <button
                  onClick={() => navigate('/users')}
                  className="btn btn-secondary"
                >
                  <FiArrowLeft size={20} />
                  Back
                </button>
                <Link
                  to={`/users/${user.id}/edit`}
                  className="btn btn-primary"
                >
                  <FiEdit size={20} />
                  Edit
                </Link>
                <Link
                  to={`/users/${user.id}/delete`}
                  className="btn btn-danger"
                >
                  <FiTrash2 size={20} />
                  Delete
                </Link>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <span className="text-white text-2xl font-bold">
                  {user.first_name[0]}{user.last_name[0]}
                </span>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {user.first_name} {user.last_name}
                  </h2>
                  {getRoleBadge(user.role)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FiMail size={20} style={{ color: theme.colors.textSecondary }} />
                      <div>
                        <p className="text-sm" style={{ color: theme.colors.textSecondary }}>Email</p>
                        <p className="font-medium" style={{ color: theme.colors.text }}>{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiPhone size={20} style={{ color: theme.colors.textSecondary }} />
                      <div>
                        <p className="text-sm" style={{ color: theme.colors.textSecondary }}>Phone</p>
                        <p className="font-medium" style={{ color: theme.colors.text }}>
                          {user.phone || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FiCalendar size={20} style={{ color: theme.colors.textSecondary }} />
                      <div>
                        <p className="text-sm" style={{ color: theme.colors.textSecondary }}>Created</p>
                        <p className="font-medium" style={{ color: theme.colors.text }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiCalendar size={20} style={{ color: theme.colors.textSecondary }} />
                      <div>
                        <p className="text-sm" style={{ color: theme.colors.textSecondary }}>Last Updated</p>
                        <p className="font-medium" style={{ color: theme.colors.text }}>
                          {new Date(user.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
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