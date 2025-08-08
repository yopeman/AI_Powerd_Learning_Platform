import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../utils/api';
import { 
  FiBook, FiBookOpen, FiLayers, FiFileText, 
  FiPlus, FiActivity, FiTrendingUp 
} from 'react-icons/fi';

export default function AssistantDashboard() {
  const [myFields, setMyFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMyFields = async () => {
      try {
        const response = await api.get('/assistants/me/fields');
        if (response.data.success) {
          setMyFields(response.data.data.fields);
        }
      } catch (error) {
        console.error('Failed to fetch fields:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyFields();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <div className="card-body">
            <h1 className="text-3xl font-bold mb-2" style={{ color: theme.colors.text }}>
              Welcome back, Assistant! 👨‍🏫
            </h1>
            <p style={{ color: theme.colors.textSecondary }}>
              Manage your assigned fields and create engaging educational content.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <FiPlus size={20} />
              Quick Actions
            </h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {myFields.slice(0, 4).map((field) => (
                <Link
                  key={field.id}
                  to={`/courses/create/${field.id}`}
                  className="p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid text-decoration-none"
                  style={{ 
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.surfaceHover 
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = theme.colors.primary;
                    e.target.style.backgroundColor = theme.colors.primary + '10';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = theme.colors.border;
                    e.target.style.backgroundColor = theme.colors.surfaceHover;
                  }}
                >
                  <FiBookOpen size={24} style={{ color: theme.colors.primary }} />
                  <p className="font-medium mt-2" style={{ color: theme.colors.text }}>
                    Create Course
                  </p>
                  <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    for {field.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* My Fields Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FiBook size={20} />
                My Assigned Fields
              </h2>
            </div>
            <div className="card-body">
              {myFields.length > 0 ? (
                <div className="space-y-3">
                  {myFields.map((field) => (
                    <Link
                      key={field.id}
                      to={`/my-fields/${field.id}`}
                      className="block p-4 rounded-lg transition-all hover:shadow-md text-decoration-none"
                      style={{ backgroundColor: theme.colors.surfaceHover }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = theme.colors.primary + '10';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = theme.colors.surfaceHover;
                      }}
                    >
                      <h3 className="font-semibold" style={{ color: theme.colors.text }}>
                        {field.title}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                        {field.years_length} years • {field.number_of_free_topics} free topics
                      </p>
                      <div className="mt-2">
                        {field.isFree ? (
                          <span className="badge badge-success">Free Access</span>
                        ) : (
                          <span className="badge badge-primary">Premium</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiBook size={48} style={{ color: theme.colors.textSecondary }} className="mx-auto mb-4" />
                  <p style={{ color: theme.colors.textSecondary }}>
                    No fields assigned yet. Contact your administrator.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FiActivity size={20} />
                Content Overview
              </h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span style={{ color: theme.colors.textSecondary }}>Total Fields</span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {myFields.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: theme.colors.textSecondary }}>Free Fields</span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {myFields.filter(f => f.isFree).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: theme.colors.textSecondary }}>Premium Fields</span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {myFields.filter(f => !f.isFree).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}