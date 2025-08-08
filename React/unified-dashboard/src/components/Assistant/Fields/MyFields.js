import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../Common/LoadingSpinner';
import Message from '../../Common/Message';
import { FiBook, FiEye, FiBookOpen, FiPlus } from 'react-icons/fi';

export default function MyFields() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMyFields = async () => {
      try {
        const response = await api.get('/assistants/me/fields');
        if (response.data.success) {
          setFields(response.data.data.fields);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load fields');
      } finally {
        setLoading(false);
      }
    };

    fetchMyFields();
  }, []);

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
              <FiBook size={24} />
              My Assigned Fields
            </h1>
            <p className="card-subtitle">
              Fields you are responsible for managing
            </p>
          </div>

          <div className="card-body">
            {error && <Message type="error">{error}</Message>}
            }

            {fields.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="card hover:shadow-lg transition-all">
                      <div className="card-body">
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: theme.colors.primary + '20', color: theme.colors.primary }}
                          >
                            <FiBook size={24} />
                          </div>
                          {field.isFree ? (
                            <span className="badge badge-success">Free</span>
                          ) : (
                            <span className="badge badge-warning">Premium</span>
                          )}
                        </div>

                        <h3 className="font-semibold text-lg mb-2" style={{ color: theme.colors.text }}>
                          {field.title}
                        </h3>
                        
                        <p className="text-sm mb-4" style={{ color: theme.colors.textSecondary }}>
                          {field.description?.substring(0, 100)}...
                        </p>

                        <div className="space-y-2 mb-6">
                          <div className="flex justify-between text-sm">
                            <span style={{ color: theme.colors.textSecondary }}>Duration:</span>
                            <span style={{ color: theme.colors.text }}>{field.years_length} years</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span style={{ color: theme.colors.textSecondary }}>Free Topics:</span>
                            <span style={{ color: theme.colors.text }}>{field.number_of_free_topics}</span>
                          </div>
                        </div>

                        <div className="btn-group">
                          <Link
                            to={`/my-fields/${field.id}`}
                            className="btn btn-secondary btn-sm"
                          >
                            <FiEye size={16} />
                            Details
                          </Link>
                          <Link
                            to={`/courses/field/${field.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            <FiBookOpen size={16} />
                            Courses
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FiBook size={48} style={{ color: theme.colors.textSecondary }} className="mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.text }}>
                  No Fields Assigned
                </h3>
                <p style={{ color: theme.colors.textSecondary }}>
                  You haven't been assigned to any fields yet. Contact your administrator.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}