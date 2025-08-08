import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../utils/api';
import { 
  FiUsers, FiBook, FiAward, FiDollarSign, 
  FiMessageSquare, FiTrendingUp, FiActivity 
} from 'react-icons/fi';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [fields, users, subscriptions, payments, feedbacks, certifications] = await Promise.all([
          api.get('/analytics/fields'),
          api.get('/analytics/users'),
          api.get('/analytics/subscriptions'),
          api.get('/analytics/payments'),
          api.get('/analytics/feedbacks'),
          api.get('/analytics/certifications')
        ]);

        setAnalytics({
          fields: fields.data.data,
          users: users.data.data,
          subscriptions: subscriptions.data.data,
          payments: payments.data.data,
          feedbacks: feedbacks.data.data,
          certifications: certifications.data.data
        });
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: analytics.users?.totalUsers || 0,
      icon: <FiUsers size={24} />,
      color: theme.colors.primary,
      change: '+12%'
    },
    {
      title: 'Active Fields',
      value: analytics.fields?.totalFields || 0,
      icon: <FiBook size={24} />,
      color: theme.colors.secondary,
      change: '+8%'
    },
    {
      title: 'Total Revenue',
      value: `$${analytics.payments?.totalRevenue || 0}`,
      icon: <FiDollarSign size={24} />,
      color: theme.colors.warning,
      change: '+23%'
    },
    {
      title: 'Certificates Issued',
      value: analytics.certifications?.totalResults || 0,
      icon: <FiAward size={24} />,
      color: theme.colors.info,
      change: '+15%'
    }
  ];

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
              Welcome back, Admin! 👋
            </h1>
            <p style={{ color: theme.colors.textSecondary }}>
              Here's what's happening with your platform today.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="card hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1" style={{ color: theme.colors.text }}>
                      {stat.value}
                    </p>
                    <p className="text-sm mt-1" style={{ color: theme.colors.success }}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: stat.color + '20', color: stat.color }}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FiActivity size={20} />
                Recent Activity
              </h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: theme.colors.surfaceHover }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.success }}></div>
                  <div>
                    <p className="font-medium" style={{ color: theme.colors.text }}>New user registered</p>
                    <p className="text-sm" style={{ color: theme.colors.textSecondary }}>2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: theme.colors.surfaceHover }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                  <div>
                    <p className="font-medium" style={{ color: theme.colors.text }}>Payment completed</p>
                    <p className="text-sm" style={{ color: theme.colors.textSecondary }}>5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: theme.colors.surfaceHover }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.warning }}></div>
                  <div>
                    <p className="font-medium" style={{ color: theme.colors.text }}>New feedback received</p>
                    <p className="text-sm" style={{ color: theme.colors.textSecondary }}>10 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FiTrendingUp size={20} />
                Quick Stats
              </h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span style={{ color: theme.colors.textSecondary }}>Active Subscriptions</span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {analytics.subscriptions?.activeSubscriptions || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: theme.colors.textSecondary }}>Avg Rating</span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {analytics.feedbacks?.averageRating?.toFixed(1) || 0}/5
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: theme.colors.textSecondary }}>Completion Rate</span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {analytics.certifications?.averageScore?.toFixed(1) || 0}%
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